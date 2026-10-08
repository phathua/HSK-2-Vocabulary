<script lang="ts">
  import { appState } from '#lib/state/appState.svelte';
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
  import Trophy from 'phosphor-svelte/lib/Trophy';
  import ArrowClockwise from 'phosphor-svelte/lib/ArrowClockwise';
  import PencilLine from 'phosphor-svelte/lib/PencilLine';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
  import XCircle from 'phosphor-svelte/lib/XCircle';
  import FastForward from 'phosphor-svelte/lib/FastForward';
  import ArrowsHorizontal from 'phosphor-svelte/lib/ArrowsHorizontal';
  import { untrack } from 'svelte';
  import type { VocabItem } from '#lib/data/hsk2Vocabulary';

  const isZhToVi = $derived(appState.direction === 'zh_to_vi');

  // Thẻ kế tiếp trong ngăn xếp (under card)
  const nextCardItem = $derived.by(() => {
    if (appState.flashDeck.length >= 2) {
      return appState.flashDeck[appState.flashDeck.length - 2];
    }
    return null;
  });

  // Swipe gesture state
  let isDragging = $state(false);
  let startX = $state(0);
  let startY = $state(0);
  let offsetX = $state(0);
  let offsetY = $state(0);
  let isAnimating = $state(false);
  let isLeavingDeck = $state(false);
  let isAppearing = $state(false);

  // Thẻ đang bay ra ngoài (được tách riêng để hoàn thành animation bay ra, không bao giờ bay ngược về vị trí cũ)
  let flyingCard = $state<VocabItem | null>(null);
  let flyingOffsetX = $state(0);
  let flyingOffsetY = $state(0);
  let flyingIsFlipped = $state(false);

  // 3D Flip state (local flip card toggle)
  let isFlipped = $state(false);
  let skipFlipTransition = $state(false);
  let hasDragged = $state(false);

  // Card counter để nhận biết card đầu tiên
  let cardCount = $state(0);
  let showHint = $state(true);
  let isIdlePulsing = $state(false);
  let idleTimer: any = null;
  let lastItemId = $state<string | null>(null);

  // Khi chuyển card mới, reset lật ngay lập tức không transition & quản lý hint/idle timer
  $effect(() => {
    const currentId = appState.currentFlashItem?.id ?? null;
    if (currentId && currentId !== lastItemId) {
      lastItemId = currentId;
      untrack(() => {
        skipFlipTransition = true;
        isFlipped = false;
        cardCount++;

        // Cho phép transition quay lại sau khi DOM commit trạng thái thẳng (0deg)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            skipFlipTransition = false;
          });
        });

        // Card đầu tiên: hiện hướng dẫn
        if (cardCount === 1) {
          showHint = true;
          isIdlePulsing = false;
          clearTimeout(idleTimer);
        } else {
          // Các card tiếp theo: ẩn hint ban đầu, chờ 7s không thao tác mới nhấp nháy mờ mờ
          showHint = false;
          isIdlePulsing = false;
          clearTimeout(idleTimer);
          idleTimer = setTimeout(() => {
            showHint = true;
            isIdlePulsing = true;
          }, 7000);
        }
      });
    }

    return () => {
      clearTimeout(idleTimer);
    };
  });

  function registerUserAction() {
    if (isIdlePulsing) {
      isIdlePulsing = false;
    }
    clearTimeout(idleTimer);
  }

  // Derived values for swipe mechanics
  const rotateDeg = $derived(offsetX * 0.06);
  const dragProgress = $derived(Math.min(Math.abs(offsetX) / 120, 1));
  const likeOpacity = $derived(Math.max(0, Math.min(offsetX / 80, 1)));
  const nopeOpacity = $derived(Math.max(0, Math.min(-offsetX / 80, 1)));

  // Thẻ sau trồi lên đồng bộ theo độ kéo của thẻ trên
  const underScale = $derived(0.95 + dragProgress * 0.05);
  const underTranslateY = $derived(12 - dragProgress * 12);
  const underOpacity = $derived(0.75 + dragProgress * 0.25);

  function resetSwipeState() {
    isDragging = false;
    offsetX = 0;
    offsetY = 0;
    isAnimating = false;
  }

  // Pointer / Touch start
  function handlePointerDown(e: MouseEvent | TouchEvent) {
    if (isAnimating || flyingCard || !appState.currentFlashItem) return;
    registerUserAction();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    isDragging = true;
    hasDragged = false;
    startX = clientX;
    startY = clientY;
  }

  function handlePointerMove(e: MouseEvent | TouchEvent) {
    if (!isDragging) return;
    registerUserAction();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    offsetX = clientX - startX;
    offsetY = clientY - startY;
    if (Math.abs(offsetX) > 8 || Math.abs(offsetY) > 8) {
      hasDragged = true;
    }
  }

  function handlePointerUp() {
    if (!isDragging) return;
    isDragging = false;
    const threshold = 90;

    if (offsetX > threshold) {
      // Swipe Right -> THUỘC (Card bay hẳn ra khỏi màn hình)
      executeSwipe('right');
    } else if (offsetX < -threshold) {
      // Swipe Left -> CHƯA THUỘC (Card bay hẳn ra khỏi màn hình)
      executeSwipe('left');
    } else {
      // Snap back if threshold not met
      isAnimating = true;
      offsetX = 0;
      offsetY = 0;
      setTimeout(() => {
        isAnimating = false;
      }, 250);
    }
  }

  // Bắt đầu quy trình bay ra chuẩn Tinder
  function executeSwipe(direction: 'left' | 'right') {
    if (flyingCard || !appState.currentFlashItem) return;

    // 1. Lưu lại card đang vuốt thành flyingCard, kèm trạng thái lật
    const cardToFly = appState.currentFlashItem;
    flyingCard = cardToFly;
    flyingIsFlipped = isFlipped;

    // Đặt cờ bỏ transition lật ngay và reset isFlipped về false để thẻ dưới trồi lên luôn phẳng
    skipFlipTransition = true;
    isFlipped = false;
    
    // Đặt tọa độ đích ngoài màn hình
    const targetX = direction === 'right' ? window.innerWidth + 350 : -window.innerWidth - 350;
    const targetY = offsetY + 30;

    flyingOffsetX = offsetX;
    flyingOffsetY = offsetY;
    isLeavingDeck = true;

    // Reset ngay tọa độ kéo để thẻ chính không bị kéo lệch
    resetSwipeState();

    // 2. Thẻ đang bay vút ra ngoài, đồng thời under card (Card 2) trồi lên full size mượt mà
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        flyingOffsetX = targetX;
        flyingOffsetY = targetY;
      });
    });

    // 3. CHỈ KHI Card 1 đã bay hẳn ra khỏi màn hình (350ms):
    // Cập nhật appState (Card 2 chính thức thành Card chính).
    // Bật isAppearing để tắt sạch mọi transition trong frame này, tránh hiện tượng giật text/fade!
    setTimeout(() => {
      isAppearing = true;

      if (direction === 'right') {
        appState.markFlashKnown();
      } else {
        appState.markFlashUnknown();
      }

      flyingCard = null;
      isLeavingDeck = false;

      // Sau 2 animation frames (khi DOM và style đã commit vị trí tĩnh của Card mới), trả lại transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          isAppearing = false;
          skipFlipTransition = false;
        });
      });
    }, 350);
  }

  // Click card to toggle 3D Flip
  function handleCardClick() {
    registerUserAction();
    // Chặn hoàn toàn click ma sau khi đã vuốt kéo card
    if (hasDragged || isLeavingDeck || isAnimating || flyingCard) {
      hasDragged = false;
      return;
    }

    if (Math.abs(offsetX) < 10 && Math.abs(offsetY) < 10) {
      isFlipped = !isFlipped;
      if (isFlipped) {
        appState.speakCurrent();
      }
    }
  }

  function triggerSwipe(direction: 'left' | 'right') {
    if (flyingCard || !appState.currentFlashItem) return;
    registerUserAction();
    executeSwipe(direction);
  }
</script>

<svelte:window
  onmousemove={(e) => isDragging && handlePointerMove(e)}
  onmouseup={() => isDragging && handlePointerUp()}
  ontouchmove={(e) => isDragging && handlePointerMove(e)}
  ontouchend={() => isDragging && handlePointerUp()}
/>

<!-- Flashcard Container Deck -->
<div class="flex-1 min-h-0 flex flex-col relative select-none">
  {#if appState.currentFlashItem}
    <!-- Top Bar Controls above Deck -->
    <div class="flex items-center justify-between mb-2 shrink-0 px-1">
      <div class="flex items-center gap-1.5">
        <button
          type="button"
          onclick={() => {
            registerUserAction();
            appState.filterModalOpen = true;
          }}
          class="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white rounded-xl h-8.5 px-2.5 flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          title="Bấm để chọn bài học"
        >
          <PencilLine weight="bold" class="w-4 h-4" />
          <span class="text-xs font-black uppercase">Bài {appState.currentFlashItem.lesson || 1}</span>
        </button>

        <button
          type="button"
          onclick={() => {
            cardCount = 0;
            appState.initFlash();
          }}
          class="w-8.5 h-8.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
          title="Học lại từ đầu bộ thẻ"
          aria-label="Học lại từ đầu"
        >
          <ArrowClockwise weight="bold" class="w-3.5 h-3.5 text-pink-600" />
        </button>
      </div>

      <!-- Quick Audio -->
      <div class="flex items-center gap-1.5">
        <button
          type="button"
          onclick={(e) => {
            e.stopPropagation();
            registerUserAction();
            appState.speakCurrent();
          }}
          class="w-8.5 h-8.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-2xs active:scale-95 transition-all cursor-pointer"
          title="Phát âm tiếng Trung"
        >
          <SpeakerHigh weight="bold" class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Swipeable Tinder Stack Area -->
    <div class="flex-1 min-h-0 relative flex items-center justify-center w-full [perspective:1200px] overflow-hidden">
      
      <!-- ================= UNDER CARD (THẺ ĐỨNG SAU TRỒI LÊN KHI VUỐT) ================= -->
      {#if nextCardItem}
        <div
          class="absolute inset-0 bg-white rounded-3xl border border-slate-200 shadow-sm p-4 flex flex-col items-center justify-center text-center overflow-hidden pointer-events-none"
          style={`
            transform: translateY(${isLeavingDeck ? 0 : underTranslateY}px) scale(${isLeavingDeck ? 1 : underScale});
            opacity: ${isLeavingDeck ? 1 : underOpacity};
            transition: ${isDragging || isAppearing ? 'none' : 'transform 0.32s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.32s'};
            z-index: 10;
          `}
        >
          {#if nextCardItem.image}
            <div class="relative mb-3">
              <img
                src={nextCardItem.image}
                alt={nextCardItem.hanzi}
                class="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-slate-100 shadow-2xs bg-slate-50"
              />
            </div>
          {/if}

          {#if !isZhToVi}
            <span class="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">Nghĩa tiếng Việt</span>
            <div class="text-2xl sm:text-3xl font-black text-slate-900 mb-2 max-w-xs leading-snug">
              {nextCardItem.viet}
            </div>
          {:else}
            <span class="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">Từ vựng tiếng Trung</span>
            <div class="text-4xl sm:text-5xl font-black text-blue-600 mb-2">
              {nextCardItem.hanzi}
            </div>
          {/if}
        </div>
      {:else if appState.flashDeck.length > 0}
        <!-- Decorative stack card khi ở cuối danh sách -->
        <div
          class="absolute inset-x-2 inset-y-1 bg-slate-100 rounded-3xl border border-slate-300 shadow-xs pointer-events-none transform translate-y-3 scale-95 opacity-80"
          style="z-index: 5;"
        ></div>
      {/if}

      <!-- ================= MAIN ACTIVE TINDER CARD ================= -->
      <div
        role="button"
        tabindex="0"
        aria-label="Thẻ từ vựng flashcard, chạm để lật, vuốt sang phải nếu thuộc, sang trái nếu chưa thuộc"
        onkeydown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            handleCardClick();
          } else if (e.key === 'ArrowRight') {
            triggerSwipe('right');
          } else if (e.key === 'ArrowLeft') {
            triggerSwipe('left');
          }
        }}
        onmousedown={(e) => handlePointerDown(e)}
        ontouchstart={(e) => handlePointerDown(e)}
        onclick={handleCardClick}
        class="w-full h-full relative cursor-grab active:cursor-grabbing touch-none select-none [transform-style:preserve-3d]"
        style={`
          transform: translate3d(${offsetX}px, ${offsetY}px, 0) rotate(${rotateDeg}deg);
          transition: ${isDragging || isLeavingDeck || isAppearing ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'};
          opacity: ${isLeavingDeck ? 0 : 1};
          pointer-events: ${isLeavingDeck ? 'none' : 'auto'};
          z-index: 20;
        `}
      >
        <!-- 3D Flip Container -->
        <div
          class="w-full h-full relative [transform-style:preserve-3d]"
          style={`
            transform: rotateY(${isFlipped ? 180 : 0}deg);
            transition: ${skipFlipTransition || isAppearing ? 'none' : 'transform 0.5s ease-out'};
          `}
        >
          <!-- ================= FRONT FACE ================= -->
          <div
            class="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] bg-white rounded-3xl border border-slate-200 shadow-sm p-4 flex flex-col items-center justify-center text-center overflow-hidden"
          >
            <!-- Tinder Stamps (Stamp Thuộc / Stamp Quên) -->
            <div
              class="absolute top-5 left-5 border-3 border-emerald-500 text-emerald-600 rounded-xl px-3 py-1 font-black text-lg tracking-wider transform -rotate-12 pointer-events-none bg-emerald-50/95 shadow-sm transition-opacity"
              style={`opacity: ${likeOpacity};`}
            >
              THUỘC
            </div>
            <div
              class="absolute top-5 right-5 border-3 border-rose-500 text-rose-600 rounded-xl px-3 py-1 font-black text-lg tracking-wider transform rotate-12 pointer-events-none bg-rose-50/95 shadow-sm transition-opacity"
              style={`opacity: ${nopeOpacity};`}
            >
              QUÊN
            </div>

            <!-- Card Image -->
            {#if appState.currentFlashItem.image}
              <div class="relative mb-3 pointer-events-none">
                <img
                  src={appState.currentFlashItem.image}
                  alt={appState.currentFlashItem.hanzi}
                  class="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-slate-100 shadow-2xs bg-slate-50"
                  onerror={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/200x200/3b82f6/ffffff?text=HSK';
                  }}
                />
              </div>
            {/if}

            <!-- Mặt trước KHÔNG HIỂN THỊ PINYIN -->
            {#if !isZhToVi}
              <span class="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1 pointer-events-none">Nghĩa tiếng Việt</span>
              <div class="text-2xl sm:text-3xl font-black text-slate-900 mb-2 max-w-xs leading-snug pointer-events-none">
                {appState.currentFlashItem.viet}
              </div>
            {:else}
              <span class="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1 pointer-events-none">Từ vựng tiếng Trung</span>
              <div class="text-4xl sm:text-5xl font-black text-blue-600 mb-2 pointer-events-none">
                {appState.currentFlashItem.hanzi}
              </div>
            {/if}

            <!-- Gợi ý ngắn gọn: chỉ hiện ở card đầu tiên, hoặc nhấp nháy mờ mờ sau 7s không thao tác -->
            {#if showHint}
              <div
                class={`mt-3 flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-400 rounded-full text-[11px] font-semibold pointer-events-none transition-opacity duration-500 ${
                  isIdlePulsing ? 'animate-pulse opacity-70' : 'opacity-100'
                }`}
              >
                <ArrowsHorizontal class="w-3.5 h-3.5" />
                <span>Chạm để lật • Vuốt để chọn</span>
              </div>
            {/if}
          </div>

          <!-- ================= BACK FACE (HIỂN THỊ ĐÁP ÁN ĐẦY ĐỦ PINYIN) ================= -->
          <div
            class="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] bg-white rounded-3xl border-2 border-blue-200 shadow-sm p-4 flex flex-col items-center justify-center text-center overflow-hidden"
          >
            <!-- Mirrored Stamps on Back Face -->
            <div
              class="absolute top-5 right-5 border-3 border-emerald-500 text-emerald-600 rounded-xl px-3 py-1 font-black text-lg tracking-wider transform rotate-12 pointer-events-none bg-emerald-50/95 shadow-sm transition-opacity"
              style={`opacity: ${likeOpacity};`}
            >
              THUỘC
            </div>
            <div
              class="absolute top-5 left-5 border-3 border-rose-500 text-rose-600 rounded-xl px-3 py-1 font-black text-lg tracking-wider transform -rotate-12 pointer-events-none bg-rose-50/95 shadow-sm transition-opacity"
              style={`opacity: ${nopeOpacity};`}
            >
              QUÊN
            </div>

            <!-- Mặt sau hiển thị đáp án Pinyin đầy đủ -->
            <div class="w-full flex flex-col items-center justify-center pointer-events-none">
              <span class="text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-1">Đáp án</span>
              
              <div class="text-4xl sm:text-5xl font-black text-slate-900 mb-1">
                {appState.currentFlashItem.hanzi}
              </div>
              <div class="text-2xl font-black text-blue-600 mb-3">
                {appState.currentFlashItem.pinyin}
              </div>
              
              <div class="px-4 py-2 bg-slate-50 rounded-2xl border border-slate-200 max-w-xs">
                <span class="text-xs font-bold text-slate-400 block mb-0.5">Tiếng Việt</span>
                <span class="text-base sm:text-lg font-black text-emerald-600 leading-snug">
                  {appState.currentFlashItem.viet}
                </span>
              </div>
            </div>

            <!-- Gợi ý lật lại ngắn gọn -->
            <div class="mt-4 flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[11px] font-semibold pointer-events-none">
              <span>Chạm để lật lại • Vuốt để chọn</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= FLYING CARD (THẺ VỪA BỊ VUỐT BAY VÚT RA KHỎI MÀN HÌNH) ================= -->
      {#if flyingCard}
        <div
          class="absolute inset-0 bg-white rounded-3xl border border-slate-200 shadow-xl p-4 flex flex-col items-center justify-center text-center overflow-hidden pointer-events-none transition-transform duration-350 ease-out"
          style={`
            transform: translate3d(${flyingOffsetX}px, ${flyingOffsetY}px, 0) rotate(${flyingOffsetX * 0.06}deg);
            z-index: 30;
          `}
        >
          {#if flyingIsFlipped}
            <!-- Đang lật xem đáp án mà vuốt thì bay ra với mặt đáp án -->
            <span class="text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-1">Đáp án</span>
            <div class="text-4xl sm:text-5xl font-black text-slate-900 mb-1">
              {flyingCard.hanzi}
            </div>
            <div class="text-2xl font-black text-blue-600 mb-3">
              {flyingCard.pinyin}
            </div>
            <div class="px-4 py-2 bg-slate-50 rounded-2xl border border-slate-200 max-w-xs">
              <span class="text-xs font-bold text-slate-400 block mb-0.5">Tiếng Việt</span>
              <span class="text-base sm:text-lg font-black text-emerald-600 leading-snug">
                {flyingCard.viet}
              </span>
            </div>
          {:else}
            {#if flyingCard.image}
              <div class="relative mb-3">
                <img
                  src={flyingCard.image}
                  alt={flyingCard.hanzi}
                  class="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-slate-100 shadow-2xs bg-slate-50"
                />
              </div>
            {/if}

            {#if !isZhToVi}
              <span class="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">Nghĩa tiếng Việt</span>
              <div class="text-2xl sm:text-3xl font-black text-slate-900 mb-2 max-w-xs leading-snug">
                {flyingCard.viet}
              </div>
            {:else}
              <span class="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">Từ vựng tiếng Trung</span>
              <div class="text-4xl sm:text-5xl font-black text-blue-600 mb-2">
                {flyingCard.hanzi}
              </div>
            {/if}
          {/if}
        </div>
      {/if}
    </div>

    <!-- Bottom Controls: Micro Stats -->
    <footer class="shrink-0 mt-3">
      <!-- Micro Stats Footer -->
      <div class="flex justify-between items-center px-3 py-1.5 bg-white rounded-xl border border-slate-200 text-[11px] font-bold text-slate-500">
        <span class="flex items-center gap-1">
          <CheckCircle weight="duotone" class="w-3.5 h-3.5 text-emerald-500" />
          Thuộc: <b class="text-slate-900">{appState.flashKnown}</b>
        </span>
        <span class="flex items-center gap-1">
          <XCircle weight="duotone" class="w-3.5 h-3.5 text-rose-500" />
          Chưa: <b class="text-slate-900">{appState.flashUnknown}</b>
        </span>
        <span class="flex items-center gap-1">
          <FastForward weight="duotone" class="w-3.5 h-3.5 text-amber-500" />
          Còn: <b class="text-slate-900">{appState.flashDeck.length}</b>
        </span>
      </div>
    </footer>
  {:else}
    <!-- Completed Screen -->
    <div class="flex-1 min-h-0 bg-white rounded-3xl border border-slate-200 shadow-sm p-4 flex flex-col items-center justify-center text-center my-auto">
      <div class="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
        <Trophy weight="duotone" class="w-10 h-10" />
      </div>
      <h2 class="text-xl font-black text-slate-900 mb-1">
        Hoàn thành Flashcard!
      </h2>
      <p class="text-sm font-bold text-slate-600 mb-4">
        Đã thuộc {appState.flashKnown}/{appState.totalFlashCount} từ
      </p>
      <button
        type="button"
        onclick={() => {
          cardCount = 0;
          appState.initFlash();
        }}
        class="w-full max-w-xs h-12 bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
      >
        <ArrowClockwise weight="duotone" class="w-5 h-5" />
        <span>Học lại từ đầu</span>
      </button>
    </div>
  {/if}
</div>

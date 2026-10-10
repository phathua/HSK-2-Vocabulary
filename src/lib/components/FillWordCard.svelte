<script lang="ts">
  import { appState } from '#lib/state/appState.svelte';
  import { convertTelexToPinyin } from '#lib/utils/speech';
  import ToneKeyboard from './ToneKeyboard.svelte';
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
  import XCircle from 'phosphor-svelte/lib/XCircle';
  import FastForward from 'phosphor-svelte/lib/FastForward';
  import Lightbulb from 'phosphor-svelte/lib/Lightbulb';
  import Check from 'phosphor-svelte/lib/Check';
  import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
  import Confetti from 'phosphor-svelte/lib/Confetti';
  import ArrowClockwise from 'phosphor-svelte/lib/ArrowClockwise';
  import PencilLine from 'phosphor-svelte/lib/PencilLine';
  import Keyboard from 'phosphor-svelte/lib/Keyboard';
  import SquaresFour from 'phosphor-svelte/lib/SquaresFour';
  import Backspace from 'phosphor-svelte/lib/Backspace';
  import SmartImage from './SmartImage.svelte';
  import { flip } from 'svelte/animate';

  let inputEl: HTMLInputElement | null = $state(null);

  // Quản lý active flying animation
  let flyingLetter = $state<{
    char: string;
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    w: number;
    h: number;
    animating: boolean;
  } | null>(null);

  function handleInsertChar(ch: string) {
    if (appState.fillAnswered) return;
    if (!inputEl) {
      appState.fillInput += ch;
      return;
    }
    const start = inputEl.selectionStart || 0;
    const end = inputEl.selectionEnd || 0;
    const newVal = appState.fillInput.slice(0, start) + ch + appState.fillInput.slice(end);
    appState.fillInput = newVal;
    setTimeout(() => {
      inputEl?.focus();
      inputEl?.setSelectionRange(start + 1, start + 1);
    }, 0);
  }

  function handleInputChange(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    if (appState.direction === 'vi_to_zh') {
      appState.fillInput = convertTelexToPinyin(val);
    } else {
      appState.fillInput = val;
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      appState.checkFillAnswer();
    }
  }

  const isZhToVi = $derived(appState.direction === 'zh_to_vi');
  // Chế độ Chọn từ khả dụng khi học xuôi (gõ/chọn Pinyin)
  const isTileMode = $derived(appState.fillSubMode === 'tiles' && !isZhToVi);

  // Animation bay từ Tile hàng dưới lên Slot hàng trên
  function handleTileClick(tileId: string, event: MouseEvent) {
    if (appState.fillAnswered) return;
    const curChunk = appState.fillWordChunks[appState.currentChunkIndex];
    if (!curChunk) return;
    const tile = curChunk.tiles.find(t => t.id === tileId);
    if (!tile || tile.isUsed) return;

    const emptySlot = curChunk.slots.find(s => !s.userChar);
    const tileBtn = event.currentTarget as HTMLElement;
    const fromRect = tileBtn.getBoundingClientRect();

    let toRect: DOMRect | null = null;
    if (emptySlot) {
      const slotEl = document.getElementById(emptySlot.id);
      if (slotEl) toRect = slotEl.getBoundingClientRect();
    }

    if (fromRect && toRect) {
      flyingLetter = {
        char: tile.char,
        fromX: fromRect.left,
        fromY: fromRect.top,
        toX: toRect.left,
        toY: toRect.top,
        w: fromRect.width,
        h: fromRect.height,
        animating: false
      };

      // Kích hoạt transition bay sau 1 frame để trình duyệt áp dụng toạ độ xuất phát
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (flyingLetter) {
            flyingLetter.animating = true;
          }
        });
      });

      setTimeout(() => {
        flyingLetter = null;
      }, 260);
    }

    appState.selectTile(appState.currentChunkIndex, tileId);
  }

  // Animation bay từ Slot hàng trên ngược về Tile hàng dưới
  function handleSlotClick(cIdx: number, slotId: string, event: MouseEvent) {
    if (appState.fillAnswered) return;
    const curChunk = appState.fillWordChunks[cIdx];
    if (!curChunk) return;
    const slot = curChunk.slots.find(s => s.id === slotId);
    if (!slot || slot.isPreFilled || !slot.tileId || !slot.userChar) return;

    const slotBtn = event.currentTarget as HTMLElement;
    const fromRect = slotBtn.getBoundingClientRect();
    // Tìm phần tử tile: trên Desktop id có tiền tố 'desk-', còn trên Mobile id là tileId
    let tileEl = document.getElementById(`desk-${slot.tileId}`);
    if (!tileEl || tileEl.offsetParent === null) {
      tileEl = document.getElementById(slot.tileId);
    }
    let toRect: DOMRect | null = null;
    if (tileEl && tileEl.offsetParent !== null) {
      toRect = tileEl.getBoundingClientRect();
    }

    if (fromRect && toRect) {
      flyingLetter = {
        char: slot.userChar,
        fromX: fromRect.left,
        fromY: fromRect.top,
        toX: toRect.left,
        toY: toRect.top,
        w: fromRect.width,
        h: fromRect.height,
        animating: false
      };

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (flyingLetter) {
            flyingLetter.animating = true;
          }
        });
      });

      setTimeout(() => {
        flyingLetter = null;
      }, 260);
    }

    appState.currentChunkIndex = cIdx;
    appState.unselectSlot(cIdx, slotId);
  }
</script>

<!-- Flying Letter Overlay: Bay mượt mà giữa các ô -->
{#if flyingLetter}
  <div
    class={`fixed pointer-events-none z-50 font-black text-base sm:text-lg rounded-xl shadow-lg flex items-center justify-center border-b-4 ${
      flyingLetter.animating ? 'transition-all duration-230 ease-out' : 'transition-none'
    } bg-blue-500 text-white border-blue-700`}
    style={`
      left: 0;
      top: 0;
      width: ${flyingLetter.w}px;
      height: ${flyingLetter.h}px;
      transform: translate3d(${flyingLetter.animating ? flyingLetter.toX : flyingLetter.fromX}px, ${flyingLetter.animating ? flyingLetter.toY : flyingLetter.fromY}px, 0);
    `}
  >
    {flyingLetter.char}
  </div>
{/if}

<!-- Main Fill Word Card: Tối ưu 2 cột trên Desktop (lg:grid lg:grid-cols-12), 1 cột trên Mobile/Tablet -->
<main class="flex-1 min-h-0 w-full max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto bg-white dark:bg-[#1B1B1B] rounded-3xl border border-slate-200 dark:border-[#282A2C] shadow-sm p-4 sm:p-5 lg:p-6 flex flex-col justify-between text-center relative overflow-hidden transition-colors">
  <!-- Top Bar: Nút Bài bên trái, Nút đổi chế độ bên phải -->
  <div class="w-full flex items-center justify-between shrink-0 mb-2 z-10">
    <!-- Floating Lesson Select Button -->
    <button
      type="button"
      onclick={() => (appState.filterModalOpen = true)}
      class="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white rounded-2xl h-10 px-3.5 flex items-center justify-center gap-1.5 shadow-sm transition-transform cursor-pointer"
      title="Bấm để chọn bài học"
    >
      <PencilLine weight="bold" class="w-5 h-5" />
      <span class="text-xs font-black uppercase tracking-wider">Bài {appState.currentFillItem?.lesson || 1}</span>
    </button>

    <!-- Right Mode Switch: Chọn từ / Thủ công -->
    {#if !isZhToVi && appState.currentFillItem}
      <button
        type="button"
        onclick={() => appState.toggleFillSubMode()}
        class={`rounded-2xl h-10 px-3.5 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer text-xs font-black text-white ${
          appState.fillSubMode === 'tiles'
            ? 'bg-blue-600 hover:bg-blue-700 border border-blue-500'
            : 'bg-emerald-600 hover:bg-emerald-700 border border-emerald-500'
        }`}
        title="Chuyển chế độ: Chọn từ / Thủ công"
      >
        {#if appState.fillSubMode === 'tiles'}
          <SquaresFour weight="bold" class="w-4 h-4 text-white shrink-0" />
          <span>Chọn từ</span>
        {:else}
          <Keyboard weight="bold" class="w-4 h-4 text-white shrink-0" />
          <span>Thủ công</span>
        {/if}
      </button>
    {:else}
      <div></div>
    {/if}
  </div>

  {#if appState.currentFillItem}
    <!-- Container: 2 cột trên Desktop (lg:), 1 cột trên Mobile/Tablet -->
    <div class="w-full flex-1 flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 items-center justify-center my-auto py-1">
      
      <!-- CỘT 1 (Desktop col-span-5): Đề bài & Hình ảnh gọn gàng & Loa TTS -->
      <div class="w-full lg:col-span-5 flex flex-col items-center justify-center text-center py-2 lg:border-r lg:border-slate-100 dark:lg:border-[#282A2C] lg:pr-6">
        <!-- Vocabulary Image: Kích thước tối ưu gọn gàng hơn trên desktop -->
        {#if appState.currentFillItem.image}
          <div class="relative mb-2 sm:mb-3">
            <SmartImage
              src={appState.currentFillItem.image}
              alt={appState.currentFillItem.hanzi}
              class="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-2xl border-2 border-slate-100 dark:border-[#282A2C] shadow-xs bg-slate-50 dark:bg-[#282A2C]"
            />
          </div>
        {/if}

        <!-- Prompt Question -->
        {#if !isZhToVi}
          <span class="text-[11px] md:text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-[#8E918F] mb-1">Nghĩa tiếng Việt</span>
          <div class="text-2xl sm:text-3xl lg:text-3xl font-black text-slate-900 dark:text-[#E3E3E3] mb-2 max-w-sm leading-tight">
            {appState.currentFillItem.viet}
          </div>

          <!-- Chữ Hán & Loa TTS -->
          <div class="flex items-center justify-center gap-3 mb-1">
            <div class="text-3xl sm:text-4xl lg:text-4xl font-black text-blue-600 dark:text-blue-400 font-sans tracking-tight">
              {appState.currentFillItem.hanzi}
            </div>
            <button
              type="button"
              onclick={() => appState.speakCurrent()}
              class="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shadow-xs active:scale-95 transition-transform cursor-pointer shrink-0"
              title="Phát âm tiếng Trung"
            >
              <SpeakerHigh weight="bold" class="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        {:else}
          <!-- Đảo chiều Trung -> Việt -->
          <span class="text-[11px] md:text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-[#8E918F] mb-1">Từ vựng tiếng Trung</span>
          <div class="flex items-center justify-center gap-3 mb-2">
            <div class="text-4xl sm:text-5xl lg:text-5xl font-black text-blue-600 dark:text-blue-400 font-sans">
              {appState.currentFillItem.hanzi}
            </div>
            <button
              type="button"
              onclick={() => appState.speakCurrent()}
              class="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shadow-xs active:scale-95 transition-transform cursor-pointer shrink-0"
              title="Phát âm tiếng Trung"
            >
              <SpeakerHigh weight="bold" class="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
          <div class="text-xl sm:text-2xl font-black text-slate-700 dark:text-[#C4C7C5]">
            {appState.currentFillItem.pinyin}
          </div>
        {/if}
      </div>

      <!-- CỘT 2 (Desktop col-span-7): Khu vực tương tác nhập liệu (Slots + Bảng gợi ý / Ô gõ thủ công) -->
      <div class="w-full lg:col-span-7 flex flex-col items-center justify-center py-2 lg:pl-4 space-y-4">
        {#if isTileMode && appState.fillWordChunks.length > 0}
          {@const isSkipped = appState.fillAnswered && appState.fillFeedback?.type === 'skip'}
          {@const isWrong = appState.fillAnswered && appState.fillFeedback?.type === 'wrong'}
          {@const curChunk = appState.fillWordChunks[appState.currentChunkIndex]}
          {@const wrongSlots = isWrong ? curChunk?.slots.filter(s => s.userChar !== s.char) || [] : []}
          {@const neededCorrectChars = isWrong ? wrongSlots.map(s => s.char) : []}
          
          <div class="w-full flex flex-col items-center gap-3">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#8E918F]">
              Ghép các ký tự Pinyin
            </span>

            <!-- Hàng các ô Slot điền từ: Luôn căn giữa (justify-center), cuộn ngang mượt mà nếu quá dài -->
            <div class="w-full flex items-center justify-center overflow-x-auto no-scrollbar gap-x-2.5 sm:gap-x-4 py-2 px-1">
              {#each appState.fillWordChunks as chunk, cIdx}
                <div
                  role="group"
                  aria-label={`Cụm từ ${cIdx + 1}`}
                  class={`flex items-center shrink-0 gap-1 sm:gap-1.5 p-1 rounded-2xl border transition-all ${
                    cIdx === appState.currentChunkIndex
                      ? 'border-blue-500/80 bg-blue-50/50 dark:bg-blue-950/25 dark:border-blue-500/60 ring-2 ring-blue-500/20'
                      : 'border-slate-200/60 dark:border-[#2f3133] bg-slate-50/40 dark:bg-[#242628]/40 hover:border-slate-300 dark:hover:border-[#3c3f42]'
                  }`}
                >
                  {#each chunk.slots as slot}
                    {@const isCorrectSlot = appState.fillAnswered && !isSkipped && slot.userChar === slot.char}
                    {@const isWrongSlot = appState.fillAnswered && !isSkipped && slot.userChar !== slot.char}
                    <button
                      id={slot.id}
                      type="button"
                      disabled={slot.isPreFilled || appState.fillAnswered}
                      onclick={(e) => handleSlotClick(cIdx, slot.id, e)}
                      class={`w-9 h-11 sm:w-10 sm:h-12 md:w-11 md:h-13 rounded-xl flex items-center justify-center font-black text-base sm:text-lg transition-all border-b-4 select-none shrink-0 ${
                        slot.isPreFilled
                          ? 'bg-slate-200 dark:bg-[#323537] text-slate-500 dark:text-slate-400 border-slate-300 dark:border-[#3c3f42] cursor-not-allowed'
                          : isSkipped
                            ? 'bg-amber-400 text-slate-950 border-amber-600 shadow-xs'
                            : isCorrectSlot
                              ? 'bg-emerald-500 text-white border-emerald-700 shadow-xs'
                              : isWrongSlot
                                ? 'bg-rose-500 text-white border-rose-700 shadow-xs'
                                : slot.userChar
                                  ? 'bg-blue-500 text-white border-blue-700 shadow-xs cursor-pointer active:scale-95'
                                  : cIdx === appState.currentChunkIndex
                                    ? 'bg-white dark:bg-[#282A2C] border-dashed border-2 border-slate-300 dark:border-[#404346] text-transparent'
                                    : 'bg-white/60 dark:bg-[#282A2C]/60 border-dashed border-2 border-slate-200 dark:border-[#35373a] text-transparent'
                      }`}
                      title={slot.isPreFilled ? 'Ký tự gợi ý sẵn' : slot.userChar ? 'Bấm để gỡ bỏ' : 'Bấm để điền vế này'}
                    >
                      {slot.userChar || '_'}
                    </button>
                  {/each}
                </div>
              {/each}
            </div>

            <!-- Khu vực Pill Đáp án đúng khi trả lời sai -->
            {#if isWrong}
              <div class="text-xs sm:text-sm font-black text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 px-3.5 py-1.5 rounded-xl shadow-2xs">
                Đáp án đúng: <span class="underline underline-offset-2 tracking-wide">{appState.currentFillItem.pinyin}</span>
              </div>
            {/if}

            <!-- DESKTOP CHỈ HIỆN TẠI CỘT 2: BẢNG KÝ TỰ (TILE BANK) TRONG CỘT 2 TRÊN MÀN HÌNH LỚN -->
            {#if curChunk}
              <div class="hidden lg:flex w-full bg-slate-50/70 dark:bg-[#242628]/60 rounded-2xl border border-slate-200 dark:border-[#282A2C] p-3 shadow-2xs flex-col items-center gap-2 mt-2">
                <span class="text-[11px] font-bold text-slate-400 dark:text-[#8E918F] uppercase tracking-wider">
                  Chọn ký tự điền
                </span>
                <div class="flex flex-wrap items-center justify-center gap-2">
                  {#each curChunk.tiles as tile}
                    {@const isCorrectHighlight = isWrong && !tile.isDistractor && neededCorrectChars.includes(tile.char)}
                    <button
                      id={`desk-${tile.id}`}
                      type="button"
                      disabled={tile.isUsed || appState.fillAnswered}
                      onclick={(e) => handleTileClick(tile.id, e)}
                      class={`min-w-10 h-11 px-3 rounded-xl font-black text-base flex items-center justify-center transition-all select-none border-b-4 ${
                        isCorrectHighlight
                          ? 'bg-emerald-500 text-white border-emerald-700 ring-2 ring-emerald-400 shadow-sm cursor-default'
                          : tile.isUsed
                            ? 'bg-slate-200/50 dark:bg-[#282A2C] border-slate-200 dark:border-[#353739] text-slate-400/40 dark:text-[#8E918F]/30 pointer-events-none cursor-default'
                            : 'bg-white hover:bg-slate-100 dark:bg-[#282A2C] dark:hover:bg-[#323537] text-slate-800 dark:text-[#E3E3E3] border-slate-300 dark:border-[#3f4245] shadow-2xs active:border-b-0 active:translate-y-1 cursor-pointer'
                      }`}
                    >
                      {tile.char}
                    </button>
                  {/each}
                </div>
              </div>
            {/if}

          </div>
        {:else}
          <!-- Chế độ Thủ công trên Desktop: Ô nhập liệu và Tone Keyboard ngay trong Cột 2 -->
          <div class="w-full flex flex-col items-center gap-3">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#8E918F]">
              Nhập câu trả lời
            </span>

            <div class="w-full max-w-md flex items-stretch gap-2">
              <input
                bind:this={inputEl}
                type="text"
                value={appState.fillInput}
                oninput={handleInputChange}
                onkeydown={handleKeyDown}
                disabled={appState.fillAnswered}
                placeholder={!isZhToVi ? "Gõ Pinyin (vd: ni3hao3)..." : "Gõ nghĩa tiếng Việt..."}
                class="min-w-0 flex-1 h-12 bg-white dark:bg-[#282A2C] border-2 border-slate-200 dark:border-[#37393B] focus:border-blue-500 dark:focus:border-blue-400 rounded-2xl px-4 text-base font-bold text-slate-900 dark:text-[#E3E3E3] outline-none shadow-2xs transition-colors"
                autocomplete="off"
                spellcheck="false"
              />
              <button
                type="button"
                onclick={() => appState.checkFillAnswer()}
                class="h-12 px-4 bg-amber-400 hover:bg-amber-500 active:scale-95 text-slate-900 font-black text-sm rounded-2xl shadow-2xs flex items-center justify-center gap-1 transition-all shrink-0 cursor-pointer"
              >
                <Check weight="bold" class="w-4 h-4" />
                <span>{appState.fillAnswered ? "Tiếp" : "Kiểm tra"}</span>
              </button>
            </div>

            {#if !isZhToVi}
              <div class="w-full max-w-md hidden lg:block">
                <ToneKeyboard onInsertChar={handleInsertChar} disabled={appState.fillAnswered} />
              </div>
            {/if}
          </div>
        {/if}
      </div>

    </div>
  {:else}
    <!-- Finished Screen -->
    <div class="flex flex-col items-center justify-center text-center p-4 my-auto">
      <div class="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
        <Confetti weight="duotone" class="w-10 h-10" />
      </div>
      <h2 class="text-xl font-black text-slate-900 dark:text-[#E3E3E3] mb-1">
        Hoàn thành bài học!
      </h2>
      <p class="text-sm font-bold text-slate-600 dark:text-[#8E918F] mb-4">
        Đúng {appState.fillCorrect}/{appState.totalFillCount} từ ({Math.round((appState.fillCorrect / (appState.totalFillCount || 1)) * 100)}%)
      </p>

      <button
        type="button"
        onclick={() => appState.initFill(undefined, false)}
        class="w-full max-w-xs h-11 bg-pink-500 hover:bg-pink-600 text-white font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all mb-2 cursor-pointer"
      >
        <ArrowClockwise weight="duotone" class="w-4 h-4" />
        <span>Học lại từ đầu</span>
      </button>

      {#if appState.wrongFillWords.length > 0 && !appState.isFillReviewMode}
        <button
          type="button"
          onclick={() => appState.reviewWrongFill()}
          class="w-full max-w-xs h-11 bg-orange-500 hover:bg-orange-600 text-white font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowClockwise weight="duotone" class="w-4 h-4" />
          <span>Ôn lại từ sai ({appState.wrongFillWords.length})</span>
        </button>
      {/if}
    </div>
  {/if}
</main>

<!-- Fill Footer Controls: Trên Mobile/Tablet hiện bảng nhập liệu, trên Desktop ẩn (lg:hidden) phần bảng phím vì đã tích hợp vào Cột 2 -->
{#if appState.currentFillItem}
  <footer class="shrink-0 mt-2 w-full max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto space-y-2">
    <!-- Feedback Banner (khi gõ thủ công) -->
    {#if appState.fillFeedback && !isTileMode}
      <div class={`py-2 px-3 rounded-2xl text-center shadow-xs flex items-center justify-center gap-2 border transition-all ${
        appState.fillFeedback.type === 'correct' ? 'bg-emerald-500 border-emerald-600 text-white' :
        appState.fillFeedback.type === 'wrong' ? 'bg-rose-500 border-rose-600 text-white' :
        appState.fillFeedback.type === 'skip' ? 'bg-amber-400 border-amber-500 text-slate-950' : 'bg-purple-600 border-purple-700 text-white'
      }`}>
        {#if appState.fillFeedback.type === 'correct'}
          <CheckCircle weight="fill" class="w-4 h-4 shrink-0" />
        {:else if appState.fillFeedback.type === 'wrong'}
          <XCircle weight="fill" class="w-4 h-4 shrink-0" />
        {:else if appState.fillFeedback.type === 'skip'}
          <FastForward weight="fill" class="w-4 h-4 shrink-0" />
        {:else}
          <Lightbulb weight="fill" class="w-4 h-4 shrink-0" />
        {/if}

        <div class="flex items-center gap-1.5 leading-none min-w-0">
          <span class="text-xs font-bold opacity-90 truncate">
            {appState.fillFeedback.text}
          </span>
        </div>
      </div>
    {/if}

    <!-- BẢNG CHỌN KÝ TỰ (TILE BANK) CHO MOBILE / TABLET (< lg): Ẩn trên desktop (lg:hidden) vì desktop đã có ở Cột 2 -->
    {#if isTileMode && appState.fillWordChunks[appState.currentChunkIndex]}
      {@const curChunk = appState.fillWordChunks[appState.currentChunkIndex]}
      {@const isWrong = appState.fillAnswered && appState.fillFeedback?.type === 'wrong'}
      {@const wrongSlots = isWrong ? curChunk.slots.filter(s => s.userChar !== s.char) : []}
      {@const neededCorrectChars = isWrong ? wrongSlots.map(s => s.char) : []}
      <div class="lg:hidden bg-white dark:bg-[#1B1B1B] rounded-2xl border border-slate-200 dark:border-[#282A2C] p-2.5 shadow-2xs space-y-2">
        <!-- Tile Grid -->
        <div class="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {#each curChunk.tiles as tile}
            <!-- Khi sai: CHỈ MÀU XANH KÝ TỰ ĐÚNG THỰC TẾ mà người dùng đã điền sai hoặc thiếu -->
            {@const isCorrectHighlight = isWrong && !tile.isDistractor && neededCorrectChars.includes(tile.char)}
            <button
              id={tile.id}
              type="button"
              disabled={tile.isUsed || appState.fillAnswered}
              onclick={(e) => handleTileClick(tile.id, e)}
              class={`min-w-9 h-10 sm:min-w-11 sm:h-12 px-2.5 rounded-xl font-black text-base sm:text-lg flex items-center justify-center transition-all select-none border-b-4 ${
                isCorrectHighlight
                  ? 'bg-emerald-500 text-white border-emerald-700 ring-2 ring-emerald-400 shadow-sm cursor-default'
                  : tile.isUsed
                    ? 'bg-slate-100/70 dark:bg-[#242628]/70 border-slate-200 dark:border-[#353739] text-slate-400/40 dark:text-[#8E918F]/30 pointer-events-none cursor-default'
                    : 'bg-slate-50 hover:bg-white dark:bg-[#282A2C] dark:hover:bg-[#323537] text-slate-800 dark:text-[#E3E3E3] border-slate-300 dark:border-[#3f4245] shadow-2xs active:border-b-0 active:translate-y-1 cursor-pointer'
              }`}
            >
              {tile.char}
            </button>
          {/each}
        </div>
      </div>
    {:else}
      <!-- Input Row Thủ Công CHO MOBILE / TABLET (< lg): Ẩn trên desktop (lg:hidden) vì desktop đã có ở Cột 2 -->
      <div class="lg:hidden flex items-stretch gap-1.5 sm:gap-2">
        <input
          bind:this={inputEl}
          type="text"
          value={appState.fillInput}
          oninput={handleInputChange}
          onkeydown={handleKeyDown}
          disabled={appState.fillAnswered}
          placeholder={!isZhToVi ? "Gõ Pinyin (vd: ni3hao3)..." : "Gõ nghĩa tiếng Việt..."}
          class="min-w-0 flex-1 h-11 sm:h-12 bg-white dark:bg-[#282A2C] border-2 border-slate-200 dark:border-[#37393B] focus:border-blue-500 dark:focus:border-blue-400 rounded-2xl px-3 sm:px-4 text-sm sm:text-base font-bold text-slate-900 dark:text-[#E3E3E3] outline-none shadow-2xs transition-colors"
          autocomplete="off"
          spellcheck="false"
        />
        <button
          type="button"
          onclick={() => appState.checkFillAnswer()}
          class="h-11 sm:h-12 px-3 sm:px-4 bg-amber-400 hover:bg-amber-500 active:scale-95 text-slate-900 font-black text-xs sm:text-sm rounded-2xl shadow-2xs flex items-center justify-center gap-1 transition-all shrink-0 cursor-pointer"
        >
          <Check weight="bold" class="w-4 h-4" />
          <span>{appState.fillAnswered ? "Tiếp" : "Kiểm tra"}</span>
        </button>
      </div>

      <!-- Tone Keyboard (khi gõ thủ công trên mobile/tablet) -->
      {#if !isZhToVi}
        <div class="lg:hidden">
          <ToneKeyboard onInsertChar={handleInsertChar} disabled={appState.fillAnswered} />
        </div>
      {/if}
    {/if}

    <!-- Action Buttons: Giữ chung cho cả Desktop & Mobile -->
    <div class="flex gap-2 items-center">
      {#if !appState.fillAnswered}
        <button
          type="button"
          onclick={() => appState.skipFill()}
          class="flex-1 h-11 sm:h-12 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-2xs flex items-center justify-center gap-1 transition-all cursor-pointer"
        >
          <ArrowRight weight="bold" class="w-4 h-4" />
          <span>Bỏ qua</span>
        </button>
        <button
          type="button"
          onclick={() => appState.hintFill()}
          disabled={appState.fillHintShown}
          class="h-11 sm:h-12 px-3.5 sm:px-4 bg-purple-600 hover:bg-purple-700 active:scale-95 disabled:opacity-50 text-white font-black text-xs sm:text-sm rounded-2xl shadow-2xs flex items-center justify-center gap-1 transition-all shrink-0 cursor-pointer"
        >
          <Lightbulb weight="bold" class="w-4 h-4" />
          <span>Đáp án</span>
        </button>

        <!-- Nút Xoá ký tự (Backspace): Đặt bên phải nút Đáp án, tự ẩn khi đã có đáp án -->
        {#if isTileMode}
          <button
            type="button"
            onclick={() => appState.backspaceSlot(appState.currentChunkIndex)}
            class="h-11 sm:h-12 w-11 sm:w-12 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 rounded-2xl flex items-center justify-center shadow-2xs active:scale-95 transition-all shrink-0 cursor-pointer"
            title="Xoá ký tự vừa nhập"
          >
            <Backspace weight="bold" class="w-5 h-5" />
          </button>
        {/if}
      {:else}
        <button
          type="button"
          onclick={() => appState.nextFillItem()}
          class="w-full h-11 sm:h-12 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-sm rounded-2xl shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <span>Tiếp tục từ sau</span>
          <ArrowRight weight="bold" class="w-4 h-4" />
        </button>
      {/if}
    </div>

    <!-- Micro Stats Footer -->
    <div class="flex justify-between items-center px-3 py-1 bg-white dark:bg-[#1B1B1B] rounded-xl border border-slate-200 dark:border-[#282A2C] text-[11px] font-bold text-slate-500 dark:text-[#8E918F] transition-colors">
      <span class="flex items-center gap-1">
        <CheckCircle weight="duotone" class="w-3.5 h-3.5 text-emerald-500" />
        Đúng: <b class="text-slate-900 dark:text-[#E3E3E3]">{appState.fillCorrect}</b>
      </span>
      <span class="flex items-center gap-1">
        <XCircle weight="duotone" class="w-3.5 h-3.5 text-rose-500" />
        Sai: <b class="text-slate-900 dark:text-[#E3E3E3]">{appState.fillWrong}</b>
      </span>
      <span class="flex items-center gap-1">
        <FastForward weight="duotone" class="w-3.5 h-3.5 text-amber-500" />
        Bỏ qua: <b class="text-slate-900 dark:text-[#E3E3E3]">{appState.fillSkipCount}</b>
      </span>
    </div>
  </footer>
{/if}

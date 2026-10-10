<script lang="ts">
  import { onMount } from 'svelte';
  import HanziWriter from 'hanzi-writer';
  import ArrowsClockwise from 'phosphor-svelte/lib/ArrowsClockwise';
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
  import PencilLine from 'phosphor-svelte/lib/PencilLine';
  import { getCharacterDetail, type HanziCharacterDetail } from '#lib/data/characterDetailMap';

  interface Props {
    hanzi: string;
    strokeCount?: number;
    radical?: string;
  }

  let { hanzi = '', strokeCount = 0, radical = '' }: Props = $props();

  // Tab chọn ký tự nếu từ có nhiều hơn 1 chữ
  let chars = $derived(Array.from(hanzi).filter((c) => /\p{Script=Han}/u.test(c)));
  let selectedCharIndex = $state(0);
  let currentChar = $derived(chars[selectedCharIndex] || chars[0] || hanzi[0] || '字');

  // Lấy dữ liệu chi tiết cho ký tự hiện tại (Bính âm, Lục thư, Bộ thủ, Hình thái, Số nét, Nét bút)
  let charDetail = $derived<HanziCharacterDetail>(getCharacterDetail(currentChar));

  // DOM Container & Canvas
  let gridContainer = $state<HTMLDivElement | null>(null);
  let writerContainer = $state<HTMLDivElement | null>(null);
  let canvasRef = $state<HTMLCanvasElement | null>(null);

  // Trạng thái tương tác & vẽ
  let writerInstance: any = null;
  let isDrawing = $state(false);
  let hasUserDrawn = $state(false);
  let isLooping = $state(true);
  let showOutline = $state(true);
  let isPracticeMode = $state(false);
  let activeChar = '';
  let loopTimeout: any = null;

  // Quản lý dừng và bắt đầu animation
  function stopLoop() {
    isLooping = false;
    if (loopTimeout) {
      clearTimeout(loopTimeout);
      loopTimeout = null;
    }
    if (writerInstance) {
      try {
        if (writerInstance._renderState) {
          writerInstance._renderState.cancelAll();
        }
        writerInstance.pauseAnimation();
        // Xóa hoàn toàn nét vẽ đỏ đang dở dang (duration = 0)
        writerInstance.hideCharacter({ duration: 0 });
        if (showOutline) {
          writerInstance.showOutline({ duration: 0 });
        } else {
          writerInstance.hideOutline({ duration: 0 });
        }
      } catch (e) {
        console.error('Error stopping loop:', e);
      }
    }
  }

  function startLoop() {
    isLooping = true;
    hasUserDrawn = false;
    if (loopTimeout) {
      clearTimeout(loopTimeout);
      loopTimeout = null;
    }
    if (!writerInstance) return;

    try {
      if (writerInstance._renderState) {
        writerInstance._renderState.cancelAll();
      }
      writerInstance.hideCharacter({ duration: 0 });
      if (showOutline) {
        writerInstance.showOutline({ duration: 0 });
      } else {
        writerInstance.hideOutline({ duration: 0 });
      }
      // Dùng loopCharacterAnimation chính thức của HanziWriter
      writerInstance.loopCharacterAnimation();
    } catch (e) {
      console.error('Error starting loop:', e);
    }
  }

  function initHanziWriter(char: string) {
    if (!writerContainer || typeof window === 'undefined') return;
    if (activeChar === char && writerInstance) return;

    activeChar = char;
    if (loopTimeout) {
      clearTimeout(loopTimeout);
      loopTimeout = null;
    }

    if (writerInstance) {
      try {
        if (writerInstance._renderState) {
          writerInstance._renderState.cancelAll();
        }
        writerInstance.pauseAnimation();
      } catch {}
      writerInstance = null;
    }
    writerContainer.innerHTML = '';

    // Lấy kích thước thực tế của khung lưới để chữ luôn cân đối chính giữa
    const boxSize = gridContainer ? Math.min(gridContainer.clientWidth, 290) : 270;
    const targetSize = boxSize > 100 ? boxSize : 270;

    try {
      writerInstance = HanziWriter.create(writerContainer, char, {
        width: targetSize,
        height: targetSize,
        padding: 18,
        showOutline: showOutline,
        strokeAnimationSpeed: 1.0,
        delayBetweenStrokes: 180,
        delayBetweenLoops: 1500,
        strokeColor: '#e11d48',    // Màu đỏ hồng cho animation nét bút thuận
        outlineColor: '#94a3b8',   // Màu xám mờ làm khuôn chữ
        drawingColor: '#e11d48',
        showCharacter: false
      });

      if (!hasUserDrawn && isLooping && !isPracticeMode) {
        writerInstance.loopCharacterAnimation();
      }
    } catch (e) {
      console.error('HanziWriter init error:', e);
    }
  }

  // Quản lý Canvas vẽ tay của người dùng
  function clearUserCanvas() {
    if (!canvasRef) return;
    const ctx = canvasRef.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
  }

  function handleReset() {
    clearUserCanvas();
    hasUserDrawn = false;
    startLoop();
  }

  function togglePracticeMode() {
    isPracticeMode = !isPracticeMode;
    if (isPracticeMode) {
      stopLoop();
    } else {
      clearUserCanvas();
      startLoop();
    }
  }

  function startDrawing(e: MouseEvent | TouchEvent) {
    if (!hasUserDrawn) {
      hasUserDrawn = true;
      stopLoop();
    }
    isDrawing = true;
    draw(e);
  }

  function stopDrawing() {
    isDrawing = false;
    if (!canvasRef) return;
    const ctx = canvasRef.getContext('2d');
    if (ctx) ctx.beginPath();
  }

  function draw(e: MouseEvent | TouchEvent) {
    if (!isDrawing || !canvasRef) return;
    const ctx = canvasRef.getContext('2d');
    if (!ctx) return;

    const rect = canvasRef.getBoundingClientRect();
    const scaleX = canvasRef.width / rect.width;
    const scaleY = canvasRef.height / rect.height;

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      e.preventDefault();
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#e11d48';

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  // Phát âm pinyin
  function speakPinyin(text: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  }

  $effect(() => {
    const char = currentChar;
    if (char && writerContainer && char !== activeChar) {
      clearUserCanvas();
      hasUserDrawn = false;
      isLooping = true;
      initHanziWriter(char);
    }
  });

  onMount(() => {
    if (currentChar && writerContainer) {
      initHanziWriter(currentChar);
    }
    return () => {
      stopLoop();
    };
  });
</script>

<div class="bg-white dark:bg-[#1E1F20] rounded-3xl border border-slate-200 dark:border-[#37393B] p-4 sm:p-5 shadow-xs space-y-4">
  <!-- 1. HÀNG TAB CHỌN KÝ TỰ (GÓC TRÊN BÊN TRÁI) -->
  {#if chars.length > 0}
    <div class="flex items-center gap-2">
      {#each chars as char, idx}
        <button
          onclick={() => {
            selectedCharIndex = idx;
          }}
          class={`px-3 py-1.5 min-w-[38px] text-base font-extrabold rounded-xl transition-all shadow-2xs ${
            selectedCharIndex === idx
              ? 'bg-[#1E293B] dark:bg-[#334155] text-white scale-102 ring-2 ring-slate-400/20'
              : 'bg-slate-100 dark:bg-[#282A2C] text-slate-700 dark:text-[#C4C7C5] hover:bg-slate-200 dark:hover:bg-[#37393B]'
          }`}
          title={`Xem chi tiết chữ ${char}`}
        >
          {char}
        </button>
      {/each}
    </div>
  {/if}

  <!-- 2. KHUNG LƯỚI 米字格 (CĂN GIỮA HOÀN HẢO CÓ NÚT ↺ GÓC TRÊN PHẢI) -->
  <div
    bind:this={gridContainer}
    class="relative w-full aspect-square max-w-[290px] sm:max-w-[310px] mx-auto rounded-3xl bg-slate-50/50 dark:bg-[#18191A] border-2 border-dashed border-red-300/60 dark:border-red-900/40 overflow-hidden flex items-center justify-center select-none touch-none shadow-inner"
  >
    <!-- Nét đứt chữ thập và đường chéo mễ tự cách -->
    <svg class="absolute inset-0 w-full h-full pointer-events-none stroke-red-200 dark:stroke-red-950 stroke-[1.2] stroke-dasharray-[4,4]">
      <line x1="50%" y1="0" x2="50%" y2="100%" />
      <line x1="0" y1="50%" x2="100%" y2="50%" />
      <line x1="0" y1="0" x2="100%" y2="100%" />
      <line x1="100%" y1="0" x2="0" y2="100%" />
    </svg>

    <!-- Nút tròn Phát lại mẫu (↺) cố định ở góc trên bên phải khung -->
    <button
      onclick={handleReset}
      aria-label="Phát lại mẫu"
      class="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 dark:bg-[#282A2C] dark:hover:bg-[#37393B] text-slate-700 dark:text-slate-200 flex items-center justify-center transition-all shadow-xs active:scale-90"
      title="Viết lại từ đầu theo nét bút thuận"
    >
      <ArrowsClockwise weight="bold" class="w-4 h-4" />
    </button>

    <!-- Layer 1: HanziWriter SVG (Căn giữa tuyệt đối trong khung) -->
    <div
      bind:this={writerContainer}
      class="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
    ></div>

    <!-- Layer 2: Canvas vẽ tay tương tác -->
    <canvas
      bind:this={canvasRef}
      width="310"
      height="310"
      class="relative z-20 w-full h-full cursor-crosshair"
      onmousedown={startDrawing}
      onmousemove={draw}
      onmouseup={stopDrawing}
      onmouseleave={stopDrawing}
      ontouchstart={startDrawing}
      ontouchmove={draw}
      ontouchend={stopDrawing}
    ></canvas>
  </div>

  <!-- 3. BẢNG THÔNG TIN CHI TIẾT HÁN TỰ (BÍNH ÂM, HÌNH THÁI, LỤC THƯ, BỘ, SỐ NÉT, NÉT BÚT) -->
  <div class="space-y-2 pt-1 text-[13px] md:text-sm text-slate-700 dark:text-[#C4C7C5]">
    <!-- Bính âm -->
    <div class="flex items-center gap-2">
      <span class="text-slate-500 dark:text-[#8E918F] font-medium">Bính âm:</span>
      <span class="font-extrabold text-slate-900 dark:text-white text-base">
        {charDetail.pinyin || '—'}
      </span>
      {#if charDetail.pinyin}
        <button
          onclick={() => speakPinyin(charDetail.pinyin)}
          aria-label="Nghe phát âm Bính âm"
          class="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          title="Nghe phát âm Bính âm"
        >
          <SpeakerHigh weight="bold" class="w-4 h-4" />
        </button>
      {/if}
    </div>

    <!-- Hình thái -->
    <div class="flex items-center gap-2">
      <span class="text-slate-500 dark:text-[#8E918F] font-medium">Hình thái:</span>
      <div class="flex items-center gap-1.5 font-bold text-slate-800 dark:text-[#E3E3E3]">
        <span class="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-[#282A2C] text-xs font-mono text-slate-600 dark:text-slate-300">
          {charDetail.structureIcon || '口'}
        </span>
        <span>{charDetail.components}</span>
      </div>
    </div>

    <!-- Lục thư -->
    <div class="flex items-center gap-2">
      <span class="text-slate-500 dark:text-[#8E918F] font-medium">Lục thư:</span>
      <span class="font-semibold text-slate-900 dark:text-white">
        {charDetail.liuShu || 'hội ý & hình thanh'}
      </span>
    </div>

    <!-- Bộ & Số nét -->
    <div class="flex items-center gap-3">
      <div class="flex items-center gap-1">
        <span class="text-slate-500 dark:text-[#8E918F] font-medium">Bộ:</span>
        <span class="font-bold text-slate-900 dark:text-white">
          {charDetail.radicalNameVi}
        </span>
        <span class="font-bold text-rose-600 dark:text-rose-400">
          {charDetail.radical}
        </span>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-slate-500 dark:text-[#8E918F] font-medium">Số nét:</span>
        <span class="font-bold text-slate-900 dark:text-white">
          {charDetail.strokeCount}
        </span>
      </div>
    </div>

    <!-- Nét bút -->
    <div class="flex items-start gap-2">
      <span class="text-slate-500 dark:text-[#8E918F] font-medium shrink-0">Nét bút:</span>
      <span class="font-mono font-bold text-slate-800 dark:text-[#E3E3E3] tracking-wider text-xs md:text-sm break-all">
        {charDetail.strokeSymbols}
      </span>
    </div>
  </div>

  <!-- 4. NÚT HÀNH ĐỘNG DƯỚI CÙNG -->
  <div class="pt-2">
    <button
      onclick={togglePracticeMode}
      class={`w-full py-2.5 sm:py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-98 shadow-xs ${
        isPracticeMode
          ? 'bg-amber-500 hover:bg-amber-600 text-white'
          : 'bg-slate-100 hover:bg-slate-200 dark:bg-[#282A2C] dark:hover:bg-[#37393B] text-slate-700 dark:text-[#E3E3E3]'
      }`}
    >
      <PencilLine weight="bold" class="w-4 h-4" />
      <span>{isPracticeMode ? 'Đang tập viết (Bấm để xem mẫu)' : 'Tập viết'}</span>
    </button>
  </div>
</div>

<script lang="ts">
  import { onMount } from 'svelte';
  import HanziWriter from 'hanzi-writer';
  import ArrowsClockwise from 'phosphor-svelte/lib/ArrowsClockwise';
  import PencilLine from 'phosphor-svelte/lib/PencilLine';
  import Eye from 'phosphor-svelte/lib/Eye';
  import Play from 'phosphor-svelte/lib/Play';
  import Pause from 'phosphor-svelte/lib/Pause';

  interface Props {
    hanzi: string;
    strokeCount?: number;
    radical?: string;
  }

  let { hanzi = '', strokeCount = 0, radical = '' }: Props = $props();

  // Tab chọn ký tự nếu từ có nhiều hơn 1 chữ
  let chars = $derived(Array.from(hanzi));
  let selectedCharIndex = $state(0);
  let currentChar = $derived(chars[selectedCharIndex] || chars[0] || '字');

  // DOM Container & Canvas
  let writerContainer = $state<HTMLDivElement | null>(null);
  let canvasRef = $state<HTMLCanvasElement | null>(null);

  // Trạng thái tương tác & vẽ
  let writerInstance: any = null;
  let isDrawing = $state(false);
  let hasUserDrawn = $state(false);
  let isLooping = $state(true);
  let showOutline = $state(true);
  let loopTimeout: any = null;

  function stopLoop() {
    isLooping = false;
    if (loopTimeout) {
      clearTimeout(loopTimeout);
      loopTimeout = null;
    }
    if (writerInstance) {
      try {
        writerInstance.cancelAnimation();
        // Giữ lại nét mờ xám mờ để người dùng tập vẽ
        writerInstance.showOutline();
        writerInstance.hideCharacter();
      } catch {}
    }
  }

  function startLoop() {
    isLooping = true;
    hasUserDrawn = false;
    runAnimationCycle();
  }

  function runAnimationCycle() {
    if (!writerInstance || !isLooping || hasUserDrawn) return;
    try {
      writerInstance.showOutline();
      writerInstance.animateCharacter({
        onComplete: () => {
          if (!isLooping || hasUserDrawn) return;
          // Nghỉ 1.2s rồi tự động lặp lại liên tục
          loopTimeout = setTimeout(() => {
            if (!isLooping || hasUserDrawn) return;
            try {
              writerInstance.hideCharacter();
              runAnimationCycle();
            } catch {}
          }, 1200);
        }
      });
    } catch {}
  }

  function initHanziWriter(char: string) {
    if (!writerContainer || typeof window === 'undefined') return;

    if (loopTimeout) {
      clearTimeout(loopTimeout);
      loopTimeout = null;
    }
    if (writerInstance) {
      try {
        writerInstance.cancelAnimation();
      } catch {}
      writerInstance = null;
    }
    writerContainer.innerHTML = '';

    // Khởi tạo HanziWriter với màu sắc chuẩn mực
    try {
      writerInstance = HanziWriter.create(writerContainer, char, {
        width: 300,
        height: 300,
        padding: 20,
        showOutline: showOutline,
        strokeAnimationSpeed: 1.2,
        delayBetweenStrokes: 150,
        strokeColor: '#e11d48', // Màu đỏ hồng khi animation viết mẫu
        outlineColor: '#94a3b8', // Màu xám mờ làm khuôn vẽ
        drawingColor: '#e11d48',
        showCharacter: false,
        onLoadCharDataError: () => {
          // Fallback nếu mất mạng
        }
      });

      // Nếu người dùng chưa vẽ, tự động chạy loop liên tục
      if (!hasUserDrawn && isLooping) {
        // Cho một khoảng nhỏ để DOM ổn định
        setTimeout(() => {
          runAnimationCycle();
        }, 100);
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

  function startDrawing(e: MouseEvent | TouchEvent) {
    // Ngay khi người dùng đặt nét vẽ vào: DỪNG ANIMATION, giữ lại khuôn xám mờ để người học tự vẽ
    if (!hasUserDrawn || isLooping) {
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

    // Giảm nét stroke vẽ tay lại tầm 15 theo đúng yêu cầu
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#e11d48'; // rose-600

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function toggleOutline() {
    showOutline = !showOutline;
    if (writerInstance) {
      if (showOutline) {
        writerInstance.showOutline();
      } else {
        writerInstance.hideOutline();
      }
    }
  }

  // Khởi tạo và phản ứng khi đổi chữ
  $effect(() => {
    if (currentChar && writerContainer) {
      clearUserCanvas();
      hasUserDrawn = false;
      isLooping = true;
      initHanziWriter(currentChar);
    }
  });

  onMount(() => {
    if (currentChar && writerContainer) {
      initHanziWriter(currentChar);
    }
    return () => {
      if (loopTimeout) clearTimeout(loopTimeout);
      if (writerInstance) {
        try {
          writerInstance.cancelAnimation();
        } catch {}
      }
    };
  });
</script>

<div class="bg-white dark:bg-[#1E1F20] rounded-3xl border border-slate-200 dark:border-[#37393B] p-4 sm:p-5 shadow-sm space-y-4">
  <div class="flex items-center justify-between border-b border-slate-100 dark:border-[#282A2C] pb-3">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-sm">
        <PencilLine weight="duotone" class="w-4 h-4" />
      </div>
      <div>
        <h3 class="text-sm font-extrabold text-slate-800 dark:text-[#E3E3E3]">Tập viết & Cấu trúc</h3>
        <p class="text-[11px] text-slate-400 dark:text-[#8E918F]">Bút thuận SVG chuẩn MakeMeAHanzi</p>
      </div>
    </div>

    <!-- Thông số nét & bộ thủ -->
    <div class="flex items-center gap-2 text-xs">
      {#if radical}
        <span class="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-bold border border-amber-200/50 dark:border-amber-900/40">
          Bộ: {radical}
        </span>
      {/if}
      {#if strokeCount > 0}
        <span class="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 font-bold border border-blue-200/50 dark:border-blue-900/40">
          {strokeCount} nét
        </span>
      {/if}
    </div>
  </div>

  <!-- Bộ chọn từng chữ nếu là từ ghép -->
  {#if chars.length > 1}
    <div class="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-[#282A2C] rounded-xl">
      {#each chars as char, idx}
        <button
          onclick={() => {
            selectedCharIndex = idx;
          }}
          class={`flex-1 py-1.5 text-sm font-bold rounded-lg transition-all ${
            selectedCharIndex === idx
              ? 'bg-white dark:bg-[#1E1F20] text-rose-600 dark:text-rose-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          {char}
        </button>
      {/each}
    </div>
  {/if}

  <!-- Khung Lưới 米字格 chứa HanziWriter SVG + User Canvas Overlay -->
  <div class="relative w-full aspect-square max-w-[310px] sm:max-w-[330px] mx-auto rounded-3xl bg-amber-50/20 dark:bg-[#18191A] border-2 border-dashed border-red-300/60 dark:border-red-900/40 overflow-hidden flex items-center justify-center select-none touch-none shadow-inner">
    <!-- Nét đứt chữ thập và đường chéo mễ tự cách -->
    <svg class="absolute inset-0 w-full h-full pointer-events-none stroke-red-200 dark:stroke-red-950 stroke-[1.5] stroke-dasharray-[4,4]">
      <line x1="50%" y1="0" x2="50%" y2="100%" />
      <line x1="0" y1="50%" x2="100%" y2="50%" />
      <line x1="0" y1="0" x2="100%" y2="100%" />
      <line x1="100%" y1="0" x2="0" y2="100%" />
    </svg>

    <!-- Layer 1: HanziWriter SVG Target (Chạy animation nét bút thuận / Hiển thị nét mờ xám) -->
    <div
      bind:this={writerContainer}
      class="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-90"
    ></div>

    <!-- Layer 2: Canvas vẽ tay tương tác (Nét bút 15) -->
    <canvas
      bind:this={canvasRef}
      width="320"
      height="320"
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

  <!-- Nút điều khiển -->
  <div class="flex items-center justify-between gap-2 pt-1 flex-wrap">
    <div class="flex items-center gap-1.5">
      <button
        onclick={() => {
          if (isLooping) {
            stopLoop();
          } else {
            clearUserCanvas();
            startLoop();
          }
        }}
        class={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all shadow-xs active:scale-95 ${
          isLooping
            ? 'bg-amber-500 hover:bg-amber-600 text-white'
            : 'bg-rose-500 hover:bg-rose-600 text-white'
        }`}
        title={isLooping ? 'Tạm dừng animation viết mẫu' : 'Bật viết mẫu lặp lại'}
      >
        {#if isLooping}
          <Pause weight="fill" class="w-3.5 h-3.5" />
          <span>Tạm dừng</span>
        {:else}
          <Play weight="fill" class="w-3.5 h-3.5" />
          <span>Viết mẫu</span>
        {/if}
      </button>

      <button
        onclick={toggleOutline}
        class={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
          showOutline
            ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/40'
            : 'bg-slate-100 dark:bg-[#282A2C] text-slate-500 border-transparent'
        }`}
      >
        <Eye weight="bold" class="w-3.5 h-3.5" />
        <span>{showOutline ? 'Ẩn mẫu' : 'Hiện mẫu'}</span>
      </button>
    </div>

    <button
      onclick={handleReset}
      class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-[#282A2C] hover:bg-slate-200 dark:hover:bg-[#37393B] text-slate-700 dark:text-[#E3E3E3] border border-slate-200/60 dark:border-[#37393B] transition-all active:scale-95"
    >
      <ArrowsClockwise weight="bold" class="w-3.5 h-3.5 text-slate-500" />
      <span>Xóa viết lại</span>
    </button>
  </div>
</div>

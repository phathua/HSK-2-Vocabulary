<script lang="ts">
  import { onMount } from 'svelte';
  import ArrowsClockwise from 'phosphor-svelte/lib/ArrowsClockwise';
  import PencilLine from 'phosphor-svelte/lib/PencilLine';
  import Eye from 'phosphor-svelte/lib/Eye';
  import Play from 'phosphor-svelte/lib/Play';

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

  // Canvas vẽ tay
  let canvasRef = $state<HTMLCanvasElement | null>(null);
  let isDrawing = $state(false);
  let showOutline = $state(true);
  let isAnimating = $state(false);
  let animTimer: any = null;

  function clearCanvas() {
    if (animTimer) {
      clearInterval(animTimer);
      animTimer = null;
    }
    isAnimating = false;
    if (!canvasRef) return;
    const ctx = canvasRef.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
  }

  // Animation mô phỏng viết mẫu từng nét chữ
  function playStrokeAnimation() {
    if (!canvasRef) return;
    const ctx = canvasRef.getContext('2d');
    if (!ctx) return;

    clearCanvas();
    isAnimating = true;

    // Mô phỏng nét viết động theo hiệu ứng quét nét từ trên xuống dưới / trái sang phải
    let step = 0;
    const totalSteps = 45;
    animTimer = setInterval(() => {
      step++;
      ctx.clearRect(0, 0, canvasRef!.width, canvasRef!.height);

      ctx.save();
      ctx.beginPath();
      // Reveal mask từ trên xuống theo tỉ lệ step / totalSteps
      const clipHeight = (canvasRef!.height * step) / totalSteps;
      ctx.rect(0, 0, canvasRef!.width, clipHeight);
      ctx.clip();

      // Vẽ chữ mẫu bằng màu đỏ nổi bật (mô phỏng nét bút)
      ctx.fillStyle = '#e11d48';
      ctx.font = '220px Kaiti, STKaiti, KaiTi, 楷体, serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(currentChar, canvasRef!.width / 2, canvasRef!.height / 2 + 10);
      ctx.restore();

      if (step >= totalSteps) {
        clearInterval(animTimer);
        animTimer = null;
        isAnimating = false;
      }
    }, 30);
  }

  function startDrawing(e: MouseEvent | TouchEvent) {
    // Nếu đang chạy demo animation thì dừng và trả lại như cũ để người dùng vẽ
    if (isAnimating || animTimer) {
      clearCanvas();
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

    // Nét bút x2 đậm rõ nét hơn (lineWidth 20)
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#e11d48'; // rose-600

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  $effect(() => {
    // Khi đổi chữ hoặc đổi từ, tự động clear canvas
    if (currentChar) {
      clearCanvas();
    }
  });
</script>

<div class="bg-white dark:bg-[#1E1F20] rounded-3xl border border-slate-200 dark:border-[#37393B] p-5 shadow-sm space-y-4">
  <div class="flex items-center justify-between border-b border-slate-100 dark:border-[#282A2C] pb-3">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-sm">
        <PencilLine weight="duotone" class="w-4 h-4" />
      </div>
      <div>
        <h3 class="text-sm font-extrabold text-slate-800 dark:text-[#E3E3E3]">Tập viết & Cấu trúc</h3>
        <p class="text-[11px] text-slate-400 dark:text-[#8E918F]">Lưới Mễ tự cách (米字格)</p>
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
          onclick={() => (selectedCharIndex = idx)}
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

  <!-- Khung Canvas Lưới 米字格 (Mở rộng kích thước chuẩn đẹp) -->
  <div class="relative w-full aspect-square max-w-[320px] sm:max-w-[340px] mx-auto rounded-3xl bg-amber-50/20 dark:bg-[#18191A] border-2 border-dashed border-red-300/60 dark:border-red-900/40 overflow-hidden flex items-center justify-center select-none touch-none shadow-inner">
    <!-- Nét đứt chữ thập và đường chéo mễ tự cách -->
    <svg class="absolute inset-0 w-full h-full pointer-events-none stroke-red-200 dark:stroke-red-950 stroke-[1.5] stroke-dasharray-[4,4]">
      <line x1="50%" y1="0" x2="50%" y2="100%" />
      <line x1="0" y1="50%" x2="100%" y2="50%" />
      <line x1="0" y1="0" x2="100%" y2="100%" />
      <line x1="100%" y1="0" x2="0" y2="100%" />
    </svg>

    <!-- Chữ mẫu mờ phía dưới phóng to x2 rõ nét theo yêu cầu -->
    {#if showOutline}
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span class="text-[10rem] sm:text-[12rem] leading-none font-kai text-slate-400/40 dark:text-slate-500/40 select-none drop-shadow-xs">
          {currentChar}
        </span>
      </div>
    {/if}

    <!-- Canvas vẽ -->
    <canvas
      bind:this={canvasRef}
      width="340"
      height="340"
      class="relative z-10 w-full h-full cursor-crosshair"
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
        onclick={playStrokeAnimation}
        disabled={isAnimating}
        class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-rose-500 hover:bg-rose-600 text-white transition-all shadow-xs active:scale-95 disabled:opacity-50"
      >
        <Play weight="fill" class="w-3.5 h-3.5" />
        <span>{isAnimating ? 'Đang viết...' : 'Viết mẫu'}</span>
      </button>

      <button
        onclick={() => (showOutline = !showOutline)}
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
      onclick={clearCanvas}
      class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-[#282A2C] hover:bg-slate-200 dark:hover:bg-[#37393B] text-slate-700 dark:text-[#E3E3E3] border border-slate-200/60 dark:border-[#37393B] transition-all active:scale-95"
    >
      <ArrowsClockwise weight="bold" class="w-3.5 h-3.5 text-slate-500" />
      <span>Xóa viết lại</span>
    </button>
  </div>
</div>

<style>
  .font-kai {
    font-family: 'Kaiti', 'STKaiti', 'KaiTi', '楷体', serif;
  }
</style>

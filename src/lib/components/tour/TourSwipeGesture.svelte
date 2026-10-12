<script lang="ts">
  import HandPointing from 'phosphor-svelte/lib/HandPointing';
  import Check from 'phosphor-svelte/lib/Check';
  import X from 'phosphor-svelte/lib/X';

  let {
    targetRect
  }: {
    targetRect: { x: number; y: number; width: number; height: number; radius: number };
  } = $props();
</script>

<!-- Swipe Gesture Indicator Overlay over Flashcard -->
<div
  class="fixed pointer-events-none z-[186] flex flex-col items-center justify-center select-none"
  style="
    left: {targetRect.x}px;
    top: {targetRect.y}px;
    width: {targetRect.width}px;
    height: {targetRect.height}px;
  "
  aria-hidden="true"
>
  <!-- Background Gesture Canvas: Pills & Guide track -->
  <div class="relative w-full max-w-[340px] sm:max-w-[380px] h-36 flex items-center justify-center">
    
    <!-- Left Pill: Quên (Vuốt trái) -->
    <div
      class="pill-left absolute left-2 sm:left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-rose-500/90 dark:bg-rose-950/90 text-white text-xs sm:text-sm font-black border-2 border-rose-400 dark:border-rose-600 shadow-lg backdrop-blur-xs select-none"
    >
      <X size={16} weight="bold" />
      <span>Quên (Trái)</span>
    </div>

    <!-- Center Swipe Track Guide (Dashed line with directional arrows) -->
    <div class="w-48 sm:w-56 h-0.5 border-b-2 border-dashed border-white/50 dark:border-white/30 flex items-center justify-between px-1">
      <span class="text-xs text-rose-300 font-bold -translate-y-0.5">◀</span>
      <div class="w-2 h-2 rounded-full bg-white/70 shadow-xs"></div>
      <span class="text-xs text-emerald-300 font-bold -translate-y-0.5">▶</span>
    </div>

    <!-- Right Pill: Thuộc (Vuốt phải) -->
    <div
      class="pill-right absolute right-2 sm:right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-emerald-500/90 dark:bg-emerald-950/90 text-white text-xs sm:text-sm font-black border-2 border-emerald-400 dark:border-emerald-600 shadow-lg backdrop-blur-xs select-none"
    >
      <span>Thuộc (Phải)</span>
      <Check size={16} weight="bold" />
    </div>

    <!-- Touch Down Ripple Rings at Center -->
    <div class="ripple-ring-right absolute pointer-events-none w-16 h-16 rounded-full border-2 border-blue-400/80 bg-blue-400/20"></div>
    <div class="ripple-ring-left absolute pointer-events-none w-16 h-16 rounded-full border-2 border-blue-400/80 bg-blue-400/20"></div>

    <!-- Animated Hand Pointer -->
    <div class="hand-actor absolute flex flex-col items-center justify-center">
      <div class="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-[0_12px_28px_rgba(37,99,235,0.55)] border-2 border-white ring-4 ring-blue-500/35">
        <HandPointing size={28} weight="fill" class="text-white drop-shadow-sm -translate-y-0.5" />
      </div>
      <div class="mt-1 px-2 py-0.5 rounded-md bg-slate-900/80 text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
        Vuốt thẻ
      </div>
    </div>

  </div>
</div>

<style>
  /* 1. Animation ngón tay chạm và vuốt trái phải liên tục */
  .hand-actor {
    animation: swipeHandLoop 3.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    will-change: transform, opacity;
  }

  @keyframes swipeHandLoop {
    0% {
      transform: translate3d(0, 0, 0) scale(1);
      opacity: 0.9;
    }
    8% {
      /* Chạm ngón tay xuống (Tap effect) */
      transform: translate3d(0, 0, 0) scale(0.82);
      opacity: 1;
    }
    14% {
      /* Bắt đầu lướt sang phải */
      transform: translate3d(24px, 0, 0) scale(0.85) rotate(6deg);
      opacity: 1;
    }
    34% {
      /* Lướt tới đỉnh mép phải */
      transform: translate3d(105px, 0, 0) scale(0.85) rotate(14deg);
      opacity: 1;
    }
    40% {
      /* Nhấc ngón tay lên */
      transform: translate3d(115px, -8px, 0) scale(1.06) rotate(6deg);
      opacity: 0.7;
    }
    46% {
      /* Biến mất khi quay về giữa */
      transform: translate3d(30px, 0, 0) scale(1);
      opacity: 0;
    }
    52% {
      /* Xuất hiện lại ở tâm */
      transform: translate3d(0, 0, 0) scale(1);
      opacity: 0.9;
    }
    58% {
      /* Chạm ngón tay xuống lần 2 (Tap effect) */
      transform: translate3d(0, 0, 0) scale(0.82);
      opacity: 1;
    }
    64% {
      /* Bắt đầu lướt sang trái */
      transform: translate3d(-24px, 0, 0) scale(0.85) rotate(-6deg);
      opacity: 1;
    }
    84% {
      /* Lướt tới đỉnh mép trái */
      transform: translate3d(-105px, 0, 0) scale(0.85) rotate(-14deg);
      opacity: 1;
    }
    90% {
      /* Nhấc ngón tay lên */
      transform: translate3d(-115px, -8px, 0) scale(1.06) rotate(-6deg);
      opacity: 0.7;
    }
    94% {
      /* Biến mất khi quay về giữa */
      transform: translate3d(-30px, 0, 0) scale(1);
      opacity: 0;
    }
    100% {
      transform: translate3d(0, 0, 0) scale(1);
      opacity: 0.9;
    }
  }

  /* 2. Hiệu ứng sóng chạm (Ripple) */
  .ripple-ring-right {
    animation: rippleRight 3.4s ease-out infinite;
  }
  @keyframes rippleRight {
    0%, 6% {
      transform: scale(0.3);
      opacity: 0;
    }
    8% {
      transform: scale(0.4);
      opacity: 0.9;
    }
    20% {
      transform: scale(1.9);
      opacity: 0;
    }
    100% {
      transform: scale(1.9);
      opacity: 0;
    }
  }

  .ripple-ring-left {
    animation: rippleLeft 3.4s ease-out infinite;
  }
  @keyframes rippleLeft {
    0%, 56% {
      transform: scale(0.3);
      opacity: 0;
    }
    58% {
      transform: scale(0.4);
      opacity: 0.9;
    }
    70% {
      transform: scale(1.9);
      opacity: 0;
    }
    100% {
      transform: scale(1.9);
      opacity: 0;
    }
  }

  /* 3. Hiệu ứng sáng rực ở Pill Thuộc & Pill Quên đồng bộ với cử chỉ vuốt */
  .pill-right {
    animation: glowRightPill 3.4s ease-in-out infinite;
  }
  @keyframes glowRightPill {
    0%, 14% {
      transform: scale(1);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
      border-color: rgba(52, 211, 153, 0.6);
    }
    24%, 38% {
      transform: scale(1.08);
      box-shadow: 0 0 24px rgba(16, 185, 129, 0.7);
      border-color: rgba(16, 185, 129, 1);
    }
    48%, 100% {
      transform: scale(1);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
      border-color: rgba(52, 211, 153, 0.6);
    }
  }

  .pill-left {
    animation: glowLeftPill 3.4s ease-in-out infinite;
  }
  @keyframes glowLeftPill {
    0%, 64% {
      transform: scale(1);
      box-shadow: 0 4px 12px rgba(244, 63, 94, 0.2);
      border-color: rgba(251, 113, 133, 0.6);
    }
    74%, 88% {
      transform: scale(1.08);
      box-shadow: 0 0 24px rgba(244, 63, 94, 0.7);
      border-color: rgba(244, 63, 94, 1);
    }
    96%, 100% {
      transform: scale(1);
      box-shadow: 0 4px 12px rgba(244, 63, 94, 0.2);
      border-color: rgba(251, 113, 133, 0.6);
    }
  }
</style>

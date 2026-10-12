<script lang="ts">
  import HandPointing from 'phosphor-svelte/lib/HandPointing';

  let {
    targetRect
  }: {
    targetRect: { x: number; y: number; width: number; height: number; radius: number };
  } = $props();
</script>

<!-- Minimalist Hand Gesture Overlay synchronized with Card Swipe -->
<div
  class="fixed pointer-events-none z-[186] flex items-center justify-center select-none"
  style="
    left: {targetRect.x}px;
    top: {targetRect.y}px;
    width: {targetRect.width}px;
    height: {targetRect.height}px;
  "
  aria-hidden="true"
>
  <div class="relative w-full h-full flex items-center justify-center">
    <!-- Touch Point Ripple Waves -->
    <div class="touch-ripple-right absolute pointer-events-none w-14 h-14 rounded-full border-2 border-white/70 bg-white/15"></div>
    <div class="touch-ripple-left absolute pointer-events-none w-14 h-14 rounded-full border-2 border-white/70 bg-white/15"></div>

    <!-- Minimalist Gesture Hand (Line-art aesthetic inspired by UI gesture standards) -->
    <div class="gesture-hand-wrapper absolute flex flex-col items-center justify-center">
      <!-- Directional Action Cues (Nổi phía trên ngón tay, không đè lên chữ phía dưới) -->
      <div class="absolute -top-7 flex items-center justify-center h-6 w-36 pointer-events-none z-10">
        <span class="cue-pill cue-like absolute px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-950/90 border border-emerald-500/60 shadow-lg whitespace-nowrap">
          Vuốt phải ➔ Thuộc
        </span>
        <span class="cue-pill cue-nope absolute px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-rose-300 bg-rose-950/90 border border-rose-500/60 shadow-lg whitespace-nowrap">
          Vuốt trái ➔ Quên
        </span>
      </div>

      <div class="relative flex items-center justify-center">
        <!-- Finger tip touch glow -->
        <span class="finger-glow absolute -top-1 w-5 h-5 rounded-full bg-blue-400/40 blur-xs"></span>
        <HandPointing
          size={46}
          weight="duotone"
          class="text-white drop-shadow-[0_10px_22px_rgba(0,0,0,0.65)] filter transition-transform"
        />
      </div>
    </div>
  </div>
</div>

<style>
  .cue-like {
    animation: cueLikeAnim 3.4s ease-in-out infinite;
  }
  @keyframes cueLikeAnim {
    0%, 12% {
      opacity: 0;
      transform: translateY(4px) scale(0.95);
    }
    20%, 36% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    44%, 100% {
      opacity: 0;
      transform: translateY(4px) scale(0.95);
    }
  }

  .cue-nope {
    animation: cueNopeAnim 3.4s ease-in-out infinite;
  }
  @keyframes cueNopeAnim {
    0%, 60% {
      opacity: 0;
      transform: translateY(4px) scale(0.95);
    }
    68%, 84% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    92%, 100% {
      opacity: 0;
      transform: translateY(4px) scale(0.95);
    }
  }
  /* Synchronization: 3.4s cubic-bezier(0.4, 0, 0.2, 1) matching FlashcardDeck tourCardSwipe */
  .gesture-hand-wrapper {
    animation: handSwipeGesture 3.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    will-change: transform, opacity;
  }

  @keyframes handSwipeGesture {
    0%, 8% {
      transform: translate3d(0, 0, 0) scale(1);
      opacity: 0.95;
    }
    14% {
      /* Touch down & drag right */
      transform: translate3d(20px, -1px, 0) scale(0.9) rotate(3deg);
      opacity: 1;
    }
    30% {
      /* Full right swipe */
      transform: translate3d(75px, -6px, 0) scale(0.9) rotate(7deg);
      opacity: 1;
    }
    38% {
      /* Lift finger up */
      transform: translate3d(85px, -12px, 0) scale(1.04) rotate(4deg);
      opacity: 0.85;
    }
    48%, 56% {
      /* Glide back to center */
      transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
      opacity: 0.95;
    }
    62% {
      /* Touch down & drag left */
      transform: translate3d(-20px, -1px, 0) scale(0.9) rotate(-3deg);
      opacity: 1;
    }
    78% {
      /* Full left swipe */
      transform: translate3d(-75px, -6px, 0) scale(0.9) rotate(-7deg);
      opacity: 1;
    }
    86% {
      /* Lift finger up */
      transform: translate3d(-85px, -12px, 0) scale(1.04) rotate(-4deg);
      opacity: 0.85;
    }
    96%, 100% {
      /* Glide back to center */
      transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
      opacity: 0.95;
    }
  }

  /* Ripple Waves at touch points */
  .touch-ripple-right {
    animation: rippleRightPulse 3.4s ease-out infinite;
  }
  @keyframes rippleRightPulse {
    0%, 7% {
      transform: scale(0.2);
      opacity: 0;
    }
    8% {
      transform: scale(0.35);
      opacity: 0.9;
    }
    20% {
      transform: scale(1.8);
      opacity: 0;
    }
    100% {
      transform: scale(1.8);
      opacity: 0;
    }
  }

  .touch-ripple-left {
    animation: rippleLeftPulse 3.4s ease-out infinite;
  }
  @keyframes rippleLeftPulse {
    0%, 55% {
      transform: scale(0.2);
      opacity: 0;
    }
    56% {
      transform: scale(0.35);
      opacity: 0.9;
    }
    68% {
      transform: scale(1.8);
      opacity: 0;
    }
    100% {
      transform: scale(1.8);
      opacity: 0;
    }
  }

  .finger-glow {
    animation: fingerGlowPulse 3.4s ease-in-out infinite;
  }
  @keyframes fingerGlowPulse {
    0%, 6% {
      opacity: 0.3;
    }
    8%, 34% {
      opacity: 0.95;
      background-color: rgba(52, 211, 153, 0.6);
    }
    38%, 54% {
      opacity: 0.3;
    }
    56%, 82% {
      opacity: 0.95;
      background-color: rgba(251, 113, 133, 0.6);
    }
    86%, 100% {
      opacity: 0.3;
    }
  }
</style>

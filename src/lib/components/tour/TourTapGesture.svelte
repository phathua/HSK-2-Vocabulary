<script lang="ts">
  import HandPointing from 'phosphor-svelte/lib/HandPointing';

  let {
    targetRect
  }: {
    targetRect: { x: number; y: number; width: number; height: number; radius: number };
  } = $props();
</script>

<!-- Minimalist Tap Gesture Overlay synchronized with Card Flip -->
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
  <div class="relative w-full h-full flex flex-col items-center justify-center">
    <!-- Touch Tap Ripple Wave -->
    <div class="touch-ripple-tap absolute pointer-events-none w-16 h-16 rounded-full border-2 border-white/70 bg-white/20"></div>

    <!-- Minimalist Gesture Hand -->
    <div class="gesture-tap-hand absolute flex flex-col items-center justify-center">
      <!-- Action badge (Nổi phía trên ngón tay) -->
      <span class="tap-hint-pill absolute -top-7 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-blue-300 bg-slate-950/90 border border-blue-500/60 shadow-lg whitespace-nowrap">
        Chạm để lật thẻ
      </span>

      <div class="relative flex items-center justify-center">
        <!-- Finger tip touch glow -->
        <span class="finger-tap-glow absolute -top-1 w-5 h-5 rounded-full bg-blue-400/50 blur-xs"></span>
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
  .gesture-tap-hand {
    animation: handTapAnim 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    will-change: transform, opacity;
  }

  @keyframes handTapAnim {
    0%, 8% {
      transform: translate3d(0, 0, 0) scale(1);
      opacity: 0.95;
    }
    12% {
      /* Press down firmly */
      transform: translate3d(0, 6px, 0) scale(0.86);
      opacity: 1;
    }
    18% {
      /* Lift up */
      transform: translate3d(0, -6px, 0) scale(1.04);
      opacity: 0.9;
    }
    28%, 56% {
      /* Hover while card shows back face */
      transform: translate3d(0, 0, 0) scale(1);
      opacity: 0.6;
    }
    60% {
      /* Press down again to flip back */
      transform: translate3d(0, 6px, 0) scale(0.86);
      opacity: 1;
    }
    66% {
      /* Lift up */
      transform: translate3d(0, -6px, 0) scale(1.04);
      opacity: 0.9;
    }
    76%, 100% {
      /* Return to rest */
      transform: translate3d(0, 0, 0) scale(1);
      opacity: 0.95;
    }
  }

  .touch-ripple-tap {
    animation: rippleTapAnim 3.2s ease-out infinite;
  }

  @keyframes rippleTapAnim {
    0%, 10% {
      transform: scale(0.3);
      opacity: 0;
    }
    12% {
      transform: scale(0.5);
      opacity: 0.9;
    }
    24% {
      transform: scale(1.8);
      opacity: 0;
    }
    50%, 58% {
      transform: scale(0.3);
      opacity: 0;
    }
    60% {
      transform: scale(0.5);
      opacity: 0.9;
    }
    72% {
      transform: scale(1.8);
      opacity: 0;
    }
    75%, 100% {
      transform: scale(0.3);
      opacity: 0;
    }
  }

  .finger-tap-glow {
    animation: fingerTapGlowAnim 3.2s ease-in-out infinite;
  }

  @keyframes fingerTapGlowAnim {
    0%, 10% {
      opacity: 0.3;
    }
    12%, 18% {
      opacity: 1;
    }
    20%, 58% {
      opacity: 0.3;
    }
    60%, 66% {
      opacity: 1;
    }
    68%, 100% {
      opacity: 0.3;
    }
  }

  .tap-hint-pill {
    animation: tapPillAnim 3.2s ease-in-out infinite;
  }

  @keyframes tapPillAnim {
    0%, 18% {
      opacity: 1;
    }
    28%, 52% {
      opacity: 0.4;
    }
    60%, 100% {
      opacity: 1;
    }
  }
</style>

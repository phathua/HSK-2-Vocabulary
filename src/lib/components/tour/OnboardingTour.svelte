<script lang="ts">
  import { onMount } from 'svelte';
  import { scale } from 'svelte/transition';
  import { tourState } from '#lib/state/tourState.svelte';
  import CaretRight from 'phosphor-svelte/lib/CaretRight';
  import CaretLeft from 'phosphor-svelte/lib/CaretLeft';
  import Check from 'phosphor-svelte/lib/Check';
  import X from 'phosphor-svelte/lib/X';
  import TourSwipeGesture from './TourSwipeGesture.svelte';

  let popoverEl = $state<HTMLDivElement | null>(null);

  function handleKeyDown(e: KeyboardEvent) {
    if (!tourState.isActive) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      tourState.skipTour(true);
    } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
      e.preventDefault();
      tourState.nextStep();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      tourState.prevStep();
    }
  }

  function handleBackdropClick(e: MouseEvent) {
    e.stopPropagation();
  }

  onMount(() => {
    let rafId: number | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let currentObservedEl: Element | null = null;

    function update(actualHeight?: number, actualWidth?: number) {
      if (!tourState.isActive) return;
      const height = actualHeight ?? popoverEl?.offsetHeight;
      const width = actualWidth ?? popoverEl?.offsetWidth;
      tourState.refreshPosition(height, width);
    }

    function handleUpdate() {
      if (!tourState.isActive) return;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        update();
      });
    }

    window.addEventListener('scroll', handleUpdate, { capture: true, passive: true });
    window.addEventListener('resize', handleUpdate, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    $effect(() => {
      if (tourState.isActive && tourState.currentStep) {
        const el = tourState.resolveTargetElement(tourState.currentStep);
        const incEl = tourState.resolveIncludeElement(tourState.currentStep);
        if (el && el !== currentObservedEl) {
          if (resizeObserver) {
            resizeObserver.disconnect();
          }
          currentObservedEl = el;
          resizeObserver = new ResizeObserver(() => {
            handleUpdate();
          });
          resizeObserver.observe(el);
          if (incEl) {
            resizeObserver.observe(incEl);
          }
        }

        let startTime = performance.now();
        function settleLoop(time: number) {
          if (!tourState.isActive) return;
          handleUpdate();
          if (time - startTime < 350) {
            requestAnimationFrame(settleLoop);
          }
        }
        requestAnimationFrame(settleLoop);
      } else {
        if (resizeObserver) {
          resizeObserver.disconnect();
          currentObservedEl = null;
        }
      }
    });

    $effect(() => {
      if (popoverEl) {
        const observer = new ResizeObserver((entries) => {
          for (const entry of entries) {
            const h = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
            const w = entry.borderBoxSize?.[0]?.inlineSize ?? entry.contentRect.width;
            update(h, w);
          }
        });
        observer.observe(popoverEl);
        return () => observer.disconnect();
      }
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (resizeObserver && currentObservedEl) {
        resizeObserver.unobserve(currentObservedEl);
      }
      window.removeEventListener('scroll', handleUpdate, { capture: true });
      window.removeEventListener('resize', handleUpdate);
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>

{#if tourState.isActive && tourState.currentStep}
  <!-- 1. SVG Cutout Mask Overlay -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <svg
    class="fixed inset-0 w-full h-full z-[180] pointer-events-auto touch-none select-none transition-opacity duration-300"
    onclick={handleBackdropClick}
    role="presentation"
    aria-hidden="true"
  >
    <defs>
      <mask id="tour-spotlight-mask">
        <rect width="100%" height="100%" fill="white" />
        {#if tourState.targetRect}
          <rect
            x={tourState.targetRect.x}
            y={tourState.targetRect.y}
            width={tourState.targetRect.width}
            height={tourState.targetRect.height}
            rx={tourState.targetRect.radius}
            ry={tourState.targetRect.radius}
            fill="black"
            class="tour-cutout-rect"
          />
        {/if}
      </mask>
    </defs>
    <rect
      width="100%"
      height="100%"
      fill="rgba(0, 0, 0, 0.65)"
      mask="url(#tour-spotlight-mask)"
    />
  </svg>

  <!-- 2. Glowing Halo Ring around Target Element -->
  {#if tourState.targetRect}
    <div
      class="fixed pointer-events-none z-[185] border-2 border-blue-500 ring-4 ring-blue-500/25 shadow-[0_0_28px_rgba(59,130,246,0.45)] tour-halo-ring"
      style="
        left: {tourState.targetRect.x}px;
        top: {tourState.targetRect.y}px;
        width: {tourState.targetRect.width}px;
        height: {tourState.targetRect.height}px;
        border-radius: {tourState.targetRect.radius}px;
      "
    ></div>
  {/if}

  <!-- 2.5. Interactive Gesture Animation (Vuốt thẻ flashcard trái / phải) -->
  {#if tourState.targetRect && (tourState.currentStep.gesture === 'swipe-horizontal' || tourState.currentStep.id === 'flash-card-swipe' || tourState.currentStep.id === 'flash-mode')}
    <TourSwipeGesture targetRect={tourState.targetRect} />
  {/if}

  <!-- 3. Soft Flat 2.0 Tour Popover Card -->
  {#if tourState.popoverPos}
    <div
      bind:this={popoverEl}
      class="fixed z-[190] w-[calc(100vw-32px)] max-w-[360px] sm:max-w-[420px] pointer-events-auto rounded-3xl p-4 sm:p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] bg-white dark:bg-[#1B1B1B] border border-slate-200/90 dark:border-[#282A2C] transition-all duration-300 ease-out"
      style="
        top: {tourState.popoverPos.top}px;
        left: {tourState.popoverPos.left}px;
      "
      transition:scale={{ start: 0.95, duration: 200 }}
    >
      <div class="relative z-10 flex flex-col gap-3">
        <!-- Header: Step badge and Skip button -->
        <div class="flex items-center justify-between">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-600/10 text-blue-600 dark:text-blue-400">
            Bước {tourState.currentStepIndex + 1} / {tourState.totalSteps}
          </span>

          <button
            type="button"
            class="text-xs font-semibold text-slate-400 hover:text-slate-700 dark:hover:text-[#E3E3E3] transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-[#282A2C] flex items-center gap-1"
            onclick={() => tourState.skipTour(true)}
            title="Bỏ qua hướng dẫn"
          >
            <span>Bỏ qua</span>
            <X size={12} weight="bold" />
          </button>
        </div>

        <!-- Step Body: Mascot Illustration + Content -->
        <div class="flex items-center gap-3.5 sm:gap-4 min-w-0">
          <div class="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 aspect-square flex items-center justify-center select-none pointer-events-none">
            <img
              src={tourState.currentStep.illustration || '/icons/icon-192.png'}
              alt={tourState.currentStep.title}
              class="w-full h-full object-contain drop-shadow-sm select-none pointer-events-none transition-transform duration-300"
              loading="eager"
            />
          </div>

          <div class="flex-1 min-w-0">
            <h3 class="text-sm sm:text-base font-extrabold text-slate-900 dark:text-[#E3E3E3] leading-snug">
              {tourState.currentStep.title}
            </h3>
            <p class="text-xs sm:text-[13px] text-slate-600 dark:text-[#A8ABA7] leading-relaxed mt-1">
              {tourState.currentStep.description}
            </p>
          </div>
        </div>

        <!-- Footer Actions with Dots Pagination -->
        <div class="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-[#282A2C] mt-0.5">
          <!-- Left: Dots indicator (tối đa hiển thị dạng compact) -->
          <div class="flex items-center gap-1 min-w-0 overflow-hidden" aria-label="Tiến trình tour">
            {#each Array(tourState.totalSteps) as _, i}
              {@const isCurrent = i === tourState.currentStepIndex}
              {@const isNear = Math.abs(i - tourState.currentStepIndex) <= 3}
              {#if isNear}
                <span
                  class="transition-all duration-300 rounded-full {isCurrent ? 'w-4 h-1.5 bg-blue-600 shadow-xs shadow-blue-500/40' : 'w-1.5 h-1.5 bg-slate-300 dark:bg-slate-700'}"
                ></span>
              {/if}
            {/each}
          </div>

          <!-- Right: Prev '<' icon button & Next / Finish CTA Pill Button -->
          <div class="flex items-center gap-1.5 ml-auto shrink-0">
            {#if !tourState.isFirstStep}
              <button
                type="button"
                class="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full border border-slate-200 dark:border-[#282A2C] bg-white dark:bg-[#282A2C] hover:bg-slate-100 dark:hover:bg-[#37393B] text-slate-700 dark:text-[#E3E3E3] transition-all duration-200 active:scale-90 flex items-center justify-center cursor-pointer shadow-2xs shrink-0 aspect-square"
                onclick={() => tourState.prevStep()}
                title="Quay lại bước trước"
                aria-label="Quay lại bước trước"
              >
                <CaretLeft size={14} weight="bold" />
              </button>
            {/if}

            <button
              type="button"
              class="h-9 sm:h-10 px-4 sm:px-5 rounded-full text-xs font-bold text-white transition-all duration-200 active:scale-95 flex items-center gap-1.5 shadow-md cursor-pointer {tourState.isLastStep ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/25' : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/30'}"
              onclick={() => tourState.nextStep()}
            >
              <span>{tourState.isLastStep ? 'Bắt đầu học' : 'Tiếp tục'}</span>
              {#if tourState.isLastStep}
                <Check size={14} weight="bold" />
              {:else}
                <CaretRight size={14} weight="bold" />
              {/if}
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}
{/if}

<style>
  .tour-cutout-rect {
    transition: x 0.22s cubic-bezier(0.16, 1, 0.3, 1),
      y 0.22s cubic-bezier(0.16, 1, 0.3, 1),
      width 0.22s cubic-bezier(0.16, 1, 0.3, 1),
      height 0.22s cubic-bezier(0.16, 1, 0.3, 1),
      rx 0.22s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: x, y, width, height;
  }

  .tour-halo-ring {
    transition: left 0.22s cubic-bezier(0.16, 1, 0.3, 1),
      top 0.22s cubic-bezier(0.16, 1, 0.3, 1),
      width 0.22s cubic-bezier(0.16, 1, 0.3, 1),
      height 0.22s cubic-bezier(0.16, 1, 0.3, 1),
      border-radius 0.22s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: left, top, width, height;
  }
</style>

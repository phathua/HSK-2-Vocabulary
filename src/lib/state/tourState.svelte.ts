import { tick } from 'svelte';
import type { TourDefinition, TourStep, TargetRect, PopoverPosition } from '#lib/types/tour';

class TourState {
  isActive = $state(false);
  activeTour = $state<TourDefinition | null>(null);
  activeSteps = $state<TourStep[]>([]);
  currentStepIndex = $state(0);
  targetRect = $state<TargetRect | null>(null);
  popoverPos = $state<PopoverPosition | null>(null);
  isTransitioning = $state(false);

  get currentStep(): TourStep | null {
    if (!this.isActive || this.activeSteps.length === 0) return null;
    return this.activeSteps[this.currentStepIndex] ?? null;
  }

  get totalSteps(): number {
    return this.activeSteps.length;
  }

  get isFirstStep(): boolean {
    return this.currentStepIndex === 0;
  }

  get isLastStep(): boolean {
    return this.currentStepIndex >= this.activeSteps.length - 1;
  }

  getStorageKey(tour: TourDefinition): string {
    return tour.storageKey || `hsk_tour_${tour.id}_seen`;
  }

  isTourSeen(tourOrKey: string | TourDefinition): boolean {
    if (typeof window === 'undefined') return false;
    if (typeof tourOrKey === 'string') {
      return (
        localStorage.getItem(tourOrKey) === 'true' ||
        localStorage.getItem(`hsk_tour_${tourOrKey}_seen`) === 'true'
      );
    }
    const key = this.getStorageKey(tourOrKey);
    return localStorage.getItem(key) === 'true';
  }

  resetTour(tourOrKey: string | TourDefinition): void {
    if (typeof window === 'undefined') return;
    const key = typeof tourOrKey === 'string' ? tourOrKey : this.getStorageKey(tourOrKey);
    localStorage.removeItem(key);
    localStorage.removeItem(`hsk_tour_${key}_seen`);
  }

  async startTour(tour: TourDefinition, force = false): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    if (!force && this.isTourSeen(tour)) return false;

    this.activeTour = tour;
    this.activeSteps = tour.steps;
    this.currentStepIndex = 0;
    this.isActive = true;

    await tick();
    await this.goToStep(0);
    return true;
  }

  async goToStep(index: number): Promise<void> {
    if (index < 0 || index >= this.activeSteps.length) return;

    this.isTransitioning = true;
    const step = this.activeSteps[index];

    if (step.onBeforeStep) {
      try {
        await step.onBeforeStep();
        await tick();
      } catch (e) {
        console.error('[Tour] Error in onBeforeStep:', e);
      }
    }

    this.currentStepIndex = index;
    await tick();

    const el = await this.waitForTargetElement(step);
    if (el) {
      await this.safeScrollToTarget(el, step);
    }

    this.refreshPosition();
    this.isTransitioning = false;
  }

  async nextStep(): Promise<void> {
    if (!this.isActive || !this.currentStep) return;

    if (this.currentStep.onAfterStep) {
      try {
        await this.currentStep.onAfterStep();
        await tick();
      } catch (e) {
        console.error('[Tour] Error in onAfterStep:', e);
      }
    }

    if (this.isLastStep) {
      await this.finishTour();
    } else {
      await this.goToStep(this.currentStepIndex + 1);
    }
  }

  async prevStep(): Promise<void> {
    if (!this.isActive || this.isFirstStep || !this.currentStep) return;

    if (this.currentStep.onPrevStep) {
      try {
        await this.currentStep.onPrevStep();
        await tick();
      } catch (e) {
        console.error('[Tour] Error in onPrevStep:', e);
      }
    }

    await this.goToStep(this.currentStepIndex - 1);
  }

  async skipTour(permanently = true): Promise<void> {
    const tour = this.activeTour;
    if (permanently && tour && typeof window !== 'undefined') {
      const key = this.getStorageKey(tour);
      localStorage.setItem(key, 'true');
    }
    this.closeTour();
    if (tour?.onSkip) {
      try {
        await tour.onSkip();
      } catch (e) {
        console.error('[Tour] Error in onSkip:', e);
      }
    }
  }

  async finishTour(): Promise<void> {
    const tour = this.activeTour;
    if (tour && typeof window !== 'undefined') {
      const key = this.getStorageKey(tour);
      localStorage.setItem(key, 'true');
    }
    this.closeTour();
    if (tour?.onComplete) {
      try {
        await tour.onComplete();
      } catch (e) {
        console.error('[Tour] Error in onComplete:', e);
      }
    }
  }

  closeTour(): void {
    this.isActive = false;
    this.activeTour = null;
    this.activeSteps = [];
    this.currentStepIndex = 0;
    this.targetRect = null;
    this.popoverPos = null;
    this.isTransitioning = false;
  }

  async waitForTargetElement(step: TourStep, timeoutMs = 2500): Promise<Element | null> {
    if (typeof window === 'undefined') return null;
    const startTime = performance.now();
    while (performance.now() - startTime < timeoutMs) {
      const el = this.resolveTargetElement(step);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          return el;
        }
      }
      await new Promise((r) => setTimeout(r, 60));
    }
    return this.resolveTargetElement(step);
  }

  resolveTargetElement(step: TourStep): Element | null {
    if (typeof step.target === 'function') {
      return step.target();
    }
    const elements = document.querySelectorAll(step.target);
    for (const el of elements) {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        return el;
      }
    }
    return elements[0] || null;
  }

  resolveIncludeElement(step: TourStep): Element | null {
    if (!step.includeTarget) return null;
    if (typeof step.includeTarget === 'function') {
      return step.includeTarget();
    }
    const elements = document.querySelectorAll(step.includeTarget);
    for (const el of elements) {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        return el;
      }
    }
    return elements[0] || null;
  }

  async safeScrollToTarget(el: Element, step: TourStep): Promise<void> {
    if (typeof window === 'undefined') return;

    // Cuộn mượt el vào khung nhìn nếu đang nằm ngoài viewport
    const rect = el.getBoundingClientRect();
    const margin = 100;
    const isOutOfView =
      rect.top < margin ||
      rect.bottom > window.innerHeight - margin ||
      rect.left < 0 ||
      rect.right > window.innerWidth;

    if (isOutOfView) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: step.placement === 'top' ? 'end' : 'start',
        inline: 'nearest'
      });
      await new Promise((r) => setTimeout(r, 260));
    }
  }

  refreshPosition(actualPopoverHeight?: number): void {
    if (!this.isActive || !this.currentStep) return;

    const el = this.resolveTargetElement(this.currentStep);
    if (!el) {
      const fallbackPadding = 16;
      const width = Math.min(360, window.innerWidth - 32);
      const height = actualPopoverHeight || 200;
      this.targetRect = null;
      this.popoverPos = {
        top: Math.max(fallbackPadding, (window.innerHeight - height) / 2),
        left: Math.max(fallbackPadding, (window.innerWidth - width) / 2),
        placement: 'bottom'
      };
      return;
    }

    const rect = el.getBoundingClientRect();
    const padding = this.currentStep.spotlightPadding ?? 8;
    const radius = this.currentStep.spotlightRadius ?? 16;

    let targetLeft = rect.left - padding;
    let targetTop = rect.top - padding;
    let targetWidth = rect.width + padding * 2;
    let targetHeight = rect.height + padding * 2;

    const incEl = this.resolveIncludeElement(this.currentStep);
    if (incEl) {
      const incRect = incEl.getBoundingClientRect();
      const incPadding = 6;
      const minX = Math.min(targetLeft, incRect.left - incPadding);
      const minY = Math.min(targetTop, incRect.top - incPadding);
      const maxX = Math.max(targetLeft + targetWidth, incRect.right + incPadding);
      const maxY = Math.max(targetTop + targetHeight, incRect.bottom + incPadding);

      targetLeft = minX;
      targetTop = minY;
      targetWidth = maxX - minX;
      targetHeight = maxY - minY;
    }

    this.targetRect = {
      x: targetLeft,
      y: targetTop,
      width: targetWidth,
      height: targetHeight,
      radius
    };

    const popoverWidth = Math.min(380, window.innerWidth - 32);
    const popoverHeight = actualPopoverHeight || 220;
    const margin = 16;
    const gap = 12;

    let placement: 'top' | 'bottom' = 'bottom';
    if (this.currentStep.placement === 'top') {
      placement = 'top';
    } else if (this.currentStep.placement === 'bottom') {
      placement = 'bottom';
    } else {
      const spaceBelow = window.innerHeight - (targetTop + targetHeight);
      const spaceAbove = targetTop;
      placement = spaceBelow < popoverHeight + gap && spaceAbove > spaceBelow ? 'top' : 'bottom';
    }

    let top = 0;
    if (placement === 'bottom') {
      top = targetTop + targetHeight + gap;
      if (top + popoverHeight > window.innerHeight - margin) {
        if (targetTop - popoverHeight - gap > margin) {
          placement = 'top';
          top = targetTop - popoverHeight - gap;
        } else {
          top = Math.max(margin, window.innerHeight - popoverHeight - margin);
        }
      }
    } else {
      top = targetTop - popoverHeight - gap;
      if (top < margin) {
        if (targetTop + targetHeight + gap + popoverHeight < window.innerHeight - margin) {
          placement = 'bottom';
          top = targetTop + targetHeight + gap;
        } else {
          top = margin;
        }
      }
    }

    // Căn giữa theo chiều ngang của target
    let left = targetLeft + (targetWidth - popoverWidth) / 2;
    // Đảm bảo không tràn viền trái/phải màn hình
    left = Math.max(margin, Math.min(left, window.innerWidth - popoverWidth - margin));

    this.popoverPos = {
      top: Math.round(top),
      left: Math.round(left),
      placement
    };
  }
}

export const tourState = new TourState();

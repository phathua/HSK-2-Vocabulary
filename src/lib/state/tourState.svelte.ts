import { tick } from 'svelte';
import type { TourDefinition, TourStep, TargetRect, PopoverPosition } from '#lib/types/tour';
import { stopSpeech, speakVietnamese } from '#lib/utils/speech';
import { appState } from '#lib/state/appState.svelte';

class TourState {
  isActive = $state(false);
  activeTour = $state<TourDefinition | null>(null);
  activeSteps = $state<TourStep[]>([]);
  currentStepIndex = $state(0);
  targetRect = $state<TargetRect | null>(null);
  popoverPos = $state<PopoverPosition | null>(null);
  isTransitioning = $state(false);
  isVoiceEnabled = $state(true);

  private currentAudioSessionId = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hsk_tour_voice_enabled');
      if (saved !== null) {
        this.isVoiceEnabled = saved === 'true';
      }
    }
  }

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

  async startTabTour(tab: 'fill' | 'quiz' | 'flash' | 'speech', force = false): Promise<boolean> {
    const { TAB_TOURS } = await import('#lib/tours/tabTours');
    const tour = TAB_TOURS[tab];
    if (!tour) return false;
    return this.startTour(tour, force);
  }

  toggleVoice(): void {
    this.isVoiceEnabled = !this.isVoiceEnabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('hsk_tour_voice_enabled', String(this.isVoiceEnabled));
    }
    if (!this.isVoiceEnabled) {
      this.cancelSpeech();
    } else if (this.isActive && this.currentStep) {
      const el = this.resolveTargetElement(this.currentStep);
      this.playStepAudio(this.currentStep, el);
    }
  }

  cancelSpeech(): void {
    this.currentAudioSessionId++;
    stopSpeech();
  }

  async goToStep(index: number): Promise<void> {
    if (index < 0 || index >= this.activeSteps.length) return;

    this.cancelSpeech();
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

    // Tự động phát âm thanh theo kịch bản (nút loa tiếng Trung trước -> tiếng Việt sau)
    this.playStepAudio(step, el);
  }

  async nextStep(): Promise<void> {
    if (!this.isActive || !this.currentStep) return;

    this.cancelSpeech();

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

    this.cancelSpeech();

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
    this.cancelSpeech();
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
    this.cancelSpeech();
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
    this.cancelSpeech();
    this.isActive = false;
    this.activeTour = null;
    this.activeSteps = [];
    this.currentStepIndex = 0;
    this.targetRect = null;
    this.popoverPos = null;
    this.isTransitioning = false;
  }

  private async playStepAudio(step: TourStep, el: Element | null): Promise<void> {
    const sessionId = ++this.currentAudioSessionId;
    stopSpeech();

    const isSpeakerTarget =
      (typeof step.target === 'string' && step.target.includes('speaker')) ||
      step.id.includes('speaker');

    // 1. Nếu bước này highlight nút Loa / TTS: kích hoạt phát âm tiếng Trung trước
    if (isSpeakerTarget) {
      if (el) {
        try {
          (el as HTMLElement).classList.add('ring-4', 'ring-emerald-400/60', 'scale-95');
          setTimeout(() => {
            (el as HTMLElement)?.classList.remove('ring-4', 'ring-emerald-400/60', 'scale-95');
          }, 350);
        } catch {}
      }

      // Tự động phát âm tiếng Trung của từ vựng hiện tại và ĐỢI nói xong
      await appState.speakCurrent();

      // Kiểm tra xem người dùng có đổi bước hoặc đóng tour trong lúc chờ không
      if (!this.isActive || this.currentAudioSessionId !== sessionId) {
        return;
      }

      // Khoảng nghỉ tự nhiên 400ms giữa tiếng Trung và tiếng Việt
      await new Promise((r) => setTimeout(r, 400));
      if (!this.isActive || this.currentAudioSessionId !== sessionId) {
        return;
      }
    }

    // 2. Tự động đọc thuyết minh tiếng Việt trong bảng hướng dẫn (hỗ trợ Safari)
    if (this.isActive && this.isVoiceEnabled && this.currentAudioSessionId === sessionId) {
      await speakVietnamese(step.description);
    }
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

  refreshPosition(actualPopoverHeight?: number, actualPopoverWidth?: number): void {
    if (!this.isActive || !this.currentStep) return;

    const margin = 16;
    const gap = 12;

    const maxAvailableWidth = Math.min(420, window.innerWidth - margin * 2);
    const popoverWidth = actualPopoverWidth ? Math.min(actualPopoverWidth, maxAvailableWidth) : maxAvailableWidth;
    const popoverHeight = actualPopoverHeight || 220;

    const el = this.resolveTargetElement(this.currentStep);
    if (!el) {
      this.targetRect = null;
      this.popoverPos = {
        top: Math.max(margin, Math.round((window.innerHeight - popoverHeight) / 2)),
        left: Math.max(margin, Math.round((window.innerWidth - popoverWidth) / 2)),
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

    // Xác định placement thông minh (chỉ auto-flip khi phía đối diện THỰC SỰ ĐỦ CHỖ)
    let placement: 'top' | 'bottom' = 'bottom';
    const spaceBelow = window.innerHeight - (targetTop + targetHeight + gap);
    const spaceAbove = targetTop - gap;

    if (this.currentStep.placement === 'top') {
      // Chỉ lật xuống dưới nếu phía trên KHÔNG đủ chỗ VÀ phía dưới THỰC SỰ ĐỦ chỗ
      placement = spaceAbove < popoverHeight && spaceBelow >= popoverHeight ? 'bottom' : 'top';
    } else if (this.currentStep.placement === 'bottom') {
      // Chỉ lật lên trên nếu phía dưới KHÔNG đủ chỗ VÀ phía trên THỰC SỰ ĐỦ chỗ
      placement = spaceBelow < popoverHeight && spaceAbove >= popoverHeight ? 'top' : 'bottom';
    } else {
      placement = spaceBelow >= popoverHeight ? 'bottom' : 'top';
    }

    let top = 0;
    if (placement === 'bottom') {
      top = targetTop + targetHeight + gap;
    } else {
      top = targetTop - popoverHeight - gap;
    }

    // Clamping an toàn cho top để không tràn trên/dưới
    top = Math.max(margin, Math.min(top, window.innerHeight - popoverHeight - margin));

    // Căn giữa theo target
    const targetCenter = targetLeft + targetWidth / 2;
    let left = targetCenter - popoverWidth / 2;

    // Clamping tuyệt đối an toàn cho left:
    // Đảm bảo popover luôn cách lề trái và phải ít nhất `margin` (16px), không bao giờ bị cắt hay tràn mép
    const maxLeft = window.innerWidth - popoverWidth - margin;
    const minLeft = margin;
    left = Math.max(minLeft, Math.min(left, maxLeft));

    this.popoverPos = {
      top: Math.round(top),
      left: Math.round(left),
      placement
    };
  }
}

export const tourState = new TourState();

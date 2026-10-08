// Global reactive state for active exam room (shared with Header and sticky audio bar)
export interface ExamRoomAudioState {
  isActiveExamRoom: boolean;
  examCode: string;
  isExamMode: boolean;
  timeRemainingSeconds: number; // 55 mins countdown
  previewSeconds: number; // 60s preview countdown
  isPreviewPhase: boolean;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  startAudioNow: () => void;
}

class ExamRoomState {
  isActive = $state(false);
  examCode = $state('');
  isExamMode = $state(true);
  timeRemainingSeconds = $state(55 * 60);
  previewSeconds = $state(60);
  isPreviewPhase = $state(false);
  isPlaying = $state(false);
  currentTime = $state(0);
  duration = $state(0);
  isScrolled = $state(false);
  isSubmitted = $state(false);
  startAudioFn = $state<(() => void) | null>(null);
  submitFn = $state<(() => void) | null>(null);
  retryFn = $state<(() => void) | null>(null);

  reset() {
    this.isActive = false;
    this.examCode = '';
    this.isExamMode = true;
    this.timeRemainingSeconds = 55 * 60;
    this.previewSeconds = 60;
    this.isPreviewPhase = false;
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 0;
    this.isScrolled = false;
    this.isSubmitted = false;
    this.startAudioFn = null;
    this.submitFn = null;
    this.retryFn = null;
  }

  startAudio() {
    if (this.startAudioFn) {
      this.startAudioFn();
    }
  }

  submit() {
    if (this.submitFn) {
      this.submitFn();
    }
  }

  retry() {
    if (this.retryFn) {
      this.retryFn();
    }
  }
}

export const examRoomState = new ExamRoomState();

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
  startAudioFn = $state<(() => void) | null>(null);

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
    this.startAudioFn = null;
  }

  startAudio() {
    if (this.startAudioFn) {
      this.startAudioFn();
    }
  }
}

export const examRoomState = new ExamRoomState();

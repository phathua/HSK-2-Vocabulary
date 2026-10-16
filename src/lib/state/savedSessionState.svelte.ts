import { appState, type AppTab, type HskLevel, type QuizDirection, type ItemStatus } from './appState.svelte';
import type { VocabItem } from '#lib/data/hsk2Vocabulary';
import { toast } from 'svelte-sonner';

export interface SavedSessionRecord {
  id: string;
  name: string;
  createdAt: string; // ISO String
  activeTab: AppTab;
  currentLevel: HskLevel;
  direction: QuizDirection;
  selectedLessonsHsk1: Record<number, boolean>;
  selectedLessonsHsk2: Record<number, boolean>;
  progressPercent: number;
  scoreText: string;
  currentLesson: number;

  fillState?: {
    fillDeckIds: string[];
    fillSessionListIds: string[];
    fillItemStatus: Record<string, ItemStatus>;
    currentFillItemId: string | null;
    fillCorrect: number;
    fillWrong: number;
    fillSkipCount: number;
    fillDoneCount: number;
    wrongFillWordIds: string[];
    isFillReviewMode: boolean;
    fillSubMode: 'tiles' | 'keyboard';
  };

  quizState?: {
    quizDeckIds: string[];
    quizSessionListIds: string[];
    quizItemStatus: Record<string, ItemStatus>;
    currentQuizItemId: string | null;
    quizCorrect: number;
    quizWrong: number;
    quizDoneCount: number;
  };

  flashState?: {
    flashDeckIds: string[];
    flashSessionListIds: string[];
    flashItemStatus: Record<string, ItemStatus>;
    currentFlashItemId: string | null;
    flashKnown: number;
    flashUnknown: number;
    flashSkipCount: number;
    flashDoneCount: number;
  };

  speechState?: {
    speechDeckIds: string[];
    speechSessionListIds: string[];
    speechItemStatus: Record<string, ItemStatus>;
    currentSpeechItemId: string | null;
    speechCorrect: number;
    speechWrong: number;
    speechDoneCount: number;
  };
}

const STORAGE_KEY = 'hsk_saved_sessions_v1';
const LAST_ACTIVE_KEY = 'hsk_last_active_session_id';

class SavedSessionState {
  records = $state<SavedSessionRecord[]>([]);
  isSaveModalOpen = $state(false);
  isListModalOpen = $state(false);
  saveNameInput = $state('');
  activeResumeId = $state<string | null>(null);

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          this.records = JSON.parse(stored);
        }
        this.activeResumeId = localStorage.getItem(LAST_ACTIVE_KEY);
      } catch (e) {
        console.error('Lỗi khi đọc danh sách phiên học:', e);
      }
    }
  }

  get currentTabLabel(): string {
    if (appState.activeTab === 'fill') return 'Điền từ';
    if (appState.activeTab === 'quiz') return 'Trắc nghiệm';
    if (appState.activeTab === 'flash') return 'Thẻ từ';
    return 'Phát âm';
  }

  get currentScoreText(): string {
    if (appState.activeTab === 'flash') return `${appState.flashKnown}/${appState.totalFlashCount}`;
    if (appState.activeTab === 'fill') return `${appState.fillCorrect}/${appState.totalFillCount}`;
    if (appState.activeTab === 'quiz') return `${appState.quizCorrect}/${appState.totalQuizCount}`;
    return `${appState.speechCorrect}/${appState.totalSpeechCount}`;
  }

  get currentProgressPercent(): number {
    const total = appState.currentProgressSegments.length;
    if (total === 0) return 0;
    const attempted = appState.currentProgressSegments.filter(s => s.status !== 'unreached').length;
    return Math.min(100, Math.round((attempted / total) * 100));
  }

  openSaveModal() {
    const currentItem = appState.currentFillItem || appState.currentQuizItem || appState.currentFlashItem || appState.currentSpeechItem;
    const lesson = currentItem?.lesson || 1;
    const time = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    this.saveNameInput = `${this.currentTabLabel} - Bài ${lesson} (${time})`;
    this.isSaveModalOpen = true;
  }

  closeSaveModal() {
    this.isSaveModalOpen = false;
  }

  openListModal() {
    this.isListModalOpen = true;
  }

  closeListModal() {
    this.isListModalOpen = false;
  }

  saveCurrentSession(name?: string) {
    const finalName = (name || this.saveNameInput).trim() || `${this.currentTabLabel} - ${new Date().toLocaleTimeString('vi-VN')}`;
    const currentItem = appState.currentFillItem || appState.currentQuizItem || appState.currentFlashItem || appState.currentSpeechItem;
    const lesson = currentItem?.lesson || 1;

    const record: SavedSessionRecord = {
      id: `session-${Date.now()}`,
      name: finalName,
      createdAt: new Date().toISOString(),
      activeTab: appState.activeTab,
      currentLevel: appState.currentLevel,
      direction: appState.direction,
      selectedLessonsHsk1: { ...appState.selectedLessonsHsk1 },
      selectedLessonsHsk2: { ...appState.selectedLessonsHsk2 },
      progressPercent: this.currentProgressPercent,
      scoreText: this.currentScoreText,
      currentLesson: lesson
    };

    if (appState.activeTab === 'fill') {
      record.fillState = {
        fillDeckIds: appState.fillDeck.map(i => i.id),
        fillSessionListIds: appState.fillSessionList.map(i => i.id),
        fillItemStatus: { ...appState.fillItemStatus },
        currentFillItemId: appState.currentFillItem?.id || null,
        fillCorrect: appState.fillCorrect,
        fillWrong: appState.fillWrong,
        fillSkipCount: appState.fillSkipCount,
        fillDoneCount: appState.fillDoneCount,
        wrongFillWordIds: appState.wrongFillWords.map(i => i.id),
        isFillReviewMode: appState.isFillReviewMode,
        fillSubMode: appState.fillSubMode
      };
    } else if (appState.activeTab === 'quiz') {
      record.quizState = {
        quizDeckIds: appState.quizDeck.map(i => i.id),
        quizSessionListIds: appState.quizSessionList.map(i => i.id),
        quizItemStatus: { ...appState.quizItemStatus },
        currentQuizItemId: appState.currentQuizItem?.id || null,
        quizCorrect: appState.quizCorrect,
        quizWrong: appState.quizWrong,
        quizDoneCount: appState.quizDoneCount
      };
    } else if (appState.activeTab === 'flash') {
      record.flashState = {
        flashDeckIds: appState.flashDeck.map(i => i.id),
        flashSessionListIds: appState.flashSessionList.map(i => i.id),
        flashItemStatus: { ...appState.flashItemStatus },
        currentFlashItemId: appState.currentFlashItem?.id || null,
        flashKnown: appState.flashKnown,
        flashUnknown: appState.flashUnknown,
        flashSkipCount: appState.flashSkipCount,
        flashDoneCount: appState.flashDoneCount
      };
    } else if (appState.activeTab === 'speech') {
      record.speechState = {
        speechDeckIds: appState.speechDeck.map(i => i.id),
        speechSessionListIds: appState.speechSessionList.map(i => i.id),
        speechItemStatus: { ...appState.speechItemStatus },
        currentSpeechItemId: appState.currentSpeechItem?.id || null,
        speechCorrect: appState.speechCorrect,
        speechWrong: appState.speechWrong,
        speechDoneCount: appState.speechDoneCount
      };
    }

    this.records = [record, ...this.records];
    this.activeResumeId = record.id;
    this.persist();

    this.isSaveModalOpen = false;
    toast.success('Đã lưu tiến độ làm bài!', {
      description: `Phiên "${record.name}" đã được lưu trữ an toàn.`
    });
  }

  resumeSession(record: SavedSessionRecord) {
    const itemMap = new Map<string, VocabItem>(appState.allVocab.map(i => [i.id, i]));

    appState.currentLevel = record.currentLevel;
    appState.direction = record.direction;
    appState.selectedLessonsHsk1 = { ...record.selectedLessonsHsk1 };
    appState.selectedLessonsHsk2 = { ...record.selectedLessonsHsk2 };
    appState.activeTab = record.activeTab;

    if (record.activeTab === 'fill' && record.fillState) {
      appState.fillDeck = record.fillState.fillDeckIds.map(id => itemMap.get(id)).filter(Boolean) as VocabItem[];
      appState.fillSessionList = record.fillState.fillSessionListIds.map(id => itemMap.get(id)).filter(Boolean) as VocabItem[];
      appState.fillItemStatus = { ...record.fillState.fillItemStatus };
      appState.fillCorrect = record.fillState.fillCorrect;
      appState.fillWrong = record.fillState.fillWrong;
      appState.fillSkipCount = record.fillState.fillSkipCount;
      appState.fillDoneCount = record.fillState.fillDoneCount;
      appState.wrongFillWords = record.fillState.wrongFillWordIds.map(id => itemMap.get(id)).filter(Boolean) as VocabItem[];
      appState.isFillReviewMode = record.fillState.isFillReviewMode;
      appState.fillSubMode = record.fillState.fillSubMode;
      appState.currentFillItem = (record.fillState.currentFillItemId && itemMap.get(record.fillState.currentFillItemId)) || appState.fillDeck[appState.fillDeck.length - 1] || null;
      appState.fillAnswered = false;
      appState.fillInput = '';
      appState.fillFeedback = null;
      appState.setupFillChunks();
    } else if (record.activeTab === 'quiz' && record.quizState) {
      appState.quizDeck = record.quizState.quizDeckIds.map(id => itemMap.get(id)).filter(Boolean) as VocabItem[];
      appState.quizSessionList = record.quizState.quizSessionListIds.map(id => itemMap.get(id)).filter(Boolean) as VocabItem[];
      appState.quizItemStatus = { ...record.quizState.quizItemStatus };
      appState.quizCorrect = record.quizState.quizCorrect;
      appState.quizWrong = record.quizState.quizWrong;
      appState.quizDoneCount = record.quizState.quizDoneCount;
      appState.currentQuizItem = (record.quizState.currentQuizItemId && itemMap.get(record.quizState.currentQuizItemId)) || appState.quizDeck[appState.quizDeck.length - 1] || null;
      appState.quizAnswered = false;
      appState.quizSelectedId = null;
    } else if (record.activeTab === 'flash' && record.flashState) {
      appState.flashDeck = record.flashState.flashDeckIds.map(id => itemMap.get(id)).filter(Boolean) as VocabItem[];
      appState.flashSessionList = record.flashState.flashSessionListIds.map(id => itemMap.get(id)).filter(Boolean) as VocabItem[];
      appState.flashItemStatus = { ...record.flashState.flashItemStatus };
      appState.flashKnown = record.flashState.flashKnown;
      appState.flashUnknown = record.flashState.flashUnknown;
      appState.flashSkipCount = record.flashState.flashSkipCount;
      appState.flashDoneCount = record.flashState.flashDoneCount;
      appState.currentFlashItem = (record.flashState.currentFlashItemId && itemMap.get(record.flashState.currentFlashItemId)) || appState.flashDeck[appState.flashDeck.length - 1] || null;
      appState.flashRevealed = false;
    } else if (record.activeTab === 'speech' && record.speechState) {
      appState.speechDeck = record.speechState.speechDeckIds.map(id => itemMap.get(id)).filter(Boolean) as VocabItem[];
      appState.speechSessionList = record.speechState.speechSessionListIds.map(id => itemMap.get(id)).filter(Boolean) as VocabItem[];
      appState.speechItemStatus = { ...record.speechState.speechItemStatus };
      appState.speechCorrect = record.speechState.speechCorrect;
      appState.speechWrong = record.speechState.speechWrong;
      appState.speechDoneCount = record.speechState.speechDoneCount;
      appState.currentSpeechItem = (record.speechState.currentSpeechItemId && itemMap.get(record.speechState.currentSpeechItemId)) || appState.speechDeck[appState.speechDeck.length - 1] || null;
      appState.speechAnswered = false;
      appState.speechFeedback = null;
    }

    this.activeResumeId = record.id;
    if (typeof window !== 'undefined') {
      localStorage.setItem(LAST_ACTIVE_KEY, record.id);
    }

    this.isListModalOpen = false;
    toast.success(`Đã khôi phục: "${record.name}"`, {
      description: `Tiến độ: ${record.progressPercent}% (${record.scoreText}). Bạn có thể làm tiếp ngay.`
    });
  }

  deleteSession(id: string) {
    this.records = this.records.filter(r => r.id !== id);
    if (this.activeResumeId === id) {
      this.activeResumeId = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem(LAST_ACTIVE_KEY);
      }
    }
    this.persist();
    toast.info('Đã xóa phiên lưu trữ.');
  }

  checkAutoResume(): boolean {
    if (typeof window === 'undefined') return false;
    const lastId = localStorage.getItem(LAST_ACTIVE_KEY);
    if (!lastId) return false;
    const found = this.records.find(r => r.id === lastId);
    if (found) {
      this.resumeSession(found);
      return true;
    }
    return false;
  }

  private persist() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.records));
      if (this.activeResumeId) {
        localStorage.setItem(LAST_ACTIVE_KEY, this.activeResumeId);
      } else {
        localStorage.removeItem(LAST_ACTIVE_KEY);
      }
    } catch (e) {
      console.error('Lỗi khi ghi phiên học vào localStorage:', e);
    }
  }
}

export const savedSessionState = new SavedSessionState();

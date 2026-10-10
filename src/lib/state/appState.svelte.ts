import { HSK2_VOCABULARY, LESSON_INFOS as HSK2_LESSON_INFOS, type VocabItem, type LessonInfo } from '#lib/data/hsk2Vocabulary';
import { HSK1_VOCABULARY, HSK1_LESSON_INFOS } from '#lib/data/hsk1Vocabulary';
import { shuffleArray, speakChinese, checkPinyinAnswer } from '#lib/utils/speech';
import { generateDistractors } from '#lib/utils/distractors';
import { buildWordChunks, type WordChunk, type ChoiceTile, type TileSlot } from '#lib/utils/pinyinDistractor';
import { toast } from 'svelte-sonner';

export type HskLevel = 'HSK1' | 'HSK2';
export type AppTab = 'fill' | 'quiz' | 'flash' | 'speech';
export type QuizDirection = 'vi_to_zh' | 'zh_to_vi';

const DATA_VERSION = 'v5_fresh_start';

export class AppState {
  // Cấp độ: HSK 1 hoặc HSK 2
  currentLevel = $state<HskLevel>('HSK2');

  // Điều hướng & Chế độ
  activeTab = $state<AppTab>('fill');
  direction = $state<QuizDirection>('vi_to_zh');
  filterModalOpen = $state(false);
  settingsModalOpen = $state(false);
  updateModalOpen = $state(false);
  sidebarOpen = $state(false);

  // Cài đặt
  autoPlay = $state(false);
  volume = $state(0.7);
  themeMode = $state<'light' | 'dark' | 'system'>('system');
  theme = $state<'light' | 'dark'>('dark');

  // Bài học chọn lọc (Bài 1-15 cho từng cấp độ)
  selectedLessonsHsk1 = $state<Record<number, boolean>>({});
  selectedLessonsHsk2 = $state<Record<number, boolean>>({});

  // Cấp độ đang xem trong Modal Lọc bài học
  modalViewingLevel = $state<HskLevel>('HSK2');

  // Kho toàn bộ từ vựng gộp chung HSK1 & HSK2
  allVocab = $derived<VocabItem[]>([...HSK1_VOCABULARY, ...HSK2_VOCABULARY]);

  // Bộ từ vựng đã chọn lọc (hỗ trợ học trộn cả HSK 1 và HSK 2)
  filteredVocab = $derived<VocabItem[]>([
    ...HSK1_VOCABULARY.filter((item: VocabItem) => this.selectedLessonsHsk1[item.lesson]),
    ...HSK2_VOCABULARY.filter((item: VocabItem) => this.selectedLessonsHsk2[item.lesson])
  ]);

  // Tổng số bài đang chọn trên cả 2 cấp độ
  activeLessonsCountHsk1 = $derived(Object.values(this.selectedLessonsHsk1).filter(Boolean).length);
  activeLessonsCountHsk2 = $derived(Object.values(this.selectedLessonsHsk2).filter(Boolean).length);
  activeLessonsCount = $derived(this.activeLessonsCountHsk1 + this.activeLessonsCountHsk2);

  // Nhãn hiển thị cấp độ hiện tại (HSK 1, HSK 2 hoặc Trộn HSK 1+2)
  currentLevelDisplay = $derived.by(() => {
    if (this.activeLessonsCountHsk1 > 0 && this.activeLessonsCountHsk2 > 0) {
      return 'HSK 1+2';
    }
    if (this.activeLessonsCountHsk1 > 0) return 'HSK 1';
    if (this.activeLessonsCountHsk2 > 0) return 'HSK 2';
    return 'HSK 1+2';
  });

  // 1. Chế độ Điền từ (Fill Word)
  fillDeck = $state<VocabItem[]>([]);
  currentFillItem = $state<VocabItem | null>(null);
  fillInput = $state('');
  fillSubMode = $state<'tiles' | 'keyboard'>('tiles'); // 'tiles' (Chọn từ) hoặc 'keyboard' (Thủ công)
  fillWordChunks = $state<import('#lib/utils/pinyinDistractor').WordChunk[]>([]);
  currentChunkIndex = $state(0);
  fillAnswered = $state(false);
  fillCorrect = $state(0);
  fillWrong = $state(0);
  fillSkipCount = $state(0);
  fillDoneCount = $state(0);
  wrongFillWords = $state<VocabItem[]>([]);
  isFillReviewMode = $state(false);
  fillFeedback = $state<{ text: string; type: 'correct' | 'wrong' | 'skip' | 'hint' } | null>(null);
  fillHintShown = $state(false);

  // 2. Chế độ Trắc nghiệm (Multiple Choice Quiz)
  quizDeck = $state<VocabItem[]>([]);
  currentQuizItem = $state<VocabItem | null>(null);
  quizOptions = $state<VocabItem[]>([]);
  quizSelectedId = $state<string | null>(null);
  quizAnswered = $state(false);
  quizCorrect = $state(0);
  quizWrong = $state(0);
  quizDoneCount = $state(0);

  // 3. Chế độ Flashcard
  flashDeck = $state<VocabItem[]>([]);
  currentFlashItem = $state<VocabItem | null>(null);
  flashKnown = $state(0);
  flashUnknown = $state(0);
  flashRevealed = $state(false);

  // 4. Chế độ Phát âm (Speech Recognition)
  speechDeck = $state<VocabItem[]>([]);
  currentSpeechItem = $state<VocabItem | null>(null);
  speechDoneCount = $state(0);
  speechCorrect = $state(0);
  speechWrong = $state(0);
  speechAutoSubmit = $state(true);
  speechAnswered = $state(false);
  speechFeedback = $state<{ text: string; type: 'correct' | 'wrong' } | null>(null);

  animKey = $state(0);

  // Computed totals
  totalFillCount = $derived(
    this.isFillReviewMode ? this.wrongFillWords.length + this.fillDoneCount : this.filteredVocab.length
  );
  totalQuizCount = $derived(this.filteredVocab.length);
  totalFlashCount = $derived(this.filteredVocab.length);
  totalSpeechCount = $derived(this.filteredVocab.length);

  constructor() {
    this.initFromLocalStorage();
  }

  private initFromLocalStorage() {
    const defaultLessons: Record<number, boolean> = {};
    for (let i = 1; i <= 15; i++) defaultLessons[i] = true;

    this.selectedLessonsHsk1 = { ...defaultLessons };
    this.selectedLessonsHsk2 = { ...defaultLessons };

    if (typeof window === 'undefined') return;

    try {
      const savedVersion = localStorage.getItem('HSK_DATA_VERSION');
      if (savedVersion !== DATA_VERSION) {
        localStorage.setItem('HSK_DATA_VERSION', DATA_VERSION);
        localStorage.removeItem('HSK_QUIZ_DECK');
        localStorage.removeItem('HSK_QUIZ_CURRENT');
        localStorage.removeItem('HSK_QUIZ_DONE');
        localStorage.removeItem('HSK_FILL_DECK');
        localStorage.removeItem('HSK_FILL_CURRENT');
        localStorage.removeItem('HSK_FLASH_DECK');
        localStorage.removeItem('HSK_FLASH_CURRENT');
      }

      // Cấp độ
      const savedLevel = localStorage.getItem('HSK_CURRENT_LEVEL') as HskLevel;
      if (savedLevel === 'HSK1' || savedLevel === 'HSK2') this.currentLevel = savedLevel;

      // Chiều đảo ngữ
      const savedDir = localStorage.getItem('HSK_DIRECTION') as QuizDirection;
      if (savedDir === 'vi_to_zh' || savedDir === 'zh_to_vi') this.direction = savedDir;

      // Tab
      const tab = localStorage.getItem('HSK_ACTIVE_TAB') as AppTab;
      if (tab === 'fill' || tab === 'quiz' || tab === 'flash' || tab === 'speech') {
        this.activeTab = tab;
      }

      // Speech Auto Submit
      const autoSub = localStorage.getItem('HSK_SPEECH_AUTO_SUBMIT');
      if (autoSub !== null) {
        this.speechAutoSubmit = autoSub === 'true';
      }

      // Lessons
      const savedHsk1 = localStorage.getItem('HSK1_SELECTED_LESSONS');
      if (savedHsk1) this.selectedLessonsHsk1 = JSON.parse(savedHsk1);

      const savedHsk2 = localStorage.getItem('HSK2_SELECTED_LESSONS');
      if (savedHsk2) this.selectedLessonsHsk2 = JSON.parse(savedHsk2);

      // Settings
      this.autoPlay = localStorage.getItem('HSK_AUTOPLAY') === 'true';
      const vol = localStorage.getItem('HSK_VOLUME');
      this.volume = vol ? parseFloat(vol) : 0.7;

      const savedThemeMode = localStorage.getItem('HSK_THEME_MODE') as 'light' | 'dark' | 'system';
      if (savedThemeMode === 'light' || savedThemeMode === 'dark' || savedThemeMode === 'system') {
        this.themeMode = savedThemeMode;
      } else {
        // Dự phòng key cũ HSK_THEME nếu có
        const oldTheme = localStorage.getItem('HSK_THEME') as 'light' | 'dark';
        this.themeMode = (oldTheme === 'light' || oldTheme === 'dark') ? oldTheme : 'system';
      }
      this.initThemeListener();
      this.updateEffectiveTheme();

      const savedFillSubMode = localStorage.getItem('HSK_FILL_SUBMODE') as 'tiles' | 'keyboard';
      if (savedFillSubMode === 'tiles' || savedFillSubMode === 'keyboard') {
        this.fillSubMode = savedFillSubMode;
      }

      this.applyTheme();
      this.ensureInitialized();
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
  }

  private mediaQueryListenerAttached = false;

  private initThemeListener() {
    if (typeof window === 'undefined' || this.mediaQueryListenerAttached) return;
    try {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      media.addEventListener('change', (e) => {
        if (this.themeMode === 'system') {
          this.theme = e.matches ? 'dark' : 'light';
          this.applyTheme();
        }
      });
      this.mediaQueryListenerAttached = true;
    } catch {}
  }

  private updateEffectiveTheme() {
    if (this.themeMode === 'system') {
      if (typeof window !== 'undefined' && window.matchMedia) {
        this.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        this.theme = 'dark';
      }
    } else {
      this.theme = this.themeMode;
    }
  }

  setThemeMode(mode: 'light' | 'dark' | 'system') {
    this.themeMode = mode;
    this.updateEffectiveTheme();
    this.applyTheme();
    this.saveToLocalStorage();
  }

  applyTheme() {
    if (typeof document === 'undefined') return;
    if (this.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  toggleTheme() {
    // Luân chuyển giữa light -> dark (override cụ thể)
    const next = this.theme === 'dark' ? 'light' : 'dark';
    this.setThemeMode(next);
  }

  ensureInitialized() {
    this.applyTheme();
    if (this.fillDeck.length === 0 || !this.currentFillItem) {
      this.initFill(undefined, false);
    }
    if (this.quizDeck.length === 0 || !this.currentQuizItem) {
      this.initQuiz();
    }
    if (this.flashDeck.length === 0 || !this.currentFlashItem) {
      this.initFlash();
    }
    if (this.speechDeck.length === 0 || !this.currentSpeechItem) {
      this.initSpeech();
    }
  }

  saveToLocalStorage() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('HSK_CURRENT_LEVEL', this.currentLevel);
      localStorage.setItem('HSK_DIRECTION', this.direction);
      localStorage.setItem('HSK_ACTIVE_TAB', this.activeTab);
      localStorage.setItem('HSK_FILL_SUBMODE', this.fillSubMode);
      localStorage.setItem('HSK1_SELECTED_LESSONS', JSON.stringify(this.selectedLessonsHsk1));
      localStorage.setItem('HSK2_SELECTED_LESSONS', JSON.stringify(this.selectedLessonsHsk2));
      localStorage.setItem('HSK_AUTOPLAY', this.autoPlay ? 'true' : 'false');
      localStorage.setItem('HSK_VOLUME', this.volume.toString());
      localStorage.setItem('HSK_SPEECH_AUTO_SUBMIT', this.speechAutoSubmit ? 'true' : 'false');
      localStorage.setItem('HSK_THEME_MODE', this.themeMode);
      localStorage.setItem('HSK_THEME', this.theme);
    } catch {}
  }

  // Đổi chiều ngôn ngữ Việt ⇄ Trung
  toggleDirection() {
    this.direction = this.direction === 'vi_to_zh' ? 'zh_to_vi' : 'vi_to_zh';
    this.saveToLocalStorage();
  }

  // Đổi tab xem cấp độ trong Modal Lọc bài học
  setLevel(level: HskLevel) {
    this.modalViewingLevel = level;
    this.currentLevel = level;
    this.saveToLocalStorage();
  }

  // Reset tab hiện tại để học lại từ đầu
  resetCurrentTab() {
    if (this.activeTab === 'fill') {
      this.initFill(undefined, false);
    } else if (this.activeTab === 'quiz') {
      this.initQuiz();
    } else if (this.activeTab === 'flash') {
      this.initFlash();
    } else if (this.activeTab === 'speech') {
      this.initSpeech();
    }
  }

  speakCurrent() {
    let text = '';
    if (this.activeTab === 'fill') text = this.currentFillItem?.hanzi || '';
    else if (this.activeTab === 'quiz') text = this.currentQuizItem?.hanzi || '';
    else if (this.activeTab === 'flash') text = this.currentFlashItem?.hanzi || '';
    else if (this.activeTab === 'speech') text = this.currentSpeechItem?.hanzi || '';

    if (text) speakChinese(text, this.volume);
  }

  toggleFillSubMode() {
    this.fillSubMode = this.fillSubMode === 'tiles' ? 'keyboard' : 'tiles';
    this.saveToLocalStorage();
  }

  // Khởi tạo chunks cho từ hiện tại
  setupFillChunks() {
    if (!this.currentFillItem) {
      this.fillWordChunks = [];
      this.currentChunkIndex = 0;
      return;
    }
    const isZhToVi = this.direction === 'zh_to_vi';
    // Chế độ 'tiles' chỉ hoạt động khi điền Pinyin tiếng Trung (vi_to_zh)
    // Nếu zh_to_vi, ta dùng text input hoặc nếu có pinyin thì chunks theo pinyin
    this.fillWordChunks = buildWordChunks(this.currentFillItem.pinyin);
    this.currentChunkIndex = 0;
    this.syncFillInputFromChunks();
  }

  // Đồng bộ giá trị fillInput từ các slot đã điền
  syncFillInputFromChunks() {
    if (this.fillWordChunks.length === 0) return;
    const wordParts = this.fillWordChunks.map(chunk => {
      return chunk.slots.map(s => s.userChar || '').join('');
    });
    this.fillInput = wordParts.join(' ');
  }

  // Người dùng chọn 1 Tile
  selectTile(chunkIdx: number, tileId: string) {
    if (this.fillAnswered) return;
    const chunk = this.fillWordChunks[chunkIdx];
    if (!chunk) return;

    const tile = chunk.tiles.find(t => t.id === tileId);
    if (!tile || tile.isUsed) return;

    // Tìm ô slot đầu tiên còn trống chưa được điền
    const emptySlot = chunk.slots.find(s => !s.userChar);
    if (!emptySlot) return;

    // Gán ký tự vào slot
    emptySlot.userChar = tile.char;
    emptySlot.tileId = tile.id;
    tile.isUsed = true;

    this.syncFillInputFromChunks();

    // 1. Kiểm tra xem toàn bộ tất cả các vế đã được điền hết chưa
    const allFilled = this.fillWordChunks.every(c => c.slots.every(s => s.userChar !== null));
    if (allFilled) {
      this.checkFillAnswer();
      return;
    }

    // 2. Nếu vế hiện tại đã đầy, tự động nhảy sang vế đầu tiên bất kỳ còn ô trống
    const currentChunkFilled = chunk.slots.every(s => s.userChar !== null);
    if (currentChunkFilled) {
      const nextUnfilledIdx = this.fillWordChunks.findIndex(c => c.slots.some(s => s.userChar === null));
      if (nextUnfilledIdx !== -1) {
        this.currentChunkIndex = nextUnfilledIdx;
      }
    }
  }

  // Người dùng bấm vào Slot để gỡ ký tự ra (Undo)
  unselectSlot(chunkIdx: number, slotId: string) {
    if (this.fillAnswered) return;
    const chunk = this.fillWordChunks[chunkIdx];
    if (!chunk) return;

    const slot = chunk.slots.find(s => s.id === slotId);
    if (!slot || slot.isPreFilled || !slot.tileId) return;

    // Trả lại trạng thái cho tile
    const tile = chunk.tiles.find(t => t.id === slot.tileId);
    if (tile) {
      tile.isUsed = false;
    }

    slot.userChar = null;
    slot.tileId = null;

    this.syncFillInputFromChunks();
  }

  // Xoá ký tự vừa nhập gần nhất trong chunk hiện tại (Backspace)
  backspaceSlot(chunkIdx: number) {
    if (this.fillAnswered) return;
    const chunk = this.fillWordChunks[chunkIdx];
    if (!chunk) return;

    // Tìm slot được điền cuối cùng (không phải prefilled)
    const filledSlots = chunk.slots.filter(s => !s.isPreFilled && s.userChar !== null);
    if (filledSlots.length === 0) {
      // Nếu chunk này trống mà đang ở chunk > 0, lùi về chunk trước
      if (this.currentChunkIndex > 0) {
        this.currentChunkIndex--;
      }
      return;
    }

    const lastSlot = filledSlots[filledSlots.length - 1];
    this.unselectSlot(chunkIdx, lastSlot.id);
  }

  // ==================== 1. CHẾ ĐỘ ĐIỀN TỪ (FILL WORD) ====================
  initFill(sourceList?: VocabItem[], reviewMode = false) {
    const list = sourceList && sourceList.length > 0 ? sourceList : this.filteredVocab;
    const shuffled = shuffleArray(list.length > 0 ? list : this.allVocab);
    const curr = shuffled[shuffled.length - 1] || null;

    this.fillDeck = shuffled;
    this.currentFillItem = curr;
    this.fillCorrect = 0;
    this.fillWrong = 0;
    this.fillSkipCount = 0;
    this.fillDoneCount = 0;
    this.fillAnswered = false;
    this.fillInput = '';
    this.fillFeedback = null;
    this.fillHintShown = false;
    if (!reviewMode) this.wrongFillWords = [];
    this.isFillReviewMode = reviewMode;
    this.animKey++;

    this.setupFillChunks();

    // Tự động phát âm chỉ khi ở chế độ vi_to_zh hoặc khi người dùng bật autoplay
    if (curr && this.autoPlay) {
      speakChinese(curr.hanzi, this.volume);
    }
    this.saveToLocalStorage();
  }

  nextFillItem() {
    this.fillAnswered = false;
    this.fillInput = '';
    this.fillFeedback = null;
    this.fillHintShown = false;
    this.animKey++;

    const remaining = [...this.fillDeck];
    remaining.pop();
    this.fillDeck = remaining;

    if (remaining.length > 0) {
      const nextItem = remaining[remaining.length - 1];
      this.currentFillItem = nextItem;
      this.setupFillChunks();
      if (this.autoPlay) speakChinese(nextItem.hanzi, this.volume);
    } else {
      this.currentFillItem = null;
      this.fillWordChunks = [];
    }
  }

  checkFillAnswer() {
    if (this.fillAnswered) {
      this.nextFillItem();
      return;
    }
    if (!this.fillInput.trim() || !this.currentFillItem) return;

    this.fillAnswered = true;
    this.fillDoneCount++;

    const isZhToVi = this.direction === 'zh_to_vi';
    let isCorrect = false;

    if (isZhToVi) {
      // Nhập nghĩa tiếng Việt
      const inputNorm = this.fillInput.trim().toLowerCase();
      const vietNorm = this.currentFillItem.viet.toLowerCase();
      isCorrect = vietNorm.includes(inputNorm) || inputNorm.includes(vietNorm);
    } else {
      // Nhập Pinyin tiếng Trung
      isCorrect = checkPinyinAnswer(this.fillInput, this.currentFillItem.pinyin);
    }

    if (isCorrect) {
      this.fillCorrect++;
      this.fillFeedback = {
        text: `Chính xác! ${isZhToVi ? `Nghĩa: "${this.currentFillItem.viet}"` : `Pinyin: "${this.currentFillItem.pinyin}"`}`,
        type: 'correct'
      };
      this.wrongFillWords = this.wrongFillWords.filter(w => w.id !== this.currentFillItem!.id);
      speakChinese(this.currentFillItem.hanzi, this.volume);
    } else {
      this.fillWrong++;
      this.fillFeedback = {
        text: `Sai rồi! Đáp án: "${isZhToVi ? this.currentFillItem.viet : this.currentFillItem.pinyin}"`,
        type: 'wrong'
      };
      if (!this.wrongFillWords.some(w => w.id === this.currentFillItem!.id)) {
        this.wrongFillWords = [...this.wrongFillWords, this.currentFillItem];
      }
      speakChinese(this.currentFillItem.hanzi, this.volume);
    }
  }

  skipFill() {
    if (this.fillAnswered || !this.currentFillItem) return;
    this.fillSkipCount++;
    this.fillDoneCount++;
    const isZhToVi = this.direction === 'zh_to_vi';
    this.fillFeedback = {
      text: `Đáp án: "${isZhToVi ? this.currentFillItem.viet : this.currentFillItem.pinyin}"`,
      type: 'skip'
    };
    this.fillAnswered = true;

    // Tự động điền đầy đủ đáp án chuẩn vào các slot và đồng bộ
    if (this.fillSubMode === 'tiles' && !isZhToVi && this.fillWordChunks.length > 0) {
      this.fillWordChunks.forEach(chunk => {
        chunk.slots.forEach(slot => {
          slot.userChar = slot.char;
        });
      });
      this.syncFillInputFromChunks();
    } else {
      this.fillInput = isZhToVi ? this.currentFillItem.viet : this.currentFillItem.pinyin;
    }

    speakChinese(this.currentFillItem.hanzi, this.volume);
  }

  hintFill() {
    if (this.fillAnswered || !this.currentFillItem) return;
    const isZhToVi = this.direction === 'zh_to_vi';
    const ans = isZhToVi ? this.currentFillItem.viet : this.currentFillItem.pinyin;
    
    // Bắn thông báo Toast nhẹ nhàng ở trên cùng, không che ô chọn
    toast.info(`💡 Gợi ý: "${ans}"`, {
      duration: 3500
    });
    this.fillHintShown = true;
  }

  reviewWrongFill() {
    if (this.wrongFillWords.length === 0) return;
    this.initFill(this.wrongFillWords, true);
  }

  // ==================== 2. CHẾ ĐỘ TRẮC NGHIỆM (MULTIPLE CHOICE) ====================
  initQuiz(sourceList?: VocabItem[]) {
    const list = sourceList && sourceList.length > 0 ? sourceList : this.filteredVocab;
    const shuffled = shuffleArray(list.length > 0 ? list : this.allVocab);
    const curr = shuffled[shuffled.length - 1] || null;

    this.quizDeck = shuffled;
    this.currentQuizItem = curr;
    this.quizCorrect = 0;
    this.quizWrong = 0;
    this.quizDoneCount = 0;
    this.quizAnswered = false;
    this.quizSelectedId = null;
    this.animKey++;

    if (curr) {
      this.prepareQuizOptions(curr);
    }
  }

  private prepareQuizOptions(target: VocabItem) {
    // Ưu tiên lấy từ vựng trong các bài học đang chọn (filteredVocab).
    // Nếu số từ trong bộ lọc quá ít (< 4 từ), tự động bổ sung từ kho chung allVocab để luôn đủ 4 đáp án.
    const pool = this.filteredVocab.length >= 4 ? this.filteredVocab : this.allVocab;
    const distractors = generateDistractors(target, pool, 3);
    this.quizOptions = shuffleArray([target, ...distractors]);
  }

  selectQuizOption(item: VocabItem) {
    if (this.quizAnswered || !this.currentQuizItem) return;

    this.quizSelectedId = item.id;
    this.quizAnswered = true;
    this.quizDoneCount++;

    const isCorrect = item.id === this.currentQuizItem.id;
    if (isCorrect) {
      this.quizCorrect++;
    } else {
      this.quizWrong++;
    }

    // TTS phát âm NGAY SAU KHI chọn câu trả lời (Tuyệt đối không phát âm trước)
    speakChinese(this.currentQuizItem.hanzi, this.volume);
  }

  nextQuizItem() {
    this.quizAnswered = false;
    this.quizSelectedId = null;
    this.animKey++;

    const remaining = [...this.quizDeck];
    remaining.pop();
    this.quizDeck = remaining;

    if (remaining.length > 0) {
      const nextItem = remaining[remaining.length - 1];
      this.currentQuizItem = nextItem;
      this.prepareQuizOptions(nextItem);
    } else {
      this.currentQuizItem = null;
      this.quizOptions = [];
    }
  }

  // ==================== 3. CHẾ ĐỘ FLASHCARD ====================
  initFlash() {
    const list = this.filteredVocab.length > 0 ? this.filteredVocab : this.allVocab;
    const shuffled = shuffleArray(list);
    const curr = shuffled[shuffled.length - 1] || null;

    this.flashDeck = shuffled;
    this.currentFlashItem = curr;
    this.flashKnown = 0;
    this.flashUnknown = 0;
    this.flashRevealed = false;
    this.animKey++;

    if (curr && this.autoPlay) {
      speakChinese(curr.hanzi, this.volume);
    }
    this.saveToLocalStorage();
  }

  nextFlashItem() {
    this.flashRevealed = false;
    this.animKey++;
    const remaining = [...this.flashDeck];
    remaining.pop();
    this.flashDeck = remaining;

    if (remaining.length > 0) {
      const nextItem = remaining[remaining.length - 1];
      this.currentFlashItem = nextItem;
      if (this.autoPlay) speakChinese(nextItem.hanzi, this.volume);
    } else {
      this.currentFlashItem = null;
    }
    this.saveToLocalStorage();
  }

  markFlashKnown() {
    this.flashKnown++;
    this.nextFlashItem();
  }

  // Khi "Chưa thuộc": Bỏ qua từ này ngay, chèn lại sau 5 đến 10 từ tiếp theo ngẫu nhiên
  markFlashUnknown() {
    this.flashUnknown++;
    if (!this.currentFlashItem) return;

    const itemToRequeue = this.currentFlashItem;
    const remaining = [...this.flashDeck];
    remaining.pop(); // Bỏ từ hiện tại ra khỏi đầu thẻ

    if (remaining.length === 0) {
      // Chỉ còn 1 từ, giữ lại hỏi tiếp
      this.flashDeck = [itemToRequeue];
      this.currentFlashItem = itemToRequeue;
      this.flashRevealed = false;
      this.animKey++;
      return;
    }

    // Tính toán vị trí chèn lùi lại sau 5 đến 10 từ (hoặc cuối danh sách nếu ngắn hơn)
    const delay = Math.floor(Math.random() * 6) + 5; // 5 -> 10 từ
    const targetIndex = Math.max(0, remaining.length - delay);
    remaining.splice(targetIndex, 0, itemToRequeue);

    this.flashDeck = remaining;
    this.currentFlashItem = remaining[remaining.length - 1];
    this.flashRevealed = false;
    this.animKey++;

    if (this.currentFlashItem && this.autoPlay) {
      speakChinese(this.currentFlashItem.hanzi, this.volume);
    }
    this.saveToLocalStorage();
  }

  // ==================== 4. CHẾ ĐỘ PHÁT ÂM (SPEECH RECOGNITION) ====================
  initSpeech(sourceList?: VocabItem[]) {
    const list = sourceList && sourceList.length > 0 ? sourceList : this.filteredVocab;
    const shuffled = shuffleArray(list.length > 0 ? list : this.allVocab);
    const curr = shuffled[shuffled.length - 1] || null;

    this.speechDeck = shuffled;
    this.currentSpeechItem = curr;
    this.speechDoneCount = 0;
    this.speechCorrect = 0;
    this.speechWrong = 0;
    this.speechAnswered = false;
    this.speechFeedback = null;
    this.animKey++;

    if (curr && this.autoPlay) {
      speakChinese(curr.hanzi, this.volume);
    }
    this.saveToLocalStorage();
  }

  nextSpeechItem() {
    this.speechAnswered = false;
    this.speechFeedback = null;
    this.animKey++;

    const remaining = [...this.speechDeck];
    remaining.pop();
    this.speechDeck = remaining;

    if (remaining.length > 0) {
      const nextItem = remaining[remaining.length - 1];
      this.currentSpeechItem = nextItem;
      if (this.autoPlay) speakChinese(nextItem.hanzi, this.volume);
    } else {
      this.currentSpeechItem = null;
    }
  }

  checkSpeechAnswer(spokenPinyin: string, spokenHanzi: string) {
    if (this.speechAnswered || !this.currentSpeechItem) return;

    const targetHanzi = this.currentSpeechItem.hanzi.trim();
    const targetPinyin = this.currentSpeechItem.pinyin.trim();

    const trimmedHanzi = (spokenHanzi || '').trim();
    const trimmedPinyin = (spokenPinyin || '').trim();

    // Bắt buộc phải có chữ Hán trong kết quả nhận diện, tránh chuỗi rỗng "" hoặc tiếng Anh (như "thank you")
    const hasChinese = /[\u4e00-\u9fa5]/.test(trimmedHanzi);

    // Chỉ so khớp Hanzi nếu có chữ Hán thực sự và chuỗi không rỗng
    const isHanziMatch = hasChinese && (trimmedHanzi.includes(targetHanzi) || targetHanzi === trimmedHanzi);
    const isPinyinMatch = hasChinese && checkPinyinAnswer(trimmedPinyin, targetPinyin);

    const isCorrect = isHanziMatch || isPinyinMatch;

    this.speechAnswered = true;
    this.speechDoneCount++;

    if (isCorrect) {
      this.speechCorrect++;
      this.speechFeedback = {
        text: 'Phát âm chuẩn xác! 🎉',
        type: 'correct'
      };
    } else {
      this.speechWrong++;
      this.speechFeedback = {
        text: `Chưa chính xác: chuẩn là ${targetPinyin}`,
        type: 'wrong'
      };
    }
    this.saveToLocalStorage();
  }

  toggleSpeechAutoSubmit() {
    this.speechAutoSubmit = !this.speechAutoSubmit;
    this.saveToLocalStorage();
  }

  // Lesson Selectors: Hỗ trợ từng cấp độ riêng biệt hoặc theo tab đang xem
  toggleLesson(num: number, level: HskLevel = this.modalViewingLevel) {
    const activeLessons = level === 'HSK1' ? this.selectedLessonsHsk1 : this.selectedLessonsHsk2;
    activeLessons[num] = !activeLessons[num];

    this.initFill(this.filteredVocab, false);
    this.initQuiz(this.filteredVocab);
    this.initFlash();
    this.initSpeech(this.filteredVocab);
    this.saveToLocalStorage();
  }

  // Chọn tất cả cho cấp độ đang xem
  selectAllLessons(level: HskLevel = this.modalViewingLevel) {
    const all: Record<number, boolean> = {};
    for (let i = 1; i <= 15; i++) all[i] = true;
    if (level === 'HSK1') this.selectedLessonsHsk1 = all;
    else this.selectedLessonsHsk2 = all;

    this.initFill(this.filteredVocab, false);
    this.initQuiz(this.filteredVocab);
    this.initFlash();
    this.initSpeech(this.filteredVocab);
    this.saveToLocalStorage();
  }

  // Bỏ chọn tất cả cho cấp độ đang xem
  clearAllLessons(level: HskLevel = this.modalViewingLevel) {
    const empty: Record<number, boolean> = {};
    for (let i = 1; i <= 15; i++) empty[i] = false;
    if (level === 'HSK1') this.selectedLessonsHsk1 = empty;
    else this.selectedLessonsHsk2 = empty;

    this.initFill(this.filteredVocab, false);
    this.initQuiz(this.filteredVocab);
    this.initFlash();
    this.initSpeech(this.filteredVocab);
    this.saveToLocalStorage();
  }

  // Chọn hoặc bỏ chọn toggleAll cho cấp độ đang xem
  toggleAllLessons(level: HskLevel = this.modalViewingLevel) {
    const activeCount = level === 'HSK1' ? this.activeLessonsCountHsk1 : this.activeLessonsCountHsk2;
    if (activeCount === 15) {
      this.clearAllLessons(level);
    } else {
      this.selectAllLessons(level);
    }
  }

  deselectAllLessons(level: HskLevel = this.modalViewingLevel) {
    const single: Record<number, boolean> = {};
    for (let i = 1; i <= 15; i++) single[i] = (i === 1);
    if (level === 'HSK1') this.selectedLessonsHsk1 = single;
    else this.selectedLessonsHsk2 = single;

    this.initFill(this.filteredVocab, false);
    this.initQuiz(this.filteredVocab);
    this.initFlash();
    this.initSpeech(this.filteredVocab);
    this.saveToLocalStorage();
  }
}

export const appState = new AppState();

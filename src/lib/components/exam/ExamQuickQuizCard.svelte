<script lang="ts">
  import { onDestroy } from 'svelte';
  import Check from 'phosphor-svelte/lib/Check';
  import X from 'phosphor-svelte/lib/X';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
  import XCircle from 'phosphor-svelte/lib/XCircle';
  import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
  import ArrowLeft from 'phosphor-svelte/lib/ArrowLeft';
  import PushPin from 'phosphor-svelte/lib/PushPin';
  import PushPinSlash from 'phosphor-svelte/lib/PushPinSlash';
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
  import Stop from 'phosphor-svelte/lib/Stop';

  import Lightbulb from 'phosphor-svelte/lib/Lightbulb';
  import Trophy from 'phosphor-svelte/lib/Trophy';
  import ListNumbers from 'phosphor-svelte/lib/ListNumbers';
  import Clock from 'phosphor-svelte/lib/Clock';
  import SquaresFour from 'phosphor-svelte/lib/SquaresFour';
  import ListDashes from 'phosphor-svelte/lib/ListDashes';
  import SmartImage from '../SmartImage.svelte';
  import AnswerFeedbackDrawer from '../AnswerFeedbackDrawer.svelte';
  import { appState } from '#lib/state/appState.svelte';
  import { examRoomState } from '#lib/state/examRoomState.svelte';
  import type { QuestionItem } from '#lib/types/exam';
  import { getExamImageUrl } from '#lib/utils/examAssets';
  import { parseOptionItem } from '#lib/utils/examOptionParser';
  import { speakChinese, stopSpeech, getQuestionChineseSpeechText } from '#lib/utils/speech';
  import { getGroupExampleAnswer } from '#lib/data/examExamples';
  import InteractiveChineseText from './InteractiveChineseText.svelte';
  import InteractivePinyinText from './InteractivePinyinText.svelte';
  import ExamDialogueTranscript from './ExamDialogueTranscript.svelte';
  import ExamImageZoomModal from './ExamImageZoomModal.svelte';

  interface Props {
    question: QuestionItem;
    questionIndex: number;
    totalQuestions: number;
    selectedAnswer?: string;
    answers?: Record<number, string>;
    correctAnswers?: Record<number, string>;
    isFlagged?: boolean;
    timeRemainingSeconds?: number;
    totalCorrect?: number;
    totalWrong?: number;
    onSelectAnswer: (val: string) => void;
    onToggleFlag: () => void;
    onNextQuestion: () => void;
    onPrevQuestion: () => void;
    onOpenPalette?: () => void;
    onSubmitExam: () => void;
    onOpenZoom?: (questionNo: number) => void;
  }

  let {
    question,
    questionIndex,
    totalQuestions,
    selectedAnswer = '',
    answers = {},
    correctAnswers = {},
    isFlagged = false,
    timeRemainingSeconds = 3300,
    totalCorrect = 0,
    totalWrong = 0,
    onSelectAnswer,
    onToggleFlag,
    onNextQuestion,
    onPrevQuestion,
    onOpenPalette,
    onSubmitExam,
    onOpenZoom
  }: Props = $props();

  function getMatchingGroup(qNo: number): [number, number] | null {
    if (qNo >= 11 && qNo <= 15) return [11, 15];
    if (qNo >= 16 && qNo <= 20) return [16, 20];
    if (qNo >= 36 && qNo <= 40) return [36, 40];
    if (qNo >= 41 && qNo <= 45) return [41, 45];
    if (qNo >= 51 && qNo <= 55) return [51, 55];
    if (qNo >= 56 && qNo <= 60) return [56, 60];
    return null;
  }

  function isOptionUsedInGroup(optVal: string): boolean {
    if (!answers) return false;
    const group = getMatchingGroup(question.question_no);
    if (!group) return false;
    const [start, end] = group;
    for (let q = start; q <= end; q++) {
      if (q === question.question_no) continue;
      // Ở chế độ thi nhanh: câu q đã trả lời thì đã lộ đáp án,
      // nên chỉ xám đáp án ĐÚNG của câu q, không xám chữ mà người dùng chọn sai
      if (answers[q]) {
        const correctAns = correctAnswers?.[q] || (q === question.question_no ? question.answer : undefined);
        if (correctAns && correctAns === optVal) {
          return true;
        }
      }
    }
    return false;
  }

  const exampleAnswerForThisGroup = $derived(getGroupExampleAnswer(question.exam_code, question.question_no));

  function isExampleOption(optVal: string): boolean {
    return exampleAnswerForThisGroup !== null && exampleAnswerForThisGroup === optVal;
  }

  let isImageZoomed = $state(false);
  let userForcedView = $state<'list' | 'grid' | null>(null);

  // Suy đoán các lựa chọn trả lời tùy theo phần thi
  interface ChoiceOption {
    label: string;
    value: string;
    hanzi?: string;
    pinyin?: string;
    icon?: 'check' | 'x';
    image?: string | null;
  }

  const isTrueFalse = $derived(question.type.includes('True/False') || (question.section?.includes('Reading') && question.part?.includes('Part 3')));

  const hasMedia = $derived(!!(question.image || question.board_image));
  const isReadingTrueFalse = $derived(
    question.section?.includes('Reading') &&
      (question.part?.includes('Part 3') || (question.question_no >= 46 && question.question_no <= 50))
  );
  const isListeningDialogue = $derived(
    !hasMedia &&
      question.section?.includes('Listening') &&
      (question.part?.includes('Part 3') || (question.question_no >= 21 && question.question_no <= 35))
  );

  const optionChoices = $derived.by((): ChoiceOption[] => {
    // 1. True/False: Luôn ưu tiên hiển thị nút Đúng (Check) và Sai (X) với value √ và ×
    if (isTrueFalse) {
      return [
        { label: 'Đúng', value: '√', icon: 'check' },
        { label: 'Sai', value: '×', icon: 'x' }
      ];
    }

    // 2. Tranh A - F: Listening Part 2 (Q11 - Q20) & Reading Part 1 (Q36 - Q40)
    // Các phần này thí sinh chọn tranh A - F, tuyệt đối KHÔNG hiển thị nhãn text câu văn làm lộ bài thi
    if (
      (question.question_no >= 11 && question.question_no <= 20) ||
      (question.question_no >= 36 && question.question_no <= 40) ||
      (question.part?.includes('Part 2') && question.section?.includes('Listening')) ||
      (question.part?.includes('Part 1') && question.section?.includes('Reading'))
    ) {
      return [
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
        { label: 'C', value: 'C' },
        { label: 'D', value: 'D' },
        { label: 'E', value: 'E' },
        { label: 'F', value: 'F' }
      ];
    }

    // 3. Nếu câu hỏi có cấu hình options riêng (bóc tách tiền tố chữ cái A-F nếu có)
    if (question.options && question.options.length > 0) {
      return question.options.map((opt) => {
        if (typeof opt === 'string') {
          const parsed = parseOptionItem(opt);
          return {
            value: parsed.letter || opt,
            label: parsed.rawLabel || opt,
            hanzi: parsed.hanzi,
            pinyin: parsed.pinyin
          };
        }
        const parsed = parseOptionItem(opt.label);
        return {
          label: parsed.rawLabel || opt.label,
          value: opt.value,
          hanzi: parsed.hanzi,
          pinyin: parsed.pinyin,
          image: opt.image
        };
      });
    }

    // 4. Tranh A - F (Match / Part 2 / Reading Part 1 & 2)
    if (question.type.includes('Match') || question.part.includes('Part 2')) {
      return [
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
        { label: 'C', value: 'C' },
        { label: 'D', value: 'D' },
        { label: 'E', value: 'E' },
        { label: 'F', value: 'F' }
      ];
    }

    // 5. Mặc định A, B, C cho Part 3 & 4
    return [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' }
    ];
  });

  // isStackedLayout: Tất cả các câu không có ảnh đều hiển thị 1 cột (Đề bài ở trên, Đáp án ở dưới)
  const isStackedLayout = $derived(!hasMedia);

  const isPureLetters = $derived(
    !isTrueFalse && optionChoices.length > 0 && optionChoices.every((opt) => opt.label === opt.value)
  );

  const isShortOptions = $derived.by(() => {
    return (
      optionChoices.length > 3 &&
      optionChoices.every((opt) => !opt.hanzi || opt.hanzi.length <= 4) &&
      optionChoices.every((opt) => !opt.label || opt.label.length <= 8)
    );
  });

  const isLongOptions = $derived.by(() => {
    return optionChoices.some((opt) => (opt.hanzi && opt.hanzi.length > 5) || (opt.label && opt.label.length > 10));
  });

  const stackedGridClass = $derived.by(() => {
    if (isTrueFalse || isReadingTrueFalse) return 'grid-cols-2 gap-3 max-w-md';
    if (isPureLetters) return 'grid-cols-3 sm:grid-cols-6 gap-2.5 max-w-xl';
    if (optionChoices.length === 6) {
      if (isShortOptions) return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 max-w-4xl';
      return 'grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl';
    }
    if (optionChoices.length <= 3) return 'grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-2xl';
    if (isLongOptions) return 'grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl';
    return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-w-3xl';
  });

  const isFullListView = $derived.by(() => {
    if (isPureLetters) return false;
    if (userForcedView === 'list') return true;
    if (userForcedView === 'grid') return false;
    return isLongOptions;
  });

  const isListeningQuestion = $derived(
    Boolean(
      question.section?.includes('Listening') ||
      question.part?.includes('Listening') ||
      question.question_no <= 35 ||
      (question.text && (question.text.startsWith('Câu hỏi nghe số') || question.text.startsWith('Câu ')))
    )
  );

  const sanitizedQuestionText = $derived.by(() => {
    const raw = question.text || '';
    return raw.replace(/[（\(]\s*[A-F]\s*[）\)]/g, '（ ）');
  });

  const sanitizedQuestionPinyin = $derived.by(() => {
    let py = question.pinyin || '';
    py = py.replace(/[（\(]\s*[A-F]\s*[）\)]/g, '( )');
    if (question.question_no >= 41 && question.question_no <= 45) {
      py = py.replace(/[（\(]\s*[a-zA-Zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ\s]+[）\)]/g, '( )');
    }
    return py;
  });

  // Tách câu hỏi thành các tầng hiển thị có trật tự: Hàng chữ Hán ở trên, Pinyin ở dưới
  const parsedQuestionDisplay = $derived.by(() => {
    if (isListeningQuestion) return null;
    let raw = sanitizedQuestionText;
    if (!raw || raw.startsWith('Câu hỏi nghe số')) return null;

    // 1. Trường hợp có dấu ★ (True/False Part 3)
    if (raw.includes('★')) {
      const parts = raw.split('★');
      const contextRaw = parts[0].trim();
      const statementRaw = (parts[1] || '').trim();

      const parseChunk = (str: string) => {
        const m = str.match(/^(.*?)\s*[\(（]([a-zA-Zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ\s,\.\?!’'\-—]+)[\)）]?$/);
        if (m) {
          return { hanzi: m[1].trim(), pinyin: m[2].trim() };
        }
        return { hanzi: str, pinyin: '' };
      };

      const ctx = parseChunk(contextRaw);
      const stmt = parseChunk(statementRaw);

      let contextPinyin = ctx.pinyin;
      let statementPinyin = stmt.pinyin;

      const pinyinSource = sanitizedQuestionPinyin;
      if (pinyinSource) {
        if (pinyinSource.includes('★')) {
          const pyParts = pinyinSource.split('★');
          contextPinyin = pyParts[0].trim();
          statementPinyin = (pyParts[1] || '').trim();
        } else if (!contextPinyin) {
          contextPinyin = pinyinSource;
        }
      }
      if (question.statement_pinyin) {
        statementPinyin = question.statement_pinyin;
      }

      return {
        isTrueFalseStatement: true,
        hanzi: '',
        pinyin: '',
        contextHanzi: ctx.hanzi,
        contextPinyin,
        statementHanzi: stmt.hanzi,
        statementPinyin
      };
    }

    // 2. Trường hợp câu đơn: Chữ Hán (pinyin)
    const m = raw.match(/^(.*?)\s*[\(（]([a-zA-Zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ\s,\.\?!’'\-—]+)[\)）]$/);
    if (m) {
      return {
        isTrueFalseStatement: false,
        hanzi: m[1].trim(),
        pinyin: sanitizedQuestionPinyin || m[2].trim()
      };
    }

    return {
      isTrueFalseStatement: false,
      hanzi: raw,
      pinyin: sanitizedQuestionPinyin || ''
    };
  });

  const isAnswered = $derived(!!selectedAnswer);
  const isCorrect = $derived(isAnswered && selectedAnswer === question.answer);
  const isLastQuestion = $derived(questionIndex >= totalQuestions - 1);

  const questionPromptTitle = $derived.by(() => {
    if (question.section?.includes('Reading') || question.part?.includes('Reading') || question.question_no >= 36) {
      if (question.part?.includes('Part 1') || (question.question_no >= 36 && question.question_no <= 40)) {
        return 'Đọc câu và chọn tranh phù hợp (A – F):';
      }
      if (question.part?.includes('Part 2') || (question.question_no >= 41 && question.question_no <= 45)) {
        return 'Chọn từ thích hợp điền vào chỗ trống (A – F):';
      }
      if (question.part?.includes('Part 3') || (question.question_no >= 46 && question.question_no <= 50)) {
        return 'Đọc đoạn văn và phán đoán Đúng / Sai:';
      }
      return 'Chọn câu đối thoại phù hợp (A – F):';
    }
    if (isTrueFalse || (question.question_no >= 1 && question.question_no <= 10)) {
      return 'Nghe và phán đoán Đúng hoặc Sai:';
    }
    if (question.part?.includes('Part 2') || question.type?.includes('Match') || (question.question_no >= 11 && question.question_no <= 20)) {
      return 'Nghe và chọn tranh A – F phù hợp:';
    }
    return 'Nghe và chọn đáp án chính xác:';
  });

  const correctChoiceText = $derived.by(() => {
    if (isTrueFalse || isReadingTrueFalse) {
      return question.answer === '√' ? 'Đúng' : 'Sai';
    }
    const opt = optionChoices.find((o) => o.value === question.answer);
    if (opt) {
      if (opt.label && opt.label !== opt.value) {
        return `${opt.value}. ${opt.label}`;
      }
      return opt.value;
    }
    return question.answer || '';
  });

  function formatTime(secs: number): string {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    if (e.key === 'Escape' && isImageZoomed) {
      isImageZoomed = false;
      return;
    }
    if (isImageZoomed) return;
    if (appState.enableFeedbackDrawer && isAnswered) return;
    if (e.key === 'ArrowRight' || e.key === 'Enter') {
      if (isLastQuestion) onSubmitExam();
      else onNextQuestion();
    } else if (e.key === 'ArrowLeft' && questionIndex > 0) {
      onPrevQuestion();
    }
  }

  let isSpeaking = $state(false);

  async function handleToggleSpeech() {
    if (isSpeaking) {
      stopSpeech();
      isSpeaking = false;
      return;
    }
    // Tạm dừng audio phòng thi nếu đang phát
    examRoomState.pauseAudio();

    const chineseText = getQuestionChineseSpeechText(question.text, optionChoices);
    if (!chineseText) return;

    isSpeaking = true;
    try {
      await speakChinese(chineseText);
    } finally {
      isSpeaking = false;
    }
  }

  $effect(() => {
    // Tự động dừng phát âm khi chuyển câu hỏi
    question.question_no;
    stopSpeech();
    isSpeaking = false;
  });

  onDestroy(() => {
    stopSpeech();
  });
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Container chính phong cách MultipleChoiceQuizCard: Chiếm trọn 1 view, không bị scroll thừa -->
<div class="flex-1 min-h-0 flex flex-col justify-between overflow-y-auto lg:overflow-hidden">
  <!-- Thẻ Question Card trung tâm (Tối ưu độ thoáng, không bị đè nút) -->
  <main
    class="flex-1 min-h-0 bg-white dark:bg-[#1B1B1B] rounded-3xl border border-slate-200/90 dark:border-[#282A2C] shadow-xs p-3 sm:p-5 md:p-6 flex flex-col items-center relative overflow-y-auto lg:overflow-hidden transition-colors"
  >
    <!-- Thanh Header Thẻ Câu Hỏi: Tách biệt rõ ràng, 100% không trùng đè ảnh -->
    <div class="w-full flex items-center justify-between gap-2 pb-2 sm:pb-3 border-b border-slate-100 dark:border-neutral-800/80 shrink-0 select-none">
      <div class="flex items-center gap-2 sm:gap-2.5">
        <button
          type="button"
          onclick={() => onOpenPalette && onOpenPalette()}
          class="inline-flex items-center gap-1.5 h-8 px-2.5 sm:px-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-900/50 font-bold text-xs hover:bg-orange-100 dark:hover:bg-orange-900/60 active:scale-95 transition-all cursor-pointer shadow-2xs"
          title="Bấm để mở danh sách 60 câu hỏi"
        >
          <ListNumbers weight="bold" class="w-3.5 h-3.5" />
          <span class="uppercase tracking-wider">Câu {question.question_no}/{totalQuestions}</span>
        </button>

        <!-- Badge hiển thị phần thi thanh lịch: Sát bên phải nút chọn câu -->
        <div class="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 dark:text-neutral-400">
          <span class="w-1.5 h-1.5 rounded-full {question.question_no <= 35 ? 'bg-sky-500' : 'bg-orange-500'}"></span>
          <span>{question.question_no <= 35 ? 'Phần Nghe' : 'Phần Đọc'}</span>
          <span class="hidden sm:inline text-slate-300 dark:text-neutral-600">•</span>
          <span class="hidden sm:inline lowercase text-[10px]">{question.part}</span>
        </div>
      </div>

      <div class="flex items-center gap-1.5 shrink-0">
        <!-- Nút Đọc phát âm câu hỏi bằng TTS (Chỉ cho câu hỏi phần Đọc: Q36 trở đi) -->
        {#if question.question_no >= 36}
          <button
            type="button"
            onclick={handleToggleSpeech}
            class="w-8 h-8 rounded-xl {isSpeaking ? 'bg-amber-600 hover:bg-amber-700 ring-2 ring-amber-400 ring-offset-1 ring-offset-white dark:ring-offset-[#1B1B1B]' : 'bg-emerald-500 hover:bg-emerald-600'} active:scale-95 text-white flex items-center justify-center shadow-2xs transition-all cursor-pointer"
            title={isSpeaking ? 'Dừng đọc' : 'Phát âm câu hỏi tiếng Trung'}
            aria-label={isSpeaking ? 'Dừng đọc' : 'Phát âm câu hỏi tiếng Trung'}
          >
            {#if isSpeaking}
              <Stop weight="fill" class="w-4 h-4 text-white animate-pulse" />
            {:else}
              <SpeakerHigh weight="bold" class="w-4 h-4" />
            {/if}
          </button>
        {/if}

        <!-- Nút Cắm cờ / Ghim câu hỏi -->
        <button
          type="button"
          onclick={onToggleFlag}
          class="h-8 px-2.5 rounded-xl flex items-center gap-1 shadow-2xs active:scale-95 transition-all cursor-pointer border {
            isFlagged
              ? 'bg-amber-100 dark:bg-amber-950/70 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300'
              : 'bg-slate-50 dark:bg-[#282A2C] border-slate-200 dark:border-[#37393B] text-slate-500 dark:text-neutral-400 hover:text-slate-700'
          }"
          title={isFlagged ? 'Bỏ ghim câu hỏi này' : 'Ghim câu hỏi để xem lại'}
        >
          {#if isFlagged}
            <PushPinSlash weight="bold" class="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span class="text-xs font-bold hidden sm:inline">Bỏ ghim</span>
          {:else}
            <PushPin weight="bold" class="w-4 h-4" />
            <span class="text-xs font-bold hidden sm:inline">Ghim</span>
          {/if}
        </button>
      </div>
    </div>

    <!-- Container Nội Dung: Phân loại theo cấu trúc câu hỏi -->
    {#if isStackedLayout}
      <!-- BỐ CỤC 1 CỘT (Cho Q21-35 Nghe không hình 3 đáp án & Q46-50 Đọc True/False ít đáp án) -->
      <div class="w-full flex-1 flex flex-col items-center justify-center my-auto py-2 min-h-0 max-w-2xl mx-auto overflow-y-auto scrollbar-thin">
        <!-- Tiêu đề câu hỏi / Prompt Text -->
        <span class="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-[#8E918F] mb-2 text-center">
          {questionPromptTitle}
        </span>

        <!-- Khối hiển thị đề bài: Đoạn văn + Nhận định (Q46-50) hoặc Câu hỏi (Q21-35) nằm TRÊN -->
        {#if parsedQuestionDisplay}
          <div class="w-full mb-3.5 text-center select-text">
            {#if parsedQuestionDisplay.isTrueFalseStatement}
              <!-- Part 3: Khối Ngữ cảnh + Khối Nhận định ★ (Nằm TRÊN các nút đáp án) -->
              <div class="bg-slate-50/70 dark:bg-[#202224]/80 border border-slate-200/80 dark:border-neutral-800 rounded-2xl p-3 sm:p-4 text-left space-y-2.5 shadow-2xs">
                <div>
                  {#if parsedQuestionDisplay.contextPinyin}
                    <div class="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 font-sans tracking-wide mb-1">
                      <InteractivePinyinText pinyin={parsedQuestionDisplay.contextPinyin} />
                    </div>
                  {/if}
                  <div class="text-base sm:text-lg font-bold text-slate-900 dark:text-[#E3E3E3] font-serif leading-snug">
                    <InteractiveChineseText text={parsedQuestionDisplay.contextHanzi} />
                  </div>
                </div>

                <div class="pt-2 border-t border-slate-200/60 dark:border-neutral-700/60 flex items-start gap-2">
                  <span class="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 text-xs font-black shrink-0 mt-0.5">
                    ★ Nhận định
                  </span>
                  <div class="flex-1">
                    {#if parsedQuestionDisplay.statementPinyin}
                      <div class="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 font-sans tracking-wide mb-1">
                        <InteractivePinyinText pinyin={parsedQuestionDisplay.statementPinyin} />
                      </div>
                    {/if}
                    <div class="text-base sm:text-lg font-bold text-slate-900 dark:text-[#E3E3E3] font-serif leading-snug">
                      <InteractiveChineseText text={parsedQuestionDisplay.statementHanzi} />
                    </div>
                  </div>
                </div>
              </div>
            {:else}
              <!-- Câu thông thường: Pinyin trên, Chữ Hán dưới -->
              <div class="space-y-1">
                {#if parsedQuestionDisplay.pinyin}
                  <div class="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 font-sans tracking-wide leading-relaxed">
                    <InteractivePinyinText pinyin={parsedQuestionDisplay.pinyin} />
                  </div>
                {/if}
                <div class="text-lg sm:text-xl font-bold text-slate-900 dark:text-[#E3E3E3] leading-snug font-serif">
                  <InteractiveChineseText text={parsedQuestionDisplay.hanzi} />
                </div>
              </div>
            {/if}
          </div>
        {/if}

        <!-- Hộp Lời thoại & Giải thích tức thì khi đã trả lời -->
        {#if isAnswered}
          <div class="w-full mb-3 p-3 rounded-2xl border text-left transition-all animate-in fade-in duration-150 {
            isCorrect
              ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
              : 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100'
          }">
            <div class="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
              {#if isCorrect}
                <CheckCircle weight="fill" class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>
                  Chính xác! Đáp án:
                  {#if question.answer === '√'}
                    <span class="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold ml-1">
                      <Check weight="bold" class="w-3.5 h-3.5" /> Đúng
                    </span>
                  {:else if question.answer === '×'}
                    <span class="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold ml-1">
                      <X weight="bold" class="w-3.5 h-3.5" /> Sai
                    </span>
                  {:else}
                    <strong class="font-mono ml-1">{question.answer}</strong>
                  {/if}
                </span>
              {:else}
                <XCircle weight="fill" class="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                <span>
                  Chưa đúng! Đáp án đúng:
                  {#if question.answer === '√'}
                    <span class="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold ml-1">
                      <Check weight="bold" class="w-3.5 h-3.5" /> Đúng
                    </span>
                  {:else if question.answer === '×'}
                    <span class="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold ml-1">
                      <X weight="bold" class="w-3.5 h-3.5" /> Sai
                    </span>
                  {:else}
                    <strong class="font-mono text-emerald-600 dark:text-emerald-400 ml-1">{question.answer}</strong>
                  {/if}
                </span>
              {/if}
            </div>

            {#if question.listening_script}
              <div class="mt-2 pt-2 border-t border-slate-200/50 dark:border-neutral-800">
                <ExamDialogueTranscript
                  script={question.listening_script}
                  pinyin={question.listening_pinyin}
                  viet={question.listening_viet}
                />
              </div>
            {/if}

            {#if question.explanation}
              <div class="text-xs sm:text-sm mt-1.5 text-slate-600 dark:text-neutral-300 leading-snug flex items-start gap-1.5">
                <Lightbulb weight="fill" class="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{question.explanation}</span>
              </div>
            {/if}
          </div>
        {/if}

        <!-- Lựa chọn đáp án: Nằm ngay DƯỚI đề bài / đoạn văn -->
        <div class="w-full grid {stackedGridClass} mx-auto">
          {#each optionChoices as opt (opt.value)}
            {@const isExample = isExampleOption(opt.value)}
            {@const isSelected = !isExample && selectedAnswer === opt.value}
            {@const isTarget = opt.value === question.answer}
            {@const isRevealed = isAnswered}
            {@const isUsedElsewhere = !isRevealed && !isSelected && !isExample && isOptionUsedInGroup(opt.value)}

            <button
              type="button"
              disabled={isExample}
              onclick={() => !isExample && onSelectAnswer(opt.value)}
              class={`min-h-[48px] ${isPureLetters ? 'h-11 sm:h-12' : isShortOptions ? 'p-2 sm:p-2.5' : 'p-3'} rounded-2xl flex items-center ${isTrueFalse || isReadingTrueFalse || isPureLetters ? 'justify-center gap-2' : isShortOptions ? 'justify-center gap-2' : 'gap-3'} transition-all border select-none ${
                isExample
                  ? 'opacity-35 cursor-not-allowed pointer-events-none border-dashed bg-slate-100/50 dark:bg-neutral-800/30 text-slate-400 dark:text-neutral-500'
                  : isUsedElsewhere ? 'opacity-45 border-dashed hover:opacity-100 transition-opacity cursor-pointer' : 'cursor-pointer'
              } ${
                isExample
                  ? ''
                  : !isRevealed
                  ? 'bg-white dark:bg-[#1E1E1E] hover:border-orange-400/70 hover:bg-orange-50/20 dark:hover:bg-neutral-800 border-slate-200/90 dark:border-neutral-800 active:scale-98 shadow-2xs text-slate-800 dark:text-slate-200'
                  : isTarget
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-100 shadow-xs ring-1 ring-emerald-500/30'
                  : isSelected
                  ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-950 dark:text-rose-100 shadow-xs ring-1 ring-rose-500/30'
                  : 'bg-slate-50 dark:bg-[#282A2C]/40 border-slate-200/80 dark:border-[#282A2C] opacity-50'
              }`}
            >
              <div
                class={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs border transition-colors ${
                  isExample
                    ? 'bg-slate-200/70 dark:bg-[#282A2C] text-slate-400 dark:text-neutral-500 line-through border-slate-200 dark:border-[#37393B]'
                    : !isRevealed
                    ? 'bg-slate-100 dark:bg-[#282A2C] text-slate-700 dark:text-[#C4C7C5] border-slate-200 dark:border-[#37393B]'
                    : isTarget
                    ? 'bg-emerald-500 text-white border-emerald-600'
                    : isSelected
                    ? 'bg-rose-500 text-white border-rose-600'
                    : 'bg-slate-200/60 dark:bg-[#282A2C] text-slate-400 border-slate-200 dark:border-[#37393B]'
                }`}
              >
                {#if opt.icon === 'check'}
                  <Check weight="bold" class="w-4 h-4" />
                {:else if opt.icon === 'x'}
                  <X weight="bold" class="w-4 h-4" />
                {:else}
                  {opt.value}
                {/if}
              </div>

              {#if isTrueFalse || isReadingTrueFalse}
                <span class="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100">
                  {opt.label}
                </span>
              {:else}
                <div class="flex-1 min-w-0 flex flex-col items-start leading-snug py-0.5 select-text">
                  {#if opt.pinyin}
                    <span class="text-xs text-slate-400 dark:text-neutral-400 font-sans tracking-wide leading-tight break-words text-left mb-0.5">
                      <InteractivePinyinText pinyin={opt.pinyin} />
                    </span>
                  {/if}
                  {#if opt.hanzi}
                    <span class="text-sm sm:text-base font-bold font-serif text-slate-800 dark:text-slate-100 leading-snug break-words text-left">
                      <InteractiveChineseText text={opt.hanzi} />
                    </span>
                  {:else}
                    <span class="text-sm font-semibold break-words text-left">
                      {opt.label}
                    </span>
                  {/if}
                </div>
              {/if}
            </button>
          {/each}
        </div>
      </div>
    {:else}
      <!-- BỐ CỤC 2 CỘT SPLIT (Cho câu có ảnh Q1-10, Q11-20, Q36-40 và điền từ Q41-45, ghép câu Q51-60) -->
      <div class="w-full flex-1 flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 items-center justify-center my-auto py-2 min-h-0">
        <!-- CỘT 1 (Desktop col-span-5): Tranh minh họa, Đề bài, Hán tự to rõ, Giải thích tức thì -->
        <div class="w-full lg:col-span-5 flex flex-col items-center justify-center text-center py-1 lg:border-r lg:border-slate-100 dark:lg:border-[#282A2C] lg:pr-6 shrink-0 lg:shrink lg:h-full lg:overflow-y-auto scrollbar-thin">

          <!-- Ảnh câu hỏi đơn lẻ nếu có (Q1 - Q10) -->
          {#if question.image}
            <div class="relative mb-1.5 sm:mb-2 max-h-[25vh] sm:max-h-[32vh] flex items-center justify-center">
              <button
                type="button"
                onclick={() => (onOpenZoom ? onOpenZoom(question.question_no) : (isImageZoomed = true))}
                class="cursor-pointer bg-transparent border-0 p-0 block group"
                title="Bấm để phóng to ảnh"
                aria-label="Phóng to ảnh"
              >
                <img
                  src={getExamImageUrl(question.exam_code, question.image)}
                  alt={`Hình câu ${question.question_no}`}
                  class="max-h-[22vh] sm:max-h-[30vh] w-auto max-w-full rounded-2xl object-contain border border-slate-100 dark:border-[#282A2C] shadow-2xs bg-slate-50 dark:bg-[#282A2C] transition-transform group-hover:scale-[1.01]"
                  loading="lazy"
                />
              </button>
            </div>
          {/if}

          <!-- Bảng tranh đối chiếu A - F nếu có (Q11 - Q20, Match Part 1/2) -->
          {#if question.board_image}
            <div class="relative mb-1 sm:mb-1.5 {isPureLetters ? 'max-w-md sm:max-w-lg md:max-w-xl' : 'max-w-sm sm:max-w-md'} w-full flex flex-col items-center justify-center">
              <div class="relative w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-[#282A2C] shadow-2xs bg-white dark:bg-[#1E1E1E]">
                <button
                  type="button"
                  onclick={() => (onOpenZoom ? onOpenZoom(question.question_no) : (isImageZoomed = true))}
                  class="w-full flex items-center justify-center p-1 sm:p-1.5 cursor-pointer bg-transparent border-0 group"
                  title="Bấm để phóng to bảng tranh A - F"
                  aria-label="Phóng to bảng tranh đối chiếu"
                >
                  <img
                    src={getExamImageUrl(question.exam_code, question.board_image)}
                    alt="Bảng tranh đối chiếu A - F"
                    class="{isPureLetters ? 'max-h-60 sm:max-h-80 md:max-h-96' : 'max-h-32 xs:max-h-40 sm:max-h-48 md:max-h-56'} w-auto max-w-full rounded-xl object-contain mx-auto transition-transform group-hover:scale-[1.01]"
                    loading="lazy"
                  />
                </button>
              </div>
            </div>
          {/if}

          <!-- Tiêu đề câu hỏi / Prompt Text & Đề bài: Khi isPureLetters trên Desktop thì chuyển sang đầu Cột 2 -->
          <div class="{isPureLetters ? 'lg:hidden ' : ''}w-full flex flex-col items-center">
            <span class="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-[#8E918F] mb-1 text-center">
              {questionPromptTitle}
            </span>

            <!-- Khối hiển thị đề bài phân tầng: Hàng trên Pinyin, Hàng dưới chữ Hán -->
            {#if parsedQuestionDisplay}
              <div class="w-full max-w-sm mb-2 text-center select-text">
                {#if parsedQuestionDisplay.isTrueFalseStatement}
                  <!-- Part 3: Khối Ngữ cảnh + Khối Nhận định ★ -->
                  <div class="bg-slate-50/70 dark:bg-[#202224]/80 border border-slate-200/80 dark:border-neutral-800 rounded-2xl p-3 text-left space-y-2.5">
                    <div>
                      {#if parsedQuestionDisplay.contextPinyin}
                        <div class="text-xs text-slate-500 dark:text-neutral-400 font-sans tracking-wide mb-1">
                          <InteractivePinyinText pinyin={parsedQuestionDisplay.contextPinyin} />
                        </div>
                      {/if}
                      <div class="text-base sm:text-lg font-bold text-slate-900 dark:text-[#E3E3E3] font-serif leading-snug">
                        <InteractiveChineseText text={parsedQuestionDisplay.contextHanzi} />
                      </div>
                    </div>

                    <div class="pt-2 border-t border-slate-200/60 dark:border-neutral-700/60 flex items-start gap-2">
                      <span class="px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 text-[11px] font-black shrink-0 mt-0.5">
                        ★ Nhận định
                      </span>
                      <div class="flex-1">
                        {#if parsedQuestionDisplay.statementPinyin}
                          <div class="text-xs text-slate-500 dark:text-neutral-400 font-sans tracking-wide mb-1">
                            <InteractivePinyinText pinyin={parsedQuestionDisplay.statementPinyin} />
                          </div>
                        {/if}
                        <div class="text-base sm:text-lg font-bold text-slate-900 dark:text-[#E3E3E3] font-serif leading-snug">
                          <InteractiveChineseText text={parsedQuestionDisplay.statementHanzi} />
                        </div>
                      </div>
                    </div>
                  </div>
                {:else}
                  <!-- Câu thông thường: Hàng trên Pinyin, Hàng dưới Chữ Hán -->
                  <div class="space-y-1">
                    {#if parsedQuestionDisplay.pinyin}
                      <div class="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 font-sans tracking-wide leading-relaxed">
                        <InteractivePinyinText pinyin={parsedQuestionDisplay.pinyin} />
                      </div>
                    {/if}
                    <div class="text-lg sm:text-2xl font-black text-slate-900 dark:text-[#E3E3E3] leading-snug font-serif">
                      <InteractiveChineseText text={parsedQuestionDisplay.hanzi} />
                    </div>
                  </div>
                {/if}
              </div>
            {/if}
          </div>

          <!-- Hộp Lời thoại & Giải thích tức thì khi đã trả lời (Chỉ hiển thị trên Mobile/Tablet) -->
          {#if isAnswered}
            <div class="lg:hidden w-full max-w-sm mt-2 p-2.5 rounded-2xl border text-left transition-all animate-in fade-in duration-150 {
              isCorrect
                ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
                : 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100'
            }">
              <div class="flex items-center gap-1.5 font-bold text-xs">
                {#if isCorrect}
                  <CheckCircle weight="fill" class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>
                    Chính xác! Đáp án:
                    {#if question.answer === '√'}
                      <span class="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold ml-1">
                        <Check weight="bold" class="w-3.5 h-3.5" /> Đúng
                      </span>
                    {:else if question.answer === '×'}
                      <span class="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold ml-1">
                        <X weight="bold" class="w-3.5 h-3.5" /> Sai
                      </span>
                    {:else}
                      <strong class="font-mono ml-1">{question.answer}</strong>
                    {/if}
                  </span>
                {:else}
                  <XCircle weight="fill" class="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>
                    Chưa đúng! Đáp án đúng:
                    {#if question.answer === '√'}
                      <span class="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold ml-1">
                        <Check weight="bold" class="w-3.5 h-3.5" /> Đúng
                      </span>
                    {:else if question.answer === '×'}
                      <span class="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold ml-1">
                        <X weight="bold" class="w-3.5 h-3.5" /> Sai
                      </span>
                    {:else}
                      <strong class="font-mono text-emerald-600 dark:text-emerald-400 ml-1">{question.answer}</strong>
                    {/if}
                  </span>
                {/if}
              </div>

              {#if question.listening_script}
                <div class="mt-1.5 pt-1.5 border-t border-slate-200/50 dark:border-neutral-800">
                  <ExamDialogueTranscript
                    script={question.listening_script}
                    pinyin={question.listening_pinyin}
                    viet={question.listening_viet}
                  />
                </div>
              {/if}

              {#if question.explanation}
                <div class="text-[11px] mt-1 text-slate-600 dark:text-neutral-300 leading-tight flex items-start gap-1">
                  <Lightbulb weight="fill" class="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{question.explanation}</span>
                </div>
              {/if}
            </div>
          {/if}
        </div>

        <!-- CỘT 2 (Desktop col-span-7): Các đáp án trắc nghiệm trên Desktop (hưởng 100% chiều cao) -->
        <div class="w-full lg:col-span-7 hidden lg:flex flex-col justify-center h-full py-1 lg:pl-4 space-y-2.5 overflow-y-auto scrollbar-thin">
          {#if isPureLetters}
            <!-- Trên Desktop: Hiển thị Đề bài ngay phía trên các ô chọn A - F -->
            <div class="w-full mb-3 text-left select-text">
              <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#8E918F] mb-1.5 block">
                {questionPromptTitle}
              </span>

              {#if parsedQuestionDisplay}
                <div class="space-y-1">
                  {#if parsedQuestionDisplay.pinyin}
                    <div class="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 font-sans tracking-wide leading-relaxed">
                      <InteractivePinyinText pinyin={parsedQuestionDisplay.pinyin} />
                    </div>
                  {/if}
                  <div class="text-lg sm:text-2xl font-black text-slate-900 dark:text-[#E3E3E3] leading-snug font-serif">
                    <InteractiveChineseText text={parsedQuestionDisplay.hanzi} />
                  </div>
                </div>
              {:else if question.text}
                <div class="space-y-1">
                  {#if !isListeningQuestion && question.pinyin}
                    <div class="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 font-sans tracking-wide leading-relaxed">
                      <InteractivePinyinText pinyin={sanitizedQuestionPinyin} />
                    </div>
                  {/if}
                  <div class="text-lg sm:text-2xl font-black text-slate-900 dark:text-[#E3E3E3] leading-snug font-serif">
                    <InteractiveChineseText text={sanitizedQuestionText} />
                  </div>
                </div>
              {/if}
            </div>
          {/if}
          <!-- Hộp Lời thoại & Giải thích tức thì trên Desktop -->
          {#if isAnswered}
            <div class="w-full p-3 rounded-2xl border text-left transition-all animate-in fade-in duration-150 {
              isCorrect
                ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
                : 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100'
            }">
              <div class="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
                {#if isCorrect}
                  <CheckCircle weight="fill" class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>
                    Chính xác! Đáp án:
                    {#if question.answer === '√'}
                      <span class="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold ml-1">
                        <Check weight="bold" class="w-3.5 h-3.5" /> Đúng
                      </span>
                    {:else if question.answer === '×'}
                      <span class="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold ml-1">
                        <X weight="bold" class="w-3.5 h-3.5" /> Sai
                      </span>
                    {:else}
                      <strong class="font-mono ml-1">{question.answer}</strong>
                    {/if}
                  </span>
                {:else}
                  <XCircle weight="fill" class="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>
                    Chưa đúng! Đáp án đúng:
                    {#if question.answer === '√'}
                      <span class="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold ml-1">
                        <Check weight="bold" class="w-3.5 h-3.5" /> Đúng
                      </span>
                    {:else if question.answer === '×'}
                      <span class="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold ml-1">
                        <X weight="bold" class="w-3.5 h-3.5" /> Sai
                      </span>
                    {:else}
                      <strong class="font-mono text-emerald-600 dark:text-emerald-400 ml-1">{question.answer}</strong>
                    {/if}
                  </span>
                {/if}
              </div>

              {#if question.listening_script}
                <div class="mt-2 pt-2 border-t border-slate-200/50 dark:border-neutral-800">
                  <ExamDialogueTranscript
                    script={question.listening_script}
                    pinyin={question.listening_pinyin}
                    viet={question.listening_viet}
                  />
                </div>
              {/if}

              {#if question.explanation}
                <div class="text-xs sm:text-sm mt-1.5 text-slate-600 dark:text-neutral-300 leading-snug flex items-start gap-1.5">
                  <Lightbulb weight="fill" class="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{question.explanation}</span>
                </div>
              {/if}
            </div>
          {/if}

          <!-- Option Grid Desktop -->
          {#if isPureLetters}
            <!-- Bảng 6 ô chữ cái A - F thuần túy, sạch sẽ, không có chữ thừa bên trong -->
            <div class="w-full grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {#each optionChoices as opt (opt.value)}
                {@const isExample = isExampleOption(opt.value)}
                {@const isSelected = !isExample && selectedAnswer === opt.value}
                {@const isTarget = opt.value === question.answer}
                {@const isRevealed = isAnswered}
                {@const isUsedElsewhere = !isRevealed && !isSelected && !isExample && isOptionUsedInGroup(opt.value)}

                <button
                  type="button"
                  disabled={isExample}
                  onclick={() => !isExample && onSelectAnswer(opt.value)}
                  class={`h-12 sm:h-14 rounded-2xl text-base sm:text-lg font-black flex flex-col items-center justify-center transition-all border select-none ${
                    isExample
                      ? 'opacity-35 cursor-not-allowed pointer-events-none border-dashed bg-slate-100/50 dark:bg-neutral-800/30 text-slate-400 dark:text-neutral-500'
                      : isUsedElsewhere ? 'opacity-45 border-dashed hover:opacity-100 transition-opacity cursor-pointer' : 'cursor-pointer'
                  } ${
                    isExample
                      ? ''
                      : !isRevealed
                      ? 'bg-white dark:bg-[#1E1E1E] hover:border-orange-400/70 hover:bg-orange-50/20 dark:hover:bg-neutral-800 border-slate-200/90 dark:border-neutral-800 active:scale-95 shadow-2xs text-slate-800 dark:text-slate-200'
                      : isTarget
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs ring-2 ring-emerald-500/30'
                      : isSelected
                      ? 'bg-rose-500 text-white border-rose-600 shadow-xs ring-2 ring-rose-500/30'
                      : 'bg-slate-50 dark:bg-[#282A2C]/40 border-slate-200/80 dark:border-[#282A2C] opacity-40 text-slate-400'
                  }`}
                >
                  <span class={isExample ? 'line-through leading-none' : ''}>{opt.value}</span>
                  {#if isExample}
                    <span class="text-[9px] font-semibold text-slate-400 dark:text-neutral-500 leading-none mt-0.5">Ví dụ</span>
                  {/if}
                </button>
              {/each}
            </div>
          {:else}
            <!-- Option Grid Desktop: 2 cột rộng rãi, Pinyin trên Hán tự dưới, thoáng đãng không ép chữ -->
            <div class="w-full grid {isTrueFalse ? 'grid-cols-2' : 'grid-cols-2'} gap-2 sm:gap-2.5">
              {#each optionChoices as opt, idx (opt.value)}
                {@const isExample = isExampleOption(opt.value)}
                {@const isSelected = !isExample && selectedAnswer === opt.value}
                {@const isTarget = opt.value === question.answer}
                {@const isRevealed = isAnswered}
                {@const isUsedElsewhere = !isRevealed && !isSelected && !isExample && isOptionUsedInGroup(opt.value)}

                <button
                  type="button"
                  disabled={isExample}
                  onclick={() => !isExample && onSelectAnswer(opt.value)}
                  class={`min-h-[48px] p-2 sm:p-2.5 rounded-2xl text-left flex items-center ${opt.label === opt.value ? 'justify-center' : 'gap-2.5'} transition-all border relative select-none ${
                    isExample
                      ? 'opacity-35 cursor-not-allowed pointer-events-none border-dashed bg-slate-100/50 dark:bg-neutral-800/30 text-slate-400 dark:text-neutral-500'
                      : isUsedElsewhere ? 'opacity-45 border-dashed hover:opacity-100 transition-opacity cursor-pointer' : 'cursor-pointer'
                  } ${
                    isExample
                      ? ''
                      : !isRevealed
                      ? 'bg-white dark:bg-[#1E1E1E] hover:border-orange-400/70 hover:bg-orange-50/20 dark:hover:bg-neutral-800 border-slate-200/90 dark:border-neutral-800 active:scale-98 shadow-2xs text-slate-800 dark:text-slate-200'
                      : isTarget
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-100 shadow-xs ring-1 ring-emerald-500/30'
                      : isSelected
                      ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-950 dark:text-rose-100 shadow-xs ring-1 ring-rose-500/30'
                      : 'bg-slate-50 dark:bg-[#282A2C]/40 border-slate-200/80 dark:border-[#282A2C] opacity-50'
                  }`}
                >
                  <div
                    class={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs border transition-colors ${
                      isExample
                        ? 'bg-slate-200/70 dark:bg-[#282A2C] text-slate-400 dark:text-neutral-500 line-through border-slate-200 dark:border-[#37393B]'
                        : !isRevealed
                        ? 'bg-slate-100 dark:bg-[#282A2C] text-slate-700 dark:text-[#C4C7C5] border-slate-200 dark:border-[#37393B]'
                        : isTarget
                        ? 'bg-emerald-500 text-white border-emerald-600'
                        : isSelected
                        ? 'bg-rose-500 text-white border-rose-600'
                        : 'bg-slate-200/60 dark:bg-[#282A2C] text-slate-400 border-slate-200 dark:border-[#37393B]'
                    }`}
                  >
                    {#if opt.icon === 'check'}
                      <Check weight="bold" class="w-4 h-4" />
                    {:else if opt.icon === 'x'}
                      <X weight="bold" class="w-4 h-4" />
                    {:else}
                      {opt.value}
                    {/if}
                  </div>

                  {#if isExample}
                    <span class="text-xs font-semibold text-slate-400 dark:text-neutral-500">Ví dụ</span>
                  {:else if opt.label !== opt.value}
                    <div class="flex-1 min-w-0 flex flex-col items-start leading-snug py-0.5 select-text">
                      {#if opt.pinyin}
                        <span class="text-xs text-slate-400 dark:text-neutral-400 font-sans tracking-wide leading-tight break-words text-left mb-0.5">
                          <InteractivePinyinText pinyin={opt.pinyin} />
                        </span>
                      {/if}
                      {#if opt.hanzi}
                        <span class="text-sm sm:text-base font-bold font-serif text-slate-800 dark:text-slate-100 leading-snug break-words text-left">
                          <InteractiveChineseText text={opt.hanzi} />
                        </span>
                      {:else}
                        <span class="text-sm font-semibold break-words text-left">
                          {opt.label}
                        </span>
                      {/if}
                    </div>
                  {/if}
                </button>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </main>

  <!-- Quiz Footer Controls: Đáp án & Nút tiếp theo trên Mobile/Tablet (< lg) -->
  <footer class="shrink-0 mt-2 space-y-2 lg:hidden">
    {#if !isStackedLayout}
      <!-- Thanh công cụ chuyển đổi dạng xem trên Mobile nếu có > 2 lựa chọn -->
      {#if !isTrueFalse && !isPureLetters && optionChoices.length > 2}
      <div class="flex items-center justify-between px-1 text-[11px] font-bold text-slate-500 dark:text-neutral-400">
        <span>Chọn đáp án:</span>
        <button
          type="button"
          onclick={() => {
            userForcedView = isFullListView ? 'grid' : 'list';
          }}
          class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer text-[10px]"
          title="Chuyển đổi kiểu hiển thị danh sách dọc / 2 cột"
        >
          {#if isFullListView}
            <SquaresFour weight="bold" class="w-3.5 h-3.5" />
            <span>Xem 2 cột</span>
          {:else}
            <ListDashes weight="bold" class="w-3.5 h-3.5" />
            <span>Xem 1 cột thoáng</span>
          {/if}
        </button>
      </div>
    {/if}

    {#if isPureLetters}
      <!-- Grid 6 ô chữ cái A - F gọn gàng trên 1 hàng ở Mobile -->
      <div class="grid grid-cols-6 gap-1.5 sm:gap-2">
        {#each optionChoices as opt (opt.value)}
          {@const isExample = isExampleOption(opt.value)}
          {@const isSelected = !isExample && selectedAnswer === opt.value}
          {@const isTarget = opt.value === question.answer}
          {@const isRevealed = isAnswered}
          {@const isUsedElsewhere = !isRevealed && !isSelected && !isExample && isOptionUsedInGroup(opt.value)}

          <button
            type="button"
            disabled={isExample}
            onclick={() => !isExample && onSelectAnswer(opt.value)}
            class={`h-11 sm:h-12 rounded-2xl text-base font-black flex flex-col items-center justify-center transition-all border select-none ${
              isExample
                ? 'opacity-35 cursor-not-allowed pointer-events-none border-dashed bg-slate-100/50 dark:bg-neutral-800/30 text-slate-400 dark:text-neutral-500'
                : isUsedElsewhere ? 'opacity-45 border-dashed hover:opacity-100 transition-opacity cursor-pointer' : 'cursor-pointer'
            } ${
              isExample
                ? ''
                : !isRevealed
                ? 'bg-white dark:bg-[#1E1E1E] hover:bg-slate-50 dark:hover:bg-[#282A2C] border-slate-200 dark:border-[#282A2C] active:scale-95 shadow-2xs text-slate-800 dark:text-slate-200'
                : isTarget
                ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs ring-2 ring-emerald-500/30'
                : isSelected
                ? 'bg-rose-500 text-white border-rose-600 shadow-xs ring-2 ring-rose-500/30'
                : 'bg-slate-50 dark:bg-[#282A2C]/40 border-slate-200/80 dark:border-[#282A2C] opacity-40 text-slate-400'
            }`}
          >
            <span class={isExample ? 'line-through leading-none' : ''}>{opt.value}</span>
            {#if isExample}
              <span class="text-[8px] font-semibold text-slate-400 dark:text-neutral-500 leading-none mt-0.5">Ví dụ</span>
            {/if}
          </button>
        {/each}
      </div>
    {:else}
      <!-- Options Grid/List Mobile: Tự động dạng danh sách 1 cột thông thoáng khi có câu dài -->
      <div class={isFullListView ? 'flex flex-col gap-2 max-h-[44vh] overflow-y-auto pr-0.5 scrollbar-thin' : 'grid grid-cols-2 gap-2'}>
        {#each optionChoices as opt, idx (opt.value)}
          {@const isExample = isExampleOption(opt.value)}
          {@const isSelected = !isExample && selectedAnswer === opt.value}
          {@const isTarget = opt.value === question.answer}
          {@const isRevealed = isAnswered}
          {@const isUsedElsewhere = !isRevealed && !isSelected && !isExample && isOptionUsedInGroup(opt.value)}

          <button
            type="button"
            disabled={isExample}
            onclick={() => !isExample && onSelectAnswer(opt.value)}
            class={`min-h-[48px] ${isFullListView ? 'p-2.5 sm:p-3' : 'p-2'} rounded-2xl font-bold text-left flex items-center ${opt.label === opt.value ? 'justify-center' : 'gap-2.5'} transition-all border relative select-none ${
              isExample
                ? 'opacity-35 cursor-not-allowed pointer-events-none border-dashed bg-slate-100/50 dark:bg-neutral-800/30 text-slate-400 dark:text-neutral-500'
                : isUsedElsewhere ? 'opacity-45 border-dashed hover:opacity-100 transition-opacity cursor-pointer' : 'cursor-pointer'
            } ${
              isExample
                ? ''
                : !isRevealed
                ? 'bg-white dark:bg-[#1E1E1E] hover:bg-slate-50 dark:hover:bg-[#282A2C] border-slate-200 dark:border-[#282A2C] active:scale-98 shadow-2xs text-slate-800 dark:text-slate-200'
                : isTarget
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-100 shadow-xs'
                : isSelected
                ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-950 dark:text-rose-100 shadow-xs'
                : 'bg-slate-50 dark:bg-[#282A2C]/40 border-slate-200 dark:border-[#282A2C] opacity-50'
            }`}
          >
            <div
              class={`w-6 h-6 sm:w-7 sm:h-7 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs border transition-colors ${
                isExample
                  ? 'bg-slate-200/70 dark:bg-[#282A2C] text-slate-400 dark:text-neutral-500 line-through border-slate-200 dark:border-[#37393B]'
                  : !isRevealed
                  ? 'bg-slate-100 dark:bg-[#282A2C] text-slate-700 dark:text-[#C4C7C5] border-slate-200 dark:border-[#37393B]'
                  : isTarget
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : isSelected
                  ? 'bg-rose-500 text-white border-rose-600'
                  : 'bg-slate-200/60 dark:bg-[#282A2C] text-slate-400 border-slate-200 dark:border-[#37393B]'
              }`}
            >
              {#if opt.icon === 'check'}
                <Check weight="bold" class="w-3.5 h-3.5" />
              {:else if opt.icon === 'x'}
                <X weight="bold" class="w-3.5 h-3.5" />
              {:else}
                {opt.value}
              {/if}
            </div>

            {#if isExample}
              <span class="text-xs font-semibold text-slate-400 dark:text-neutral-500">Ví dụ</span>
            {:else if opt.label !== opt.value}
              <div class="flex-1 min-w-0 flex flex-col items-start leading-tight">
                {#if opt.pinyin}
                  <span class="text-[11px] text-slate-400 dark:text-neutral-400 font-sans tracking-wide break-words text-left mb-0.5">
                    <InteractivePinyinText pinyin={opt.pinyin} />
                  </span>
                {/if}
                {#if opt.hanzi}
                  <span class="text-xs sm:text-sm font-bold font-serif text-slate-900 dark:text-slate-100 break-words text-left">
                    <InteractiveChineseText text={opt.hanzi} />
                  </span>
                {:else}
                  <span class="text-xs sm:text-sm font-semibold break-words text-left">
                    {opt.label}
                  </span>
                {/if}
              </div>
            {/if}
          </button>
        {/each}
      </div>
    {/if}
  {/if}

    <!-- Nút Điều Hướng "Câu trước" & "Câu tiếp theo" (Mobile) -->
    <div class="shrink-0 h-11 sm:h-12 w-full flex items-center gap-2">
      <button
        type="button"
        onclick={onPrevQuestion}
        disabled={questionIndex <= 0}
        class="h-full px-3.5 rounded-2xl border border-slate-200 dark:border-[#282A2C] bg-white dark:bg-[#1B1B1B] text-slate-700 dark:text-slate-300 font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-[#282A2C] transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
        title="Câu trước"
        aria-label="Câu trước"
      >
        <ArrowLeft weight="bold" class="w-4 h-4" />
      </button>

      {#if isLastQuestion}
        <button
          type="button"
          onclick={onSubmitExam}
          class="flex-1 h-full font-black text-sm rounded-2xl flex items-center justify-center gap-1.5 transition-all select-none bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white shadow-md cursor-pointer"
        >
          <Trophy weight="bold" class="w-4 h-4" />
          <span>Xem kết quả bài thi</span>
        </button>
      {:else}
        <button
          type="button"
          onclick={onNextQuestion}
          class="flex-1 h-full font-black text-sm rounded-2xl flex items-center justify-center gap-1.5 transition-all select-none bg-orange-600 hover:bg-orange-700 active:scale-95 text-white shadow-md cursor-pointer"
        >
          <span>Câu tiếp theo</span>
          <ArrowRight weight="bold" class="w-4 h-4" />
        </button>
      {/if}
    </div>

    <!-- Micro Stats Footer (Giống y hệt MultipleChoiceQuizCard.svelte) -->
    <div
      class="flex justify-between items-center px-3 py-1 bg-white dark:bg-[#1B1B1B] rounded-xl border border-slate-200 dark:border-[#282A2C] text-[11px] font-bold text-slate-500 dark:text-[#8E918F] transition-colors"
    >
      <span class="flex items-center gap-1">
        <CheckCircle weight="duotone" class="w-3.5 h-3.5 text-emerald-500" />
        Đúng: <b class="text-slate-900 dark:text-[#E3E3E3]">{totalCorrect}</b>
      </span>
      <span class="flex items-center gap-1">
        <XCircle weight="duotone" class="w-3.5 h-3.5 text-rose-500" />
        Sai: <b class="text-slate-900 dark:text-[#E3E3E3]">{totalWrong}</b>
      </span>
      <span class="flex items-center gap-1">
        <Clock weight="duotone" class="w-3.5 h-3.5 text-orange-500" />
        <span>{formatTime(timeRemainingSeconds)}</span>
      </span>
      <span class="flex items-center gap-1">
        <span>Còn:</span> <b class="text-slate-900 dark:text-[#E3E3E3]">{totalQuestions - questionIndex}</b>
      </span>
    </div>
  </footer>
</div>

<!-- Drawer Phản Hồi Đáp Án Mascot Gấu Trúc (khi bật trong Cài Đặt) -->
{#if appState.enableFeedbackDrawer && isAnswered}
  <AnswerFeedbackDrawer
    {isAnswered}
    {isCorrect}
    isWrong={isAnswered && !isCorrect}
    correctAnswerText={correctChoiceText}
    extraInfoText={question.explanation || ''}
    onNext={() => {
      if (isLastQuestion) {
        onSubmitExam();
      } else {
        onNextQuestion();
      }
    }}
    nextButtonText={isLastQuestion ? 'Xem kết quả bài thi' : 'Câu tiếp theo'}
  />
{/if}

<!-- Modal Phóng to ảnh fallback nếu không có onOpenZoom -->
{#if isImageZoomed && !onOpenZoom && (question.board_image || question.image)}
  <ExamImageZoomModal
    open={isImageZoomed}
    {question}
    allQuestions={[question]}
    selectedAnswer={selectedAnswer}
    {answers}
    {correctAnswers}
    isExamSubmitted={false}
    mode="practice"
    onSelectAnswer={(val) => {
      onSelectAnswer(val);
      isImageZoomed = false;
    }}
    onNavigateQuestion={() => {}}
    onClose={() => (isImageZoomed = false)}
  />
{/if}


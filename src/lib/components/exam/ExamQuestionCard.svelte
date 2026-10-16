<script lang="ts">
  import { onDestroy } from 'svelte';
  import Check from 'phosphor-svelte/lib/Check';
  import X from 'phosphor-svelte/lib/X';
  import PushPin from 'phosphor-svelte/lib/PushPin';
  import PushPinSlash from 'phosphor-svelte/lib/PushPinSlash';
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
  import Stop from 'phosphor-svelte/lib/Stop';
  import Headphones from 'phosphor-svelte/lib/Headphones';
  import Lightbulb from 'phosphor-svelte/lib/Lightbulb';
  import { examRoomState } from '#lib/state/examRoomState.svelte';
  import type { QuestionItem, ExamMode } from '#lib/types/exam';
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
    selectedAnswer?: string;
    answers?: Record<number, string>;
    correctAnswers?: Record<number, string>;
    isFlagged?: boolean;
    mode: ExamMode;
    isCheckedInPractice?: boolean;
    isExamSubmitted?: boolean;
    showBoardImage?: boolean;
    onSelectAnswer: (val: string) => void;
    onToggleFlag: () => void;
    onCheckPractice?: () => void;
    onOpenZoom?: (questionNo: number) => void;
  }

  let {
    question,
    selectedAnswer = '',
    answers = {},
    correctAnswers = {},
    isFlagged = false,
    mode,
    isCheckedInPractice = false,
    isExamSubmitted = false,
    showBoardImage = true,
    onSelectAnswer,
    onToggleFlag,
    onCheckPractice,
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
      // Chỉ xét những câu trong nhóm mà thí sinh đã trả lời
      if (answers[q]) {
        if (isExamSubmitted) {
          // Khi đã nộp bài (đã lộ đáp án): xám chữ cái là đáp án ĐÚNG của câu đã làm
          const correctAns = correctAnswers?.[q];
          if (correctAns && correctAns === optVal) {
            return true;
          }
        } else {
          // Khi đang làm bài thi thật (chưa nộp, chưa lộ đáp án): xám chữ cái thí sinh ĐÃ CHỌN ở câu q
          if (answers[q] === optVal) {
            return true;
          }
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

  // Suy đoán các lựa chọn trả lời tùy theo phần thi
  interface ChoiceOption {
    label: string;
    value: string;
    hanzi?: string;
    pinyin?: string;
    icon?: 'check' | 'x';
    image?: string | null;
  }

  const optionChoices = $derived.by((): ChoiceOption[] => {
    // 1. True/False: Luôn ưu tiên hiển thị nút Đúng (Check) và Sai (X) với value √ và ×
    if (question.type.includes('True/False') || (question.section?.includes('Reading') && question.part?.includes('Part 3'))) {
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

    // 3. Nếu câu hỏi có cấu hình options riêng (từ JSON Mock Atlas hoặc Chinese Tools)
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

    // 4. Tranh A - F
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

  const isTrueFalse = $derived(question.type.includes('True/False') || (question.section?.includes('Reading') && question.part?.includes('Part 3')));
  const hasImageOptions = $derived(optionChoices.some((opt) => !!opt.image));
  const isMultipleChoiceList = $derived(
    !isTrueFalse &&
    optionChoices.length > 0 &&
    optionChoices.some((opt) => opt.label !== opt.value) &&
    (optionChoices.some((opt) => opt.label.length > 3) || optionChoices.length <= 4)
  );

  const isShortMultipleChoice = $derived(
    isMultipleChoiceList &&
    optionChoices.length > 3 &&
    optionChoices.every((opt) => (opt.hanzi ? opt.hanzi.length <= 4 : opt.label.length <= 8))
  );

  // Chế độ Luyện tập: Bấm là hiện đáp án ngay lập tức (không cần nút check). Chế độ Thi: hiện khi nộp bài
  const shouldReveal = $derived(isExamSubmitted || (mode === 'practice' && !!selectedAnswer));
  const isCorrect = $derived(shouldReveal && selectedAnswer === question.answer);

  let isSpeaking = $state(false);

  async function handleToggleSpeech() {
    if (isSpeaking) {
      stopSpeech();
      isSpeaking = false;
      return;
    }

    // Tạm dừng audio thi thật trước khi phát TTS
    examRoomState.pauseAudio();

    const chineseText = getQuestionChineseSpeechText(question.text, question.options);
    if (!chineseText) return;

    isSpeaking = true;
    try {
      await speakChinese(chineseText);
    } finally {
      isSpeaking = false;
    }
  }

  $effect(() => {
    // Tự động dừng phát âm khi chuyển sang câu khác
    question.question_no;
    stopSpeech();
    isSpeaking = false;
  });

  onDestroy(() => {
    stopSpeech();
  });

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && isImageZoomed) {
      isImageZoomed = false;
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div
  id="question-{question.question_no}"
  class="bg-white dark:bg-[#1B1B1B] border {isFlagged ? 'border-amber-400 dark:border-amber-500/60 ring-2 ring-amber-400/20' : 'border-slate-200 dark:border-[#282A2C]'} rounded-3xl p-5 shadow-xs mb-4 scroll-mt-24 transition-all"
>
  <!-- Card Header -->
  <div class="flex items-center justify-between gap-3 mb-3">
    <div class="flex items-center gap-2">
      <span class="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950/70 text-orange-700 dark:text-orange-300 font-black text-xs flex items-center justify-center shrink-0">
        {question.question_no}
      </span>
      <span class="text-xs font-bold text-slate-500 dark:text-neutral-400">
        {question.part} • {question.type}
      </span>
    </div>

    <div class="flex items-center gap-1.5">
      <!-- Nút Đọc phát âm câu hỏi bằng TTS (Chỉ cho phần Đọc: Q36 trở đi) -->
      {#if question.question_no >= 36}
        <button
          type="button"
          onclick={handleToggleSpeech}
          class="w-7 h-7 sm:w-8 sm:h-8 rounded-xl {isSpeaking ? 'bg-amber-600 hover:bg-amber-700 ring-2 ring-amber-400' : 'bg-emerald-500 hover:bg-emerald-600'} active:scale-95 text-white flex items-center justify-center shadow-2xs transition-all cursor-pointer"
          title={isSpeaking ? 'Dừng đọc' : 'Phát âm câu hỏi tiếng Trung'}
          aria-label={isSpeaking ? 'Dừng đọc' : 'Phát âm câu hỏi tiếng Trung'}
        >
          {#if isSpeaking}
            <Stop weight="fill" class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white animate-pulse" />
          {:else}
            <SpeakerHigh weight="bold" class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          {/if}
        </button>
      {/if}

      <!-- Nút đánh dấu xem lại (Ghim / Bỏ ghim) -->
      <button
        type="button"
        onclick={onToggleFlag}
        class="px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors border {isFlagged ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800' : 'bg-slate-100 dark:bg-neutral-800 text-slate-500 hover:text-slate-700 dark:text-neutral-400 border-transparent'}"
        title={isFlagged ? 'Bỏ ghim câu hỏi này' : 'Ghim câu hỏi để xem lại'}
      >
        {#if isFlagged}
          <PushPinSlash weight="bold" class="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Bỏ ghim</span>
        {:else}
          <PushPin weight="bold" class="w-3.5 h-3.5" />
          <span>Ghim</span>
        {/if}
      </button>
    </div>
  </div>

  <!-- Ảnh bảng tranh lựa chọn (cho Part 2 và Reading Part 1: bảng A, B, C, D, E, F - chỉ hiện ở câu đầu nhóm) -->
  {#if question.board_image && showBoardImage}
    <div class="relative group my-3 max-w-xl min-h-[180px] rounded-2xl overflow-hidden border border-slate-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xs">
      <div class="px-3 py-1.5 bg-slate-100 dark:bg-neutral-800 text-[11px] font-bold text-slate-600 dark:text-neutral-300 flex items-center justify-between border-b border-slate-200 dark:border-neutral-700">
        <span>Bảng tranh lựa chọn (A - F):</span>
      </div>
      <button
        type="button"
        onclick={() => (onOpenZoom ? onOpenZoom(question.question_no) : (isImageZoomed = true))}
        class="w-full text-left cursor-pointer p-1.5 border-0 bg-transparent block"
        aria-label="Phóng to bảng tranh lựa chọn"
      >
        <img
          src={getExamImageUrl(question.exam_code, question.board_image)}
          alt={`Bảng tranh câu hỏi ${question.question_no}`}
          class="w-full h-auto max-h-72 object-contain rounded-xl transition-transform"
          loading="lazy"
        />
      </button>
    </div>
  {:else if question.board_image && !showBoardImage}
    <!-- Nút xem nhanh bảng tranh cho các câu hỏi 12-15, 17-20 trong nhóm -->
    <div class="my-2 flex items-center gap-2">
      <button
        type="button"
        onclick={() => (onOpenZoom ? onOpenZoom(question.question_no) : (isImageZoomed = true))}
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800 text-xs font-bold hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors cursor-pointer shadow-2xs"
        title="Xem bảng tranh A - F của phần thi này"
      >
        <span>Xem bảng tranh A – F</span>
      </button>
    </div>
  {:else if question.image}
    <!-- Ảnh minh họa câu hỏi đơn lẻ (Q1 - Q10) -->
    <div class="relative group my-3 max-w-sm min-h-[140px] rounded-2xl overflow-hidden border border-slate-100 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900/50">
      <button
        type="button"
        onclick={() => (onOpenZoom ? onOpenZoom(question.question_no) : (isImageZoomed = true))}
        class="w-full text-left cursor-pointer p-0 border-0 bg-transparent block"
        aria-label="Phóng to ảnh câu hỏi"
      >
        <img
          src={getExamImageUrl(question.exam_code, question.image)}
          alt={`Ảnh minh họa câu hỏi ${question.question_no}`}
          class="w-full h-auto max-h-56 object-contain rounded-2xl transition-transform"
          loading="lazy"
        />
      </button>
    </div>
  {/if}

  <!-- Tiêu đề câu hỏi / Prompt Text -->
  <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#8E918F] mb-2 select-none">
    {#if question.section.includes('Reading') || question.question_no >= 36}
      {#if question.part.includes('Part 1') || (question.question_no >= 36 && question.question_no <= 40)}
        Đọc câu và chọn tranh phù hợp (A – F):
      {:else if question.part.includes('Part 2') || (question.question_no >= 41 && question.question_no <= 45)}
        Chọn từ thích hợp điền vào chỗ trống (A – F):
      {:else if question.part.includes('Part 3') || (question.question_no >= 46 && question.question_no <= 50)}
        Đọc đoạn văn và phán đoán Đúng / Sai:
      {:else}
        Chọn câu đối thoại phù hợp (A – F):
      {/if}
    {:else if isTrueFalse}
      Nghe và phán đoán Đúng hoặc Sai:
    {:else if question.part.includes('Part 2') || question.type.includes('Match') || (question.question_no >= 11 && question.question_no <= 20)}
      Nghe và chọn tranh A – F phù hợp:
    {:else}
      Nghe và chọn đáp án chính xác:
    {/if}
  </div>

  <!-- Lời thoại / Câu hỏi dạng text phân tầng có trật tự: Pinyin ở trên, Chữ Hán ở dưới -->
  {#if parsedQuestionDisplay}
    <div class="my-3 space-y-1.5 select-text">
      {#if parsedQuestionDisplay.isTrueFalseStatement}
        <!-- Part 3: Khối Ngữ cảnh + Khối Nhận định ★ -->
        <div class="bg-slate-50/80 dark:bg-[#202224]/80 border border-slate-200/80 dark:border-neutral-800 rounded-2xl p-3.5 space-y-3">
          <div>
            {#if parsedQuestionDisplay.contextPinyin}
              <div class="text-xs md:text-sm text-slate-500 dark:text-neutral-400 font-sans tracking-wide mb-1">
                <InteractivePinyinText pinyin={parsedQuestionDisplay.contextPinyin} />
              </div>
            {/if}
            <div class="text-base md:text-lg font-bold text-slate-900 dark:text-[#E3E3E3] font-serif leading-relaxed">
              <InteractiveChineseText text={parsedQuestionDisplay.contextHanzi} />
            </div>
          </div>

          <div class="pt-2.5 border-t border-slate-200/60 dark:border-neutral-700/60 flex items-start gap-2.5">
            <span class="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 text-xs font-black shrink-0 mt-0.5">
              ★ Nhận định
            </span>
            <div class="flex-1">
              {#if parsedQuestionDisplay.statementPinyin}
                <div class="text-xs md:text-sm text-slate-500 dark:text-neutral-400 font-sans tracking-wide mb-1">
                  <InteractivePinyinText pinyin={parsedQuestionDisplay.statementPinyin} />
                </div>
              {/if}
              <div class="text-base md:text-lg font-bold text-slate-900 dark:text-[#E3E3E3] font-serif leading-relaxed">
                <InteractiveChineseText text={parsedQuestionDisplay.statementHanzi} />
              </div>
            </div>
          </div>
        </div>
      {:else}
        <!-- Câu thông thường: Hàng trên Pinyin, Hàng dưới Chữ Hán -->
        <div class="space-y-1">
          {#if parsedQuestionDisplay.pinyin}
            <div class="text-xs md:text-sm text-slate-500 dark:text-neutral-400 font-sans tracking-wide leading-relaxed">
              <InteractivePinyinText pinyin={parsedQuestionDisplay.pinyin} />
            </div>
          {/if}
          <div class="text-base md:text-xl font-bold text-slate-900 dark:text-[#E3E3E3] font-serif leading-relaxed">
            <InteractiveChineseText text={parsedQuestionDisplay.hanzi} />
          </div>
        </div>
      {/if}
    </div>
  {:else if question.text}
    <div class="space-y-1 my-2 select-text">
      {#if !isListeningQuestion && question.pinyin}
        <div class="text-xs md:text-sm text-slate-500 dark:text-neutral-400 font-sans tracking-wide leading-relaxed">
          <InteractivePinyinText pinyin={sanitizedQuestionPinyin} />
        </div>
      {/if}
      <div class="text-base md:text-xl font-bold text-slate-900 dark:text-[#E3E3E3] font-serif leading-relaxed">
        <InteractiveChineseText text={sanitizedQuestionText} />
      </div>
    </div>
  {/if}

  <!-- Bảng chọn đáp án -->
  {#if isTrueFalse}
    <!-- True / False: 2 nút ngang -->
    <div class="grid grid-cols-2 gap-2.5 my-3">
      {#each optionChoices as opt}
        {@const isSelected = selectedAnswer === opt.value}
        {@const isAnswerTarget = shouldReveal && question.answer === opt.value}
        {@const isWrongSelection = shouldReveal && isSelected && !isCorrect}

        <button
          type="button"
          onclick={() => onSelectAnswer(opt.value)}
          class="py-3 px-4 rounded-2xl font-black text-xs md:text-sm border transition-all cursor-pointer flex items-center justify-center gap-2 {
            isAnswerTarget
              ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
              : isWrongSelection
              ? 'bg-rose-500 text-white border-rose-600 shadow-xs'
              : isSelected
              ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
              : 'bg-slate-50 dark:bg-neutral-800/60 hover:bg-slate-100 dark:hover:bg-neutral-700/60 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-neutral-700'
          }"
        >
          {#if opt.icon === 'check'}
            <Check weight="bold" class="w-4 h-4 shrink-0" />
          {:else if opt.icon === 'x'}
            <X weight="bold" class="w-4 h-4 shrink-0" />
          {/if}
          <span>{opt.label}</span>
        </button>
      {/each}
    </div>
  {:else if hasImageOptions}
    <!-- Lựa chọn có ảnh minh họa A, B, C (như Chinese Tools Part 1) -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
      {#each optionChoices as opt}
        {@const isExample = isExampleOption(opt.value)}
        {@const isSelected = !isExample && selectedAnswer === opt.value}
        {@const isAnswerTarget = shouldReveal && question.answer === opt.value}
        {@const isWrongSelection = shouldReveal && isSelected && !isCorrect}
        {@const isUsedElsewhere = !isSelected && !isExample && isOptionUsedInGroup(opt.value)}

        <button
          type="button"
          disabled={isExample}
          onclick={() => !isExample && onSelectAnswer(opt.value)}
          class="p-3 rounded-2xl border transition-all flex flex-col items-center gap-2 {
            isExample
              ? 'opacity-35 cursor-not-allowed pointer-events-none border-dashed bg-slate-100/50 dark:bg-neutral-800/30 text-slate-400 dark:text-neutral-500'
              : isUsedElsewhere
              ? 'opacity-45 border-dashed hover:opacity-100 transition-opacity'
              : ''
          } {
            isExample
              ? ''
              : isAnswerTarget
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs'
              : isWrongSelection
              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-600 ring-2 ring-rose-500/20 shadow-xs'
              : isSelected
              ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-600 ring-2 ring-orange-500/20 shadow-xs'
              : 'bg-slate-50 dark:bg-neutral-800/60 hover:bg-slate-100 dark:hover:bg-neutral-700/60 border-slate-200 dark:border-neutral-700 cursor-pointer'
          }"
        >
          {#if opt.image}
            <img
              src={getExamImageUrl(question.exam_code, opt.image)}
              alt={`Hình ${opt.value}`}
              class="w-full h-36 object-contain rounded-xl bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-800"
              loading="lazy"
            />
          {/if}
          <div class="flex items-center gap-2">
            <span class="w-7 h-7 rounded-full font-black text-xs flex items-center justify-center shrink-0 {
              isExample
                ? 'bg-slate-200/70 dark:bg-neutral-700/50 text-slate-400 dark:text-neutral-500 line-through'
                : isAnswerTarget
                ? 'bg-emerald-600 text-white'
                : isWrongSelection
                ? 'bg-rose-600 text-white'
                : isSelected
                ? 'bg-orange-600 text-white'
                : 'bg-slate-200 dark:bg-neutral-700 text-slate-700 dark:text-neutral-200'
            }">
              {opt.value}
            </span>
            {#if isExample}
              <span class="text-xs font-semibold text-slate-400 dark:text-neutral-500">Ví dụ</span>
            {:else if opt.label !== opt.value}
              <span class="text-xs font-bold text-slate-700 dark:text-slate-200">{opt.label}</span>
            {/if}
          </div>
        </button>
      {/each}
    </div>
  {:else if isMultipleChoiceList}
    <!-- Liệt kê đáp án: Dàn lưới 1-2 hàng nếu ngắn, hoặc theo cột nếu dài -->
    <div class={isShortMultipleChoice ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 my-3' : 'flex flex-col gap-2.5 my-3'}>
      {#each optionChoices as opt}
        {@const isExample = isExampleOption(opt.value)}
        {@const isSelected = !isExample && selectedAnswer === opt.value}
        {@const isAnswerTarget = shouldReveal && question.answer === opt.value}
        {@const isWrongSelection = shouldReveal && isSelected && !isCorrect}
        {@const isUsedElsewhere = !isSelected && !isExample && isOptionUsedInGroup(opt.value)}

        <button
          type="button"
          disabled={isExample}
          onclick={() => !isExample && onSelectAnswer(opt.value)}
          class="w-full text-left p-3 rounded-2xl border transition-all flex items-center gap-2.5 {
            isExample
              ? 'opacity-35 cursor-not-allowed pointer-events-none border-dashed bg-slate-100/50 dark:bg-neutral-800/30 text-slate-400 dark:text-neutral-500'
              : isUsedElsewhere
              ? 'opacity-45 border-dashed hover:opacity-100 transition-opacity'
              : ''
          } {
            isExample
              ? ''
              : isAnswerTarget
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 shadow-2xs'
              : isWrongSelection
              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200 shadow-2xs'
              : isSelected
              ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-500 text-orange-900 dark:text-orange-200 shadow-2xs'
              : 'bg-slate-50 dark:bg-neutral-800/60 hover:bg-slate-100 dark:hover:bg-neutral-700/60 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-neutral-700 cursor-pointer'
          }"
        >
          <!-- Ký tự A, B, C, D trong nền tròn xám chuẩn -->
          <span class="w-7 h-7 rounded-full text-xs font-black flex items-center justify-center shrink-0 transition-colors {
            isExample
              ? 'bg-slate-200/70 dark:bg-neutral-700/50 text-slate-400 dark:text-neutral-500 line-through'
              : isAnswerTarget
              ? 'bg-emerald-600 text-white'
              : isWrongSelection
              ? 'bg-rose-600 text-white'
              : isSelected
              ? 'bg-orange-600 text-white'
              : 'bg-slate-200 dark:bg-neutral-700 text-slate-700 dark:text-neutral-200'
          }">
            {opt.value}
          </span>

          <div class="flex-1 min-w-0 flex flex-col items-start leading-snug py-0.5 select-text {isExample ? 'line-through opacity-70' : ''}">
            {#if opt.pinyin}
              <span class="text-xs text-slate-500 dark:text-neutral-400 font-sans tracking-wide leading-tight break-words text-left">
                <InteractivePinyinText pinyin={opt.pinyin} />
              </span>
            {/if}
            {#if opt.hanzi}
              <span class="text-sm sm:text-base font-bold font-serif text-slate-900 dark:text-[#E3E3E3] leading-snug break-words text-left">
                <InteractiveChineseText text={opt.hanzi} />
              </span>
            {:else}
              <span class="font-medium text-xs md:text-sm leading-relaxed">
                {opt.label !== opt.value ? opt.label : `Lựa chọn ${opt.value}`}
              </span>
            {/if}
          </div>

          {#if isExample}
            <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-200 dark:bg-neutral-700 text-slate-500 dark:text-neutral-400 shrink-0 select-none">
              Ví dụ
            </span>
          {/if}
        </button>
      {/each}
    </div>
  {:else}
    <!-- Dạng ma trận lưới ô chữ cái A - F thuần túy, không có nhãn văn bản thừa -->
    <div class="grid grid-cols-3 sm:grid-cols-6 gap-2.5 my-3">
      {#each optionChoices as opt}
        {@const isExample = isExampleOption(opt.value)}
        {@const isSelected = !isExample && selectedAnswer === opt.value}
        {@const isAnswerTarget = shouldReveal && question.answer === opt.value}
        {@const isWrongSelection = shouldReveal && isSelected && !isCorrect}
        {@const isUsedElsewhere = !isSelected && !isExample && isOptionUsedInGroup(opt.value)}

        <button
          type="button"
          disabled={isExample}
          onclick={() => !isExample && onSelectAnswer(opt.value)}
          class="h-11 sm:h-12 rounded-2xl font-black text-sm sm:text-base border transition-all flex flex-col items-center justify-center select-none {
            isExample
              ? 'opacity-35 cursor-not-allowed pointer-events-none border-dashed bg-slate-100/50 dark:bg-neutral-800/30 text-slate-400 dark:text-neutral-500'
              : isUsedElsewhere
              ? 'opacity-45 border-dashed hover:opacity-100 transition-opacity'
              : ''
          } {
            isExample
              ? ''
              : isAnswerTarget
              ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs ring-2 ring-emerald-500/20'
              : isWrongSelection
              ? 'bg-rose-500 text-white border-rose-600 shadow-xs ring-2 ring-rose-500/20'
              : isSelected
              ? 'bg-orange-600 text-white border-orange-600 shadow-xs ring-2 ring-orange-500/20'
              : 'bg-slate-50 dark:bg-neutral-800/60 hover:bg-slate-100 dark:hover:bg-neutral-700/60 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-neutral-700 active:scale-95 cursor-pointer'
          }"
        >
          <span class={isExample ? 'line-through leading-none' : ''}>{opt.value}</span>
          {#if isExample}
            <span class="text-[9px] font-semibold text-slate-400 dark:text-neutral-500 leading-none mt-0.5">Ví dụ</span>
          {/if}
        </button>
      {/each}
    </div>
  {/if}

  <!-- Kết quả & Giải thích / Transcript nghe -->
  {#if shouldReveal}
    <div class="mt-4 p-4 rounded-2xl border text-xs leading-relaxed {isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200' : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60 text-rose-900 dark:text-rose-200'}">
      <div class="flex items-center gap-2 font-black mb-1.5">
        {#if isCorrect}
          <Check weight="bold" class="w-4 h-4 text-emerald-600" />
          <span>
            Chính xác! Đáp án đúng:
            {#if question.answer === '√'}
              <span class="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 ml-1">
                <Check weight="bold" class="w-3.5 h-3.5" /> Đúng
              </span>
            {:else if question.answer === '×'}
              <span class="inline-flex items-center gap-1 font-bold text-rose-600 dark:text-rose-400 ml-1">
                <X weight="bold" class="w-3.5 h-3.5" /> Sai
              </span>
            {:else}
              <strong class="ml-1">{question.answer}</strong>
            {/if}
          </span>
        {:else}
          <X weight="bold" class="w-4 h-4 text-rose-600" />
          <span>
            Chưa đúng! Đáp án đúng là:
            {#if question.answer === '√'}
              <span class="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 ml-1">
                <Check weight="bold" class="w-3.5 h-3.5" /> Đúng
              </span>
            {:else if question.answer === '×'}
              <span class="inline-flex items-center gap-1 font-bold text-rose-600 dark:text-rose-400 ml-1">
                <X weight="bold" class="w-3.5 h-3.5" /> Sai
              </span>
            {:else}
              <strong class="ml-1">{question.answer}</strong>
            {/if}
          </span>
        {/if}
      </div>

      {#if question.listening_script}
        <div class="mt-2.5 pt-2.5 border-t border-current/15 text-slate-700 dark:text-neutral-300">
          <span class="font-bold flex items-center gap-1.5 mb-2">
            <Headphones weight="fill" class="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
            <span>Lời thoại nghe (Transcript):</span>
          </span>
          <ExamDialogueTranscript
            script={question.listening_script}
            pinyin={question.listening_pinyin}
            viet={question.listening_viet}
          />
        </div>
      {/if}

      {#if question.explanation}
        <div class="mt-2.5 pt-2.5 border-t border-current/15 text-slate-700 dark:text-neutral-300">
          <span class="font-bold flex items-center gap-1.5 mb-1 text-slate-800 dark:text-neutral-200">
            <Lightbulb weight="fill" class="w-4 h-4 text-amber-500 shrink-0" />
            <span>Giải thích chi tiết:</span>
          </span>
          <p class="text-[11px] md:text-xs leading-relaxed select-text bg-white/60 dark:bg-black/20 p-2.5 rounded-xl border border-current/10">
            {question.explanation}
          </p>
        </div>
      {/if}
    </div>
  {/if}
</div>

<!-- Modal xem ảnh phóng to fallback nếu không có onOpenZoom -->
{#if isImageZoomed && !onOpenZoom && (question.board_image || question.image)}
  <ExamImageZoomModal
    open={isImageZoomed}
    {question}
    allQuestions={[question]}
    selectedAnswer={selectedAnswer}
    {answers}
    {correctAnswers}
    {isExamSubmitted}
    {mode}
    onSelectAnswer={(val) => {
      onSelectAnswer(val);
      if (mode === 'practice') isImageZoomed = false;
    }}
    onNavigateQuestion={() => {}}
    onClose={() => (isImageZoomed = false)}
  />
{/if}


<script lang="ts">
  import { onDestroy } from 'svelte';
  import Check from 'phosphor-svelte/lib/Check';
  import X from 'phosphor-svelte/lib/X';
  import BookmarkSimple from 'phosphor-svelte/lib/BookmarkSimple';
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
  import Headphones from 'phosphor-svelte/lib/Headphones';
  import Lightbulb from 'phosphor-svelte/lib/Lightbulb';
  import { examRoomState } from '#lib/state/examRoomState.svelte';
  import type { QuestionItem, ExamMode } from '#lib/types/exam';
  import { getExamImageUrl } from '#lib/utils/examAssets';
  import { parseOptionItem } from '#lib/utils/examOptionParser';
  import { speakChinese, stopSpeech, getQuestionChineseSpeechText } from '#lib/utils/speech';
  import InteractiveChineseText from './InteractiveChineseText.svelte';
  import InteractivePinyinText from './InteractivePinyinText.svelte';

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
    onCheckPractice
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

  // Tách câu hỏi thành các tầng hiển thị có trật tự: Hàng chữ Hán ở trên, Pinyin ở dưới
  const parsedQuestionDisplay = $derived.by(() => {
    const raw = question.text || '';
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

      if (question.pinyin) {
        if (question.pinyin.includes('★')) {
          const pyParts = question.pinyin.split('★');
          contextPinyin = pyParts[0].trim();
          statementPinyin = (pyParts[1] || '').trim();
        } else if (!contextPinyin) {
          contextPinyin = question.pinyin;
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
        pinyin: question.pinyin || m[2].trim()
      };
    }

    return {
      isTrueFalseStatement: false,
      hanzi: raw,
      pinyin: question.pinyin || ''
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
          class="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white flex items-center justify-center shadow-2xs transition-all cursor-pointer {isSpeaking ? 'ring-2 ring-emerald-400 ring-offset-1 ring-offset-white dark:ring-offset-[#1B1B1B] animate-pulse' : ''}"
          title={isSpeaking ? 'Dừng đọc' : 'Phát âm câu hỏi tiếng Trung'}
          aria-label="Phát âm câu hỏi tiếng Trung"
        >
          <SpeakerHigh weight="bold" class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      {/if}

      <!-- Nút đánh dấu xem lại -->
      <button
        type="button"
        onclick={onToggleFlag}
        class="px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors {isFlagged ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300' : 'bg-slate-100 dark:bg-neutral-800 text-slate-500 hover:text-slate-700 dark:text-neutral-400'}"
        title="Đánh dấu câu hỏi để xem lại"
      >
        <BookmarkSimple weight={isFlagged ? 'fill' : 'regular'} class="w-3.5 h-3.5" />
        <span>{isFlagged ? 'Đã ghim' : 'Ghim'}</span>
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
        onclick={() => (isImageZoomed = true)}
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
        onclick={() => (isImageZoomed = true)}
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
        onclick={() => (isImageZoomed = true)}
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
      {#if question.pinyin}
        <div class="text-xs md:text-sm text-slate-500 dark:text-neutral-400 font-sans tracking-wide leading-relaxed">
          <InteractivePinyinText pinyin={question.pinyin} />
        </div>
      {/if}
      <div class="text-base md:text-xl font-bold text-slate-900 dark:text-[#E3E3E3] font-serif leading-relaxed">
        <InteractiveChineseText text={question.text} />
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
        {@const isSelected = selectedAnswer === opt.value}
        {@const isAnswerTarget = shouldReveal && question.answer === opt.value}
        {@const isWrongSelection = shouldReveal && isSelected && !isCorrect}

        <button
          type="button"
          onclick={() => onSelectAnswer(opt.value)}
          class="p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-2 {
            isAnswerTarget
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs'
              : isWrongSelection
              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-600 ring-2 ring-rose-500/20 shadow-xs'
              : isSelected
              ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-600 ring-2 ring-orange-500/20 shadow-xs'
              : 'bg-slate-50 dark:bg-neutral-800/60 hover:bg-slate-100 dark:hover:bg-neutral-700/60 border-slate-200 dark:border-neutral-700'
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
              isAnswerTarget
                ? 'bg-emerald-600 text-white'
                : isWrongSelection
                ? 'bg-rose-600 text-white'
                : isSelected
                ? 'bg-orange-600 text-white'
                : 'bg-slate-200 dark:bg-neutral-700 text-slate-700 dark:text-neutral-200'
            }">
              {opt.value}
            </span>
            {#if opt.label !== opt.value}
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
        {@const isSelected = selectedAnswer === opt.value}
        {@const isAnswerTarget = shouldReveal && question.answer === opt.value}
        {@const isWrongSelection = shouldReveal && isSelected && !isCorrect}
        {@const isUsedElsewhere = !isSelected && isOptionUsedInGroup(opt.value)}

        <button
          type="button"
          onclick={() => onSelectAnswer(opt.value)}
          class="w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-2.5 {
            isUsedElsewhere ? 'opacity-45 border-dashed hover:opacity-100 transition-opacity' : ''
          } {
            isAnswerTarget
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 shadow-2xs'
              : isWrongSelection
              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200 shadow-2xs'
              : isSelected
              ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-500 text-orange-900 dark:text-orange-200 shadow-2xs'
              : 'bg-slate-50 dark:bg-neutral-800/60 hover:bg-slate-100 dark:hover:bg-neutral-700/60 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-neutral-700'
          }"
        >
          <!-- Ký tự A, B, C, D trong nền tròn xám chuẩn -->
          <span class="w-7 h-7 rounded-full text-xs font-black flex items-center justify-center shrink-0 transition-colors {
            isAnswerTarget
              ? 'bg-emerald-600 text-white'
              : isWrongSelection
              ? 'bg-rose-600 text-white'
              : isSelected
              ? 'bg-orange-600 text-white'
              : 'bg-slate-200 dark:bg-neutral-700 text-slate-700 dark:text-neutral-200'
          }">
            {opt.value}
          </span>

          <div class="flex-1 min-w-0 flex flex-col items-start leading-snug py-0.5 select-text">
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
        </button>
      {/each}
    </div>
  {:else}
    <!-- Dạng ma trận lưới ô chữ cái A - F thuần túy, không có nhãn văn bản thừa -->
    <div class="grid grid-cols-3 sm:grid-cols-6 gap-2.5 my-3">
      {#each optionChoices as opt}
        {@const isSelected = selectedAnswer === opt.value}
        {@const isAnswerTarget = shouldReveal && question.answer === opt.value}
        {@const isWrongSelection = shouldReveal && isSelected && !isCorrect}
        {@const isUsedElsewhere = !isSelected && isOptionUsedInGroup(opt.value)}

        <button
          type="button"
          onclick={() => onSelectAnswer(opt.value)}
          class="h-11 sm:h-12 rounded-2xl font-black text-sm sm:text-base border transition-all cursor-pointer flex items-center justify-center select-none {
            isUsedElsewhere ? 'opacity-45 border-dashed hover:opacity-100 transition-opacity' : ''
          } {
            isAnswerTarget
              ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs ring-2 ring-emerald-500/20'
              : isWrongSelection
              ? 'bg-rose-500 text-white border-rose-600 shadow-xs ring-2 ring-rose-500/20'
              : isSelected
              ? 'bg-orange-600 text-white border-orange-600 shadow-xs ring-2 ring-orange-500/20'
              : 'bg-slate-50 dark:bg-neutral-800/60 hover:bg-slate-100 dark:hover:bg-neutral-700/60 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-neutral-700 active:scale-95'
          }"
        >
          <span>{opt.value}</span>
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
              Đúng
            {:else if question.answer === '×'}
              Sai
            {:else}
              {question.answer}
            {/if}
          </span>
        {:else}
          <X weight="bold" class="w-4 h-4 text-rose-600" />
          <span>
            Chưa đúng! Đáp án đúng là:
            <strong>
              {#if question.answer === '√'}
                Đúng
              {:else if question.answer === '×'}
                Sai
              {:else}
                {question.answer}
              {/if}
            </strong>
          </span>
        {/if}
      </div>

      {#if question.listening_script}
        <div class="mt-2.5 pt-2.5 border-t border-current/15 text-slate-700 dark:text-neutral-300">
          <span class="font-bold flex items-center gap-1.5 mb-1">
            <Headphones weight="fill" class="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
            <span>Lời thoại nghe (Transcript):</span>
          </span>
          <p class="font-mono text-[11px] md:text-xs leading-relaxed select-text bg-white/60 dark:bg-black/20 p-2.5 rounded-xl border border-current/10">
            {question.listening_script}
          </p>
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

<!-- Modal xem ảnh phóng to -->
{#if isImageZoomed && (question.board_image || question.image)}
  {@const activeZoomSrc = getExamImageUrl(question.exam_code, question.board_image || question.image)}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-150">
    <button
      type="button"
      class="fixed inset-0 bg-black/85 backdrop-blur-sm cursor-default w-full h-full border-none"
      onclick={() => (isImageZoomed = false)}
      aria-label="Đóng phóng to ảnh"
    ></button>
    <div
      class="relative z-10 max-w-4xl w-full max-h-[94vh] bg-white dark:bg-[#1E1E1E] rounded-3xl p-3 sm:p-4 overflow-hidden shadow-2xl flex flex-col items-center justify-between border border-slate-200 dark:border-[#333]"
    >
      <!-- Modal Header -->
      <div class="w-full flex items-center justify-between pb-2 mb-1 border-b border-slate-100 dark:border-[#282A2C] shrink-0">
        <span class="text-xs sm:text-sm font-bold text-slate-800 dark:text-neutral-200 flex items-center gap-1.5">
          {question.board_image ? 'Bảng tranh đối chiếu (A – F)' : `Ảnh câu ${question.question_no}`}
        </span>
        <button
          type="button"
          onclick={() => (isImageZoomed = false)}
          class="p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-[#282A2C] text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer"
          title="Đóng (ESC)"
        >
          <X weight="bold" class="w-5 h-5" />
        </button>
      </div>

      <!-- Question Text in Zoom Modal if available (Hanzi + Pinyin) -->
      {#if parsedQuestionDisplay}
        <div class="w-full py-2 px-3 bg-slate-50/80 dark:bg-[#202224]/80 rounded-2xl border border-slate-200/70 dark:border-neutral-800 text-center shrink-0 mb-1 max-w-2xl select-text">
          {#if parsedQuestionDisplay.isTrueFalseStatement}
            <div class="space-y-1.5 text-left">
              <div>
                {#if parsedQuestionDisplay.contextPinyin}
                  <div class="text-[11px] text-slate-500 dark:text-neutral-400 font-sans tracking-wide">
                    <InteractivePinyinText pinyin={parsedQuestionDisplay.contextPinyin} />
                  </div>
                {/if}
                <div class="text-sm sm:text-base font-bold text-slate-900 dark:text-[#E3E3E3] font-serif leading-snug">
                  <InteractiveChineseText text={parsedQuestionDisplay.contextHanzi} />
                </div>
              </div>
              <div class="pt-1.5 border-t border-slate-200/60 dark:border-neutral-700/60 flex items-start gap-1.5">
                <span class="px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 text-[10px] font-black shrink-0 mt-0.5">
                  ★ Nhận định
                </span>
                <div class="flex-1">
                  {#if parsedQuestionDisplay.statementPinyin}
                    <div class="text-[11px] text-slate-500 dark:text-neutral-400 font-sans tracking-wide">
                      <InteractivePinyinText pinyin={parsedQuestionDisplay.statementPinyin} />
                    </div>
                  {/if}
                  <div class="text-sm sm:text-base font-bold text-slate-900 dark:text-[#E3E3E3] font-serif leading-snug">
                    <InteractiveChineseText text={parsedQuestionDisplay.statementHanzi} />
                  </div>
                </div>
              </div>
            </div>
          {:else}
            <div class="space-y-0.5">
              {#if parsedQuestionDisplay.pinyin}
                <div class="text-xs text-slate-500 dark:text-neutral-400 font-sans tracking-wide">
                  <InteractivePinyinText pinyin={parsedQuestionDisplay.pinyin} />
                </div>
              {/if}
              <div class="text-base sm:text-lg font-bold text-slate-900 dark:text-[#E3E3E3] font-serif leading-snug">
                <InteractiveChineseText text={parsedQuestionDisplay.hanzi} />
              </div>
            </div>
          {/if}
        </div>
      {/if}

      <!-- Zoom Image Container -->
      <div class="flex-1 w-full flex items-center justify-center overflow-auto min-h-0 py-1">
        <img
          src={activeZoomSrc}
          alt="Ảnh phóng to chi tiết"
          class="max-w-full max-h-[56vh] sm:max-h-[64vh] object-contain rounded-xl select-none shadow-xs"
        />
      </div>

      <!-- Quick Answer Bar ngay trong modal: học viên vừa soi tranh A - F vừa bấm chọn đáp án luôn -->
      {#if !isExamSubmitted && optionChoices.length > 0}
        <div class="w-full pt-2 mt-1 border-t border-slate-100 dark:border-[#282A2C] shrink-0 flex flex-col items-center gap-1.5">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-400">
            Chọn nhanh đáp án Câu {question.question_no}:
          </span>
          <div class="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 w-full">
            {#each optionChoices as opt}
              {@const isSelected = selectedAnswer === opt.value}
              {@const isUsedElsewhere = !isSelected && isOptionUsedInGroup(opt.value)}
              <button
                type="button"
                onclick={() => {
                  onSelectAnswer(opt.value);
                  isImageZoomed = false;
                }}
                class="px-4 sm:px-6 py-2 rounded-xl font-black text-xs sm:text-sm border active:scale-95 transition-all cursor-pointer shadow-xs flex items-center gap-1.5 {
                  isSelected
                    ? 'bg-orange-600 text-white border-orange-600'
                    : isUsedElsewhere
                    ? 'opacity-40 border-dashed bg-slate-100 dark:bg-[#282A2C] text-slate-400 dark:text-neutral-500'
                    : 'bg-slate-100 dark:bg-[#282A2C] hover:bg-orange-500 hover:text-white text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#37393B]'
                }"
              >
                {#if opt.value === '√' || opt.icon === 'check'}
                  <Check weight="bold" class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Đúng</span>
                {:else if opt.value === '×' || opt.icon === 'x'}
                  <X weight="bold" class="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  <span>Sai</span>
                {:else}
                  <span>{opt.value}</span>
                {/if}
              </button>
            {/each}
          </div>
        </div>
      {:else}
        <!-- Modal Footer with Close button -->
        <div class="w-full pt-2 mt-1 border-t border-slate-100 dark:border-[#282A2C] flex items-center justify-between shrink-0">
          <span class="text-[11px] text-slate-400 dark:text-neutral-400">
            Chạm ra ngoài hoặc bấm Đóng
          </span>
          <button
            type="button"
            onclick={() => (isImageZoomed = false)}
            class="px-5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-bold text-xs cursor-pointer shadow-xs transition-transform"
          >
            Đóng
          </button>
        </div>
      {/if}
    </div>
  </div>
{/if}

<script lang="ts">
  import Check from 'phosphor-svelte/lib/Check';
  import X from 'phosphor-svelte/lib/X';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
  import XCircle from 'phosphor-svelte/lib/XCircle';
  import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
  import ArrowLeft from 'phosphor-svelte/lib/ArrowLeft';
  import BookmarkSimple from 'phosphor-svelte/lib/BookmarkSimple';
  import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
  import MagnifyingGlassPlus from 'phosphor-svelte/lib/MagnifyingGlassPlus';
  import Lightbulb from 'phosphor-svelte/lib/Lightbulb';
  import Trophy from 'phosphor-svelte/lib/Trophy';
  import ListNumbers from 'phosphor-svelte/lib/ListNumbers';
  import Clock from 'phosphor-svelte/lib/Clock';
  import SquaresFour from 'phosphor-svelte/lib/SquaresFour';
  import ListDashes from 'phosphor-svelte/lib/ListDashes';
  import SmartImage from '../SmartImage.svelte';
  import type { QuestionItem } from '#lib/types/exam';
  import { getExamImageUrl } from '#lib/utils/examAssets';
  import { parseOptionItem } from '#lib/utils/examOptionParser';

  interface Props {
    question: QuestionItem;
    questionIndex: number;
    totalQuestions: number;
    selectedAnswer?: string;
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
  }

  let {
    question,
    questionIndex,
    totalQuestions,
    selectedAnswer = '',
    isFlagged = false,
    timeRemainingSeconds = 3300,
    totalCorrect = 0,
    totalWrong = 0,
    onSelectAnswer,
    onToggleFlag,
    onNextQuestion,
    onPrevQuestion,
    onOpenPalette,
    onSubmitExam
  }: Props = $props();

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

  // isStackedLayout: True cho Q21-35 (nghe không hình, 3 đáp án) và Q46-50 (đọc đoạn văn True/False)
  const isStackedLayout = $derived(
    !hasMedia && (isTrueFalse || isReadingTrueFalse || isListeningDialogue || optionChoices.length <= 3)
  );

  const isPureLetters = $derived(
    !isTrueFalse && optionChoices.length > 0 && optionChoices.every((opt) => opt.label === opt.value)
  );

  const isLongOptions = $derived.by(() => {
    return optionChoices.some((opt) => (opt.hanzi && opt.hanzi.length > 5) || (opt.label && opt.label.length > 10));
  });

  const isFullListView = $derived.by(() => {
    if (isPureLetters) return false;
    if (userForcedView === 'list') return true;
    if (userForcedView === 'grid') return false;
    return isLongOptions;
  });

  // Tách câu hỏi thành các tầng hiển thị có trật tự: Hàng chữ Hán ở trên, Pinyin ở dưới
  const parsedQuestionDisplay = $derived.by(() => {
    const raw = question.text || '';
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

      return {
        isTrueFalseStatement: true,
        hanzi: '',
        pinyin: '',
        contextHanzi: ctx.hanzi,
        contextPinyin: question.pinyin || ctx.pinyin,
        statementHanzi: stmt.hanzi,
        statementPinyin: question.statement_pinyin || stmt.pinyin
      };
    }

    // 2. Trường hợp câu đơn: Chữ Hán (pinyin)
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

  const isAnswered = $derived(!!selectedAnswer);
  const isCorrect = $derived(isAnswered && selectedAnswer === question.answer);
  const isLastQuestion = $derived(questionIndex >= totalQuestions - 1);

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
    if (e.key === 'ArrowRight' || e.key === 'Enter') {
      if (isLastQuestion) onSubmitExam();
      else onNextQuestion();
    } else if (e.key === 'ArrowLeft' && questionIndex > 0) {
      onPrevQuestion();
    }
  }
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
      <button
        type="button"
        onclick={() => onOpenPalette && onOpenPalette()}
        class="inline-flex items-center gap-1.5 h-8 px-2.5 sm:px-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-900/50 font-bold text-xs hover:bg-orange-100 dark:hover:bg-orange-900/60 active:scale-95 transition-all cursor-pointer shadow-2xs"
        title="Bấm để mở danh sách 60 câu hỏi"
      >
        <ListNumbers weight="bold" class="w-3.5 h-3.5" />
        <span class="uppercase tracking-wider">Câu {question.question_no}/{totalQuestions}</span>
      </button>

      <!-- Badge hiển thị phần thi thanh lịch -->
      <div class="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 dark:text-neutral-400">
        <span class="w-1.5 h-1.5 rounded-full {question.question_no <= 35 ? 'bg-sky-500' : 'bg-orange-500'}"></span>
        <span>{question.question_no <= 35 ? 'Phần Nghe' : 'Phần Đọc'}</span>
        <span class="hidden sm:inline text-slate-300 dark:text-neutral-600">•</span>
        <span class="hidden sm:inline lowercase text-[10px]">{question.part}</span>
      </div>

      <!-- Nút Cắm cờ -->
      <button
        type="button"
        onclick={onToggleFlag}
        class="h-8 w-8 rounded-xl flex items-center justify-center shadow-2xs active:scale-95 transition-all cursor-pointer border {
          isFlagged
            ? 'bg-amber-100 dark:bg-amber-950/70 border-amber-300 dark:border-amber-800 text-amber-600'
            : 'bg-slate-50 dark:bg-[#282A2C] border-slate-200 dark:border-[#37393B] text-slate-400 hover:text-slate-600'
        }"
        title="Ghim câu này để xem lại"
      >
        <BookmarkSimple weight={isFlagged ? 'fill' : 'bold'} class="w-4 h-4" />
      </button>
    </div>

    <!-- Container Nội Dung: Phân loại theo cấu trúc câu hỏi -->
    {#if isStackedLayout}
      <!-- BỐ CỤC 1 CỘT (Cho Q21-35 Nghe không hình 3 đáp án & Q46-50 Đọc True/False ít đáp án) -->
      <div class="w-full flex-1 flex flex-col items-center justify-center my-auto py-2 min-h-0 max-w-2xl mx-auto overflow-y-auto scrollbar-thin">
        <!-- Tiêu đề câu hỏi / Prompt Text -->
        <span class="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-[#8E918F] mb-2 text-center">
          {#if isTrueFalse || isReadingTrueFalse}
            Đọc đoạn văn và phán đoán Đúng / Sai:
          {:else}
            Nghe và chọn đáp án chính xác:
          {/if}
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
                      {parsedQuestionDisplay.contextPinyin}
                    </div>
                  {/if}
                  <div class="text-base sm:text-lg font-bold text-slate-900 dark:text-[#E3E3E3] font-serif leading-snug">
                    {parsedQuestionDisplay.contextHanzi}
                  </div>
                </div>

                <div class="pt-2 border-t border-slate-200/60 dark:border-neutral-700/60 flex items-start gap-2">
                  <span class="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 text-xs font-black shrink-0 mt-0.5">
                    ★ Nhận định
                  </span>
                  <div class="flex-1">
                    {#if parsedQuestionDisplay.statementPinyin}
                      <div class="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 font-sans tracking-wide mb-1">
                        {parsedQuestionDisplay.statementPinyin}
                      </div>
                    {/if}
                    <div class="text-base sm:text-lg font-bold text-slate-900 dark:text-[#E3E3E3] font-serif leading-snug">
                      {parsedQuestionDisplay.statementHanzi}
                    </div>
                  </div>
                </div>
              </div>
            {:else}
              <!-- Câu thông thường: Pinyin trên, Chữ Hán dưới -->
              <div class="space-y-1">
                {#if parsedQuestionDisplay.pinyin}
                  <div class="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 font-sans tracking-wide leading-relaxed">
                    {parsedQuestionDisplay.pinyin}
                  </div>
                {/if}
                <div class="text-lg sm:text-xl font-bold text-slate-900 dark:text-[#E3E3E3] leading-snug font-serif">
                  {parsedQuestionDisplay.hanzi}
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
                <span>Chính xác! Đáp án: <strong class="font-mono">{question.answer}</strong></span>
              {:else}
                <XCircle weight="fill" class="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                <span>Chưa đúng! Đáp án đúng: <strong class="font-mono text-emerald-600 dark:text-emerald-400">{question.answer}</strong></span>
              {/if}
            </div>

            {#if question.listening_script}
              <div class="text-xs sm:text-sm font-semibold font-serif mt-1.5 pt-1.5 border-t border-slate-200/50 dark:border-neutral-800 leading-snug">
                {question.listening_script}
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
        <div class="w-full grid {isTrueFalse || isReadingTrueFalse ? 'grid-cols-2 gap-3 max-w-md' : 'grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-xl'}">
          {#each optionChoices as opt (opt.value)}
            {@const isSelected = selectedAnswer === opt.value}
            {@const isTarget = opt.value === question.answer}
            {@const isRevealed = isAnswered}

            <button
              type="button"
              onclick={() => onSelectAnswer(opt.value)}
              class={`min-h-[52px] p-3 rounded-2xl flex items-center ${isTrueFalse || isReadingTrueFalse ? 'justify-center gap-2' : 'gap-3'} transition-all cursor-pointer border select-none ${
                !isRevealed
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
                  !isRevealed
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
                      {opt.pinyin}
                    </span>
                  {/if}
                  {#if opt.hanzi}
                    <span class="text-sm sm:text-base font-bold font-serif text-slate-800 dark:text-slate-100 leading-snug break-words text-left">
                      {opt.hanzi}
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
                onclick={() => (isImageZoomed = true)}
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
              <button
                type="button"
                onclick={() => (isImageZoomed = true)}
                class="absolute top-2 right-2 px-2 py-1 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-colors cursor-pointer text-[10px] font-bold flex items-center gap-1 shadow-sm"
                title="Phóng to ảnh"
              >
                <MagnifyingGlassPlus weight="bold" class="w-3.5 h-3.5" />
                <span class="hidden sm:inline">Phóng to</span>
              </button>
            </div>
          {/if}

          <!-- Bảng tranh đối chiếu A - F nếu có (Q11 - Q20, Match Part 1/2) -->
          {#if question.board_image}
            <div class="relative mb-1 sm:mb-1.5 max-w-sm sm:max-w-md w-full flex flex-col items-center justify-center">
              <div class="relative w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-[#282A2C] shadow-2xs bg-white dark:bg-[#1E1E1E]">
                <button
                  type="button"
                  onclick={() => (isImageZoomed = true)}
                  class="w-full flex items-center justify-center p-1 sm:p-1.5 cursor-pointer bg-transparent border-0 group"
                  title="Bấm để phóng to bảng tranh A - F"
                  aria-label="Phóng to bảng tranh đối chiếu"
                >
                  <img
                    src={getExamImageUrl(question.exam_code, question.board_image)}
                    alt="Bảng tranh đối chiếu A - F"
                    class="max-h-32 xs:max-h-40 sm:max-h-48 md:max-h-56 w-auto max-w-full rounded-xl object-contain mx-auto transition-transform group-hover:scale-[1.01]"
                    loading="lazy"
                  />
                </button>
                <!-- Nút Phóng to nổi góc trên -->
                <button
                  type="button"
                  onclick={() => (isImageZoomed = true)}
                  class="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-colors cursor-pointer text-[10px] font-bold flex items-center gap-1 shadow-sm"
                  title="Phóng to bảng tranh"
                >
                  <MagnifyingGlassPlus weight="bold" class="w-3.5 h-3.5" />
                  <span class="hidden sm:inline">Phóng to</span>
                </button>
                <!-- Badge gợi ý chạm phóng to góc dưới (không tốn thêm chiều cao) -->
                <div class="absolute bottom-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-black/55 text-white text-[9px] font-bold backdrop-blur-xs pointer-events-none whitespace-nowrap shadow-xs flex items-center gap-1">
                  <MagnifyingGlass weight="bold" class="w-2.5 h-2.5" />
                  <span>Chạm để phóng to A – F</span>
                </div>
              </div>
            </div>
          {/if}

          <!-- Tiêu đề câu hỏi / Prompt Text -->
          <span class="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-[#8E918F] mb-1 text-center">
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
                        {parsedQuestionDisplay.contextPinyin}
                      </div>
                    {/if}
                    <div class="text-base sm:text-lg font-bold text-slate-900 dark:text-[#E3E3E3] font-serif leading-snug">
                      {parsedQuestionDisplay.contextHanzi}
                    </div>
                  </div>

                  <div class="pt-2 border-t border-slate-200/60 dark:border-neutral-700/60 flex items-start gap-2">
                    <span class="px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 text-[11px] font-black shrink-0 mt-0.5">
                      ★ Nhận định
                    </span>
                    <div class="flex-1">
                      {#if parsedQuestionDisplay.statementPinyin}
                        <div class="text-xs text-slate-500 dark:text-neutral-400 font-sans tracking-wide mb-1">
                          {parsedQuestionDisplay.statementPinyin}
                        </div>
                      {/if}
                      <div class="text-base sm:text-lg font-bold text-slate-900 dark:text-[#E3E3E3] font-serif leading-snug">
                        {parsedQuestionDisplay.statementHanzi}
                      </div>
                    </div>
                  </div>
                </div>
              {:else}
                <!-- Câu thông thường: Hàng trên Pinyin, Hàng dưới Chữ Hán -->
                <div class="space-y-1">
                  {#if parsedQuestionDisplay.pinyin}
                    <div class="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 font-sans tracking-wide leading-relaxed">
                      {parsedQuestionDisplay.pinyin}
                    </div>
                  {/if}
                  <div class="text-lg sm:text-2xl font-black text-slate-900 dark:text-[#E3E3E3] leading-snug font-serif">
                    {#if parsedQuestionDisplay.hanzi.includes('( )') || parsedQuestionDisplay.hanzi.includes('（ ）')}
                      {@const parts = parsedQuestionDisplay.hanzi.split(/[\(（]\s*[\)）]/)}
                      <span>{parts[0]}</span>
                      <span class="inline-block mx-1.5 px-3 py-0.5 border-b-2 border-orange-500 text-orange-600 dark:text-orange-400 font-mono text-sm bg-orange-50 dark:bg-orange-950/40 rounded">
                        ( &nbsp;&nbsp;&nbsp;&nbsp; )
                      </span>
                      <span>{parts[1] || ''}</span>
                    {:else}
                      {parsedQuestionDisplay.hanzi}
                    {/if}
                  </div>
                </div>
              {/if}
            </div>
          {/if}

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
                  <span>Chính xác! Đáp án: <strong class="font-mono">{question.answer}</strong></span>
                {:else}
                  <XCircle weight="fill" class="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>Chưa đúng! Đáp án đúng: <strong class="font-mono text-emerald-600 dark:text-emerald-400">{question.answer}</strong></span>
                {/if}
              </div>

              {#if question.listening_script}
                <div class="text-xs font-semibold font-serif mt-1 pt-1 border-t border-slate-200/50 dark:border-neutral-800 leading-snug">
                  {question.listening_script}
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
                  <span>Chính xác! Đáp án: <strong class="font-mono">{question.answer}</strong></span>
                {:else}
                  <XCircle weight="fill" class="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>Chưa đúng! Đáp án đúng: <strong class="font-mono text-emerald-600 dark:text-emerald-400">{question.answer}</strong></span>
                {/if}
              </div>

              {#if question.listening_script}
                <div class="text-xs sm:text-sm font-semibold font-serif mt-1.5 pt-1.5 border-t border-slate-200/50 dark:border-neutral-800 leading-snug">
                  {question.listening_script}
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
                {@const isSelected = selectedAnswer === opt.value}
                {@const isTarget = opt.value === question.answer}
                {@const isRevealed = isAnswered}

                <button
                  type="button"
                  onclick={() => onSelectAnswer(opt.value)}
                  class={`h-12 sm:h-14 rounded-2xl text-base sm:text-lg font-black flex items-center justify-center transition-all cursor-pointer border select-none ${
                    !isRevealed
                      ? 'bg-white dark:bg-[#1E1E1E] hover:border-orange-400/70 hover:bg-orange-50/20 dark:hover:bg-neutral-800 border-slate-200/90 dark:border-neutral-800 active:scale-95 shadow-2xs text-slate-800 dark:text-slate-200'
                      : isTarget
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs ring-2 ring-emerald-500/30'
                      : isSelected
                      ? 'bg-rose-500 text-white border-rose-600 shadow-xs ring-2 ring-rose-500/30'
                      : 'bg-slate-50 dark:bg-[#282A2C]/40 border-slate-200/80 dark:border-[#282A2C] opacity-40 text-slate-400'
                  }`}
                >
                  <span>{opt.value}</span>
                </button>
              {/each}
            </div>
          {:else}
            <!-- Option Grid Desktop: 2 cột rộng rãi, Pinyin trên Hán tự dưới, thoáng đãng không ép chữ -->
            <div class="w-full grid {isTrueFalse ? 'grid-cols-2' : 'grid-cols-2'} gap-2 sm:gap-2.5">
              {#each optionChoices as opt, idx (opt.value)}
                {@const isSelected = selectedAnswer === opt.value}
                {@const isTarget = opt.value === question.answer}
                {@const isRevealed = isAnswered}

                <button
                  type="button"
                  onclick={() => onSelectAnswer(opt.value)}
                  class={`min-h-[48px] p-2 sm:p-2.5 rounded-2xl text-left flex items-center ${opt.label === opt.value ? 'justify-center' : 'gap-2.5'} transition-all cursor-pointer border relative select-none ${
                    !isRevealed
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
                      !isRevealed
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

                  {#if opt.label !== opt.value}
                    <div class="flex-1 min-w-0 flex flex-col items-start leading-snug py-0.5 select-text">
                      {#if opt.pinyin}
                        <span class="text-xs text-slate-400 dark:text-neutral-400 font-sans tracking-wide leading-tight break-words text-left mb-0.5">
                          {opt.pinyin}
                        </span>
                      {/if}
                      {#if opt.hanzi}
                        <span class="text-sm sm:text-base font-bold font-serif text-slate-800 dark:text-slate-100 leading-snug break-words text-left">
                          {opt.hanzi}
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
          {@const isSelected = selectedAnswer === opt.value}
          {@const isTarget = opt.value === question.answer}
          {@const isRevealed = isAnswered}

          <button
            type="button"
            onclick={() => onSelectAnswer(opt.value)}
            class={`h-11 sm:h-12 rounded-2xl text-base font-black flex items-center justify-center transition-all cursor-pointer border select-none ${
              !isRevealed
                ? 'bg-white dark:bg-[#1E1E1E] hover:bg-slate-50 dark:hover:bg-[#282A2C] border-slate-200 dark:border-[#282A2C] active:scale-95 shadow-2xs text-slate-800 dark:text-slate-200'
                : isTarget
                ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs ring-2 ring-emerald-500/30'
                : isSelected
                ? 'bg-rose-500 text-white border-rose-600 shadow-xs ring-2 ring-rose-500/30'
                : 'bg-slate-50 dark:bg-[#282A2C]/40 border-slate-200/80 dark:border-[#282A2C] opacity-40 text-slate-400'
            }`}
          >
            <span>{opt.value}</span>
          </button>
        {/each}
      </div>
    {:else}
      <!-- Options Grid/List Mobile: Tự động dạng danh sách 1 cột thông thoáng khi có câu dài -->
      <div class={isFullListView ? 'flex flex-col gap-2 max-h-[44vh] overflow-y-auto pr-0.5 scrollbar-thin' : 'grid grid-cols-2 gap-2'}>
        {#each optionChoices as opt, idx (opt.value)}
          {@const isSelected = selectedAnswer === opt.value}
          {@const isTarget = opt.value === question.answer}
          {@const isRevealed = isAnswered}

          <button
            type="button"
            onclick={() => onSelectAnswer(opt.value)}
            class={`min-h-[48px] ${isFullListView ? 'p-2.5 sm:p-3' : 'p-2'} rounded-2xl font-bold text-left flex items-center ${opt.label === opt.value ? 'justify-center' : 'gap-2.5'} transition-all cursor-pointer border relative select-none ${
              !isRevealed
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
                !isRevealed
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

            {#if opt.label !== opt.value}
              <div class="flex-1 min-w-0 flex flex-col items-start leading-tight">
                {#if opt.pinyin}
                  <span class="text-[11px] text-slate-400 dark:text-neutral-400 font-sans tracking-wide break-words text-left mb-0.5">
                    {opt.pinyin}
                  </span>
                {/if}
                {#if opt.hanzi}
                  <span class="text-xs sm:text-sm font-bold font-serif text-slate-900 dark:text-slate-100 break-words text-left">
                    {opt.hanzi}
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

    <!-- Nút Câu tiếp theo (Mobile): shrink-0 và fixed height để không bao giờ bị dẹp lép -->
    <div class="shrink-0 h-11 sm:h-12 w-full">
      {#if isLastQuestion}
        <button
          type="button"
          onclick={onSubmitExam}
          class="w-full h-full font-black text-sm rounded-2xl flex items-center justify-center gap-1.5 transition-all select-none bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white shadow-md cursor-pointer"
        >
          <Trophy weight="bold" class="w-4 h-4" />
          <span>Xem kết quả bài thi</span>
        </button>
      {:else}
        <button
          type="button"
          onclick={onNextQuestion}
          class="w-full h-full font-black text-sm rounded-2xl flex items-center justify-center gap-1.5 transition-all select-none bg-orange-600 hover:bg-orange-700 active:scale-95 text-white shadow-md cursor-pointer"
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

<!-- Modal Phóng to ảnh (Hỗ trợ cả question.board_image và question.image) -->
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

      <!-- Zoom Image Container -->
      <div class="flex-1 w-full flex items-center justify-center overflow-auto min-h-0 py-1">
        <img
          src={activeZoomSrc}
          alt="Ảnh phóng to chi tiết"
          class="max-w-full max-h-[68vh] sm:max-h-[75vh] object-contain rounded-xl select-none shadow-xs"
        />
      </div>

      <!-- Quick Answer Bar ngay trong modal: học viên vừa soi tranh A - F vừa bấm chọn đáp án luôn -->
      {#if !isAnswered && optionChoices.length > 0}
        <div class="w-full pt-2 mt-1 border-t border-slate-100 dark:border-[#282A2C] shrink-0 flex flex-col items-center gap-1.5">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-400">
            Chọn nhanh đáp án Câu {question.question_no}:
          </span>
          <div class="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 w-full">
            {#each optionChoices as opt}
              <button
                type="button"
                onclick={() => {
                  onSelectAnswer(opt.value);
                  isImageZoomed = false;
                }}
                class="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-xl font-black text-xs sm:text-sm bg-slate-100 dark:bg-[#282A2C] hover:bg-orange-500 hover:text-white text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#37393B] active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                {opt.value}
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

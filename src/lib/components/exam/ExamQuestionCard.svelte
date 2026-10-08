<script lang="ts">
  import Check from 'phosphor-svelte/lib/Check';
  import X from 'phosphor-svelte/lib/X';
  import BookmarkSimple from 'phosphor-svelte/lib/BookmarkSimple';
  import MagnifyingGlassPlus from 'phosphor-svelte/lib/MagnifyingGlassPlus';
  import type { QuestionItem, ExamMode } from '#lib/types/exam';
  import { getExamImageUrl } from '#lib/utils/examAssets';

  interface Props {
    question: QuestionItem;
    selectedAnswer?: string;
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
    isFlagged = false,
    mode,
    isCheckedInPractice = false,
    isExamSubmitted = false,
    showBoardImage = true,
    onSelectAnswer,
    onToggleFlag,
    onCheckPractice
  }: Props = $props();

  let isImageZoomed = $state(false);

  // Suy đoán các lựa chọn trả lời tùy theo phần thi
  interface ChoiceOption {
    label: string;
    value: string;
    icon?: 'check' | 'x';
    image?: string | null;
  }

  const optionChoices = $derived.by((): ChoiceOption[] => {
    // 1. Nếu câu hỏi có cấu hình options riêng (từ JSON Mock Atlas hoặc Chinese Tools)
    if (question.options && question.options.length > 0) {
      return question.options.map((opt) => {
        if (typeof opt === 'string') {
          return { label: opt, value: opt };
        }
        return {
          label: opt.label,
          value: opt.value,
          image: opt.image
        };
      });
    }

    // 2. True/False
    if (question.type.includes('True/False')) {
      return [
        { label: 'Đúng', value: '√', icon: 'check' },
        { label: 'Sai', value: '×', icon: 'x' }
      ];
    }

    // 3. Tranh A - F
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

    // 4. Mặc định A, B, C cho Part 3 & 4
    return [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' }
    ];
  });

  const isTrueFalse = $derived(question.type.includes('True/False'));
  const hasImageOptions = $derived(optionChoices.some((opt) => !!opt.image));
  const isMultipleChoiceList = $derived(!isTrueFalse && (optionChoices.length > 0 && (optionChoices.some((opt) => opt.label.length > 3) || optionChoices.length <= 4)));

  // Chế độ Luyện tập: Bấm là hiện đáp án ngay lập tức (không cần nút check). Chế độ Thi: hiện khi nộp bài
  const shouldReveal = $derived(isExamSubmitted || (mode === 'practice' && !!selectedAnswer));
  const isCorrect = $derived(shouldReveal && selectedAnswer === question.answer);
</script>

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

    <div class="flex items-center gap-2">
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
    <div class="relative group my-3 max-w-xl rounded-2xl overflow-hidden border border-slate-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xs">
      <div class="px-3 py-1.5 bg-slate-100 dark:bg-neutral-800 text-[11px] font-bold text-slate-600 dark:text-neutral-300 flex items-center justify-between border-b border-slate-200 dark:border-neutral-700">
        <span>🖼️ Bảng tranh lựa chọn (A - F):</span>
        <span class="text-[10px] text-slate-400">Bấm để phóng to</span>
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
      <button
        type="button"
        onclick={() => (isImageZoomed = true)}
        class="absolute bottom-2.5 right-2.5 px-2 py-1 rounded-lg bg-black/60 text-white text-[10px] font-bold flex items-center gap-1 backdrop-blur-xs opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer"
      >
        <MagnifyingGlassPlus class="w-3.5 h-3.5" />
        <span>Phóng to</span>
      </button>
    </div>
  {:else if question.image}
    <!-- Ảnh minh họa câu hỏi đơn lẻ (Q1 - Q10) -->
    <div class="relative group my-3 max-w-sm rounded-2xl overflow-hidden border border-slate-100 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900/50">
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
      <button
        type="button"
        onclick={() => (isImageZoomed = true)}
        class="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/60 text-white text-[10px] font-bold flex items-center gap-1 backdrop-blur-xs opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer"
      >
        <MagnifyingGlassPlus class="w-3.5 h-3.5" />
        <span>Phóng to</span>
      </button>
    </div>
  {/if}

  <!-- Lời thoại / Câu hỏi dạng text -->
  {#if question.text}
    <div class="text-sm md:text-base font-medium text-slate-800 dark:text-slate-200 my-2 leading-relaxed">
      {question.text}
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
            <span class="text-xs font-bold text-slate-700 dark:text-slate-200">{opt.label}</span>
          </div>
        </button>
      {/each}
    </div>
  {:else if isMultipleChoiceList}
    <!-- Liệt kê từng dòng một: Chữ cái nằm trong nền tròn xám -->
    <div class="flex flex-col gap-2.5 my-3">
      {#each optionChoices as opt}
        {@const isSelected = selectedAnswer === opt.value}
        {@const isAnswerTarget = shouldReveal && question.answer === opt.value}
        {@const isWrongSelection = shouldReveal && isSelected && !isCorrect}

        <button
          type="button"
          onclick={() => onSelectAnswer(opt.value)}
          class="w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 {
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

          <span class="font-medium text-xs md:text-sm leading-relaxed flex-1 select-text">
            {opt.label !== opt.value ? opt.label : `Lựa chọn ${opt.value}`}
          </span>
        </button>
      {/each}
    </div>
  {:else}
    <!-- Dạng ma trận lưới ngắn (Part 2: A - F) -->
    <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 my-3">
      {#each optionChoices as opt}
        {@const isSelected = selectedAnswer === opt.value}
        {@const isAnswerTarget = shouldReveal && question.answer === opt.value}
        {@const isWrongSelection = shouldReveal && isSelected && !isCorrect}

        <button
          type="button"
          onclick={() => onSelectAnswer(opt.value)}
          class="py-2.5 px-3 rounded-2xl font-black text-xs md:text-sm border transition-all cursor-pointer flex items-center justify-center gap-1.5 {
            isAnswerTarget
              ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
              : isWrongSelection
              ? 'bg-rose-500 text-white border-rose-600 shadow-xs'
              : isSelected
              ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
              : 'bg-slate-50 dark:bg-neutral-800/60 hover:bg-slate-100 dark:hover:bg-neutral-700/60 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-neutral-700'
          }"
        >
          <span class="w-6 h-6 rounded-full text-[11px] font-black flex items-center justify-center shrink-0 {
            isSelected || isAnswerTarget || isWrongSelection
              ? 'bg-white/20 text-white'
              : 'bg-slate-200 dark:bg-neutral-700 text-slate-700 dark:text-neutral-200'
          }">
            {opt.value}
          </span>
          <span>{opt.label}</span>
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
            🎧 Lời thoại nghe (Transcript):
          </span>
          <p class="font-mono text-[11px] md:text-xs leading-relaxed select-text bg-white/60 dark:bg-black/20 p-2.5 rounded-xl border border-current/10">
            {question.listening_script}
          </p>
        </div>
      {/if}

      {#if question.explanation}
        <div class="mt-2.5 pt-2.5 border-t border-current/15 text-slate-700 dark:text-neutral-300">
          <span class="font-bold flex items-center gap-1.5 mb-1 text-slate-800 dark:text-neutral-200">
            💡 Giải thích chi tiết:
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
  <div
    class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs cursor-pointer"
    onclick={() => (isImageZoomed = false)}
    role="button"
    tabindex="0"
    onkeydown={(e) => e.key === 'Escape' && (isImageZoomed = false)}
  >
    <div class="max-w-4xl max-h-[90vh] p-2 bg-white dark:bg-[#1B1B1B] rounded-3xl overflow-hidden shadow-2xl">
      <img
        src={getExamImageUrl(question.exam_code, question.board_image || question.image)}
        alt="Phóng to ảnh"
        class="w-full h-auto max-h-[85vh] object-contain rounded-2xl"
      />
    </div>
  </div>
{/if}

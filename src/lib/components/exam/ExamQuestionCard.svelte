<script lang="ts">
  import Check from 'phosphor-svelte/lib/Check';
  import X from 'phosphor-svelte/lib/X';
  import BookmarkSimple from 'phosphor-svelte/lib/BookmarkSimple';
  import MagnifyingGlassPlus from 'phosphor-svelte/lib/MagnifyingGlassPlus';
  import type { QuestionItem, ExamMode } from '#lib/types/exam';

  interface Props {
    question: QuestionItem;
    selectedAnswer?: string;
    isFlagged?: boolean;
    mode: ExamMode;
    isCheckedInPractice?: boolean;
    isExamSubmitted?: boolean;
    onSelectAnswer: (val: string) => void;
    onToggleFlag: () => void;
    onCheckPractice: () => void;
  }

  let {
    question,
    selectedAnswer = '',
    isFlagged = false,
    mode,
    isCheckedInPractice = false,
    isExamSubmitted = false,
    onSelectAnswer,
    onToggleFlag,
    onCheckPractice
  }: Props = $props();

  let isImageZoomed = $state(false);

  // Suy đoán các lựa chọn trả lời tùy theo phần thi
  const optionChoices = $derived.by(() => {
    // True/False
    if (question.type.includes('True/False')) {
      return [
        { label: 'Đúng (√)', value: '√' },
        { label: 'Sai (×)', value: '×' }
      ];
    }
    // Tranh A - F
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
    // Mặc định A, B, C cho Part 3 & 4
    return [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' }
    ];
  });

  const shouldReveal = $derived(isExamSubmitted || (mode === 'practice' && isCheckedInPractice));
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

  <!-- Ảnh minh họa câu hỏi (nếu có) -->
  {#if question.image}
    <div class="relative group my-3 max-w-sm rounded-2xl overflow-hidden border border-slate-100 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900/50">
      <img
        src={`/exams-media/${question.exam_code}/${question.image}`}
        alt={`Ảnh minh họa câu hỏi ${question.question_no}`}
        class="w-full h-auto max-h-56 object-contain rounded-2xl transition-transform cursor-pointer"
        onclick={() => (isImageZoomed = true)}
        loading="lazy"
      />
      <button
        type="button"
        onclick={() => (isImageZoomed = true)}
        class="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/60 text-white text-[10px] font-bold flex items-center gap-1 backdrop-blur-xs opacity-80 group-hover:opacity-100 transition-opacity"
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
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 my-3">
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
        <span>{opt.label}</span>
      </button>
    {/each}
  </div>

  <!-- Nút Chấm điểm nhanh cho Chế độ Luyện Tập Quiz -->
  {#if mode === 'practice' && !isCheckedInPractice && selectedAnswer}
    <div class="mt-2 flex justify-end">
      <button
        type="button"
        onclick={onCheckPractice}
        class="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-xs"
      >
        <span>Kiểm tra câu này</span>
      </button>
    </div>
  {/if}

  <!-- Kết quả & Giải thích / Transcript nghe -->
  {#if shouldReveal}
    <div class="mt-4 p-3.5 rounded-2xl border text-xs leading-relaxed {isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200' : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60 text-rose-900 dark:text-rose-200'}">
      <div class="flex items-center gap-2 font-black mb-1">
        {#if isCorrect}
          <Check weight="bold" class="w-4 h-4 text-emerald-600" />
          <span>Chính xác! Đáp án đúng: {question.answer}</span>
        {:else}
          <X weight="bold" class="w-4 h-4 text-rose-600" />
          <span>Chưa đúng! Đáp án đúng là: <strong>{question.answer}</strong></span>
        {/if}
      </div>

      {#if question.listening_script}
        <div class="mt-2 pt-2 border-t border-current/15 text-slate-700 dark:text-neutral-300">
          <span class="font-bold">🎧 Lời thoại nghe (Transcript):</span>
          <p class="mt-1 font-mono text-[11px] leading-relaxed select-text">
            {question.listening_script}
          </p>
        </div>
      {/if}
    </div>
  {/if}
</div>

<!-- Modal xem ảnh phóng to -->
{#if isImageZoomed && question.image}
  <div
    class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs cursor-pointer"
    onclick={() => (isImageZoomed = false)}
    role="button"
    tabindex="0"
    onkeydown={(e) => e.key === 'Escape' && (isImageZoomed = false)}
  >
    <div class="max-w-3xl max-h-[90vh] p-2 bg-white dark:bg-[#1B1B1B] rounded-3xl overflow-hidden shadow-2xl">
      <img
        src={`/exams-media/${question.exam_code}/${question.image}`}
        alt="Phóng to ảnh"
        class="w-full h-auto max-h-[85vh] object-contain rounded-2xl"
      />
    </div>
  </div>
{/if}

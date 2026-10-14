<script lang="ts">
  import BookmarkSimple from 'phosphor-svelte/lib/BookmarkSimple';
  import Check from 'phosphor-svelte/lib/Check';

  interface Props {
    totalQuestions: number;
    answers: Record<number, string>;
    flagged: Record<number, boolean>;
    isExamSubmitted?: boolean;
    mode?: 'exam' | 'practice';
    correctMap?: Record<number, boolean>;
    currentQuestionNo?: number;
    onScrollTo: (qNo: number) => void;
  }

  let {
    totalQuestions,
    answers,
    flagged,
    isExamSubmitted = false,
    mode = 'exam',
    correctMap = {},
    currentQuestionNo = 1,
    onScrollTo
  }: Props = $props();

  const numbers = $derived(Array.from({ length: totalQuestions }, (_, i) => i + 1));
</script>

<div class="h-full flex flex-col bg-white dark:bg-[#1B1B1B] border border-slate-200/90 dark:border-[#282A2C] rounded-2xl p-2.5 sm:p-3 shadow-xs min-h-0 overflow-hidden">
  <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100 dark:border-neutral-800 shrink-0">
    <h2 class="text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200">
      Bản Đồ Câu Hỏi (60 câu)
    </h2>
    <span class="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-neutral-400">
      Đã làm: {Object.keys(answers).length}/{totalQuestions}
    </span>
  </div>

  <!-- Legend -->
  <div class="flex items-center gap-2 text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-neutral-400 mb-2 flex-wrap shrink-0">
    <div class="flex items-center gap-1">
      <span class="w-2.5 h-2.5 rounded-xs bg-orange-600"></span>
      <span>Đã làm</span>
    </div>
    <div class="flex items-center gap-1">
      <span class="w-2.5 h-2.5 rounded-xs bg-amber-400"></span>
      <span>Ghim</span>
    </div>
    <div class="flex items-center gap-1">
      <span class="w-2.5 h-2.5 rounded-xs bg-slate-100 dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700"></span>
      <span>Chưa làm</span>
    </div>
  </div>

  <!-- Grid 60 items: Chỉ cuộn bên trong danh sách số câu -->
  <div class="grid grid-cols-5 gap-1 p-0.5 flex-1 min-h-0 overflow-y-auto scrollbar-thin">
    {#each numbers as qNo}
      {@const isAnswered = !!answers[qNo]}
      {@const isFlag = !!flagged[qNo]}
      {@const shouldShowResult = isExamSubmitted || (mode === 'practice' && isAnswered)}
      {@const isCorrect = shouldShowResult && correctMap[qNo] === true}
      {@const isWrong = shouldShowResult && correctMap[qNo] === false}

      {@const isActive = mode === 'practice' && qNo === currentQuestionNo}

      <button
        type="button"
        onclick={() => onScrollTo(qNo)}
        class="h-7 sm:h-7.5 rounded-lg font-bold text-[11px] sm:text-xs flex items-center justify-center relative cursor-pointer transition-all border {
          isActive ? 'ring-2 ring-orange-500 ring-offset-1 dark:ring-offset-neutral-900 z-10 font-black shadow-xs' : ''
        } {
          isCorrect
            ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
            : isWrong
            ? 'bg-rose-500 text-white border-rose-600 shadow-xs'
            : isAnswered
            ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
            : 'bg-slate-50 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 border-slate-200 dark:border-neutral-700 hover:bg-slate-100 dark:hover:bg-neutral-700'
        }"
      >
        <span>{qNo}</span>
        {#if isFlag}
          <span class="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 ring-1.5 ring-white dark:ring-neutral-900"></span>
        {/if}
      </button>
    {/each}
  </div>
</div>

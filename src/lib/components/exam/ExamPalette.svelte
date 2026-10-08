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
    onScrollTo: (qNo: number) => void;
  }

  let {
    totalQuestions,
    answers,
    flagged,
    isExamSubmitted = false,
    mode = 'exam',
    correctMap = {},
    onScrollTo
  }: Props = $props();

  const numbers = $derived(Array.from({ length: totalQuestions }, (_, i) => i + 1));
</script>

<div class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-3xl p-5 shadow-xs sticky top-20">
  <div class="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-neutral-800">
    <h2 class="text-xs md:text-sm font-black text-slate-800 dark:text-slate-200">
      Bản Đồ Câu Hỏi (60 câu)
    </h2>
    <span class="text-[11px] font-bold text-slate-500 dark:text-neutral-400">
      Đã làm: {Object.keys(answers).length}/{totalQuestions}
    </span>
  </div>

  <!-- Legend -->
  <div class="flex items-center gap-3 text-[11px] font-semibold text-slate-500 dark:text-neutral-400 mb-3 flex-wrap">
    <div class="flex items-center gap-1.5">
      <span class="w-3.5 h-3.5 rounded-md bg-orange-600"></span>
      <span>Đã làm</span>
    </div>
    <div class="flex items-center gap-1.5">
      <span class="w-3.5 h-3.5 rounded-md bg-amber-400"></span>
      <span>Ghim</span>
    </div>
    <div class="flex items-center gap-1.5">
      <span class="w-3.5 h-3.5 rounded-md bg-slate-100 dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700"></span>
      <span>Chưa làm</span>
    </div>
  </div>

  <!-- Grid 60 items -->
  <div class="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-5 lg:grid-cols-6 gap-1.5 max-h-[60vh] overflow-y-auto pr-1 scrollbar-thin">
    {#each numbers as qNo}
      {@const isAnswered = !!answers[qNo]}
      {@const isFlag = !!flagged[qNo]}
      {@const shouldShowResult = isExamSubmitted || (mode === 'practice' && isAnswered)}
      {@const isCorrect = shouldShowResult && correctMap[qNo] === true}
      {@const isWrong = shouldShowResult && correctMap[qNo] === false}

      <button
        type="button"
        onclick={() => onScrollTo(qNo)}
        class="h-8 rounded-xl font-bold text-xs flex items-center justify-center relative cursor-pointer transition-all border {
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
          <span class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-white dark:ring-neutral-900"></span>
        {/if}
      </button>
    {/each}
  </div>
</div>

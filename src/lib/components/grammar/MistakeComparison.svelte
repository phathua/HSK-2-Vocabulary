<script lang="ts">
  import type { CommonMistake } from '#lib/data/hsk2Grammar';
  import XCircle from 'phosphor-svelte/lib/XCircle';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
  import WarningCircle from 'phosphor-svelte/lib/WarningCircle';

  let { mistake } = $props<{
    mistake: CommonMistake;
  }>();
</script>

<div class="rounded-2xl border border-rose-200/80 dark:border-rose-950/60 bg-rose-50/40 dark:bg-rose-950/20 p-3 sm:p-4 space-y-3">
  <!-- Header title with Phosphor Warning icon -->
  <div class="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-xs uppercase tracking-wider">
    <WarningCircle weight="duotone" class="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
    <span>Bẫy đề thi hay mắc sai lầm</span>
  </div>

  <!-- Comparison Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
    <!-- Wrong Box -->
    <div class="rounded-xl border border-rose-200 dark:border-rose-900/60 bg-white/80 dark:bg-[#1E1E1F] p-2.5 space-y-1">
      <div class="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 text-xs font-bold">
        <XCircle weight="duotone" class="w-4 h-4 shrink-0" />
        <span>SAI</span>
      </div>
      <div class="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 line-through decoration-rose-500/70">
        {mistake.wrong}
      </div>
      <div class="text-[11px] text-rose-700 dark:text-rose-400 font-mono">
        {mistake.wrongPinyin}
      </div>
    </div>

    <!-- Correct Box -->
    <div class="rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-white/80 dark:bg-[#1E1E1F] p-2.5 space-y-1">
      <div class="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
        <CheckCircle weight="duotone" class="w-4 h-4 shrink-0" />
        <span>ĐÚNG</span>
      </div>
      <div class="text-xs sm:text-sm font-bold text-emerald-900 dark:text-emerald-300">
        {mistake.correct}
      </div>
      <div class="text-[11px] text-emerald-700 dark:text-emerald-400 font-mono">
        {mistake.correctPinyin}
      </div>
    </div>
  </div>

  <!-- Explanation text -->
  <p class="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed pt-0.5">
    {mistake.explanation}
  </p>
</div>

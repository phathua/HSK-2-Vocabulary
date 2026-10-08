<script lang="ts">
  import Clock from 'phosphor-svelte/lib/Clock';
  import ArrowLeft from 'phosphor-svelte/lib/ArrowLeft';
  import Lightning from 'phosphor-svelte/lib/Lightning';
  import Exam from 'phosphor-svelte/lib/Exam';
  import type { ExamMode } from '#lib/types/exam';

  interface Props {
    title: string;
    examCode: string;
    mode: ExamMode;
    timeRemainingSeconds: number;
    answeredCount: number;
    totalCount: number;
    onModeChange: (newMode: ExamMode) => void;
    onExitRequest?: () => void;
  }

  let {
    title,
    examCode,
    mode = 'exam',
    timeRemainingSeconds,
    answeredCount,
    totalCount,
    onModeChange,
    onExitRequest
  }: Props = $props();

  function formatCountdown(secs: number): string {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  const isLowTime = $derived(mode === 'exam' && timeRemainingSeconds < 300);
</script>

<div class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-3xl p-3.5 sm:p-4 md:p-5 shadow-xs mb-3 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
  <div class="flex items-center gap-3 min-w-0">
    <button
      type="button"
      onclick={() => (onExitRequest ? onExitRequest() : window.history.back())}
      class="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 transition-colors cursor-pointer"
      aria-label="Quay lại danh mục đề thi"
    >
      <ArrowLeft weight="bold" class="w-4 h-4 sm:w-5 sm:h-5" />
    </button>
    <div class="min-w-0">
      <div class="flex items-center gap-2">
        <span class="text-[11px] font-black px-2 py-0.5 rounded-md bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 font-mono shrink-0">
          {examCode}
        </span>
        <h1 class="text-sm md:text-base font-black text-slate-900 dark:text-slate-100 truncate">
          {title}
        </h1>
      </div>
      <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
        <span>Tiến độ: <strong class="text-orange-600 dark:text-orange-400">{answeredCount}</strong>/{totalCount} câu</span>
        <span>•</span>
        <span>200 điểm</span>
      </div>
    </div>
  </div>

  <div class="flex items-center gap-2.5 shrink-0 self-end md:self-center">
    <!-- Switch Chế độ: Thi Thật / Luyện tập Quiz -->
    <div class="flex items-center bg-slate-100 dark:bg-neutral-800 p-1 rounded-2xl text-xs font-bold">
      <button
        type="button"
        onclick={() => onModeChange('exam')}
        class="px-2.5 sm:px-3 py-1.5 rounded-xl cursor-pointer transition-all flex items-center gap-1.5 {mode === 'exam' ? 'bg-white dark:bg-neutral-700 text-orange-600 dark:text-orange-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'}"
      >
        <Exam weight="bold" class="w-3.5 h-3.5" />
        <span>Thi Thật</span>
      </button>
      <button
        type="button"
        onclick={() => onModeChange('practice')}
        class="px-2.5 sm:px-3 py-1.5 rounded-xl cursor-pointer transition-all flex items-center gap-1.5 {mode === 'practice' ? 'bg-white dark:bg-neutral-700 text-orange-600 dark:text-orange-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'}"
      >
        <Lightning weight="bold" class="w-3.5 h-3.5 text-amber-500" />
        <span>Luyện Tập</span>
      </button>
    </div>

    <!-- Đồng hồ đếm ngược trên Header (chỉ ở chế độ thi) -->
    {#if mode === 'exam'}
      <div class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border {isLowTime ? 'bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 animate-pulse' : 'bg-slate-50 dark:bg-neutral-800/80 border-slate-200 dark:border-neutral-700 text-slate-700 dark:text-slate-300'} font-mono font-black text-xs sm:text-sm">
        <Clock weight="duotone" class="w-4 h-4 {isLowTime ? 'text-red-600' : 'text-orange-500'}" />
        <span>{formatCountdown(timeRemainingSeconds)}</span>
      </div>
    {/if}
  </div>
</div>

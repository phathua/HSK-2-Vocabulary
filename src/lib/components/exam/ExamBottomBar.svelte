<script lang="ts">
  import Clock from 'phosphor-svelte/lib/Clock';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
  import ArrowCounterClockwise from 'phosphor-svelte/lib/ArrowCounterClockwise';
  import ListNumbers from 'phosphor-svelte/lib/ListNumbers';
  import type { ExamMode } from '#lib/types/exam';

  interface Props {
    mode: ExamMode;
    timeRemainingSeconds: number;
    answeredCount: number;
    totalCount: number;
    onSubmit: () => void;
    onRetry?: () => void;
    onTogglePaletteModal?: () => void;
  }

  let {
    mode = 'exam',
    timeRemainingSeconds,
    answeredCount,
    totalCount,
    onSubmit,
    onRetry,
    onTogglePaletteModal
  }: Props = $props();

  function formatCountdown(secs: number): string {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  const isLowTime = $derived(mode === 'exam' && timeRemainingSeconds < 300);
</script>

<div class="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-[#1B1B1B]/95 backdrop-blur-md border-t border-slate-200 dark:border-[#282A2C] px-3 sm:px-4 py-2.5 shadow-lg">
  <div class="max-w-7xl mx-auto flex items-center justify-between gap-3">
    <!-- Trái: Tiến độ làm bài & Nút mở Palette bảng câu hỏi trên Mobile -->
    <div class="flex items-center gap-2 sm:gap-3">
      {#if onTogglePaletteModal}
        <button
          type="button"
          onclick={onTogglePaletteModal}
          class="lg:hidden h-9 px-2.5 rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-700 dark:text-neutral-200 flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer active:scale-95 shrink-0"
          title="Bảng câu hỏi"
        >
          <ListNumbers weight="bold" class="w-4 h-4 text-orange-600 dark:text-orange-400" />
          <span>Bảng câu hỏi</span>
        </button>
      {/if}

      <div class="flex items-center gap-1.5 text-xs">
        <span class="text-slate-500 dark:text-neutral-400 hidden xs:inline">Đã làm:</span>
        <span class="font-black text-orange-600 dark:text-orange-400">{answeredCount}</span>
        <span class="text-slate-400 dark:text-neutral-500">/</span>
        <span class="font-bold text-slate-700 dark:text-neutral-300">{totalCount} câu</span>
      </div>
    </div>

    <!-- Giữa: Đồng hồ đếm ngược -->
    {#if mode === 'exam'}
      <div class="flex items-center gap-1.5 px-3 py-1 rounded-xl border {isLowTime ? 'bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 animate-pulse' : 'bg-slate-50 dark:bg-neutral-800/80 border-slate-200 dark:border-neutral-700 text-slate-700 dark:text-slate-300'} font-mono font-black text-xs sm:text-sm">
        <Clock weight="duotone" class="w-3.5 h-3.5 sm:w-4 sm:h-4 {isLowTime ? 'text-red-600' : 'text-orange-500'}" />
        <span>{formatCountdown(timeRemainingSeconds)}</span>
      </div>
    {/if}

    <!-- Phải: Nút Làm lại & Nộp bài -->
    <div class="flex items-center gap-2 shrink-0">
      {#if onRetry}
        <button
          type="button"
          onclick={onRetry}
          class="h-9 px-2.5 sm:px-3 rounded-xl bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 active:scale-95 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all shrink-0"
          title="Làm lại từ đầu"
        >
          <ArrowCounterClockwise weight="bold" class="w-3.5 h-3.5" />
          <span class="hidden sm:inline">Làm lại</span>
        </button>
      {/if}

      <button
        type="button"
        onclick={onSubmit}
        class="h-9 px-3.5 sm:px-4 rounded-xl bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-sm cursor-pointer transition-all shrink-0"
      >
        <CheckCircle weight="bold" class="w-4 h-4" />
        <span>Nộp bài</span>
      </button>
    </div>
  </div>
</div>

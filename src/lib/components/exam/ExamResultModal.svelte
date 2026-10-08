<script lang="ts">
  import Trophy from 'phosphor-svelte/lib/Trophy';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
  import XCircle from 'phosphor-svelte/lib/XCircle';
  import ArrowsClockwise from 'phosphor-svelte/lib/ArrowsClockwise';
  import ArrowLeft from 'phosphor-svelte/lib/ArrowLeft';

  interface Props {
    title: string;
    examCode: string;
    totalCorrect: number;
    listeningCorrect: number;
    readingCorrect: number;
    totalQuestions: number;
    onRetry: () => void;
    onClose: () => void;
  }

  let {
    title,
    examCode,
    totalCorrect,
    listeningCorrect,
    readingCorrect,
    totalQuestions,
    onRetry,
    onClose
  }: Props = $props();

  // Điểm thi HSK 2: Thang 200 điểm (Nghe 100 điểm, Đọc 100 điểm)
  // Mỗi câu nghe (35 câu): ~2.85 điểm
  // Mỗi câu đọc (25 câu): 4.0 điểm
  const listeningScore = $derived(Math.round((listeningCorrect / 35) * 100));
  const readingScore = $derived(Math.round((readingCorrect / 25) * 100));
  const totalScore = $derived(listeningScore + readingScore);
  const isPassed = $derived(totalScore >= 120); // Điểm đỗ chuẩn là 120/200
</script>

<div class="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
  <div class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl text-center animate-in fade-in zoom-in-95 duration-200">
    <div class="w-16 h-16 mx-auto rounded-3xl {isPassed ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'} flex items-center justify-center mb-4">
      <Trophy weight="duotone" class="w-9 h-9" />
    </div>

    <h2 class="text-xl font-black text-slate-900 dark:text-slate-100">
      {isPassed ? 'Chúc mừng bạn đã ĐỖ!' : 'Cần cố gắng thêm!'}
    </h2>
    <p class="text-xs text-slate-500 dark:text-neutral-400 mt-1">
      {title} ({examCode})
    </p>

    <!-- Tổng điểm to rõ -->
    <div class="my-6 p-4 rounded-2xl bg-slate-50 dark:bg-neutral-800/60 border border-slate-100 dark:border-neutral-700/80">
      <div class="text-3xl font-black {isPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'} font-mono">
        {totalScore} <span class="text-sm font-bold text-slate-400">/ 200 điểm</span>
      </div>
      <div class="text-xs font-semibold text-slate-500 dark:text-neutral-400 mt-1">
        Điểm chuẩn đỗ: 120 điểm
      </div>
    </div>

    <!-- Chi tiết 2 phần -->
    <div class="grid grid-cols-2 gap-3 mb-6 text-left">
      <div class="p-3 rounded-2xl bg-orange-50/70 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/40">
        <div class="text-xs font-bold text-orange-800 dark:text-orange-300">
          Phần Nghe (听力)
        </div>
        <div class="text-lg font-black text-slate-900 dark:text-slate-100 mt-0.5">
          {listeningScore} <span class="text-xs font-normal text-slate-500">/ 100</span>
        </div>
        <div class="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5">
          Đúng {listeningCorrect}/35 câu
        </div>
      </div>

      <div class="p-3 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
        <div class="text-xs font-bold text-blue-800 dark:text-blue-300">
          Phần Đọc (阅读)
        </div>
        <div class="text-lg font-black text-slate-900 dark:text-slate-100 mt-0.5">
          {readingScore} <span class="text-xs font-normal text-slate-500">/ 100</span>
        </div>
        <div class="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5">
          Đúng {readingCorrect}/25 câu
        </div>
      </div>
    </div>

    <!-- Nút hành động -->
    <div class="flex items-center gap-3">
      <button
        type="button"
        onclick={onClose}
        class="flex-1 py-3 rounded-2xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
      >
        <span>Xem lại bài làm</span>
      </button>

      <button
        type="button"
        onclick={onRetry}
        class="flex-1 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all"
      >
        <ArrowsClockwise weight="bold" class="w-4 h-4" />
        <span>Làm lại đề</span>
      </button>
    </div>
  </div>
</div>

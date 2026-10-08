<script lang="ts">
  import Header from '#lib/components/Header.svelte';
  import Exam from 'phosphor-svelte/lib/Exam';
  import Trophy from 'phosphor-svelte/lib/Trophy';
  import Clock from 'phosphor-svelte/lib/Clock';
  import ArrowLeft from 'phosphor-svelte/lib/ArrowLeft';
  import CalendarBlank from 'phosphor-svelte/lib/CalendarBlank';
  import Trash from 'phosphor-svelte/lib/Trash';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
  import XCircle from 'phosphor-svelte/lib/XCircle';
  import Play from 'phosphor-svelte/lib/Play';
  import SettingsModal from '#lib/components/SettingsModal.svelte';
  import LessonFilterModal from '#lib/components/LessonFilterModal.svelte';
  import { examHistoryState } from '#lib/state/examHistoryState.svelte';

  const history = $derived(examHistoryState.records);

  const stats = $derived.by(() => {
    if (history.length === 0) {
      return { totalAttempts: 0, passedCount: 0, highestScore: 0, avgScore: 0 };
    }
    const totalAttempts = history.length;
    const passedCount = history.filter((r) => r.isPassed).length;
    const highestScore = Math.max(...history.map((r) => r.scoreTotal));
    const avgScore = Math.round(
      history.reduce((acc, cur) => acc + cur.scoreTotal, 0) / totalAttempts
    );
    return { totalAttempts, passedCount, highestScore, avgScore };
  });

  function formatDate(isoStr: string): string {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoStr;
    }
  }

  function handleClearHistory() {
    if (confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử các lần thi thử không?')) {
      examHistoryState.records = [];
      if (typeof window !== 'undefined') {
        localStorage.removeItem('hsk2_exam_history_v1');
      }
    }
  }
</script>

<svelte:head>
  <title>Lịch Sử Thi Thử HSK 2 | Ôn Tập HSK</title>
</svelte:head>

<Header />

<main class="flex-1 flex flex-col min-h-0 my-3 overflow-y-auto pr-1">
  <!-- Top Navigation Bar -->
  <div class="flex items-center justify-between gap-3 mb-4">
    <div class="flex items-center gap-3">
      <a
        href="/thi-thu"
        class="w-10 h-10 rounded-2xl bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 transition-colors shadow-2xs"
        aria-label="Quay lại danh mục đề thi"
      >
        <ArrowLeft weight="bold" class="w-5 h-5" />
      </a>
      <div>
        <h1 class="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span>Lịch Sử Làm Bài Thi</span>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300">
            {history.length} Lần nộp bài
          </span>
        </h1>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Theo dõi tiến độ, điểm số và các lần làm đề thi thử HSK 2 của bạn.
        </p>
      </div>
    </div>

    {#if history.length > 0}
      <button
        type="button"
        onclick={handleClearHistory}
        class="px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
      >
        <Trash class="w-4 h-4" />
        <span class="hidden sm:inline">Xóa lịch sử</span>
      </button>
    {/if}
  </div>

  <!-- Summary Stats Overview -->
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
    <div class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-2xl p-4 shadow-2xs text-left">
      <div class="text-[11px] font-bold text-slate-400 dark:text-neutral-500 flex items-center gap-1.5">
        <Exam class="w-4 h-4 text-orange-500" />
        <span>Tổng lần thi</span>
      </div>
      <div class="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">
        {stats.totalAttempts}
      </div>
    </div>

    <div class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-2xl p-4 shadow-2xs text-left">
      <div class="text-[11px] font-bold text-slate-400 dark:text-neutral-500 flex items-center gap-1.5">
        <Trophy class="w-4 h-4 text-emerald-500" />
        <span>Điểm cao nhất</span>
      </div>
      <div class="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
        {stats.highestScore}<span class="text-xs font-normal text-slate-400">/200</span>
      </div>
    </div>

    <div class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-2xl p-4 shadow-2xs text-left">
      <div class="text-[11px] font-bold text-slate-400 dark:text-neutral-500 flex items-center gap-1.5">
        <CheckCircle class="w-4 h-4 text-blue-500" />
        <span>Tỷ lệ Đỗ</span>
      </div>
      <div class="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
        {stats.totalAttempts > 0 ? Math.round((stats.passedCount / stats.totalAttempts) * 100) : 0}%
      </div>
    </div>

    <div class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-2xl p-4 shadow-2xs text-left">
      <div class="text-[11px] font-bold text-slate-400 dark:text-neutral-500 flex items-center gap-1.5">
        <Clock class="w-4 h-4 text-purple-500" />
        <span>Điểm trung bình</span>
      </div>
      <div class="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mt-1 font-mono">
        {stats.avgScore}<span class="text-xs font-normal text-slate-400">/200</span>
      </div>
    </div>
  </div>

  <!-- History Records List -->
  {#if history.length === 0}
    <div class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-3xl p-10 text-center shadow-2xs my-auto">
      <div class="w-14 h-14 mx-auto rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center mb-3">
        <Exam class="w-8 h-8" />
      </div>
      <h2 class="text-base font-bold text-slate-900 dark:text-slate-100">
        Bạn chưa làm bài thi thử nào
      </h2>
      <p class="text-xs text-slate-500 dark:text-neutral-400 max-w-sm mx-auto mt-1 mb-5">
        Hãy vào danh mục đề thi và chọn một bộ đề chuẩn Hanban để đánh giá năng lực của mình ngay nhé!
      </p>
      <a
        href="/thi-thu"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs shadow-sm transition-all"
      >
        <Play weight="bold" class="w-4 h-4" />
        <span>Chọn đề thi ngay</span>
      </a>
    </div>
  {:else}
    <div class="space-y-3 pb-8">
      {#each history as rec (rec.id)}
        <div class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-orange-300 dark:hover:border-orange-800 transition-all">
          <div>
            <div class="flex items-center gap-2 mb-1.5 flex-wrap">
              <span class="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full {rec.isPassed ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300' : 'bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300'}">
                {rec.isPassed ? 'ĐÃ ĐỖ' : 'CHƯA ĐỖ'}
              </span>
              <span class="text-xs font-mono font-bold text-slate-400 dark:text-neutral-400">
                {rec.examCode}
              </span>
              <span class="text-[11px] text-slate-400 dark:text-neutral-500 flex items-center gap-1">
                <CalendarBlank class="w-3.5 h-3.5" />
                <span>{formatDate(rec.completedAt)}</span>
              </span>
            </div>

            <h2 class="text-sm font-bold text-slate-900 dark:text-slate-100">
              {rec.title}
            </h2>

            <div class="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-neutral-400 mt-2 flex-wrap">
              <span class="text-orange-600 dark:text-orange-400 font-bold">
                Nghe: {rec.listeningScore}đ ({rec.listeningCorrect}/35 câu)
              </span>
              <span>•</span>
              <span class="text-blue-600 dark:text-blue-400 font-bold">
                Đọc: {rec.readingScore}đ ({rec.readingCorrect}/25 câu)
              </span>
            </div>
          </div>

          <div class="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-neutral-800">
            <div class="text-right">
              <div class="text-2xl font-black {rec.isPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'} font-mono">
                {rec.scoreTotal} <span class="text-xs font-normal text-slate-400">/ 200đ</span>
              </div>
            </div>

            <a
              href={`/thi-thu/${rec.examCode}`}
              class="px-4 py-2 rounded-xl bg-orange-50 dark:bg-orange-950/40 hover:bg-orange-100 text-orange-600 dark:text-orange-400 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Thi lại</span>
            </a>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</main>

<LessonFilterModal />
<SettingsModal />

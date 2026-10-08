<script lang="ts">
  import Header from '#lib/components/Header.svelte';
  import Exam from 'phosphor-svelte/lib/Exam';
  import Clock from 'phosphor-svelte/lib/Clock';
  import Play from 'phosphor-svelte/lib/Play';
  import Sparkle from 'phosphor-svelte/lib/Sparkle';
  import Trophy from 'phosphor-svelte/lib/Trophy';
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
  import ImageSquare from 'phosphor-svelte/lib/ImageSquare';
  import SettingsModal from '#lib/components/SettingsModal.svelte';
  import LessonFilterModal from '#lib/components/LessonFilterModal.svelte';
  import { mockExamsData, type MockExamItem } from '#lib/data/mockExamsList';
  import { examHistoryState } from '#lib/state/examHistoryState.svelte';

  let selectedFilter = $state('all');

  const filteredExams = $derived(
    selectedFilter === 'all'
      ? mockExamsData
      : mockExamsData.filter((e: MockExamItem) => {
          if (selectedFilter === 'hanban') return e.tag.includes('Đề thi thật') || e.tag.includes('Chính thức');
          if (selectedFilter === 'sample') return e.tag.includes('Đề mẫu');
          if (selectedFilter === 'mock') return e.tag.includes('Mock');
          return true;
        })
  );
</script>

<svelte:head>
  <title>Thi Thử HSK 2 | Ôn Tập HSK</title>
</svelte:head>

<Header />

<main class="flex-1 flex flex-col min-h-0 pt-3 pb-2 overflow-y-auto pr-1">
  <!-- Header Bar tinh gọn: Tiêu đề + Thống kê nhỏ gọn ngang hàng -->
  <div class="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-200/80 dark:border-[#282A2C]">
    <div class="flex items-center gap-2.5 min-w-0">
      <div class="w-8 h-8 rounded-lg bg-orange-500/10 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
        <Exam weight="duotone" class="w-5 h-5" />
      </div>
      <div class="min-w-0">
        <h1 class="text-sm sm:text-base font-extrabold text-slate-900 dark:text-[#E3E3E3] leading-tight truncate">
          Đề Thi Thử HSK 2
        </h1>
        <p class="text-[11px] text-slate-500 dark:text-[#8E918F] mt-0.5 leading-tight truncate">
          60 câu / 55 phút • Chuẩn thi máy tính Hanban
        </p>
      </div>
    </div>

    <div class="flex items-center gap-2 shrink-0 ml-auto sm:ml-0">
      <a
        href="/thi-thu/lich-su"
        class="inline-flex items-center gap-1.5 text-[11px] font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 hover:bg-orange-100 px-2.5 py-1 rounded-lg border border-orange-200 dark:border-orange-900/50 transition-colors"
      >
        <Trophy class="w-3.5 h-3.5" />
        <span>Lịch sử thi</span>
      </a>
      <span class="hidden sm:inline-flex items-center text-[11px] font-semibold text-slate-500 dark:text-[#8E918F] bg-slate-100 dark:bg-[#1B1B1B] px-2.5 py-1 rounded-lg border border-slate-200 dark:border-[#282A2C]">
        {mockExamsData.length} đề thi
      </span>
    </div>
  </div>

  <!-- Filter Tabs: Cuộn ngang mượt mà, flex shrink-0 để không bao giờ bị cắt chữ/truncate trên Mobile -->
  <div class="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1 text-xs font-bold scrollbar-none shrink-0">
    <button
      type="button"
      onclick={() => (selectedFilter = 'all')}
      class="px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 {selectedFilter === 'all'
        ? 'bg-orange-600 text-white shadow-2xs'
        : 'bg-slate-200/70 dark:bg-[#1B1B1B] hover:bg-slate-200 dark:hover:bg-[#282A2C] text-slate-600 dark:text-[#8E918F]'}"
    >
      Tất cả ({mockExamsData.length})
    </button>
    <button
      type="button"
      onclick={() => (selectedFilter = 'hanban')}
      class="px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 {selectedFilter === 'hanban'
        ? 'bg-orange-600 text-white shadow-2xs'
        : 'bg-slate-200/70 dark:bg-[#1B1B1B] hover:bg-slate-200 dark:hover:bg-[#282A2C] text-slate-600 dark:text-[#8E918F]'}"
    >
      Đề thi thật
    </button>
    <button
      type="button"
      onclick={() => (selectedFilter = 'sample')}
      class="px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 {selectedFilter === 'sample'
        ? 'bg-orange-600 text-white shadow-2xs'
        : 'bg-slate-200/70 dark:bg-[#1B1B1B] hover:bg-slate-200 dark:hover:bg-[#282A2C] text-slate-600 dark:text-[#8E918F]'}"
    >
      Đề mẫu Hanban
    </button>
    <button
      type="button"
      onclick={() => (selectedFilter = 'mock')}
      class="px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 {selectedFilter === 'mock'
        ? 'bg-orange-600 text-white shadow-2xs'
        : 'bg-slate-200/70 dark:bg-[#1B1B1B] hover:bg-slate-200 dark:hover:bg-[#282A2C] text-slate-600 dark:text-[#8E918F]'}"
    >
      Online Mock
    </button>
  </div>

  <!-- Danh sách đề thi: Card ngang gọn gàng, chia 2 cột trên md, cực kỳ tinh tế -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 pb-6">
    {#each filteredExams as exam}
      <div class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-xl p-3 shadow-2xs hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-all flex flex-col justify-between group">
        <div>
          <!-- Top Row: Mã đề & Badges -->
          <div class="flex items-center justify-between gap-2 mb-1.5">
            <div class="flex items-center gap-1.5 min-w-0">
              <span class="text-[10px] font-bold px-1.5 py-0.5 rounded {exam.badgeColor === 'emerald' ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/50' : exam.badgeColor === 'purple' ? 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-400 border border-purple-200/60 dark:border-purple-900/50' : 'bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400 border border-orange-200/60 dark:border-orange-900/50'}">
                {exam.tag}
              </span>
              <span class="text-[11px] font-mono font-semibold text-slate-400 dark:text-neutral-500">
                {exam.code}
              </span>
            </div>

            {#if exam.hasAudio}
              <span class="text-[10px] font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-1 shrink-0">
                <SpeakerHigh class="w-3 h-3" />
                <span>Audio</span>
              </span>
            {/if}
          </div>

          <!-- Title -->
          <h2 class="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-[#E3E3E3] group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
            {exam.title}
          </h2>

          <!-- Meta Info: Thời gian, số câu, ảnh -->
          <div class="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-[#8E918F] mt-1.5">
            <span class="flex items-center gap-0.5">
              <Clock class="w-3 h-3 text-orange-500" />
              <span>{exam.duration}</span>
            </span>
            <span>•</span>
            <span>{exam.questionsCount} câu</span>
            {#if exam.imagesCount > 0}
              <span>•</span>
              <span class="flex items-center gap-0.5">
                <ImageSquare class="w-3 h-3 text-slate-400" />
                <span>{exam.imagesCount} ảnh</span>
              </span>
            {/if}
          </div>
        </div>

        <!-- Footer Card: Điểm cao nhất & Nút Vào Thi Nhỏ Gọn -->
        <div class="mt-2.5 pt-2 border-t border-slate-100 dark:border-[#282A2C] flex items-center justify-between gap-2">
          <div class="text-[11px]">
            {#if examHistoryState.getBestScore(exam.code) !== null}
              <span class="font-bold text-emerald-600 dark:text-emerald-400">
                Đạt: {examHistoryState.getBestScore(exam.code)}/200đ
              </span>
            {:else}
              <span class="text-slate-400 dark:text-neutral-500">
                Thang 200 điểm
              </span>
            {/if}
          </div>

          <a
            href={`/thi-thu/${exam.id}`}
            class="px-3 py-1 rounded-lg bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-bold text-[11px] flex items-center gap-1 transition-all cursor-pointer shadow-2xs shrink-0"
          >
            <Play weight="bold" class="w-3 h-3" />
            <span>Làm đề</span>
          </a>
        </div>
      </div>
    {/each}
  </div>
</main>

<LessonFilterModal />
<SettingsModal />

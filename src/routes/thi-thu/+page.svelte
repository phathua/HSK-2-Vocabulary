<script lang="ts">
  import Header from '#lib/components/Header.svelte';
  import Exam from 'phosphor-svelte/lib/Exam';
  import Clock from 'phosphor-svelte/lib/Clock';
  import Play from 'phosphor-svelte/lib/Play';
  import Sparkle from 'phosphor-svelte/lib/Sparkle';
  import SettingsModal from '#lib/components/SettingsModal.svelte';
  import LessonFilterModal from '#lib/components/LessonFilterModal.svelte';
  import { mockExamsData, type MockExamItem } from '#lib/data/mockExamsList';

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
  <title>Thi Thử HSK | Ôn Tập HSK</title>
</svelte:head>

<Header />

<main class="flex-1 flex flex-col min-h-0 my-3 overflow-y-auto pr-1">
  <!-- Hero Section -->
  <div class="bg-orange-500/10 dark:bg-orange-500/20 border border-orange-200 dark:border-orange-900/50 rounded-3xl p-5 mb-4 flex items-center gap-4">
    <div class="w-14 h-14 rounded-2xl bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-md">
      <Exam weight="duotone" class="w-8 h-8" />
    </div>
    <div>
      <h1 class="text-lg md:text-xl font-black text-slate-900 dark:text-slate-100">
        Phòng Thi Thử HSK Mô Phỏng
      </h1>
      <p class="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
        Đánh giá chuẩn năng lực với cấu trúc đề chuẩn Hanban & đồng hồ thi bấm giờ thực tế.
      </p>
    </div>
  </div>

  <!-- Filter Tabs -->
  <div class="flex items-center gap-2 mb-4 overflow-x-auto pb-1 text-xs font-bold scrollbar-none">
    <button
      type="button"
      onclick={() => (selectedFilter = 'all')}
      class="px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap {selectedFilter === 'all'
        ? 'bg-orange-600 text-white shadow-xs'
        : 'bg-white dark:bg-[#1B1B1B] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#282A2C]'}"
    >
      Tất cả ({mockExamsData.length})
    </button>
    <button
      type="button"
      onclick={() => (selectedFilter = 'hanban')}
      class="px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap {selectedFilter === 'hanban'
        ? 'bg-orange-600 text-white shadow-xs'
        : 'bg-white dark:bg-[#1B1B1B] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#282A2C]'}"
    >
      Đề thi thật Hanban
    </button>
    <button
      type="button"
      onclick={() => (selectedFilter = 'sample')}
      class="px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap {selectedFilter === 'sample'
        ? 'bg-orange-600 text-white shadow-xs'
        : 'bg-white dark:bg-[#1B1B1B] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#282A2C]'}"
    >
      Đề mẫu chuẩn (样卷)
    </button>
    <button
      type="button"
      onclick={() => (selectedFilter = 'mock')}
      class="px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap {selectedFilter === 'mock'
        ? 'bg-orange-600 text-white shadow-xs'
        : 'bg-white dark:bg-[#1B1B1B] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#282A2C]'}"
    >
      Online Mock Test
    </button>
  </div>

  <!-- Mock Exam List -->
  <div class="space-y-3.5">
    {#each filteredExams as exam}
      <div class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-3xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-orange-300 dark:hover:border-orange-800 transition-all">
        <div>
          <div class="flex items-center gap-2 mb-1.5 flex-wrap">
            <span class="text-[11px] font-black px-2.5 py-0.5 rounded-full {exam.badgeColor === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300' : exam.badgeColor === 'purple' ? 'bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300' : 'bg-orange-100 dark:bg-orange-950/70 text-orange-700 dark:text-orange-300'}">
              {exam.tag}
            </span>
            <span class="text-xs font-bold font-mono text-slate-400 dark:text-neutral-400">
              {exam.code}
            </span>
            {#if exam.hasAudio}
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                Audio OGG/MP3
              </span>
            {/if}
          </div>
          <h2 class="text-base font-extrabold text-slate-900 dark:text-slate-100">
            {exam.title}
          </h2>
          <div class="flex items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2 flex-wrap">
            <span class="flex items-center gap-1">
              <Clock weight="duotone" class="w-4 h-4 text-orange-500" />
              {exam.duration}
            </span>
            <span>•</span>
            <span>{exam.questionsCount} câu (35 Nghe + 25 Đọc)</span>
            <span>•</span>
            <span>{exam.imagesCount} ảnh minh họa</span>
          </div>
        </div>

        <a
          href={`/thi-thu/${exam.id}`}
          class="px-5 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs md:text-sm flex items-center justify-center gap-2 shrink-0 shadow-sm active:scale-95 transition-all cursor-pointer"
        >
          <Play weight="bold" class="w-4 h-4" />
          <span>Vào phòng thi</span>
        </a>
      </div>
    {/each}
  </div>
</main>

<LessonFilterModal />
<SettingsModal />

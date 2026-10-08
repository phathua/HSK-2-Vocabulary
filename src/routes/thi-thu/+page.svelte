<script lang="ts">
  import Header from '#lib/components/Header.svelte';
  import Exam from 'phosphor-svelte/lib/Exam';
  import Clock from 'phosphor-svelte/lib/Clock';
  import Play from 'phosphor-svelte/lib/Play';
  import Sparkle from 'phosphor-svelte/lib/Sparkle';
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
  import ImageSquare from 'phosphor-svelte/lib/ImageSquare';
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
  <title>Thi Thử HSK 2 | Ôn Tập HSK</title>
</svelte:head>

<Header />

<main class="flex-1 flex flex-col min-h-0 my-3 overflow-y-auto pr-1">
  <!-- Hero Banner nhỏ gọn, tinh tế -->
  <div class="relative overflow-hidden bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent dark:from-orange-950/30 dark:via-neutral-900 border border-orange-200/80 dark:border-[#282A2C] rounded-2xl p-4 sm:p-5 mb-4">
    <div class="flex items-center gap-3.5">
      <div class="w-11 h-11 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-sm">
        <Exam weight="duotone" class="w-6 h-6" />
      </div>
      <div>
        <h1 class="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span>Phòng Thi Thử HSK 2</span>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-orange-500 text-white">
            60 Câu / 55 Phút
          </span>
        </h1>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Mô phỏng kỳ thi máy tính chuẩn Hanban: 35 câu Nghe & 25 câu Đọc.
        </p>
      </div>
    </div>
  </div>

  <!-- Filter Tabs dạng Pill thanh lịch -->
  <div class="flex items-center gap-1.5 mb-4 overflow-x-auto pb-1 text-xs font-bold scrollbar-none">
    <button
      type="button"
      onclick={() => (selectedFilter = 'all')}
      class="px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap {selectedFilter === 'all'
        ? 'bg-orange-600 text-white shadow-xs'
        : 'bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-600 dark:text-slate-300'}"
    >
      Tất cả ({mockExamsData.length})
    </button>
    <button
      type="button"
      onclick={() => (selectedFilter = 'hanban')}
      class="px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap {selectedFilter === 'hanban'
        ? 'bg-orange-600 text-white shadow-xs'
        : 'bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-600 dark:text-slate-300'}"
    >
      Đề thi thật
    </button>
    <button
      type="button"
      onclick={() => (selectedFilter = 'sample')}
      class="px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap {selectedFilter === 'sample'
        ? 'bg-orange-600 text-white shadow-xs'
        : 'bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-600 dark:text-slate-300'}"
    >
      Đề mẫu Hanban
    </button>
    <button
      type="button"
      onclick={() => (selectedFilter = 'mock')}
      class="px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap {selectedFilter === 'mock'
        ? 'bg-orange-600 text-white shadow-xs'
        : 'bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-600 dark:text-slate-300'}"
    >
      Online Mock
    </button>
  </div>

  <!-- Danh sách đề thi: Grid 1 hoặc 2 cột gọn gàng, nút vào thi đặt góc phải thanh thoát -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pb-6">
    {#each filteredExams as exam}
      <div class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-2xl p-4 shadow-2xs hover:border-orange-400 dark:hover:border-orange-600/80 transition-all flex flex-col justify-between group">
        <div>
          <!-- Badges & Tag -->
          <div class="flex items-center justify-between gap-2 mb-2">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-md {exam.badgeColor === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300' : exam.badgeColor === 'purple' ? 'bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300' : 'bg-orange-100 dark:bg-orange-950/70 text-orange-700 dark:text-orange-300'}">
                {exam.tag}
              </span>
              <span class="text-[11px] font-mono font-bold text-slate-400 dark:text-neutral-400">
                {exam.code}
              </span>
            </div>

            {#if exam.hasAudio}
              <span class="text-[10px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                <SpeakerHigh class="w-3.5 h-3.5" />
                <span>Audio</span>
              </span>
            {/if}
          </div>

          <!-- Title -->
          <h2 class="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
            {exam.title}
          </h2>

          <!-- Meta Info -->
          <div class="flex items-center gap-2 text-[11px] font-medium text-slate-500 dark:text-neutral-400 mt-2 flex-wrap">
            <span class="flex items-center gap-1">
              <Clock class="w-3.5 h-3.5 text-orange-500" />
              <span>{exam.duration}</span>
            </span>
            <span>•</span>
            <span>{exam.questionsCount} câu</span>
            {#if exam.imagesCount > 0}
              <span>•</span>
              <span class="flex items-center gap-1">
                <ImageSquare class="w-3.5 h-3.5 text-slate-400" />
                <span>{exam.imagesCount} ảnh</span>
              </span>
            {/if}
          </div>
        </div>

        <!-- Button Vào thi tinh tế, gọn gàng -->
        <div class="mt-3.5 pt-3 border-t border-slate-100 dark:border-neutral-800/80 flex items-center justify-between">
          <span class="text-[11px] text-slate-400 dark:text-neutral-500 font-medium">
            200 điểm tối đa
          </span>
          <a
            href={`/thi-thu/${exam.id}`}
            class="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs active:scale-95 transition-all cursor-pointer"
          >
            <Play weight="bold" class="w-3.5 h-3.5" />
            <span>Làm đề</span>
          </a>
        </div>
      </div>
    {/each}
  </div>
</main>

<LessonFilterModal />
<SettingsModal />

<script lang="ts">
  import Header from '#lib/components/Header.svelte';
  import Exam from 'phosphor-svelte/lib/Exam';
  import Clock from 'phosphor-svelte/lib/Clock';
  import Play from 'phosphor-svelte/lib/Play';
  import Sparkle from 'phosphor-svelte/lib/Sparkle';
  import SettingsModal from '#lib/components/SettingsModal.svelte';
  import LessonFilterModal from '#lib/components/LessonFilterModal.svelte';

  const mockExams = [
    {
      id: 1,
      title: 'Đề Thi Thử HSK 2 - Đề Số 1 (Chuẩn Đề Gốc)',
      duration: '50 phút',
      questions: '60 câu (35 câu Nghe + 25 câu Đọc)',
      level: 'HSK 2',
      tag: 'Phổ biến nhất'
    },
    {
      id: 2,
      title: 'Đề Thi Thử HSK 2 - Đề Số 2 (Tốc Độ Nhanh)',
      duration: '45 phút',
      questions: '60 câu (Phản xạ nhanh)',
      level: 'HSK 2',
      tag: 'Mới cập nhật'
    },
    {
      id: 3,
      title: 'Đề Ôn Luyện Cấp Tốc HSK 1 & 2 Tổng Hợp',
      duration: '35 phút',
      questions: '40 câu trọng tâm',
      level: 'HSK 1-2',
      tag: 'Cơ bản'
    }
  ];
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

  <!-- Mock Exam List -->
  <div class="space-y-3.5">
    {#each mockExams as exam}
      <div class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-3xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-orange-300 dark:hover:border-orange-800 transition-all">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <span class="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/70 text-orange-700 dark:text-orange-300">
              {exam.tag}
            </span>
            <span class="text-xs font-bold text-slate-400 dark:text-neutral-500">
              {exam.level}
            </span>
          </div>
          <h2 class="text-base font-extrabold text-slate-900 dark:text-slate-100">
            {exam.title}
          </h2>
          <div class="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2">
            <span class="flex items-center gap-1">
              <Clock weight="duotone" class="w-4 h-4 text-orange-500" />
              {exam.duration}
            </span>
            <span>•</span>
            <span>{exam.questions}</span>
          </div>
        </div>

        <button
          type="button"
          onclick={() => alert(`Tính năng bắt đầu làm đề "${exam.title}" đang chuẩn bị mở!`)}
          class="px-5 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs md:text-sm flex items-center justify-center gap-2 shrink-0 shadow-sm active:scale-95 transition-all cursor-pointer"
        >
          <Play weight="bold" class="w-4 h-4" />
          <span>Vào phòng thi</span>
        </button>
      </div>
    {/each}
  </div>
</main>

<LessonFilterModal />
<SettingsModal />

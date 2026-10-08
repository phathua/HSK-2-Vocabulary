<script lang="ts">
  import Header from '#lib/components/Header.svelte';
  import Exam from 'phosphor-svelte/lib/Exam';
  import Clock from 'phosphor-svelte/lib/Clock';
  import Play from 'phosphor-svelte/lib/Play';
  import Sparkle from 'phosphor-svelte/lib/Sparkle';
  import Trophy from 'phosphor-svelte/lib/Trophy';
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
  import ImageSquare from 'phosphor-svelte/lib/ImageSquare';
  import Eye from 'phosphor-svelte/lib/Eye';
  import X from 'phosphor-svelte/lib/X';
  import BookOpen from 'phosphor-svelte/lib/BookOpen';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
  import SettingsModal from '#lib/components/SettingsModal.svelte';
  import LessonFilterModal from '#lib/components/LessonFilterModal.svelte';
  import { mockExamsData, type MockExamItem } from '#lib/data/mockExamsList';
  import { examHistoryState } from '#lib/state/examHistoryState.svelte';
  import { getExamImageUrl } from '#lib/utils/examAssets';

  import { goto, preloadData } from '$app/navigation';

  let selectedFilter = $state('all');
  let enteringExam = $state<MockExamItem | null>(null);
  let previewExam = $state<MockExamItem | null>(null);

  function handleStartExam(exam: MockExamItem) {
    if (enteringExam) return;
    enteringExam = exam;
    // Preload & navigate
    setTimeout(() => {
      goto(`/thi-thu/${exam.id}`);
    }, 120);
  }

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
      <div class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-2xl p-3 shadow-2xs hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-all flex flex-col justify-between group">
        <div class="flex items-start gap-3">
          <!-- Thumbnail bên trái card -->
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-100 dark:bg-neutral-800/80 border border-slate-200/80 dark:border-neutral-700/60 overflow-hidden shrink-0 flex items-center justify-center relative group-hover:border-orange-400/50 transition-colors">
            {#if exam.imagesCount > 0}
              <img
                src={getExamImageUrl(exam.code, `${exam.code}_img_01.webp`)}
                alt={`Thumbnail ${exam.code}`}
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onerror={(e: any) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div class="hidden absolute inset-0 flex items-center justify-center text-slate-400">
                <Exam class="w-6 h-6" />
              </div>
            {:else}
              <div class="flex flex-col items-center justify-center text-slate-400">
                <Exam class="w-6 h-6 text-orange-500" />
                <span class="text-[9px] font-mono mt-0.5">HSK 2</span>
              </div>
            {/if}
          </div>

          <!-- Thông tin đề thi bên phải Thumbnail -->
          <div class="flex-1 min-w-0">
            <!-- Top Row: Mã đề & Badges -->
            <div class="flex items-center justify-between gap-1.5 mb-1">
              <div class="flex items-center gap-1.5 min-w-0">
                <span class="text-[10px] font-bold px-1.5 py-0.5 rounded {exam.badgeColor === 'emerald' ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/50' : exam.badgeColor === 'purple' ? 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-400 border border-purple-200/60 dark:border-purple-900/50' : 'bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400 border border-orange-200/60 dark:border-orange-900/50'}">
                  {exam.tag}
                </span>
                <span class="text-[11px] font-mono font-semibold text-slate-400 dark:text-neutral-500 truncate">
                  {exam.code}
                </span>
              </div>

              {#if exam.hasAudio}
                <span class="text-[10px] font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-0.5 shrink-0">
                  <SpeakerHigh class="w-3 h-3" />
                  <span>Audio</span>
                </span>
              {/if}
            </div>

            <!-- Title -->
            <h2 class="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-[#E3E3E3] group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
              {exam.title}
            </h2>

            <!-- Meta Info: Thời gian, số câu -->
            <div class="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-[#8E918F] mt-1">
              <span class="flex items-center gap-0.5">
                <Clock class="w-3 h-3 text-orange-500" />
                <span>{exam.duration}</span>
              </span>
              <span>•</span>
              <span>{exam.questionsCount} câu</span>
            </div>
          </div>
        </div>

        <!-- Footer Card: Điểm cao nhất & Các nút Thao tác (Xem trước + Làm đề) -->
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

          <div class="flex items-center gap-1.5 shrink-0">
            <!-- Nút Xem trước tóm tắt đề -->
            <button
              type="button"
              onclick={() => (previewExam = exam)}
              class="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 hover:bg-slate-100 dark:hover:bg-neutral-700 text-slate-600 dark:text-neutral-300 font-bold text-[11px] flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
              title="Xem tóm tắt cấu trúc đề thi"
            >
              <Eye weight="bold" class="w-3 h-3" />
              <span>Xem trước</span>
            </button>

            <!-- Nút Bắt đầu làm bài thi -->
            <button
              type="button"
              onclick={() => handleStartExam(exam)}
              class="px-3 py-1 rounded-lg bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-bold text-[11px] flex items-center gap-1 transition-all cursor-pointer shadow-2xs shrink-0"
            >
              <Play weight="bold" class="w-3 h-3" />
              <span>Làm đề</span>
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</main>

<!-- Modal Xem trước Tóm tắt Đề Thi Gọn Gàng -->
{#if previewExam}
  <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in select-none">
    <div class="bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#282A2C] rounded-3xl p-5 sm:p-6 max-w-sm w-full shadow-2xl relative">
      <!-- Nút Đóng -->
      <button
        type="button"
        onclick={() => (previewExam = null)}
        class="absolute top-4 right-4 w-7 h-7 rounded-xl bg-slate-100 dark:bg-neutral-800 text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-200 flex items-center justify-center cursor-pointer transition-colors"
        aria-label="Đóng"
      >
        <X weight="bold" class="w-4 h-4" />
      </button>

      <!-- Header Modal -->
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0">
          <BookOpen weight="duotone" class="w-5 h-5" />
        </div>
        <div class="min-w-0 pr-6">
          <span class="text-[10px] font-bold text-orange-600 dark:text-orange-400 tracking-wider uppercase">
            Tóm tắt đề thi • {previewExam.code}
          </span>
          <h3 class="text-sm font-black text-slate-900 dark:text-[#E3E3E3] truncate">
            {previewExam.title}
          </h3>
        </div>
      </div>

      <!-- Cấu trúc đề thi chi tiết -->
      <div class="space-y-2 bg-slate-50 dark:bg-[#252525] rounded-2xl p-3.5 mb-4 text-xs border border-slate-100 dark:border-neutral-800">
        <div class="flex items-center justify-between py-1 border-b border-slate-200/60 dark:border-neutral-700/60">
          <span class="text-slate-500 dark:text-neutral-400 flex items-center gap-1.5">
            <Clock class="w-3.5 h-3.5 text-orange-500" />
            Thời gian làm bài:
          </span>
          <span class="font-extrabold text-slate-800 dark:text-neutral-200">55 phút</span>
        </div>

        <div class="flex items-center justify-between py-1 border-b border-slate-200/60 dark:border-neutral-700/60">
          <span class="text-slate-500 dark:text-neutral-400 flex items-center gap-1.5">
            <SpeakerHigh class="w-3.5 h-3.5 text-sky-500" />
            Phần Nghe (听力):
          </span>
          <span class="font-extrabold text-slate-800 dark:text-neutral-200">35 câu (4 phần)</span>
        </div>

        <div class="flex items-center justify-between py-1 border-b border-slate-200/60 dark:border-neutral-700/60">
          <span class="text-slate-500 dark:text-neutral-400 flex items-center gap-1.5">
            <BookOpen class="w-3.5 h-3.5 text-blue-500" />
            Phần Đọc (阅读):
          </span>
          <span class="font-extrabold text-slate-800 dark:text-neutral-200">25 câu (4 phần)</span>
        </div>

        <div class="flex items-center justify-between py-1">
          <span class="text-slate-500 dark:text-neutral-400 flex items-center gap-1.5">
            <Trophy class="w-3.5 h-3.5 text-amber-500" />
            Thang điểm chuẩn:
          </span>
          <span class="font-extrabold text-emerald-600 dark:text-emerald-400">200 điểm (≥ 120 Đạt)</span>
        </div>
      </div>

      <!-- Footer Action -->
      <div class="flex items-center gap-2">
        <button
          type="button"
          onclick={() => (previewExam = null)}
          class="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-700 text-xs font-bold text-slate-600 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          Đóng
        </button>
        <button
          type="button"
          onclick={() => {
            const e = previewExam;
            previewExam = null;
            if (e) handleStartExam(e);
          }}
          class="flex-1 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
        >
          <Play weight="bold" class="w-3.5 h-3.5" />
          <span>Vào thi ngay</span>
        </button>
      </div>
    </div>
  </div>
{/if}

<!-- Loading Overlay: Chặn thao tác, thông báo chuẩn bị đề thi tức thì -->
{#if enteringExam}
  <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in select-none">
    <div class="bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#282A2C] rounded-3xl p-6 max-w-xs w-full shadow-2xl flex flex-col items-center text-center">
      <div class="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center mb-3.5">
        <Exam weight="duotone" class="w-6 h-6 animate-pulse" />
      </div>
      <h3 class="text-sm font-black text-slate-900 dark:text-[#E3E3E3]">
        Đang mở phòng thi...
      </h3>
      <p class="text-xs font-mono font-bold text-orange-600 dark:text-orange-400 mt-1">
        Mã đề: {enteringExam.code}
      </p>
      <p class="text-[11px] text-slate-500 dark:text-[#8E918F] mt-1 leading-relaxed">
        Đang nạp 60 câu hỏi & tệp âm thanh OGG...
      </p>
      <div class="w-full bg-slate-100 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden mt-4">
        <div class="h-full bg-orange-600 rounded-full animate-indeterminate"></div>
      </div>
    </div>
  </div>
{/if}

<LessonFilterModal />
<SettingsModal />

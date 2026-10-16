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
  import WarningCircle from 'phosphor-svelte/lib/WarningCircle';
  import FilePdf from 'phosphor-svelte/lib/FilePdf';
  import ListBullets from 'phosphor-svelte/lib/ListBullets';
  import SettingsModal from '#lib/components/SettingsModal.svelte';
  import LessonFilterModal from '#lib/components/LessonFilterModal.svelte';
  import { mockExamsData, type MockExamItem } from '#lib/data/mockExamsList';
  import { EXAM_PDF_PAGE_COUNTS } from '#lib/data/examPdfPageCounts';
  import { examHistoryState } from '#lib/state/examHistoryState.svelte';
  import { getExamImageUrl } from '#lib/utils/examAssets';
  import { getExamData } from '#lib/utils/examLoader';
  import { parseOptionItem } from '#lib/utils/examOptionParser';

  import { goto, preloadData } from '$app/navigation';
  import { page } from '$app/state';

  // Danh sách các mã đề đã được đối chiếu & kiểm duyệt chuẩn 100% với đề thi thật
  const VERIFIED_EXAMS = new Set([
    'H2-YJ',
    'H20901',
    'H20902',
    'H21003',
    'H21004',
    'H21005',
    'H21006',
    'H21329',
    'H21330',
    'H21331'
  ]);

  let selectedFilter = $state('all');
  let enteringExam = $state<MockExamItem | null>(null);
  let previewExam = $state<MockExamItem | null>(null);
  let previewTab = $state<'pdf' | 'questions'>('pdf');

  function handleOpenPreview(exam: MockExamItem) {
    previewExam = exam;
    previewTab = 'pdf';
  }

  $effect(() => {
    const previewCode = page.url.searchParams.get('preview');
    if (previewCode) {
      const match = mockExamsData.find(
        (e) => e.code.toLowerCase() === previewCode.toLowerCase() || e.id.toLowerCase() === previewCode.toLowerCase()
      );
      if (match) {
        previewExam = match;
        previewTab = 'pdf';
      }
    }
  });

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
          if (selectedFilter === 'verified') return VERIFIED_EXAMS.has(e.code);
          if (selectedFilter === 'unverified') return !VERIFIED_EXAMS.has(e.code);
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
      onclick={() => (selectedFilter = 'verified')}
      class="px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1 {selectedFilter === 'verified'
        ? 'bg-emerald-600 text-white shadow-2xs'
        : 'bg-slate-200/70 dark:bg-[#1B1B1B] hover:bg-slate-200 dark:hover:bg-[#282A2C] text-slate-600 dark:text-[#8E918F]'}"
    >
      <CheckCircle weight="fill" class="w-3.5 h-3.5 text-emerald-300" />
      <span>Đã chuẩn ({mockExamsData.filter((e) => VERIFIED_EXAMS.has(e.code)).length})</span>
    </button>
    <button
      type="button"
      onclick={() => (selectedFilter = 'unverified')}
      class="px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1 {selectedFilter === 'unverified'
        ? 'bg-amber-600 text-white shadow-2xs'
        : 'bg-slate-200/70 dark:bg-[#1B1B1B] hover:bg-slate-200 dark:hover:bg-[#282A2C] text-slate-600 dark:text-[#8E918F]'}"
    >
      <WarningCircle weight="fill" class="w-3.5 h-3.5 text-amber-300" />
      <span>Chưa chuẩn ({mockExamsData.filter((e) => !VERIFIED_EXAMS.has(e.code)).length})</span>
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

            <!-- Thumbnail không còn badge che góc -->
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
                {#if !VERIFIED_EXAMS.has(exam.code)}
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    Chưa chuẩn
                  </span>
                {/if}
              </div>

              {#if exam.hasAudio}
                <span class="text-[10px] font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-0.5 shrink-0">
                  <SpeakerHigh class="w-3 h-3" />
                  <span>Có phần nghe</span>
                </span>
              {/if}
            </div>

            <!-- Title kèm dấu tích xanh Meta Verified hoặc cảnh báo chưa chuẩn bên cạnh -->
            <h2 class="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-[#E3E3E3] group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors flex items-center gap-1 line-clamp-1">
              <span class="truncate">{exam.title}</span>
              {#if VERIFIED_EXAMS.has(exam.code)}
                <span title="Đề đã kiểm duyệt chuẩn 100%" class="inline-flex shrink-0">
                  <CheckCircle weight="fill" class="w-3.5 h-3.5 text-blue-500" />
                </span>
              {:else}
                <span title="Đề chưa chuẩn hóa" class="inline-flex shrink-0">
                  <WarningCircle weight="fill" class="w-3.5 h-3.5 text-amber-500" />
                </span>
              {/if}
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
          <div class="text-[11px] min-w-0">
            {#if examHistoryState.getBestScore(exam.code) !== null}
              {@const bestScore = examHistoryState.getBestScore(exam.code)!}
              {@const attempts = examHistoryState.getAttemptsCount(exam.code)}
              <button
                type="button"
                onclick={() => examHistoryState.openHistory(exam.code)}
                class="inline-flex items-center gap-1.5 font-bold {bestScore >= 120 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'} hover:opacity-80 transition-opacity cursor-pointer select-none text-left"
                title="Bấm để xem lịch sử làm bài đề {exam.code} ({attempts} lần thi)"
              >
                <Clock class="w-3.5 h-3.5 shrink-0" />
                <span class="hover:underline underline-offset-2">
                  {bestScore >= 120 ? 'Đạt' : 'Điểm'}: {bestScore}/200đ
                </span>
                <span class="text-[10px] px-1.5 py-0.2 rounded-md bg-slate-100 dark:bg-neutral-800 text-slate-500 dark:text-neutral-400 font-semibold no-underline shrink-0">
                  {attempts} lần
                </span>
              </button>
            {:else}
              <span class="text-slate-400 dark:text-neutral-500 select-none">
                Chưa làm
              </span>
            {/if}
          </div>

          <div class="flex items-center gap-1.5 shrink-0">
            <!-- Nút Xem trước đề thi -->
            <button
              type="button"
              onclick={() => handleOpenPreview(exam)}
              class="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 hover:bg-slate-100 dark:hover:bg-neutral-700 text-slate-600 dark:text-neutral-300 font-bold text-[11px] flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
              title="Xem trước đề thi"
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

<!-- Modal Xem trước Đề Thi: Cuộn xem chi tiết từng câu hỏi & hình ảnh -->
{#if previewExam}
  {@const previewDetail = getExamData(previewExam.code)}
  {@const pdfPages = EXAM_PDF_PAGE_COUNTS[previewExam.code] || 0}
  <!-- Backdrop -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 select-none"
    onclick={() => (previewExam = null)}
  >
    <!-- Modal Card: Tối ưu full chiều cao gọn gàng trên mobile, max-2xl trên desktop -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#282A2C] rounded-2xl sm:rounded-3xl w-full max-w-2xl h-[94vh] sm:h-auto sm:max-h-[90vh] shadow-2xl flex flex-col overflow-hidden"
      onclick={(e) => e.stopPropagation()}
    >
      <!-- Header Modal: Gọn gàng, không truncate, icon & tiêu đề tối giản theo Rule 5 -->
      <div class="flex items-center justify-between px-3.5 py-2.5 sm:px-4 sm:py-3 border-b border-slate-100 dark:border-[#282A2C] shrink-0 gap-2">
        <div class="flex items-center gap-2 min-w-0">
          <div class="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
            <BookOpen weight="duotone" class="w-4.5 h-4.5" />
          </div>
          <h3 class="text-xs sm:text-sm font-black text-slate-900 dark:text-[#E3E3E3] leading-snug flex items-center gap-1.5">
            <span>{previewExam.title}</span>
            {#if VERIFIED_EXAMS.has(previewExam.code)}
              <span title="Đề đã kiểm duyệt chuẩn 100%" class="inline-flex shrink-0">
                <CheckCircle weight="fill" class="w-3.5 h-3.5 text-blue-500" />
              </span>
            {:else}
              <span title="Đề chưa chuẩn hóa" class="inline-flex shrink-0">
                <WarningCircle weight="fill" class="w-3.5 h-3.5 text-amber-500" />
              </span>
            {/if}
          </h3>
        </div>

        <div class="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onclick={() => {
              const e = previewExam;
              previewExam = null;
              if (e) handleStartExam(e);
            }}
            class="px-2.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 active:scale-95 text-white text-xs font-bold flex items-center gap-1 shadow-2xs transition-all cursor-pointer whitespace-nowrap"
            title="Bắt đầu thi đề này"
          >
            <Play weight="bold" class="w-3.5 h-3.5" />
            <span>Vào thi</span>
          </button>
          <button
            type="button"
            onclick={() => (previewExam = null)}
            class="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#282A2C] hover:bg-slate-200 dark:hover:bg-[#37393B] text-slate-500 dark:text-[#C4C7C5] flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Đóng"
          >
            <X weight="bold" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Mode Tabs: Gọn gàng trên mobile, không bị rớt dòng hay gãy chữ -->
      <div class="px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-50 dark:bg-[#252525] border-b border-slate-100 dark:border-[#282A2C] flex items-center justify-between gap-2 shrink-0">
        <div class="inline-flex items-center gap-1 bg-slate-200/70 dark:bg-[#1A1A1A] p-0.5 rounded-xl text-xs font-bold">
          <button
            type="button"
            onclick={() => (previewTab = 'pdf')}
            class="px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap {previewTab === 'pdf'
              ? 'bg-white dark:bg-[#2D2D2D] text-orange-600 dark:text-orange-400 shadow-2xs'
              : 'text-slate-600 dark:text-[#8E918F] hover:text-slate-900 dark:hover:text-white'}"
          >
            <FilePdf weight="bold" class="w-3.5 h-3.5" />
            <span>Bản scan ({pdfPages})</span>
          </button>
          <button
            type="button"
            onclick={() => (previewTab = 'questions')}
            class="px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap {previewTab === 'questions'
              ? 'bg-white dark:bg-[#2D2D2D] text-orange-600 dark:text-orange-400 shadow-2xs'
              : 'text-slate-600 dark:text-[#8E918F] hover:text-slate-900 dark:hover:text-white'}"
          >
            <ListBullets weight="bold" class="w-3.5 h-3.5" />
            <span>Câu hỏi ({previewDetail?.questions?.length || 60})</span>
          </button>
        </div>

        <!-- Metrics trên màn hình lớn hơn -->
        <div class="hidden sm:flex items-center gap-3 text-[11px] font-bold text-slate-500 dark:text-[#8E918F]">
          <span class="flex items-center gap-1">
            <Clock class="w-3.5 h-3.5 text-orange-500" />
            55 phút
          </span>
          <span class="flex items-center gap-1">
            <SpeakerHigh class="w-3.5 h-3.5 text-sky-500" />
            35 nghe
          </span>
          <span class="flex items-center gap-1">
            <BookOpen class="w-3.5 h-3.5 text-blue-500" />
            25 đọc
          </span>
        </div>
      </div>

      <!-- Feed Body: Cuộn xem mượt mà toàn bộ trang scan gốc full ảnh hoặc bóc tách từng câu -->
      <div class="flex-1 overflow-y-auto p-2 sm:p-4">
        {#if previewTab === 'pdf'}
          {#if pdfPages > 0}
            <!-- Xếp các ảnh full ra theo đúng thứ tự, không kèm chú thích theo yêu cầu -->
            <div class="flex flex-col gap-2 sm:gap-3 max-w-2xl mx-auto">
              {#each Array.from({ length: pdfPages }, (_, i) => i + 1) as pageNum (pageNum)}
                <img
                  src={`/exams/${previewExam.code}/pdf_pages/page_${String(pageNum).padStart(2, '0')}.webp`}
                  alt={`Trang ${pageNum}`}
                  class="w-full h-auto rounded-xl border border-slate-200/80 dark:border-[#282A2C] shadow-xs bg-white select-none block"
                  loading="lazy"
                />
              {/each}
            </div>
          {:else}
            <div class="py-16 text-center text-xs text-slate-400 flex flex-col items-center gap-3">
              <FilePdf class="w-10 h-10 text-slate-300 dark:text-neutral-600" />
              <p>Đề thi này chưa có bản scan PDF gốc.</p>
              <button
                type="button"
                onclick={() => (previewTab = 'questions')}
                class="px-3.5 py-1.5 rounded-xl bg-orange-600 text-white font-bold text-xs cursor-pointer"
              >
                Chuyển sang xem bóc tách câu hỏi
              </button>
            </div>
          {/if}
        {:else}
          <div class="space-y-3 sm:space-y-4">
            {#if previewDetail && previewDetail.questions && previewDetail.questions.length > 0}
              {#each previewDetail.questions as q, idx (idx)}
                <div class="p-3 sm:p-3.5 rounded-2xl bg-slate-50/80 dark:bg-[#202124] border border-slate-100 dark:border-[#282A2C] text-xs">
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-black text-orange-600 dark:text-orange-400">
                      Câu {q.question_no || (idx + 1)}
                    </span>
                    <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-[#282A2C] text-slate-600 dark:text-[#8E918F]">
                      {q.section || ''} {q.part ? `• ${q.part}` : ''}
                    </span>
                  </div>

                  <!-- Question Image if any -->
                  {#if q.image}
                    <div class="my-2 flex justify-center">
                      <img
                        src={getExamImageUrl(previewExam.code, q.image)}
                        alt={`Hình câu ${q.question_no}`}
                        class="max-h-44 sm:max-h-52 rounded-xl border border-slate-200 dark:border-neutral-700 bg-white object-contain shadow-2xs"
                        loading="lazy"
                      />
                    </div>
                  {/if}

                  <!-- Board Image if any -->
                  {#if q.board_image}
                    <div class="my-2 flex justify-center">
                      <img
                        src={getExamImageUrl(previewExam.code, q.board_image)}
                        alt={`Bảng đáp án câu ${q.question_no}`}
                        class="max-h-52 sm:max-h-60 rounded-xl border border-slate-200 dark:border-neutral-700 bg-white object-contain shadow-2xs"
                        loading="lazy"
                      />
                    </div>
                  {/if}

                  <!-- Question Text or Listening Script -->
                  {#if q.text && !q.text.startsWith('Câu hỏi nghe số')}
                    <div class="my-1.5 flex flex-col gap-0.5">
                      {#if q.pinyin}
                        <p class="text-xs text-sky-600 dark:text-sky-400 font-medium">
                          {q.pinyin}
                        </p>
                      {/if}
                      <p class="font-bold text-slate-800 dark:text-[#E3E3E3] text-sm font-serif">
                        {q.text}
                      </p>
                    </div>
                  {/if}

                  {#if q.listening_script}
                    <div class="p-2.5 rounded-xl bg-sky-50/80 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40 my-1.5">
                      <span class="text-[10px] uppercase font-bold text-sky-600 dark:text-sky-400 block mb-1">Lời thoại bài nghe</span>
                      {#if q.listening_pinyin}
                        <p class="text-[11px] text-sky-600/80 dark:text-sky-400/80 font-medium mb-0.5">
                          {q.listening_pinyin}
                        </p>
                      {/if}
                      <p class="font-bold text-slate-800 dark:text-[#E3E3E3] text-xs font-serif">
                        {q.listening_script}
                      </p>
                    </div>
                  {/if}

                  <!-- Options if any -->
                  {#if q.options && q.options.length > 0}
                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                      {#each q.options as opt}
                        {@const parsed = parseOptionItem(opt)}
                        <div class="px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] font-semibold text-slate-700 dark:text-[#C4C7C5] text-[11px] flex items-start gap-1.5">
                          {#if parsed.letter}
                            <span class="font-bold text-sky-600 dark:text-sky-400 shrink-0 pt-0.5">{parsed.letter}.</span>
                          {/if}
                          <div class="flex flex-col min-w-0">
                            {#if parsed.pinyin}
                              <span class="text-[10px] text-slate-400 dark:text-[#8E918F] font-normal leading-tight">{parsed.pinyin}</span>
                            {/if}
                            <span class="font-bold leading-tight break-words font-serif text-xs text-slate-800 dark:text-[#E3E3E3]">{parsed.hanzi}</span>
                          </div>
                        </div>
                      {/each}
                    </div>
                  {/if}
                </div>
              {/each}
            {:else}
              <div class="py-12 text-center text-xs text-slate-400">
                Đang tải dữ liệu câu hỏi của đề thi...
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<!-- Loading Overlay: Chặn thao tác, thông báo chuẩn bị đề thi tức thì -->
{#if enteringExam}
  <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in select-none">
    <div class="bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#282A2C] rounded-3xl p-6 max-w-xs w-full shadow-2xl flex flex-col items-center text-center">
      <div class="w-24 h-24 mb-2 relative flex items-center justify-center">
        <img
          src="/icons/panda-exam-loading.webp"
          alt="Mascot Gấu trúc thi HSK"
          class="w-full h-full object-contain filter drop-shadow-md animate-bounce"
        />
      </div>
      <h3 class="text-sm font-black text-slate-900 dark:text-[#E3E3E3]">
        Đang mở phòng thi...
      </h3>
      <p class="text-xs font-mono font-bold text-orange-600 dark:text-orange-400 mt-1">
        Mã đề: {enteringExam.code}
      </p>
      <p class="text-[11px] text-slate-500 dark:text-[#8E918F] mt-1 leading-relaxed">
        Đang nạp 60 câu hỏi & tệp âm thanh bài thi...
      </p>
      <div class="w-full bg-slate-100 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden mt-4">
        <div class="h-full bg-orange-600 rounded-full animate-indeterminate"></div>
      </div>
    </div>
  </div>
{/if}

<LessonFilterModal />
<SettingsModal />

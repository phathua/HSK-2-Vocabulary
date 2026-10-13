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
  import SettingsModal from '#lib/components/SettingsModal.svelte';
  import LessonFilterModal from '#lib/components/LessonFilterModal.svelte';
  import { mockExamsData, type MockExamItem } from '#lib/data/mockExamsList';
  import { examHistoryState } from '#lib/state/examHistoryState.svelte';
  import { getExamImageUrl } from '#lib/utils/examAssets';
  import { getExamData } from '#lib/utils/examLoader';

  import { goto, preloadData } from '$app/navigation';

  // Danh sách các mã đề đã được đối chiếu & kiểm duyệt chuẩn 100% với đề thi thật
  const VERIFIED_EXAMS = new Set([
    'H2-YJ',
    'H20000',
    'H20901',
    'H20902',
    'H21002',
    'H21003',
    'H21004',
    'H21005',
    'H21006',
    'H21007',
    'H21008',
    'H21009',
    'H21112',
    'H21113',
    'H21115',
    'H21116',
    'H21117',
    'H21118',
    'H21119',
    'H21220',
    'H21221',
    'H21222',
    'H21223',
    'H21329',
    'H21330',
    'H21331',
    'H21332',
    'H21333',
    'H21334',
    'H21335',
    'H21555B',
    'H21555C',
    'H21555D'
  ]);

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
          if (selectedFilter === 'verified') return VERIFIED_EXAMS.has(e.code);
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
              </div>

              {#if exam.hasAudio}
                <span class="text-[10px] font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-0.5 shrink-0">
                  <SpeakerHigh class="w-3 h-3" />
                  <span>Có phần nghe</span>
                </span>
              {/if}
            </div>

            <!-- Title kèm dấu tích xanh Meta Verified tinh tế bên cạnh -->
            <h2 class="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-[#E3E3E3] group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors flex items-center gap-1 line-clamp-1">
              <span class="truncate">{exam.title}</span>
              {#if VERIFIED_EXAMS.has(exam.code)}
                <span title="Đề đã kiểm duyệt chuẩn 100%" class="inline-flex shrink-0">
                  <CheckCircle weight="fill" class="w-3.5 h-3.5 text-blue-500" />
                </span>
              {:else}
                <span title="Đề chưa chuẩn hóa" class="inline-flex shrink-0">
                  <CheckCircle weight="bold" class="w-3.5 h-3.5 text-slate-300 dark:text-[#555]" />
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
          <div class="text-[11px]">
            {#if examHistoryState.getBestScore(exam.code) !== null}
              <span class="font-bold text-emerald-600 dark:text-emerald-400">
                Đạt: {examHistoryState.getBestScore(exam.code)}/200đ
              </span>
            {:else}
              <span class="text-slate-400 dark:text-neutral-500">
                Chưa làm
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

<!-- Modal Xem trước Đề Thi: Cuộn xem chi tiết từng câu hỏi & hình ảnh -->
{#if previewExam}
  {@const previewDetail = getExamData(previewExam.code)}
  <!-- Backdrop -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 select-none"
    onclick={() => (previewExam = null)}
  >
    <!-- Modal Card Full Screen / Max-2xl -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#282A2C] rounded-3xl w-full max-w-2xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden"
      onclick={(e) => e.stopPropagation()}
    >
      <!-- Header Modal -->
      <div class="flex items-center justify-between p-4 border-b border-slate-100 dark:border-[#282A2C] shrink-0">
        <div class="flex items-center gap-2.5 min-w-0 pr-2">
          <div class="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
            <BookOpen weight="duotone" class="w-5 h-5" />
          </div>
          <div class="min-w-0">
            <span class="text-[10px] font-mono font-bold text-orange-600 dark:text-orange-400 tracking-wider uppercase">
              Xem trước câu hỏi • {previewExam.code}
            </span>
            <h3 class="text-sm font-black text-slate-900 dark:text-[#E3E3E3] truncate">
              {previewExam.title}
            </h3>
          </div>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onclick={() => {
              const e = previewExam;
              previewExam = null;
              if (e) handleStartExam(e);
            }}
            class="px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-black flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Play weight="bold" class="w-3.5 h-3.5" />
            <span class="hidden sm:inline">Vào thi ngay</span>
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

      <!-- Quick Metrics Strip -->
      <div class="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-[#252525] border-b border-slate-100 dark:border-[#282A2C] text-[11px] font-bold text-slate-500 dark:text-[#8E918F] shrink-0">
        <span class="flex items-center gap-1">
          <Clock class="w-3.5 h-3.5 text-orange-500" />
          55 phút
        </span>
        <span class="flex items-center gap-1">
          <SpeakerHigh class="w-3.5 h-3.5 text-sky-500" />
          Nghe: 35 câu
        </span>
        <span class="flex items-center gap-1">
          <BookOpen class="w-3.5 h-3.5 text-blue-500" />
          Đọc: 25 câu
        </span>
        <span class="text-emerald-600 dark:text-emerald-400">
          60 câu hỏi
        </span>
      </div>

      <!-- Questions Feed Body (Cuộn xem mượt mà từng câu/trang) -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        {#if previewDetail && previewDetail.questions && previewDetail.questions.length > 0}
          {#each previewDetail.questions as q, idx (idx)}
            <div class="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-[#202124] border border-slate-100 dark:border-[#282A2C] text-xs">
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
                <p class="font-bold text-slate-800 dark:text-[#E3E3E3] text-sm my-1">
                  {q.text}
                </p>
              {/if}

              {#if q.listening_script}
                <div class="p-2 rounded-xl bg-sky-50/80 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40 my-1.5">
                  <span class="text-[10px] uppercase font-bold text-sky-600 dark:text-sky-400 block mb-0.5">Lời thoại bài nghe</span>
                  <p class="font-bold text-slate-800 dark:text-[#E3E3E3] text-xs">
                    {q.listening_script}
                  </p>
                  {#if q.listening_pinyin}
                    <p class="text-[11px] text-sky-600/80 dark:text-sky-400/80 font-medium">
                      {q.listening_pinyin}
                    </p>
                  {/if}
                </div>
              {/if}

              <!-- Options if any -->
              {#if q.options && q.options.length > 0}
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mt-2">
                  {#each q.options as opt}
                    <div class="px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] font-semibold text-slate-700 dark:text-[#C4C7C5] text-[11px] flex items-center gap-1">
                      <span>{opt}</span>
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

      <!-- Footer Action -->
      <div class="p-3 border-t border-slate-100 dark:border-[#282A2C] flex items-center justify-between shrink-0 bg-white dark:bg-[#1E1E1E]">
        <button
          type="button"
          onclick={() => (previewExam = null)}
          class="px-4 py-2 rounded-xl border border-slate-200 dark:border-neutral-700 text-xs font-bold text-slate-600 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
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
          class="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-black flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
        >
          <Play weight="bold" class="w-3.5 h-3.5" />
          <span>Bắt đầu thi ngay</span>
        </button>
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

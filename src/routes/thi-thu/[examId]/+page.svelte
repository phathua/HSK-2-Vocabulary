<script lang="ts">
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  import Header from '#lib/components/Header.svelte';
  import ExamHeader from '#lib/components/exam/ExamHeader.svelte';
  import ExamBottomBar from '#lib/components/exam/ExamBottomBar.svelte';
  import ExamAudioPlayer from '#lib/components/exam/ExamAudioPlayer.svelte';
  import ExamQuestionCard from '#lib/components/exam/ExamQuestionCard.svelte';
  import ExamQuickQuizCard from '#lib/components/exam/ExamQuickQuizCard.svelte';
  import ExamPalette from '#lib/components/exam/ExamPalette.svelte';
  import ExamResultModal from '#lib/components/exam/ExamResultModal.svelte';
  import SettingsModal from '#lib/components/SettingsModal.svelte';
  import LessonFilterModal from '#lib/components/LessonFilterModal.svelte';
  import { getExamData } from '#lib/utils/examLoader';
  import { examHistoryState } from '#lib/state/examHistoryState.svelte';
  import { examRoomState } from '#lib/state/examRoomState.svelte';
  import { goto } from '$app/navigation';
  import SignOut from 'phosphor-svelte/lib/SignOut';
  import WarningCircle from 'phosphor-svelte/lib/WarningCircle';
  import X from 'phosphor-svelte/lib/X';
  import ArrowLeft from 'phosphor-svelte/lib/ArrowLeft';
  import Exam from 'phosphor-svelte/lib/Exam';
  import Lightning from 'phosphor-svelte/lib/Lightning';
  import ListNumbers from 'phosphor-svelte/lib/ListNumbers';
  import Clock from 'phosphor-svelte/lib/Clock';
  import type { ExamDetail, ExamMode } from '#lib/types/exam';

  const examId = $derived(page.params.examId);
  const exam = $derived(examId ? getExamData(examId) : null);
  const isLoading = $derived(!exam && !examId);

  let mode = $state<ExamMode>('exam');

  // Exam state
  let answers = $state<Record<number, string>>({});
  let flagged = $state<Record<number, boolean>>({});
  let checkedPractice = $state<Record<number, boolean>>({});
  let timeRemainingSeconds = $state(55 * 60); // 55 phút = 3300 giây
  let isSubmitted = $state(false);
  let showResultModal = $state(false);
  let showExitModal = $state(false);
  let showPaletteModal = $state(false);
  let isScrolled = $state(false);
  let currentQuestionIndex = $state(0);
  let mainScrollEl: HTMLElement | null = null;
  let timerInterval: any = null;

  $effect(() => {
    examRoomState.timeRemainingSeconds = timeRemainingSeconds;
    examRoomState.isExamMode = mode === 'exam';
    examRoomState.isSubmitted = isSubmitted;
    examRoomState.isScrolled = isScrolled;
  });

  onMount(() => {
    examRoomState.isActive = true;
    examRoomState.examCode = examId ?? '';
    examRoomState.timeRemainingSeconds = timeRemainingSeconds;
    examRoomState.isExamMode = mode === 'exam';
    examRoomState.submitFn = handleSubmitExam;
    examRoomState.retryFn = handleRetry;

    // Start timer: Đếm ngược 55 phút cho CẢ 2 CHẾ ĐỘ ('exam' và 'practice')
    timerInterval = setInterval(() => {
      if (!isSubmitted) {
        if (!examRoomState.isPreviewPhase) {
          if (timeRemainingSeconds > 0) {
            timeRemainingSeconds -= 1;
          } else {
            handleSubmitExam();
          }
        }
      }
    }, 1000);

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isSubmitted) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Lắng nghe scroll để đồng bộ Header bộ đếm thời gian
    const handleScroll = () => {
      if (mainScrollEl) {
        isScrolled = mainScrollEl.scrollTop > 50;
      }
    };

    if (mainScrollEl) {
      mainScrollEl.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (timerInterval) clearInterval(timerInterval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (mainScrollEl) {
        mainScrollEl.removeEventListener('scroll', handleScroll);
      }
      examRoomState.reset();
    };
  });

  const listeningQuestions = $derived(
    exam?.questions.filter((q) => (q.section || '').includes('Listening') || (q.section || '').includes('听力') || q.question_no <= 35) ?? []
  );

  const readingQuestions = $derived(
    exam?.questions.filter((q) => (q.section || '').includes('Reading') || (q.section || '').includes('阅读') || q.question_no > 35) ?? []
  );

  const totalAnswered = $derived(Object.keys(answers).length);

  // Thống kê kết quả
  const scoreResults = $derived.by(() => {
    if (!exam) return { totalCorrect: 0, listeningCorrect: 0, readingCorrect: 0, correctMap: {} };
    let lCorrect = 0;
    let rCorrect = 0;
    const correctMap: Record<number, boolean> = {};

    for (const q of exam.questions) {
      const userAns = answers[q.question_no];
      const isRight = userAns && userAns === q.answer;
      correctMap[q.question_no] = !!isRight;
      if (isRight) {
        if (q.section.includes('Listening') || q.section.includes('听力')) {
          lCorrect += 1;
        } else {
          rCorrect += 1;
        }
      }
    }

    const lScore = Math.round((lCorrect / 35) * 100);
    const rScore = Math.round((rCorrect / 25) * 100);

    return {
      totalCorrect: lCorrect + rCorrect,
      listeningCorrect: lCorrect,
      readingCorrect: rCorrect,
      listeningScore: lScore,
      readingScore: rScore,
      totalScore: lScore + rScore,
      correctMap
    };
  });

  function handleSelectAnswer(qNo: number, val: string) {
    if (isSubmitted && mode === 'exam') return;
    answers[qNo] = val;
  }

  function handleToggleFlag(qNo: number) {
    flagged[qNo] = !flagged[qNo];
  }

  function handleCheckPractice(qNo: number) {
    checkedPractice[qNo] = true;
  }

  function handleSubmitExam() {
    if (isSubmitted) {
      showResultModal = true;
      return;
    }
    const unanswered = (exam?.total_questions ?? 60) - totalAnswered;
    if (unanswered > 0 && mode === 'exam') {
      const confirmSubmit = confirm(`Bạn còn ${unanswered} câu chưa điền đáp án. Bạn có chắc chắn muốn nộp bài?`);
      if (!confirmSubmit) return;
    }
    isSubmitted = true;
    showResultModal = true;
  }

  function handleRetry() {
    answers = {};
    flagged = {};
    checkedPractice = {};
    timeRemainingSeconds = 55 * 60;
    currentQuestionIndex = 0;
    isSubmitted = false;
    showResultModal = false;
  }

  function handleScrollTo(qNo: number) {
    if (mode === 'practice') {
      currentQuestionIndex = Math.max(0, Math.min((exam?.total_questions ?? 60) - 1, qNo - 1));
      return;
    }
    const el = document.getElementById(`question-${qNo}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
</script>

<svelte:head>
  <title>{exam ? `${exam.title} (${exam.exam_code}) | Thi Thử HSK 2` : 'Phòng Thi Thử HSK'}</title>
</svelte:head>

<Header />

<main
  bind:this={mainScrollEl}
  class="flex-1 flex flex-col min-h-0 {mode === 'practice' ? 'overflow-hidden my-1' : 'overflow-y-auto my-2 pr-1 pb-3'}"
>
  {#if isLoading}
    <div class="flex-1 flex items-center justify-center p-12">
      <div class="flex flex-col items-center gap-3">
        <div class="w-8 h-8 border-3 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
        <p class="text-xs font-bold text-slate-500">Đang chuẩn bị đề thi...</p>
      </div>
    </div>
  {:else if !exam}
    <div class="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <h2 class="text-lg font-black text-slate-900 dark:text-slate-100">
        Không tìm thấy đề thi ({examId})
      </h2>
      <p class="text-xs text-slate-500 dark:text-neutral-400 mt-1">
        Vui lòng chọn đề thi khác từ danh mục.
      </p>
      <a
        href="/thi-thu"
        class="mt-4 px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold"
      >
        Quay lại danh mục
      </a>
    </div>
  {:else if mode === 'practice'}
    {@const currentQ = exam.questions[currentQuestionIndex]}
    {#if currentQ}
      <!-- 1. Thanh Điều Hướng Siêu Gọn (~38px) Cho Chế Độ Thi Nhanh -->
      <div class="shrink-0 flex items-center justify-between gap-2 mb-2 px-0.5">
        <!-- Nút Quay Lại + Badge Mã Đề -->
        <div class="flex items-center gap-2">
          <button
            type="button"
            onclick={() => goto('/thi-thu')}
            class="h-9 px-3 rounded-xl bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#282A2C] transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer active:scale-95"
            title="Quay lại danh mục đề thi"
          >
            <ArrowLeft weight="bold" class="w-3.5 h-3.5" />
            <span class="hidden sm:inline">Quay lại</span>
          </button>

          <span class="h-9 px-2.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 font-mono font-black text-xs border border-orange-200 dark:border-orange-900/50 flex items-center">
            {exam.exam_code}
          </span>
        </div>

        <!-- Switch Pill: Thi Thử Chuẩn vs Thi Nhanh -->
        <div class="inline-flex items-center p-1 bg-slate-200/70 dark:bg-[#282A2C] rounded-2xl border border-slate-200/80 dark:border-[#37393B]">
          <button
            type="button"
            onclick={() => (mode = 'exam')}
            class="px-2.5 sm:px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-neutral-200 active:scale-95"
          >
            <Exam weight="bold" class="w-3.5 h-3.5" />
            <span class="hidden sm:inline">Thi Thử</span>
          </button>
          <button
            type="button"
            onclick={() => (mode = 'practice')}
            class="px-2.5 sm:px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 bg-white dark:bg-[#1B1B1B] text-orange-600 dark:text-orange-400 shadow-xs"
          >
            <Lightning weight="fill" class="w-3.5 h-3.5 text-orange-500" />
            <span>Thi Nhanh</span>
          </button>
        </div>

        <!-- Phải: Nút mở danh sách câu hỏi trên Mobile (< lg) + Đồng hồ đếm ngược -->
        <div class="flex items-center gap-1.5">
          <!-- Nút mở Drawer Bảng 60 câu trên Mobile -->
          <button
            type="button"
            onclick={() => (showPaletteModal = true)}
            class="lg:hidden h-9 px-2.5 rounded-xl bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#282A2C] transition-colors shadow-2xs flex items-center gap-1 cursor-pointer active:scale-95"
            title="Xem bảng 60 câu hỏi"
          >
            <ListNumbers weight="bold" class="w-4 h-4 text-orange-500" />
            <span class="font-mono">{totalAnswered}/{exam.total_questions}</span>
          </button>

          <!-- Đồng hồ thời gian thi còn lại -->
          <div
            class="h-9 px-2.5 rounded-xl border border-slate-200 dark:border-[#282A2C] bg-white dark:bg-[#1B1B1B] text-slate-700 dark:text-[#E3E3E3] flex items-center gap-1.5 font-mono font-black text-xs shadow-2xs"
            title="Thời gian làm bài thi"
          >
            <Clock weight="duotone" class="w-4 h-4 text-orange-500" />
            <span>{Math.floor(timeRemainingSeconds / 60)}:{String(timeRemainingSeconds % 60).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      <!-- 2. Thẻ Trắc Nghiệm Single View (100% Khớp Không Cuộn Trang) -->
      <div class="flex-1 min-h-0 flex flex-col lg:grid lg:grid-cols-12 lg:gap-5 items-stretch overflow-hidden">
        <!-- Cột Thẻ Câu Hỏi Hiện Tại (8/12 cột Desktop, 12/12 Mobile) -->
        <div class="lg:col-span-8 h-full flex flex-col min-h-0 overflow-hidden">
          <ExamQuickQuizCard
            question={currentQ}
            questionIndex={currentQuestionIndex}
            totalQuestions={exam.total_questions}
            selectedAnswer={answers[currentQ.question_no]}
            isFlagged={flagged[currentQ.question_no]}
            {timeRemainingSeconds}
            totalCorrect={scoreResults.totalCorrect}
            totalWrong={totalAnswered - scoreResults.totalCorrect}
            onSelectAnswer={(val) => handleSelectAnswer(currentQ.question_no, val)}
            onToggleFlag={() => handleToggleFlag(currentQ.question_no)}
            onNextQuestion={() => {
              if (currentQuestionIndex < exam.total_questions - 1) {
                currentQuestionIndex += 1;
              }
            }}
            onPrevQuestion={() => {
              if (currentQuestionIndex > 0) {
                currentQuestionIndex -= 1;
              }
            }}
            onOpenPalette={() => (showPaletteModal = true)}
            onSubmitExam={handleSubmitExam}
          />
        </div>

        <!-- Cột Bản Đồ Câu Hỏi Cố Định (4/12 cột trên màn hình lớn) -->
        <div class="lg:col-span-4 hidden lg:block h-full min-h-0 overflow-y-auto">
          <ExamPalette
            totalQuestions={exam.total_questions}
            {answers}
            {flagged}
            {mode}
            isExamSubmitted={isSubmitted}
            correctMap={scoreResults.correctMap}
            currentQuestionNo={currentQ.question_no}
            onScrollTo={handleScrollTo}
          />
        </div>
      </div>
    {/if}
  {:else}
    <!-- CHẾ ĐỘ THI THỬ CHUẨN (EXAM MODE) -->
    <!-- Top Header Điều Khiển Phòng Thi -->
    <ExamHeader
      title={exam.title ?? 'Đề Thi HSK 2'}
      examCode={exam.exam_code ?? examId ?? ''}
      {mode}
      {timeRemainingSeconds}
      answeredCount={totalAnswered}
      totalCount={exam.total_questions}
      onModeChange={(newMode) => (mode = newMode)}
      onExitRequest={() => {
        if (mode === 'exam' && !isSubmitted) {
          showExitModal = true;
        } else {
          goto('/thi-thu');
        }
      }}
    />

    <!-- Trình Phát Audio Cho Đề Thi: Sticky trực tiếp dưới Header -->
    {@const audioSource = exam.audio_ogg || exam.audio_mp3 || exam.audio_url}
    {#if audioSource}
      <ExamAudioPlayer
        audioSrc={audioSource}
        examCode={exam.exam_code ?? examId ?? ''}
        isExamMode={mode === 'exam'}
        listeningQuestions={listeningQuestions}
      />
    {/if}

    <!-- Bố Cục Phòng Thi (Split Layout: Cột Câu Hỏi + Palette 60 ô) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start mt-2">
      <!-- Cột Nội Dung Câu Hỏi (8/12 cột trên màn hình lớn) -->
      <div class="lg:col-span-8 space-y-6">
        <!-- Phần 1: Nghe -->
        {#if listeningQuestions.length > 0}
          <div class="space-y-3">
            <div class="flex items-center gap-2 px-1">
              <span class="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
              <h2 class="text-sm md:text-base font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Phần 1: Nghe Hiểu (听力) — 35 câu
              </h2>
            </div>

            {#each listeningQuestions as q (q.question_no)}
              <ExamQuestionCard
                question={q}
                selectedAnswer={answers[q.question_no]}
                isFlagged={flagged[q.question_no]}
                {mode}
                isCheckedInPractice={checkedPractice[q.question_no]}
                isExamSubmitted={isSubmitted}
                showBoardImage={q.question_no === 11 || q.question_no === 16}
                onSelectAnswer={(val) => handleSelectAnswer(q.question_no, val)}
                onToggleFlag={() => handleToggleFlag(q.question_no)}
                onCheckPractice={() => handleCheckPractice(q.question_no)}
              />
            {/each}
          </div>
        {/if}

        <!-- Phần 2: Đọc -->
        {#if readingQuestions.length > 0}
          <div class="space-y-3 pt-4">
            <div class="flex items-center gap-2 px-1">
              <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <h2 class="text-sm md:text-base font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Phần 2: Đọc Hiểu (阅读) — 25 câu
              </h2>
            </div>

            {#each readingQuestions as q (q.question_no)}
              <ExamQuestionCard
                question={q}
                selectedAnswer={answers[q.question_no]}
                isFlagged={flagged[q.question_no]}
                {mode}
                isCheckedInPractice={checkedPractice[q.question_no]}
                isExamSubmitted={isSubmitted}
                showBoardImage={q.question_no === 36}
                onSelectAnswer={(val) => handleSelectAnswer(q.question_no, val)}
                onToggleFlag={() => handleToggleFlag(q.question_no)}
                onCheckPractice={() => handleCheckPractice(q.question_no)}
              />
            {/each}
          </div>
        {/if}
      </div>

      <!-- Cột Bản Đồ Câu Hỏi Cố Định (4/12 cột trên màn hình lớn) -->
      <div class="lg:col-span-4 hidden lg:block">
        <ExamPalette
          totalQuestions={exam.total_questions}
          {answers}
          {flagged}
          {mode}
          isExamSubmitted={isSubmitted}
          correctMap={scoreResults.correctMap}
          currentQuestionNo={currentQuestionIndex + 1}
          onScrollTo={handleScrollTo}
        />
      </div>
    </div>
  {/if}
</main>

{#if exam && mode === 'exam'}
  <!-- Sticky Bottom Bar CHỈ HIỂN THỊ Ở CHẾ ĐỘ THI THỬ CHUẨN (Exam Mode) -->
  <ExamBottomBar
    {mode}
    {timeRemainingSeconds}
    answeredCount={totalAnswered}
    totalCount={exam.total_questions}
    onSubmit={handleSubmitExam}
    onRetry={handleRetry}
    onTogglePaletteModal={() => (showPaletteModal = true)}
  />
{/if}

<!-- Modal Bảng Câu Hỏi Trên Thiết Bị Di Động (Mobile Palette Drawer) -->
{#if showPaletteModal && exam}
  <div class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
    <div class="bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-neutral-800 rounded-t-3xl sm:rounded-3xl p-5 max-w-md w-full shadow-2xl animate-in slide-in-from-bottom sm:zoom-in-95 duration-150 max-h-[80vh] flex flex-col">
      <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-neutral-800 mb-3">
        <h3 class="text-sm font-black text-slate-900 dark:text-slate-100">
          Bảng 60 Câu Hỏi ({totalAnswered}/{exam.total_questions})
        </h3>
        <button
          type="button"
          onclick={() => (showPaletteModal = false)}
          class="w-8 h-8 rounded-full bg-slate-100 dark:bg-neutral-800 flex items-center justify-center text-slate-600 dark:text-neutral-300 hover:bg-slate-200 cursor-pointer"
          aria-label="Đóng bảng câu hỏi"
        >
          <X weight="bold" class="w-4 h-4" />
        </button>
      </div>

      <div class="flex-1 overflow-y-auto">
        <ExamPalette
          totalQuestions={exam.total_questions}
          {answers}
          {flagged}
          {mode}
          isExamSubmitted={isSubmitted}
          correctMap={scoreResults.correctMap}
          currentQuestionNo={exam.questions[currentQuestionIndex]?.question_no ?? 1}
          onScrollTo={(qNo) => {
            showPaletteModal = false;
            handleScrollTo(qNo);
          }}
        />
      </div>
    </div>
  </div>
{/if}

<!-- Modal Kết quả Chấm Điểm -->
{#if showResultModal && exam}
  <ExamResultModal
    title={exam.title ?? 'Đề Thi HSK 2'}
    examCode={exam.exam_code ?? examId ?? ''}
    totalCorrect={scoreResults.totalCorrect}
    listeningCorrect={scoreResults.listeningCorrect}
    readingCorrect={scoreResults.readingCorrect}
    totalQuestions={exam.total_questions}
    onRetry={handleRetry}
    onClose={() => (showResultModal = false)}
  />
{/if}

<!-- Modal Xác Nhận Rời Phòng Thi (Gọn gàng, ít chữ, chuẩn Anti-slop) -->
{#if showExitModal}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
    <div class="bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-neutral-800 rounded-3xl p-5 sm:p-6 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in-95 duration-150">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center shrink-0">
          <WarningCircle weight="fill" class="w-6 h-6" />
        </div>
        <div>
          <h3 class="text-base font-black text-slate-900 dark:text-slate-100">Rời phòng thi?</h3>
          <p class="text-xs text-slate-500 dark:text-neutral-400">Kết quả bài làm hiện tại sẽ bị hủy.</p>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2 mt-5">
        <button
          type="button"
          onclick={() => (showExitModal = false)}
          class="py-2.5 px-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-black transition-colors cursor-pointer text-center"
        >
          Ở lại làm tiếp
        </button>
        <button
          type="button"
          onclick={() => {
            showExitModal = false;
            goto('/thi-thu');
          }}
          class="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-600 dark:text-neutral-300 text-xs font-bold transition-colors cursor-pointer text-center"
        >
          Rời phòng thi
        </button>
      </div>
    </div>
  </div>
{/if}

<LessonFilterModal />
<SettingsModal />

<script lang="ts">
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  import Header from '#lib/components/Header.svelte';
  import ExamHeader from '#lib/components/exam/ExamHeader.svelte';
  import ExamAudioPlayer from '#lib/components/exam/ExamAudioPlayer.svelte';
  import ExamQuestionCard from '#lib/components/exam/ExamQuestionCard.svelte';
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
  let isScrolled = $state(false);
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

    // Start timer for exam mode: Chỉ trừ giờ làm bài khi đã kết thúc 60s xem trước đề!
    timerInterval = setInterval(() => {
      if (mode === 'exam' && !isSubmitted) {
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
      if (mode === 'exam' && !isSubmitted) {
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
    exam?.questions.filter((q) => q.section.includes('Listening') || q.section.includes('听力')) ?? []
  );

  const readingQuestions = $derived(
    exam?.questions.filter((q) => q.section.includes('Reading') || q.section.includes('阅读')) ?? []
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
    isSubmitted = false;
    showResultModal = false;
  }

  function handleScrollTo(qNo: number) {
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

<main bind:this={mainScrollEl} class="flex-1 flex flex-col min-h-0 my-3 overflow-y-auto pr-1">
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
  {:else}
    <!-- Top Header Điều Khiển Phòng Thi -->
    <ExamHeader
      title={exam.title ?? 'Đề Thi HSK 2'}
      examCode={exam.exam_code ?? examId ?? ''}
      {mode}
      {timeRemainingSeconds}
      answeredCount={totalAnswered}
      totalCount={exam.total_questions}
      onModeChange={(newMode) => (mode = newMode)}
      onSubmit={handleSubmitExam}
      onRetry={handleRetry}
      onExitRequest={() => {
        if (mode === 'exam' && !isSubmitted) {
          showExitModal = true;
        } else {
          goto('/thi-thu');
        }
      }}
    />

    <!-- Trình Phát Audio Cho Đề Thi: Sticky trực tiếp dưới Header -->
    {#if exam.audio_ogg}
      <ExamAudioPlayer
        audioSrc={exam.audio_ogg}
        examCode={exam.exam_code}
        isExamMode={mode === 'exam'}
      />
    {/if}

    <!-- Bố Cục Phòng Thi (Split Layout: Cột Câu Hỏi + Palette 60 ô) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
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
          isExamSubmitted={isSubmitted}
          correctMap={scoreResults.correctMap}
          onScrollTo={handleScrollTo}
        />
      </div>
    </div>
  {/if}
</main>

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

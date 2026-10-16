<script lang="ts">
  import Trophy from 'phosphor-svelte/lib/Trophy';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
  import XCircle from 'phosphor-svelte/lib/XCircle';
  import ArrowsClockwise from 'phosphor-svelte/lib/ArrowsClockwise';
  import ArrowLeft from 'phosphor-svelte/lib/ArrowLeft';
  import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
  import ListNumbers from 'phosphor-svelte/lib/ListNumbers';
  import Clock from 'phosphor-svelte/lib/Clock';
  import Exam from 'phosphor-svelte/lib/Exam';
  import { examHistoryState } from '#lib/state/examHistoryState.svelte';
  import type { ExamMode } from '#lib/types/exam';

  export interface WrongQuestionItem {
    question_no: number;
    userAnswer?: string;
    correctAnswer: string;
    section: string;
    part?: string;
  }

  interface Props {
    title: string;
    examCode: string;
    totalCorrect: number;
    listeningCorrect: number;
    readingCorrect: number;
    totalQuestions: number;
    mode?: ExamMode;
    wrongQuestions?: WrongQuestionItem[];
    nextExam?: { id: string; code: string; title: string } | null;
    onRetry: () => void;
    onClose: () => void;
    onSelectQuestion?: (questionNo: number) => void;
    onNextExam?: () => void;
    onBackToList?: () => void;
  }

  let {
    title,
    examCode,
    totalCorrect,
    listeningCorrect,
    readingCorrect,
    totalQuestions,
    mode = 'exam',
    wrongQuestions = [],
    nextExam = null,
    onRetry,
    onClose,
    onSelectQuestion,
    onNextExam,
    onBackToList
  }: Props = $props();

  let showWrongList = $state(false);

  // Điểm thi HSK 2: Thang 200 điểm (Nghe 100 điểm, Đọc 100 điểm)
  const listeningScore = $derived(Math.round((listeningCorrect / 35) * 100));
  const readingScore = $derived(Math.round((readingCorrect / 25) * 100));
  const totalScore = $derived(listeningScore + readingScore);
  const isPassed = $derived(totalScore >= 120);
</script>

<div class="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
  <div class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-3xl p-5 sm:p-7 max-w-md w-full shadow-2xl text-center animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
    {#if !showWrongList}
      <!-- MÀN HÌNH 1: TỔNG QUAN KẾT QUẢ -->
      <div class="w-14 h-14 mx-auto rounded-3xl {isPassed ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'} flex items-center justify-center mb-3">
        <Trophy weight="duotone" class="w-8 h-8" />
      </div>

      <h2 class="text-xl font-black text-slate-900 dark:text-slate-100">
        {isPassed ? 'Chúc mừng bạn đã ĐỖ!' : 'Cần cố gắng thêm!'}
      </h2>
      <p class="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
        {title} ({examCode})
      </p>

      <!-- Tổng điểm to rõ -->
      <div class="my-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-800/60 border border-slate-100 dark:border-neutral-700/80">
        <div class="text-3xl font-black {isPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'} font-mono">
          {totalScore} <span class="text-sm font-bold text-slate-400">/ 200 điểm</span>
        </div>
        <div class="text-xs font-semibold text-slate-500 dark:text-neutral-400 mt-0.5">
          Điểm chuẩn đỗ: 120 điểm
        </div>
      </div>

      <!-- Chi tiết 2 phần -->
      <div class="grid grid-cols-2 gap-2.5 mb-5 text-left">
        <div class="p-3 rounded-2xl bg-orange-50/70 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/40">
          <div class="text-xs font-bold text-orange-800 dark:text-orange-300">
            Phần Nghe (听力)
          </div>
          <div class="text-lg font-black text-slate-900 dark:text-slate-100 mt-0.5">
            {listeningScore} <span class="text-xs font-normal text-slate-500">/ 100</span>
          </div>
          <div class="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5">
            Đúng {listeningCorrect}/35 câu
          </div>
        </div>

        <div class="p-3 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
          <div class="text-xs font-bold text-blue-800 dark:text-blue-300">
            Phần Đọc (阅读)
          </div>
          <div class="text-lg font-black text-slate-900 dark:text-slate-100 mt-0.5">
            {readingScore} <span class="text-xs font-normal text-slate-500">/ 100</span>
          </div>
          <div class="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5">
            Đúng {readingCorrect}/25 câu
          </div>
        </div>
      </div>

      <!-- Khối các nút hành động chính -->
      <div class="space-y-2.5">
        <!-- Hàng 1: Ở chế độ thi thử chuẩn -> Có nút "Thống kê câu sai" + "Xem lại bài làm" -->
        {#if mode === 'exam'}
          <div class="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onclick={() => (showWrongList = true)}
              class="py-3 px-3 rounded-2xl bg-rose-50 hover:bg-rose-100/80 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-2xs active:scale-95"
            >
              <ListNumbers weight="bold" class="w-4 h-4 shrink-0" />
              <span>Thống kê câu sai ({wrongQuestions.length})</span>
            </button>

            <button
              type="button"
              onclick={onClose}
              class="py-3 px-3 rounded-2xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-700/60 text-slate-700 dark:text-slate-200 font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-2xs active:scale-95"
            >
              <Exam weight="bold" class="w-4 h-4 shrink-0" />
              <span>Xem lại bài làm</span>
            </button>
          </div>
        {:else}
          <!-- Chế độ thi nhanh: Giữ nút xem lại bài làm tinh gọn như cũ -->
          <button
            type="button"
            onclick={onClose}
            class="w-full py-3 rounded-2xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-700/60 text-slate-700 dark:text-slate-200 font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-2xs active:scale-95"
          >
            <Exam weight="bold" class="w-4 h-4 shrink-0" />
            <span>Xem lại bài làm</span>
          </button>
        {/if}

        <!-- Hàng 2: "Làm lại đề" & "Thi tiếp" -->
        <div class="grid {nextExam ? 'grid-cols-2' : 'grid-cols-1'} gap-2.5">
          <button
            type="button"
            onclick={onRetry}
            class="py-3 px-3 rounded-2xl border border-slate-200 dark:border-neutral-700 bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-800 dark:text-slate-200 font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
          >
            <ArrowsClockwise weight="bold" class="w-4 h-4 shrink-0" />
            <span>Làm lại đề</span>
          </button>

          {#if nextExam && onNextExam}
            <button
              type="button"
              onclick={onNextExam}
              class="py-3 px-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all active:scale-95"
            >
              <span>Thi tiếp ({nextExam.code})</span>
              <ArrowRight weight="bold" class="w-4 h-4 shrink-0" />
            </button>
          {/if}
        </div>
      </div>

      <!-- Hàng 3: Danh sách đề thi & Lịch sử làm bài -->
      <div class="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-neutral-800">
        {#if onBackToList}
          <button
            type="button"
            onclick={onBackToList}
            class="text-[11px] font-bold text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-200 hover:underline flex items-center gap-1 cursor-pointer transition-colors"
          >
            <ArrowLeft weight="bold" class="w-3.5 h-3.5" />
            <span>Danh sách đề thi</span>
          </button>
        {/if}

        <button
          type="button"
          onclick={() => {
            onClose();
            examHistoryState.openHistory(examCode);
          }}
          class="text-[11px] font-bold text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-200 hover:underline flex items-center gap-1 ml-auto cursor-pointer transition-colors"
        >
          <Clock weight="bold" class="w-3.5 h-3.5" />
          <span>Lịch sử làm bài</span>
        </button>
      </div>

    {:else}
      <!-- MÀN HÌNH 2: THỐNG KÊ CHI TIẾT CÂU LÀM SAI -->
      <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-neutral-800 shrink-0">
        <button
          type="button"
          onclick={() => (showWrongList = false)}
          class="h-8 px-2.5 rounded-xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1 hover:bg-slate-50 cursor-pointer active:scale-95"
        >
          <ArrowLeft weight="bold" class="w-3.5 h-3.5" />
          <span>Tổng điểm</span>
        </button>

        <span class="text-xs font-black text-slate-900 dark:text-slate-100">
          Câu làm sai ({wrongQuestions.length}/{totalQuestions})
        </span>

        <button
          type="button"
          onclick={onClose}
          class="w-8 h-8 rounded-full bg-slate-100 dark:bg-neutral-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-white cursor-pointer"
          title="Đóng"
        >
          <XCircle weight="bold" class="w-5 h-5" />
        </button>
      </div>

      <div class="flex-1 overflow-y-auto py-3 space-y-2 pr-1 min-h-[180px] max-h-[50vh]">
        {#if wrongQuestions.length === 0}
          <div class="py-8 flex flex-col items-center justify-center text-center">
            <div class="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
              <CheckCircle weight="fill" class="w-7 h-7" />
            </div>
            <p class="text-sm font-black text-slate-900 dark:text-slate-100">
              Xuất sắc! Không có câu sai
            </p>
            <p class="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
              Bạn đã làm đúng toàn bộ {totalQuestions} câu hỏi.
            </p>
          </div>
        {:else}
          <p class="text-[11px] text-slate-400 dark:text-neutral-500 text-left font-medium mb-1">
            Bấm vào câu để xem giải thích chi tiết:
          </p>
          {#each wrongQuestions as q (q.question_no)}
            <button
              type="button"
              onclick={() => {
                if (onSelectQuestion) {
                  onSelectQuestion(q.question_no);
                }
                onClose();
              }}
              class="w-full p-2.5 rounded-2xl bg-slate-50 dark:bg-neutral-800/70 hover:bg-orange-50 dark:hover:bg-orange-950/30 border border-slate-200/80 dark:border-neutral-700/80 flex items-center justify-between text-left transition-colors cursor-pointer group"
            >
              <div class="flex items-center gap-2.5">
                <span class="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 text-xs font-black flex items-center justify-center shrink-0">
                  {q.question_no}
                </span>
                <div>
                  <div class="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-neutral-200">
                    <span>Câu {q.question_no}</span>
                    <span class="text-[10px] px-1.5 py-0.2 rounded-md font-semibold {q.section.includes('Listening') || q.section.includes('听力') ? 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'}">
                      {q.section.includes('Listening') || q.section.includes('听力') ? 'Nghe' : 'Đọc'}
                    </span>
                  </div>
                  <div class="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5 flex items-center gap-2">
                    <span>Đã chọn: <strong class="text-rose-600 dark:text-rose-400">{q.userAnswer || 'Chưa làm'}</strong></span>
                    <span>•</span>
                    <span>Đáp án: <strong class="text-emerald-600 dark:text-emerald-400">{q.correctAnswer}</strong></span>
                  </div>
                </div>
              </div>
              <div class="text-slate-400 group-hover:text-orange-600 transition-colors">
                <ArrowRight weight="bold" class="w-4 h-4" />
              </div>
            </button>
          {/each}
        {/if}
      </div>

      <!-- Footer màn hình câu sai -->
      <div class="pt-3 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between gap-2 shrink-0">
        <button
          type="button"
          onclick={() => (showWrongList = false)}
          class="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-50 cursor-pointer"
        >
          Quay lại tổng điểm
        </button>
        <button
          type="button"
          onclick={onClose}
          class="flex-1 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs cursor-pointer shadow-xs"
        >
          Xem lại bài làm
        </button>
      </div>
    {/if}
  </div>
</div>

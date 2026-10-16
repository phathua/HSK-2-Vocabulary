<script lang="ts">
  import { onMount } from 'svelte';
  import X from 'phosphor-svelte/lib/X';
  import ArrowLeft from 'phosphor-svelte/lib/ArrowLeft';
  import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
  import Check from 'phosphor-svelte/lib/Check';
  import type { QuestionItem, ExamMode } from '#lib/types/exam';
  import { getExamImageUrl } from '#lib/utils/examAssets';
  import { parseOptionItem } from '#lib/utils/examOptionParser';
  import { getGroupExampleAnswer } from '#lib/data/examExamples';
  import InteractiveChineseText from './InteractiveChineseText.svelte';
  import InteractivePinyinText from './InteractivePinyinText.svelte';

  interface Props {
    open: boolean;
    question: QuestionItem;
    allQuestions: QuestionItem[];
    selectedAnswer?: string;
    answers?: Record<number, string>;
    correctAnswers?: Record<number, string>;
    isExamSubmitted?: boolean;
    mode: ExamMode;
    onSelectAnswer: (val: string) => void;
    onNavigateQuestion: (targetQuestionNo: number) => void;
    onClose: () => void;
  }

  let {
    open,
    question,
    allQuestions = [],
    selectedAnswer = '',
    answers = {},
    correctAnswers = {},
    isExamSubmitted = false,
    mode,
    onSelectAnswer,
    onNavigateQuestion,
    onClose
  }: Props = $props();

  function getMatchingGroup(qNo: number): [number, number] | null {
    if (qNo >= 11 && qNo <= 15) return [11, 15];
    if (qNo >= 16 && qNo <= 20) return [16, 20];
    if (qNo >= 36 && qNo <= 40) return [36, 40];
    if (qNo >= 41 && qNo <= 45) return [41, 45];
    if (qNo >= 51 && qNo <= 55) return [51, 55];
    if (qNo >= 56 && qNo <= 60) return [56, 60];
    return null;
  }

  function isOptionUsedInGroup(optVal: string): boolean {
    if (!answers) return false;
    const group = getMatchingGroup(question.question_no);
    if (!group) return false;
    const [start, end] = group;
    for (let q = start; q <= end; q++) {
      if (q === question.question_no) continue;
      if (answers[q]) {
        if (isExamSubmitted) {
          const correctAns = correctAnswers?.[q];
          if (correctAns && correctAns === optVal) {
            return true;
          }
        } else {
          if (answers[q] === optVal) {
            return true;
          }
        }
      }
    }
    return false;
  }

  const exampleAnswerForThisGroup = $derived(getGroupExampleAnswer(question.exam_code, question.question_no));

  interface ChoiceOption {
    label: string;
    value: string;
    hanzi?: string;
    pinyin?: string;
    icon?: 'check' | 'x';
    image?: string | null;
  }

  const optionChoices = $derived.by((): ChoiceOption[] => {
    if (question.type.includes('True/False') || (question.section?.includes('Reading') && question.part?.includes('Part 3'))) {
      return [
        { label: 'Đúng', value: '√', icon: 'check' },
        { label: 'Sai', value: '×', icon: 'x' }
      ];
    }

    if (
      (question.question_no >= 11 && question.question_no <= 20) ||
      (question.question_no >= 36 && question.question_no <= 40) ||
      (question.part?.includes('Part 2') && question.section?.includes('Listening')) ||
      (question.part?.includes('Part 1') && question.section?.includes('Reading'))
    ) {
      return [
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
        { label: 'C', value: 'C' },
        { label: 'D', value: 'D' },
        { label: 'E', value: 'E' },
        { label: 'F', value: 'F' }
      ];
    }

    if (question.options && question.options.length > 0) {
      return question.options.map((opt) => {
        const parsed = parseOptionItem(opt.text || opt.label || '');
        return {
          label: opt.label,
          value: opt.label,
          hanzi: parsed.hanzi || opt.text,
          pinyin: parsed.pinyin,
          image: opt.image
        };
      });
    }

    if (question.type.includes('Match') || question.part.includes('Part 2')) {
      return [
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
        { label: 'C', value: 'C' },
        { label: 'D', value: 'D' },
        { label: 'E', value: 'E' },
        { label: 'F', value: 'F' }
      ];
    }

    return [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' }
    ];
  });

  const parsedQuestionDisplay = $derived.by(() => {
    const raw = question.text || '';
    if (!raw || raw.startsWith('Câu hỏi nghe số')) return null;

    if (raw.includes('★')) {
      const parts = raw.split('★');
      const contextRaw = parts[0].trim();
      const statementRaw = (parts[1] || '').trim();

      const parseChunk = (str: string) => {
        const m = str.match(/^(.*?)\s*[\(（]([a-zA-Zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ\s,\.\?!’'\-—]+)[\)）]?$/);
        if (m) {
          return { hanzi: m[1].trim(), pinyin: m[2].trim() };
        }
        return { hanzi: str, pinyin: '' };
      };

      const ctx = parseChunk(contextRaw);
      const stmt = parseChunk(statementRaw);

      let contextPinyin = ctx.pinyin;
      let statementPinyin = stmt.pinyin;

      if (question.pinyin) {
        if (question.pinyin.includes('★')) {
          const pyParts = question.pinyin.split('★');
          contextPinyin = pyParts[0].trim();
          statementPinyin = (pyParts[1] || '').trim();
        } else if (!contextPinyin) {
          contextPinyin = question.pinyin;
        }
      }
      if (question.statement_pinyin) {
        statementPinyin = question.statement_pinyin;
      }

      return {
        isTrueFalseStatement: true,
        hanzi: '',
        pinyin: '',
        contextHanzi: ctx.hanzi,
        contextPinyin,
        statementHanzi: stmt.hanzi,
        statementPinyin
      };
    }

    const m = raw.match(/^(.*?)\s*[\(（]([a-zA-Zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ\s,\.\?!’'\-—]+)[\)）]?$/);
    if (m) {
      return {
        isTrueFalseStatement: false,
        hanzi: m[1].trim(),
        pinyin: question.pinyin || m[2].trim()
      };
    }

    return {
      isTrueFalseStatement: false,
      hanzi: raw,
      pinyin: question.pinyin || ''
    };
  });

  // Xác định nhóm câu hỏi điều hướng Prev/Next
  const navigationGroup = $derived.by(() => {
    if (!allQuestions || allQuestions.length === 0) return [question];
    if (question.board_image) {
      const group = allQuestions.filter((q) => q.board_image === question.board_image);
      return group.length > 0 ? group : [question];
    }
    if (question.image) {
      const group = allQuestions.filter(
        (q) => !q.board_image && !!q.image && q.section === question.section && q.part === question.part
      );
      return group.length > 0 ? group : [question];
    }
    return [question];
  });

  const currentIndexInGroup = $derived(
    navigationGroup.findIndex((q) => q.question_no === question.question_no)
  );

  const hasPrev = $derived(currentIndexInGroup > 0);
  const hasNext = $derived(currentIndexInGroup >= 0 && currentIndexInGroup < navigationGroup.length - 1);

  const prevQuestion = $derived(hasPrev ? navigationGroup[currentIndexInGroup - 1] : null);
  const nextQuestion = $derived(hasNext ? navigationGroup[currentIndexInGroup + 1] : null);

  const activeZoomSrc = $derived(getExamImageUrl(question.exam_code, question.board_image || question.image));

  onMount(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrev && prevQuestion) {
        onNavigateQuestion(prevQuestion.question_no);
      } else if (e.key === 'ArrowRight' && hasNext && nextQuestion) {
        onNavigateQuestion(nextQuestion.question_no);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>

{#if open && (question.board_image || question.image)}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-150">
    <!-- Backdrop -->
    <button
      type="button"
      class="fixed inset-0 bg-black/85 backdrop-blur-xs cursor-default w-full h-full border-none"
      onclick={onClose}
      aria-label="Đóng phóng to ảnh"
    ></button>

    <!-- Modal Container -->
    <div
      class="relative z-10 max-w-4xl w-full max-h-[96vh] bg-white dark:bg-[#1E1E1E] rounded-3xl p-3 sm:p-4 overflow-hidden shadow-2xl flex flex-col items-center justify-between border border-slate-200 dark:border-[#333]"
    >
      <!-- Modal Header -->
      <div class="w-full flex items-center justify-between pb-2 mb-1 border-b border-slate-100 dark:border-[#282A2C] shrink-0">
        <div class="flex items-center gap-2">
          <span class="text-xs sm:text-sm font-black text-slate-800 dark:text-neutral-200">
            {question.board_image ? 'Bảng tranh đối chiếu (A – F)' : `Ảnh câu ${question.question_no}`}
          </span>
          {#if navigationGroup.length > 1}
            <span class="px-2 py-0.5 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 text-[10px] font-bold">
              Câu {question.question_no} ({currentIndexInGroup + 1}/{navigationGroup.length})
            </span>
          {/if}
        </div>
        <button
          type="button"
          onclick={onClose}
          class="p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-[#282A2C] text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer"
          title="Đóng (ESC)"
        >
          <X weight="bold" class="w-5 h-5" />
        </button>
      </div>

      <!-- Question Text in Zoom Modal if available (Hanzi + Pinyin) -->
      {#if parsedQuestionDisplay}
        <div class="w-full py-2 px-3 bg-slate-50/90 dark:bg-[#202224]/90 rounded-2xl border border-slate-200/70 dark:border-neutral-800 text-center shrink-0 mb-1 max-w-2xl select-text">
          {#if parsedQuestionDisplay.isTrueFalseStatement}
            <div class="space-y-1.5 text-left">
              <div>
                {#if parsedQuestionDisplay.contextPinyin}
                  <div class="text-[11px] text-slate-500 dark:text-neutral-400 font-sans tracking-wide">
                    <InteractivePinyinText pinyin={parsedQuestionDisplay.contextPinyin} />
                  </div>
                {/if}
                <div class="text-sm sm:text-base font-bold text-slate-900 dark:text-[#E3E3E3] font-serif leading-snug">
                  <InteractiveChineseText text={parsedQuestionDisplay.contextHanzi} />
                </div>
              </div>
              <div class="pt-1.5 border-t border-slate-200/60 dark:border-neutral-700/60 flex items-start gap-1.5">
                <span class="px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 text-[10px] font-black shrink-0 mt-0.5">
                  Nhận định
                </span>
                <div class="flex-1">
                  {#if parsedQuestionDisplay.statementPinyin}
                    <div class="text-[11px] text-slate-500 dark:text-neutral-400 font-sans tracking-wide">
                      <InteractivePinyinText pinyin={parsedQuestionDisplay.statementPinyin} />
                    </div>
                  {/if}
                  <div class="text-sm sm:text-base font-bold text-slate-900 dark:text-[#E3E3E3] font-serif leading-snug">
                    <InteractiveChineseText text={parsedQuestionDisplay.statementHanzi} />
                  </div>
                </div>
              </div>
            </div>
          {:else}
            <div class="space-y-0.5">
              {#if parsedQuestionDisplay.pinyin}
                <div class="text-xs text-slate-500 dark:text-neutral-400 font-sans tracking-wide">
                  <InteractivePinyinText pinyin={parsedQuestionDisplay.pinyin} />
                </div>
              {/if}
              <div class="text-base sm:text-lg font-bold text-slate-900 dark:text-[#E3E3E3] font-serif leading-snug">
                <InteractiveChineseText text={parsedQuestionDisplay.hanzi} />
              </div>
            </div>
          {/if}
        </div>
      {/if}

      <!-- Zoom Image Container -->
      <div class="flex-1 w-full flex items-center justify-center overflow-auto min-h-0 py-1">
        <img
          src={activeZoomSrc}
          alt={`Chi tiết tranh câu ${question.question_no}`}
          class="max-w-full max-h-[50vh] sm:max-h-[58vh] object-contain rounded-xl select-none shadow-xs"
        />
      </div>

      <!-- Quick Answer Bar & Navigation Controls -->
      {#if !isExamSubmitted && optionChoices.length > 0}
        <div class="w-full pt-2 mt-1 border-t border-slate-100 dark:border-[#282A2C] shrink-0 flex flex-col items-center gap-2">
          <!-- Nhãn câu đang chọn -->
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-400">
            Chọn nhanh đáp án Câu {question.question_no}:
          </span>

          <!-- Các nút lựa chọn đáp án (A-F hoặc Đúng/Sai) -->
          <div class="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 w-full">
            {#each optionChoices as opt}
              {@const isSelected = selectedAnswer === opt.value}
              {@const isUsedElsewhere = !isSelected && isOptionUsedInGroup(opt.value)}
              <button
                type="button"
                onclick={() => onSelectAnswer(opt.value)}
                class="px-3.5 sm:px-5 py-2 rounded-xl font-black text-xs sm:text-sm border active:scale-95 transition-all cursor-pointer shadow-xs flex items-center gap-1.5 {
                  isSelected
                    ? 'bg-orange-600 text-white border-orange-600 ring-2 ring-orange-500/30'
                    : isUsedElsewhere
                    ? 'opacity-35 border-dashed bg-slate-100 dark:bg-[#282A2C] text-slate-400 dark:text-neutral-500'
                    : 'bg-slate-100 dark:bg-[#282A2C] hover:bg-orange-500 hover:text-white text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#37393B]'
                }"
              >
                {#if opt.value === '√' || opt.icon === 'check'}
                  <Check weight="bold" class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Đúng</span>
                {:else if opt.value === '×' || opt.icon === 'x'}
                  <X weight="bold" class="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  <span>Sai</span>
                {:else}
                  <span>{opt.value}</span>
                {/if}
              </button>
            {/each}
          </div>

          <!-- Thanh Điều Hướng: "Câu trước" & "Câu tiếp theo" -->
          <div class="w-full flex items-center justify-between gap-3 pt-1 border-t border-slate-100/80 dark:border-[#282A2C]/80">
            <button
              type="button"
              onclick={() => prevQuestion && onNavigateQuestion(prevQuestion.question_no)}
              disabled={!hasPrev}
              class="h-9 px-3 rounded-xl border border-slate-200 dark:border-[#282A2C] bg-white dark:bg-[#1B1B1B] text-slate-700 dark:text-slate-300 font-bold text-xs disabled:opacity-35 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-[#282A2C] transition-all flex items-center gap-1 cursor-pointer active:scale-95 shadow-2xs"
            >
              <ArrowLeft weight="bold" class="w-3.5 h-3.5" />
              <span>Câu trước</span>
            </button>

            <span class="text-[11px] font-bold text-slate-400 dark:text-neutral-500">
              Câu {question.question_no} / {allQuestions.length}
            </span>

            <button
              type="button"
              onclick={() => nextQuestion && onNavigateQuestion(nextQuestion.question_no)}
              disabled={!hasNext}
              class="h-9 px-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs disabled:opacity-35 disabled:cursor-not-allowed transition-all flex items-center gap-1 cursor-pointer active:scale-95 shadow-2xs"
            >
              <span>Câu tiếp theo</span>
              <ArrowRight weight="bold" class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      {:else}
        <!-- Modal Footer khi đã nộp bài hoặc không có options -->
        <div class="w-full pt-2 mt-1 border-t border-slate-100 dark:border-[#282A2C] flex items-center justify-between shrink-0">
          <button
            type="button"
            onclick={() => prevQuestion && onNavigateQuestion(prevQuestion.question_no)}
            disabled={!hasPrev}
            class="h-9 px-3 rounded-xl border border-slate-200 dark:border-[#282A2C] bg-white dark:bg-[#1B1B1B] text-slate-700 dark:text-slate-300 font-bold text-xs disabled:opacity-35 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-[#282A2C] transition-all flex items-center gap-1 cursor-pointer active:scale-95 shadow-2xs"
          >
            <ArrowLeft weight="bold" class="w-3.5 h-3.5" />
            <span>Câu trước</span>
          </button>

          <button
            type="button"
            onclick={onClose}
            class="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-bold text-xs cursor-pointer shadow-xs transition-transform"
          >
            Đóng
          </button>

          <button
            type="button"
            onclick={() => nextQuestion && onNavigateQuestion(nextQuestion.question_no)}
            disabled={!hasNext}
            class="h-9 px-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs disabled:opacity-35 disabled:cursor-not-allowed transition-all flex items-center gap-1 cursor-pointer active:scale-95 shadow-2xs"
          >
            <span>Câu tiếp theo</span>
            <ArrowRight weight="bold" class="w-3.5 h-3.5" />
          </button>
        </div>
      {/if}
    </div>
  </div>
{/if}

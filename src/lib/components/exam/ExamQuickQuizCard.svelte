<script lang="ts">
  import Check from 'phosphor-svelte/lib/Check';
  import X from 'phosphor-svelte/lib/X';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
  import XCircle from 'phosphor-svelte/lib/XCircle';
  import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
  import ArrowLeft from 'phosphor-svelte/lib/ArrowLeft';
  import BookmarkSimple from 'phosphor-svelte/lib/BookmarkSimple';
  import MagnifyingGlassPlus from 'phosphor-svelte/lib/MagnifyingGlassPlus';
  import Trophy from 'phosphor-svelte/lib/Trophy';
  import Lightbulb from 'phosphor-svelte/lib/Lightbulb';
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
  import SmartImage from '../SmartImage.svelte';
  import type { QuestionItem } from '#lib/types/exam';
  import { getExamImageUrl } from '#lib/utils/examAssets';

  interface Props {
    question: QuestionItem;
    questionIndex: number;
    totalQuestions: number;
    selectedAnswer?: string;
    isFlagged?: boolean;
    onSelectAnswer: (val: string) => void;
    onToggleFlag: () => void;
    onNextQuestion: () => void;
    onPrevQuestion: () => void;
    onSubmitExam: () => void;
  }

  let {
    question,
    questionIndex,
    totalQuestions,
    selectedAnswer = '',
    isFlagged = false,
    onSelectAnswer,
    onToggleFlag,
    onNextQuestion,
    onPrevQuestion,
    onSubmitExam
  }: Props = $props();

  let isImageZoomed = $state(false);

  // Suy đoán các lựa chọn trả lời tùy theo phần thi
  interface ChoiceOption {
    label: string;
    value: string;
    icon?: 'check' | 'x';
    image?: string | null;
  }

  const optionChoices = $derived.by((): ChoiceOption[] => {
    // 1. True/False: Luôn ưu tiên hiển thị nút Đúng (Check) và Sai (X) với value √ và ×
    if (question.type.includes('True/False')) {
      return [
        { label: 'Đúng', value: '√', icon: 'check' },
        { label: 'Sai', value: '×', icon: 'x' }
      ];
    }

    // 2. Nếu câu hỏi có cấu hình options riêng
    if (question.options && question.options.length > 0) {
      return question.options.map((opt) => {
        if (typeof opt === 'string') {
          return { label: opt, value: opt };
        }
        return {
          label: opt.label,
          value: opt.value,
          image: opt.image
        };
      });
    }

    // 3. Tranh A - F (Match / Part 2)
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

    // 4. Mặc định A, B, C cho Part 3 & 4
    return [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' }
    ];
  });

  const isTrueFalse = $derived(question.type.includes('True/False'));
  const isAnswered = $derived(!!selectedAnswer);
  const isCorrect = $derived(isAnswered && selectedAnswer === question.answer);
  const isLastQuestion = $derived(questionIndex >= totalQuestions - 1);
  const progressPercent = $derived(Math.round(((questionIndex + 1) / totalQuestions) * 100));

  function handleKeydown(e: KeyboardEvent) {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    if (e.key === 'ArrowRight') {
      if (isLastQuestion) onSubmitExam();
      else onNextQuestion();
    } else if (e.key === 'ArrowLeft' && questionIndex > 0) {
      onPrevQuestion();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="w-full bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-3xl p-4 sm:p-6 shadow-sm flex flex-col relative transition-all duration-200">
  <!-- Top Bar: Tiến độ + Số câu + Phần thi + Nút Ghim -->
  <div class="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-neutral-800">
    <div class="flex items-center gap-2 flex-wrap min-w-0">
      <!-- Badge Số câu -->
      <span class="px-2.5 py-1 rounded-xl bg-orange-600 text-white font-mono font-black text-xs sm:text-sm shadow-2xs">
        Câu {question.question_no} / {totalQuestions}
      </span>

      <!-- Badge Phần thi -->
      <span class="px-2 py-0.5 rounded-lg text-[11px] font-bold bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300">
        {question.part} • {question.section.includes('Listening') || question.section.includes('听力') ? 'Nghe Hiểu (听力)' : 'Đọc Hiểu (阅读)'}
      </span>
    </div>

    <div class="flex items-center gap-2 shrink-0">
      <!-- Nút Ghim/Cắm cờ câu hỏi -->
      <button
        type="button"
        onclick={onToggleFlag}
        class="h-8 px-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold active:scale-95 {
          isFlagged
            ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300 shadow-2xs'
            : 'bg-slate-50 dark:bg-neutral-800/80 border-slate-200 dark:border-neutral-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-neutral-700'
        }"
        title="Ghim câu này để xem lại"
      >
        <BookmarkSimple weight={isFlagged ? 'fill' : 'bold'} class="w-4 h-4 {isFlagged ? 'text-amber-600' : 'text-slate-400'}" />
        <span class="hidden sm:inline">{isFlagged ? 'Đã ghim' : 'Ghim'}</span>
      </button>
    </div>
  </div>

  <!-- Progress Bar mini đỉnh thẻ -->
  <div class="w-full bg-slate-100 dark:bg-neutral-800 h-1 rounded-full overflow-hidden my-3">
    <div class="h-full bg-orange-500 transition-all duration-300" style="width: {progressPercent}%"></div>
  </div>

  <!-- Thân Card: 2 cột trên Desktop (lg:grid lg:grid-cols-12), 1 cột trên Mobile -->
  <div class="w-full flex-1 flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 items-start my-auto py-2">
    <!-- CỘT 1 (Desktop col-span-5): Đề bài, Hình ảnh câu hỏi, Bảng tranh tham chiếu -->
    <div class="w-full lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left py-2 lg:border-r lg:border-slate-100 dark:lg:border-[#282A2C] lg:pr-6">
      <!-- Hình ảnh câu hỏi nếu có -->
      {#if question.image}
        <div class="relative w-full max-w-sm mx-auto mb-3">
          <div class="w-full h-44 sm:h-56 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 overflow-hidden shadow-xs flex items-center justify-center group">
            <SmartImage
              src={getExamImageUrl(question.exam_code, question.image)}
              alt={`Hình câu ${question.question_no}`}
              class="w-full h-full object-contain p-2 group-hover:scale-102 transition-transform duration-200"
            />
            <button
              type="button"
              onclick={() => (isImageZoomed = true)}
              class="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-colors cursor-pointer"
              title="Phóng to ảnh"
            >
              <MagnifyingGlassPlus weight="bold" class="w-4 h-4" />
            </button>
          </div>
        </div>
      {/if}

      <!-- Bảng tranh tham chiếu nếu có (Part 2/3 tranh A-F) -->
      {#if question.board_image}
        <div class="w-full max-w-sm mx-auto mb-3 p-2 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
          <div class="text-[11px] font-bold text-slate-500 dark:text-neutral-400 mb-1 flex items-center gap-1">
            <span>🖼️ Bảng tranh đối chiếu A - F:</span>
          </div>
          <div class="w-full h-36 sm:h-44 rounded-xl overflow-hidden bg-white dark:bg-black flex items-center justify-center">
            <SmartImage
              src={getExamImageUrl(question.exam_code, question.board_image)}
              alt="Bảng tranh tham chiếu"
              class="w-full h-full object-contain"
            />
          </div>
        </div>
      {/if}

      <!-- Tiêu đề câu hỏi / Đề bài Hán tự nếu có -->
      {#if question.text && !question.text.startsWith('Câu hỏi nghe số')}
        <div class="w-full text-base sm:text-lg lg:text-xl font-bold font-serif text-slate-900 dark:text-slate-100 mb-2 leading-relaxed">
          {question.text}
        </div>
      {/if}

      {#if !question.image && !question.text}
        <div class="w-full py-4 text-sm text-slate-500 italic">
          Hãy lắng nghe lời thoại audio và chọn đáp án chính xác bên dưới:
        </div>
      {/if}
    </div>

    <!-- CỘT 2 (Desktop col-span-7): Các đáp án trắc nghiệm + Phản hồi Tức thì + Lời thoại + Điều hướng -->
    <div class="w-full lg:col-span-7 flex flex-col justify-center py-2 lg:pl-2 space-y-3">
      <!-- 1. Danh sách Options -->
      {#if isTrueFalse}
        <!-- Nút Đúng / Sai to, rõ ràng -->
        <div class="w-full grid grid-cols-2 gap-3 sm:gap-4">
          {#each optionChoices as opt (opt.value)}
            {@const isSelected = selectedAnswer === opt.value}
            {@const isCorrectTarget = opt.value === question.answer}

            <button
              type="button"
              onclick={() => onSelectAnswer(opt.value)}
              class="h-14 sm:h-16 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all cursor-pointer border-2 select-none {
                !isAnswered
                  ? 'bg-white dark:bg-[#1B1B1B] hover:bg-slate-50 dark:hover:bg-[#282A2C] border-slate-200 dark:border-[#282A2C] active:scale-98 shadow-2xs text-slate-800 dark:text-slate-200'
                  : isCorrectTarget
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 shadow-xs ring-2 ring-emerald-500/30'
                  : isSelected
                  ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-100 shadow-xs ring-2 ring-rose-500/30'
                  : 'bg-slate-50 dark:bg-[#282A2C]/40 border-slate-200 dark:border-[#282A2C] opacity-50 text-slate-600 dark:text-slate-400'
              }"
            >
              {#if isAnswered && isCorrectTarget}
                <CheckCircle weight="fill" class="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
              {:else if isAnswered && isSelected && !isCorrectTarget}
                <XCircle weight="fill" class="w-6 h-6 text-rose-600 dark:text-rose-400 shrink-0" />
              {:else if opt.icon === 'check'}
                <Check weight="bold" class="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              {:else}
                <X weight="bold" class="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
              {/if}

              <span>{opt.label}</span>
              <span class="text-xs font-mono opacity-60">({opt.value})</span>
            </button>
          {/each}
        </div>
      {:else}
        <!-- Grid Trắc nghiệm A, B, C, D... hoặc tranh A - F -->
        <div class="w-full grid {optionChoices.length > 4 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'} gap-2.5">
          {#each optionChoices as opt (opt.value)}
            {@const isSelected = selectedAnswer === opt.value}
            {@const isCorrectTarget = opt.value === question.answer}

            <button
              type="button"
              onclick={() => onSelectAnswer(opt.value)}
              class="min-h-[58px] p-3 rounded-2xl font-bold text-left flex items-center gap-3 transition-all cursor-pointer border-2 select-none {
                !isAnswered
                  ? 'bg-white dark:bg-[#1B1B1B] hover:bg-slate-50 dark:hover:bg-[#282A2C] border-slate-200 dark:border-[#282A2C] active:scale-98 shadow-2xs text-slate-800 dark:text-slate-200'
                  : isCorrectTarget
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 shadow-xs ring-2 ring-emerald-500/30'
                  : isSelected
                  ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-100 shadow-xs ring-2 ring-rose-500/30'
                  : 'bg-slate-50 dark:bg-[#282A2C]/40 border-slate-200 dark:border-[#282A2C] opacity-50 text-slate-600 dark:text-slate-400'
              }"
            >
              <div
                class="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 font-mono font-black text-xs border transition-colors {
                  !isAnswered
                    ? 'border-slate-300 dark:border-neutral-700 bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-slate-200'
                    : isCorrectTarget
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : isSelected
                    ? 'bg-rose-600 border-rose-600 text-white'
                    : 'border-slate-200 dark:border-neutral-800 bg-slate-100 dark:bg-neutral-800 text-slate-400'
                }"
              >
                {opt.value}
              </div>

              <div class="flex-1 min-w-0 flex items-center justify-between gap-1">
                <span class="text-xs sm:text-sm font-semibold truncate">
                  {opt.label !== opt.value ? opt.label : `Đáp án ${opt.value}`}
                </span>

                {#if isAnswered && isCorrectTarget}
                  <CheckCircle weight="fill" class="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                {:else if isAnswered && isSelected && !isCorrectTarget}
                  <XCircle weight="fill" class="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                {/if}
              </div>
            </button>
          {/each}
        </div>
      {/if}

      <!-- 2. Hộp Phản hồi Tức thì & Lời thoại & Giải thích (Hiển thị ngay khi người dùng chọn đáp án) -->
      {#if isAnswered}
        <div class="w-full mt-3 p-3.5 sm:p-4 rounded-2xl border transition-all animate-in fade-in slide-in-from-top-2 duration-200 {
          isCorrect
            ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60 text-emerald-950 dark:text-emerald-100'
            : 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60 text-rose-950 dark:text-rose-100'
        }">
          <!-- Header Thông báo Đúng/Sai -->
          <div class="flex items-center gap-2 mb-2 font-bold text-xs sm:text-sm">
            {#if isCorrect}
              <CheckCircle weight="fill" class="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Chính xác! 🎉 Đáp án là <strong class="font-mono text-emerald-700 dark:text-emerald-300">{question.answer}</strong></span>
            {:else}
              <XCircle weight="fill" class="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
              <span>Chưa chính xác! Đáp án đúng là <strong class="font-mono text-emerald-600 dark:text-emerald-400">{question.answer}</strong></span>
            {/if}
          </div>

          <!-- Lời thoại tiếng Trung nếu có -->
          {#if question.listening_script}
            <div class="pt-2 border-t border-slate-200/60 dark:border-neutral-800/80 space-y-1">
              <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Lời thoại bài nghe:</div>
              <div class="text-xs sm:text-sm font-semibold font-serif text-slate-900 dark:text-slate-100">
                {question.listening_script}
              </div>
              {#if question.listening_pinyin}
                <div class="text-[11px] sm:text-xs font-mono text-amber-600 dark:text-amber-400/90">
                  {question.listening_pinyin}
                </div>
              {/if}
            </div>
          {/if}

          <!-- Giải thích tiếng Việt nếu có -->
          {#if question.explanation}
            <div class="pt-2 border-t border-slate-200/60 dark:border-neutral-800/80 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-neutral-200">
              <span class="font-bold text-amber-600 dark:text-amber-400">💡 Giải nghĩa:</span>
              {question.explanation}
            </div>
          {/if}
        </div>
      {/if}

      <!-- 3. Thanh Điều Hướng: Nút "Câu trước" và "Câu tiếp theo" -->
      <div class="w-full flex items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-neutral-800">
        <!-- Nút Câu trước -->
        <button
          type="button"
          onclick={onPrevQuestion}
          disabled={questionIndex <= 0}
          class="h-10 sm:h-11 px-3 sm:px-4 rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 hover:bg-slate-100 dark:hover:bg-neutral-700 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs"
        >
          <ArrowLeft weight="bold" class="w-4 h-4" />
          <span>Câu trước</span>
        </button>

        <!-- Nút Câu tiếp theo / Hoàn thành -->
        {#if isLastQuestion}
          <button
            type="button"
            onclick={onSubmitExam}
            class="h-10 sm:h-11 px-5 sm:px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <Trophy weight="bold" class="w-4 h-4" />
            <span>Xem kết quả bài thi</span>
          </button>
        {:else}
          <button
            type="button"
            onclick={onNextQuestion}
            class="h-10 sm:h-11 px-5 sm:px-6 rounded-xl bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <span>Câu tiếp theo</span>
            <ArrowRight weight="bold" class="w-4 h-4" />
          </button>
        {/if}
      </div>
    </div>
  </div>
</div>

<!-- Modal Phóng to ảnh -->
{#if isImageZoomed && question.image}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <button
      type="button"
      class="fixed inset-0 bg-black/80 backdrop-blur-xs cursor-default w-full h-full border-none"
      onclick={() => (isImageZoomed = false)}
      aria-label="Đóng phóng to ảnh"
    ></button>
    <div
      class="relative z-10 max-w-3xl w-full max-h-[85vh] bg-white dark:bg-neutral-900 rounded-3xl p-4 overflow-hidden shadow-2xl flex flex-col items-center justify-center"
    >
      <SmartImage
        src={getExamImageUrl(question.exam_code, question.image)}
        alt={`Ảnh phóng to câu ${question.question_no}`}
        class="max-w-full max-h-[75vh] object-contain rounded-2xl"
      />
      <button
        type="button"
        onclick={() => (isImageZoomed = false)}
        class="mt-3 px-5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs cursor-pointer shadow-xs"
      >
        Đóng
      </button>
    </div>
  </div>
{/if}

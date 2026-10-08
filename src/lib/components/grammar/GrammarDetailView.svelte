<script lang="ts">
  import type { GrammarPoint } from '#lib/data/hsk2Grammar';
  import SyntaxFormula from './SyntaxFormula.svelte';
  import ExampleSentence from './ExampleSentence.svelte';
  import MistakeComparison from './MistakeComparison.svelte';
  import GrammarQuizModal from './GrammarQuizModal.svelte';

  // Phosphor Icons
  import BookmarkSimple from 'phosphor-svelte/lib/BookmarkSimple';
  import Lightbulb from 'phosphor-svelte/lib/Lightbulb';
  import Question from 'phosphor-svelte/lib/Question';
  import Check from 'phosphor-svelte/lib/Check';
  import TreeEvergreen from 'phosphor-svelte/lib/TreeEvergreen';
  import Sparkle from 'phosphor-svelte/lib/Sparkle';
  import Star from 'phosphor-svelte/lib/Star';

  let {
    point,
    isLearned = false,
    pinyinMode = 'always',
    onToggleLearned
  } = $props<{
    point: GrammarPoint;
    isLearned?: boolean;
    pinyinMode?: 'always' | 'hover' | 'hidden';
    onToggleLearned?: (id: number) => void;
  }>();

  let quizModalOpen = $state(false);

  // Badge level styles
  function getLevelBadge(level: GrammarPoint['level']) {
    switch (level) {
      case 'easy':
        return {
          text: 'Cấp 1 • Dễ',
          classes: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60'
        };
      case 'medium':
        return {
          text: 'Cấp 2 • Trung bình',
          classes: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60'
        };
      case 'hard':
        return {
          text: 'Cấp 3 • Khó',
          classes: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/60'
        };
    }
  }

  const levelBadge = $derived(getLevelBadge(point.level));
</script>

<div class="space-y-2.5 sm:space-y-4">
  <!-- Header: Cấp độ, Xuất xứ & Đánh dấu đã học -->
  <div class="bg-white dark:bg-[#1B1B1B] rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-[#282A2C] p-3 sm:p-5 shadow-xs space-y-2.5 sm:space-y-3.5">
    <div class="flex items-center justify-between gap-2">
      <div class="flex flex-wrap items-center gap-1.5">
        <!-- Level Badge -->
        <span class={`inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg sm:rounded-xl border text-[11px] sm:text-xs font-bold ${levelBadge.classes}`}>
          {levelBadge.text}
        </span>

        <!-- Origin Badge -->
        <span class="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg sm:rounded-xl border border-slate-200 dark:border-[#323436] bg-slate-50 dark:bg-[#242526] text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300">
          {#if point.origin === 'inherited'}
            <TreeEvergreen weight="duotone" class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          {:else if point.origin === 'new'}
            <Sparkle weight="duotone" class="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          {:else}
            <Star weight="duotone" class="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          {/if}
          <span>{point.originLabel}</span>
        </span>
      </div>

      <!-- Đánh dấu đã học -->
      <button
        type="button"
        onclick={() => onToggleLearned?.(point.id)}
        class={`inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer active:scale-95 group focus:outline-hidden ${
          isLearned
            ? 'bg-emerald-600 text-white shadow-xs'
            : 'bg-slate-100 dark:bg-[#282A2C] text-slate-600 dark:text-[#C4C7C5] hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-700 dark:hover:text-emerald-300'
        }`}
        title={isLearned ? 'Đã đánh dấu thuộc điểm ngữ pháp này' : 'Bấm để đánh dấu đã học'}
      >
        <Check weight={isLearned ? 'bold' : 'duotone'} class="w-3.5 h-3.5" />
        <span>{isLearned ? 'Đã học' : 'Đánh dấu đã học'}</span>
      </button>
    </div>

    <!-- Title & Chữ Hán trọng điểm -->
    <div class="flex items-start gap-2.5 sm:gap-3 pt-0.5 sm:pt-1 min-w-0">
      <div class="shrink-0 min-w-11 sm:min-w-14 px-2 sm:px-2.5 h-11 sm:h-14 rounded-xl sm:rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex flex-col items-center justify-center text-amber-900 dark:text-amber-200 shadow-2xs">
        <span class="text-xs sm:text-base md:text-lg font-black leading-tight text-center">{point.grammarKey}</span>
        <span class="text-[8px] sm:text-[10px] font-semibold text-amber-700 dark:text-amber-300 mt-0.5 font-mono text-center truncate max-w-16 sm:max-w-20">{point.grammarKeyPinyin}</span>
      </div>

      <div class="min-w-0 flex-1">
        <h2 class="text-sm sm:text-base md:text-lg font-black text-slate-900 dark:text-slate-100 leading-snug">
          {point.id}. {point.title}
        </h2>

        <!-- Sách giáo khoa HSK 2 & HSK 1 (chỉ hiện HSK 1 nếu có dữ liệu hợp lệ) -->
        <div class="mt-1 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-500 dark:text-[#8E918F]">
          <span class="inline-flex items-center gap-1 font-medium bg-slate-50 dark:bg-[#242526] px-1.5 py-0.5 rounded-lg border border-slate-200/60 dark:border-[#323436]">
            <BookmarkSimple weight="duotone" class="w-3 h-3 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>SGK HSK 2: {point.textbookRef.hsk2}</span>
          </span>
          {#if point.textbookRef.hsk1 && point.textbookRef.hsk1.trim()}
            <span class="inline-flex items-center gap-1 font-medium bg-slate-50 dark:bg-[#242526] px-1.5 py-0.5 rounded-lg border border-slate-200/60 dark:border-[#323436]">
              <BookmarkSimple weight="duotone" class="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Kế thừa HSK 1: {point.textbookRef.hsk1}</span>
            </span>
          {/if}
        </div>
      </div>
    </div>
  </div>

  <!-- Phần 1: Cấu trúc ngữ pháp -->
  <div class="bg-white dark:bg-[#1B1B1B] rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-[#282A2C] p-3 sm:p-5 shadow-xs space-y-2">
    <div class="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#8E918F]">
      Cấu trúc ngữ pháp
    </div>
    <SyntaxFormula components={point.legoFormula} formulaSummary={point.formulaSummary} />
  </div>

  <!-- Phần 2: Câu ví dụ trong đề thi mẫu -->
  <div class="bg-white dark:bg-[#1B1B1B] rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-[#282A2C] p-3 sm:p-5 shadow-xs space-y-2.5">
    <div class="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#8E918F]">
      Ví dụ trong đề thi mẫu
    </div>
    <div class="space-y-2 sm:space-y-2.5">
      {#each point.examples as ex}
        <ExampleSentence sentence={ex} {pinyinMode} />
      {/each}
    </div>
  </div>

  <!-- Phần 3: Mẹo then chốt -->
  <div class="p-4 rounded-3xl bg-amber-50/70 dark:bg-amber-950/25 border border-amber-200/80 dark:border-amber-900/50 flex items-start gap-3 shadow-xs">
    <div class="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
      <Lightbulb weight="duotone" class="w-4.5 h-4.5" />
    </div>
    <div class="min-w-0 text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed font-medium">
      <span class="font-black text-amber-900 dark:text-amber-300 block mb-0.5">Mẹo then chốt:</span>
      {point.keyTip}
    </div>
  </div>

  <!-- Phần 4: Lỗi sai hay gặp trong bài thi -->
  <div class="bg-white dark:bg-[#1B1B1B] rounded-3xl border border-slate-200 dark:border-[#282A2C] p-4 sm:p-5 shadow-xs space-y-3">
    <MistakeComparison mistake={point.mistake} />
  </div>

  <!-- Phần 5: Nút Luyện tập kiểm tra nhanh -->
  <div class="pt-1 pb-4">
    <button
      type="button"
      onclick={() => (quizModalOpen = true)}
      class="w-full py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-md transition-all cursor-pointer active:scale-98 flex items-center justify-center gap-2"
    >
      <Question weight="bold" class="w-4.5 h-4.5" />
      <span>Luyện tập nhanh bài này</span>
    </button>
  </div>
</div>

<!-- Modal câu hỏi luyện tập -->
<GrammarQuizModal {point} bind:open={quizModalOpen} />

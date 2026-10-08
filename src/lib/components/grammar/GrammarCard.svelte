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
  import CaretDown from 'phosphor-svelte/lib/CaretDown';
  import CaretUp from 'phosphor-svelte/lib/CaretUp';
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

  let showDetails = $state(false);
  let quizModalOpen = $state(false);

  // Badge level styles & icons
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

<div
  class={`bg-white dark:bg-[#1B1B1B] rounded-3xl border transition-all duration-200 shadow-xs hover:shadow-sm overflow-hidden flex flex-col justify-between ${
    isLearned
      ? 'border-emerald-300/80 dark:border-emerald-800/60'
      : 'border-slate-200 dark:border-[#282A2C] hover:border-blue-300 dark:hover:border-blue-800/70'
  }`}
>
  <!-- Card Header -->
  <div class="p-4 sm:p-5 pb-3 space-y-3">
    <!-- Top Meta Badges & Learned Checkbox -->
    <div class="flex items-center justify-between gap-2">
      <div class="flex flex-wrap items-center gap-1.5">
        <!-- Level Badge -->
        <span class={`inline-flex items-center px-2 py-0.5 rounded-lg border text-[11px] font-bold ${levelBadge.classes}`}>
          {levelBadge.text}
        </span>

        <!-- Origin Badge (Kế thừa / Mới / Nâng cao) -->
        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-[#323436] bg-slate-50 dark:bg-[#242526] text-[11px] font-semibold text-slate-700 dark:text-slate-300">
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

      <!-- Button mark as learned (Phosphor Check icon) -->
      <button
        type="button"
        onclick={() => onToggleLearned?.(point.id)}
        class={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 group focus:outline-hidden ${
          isLearned
            ? 'bg-emerald-600 text-white shadow-xs'
            : 'bg-slate-100 dark:bg-[#282A2C] text-slate-600 dark:text-[#C4C7C5] hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-700 dark:hover:text-emerald-300'
        }`}
        title={isLearned ? 'Đã đánh dấu thuộc điểm ngữ pháp này' : 'Bấm để đánh dấu đã học'}
      >
        <span class="group-hover:hidden">
          <Check weight={isLearned ? 'bold' : 'duotone'} class="w-3.5 h-3.5" />
        </span>
        <span class="hidden group-hover:inline-flex">
          <Check weight="fill" class="w-3.5 h-3.5" />
        </span>
        <span>{isLearned ? 'Đã học' : 'Chưa học'}</span>
      </button>
    </div>

    <!-- Main Title & Infographic Focal Block (Tựa theo ảnh 1 & ảnh 5) -->
    <div class="flex items-start gap-3 pt-1">
      <!-- Focal block for key characters -->
      <div class="shrink-0 w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex flex-col items-center justify-center text-amber-900 dark:text-amber-200 shadow-2xs">
        <span class="text-base font-black leading-none">{point.grammarKey}</span>
        <span class="text-[9px] font-semibold text-amber-700 dark:text-amber-300 mt-0.5 font-mono">{point.grammarKeyPinyin}</span>
      </div>

      <div class="min-w-0 flex-1">
        <h2 class="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 leading-snug">
          {point.id}. {point.title}
        </h2>

        <!-- Textbook reference badge (tựa theo ảnh 2) -->
        <div class="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 dark:text-[#8E918F]">
          <span class="inline-flex items-center gap-1 font-medium">
            <BookmarkSimple weight="duotone" class="w-3 h-3 text-slate-400 shrink-0" />
            <span>SGK HSK 2: {point.textbookRef.hsk2}</span>
          </span>
          {#if point.textbookRef.hsk1}
            <span class="text-slate-300 dark:text-slate-600">•</span>
            <span class="font-medium text-slate-400 dark:text-slate-500">
              HSK 1: {point.textbookRef.hsk1}
            </span>
          {/if}
        </div>
      </div>
    </div>
  </div>

  <!-- Body Content -->
  <div class="p-4 sm:p-5 pt-0 space-y-3.5">
    <!-- 1. Lego Syntax Builder -->
    <div>
      <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#8E918F] mb-1.5">
        Mô hình cú pháp Lego (Syntax Structure)
      </div>
      <SyntaxFormula components={point.legoFormula} formulaSummary={point.formulaSummary} />
    </div>

    <!-- 2. Primary Example Sentences -->
    <div class="space-y-2">
      <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#8E918F]">
        Ví dụ trong đề thi mẫu
      </div>
      <div class="space-y-2">
        {#each point.examples as ex}
          <ExampleSentence sentence={ex} {pinyinMode} />
        {/each}
      </div>
    </div>

    <!-- 3. Key Tip Box (Mẹo then chốt, tựa theo ảnh 3 & 4) -->
    <div class="p-3 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 flex items-start gap-2.5">
      <div class="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
        <Lightbulb weight="duotone" class="w-3.5 h-3.5" />
      </div>
      <div class="min-w-0 text-xs text-amber-950 dark:text-amber-200 leading-relaxed font-medium">
        <span class="font-bold">Mẹo cốt lõi:</span> {point.keyTip}
      </div>
    </div>

    <!-- 4. Expandable Section: Common Mistake (Bẫy đề thi) -->
    {#if showDetails}
      <div class="pt-1 transition-all">
        <MistakeComparison mistake={point.mistake} />
      </div>
    {/if}
  </div>

  <!-- Card Footer Actions: Quick Check quiz & Toggle detail -->
  <div class="p-3 sm:px-4 bg-slate-50/80 dark:bg-[#151516] border-t border-slate-100 dark:border-[#282A2C] flex items-center justify-between gap-2">
    <!-- Expand button for Mistake analysis -->
    <button
      type="button"
      onclick={() => (showDetails = !showDetails)}
      class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-[#C4C7C5] hover:text-blue-600 dark:hover:text-blue-400 py-1.5 px-2.5 rounded-xl hover:bg-white dark:hover:bg-[#242526] transition-colors cursor-pointer"
    >
      <span>{showDetails ? 'Thu gọn bẫy thi' : 'Xem bẫy thi hay sai'}</span>
      {#if showDetails}
        <CaretUp weight="bold" class="w-3.5 h-3.5" />
      {:else}
        <CaretDown weight="bold" class="w-3.5 h-3.5" />
      {/if}
    </button>

    <!-- Quick Check button (Mở modal luyện tập) -->
    <button
      type="button"
      onclick={() => (quizModalOpen = true)}
      class="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer active:scale-95 group focus:outline-hidden"
    >
      <span class="group-hover:hidden">
        <Question weight="duotone" class="w-3.5 h-3.5" />
      </span>
      <span class="hidden group-hover:inline-flex">
        <Question weight="fill" class="w-3.5 h-3.5" />
      </span>
      <span>Quick Check</span>
    </button>
  </div>
</div>

<!-- Quick Quiz Modal -->
<GrammarQuizModal {point} bind:open={quizModalOpen} />

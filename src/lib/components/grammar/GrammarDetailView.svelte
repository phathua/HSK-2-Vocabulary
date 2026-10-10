<script lang="ts">
  import type { GrammarPoint } from '#lib/data/hsk2Grammar';
  import SyntaxFormula from './SyntaxFormula.svelte';
  import ExampleSentence from './ExampleSentence.svelte';
  import MistakeComparison from './MistakeComparison.svelte';
  import GrammarQuizModal from './GrammarQuizModal.svelte';
  import { PEXELS_IMAGE_MAP as pexelsMap } from '#lib/data/pexelsImageMap';

  // Phosphor Icons
  import BookmarkSimple from 'phosphor-svelte/lib/BookmarkSimple';
  import Lightbulb from 'phosphor-svelte/lib/Lightbulb';
  import Question from 'phosphor-svelte/lib/Question';
  import Check from 'phosphor-svelte/lib/Check';
  import TreeEvergreen from 'phosphor-svelte/lib/TreeEvergreen';
  import Sparkle from 'phosphor-svelte/lib/Sparkle';
  import Star from 'phosphor-svelte/lib/Star';
  import Compass from 'phosphor-svelte/lib/Compass';
  import Lightning from 'phosphor-svelte/lib/Lightning';

  let {
    point,
    isLearned = false,
    onToggleLearned
  } = $props<{
    point: GrammarPoint;
    isLearned?: boolean;
    onToggleLearned?: (id: number) => void;
  }>();

  let quizModalOpen = $state(false);

  // Badge level styles
  function getLevelBadge(level: GrammarPoint['level']) {
    switch (level) {
      case 'easy':
        return {
          text: 'Cấp 1 • Dễ',
          classes: 'bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60'
        };
      case 'medium':
        return {
          text: 'Cấp 2 • Vừa',
          classes: 'bg-amber-50 text-amber-700 border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60'
        };
      case 'hard':
        return {
          text: 'Cấp 3 • Khó',
          classes: 'bg-rose-50 text-rose-700 border-rose-200/80 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/60'
        };
    }
  }

  const levelBadge = $derived(getLevelBadge(point.level));

  // Tra cứu ảnh minh họa tự nhiên cho câu ví dụ từ pexelsMap
  const imageMapTyped = pexelsMap as Record<string, string>;
  const sortedNounKeys = Object.keys(imageMapTyped).sort((a, b) => b.length - a.length);

  function getSentenceImage(hanzi: string): string | null {
    for (const key of sortedNounKeys) {
      if (hanzi.includes(key)) {
        return imageMapTyped[key];
      }
    }
    return null;
  }
</script>

<div class="space-y-3 sm:space-y-4">
  <!-- Header: Tinh giản, thông tin gói gọn không vỡ khung -->
  <div class="bg-white dark:bg-[#1B1B1B] rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-[#282A2C] p-3.5 sm:p-5 shadow-xs space-y-3">
    <!-- Top action & Badges bar: CÙNG 1 HÀNG NGANG DUY NHẤT CÂN ĐỐI -->
    <div class="flex items-center justify-between gap-2">
      <div class="flex items-center gap-1.5 min-w-0 flex-wrap sm:flex-nowrap">
        <!-- Level Badge -->
        <span class={`inline-flex items-center px-2 py-1 rounded-xl border text-[11px] sm:text-xs font-bold whitespace-nowrap shrink-0 ${levelBadge.classes}`}>
          {levelBadge.text}
        </span>

        <!-- Origin Badge -->
        <span class="inline-flex items-center gap-1 px-2 py-1 rounded-xl border border-slate-200 dark:border-[#323436] bg-slate-50 dark:bg-[#242526] text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap shrink-0">
          {#if point.origin === 'inherited'}
            <TreeEvergreen weight="duotone" class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          {:else if point.origin === 'new'}
            <Sparkle weight="duotone" class="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
          {:else}
            <Star weight="duotone" class="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
          {/if}
          <span>{point.originLabel}</span>
        </span>
      </div>

      <!-- Đã học: Tinh gọn trên cùng 1 hàng -->
      <button
        type="button"
        onclick={() => onToggleLearned?.(point.id)}
        class={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 group focus:outline-hidden whitespace-nowrap shrink-0 ${
          isLearned
            ? 'bg-emerald-600 text-white shadow-2xs'
            : 'bg-slate-100 dark:bg-[#282A2C] text-slate-600 dark:text-[#C4C7C5] hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-700 dark:hover:text-emerald-300 border border-slate-200/80 dark:border-transparent'
        }`}
        title={isLearned ? 'Đã thuộc điểm ngữ pháp này' : 'Bấm để đánh dấu đã học'}
      >
        <Check weight={isLearned ? 'bold' : 'duotone'} class="w-3.5 h-3.5 shrink-0" />
        <span>{isLearned ? 'Đã học' : 'Chưa học'}</span>
      </button>
    </div>

    <!-- Title & Key Characters: Không chèn ép, căn lề thẳng hàng đẹp mắt -->
    <div class="flex items-start gap-3 pt-0.5 min-w-0">
      <!-- Key Badge: Căn chỉnh tỷ lệ vừa phải, chữ Hán nổi bật -->
      <div class="shrink-0 min-w-12 px-2.5 h-12 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/70 dark:from-amber-950/40 dark:to-amber-900/30 border border-amber-200 dark:border-amber-800/60 flex flex-col items-center justify-center text-amber-900 dark:text-amber-200 shadow-2xs">
        <span class="text-sm sm:text-base font-black leading-tight text-center">{point.grammarKey}</span>
        <span class="text-[9px] sm:text-[10px] font-semibold text-amber-700 dark:text-amber-300 mt-0.5 font-mono text-center truncate max-w-16">{point.grammarKeyPinyin}</span>
      </div>

      <div class="min-w-0 flex-1">
        <h2 class="text-sm sm:text-base md:text-lg font-black text-slate-900 dark:text-slate-100 leading-snug">
          {point.id}. {point.title}
        </h2>

        <!-- Sách giáo khoa HSK 2 & HSK 1 -->
        <div class="mt-1.5 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-500 dark:text-[#8E918F]">
          <span class="inline-flex items-center gap-1 font-medium bg-slate-50 dark:bg-[#242526] px-2 py-0.5 rounded-lg border border-slate-200/60 dark:border-[#323436]">
            <BookmarkSimple weight="duotone" class="w-3 h-3 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>SGK HSK 2: {point.textbookRef.hsk2}</span>
          </span>
          {#if point.textbookRef.hsk1 && point.textbookRef.hsk1.trim()}
            <span class="inline-flex items-center gap-1 font-medium bg-slate-50 dark:bg-[#242526] px-2 py-0.5 rounded-lg border border-slate-200/60 dark:border-[#323436]">
              <BookmarkSimple weight="duotone" class="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Kế thừa: {point.textbookRef.hsk1}</span>
            </span>
          {/if}
        </div>
      </div>
    </div>
  </div>

  <!-- Phần 1: Sơ đồ Infographic Trực quan (Bespoke SVG Card) -->
  <div class="bg-white dark:bg-[#1B1B1B] rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-[#282A2C] p-3.5 sm:p-5 shadow-xs space-y-3">
    <div class="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#8E918F]">
      <Compass weight="duotone" class="w-4 h-4 text-blue-600 dark:text-blue-400" />
      <span>Sơ đồ cấu trúc trực quan</span>
    </div>

    <!-- SVG Infographic minh họa -->
    <div class="rounded-2xl overflow-hidden bg-slate-50 dark:bg-[#18191A] border border-slate-200/80 dark:border-[#333537] p-2 sm:p-3 flex items-center justify-center">
      <img
        src={`/svg/grammar/infographic_${point.id}.svg`}
        alt={`Sơ đồ cấu trúc ${point.title}`}
        class="w-full h-auto object-contain max-h-64 sm:max-h-72 select-none"
        loading="lazy"
      />
    </div>

    <!-- Lego Formula Bar & Tương tác âm thanh -->
    <div class="pt-1">
      <SyntaxFormula components={point.legoFormula} formulaSummary={point.formulaSummary} />
    </div>
  </div>

  <!-- Phần 2: Câu ví dụ trong đề thi mẫu với Ảnh minh họa ngữ nghĩa -->
  <div class="bg-white dark:bg-[#1B1B1B] rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-[#282A2C] p-3.5 sm:p-5 shadow-xs space-y-3">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#8E918F]">
        <Lightning weight="duotone" class="w-4 h-4 text-amber-500" />
        <span>Ví dụ trong đề thi mẫu</span>
      </div>
      <span class="text-[10px] font-semibold text-slate-400 dark:text-slate-500 font-mono">
        {point.examples.length} câu ví dụ
      </span>
    </div>

    <div class="space-y-2.5">
      {#each point.examples as ex}
        <ExampleSentence sentence={ex} imageUrl={getSentenceImage(ex.hanzi)} />
      {/each}
    </div>
  </div>

  <!-- Phần 3: Mẹo then chốt -->
  <div class="p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-amber-50/80 dark:bg-amber-950/25 border border-amber-200/80 dark:border-amber-900/50 flex items-start gap-3 shadow-xs">
    <div class="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
      <Lightbulb weight="duotone" class="w-4.5 h-4.5" />
    </div>
    <div class="min-w-0 text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed font-medium">
      <span class="font-black text-amber-900 dark:text-amber-300 block mb-0.5">Mẹo then chốt:</span>
      {point.keyTip}
    </div>
  </div>

  <!-- Phần 4: Lỗi sai hay gặp trong bài thi -->
  <div class="bg-white dark:bg-[#1B1B1B] rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-[#282A2C] p-3.5 sm:p-5 shadow-xs">
    <MistakeComparison mistake={point.mistake} />
  </div>

  <!-- Phần 5: Nút Luyện tập kiểm tra nhanh -->
  <div class="pt-1 pb-4">
    <button
      type="button"
      onclick={() => (quizModalOpen = true)}
      class="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-md transition-all cursor-pointer active:scale-98 flex items-center justify-center gap-2"
    >
      <Question weight="bold" class="w-4.5 h-4.5" />
      <span>Luyện tập nhanh bài này</span>
    </button>
  </div>
</div>

<!-- Modal câu hỏi luyện tập -->
<GrammarQuizModal {point} bind:open={quizModalOpen} />

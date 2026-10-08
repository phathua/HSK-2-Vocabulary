<script lang="ts">
  import type { ExampleSentenceItem } from '#lib/data/hsk2Grammar';
  import { speakChinese } from '#lib/utils/speech';
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
  import Tag from 'phosphor-svelte/lib/Tag';

  let {
    sentence,
    imageUrl
  } = $props<{
    sentence: ExampleSentenceItem;
    imageUrl?: string | null;
  }>();

  function playAudio() {
    speakChinese(sentence.hanzi, 0.85);
  }
</script>

<div
  class="group/sentence flex items-start gap-3 p-3 rounded-2xl bg-white dark:bg-[#1E1E1F] border border-slate-200/80 dark:border-[#2C2D2F] hover:border-blue-300 dark:hover:border-blue-700/60 transition-all"
>
  <!-- Thumbnail nếu có ảnh minh họa trực quan từ kho ảnh HSK -->
  {#if imageUrl}
    <div class="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-[#333537] shadow-2xs">
      <img
        src={imageUrl}
        alt={sentence.meaning}
        loading="lazy"
        class="w-full h-full object-cover group-hover/sentence:scale-105 transition-transform duration-300"
      />
    </div>
  {/if}

  <div class="flex-1 min-w-0">
    <!-- Hanzi & Pinyin: Pinyin to rõ ràng, dễ nhìn -->
    <div class="space-y-1">
      <div class="text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400 font-mono tracking-wide select-text leading-tight">
        {sentence.pinyin}
      </div>

      <!-- Hanzi string -->
      <div class="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 tracking-wide select-text leading-snug">
        {sentence.hanzi}
      </div>
    </div>

    <!-- Vietnamese translation -->
    <div class="text-xs sm:text-sm text-slate-600 dark:text-[#C4C7C5] mt-1 font-medium leading-relaxed">
      {sentence.meaning}
    </div>

    <!-- Exam reference badge if exists -->
    {#if sentence.examRef}
      <div class="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
        <Tag weight="duotone" class="w-3 h-3 text-slate-500 group-hover/sentence:text-blue-500 transition-colors" />
        <span>Trích đề Hanban: {sentence.examRef}</span>
      </div>
    {/if}
  </div>

  <!-- Audio playback button -->
  <button
    type="button"
    onclick={playAudio}
    class="w-9 h-9 rounded-xl border border-slate-200 dark:border-[#333537] bg-slate-50 dark:bg-[#282A2C] hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:border-blue-200 dark:hover:border-blue-800/80 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center shrink-0 transition-all cursor-pointer active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 group/btn"
    title="Phát âm câu này"
    aria-label="Phát âm câu này"
  >
    <span class="group-hover/btn:hidden">
      <SpeakerHigh weight="duotone" class="w-4.5 h-4.5" />
    </span>
    <span class="hidden group-hover/btn:inline-flex">
      <SpeakerHigh weight="fill" class="w-4.5 h-4.5" />
    </span>
  </button>
</div>

<script lang="ts">
  import type { ExampleSentenceItem } from '#lib/data/hsk2Grammar';
  import { speakChinese } from '#lib/utils/speech';
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
  import Tag from 'phosphor-svelte/lib/Tag';

  let {
    sentence,
    pinyinMode = 'always' // 'always' | 'hover' | 'hidden'
  } = $props<{
    sentence: ExampleSentenceItem;
    pinyinMode?: 'always' | 'hover' | 'hidden';
  }>();

  let isHovered = $state(false);

  function playAudio() {
    speakChinese(sentence.hanzi, 0.85);
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="group/sentence flex items-start justify-between gap-3 p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-[#1E1E1F] border border-slate-200/80 dark:border-[#2C2D2F] hover:border-blue-300 dark:hover:border-blue-700/60 transition-all cursor-pointer sm:cursor-default"
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  onclick={() => {
    if (pinyinMode === 'hover') {
      isHovered = !isHovered;
    }
  }}
>
  <div class="flex-1 min-w-0">
    <!-- Hanzi & Pinyin -->
    <div class="space-y-0.5">
      <!-- Pinyin display based on mode -->
      {#if pinyinMode === 'always' || (pinyinMode === 'hover' && isHovered)}
        <div class="text-xs font-medium text-blue-600 dark:text-blue-400 font-mono tracking-wide select-text">
          {sentence.pinyin}
        </div>
      {:else if pinyinMode === 'hover'}
        <div class="text-[10px] sm:text-[11px] font-medium text-slate-400 dark:text-slate-500 italic select-none">
          Chạm hoặc rê chuột để xem Pinyin
        </div>
      {/if}

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
      <div class="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
        <Tag weight="duotone" class="w-3 h-3 text-slate-500 group-hover/sentence:text-blue-500 transition-colors" />
        <span>Trích đề Hanban: {sentence.examRef}</span>
      </div>
    {/if}
  </div>

  <!-- Audio playback button: Duotone by default, Filled on hover/focus -->
  <button
    type="button"
    onclick={playAudio}
    class="w-9 h-9 rounded-xl border border-slate-200 dark:border-[#333537] bg-slate-50 dark:bg-[#282A2C] hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:border-blue-200 dark:hover:border-blue-800/80 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center shrink-0 transition-all cursor-pointer active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 group/btn"
    title="Phát âm câu này"
    aria-label="Phát âm câu này"
  >
    <!-- Default duotone, hover filled -->
    <span class="group-hover/btn:hidden">
      <SpeakerHigh weight="duotone" class="w-4.5 h-4.5" />
    </span>
    <span class="hidden group-hover/btn:inline-flex">
      <SpeakerHigh weight="fill" class="w-4.5 h-4.5" />
    </span>
  </button>
</div>

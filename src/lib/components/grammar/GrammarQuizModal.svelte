<script lang="ts">
  import type { GrammarPoint } from '#lib/data/hsk2Grammar';
  import X from 'phosphor-svelte/lib/X';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
  import XCircle from 'phosphor-svelte/lib/XCircle';
  import Question from 'phosphor-svelte/lib/Question';
  import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
  import { speakChinese } from '#lib/utils/speech';

  let { point, open = $bindable(false) } = $props<{
    point: GrammarPoint;
    open: boolean;
  }>();

  let selectedIdx = $state<number | null>(null);
  let isAnswered = $state(false);

  function handleSelect(idx: number) {
    if (isAnswered) return;
    selectedIdx = idx;
    isAnswered = true;
    const opt = point.quickQuiz.options[idx];
    if (opt) {
      speakChinese(opt.text, 0.85);
    }
  }

  function handleClose() {
    open = false;
    selectedIdx = null;
    isAnswered = false;
  }
</script>

{#if open}
  <!-- Backdrop -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 select-none"
    onclick={handleClose}
  >
    <!-- Modal Card (Stop propagation) -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="w-full max-w-lg bg-white dark:bg-[#1B1B1B] rounded-3xl border border-slate-200 dark:border-[#2C2D2F] shadow-2xl p-5 sm:p-6 space-y-4"
      onclick={(e) => e.stopPropagation()}
    >
      <!-- Header with Close button (Bold Phosphor icon, no emoji) -->
      <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#282A2C]">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Question weight="duotone" class="w-4.5 h-4.5" />
          </div>
          <div>
            <span class="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
              Luyện tập nhanh
            </span>
            <h3 class="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100 truncate">
              {point.title}
            </h3>
          </div>
        </div>

        <button
          type="button"
          onclick={handleClose}
          class="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#282A2C] hover:bg-slate-200 dark:hover:bg-[#37393B] text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer active:scale-95"
          aria-label="Đóng bài tập"
        >
          <X weight="bold" class="w-4 h-4" />
        </button>
      </div>

      <!-- Question Content -->
      <div class="space-y-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-[#242526] border border-slate-200/70 dark:border-[#323436]">
        <div class="text-xs font-mono text-blue-600 dark:text-blue-400">
          {point.quickQuiz.pinyin}
        </div>
        <div class="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          {point.quickQuiz.question}
        </div>
      </div>

      <!-- Options List -->
      <div class="space-y-2">
        {#each point.quickQuiz.options as opt, idx}
          {@const isChosen = selectedIdx === idx}
          {@const showCorrect = isAnswered && opt.isCorrect}
          {@const showWrong = isAnswered && isChosen && !opt.isCorrect}

          <button
            type="button"
            onclick={() => handleSelect(idx)}
            disabled={isAnswered}
            class={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer group ${
              showCorrect
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700/80 text-emerald-900 dark:text-emerald-200'
                : showWrong
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700/80 text-rose-900 dark:text-rose-200'
                  : isChosen
                    ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700'
                    : 'bg-white dark:bg-[#1E1E1F] border-slate-200 dark:border-[#2C2D2F] hover:bg-slate-50 dark:hover:bg-[#282A2C] text-slate-800 dark:text-slate-200'
            }`}
          >
            <div class="flex items-center gap-3">
              <span class="w-6 h-6 rounded-lg bg-slate-100 dark:bg-[#2A2B2D] text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center justify-center shrink-0">
                {String.fromCharCode(65 + idx)}
              </span>
              <div>
                <span class="text-sm font-bold block">{opt.text}</span>
                <span class="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">{opt.pinyin}</span>
              </div>
            </div>

            {#if showCorrect}
              <CheckCircle weight="fill" class="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            {:else if showWrong}
              <XCircle weight="fill" class="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
            {/if}
          </button>
        {/each}
      </div>

      <!-- Explanation after answering -->
      {#if isAnswered}
        <div class="p-3 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 space-y-1">
          <div class="text-xs font-bold text-blue-900 dark:text-blue-300">
            Giải thích đáp án:
          </div>
          <p class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {point.quickQuiz.explanation}
          </p>
        </div>

        <button
          type="button"
          onclick={handleClose}
          class="w-full py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          <span>Đã hiểu, tiếp tục ôn tập</span>
          <ArrowRight weight="bold" class="w-4 h-4" />
        </button>
      {/if}
    </div>
  </div>
{/if}

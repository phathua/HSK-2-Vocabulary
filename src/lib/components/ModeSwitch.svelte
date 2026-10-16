<script lang="ts">
  import { appState } from '#lib/state/appState.svelte';
  import PencilLine from 'phosphor-svelte/lib/PencilLine';
  import CheckSquareOffset from 'phosphor-svelte/lib/CheckSquareOffset';
  import Cards from 'phosphor-svelte/lib/Cards';
  import Microphone from 'phosphor-svelte/lib/Microphone';
  import ArrowClockwise from 'phosphor-svelte/lib/ArrowClockwise';
  import FloppyDisk from 'phosphor-svelte/lib/FloppyDisk';
  import { savedSessionState } from '#lib/state/savedSessionState.svelte';

  import { tourState } from '#lib/state/tourState.svelte';

  const segmentsCount = $derived(appState.currentProgressSegments.length);

  const progressPercent = $derived.by(() => {
    if (segmentsCount === 0) return 0;
    const attemptedCount = appState.currentProgressSegments.filter(s => s.status !== 'unreached').length;
    return Math.min(100, Math.round((attemptedCount / segmentsCount) * 100));
  });

  const currentScoreText = $derived.by(() => {
    if (appState.activeTab === 'flash') return `${appState.flashKnown}/${appState.totalFlashCount}`;
    if (appState.activeTab === 'fill') return `${appState.fillCorrect}/${appState.totalFillCount}`;
    if (appState.activeTab === 'quiz') return `${appState.quizCorrect}/${appState.totalQuizCount}`;
    return `${appState.speechCorrect}/${appState.totalSpeechCount}`;
  });

  function handleTabClick(tab: 'fill' | 'quiz' | 'flash' | 'speech') {
    appState.activeTab = tab;
    if (!tourState.isActive && !tourState.isTourSeen(`hsk_tour_${tab}_seen`)) {
      setTimeout(() => {
        tourState.startTabTour(tab);
      }, 300);
    }
  }
</script>

<div class="shrink-0 my-2">
  <!-- Clean Segmented Control: 4 Chế độ rõ ràng, cân đối, icon đồng nhất Phosphor -->
  <div
    data-tour="mode-switch-tabs"
    class="grid grid-cols-4 gap-1 p-1 bg-slate-200/80 dark:bg-[#1B1B1B] border border-transparent dark:border-[#282A2C] rounded-2xl transition-colors"
  >
    <!-- Tab 1: Thẻ Flashcard (Đưa lên đầu tiên) -->
    <button
      type="button"
      data-tour="tab-btn-flash"
      onclick={() => handleTabClick('flash')}
      class={`py-1.5 md:py-2 px-0.5 rounded-xl font-black text-xs md:text-sm flex items-center justify-center gap-1 transition-all cursor-pointer whitespace-nowrap min-w-0 ${
        appState.activeTab === 'flash'
          ? 'bg-white dark:bg-[#282A2C] text-slate-900 dark:text-[#E3E3E3] shadow-xs'
          : 'text-slate-600 dark:text-[#8E918F] hover:text-slate-900 dark:hover:text-[#E3E3E3]'
      }`}
    >
      <Cards weight="bold" class="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
      <span>Thẻ từ</span>
    </button>

    <!-- Tab 2: Điền từ -->
    <button
      type="button"
      data-tour="tab-btn-fill"
      onclick={() => handleTabClick('fill')}
      class={`py-1.5 md:py-2 px-0.5 rounded-xl font-black text-xs md:text-sm flex items-center justify-center gap-1 transition-all cursor-pointer whitespace-nowrap min-w-0 ${
        appState.activeTab === 'fill'
          ? 'bg-white dark:bg-[#282A2C] text-slate-900 dark:text-[#E3E3E3] shadow-xs'
          : 'text-slate-600 dark:text-[#8E918F] hover:text-slate-900 dark:hover:text-[#E3E3E3]'
      }`}
    >
      <PencilLine weight="bold" class="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
      <span>Điền từ</span>
    </button>

    <!-- Tab 3: Trắc nghiệm -->
    <button
      type="button"
      data-tour="tab-btn-quiz"
      onclick={() => handleTabClick('quiz')}
      class={`py-1.5 md:py-2 px-0.5 rounded-xl font-black text-xs md:text-sm flex items-center justify-center gap-1 transition-all cursor-pointer whitespace-nowrap min-w-0 ${
        appState.activeTab === 'quiz'
          ? 'bg-white dark:bg-[#282A2C] text-slate-900 dark:text-[#E3E3E3] shadow-xs'
          : 'text-slate-600 dark:text-[#8E918F] hover:text-slate-900 dark:hover:text-[#E3E3E3]'
      }`}
    >
      <CheckSquareOffset weight="bold" class="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
      <span class="hidden min-[380px]:inline">Trắc nghiệm</span>
      <span class="min-[380px]:hidden">Quiz</span>
    </button>

    <!-- Tab 4: Phát âm -->
    <button
      type="button"
      data-tour="tab-btn-speech"
      onclick={() => handleTabClick('speech')}
      class={`py-1.5 md:py-2 px-0.5 rounded-xl font-black text-xs md:text-sm flex items-center justify-center gap-1 transition-all cursor-pointer whitespace-nowrap min-w-0 ${
        appState.activeTab === 'speech'
          ? 'bg-white dark:bg-[#282A2C] text-slate-900 dark:text-[#E3E3E3] shadow-xs'
          : 'text-slate-600 dark:text-[#8E918F] hover:text-slate-900 dark:hover:text-[#E3E3E3]'
      }`}
    >
      <Microphone weight="bold" class="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
      <span>Phát âm</span>
    </button>
  </div>

  <!-- Micro Progress & Live Score Indicator -->
  <div data-tour="progress-score-bar" class="mt-1.5 px-1">
    <div class="flex items-center justify-between text-[10px] md:text-xs font-bold text-slate-400 dark:text-[#8E918F]">
      <span>Tiến độ ({progressPercent}%)</span>
      <span class="text-slate-600 dark:text-[#E3E3E3] font-black">Điểm: {currentScoreText}</span>
    </div>
    <div class="flex items-center gap-1.5 mt-0.5">
      <div
        class="flex-1 bg-slate-300/70 dark:bg-[#1C1D1F] h-1.5 md:h-2 rounded-full overflow-hidden flex {segmentsCount <= 60 ? 'gap-[1px]' : 'gap-0'}"
      >
        {#if segmentsCount === 0}
          <div class="h-full w-full bg-slate-200 dark:bg-[#282A2C]"></div>
        {:else}
          {#each appState.currentProgressSegments as seg (seg.id)}
            <div
              class={`h-full flex-1 transition-colors duration-200 ${
                seg.status === 'correct'
                  ? 'bg-blue-600 dark:bg-blue-500'
                  : seg.status === 'wrong'
                  ? 'bg-rose-500 dark:bg-rose-500'
                  : seg.status === 'skipped'
                  ? 'bg-amber-400 dark:bg-amber-400'
                  : 'bg-slate-200 dark:bg-[#282A2C]'
              }`}
            ></div>
          {/each}
        {/if}
      </div>

      <!-- Nút Lưu tiến độ nhanh trên thanh tiến độ: Không sáng khi tiến độ 0% -->
      <button
        type="button"
        disabled={progressPercent === 0}
        onclick={() => savedSessionState.openSaveModal()}
        class={`w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
          progressPercent === 0
            ? 'text-slate-300 dark:text-zinc-700 cursor-not-allowed opacity-35 pointer-events-none'
            : 'text-slate-400 hover:text-blue-600 dark:text-[#8E918F] dark:hover:text-blue-400 hover:bg-slate-200/70 dark:hover:bg-[#282A2C] cursor-pointer active:scale-90'
        }`}
        title={progressPercent === 0 ? 'Chưa có tiến độ để lưu' : 'Lưu tiến độ làm bài'}
        aria-label="Lưu tiến độ"
      >
        <FloppyDisk weight="regular" class="w-3.5 h-3.5" />
      </button>

      <!-- Nút Rotate bên phải ngoài cùng của thanh tiến độ -->
      <button
        type="button"
        onclick={() => appState.resetCurrentGameProgress()}
        class="w-5 h-5 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-700 dark:text-[#8E918F] dark:hover:text-[#E3E3E3] hover:bg-slate-200/70 dark:hover:bg-[#282A2C] transition-colors cursor-pointer shrink-0 active:scale-90"
        title="Làm lại tiến độ bài học này"
        aria-label="Làm lại tiến độ"
      >
        <ArrowClockwise weight="bold" class="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
</div>

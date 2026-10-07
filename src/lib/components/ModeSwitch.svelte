<script lang="ts">
  import { appState } from '#lib/state/appState.svelte';
  import PencilLine from 'phosphor-svelte/lib/PencilLine';
  import CheckSquareOffset from 'phosphor-svelte/lib/CheckSquareOffset';
  import Cards from 'phosphor-svelte/lib/Cards';
  import ArrowClockwise from 'phosphor-svelte/lib/ArrowClockwise';

  function resetCurrentMode() {
    if (appState.activeTab === 'fill') {
      appState.initFill(undefined, false);
    } else if (appState.activeTab === 'quiz') {
      appState.initQuiz();
    } else {
      appState.initFlash();
    }
  }

  const progressPercent = $derived.by(() => {
    if (appState.activeTab === 'fill') {
      return appState.totalFillCount > 0 ? (appState.fillDoneCount / appState.totalFillCount) * 100 : 0;
    } else if (appState.activeTab === 'quiz') {
      return appState.totalQuizCount > 0 ? (appState.quizDoneCount / appState.totalQuizCount) * 100 : 0;
    } else {
      return appState.totalFlashCount > 0
        ? ((appState.flashKnown + appState.flashUnknown) / appState.totalFlashCount) * 100
        : 0;
    }
  });

  const currentScoreText = $derived.by(() => {
    if (appState.activeTab === 'fill') return `${appState.fillCorrect}/${appState.fillDoneCount}`;
    if (appState.activeTab === 'quiz') return `${appState.quizCorrect}/${appState.quizDoneCount}`;
    return `${appState.flashKnown}/${appState.totalFlashCount}`;
  });
</script>

<div class="shrink-0 my-2.5">
  <!-- Clean Segmented Control: 3 Chế độ rõ ràng, nowrap, không bị gãy dòng chữ Trắc nghiệm -->
  <div class="flex items-center gap-1 p-1 bg-slate-200/80 rounded-2xl">
    <!-- Tab 1: Điền từ -->
    <button
      type="button"
      onclick={() => (appState.activeTab = 'fill')}
      class={`flex-1 py-1.5 px-2 rounded-xl font-black text-xs flex items-center justify-center gap-1 transition-all cursor-pointer whitespace-nowrap ${
        appState.activeTab === 'fill'
          ? 'bg-white text-slate-900 shadow-xs'
          : 'text-slate-600 hover:text-slate-900'
      }`}
    >
      <PencilLine weight="bold" class="w-3.5 h-3.5 shrink-0" />
      <span>Điền từ</span>
    </button>

    <!-- Tab 2: Trắc nghiệm (nowrap, không rớt dòng chữ) -->
    <button
      type="button"
      onclick={() => (appState.activeTab = 'quiz')}
      class={`flex-1 py-1.5 px-2 rounded-xl font-black text-xs flex items-center justify-center gap-1 transition-all cursor-pointer whitespace-nowrap ${
        appState.activeTab === 'quiz'
          ? 'bg-white text-slate-900 shadow-xs'
          : 'text-slate-600 hover:text-slate-900'
      }`}
    >
      <CheckSquareOffset weight="bold" class="w-3.5 h-3.5 shrink-0" />
      <span>Trắc nghiệm</span>
    </button>

    <!-- Tab 3: Thẻ Flashcard -->
    <button
      type="button"
      onclick={() => (appState.activeTab = 'flash')}
      class={`flex-1 py-1.5 px-2 rounded-xl font-black text-xs flex items-center justify-center gap-1 transition-all cursor-pointer whitespace-nowrap ${
        appState.activeTab === 'flash'
          ? 'bg-white text-slate-900 shadow-xs'
          : 'text-slate-600 hover:text-slate-900'
      }`}
    >
      <Cards weight="bold" class="w-3.5 h-3.5 shrink-0" />
      <span>Thẻ từ</span>
    </button>

    <!-- Reset Button -->
    <button
      type="button"
      onclick={resetCurrentMode}
      class="w-7 h-7 rounded-xl hover:bg-white/80 flex items-center justify-center text-slate-500 hover:text-pink-600 transition-colors cursor-pointer shrink-0"
      title="Học lại từ đầu"
      aria-label="Học lại từ đầu"
    >
      <ArrowClockwise weight="bold" class="w-3.5 h-3.5" />
    </button>
  </div>

  <!-- Micro Progress & Live Score Indicator -->
  <div class="flex items-center justify-between text-[10px] font-bold text-slate-400 mt-1.5 px-1">
    <span>Tiến độ ({Math.round(progressPercent)}%)</span>
    <span class="text-slate-600 font-black">Điểm: {currentScoreText}</span>
  </div>
  <div class="w-full bg-slate-200 h-1 rounded-full overflow-hidden mt-0.5">
    <div
      class="bg-blue-600 h-full transition-all duration-300 rounded-full"
      style={`width: ${progressPercent}%`}
    ></div>
  </div>
</div>

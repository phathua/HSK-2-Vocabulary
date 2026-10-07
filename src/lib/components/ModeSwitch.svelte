<script lang="ts">
  import { appState } from '#lib/state/appState.svelte';
  import PencilLine from 'phosphor-svelte/lib/PencilLine';
  import CheckSquareOffset from 'phosphor-svelte/lib/CheckSquareOffset';
  import Cards from 'phosphor-svelte/lib/Cards';
  import Microphone from 'phosphor-svelte/lib/Microphone';

  const progressPercent = $derived.by(() => {
    if (appState.activeTab === 'fill') {
      return appState.totalFillCount > 0 ? (appState.fillDoneCount / appState.totalFillCount) * 100 : 0;
    } else if (appState.activeTab === 'quiz') {
      return appState.totalQuizCount > 0 ? (appState.quizDoneCount / appState.totalQuizCount) * 100 : 0;
    } else if (appState.activeTab === 'flash') {
      return appState.totalFlashCount > 0
        ? ((appState.flashKnown + appState.flashUnknown) / appState.totalFlashCount) * 100
        : 0;
    } else {
      return appState.totalSpeechCount > 0 ? (appState.speechDoneCount / appState.totalSpeechCount) * 100 : 0;
    }
  });

  const currentScoreText = $derived.by(() => {
    if (appState.activeTab === 'fill') return `${appState.fillCorrect}/${appState.fillDoneCount}`;
    if (appState.activeTab === 'quiz') return `${appState.quizCorrect}/${appState.quizDoneCount}`;
    if (appState.activeTab === 'flash') return `${appState.flashKnown}/${appState.totalFlashCount}`;
    return `${appState.speechCorrect}/${appState.speechDoneCount}`;
  });
</script>

<div class="shrink-0 my-2">
  <!-- Clean Segmented Control: 4 Chế độ rõ ràng, cân đối, icon đồng nhất Phosphor -->
  <div class="grid grid-cols-4 gap-1 p-1 bg-slate-200/80 rounded-2xl">
    <!-- Tab 1: Điền từ -->
    <button
      type="button"
      onclick={() => (appState.activeTab = 'fill')}
      class={`py-1.5 px-1 rounded-xl font-black text-xs flex items-center justify-center gap-1 transition-all cursor-pointer whitespace-nowrap min-w-0 ${
        appState.activeTab === 'fill'
          ? 'bg-white text-slate-900 shadow-xs'
          : 'text-slate-600 hover:text-slate-900'
      }`}
    >
      <PencilLine weight="bold" class="w-3.5 h-3.5 shrink-0" />
      <span class="truncate">Điền từ</span>
    </button>

    <!-- Tab 2: Trắc nghiệm -->
    <button
      type="button"
      onclick={() => (appState.activeTab = 'quiz')}
      class={`py-1.5 px-1 rounded-xl font-black text-xs flex items-center justify-center gap-1 transition-all cursor-pointer whitespace-nowrap min-w-0 ${
        appState.activeTab === 'quiz'
          ? 'bg-white text-slate-900 shadow-xs'
          : 'text-slate-600 hover:text-slate-900'
      }`}
    >
      <CheckSquareOffset weight="bold" class="w-3.5 h-3.5 shrink-0" />
      <span class="truncate">Trắc nghiệm</span>
    </button>

    <!-- Tab 3: Thẻ Flashcard -->
    <button
      type="button"
      onclick={() => (appState.activeTab = 'flash')}
      class={`py-1.5 px-1 rounded-xl font-black text-xs flex items-center justify-center gap-1 transition-all cursor-pointer whitespace-nowrap min-w-0 ${
        appState.activeTab === 'flash'
          ? 'bg-white text-slate-900 shadow-xs'
          : 'text-slate-600 hover:text-slate-900'
      }`}
    >
      <Cards weight="bold" class="w-3.5 h-3.5 shrink-0" />
      <span class="truncate">Thẻ từ</span>
    </button>

    <!-- Tab 4: Phát âm (Tính năng mới) -->
    <button
      type="button"
      onclick={() => (appState.activeTab = 'speech')}
      class={`py-1.5 px-1 rounded-xl font-black text-xs flex items-center justify-center gap-1 transition-all cursor-pointer whitespace-nowrap min-w-0 ${
        appState.activeTab === 'speech'
          ? 'bg-white text-slate-900 shadow-xs'
          : 'text-slate-600 hover:text-slate-900'
      }`}
    >
      <Microphone weight="bold" class="w-3.5 h-3.5 shrink-0" />
      <span class="truncate">Phát âm</span>
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

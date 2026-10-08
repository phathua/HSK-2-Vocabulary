<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import Header from '#lib/components/Header.svelte';
  import LessonFilterModal from '#lib/components/LessonFilterModal.svelte';
  import SettingsModal from '#lib/components/SettingsModal.svelte';
  import { HSK2_GRAMMAR_POINTS, type GrammarPoint } from '#lib/data/hsk2Grammar';
  import GrammarDetailView from '#lib/components/grammar/GrammarDetailView.svelte';

  // Phosphor Icons
  import ArrowLeft from 'phosphor-svelte/lib/ArrowLeft';

  const slug = $derived(page.params.slug);
  const point = $derived(
    HSK2_GRAMMAR_POINTS.find((p: GrammarPoint) => p.slug === slug) || HSK2_GRAMMAR_POINTS[0]
  );

  let learnedMap = $state<Record<number, boolean>>({});

  const STORAGE_KEY_LEARNED = 'hsk2_grammar_learned_ids';

  onMount(() => {
    try {
      const savedLearned = localStorage.getItem(STORAGE_KEY_LEARNED);
      if (savedLearned) {
        learnedMap = JSON.parse(savedLearned);
      }
    } catch {}
  });

  function toggleLearned(id: number) {
    learnedMap = {
      ...learnedMap,
      [id]: !learnedMap[id]
    };
    try {
      localStorage.setItem(STORAGE_KEY_LEARNED, JSON.stringify(learnedMap));
    } catch {}
  }
</script>

<svelte:head>
  <title>{point.title} | Ngữ Pháp HSK 2</title>
</svelte:head>

<Header />

<main class="flex-1 flex flex-col min-h-0 pt-1 pb-0 overflow-y-auto no-scrollbar space-y-2.5">
  <!-- Top Bar: Nút quay lại danh mục -->
  <div class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-2xl p-2.5 sm:p-3 shadow-xs flex items-center justify-between gap-2 shrink-0">
    <button
      type="button"
      onclick={() => goto('/ngu-phap')}
      class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#282A2C] hover:bg-slate-200 dark:hover:bg-[#37393B] text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer active:scale-95"
    >
      <ArrowLeft weight="bold" class="w-4 h-4" />
      <span>Danh mục ngữ pháp</span>
    </button>
  </div>

  <!-- Nội dung chi tiết full trang cho mobile -->
  <div class="pb-4">
    <GrammarDetailView
      {point}
      isLearned={Boolean(learnedMap[point.id])}
      onToggleLearned={toggleLearned}
    />
  </div>
</main>

<LessonFilterModal />
<SettingsModal />

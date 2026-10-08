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
  import CaretLeft from 'phosphor-svelte/lib/CaretLeft';
  import Eye from 'phosphor-svelte/lib/Eye';

  const slug = $derived(page.params.slug);
  const point = $derived(
    HSK2_GRAMMAR_POINTS.find((p: GrammarPoint) => p.slug === slug) || HSK2_GRAMMAR_POINTS[0]
  );

  let pinyinMode = $state<'always' | 'hover' | 'hidden'>('always');
  let learnedMap = $state<Record<number, boolean>>({});

  const STORAGE_KEY_LEARNED = 'hsk2_grammar_learned_ids';
  const STORAGE_KEY_PINYIN = 'hsk2_grammar_pinyin_mode';

  onMount(() => {
    try {
      const savedLearned = localStorage.getItem(STORAGE_KEY_LEARNED);
      if (savedLearned) {
        learnedMap = JSON.parse(savedLearned);
      }
      const savedPinyin = localStorage.getItem(STORAGE_KEY_PINYIN) as 'always' | 'hover' | 'hidden';
      if (savedPinyin && ['always', 'hover', 'hidden'].includes(savedPinyin)) {
        pinyinMode = savedPinyin;
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

  function setPinyinMode(mode: 'always' | 'hover' | 'hidden') {
    pinyinMode = mode;
    try {
      localStorage.setItem(STORAGE_KEY_PINYIN, mode);
    } catch {}
  }
</script>

<svelte:head>
  <title>{point.title} | Ngữ Pháp HSK 2</title>
</svelte:head>

<Header />

<main class="flex-1 flex flex-col min-h-0 my-2 overflow-y-auto no-scrollbar space-y-3">
  <!-- Top Bar: Nút quay lại danh mục + Nút đổi Pinyin -->
  <div class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-2xl p-2.5 sm:p-3 shadow-xs flex items-center justify-between gap-2 shrink-0">
    <button
      type="button"
      onclick={() => goto('/ngu-phap')}
      class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#282A2C] hover:bg-slate-200 dark:hover:bg-[#37393B] text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer active:scale-95"
    >
      <CaretLeft weight="bold" class="w-4 h-4" />
      <span>Danh mục ngữ pháp</span>
    </button>

    <!-- Pinyin Switcher -->
    <div class="flex items-center gap-0.5 p-1 rounded-xl bg-slate-50 dark:bg-[#242526] border border-slate-200 dark:border-[#323436] shrink-0">
      <div class="hidden sm:flex items-center gap-1 px-1.5 text-[11px] font-bold text-slate-500 dark:text-[#8E918F]">
        <Eye weight="duotone" class="w-3.5 h-3.5" />
        <span>Pinyin:</span>
      </div>
      <button
        type="button"
        onclick={() => setPinyinMode('always')}
        class={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
          pinyinMode === 'always'
            ? 'bg-blue-600 text-white shadow-2xs'
            : 'text-slate-600 dark:text-[#C4C7C5] hover:bg-slate-200/60 dark:hover:bg-[#323436]'
        }`}
      >
        Hiện
      </button>
      <button
        type="button"
        onclick={() => setPinyinMode('hover')}
        class={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
          pinyinMode === 'hover'
            ? 'bg-blue-600 text-white shadow-2xs'
            : 'text-slate-600 dark:text-[#C4C7C5] hover:bg-slate-200/60 dark:hover:bg-[#323436]'
        }`}
      >
        Hover
      </button>
      <button
        type="button"
        onclick={() => setPinyinMode('hidden')}
        class={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
          pinyinMode === 'hidden'
            ? 'bg-blue-600 text-white shadow-2xs'
            : 'text-slate-600 dark:text-[#C4C7C5] hover:bg-slate-200/60 dark:hover:bg-[#323436]'
        }`}
      >
        Ẩn
      </button>
    </div>
  </div>

  <!-- Nội dung chi tiết full trang cho mobile -->
  <div class="pb-6">
    <GrammarDetailView
      {point}
      isLearned={Boolean(learnedMap[point.id])}
      {pinyinMode}
      onToggleLearned={toggleLearned}
    />
  </div>
</main>

<LessonFilterModal />
<SettingsModal />

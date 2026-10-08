<script lang="ts">
  import { onMount } from 'svelte';
  import Header from '#lib/components/Header.svelte';
  import LessonFilterModal from '#lib/components/LessonFilterModal.svelte';
  import SettingsModal from '#lib/components/SettingsModal.svelte';
  import { HSK2_GRAMMAR_POINTS, type GrammarPoint } from '#lib/data/hsk2Grammar';
  import GrammarCard from '#lib/components/grammar/GrammarCard.svelte';

  // Phosphor Icons
  import GraduationCap from 'phosphor-svelte/lib/GraduationCap';
  import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
  import Lightning from 'phosphor-svelte/lib/Lightning';
  import Flame from 'phosphor-svelte/lib/Flame';
  import Funnel from 'phosphor-svelte/lib/Funnel';
  import Eye from 'phosphor-svelte/lib/Eye';
  import TreeEvergreen from 'phosphor-svelte/lib/TreeEvergreen';
  import Sparkle from 'phosphor-svelte/lib/Sparkle';
  import Broom from 'phosphor-svelte/lib/Broom';

  // State
  let searchQuery = $state('');
  let selectedLevel = $state<'all' | 'easy' | 'medium' | 'hard'>('all');
  let selectedOrigin = $state<'all' | 'inherited' | 'new' | 'advanced'>('all');
  let pinyinMode = $state<'always' | 'hover' | 'hidden'>('always');
  let learnedMap = $state<Record<number, boolean>>({});

  // LocalStorage keys
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

  function resetLearned() {
    learnedMap = {};
    try {
      localStorage.removeItem(STORAGE_KEY_LEARNED);
    } catch {}
  }

  // Filtered grammar points
  const filteredPoints = $derived(
    HSK2_GRAMMAR_POINTS.filter((item: GrammarPoint) => {
      // Level filter
      if (selectedLevel !== 'all' && item.level !== selectedLevel) return false;
      // Origin filter
      if (selectedOrigin !== 'all' && item.origin !== selectedOrigin) return false;
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchKey = item.grammarKey.toLowerCase().includes(q);
        const matchPinyin = item.grammarKeyPinyin.toLowerCase().includes(q);
        const matchExam = item.examples.some(
          ex => ex.hanzi.includes(q) || ex.meaning.toLowerCase().includes(q) || ex.pinyin.toLowerCase().includes(q)
        );
        if (!matchTitle && !matchKey && !matchPinyin && !matchExam) return false;
      }
      return true;
    })
  );

  // Computed stats
  const totalPoints = HSK2_GRAMMAR_POINTS.length;
  const learnedCount = $derived(
    Object.values(learnedMap).filter(Boolean).length
  );
  const progressPercent = $derived(
    Math.round((learnedCount / totalPoints) * 100)
  );
</script>

<svelte:head>
  <title>Ngữ Pháp HSK 2 Trọng Điểm | Ôn Tập HSK</title>
</svelte:head>

<Header />

<main class="flex-1 flex flex-col min-h-0 my-2 overflow-y-auto pr-1 space-y-3">
  <!-- Hero Section & Learning Dashboard -->
  <div class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-3xl p-3.5 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3.5">
    <div class="flex items-center gap-3 min-w-0">
      <div class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-2xs">
        <GraduationCap weight="duotone" class="w-6 h-6 sm:w-7 sm:h-7" />
      </div>
      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <h1 class="text-sm sm:text-base md:text-lg font-black text-slate-900 dark:text-slate-100 leading-tight">
            Trọng Điểm Ngữ Pháp HSK 2
          </h1>
          <span class="px-2 py-0.5 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-[10px] font-black uppercase shrink-0">
            18 Điểm
          </span>
        </div>
        <p class="text-[11px] sm:text-xs text-slate-500 dark:text-[#8E918F] mt-0.5 font-medium leading-relaxed">
          16 đề thi Hanban • Dễ đến Khó • Cú pháp Lego trực quan
        </p>
      </div>
    </div>

    <!-- Learning Dashboard Progress Bar -->
    <div class="shrink-0 w-full md:w-60 bg-slate-50 dark:bg-[#242526] p-2.5 sm:p-3 rounded-2xl border border-slate-200/70 dark:border-[#323436] space-y-1.5">
      <div class="flex items-center justify-between text-xs">
        <span class="font-bold text-slate-700 dark:text-slate-300">Tiến độ đã học</span>
        <span class="font-mono font-bold text-blue-600 dark:text-blue-400">{learnedCount}/{totalPoints} ({progressPercent}%)</span>
      </div>
      <div class="w-full h-2 rounded-full bg-slate-200 dark:bg-[#37393B] overflow-hidden">
        <div
          class="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-300 rounded-full"
          style={`width: ${progressPercent}%`}
        ></div>
      </div>
    </div>
  </div>

  <!-- Smart Filter & Search & Pinyin Switch Bar -->
  <div class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-3xl p-3 sm:p-4 shadow-xs space-y-3">
    <!-- Row 1: Search & Pinyin Mode Switch -->
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
      <!-- Search Input -->
      <div class="relative flex-1">
        <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
          <MagnifyingGlass weight="bold" class="w-4 h-4" />
        </div>
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Tìm điểm ngữ pháp, chữ Hán, Pinyin hoặc câu ví dụ..."
          class="w-full pl-9 pr-8 py-2 rounded-2xl bg-slate-50 dark:bg-[#242526] border border-slate-200 dark:border-[#323436] text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
        />
        {#if searchQuery}
          <button
            type="button"
            onclick={() => (searchQuery = '')}
            class="absolute inset-y-0 right-2.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer text-xs"
            title="Xóa tìm kiếm"
          >
            ✕
          </button>
        {/if}
      </div>

      <!-- Pinyin Mode Switch (3 options: Always, Hover, Hidden) -->
      <div class="flex items-center gap-1 p-1 rounded-2xl bg-slate-50 dark:bg-[#242526] border border-slate-200 dark:border-[#323436] self-start sm:self-auto shrink-0">
        <div class="flex items-center gap-1 px-2 text-[11px] font-bold text-slate-500 dark:text-[#8E918F] shrink-0">
          <Eye weight="duotone" class="w-3.5 h-3.5" />
          <span>Pinyin:</span>
        </div>
        <button
          type="button"
          onclick={() => setPinyinMode('always')}
          class={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
          class={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
          class={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            pinyinMode === 'hidden'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 dark:text-[#C4C7C5] hover:bg-slate-200/60 dark:hover:bg-[#323436]'
          }`}
        >
          Ẩn
        </button>
      </div>
    </div>

    <!-- Row 2: Level & Origin Filter Pills -->
    <div class="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-[#282A2C]">
      <!-- Level Pills -->
      <div class="flex flex-wrap items-center gap-1.5">
        <span class="text-[11px] font-bold text-slate-400 dark:text-[#8E918F] mr-1 flex items-center gap-1">
          <Funnel weight="duotone" class="w-3.5 h-3.5" />
          <span>Cấp độ:</span>
        </span>
        <button
          type="button"
          onclick={() => (selectedLevel = 'all')}
          class={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            selectedLevel === 'all'
              ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-900 border-transparent shadow-2xs'
              : 'bg-slate-50 dark:bg-[#242526] border-slate-200 dark:border-[#323436] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#323436]'
          }`}
        >
          Tất cả (18)
        </button>
        <button
          type="button"
          onclick={() => (selectedLevel = 'easy')}
          class={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            selectedLevel === 'easy'
              ? 'bg-emerald-600 text-white border-transparent shadow-2xs'
              : 'bg-emerald-50/70 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/60'
          }`}
        >
          <CheckCircle weight="duotone" class="w-3.5 h-3.5" />
          <span>Dễ (1-5)</span>
        </button>
        <button
          type="button"
          onclick={() => (selectedLevel = 'medium')}
          class={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            selectedLevel === 'medium'
              ? 'bg-amber-600 text-white border-transparent shadow-2xs'
              : 'bg-amber-50/70 text-amber-800 dark:bg-amber-950/30 dark:text-amber-300 border-amber-200 dark:border-amber-900/60'
          }`}
        >
          <Lightning weight="duotone" class="w-3.5 h-3.5" />
          <span>Trung bình (6-12)</span>
        </button>
        <button
          type="button"
          onclick={() => (selectedLevel = 'hard')}
          class={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            selectedLevel === 'hard'
              ? 'bg-rose-600 text-white border-transparent shadow-2xs'
              : 'bg-rose-50/70 text-rose-800 dark:bg-rose-950/30 dark:text-rose-300 border-rose-200 dark:border-rose-900/60'
          }`}
        >
          <Flame weight="duotone" class="w-3.5 h-3.5" />
          <span>Khó (13-18)</span>
        </button>
      </div>

      <!-- Origin Pills & Reset -->
      <div class="flex items-center gap-1.5">
        <button
          type="button"
          onclick={() => (selectedOrigin = selectedOrigin === 'inherited' ? 'all' : 'inherited')}
          class={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            selectedOrigin === 'inherited'
              ? 'bg-emerald-700 text-white border-transparent shadow-2xs'
              : 'bg-slate-50 dark:bg-[#242526] border-slate-200 dark:border-[#323436] text-slate-700 dark:text-slate-300 hover:bg-slate-100'
          }`}
          title="Lọc các điểm ngữ pháp kế thừa từ HSK 1"
        >
          <TreeEvergreen weight="duotone" class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Kế thừa HSK 1</span>
        </button>

        <button
          type="button"
          onclick={() => (selectedOrigin = selectedOrigin === 'new' ? 'all' : 'new')}
          class={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            selectedOrigin === 'new'
              ? 'bg-blue-700 text-white border-transparent shadow-2xs'
              : 'bg-slate-50 dark:bg-[#242526] border-slate-200 dark:border-[#323436] text-slate-700 dark:text-slate-300 hover:bg-slate-100'
          }`}
          title="Lọc các điểm ngữ pháp mới ở HSK 2"
        >
          <Sparkle weight="duotone" class="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Mới ở HSK 2</span>
        </button>

        {#if learnedCount > 0}
          <button
            type="button"
            onclick={resetLearned}
            class="inline-flex items-center gap-1 px-2 py-1 rounded-xl text-xs font-semibold text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
            title="Đặt lại trạng thái đã học"
          >
            <Broom weight="duotone" class="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        {/if}
      </div>
    </div>
  </div>

  <!-- Grammar Cards Grid Container -->
  {#if filteredPoints.length > 0}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
      {#each filteredPoints as point (point.id)}
        <GrammarCard
          {point}
          isLearned={Boolean(learnedMap[point.id])}
          {pinyinMode}
          onToggleLearned={toggleLearned}
        />
      {/each}
    </div>
  {:else}
    <!-- Empty state with Phosphor icon -->
    <div class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-3xl p-10 text-center space-y-3">
      <div class="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-[#282A2C] text-slate-400 mx-auto flex items-center justify-center">
        <MagnifyingGlass weight="duotone" class="w-6 h-6" />
      </div>
      <div>
        <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
          Không tìm thấy điểm ngữ pháp phù hợp
        </h3>
        <p class="text-xs text-slate-500 dark:text-[#8E918F] mt-1">
          Hãy thử đổi từ khóa tìm kiếm hoặc bỏ bớt các bộ lọc đang chọn.
        </p>
      </div>
      <button
        type="button"
        onclick={() => { searchQuery = ''; selectedLevel = 'all'; selectedOrigin = 'all'; }}
        class="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xs hover:bg-blue-700 transition-colors cursor-pointer"
      >
        Xóa tất cả bộ lọc
      </button>
    </div>
  {/if}
</main>

<LessonFilterModal />
<SettingsModal />

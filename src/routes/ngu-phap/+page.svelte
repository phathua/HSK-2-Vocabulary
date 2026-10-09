<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Header from '#lib/components/Header.svelte';
  import LessonFilterModal from '#lib/components/LessonFilterModal.svelte';
  import SettingsModal from '#lib/components/SettingsModal.svelte';
  import { HSK2_GRAMMAR_POINTS, type GrammarPoint } from '#lib/data/hsk2Grammar';
  import GrammarDetailView from '#lib/components/grammar/GrammarDetailView.svelte';
  import { GRAMMAR_THEMES, GRAMMAR_ICONS } from '#lib/components/grammar/grammarThemes';

  // Phosphor Icons
  import GraduationCap from 'phosphor-svelte/lib/GraduationCap';
  import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
  import Lightning from 'phosphor-svelte/lib/Lightning';
  import Flame from 'phosphor-svelte/lib/Flame';
  import TreeEvergreen from 'phosphor-svelte/lib/TreeEvergreen';
  import Sparkle from 'phosphor-svelte/lib/Sparkle';
  import CaretRight from 'phosphor-svelte/lib/CaretRight';
  import Check from 'phosphor-svelte/lib/Check';

  // State
  let searchQuery = $state('');
  let selectedLevel = $state<'all' | 'easy' | 'medium' | 'hard'>('all');
  let selectedOrigin = $state<'all' | 'inherited' | 'new' | 'advanced'>('all');
  let learnedMap = $state<Record<number, boolean>>({});
  let activeId = $state<number>(1);

  // LocalStorage keys
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

  // Filtered grammar points
  const filteredPoints = $derived(
    HSK2_GRAMMAR_POINTS.filter((item: GrammarPoint) => {
      if (selectedLevel !== 'all' && item.level !== selectedLevel) return false;
      if (selectedOrigin !== 'all' && item.origin !== selectedOrigin) return false;
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

  // Selected item on desktop
  const activePoint = $derived(
    HSK2_GRAMMAR_POINTS.find(p => p.id === activeId) || filteredPoints[0] || HSK2_GRAMMAR_POINTS[0]
  );

  const totalPoints = HSK2_GRAMMAR_POINTS.length;
  const learnedCount = $derived(
    Object.values(learnedMap).filter(Boolean).length
  );
  const progressPercent = $derived(
    Math.round((learnedCount / totalPoints) * 100)
  );

  function handleSelectPoint(point: GrammarPoint) {
    // Trên desktop: cập nhật activeId
    activeId = point.id;
    // Trên mobile (< 1024px): chuyển sang trang chi tiết full-page
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      goto(`/ngu-phap/${point.slug}`);
    }
  }
</script>

<svelte:head>
  <title>Ngữ Pháp HSK 2 Trọng Điểm | Ôn Tập HSK</title>
</svelte:head>

<Header />

<main class="flex-1 flex flex-col min-h-0 overflow-hidden space-y-2.5 pt-1.5 pb-1">
  <!-- Thanh Tìm Kiếm & Bộ Lọc Tinh Gọn -->
  <div class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-2xl p-2 sm:p-3 shadow-xs space-y-2 shrink-0">
    <!-- Dòng 1: Ô Tìm Kiếm -->
    <div class="relative w-full">
      <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
        <MagnifyingGlass weight="bold" class="w-4 h-4" />
      </div>
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Tìm điểm ngữ pháp, chữ Hán, Pinyin..."
        class="w-full pl-9 pr-8 py-1.5 sm:py-2 rounded-xl bg-slate-50 dark:bg-[#242526] border border-slate-200 dark:border-[#323436] text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
      />
      {#if searchQuery}
        <button
          type="button"
          onclick={() => (searchQuery = '')}
          class="absolute inset-y-0 right-2.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer text-xs"
        >
          ✕
        </button>
      {/if}
    </div>

    <!-- Dòng 2: Thanh Pill Lọc Cuộn Ngang Nhẹ Nhàng (Không bị tràn, viền line tương phản sắc nét) -->
    <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
      <!-- Cấp độ: Tất cả -->
      <button
        type="button"
        onclick={() => (selectedLevel = 'all')}
        class={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
          selectedLevel === 'all'
            ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-900 border-transparent ring-2 ring-slate-400 dark:ring-slate-300 shadow-xs'
            : 'bg-slate-50 dark:bg-[#242526] border-slate-200 dark:border-[#323436] text-slate-600 dark:text-slate-400 hover:bg-slate-100'
        }`}
      >
        Tất cả ({totalPoints})
      </button>

      <!-- Dễ -->
      <button
        type="button"
        onclick={() => (selectedLevel = selectedLevel === 'easy' ? 'all' : 'easy')}
        class={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
          selectedLevel === 'easy'
            ? 'bg-emerald-600 text-white border-transparent ring-2 ring-emerald-300 dark:ring-emerald-400 shadow-xs'
            : 'bg-emerald-50/70 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/60'
        }`}
      >
        <CheckCircle weight="duotone" class="w-3.5 h-3.5" />
        <span>Dễ (1-5)</span>
      </button>

      <!-- Trung bình -->
      <button
        type="button"
        onclick={() => (selectedLevel = selectedLevel === 'medium' ? 'all' : 'medium')}
        class={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
          selectedLevel === 'medium'
            ? 'bg-amber-600 text-white border-transparent ring-2 ring-amber-300 dark:ring-amber-400 shadow-xs'
            : 'bg-amber-50/70 text-amber-800 dark:bg-amber-950/30 dark:text-amber-300 border-amber-200 dark:border-amber-900/60'
        }`}
      >
        <Lightning weight="duotone" class="w-3.5 h-3.5" />
        <span>Vừa (6-12)</span>
      </button>

      <!-- Khó -->
      <button
        type="button"
        onclick={() => (selectedLevel = selectedLevel === 'hard' ? 'all' : 'hard')}
        class={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
          selectedLevel === 'hard'
            ? 'bg-rose-600 text-white border-transparent ring-2 ring-rose-300 dark:ring-rose-400 shadow-xs'
            : 'bg-rose-50/70 text-rose-800 dark:bg-rose-950/30 dark:text-rose-300 border-rose-200 dark:border-rose-900/60'
        }`}
      >
        <Flame weight="duotone" class="w-3.5 h-3.5" />
        <span>Khó (13-18)</span>
      </button>

      <div class="h-4 w-px bg-slate-200 dark:bg-[#323436] shrink-0 mx-0.5"></div>

      <!-- Nút Lọc Kế thừa HSK 1 (Sửa nét line sáng trắng tương phản cực rõ theo hình 2) -->
      <button
        type="button"
        onclick={() => (selectedOrigin = selectedOrigin === 'inherited' ? 'all' : 'inherited')}
        class={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
          selectedOrigin === 'inherited'
            ? 'bg-emerald-700 text-white border-white dark:border-white ring-2 ring-emerald-400 dark:ring-emerald-300 shadow-xs'
            : 'bg-slate-50 dark:bg-[#242526] border-slate-200 dark:border-[#323436] text-slate-700 dark:text-slate-300 hover:bg-slate-100'
        }`}
        title="Lọc các điểm ngữ pháp kế thừa từ HSK 1"
      >
        <TreeEvergreen weight="duotone" class="w-3.5 h-3.5 text-emerald-400" />
        <span>Kế thừa HSK 1</span>
      </button>

      <!-- Nút Lọc Mới ở HSK 2 (Sửa nét line sáng trắng tương phản theo hình 2) -->
      <button
        type="button"
        onclick={() => (selectedOrigin = selectedOrigin === 'new' ? 'all' : 'new')}
        class={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
          selectedOrigin === 'new'
            ? 'bg-blue-700 text-white border-white dark:border-white ring-2 ring-blue-400 dark:ring-blue-300 shadow-xs'
            : 'bg-slate-50 dark:bg-[#242526] border-slate-200 dark:border-[#323436] text-slate-700 dark:text-slate-300 hover:bg-slate-100'
        }`}
        title="Lọc các điểm ngữ pháp mới ở HSK 2"
      >
        <Sparkle weight="duotone" class="w-3.5 h-3.5 text-blue-400" />
        <span>Mới ở HSK 2</span>
      </button>
    </div>
  </div>

  <!-- Bố cục Responsive: Desktop 2 Cột (Trái danh mục, Phải chi tiết) / Mobile 1 Cột Danh mục -->
  <div class="flex-1 flex gap-3 min-h-0 overflow-hidden">
    <!-- Cột Trái (Desktop) hoặc Toàn Màn Hình (Mobile): Danh sách từng điểm ngữ pháp -->
    <div class="w-full lg:w-[42%] flex flex-col min-h-0 overflow-y-auto no-scrollbar space-y-2 p-2">
      {#if filteredPoints.length > 0}
        {#each filteredPoints as point (point.id)}
          {@const isSelected = activeId === point.id}
          {@const isLearned = Boolean(learnedMap[point.id])}
          {@const theme = GRAMMAR_THEMES[point.id] || GRAMMAR_THEMES[1]}
          {@const IconComponent = GRAMMAR_ICONS[point.id] || GraduationCap}

          <button
            type="button"
            onclick={() => handleSelectPoint(point)}
            class={`w-full text-left p-3 rounded-2xl border transition-all duration-150 cursor-pointer flex items-center justify-between gap-3 select-none active:scale-[0.98] ${
              isSelected
                ? `${theme.bg} ${theme.border} ${theme.darkBg} ${theme.darkBorder} shadow-sm ring-2 ring-inset ring-blue-500/35 dark:ring-blue-400/35`
                : 'bg-white dark:bg-[#1B1B1B] border-slate-200 dark:border-[#282A2C] hover:border-slate-300 dark:hover:border-[#37393B]'
            }`}
          >
            <!-- Bên trái: Phosphor Icon độc đáo + Tiêu đề + Chữ Hán -->
            <div class="flex items-center gap-3 min-w-0 flex-1">
              <!-- Icon khối riêng cho từng bài giống LessonFilterModal -->
              <div class={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-transform ${
                isSelected
                  ? `${theme.iconBg} ${theme.iconColor} ${theme.darkIconBg} ${theme.darkIconColor} scale-105`
                  : 'bg-slate-100 dark:bg-[#282A2C] text-slate-500 dark:text-neutral-400 border-transparent'
              }`}>
                <IconComponent weight={isSelected ? "duotone" : "regular"} class="w-5 h-5" />
              </div>

              <!-- Nội dung bài học -->
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-1.5">
                  <span class={`font-black text-xs sm:text-sm leading-snug line-clamp-2 ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-800 dark:text-[#E3E3E3]'}`}>
                    {point.id}. {point.title}
                  </span>
                </div>
                <div class="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500 dark:text-[#8E918F]">
                  <span class="font-bold text-amber-600 dark:text-amber-400">{point.grammarKey}</span>
                  <span class="font-mono text-slate-400 dark:text-neutral-500">• {point.grammarKeyPinyin}</span>
                </div>
              </div>
            </div>

            <!-- Bên phải: Check đã học + Mũi tên Caret -->
            <div class="flex items-center gap-2 shrink-0">
              {#if isLearned}
                <div class="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-2xs">
                  <Check weight="bold" class="w-3 h-3" />
                </div>
              {/if}
              <CaretRight weight="bold" class={`w-4 h-4 transition-transform ${isSelected ? 'text-blue-600 dark:text-blue-400 translate-x-0.5' : 'text-slate-300 dark:text-slate-600'}`} />
            </div>
          </button>
        {/each}
      {:else}
        <div class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-3xl p-8 text-center space-y-2">
          <div class="text-sm font-bold text-slate-800 dark:text-slate-200">
            Không tìm thấy điểm ngữ pháp phù hợp
          </div>
          <p class="text-xs text-slate-400">
            Hãy thử xóa bộ lọc tìm kiếm hoặc chọn danh mục khác.
          </p>
        </div>
      {/if}
    </div>

    <!-- Cột Phải (CHỈ HIỂN THỊ TRÊN DESKTOP >= lg): Khung xem chi tiết bài giảng -->
    <div class="hidden lg:flex flex-1 flex-col min-h-0 bg-slate-50/50 dark:bg-[#141415]/50 rounded-3xl border border-slate-200/80 dark:border-[#282A2C] p-4 overflow-y-auto no-scrollbar">
      {#if activePoint}
        <GrammarDetailView
          point={activePoint}
          isLearned={Boolean(learnedMap[activePoint.id])}
          onToggleLearned={toggleLearned}
        />
      {/if}
    </div>
  </div>
</main>

<LessonFilterModal />
<SettingsModal />

<script lang="ts">
  import Header from '#lib/components/Header.svelte';
  import GraduationCap from 'phosphor-svelte/lib/GraduationCap';
  import Sparkle from 'phosphor-svelte/lib/Sparkle';
  import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
  import BookOpen from 'phosphor-svelte/lib/BookOpen';
  import CaretDown from 'phosphor-svelte/lib/CaretDown';
  import CaretUp from 'phosphor-svelte/lib/CaretUp';
  import SettingsModal from '#lib/components/SettingsModal.svelte';
  import LessonFilterModal from '#lib/components/LessonFilterModal.svelte';
  import grammarData from '#lib/data/grammarPoints.json';

  let searchQuery = $state('');
  let expandedCategories = $state<Record<string, boolean>>({
    '一': true,
    '二': true
  });

  function toggleCategory(catNo: string) {
    expandedCategories[catNo] = !expandedCategories[catNo];
  }

  function expandAll() {
    for (const cat of grammarData) {
      expandedCategories[cat.category_no] = true;
    }
  }

  function collapseAll() {
    expandedCategories = {};
  }

  const filteredData = $derived(
    grammarData
      .map((cat) => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return cat;

        const catMatches = cat.category_name.toLowerCase().includes(query);
        const filteredItems = cat.items
          .map((sub) => {
            const subMatches = sub.sub_category.toLowerCase().includes(query);
            const filteredWords = (sub as any).words?.filter((w: any) =>
              w.hanzi.toLowerCase().includes(query) ||
              w.pinyin.toLowerCase().includes(query) ||
              w.meaning.toLowerCase().includes(query)
            );
            const filteredExamples = (sub as any).examples?.filter((e: any) =>
              e.hanzi.toLowerCase().includes(query) ||
              e.pinyin.toLowerCase().includes(query) ||
              e.meaning.toLowerCase().includes(query)
            );

            if (subMatches) return sub;
            if (filteredWords && filteredWords.length > 0) {
              return { ...sub, words: filteredWords };
            }
            if (filteredExamples && filteredExamples.length > 0) {
              return { ...sub, examples: filteredExamples };
            }
            return null;
          })
          .filter(Boolean);

        if (catMatches || filteredItems.length > 0) {
          return {
            ...cat,
            items: filteredItems.length > 0 ? filteredItems : cat.items
          };
        }
        return null;
      })
      .filter(Boolean) as typeof grammarData
  );
</script>

<svelte:head>
  <title>Ngữ pháp HSK 2 Chuẩn Hanban | Ôn Tập HSK</title>
</svelte:head>

<Header />

<main class="flex-1 flex flex-col min-h-0 my-3 overflow-y-auto pr-1">
  <!-- Hero Section -->
  <div class="bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent dark:from-purple-500/20 dark:via-purple-500/10 border border-purple-200 dark:border-purple-900/50 rounded-3xl p-5 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div class="flex items-center gap-4">
      <div class="w-13 h-13 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
        <GraduationCap weight="duotone" class="w-7 h-7" />
      </div>
      <div>
        <h1 class="text-lg md:text-xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span>Ngữ Pháp HSK 2 Chuẩn Hanban</span>
          <span class="text-xs px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300 font-bold">15 Chuyên đề</span>
        </h1>
        <p class="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
          Tài liệu chính thức bao gồm mẫu câu, từ loại, phiên âm Pinyin và dịch nghĩa tiếng Việt.
        </p>
      </div>
    </div>

    <!-- Quick action buttons -->
    <div class="flex items-center gap-2 shrink-0">
      <button
        onclick={expandAll}
        class="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#282A2C] bg-white dark:bg-[#1B1B1B] text-slate-700 dark:text-slate-300 hover:border-purple-300 transition-all cursor-pointer"
      >
        Mở tất cả
      </button>
      <button
        onclick={collapseAll}
        class="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#282A2C] bg-white dark:bg-[#1B1B1B] text-slate-700 dark:text-slate-300 hover:border-purple-300 transition-all cursor-pointer"
      >
        Thu gọn
      </button>
    </div>
  </div>

  <!-- Search Bar -->
  <div class="mb-4">
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <MagnifyingGlass class="w-4.5 h-4.5" />
      </div>
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Tìm kiếm mẫu câu, chữ Hán, Pinyin hoặc nghĩa tiếng Việt (vd: 比, 因为, 的, đã, đang)..."
        class="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-[#282A2C] bg-white dark:bg-[#1B1B1B] text-slate-900 dark:text-slate-100 text-xs md:text-sm placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all shadow-xs"
      />
    </div>
  </div>

  <!-- Categories Accordion / List -->
  <div class="space-y-3.5 pb-6">
    {#each filteredData as cat (cat.category_no)}
      {@const isOpen = expandedCategories[cat.category_no] || !!searchQuery}
      <div class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-3xl overflow-hidden shadow-xs transition-all">
        <!-- Category Header -->
        <button
          onclick={() => toggleCategory(cat.category_no)}
          class="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50/60 dark:hover:bg-[#202224] transition-colors cursor-pointer select-none"
        >
          <div class="flex items-center gap-3">
            <span class="w-7 h-7 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-black text-xs flex items-center justify-center shrink-0">
              {cat.category_no}
            </span>
            <span class="text-sm md:text-base font-extrabold text-slate-900 dark:text-slate-100">
              {cat.category_name}
            </span>
          </div>

          <div class="flex items-center gap-2 text-slate-400">
            <span class="text-xs font-medium text-slate-500 dark:text-slate-400">
              {cat.items.length} phần
            </span>
            {#if isOpen}
              <CaretUp weight="bold" class="w-4 h-4" />
            {:else}
              <CaretDown weight="bold" class="w-4 h-4" />
            {/if}
          </div>
        </button>

        <!-- Category Content -->
        {#if isOpen}
          <div class="px-5 pb-5 pt-1 border-t border-slate-100 dark:border-[#282A2C]/60 space-y-4">
            {#each cat.items as subItem}
              <div class="bg-purple-50/40 dark:bg-[#202224]/50 border border-purple-100/80 dark:border-purple-950/40 rounded-2xl p-4">
                <div class="flex items-center gap-2 mb-3">
                  <Sparkle weight="duotone" class="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <h3 class="text-xs md:text-sm font-bold text-purple-950 dark:text-purple-200">
                    {subItem.sub_category}
                  </h3>
                </div>

                <!-- Words List (e.g. Pronouns) -->
                {#if (subItem as any).words}
                  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {#each (subItem as any).words as w}
                      <div class="bg-white dark:bg-[#1B1B1B] border border-purple-100 dark:border-[#282A2C] rounded-xl p-2.5 shadow-2xs hover:border-purple-300 dark:hover:border-purple-800 transition-colors">
                        <div class="text-base font-bold text-slate-900 dark:text-slate-100">
                          {w.hanzi}
                        </div>
                        <div class="text-xs text-purple-600 dark:text-purple-400 font-medium">
                          {w.pinyin}
                        </div>
                        <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                          {w.meaning}
                        </div>
                      </div>
                    {/each}
                  </div>
                {/if}

                <!-- Examples List -->
                {#if (subItem as any).examples}
                  <div class="space-y-2">
                    {#each (subItem as any).examples as ex}
                      <div class="bg-white dark:bg-[#1B1B1B] border border-purple-100 dark:border-[#282A2C] rounded-xl p-3 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 hover:border-purple-300 dark:hover:border-purple-800 transition-colors">
                        <div>
                          <div class="text-sm md:text-base font-bold text-slate-900 dark:text-slate-100">
                            {ex.hanzi}
                          </div>
                          <div class="text-xs text-purple-600 dark:text-purple-400 font-medium">
                            {ex.pinyin}
                          </div>
                        </div>
                        <div class="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-medium sm:text-right shrink-0">
                          {ex.meaning}
                        </div>
                      </div>
                    {/each}
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {:else}
      <div class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-3xl p-8 text-center">
        <BookOpen class="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
        <div class="text-sm font-bold text-slate-700 dark:text-slate-300">Không tìm thấy ngữ pháp phù hợp</div>
        <p class="text-xs text-slate-500 mt-1">Hãy thử tìm với từ khóa khác như chữ Hán, Pinyin hoặc nghĩa tiếng Việt.</p>
      </div>
    {/each}
  </div>
</main>

<LessonFilterModal />
<SettingsModal />

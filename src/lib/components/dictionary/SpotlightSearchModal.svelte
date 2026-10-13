<script lang="ts">
  import { page } from '$app/state';
  import { appState } from '#lib/state/appState.svelte';
  import { goto } from '$app/navigation';
  import { fade, fly } from 'svelte/transition';
  import type { DictWord } from '#lib/data/dictionaryData';
  import { HSK2_GRAMMAR_POINTS, type GrammarPoint } from '#lib/data/hsk2Grammar';
  import { mockExamsData, type MockExamItem } from '#lib/data/mockExamsList';
  import DictionarySearchBar from './DictionarySearchBar.svelte';
  import X from 'phosphor-svelte/lib/X';
  import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
  import GraduationCap from 'phosphor-svelte/lib/GraduationCap';
  import Exam from 'phosphor-svelte/lib/Exam';
  import Clock from 'phosphor-svelte/lib/Clock';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';

  const isGrammarContext = $derived(page.url.pathname.startsWith('/ngu-phap'));
  const isExamContext = $derived(page.url.pathname.startsWith('/thi-thu'));

  let contextQuery = $state('');
  let contextInputEl = $state<HTMLInputElement | null>(null);

  $effect(() => {
    if (appState.spotlightOpen && (isGrammarContext || isExamContext)) {
      contextQuery = '';
      setTimeout(() => contextInputEl?.focus(), 60);
    }
  });

  function closeSpotlight() {
    appState.spotlightOpen = false;
  }

  function handleSelectWord(word: DictWord) {
    appState.spotlightOpen = false;
    goto(`/tu-vung?q=${encodeURIComponent(word.hanzi)}`);
  }

  function handleSelectGrammar(point: GrammarPoint) {
    appState.spotlightOpen = false;
    goto(`/ngu-phap?id=${point.id}`);
  }

  function handleSelectExam(exam: MockExamItem) {
    appState.spotlightOpen = false;
    goto(`/thi-thu/${exam.id}`);
  }

  // Lọc điểm ngữ pháp
  const grammarResults = $derived.by(() => {
    const q = contextQuery.trim().toLowerCase();
    if (!q) return HSK2_GRAMMAR_POINTS;
    return HSK2_GRAMMAR_POINTS.filter((p) => {
      return (
        p.title.toLowerCase().includes(q) ||
        p.grammarKey.toLowerCase().includes(q) ||
        p.grammarKeyPinyin.toLowerCase().includes(q) ||
        p.formulaSummary.toLowerCase().includes(q) ||
        p.keyTip.toLowerCase().includes(q)
      );
    });
  });

  // Lọc đề thi thử
  const examResults = $derived.by(() => {
    const q = contextQuery.trim().toLowerCase();
    if (!q) return mockExamsData;
    return mockExamsData.filter((e) => {
      return (
        e.code.toLowerCase().includes(q) ||
        e.title.toLowerCase().includes(q) ||
        e.tag.toLowerCase().includes(q)
      );
    });
  });

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape' && appState.spotlightOpen) {
      closeSpotlight();
    }
  }
</script>

<svelte:window onkeydown={handleKeyDown} />

{#if appState.spotlightOpen}
  <!-- Backdrop mờ nhẹ, giữ nguyên nội dung bên dưới như macOS Spotlight -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    transition:fade={{ duration: 180 }}
    onclick={closeSpotlight}
    class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-start p-3 sm:p-4 pt-16 sm:pt-24"
    role="dialog"
    tabindex="-1"
    aria-modal="true"
    aria-label="Tìm kiếm theo ngữ cảnh"
  >
    <!-- Modal Container -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <div
      transition:fly={{ y: -16, duration: 200 }}
      onclick={(e) => e.stopPropagation()}
      class="w-full max-w-2xl relative shadow-2xl rounded-3xl"
    >
      <!-- Nút đóng nhanh ở góc trên cùng bên phải -->
      <button
        type="button"
        onclick={closeSpotlight}
        class="absolute -top-10 right-1 text-white/80 hover:text-white flex items-center gap-1 text-xs font-semibold bg-black/30 hover:bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-xs transition-colors cursor-pointer"
        aria-label="Đóng tìm kiếm"
      >
        <span>Đóng</span>
        <kbd class="text-[10px] bg-white/20 px-1 py-0.5 rounded font-mono">Esc</kbd>
      </button>

      {#if isGrammarContext}
        <!-- ================= TÌM KIẾM NGỮ PHÁP (KHI Ở /ngu-phap) ================= -->
        <div class="bg-white dark:bg-[#1B1B1B] rounded-3xl border border-slate-200 dark:border-[#282A2C] shadow-2xl overflow-hidden flex flex-col max-h-[75vh]">
          <div class="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-[#282A2C] gap-3">
            <div class="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <GraduationCap weight="duotone" class="w-5 h-5" />
            </div>
            <input
              bind:this={contextInputEl}
              bind:value={contextQuery}
              type="text"
              placeholder="Tìm điểm ngữ pháp, cấu trúc câu HSK 2..."
              class="flex-1 bg-transparent border-none outline-hidden text-sm sm:text-base font-bold text-slate-800 dark:text-[#E3E3E3] placeholder-slate-400 dark:placeholder-[#8E918F]"
            />
            {#if contextQuery}
              <button
                type="button"
                onclick={() => (contextQuery = '')}
                class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-[#282A2C] text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X class="w-4 h-4" />
              </button>
            {/if}
          </div>

          <div class="flex-1 overflow-y-auto p-3 space-y-1.5">
            {#if grammarResults.length === 0}
              <div class="py-10 text-center text-xs text-slate-400 dark:text-[#8E918F]">
                Không tìm thấy điểm ngữ pháp phù hợp với "{contextQuery}"
              </div>
            {:else}
              {#each grammarResults as point (point.id)}
                <button
                  type="button"
                  onclick={() => handleSelectGrammar(point)}
                  class="w-full text-left p-3 rounded-2xl bg-slate-50 dark:bg-[#202124] hover:bg-purple-50 dark:hover:bg-purple-950/30 border border-slate-100 dark:border-[#282A2C] hover:border-purple-200 dark:hover:border-purple-900/50 transition-all flex items-center justify-between gap-3 cursor-pointer group"
                >
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-2 mb-0.5">
                      <span class="text-[10px] font-black px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300">
                        Điểm {point.id}
                      </span>
                      <span class="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
                        {point.grammarKey}
                      </span>
                      <span class="text-[11px] text-slate-400 dark:text-[#8E918F]">
                        {point.grammarKeyPinyin}
                      </span>
                    </div>
                    <h3 class="text-xs sm:text-sm font-bold text-slate-900 dark:text-[#E3E3E3] group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {point.title}
                    </h3>
                    <p class="text-[11px] text-slate-500 dark:text-[#8E918F] truncate mt-0.5">
                      {point.formulaSummary || point.keyTip}
                    </p>
                  </div>
                  <span class="text-[11px] font-bold text-purple-600 dark:text-purple-400 shrink-0 group-hover:translate-x-0.5 transition-transform">
                    Xem
                  </span>
                </button>
              {/each}
            {/if}
          </div>
        </div>

      {:else if isExamContext}
        <!-- ================= TÌM KIẾM ĐỀ THI (KHI Ở /thi-thu) ================= -->
        <div class="bg-white dark:bg-[#1B1B1B] rounded-3xl border border-slate-200 dark:border-[#282A2C] shadow-2xl overflow-hidden flex flex-col max-h-[75vh]">
          <div class="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-[#282A2C] gap-3">
            <div class="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
              <Exam weight="duotone" class="w-5 h-5" />
            </div>
            <input
              bind:this={contextInputEl}
              bind:value={contextQuery}
              type="text"
              placeholder="Tìm kiếm đề thi thử (Mã đề, tên đề, loại đề)..."
              class="flex-1 bg-transparent border-none outline-hidden text-sm sm:text-base font-bold text-slate-800 dark:text-[#E3E3E3] placeholder-slate-400 dark:placeholder-[#8E918F]"
            />
            {#if contextQuery}
              <button
                type="button"
                onclick={() => (contextQuery = '')}
                class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-[#282A2C] text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X class="w-4 h-4" />
              </button>
            {/if}
          </div>

          <div class="flex-1 overflow-y-auto p-3 space-y-1.5">
            {#if examResults.length === 0}
              <div class="py-10 text-center text-xs text-slate-400 dark:text-[#8E918F]">
                Không tìm thấy đề thi phù hợp với "{contextQuery}"
              </div>
            {:else}
              {#each examResults as exam (exam.id)}
                <button
                  type="button"
                  onclick={() => handleSelectExam(exam)}
                  class="w-full text-left p-3 rounded-2xl bg-slate-50 dark:bg-[#202124] hover:bg-orange-50 dark:hover:bg-orange-950/30 border border-slate-100 dark:border-[#282A2C] hover:border-orange-200 dark:border-orange-900/50 transition-all flex items-center justify-between gap-3 cursor-pointer group"
                >
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-2 mb-0.5">
                      <span class="text-[10px] font-black px-1.5 py-0.5 rounded bg-orange-100 dark:bg-orange-900/60 text-orange-700 dark:text-orange-300">
                        {exam.code}
                      </span>
                      <span class="text-[11px] font-semibold text-slate-400 dark:text-[#8E918F]">
                        {exam.tag}
                      </span>
                    </div>
                    <h3 class="text-xs sm:text-sm font-bold text-slate-900 dark:text-[#E3E3E3] group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {exam.title}
                    </h3>
                    <div class="flex items-center gap-2 text-[11px] text-slate-500 dark:text-[#8E918F] mt-1">
                      <span>{exam.duration}</span>
                      <span>•</span>
                      <span>{exam.questionsCount} câu</span>
                    </div>
                  </div>
                  <span class="text-[11px] font-bold text-orange-600 dark:text-orange-400 shrink-0 group-hover:translate-x-0.5 transition-transform">
                    Vào thi
                  </span>
                </button>
              {/each}
            {/if}
          </div>
        </div>

      {:else}
        <!-- ================= TÌM KIẾM TỪ ĐIỂN (TRANG CHỦ / TỪ ĐIỂN) ================= -->
        <DictionarySearchBar
          autoFocus={true}
          onSelectWord={handleSelectWord}
          placeholder="Tra từ bằng Chữ Hán, Pinyin, Hán Việt hoặc Tiếng Việt..."
        />
      {/if}
    </div>
  </div>
{/if}

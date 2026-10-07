<script lang="ts">
  import { appState } from '#lib/state/appState.svelte';
  import BookBookmark from 'phosphor-svelte/lib/BookBookmark';
  import X from 'phosphor-svelte/lib/X';
</script>

{#if appState.filterModalOpen}
  <div class="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
    <div class="w-full max-w-sm max-h-[85vh] flex flex-col bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 overflow-hidden animate-[pop_0.15s_ease]">
      
      <!-- Modal Header -->
      <div class="flex items-center justify-between mb-2 shrink-0">
        <h3 class="font-extrabold text-base text-slate-900 flex items-center gap-2">
          <BookBookmark weight="duotone" class="w-5 h-5 text-blue-600" />
          <span>Chọn bài học</span>
        </h3>
        <button
          type="button"
          onclick={() => (appState.filterModalOpen = false)}
          class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer"
        >
          <X weight="bold" class="w-4 h-4" />
        </button>
      </div>

      <!-- 2 CHẾ ĐỘ: HSK 1 & HSK 2 Switcher -->
      <div class="flex gap-2 p-1 bg-slate-100 rounded-2xl mb-3 shrink-0">
        <button
          type="button"
          onclick={() => appState.setLevel('HSK1')}
          class={`flex-1 py-2 px-3 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            appState.currentLevel === 'HSK1'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>HSK 1 (150+ từ)</span>
        </button>
        <button
          type="button"
          onclick={() => appState.setLevel('HSK2')}
          class={`flex-1 py-2 px-3 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            appState.currentLevel === 'HSK2'
              ? 'bg-orange-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>HSK 2 (168 từ)</span>
        </button>
      </div>

      <p class="text-xs text-slate-500 mb-3 font-medium shrink-0">
        {appState.currentLevel}: Đã chọn <b class="text-slate-800">{appState.filteredVocab.length}/{appState.allVocab.length} từ</b>.
      </p>

      <!-- Quick Action Buttons -->
      <div class="flex gap-2 mb-3 shrink-0">
        <button
          type="button"
          onclick={() => appState.selectAllLessons()}
          class="flex-1 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-800 cursor-pointer"
        >
          Chọn tất cả (15)
        </button>
        <button
          type="button"
          onclick={() => appState.deselectAllLessons()}
          class="flex-1 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-800 cursor-pointer"
        >
          Chỉ bài 1
        </button>
      </div>

      <!-- Scrollable list of 15 lessons according to active level -->
      <div class="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-1.5 pr-0.5 mb-3">
        {#each appState.allLessons as info (info.lesson)}
          {@const isSelected = !!appState.selectedLessons[info.lesson]}
          {@const count = appState.allVocab.filter((v: any) => v.lesson === info.lesson).length}
          <button
            type="button"
            onclick={() => appState.toggleLesson(info.lesson)}
            class={`w-full text-left p-2.5 rounded-2xl border transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
              isSelected
                ? appState.currentLevel === 'HSK1'
                  ? 'bg-blue-50/80 border-blue-400 text-slate-900 shadow-2xs'
                  : 'bg-orange-50/80 border-orange-400 text-slate-900 shadow-2xs'
                : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
            }`}
          >
            <div class="flex items-center gap-2.5 min-w-0">
              <div class={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                isSelected
                  ? appState.currentLevel === 'HSK1' ? 'bg-blue-600 text-white' : 'bg-orange-500 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}>
                B{info.lesson}
              </div>
              <div class="min-w-0">
                <div class="font-extrabold text-xs text-slate-900 truncate">
                  {info.titleZh}
                </div>
                <div class="text-[11px] text-slate-500 truncate">
                  {info.titleVi}
                </div>
              </div>
            </div>
            <div class={`text-xs font-black px-2 py-0.5 rounded-full shrink-0 ${
              isSelected
                ? appState.currentLevel === 'HSK1' ? 'bg-blue-200 text-blue-900' : 'bg-orange-200 text-orange-900'
                : 'bg-slate-200 text-slate-600'
            }`}>
              {count} từ
            </div>
          </button>
        {/each}
      </div>

      <button
        type="button"
        onclick={() => (appState.filterModalOpen = false)}
        class="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-extrabold shrink-0 cursor-pointer"
      >
        Xong ({appState.filteredVocab.length} từ)
      </button>
    </div>
  </div>
{/if}

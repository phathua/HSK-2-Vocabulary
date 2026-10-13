<script lang="ts">
  import { appState } from '#lib/state/appState.svelte';
  import { goto } from '$app/navigation';
  import { fade, fly } from 'svelte/transition';
  import type { DictWord } from '#lib/data/dictionaryData';
  import DictionarySearchBar from './DictionarySearchBar.svelte';
  import X from 'phosphor-svelte/lib/X';

  function closeSpotlight() {
    appState.spotlightOpen = false;
  }

  function handleSelectWord(word: DictWord) {
    appState.spotlightOpen = false;
    goto(`/tu-vung?q=${encodeURIComponent(word.hanzi)}`);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape' && appState.spotlightOpen) {
      closeSpotlight();
    }
  }
</script>

<svelte:window onkeydown={handleKeyDown} />

{#if appState.spotlightOpen}
  <!-- Backdrop mờ nhẹ, giữ nguyên nội dung bên dưới như Spotlight macOS -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    transition:fade={{ duration: 180 }}
    onclick={closeSpotlight}
    class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-start p-3 sm:p-4 pt-16 sm:pt-24"
    role="dialog"
    tabindex="-1"
    aria-modal="true"
    aria-label="Tìm kiếm từ điển HSK Spotlight"
  >
    <!-- Modal Container -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <div
      transition:fly={{ y: -16, duration: 200 }}
      onclick={(e) => e.stopPropagation()}
      class="w-full max-w-2xl relative shadow-2xl rounded-3xl"
    >
      <DictionarySearchBar
        autoFocus={true}
        onSelectWord={handleSelectWord}
        placeholder="Spotlight: Tra từ bằng Chữ Hán, Pinyin, Hán Việt hoặc Tiếng Việt..."
      />

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
    </div>
  </div>
{/if}

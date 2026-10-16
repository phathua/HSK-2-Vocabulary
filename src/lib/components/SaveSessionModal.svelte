<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { savedSessionState } from '#lib/state/savedSessionState.svelte';
  import FloppyDisk from 'phosphor-svelte/lib/FloppyDisk';
  import X from 'phosphor-svelte/lib/X';
  import PencilLine from 'phosphor-svelte/lib/PencilLine';

  let inputEl: HTMLInputElement | null = $state(null);

  $effect(() => {
    if (savedSessionState.isSaveModalOpen) {
      requestAnimationFrame(() => {
        inputEl?.focus();
        inputEl?.select();
      });
    }
  });

  function handleSubmit() {
    savedSessionState.saveCurrentSession();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!savedSessionState.isSaveModalOpen) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      savedSessionState.closeSaveModal();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if savedSessionState.isSaveModalOpen}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
    transition:fade={{ duration: 150 }}
  >
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="w-full max-w-md bg-white dark:bg-[#1E1F20] border border-slate-200 dark:border-[#2C2D2F] rounded-3xl p-5 shadow-2xl relative overflow-hidden animate-in"
      transition:fly={{ y: 20, duration: 200 }}
      onclick={(e) => e.stopPropagation()}
    >
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2.5">
          <div class="w-10 h-10 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50 flex items-center justify-center shrink-0">
            <FloppyDisk weight="regular" class="w-5 h-5" />
          </div>
          <h2 class="text-base font-black text-slate-900 dark:text-[#E3E3E3]">
            Lưu tiến độ
          </h2>
        </div>

        <button
          type="button"
          onclick={() => savedSessionState.closeSaveModal()}
          class="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#282A2C] text-slate-500 hover:text-slate-900 dark:text-[#8E918F] dark:hover:text-[#E3E3E3] flex items-center justify-center transition-colors cursor-pointer shrink-0"
          title="Đóng"
          aria-label="Đóng"
        >
          <X weight="bold" class="w-4 h-4" />
        </button>
      </div>

      <!-- Preview Snapshot -->
      <div class="mb-4 p-3 bg-slate-50 dark:bg-[#242628] rounded-2xl border border-slate-200/70 dark:border-[#323538] flex items-center justify-between text-xs font-bold text-slate-600 dark:text-[#C4C7C5]">
        <div class="flex items-center gap-2">
          <span class="px-2 py-0.5 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-black">
            {savedSessionState.currentTabLabel}
          </span>
          <span>Tiến độ: <strong class="text-slate-900 dark:text-[#E3E3E3] font-black">{savedSessionState.currentProgressPercent}%</strong></span>
        </div>
        <div class="text-slate-500 dark:text-[#8E918F]">
          Điểm: <strong class="text-blue-600 dark:text-blue-400 font-black">{savedSessionState.currentScoreText}</strong>
        </div>
      </div>

      <!-- Input Form -->
      <div class="space-y-1.5 mb-5">
        <label for="session-name-input" class="block text-xs font-bold text-slate-600 dark:text-[#A8AAA8]">
          Tên phiên học
        </label>
        <div class="relative">
          <input
            id="session-name-input"
            bind:this={inputEl}
            type="text"
            bind:value={savedSessionState.saveNameInput}
            placeholder="Nhập tên gợi nhớ..."
            class="w-full h-11 px-3.5 bg-slate-50 dark:bg-[#282A2C] border-2 border-slate-200 dark:border-[#37393B] focus:border-blue-500 dark:focus:border-blue-400 rounded-xl text-sm font-bold text-slate-900 dark:text-[#E3E3E3] outline-none transition-colors"
            autocomplete="off"
          />
          <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <PencilLine weight="bold" class="w-4 h-4" />
          </div>
        </div>
      </div>

      <!-- Actions: Đơn giản, loại bỏ nút huỷ dư thừa vì đã có nút X ở trên -->
      <div>
        <button
          type="button"
          onclick={handleSubmit}
          class="w-full h-11 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-black text-sm rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <FloppyDisk weight="regular" class="w-4 h-4" />
          <span>Lưu tiến độ</span>
        </button>
      </div>
    </div>
  </div>
{/if}

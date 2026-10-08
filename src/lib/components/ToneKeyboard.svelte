<script lang="ts">
  import Keyboard from 'phosphor-svelte/lib/Keyboard';
  import ArrowsOutSimple from 'phosphor-svelte/lib/ArrowsOutSimple';
  import ArrowsInSimple from 'phosphor-svelte/lib/ArrowsInSimple';

  let { onInsertChar, disabled = false } = $props<{
    onInsertChar: (ch: string) => void;
    disabled?: boolean;
  }>();

  let isExpanded = $state(false);

  const TONES = [
    'ā', 'á', 'ǎ', 'à',
    'ē', 'é', 'ě', 'è',
    'ī', 'í', 'ǐ', 'ì',
    'ō', 'ó', 'ǒ', 'ò',
    'ū', 'ú', 'ǔ', 'ù',
    'ǖ', 'ǘ', 'ǚ', 'ǜ', 'ü'
  ];
</script>

<div class="bg-white dark:bg-[#1B1B1B] p-1.5 rounded-2xl border border-slate-200 dark:border-[#282A2C] shadow-2xs transition-colors">
  <!-- Top header bar: icon nhãn + nút Thu gọn/Mở rộng -->
  <div class="flex items-center justify-between px-1 pb-1">
    <span class="text-[10px] font-black text-slate-400 dark:text-[#8E918F] flex items-center gap-1 tracking-wider uppercase">
      <Keyboard weight="duotone" class="w-3.5 h-3.5 text-blue-500" />
      <span>Bảng dấu Pinyin</span>
    </span>

    <button
      type="button"
      onclick={() => (isExpanded = !isExpanded)}
      class="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-[#282A2C] dark:hover:bg-[#37393B] text-slate-600 dark:text-[#C4C7C5] flex items-center gap-1 transition-all cursor-pointer active:scale-95"
      title={isExpanded ? 'Thu gọn thành 1 hàng' : 'Mở rộng toàn bộ bảng dấu'}
    >
      {#if isExpanded}
        <ArrowsInSimple weight="bold" class="w-3 h-3 text-blue-500" />
        <span>Thu gọn</span>
      {:else}
        <ArrowsOutSimple weight="bold" class="w-3 h-3 text-blue-500" />
        <span>Mở rộng ({TONES.length})</span>
      {/if}
    </button>
  </div>

  {#if isExpanded}
    <!-- Expanded view: Hiển thị dạng lưới trực quan toàn bộ các nguyên âm có dấu -->
    <div class="grid grid-cols-6 sm:grid-cols-9 gap-1 pt-0.5">
      {#each TONES as ch (ch)}
        <button
          type="button"
          disabled={disabled}
          onclick={() => onInsertChar(ch)}
          class="h-9 sm:h-10 rounded-xl bg-slate-50 hover:bg-blue-50 dark:bg-[#282A2C] dark:hover:bg-[#37393B] hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-[#37393B] hover:border-blue-300 dark:hover:border-blue-500/50 text-slate-800 dark:text-[#E3E3E3] text-sm sm:text-base font-extrabold flex items-center justify-center active:scale-90 transition-all shadow-2xs cursor-pointer disabled:opacity-50"
        >
          {ch}
        </button>
      {/each}
    </div>
  {:else}
    <!-- Collapsed view: Cuộn ngang 1 hàng gọn gàng -->
    <div class="flex items-center gap-1 overflow-x-auto no-scrollbar pt-0.5">
      {#each TONES as ch (ch)}
        <button
          type="button"
          disabled={disabled}
          onclick={() => onInsertChar(ch)}
          class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-50 hover:bg-blue-50 dark:bg-[#282A2C] dark:hover:bg-[#37393B] hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-[#37393B] hover:border-blue-300 dark:hover:border-blue-500/50 text-slate-800 dark:text-[#E3E3E3] text-sm sm:text-base font-extrabold flex items-center justify-center shrink-0 active:scale-90 transition-all shadow-2xs cursor-pointer disabled:opacity-50"
        >
          {ch}
        </button>
      {/each}
    </div>
  {/if}
</div>

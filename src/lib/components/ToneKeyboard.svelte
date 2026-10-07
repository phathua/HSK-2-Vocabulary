<script lang="ts">
  import Keyboard from 'phosphor-svelte/lib/Keyboard';

  let { onInsertChar, disabled = false } = $props<{
    onInsertChar: (ch: string) => void;
    disabled?: boolean;
  }>();

  const TONES = [
    'ā', 'á', 'ǎ', 'à',
    'ē', 'é', 'ě', 'è',
    'ī', 'í', 'ǐ', 'ì',
    'ō', 'ó', 'ǒ', 'ò',
    'ū', 'ú', 'ǔ', 'ù',
    'ǖ', 'ǘ', 'ǚ', 'ǜ', 'ü'
  ];
</script>

<div class="flex items-center gap-1 bg-white p-1.5 rounded-2xl border border-slate-200 overflow-x-auto no-scrollbar">
  <span class="text-[10px] font-black text-slate-400 px-1 shrink-0 flex items-center gap-0.5">
    <Keyboard weight="duotone" class="w-3.5 h-3.5" />
    DẤU:
  </span>
  {#each TONES as ch (ch)}
    <button
      type="button"
      disabled={disabled}
      onclick={() => onInsertChar(ch)}
      class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-400 border border-slate-200 text-slate-800 text-base font-extrabold flex items-center justify-center shrink-0 active:scale-90 transition-all shadow-2xs cursor-pointer disabled:opacity-50"
    >
      {ch}
    </button>
  {/each}
</div>

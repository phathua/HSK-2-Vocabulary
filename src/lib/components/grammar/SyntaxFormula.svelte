<script lang="ts">
  import type { LegoComponent } from '#lib/data/hsk2Grammar';
  import { speakChinese } from '#lib/utils/speech';
  import Plus from 'phosphor-svelte/lib/Plus';

  let { components = [], formulaSummary = '' } = $props<{
    components: LegoComponent[];
    formulaSummary: string;
  }>();

  // Role visual token mapping
  function getRoleStyles(role: LegoComponent['role']) {
    switch (role) {
      case 'subject':
        return 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/60';
      case 'keyword':
        return 'bg-amber-100 text-amber-900 border-amber-300 ring-1 ring-amber-400/40 shadow-xs dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-700/80';
      case 'verb':
        return 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/60';
      case 'object':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60';
      case 'particle':
        return 'bg-violet-50 text-violet-800 border-violet-200 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-800/60';
      case 'modifier':
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800/60 dark:text-slate-300 dark:border-slate-700';
    }
  }

  function handleSpeak(label: string) {
    // Nếu khối là chữ Hán, phát âm trực tiếp
    const hanziOnly = label.replace(/[^\u4e00-\u9fa5]/g, '');
    if (hanziOnly) {
      speakChinese(hanziOnly, 0.8);
    }
  }
</script>

<div class="space-y-2">
  <!-- Interactive Lego Formula Bar -->
  <div class="flex flex-wrap items-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 rounded-2xl bg-slate-50/80 dark:bg-[#1A1A1B] border border-slate-200/70 dark:border-[#282A2C]">
    {#each components as comp, idx}
      <button
        type="button"
        onclick={() => handleSpeak(comp.label)}
        class={`inline-flex flex-col items-center justify-center px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border text-center transition-all cursor-pointer active:scale-95 group focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 ${getRoleStyles(comp.role)}`}
        title="Nhấn để nghe nếu có chữ Hán"
      >
        <span class="text-xs sm:text-sm font-bold leading-tight group-hover:scale-105 transition-transform">
          {comp.label}
        </span>
        <span class="text-[10px] sm:text-[11px] font-medium opacity-75 mt-0.5 tracking-tight">
          {comp.pinyin}
        </span>
      </button>

      {#if idx < components.length - 1}
        <div class="flex items-center justify-center text-slate-400 dark:text-slate-500 shrink-0 select-none">
          <Plus weight="bold" class="w-3.5 h-3.5" />
        </div>
      {/if}
    {/each}
  </div>

  <!-- Formula summary string -->
  {#if formulaSummary}
    <div class="text-[11px] sm:text-xs text-slate-500 dark:text-[#8E918F] px-1 font-mono tracking-tight leading-relaxed">
      <span class="font-semibold text-slate-700 dark:text-slate-300">Quy tắc:</span> {formulaSummary}
    </div>
  {/if}
</div>

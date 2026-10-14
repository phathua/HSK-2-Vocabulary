<script lang="ts">
  import { examDictState } from '#lib/state/examDictState.svelte';
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
  import X from 'phosphor-svelte/lib/X';
  import BookOpen from 'phosphor-svelte/lib/BookOpen';

  let tooltipEl: HTMLElement | null = $state(null);
  let coords = $state({ top: 0, left: 0, placement: 'top' as 'top' | 'bottom' });

  function calculatePosition() {
    if (!examDictState.isOpen || !examDictState.targetRect || typeof window === 'undefined') return;

    const rect = examDictState.targetRect;
    const tooltipWidth = tooltipEl ? tooltipEl.offsetWidth : 260;
    const tooltipHeight = tooltipEl ? tooltipEl.offsetHeight : 140;

    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;

    // Xác định đặt trên hay dưới tùy theo khoảng trống
    let placement: 'top' | 'bottom' = 'top';
    let top = 0;

    if (spaceAbove >= tooltipHeight + 12 || spaceAbove > spaceBelow) {
      placement = 'top';
      top = rect.top - tooltipHeight - 8;
    } else {
      placement = 'bottom';
      top = rect.bottom + 8;
    }

    // Đảm bảo không vượt quá biên trên và biên dưới màn hình
    top = Math.max(8, Math.min(window.innerHeight - tooltipHeight - 8, top));

    // Căn giữa theo chiều ngang đối với từ đang chọn, giới hạn không vượt mép màn hình
    let left = rect.left + rect.width / 2 - tooltipWidth / 2;
    left = Math.max(10, Math.min(window.innerWidth - tooltipWidth - 10, left));

    coords = { top, left, placement };
  }

  $effect(() => {
    if (examDictState.isOpen && examDictState.targetRect) {
      // Tính toán ngay và sau 1 frame khi DOM đã render kích thước thực
      calculatePosition();
      requestAnimationFrame(() => calculatePosition());
    }
  });

  function playPronunciation(text: string) {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
      } catch {}
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && examDictState.isOpen) {
      examDictState.hide();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} onresize={calculatePosition} onscroll={calculatePosition} />

{#if examDictState.isOpen && examDictState.wordData}
  {@const word = examDictState.wordData}
  <div
    bind:this={tooltipEl}
    role="tooltip"
    class="fixed z-70 w-[270px] sm:w-[300px] max-w-[calc(100vw-20px)] bg-white/98 dark:bg-[#1C1D1F]/98 backdrop-blur-md border border-slate-200/90 dark:border-[#333538] rounded-2xl shadow-xl p-3 sm:p-3.5 text-left transition-all animate-in fade-in zoom-in-95 duration-150 select-text"
    style="top: {coords.top}px; left: {coords.left}px;"
    onmouseenter={() => examDictState.cancelHide()}
    onmouseleave={() => examDictState.scheduleHide(200)}
  >
    <!-- Header: Chữ Hán, Pinyin, Hán Việt, Nút phát âm & Nút đóng -->
    <div class="flex items-start justify-between gap-2 pb-2 border-b border-slate-100 dark:border-neutral-800">
      <div class="min-w-0">
        <div class="flex items-center gap-2">
          <span class="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-[#F0F0F0]">
            {word.hanzi}
          </span>
          <button
            type="button"
            onclick={() => playPronunciation(word.hanzi)}
            class="w-6 h-6 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/60 flex items-center justify-center cursor-pointer transition-colors"
            title="Nghe phát âm chuẩn"
            aria-label="Phát âm"
          >
            <SpeakerHigh weight="bold" class="w-3.5 h-3.5" />
          </button>
          <span class="px-1.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200/80 dark:border-orange-900/60">
            HSK {word.hskLevel}
          </span>
        </div>

        <div class="flex items-center gap-2 mt-0.5 text-xs text-slate-500 dark:text-neutral-400 font-sans">
          <span class="font-bold text-amber-600 dark:text-amber-400">{word.pinyin}</span>
          {#if word.hanViet}
            <span class="text-[11px] text-slate-400 dark:text-neutral-500 font-medium">[{word.hanViet}]</span>
          {/if}
        </div>
      </div>

      <button
        type="button"
        onclick={() => examDictState.hide()}
        class="w-6 h-6 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-neutral-200 hover:bg-slate-100 dark:hover:bg-neutral-800 flex items-center justify-center cursor-pointer transition-colors"
        aria-label="Đóng tra từ"
      >
        <X weight="bold" class="w-3.5 h-3.5" />
      </button>
    </div>

    <!-- Body: Từ loại & Nghĩa tiếng Việt -->
    <div class="pt-2 space-y-1">
      {#if word.partOfSpeech}
        <div class="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-neutral-400">
          {word.partOfSpeech}
        </div>
      {/if}

      <div class="text-xs sm:text-sm font-semibold text-slate-800 dark:text-[#E3E3E3] leading-snug">
        {word.viet}
      </div>

      {#if word.vi_meaning_short && word.vi_meaning_short !== word.viet}
        <div class="text-[11px] text-slate-500 dark:text-neutral-400 italic">
          {word.vi_meaning_short}
        </div>
      {/if}
    </div>
  </div>
{/if}

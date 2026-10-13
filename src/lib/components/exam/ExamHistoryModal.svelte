<script lang="ts">
  import { examHistoryState } from '#lib/state/examHistoryState.svelte';
  import { fade, fly } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import X from 'phosphor-svelte/lib/X';
  import Trophy from 'phosphor-svelte/lib/Trophy';
  import Clock from 'phosphor-svelte/lib/Clock';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
  import XCircle from 'phosphor-svelte/lib/XCircle';
  import Play from 'phosphor-svelte/lib/Play';
  import ArrowRight from 'phosphor-svelte/lib/ArrowRight';

  function closeModal() {
    examHistoryState.isHistoryModalOpen = false;
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape' && examHistoryState.isHistoryModalOpen) {
      closeModal();
    }
  }

  function formatDate(isoStr: string): string {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoStr;
    }
  }
</script>

<svelte:window onkeydown={handleKeyDown} />

{#if examHistoryState.isHistoryModalOpen}
  <!-- Backdrop -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    transition:fade={{ duration: 180 }}
    onclick={closeModal}
    class="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
    role="dialog"
    tabindex="-1"
    aria-modal="true"
    aria-label="Lịch sử thi thử HSK 2"
  >
    <!-- Modal Card -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <div
      transition:fly={{ y: 20, duration: 200 }}
      onclick={(e) => e.stopPropagation()}
      class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
    >
      <!-- Modal Header -->
      <div class="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-[#282A2C] shrink-0">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
            <Trophy weight="duotone" class="w-5 h-5" />
          </div>
          <div>
            <h2 class="text-sm sm:text-base font-black text-slate-900 dark:text-[#E3E3E3] leading-tight">
              Lịch sử làm bài thi
            </h2>
            <p class="text-[11px] text-slate-500 dark:text-[#8E918F] mt-0.5">
              Đã hoàn thành {examHistoryState.completedExamsCount}/33 đề thi thử
            </p>
          </div>
        </div>

        <button
          type="button"
          onclick={closeModal}
          class="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#282A2C] hover:bg-slate-200 dark:hover:bg-[#37393B] text-slate-600 dark:text-[#C4C7C5] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X weight="bold" class="w-4 h-4" />
        </button>
      </div>

      <!-- History List Body -->
      <div class="flex-1 overflow-y-auto p-4 space-y-2.5">
        {#if examHistoryState.records.length === 0}
          <div class="py-12 flex flex-col items-center justify-center text-center">
            <div class="w-16 h-16 rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-500 flex items-center justify-center mb-3">
              <Clock weight="duotone" class="w-8 h-8" />
            </div>
            <p class="text-sm font-bold text-slate-800 dark:text-[#E3E3E3]">
              Chưa có lịch sử làm bài
            </p>
            <p class="text-xs text-slate-400 dark:text-[#8E918F] mt-1 max-w-xs">
              Hãy chọn một đề thi trong danh sách để bắt đầu làm bài thi thử HSK 2 ngay hôm nay!
            </p>
          </div>
        {:else}
          {#each examHistoryState.records as record (record.id)}
            <div
              class="bg-slate-50 dark:bg-[#202124] border border-slate-200/80 dark:border-[#282A2C] rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-colors"
            >
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-mono font-bold text-xs text-orange-600 dark:text-orange-400">
                    {record.examCode}
                  </span>
                  <span class="text-[10px] text-slate-400 dark:text-[#8E918F]">
                    {formatDate(record.completedAt)}
                  </span>
                </div>
                <h3 class="text-xs font-bold text-slate-800 dark:text-[#E3E3E3] truncate">
                  {record.title}
                </h3>
                <div class="flex items-center gap-3 text-[11px] text-slate-500 dark:text-[#8E918F] mt-1">
                  <span>Nghe: <b class="text-slate-700 dark:text-neutral-300">{record.listeningScore}đ</b> ({record.listeningCorrect}/35)</span>
                  <span>•</span>
                  <span>Đọc: <b class="text-slate-700 dark:text-neutral-300">{record.readingScore}đ</b> ({record.readingCorrect}/25)</span>
                </div>
              </div>

              <div class="flex items-center sm:flex-col items-end gap-1.5 shrink-0 justify-between sm:justify-center">
                <div class="flex items-center gap-1.5">
                  {#if record.isPassed}
                    <span class="px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-black flex items-center gap-1">
                      <CheckCircle weight="fill" class="w-3.5 h-3.5 text-emerald-500" />
                      <span>{record.scoreTotal}/200 (Đạt)</span>
                    </span>
                  {:else}
                    <span class="px-2 py-0.5 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-black flex items-center gap-1">
                      <XCircle weight="fill" class="w-3.5 h-3.5 text-rose-500" />
                      <span>{record.scoreTotal}/200 (Trượt)</span>
                    </span>
                  {/if}
                </div>

                <button
                  type="button"
                  onclick={() => {
                    closeModal();
                    goto(`/thi-thu/${record.examCode}`);
                  }}
                  class="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <span>Thi lại</span>
                  <ArrowRight class="w-3 h-3" />
                </button>
              </div>
            </div>
          {/each}
        {/if}
      </div>

      <!-- Footer -->
      <div class="px-5 py-3 border-t border-slate-100 dark:border-[#282A2C] flex items-center justify-end shrink-0">
        <button
          type="button"
          onclick={closeModal}
          class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#282A2C] hover:bg-slate-200 dark:hover:bg-[#37393B] text-slate-700 dark:text-[#E3E3E3] text-xs font-bold transition-colors cursor-pointer"
        >
          Đóng
        </button>
      </div>
    </div>
  </div>
{/if}

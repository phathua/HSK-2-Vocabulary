<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { savedSessionState, type SavedSessionRecord } from '#lib/state/savedSessionState.svelte';
  import ClockCounterClockwise from 'phosphor-svelte/lib/ClockCounterClockwise';
  import Play from 'phosphor-svelte/lib/Play';
  import Trash from 'phosphor-svelte/lib/Trash';
  import X from 'phosphor-svelte/lib/X';
  import FloppyDisk from 'phosphor-svelte/lib/FloppyDisk';

  function formatDateTime(iso: string): string {
    try {
      const d = new Date(iso);
      return d.toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return iso;
    }
  }

  function getTabLabel(tab: string): string {
    if (tab === 'fill') return 'Điền từ';
    if (tab === 'quiz') return 'Trắc nghiệm';
    if (tab === 'flash') return 'Thẻ từ';
    return 'Phát âm';
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!savedSessionState.isListModalOpen) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      savedSessionState.closeListModal();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if savedSessionState.isListModalOpen}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
    transition:fade={{ duration: 150 }}
  >
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="w-full max-w-lg bg-white dark:bg-[#1E1F20] border border-slate-200 dark:border-[#2C2D2F] rounded-3xl p-5 shadow-2xl relative overflow-hidden flex flex-col max-h-[85vh] animate-in"
      transition:fly={{ y: 20, duration: 200 }}
      onclick={(e) => e.stopPropagation()}
    >
      <!-- Header -->
      <div class="flex items-center justify-between mb-4 shrink-0">
        <div class="flex items-center gap-2.5 min-w-0">
          <div class="w-10 h-10 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50 flex items-center justify-center shrink-0">
            <ClockCounterClockwise weight="bold" class="w-5 h-5" />
          </div>
          <div class="flex items-center gap-2 min-w-0">
            <h2 class="text-base font-black text-slate-900 dark:text-[#E3E3E3]">
              Lịch sử tiến độ
            </h2>
            {#if savedSessionState.records.length > 0}
              <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-slate-100 dark:bg-[#282A2C] text-slate-600 dark:text-[#8E918F]">
                {savedSessionState.records.length}
              </span>
            {/if}
          </div>
        </div>

        <button
          type="button"
          onclick={() => savedSessionState.closeListModal()}
          class="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#282A2C] text-slate-500 hover:text-slate-900 dark:text-[#8E918F] dark:hover:text-[#E3E3E3] flex items-center justify-center transition-colors cursor-pointer shrink-0 active:scale-95"
          title="Đóng"
          aria-label="Đóng"
        >
          <X weight="bold" class="w-4 h-4" />
        </button>
      </div>

      <!-- List of Saved Sessions -->
      <div class="flex-1 overflow-y-auto space-y-2.5 pr-1 min-h-[160px]">
        {#if savedSessionState.records.length === 0}
          <div class="py-8 flex flex-col items-center justify-center text-center px-4">
            <img
              src="/tour/panda_think.webp"
              alt="Mascot Gấu Trúc"
              class="w-20 h-20 object-contain mb-3 drop-shadow-sm select-none pointer-events-none"
              loading="lazy"
            />
            <h3 class="text-sm font-black text-slate-800 dark:text-[#E3E3E3]">
              Chưa có phiên học nào
            </h3>
            <p class="text-xs text-slate-400 dark:text-[#8E918F] mt-1 max-w-xs">
              Lưu tiến độ để học tiếp bất cứ lúc nào.
            </p>
          </div>
        {:else}
          {#each savedSessionState.records as session (session.id)}
            <div
              class={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                savedSessionState.activeResumeId === session.id
                  ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-400/60 dark:border-blue-600/60 ring-2 ring-blue-400/20'
                  : 'bg-slate-50/80 dark:bg-[#242628]/80 hover:bg-slate-100/80 dark:hover:bg-[#282A2C] border-slate-200 dark:border-[#323538]'
              }`}
            >
              <!-- Info -->
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2 mb-1 flex-wrap min-w-0">
                  <span class="font-black text-sm text-slate-900 dark:text-[#E3E3E3] truncate max-w-full" title={session.name}>
                    {session.name}
                  </span>
                  <span class="px-1.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shrink-0">
                    {getTabLabel(session.activeTab)}
                  </span>
                  {#if savedSessionState.activeResumeId === session.id}
                    <span class="px-1.5 py-0.5 rounded-md text-[10px] font-black bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 shrink-0">
                      Đang mở
                    </span>
                  {/if}
                </div>

                <div class="flex items-center gap-3 text-xs font-bold text-slate-500 dark:text-[#8E918F]">
                  <span>Bài {session.currentLesson}</span>
                  <span>•</span>
                  <span>Tiến độ: <b class="text-slate-800 dark:text-[#C4C7C5]">{session.progressPercent}%</b></span>
                  <span>•</span>
                  <span>Điểm: <b class="text-blue-600 dark:text-blue-400">{session.scoreText}</b></span>
                </div>

                <div class="text-[10px] font-semibold text-slate-400 dark:text-[#767977] mt-1">
                  Lưu lúc: {formatDateTime(session.createdAt)}
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onclick={() => savedSessionState.resumeSession(session)}
                  class="h-9 px-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-xs rounded-xl shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Tiếp tục làm bài từ phiên này"
                >
                  <Play weight="fill" class="w-3.5 h-3.5" />
                  <span>Làm tiếp</span>
                </button>

                <button
                  type="button"
                  onclick={() => savedSessionState.deleteSession(session.id)}
                  class="w-9 h-9 rounded-xl bg-slate-100 hover:bg-rose-100 dark:bg-[#282A2C] dark:hover:bg-rose-950/50 text-slate-500 hover:text-rose-600 dark:text-[#8E918F] dark:hover:text-rose-400 flex items-center justify-center transition-colors cursor-pointer"
                  title="Xóa phiên này"
                >
                  <Trash weight="bold" class="w-4 h-4" />
                </button>
              </div>
            </div>
          {/each}
        {/if}
      </div>

      <!-- Footer: Đưa nút lưu xuống dưới, loại bỏ chú thích dài dòng dư thừa -->
      <div class="mt-4 pt-3 border-t border-slate-100 dark:border-[#2C2D2F] flex items-center justify-between gap-2 shrink-0">
        <button
          type="button"
          disabled={savedSessionState.currentProgressPercent === 0}
          onclick={() => {
            savedSessionState.closeListModal();
            savedSessionState.openSaveModal();
          }}
          class={`h-9 px-3.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shrink-0 ${
            savedSessionState.currentProgressPercent === 0
              ? 'bg-slate-100 dark:bg-[#282A2C] text-slate-400 dark:text-zinc-600 cursor-not-allowed opacity-40 pointer-events-none'
              : 'bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-2xs cursor-pointer'
          }`}
          title={savedSessionState.currentProgressPercent === 0 ? 'Chưa có tiến độ để lưu' : 'Lưu lại phiên học hiện tại'}
        >
          <FloppyDisk weight="regular" class="w-4 h-4 shrink-0" />
          <span>Lưu phiên hiện tại</span>
        </button>

        <button
          type="button"
          onclick={() => savedSessionState.closeListModal()}
          class="h-9 px-4 rounded-xl text-xs font-bold text-slate-600 dark:text-[#8E918F] hover:bg-slate-100 dark:hover:bg-[#282A2C] transition-colors cursor-pointer"
        >
          Đóng
        </button>
      </div>
    </div>
  </div>
{/if}

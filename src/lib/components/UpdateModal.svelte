<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import Rocket from 'phosphor-svelte/lib/Rocket';
  import CircleNotch from 'phosphor-svelte/lib/CircleNotch';
  import X from 'phosphor-svelte/lib/X';
  import Sparkle from 'phosphor-svelte/lib/Sparkle';
  import Wrench from 'phosphor-svelte/lib/Wrench';
  import Lightning from 'phosphor-svelte/lib/Lightning';
  import PaintBrushBroad from 'phosphor-svelte/lib/PaintBrushBroad';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
  import { appState } from '#lib/state/appState.svelte';

  const CURRENT_APP_VERSION = '1.0.0';

  let isUpdating = $state(false);
  let progress = $state(0);
  let isLaunched = $state(false);

  let changelog = $state<Array<{ sha: string; title: string; author: string; date: string }>>([]);
  let newVersion = $state('1.0.0');
  let isLoading = $state(false);
  let fetchError = $state<string | null>(null);
  let clientVersion = $state<string>(CURRENT_APP_VERSION);

  /**
   * Phân tích commit message bằng Regex để trích xuất icon và nội dung gọn gàng, thân thiện
   */
  interface ParsedItem {
    type: 'fix' | 'feat' | 'style' | 'perf' | 'general';
    tag: string;
    text: string;
    icon: any;
    colorClass: string;
    badgeClass: string;
  }

  function parseCommitMessage(title: string): ParsedItem {
    const raw = title.trim();

    // 1. Nhóm Sửa lỗi (Fix / bug / sửa)
    if (/^(fix(\(.*?\))?:|sửa lỗi|khắc phục|sửa)/i.test(raw)) {
      const clean = raw.replace(/^(fix(\(.*?\))?:|sửa lỗi:?|khắc phục:?|sửa:?)\s*/i, '');
      return {
        type: 'fix',
        tag: 'Sửa lỗi',
        text: clean.charAt(0).toUpperCase() + clean.slice(1),
        icon: Wrench,
        colorClass: 'text-amber-600',
        badgeClass: 'bg-amber-100 text-amber-700'
      };
    }

    // 2. Nhóm Tính năng mới (Feat / tính năng / thêm / bổ sung)
    if (/^(feat(\(.*?\))?:|tính năng|thêm|bổ sung)/i.test(raw)) {
      const clean = raw.replace(/^(feat(\(.*?\))?:|tính năng mới:?|tính năng:?|thêm:?|bổ sung:?)\s*/i, '');
      return {
        type: 'feat',
        tag: 'Tính năng',
        text: clean.charAt(0).toUpperCase() + clean.slice(1),
        icon: Sparkle,
        colorClass: 'text-blue-600',
        badgeClass: 'bg-blue-100 text-blue-700'
      };
    }

    // 3. Nhóm Giao diện (Style / UI / màu sắc / checkbox / modal)
    if (/^(style(\(.*?\))?:|giao diện|tùy biến|thiết kế)/i.test(raw) || /giao diện|màu sắc/i.test(raw)) {
      const clean = raw.replace(/^(style(\(.*?\))?:|giao diện:?|tùy biến:?|thiết kế:?)\s*/i, '');
      return {
        type: 'style',
        tag: 'Giao diện',
        text: clean.charAt(0).toUpperCase() + clean.slice(1),
        icon: PaintBrushBroad,
        colorClass: 'text-teal-600',
        badgeClass: 'bg-teal-100 text-teal-700'
      };
    }

    // 4. Nhóm Tối ưu (Perf / Refactor / tối ưu / nâng cấp)
    if (/^(perf(\(.*?\))?:|refactor(\(.*?\))?:|tối ưu|nâng cấp)/i.test(raw) || /tối ưu/i.test(raw)) {
      const clean = raw.replace(/^(perf(\(.*?\))?:|refactor(\(.*?\))?:|tối ưu hóa:?|tối ưu:?)\s*/i, '');
      return {
        type: 'perf',
        tag: 'Tối ưu',
        text: clean.charAt(0).toUpperCase() + clean.slice(1),
        icon: Lightning,
        colorClass: 'text-violet-600',
        badgeClass: 'bg-violet-100 text-violet-700'
      };
    }

    // Mặc định
    return {
      type: 'general',
      tag: 'Cập nhật',
      text: raw,
      icon: CheckCircle,
      colorClass: 'text-emerald-600',
      badgeClass: 'bg-emerald-100 text-emerald-700'
    };
  }

  function getVersionDifference(current: string, next: string): number {
    const cleanCur = current.replace(/^v/, '').trim();
    const cleanNext = next.replace(/^v/, '').trim();

    const curParts = cleanCur.split('.').map((p) => parseInt(p, 10) || 0);
    const nextParts = cleanNext.split('.').map((p) => parseInt(p, 10) || 0);

    if (curParts.length >= 3 && nextParts.length >= 3) {
      const curCount = curParts[0] * 1000 + curParts[1] * 100 + curParts[2];
      const nextCount = nextParts[0] * 1000 + nextParts[1] * 100 + nextParts[2];
      return nextCount - curCount;
    }
    return 1;
  }

  const displayChangelog = $derived.by(() => {
    const diff = getVersionDifference(clientVersion, newVersion);
    const count = diff > 0 ? diff : 3;
    return changelog.slice(0, Math.min(count, 4));
  });

  $effect(() => {
    if (appState.updateModalOpen) {
      if (typeof window !== 'undefined') {
        const installed = localStorage.getItem('hsk2_installed_version');
        clientVersion = installed || CURRENT_APP_VERSION;
      }
      loadChangelog();
    }
  });

  async function loadChangelog() {
    isLoading = true;
    fetchError = null;
    try {
      const res = await fetch('/api/updates');
      const data = await res.json();
      if (data.error && (!data.changelog || data.changelog.length === 0)) {
        fetchError = data.error;
      } else {
        changelog = data.changelog || [];
        if (data.version) {
          newVersion = data.version;
        }
      }
    } catch {
      fetchError = 'Không thể tải lịch sử cập nhật';
    } finally {
      isLoading = false;
    }
  }

  function handleDismiss() {
    if (isUpdating) return;
    appState.updateModalOpen = false;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('dismissUpdate', 'true');
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && appState.updateModalOpen && !isUpdating) {
      handleDismiss();
    }
  }

  function handleUpdate() {
    isUpdating = true;

    if (typeof window !== 'undefined' && newVersion) {
      localStorage.setItem('hsk2_installed_version', newVersion);
    }

    if (typeof window !== 'undefined' && 'caches' in window) {
      caches.keys().then((keys) => {
        keys.forEach((key) => caches.delete(key));
      });
    }

    setTimeout(() => {
      isLaunched = true;
    }, 150);

    setTimeout(() => {
      window.location.reload();
    }, 1400);

    const startTime = Date.now();
    const duration = 1600;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(Math.floor((elapsed / duration) * 100), 99);

      if (p > progress) {
        progress = p;
      }

      if (progress >= 99) {
        clearInterval(interval);
      }
    }, 16);
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if appState.updateModalOpen}
  <div
    class="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-4 bg-black/55 backdrop-blur-md transition-all duration-200"
    transition:fade={{ duration: 150 }}
    role="presentation"
  >
    <!-- Background dismiss button -->
    <button
      type="button"
      class="absolute inset-0 z-0 bg-transparent border-none cursor-default w-full h-full"
      onclick={handleDismiss}
      aria-label="Đóng"
    ></button>

    <!-- Modal Box -->
    <div
      class="relative z-10 w-full max-w-sm overflow-hidden flex flex-col items-center text-center p-5 sm:p-6 bg-white rounded-3xl shadow-2xl border border-slate-200 animate-[pop_0.15s_ease]"
      transition:scale={{ duration: 250, start: 0.94, opacity: 0 }}
      role="dialog"
      aria-modal="true"
    >
      {#if !isUpdating}
        <button
          type="button"
          onclick={handleDismiss}
          class="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200 cursor-pointer transition-colors"
          aria-label="Đóng"
        >
          <X weight="bold" class="w-3.5 h-3.5" />
        </button>
      {/if}

      <!-- Ambient Glow Blobs -->
      <div class="pointer-events-none absolute -top-12 -left-12 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl"></div>

      <!-- Vùng hình ảnh Mascot Gấu Trúc cưỡi Tên lửa & Tiến trình -->
      <div class="relative z-10 w-36 h-36 flex items-center justify-center mb-1">
        <div class="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full scale-110"></div>

        {#if isUpdating}
          <div class="absolute inset-0 flex items-center justify-center z-20" transition:fade={{ duration: 150 }}>
            <svg class="w-32 h-32" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="45"
                stroke="currentColor" stroke-width="3"
                fill="none"
                class="text-slate-100"
              />
              <circle
                cx="50" cy="50" r="45"
                stroke="currentColor" stroke-width="4.5"
                fill="none"
                class="text-blue-600"
                stroke-dasharray="283"
                stroke-dashoffset={283 * (1 - progress / 100)}
                stroke-linecap="round"
                transform="rotate(-90 50 50)"
                style="transition: stroke-dashoffset 0.15s cubic-bezier(0.4, 0, 0.2, 1);"
              />
            </svg>
            <div class="absolute flex flex-col items-center">
              <span class="text-2xl font-black text-blue-600 drop-shadow-2xs">{progress}%</span>
              <span class="text-[9px] font-black uppercase tracking-wider text-slate-400">Nâng cấp</span>
            </div>
          </div>
        {/if}

        <!-- Mascot Panda cưỡi Tên lửa -->
        <div
          class={`transition-all duration-700 ease-in-out relative z-10 flex items-center justify-center select-none ${
            !isUpdating ? 'scale-100 hover:scale-105' : 'scale-50 translate-y-1 opacity-20'
          } ${isLaunched ? 'translate-y-[-260px] opacity-0 scale-50' : ''}`}
        >
          <img
            src="/icons/rocket-panda.webp"
            alt="HSK Mascot Rocket"
            class="w-32 h-32 object-contain drop-shadow-[0_12px_24px_rgba(37,99,235,0.22)] pointer-events-none"
            loading="eager"
          />
        </div>

        {#if isLaunched}
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 w-1.5 h-24 bg-gradient-to-b from-blue-500 to-transparent opacity-80 blur-xs" transition:fade></div>
        {/if}
      </div>

      <!-- Tiêu đề & Version -->
      <div class="relative z-10 flex flex-col items-center mb-3">
        <div class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[11px] font-black mb-1 border border-blue-200/60">
          <Sparkle weight="fill" class="w-3 h-3" />
          <span>Phiên bản v{newVersion}</span>
        </div>
        <h2 class="text-lg font-black text-slate-800 tracking-tight">
          Sẵn sàng nâng cấp
        </h2>
        <p class="text-[11px] text-slate-500 leading-snug max-w-[260px] mt-0.5">
          Khám phá những tối ưu và cải tiến từ vựng mới nhất.
        </p>
      </div>

      <!-- Danh sách Changelog ngắn gọn với Icon và Regex -->
      {#if !isUpdating}
        <div class="relative z-10 w-full mb-4 px-0.5">
          {#if isLoading}
            <div class="flex flex-col gap-1.5 rounded-2xl p-3.5 h-24 justify-center items-center text-slate-400 text-xs bg-slate-50/80 border border-slate-200/80">
              <CircleNotch size={16} class="animate-spin text-blue-600 mb-0.5" />
              <span class="text-[11px]">Đang kiểm tra thay đổi...</span>
            </div>
          {:else if fetchError}
            <div class="rounded-2xl p-3 text-center text-slate-400 text-xs bg-slate-50 border border-slate-200/80">
              {fetchError}
            </div>
          {:else if displayChangelog.length > 0}
            <div class="rounded-2xl p-2.5 max-h-36 overflow-y-auto no-scrollbar text-left flex flex-col gap-1.5 bg-slate-50 border border-slate-200/90">
              <div class="text-[9px] font-black uppercase tracking-wider text-slate-400 px-1 flex items-center justify-between">
                <span>Nội dung mới ({displayChangelog.length})</span>
                <span class="lowercase text-[9px]">chính thức</span>
              </div>

              {#each displayChangelog as commit}
                {@const item = parseCommitMessage(commit.title)}
                {@const ItemIcon = item.icon}
                <div class="flex items-center gap-2 p-1.5 rounded-xl bg-white border border-slate-200/60 shadow-2xs">
                  <div class={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${item.badgeClass}`}>
                    <ItemIcon weight="bold" class="w-3.5 h-3.5" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-xs text-slate-800 font-bold truncate leading-tight">
                      {item.text}
                    </p>
                  </div>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/if}

      <!-- Nút hành động -->
      {#if !isUpdating}
        <div class="relative z-10 flex flex-col gap-1.5 w-full px-0.5">
          <button
            type="button"
            class="w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/25 flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            onclick={handleUpdate}
          >
            <Rocket size={15} weight="bold" />
            <span>Nâng cấp ngay</span>
          </button>

          <button
            type="button"
            class="w-full py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            onclick={handleDismiss}
          >
            Để sau
          </button>
        </div>
      {:else}
        <div class="relative z-10 flex items-center gap-2 text-blue-600 font-extrabold text-xs animate-pulse py-2">
          <CircleNotch size={14} class="animate-spin" />
          <span>Đang làm mới dữ liệu & nạp tính năng...</span>
        </div>
      {/if}
    </div>
  </div>
{/if}

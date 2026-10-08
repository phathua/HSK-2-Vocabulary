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
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
  import Books from 'phosphor-svelte/lib/Books';
  import ShieldCheck from 'phosphor-svelte/lib/ShieldCheck';
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

  interface ParsedBadge {
    label: string;
    icon: any;
    colorClass: string;
    bgClass: string;
    borderClass: string;
  }

  /**
   * Phân tích commit message thành các cụm nhãn cực ngắn gọn, súc tích
   * Ví dụ: "Tính năng mới!", "Vá lỗi", "Tối ưu", "Cải thiện giao diện", "Âm thanh"
   */
  function parseCommitToBadge(title: string): ParsedBadge {
    const raw = title.trim().toLowerCase();

    // 1. Nhóm Sửa lỗi / Vá lỗi (fix / lỗi / bug / khắc phục)
    if (/^(fix(\(.*?\))?:|sửa lỗi|khắc phục|sửa|vá lỗi)/i.test(raw) || raw.includes('lỗi') || raw.includes('bug')) {
      return {
        label: 'Vá lỗi',
        icon: Wrench,
        colorClass: 'text-amber-700',
        bgClass: 'bg-amber-50',
        borderClass: 'border-amber-200/80'
      };
    }

    // 2. Nhóm Tính năng mới (feat / thêm / bổ sung / tính năng)
    if (/^(feat(\(.*?\))?:|tính năng|thêm|bổ sung)/i.test(raw)) {
      if (raw.includes('phát âm') || raw.includes('giọng') || raw.includes('loa') || raw.includes('speech')) {
        return {
          label: 'Phát âm mới',
          icon: SpeakerHigh,
          colorClass: 'text-blue-700',
          bgClass: 'bg-blue-50',
          borderClass: 'border-blue-200/80'
        };
      }
      if (raw.includes('bài học') || raw.includes('từ vựng') || raw.includes('hsk')) {
        return {
          label: 'Từ vựng mới',
          icon: Books,
          colorClass: 'text-indigo-700',
          bgClass: 'bg-indigo-50',
          borderClass: 'border-indigo-200/80'
        };
      }
      return {
        label: 'Tính năng mới!',
        icon: Sparkle,
        colorClass: 'text-blue-700',
        bgClass: 'bg-blue-50',
        borderClass: 'border-blue-200/80'
      };
    }

    // 3. Nhóm Giao diện / UI (style / giao diện / màu sắc / checkbox / splash / mascot)
    if (/^(style(\(.*?\))?:|giao diện|tùy biến|thiết kế)/i.test(raw) || raw.includes('giao diện') || raw.includes('màu sắc') || raw.includes('ui') || raw.includes('splash')) {
      return {
        label: 'Giao diện mới',
        icon: PaintBrushBroad,
        colorClass: 'text-teal-700',
        bgClass: 'bg-teal-50',
        borderClass: 'border-teal-200/80'
      };
    }

    // 4. Nhóm Tối ưu (perf / refactor / tối ưu / nâng cấp / mượt)
    if (/^(perf(\(.*?\))?:|refactor(\(.*?\))?:|tối ưu|nâng cấp)/i.test(raw) || raw.includes('tối ưu') || raw.includes('nâng cấp')) {
      return {
        label: 'Tối ưu tốc độ',
        icon: Lightning,
        colorClass: 'text-violet-700',
        bgClass: 'bg-violet-50',
        borderClass: 'border-violet-200/80'
      };
    }

    return {
      label: 'Cải tiến mới',
      icon: CheckCircle,
      colorClass: 'text-emerald-700',
      bgClass: 'bg-emerald-50',
      borderClass: 'border-emerald-200/80'
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

  // Khử trùng lặp các nhãn giống nhau để chia cột icon đẹp mắt và gọn gàng
  const displayBadges = $derived.by(() => {
    const diff = getVersionDifference(clientVersion, newVersion);
    const count = diff > 0 ? diff : 3;
    const items = changelog.slice(0, Math.min(count, 6));

    const seenLabels = new Set<string>();
    const result: ParsedBadge[] = [];

    for (const commit of items) {
      const badge = parseCommitToBadge(commit.title);
      if (!seenLabels.has(badge.label)) {
        seenLabels.add(badge.label);
        result.push(badge);
      }
    }

    if (result.length === 0) {
      result.push({
        label: 'Tính năng mới!',
        icon: Sparkle,
        colorClass: 'text-blue-700',
        bgClass: 'bg-blue-50',
        borderClass: 'border-blue-200/80'
      });
    }

    return result.slice(0, 4);
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
    class="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md transition-all duration-200"
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

    <!-- Modal Box: Rộng rãi, sạch đẹp theo phong cách Duolingo / App Store -->
    <div
      class="relative z-10 w-full max-w-sm overflow-hidden flex flex-col items-center text-center p-6 sm:p-7 bg-white rounded-[2rem] shadow-2xl border border-slate-200/90 animate-[pop_0.15s_ease]"
      transition:scale={{ duration: 250, start: 0.94, opacity: 0 }}
      role="dialog"
      aria-modal="true"
    >
      {#if !isUpdating}
        <button
          type="button"
          onclick={handleDismiss}
          class="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200 cursor-pointer transition-colors"
          aria-label="Đóng"
        >
          <X weight="bold" class="w-4 h-4" />
        </button>
      {/if}

      <!-- Ambient Glow Blobs -->
      <div class="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-blue-500/15 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-orange-500/15 blur-3xl"></div>

      <!-- Vùng hình ảnh Mascot Gấu Trúc cưỡi Tên lửa TO & HOÀNH TRÁNG -->
      <div class="relative z-10 w-48 h-48 sm:w-52 sm:h-52 flex items-center justify-center mb-1">
        <!-- Ánh sáng hào quang mở rộng phía sau mascot -->
        <div class="absolute inset-0 bg-gradient-to-t from-blue-500/15 to-sky-400/15 blur-2xl rounded-full scale-110"></div>

        {#if isUpdating}
          <div class="absolute inset-0 flex items-center justify-center z-20" transition:fade={{ duration: 150 }}>
            <svg class="w-40 h-40" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="45"
                stroke="currentColor" stroke-width="3"
                fill="none"
                class="text-slate-100"
              />
              <circle
                cx="50" cy="50" r="4.5"
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
              <span class="text-3xl font-black text-blue-600 drop-shadow-2xs">{progress}%</span>
              <span class="text-[9px] font-black uppercase tracking-wider text-slate-400 mt-0.5">Nâng cấp</span>
            </div>
          </div>
        {/if}

        <!-- Mascot Gấu Trúc to rõ ràng, nổi bật với shadow sâu và animation hover/active -->
        <div
          class={`transition-all duration-700 ease-in-out relative z-10 flex items-center justify-center select-none ${
            !isUpdating ? 'scale-100 hover:scale-105 active:scale-95' : 'scale-50 translate-y-2 opacity-20'
          } ${isLaunched ? 'translate-y-[-280px] opacity-0 scale-50' : ''}`}
        >
          <img
            src="/icons/rocket-panda.webp"
            alt="HSK Mascot Rocket"
            class="w-44 h-44 sm:w-48 sm:h-48 object-contain drop-shadow-[0_16px_30px_rgba(37,99,235,0.25)] pointer-events-none"
            loading="eager"
          />
        </div>

        {#if isLaunched}
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 w-2 h-28 bg-gradient-to-b from-blue-500 to-transparent opacity-85 blur-xs" transition:fade></div>
        {/if}
      </div>

      <!-- Tiêu đề phiên bản gọn gàng -->
      <div class="relative z-10 flex flex-col items-center mb-4">
        <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
          Đã có phiên bản mới
        </h2>
        <p class="text-xs text-slate-500 leading-relaxed max-w-[280px] mt-1">
          Phiên bản <b>v{newVersion}</b> đã sẵn sàng với nhiều cải tiến thú vị dành cho bạn.
        </p>
      </div>

      <!-- Nội dung mới: Chia thành các cột icon đứng gần nhau, dưới có nhãn ngắn gọn -->
      {#if !isUpdating}
        <div class="relative z-10 w-full mb-6 px-1">
          {#if isLoading}
            <div class="flex items-center justify-center gap-2 py-3 text-slate-400 text-xs">
              <CircleNotch size={16} class="animate-spin text-blue-600" />
              <span>Đang kiểm tra...</span>
            </div>
          {:else if fetchError}
            <p class="text-xs text-slate-400 py-2">{fetchError}</p>
          {:else if displayBadges.length > 0}
            <!-- Lưới các cột icon đứng gần nhau, dưới mỗi icon là nhãn ngắn gọn -->
            <div class="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap">
              {#each displayBadges as badge}
                {@const BadgeIcon = badge.icon}
                <div class="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-slate-50 border border-slate-100 shadow-2xs min-w-[70px] sm:min-w-[76px] transition-transform hover:-translate-y-0.5">
                  <div class={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-xs ${badge.bgClass} ${badge.colorClass} ${badge.borderClass}`}>
                    <BadgeIcon weight="duotone" class="w-5 h-5" />
                  </div>
                  <span class="text-[11px] font-black text-slate-700 tracking-tight text-center leading-none">
                    {badge.label}
                  </span>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/if}

      <!-- Nút hành động to rõ ràng, phong cách Duolingo / Modern App -->
      {#if !isUpdating}
        <div class="relative z-10 flex flex-col gap-2 w-full px-1">
          <button
            type="button"
            class="w-full h-12 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
            onclick={handleUpdate}
          >
            <Rocket size={17} weight="bold" />
            <span>Cập nhật ứng dụng</span>
          </button>

          <button
            type="button"
            class="w-full py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            onclick={handleDismiss}
          >
            Để sau
          </button>
        </div>
      {:else}
        <div class="relative z-10 flex items-center gap-2 text-blue-600 font-extrabold text-xs animate-pulse py-2">
          <CircleNotch size={15} class="animate-spin" />
          <span>Đang làm mới dữ liệu & nạp phiên bản mới...</span>
        </div>
      {/if}
    </div>
  </div>
{/if}

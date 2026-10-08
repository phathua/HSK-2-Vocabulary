<script lang="ts">
  import { fade, fly } from 'svelte/transition';
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
  import { appState } from '#lib/state/appState.svelte';

  const CURRENT_APP_VERSION = '1.0.0';

  let isUpdating = $state(false);
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

  function parseCommitToBadge(title: string): ParsedBadge {
    const raw = title.trim().toLowerCase();

    // 1. Nhóm Sửa lỗi / Vá lỗi
    if (/^(fix(\(.*?\))?:|sửa lỗi|khắc phục|sửa|vá lỗi)/i.test(raw) || raw.includes('lỗi') || raw.includes('bug')) {
      return {
        label: 'Vá lỗi',
        icon: Wrench,
        colorClass: 'text-amber-700',
        bgClass: 'bg-amber-50',
        borderClass: 'border-amber-200/80'
      };
    }

    // 2. Nhóm Tính năng mới
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

    // 3. Nhóm Giao diện / UI
    if (/^(style(\(.*?\))?:|giao diện|tùy biến|thiết kế)/i.test(raw) || raw.includes('giao diện') || raw.includes('màu sắc') || raw.includes('ui') || raw.includes('splash')) {
      return {
        label: 'Giao diện mới',
        icon: PaintBrushBroad,
        colorClass: 'text-teal-700',
        bgClass: 'bg-teal-50',
        borderClass: 'border-teal-200/80'
      };
    }

    // 4. Nhóm Tối ưu
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

  async function handleUpdate() {
    if (isUpdating) return;
    isUpdating = true;

    if (typeof window !== 'undefined' && newVersion) {
      localStorage.setItem('hsk2_installed_version', newVersion);
    }

    // Xóa sạch toàn bộ Service Worker Caches
    if (typeof window !== 'undefined' && 'caches' in window) {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      } catch {}
    }

    // Kích hoạt animation tên lửa bay vút lên trời
    setTimeout(() => {
      isLaunched = true;
    }, 100);

    // Hard Refresh (F5 cưỡng bức) ngay sau khi tên lửa bay khuất
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        // Chèn timestamp buộc trình duyệt và SW bypass cache hoàn toàn
        const url = new URL(window.location.href);
        url.searchParams.set('_v', Date.now().toString());
        window.location.replace(url.toString());
      }
    }, 900);
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if appState.updateModalOpen}
  <div
    class="fixed inset-0 z-[250] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/55 backdrop-blur-xs transition-all duration-300"
    transition:fade={{ duration: 180 }}
    role="presentation"
  >
    <!-- Background dismiss overlay -->
    <button
      type="button"
      class="absolute inset-0 z-0 bg-transparent border-none cursor-default w-full h-full"
      onclick={handleDismiss}
      aria-label="Đóng"
    ></button>

    <!-- Bottom Sheet Popup Container: Sát viền màn hình 2 bên trên mobile (w-full max-w-lg), bo tròn góc trên -->
    <div
      class="relative z-10 w-full sm:max-w-md overflow-hidden flex flex-col items-center text-center p-6 sm:p-7 bg-white rounded-t-[2.25rem] sm:rounded-[2.5rem] shadow-[0_-15px_40px_rgba(0,0,0,0.2)] sm:shadow-2xl border-t sm:border border-slate-200/90"
      transition:fly={{ y: 260, duration: 320, opacity: 0.2 }}
      role="dialog"
      aria-modal="true"
    >
      <!-- Drag handle indicator for mobile sheet style -->
      <div class="sm:hidden w-12 h-1.5 rounded-full bg-slate-200 mb-3 -mt-2"></div>

      {#if !isUpdating}
        <button
          type="button"
          onclick={handleDismiss}
          class="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200 cursor-pointer transition-colors active:scale-90"
          aria-label="Đóng"
        >
          <X weight="bold" class="w-4 h-4" />
        </button>
      {/if}

      <!-- Ambient Glow Blobs -->
      <div class="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-orange-500/15 blur-3xl"></div>

      <!-- Vùng hình ảnh Mascot Gấu Trúc cưỡi Tên lửa TO & RỰC RỠ -->
      <div class="relative z-10 w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center mb-1">
        <!-- Ánh sáng hào quang mở rộng phía sau mascot -->
        <div class="absolute inset-0 bg-gradient-to-t from-amber-400/15 to-orange-400/15 blur-2xl rounded-full scale-110"></div>

        <!-- Mascot Gấu Trúc: Khi bấm nâng cấp -> bay vút lên trời mất hút -->
        <div
          class={`transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) relative z-10 flex items-center justify-center select-none ${
            isLaunched ? 'translate-y-[-380px] scale-75 opacity-0' : isUpdating ? 'scale-105' : 'scale-100 hover:scale-105 active:scale-95'
          }`}
        >
          <img
            src="/icons/rocket-panda.webp"
            alt="HSK Mascot Rocket"
            class="w-40 h-40 sm:w-44 sm:h-44 object-contain drop-shadow-[0_16px_30px_rgba(249,115,22,0.2)] pointer-events-none"
            loading="eager"
          />
        </div>

        <!-- Hiệu ứng đám mây khói hoạt hình hoạt họa (màu trắng kem / vàng ấm, KHÔNG DÙNG XANH) -->
        {#if isLaunched}
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-20 flex items-center justify-center">
            <!-- Đám khói chính ở giữa -->
            <div class="smoke-puff smoke-center w-14 h-14 rounded-full bg-amber-50/95 border border-amber-100/60 shadow-[0_4px_16px_rgba(251,191,36,0.35)]"></div>
            <!-- Cụm khói phình sang trái -->
            <div class="smoke-puff smoke-left w-11 h-11 rounded-full bg-orange-50/90 border border-orange-100/50 shadow-[0_4px_12px_rgba(251,146,60,0.25)]"></div>
            <!-- Cụm khói phình sang phải -->
            <div class="smoke-puff smoke-right w-11 h-11 rounded-full bg-amber-100/90 border border-amber-200/50 shadow-[0_4px_12px_rgba(251,191,36,0.25)]"></div>
            <!-- Hạt lửa nhỏ vàng kim bay xuống dưới -->
            <div class="smoke-spark spark-1 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]"></div>
            <div class="smoke-spark spark-2 w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_#F97316]"></div>
            <div class="smoke-spark spark-3 w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_6px_#FCD34D]"></div>
          </div>
        {/if}
      </div>

      <!-- Tiêu đề phiên bản thanh lịch sang trọng giống hình mẫu -->
      <div class="relative z-10 flex flex-col items-center mb-4">
        <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
          Đã có phiên bản mới
        </h2>
        <p class="text-xs text-slate-500 leading-relaxed max-w-[280px] mt-1 font-medium">
          Phiên bản <b>v{newVersion}</b> đã sẵn sàng với các cải tiến mới nhất dành cho bạn.
        </p>
      </div>

      <!-- Nội dung mới: Các cột icon đứng gần nhau, dưới mỗi icon là nhãn ngắn gọn -->
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
            <div class="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap">
              {#each displayBadges as badge}
                {@const BadgeIcon = badge.icon}
                <div class="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-slate-50 border border-slate-100 shadow-2xs min-w-[72px] sm:min-w-[78px] transition-transform hover:-translate-y-0.5">
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

      <!-- Nút hành động to rõ ràng, bo cong chuẩn modern popup -->
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
            class="w-full py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors cursor-pointer active:scale-95"
            onclick={handleDismiss}
          >
            Để sau
          </button>
        </div>
      {:else}
        <div class="relative z-10 flex items-center justify-center gap-2 text-blue-600 font-extrabold text-xs py-3 animate-pulse">
          <CircleNotch size={16} class="animate-spin" />
          <span>Đang làm mới dữ liệu và kích hoạt phiên bản mới...</span>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  @keyframes smokeExpand {
    0% {
      transform: scale(0.3) translateY(0);
      opacity: 0.95;
    }
    50% {
      transform: scale(1.3) translateY(8px);
      opacity: 0.8;
    }
    100% {
      transform: scale(1.8) translateY(24px);
      opacity: 0;
    }
  }

  @keyframes smokeLeft {
    0% {
      transform: scale(0.2) translate(0, 0);
      opacity: 0.9;
    }
    100% {
      transform: scale(1.5) translate(-28px, 18px);
      opacity: 0;
    }
  }

  @keyframes smokeRight {
    0% {
      transform: scale(0.2) translate(0, 0);
      opacity: 0.9;
    }
    100% {
      transform: scale(1.5) translate(28px, 18px);
      opacity: 0;
    }
  }

  @keyframes sparkDrop {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(var(--tx, 0), 40px) scale(0);
      opacity: 0;
    }
  }

  .smoke-puff {
    position: absolute;
    animation-duration: 0.75s;
    animation-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
    animation-fill-mode: forwards;
  }

  .smoke-center {
    animation-name: smokeExpand;
  }

  .smoke-left {
    animation-name: smokeLeft;
  }

  .smoke-right {
    animation-name: smokeRight;
  }

  .smoke-spark {
    position: absolute;
    animation: sparkDrop 0.65s cubic-bezier(0.2, 0.8, 0.4, 1) forwards;
  }

  .spark-1 {
    --tx: -14px;
    animation-delay: 0.05s;
  }

  .spark-2 {
    --tx: 16px;
    animation-delay: 0.1s;
  }

  .spark-3 {
    --tx: 2px;
    animation-delay: 0.08s;
  }
</style>

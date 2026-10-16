<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { appState } from '#lib/state/appState.svelte';
  import { examRoomState } from '#lib/state/examRoomState.svelte';
  import { examHistoryState } from '#lib/state/examHistoryState.svelte';
  import { savedSessionState } from '#lib/state/savedSessionState.svelte';
  import SlidersHorizontal from 'phosphor-svelte/lib/SlidersHorizontal';
  import ArrowsLeftRight from 'phosphor-svelte/lib/ArrowsLeftRight';
  import Clock from 'phosphor-svelte/lib/Clock';
  import ClockCounterClockwise from 'phosphor-svelte/lib/ClockCounterClockwise';
  import HourglassMedium from 'phosphor-svelte/lib/HourglassMedium';
  import List from 'phosphor-svelte/lib/List';
  import GraduationCap from 'phosphor-svelte/lib/GraduationCap';
  import BookOpenText from 'phosphor-svelte/lib/BookOpenText';
  import Exam from 'phosphor-svelte/lib/Exam';
  import Target from 'phosphor-svelte/lib/Target';
  import Trophy from 'phosphor-svelte/lib/Trophy';
  import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';

  const isHomePage = $derived(page.url.pathname === '/');
  const isGrammarPage = $derived(page.url.pathname.startsWith('/ngu-phap'));
  const isExamListPage = $derived(page.url.pathname.startsWith('/thi-thu') && !examRoomState.isActive && !page.params.examId);
  const isDictionaryPage = $derived(page.url.pathname.startsWith('/tu-vung'));
  const isExamRoom = $derived(examRoomState.isActive || Boolean(page.params.examId));

  // Cấu hình Icon và Tiêu đề động theo trang đang mở trong SidebarMenu
  const activePageInfo = $derived.by(() => {
    const path = page.url.pathname;
    if (path.startsWith('/ngu-phap')) {
      return {
        title: 'Ngữ pháp',
        icon: GraduationCap,
        bg: 'bg-purple-500/10 dark:bg-purple-500/20',
        text: 'text-purple-600 dark:text-purple-400',
        border: 'border-purple-200 dark:border-purple-800/60'
      };
    }
    if (path.startsWith('/thi-thu')) {
      return {
        title: 'Thi thử',
        icon: Exam,
        bg: 'bg-orange-500/10 dark:bg-orange-500/20',
        text: 'text-orange-600 dark:text-orange-400',
        border: 'border-orange-200 dark:border-orange-800/60'
      };
    }
    if (path.startsWith('/nhiem-vu')) {
      return {
        title: 'Nhiệm vụ',
        icon: Target,
        bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
        text: 'text-emerald-600 dark:text-emerald-400',
        border: 'border-emerald-200 dark:border-emerald-800/60'
      };
    }
    if (path.startsWith('/bang-xep-hang')) {
      return {
        title: 'Bảng xếp hạng',
        icon: Trophy,
        bg: 'bg-amber-500/10 dark:bg-amber-500/20',
        text: 'text-amber-600 dark:text-amber-400',
        border: 'border-amber-200 dark:border-amber-800/60'
      };
    }
    if (path.startsWith('/tu-vung')) {
      return {
        title: 'Tra từ điển',
        icon: MagnifyingGlass,
        bg: 'bg-rose-500/10 dark:bg-rose-500/20',
        text: 'text-rose-600 dark:text-rose-400',
        border: 'border-rose-200 dark:border-rose-800/60'
      };
    }
    // Mặc định hoặc Trang chủ: Ôn tập
    return {
      title: 'Ôn tập',
      icon: BookOpenText,
      bg: 'bg-blue-500/10 dark:bg-blue-500/20',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-800/60'
    };
  });

  const PageIcon = $derived(activePageInfo.icon);

  function handleBrandClick() {
    if (isHomePage) {
      appState.filterModalOpen = true;
    } else {
      goto('/');
    }
  }

  let grammarLearnedCount = $state(0);
  const totalGrammarCount = 18;

  $effect(() => {
    if (isGrammarPage && typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('hsk2_grammar_learned_ids');
        if (saved) {
          const map = JSON.parse(saved);
          grammarLearnedCount = Object.values(map).filter(Boolean).length;
        } else {
          grammarLearnedCount = 0;
        }
      } catch {
        grammarLearnedCount = 0;
      }
    }
  });

  function formatTime(secs: number): string {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
</script>

<header class="flex items-center justify-between shrink-0 bg-white dark:bg-[#1B1B1B] px-3 py-2 rounded-2xl shadow-xs border border-slate-200 dark:border-[#282A2C] transition-colors">
  <!-- Left: Sidebar Hamburger Button & Dynamic Brand -->
  <div class="flex items-center gap-2">
    <!-- Nút 3 gạch ngoài cùng bên trái (Mobile/Tablet) -->
    <button
      type="button"
      data-tour="header-menu"
      onclick={() => (appState.sidebarOpen = true)}
      class="lg:hidden w-9 h-9 rounded-xl border border-slate-200 dark:border-[#282A2C] bg-slate-50 dark:bg-[#282A2C] hover:bg-slate-100 dark:hover:bg-[#37393B] flex items-center justify-center text-slate-700 dark:text-[#E3E3E3] transition-all cursor-pointer active:scale-95 shrink-0"
      title="Mở menu điều hướng"
      aria-label="Mở menu điều hướng"
    >
      <List weight="bold" class="w-5 h-5 text-slate-700 dark:text-[#E3E3E3]" />
    </button>

    <!-- Brand Button: Đổi icon & tiêu đề theo trang, click ở trang con thì quay về trang chủ -->
    <button
      type="button"
      data-tour="header-brand"
      onclick={handleBrandClick}
      class="flex items-center gap-2.5 text-left cursor-pointer active:scale-98 transition-transform group"
      title={isHomePage ? 'Bấm để chọn bài học hoặc đổi cấp độ HSK' : 'Bấm để quay về Trang chủ'}
    >
      <div
        class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border {activePageInfo.bg} {activePageInfo.text} {activePageInfo.border} shadow-2xs group-hover:scale-105 transition-transform"
      >
        <PageIcon weight="duotone" class="w-5 h-5" />
      </div>

      <div class="flex flex-col items-start text-left leading-none min-w-0">
        <span class="font-black text-sm text-slate-900 dark:text-[#E3E3E3] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors whitespace-nowrap">
          {activePageInfo.title}
        </span>
        {#if isHomePage}
          <div class="mt-1 flex items-center">
            <span class="text-[9.5px] font-black px-1.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 leading-none shadow-2xs">
              {isExamRoom ? 'HSK 2' : appState.currentLevelDisplay}
            </span>
          </div>
        {:else if isGrammarPage}
          <div class="mt-1 flex items-center">
            <span class="text-[9.5px] font-black px-1.5 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 leading-none shadow-2xs">
              Đã học {grammarLearnedCount}/{totalGrammarCount}
            </span>
          </div>
        {:else if isExamListPage}
          <div class="mt-1 flex items-center">
            <span class="text-[9.5px] font-black px-1.5 py-0.5 rounded-md bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 leading-none shadow-2xs">
              Đã thi {examHistoryState.completedExamsCount}/33 đề
            </span>
          </div>
        {:else if isDictionaryPage}
          <div class="mt-1 flex items-center">
            <span class="text-[9.5px] font-black px-1.5 py-0.5 rounded-md bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 leading-none shadow-2xs">
              Từ điển HSK 2
            </span>
          </div>
        {/if}
      </div>
    </button>
  </div>

  <!-- Right: Actions -->
  <div class="flex items-center gap-1.5 shrink-0">
    <!-- Trong phòng thi trên Desktop: Bộ đếm thời gian và Nút Nộp bài (Trên mobile đã có thanh sticky dưới đáy) -->
    {#if isExamRoom}
      <div class="hidden lg:flex items-center gap-1.5 shrink-0 animate-fade-in">
        {#if examRoomState.isPreviewPhase}
          <button
            type="button"
            onclick={() => examRoomState.startAudio()}
            class="h-9 px-2.5 rounded-xl border border-amber-300 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 flex items-center gap-1.5 font-mono font-black text-xs cursor-pointer shadow-2xs active:scale-95 transition-all"
            title="Đang xem trước đề. Bấm để phát audio ngay!"
          >
            <HourglassMedium weight="bold" class="w-4 h-4 text-amber-600 animate-spin" />
            <span>{examRoomState.previewSeconds}s</span>
          </button>
        {:else}
          <div
            class="h-9 px-2.5 rounded-xl border {examRoomState.timeRemainingSeconds < 300 ? 'border-red-300 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 animate-pulse' : 'border-slate-200 dark:border-[#282A2C] bg-slate-50 dark:bg-[#282A2C] text-slate-700 dark:text-[#E3E3E3]'} flex items-center gap-1.5 font-mono font-black text-xs shadow-2xs"
            title="Thời gian làm bài thi"
          >
            <Clock weight="duotone" class="w-4 h-4 {examRoomState.timeRemainingSeconds < 300 ? 'text-red-500' : 'text-orange-500'}" />
            <span>{formatTime(examRoomState.timeRemainingSeconds)}</span>
          </div>
        {/if}

        {#if !examRoomState.isSubmitted}
          <button
            type="button"
            onclick={() => examRoomState.submit()}
            class="h-9 px-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-black text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-all shrink-0"
            title="Nộp bài thi"
          >
            <CheckCircle weight="bold" class="w-4 h-4 shrink-0" />
            <span>Nộp bài</span>
          </button>
        {/if}
      </div>
    {:else if isHomePage}
      <!-- Nút đổi chiều ngôn ngữ ở Trang Chủ -->
      <button
        type="button"
        data-tour="header-direction"
        onclick={() => appState.toggleDirection()}
        class="h-9 px-2.5 rounded-xl border border-slate-200 dark:border-[#282A2C] bg-slate-50 dark:bg-[#282A2C] hover:bg-slate-100 dark:hover:bg-[#37393B] flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
        title={appState.direction === 'vi_to_zh' ? 'Đang hỏi: Việt ➔ Trung. Bấm để đổi sang: Trung ➔ Việt' : 'Đang hỏi: Trung ➔ Việt. Bấm để đổi sang: Việt ➔ Trung'}
      >
        <ArrowsLeftRight weight="bold" class="w-4 h-4 text-blue-600 dark:text-blue-400" />
        {#if appState.direction === 'vi_to_zh'}
          <img
            src="/svg/china-flag.svg"
            alt="Cờ Trung Quốc"
            class="w-5 h-5 rounded-full object-cover shrink-0 drop-shadow-2xs"
          />
        {:else}
          <img
            src="/svg/vietnam-flag.svg"
            alt="Cờ Việt Nam"
            class="w-5 h-5 rounded-full object-cover shrink-0 drop-shadow-2xs"
          />
        {/if}
      </button>

      <!-- Nút Mở modal Lịch sử tiến độ đã lưu (gọn gàng, chống tràn, chuẩn anti-slop) -->
      <button
        type="button"
        onclick={() => savedSessionState.openListModal()}
        class="relative w-9 h-9 rounded-xl border border-slate-200 dark:border-[#282A2C] bg-slate-50 dark:bg-[#282A2C] hover:bg-slate-100 dark:hover:bg-[#37393B] flex items-center justify-center text-slate-600 dark:text-[#C4C7C5] transition-all cursor-pointer active:scale-95 shadow-2xs shrink-0"
        title="Danh sách tiến độ đã lưu ({savedSessionState.records.length})"
        aria-label="Danh sách tiến độ đã lưu"
      >
        <ClockCounterClockwise weight="bold" class="w-4 h-4" />
        {#if savedSessionState.records.length > 0}
          <span class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-blue-600 text-white text-[9.5px] font-black flex items-center justify-center leading-none shadow-xs pointer-events-none">
            {savedSessionState.records.length > 99 ? '99+' : savedSessionState.records.length}
          </span>
        {/if}
      </button>
    {/if}

    <!-- Nút Lịch sử thi: Chỉ xuất hiện ở trang Thi thử (/thi-thu), đứng ngay bên trái nút tìm kiếm -->
    {#if isExamListPage}
      <button
        type="button"
        onclick={() => examHistoryState.openHistory(null)}
        class="w-9 h-9 rounded-xl border border-orange-200 dark:border-orange-900/60 bg-orange-50 dark:bg-orange-950/40 hover:bg-orange-100 dark:hover:bg-orange-900/60 flex items-center justify-center text-orange-600 dark:text-orange-400 transition-colors cursor-pointer active:scale-95 shadow-2xs"
        title="Lịch sử làm bài thi HSK 2"
        aria-label="Lịch sử làm bài thi"
      >
        <ClockCounterClockwise weight="bold" class="w-4 h-4" />
      </button>
    {/if}

    <!-- Nút Tìm kiếm Spotlight: Đứng bên phải nút chuyển zh-to-vi và trước nút cài đặt (Ẩn khi đang ở trang từ điển /tu-vung hoặc trong phòng thi) -->
    {#if !isDictionaryPage && !isExamRoom}
      <button
        type="button"
        onclick={() => (appState.spotlightOpen = true)}
        class="w-9 h-9 rounded-xl border border-slate-200 dark:border-[#282A2C] bg-slate-50 dark:bg-[#282A2C] hover:bg-slate-100 dark:hover:bg-[#37393B] flex items-center justify-center text-slate-600 dark:text-[#C4C7C5] transition-colors cursor-pointer active:scale-95"
        title="Tìm kiếm từ điển HSK Spotlight (Ctrl+K)"
        aria-label="Tìm kiếm từ điển"
      >
        <MagnifyingGlass weight="bold" class="w-4 h-4" />
      </button>
    {/if}

    <!-- Settings Button (Cài đặt) -->
    <button
      type="button"
      data-tour="header-settings"
      onclick={() => (appState.settingsModalOpen = true)}
      class="w-9 h-9 rounded-xl border border-slate-200 dark:border-[#282A2C] bg-slate-50 dark:bg-[#282A2C] hover:bg-slate-100 dark:hover:bg-[#37393B] flex items-center justify-center text-slate-600 dark:text-[#C4C7C5] transition-colors cursor-pointer active:scale-95"
      title="Cài đặt âm thanh & giao diện"
      aria-label="Cài đặt"
    >
      <SlidersHorizontal weight="bold" class="w-4 h-4" />
    </button>
  </div>
</header>

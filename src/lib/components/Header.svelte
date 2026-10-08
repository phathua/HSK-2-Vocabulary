<script lang="ts">
  import { page } from '$app/state';
  import { appState } from '#lib/state/appState.svelte';
  import { examRoomState } from '#lib/state/examRoomState.svelte';
  import SlidersHorizontal from 'phosphor-svelte/lib/SlidersHorizontal';
  import ArrowsLeftRight from 'phosphor-svelte/lib/ArrowsLeftRight';
  import Clock from 'phosphor-svelte/lib/Clock';
  import HourglassMedium from 'phosphor-svelte/lib/HourglassMedium';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
  import ArrowCounterClockwise from 'phosphor-svelte/lib/ArrowCounterClockwise';
  import List from 'phosphor-svelte/lib/List';

  const isHomePage = $derived(page.url.pathname === '/');
  const isExamRoom = $derived(examRoomState.isActive);

  function formatTime(secs: number): string {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
</script>

<header class="flex items-center justify-between shrink-0 bg-white dark:bg-[#1B1B1B] px-3 py-2 rounded-2xl shadow-xs border border-slate-200 dark:border-[#282A2C] transition-colors">
  <!-- Left: Sidebar Hamburger Button & Mascot Brand -->
  <div class="flex items-center gap-2">
    <!-- Nút 3 gạch ngoài cùng bên trái (chỉ hiện trên Mobile/Tablet, ẩn trên Desktop lg vì có sidebar cố định) -->
    <button
      type="button"
      onclick={() => (appState.sidebarOpen = true)}
      class="lg:hidden w-9 h-9 rounded-xl border border-slate-200 dark:border-[#282A2C] bg-slate-50 dark:bg-[#282A2C] hover:bg-slate-100 dark:hover:bg-[#37393B] flex items-center justify-center text-slate-700 dark:text-[#E3E3E3] transition-all cursor-pointer active:scale-95 shrink-0"
      title="Mở menu điều hướng"
      aria-label="Mở menu điều hướng"
    >
      <List weight="bold" class="w-5 h-5 text-slate-700 dark:text-[#E3E3E3]" />
    </button>

    <!-- Click to choose Level/Lesson -->
    <button
      type="button"
      onclick={() => (appState.filterModalOpen = true)}
      class="flex items-center gap-2.5 text-left cursor-pointer active:scale-98 transition-transform group"
      title="Bấm để chọn bài học hoặc đổi cấp độ HSK"
    >
      <div class="shrink-0">
        <img
          src="/icons/icon-192.png"
          alt="Ôn Tập HSK 2 Mascot"
          class="w-10 h-10 rounded-xl object-cover shadow-xs border border-blue-100 dark:border-blue-900/50"
        />
      </div>

      <div class="leading-tight min-w-0">
        <span class="font-black text-sm text-slate-900 dark:text-[#E3E3E3] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors whitespace-nowrap">
          HSK {appState.currentLevel === 'HSK1' ? '1' : '2'}
        </span>
      </div>
    </button>
  </div>

  <!-- Right: Clean Actions -->
  <div class="flex items-center gap-1.5 shrink-0">
    <!-- Trong phòng thi: Nộp bài, Làm lại & Bộ đếm thời gian CHỈ HIỆN KHI CUỘN XUỐNG (isScrolled) -->
    {#if isExamRoom && examRoomState.isScrolled}
      <div class="flex items-center gap-1.5 shrink-0 animate-fade-in">
        <!-- Nút Làm lại bài -->
        <button
          type="button"
          onclick={() => examRoomState.retry()}
          class="h-9 w-9 sm:w-auto sm:px-2.5 rounded-xl border border-slate-200 dark:border-[#282A2C] bg-slate-50 dark:bg-[#282A2C] hover:bg-slate-100 dark:hover:bg-[#37393B] text-slate-700 dark:text-[#E3E3E3] flex items-center justify-center gap-1.5 text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0"
          title="Làm lại bài thi"
          aria-label="Làm lại bài thi"
        >
          <ArrowCounterClockwise weight="bold" class="w-4 h-4" />
          <span class="hidden sm:inline">Làm lại</span>
        </button>

        <!-- Nút Nộp bài -->
        <button
          type="button"
          onclick={() => examRoomState.submit()}
          class="h-9 px-2.5 sm:px-3 rounded-xl bg-orange-600 hover:bg-orange-700 active:scale-95 text-white flex items-center gap-1.5 text-xs font-black transition-all cursor-pointer shadow-2xs shrink-0"
          title="Nộp bài thi"
        >
          <CheckCircle weight="bold" class="w-4 h-4" />
          <span>Nộp bài</span>
        </button>

        <!-- Bộ đếm thời gian: CHỈ XUẤT HIỆN Ở CHẾ ĐỘ THI -->
        {#if examRoomState.isExamMode}
          {#if examRoomState.isPreviewPhase}
            <!-- Đếm ngược 60s xem trước đề (chưa trừ vào 55 phút) -->
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
            <!-- Đồng hồ thời gian làm bài 55 phút -->
            <div
              class="h-9 px-2.5 rounded-xl border {examRoomState.timeRemainingSeconds < 300 ? 'border-red-300 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 animate-pulse' : 'border-slate-200 dark:border-[#282A2C] bg-slate-50 dark:bg-[#282A2C] text-slate-700 dark:text-[#E3E3E3]'} flex items-center gap-1.5 font-mono font-black text-xs shadow-2xs"
              title="Thời gian làm bài thi"
            >
              <Clock weight="duotone" class="w-4 h-4 {examRoomState.timeRemainingSeconds < 300 ? 'text-red-500' : 'text-orange-500'}" />
              <span>{formatTime(examRoomState.timeRemainingSeconds)}</span>
            </div>
          {/if}
        {/if}
      </div>
    {:else if isHomePage}
      <!-- Chỉ hiện nút đổi chiều ngôn ngữ ở Trang Chủ -->
      <button
        type="button"
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
    {/if}

    <!-- Settings Button (luôn giữ lại) -->
    <button
      type="button"
      onclick={() => (appState.settingsModalOpen = true)}
      class="w-9 h-9 rounded-xl border border-slate-200 dark:border-[#282A2C] bg-slate-50 dark:bg-[#282A2C] hover:bg-slate-100 dark:hover:bg-[#37393B] flex items-center justify-center text-slate-600 dark:text-[#C4C7C5] transition-colors cursor-pointer active:scale-95"
      title="Cài đặt âm thanh & giao diện"
      aria-label="Cài đặt"
    >
      <SlidersHorizontal weight="bold" class="w-4 h-4" />
    </button>
  </div>
</header>

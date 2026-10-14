<script lang="ts">
  import { appState } from '#lib/state/appState.svelte';
  import { examHistoryState } from '#lib/state/examHistoryState.svelte';
  import { tourState } from '#lib/state/tourState.svelte';
  import { mainOnboardingTour } from '#lib/tours/mainOnboardingTour';
  import { toast } from 'svelte-sonner';
  import ConfirmModal from './ConfirmModal.svelte';
  import { fade, fly } from 'svelte/transition';
  import { speakChinese } from '#lib/utils/speech';

  // Phosphor Icons
  import SlidersHorizontal from 'phosphor-svelte/lib/SlidersHorizontal';
  import X from 'phosphor-svelte/lib/X';
  import Palette from 'phosphor-svelte/lib/Palette';
  import Database from 'phosphor-svelte/lib/Database';
  import CloudArrowDown from 'phosphor-svelte/lib/CloudArrowDown';
  import SunDim from 'phosphor-svelte/lib/SunDim';
  import Sun from 'phosphor-svelte/lib/Sun';
  import Moon from 'phosphor-svelte/lib/Moon';
  import Desktop from 'phosphor-svelte/lib/Desktop';
  import SpeakerSimpleHigh from 'phosphor-svelte/lib/SpeakerSimpleHigh';
  import Sliders from 'phosphor-svelte/lib/Sliders';
  import SpeakerSlash from 'phosphor-svelte/lib/SpeakerSlash';
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
  import Sparkle from 'phosphor-svelte/lib/Sparkle';
  import Lightbulb from 'phosphor-svelte/lib/Lightbulb';
  import ImageSquare from 'phosphor-svelte/lib/ImageSquare';
  import ArrowCounterClockwise from 'phosphor-svelte/lib/ArrowCounterClockwise';
  import Keyboard from 'phosphor-svelte/lib/Keyboard';
  import Compass from 'phosphor-svelte/lib/Compass';
  import ClipboardText from 'phosphor-svelte/lib/ClipboardText';
  import BookBookmark from 'phosphor-svelte/lib/BookBookmark';
  import BookmarkSimple from 'phosphor-svelte/lib/BookmarkSimple';
  import Signpost from 'phosphor-svelte/lib/Signpost';
  import Trash from 'phosphor-svelte/lib/Trash';
  import CircleNotch from 'phosphor-svelte/lib/CircleNotch';

  type SettingsTab = 'appearance' | 'sound' | 'preferences' | 'data';
  let currentTab = $state<SettingsTab>('appearance');
  let isTestingVoice = $state(false);

  // Trạng thái hộp thoại xác nhận khi thực hiện hành động nguy hiểm
  let confirmState = $state<{
    open: boolean;
    title: string;
    message: string;
    confirmText: string;
    action: () => void;
  }>({
    open: false,
    title: '',
    message: '',
    confirmText: 'Xác nhận',
    action: () => {}
  });

  function openConfirm(title: string, message: string, confirmText: string, action: () => void) {
    confirmState = {
      open: true,
      title,
      message,
      confirmText,
      action
    };
  }

  function handleResetTours() {
    if (typeof window !== 'undefined') {
      try {
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const k = localStorage.key(i);
          if (k && (k.startsWith('hsk_tour_') || k.startsWith('tour_'))) {
            localStorage.removeItem(k);
          }
        }
        localStorage.removeItem('hsk_tour_voice_enabled');
        toast.success('Đã đặt lại trạng thái hướng dẫn thao tác');
      } catch {
        toast.error('Lỗi khi thao tác bộ nhớ');
      }
    }
  }

  function triggerUpdateModal() {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('dismissUpdate');
    }
    appState.settingsModalOpen = false;
    appState.updateModalOpen = true;
  }

  async function handleTestVoice() {
    if (isTestingVoice) return;
    isTestingVoice = true;
    try {
      await speakChinese('你好！欢迎学习汉语。', appState.volume);
    } catch {
      toast.error('Không thể phát âm thử trên thiết bị này');
    } finally {
      isTestingVoice = false;
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && appState.settingsModalOpen && !confirmState.open) {
      appState.settingsModalOpen = false;
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if appState.settingsModalOpen}
  <div
    class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 transition-all duration-300"
    transition:fade={{ duration: 180 }}
    role="presentation"
  >
    <!-- Background dismiss overlay -->
    <button
      type="button"
      class="absolute inset-0 z-0 bg-transparent border-none cursor-default w-full h-full"
      onclick={() => (appState.settingsModalOpen = false)}
      aria-label="Đóng"
    ></button>

    <!-- Modal / Drawer Container: Dạng Drawer vuốt từ dưới lên trên Mobile, Modal căn giữa trên Desktop -->
    <div
      class="relative z-10 w-full sm:max-w-md md:max-w-2xl lg:max-w-3xl bg-white dark:bg-[#1B1B1B] rounded-t-[2.25rem] sm:rounded-3xl shadow-[0_-15px_40px_rgba(0,0,0,0.2)] sm:shadow-2xl border-t sm:border border-slate-200 dark:border-[#282A2C] overflow-hidden flex flex-col max-h-[88vh] md:h-[530px] transition-colors"
      transition:fly={{ y: 260, duration: 250 }}
      role="dialog"
      aria-modal="true"
      aria-label="Hộp thoại cài đặt"
    >
      <!-- Drag handle indicator for mobile sheet style -->
      <div class="sm:hidden w-12 h-1.5 rounded-full bg-slate-300 dark:bg-[#37393B] mx-auto mt-2.5 mb-1 shrink-0"></div>

      <!-- Header: Tiêu đề và nút đóng -->
      <header class="px-4 sm:px-5 py-3 border-b border-slate-100 dark:border-[#282A2C] flex items-center justify-between shrink-0 bg-slate-50/70 dark:bg-[#1B1B1B]">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0 border border-orange-200/50 dark:border-orange-800/40">
            <SlidersHorizontal weight="duotone" class="w-4.5 h-4.5" />
          </div>
          <h3 class="font-extrabold text-sm sm:text-base text-slate-900 dark:text-[#E3E3E3]">
            Cài đặt
          </h3>
        </div>

        <button
          type="button"
          onclick={() => (appState.settingsModalOpen = false)}
          class="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#282A2C] flex items-center justify-center text-slate-500 dark:text-[#C4C7C5] hover:bg-slate-200 dark:hover:bg-[#37393B] cursor-pointer transition-colors active:scale-95"
          aria-label="Đóng cài đặt"
        >
          <X weight="bold" class="w-4 h-4" />
        </button>
      </header>

      <!-- Thanh tab cho màn hình di động (< md) -->
      <div class="md:hidden px-3 pt-2 pb-1.5 shrink-0 bg-slate-50/50 dark:bg-[#1B1B1B] border-b border-slate-100 dark:border-[#282A2C]">
        <div class="grid grid-cols-4 gap-1 p-1 bg-slate-100 dark:bg-[#242628] rounded-2xl border border-slate-200/60 dark:border-[#303336]">
          <!-- Tab Giao diện -->
          <button
            type="button"
            onclick={() => (currentTab = 'appearance')}
            class={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
              currentTab === 'appearance'
                ? 'bg-white dark:bg-[#1B1B1B] text-indigo-600 dark:text-indigo-400 shadow-2xs font-extrabold'
                : 'text-slate-600 dark:text-[#8E918F] hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Palette weight="duotone" class="w-5 h-5 mb-0.5 text-indigo-500" />
            <span>Giao diện</span>
          </button>

          <!-- Tab Âm thanh -->
          <button
            type="button"
            onclick={() => (currentTab = 'sound')}
            class={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
              currentTab === 'sound'
                ? 'bg-white dark:bg-[#1B1B1B] text-sky-600 dark:text-sky-400 shadow-2xs font-extrabold'
                : 'text-slate-600 dark:text-[#8E918F] hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <SpeakerHigh weight="duotone" class="w-5 h-5 mb-0.5 text-sky-500" />
            <span>Âm thanh</span>
          </button>

          <!-- Tab Tùy chỉnh -->
          <button
            type="button"
            onclick={() => (currentTab = 'preferences')}
            class={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
              currentTab === 'preferences'
                ? 'bg-white dark:bg-[#1B1B1B] text-emerald-600 dark:text-emerald-400 shadow-2xs font-extrabold'
                : 'text-slate-600 dark:text-[#8E918F] hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <SlidersHorizontal weight="duotone" class="w-5 h-5 mb-0.5 text-emerald-500" />
            <span>Tùy chỉnh</span>
          </button>

          <!-- Tab Dữ liệu -->
          <button
            type="button"
            onclick={() => (currentTab = 'data')}
            class={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
              currentTab === 'data'
                ? 'bg-white dark:bg-[#1B1B1B] text-amber-600 dark:text-amber-400 shadow-2xs font-extrabold'
                : 'text-slate-600 dark:text-[#8E918F] hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Database weight="duotone" class="w-5 h-5 mb-0.5 text-amber-500" />
            <span>Dữ liệu</span>
          </button>
        </div>
      </div>

      <!-- Thân modal: 2 cột trên máy tính -->
      <div class="flex-1 min-h-0 flex flex-col md:grid md:grid-cols-12 overflow-hidden">
        
        <!-- Cột trái trên máy tính: Danh sách tab & Nút kiểm tra cập nhật góc dưới -->
        <aside class="hidden md:flex md:col-span-4 lg:col-span-3.5 flex-col justify-between p-3.5 border-r border-slate-100 dark:border-[#282A2C] bg-slate-50/40 dark:bg-[#1B1B1B]/40 shrink-0">
          <nav class="space-y-1.5">
            <!-- Tab 1: Giao diện -->
            <button
              type="button"
              onclick={() => (currentTab = 'appearance')}
              class={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-2xl text-left transition-all cursor-pointer ${
                currentTab === 'appearance'
                  ? 'bg-white dark:bg-[#282A2C] shadow-sm border border-slate-200/80 dark:border-[#37393B] text-slate-900 dark:text-white font-extrabold'
                  : 'text-slate-600 dark:text-[#8E918F] hover:bg-slate-100/70 dark:hover:bg-[#242628] font-bold'
              }`}
            >
              <div class={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                currentTab === 'appearance'
                  ? 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                  : 'bg-slate-100 dark:bg-[#282A2C] text-slate-500 dark:text-[#8E918F]'
              }`}>
                <Palette weight="duotone" class="w-4.5 h-4.5 text-indigo-500" />
              </div>
              <div class="min-w-0">
                <span class="text-xs block leading-tight">Giao diện</span>
                <span class="text-[10px] text-slate-400 dark:text-[#8E918F] block font-normal">Màu nền & hiển thị</span>
              </div>
            </button>

            <!-- Tab 2: Âm thanh -->
            <button
              type="button"
              onclick={() => (currentTab = 'sound')}
              class={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-2xl text-left transition-all cursor-pointer ${
                currentTab === 'sound'
                  ? 'bg-white dark:bg-[#282A2C] shadow-sm border border-slate-200/80 dark:border-[#37393B] text-slate-900 dark:text-white font-extrabold'
                  : 'text-slate-600 dark:text-[#8E918F] hover:bg-slate-100/70 dark:hover:bg-[#242628] font-bold'
              }`}
            >
              <div class={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                currentTab === 'sound'
                  ? 'bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400'
                  : 'bg-slate-100 dark:bg-[#282A2C] text-slate-500 dark:text-[#8E918F]'
              }`}>
                <SpeakerHigh weight="duotone" class="w-4.5 h-4.5 text-sky-500" />
              </div>
              <div class="min-w-0">
                <span class="text-xs block leading-tight">Âm thanh</span>
                <span class="text-[10px] text-slate-400 dark:text-[#8E918F] block font-normal">Âm lượng & giọng đọc</span>
              </div>
            </button>

            <!-- Tab 3: Tùy chỉnh -->
            <button
              type="button"
              onclick={() => (currentTab = 'preferences')}
              class={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-2xl text-left transition-all cursor-pointer ${
                currentTab === 'preferences'
                  ? 'bg-white dark:bg-[#282A2C] shadow-sm border border-slate-200/80 dark:border-[#37393B] text-slate-900 dark:text-white font-extrabold'
                  : 'text-slate-600 dark:text-[#8E918F] hover:bg-slate-100/70 dark:hover:bg-[#242628] font-bold'
              }`}
            >
              <div class={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                currentTab === 'preferences'
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                  : 'bg-slate-100 dark:bg-[#282A2C] text-slate-500 dark:text-[#8E918F]'
              }`}>
                <SlidersHorizontal weight="duotone" class="w-4.5 h-4.5 text-emerald-500" />
              </div>
              <div class="min-w-0">
                <span class="text-xs block leading-tight">Tùy chỉnh</span>
                <span class="text-[10px] text-slate-400 dark:text-[#8E918F] block font-normal">Cá nhân hóa học tập</span>
              </div>
            </button>

            <!-- Tab 4: Dữ liệu -->
            <button
              type="button"
              onclick={() => (currentTab = 'data')}
              class={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-2xl text-left transition-all cursor-pointer ${
                currentTab === 'data'
                  ? 'bg-white dark:bg-[#282A2C] shadow-sm border border-slate-200/80 dark:border-[#37393B] text-slate-900 dark:text-white font-extrabold'
                  : 'text-slate-600 dark:text-[#8E918F] hover:bg-slate-100/70 dark:hover:bg-[#242628] font-bold'
              }`}
            >
              <div class={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                currentTab === 'data'
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                  : 'bg-slate-100 dark:bg-[#282A2C] text-slate-500 dark:text-[#8E918F]'
              }`}>
                <Database weight="duotone" class="w-4.5 h-4.5 text-amber-500" />
              </div>
              <div class="min-w-0">
                <span class="text-xs block leading-tight">Dữ liệu</span>
                <span class="text-[10px] text-slate-400 dark:text-[#8E918F] block font-normal">Bộ nhớ & lịch sử</span>
              </div>
            </button>
          </nav>

          <!-- Kiểm tra cập nhật chuyển xuống dưới bên trái sidebar, nhỏ gọn -->
          <div class="pt-2 border-t border-slate-100 dark:border-[#282A2C]">
            <button
              type="button"
              onclick={triggerUpdateModal}
              class="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-cyan-50/70 hover:bg-cyan-100 dark:bg-cyan-950/30 dark:hover:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 border border-cyan-200/60 dark:border-cyan-800/50 text-xs font-bold transition-all cursor-pointer active:scale-98"
              title="Kiểm tra phiên bản bài học mới nhất"
            >
              <span class="flex items-center gap-2">
                <CloudArrowDown weight="duotone" class="w-4 h-4 text-cyan-500" />
                <span>Kiểm tra bản mới</span>
              </span>
              <span class="text-[10px] font-mono text-cyan-600/80 dark:text-cyan-400/80">v2.0</span>
            </button>
          </div>
        </aside>

        <!-- Cột phải: Nội dung chi tiết từng tab -->
        <main class="flex-1 min-h-0 md:col-span-8 lg:col-span-8.5 overflow-y-auto p-3.5 sm:p-4 space-y-3">
          
          <!-- TAB 1: GIAO DIỆN -->
          {#if currentTab === 'appearance'}
            <div class="space-y-3 animate-in fade-in duration-100">
              
              <!-- Chế độ màu nền -->
              <div class="bg-slate-50 dark:bg-[#282A2C]/80 p-3.5 rounded-2xl border border-slate-200 dark:border-[#37393B] space-y-2.5">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-200/60 dark:border-amber-800/50">
                      <SunDim weight="duotone" class="w-5 h-5" />
                    </div>
                    <div>
                      <span class="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-[#E3E3E3] block leading-tight">Giao diện màu nền</span>
                      <span class="text-[11px] text-slate-500 dark:text-[#8E918F] block mt-0.5">Tùy chỉnh sáng, tối hoặc theo hệ điều hành</span>
                    </div>
                  </div>
                  <span class="text-[11px] font-bold text-slate-500 dark:text-[#8E918F] bg-slate-200/70 dark:bg-[#1B1B1B] px-2 py-0.5 rounded-md">
                    {appState.themeMode === 'system' ? 'Tự động' : appState.themeMode === 'dark' ? 'Tối' : 'Sáng'}
                  </span>
                </div>

                <div class="grid grid-cols-3 gap-1.5 p-1 bg-slate-200/70 dark:bg-[#1B1B1B] rounded-xl border border-slate-300/40 dark:border-[#37393B]/60">
                  <button
                    type="button"
                    onclick={() => appState.setThemeMode('light')}
                    class={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      appState.themeMode === 'light'
                        ? 'bg-white text-slate-900 shadow-2xs font-extrabold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Sun weight={appState.themeMode === 'light' ? 'fill' : 'regular'} class="w-4 h-4 text-amber-500" />
                    <span>Sáng</span>
                  </button>

                  <button
                    type="button"
                    onclick={() => appState.setThemeMode('dark')}
                    class={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      appState.themeMode === 'dark'
                        ? 'bg-white dark:bg-[#282A2C] text-slate-900 dark:text-white shadow-2xs font-extrabold border border-transparent dark:border-[#37393B]'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Moon weight={appState.themeMode === 'dark' ? 'fill' : 'regular'} class="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                    <span>Tối</span>
                  </button>

                  <button
                    type="button"
                    onclick={() => appState.setThemeMode('system')}
                    class={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      appState.themeMode === 'system'
                        ? 'bg-white dark:bg-[#282A2C] text-slate-900 dark:text-white shadow-2xs font-extrabold border border-transparent dark:border-[#37393B]'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Desktop weight={appState.themeMode === 'system' ? 'fill' : 'regular'} class="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    <span>Tự động</span>
                  </button>
                </div>
              </div>

              <!-- Cập nhật ứng dụng -->
              <div class="flex items-center justify-between bg-slate-50 dark:bg-[#282A2C]/80 p-3.5 rounded-2xl border border-slate-200 dark:border-[#37393B]">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-200/60 dark:border-cyan-800/50">
                    <CloudArrowDown weight="duotone" class="w-5 h-5" />
                  </div>
                  <div>
                    <span class="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-[#E3E3E3] block leading-tight">Cập nhật ứng dụng</span>
                    <span class="text-[11px] text-slate-500 dark:text-[#8E918F] block mt-0.5">Kiểm tra bài học và tính năng mới nhất (v2.0)</span>
                  </div>
                </div>

                <button
                  type="button"
                  onclick={triggerUpdateModal}
                  class="px-3 py-1.5 rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 border border-cyan-200 dark:border-cyan-800/60 text-xs font-bold transition-all cursor-pointer active:scale-95 shrink-0"
                >
                  Kiểm tra
                </button>
              </div>

            </div>
          {/if}

          <!-- TAB 2: ÂM THANH / GIỌNG ĐỌC -->
          {#if currentTab === 'sound'}
            <div class="space-y-3 animate-in fade-in duration-100">
              
              <!-- Thanh điều chỉnh âm lượng giọng đọc -->
              <div class="bg-slate-50 dark:bg-[#282A2C]/80 p-3.5 rounded-2xl border border-slate-200 dark:border-[#37393B] space-y-3">
                <div class="flex justify-between items-center">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 border border-sky-200/60 dark:border-sky-800/50">
                      <Sliders weight="duotone" class="w-5 h-5" />
                    </div>
                    <div>
                      <span class="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-[#E3E3E3] block leading-tight">Âm lượng giọng đọc</span>
                      <span class="text-[11px] text-slate-500 dark:text-[#8E918F] block mt-0.5">Độ to nhỏ khi phát âm từ vựng</span>
                    </div>
                  </div>
                  <span class="text-xs font-black text-sky-600 dark:text-sky-400 font-mono bg-sky-100/70 dark:bg-sky-950/60 px-2 py-0.5 rounded-md">
                    {Math.round(appState.volume * 100)}%
                  </span>
                </div>

                <div class="flex items-center gap-3 pt-1">
                  <SpeakerSlash weight="duotone" class="w-4.5 h-4.5 text-slate-400 dark:text-[#8E918F] shrink-0" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={appState.volume}
                    oninput={(e) => {
                      appState.volume = parseFloat((e.target as HTMLInputElement).value);
                      appState.saveToLocalStorage();
                    }}
                    class="w-full h-2 bg-slate-200 dark:bg-[#37393B] rounded-lg appearance-none cursor-pointer accent-sky-500"
                    aria-label="Thanh chỉnh âm lượng giọng đọc"
                  />
                  <SpeakerHigh weight="duotone" class="w-4.5 h-4.5 text-sky-500 shrink-0" />
                </div>

                <!-- Nút phát âm thử nghiệm âm lượng -->
                <div class="pt-1">
                  <button
                    type="button"
                    onclick={handleTestVoice}
                    disabled={isTestingVoice}
                    class="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-900/50 text-xs font-bold transition-all cursor-pointer active:scale-98 disabled:opacity-50"
                  >
                    {#if isTestingVoice}
                      <CircleNotch weight="bold" class="w-4 h-4 animate-spin text-sky-600" />
                      <span>Đang phát thử...</span>
                    {:else}
                      <SpeakerHigh weight="bold" class="w-4 h-4 text-sky-600 dark:text-sky-400" />
                      <span>Nghe thử âm lượng (你好 Nǐ hǎo)</span>
                    {/if}
                  </button>
                </div>
              </div>

              <!-- Thẻ thông tin công nghệ giọng đọc Putonghua -->
              <div class="flex items-start gap-3 bg-blue-50/70 dark:bg-[#282A2C]/90 p-3.5 rounded-2xl border border-blue-200 dark:border-[#37393B]">
                <div class="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200/60 dark:border-blue-800/50">
                  <SpeakerSimpleHigh weight="duotone" class="w-5 h-5" />
                </div>
                <div>
                  <span class="font-extrabold text-xs sm:text-sm text-blue-900 dark:text-blue-300 block leading-tight">Giọng đọc tiếng Trung chuẩn</span>
                  <p class="text-[11px] text-blue-900/80 dark:text-blue-300/80 font-normal leading-relaxed mt-0.5">
                    Hệ thống tự động sử dụng giọng đọc tiếng Trung phổ thông (Putonghua zh-CN) có sẵn chất lượng cao nhất trên trình duyệt của thiết bị.
                  </p>
                </div>
              </div>

            </div>
          {/if}

          <!-- TAB 3: TÙY CHỈNH / CÁ NHÂN HÓA (CÁC TÍNH NĂNG BẬT/TẮT DÙNG TOGGLE BUTTON) -->
          {#if currentTab === 'preferences'}
            <div class="space-y-2.5 animate-in fade-in duration-100">
              
              <!-- Tự động phát âm -->
              <div class="flex items-center justify-between bg-slate-50 dark:bg-[#282A2C]/80 p-3 rounded-2xl border border-slate-200 dark:border-[#37393B]">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200/60 dark:border-emerald-800/50">
                    <SpeakerSimpleHigh weight="duotone" class="w-5 h-5" />
                  </div>
                  <div>
                    <span class="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-[#E3E3E3] block leading-tight">Tự động phát âm</span>
                    <span class="text-[11px] text-slate-500 dark:text-[#8E918F] block mt-0.5">Đọc từ vựng khi đổi thẻ bài</span>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Bật hoặc tắt tự động phát âm"
                  title="Bật hoặc tắt tự động phát âm"
                  onclick={() => {
                    appState.autoPlay = !appState.autoPlay;
                    appState.saveToLocalStorage();
                  }}
                  class={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${appState.autoPlay ? 'bg-blue-600' : 'bg-slate-300 dark:bg-[#37393B]'}`}
                >
                  <div class={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${appState.autoPlay ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>

              <!-- Gấu trúc đồng hành chúc mừng -->
              <div class="flex items-center justify-between bg-slate-50 dark:bg-[#282A2C]/80 p-3 rounded-2xl border border-slate-200 dark:border-[#37393B]">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-200/60 dark:border-purple-800/50">
                    <Sparkle weight="duotone" class="w-5 h-5" />
                  </div>
                  <div>
                    <span class="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-[#E3E3E3] block leading-tight">Gấu trúc chúc mừng</span>
                    <span class="text-[11px] text-slate-500 dark:text-[#8E918F] block mt-0.5">Hiện hoạt hình cổ vũ sau mỗi câu trả lời (Ôn tập & Thi nhanh)</span>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Bật hoặc tắt gấu trúc chúc mừng"
                  title="Bật hoặc tắt gấu trúc chúc mừng"
                  onclick={() => {
                    appState.enableFeedbackDrawer = !appState.enableFeedbackDrawer;
                    appState.saveToLocalStorage();
                  }}
                  class={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${appState.enableFeedbackDrawer ? 'bg-blue-600' : 'bg-slate-300 dark:bg-[#37393B]'}`}
                >
                  <div class={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${appState.enableFeedbackDrawer ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>

              <!-- Bật / Tắt Gợi ý ký tự Pinyin -->
              <div class="flex items-center justify-between bg-slate-50 dark:bg-[#282A2C]/80 p-3 rounded-2xl border border-slate-200 dark:border-[#37393B]">
                <div class="flex items-center gap-3 pr-2">
                  <div class="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-200/60 dark:border-amber-800/50">
                    <Lightbulb weight="duotone" class="w-5 h-5" />
                  </div>
                  <div>
                    <span class="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-[#E3E3E3] block leading-tight">Gợi ý ký tự Pinyin</span>
                    <span class="text-[11px] text-slate-500 dark:text-[#8E918F] block mt-0.5">
                      Gợi ý 1-2 ký tự mẫu khi ghép từ (chế độ Chọn thẻ)
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Bật hoặc tắt gợi ý ký tự Pinyin"
                  title="Bật hoặc tắt gợi ý ký tự Pinyin"
                  onclick={() => appState.toggleFillHints()}
                  class={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${appState.enableFillHints ? 'bg-blue-600' : 'bg-slate-300 dark:bg-[#37393B]'}`}
                >
                  <div class={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${appState.enableFillHints ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>

              <!-- Bật / Tắt Hiển thị ảnh minh họa trên trang chủ -->
              <div class="flex items-center justify-between bg-slate-50 dark:bg-[#282A2C]/80 p-3 rounded-2xl border border-slate-200 dark:border-[#37393B]">
                <div class="flex items-center gap-3 pr-2">
                  <div class="w-10 h-10 rounded-xl bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 border border-sky-200/60 dark:border-sky-800/50">
                    <ImageSquare weight="duotone" class="w-5 h-5" />
                  </div>
                  <div>
                    <span class="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-[#E3E3E3] block leading-tight">Hiển thị ảnh minh họa</span>
                    <span class="text-[11px] text-slate-500 dark:text-[#8E918F] block mt-0.5">
                      Khung ảnh minh họa trên câu hỏi ôn tập
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Bật hoặc tắt hiển thị ảnh minh họa câu hỏi"
                  title="Bật hoặc tắt hiển thị ảnh minh họa câu hỏi"
                  onclick={() => appState.toggleShowQuestionImages()}
                  class={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${appState.showQuestionImages ? 'bg-blue-600' : 'bg-slate-300 dark:bg-[#37393B]'}`}
                >
                  <div class={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${appState.showQuestionImages ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>

              <!-- Học lại bài này -->
              <div class="flex items-center justify-between bg-slate-50 dark:bg-[#282A2C]/80 p-3 rounded-2xl border border-slate-200 dark:border-[#37393B]">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 border border-rose-200/60 dark:border-rose-800/50">
                    <ArrowCounterClockwise weight="duotone" class="w-5 h-5" />
                  </div>
                  <div>
                    <span class="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-[#E3E3E3] block leading-tight">Học lại bài này</span>
                    <span class="text-[11px] text-slate-500 dark:text-[#8E918F] block mt-0.5">Làm lại từ đầu các từ vựng trong bài hiện tại</span>
                  </div>
                </div>

                <button
                  type="button"
                  onclick={() => {
                    appState.resetCurrentTab();
                    appState.settingsModalOpen = false;
                  }}
                  class="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 text-xs font-bold transition-all cursor-pointer active:scale-95 shrink-0"
                >
                  Làm lại
                </button>
              </div>

              <!-- Xem lại hướng dẫn thao tác -->
              <div class="flex items-center justify-between bg-slate-50 dark:bg-[#282A2C]/80 p-3 rounded-2xl border border-slate-200 dark:border-[#37393B]">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-violet-500/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0 border border-violet-200/60 dark:border-violet-800/50">
                    <Compass weight="duotone" class="w-5 h-5" />
                  </div>
                  <div>
                    <span class="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-[#E3E3E3] block leading-tight">Hướng dẫn thao tác</span>
                    <span class="text-[11px] text-slate-500 dark:text-[#8E918F] block mt-0.5">Xem lại các bước giới thiệu màn hình chính</span>
                  </div>
                </div>

                <button
                  type="button"
                  onclick={() => {
                    appState.settingsModalOpen = false;
                    tourState.resetTour(mainOnboardingTour);
                    tourState.startTour(mainOnboardingTour, true);
                  }}
                  class="px-3 py-1.5 rounded-xl bg-violet-50 hover:bg-violet-100 dark:bg-violet-950/40 dark:hover:bg-violet-900/60 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-900/50 text-xs font-bold transition-all cursor-pointer active:scale-95 shrink-0"
                >
                  Bắt đầu
                </button>
              </div>

              <!-- Mẹo gõ Telex Pinyin -->
              <div class="flex items-start gap-3 bg-blue-50/70 dark:bg-[#282A2C]/90 p-3 rounded-2xl border border-blue-200 dark:border-[#37393B]">
                <div class="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200/60 dark:border-blue-800/50">
                  <Keyboard weight="duotone" class="w-5 h-5" />
                </div>
                <div>
                  <span class="font-extrabold text-xs sm:text-sm text-blue-900 dark:text-blue-300 block leading-tight">Gõ Telex Pinyin</span>
                  <p class="text-xs text-blue-900/80 dark:text-blue-300/80 font-semibold leading-relaxed mt-0.5">
                    Gõ số dấu thanh <code class="bg-white dark:bg-[#1B1B1B] px-1 py-0.5 rounded font-mono text-blue-700 dark:text-blue-300">ni3hao3</code> hoặc gõ telex <code class="bg-white dark:bg-[#1B1B1B] px-1 py-0.5 rounded font-mono text-blue-700 dark:text-blue-300">nihaoj</code> sẽ tự chuyển thành Pinyin chuẩn.
                  </p>
                </div>
              </div>

            </div>
          {/if}

          <!-- TAB 4: BỘ NHỚ MÁY / DỮ LIỆU -->
          {#if currentTab === 'data'}
            <div class="space-y-2.5 animate-in fade-in duration-100">
              
              <!-- Lịch sử thi thử HSK 2 -->
              <div class="flex items-center justify-between bg-slate-50 dark:bg-[#282A2C]/80 p-3 rounded-2xl border border-slate-200 dark:border-[#37393B]">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0 border border-orange-200/60 dark:border-orange-800/50">
                    <ClipboardText weight="duotone" class="w-5 h-5" />
                  </div>
                  <div>
                    <div class="flex items-center gap-1.5">
                      <span class="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-[#E3E3E3] leading-tight">Lịch sử thi thử</span>
                      <span class="text-[10px] font-bold text-orange-600 dark:text-orange-400 bg-orange-100/70 dark:bg-orange-950/50 px-1.5 py-0.2 rounded font-mono">
                        {examHistoryState.records.length} bài
                      </span>
                    </div>
                    <span class="text-[11px] text-slate-500 dark:text-[#8E918F] block mt-0.5">
                      Xóa toàn bộ điểm và bài thi thử HSK 2 đã làm
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={examHistoryState.records.length === 0}
                  onclick={() => openConfirm(
                    'Xóa lịch sử thi thử?',
                    'Toàn bộ điểm và các bài thi thử HSK 2 đã lưu sẽ bị xóa vĩnh viễn.',
                    'Xóa lịch sử',
                    () => {
                      examHistoryState.clearHistory();
                      toast.success('Đã xóa lịch sử thi thử HSK 2');
                    }
                  )}
                  class="px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 dark:bg-orange-950/40 dark:hover:bg-orange-900/60 disabled:opacity-40 disabled:cursor-not-allowed text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-900/50 text-xs font-bold transition-all cursor-pointer active:scale-95 shrink-0"
                >
                  Xóa
                </button>
              </div>

              <!-- Tiến độ học ngữ pháp -->
              <div class="flex items-center justify-between bg-slate-50 dark:bg-[#282A2C]/80 p-3 rounded-2xl border border-slate-200 dark:border-[#37393B]">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200/60 dark:border-emerald-800/50">
                    <BookBookmark weight="duotone" class="w-5 h-5" />
                  </div>
                  <div>
                    <span class="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-[#E3E3E3] block leading-tight">Tiến độ ngữ pháp</span>
                    <span class="text-[11px] text-slate-500 dark:text-[#8E918F] block mt-0.5">Xóa đánh dấu các điểm ngữ pháp đã học</span>
                  </div>
                </div>

                <button
                  type="button"
                  onclick={() => openConfirm(
                    'Đặt lại tiến độ ngữ pháp?',
                    'Tất cả các điểm ngữ pháp đã đánh dấu hoàn thành sẽ bị xóa.',
                    'Đặt lại',
                    () => {
                      localStorage.removeItem('hsk2_grammar_learned_ids');
                      toast.success('Đã đặt lại tiến độ học ngữ pháp');
                    }
                  )}
                  class="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50 text-xs font-bold transition-all cursor-pointer active:scale-95 shrink-0"
                >
                  Đặt lại
                </button>
              </div>

              <!-- Danh sách từ vựng yêu thích -->
              <div class="flex items-center justify-between bg-slate-50 dark:bg-[#282A2C]/80 p-3 rounded-2xl border border-slate-200 dark:border-[#37393B]">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-200/60 dark:border-amber-800/50">
                    <BookmarkSimple weight="duotone" class="w-5 h-5" />
                  </div>
                  <div>
                    <span class="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-[#E3E3E3] block leading-tight">Từ vựng yêu thích</span>
                    <span class="text-[11px] text-slate-500 dark:text-[#8E918F] block mt-0.5">Xóa danh sách từ đã gắn dấu sao trong từ điển</span>
                  </div>
                </div>

                <button
                  type="button"
                  onclick={() => openConfirm(
                    'Xóa từ vựng yêu thích?',
                    'Toàn bộ danh sách từ vựng đã đánh dấu sao trong từ điển sẽ bị xóa.',
                    'Xóa danh sách',
                    () => {
                      localStorage.removeItem('HSK_DICT_BOOKMARKS');
                      toast.success('Đã xóa danh sách từ vựng yêu thích');
                    }
                  )}
                  class="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50 text-xs font-bold transition-all cursor-pointer active:scale-95 shrink-0"
                >
                  Xóa
                </button>
              </div>

              <!-- Trạng thái hướng dẫn thao tác -->
              <div class="flex items-center justify-between bg-slate-50 dark:bg-[#282A2C]/80 p-3 rounded-2xl border border-slate-200 dark:border-[#37393B]">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 border border-teal-200/60 dark:border-teal-800/50">
                    <Signpost weight="duotone" class="w-5 h-5" />
                  </div>
                  <div>
                    <span class="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-[#E3E3E3] block leading-tight">Bộ nhớ hướng dẫn</span>
                    <span class="text-[11px] text-slate-500 dark:text-[#8E918F] block mt-0.5">Xóa ghi nhớ các hướng dẫn bạn đã từng xem</span>
                  </div>
                </div>

                <button
                  type="button"
                  onclick={() => openConfirm(
                    'Đặt lại bộ nhớ hướng dẫn?',
                    'Các hướng dẫn thao tác sẽ được bật lại từ đầu.',
                    'Đặt lại',
                    handleResetTours
                  )}
                  class="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/40 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-900/50 text-xs font-bold transition-all cursor-pointer active:scale-95 shrink-0"
                >
                  Đặt lại
                </button>
              </div>

              <!-- Khôi phục cài đặt gốc -->
              <div class="flex items-center justify-between bg-rose-50/60 dark:bg-rose-950/20 p-3 rounded-2xl border border-rose-200 dark:border-rose-900/40 mt-1">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 border border-rose-200/60 dark:border-rose-800/50">
                    <Trash weight="duotone" class="w-5 h-5" />
                  </div>
                  <div>
                    <span class="font-extrabold text-xs sm:text-sm text-rose-900 dark:text-rose-200 block leading-tight">Khôi phục cài đặt gốc</span>
                    <span class="text-[11px] text-rose-700/80 dark:text-rose-300/70 block mt-0.5">Đặt lại toàn bộ ứng dụng về trạng thái ban đầu</span>
                  </div>
                </div>

                <button
                  type="button"
                  onclick={() => openConfirm(
                    'Khôi phục cài đặt gốc?',
                    'Toàn bộ tùy chọn, bộ lọc bài học và dữ liệu máy sẽ bị xóa về mặc định.',
                    'Xóa tất cả',
                    () => {
                      appState.resetAllSettings();
                      examHistoryState.clearHistory();
                      toast.success('Đã khôi phục toàn bộ cài đặt gốc');
                    }
                  )}
                  class="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black transition-all cursor-pointer active:scale-95 shadow-2xs shrink-0"
                >
                  Xóa tất cả
                </button>
              </div>

            </div>
          {/if}

        </main>
      </div>

    </div>
  </div>
{/if}

<!-- Hộp thoại xác nhận hành động nguy hiểm -->
<ConfirmModal
  open={confirmState.open}
  title={confirmState.title}
  message={confirmState.message}
  confirmText={confirmState.confirmText}
  onConfirm={() => {
    confirmState.action();
    confirmState.open = false;
  }}
  onCancel={() => {
    confirmState.open = false;
  }}
/>

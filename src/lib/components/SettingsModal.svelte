<script lang="ts">
  import { appState } from '#lib/state/appState.svelte';
  import { examHistoryState } from '#lib/state/examHistoryState.svelte';
  import { tourState } from '#lib/state/tourState.svelte';
  import { mainOnboardingTour } from '#lib/tours/mainOnboardingTour';
  import { toast } from 'svelte-sonner';

  // Phosphor Icons
  import SlidersHorizontal from 'phosphor-svelte/lib/SlidersHorizontal';
  import X from 'phosphor-svelte/lib/X';
  import PaintBrush from 'phosphor-svelte/lib/PaintBrush';
  import GraduationCap from 'phosphor-svelte/lib/GraduationCap';
  import Database from 'phosphor-svelte/lib/Database';
  import Sun from 'phosphor-svelte/lib/Sun';
  import Moon from 'phosphor-svelte/lib/Moon';
  import Desktop from 'phosphor-svelte/lib/Desktop';
  import SpeakerSimpleHigh from 'phosphor-svelte/lib/SpeakerSimpleHigh';
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
  import SpeakerSlash from 'phosphor-svelte/lib/SpeakerSlash';
  import Sparkle from 'phosphor-svelte/lib/Sparkle';
  import CloudArrowDown from 'phosphor-svelte/lib/CloudArrowDown';
  import Lightbulb from 'phosphor-svelte/lib/Lightbulb';
  import ArrowCounterClockwise from 'phosphor-svelte/lib/ArrowCounterClockwise';
  import Keyboard from 'phosphor-svelte/lib/Keyboard';
  import Compass from 'phosphor-svelte/lib/Compass';
  import ClipboardText from 'phosphor-svelte/lib/ClipboardText';
  import BookBookmark from 'phosphor-svelte/lib/BookBookmark';
  import BookmarkSimple from 'phosphor-svelte/lib/BookmarkSimple';
  import Trash from 'phosphor-svelte/lib/Trash';

  type SettingsTab = 'system' | 'learning' | 'data';
  let currentTab = $state<SettingsTab>('system');

  function handleResetExamHistory() {
    examHistoryState.clearHistory();
    toast.success('Đã đặt lại toàn bộ lịch sử thi thử HSK 2');
  }

  function handleResetGrammarProgress() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('hsk2_grammar_learned_ids');
        toast.success('Đã đặt lại tiến độ học ngữ pháp');
      } catch {
        toast.error('Không thể thao tác bộ nhớ trình duyệt');
      }
    }
  }

  function handleResetBookmarks() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('HSK_DICT_BOOKMARKS');
        toast.success('Đã xóa toàn bộ danh sách từ vựng yêu thích');
      } catch {
        toast.error('Không thể thao tác bộ nhớ trình duyệt');
      }
    }
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
        toast.success('Đã đặt lại trạng thái các hướng dẫn sử dụng');
      } catch {
        toast.error('Không thể thao tác bộ nhớ trình duyệt');
      }
    }
  }

  function handleResetAllSettings() {
    appState.resetAllSettings();
    examHistoryState.clearHistory();
    toast.success('Đã khôi phục toàn bộ cài đặt gốc thành công');
  }
</script>

{#if appState.settingsModalOpen}
  <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-150">
    <div class="w-full max-w-md md:max-w-3xl lg:max-w-4xl bg-white dark:bg-[#1B1B1B] rounded-3xl shadow-2xl border border-slate-200 dark:border-[#282A2C] overflow-hidden flex flex-col max-h-[92vh] md:h-[540px] animate-[pop_0.15s_ease] transition-colors">
      
      <!-- Top Modal Header -->
      <header class="px-5 py-3.5 sm:py-4 border-b border-slate-100 dark:border-[#282A2C] flex items-center justify-between shrink-0 bg-slate-50/60 dark:bg-[#1B1B1B]">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0 shadow-2xs">
            <SlidersHorizontal weight="duotone" class="w-5 h-5" />
          </div>
          <div>
            <h3 class="font-extrabold text-base text-slate-900 dark:text-[#E3E3E3] leading-tight">
              Cài đặt hệ thống
            </h3>
            <p class="text-[11px] font-semibold text-slate-500 dark:text-[#8E918F]">
              Tùy chỉnh giao diện, học tập và quản lý dữ liệu lưu trữ
            </p>
          </div>
        </div>

        <button
          type="button"
          onclick={() => (appState.settingsModalOpen = false)}
          class="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#282A2C] flex items-center justify-center text-slate-600 dark:text-[#C4C7C5] hover:bg-slate-200 dark:hover:bg-[#37393B] cursor-pointer transition-colors"
          aria-label="Đóng cài đặt"
        >
          <X weight="bold" class="w-4 h-4" />
        </button>
      </header>

      <!-- Mobile Tab Bar (< md) -->
      <div class="md:hidden px-4 pt-3 pb-1 shrink-0 bg-slate-50/30 dark:bg-[#1B1B1B]">
        <div class="grid grid-cols-3 gap-1 p-1 bg-slate-100 dark:bg-[#242628] rounded-2xl border border-slate-200/60 dark:border-[#303336]">
          <button
            type="button"
            onclick={() => (currentTab = 'system')}
            class={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentTab === 'system'
                ? 'bg-white dark:bg-[#1B1B1B] text-indigo-600 dark:text-indigo-400 shadow-2xs font-extrabold'
                : 'text-slate-600 dark:text-[#8E918F] hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <PaintBrush weight="duotone" class="w-4 h-4 text-indigo-500" />
            <span>Giao diện</span>
          </button>

          <button
            type="button"
            onclick={() => (currentTab = 'learning')}
            class={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentTab === 'learning'
                ? 'bg-white dark:bg-[#1B1B1B] text-emerald-600 dark:text-emerald-400 shadow-2xs font-extrabold'
                : 'text-slate-600 dark:text-[#8E918F] hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap weight="duotone" class="w-4 h-4 text-emerald-500" />
            <span>Học tập</span>
          </button>

          <button
            type="button"
            onclick={() => (currentTab = 'data')}
            class={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentTab === 'data'
                ? 'bg-white dark:bg-[#1B1B1B] text-sky-600 dark:text-sky-400 shadow-2xs font-extrabold'
                : 'text-slate-600 dark:text-[#8E918F] hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Database weight="duotone" class="w-4 h-4 text-sky-500" />
            <span>Dữ liệu</span>
          </button>
        </div>
      </div>

      <!-- Main Body Container: 2 Cột trên Desktop, 1 Cột trên Mobile -->
      <div class="flex-1 min-h-0 flex flex-col md:grid md:grid-cols-12 overflow-hidden">
        
        <!-- Left Sidebar Tabs (Desktop >= md) -->
        <aside class="hidden md:flex md:col-span-4 lg:col-span-3.5 flex-col justify-between p-4 border-r border-slate-100 dark:border-[#282A2C] bg-slate-50/40 dark:bg-[#1B1B1B]/40 shrink-0">
          <nav class="space-y-2">
            <!-- Tab 1: Giao diện & Âm thanh -->
            <button
              type="button"
              onclick={() => (currentTab = 'system')}
              class={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left transition-all cursor-pointer ${
                currentTab === 'system'
                  ? 'bg-white dark:bg-[#282A2C] shadow-sm border border-slate-200/80 dark:border-[#37393B] text-slate-900 dark:text-white font-extrabold ring-1 ring-indigo-500/15'
                  : 'text-slate-600 dark:text-[#8E918F] hover:bg-slate-100/70 dark:hover:bg-[#242628] font-bold'
              }`}
            >
              <div class={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                currentTab === 'system'
                  ? 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                  : 'bg-slate-100 dark:bg-[#282A2C] text-slate-500 dark:text-[#8E918F]'
              }`}>
                <PaintBrush weight="duotone" class="w-4 h-4 text-indigo-500" />
              </div>
              <div class="min-w-0">
                <div class="text-xs leading-none mb-1">Giao diện & Âm thanh</div>
                <div class="text-[11px] font-normal text-slate-400 dark:text-[#8E918F] truncate">Màu nền, loa đọc, popup</div>
              </div>
            </button>

            <!-- Tab 2: Học tập & Gõ từ -->
            <button
              type="button"
              onclick={() => (currentTab = 'learning')}
              class={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left transition-all cursor-pointer ${
                currentTab === 'learning'
                  ? 'bg-white dark:bg-[#282A2C] shadow-sm border border-slate-200/80 dark:border-[#37393B] text-slate-900 dark:text-white font-extrabold ring-1 ring-emerald-500/15'
                  : 'text-slate-600 dark:text-[#8E918F] hover:bg-slate-100/70 dark:hover:bg-[#242628] font-bold'
              }`}
            >
              <div class={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                currentTab === 'learning'
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                  : 'bg-slate-100 dark:bg-[#282A2C] text-slate-500 dark:text-[#8E918F]'
              }`}>
                <GraduationCap weight="duotone" class="w-4 h-4 text-emerald-500" />
              </div>
              <div class="min-w-0">
                <div class="text-xs leading-none mb-1">Học tập & Gõ từ</div>
                <div class="text-[11px] font-normal text-slate-400 dark:text-[#8E918F] truncate">Gợi ý, mẹo telex, ôn thẻ</div>
              </div>
            </button>

            <!-- Tab 3: Dữ liệu lưu trữ -->
            <button
              type="button"
              onclick={() => (currentTab = 'data')}
              class={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left transition-all cursor-pointer ${
                currentTab === 'data'
                  ? 'bg-white dark:bg-[#282A2C] shadow-sm border border-slate-200/80 dark:border-[#37393B] text-slate-900 dark:text-white font-extrabold ring-1 ring-sky-500/15'
                  : 'text-slate-600 dark:text-[#8E918F] hover:bg-slate-100/70 dark:hover:bg-[#242628] font-bold'
              }`}
            >
              <div class={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                currentTab === 'data'
                  ? 'bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400'
                  : 'bg-slate-100 dark:bg-[#282A2C] text-slate-500 dark:text-[#8E918F]'
              }`}>
                <Database weight="duotone" class="w-4 h-4 text-sky-500" />
              </div>
              <div class="min-w-0">
                <div class="text-xs leading-none mb-1">Dữ liệu lưu trữ</div>
                <div class="text-[11px] font-normal text-slate-400 dark:text-[#8E918F] truncate">Bộ nhớ máy, lịch sử thi</div>
              </div>
            </button>
          </nav>

          <!-- Sidebar Footer Status -->
          <div class="pt-3 border-t border-slate-100 dark:border-[#282A2C] text-[11px] text-slate-400 dark:text-[#8E918F] flex items-center justify-between">
            <span>Ứng dụng HSK 2</span>
            <span class="font-bold text-emerald-600 dark:text-emerald-400">Đã đồng bộ</span>
          </div>
        </aside>

        <!-- Right Content Panel (Desktop >= md col-span-8) -->
        <main class="flex-1 min-h-0 md:col-span-8 lg:col-span-8.5 overflow-y-auto p-4 sm:p-5 space-y-3.5">
          
          <!-- TAB 1: GIAO DIỆN & ÂM THANH -->
          {#if currentTab === 'system'}
            <div class="space-y-3 animate-in fade-in duration-100">
              
              <!-- Giao diện Sáng / Tối / Hệ thống -->
              <div class="bg-slate-50 dark:bg-[#282A2C]/80 p-3.5 rounded-2xl border border-slate-200 dark:border-[#37393B] space-y-2.5">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                      <PaintBrush weight="duotone" class="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span class="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-[#E3E3E3] block leading-tight">Giao diện màu sắc</span>
                      <span class="text-[11px] text-slate-400 dark:text-[#8E918F] hidden sm:block">Lựa chọn chế độ nền phù hợp thị giác</span>
                    </div>
                  </div>
                  <span class="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-lg border border-indigo-200/50 dark:border-indigo-800/40">
                    {appState.themeMode === 'system' ? 'Theo hệ thống' : appState.themeMode === 'dark' ? 'Nền tối' : 'Nền sáng'}
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
                    <Sun weight={appState.themeMode === 'light' ? 'fill' : 'regular'} class="w-3.5 h-3.5 text-amber-500" />
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
                    <Moon weight={appState.themeMode === 'dark' ? 'fill' : 'regular'} class="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
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
                    <Desktop weight={appState.themeMode === 'system' ? 'fill' : 'regular'} class="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                    <span>Tự động</span>
                  </button>
                </div>
              </div>

              <!-- Tự động phát âm -->
              <div class="flex items-center justify-between bg-slate-50 dark:bg-[#282A2C]/80 p-3.5 rounded-2xl border border-slate-200 dark:border-[#37393B]">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <SpeakerSimpleHigh weight="duotone" class="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <span class="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-[#E3E3E3] block leading-tight">Tự động phát âm</span>
                    <span class="text-[11px] text-slate-500 dark:text-[#8E918F] block">Đọc to từ vựng tiếng Trung ngay khi chuyển thẻ bài</span>
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
                  class={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${appState.autoPlay ? 'bg-blue-600' : 'bg-slate-300 dark:bg-[#37393B]'}`}
                >
                  <div class={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${appState.autoPlay ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>

              <!-- Âm lượng giọng đọc -->
              <div class="bg-slate-50 dark:bg-[#282A2C]/80 p-3.5 rounded-2xl border border-slate-200 dark:border-[#37393B] space-y-2">
                <div class="flex justify-between items-center">
                  <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                      <SpeakerHigh weight="duotone" class="w-4 h-4 text-sky-500" />
                    </div>
                    <div>
                      <span class="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-[#E3E3E3] block leading-tight">Âm lượng giọng đọc</span>
                      <span class="text-[11px] text-slate-500 dark:text-[#8E918F] block">Cường độ âm thanh khi phát âm mẫu</span>
                    </div>
                  </div>
                  <span class="text-xs font-black text-sky-600 dark:text-sky-400 font-mono bg-sky-50 dark:bg-sky-950/50 px-2 py-0.5 rounded-lg border border-sky-200/50 dark:border-sky-800/40">
                    {Math.round(appState.volume * 100)}%
                  </span>
                </div>

                <div class="flex items-center gap-2.5 pt-1">
                  <SpeakerSlash weight="duotone" class="w-4 h-4 text-slate-400 dark:text-[#8E918F] shrink-0" />
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
                    class="flex-1 h-2 rounded-full cursor-pointer accent-blue-600 bg-slate-200 dark:bg-[#37393B]"
                  />
                  <SpeakerHigh weight="duotone" class="w-4 h-4 text-slate-400 dark:text-[#8E918F] shrink-0" />
                </div>
              </div>

              <!-- Popup Mascot Panda -->
              <div class="flex items-center justify-between bg-slate-50 dark:bg-[#282A2C]/80 p-3.5 rounded-2xl border border-slate-200 dark:border-[#37393B]">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <Sparkle weight="duotone" class="w-4 h-4 text-purple-500" />
                  </div>
                  <div>
                    <span class="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-[#E3E3E3] block leading-tight">Popup Mascot gấu trúc</span>
                    <span class="text-[11px] text-slate-500 dark:text-[#8E918F] block">Hiện ngăn kéo hoạt hình Panda cổ vũ sau mỗi câu</span>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Bật hoặc tắt popup kết quả Mascot"
                  title="Bật hoặc tắt popup kết quả Mascot"
                  onclick={() => {
                    appState.enableFeedbackDrawer = !appState.enableFeedbackDrawer;
                    appState.saveToLocalStorage();
                  }}
                  class={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${appState.enableFeedbackDrawer ? 'bg-blue-600' : 'bg-slate-300 dark:bg-[#37393B]'}`}
                >
                  <div class={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${appState.enableFeedbackDrawer ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>

              <!-- Kiểm tra cập nhật -->
              <div class="flex items-center justify-between bg-slate-50 dark:bg-[#282A2C]/80 p-3.5 rounded-2xl border border-slate-200 dark:border-[#37393B]">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <CloudArrowDown weight="duotone" class="w-4 h-4 text-cyan-500" />
                  </div>
                  <div>
                    <span class="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-[#E3E3E3] block leading-tight">Cập nhật ứng dụng</span>
                    <span class="text-[11px] text-slate-500 dark:text-[#8E918F] block">Kiểm tra phiên bản bài học và tính năng mới nhất</span>
                  </div>
                </div>

                <button
                  type="button"
                  onclick={() => {
                    if (typeof window !== 'undefined') {
                      sessionStorage.removeItem('dismissUpdate');
                    }
                    appState.settingsModalOpen = false;
                    appState.updateModalOpen = true;
                  }}
                  class="px-3 py-1.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-950/40 dark:hover:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/60 text-xs font-bold transition-all cursor-pointer active:scale-95 shrink-0"
                >
                  Kiểm tra ngay
                </button>
              </div>

            </div>
          {/if}

          <!-- TAB 2: HỌC TẬP & GÕ TỪ -->
          {#if currentTab === 'learning'}
            <div class="space-y-3 animate-in fade-in duration-100">
              
              <!-- Bật / Tắt Gợi ý ký tự Pinyin -->
              <div class="flex items-center justify-between bg-slate-50 dark:bg-[#282A2C]/80 p-3.5 rounded-2xl border border-slate-200 dark:border-[#37393B]">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Lightbulb weight="duotone" class="w-4 h-4 text-amber-500" />
                  </div>
                  <div class="pr-2">
                    <div class="flex items-center gap-1.5">
                      <span class="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-[#E3E3E3] leading-tight">Gợi ý ký tự Pinyin</span>
                      <span class="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-100/70 dark:bg-amber-950/50 px-1.5 py-0.2 rounded">Chế độ Chọn từ</span>
                    </div>
                    <span class="text-[11px] text-slate-500 dark:text-[#8E918F] block mt-0.5 leading-snug">
                      Cho sẵn 1-2 ký tự mẫu khi ghép từ dài. Ở chế độ Gõ thủ công sẽ luôn tắt hoàn toàn.
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Bật hoặc tắt gợi ý ký tự Pinyin"
                  title="Bật hoặc tắt gợi ý ký tự Pinyin"
                  onclick={() => appState.toggleFillHints()}
                  class={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${appState.enableFillHints ? 'bg-blue-600' : 'bg-slate-300 dark:bg-[#37393B]'}`}
                >
                  <div class={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${appState.enableFillHints ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>

              <!-- Học lại từ đầu chế độ này -->
              <div class="flex items-center justify-between bg-slate-50 dark:bg-[#282A2C]/80 p-3.5 rounded-2xl border border-slate-200 dark:border-[#37393B]">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                    <ArrowCounterClockwise weight="duotone" class="w-4 h-4 text-rose-500" />
                  </div>
                  <div>
                    <span class="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-[#E3E3E3] block leading-tight">Học lại từ đầu tab này</span>
                    <span class="text-[11px] text-slate-500 dark:text-[#8E918F] block">Xóa kết quả vòng hiện tại và xáo trộn lại thẻ từ vựng</span>
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
                  Bắt đầu lại
                </button>
              </div>

              <!-- Hướng dẫn gõ Telex Pinyin -->
              <div class="bg-blue-50/70 dark:bg-[#282A2C]/90 p-3.5 rounded-2xl border border-blue-200 dark:border-[#37393B] space-y-1.5">
                <div class="flex items-center gap-2">
                  <Keyboard weight="duotone" class="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span class="font-extrabold text-xs sm:text-sm text-blue-900 dark:text-blue-300">Gõ Telex Pinyin tự động</span>
                </div>
                <p class="text-xs text-blue-900/80 dark:text-blue-300/80 leading-relaxed font-semibold">
                  Hỗ trợ cả 2 cách gõ thuận tiện: gõ số dấu thanh <code class="bg-white dark:bg-[#1B1B1B] px-1.5 py-0.5 rounded font-mono text-blue-700 dark:text-blue-300">ni3hao3</code> hoặc gõ telex tự nhiên <code class="bg-white dark:bg-[#1B1B1B] px-1.5 py-0.5 rounded font-mono text-blue-700 dark:text-blue-300">nihaoj</code> sẽ tự chuyển thành Pinyin chuẩn!
                </p>
              </div>

              <!-- Xem lại hướng dẫn sử dụng (Tour) -->
              <div class="flex items-center justify-between bg-slate-50 dark:bg-[#282A2C]/80 p-3.5 rounded-2xl border border-slate-200 dark:border-[#37393B]">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                    <Compass weight="duotone" class="w-4 h-4 text-violet-500" />
                  </div>
                  <div>
                    <span class="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-[#E3E3E3] block leading-tight">Hướng dẫn trải nghiệm</span>
                    <span class="text-[11px] text-slate-500 dark:text-[#8E918F] block">Xem lại tour giới thiệu từng vị trí nút bấm và bài học</span>
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
                  Xem hướng dẫn
                </button>
              </div>

            </div>
          {/if}

          <!-- TAB 3: DỮ LIỆU LƯU TRỮ (LOCALSTORAGE) -->
          {#if currentTab === 'data'}
            <div class="space-y-3 animate-in fade-in duration-100">
              
              <div class="px-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#8E918F]">
                Quản lý các bản ghi lưu trong LocalStorage
              </div>

              <!-- Lịch sử thi thử HSK 2 -->
              <div class="flex items-center justify-between bg-slate-50 dark:bg-[#282A2C]/80 p-3.5 rounded-2xl border border-slate-200 dark:border-[#37393B]">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                    <ClipboardText weight="duotone" class="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <div class="flex items-center gap-1.5">
                      <span class="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-[#E3E3E3] leading-tight">Lịch sử thi thử HSK 2</span>
                      <span class="text-[10px] font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50 px-1.5 py-0.2 rounded font-mono">
                        {examHistoryState.records.length} bài
                      </span>
                    </div>
                    <span class="text-[11px] text-slate-500 dark:text-[#8E918F] block mt-0.5">
                      Bản ghi điểm thi, tỷ lệ đúng phần nghe & đọc
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onclick={handleResetExamHistory}
                  disabled={examHistoryState.records.length === 0}
                  class="px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 dark:bg-orange-950/40 dark:hover:bg-orange-900/60 disabled:opacity-40 disabled:cursor-not-allowed text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-900/50 text-xs font-bold transition-all cursor-pointer active:scale-95 shrink-0"
                >
                  Xóa lịch sử
                </button>
              </div>

              <!-- Tiến độ học ngữ pháp -->
              <div class="flex items-center justify-between bg-slate-50 dark:bg-[#282A2C]/80 p-3.5 rounded-2xl border border-slate-200 dark:border-[#37393B]">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <BookBookmark weight="duotone" class="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <span class="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-[#E3E3E3] block leading-tight">Tiến độ học ngữ pháp</span>
                    <span class="text-[11px] text-slate-500 dark:text-[#8E918F] block">Đánh dấu các cấu trúc ngữ pháp HSK 2 đã thành thạo</span>
                  </div>
                </div>

                <button
                  type="button"
                  onclick={handleResetGrammarProgress}
                  class="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50 text-xs font-bold transition-all cursor-pointer active:scale-95 shrink-0"
                >
                  Đặt lại tiến độ
                </button>
              </div>

              <!-- Danh sách từ vựng yêu thích -->
              <div class="flex items-center justify-between bg-slate-50 dark:bg-[#282A2C]/80 p-3.5 rounded-2xl border border-slate-200 dark:border-[#37393B]">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <BookmarkSimple weight="duotone" class="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <span class="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-[#E3E3E3] block leading-tight">Từ vựng yêu thích (Từ điển)</span>
                    <span class="text-[11px] text-slate-500 dark:text-[#8E918F] block">Danh sách các mục từ vựng được gắn dấu sao</span>
                  </div>
                </div>

                <button
                  type="button"
                  onclick={handleResetBookmarks}
                  class="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50 text-xs font-bold transition-all cursor-pointer active:scale-95 shrink-0"
                >
                  Xóa mục đã lưu
                </button>
              </div>

              <!-- Trạng thái hướng dẫn Tour -->
              <div class="flex items-center justify-between bg-slate-50 dark:bg-[#282A2C]/80 p-3.5 rounded-2xl border border-slate-200 dark:border-[#37393B]">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                    <Compass weight="duotone" class="w-4 h-4 text-violet-500" />
                  </div>
                  <div>
                    <span class="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-[#E3E3E3] block leading-tight">Trạng thái hướng dẫn Tour</span>
                    <span class="text-[11px] text-slate-500 dark:text-[#8E918F] block">Bộ nhớ ghi nhận các tour tính năng bạn đã xem</span>
                  </div>
                </div>

                <button
                  type="button"
                  onclick={handleResetTours}
                  class="px-3 py-1.5 rounded-xl bg-violet-50 hover:bg-violet-100 dark:bg-violet-950/40 dark:hover:bg-violet-900/60 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-900/50 text-xs font-bold transition-all cursor-pointer active:scale-95 shrink-0"
                >
                  Đặt lại Tour
                </button>
              </div>

              <!-- Khôi phục cài đặt gốc -->
              <div class="flex items-center justify-between bg-rose-50/60 dark:bg-rose-950/20 p-3.5 rounded-2xl border border-rose-200 dark:border-rose-900/40 mt-1">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                    <Trash weight="duotone" class="w-4 h-4 text-rose-600" />
                  </div>
                  <div>
                    <span class="font-extrabold text-xs sm:text-sm text-rose-900 dark:text-rose-200 block leading-tight">Khôi phục cài đặt gốc</span>
                    <span class="text-[11px] text-rose-700/80 dark:text-rose-300/70 block">Đặt lại toàn bộ tùy chọn, bộ lọc bài học và dữ liệu máy</span>
                  </div>
                </div>

                <button
                  type="button"
                  onclick={handleResetAllSettings}
                  class="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black transition-all cursor-pointer active:scale-95 shadow-xs shrink-0"
                >
                  Xóa tất cả
                </button>
              </div>

            </div>
          {/if}

        </main>
      </div>

      <!-- Bottom Modal Footer -->
      <footer class="px-5 py-3 border-t border-slate-100 dark:border-[#282A2C] flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-[#1B1B1B]">
        <span class="text-xs font-semibold text-slate-400 dark:text-[#8E918F]">
          Tự động đồng bộ với trình duyệt
        </span>

        <button
          type="button"
          onclick={() => (appState.settingsModalOpen = false)}
          class="px-5 py-2 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black cursor-pointer hover:opacity-90 active:scale-95 transition-all shadow-xs"
        >
          Đóng
        </button>
      </footer>

    </div>
  </div>
{/if}

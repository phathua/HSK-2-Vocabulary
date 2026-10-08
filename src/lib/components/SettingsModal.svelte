<script lang="ts">
  import { appState } from '#lib/state/appState.svelte';
  import SlidersHorizontal from 'phosphor-svelte/lib/SlidersHorizontal';
  import X from 'phosphor-svelte/lib/X';
  import SpeakerSlash from 'phosphor-svelte/lib/SpeakerSlash';
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
  import Sun from 'phosphor-svelte/lib/Sun';
  import Moon from 'phosphor-svelte/lib/Moon';
  import Desktop from 'phosphor-svelte/lib/Desktop';
</script>

{#if appState.settingsModalOpen}
  <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="w-full max-w-sm bg-white dark:bg-[#1B1B1B] rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-[#282A2C] animate-[pop_0.15s_ease] transition-colors">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-extrabold text-base text-slate-900 dark:text-[#E3E3E3] flex items-center gap-2">
          <SlidersHorizontal weight="duotone" class="w-5 h-5 text-orange-500" />
          <span>Cài đặt</span>
        </h3>
        <button
          type="button"
          onclick={() => (appState.settingsModalOpen = false)}
          class="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#282A2C] flex items-center justify-center text-slate-600 dark:text-[#C4C7C5] hover:bg-slate-200 dark:hover:bg-[#37393B] cursor-pointer transition-colors"
          aria-label="Đóng cài đặt"
        >
          <X weight="bold" class="w-4 h-4" />
        </button>
      </div>

      <div class="space-y-3.5 mb-5">
        <!-- Giao diện: 3 nút phân đoạn Sáng / Tối / Hệ thống -->
        <div class="bg-slate-50 dark:bg-[#282A2C]/80 p-3 rounded-2xl border border-slate-200 dark:border-[#37393B] space-y-2.5">
          <div class="flex items-center justify-between">
            <span class="font-bold text-sm text-slate-800 dark:text-[#E3E3E3]">Giao diện</span>
            <span class="text-[11px] font-semibold text-slate-500 dark:text-[#8E918F]">
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

        <!-- Autoplay Toggle: Đồng bộ màu switch theo thương hiệu xanh dịu -->
        <div class="flex items-center justify-between bg-slate-50 dark:bg-[#282A2C]/80 p-3 rounded-2xl border border-slate-200 dark:border-[#37393B]">
          <div>
            <span class="font-bold text-sm text-slate-800 dark:text-[#E3E3E3] block">Tự động phát âm</span>
            <span class="text-xs text-slate-500 dark:text-[#8E918F] block">Đọc từ mới ngay khi chuyển thẻ</span>
          </div>
          <button
            type="button"
            aria-label="Bật hoặc tắt tự động phát âm"
            title="Bật hoặc tắt tự động phát âm"
            onclick={() => {
              appState.autoPlay = !appState.autoPlay;
              appState.saveToLocalStorage();
            }}
            class={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${appState.autoPlay ? 'bg-blue-600' : 'bg-slate-300 dark:bg-[#37393B]'}`}
          >
            <div class={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${appState.autoPlay ? 'translate-x-5' : 'translate-x-0'}`}></div>
          </button>
        </div>

        <!-- Volume Slider -->
        <div class="bg-slate-50 dark:bg-[#282A2C]/80 p-3 rounded-2xl border border-slate-200 dark:border-[#37393B]">
          <div class="flex justify-between items-center mb-2">
            <span class="font-bold text-sm text-slate-800 dark:text-[#E3E3E3]">Âm lượng</span>
            <span class="text-xs font-bold text-slate-600 dark:text-[#8E918F]">{Math.round(appState.volume * 100)}%</span>
          </div>
          <div class="flex items-center gap-2">
            <SpeakerSlash weight="duotone" class="w-4 h-4 text-slate-500 dark:text-[#8E918F]" />
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
            <SpeakerHigh weight="duotone" class="w-4 h-4 text-slate-500 dark:text-[#8E918F]" />
          </div>
        </div>

        <!-- Reset Current Deck -->
        <div>
          <button
            type="button"
            onclick={() => {
              appState.resetCurrentTab();
              appState.settingsModalOpen = false;
            }}
            class="w-full py-2.5 px-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>🔄 Học lại từ đầu chế độ này</span>
          </button>
        </div>

        <!-- Telex helper -->
        <div class="bg-blue-50/70 dark:bg-[#282A2C]/90 p-3 rounded-2xl border border-blue-200 dark:border-[#37393B] text-xs text-blue-900 dark:text-blue-300 font-semibold leading-relaxed">
          ⌨ <b>Gõ Telex Pinyin tiện lợi:</b><br />
          Gõ <code class="bg-white dark:bg-[#1B1B1B] px-1 py-0.5 rounded text-blue-700 dark:text-blue-300">ni3hao3</code> hoặc <code class="bg-white dark:bg-[#1B1B1B] px-1 py-0.5 rounded text-blue-700 dark:text-blue-300">nihaoj</code> sẽ tự chuyển thành pinyin chuẩn!
        </div>

        <!-- Check Update Button -->
        <div class="pt-0.5">
          <button
            type="button"
            onclick={() => {
              if (typeof window !== 'undefined') {
                sessionStorage.removeItem('dismissUpdate');
              }
              appState.settingsModalOpen = false;
              appState.updateModalOpen = true;
            }}
            class="w-full py-2.5 px-3 rounded-2xl bg-slate-100 dark:bg-[#282A2C] hover:bg-slate-200 dark:hover:bg-[#37393B] text-slate-700 dark:text-[#C4C7C5] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>🚀 Kiểm tra bản cập nhật mới</span>
          </button>
        </div>
      </div>

      <button
        type="button"
        onclick={() => (appState.settingsModalOpen = false)}
        class="w-full py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-extrabold cursor-pointer transition-colors"
      >
        Đóng
      </button>
    </div>
  </div>
{/if}

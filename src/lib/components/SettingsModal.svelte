<script lang="ts">
  import { appState } from '#lib/state/appState.svelte';
  import SlidersHorizontal from 'phosphor-svelte/lib/SlidersHorizontal';
  import X from 'phosphor-svelte/lib/X';
  import SpeakerSlash from 'phosphor-svelte/lib/SpeakerSlash';
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
</script>

{#if appState.settingsModalOpen}
  <div class="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 animate-[pop_0.15s_ease]">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-extrabold text-base text-slate-900 flex items-center gap-2">
          <SlidersHorizontal weight="duotone" class="w-5 h-5 text-orange-500" />
          <span>Cài đặt âm thanh & Tự động</span>
        </h3>
        <button
          type="button"
          onclick={() => (appState.settingsModalOpen = false)}
          class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer"
        >
          <X weight="bold" class="w-4 h-4" />
        </button>
      </div>

      <div class="space-y-4 mb-5">
        <!-- Autoplay Toggle -->
        <div class="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200">
          <div>
            <span class="font-bold text-sm text-slate-800 block">Tự động phát âm</span>
            <span class="text-xs text-slate-500 block">Đọc từ mới ngay khi chuyển thẻ</span>
          </div>
          <button
            type="button"
            aria-label="Bật hoặc tắt tự động phát âm"
            title="Bật hoặc tắt tự động phát âm"
            onclick={() => {
              appState.autoPlay = !appState.autoPlay;
              appState.saveToLocalStorage();
            }}
            class={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${appState.autoPlay ? 'bg-emerald-500' : 'bg-slate-300'}`}
          >
            <div class={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${appState.autoPlay ? 'translate-x-5' : 'translate-x-0'}`}></div>
          </button>
        </div>

        <!-- Volume Slider -->
        <div class="bg-slate-50 p-3 rounded-2xl border border-slate-200">
          <div class="flex justify-between items-center mb-2">
            <span class="font-bold text-sm text-slate-800">Âm lượng</span>
            <span class="text-xs font-bold text-slate-600">{Math.round(appState.volume * 100)}%</span>
          </div>
          <div class="flex items-center gap-2">
            <SpeakerSlash weight="duotone" class="w-4 h-4 text-slate-500" />
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
              class="flex-1 h-2 rounded-full cursor-pointer accent-blue-600 bg-slate-200"
            />
            <SpeakerHigh weight="duotone" class="w-4 h-4 text-slate-500" />
          </div>
        </div>

        <!-- Telex helper -->
        <div class="bg-blue-50/70 p-3 rounded-2xl border border-blue-200 text-xs text-blue-900 font-semibold leading-relaxed">
          ⌨ <b>Gõ Telex Pinyin tiện lợi:</b><br />
          Gõ <code class="bg-white px-1 py-0.5 rounded text-blue-700">ni3hao3</code> hoặc <code class="bg-white px-1 py-0.5 rounded text-blue-700">nihaoj</code> sẽ tự chuyển thành pinyin chuẩn!
        </div>
      </div>

      <button
        type="button"
        onclick={() => (appState.settingsModalOpen = false)}
        class="w-full py-3 rounded-2xl bg-slate-900 text-white text-sm font-extrabold cursor-pointer"
      >
        Đóng
      </button>
    </div>
  </div>
{/if}

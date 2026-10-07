<script lang="ts">
  import { appState } from '#lib/state/appState.svelte';
  import SlidersHorizontal from 'phosphor-svelte/lib/SlidersHorizontal';
  import ArrowsLeftRight from 'phosphor-svelte/lib/ArrowsLeftRight';
  import ArrowClockwise from 'phosphor-svelte/lib/ArrowClockwise';
</script>

<header class="flex items-center justify-between shrink-0 bg-white px-3 py-2 rounded-2xl shadow-xs border border-slate-200">
  <!-- Left: Mascot Brand & Click to choose Level/Lesson -->
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
        class="w-10 h-10 rounded-xl object-cover shadow-xs border border-blue-100"
      />
    </div>

    <div class="leading-tight">
      <div class="flex items-center gap-1.5">
        <span class="font-black text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
          Ôn Tập HSK 2
        </span>
      </div>
      <div class="text-[11px] font-bold text-slate-400 mt-0.5">
        Bài {appState.activeLessonsCount}/15 • {appState.filteredVocab.length} từ
      </div>
    </div>
  </button>

  <!-- Right: Clean Actions (Chỉ icon đảo chiều bên trái và 1 lá cờ đích bên phải) -->
  <div class="flex items-center gap-1.5 shrink-0">
    <!-- Nút đảo chiều: ArrowsLeftRight bên trái + 1 lá cờ tròn SVG đích bên phải -->
    <button
      type="button"
      onclick={() => appState.toggleDirection()}
      class="h-8.5 px-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
      title={appState.direction === 'vi_to_zh' ? 'Đang hỏi: Việt ➔ Trung. Bấm để đổi sang: Trung ➔ Việt' : 'Đang hỏi: Trung ➔ Việt. Bấm để đổi sang: Việt ➔ Trung'}
    >
      <ArrowsLeftRight weight="bold" class="w-4 h-4 text-blue-600" />
      {#if appState.direction === 'vi_to_zh'}
        <!-- Đích là Trung Quốc -->
        <img
          src="/svg/china-flag.svg"
          alt="Cờ Trung Quốc"
          class="w-5 h-5 rounded-full object-cover shrink-0 drop-shadow-2xs"
        />
      {:else}
        <!-- Đích là Việt Nam -->
        <img
          src="/svg/vietnam-flag.svg"
          alt="Cờ Việt Nam"
          class="w-5 h-5 rounded-full object-cover shrink-0 drop-shadow-2xs"
        />
      {/if}
    </button>

    <!-- Reset Button (Học lại từ đầu) -->
    <button
      type="button"
      onclick={() => appState.resetCurrentTab()}
      class="w-8.5 h-8.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-600 hover:text-pink-600 transition-colors cursor-pointer active:scale-95"
      title="Học lại từ đầu"
      aria-label="Học lại từ đầu"
    >
      <ArrowClockwise weight="bold" class="w-4 h-4" />
    </button>

    <!-- Settings Button -->
    <button
      type="button"
      onclick={() => (appState.settingsModalOpen = true)}
      class="w-8.5 h-8.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors cursor-pointer active:scale-95"
      title="Cài đặt âm thanh"
      aria-label="Cài đặt"
    >
      <SlidersHorizontal weight="bold" class="w-4 h-4" />
    </button>
  </div>
</header>

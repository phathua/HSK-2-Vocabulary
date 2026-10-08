<script lang="ts">
  import { appState } from '#lib/state/appState.svelte';
  import SlidersHorizontal from 'phosphor-svelte/lib/SlidersHorizontal';
  import ArrowsLeftRight from 'phosphor-svelte/lib/ArrowsLeftRight';
  import ArrowClockwise from 'phosphor-svelte/lib/ArrowClockwise';
  import List from 'phosphor-svelte/lib/List';
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
    <!-- Nút đảo chiều: ArrowsLeftRight bên trái + 1 lá cờ tròn SVG đích bên phải -->
    <button
      type="button"
      onclick={() => appState.toggleDirection()}
      class="h-9 px-2.5 rounded-xl border border-slate-200 dark:border-[#282A2C] bg-slate-50 dark:bg-[#282A2C] hover:bg-slate-100 dark:hover:bg-[#37393B] flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
      title={appState.direction === 'vi_to_zh' ? 'Đang hỏi: Việt ➔ Trung. Bấm để đổi sang: Trung ➔ Việt' : 'Đang hỏi: Trung ➔ Việt. Bấm để đổi sang: Việt ➔ Trung'}
    >
      <ArrowsLeftRight weight="bold" class="w-4 h-4 text-blue-600 dark:text-blue-400" />
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

    <!-- Settings Button -->
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

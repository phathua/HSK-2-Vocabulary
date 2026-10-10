<script lang="ts">
  import { appState } from '#lib/state/appState.svelte';
  import { page } from '$app/state';
  import { fly, fade } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import BookOpenText from 'phosphor-svelte/lib/BookOpenText';
  import GraduationCap from 'phosphor-svelte/lib/GraduationCap';
  import Exam from 'phosphor-svelte/lib/Exam';
  import Target from 'phosphor-svelte/lib/Target';
  import Trophy from 'phosphor-svelte/lib/Trophy';
  import CaretRight from 'phosphor-svelte/lib/CaretRight';
  import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';

  const menuItems = [
    {
      title: 'Từ vựng',
      subtitle: 'Luyện 4 kỹ năng & thẻ nhớ',
      href: '/',
      icon: BookOpenText,
      badge: 'Chính',
      colorClasses: {
        bg: 'bg-blue-500/10 dark:bg-blue-500/20',
        text: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800/60',
        activeBg: 'bg-blue-50 dark:bg-[#282A2C]',
        badgeBg: 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300'
      }
    },
    {
      title: 'Ngữ pháp',
      subtitle: 'Trọng điểm & cấu trúc HSK',
      href: '/ngu-phap',
      icon: GraduationCap,
      badge: 'Mới',
      colorClasses: {
        bg: 'bg-purple-500/10 dark:bg-purple-500/20',
        text: 'text-purple-600 dark:text-purple-400',
        border: 'border-purple-200 dark:border-purple-800/60',
        activeBg: 'bg-purple-50 dark:bg-[#282A2C]',
        badgeBg: 'bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300'
      }
    },
    {
      title: 'Thi thử',
      subtitle: 'Đề thi chuẩn Hanban',
      href: '/thi-thu',
      icon: Exam,
      badge: 'Hot',
      colorClasses: {
        bg: 'bg-orange-500/10 dark:bg-orange-500/20',
        text: 'text-orange-600 dark:text-orange-400',
        border: 'border-orange-200 dark:border-orange-800/60',
        activeBg: 'bg-orange-50 dark:bg-[#282A2C]',
        badgeBg: 'bg-orange-100 text-orange-700 dark:bg-orange-900/60 dark:text-orange-300'
      }
    },
    {
      title: 'Nhiệm vụ',
      subtitle: 'Thử thách & mục tiêu ngày',
      href: '/nhiem-vu',
      icon: Target,
      badge: '3 sẵn sàng',
      colorClasses: {
        bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
        text: 'text-emerald-600 dark:text-emerald-400',
        border: 'border-emerald-200 dark:border-emerald-800/60',
        activeBg: 'bg-emerald-50 dark:bg-[#282A2C]',
        badgeBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300'
      }
    },
    {
      title: 'Bảng xếp hạng',
      subtitle: 'Top học viên & streak chuỗi',
      href: '/bang-xep-hang',
      icon: Trophy,
      badge: 'Tuần này',
      colorClasses: {
        bg: 'bg-amber-500/10 dark:bg-amber-500/20',
        text: 'text-amber-600 dark:text-amber-400',
        border: 'border-amber-200 dark:border-amber-800/60',
        activeBg: 'bg-amber-50 dark:bg-[#282A2C]',
        badgeBg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300'
      }
    }
  ];

  function closeMobileSidebar() {
    appState.sidebarOpen = false;
  }
</script>

<!-- ================= DESKTOP SIDEBAR (CỐ ĐỊNH, KHÔNG BỊ COLLAPSE TRÊN MÀN HÌNH RỘNG >= lg) ================= -->
<aside
  class="hidden lg:flex w-72 shrink-0 h-full bg-white dark:bg-[#1B1B1B] rounded-3xl border border-slate-200 dark:border-[#282A2C] shadow-xs flex-col justify-between overflow-hidden transition-colors select-none"
  aria-label="Thanh điều hướng chính trên máy tính"
>
  <!-- Desktop Header -->
  <div class="p-4.5 border-b border-slate-100 dark:border-[#282A2C] flex items-center gap-3">
    <img
      src="/icons/icon-192.png"
      alt="Mascot HSK 2"
      class="w-11 h-11 rounded-2xl object-cover shadow-xs border border-blue-100 dark:border-blue-900/40"
    />
    <div>
      <h2 class="text-sm font-black text-slate-900 dark:text-[#E3E3E3] leading-tight">
        Ôn Tập HSK
      </h2>
      <p class="text-[11px] font-semibold text-slate-400 dark:text-[#8E918F] mt-0.5">
        Cấp độ: {appState.currentLevel} • Đầy đủ 15 bài
      </p>
    </div>
  </div>

  <!-- Quick Search Bar Widget -->
  <div class="px-3.5 pt-3 pb-1">
    <a
      href="/tu-vung"
      class="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-100/80 dark:bg-[#282A2C]/60 hover:bg-slate-200/70 dark:hover:bg-[#282A2C] border border-slate-200/60 dark:border-[#37393B] text-slate-500 dark:text-[#8E918F] transition-all group shadow-2xs"
    >
      <MagnifyingGlass weight="bold" class="w-4 h-4 text-slate-400 group-hover:text-rose-500 transition-colors" />
      <span class="text-xs font-semibold flex-1 truncate">Tra từ điển HSK...</span>
      <kbd class="hidden xl:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-[#1E1F20] text-slate-400 dark:text-[#8E918F] rounded-md border border-slate-200 dark:border-[#37393B]">/tu-vung</kbd>
    </a>
  </div>

  <!-- Desktop Nav List -->
  <div class="p-3.5 space-y-2 overflow-y-auto flex-1">
    <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#8E918F] px-2 mb-1">
      Hệ thống học tập
    </p>

    {#each menuItems as item}
      {@const isActive = page.url.pathname === item.href}
      <a
        href={item.href}
        class={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer group active:scale-98 ${
          isActive
            ? `${item.colorClasses.activeBg} ${item.colorClasses.border} shadow-xs font-bold text-slate-900 dark:text-white`
            : 'border-transparent bg-slate-50/70 dark:bg-[#282A2C]/40 hover:bg-slate-100/90 dark:hover:bg-[#282A2C] text-slate-700 dark:text-[#C4C7C5]'
        }`}
      >
        <div class="flex items-center gap-3 min-w-0">
          <div
            class={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${item.colorClasses.bg} ${item.colorClasses.text} ${item.colorClasses.border} shadow-2xs group-hover:scale-105 transition-transform`}
          >
            <item.icon weight="duotone" class="w-5 h-5" />
          </div>

          <div class="min-w-0">
            <div class="flex items-center gap-1.5">
              <span class="text-xs font-black truncate">
                {item.title}
              </span>
              {#if item.badge}
                <span class={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${item.colorClasses.badgeBg}`}>
                  {item.badge}
                </span>
              {/if}
            </div>
            <span class="text-[11px] text-slate-400 dark:text-[#8E918F] block truncate mt-0.5">
              {item.subtitle}
            </span>
          </div>
        </div>

        <CaretRight weight="bold" class={`w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0 ${isActive ? item.colorClasses.text : ''}`} />
      </a>
    {/each}
  </div>

  <!-- Desktop Footer -->
  <div class="p-3.5 border-t border-slate-100 dark:border-[#282A2C] bg-slate-50/50 dark:bg-[#131314]/50">
    <div class="bg-white dark:bg-[#282A2C] p-3 rounded-2xl border border-slate-200/80 dark:border-[#37393B] flex items-center justify-between">
      <div class="text-xs">
        <span class="font-extrabold text-slate-800 dark:text-[#E3E3E3] block">Từ vựng đã chọn</span>
        <span class="text-slate-400 dark:text-[#8E918F] font-semibold">{appState.filteredVocab.length} / {appState.allVocab.length} từ</span>
      </div>
      <span class="text-xs font-black px-2 py-1 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
        {appState.currentLevel}
      </span>
    </div>
  </div>
</aside>

<!-- ================= MOBILE DRAWER (CHỈ HIỆN KHI BẤM NÚT 3 GẠCH TRÊN MOBILE HOẶC TABLET < lg) ================= -->
{#if appState.sidebarOpen}
  <!-- Backdrop Overlay -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    transition:fade={{ duration: 200 }}
    class="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
    onclick={closeMobileSidebar}
  ></div>

  <!-- Slide-out Drawer Panel (Animation trượt từ bên trái qua phải) -->
  <div
    transition:fly={{ x: -320, duration: 250, easing: cubicOut }}
    class="lg:hidden fixed top-0 left-0 bottom-0 z-50 w-full max-w-xs sm:max-w-sm bg-white dark:bg-[#1B1B1B] shadow-2xl border-r border-slate-200 dark:border-[#282A2C] flex flex-col justify-between select-none"
    role="dialog"
    aria-modal="true"
    aria-label="Menu điều hướng chính"
  >
    <!-- Drawer Header (Không có nút X, bấm ra ngoài để đóng) -->
    <div class="p-5 border-b border-slate-100 dark:border-[#282A2C] flex items-center gap-3">
      <img
        src="/icons/icon-192.png"
        alt="Mascot HSK 2"
        class="w-12 h-12 rounded-2xl object-cover shadow-xs border border-blue-100 dark:border-blue-900/50 shrink-0"
      />
      <div class="min-w-0">
        <h2 class="text-base font-black text-slate-900 dark:text-[#E3E3E3] leading-tight">
          Ôn Tập HSK
        </h2>
        <p class="text-xs font-semibold text-slate-400 dark:text-[#8E918F] mt-0.5">
          Cấp độ: {appState.currentLevel} • Chuỗi học tập
        </p>
      </div>
    </div>

    <!-- Mobile Quick Search -->
    <div class="px-4 pt-3 pb-1">
      <a
        href="/tu-vung"
        onclick={closeMobileSidebar}
        class="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-100/80 dark:bg-[#282A2C]/60 hover:bg-slate-200/70 dark:hover:bg-[#282A2C] border border-slate-200/60 dark:border-[#37393B] text-slate-500 dark:text-[#8E918F] transition-all"
      >
        <MagnifyingGlass weight="bold" class="w-4 h-4 text-rose-500 shrink-0" />
        <span class="text-xs font-semibold flex-1">Tra cứu từ điển HSK...</span>
        <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300">Tra từ</span>
      </a>
    </div>

    <!-- Navigation List (To rõ ràng, dễ nhìn, mỗi nút một màu riêng biệt) -->
    <div class="p-4 space-y-2.5 overflow-y-auto flex-1">
      <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#8E918F] px-2 mb-1">
        Danh mục học tập
      </p>

      {#each menuItems as item}
        {@const isActive = page.url.pathname === item.href}
        <a
          href={item.href}
          onclick={closeMobileSidebar}
          class={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer group active:scale-98 ${
            isActive
              ? `${item.colorClasses.activeBg} ${item.colorClasses.border} shadow-xs font-bold text-slate-900 dark:text-white`
              : 'border-slate-100 dark:border-[#282A2C] bg-slate-50/70 dark:bg-[#282A2C]/40 hover:bg-slate-100/90 dark:hover:bg-[#282A2C] text-slate-700 dark:text-[#C4C7C5]'
          }`}
        >
          <div class="flex items-center gap-3.5 min-w-0">
            <!-- Icon To Nổi Bật với màu riêng biệt -->
            <div
              class={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${item.colorClasses.bg} ${item.colorClasses.text} ${item.colorClasses.border} shadow-2xs group-hover:scale-105 transition-transform`}
            >
              <item.icon weight="duotone" class="w-6 h-6" />
            </div>

            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span class="text-sm font-extrabold truncate">
                  {item.title}
                </span>
                {#if item.badge}
                  <span class={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${item.colorClasses.badgeBg}`}>
                    {item.badge}
                  </span>
                {/if}
              </div>
              <span class="text-xs text-slate-500 dark:text-[#8E918F] block truncate mt-0.5">
                {item.subtitle}
              </span>
            </div>
          </div>

          <CaretRight weight="bold" class={`w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0 ${isActive ? item.colorClasses.text : ''}`} />
        </a>
      {/each}
    </div>

    <!-- Drawer Footer -->
    <div class="p-4 border-t border-slate-100 dark:border-[#282A2C] bg-slate-50/50 dark:bg-[#131314]/50">
      <div class="bg-white dark:bg-[#282A2C] p-3 rounded-2xl border border-slate-200/80 dark:border-[#37393B] flex items-center justify-between">
        <div class="text-xs">
          <span class="font-extrabold text-slate-800 dark:text-[#E3E3E3] block">Từ vựng đã chọn</span>
          <span class="text-slate-400 dark:text-[#8E918F] font-semibold">{appState.filteredVocab.length} / {appState.allVocab.length} từ</span>
        </div>
        <span class="text-xs font-black px-2 py-1 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
          {appState.currentLevel}
        </span>
      </div>
    </div>
  </div>
{/if}

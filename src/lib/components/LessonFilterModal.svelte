<script lang="ts">
  import { appState } from '#lib/state/appState.svelte';
  import { HSK1_LESSON_INFOS, HSK1_VOCABULARY } from '#lib/data/hsk1Vocabulary';
  import { LESSON_INFOS as HSK2_LESSON_INFOS, HSK2_VOCABULARY } from '#lib/data/hsk2Vocabulary';
  import BookBookmark from 'phosphor-svelte/lib/BookBookmark';
  import X from 'phosphor-svelte/lib/X';
  import Check from 'phosphor-svelte/lib/Check';

  // HSK 1 Icons (Phosphor)
  import HandWaving from 'phosphor-svelte/lib/HandWaving';
  import Heart from 'phosphor-svelte/lib/Heart';
  import IdentificationCard from 'phosphor-svelte/lib/IdentificationCard';
  import ChalkboardTeacher from 'phosphor-svelte/lib/ChalkboardTeacher';
  import Cake from 'phosphor-svelte/lib/Cake';
  import ChatCircleDots from 'phosphor-svelte/lib/ChatCircleDots';
  import CalendarBlank from 'phosphor-svelte/lib/CalendarBlank';
  import Coffee from 'phosphor-svelte/lib/Coffee';
  import Briefcase from 'phosphor-svelte/lib/Briefcase';
  import Armchair from 'phosphor-svelte/lib/Armchair';
  import Clock from 'phosphor-svelte/lib/Clock';
  import SunDim from 'phosphor-svelte/lib/SunDim';
  import CookingPot from 'phosphor-svelte/lib/CookingPot';
  import ShoppingBagOpen from 'phosphor-svelte/lib/ShoppingBagOpen';
  import AirplaneTilt from 'phosphor-svelte/lib/AirplaneTilt';

  // HSK 2 Icons (Phosphor)
  import Airplane from 'phosphor-svelte/lib/Airplane';
  import Alarm from 'phosphor-svelte/lib/Alarm';
  import CoffeeCup from 'phosphor-svelte/lib/Coffee';
  import UserPlus from 'phosphor-svelte/lib/UserPlus';
  import CoatHanger from 'phosphor-svelte/lib/CoatHanger';
  import ForkKnife from 'phosphor-svelte/lib/ForkKnife';
  import Buildings from 'phosphor-svelte/lib/Buildings';
  import LightbulbFilament from 'phosphor-svelte/lib/LightbulbFilament';
  import Exam from 'phosphor-svelte/lib/Exam';
  import DeviceMobileCamera from 'phosphor-svelte/lib/DeviceMobileCamera';
  import Sparkle from 'phosphor-svelte/lib/Sparkle';
  import TShirt from 'phosphor-svelte/lib/TShirt';
  import DoorOpen from 'phosphor-svelte/lib/DoorOpen';
  import FilmSlate from 'phosphor-svelte/lib/FilmSlate';
  import Confetti from 'phosphor-svelte/lib/Confetti';

  interface ThemeStyle {
    bg: string;
    border: string;
    iconBg: string;
    iconColor: string;
    badgeBg: string;
    badgeColor: string;
    darkBg: string;
    darkBorder: string;
    darkIconBg: string;
    darkIconColor: string;
    darkBadgeBg: string;
    darkBadgeColor: string;
  }

  // Bảng màu nhẹ nhàng, thanh lịch kết hợp hài hòa giữa Light pastel và Dark tint sống động
  const LESSON_THEMES: Record<number, ThemeStyle> = {
    // 1. Butter / Soft Vanilla (#F4D189)
    1: {
      bg: 'bg-[#FEF9EE]',
      border: 'border-[#F6DFAD]',
      iconBg: 'bg-[#F9E6BD]',
      iconColor: 'text-[#9A7023]',
      badgeBg: 'bg-[#F9E6BD]',
      badgeColor: 'text-[#8A631E]',
      darkBg: 'dark:bg-[#2C2415]',
      darkBorder: 'dark:border-[#544322]',
      darkIconBg: 'dark:bg-[#3D3017]',
      darkIconColor: 'dark:text-[#F6D58E]',
      darkBadgeBg: 'dark:bg-[#3D3017]',
      darkBadgeColor: 'dark:text-[#F6D58E]'
    },
    // 2. Guava / Soft Peach Coral (#F2B6A3)
    2: {
      bg: 'bg-[#FDF4F1]',
      border: 'border-[#F8D2C5]',
      iconBg: 'bg-[#FCE0D7]',
      iconColor: 'text-[#BA573F]',
      badgeBg: 'bg-[#FCE0D7]',
      badgeColor: 'text-[#A74C35]',
      darkBg: 'dark:bg-[#2C1C18]',
      darkBorder: 'dark:border-[#573128]',
      darkIconBg: 'dark:bg-[#3E231C]',
      darkIconColor: 'dark:text-[#F8BCA9]',
      darkBadgeBg: 'dark:bg-[#3E231C]',
      darkBadgeColor: 'dark:text-[#F8BCA9]'
    },
    // 3. Seabreeze / Soft Sky Cream (#E5E9EB)
    3: {
      bg: 'bg-[#F2F6F8]',
      border: 'border-[#D4E0E5]',
      iconBg: 'bg-[#DEE9ED]',
      iconColor: 'text-[#3E6575]',
      badgeBg: 'bg-[#DEE9ED]',
      badgeColor: 'text-[#365968]',
      darkBg: 'dark:bg-[#182329]',
      darkBorder: 'dark:border-[#2D4552]',
      darkIconBg: 'dark:bg-[#20313B]',
      darkIconColor: 'dark:text-[#9DC6D8]',
      darkBadgeBg: 'dark:bg-[#20313B]',
      darkBadgeColor: 'dark:text-[#9DC6D8]'
    },
    // 4. Lagoon / Muted Turquoise (#94BEBB)
    4: {
      bg: 'bg-[#EEF6F5]',
      border: 'border-[#C2DEDC]',
      iconBg: 'bg-[#D3E8E6]',
      iconColor: 'text-[#2D6C68]',
      badgeBg: 'bg-[#D3E8E6]',
      badgeColor: 'text-[#275E5A]',
      darkBg: 'dark:bg-[#152625]',
      darkBorder: 'dark:border-[#264C49]',
      darkIconBg: 'dark:bg-[#1C3634]',
      darkIconColor: 'dark:text-[#88D4CE]',
      darkBadgeBg: 'dark:bg-[#1C3634]',
      darkBadgeColor: 'dark:text-[#88D4CE]'
    },
    // 5. Sunset / Warm Amber Terracotta (#E89C73)
    5: {
      bg: 'bg-[#FDF5F0]',
      border: 'border-[#F6D3C1]',
      iconBg: 'bg-[#F8DECE]',
      iconColor: 'text-[#AC5529]',
      badgeBg: 'bg-[#F8DECE]',
      badgeColor: 'text-[#984A22]',
      darkBg: 'dark:bg-[#2B1B13]',
      darkBorder: 'dark:border-[#522F1E]',
      darkIconBg: 'dark:bg-[#3D2214]',
      darkIconColor: 'dark:text-[#F5B48F]',
      darkBadgeBg: 'dark:bg-[#3D2214]',
      darkBadgeColor: 'dark:text-[#F5B48F]'
    },
    // 6. Moss / Sage Herb (#C0B05B)
    6: {
      bg: 'bg-[#F8F7EE]',
      border: 'border-[#E0D9AF]',
      iconBg: 'bg-[#EAE5C5]',
      iconColor: 'text-[#685D21]',
      badgeBg: 'bg-[#EAE5C5]',
      badgeColor: 'text-[#5C521C]',
      darkBg: 'dark:bg-[#242314]',
      darkBorder: 'dark:border-[#474320]',
      darkIconBg: 'dark:bg-[#333116]',
      darkIconColor: 'dark:text-[#DDD07C]',
      darkBadgeBg: 'dark:bg-[#333116]',
      darkBadgeColor: 'dark:text-[#DDD07C]'
    },
    // 7. Sangria / Soft Rose Clay (#E36559)
    7: {
      bg: 'bg-[#FCF2F1]',
      border: 'border-[#F6CBC7]',
      iconBg: 'bg-[#F9D8D5]',
      iconColor: 'text-[#A93C32]',
      badgeBg: 'bg-[#F9D8D5]',
      badgeColor: 'text-[#96342B]',
      darkBg: 'dark:bg-[#2B1615]',
      darkBorder: 'dark:border-[#522421]',
      darkIconBg: 'dark:bg-[#3B1917]',
      darkIconColor: 'dark:text-[#F69C95]',
      darkBadgeBg: 'dark:bg-[#3B1917]',
      darkBadgeColor: 'dark:text-[#F69C95]'
    },
    // 8. Palm / Gentle Forest Green (#657652)
    8: {
      bg: 'bg-[#F3F6F1]',
      border: 'border-[#CED8C3]',
      iconBg: 'bg-[#DCE4D3]',
      iconColor: 'text-[#445633]',
      badgeBg: 'bg-[#DCE4D3]',
      badgeColor: 'text-[#3A4A2B]',
      darkBg: 'dark:bg-[#1A2316]',
      darkBorder: 'dark:border-[#324528]',
      darkIconBg: 'dark:bg-[#24331C]',
      darkIconColor: 'dark:text-[#A7C78E]',
      darkBadgeBg: 'dark:bg-[#24331C]',
      darkBadgeColor: 'dark:text-[#A7C78E]'
    },
    // 9. Odyssey / Muted Slate Ocean (#23617E)
    9: {
      bg: 'bg-[#EEF4F7]',
      border: 'border-[#BED3DF]',
      iconBg: 'bg-[#CEE0EA]',
      iconColor: 'text-[#1D5169]',
      badgeBg: 'bg-[#CEE0EA]',
      badgeColor: 'text-[#19455A]',
      darkBg: 'dark:bg-[#142129]',
      darkBorder: 'dark:border-[#213F50]',
      darkIconBg: 'dark:bg-[#182C38]',
      darkIconColor: 'dark:text-[#78BEDF]',
      darkBadgeBg: 'dark:bg-[#182C38]',
      darkBadgeColor: 'dark:text-[#78BEDF]'
    },
    // 10. Lavender Mist / Soft Purple Lilac (#CCA8D8)
    10: {
      bg: 'bg-[#F8F3FA]',
      border: 'border-[#E5D1ED]',
      iconBg: 'bg-[#EDDCF3]',
      iconColor: 'text-[#6D427D]',
      badgeBg: 'bg-[#EDDCF3]',
      badgeColor: 'text-[#613970]',
      darkBg: 'dark:bg-[#24172B]',
      darkBorder: 'dark:border-[#4B285C]',
      darkIconBg: 'dark:bg-[#331C3E]',
      darkIconColor: 'dark:text-[#DFBCEF]',
      darkBadgeBg: 'dark:bg-[#331C3E]',
      darkBadgeColor: 'dark:text-[#DFBCEF]'
    },
    // 11. Soft Honey Mustard (#E6C568)
    11: {
      bg: 'bg-[#FDF9ED]',
      border: 'border-[#F3E2B1]',
      iconBg: 'bg-[#F7EAC4]',
      iconColor: 'text-[#856616]',
      badgeBg: 'bg-[#F7EAC4]',
      badgeColor: 'text-[#745812]',
      darkBg: 'dark:bg-[#2A2312]',
      darkBorder: 'dark:border-[#524119]',
      darkIconBg: 'dark:bg-[#3A2D10]',
      darkIconColor: 'dark:text-[#F6D57F]',
      darkBadgeBg: 'dark:bg-[#3A2D10]',
      darkBadgeColor: 'dark:text-[#F6D57F]'
    },
    // 12. Soft Apricot Blush (#F5C2A5)
    12: {
      bg: 'bg-[#FCF5F0]',
      border: 'border-[#F6D5C2]',
      iconBg: 'bg-[#F9E0D0]',
      iconColor: 'text-[#9C5834]',
      badgeBg: 'bg-[#F9E0D0]',
      badgeColor: 'text-[#8A4D2C]',
      darkBg: 'dark:bg-[#2B1B15]',
      darkBorder: 'dark:border-[#543021]',
      darkIconBg: 'dark:bg-[#3C2014]',
      darkIconColor: 'dark:text-[#F9C3A6]',
      darkBadgeBg: 'dark:bg-[#3C2014]',
      darkBadgeColor: 'dark:text-[#F9C3A6]'
    },
    // 13. Mint Meadow (#A8D5C2)
    13: {
      bg: 'bg-[#F0F7F4]',
      border: 'border-[#C8E5D8]',
      iconBg: 'bg-[#D7ECE2]',
      iconColor: 'text-[#2B6A50]',
      badgeBg: 'bg-[#D7ECE2]',
      badgeColor: 'text-[#245943]',
      darkBg: 'dark:bg-[#14261F]',
      darkBorder: 'dark:border-[#224A3B]',
      darkIconBg: 'dark:bg-[#18362A]',
      darkIconColor: 'dark:text-[#8EE0BF]',
      darkBadgeBg: 'dark:bg-[#18362A]',
      darkBadgeColor: 'dark:text-[#8EE0BF]'
    },
    // 14. Dusty Rose (#DDA3B2)
    14: {
      bg: 'bg-[#FAF2F4]',
      border: 'border-[#ECC7D1]',
      iconBg: 'bg-[#F2D7DE]',
      iconColor: 'text-[#823F52]',
      badgeBg: 'bg-[#F2D7DE]',
      badgeColor: 'text-[#713546]',
      darkBg: 'dark:bg-[#2A171F]',
      darkBorder: 'dark:border-[#522537]',
      darkIconBg: 'dark:bg-[#3B1824]',
      darkIconColor: 'dark:text-[#F2B0C4]',
      darkBadgeBg: 'dark:bg-[#3B1824]',
      darkBadgeColor: 'dark:text-[#F2B0C4]'
    },
    // 15. Pale Denim / Steel Blue (#9EB3C2)
    15: {
      bg: 'bg-[#F1F4F7]',
      border: 'border-[#CFDCE4]',
      iconBg: 'bg-[#DDE6EC]',
      iconColor: 'text-[#385368]',
      badgeBg: 'bg-[#DDE6EC]',
      badgeColor: 'text-[#2E4557]',
      darkBg: 'dark:bg-[#172028]',
      darkBorder: 'dark:border-[#2A3C4A]',
      darkIconBg: 'dark:bg-[#1E2B35]',
      darkIconColor: 'dark:text-[#A0C4DD]',
      darkBadgeBg: 'dark:bg-[#1E2B35]',
      darkBadgeColor: 'dark:text-[#A0C4DD]'
    }
  };

  const HSK1_ICONS: Record<number, any> = {
    1: HandWaving,
    2: Heart,
    3: IdentificationCard,
    4: ChalkboardTeacher,
    5: Cake,
    6: ChatCircleDots,
    7: CalendarBlank,
    8: Coffee,
    9: Briefcase,
    10: Armchair,
    11: Clock,
    12: SunDim,
    13: CookingPot,
    14: ShoppingBagOpen,
    15: AirplaneTilt
  };

  const HSK2_ICONS: Record<number, any> = {
    1: Airplane,
    2: Alarm,
    3: CoffeeCup,
    4: UserPlus,
    5: CoatHanger,
    6: ForkKnife,
    7: Buildings,
    8: LightbulbFilament,
    9: Exam,
    10: DeviceMobileCamera,
    11: Sparkle,
    12: TShirt,
    13: DoorOpen,
    14: FilmSlate,
    15: Confetti
  };

  // Dữ liệu bài học theo tab cấp độ đang xem trong modal
  const viewingLevel = $derived(appState.modalViewingLevel);
  const activeLessons = $derived(viewingLevel === 'HSK1' ? HSK1_LESSON_INFOS : HSK2_LESSON_INFOS);
  const activeVocab = $derived(viewingLevel === 'HSK1' ? HSK1_VOCABULARY : HSK2_VOCABULARY);
  const activeSelected = $derived(viewingLevel === 'HSK1' ? appState.selectedLessonsHsk1 : appState.selectedLessonsHsk2);
  const activeCount = $derived(viewingLevel === 'HSK1' ? appState.activeLessonsCountHsk1 : appState.activeLessonsCountHsk2);
  const isAllCurrentSelected = $derived(activeCount === 15);
</script>

{#if appState.filterModalOpen}
  <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
    <div class="w-full max-w-md max-h-[88vh] flex flex-col bg-white dark:bg-[#1B1B1B] rounded-3xl p-4 sm:p-5 shadow-2xl border border-slate-200/90 dark:border-[#282A2C] overflow-hidden animate-[pop_0.15s_ease] transition-colors">
      
      <!-- Modal Header -->
      <div class="flex items-center justify-between mb-3 shrink-0">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#282A2C] text-slate-700 dark:text-slate-200 flex items-center justify-center">
            <BookBookmark weight="duotone" class="w-4.5 h-4.5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 class="font-black text-sm sm:text-base text-slate-800 dark:text-white leading-tight">
              Chọn bài học
            </h3>
            <p class="text-[11px] text-slate-500 dark:text-neutral-400 font-medium">
              Đang chọn <b class="text-slate-900 dark:text-white font-extrabold">{appState.activeLessonsCount}/30</b> bài ({appState.filteredVocab.length} từ trộn HSK 1 & 2)
            </p>
          </div>
        </div>

        <button
          type="button"
          onclick={() => (appState.filterModalOpen = false)}
          class="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#282A2C] flex items-center justify-center text-slate-500 dark:text-neutral-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#37393B] cursor-pointer transition-all active:scale-90"
        >
          <X weight="bold" class="w-4 h-4" />
        </button>
      </div>

      <!-- Level Switcher: HSK 1 & HSK 2 (Chuyển tab để chọn bài, vẫn giữ trộn 2 bên) -->
      <div class="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 dark:bg-[#282A2C] rounded-2xl mb-2.5 shrink-0">
        <button
          type="button"
          onclick={() => appState.setLevel('HSK1')}
          class={`py-1.5 px-3 rounded-xl font-black text-xs transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
            viewingLevel === 'HSK1'
              ? 'bg-blue-600 text-white shadow-xs scale-[1.01]'
              : 'text-slate-600 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-[#37393B]'
          }`}
        >
          <span>HSK 1 ({appState.activeLessonsCountHsk1}/15 bài)</span>
        </button>
        <button
          type="button"
          onclick={() => appState.setLevel('HSK2')}
          class={`py-1.5 px-3 rounded-xl font-black text-xs transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
            viewingLevel === 'HSK2'
              ? 'bg-orange-500 text-white shadow-xs scale-[1.01]'
              : 'text-slate-600 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-[#37393B]'
          }`}
        >
          <span>HSK 2 ({appState.activeLessonsCountHsk2}/15 bài)</span>
        </button>
      </div>

      <!-- Quick Action Buttons: Nút "Chọn tất cả" tự động đổi thành "Bỏ chọn tất cả" và ngược lại -->
      <div class="flex gap-2 mb-3 shrink-0">
        <button
          type="button"
          onclick={() => appState.toggleAllLessons(viewingLevel)}
          class="flex-1 py-1.5 rounded-xl border border-slate-200 dark:border-[#282A2C] bg-slate-50 dark:bg-[#282A2C]/60 hover:bg-slate-100 dark:hover:bg-[#282A2C] text-xs font-bold text-slate-700 dark:text-neutral-200 cursor-pointer transition-all active:scale-95"
        >
          {isAllCurrentSelected ? `Bỏ chọn tất cả ${viewingLevel}` : `Chọn tất cả ${viewingLevel} (15)`}
        </button>
        <button
          type="button"
          onclick={() => appState.clearAllLessons(viewingLevel)}
          class="flex-1 py-1.5 rounded-xl border border-slate-200 dark:border-[#282A2C] bg-slate-50 dark:bg-[#282A2C]/60 hover:bg-slate-100 dark:hover:bg-[#282A2C] text-xs font-bold text-slate-700 dark:text-neutral-200 cursor-pointer transition-all active:scale-95"
        >
          Bỏ chọn {viewingLevel}
        </button>
      </div>

      <!-- Scrollable 2-Column Grid Cards -->
      <div class="flex-1 min-h-0 overflow-y-auto no-scrollbar pr-0.5 mb-3">
        <div class="grid grid-cols-2 gap-2">
          {#each activeLessons as info (info.lesson)}
            {@const isSelected = !!activeSelected[info.lesson]}
            {@const count = activeVocab.filter((v: any) => v.lesson === info.lesson).length}
            {@const theme = LESSON_THEMES[info.lesson] || LESSON_THEMES[1]}
            {@const IconComponent = viewingLevel === 'HSK1' ? HSK1_ICONS[info.lesson] : HSK2_ICONS[info.lesson]}

            <button
              type="button"
              onclick={() => appState.toggleLesson(info.lesson, viewingLevel)}
              class={`group relative text-left p-2.5 rounded-2xl border transition-all duration-150 cursor-pointer flex flex-col justify-between overflow-hidden select-none active:scale-[0.96] ${
                isSelected
                  ? `${theme.bg} ${theme.border} ${theme.darkBg} ${theme.darkBorder} shadow-2xs ring-1 ring-black/5 dark:ring-white/10`
                  : 'bg-white dark:bg-[#1B1B1B] border-slate-200/80 dark:border-[#282A2C] hover:border-slate-300 dark:hover:border-[#37393B] opacity-55 hover:opacity-85'
              }`}
            >
              <!-- Top Row: Icon + Lesson Label + Count + Check Indicator -->
              <div class="flex items-center justify-between gap-1.5 mb-1.5 w-full">
                <div class="flex items-center gap-1.5 min-w-0">
                  <div class={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-transform group-active:scale-90 ${
                    isSelected ? `${theme.iconBg} ${theme.iconColor} ${theme.darkIconBg} ${theme.darkIconColor}` : 'bg-slate-100 dark:bg-[#282A2C] text-slate-400 dark:text-neutral-500'
                  }`}>
                    {#if IconComponent}
                      <IconComponent weight={isSelected ? "duotone" : "regular"} class="w-4 h-4" />
                    {:else}
                      <span class="font-black text-[10px]">B{info.lesson}</span>
                    {/if}
                  </div>
                  <span class={`font-black text-xs ${isSelected ? 'text-slate-800 dark:text-white' : 'text-slate-500 dark:text-neutral-400'}`}>
                    B{info.lesson}
                  </span>
                </div>

                <div class="flex items-center gap-1 shrink-0">
                  <span class={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    isSelected ? `${theme.badgeBg} ${theme.badgeColor} ${theme.darkBadgeBg} ${theme.darkBadgeColor}` : 'bg-slate-100 dark:bg-[#282A2C] text-slate-400 dark:text-neutral-500'
                  }`}>
                    {count}
                  </span>
                  {#if isSelected}
                    <div class="w-4 h-4 rounded-full bg-slate-800 dark:bg-white text-white dark:text-[#131314] flex items-center justify-center animate-[pop_0.12s_ease]">
                      <Check weight="bold" class="w-2.5 h-2.5" />
                    </div>
                  {/if}
                </div>
              </div>

              <!-- Content: Titles -->
              <div class="w-full">
                <div class={`font-extrabold text-xs truncate leading-snug ${isSelected ? 'text-slate-800 dark:text-white' : 'text-slate-500 dark:text-neutral-400'}`} title={info.titleZh}>
                  {info.titleZh}
                </div>
                <div class={`text-[10px] truncate leading-tight mt-0.5 ${isSelected ? 'text-slate-600/80 dark:text-neutral-300' : 'text-slate-400 dark:text-neutral-500'}`} title={info.titleVi}>
                  {info.titleVi}
                </div>
              </div>
            </button>
          {/each}
        </div>
      </div>

      <!-- Footer Action: Nền trắng chữ đen nổi bật, vô hiệu hóa khi không chọn bài nào (activeLessonsCount === 0) -->
      <button
        type="button"
        disabled={appState.activeLessonsCount === 0}
        onclick={() => (appState.filterModalOpen = false)}
        class={`w-full py-3 rounded-2xl text-xs font-black shrink-0 transition-all shadow-md flex items-center justify-center gap-1.5 border select-none ${
          appState.activeLessonsCount === 0
            ? 'bg-slate-200 dark:bg-[#282A2C] text-slate-400 dark:text-[#8E918F] border-slate-300/60 dark:border-[#37393B] cursor-not-allowed opacity-60'
            : 'bg-white hover:bg-slate-50 active:scale-[0.98] text-slate-950 font-black border-slate-300 shadow-md cursor-pointer'
        }`}
      >
        <span>
          {appState.activeLessonsCount === 0 ? 'Vui lòng chọn ít nhất 1 bài' : `Xác nhận (${appState.filteredVocab.length} từ)`}
        </span>
      </button>
    </div>
  </div>
{/if}

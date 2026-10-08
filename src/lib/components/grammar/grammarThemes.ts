import BookBookmark from 'phosphor-svelte/lib/BookBookmark';
import GraduationCap from 'phosphor-svelte/lib/GraduationCap';
import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
import Lightning from 'phosphor-svelte/lib/Lightning';
import Flame from 'phosphor-svelte/lib/Flame';
import Sparkle from 'phosphor-svelte/lib/Sparkle';
import TreeEvergreen from 'phosphor-svelte/lib/TreeEvergreen';
import Star from 'phosphor-svelte/lib/Star';
import ChatCircleDots from 'phosphor-svelte/lib/ChatCircleDots';
import Clock from 'phosphor-svelte/lib/Clock';
import ArrowsLeftRight from 'phosphor-svelte/lib/ArrowsLeftRight';
import HandWaving from 'phosphor-svelte/lib/HandWaving';
import MapPin from 'phosphor-svelte/lib/MapPin';
import CalendarBlank from 'phosphor-svelte/lib/CalendarBlank';
import WarningCircle from 'phosphor-svelte/lib/WarningCircle';
import Users from 'phosphor-svelte/lib/Users';
import Scales from 'phosphor-svelte/lib/Scales';
import HourglassMedium from 'phosphor-svelte/lib/HourglassMedium';
import Link from 'phosphor-svelte/lib/Link';
import Heartbeat from 'phosphor-svelte/lib/Heartbeat';

export interface GrammarTheme {
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

// Bảng màu 18 điểm ngữ pháp phong cách pastel nhẹ nhàng giống LessonFilterModal
export const GRAMMAR_THEMES: Record<number, GrammarTheme> = {
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
  },
  16: {
    bg: 'bg-[#F4F9F9]',
    border: 'border-[#CCE6E6]',
    iconBg: 'bg-[#D9EFEF]',
    iconColor: 'text-[#2C6E6E]',
    badgeBg: 'bg-[#D9EFEF]',
    badgeColor: 'text-[#255C5C]',
    darkBg: 'dark:bg-[#152727]',
    darkBorder: 'dark:border-[#244C4C]',
    darkIconBg: 'dark:bg-[#1A3838]',
    darkIconColor: 'dark:text-[#89D5D5]',
    darkBadgeBg: 'dark:bg-[#1A3838]',
    darkBadgeColor: 'dark:text-[#89D5D5]'
  },
  17: {
    bg: 'bg-[#FCF8EE]',
    border: 'border-[#F3E5BE]',
    iconBg: 'bg-[#F7EDCE]',
    iconColor: 'text-[#876A1B]',
    badgeBg: 'bg-[#F7EDCE]',
    badgeColor: 'text-[#755B14]',
    darkBg: 'dark:bg-[#292212]',
    darkBorder: 'dark:border-[#4E3F1C]',
    darkIconBg: 'dark:bg-[#372C12]',
    darkIconColor: 'dark:text-[#F3D178]',
    darkBadgeBg: 'dark:bg-[#372C12]',
    darkBadgeColor: 'dark:text-[#F3D178]'
  },
  18: {
    bg: 'bg-[#F6F4FB]',
    border: 'border-[#DFD6F4]',
    iconBg: 'bg-[#EAE3F7]',
    iconColor: 'text-[#583D94]',
    badgeBg: 'bg-[#EAE3F7]',
    badgeColor: 'text-[#4C3482]',
    darkBg: 'dark:bg-[#1E162D]',
    darkBorder: 'dark:border-[#3C2A5E]',
    darkIconBg: 'dark:bg-[#2A1D43]',
    darkIconColor: 'dark:text-[#BC9FF4]',
    darkBadgeBg: 'dark:bg-[#2A1D43]',
    darkBadgeColor: 'dark:text-[#BC9FF4]'
  }
};

// Phosphor Icon riêng biệt cho từng điểm ngữ pháp 1 -> 18
export const GRAMMAR_ICONS: Record<number, any> = {
  1: MapPin,           // 是 / 有 (Vị trí, hiện hữu)
  2: CheckCircle,      // 了 (Biến đổi trạng thái/hoàn thành)
  3: BookBookmark,     // 的 (Sở hữu & định ngữ)
  4: Lightning,        // 多 + Adj (Đo lường, mức độ)
  5: Clock,            // 正在...呢 (Đang diễn ra)
  6: Sparkle,          // 是...的 (Nhấn mạnh chi tiết)
  7: ArrowsLeftRight,  // 就 (Nhanh chóng, nhất quán)
  8: HandWaving,       // 再 (Lặp lại tương lai)
  9: HourglassMedium,  // 快要...了 (Sắp xảy ra)
  10: WarningCircle,   // 别...了 (Cấm đoán)
  11: MapPin,          // 离 (Khoảng cách)
  12: CalendarBlank,   // 过 (Trải nghiệm)
  13: Star,            // 得 (Bổ ngữ trạng thái)
  14: Users,           // 让 / 叫 / 请 (Kiêm ngữ)
  15: Scales,          // 比 (So sánh)
  16: HourglassMedium, // 着 (Duy trì trạng thái)
  17: Link,            // 虽然...但是 / 因为...所以 (Cặp liên từ nối)
  18: Heartbeat        // 对 (Tác động sức khỏe / đối với)
};

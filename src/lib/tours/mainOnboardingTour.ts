import type { TourDefinition } from '#lib/types/tour';
import { appState } from '#lib/state/appState.svelte';

export const MAIN_ONBOARDING_TOUR_ID = 'main_onboarding_tour';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const mainOnboardingTour: TourDefinition = {
  id: MAIN_ONBOARDING_TOUR_ID,
  storageKey: 'hsk_main_onboarding_tour_seen',
  steps: [
    // --- 1. HEADER & THƯƠNG HIỆU ---
    {
      id: 'welcome',
      target: '[data-tour="header-brand"]',
      title: 'Chào mừng bạn đến với HSK!',
      description: 'Gấu trúc Panda sẽ đồng hành cùng bạn ôn luyện hơn 450 từ vựng HSK 1 và HSK 2.',
      placement: 'bottom',
      illustration: '/tour/panda_welcome.webp',
      spotlightPadding: 6,
      spotlightRadius: 20,
      onBeforeStep: async () => {
        appState.sidebarOpen = false;
        appState.filterModalOpen = false;
        appState.activeTab = 'fill';
      }
    },
    {
      id: 'header-menu',
      target: () => {
        if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
          return document.querySelector('[data-tour="sidebar-container"]');
        }
        return document.querySelector('[data-tour="header-menu"]') || document.querySelector('[data-tour="sidebar-container"]');
      },
      title: 'Thực đơn hệ thống',
      description: 'Chạm để mở menu: Ngữ pháp, Thi thử, Nhiệm vụ và Tra từ điển.',
      placement: 'bottom',
      illustration: '/tour/mascot_fox.webp',
      spotlightPadding: 6,
      spotlightRadius: 18,
      onBeforeStep: async () => {
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
          appState.sidebarOpen = false;
        }
      }
    },

    // --- 2. LIÊN KẾT: ĐI SÂU VÀO SIDEBAR ---
    {
      id: 'sidebar-search',
      target: '[data-tour="sidebar-search"]',
      title: 'Tra cứu Từ điển HSK',
      description: 'Tìm kiếm nghĩa tiếng Việt, chữ Hán và Pinyin nhanh chóng.',
      placement: 'bottom',
      illustration: '/tour/panda_detective.webp',
      spotlightPadding: 6,
      spotlightRadius: 18,
      onBeforeStep: async () => {
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
          appState.sidebarOpen = true;
          await delay(250);
        }
      },
      onPrevStep: async () => {
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
          appState.sidebarOpen = true;
          await delay(250);
        }
      }
    },
    {
      id: 'sidebar-nav',
      target: '[data-tour="sidebar-nav"]',
      title: 'Hệ thống phòng học',
      description: 'Truy cập phòng Ngữ pháp, Đề thi thử, Nhiệm vụ và Bảng xếp hạng.',
      placement: 'bottom',
      illustration: '/tour/mascot_tiger.webp',
      spotlightPadding: 6,
      spotlightRadius: 22,
      onBeforeStep: async () => {
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
          appState.sidebarOpen = true;
          await delay(200);
        }
      },
      onPrevStep: async () => {
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
          appState.sidebarOpen = true;
          await delay(200);
        }
      }
    },

    // --- 3. QUAY LẠI HEADER ---
    {
      id: 'header-direction',
      target: '[data-tour="header-direction"]',
      title: 'Đổi chiều câu hỏi',
      description: 'Linh hoạt đổi chiều: Hỏi tiếng Việt chọn chữ Hán, hoặc hỏi chữ Hán chọn tiếng Việt.',
      placement: 'bottom',
      illustration: '/tour/mascot_monkey.webp',
      spotlightPadding: 6,
      spotlightRadius: 18,
      onBeforeStep: async () => {
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
          appState.sidebarOpen = false;
          await delay(200);
        }
      },
      onPrevStep: async () => {
        appState.sidebarOpen = false;
      }
    },
    {
      id: 'header-settings',
      target: '[data-tour="header-settings"]',
      title: 'Cài đặt giao diện',
      description: 'Chỉnh giao diện Sáng / Tối, âm lượng loa và xem lại hướng dẫn.',
      placement: 'bottom',
      illustration: '/tour/panda_think.webp',
      spotlightPadding: 6,
      spotlightRadius: 18
    },

    // --- 4. THANH CHẾ ĐỘ & TIẾN ĐỘ ---
    {
      id: 'modes-tabs',
      target: '[data-tour="mode-switch-tabs"]',
      title: '4 Chế độ luyện tập',
      description: 'Luyện tập toàn diện: Điền từ, Trắc nghiệm, Thẻ từ Flashcard và Luyện phát âm.',
      placement: 'bottom',
      illustration: '/icons/panda-correct.webp',
      spotlightPadding: 4,
      spotlightRadius: 20,
      onBeforeStep: () => {
        appState.activeTab = 'fill';
      }
    },
    {
      id: 'progress-bar',
      target: '[data-tour="progress-score-bar"]',
      title: 'Tiến độ học tập',
      description: 'Theo dõi phần trăm hoàn thành và tỷ lệ trả lời đúng trong bài.',
      placement: 'bottom',
      illustration: '/icons/panda-correct.webp',
      spotlightPadding: 6,
      spotlightRadius: 16
    },

    // --- 5. CHẾ ĐỘ 1: ĐIỀN TỪ (FILL WORD) & LIÊN KẾT MỞ MODAL LỌC BÀI ---
    {
      id: 'fill-lesson-btn',
      target: '[data-tour="fill-lesson-btn"]',
      title: 'Chọn bài học HSK',
      description: 'Chạm để mở bảng chọn bài học từ Bài 1 đến Bài 15.',
      placement: 'bottom',
      illustration: '/tour/mascot_tiger.webp',
      spotlightPadding: 6,
      spotlightRadius: 18,
      onBeforeStep: async () => {
        appState.activeTab = 'fill';
        appState.filterModalOpen = false;
      }
    },
    {
      id: 'filter-level',
      target: '[data-tour="filter-level-switch"]',
      title: 'Chọn cấp độ HSK 1 hoặc 2',
      description: 'Chuyển đổi giữa HSK 1 (150 từ), HSK 2 (300 từ) hoặc học trộn cả 2 cấp độ.',
      placement: 'bottom',
      illustration: '/tour/mascot_fox.webp',
      spotlightPadding: 6,
      spotlightRadius: 18,
      onBeforeStep: async () => {
        appState.filterModalOpen = true;
        await delay(250);
      },
      onPrevStep: async () => {
        appState.filterModalOpen = true;
        await delay(250);
      }
    },
    {
      id: 'filter-grid',
      target: () =>
        document.querySelector('[data-tour="filter-lessons-scroll"]') ||
        document.querySelector('[data-tour="filter-lessons-grid"]'),
      title: 'Danh sách bài học',
      description: 'Chạm để chọn các bài học bạn muốn ôn luyện.',
      placement: 'top',
      illustration: '/tour/mascot_buffalo.webp',
      spotlightPadding: 4,
      spotlightRadius: 16,
      onBeforeStep: async () => {
        appState.filterModalOpen = true;
        await delay(150);
      },
      onPrevStep: async () => {
        appState.filterModalOpen = true;
        await delay(200);
      }
    },
    {
      id: 'fill-submode',
      target: '[data-tour="fill-submode-btn"]',
      title: 'Ghép từ hoặc gõ telex',
      description: 'Chuyển đổi giữa chạm ký tự gợi ý hoặc tự gõ telex thanh điệu.',
      placement: 'bottom',
      illustration: '/tour/panda_detective.webp',
      spotlightPadding: 6,
      spotlightRadius: 18,
      onBeforeStep: async () => {
        appState.filterModalOpen = false;
        appState.activeTab = 'fill';
        await delay(200);
      },
      onPrevStep: async () => {
        appState.filterModalOpen = false;
        appState.activeTab = 'fill';
      }
    },
    {
      id: 'fill-prompt',
      target: '[data-tour="fill-prompt-area"]',
      title: 'Đề bài và Loa phát âm',
      description: 'Quan sát chữ Hán, nghĩa từ vựng và chạm Loa để nghe phát âm mẫu.',
      placement: 'bottom',
      illustration: '/tour/panda_think.webp',
      spotlightPadding: 8,
      spotlightRadius: 22
    },
    {
      id: 'fill-slots',
      target: () => {
        const isZhToVi = appState.direction === 'zh_to_vi';
        const isTileMode = appState.fillSubMode === 'tiles' && !isZhToVi;
        if (isTileMode) {
          return '[data-tour="fill-slots-area"]';
        }
        return '[data-tour="fill-manual-input"]';
      },
      includeTarget: () => {
        const isZhToVi = appState.direction === 'zh_to_vi';
        const isTileMode = appState.fillSubMode === 'tiles' && !isZhToVi;
        if (isTileMode) {
          return '[data-tour="fill-tile-bank"]';
        }
        return !isZhToVi ? '[data-tour="fill-tone-keyboard"]' : null;
      },
      get title() {
        const isZhToVi = appState.direction === 'zh_to_vi';
        const isTileMode = appState.fillSubMode === 'tiles' && !isZhToVi;
        if (isTileMode) {
          return 'Ghép ký tự Pinyin';
        }
        return isZhToVi ? 'Nhập nghĩa tiếng Việt' : 'Nhập câu trả lời & Bảng dấu';
      },
      get description() {
        const isZhToVi = appState.direction === 'zh_to_vi';
        const isTileMode = appState.fillSubMode === 'tiles' && !isZhToVi;
        if (isTileMode) {
          return 'Chạm các ký tự bên dưới để điền vào ô trống, hoặc chạm lại để gỡ bỏ.';
        }
        return isZhToVi
          ? 'Gõ nghĩa tiếng Việt của từ vựng vào ô nhập liệu rồi bấm Kiểm tra.'
          : 'Gõ câu trả lời vào ô nhập và dùng bảng dấu Pinyin để thêm thanh điệu.';
      },
      placement: 'top',
      illustration: '/tour/panda_detective.webp',
      spotlightPadding: 6,
      spotlightRadius: 18
    },
    {
      id: 'fill-actions',
      target: '[data-tour="fill-action-buttons"]',
      title: 'Nút hỗ trợ làm bài',
      description: 'Bấm Bỏ qua để sang câu mới, hoặc bấm bóng đèn để xem gợi ý.',
      placement: 'top',
      illustration: '/tour/mascot_monkey.webp',
      spotlightPadding: 6,
      spotlightRadius: 20
    },
    {
      id: 'fill-stats',
      target: '[data-tour="fill-stats-bar"]',
      title: 'Thống kê kết quả',
      description: 'Theo dõi trực tiếp số câu Đúng, câu Sai và câu Bỏ qua.',
      placement: 'top',
      illustration: '/icons/panda-wrong.webp',
      spotlightPadding: 6,
      spotlightRadius: 16
    },

    // --- 6. CHẾ ĐỘ 2: TRẮC NGHIỆM (QUIZ) ---
    {
      id: 'tab-quiz-intro',
      target: '[data-tour="tab-btn-quiz"]',
      title: 'Chế độ Trắc nghiệm',
      description: 'Chạm tab Trắc nghiệm để bắt đầu phản xạ chọn đáp án nhanh.',
      placement: 'bottom',
      illustration: '/tour/mascot_tiger.webp',
      spotlightPadding: 4,
      spotlightRadius: 14,
      onBeforeStep: async () => {
        appState.activeTab = 'fill';
      },
      onPrevStep: async () => {
        appState.activeTab = 'fill';
      }
    },
    {
      id: 'quiz-mode',
      target: '[data-tour="quiz-options-area"]',
      title: 'Trắc nghiệm 4 đáp án',
      description: 'Chạm chọn 1 trong 4 đáp án để kiểm tra phản xạ từ vựng.',
      placement: 'top',
      illustration: '/tour/mascot_buffalo.webp',
      spotlightPadding: 8,
      spotlightRadius: 24,
      onBeforeStep: async () => {
        appState.activeTab = 'quiz';
        await delay(200);
      },
      onPrevStep: async () => {
        appState.activeTab = 'fill';
        await delay(200);
      }
    },

    // --- 7. CHẾ ĐỘ 3: THẺ TỪ (FLASHCARD) ---
    {
      id: 'tab-flash-intro',
      target: '[data-tour="tab-btn-flash"]',
      title: 'Chế độ Thẻ từ Flashcard',
      description: 'Chạm tab Thẻ từ để chuyển sang ôn luyện bằng Flashcard 3D.',
      placement: 'bottom',
      illustration: '/tour/mascot_tiger.webp',
      spotlightPadding: 4,
      spotlightRadius: 14,
      onBeforeStep: async () => {
        appState.activeTab = 'quiz';
      },
      onPrevStep: async () => {
        appState.activeTab = 'quiz';
      }
    },
    {
      id: 'flash-mode',
      target: '[data-tour="flash-card-stack"]',
      title: 'Thẻ từ Flashcard 3D',
      description: 'Chạm thẻ để lật xem đáp án, vuốt phải nếu thuộc và vuốt trái nếu quên.',
      gesture: 'swipe-horizontal',
      placement: 'bottom',
      illustration: '/tour/mascot_cat.webp',
      spotlightPadding: 8,
      spotlightRadius: 26,
      onBeforeStep: async () => {
        appState.activeTab = 'flash';
        await delay(200);
      },
      onPrevStep: async () => {
        appState.activeTab = 'quiz';
        await delay(200);
      }
    },

    // --- 8. CHẾ ĐỘ 4: PHÁT ÂM (SPEECH AI) ---
    {
      id: 'tab-speech-intro',
      target: '[data-tour="tab-btn-speech"]',
      title: 'Chế độ Luyện phát âm',
      description: 'Chạm tab Phát âm để luyện nói tiếng Trung chuẩn giọng Bắc Kinh.',
      placement: 'bottom',
      illustration: '/tour/mascot_monkey.webp',
      spotlightPadding: 4,
      spotlightRadius: 14,
      onBeforeStep: async () => {
        appState.activeTab = 'flash';
      },
      onPrevStep: async () => {
        appState.activeTab = 'flash';
      }
    },
    {
      id: 'speech-speaker-step',
      target: '[data-tour="speech-speaker-btn"]',
      title: 'Loa phát âm mẫu',
      description: 'Bấm biểu tượng Loa để nghe phát âm chuẩn thanh điệu trước khi nói.',
      placement: 'bottom',
      illustration: '/tour/mascot_girl.webp',
      spotlightPadding: 6,
      spotlightRadius: 18,
      onBeforeStep: async () => {
        appState.activeTab = 'speech';
        await delay(200);
      },
      onPrevStep: async () => {
        appState.activeTab = 'flash';
        await delay(200);
      }
    },
    {
      id: 'speech-mode',
      target: '[data-tour="speech-mic-btn"]',
      title: 'Bấm Micro để luyện nói',
      description: 'Bấm nút Micro to và nói từ tiếng Trung để AI chấm điểm trực tiếp.',
      placement: 'top',
      illustration: '/tour/mascot_girl.webp',
      spotlightPadding: 8,
      spotlightRadius: 9999,
      onBeforeStep: async () => {
        appState.activeTab = 'speech';
        await delay(200);
      },
      onPrevStep: async () => {
        appState.activeTab = 'speech';
        await delay(200);
      }
    },

    // --- 9. HOÀN TẤT TOUR ---
    {
      id: 'tour-finish',
      target: '[data-tour="header-brand"]',
      title: 'Bắt đầu học ngay!',
      description: 'Bạn đã nắm rõ mọi tính năng. Chúc bạn ôn tập HSK thật hiệu quả!',
      placement: 'bottom',
      illustration: '/tour/panda_rocket.webp',
      spotlightPadding: 6,
      spotlightRadius: 20,
      onBeforeStep: async () => {
        appState.activeTab = 'fill';
      }
    }
  ],
  onComplete: () => {
    appState.activeTab = 'fill';
    appState.filterModalOpen = false;
    appState.sidebarOpen = false;
  },
  onSkip: () => {
    appState.activeTab = 'fill';
    appState.filterModalOpen = false;
    appState.sidebarOpen = false;
  }
};

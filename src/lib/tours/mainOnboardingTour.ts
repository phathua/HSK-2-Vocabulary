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
      title: 'Chào mừng bạn đến với Ôn Tập HSK! 🐼',
      description: 'Linh vật Panda HSK sẽ đồng hành cùng bạn chinh phục trọn vẹn từ vựng HSK 1 & HSK 2 với 4 phương pháp luyện phản xạ đa giác quan.',
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
      description: 'Chạm vào nút Menu (hoặc thanh bên) để mở lối tắt đến tất cả các phòng học: Ngữ pháp, Thi thử, Nhiệm vụ và Tra từ điển.',
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
      title: 'Tra cứu Từ điển HSK nhanh',
      description: 'Tìm kiếm nghĩa tiếng Việt, chữ Hán, Pinyin và ví dụ câu thực tế của hơn 450 từ vựng HSK 1 & 2 bất cứ lúc nào.',
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
      title: 'Hệ sinh thái luyện thi toàn diện',
      description: 'Dễ dàng chuyển đổi giữa học Ngữ pháp trọng điểm, Phòng thi thử chuẩn Hanban, Nhiệm vụ ngày và Bảng xếp hạng thi đua.',
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
      title: 'Đảo chiều câu hỏi thông minh',
      description: 'Linh hoạt đổi chiều: Hỏi tiếng Việt ➔ Chọn chữ Hán/Pinyin, hoặc Hỏi chữ Hán ➔ Chọn nghĩa tiếng Việt để nhớ sâu 2 chiều.',
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
      title: 'Cài đặt & Xem lại hướng dẫn',
      description: 'Tùy chỉnh giao diện Sáng / Tối, chỉnh âm lượng loa, bật tự động phát âm và mở lại hướng dẫn sử dụng bất cứ lúc nào.',
      placement: 'bottom',
      illustration: '/tour/panda_think.webp',
      spotlightPadding: 6,
      spotlightRadius: 18
    },

    // --- 4. THANH CHẾ ĐỘ & TIẾN ĐỘ ---
    {
      id: 'modes-tabs',
      target: '[data-tour="mode-switch-tabs"]',
      title: '4 Chế độ luyện tập chuyên sâu',
      description: 'Luyện tập toàn diện 4 giác quan: Điền từ (ghép pinyin), Trắc nghiệm (phản xạ nhanh), Thẻ từ (ghi nhớ dài hạn), và Phát âm (nhận diện giọng nói AI).',
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
      title: 'Tiến độ & Điểm số trực tiếp',
      description: 'Thanh tiến độ theo dõi phần trăm bài học đã hoàn thành và tỷ lệ câu trả lời đúng trên tổng số câu hỏi trong bài.',
      placement: 'bottom',
      illustration: '/icons/panda-correct.webp',
      spotlightPadding: 6,
      spotlightRadius: 16
    },

    // --- 5. CHẾ ĐỘ 1: ĐIỀN TỪ (FILL WORD) & LIÊN KẾT MỞ MODAL LỌC BÀI ---
    {
      id: 'fill-lesson-btn',
      target: '[data-tour="fill-lesson-btn"]',
      title: 'Nút Bài học đang luyện tập',
      description: 'Hiển thị bài học hiện tại (Bài 1 - 15). Chạm vào đây để mở bảng chọn bài học hoặc chuyển cấp độ HSK.',
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
      title: 'Chọn cấp độ HSK 1 hoặc HSK 2',
      description: 'Dễ dàng chuyển đổi giữa 15 bài HSK 1 (150 từ vựng) hoặc 15 bài HSK 2 (300 từ vựng), hoặc tích hợp học trộn cả 2 cấp độ!',
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
      target: '[data-tour="filter-lessons-grid"]',
      title: 'Danh mục 15 bài học chủ đề',
      description: 'Chạm để bật/tắt từng bài học theo tiến độ học của bạn trên lớp. Các từ vựng của bài đã chọn sẽ tự động xuất hiện trong mọi bài tập.',
      placement: 'top',
      illustration: '/icons/panda-exam-loading.webp',
      spotlightPadding: 6,
      spotlightRadius: 20,
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
      title: 'Chọn từ hoặc Gõ phím thủ công',
      description: 'Chế độ "Chọn từ": Chọn ký tự có sẵn để ghép Pinyin. Chế độ "Thủ công": Tự gõ Telex Pinyin tiện lợi (ví dụ gõ ni3hao3 hoặc nihaoj).',
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
      title: 'Đề bài, Chữ Hán & Loa phát âm',
      description: 'Quan sát chữ Hán, nghĩa tiếng Việt và hình ảnh gợi ý. Nhấn biểu tượng Loa xanh lá để nghe phát âm mẫu chuẩn giọng Bắc Kinh.',
      placement: 'bottom',
      illustration: '/tour/panda_think.webp',
      spotlightPadding: 8,
      spotlightRadius: 22
    },
    {
      id: 'fill-slots',
      target: '[data-tour="fill-slots-area"]',
      title: 'Hàng ô Slot ghép Pinyin',
      description: 'Các ô trống tương ứng với từng ký tự Pinyin. Chọn các ký tự gợi ý ở dưới để ghép chữ, hoặc chạm trực tiếp vào ô để gỡ bỏ ký tự.',
      placement: 'top',
      illustration: '/tour/panda_detective.webp',
      spotlightPadding: 6,
      spotlightRadius: 18
    },
    {
      id: 'fill-actions',
      target: '[data-tour="fill-action-buttons"]',
      title: 'Các nút hỗ trợ làm bài',
      description: 'Nút "Bỏ qua" để chuyển câu tiếp, nút "Đáp án" (bóng đèn) để xem gợi ý khi gặp từ khó, và nút Backspace để xóa nhanh ký tự vừa nhập.',
      placement: 'top',
      illustration: '/tour/mascot_monkey.webp',
      spotlightPadding: 6,
      spotlightRadius: 20
    },
    {
      id: 'fill-stats',
      target: '[data-tour="fill-stats-bar"]',
      title: 'Bảng thống kê kết quả trực tiếp',
      description: 'Ghi nhận tức thì số câu Đúng (xanh), câu Sai (đỏ) và số câu Bỏ qua (vàng) để bạn đánh giá mức độ ghi nhớ từ vựng.',
      placement: 'top',
      illustration: '/icons/panda-wrong.webp',
      spotlightPadding: 6,
      spotlightRadius: 16
    },

    // --- 6. CHẾ ĐỘ 2: TRẮC NGHIỆM (QUIZ) ---
    {
      id: 'quiz-mode',
      target: '[data-tour="quiz-card-container"]',
      title: 'Chế độ Trắc nghiệm 4 đáp án 🎯',
      description: 'Rèn luyện phản xạ nhanh với 4 phương án A, B, C, D. Hệ thống phản hồi màu sắc ngay lập tức (xanh lá khi đúng, đỏ khi sai kèm giải thích).',
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
      id: 'flash-mode',
      target: '[data-tour="flash-card-stack"]',
      title: 'Chế độ Thẻ từ Flashcard 3D 🗂️',
      description: 'Chạm vào thẻ để lật xem Chữ Hán, Pinyin và Ví dụ. Vuốt thẻ sang PHẢI nếu bạn đã "THUỘC", hoặc vuốt sang TRÁI nếu bạn còn "QUÊN".',
      placement: 'top',
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
      id: 'speech-mode',
      target: '[data-tour="speech-card-container"]',
      title: 'Chế độ Luyện phát âm thông minh 🎙️',
      description: 'Nghe phát âm chuẩn bản xứ, sau đó bấm nút Micro để AI nhận diện giọng nói tiếng Trung của bạn trong thời gian thực.',
      placement: 'top',
      illustration: '/tour/mascot_girl.webp',
      spotlightPadding: 8,
      spotlightRadius: 26,
      onBeforeStep: async () => {
        appState.activeTab = 'speech';
        await delay(200);
      },
      onPrevStep: async () => {
        appState.activeTab = 'flash';
        await delay(200);
      }
    },

    // --- 9. HOÀN TẤT TOUR ---
    {
      id: 'tour-finish',
      target: '[data-tour="header-brand"]',
      title: 'Bạn đã sẵn sàng chinh phục HSK! 🚀',
      description: 'Mọi tính năng đã được làm quen. Hãy bắt đầu buổi học đầu tiên ngay bây giờ cùng chú gấu trúc Panda nhé. Chúc bạn học tốt!',
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

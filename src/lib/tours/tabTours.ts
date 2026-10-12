import type { TourDefinition } from '#lib/types/tour';
import { appState } from '#lib/state/appState.svelte';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ========================================================
// 1. TOUR CHUYÊN SÂU: ĐIỀN TỪ (FILL WORD TOUR - 5 BƯỚC)
// ========================================================
export const fillWordTour: TourDefinition = {
  id: 'fill_word_tour',
  storageKey: 'hsk_tour_fill_seen',
  steps: [
    {
      id: 'fill-lesson',
      target: '[data-tour="fill-lesson-btn"]',
      title: 'Chọn bài học HSK',
      description: 'Chạm để đổi bài học hoặc chuyển cấp độ HSK 1 và HSK 2.',
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
      }
    },
    {
      id: 'fill-speaker',
      target: '[data-tour="fill-speaker-btn"]',
      title: 'Loa phát âm mẫu',
      description: 'Chạm biểu tượng Loa để nghe phát âm chuẩn giọng Bắc Kinh.',
      placement: 'bottom',
      illustration: '/tour/panda_think.webp',
      spotlightPadding: 6,
      spotlightRadius: 18
    },
    {
      id: 'fill-slots',
      target: '[data-tour="fill-slots-area"]',
      includeTarget: '[data-tour="fill-tile-bank"]',
      title: 'Ghép ký tự Pinyin',
      description: 'Chạm các ký tự gợi ý bên dưới để điền, hoặc chạm vào ô để gỡ bỏ.',
      placement: 'top',
      illustration: '/tour/mascot_buffalo.webp',
      spotlightPadding: 6,
      spotlightRadius: 18
    },
    {
      id: 'fill-actions',
      target: '[data-tour="fill-action-buttons"]',
      title: 'Bỏ qua và Xem đáp án',
      description: 'Bấm Bỏ qua để sang câu mới, hoặc bấm bóng đèn để xem gợi ý.',
      placement: 'top',
      illustration: '/tour/mascot_monkey.webp',
      spotlightPadding: 6,
      spotlightRadius: 20
    }
  ],
  onComplete: () => {
    appState.filterModalOpen = false;
  },
  onSkip: () => {
    appState.filterModalOpen = false;
  }
};

// ========================================================
// 2. TOUR CHUYÊN SÂU: TRẮC NGHIỆM (QUIZ TOUR - 5 BƯỚC)
// ========================================================
export const quizTour: TourDefinition = {
  id: 'quiz_tour',
  storageKey: 'hsk_tour_quiz_seen',
  steps: [
    {
      id: 'quiz-prompt',
      target: '[data-tour="quiz-prompt-area"]',
      title: 'Câu hỏi từ vựng',
      description: 'Quan sát câu hỏi và hình gợi ý để chuẩn bị chọn đáp án.',
      placement: 'bottom',
      illustration: '/tour/mascot_tiger.webp',
      spotlightPadding: 8,
      spotlightRadius: 22,
      onBeforeStep: async () => {
        appState.activeTab = 'quiz';
        await delay(200);
      }
    },
    {
      id: 'quiz-speaker',
      target: '[data-tour="quiz-speaker-btn"]',
      title: 'Loa phát âm chuẩn',
      description: 'Bấm biểu tượng Loa để nghe phát âm chuẩn gợi nhớ từ vựng.',
      placement: 'bottom',
      illustration: '/tour/mascot_girl.webp',
      spotlightPadding: 6,
      spotlightRadius: 18
    },
    {
      id: 'quiz-options',
      target: '[data-tour="quiz-options-area"]',
      title: '4 Phương án lựa chọn',
      description: 'Chạm chọn 1 trong 4 đáp án để kiểm tra phản xạ nhanh.',
      placement: 'top',
      illustration: '/tour/mascot_cat.webp',
      spotlightPadding: 8,
      spotlightRadius: 24,
      onBeforeStep: async () => {
        appState.quizAnswered = false;
        await delay(100);
      }
    },
    {
      id: 'quiz-lesson',
      target: '[data-tour="quiz-lesson-btn"]',
      title: 'Đổi bài học trắc nghiệm',
      description: 'Chạm để chọn bài học ôn luyện hoặc đổi cấp độ HSK.',
      placement: 'bottom',
      illustration: '/tour/panda_detective.webp',
      spotlightPadding: 6,
      spotlightRadius: 18
    },
    {
      id: 'quiz-stats',
      target: '[data-tour="quiz-stats-bar"]',
      title: 'Thống kê kết quả',
      description: 'Theo dõi trực tiếp số câu đúng, câu sai và số câu còn lại.',
      placement: 'top',
      illustration: '/tour/panda_rocket.webp',
      spotlightPadding: 6,
      spotlightRadius: 16
    }
  ]
};

// ========================================================
// 3. TOUR CHUYÊN SÂU: THẺ TỪ (FLASHCARD TOUR - 5 BƯỚC)
// ========================================================
export const flashcardTour: TourDefinition = {
  id: 'flashcard_tour',
  storageKey: 'hsk_tour_flash_seen',
  steps: [
    {
      id: 'flash-card-flip',
      target: '[data-tour="flash-card-stack"]',
      title: 'Chạm để lật thẻ 3D',
      description: 'Chạm vào thẻ để lật xem chữ Hán, Pinyin và nghĩa tiếng Việt.',
      gesture: 'tap',
      placement: 'bottom',
      illustration: '/tour/mascot_cat.webp',
      spotlightPadding: 8,
      spotlightRadius: 26,
      onBeforeStep: async () => {
        appState.activeTab = 'flash';
        await delay(200);
      }
    },
    {
      id: 'flash-card-swipe',
      target: '[data-tour="flash-card-stack"]',
      title: 'Vuốt Phải Thuộc, Vuốt Trái Quên',
      description: 'Vuốt sang phải nếu đã nhớ từ, hoặc vuốt sang trái nếu còn quên.',
      gesture: 'swipe-horizontal',
      placement: 'bottom',
      illustration: '/tour/panda_welcome.webp',
      spotlightPadding: 8,
      spotlightRadius: 26
    },
    {
      id: 'flash-card-speaker',
      target: '[data-tour="flashcard-speaker-btn"]',
      title: 'Nghe phát âm chuẩn',
      description: 'Bấm biểu tượng Loa để nghe phát âm chuẩn thanh điệu bất cứ lúc nào.',
      placement: 'bottom',
      illustration: '/tour/mascot_girl.webp',
      spotlightPadding: 6,
      spotlightRadius: 18
    },
    {
      id: 'flash-card-lesson',
      target: '[data-tour="flashcard-lesson-btn"]',
      title: 'Đổi bài và Học lại',
      description: 'Bấm nút Bài để đổi bài học, hoặc bấm xoay tròn để học lại từ đầu.',
      placement: 'bottom',
      illustration: '/tour/panda_detective.webp',
      spotlightPadding: 6,
      spotlightRadius: 18
    },
    {
      id: 'flash-card-stats',
      target: '[data-tour="flashcard-stats-bar"]',
      title: 'Thống kê ghi nhớ',
      description: 'Theo dõi tổng số thẻ đã thuộc và số thẻ cần ôn lại.',
      placement: 'top',
      illustration: '/tour/panda_rocket.webp',
      spotlightPadding: 6,
      spotlightRadius: 16
    }
  ]
};

// ========================================================
// 4. TOUR CHUYÊN SÂU: PHÁT ÂM (SPEECH AI TOUR - 5 BƯỚC)
// ========================================================
export const speechTour: TourDefinition = {
  id: 'speech_tour',
  storageKey: 'hsk_tour_speech_seen',
  steps: [
    {
      id: 'speech-prompt',
      target: '[data-tour="speech-prompt-area"]',
      title: 'Từ vựng cần phát âm',
      description: 'Quan sát nghĩa từ vựng và chuẩn bị phát âm to, rõ ràng.',
      placement: 'bottom',
      illustration: '/tour/mascot_tiger.webp',
      spotlightPadding: 8,
      spotlightRadius: 22,
      onBeforeStep: async () => {
        appState.activeTab = 'speech';
        await delay(200);
      }
    },
    {
      id: 'speech-speaker',
      target: '[data-tour="speech-speaker-btn"]',
      title: 'Nghe mẫu chuẩn bản xứ',
      description: 'Bấm biểu tượng Loa để nghe phát âm mẫu chuẩn giọng Bắc Kinh.',
      placement: 'bottom',
      illustration: '/tour/mascot_girl.webp',
      spotlightPadding: 6,
      spotlightRadius: 18
    },
    {
      id: 'speech-mic',
      target: '[data-tour="speech-mic-btn"]',
      title: 'Bấm Micro để luyện nói',
      description: 'Bấm nút Micro và nói to từ tiếng Trung để AI nhận diện và chấm điểm.',
      placement: 'top',
      illustration: '/tour/panda_detective.webp',
      spotlightPadding: 8,
      spotlightRadius: 9999,
      onBeforeStep: async () => {
        appState.speechAnswered = false;
        await delay(100);
      }
    },
    {
      id: 'speech-auto',
      target: '[data-tour="speech-auto-checkbox"]',
      title: 'Tự động kiểm tra giọng nói',
      description: 'Tự động xác nhận kết quả ngay sau khi bạn vừa phát âm xong.',
      placement: 'top',
      illustration: '/tour/mascot_cat.webp',
      spotlightPadding: 6,
      spotlightRadius: 16
    },
    {
      id: 'speech-lesson',
      target: '[data-tour="speech-lesson-btn"]',
      title: 'Đổi bài học phát âm',
      description: 'Bấm nút Bài để chọn bài học muốn luyện nói hoặc chuyển cấp độ HSK.',
      placement: 'bottom',
      illustration: '/tour/mascot_monkey.webp',
      spotlightPadding: 6,
      spotlightRadius: 18
    }
  ]
};

// Map các tour theo tab
export const TAB_TOURS: Record<'fill' | 'quiz' | 'flash' | 'speech', TourDefinition> = {
  fill: fillWordTour,
  quiz: quizTour,
  flash: flashcardTour,
  speech: speechTour
};

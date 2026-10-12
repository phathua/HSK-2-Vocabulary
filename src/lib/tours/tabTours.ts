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
      title: 'Nút Bài học đang luyện tập 📖',
      description: 'Hiển thị bài học hiện tại (Bài 1 - 15). Chạm vào đây để mở bảng chọn bài học hoặc chuyển cấp độ HSK 1 / HSK 2.',
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
      title: 'Chọn từ hoặc Gõ Telex thủ công ⌨️',
      description: 'Chế độ "Chọn từ": Chạm ký tự có sẵn để ghép Pinyin. Chế độ "Thủ công": Tự gõ số thanh điệu hoặc telex (ví dụ ni3hao3 hoặc nihaoj).',
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
      id: 'fill-prompt',
      target: '[data-tour="fill-prompt-area"]',
      title: 'Đề bài, Chữ Hán & Loa nghe 🧩',
      description: 'Quan sát nghĩa tiếng Việt, chữ Hán và hình minh họa. Bấm biểu tượng Loa xanh lá để nghe phát âm mẫu chuẩn giọng Bắc Kinh.',
      placement: 'bottom',
      illustration: '/tour/panda_think.webp',
      spotlightPadding: 8,
      spotlightRadius: 22
    },
    {
      id: 'fill-slots',
      target: '[data-tour="fill-slots-area"]',
      title: 'Hàng ô Slot ghép Pinyin 🔤',
      description: 'Các ô trống tương ứng với từng ký tự Pinyin. Chạm các ký tự bên dưới để điền, hoặc chạm vào ô đã điền để gỡ bỏ ký tự.',
      placement: 'top',
      illustration: '/tour/mascot_buffalo.webp',
      spotlightPadding: 6,
      spotlightRadius: 18
    },
    {
      id: 'fill-actions',
      target: '[data-tour="fill-action-buttons"]',
      title: 'Nút Bỏ qua & Xem đáp án 💡',
      description: 'Bấm "Bỏ qua" để sang từ tiếp theo, hoặc bấm "Đáp án" (bóng đèn tím) khi gặp từ khó để hệ thống gợi ý ký tự chuẩn.',
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
      title: 'Đề bài & Hình ảnh gợi ý 🖼️',
      description: 'Quan sát nghĩa tiếng Việt (hoặc chữ Hán) và hình ảnh gợi ý tương ứng để hình dung từ vựng cần tìm.',
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
      title: 'Loa nghe phát âm bản xứ 🔊',
      description: 'Bấm biểu tượng Loa xanh lá ở góc phải để nghe phát âm chuẩn thanh điệu, giúp bạn gợi nhớ đáp án chính xác.',
      placement: 'bottom',
      illustration: '/tour/mascot_girl.webp',
      spotlightPadding: 6,
      spotlightRadius: 18
    },
    {
      id: 'quiz-options',
      target: '[data-tour="quiz-options-area"]',
      title: '4 Phương án lựa chọn A, B, C, D ⚡',
      description: 'Chạm vào 1 trong 4 đáp án để kiểm tra. Hệ thống phản hồi màu sắc tức thì: Xanh lá khi đúng và Đỏ khi sai kèm giải thích đáp án.',
      placement: 'top',
      illustration: '/tour/mascot_cat.webp',
      spotlightPadding: 8,
      spotlightRadius: 24
    },
    {
      id: 'quiz-lesson',
      target: '[data-tour="quiz-lesson-btn"]',
      title: 'Nút Đổi bài học trắc nghiệm 📖',
      description: 'Chạm vào nút Bài ở góc trên bên trái để chọn bài học muốn ôn luyện hoặc chuyển đổi linh hoạt giữa HSK 1 và HSK 2.',
      placement: 'bottom',
      illustration: '/tour/panda_detective.webp',
      spotlightPadding: 6,
      spotlightRadius: 18
    },
    {
      id: 'quiz-stats',
      target: '[data-tour="quiz-stats-bar"]',
      title: 'Thống kê Đúng / Sai trực tiếp 📊',
      description: 'Ghi nhận trực tiếp số câu Đúng, câu Sai và số câu còn lại trong bài để bạn theo dõi tỷ lệ phản xạ từ vựng của mình.',
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
      title: 'Chạm vào thẻ để lật xem đáp án 🔄',
      description: 'Chạm bất kỳ đâu trên thẻ 3D để lật mặt sau xem chữ Hán, Pinyin, nghĩa tiếng Việt và câu ví dụ minh họa thực tế.',
      placement: 'top',
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
      title: 'Vuốt Phải (Thuộc) & Vuốt Trái (Quên) 👉',
      description: '👉 Vuốt thẻ sang PHẢI nếu bạn đã nhớ từ.\n👈 Vuốt sang TRÁI nếu bạn còn hay quên để hệ thống tự động xếp lịch ôn lại ngắt quãng (Spaced Repetition).',
      gesture: 'swipe-horizontal',
      placement: 'top',
      illustration: '/tour/panda_welcome.webp',
      spotlightPadding: 8,
      spotlightRadius: 26
    },
    {
      id: 'flash-card-speaker',
      target: '[data-tour="flashcard-speaker-btn"]',
      title: 'Nghe phát âm chuẩn giọng Bắc Kinh 🎧',
      description: 'Bấm biểu tượng Loa ở góc phải bất cứ lúc nào để nghe phát âm chuẩn với thanh điệu rõ ràng của người bản xứ.',
      placement: 'bottom',
      illustration: '/tour/mascot_girl.webp',
      spotlightPadding: 6,
      spotlightRadius: 18
    },
    {
      id: 'flash-card-lesson',
      target: '[data-tour="flashcard-lesson-btn"]',
      title: 'Chọn bài học & Học lại từ đầu 📖',
      description: 'Bấm nút Bài để đổi bài học ôn luyện, hoặc bấm nút mũi tên xoay tròn bên cạnh để xáo trộn và học lại từ đầu bộ thẻ.',
      placement: 'bottom',
      illustration: '/tour/panda_detective.webp',
      spotlightPadding: 6,
      spotlightRadius: 18
    },
    {
      id: 'flash-card-stats',
      target: '[data-tour="flashcard-stats-bar"]',
      title: 'Thống kê Thẻ Thuộc & Chưa thuộc 🌟',
      description: 'Theo dõi tổng số thẻ bạn đã Thuộc (xanh), số thẻ Chưa thuộc cần lặp lại (đỏ) và tổng số thẻ còn lại trong bộ bài.',
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
      title: 'Từ vựng cần luyện phát âm 🗣️',
      description: 'Quan sát chữ Hán hoặc nghĩa tiếng Việt cùng hình ảnh gợi ý. Chuẩn bị khẩu hình để phát âm to và rõ ràng.',
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
      title: 'Nghe mẫu chuẩn bản xứ 🔊',
      description: 'Bấm biểu tượng Loa ở góc phải để nghe phát âm mẫu chuẩn giọng Bắc Kinh trước khi nói, giúp bạn bắt chước đúng thanh điệu.',
      placement: 'bottom',
      illustration: '/tour/mascot_girl.webp',
      spotlightPadding: 6,
      spotlightRadius: 18
    },
    {
      id: 'speech-mic',
      target: '[data-tour="speech-mic-btn"]',
      title: 'Bấm Micro to và bắt đầu nói 🎙️',
      description: 'Bấm nút Micro màu xanh tím, nói to từ tiếng Trung vào micro. Trí tuệ nhân tạo AI sẽ nhận diện giọng nói và hiển thị Pinyin trực tiếp.',
      placement: 'top',
      illustration: '/tour/panda_detective.webp',
      spotlightPadding: 8,
      spotlightRadius: 24
    },
    {
      id: 'speech-auto',
      target: '[data-tour="speech-auto-checkbox"]',
      title: 'Tự động xác nhận sau khi nói ⚡',
      description: 'Tích chọn ô này để hệ thống tự động kiểm tra đáp án ngay sau khi bạn vừa phát âm xong mà không cần bấm thêm nút xác nhận.',
      placement: 'top',
      illustration: '/tour/mascot_cat.webp',
      spotlightPadding: 6,
      spotlightRadius: 16
    },
    {
      id: 'speech-lesson',
      target: '[data-tour="speech-lesson-btn"]',
      title: 'Nút Đổi bài học phát âm 📖',
      description: 'Bấm nút Bài ở góc trên bên trái để chọn bài học muốn luyện nói hoặc chuyển đổi giữa cấp độ HSK 1 và HSK 2.',
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

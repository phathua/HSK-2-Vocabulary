// Dữ liệu câu ví dụ (câu mẫu chuẩn) cho kỳ thi HSK 2 theo quy chuẩn CTI Hanban

export interface ExamExampleDialogueLine {
  speaker: string;
  hanzi: string;
  pinyin: string;
  viet?: string;
}

export interface ExamExampleOption {
  letter: string;
  text?: string;
  pinyin?: string;
}

export interface ExamExampleDefinition {
  id: string;
  partTitle: string;
  instruction: string;
  section: 'listening' | 'reading';
  forStartQuestion: number; // Câu hỏi bắt đầu nhóm: 1, 11, 21, 31, 36, 41, 46, 51
  dialogue?: ExamExampleDialogueLine[];
  text?: string;
  pinyin?: string;
  viet?: string;
  statementHanzi?: string;
  statementPinyin?: string;
  statementViet?: string;
  questionText?: string;
  questionPinyin?: string;
  questionViet?: string;
  options?: ExamExampleOption[];
  getAnswer: (examCode: string) => string;
  explanation: string;
}

/**
 * Trả về đáp án câu ví dụ cho nhóm câu tương ứng.
 * Dùng để làm xám và cấm bấm ở các câu hỏi thực tế trong nhóm.
 */
export function getGroupExampleAnswer(examCode: string, qNo: number): string | null {
  const code = (examCode || '').toUpperCase();
  const isH21002 = code === 'H21002';

  if (qNo >= 11 && qNo <= 15) return isH21002 ? 'F' : 'D';
  if (qNo >= 16 && qNo <= 20) return 'F';
  if (qNo >= 36 && qNo <= 40) return isH21002 ? 'F' : 'D';
  if (qNo >= 41 && qNo <= 45) return isH21002 ? 'F' : 'E';
  if (qNo >= 51 && qNo <= 55) return isH21002 ? 'F' : 'E';
  if (qNo >= 56 && qNo <= 60) return 'F';
  return null;
}

export const EXAM_EXAMPLES: Record<number, ExamExampleDefinition> = {
  // 1. Nghe Part 1 (Q1 - Q10): Đúng / Sai
  1: {
    id: 'listening-part-1',
    partTitle: 'Phần 1: Nghe Hiểu (听力) — Đúng / Sai',
    instruction: 'Nghe câu và phán đoán câu khẳng định Đúng hay Sai:',
    section: 'listening',
    forStartQuestion: 1,
    dialogue: [
      {
        speaker: 'Ví dụ 1',
        hanzi: '我们家有三个人。',
        pinyin: 'Wǒmen jiā yǒu sān gè rén.',
        viet: 'Nhà chúng tôi có ba người.'
      },
      {
        speaker: 'Ví dụ 2',
        hanzi: '我每天坐公共汽车去上班。',
        pinyin: 'Wǒ měitiān zuò gōnggòng qìchē qù shàngbān.',
        viet: 'Tôi đi làm bằng xe buýt mỗi ngày.'
      }
    ],
    options: [
      { letter: '√', text: 'Đúng (Ví dụ 1)' },
      { letter: '×', text: 'Sai (Ví dụ 2)' }
    ],
    getAnswer: () => '√',
    explanation: 'Ví dụ 1 nói gia đình 3 người, khớp với hình ảnh nên Đúng. Ví dụ 2 nói đi làm bằng xe buýt, khác với hình đạp xe nên Sai.'
  },

  // 2. Nghe Part 2 (Q11 - Q15): Khớp tranh A - F
  11: {
    id: 'listening-part-2',
    partTitle: 'Phần 1: Nghe Hiểu (听力) — Khớp tranh A – F',
    instruction: 'Nghe đoạn hội thoại và chọn tranh A – F phù hợp:',
    section: 'listening',
    forStartQuestion: 11,
    dialogue: [
      {
        speaker: 'Nam',
        hanzi: '你喜欢什么运动？',
        pinyin: 'Nǐ xǐhuan shénme yùndòng?',
        viet: 'Bạn thích môn thể thao nào?'
      },
      {
        speaker: 'Nữ',
        hanzi: '我最喜欢踢足球。',
        pinyin: 'Wǒ zuì xǐhuan tī zúqiú.',
        viet: 'Tôi thích nhất đá bóng.'
      }
    ],
    options: [
      { letter: 'A' },
      { letter: 'B' },
      { letter: 'C' },
      { letter: 'D' },
      { letter: 'E' },
      { letter: 'F' }
    ],
    getAnswer: (code) => (code?.toUpperCase() === 'H21002' ? 'F' : 'D'),
    explanation: 'Nữ nói thích nhất đá bóng (tī zúqiú), tương ứng với tranh D (cô gái đá bóng). Đáp án câu mẫu là D.'
  },

  // 3. Nghe Part 3 (Q21 - Q30): Hội thoại ngắn 3 lựa chọn
  21: {
    id: 'listening-part-3',
    partTitle: 'Phần 1: Nghe Hiểu (听力) — Hội thoại ngắn',
    instruction: 'Nghe đoạn hội thoại và chọn đáp án chính xác (A, B, C):',
    section: 'listening',
    forStartQuestion: 21,
    dialogue: [
      {
        speaker: 'Nam',
        hanzi: '小王，这里有几个茶杯，哪个是你的？',
        pinyin: 'Xiǎo Wáng, zhèlǐ yǒu jǐ gè chábēi, nǎge shì nǐ de?',
        viet: 'Tiểu Vương, ở đây có mấy chiếc cốc trà, cái nào là của bạn?'
      },
      {
        speaker: 'Nữ',
        hanzi: '左边那个红色的，是我的。',
        pinyin: 'Zuǒbian nàge hóngsè de, shì wǒ de.',
        viet: 'Cái màu đỏ ở bên trái là của tôi.'
      }
    ],
    questionText: '小王的茶杯是什么颜色的？',
    questionPinyin: 'Xiǎo Wáng de chábēi shì shénme yánsè de?',
    questionViet: 'Cốc trà của Tiểu Vương màu gì?',
    options: [
      { letter: 'A', text: '红色的', pinyin: 'hóngsè de' },
      { letter: 'B', text: '黑色的', pinyin: 'hēisè de' },
      { letter: 'C', text: '白色的', pinyin: 'báisè de' }
    ],
    getAnswer: () => 'A',
    explanation: 'Nữ nói chiếc cốc màu đỏ (hóngsè de) là của mình, nên đáp án câu mẫu là A.'
  },

  // 4. Nghe Part 4 (Q31 - Q35): Hội thoại dài 3 lựa chọn
  31: {
    id: 'listening-part-4',
    partTitle: 'Phần 1: Nghe Hiểu (听力) — Hội thoại 4 lượt',
    instruction: 'Nghe đoạn đối thoại và trả lời câu hỏi (A, B, C):',
    section: 'listening',
    forStartQuestion: 31,
    dialogue: [
      {
        speaker: 'Nữ',
        hanzi: '请在这儿写您的名字。',
        pinyin: 'Qǐng zài zhèr xiě nín de míngzi.',
        viet: 'Xin vui lòng viết tên của bạn vào đây.'
      },
      {
        speaker: 'Nam',
        hanzi: '是这儿吗？',
        pinyin: 'Shì zhèr ma?',
        viet: 'Ở đây phải không?'
      },
      {
        speaker: 'Nữ',
        hanzi: '不是，是这儿。',
        pinyin: 'Bú shì, shì zhèr.',
        viet: 'Không phải, là chỗ này.'
      },
      {
        speaker: 'Nam',
        hanzi: '好，谢谢。',
        pinyin: 'Hǎo, xièxie.',
        viet: 'Được, cảm ơn bạn.'
      }
    ],
    questionText: '男的要写什么？',
    questionPinyin: 'Nán de yào xiě shénme?',
    questionViet: 'Người nam cần viết cái gì?',
    options: [
      { letter: 'A', text: '名字', pinyin: 'míngzi' },
      { letter: 'B', text: '时间', pinyin: 'shíjiān' },
      { letter: 'C', text: '房间号', pinyin: 'fángjiānhào' }
    ],
    getAnswer: () => 'A',
    explanation: 'Nữ yêu cầu viết tên (míngzi) vào giấy, nên đáp án câu mẫu là A.'
  },

  // 5. Đọc Part 1 (Q36 - Q40): Khớp câu với tranh A - F
  36: {
    id: 'reading-part-1',
    partTitle: 'Phần 2: Đọc Hiểu (阅读) — Khớp tranh A – F',
    instruction: 'Đọc câu văn và chọn tranh A – F phù hợp:',
    section: 'reading',
    forStartQuestion: 36,
    text: '每个人都有第一份工作，我的第一份工作是在报社。',
    pinyin: 'Měi gèrén dōuyǒu dì-yī fèn gōngzuò, wǒ de dì-yī fèn gōngzuò shì zài bàoshè.',
    viet: 'Ai cũng có công việc đầu tiên, công việc đầu tiên của tôi là ở toà soạn báo.',
    options: [
      { letter: 'A' },
      { letter: 'B' },
      { letter: 'C' },
      { letter: 'D' },
      { letter: 'E' },
      { letter: 'F' }
    ],
    getAnswer: (code) => (code?.toUpperCase() === 'H21002' ? 'F' : 'D'),
    explanation: 'Câu ví dụ tương ứng với tranh D trong đề bài. Đáp án câu mẫu là D.'
  },

  // 6. Đọc Part 2 (Q41 - Q45): Điền từ A - F vào chỗ trống
  41: {
    id: 'reading-part-2',
    partTitle: 'Phần 2: Đọc Hiểu (阅读) — Điền từ vào chỗ trống',
    instruction: 'Chọn từ thích hợp trong bảng điền vào chỗ trống (A – F):',
    section: 'reading',
    forStartQuestion: 41,
    text: '这里的衣服太（ E ）了，我们去别的地方看看吧。',
    pinyin: 'Zhèlǐ de yīfu tài ( E ) le, wǒmen qù bié de dìfang kànkan ba.',
    viet: 'Quần áo ở đây đắt (贵) quá, chúng ta đi nơi khác xem nhé.',
    options: [
      { letter: 'A', text: '完', pinyin: 'wán' },
      { letter: 'B', text: '进', pinyin: 'jìn' },
      { letter: 'C', text: '过', pinyin: 'guo' },
      { letter: 'D', text: '千', pinyin: 'qiān' },
      { letter: 'E', text: '贵', pinyin: 'guì' },
      { letter: 'F', text: '自行车', pinyin: 'zìxíngchē' }
    ],
    getAnswer: (code) => (code?.toUpperCase() === 'H21002' ? 'F' : 'E'),
    explanation: 'Từ 贵 (guì: đắt) điền vào cấu trúc 太...了 tạo thành 太贵了 (đắt quá). Đáp án câu mẫu là E.'
  },

  // 7. Đọc Part 3 (Q46 - Q50): Đọc đoạn văn phán đoán Đúng / Sai
  46: {
    id: 'reading-part-3',
    partTitle: 'Phần 2: Đọc Hiểu (阅读) — Đoạn văn Đúng / Sai',
    instruction: 'Đọc đoạn văn ngắn và phán đoán nhận định Đúng hay Sai:',
    section: 'reading',
    forStartQuestion: 46,
    text: '现在是十点五分，他们已经打了二十分钟了。',
    pinyin: 'Xiànzài shì shí diǎn wǔ fēn, tāmen yǐjīng dǎle èrshí fēnzhōng le.',
    viet: 'Bây giờ là 10 giờ 5 phút, họ đã chơi bóng được 20 phút rồi.',
    statementHanzi: '★ 他们十点开始打篮球。',
    statementPinyin: '★ Tāmen shí diǎn kāishǐ dǎ lánqiú.',
    statementViet: '★ Nhận định: Họ bắt đầu chơi bóng rổ lúc 10 giờ.',
    options: [
      { letter: '√', text: 'Đúng' },
      { letter: '×', text: 'Sai' }
    ],
    getAnswer: () => '×',
    explanation: '10h05 trừ đi 20 phút là bắt đầu lúc 9h45, nhận định bắt đầu lúc 10h là Sai.'
  },

  // 8. Đọc Part 4 (Q51 - Q55): Ghép câu đối thoại A - F
  51: {
    id: 'reading-part-4',
    partTitle: 'Phần 2: Đọc Hiểu (阅读) — Ghép câu đối thoại',
    instruction: 'Chọn câu tương ứng trong bảng (A – F) để ghép thành đoạn hội thoại hợp lý:',
    section: 'reading',
    forStartQuestion: 51,
    dialogue: [
      {
        speaker: 'Vế 1',
        hanzi: '他在哪儿呢？你看见他了吗？',
        pinyin: 'Tā zài nǎr ne? Nǐ kànjiàn tā le ma?',
        viet: 'Anh ấy ở đâu thế? Bạn có nhìn thấy anh ấy không?'
      },
      {
        speaker: 'Vế 2 (E)',
        hanzi: '…… 他还在教室里学习呢。',
        pinyin: '…… Tā hái zài jiàoshì lǐ xuéxí ne.',
        viet: '…… Anh ấy vẫn đang học bài trong phòng học.'
      }
    ],
    options: [
      { letter: 'A' },
      { letter: 'B' },
      { letter: 'C' },
      { letter: 'D' },
      { letter: 'E' },
      { letter: 'F' }
    ],
    getAnswer: (code) => (code?.toUpperCase() === 'H21002' ? 'F' : 'E'),
    explanation: 'Câu hỏi vị trí đi với lời đáp về vị trí trong phòng học (E). Đáp án câu mẫu là E.'
  }
};

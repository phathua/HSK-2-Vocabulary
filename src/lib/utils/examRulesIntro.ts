export interface SubtitleWord {
  word: string;
  pinyin?: string;
  start: number;
  end: number;
}

export interface SubtitleItem {
  id: number;
  startTime: number;
  endTime: number;
  text: string;
  pinyin?: string;
  viet?: string;
  words?: SubtitleWord[];
  isIntro?: boolean;
}

export const EXAM_INTRO_RULES_SUBTITLES: SubtitleItem[] = [
  {
    id: 1001,
    startTime: 0,
    endTime: 25.0,
    text: "大家好！欢迎参加 HSK（二级）考试。",
    pinyin: "Dàjiā hǎo! Huānyíng cānjiā HSK (èr jí) kǎoshì.",
    viet: "Chào mọi người! Chào mừng tham gia kỳ thi HSK (Cấp 2).",
    isIntro: true,
    words: [
      { word: "大家好", pinyin: "dàjiā hǎo", start: 8.0, end: 11.5 },
      { word: "！", pinyin: "", start: 11.5, end: 12.0 },
      { word: "欢迎", pinyin: "huānyíng", start: 12.0, end: 14.0 },
      { word: "参加", pinyin: "cānjiā", start: 14.0, end: 16.0 },
      { word: "HSK", pinyin: "H-S-K", start: 16.0, end: 18.0 },
      { word: "二级", pinyin: "èr jí", start: 18.0, end: 20.0 },
      { word: "考试", pinyin: "kǎoshì", start: 20.0, end: 23.5 },
      { word: "。", pinyin: "", start: 23.5, end: 25.0 }
    ]
  },
  {
    id: 1002,
    startTime: 25.0,
    endTime: 45.0,
    text: "HSK（二级）听力考试分四部分，共35题。",
    pinyin: "HSK (èr jí) tīnglì kǎoshì fēn sì bùfen, gòng 35 tí.",
    viet: "Phần thi nghe HSK 2 gồm 4 phần, tổng cộng 35 câu hỏi.",
    isIntro: true,
    words: [
      { word: "HSK", pinyin: "H-S-K", start: 25.5, end: 27.5 },
      { word: "二级", pinyin: "èr jí", start: 27.5, end: 29.5 },
      { word: "听力", pinyin: "tīnglì", start: 29.5, end: 31.5 },
      { word: "考试", pinyin: "kǎoshì", start: 31.5, end: 33.5 },
      { word: "分", pinyin: "fēn", start: 33.5, end: 35.0 },
      { word: "四部分", pinyin: "sì bùfen", start: 35.0, end: 38.0 },
      { word: "，", pinyin: "", start: 38.0, end: 38.5 },
      { word: "共", pinyin: "gòng", start: 38.5, end: 40.5 },
      { word: "35题", pinyin: "sānshíwǔ tí", start: 40.5, end: 44.0 },
      { word: "。", pinyin: "", start: 44.0, end: 45.0 }
    ]
  },
  {
    id: 1003,
    startTime: 45.0,
    endTime: 65.0,
    text: "第一部分，一共10个题，每题听两次。",
    pinyin: "Dì-yī bùfen, yígòng 10 gè tí, měi tí tīng liǎng cì.",
    viet: "Phần 1, gồm 10 câu hỏi, mỗi câu được nghe 2 lần.",
    isIntro: true,
    words: [
      { word: "第一部分", pinyin: "dì-yī bùfen", start: 45.5, end: 49.0 },
      { word: "，", pinyin: "", start: 49.0, end: 49.5 },
      { word: "一共", pinyin: "yígòng", start: 49.5, end: 52.0 },
      { word: "10个题", pinyin: "shí gè tí", start: 52.0, end: 56.0 },
      { word: "，", pinyin: "", start: 56.0, end: 56.5 },
      { word: "每题", pinyin: "měi tí", start: 56.5, end: 59.5 },
      { word: "听", pinyin: "tīng", start: 59.5, end: 61.5 },
      { word: "两次", pinyin: "liǎng cì", start: 61.5, end: 64.5 },
      { word: "。", pinyin: "", start: 64.5, end: 65.0 }
    ]
  },
  {
    id: 1004,
    startTime: 65.0,
    endTime: 82.0,
    text: "例如：我们家有三个人。",
    pinyin: "Lìrú: Wǒmen jiā yǒu sān gè rén.",
    viet: "Ví dụ: Nhà chúng tôi có 3 người. (Tranh 3 người -> Đúng √)",
    isIntro: true,
    words: [
      { word: "例如", pinyin: "lìrú", start: 65.5, end: 68.5 },
      { word: "：", pinyin: "", start: 68.5, end: 69.0 },
      { word: "我们", pinyin: "wǒmen", start: 69.0, end: 72.0 },
      { word: "家", pinyin: "jiā", start: 72.0, end: 74.0 },
      { word: "有", pinyin: "yǒu", start: 74.0, end: 75.5 },
      { word: "三个", pinyin: "sān gè", start: 75.5, end: 78.5 },
      { word: "人", pinyin: "rén", start: 78.5, end: 81.0 },
      { word: "。", pinyin: "", start: 81.0, end: 82.0 }
    ]
  },
  {
    id: 1005,
    startTime: 82.0,
    endTime: 100.0,
    text: "我每天坐公共汽车去上班。",
    pinyin: "Wǒ měi tiān zuò gōnggòng qìchē qù shàngbān.",
    viet: "Tôi đi xe buýt đi làm mỗi ngày. (Tranh khác -> Sai ×)",
    isIntro: true,
    words: [
      { word: "我", pinyin: "wǒ", start: 83.0, end: 84.5 },
      { word: "每天", pinyin: "měitiān", start: 84.5, end: 87.5 },
      { word: "坐", pinyin: "zuò", start: 87.5, end: 89.5 },
      { word: "公共汽车", pinyin: "gōnggòng qìchē", start: 89.5, end: 94.0 },
      { word: "去", pinyin: "qù", start: 94.0, end: 95.5 },
      { word: "上班", pinyin: "shàngbān", start: 95.5, end: 99.0 },
      { word: "。", pinyin: "", start: 99.0, end: 100.0 }
    ]
  },
  {
    id: 1006,
    startTime: 100.0,
    endTime: 115.0,
    text: "现在开始第1题。",
    pinyin: "Xiànzài kāishǐ dì 1 tí.",
    viet: "Bây giờ bắt đầu câu hỏi số 1.",
    isIntro: true,
    words: [
      { word: "现在", pinyin: "xiànzài", start: 101.0, end: 104.0 },
      { word: "开始", pinyin: "kāishǐ", start: 104.0, end: 107.0 },
      { word: "第1题", pinyin: "dì yī tí", start: 107.0, end: 112.5 },
      { word: "。", pinyin: "", start: 112.5, end: 115.0 }
    ]
  }
];

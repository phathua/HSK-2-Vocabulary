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
    id: 1000,
    startTime: 0,
    endTime: 30.5,
    text: "🎵 Nhạc dạo đầu bài thi HSK 2...",
    pinyin: "",
    isIntro: true,
    words: []
  },
  {
    id: 1001,
    startTime: 31.0,
    endTime: 47.5,
    text: "大家好！欢迎参加 HSK（二级）考试。",
    pinyin: "Dàjiā hǎo! Huānyíng cānjiā HSK (èr jí) kǎoshì.",
    isIntro: true,
    words: [
      { word: "大家好", pinyin: "dàjiā hǎo", start: 31.4, end: 34.0 },
      { word: "！", pinyin: "", start: 34.0, end: 34.5 },
      { word: "欢迎", pinyin: "huānyíng", start: 34.5, end: 36.5 },
      { word: "参加", pinyin: "cānjiā", start: 36.5, end: 38.5 },
      { word: "HSK", pinyin: "H-S-K", start: 38.5, end: 40.5 },
      { word: "二级", pinyin: "èr jí", start: 40.5, end: 42.5 },
      { word: "考试", pinyin: "kǎoshì", start: 42.5, end: 46.5 },
      { word: "。", pinyin: "", start: 46.5, end: 47.5 }
    ]
  },
  {
    id: 1002,
    startTime: 48.0,
    endTime: 55.5,
    text: "HSK（二级）听力考试分四部分，共35题。",
    pinyin: "HSK (èr jí) tīnglì kǎoshì fēn sì bùfen, gòng 35 tí.",
    isIntro: true,
    words: [
      { word: "HSK", pinyin: "H-S-K", start: 48.4, end: 49.5 },
      { word: "二级", pinyin: "èr jí", start: 49.5, end: 50.8 },
      { word: "听力", pinyin: "tīnglì", start: 50.8, end: 52.0 },
      { word: "考试", pinyin: "kǎoshì", start: 52.0, end: 53.0 },
      { word: "分", pinyin: "fēn", start: 53.0, end: 53.5 },
      { word: "四部分", pinyin: "sì bùfen", start: 53.5, end: 54.5 },
      { word: "，", pinyin: "", start: 54.5, end: 54.8 },
      { word: "共", pinyin: "gòng", start: 54.8, end: 55.0 },
      { word: "35题", pinyin: "sānshíwǔ tí", start: 55.0, end: 55.5 },
      { word: "。", pinyin: "", start: 55.5, end: 55.8 }
    ]
  },
  {
    id: 1003,
    startTime: 56.0,
    endTime: 70.0,
    text: "第一部分，一共10个题，每题听两次。",
    pinyin: "Dì-yī bùfen, yígòng 10 gè tí, měi tí tīng liǎng cì.",
    isIntro: true,
    words: [
      { word: "第一部分", pinyin: "dì-yī bùfen", start: 62.5, end: 65.0 },
      { word: "，", pinyin: "", start: 65.0, end: 65.5 },
      { word: "一共", pinyin: "yígòng", start: 65.5, end: 67.0 },
      { word: "10个题", pinyin: "shí gè tí", start: 67.0, end: 68.5 },
      { word: "，", pinyin: "", start: 68.5, end: 68.8 },
      { word: "每题", pinyin: "měi tí", start: 68.8, end: 69.5 },
      { word: "听", pinyin: "tīng", start: 69.5, end: 70.0 },
      { word: "两次", pinyin: "liǎng cì", start: 70.0, end: 70.5 },
      { word: "。", pinyin: "", start: 70.5, end: 71.0 }
    ]
  },
  {
    id: 1004,
    startTime: 70.0,
    endTime: 80.0,
    text: "例如：我们家有三个人。",
    pinyin: "Lìrú: Wǒmen jiā yǒu sān gè rén.",
    isIntro: true,
    words: [
      { word: "例如", pinyin: "lìrú", start: 70.5, end: 72.0 },
      { word: "：", pinyin: "", start: 72.0, end: 72.5 },
      { word: "我们", pinyin: "wǒmen", start: 72.5, end: 74.0 },
      { word: "家", pinyin: "jiā", start: 74.0, end: 75.0 },
      { word: "有", pinyin: "yǒu", start: 75.0, end: 76.0 },
      { word: "三个", pinyin: "sān gè", start: 76.0, end: 77.5 },
      { word: "人", pinyin: "rén", start: 77.5, end: 79.5 },
      { word: "。", pinyin: "", start: 79.5, end: 80.0 }
    ]
  },
  {
    id: 1005,
    startTime: 80.0,
    endTime: 103.0,
    text: "我每天坐公共汽车去上班。",
    pinyin: "Wǒ měi tiān zuò gōnggòng qìchē qù shàngbān.",
    isIntro: true,
    words: [
      { word: "我", pinyin: "wǒ", start: 80.5, end: 81.5 },
      { word: "每天", pinyin: "měitiān", start: 81.5, end: 83.5 },
      { word: "坐", pinyin: "zuò", start: 83.5, end: 85.0 },
      { word: "公共汽车", pinyin: "gōnggòng qìchē", start: 85.0, end: 88.5 },
      { word: "去", pinyin: "qù", start: 88.5, end: 89.5 },
      { word: "上班", pinyin: "shàngbān", start: 89.5, end: 92.5 },
      { word: "。", pinyin: "", start: 92.5, end: 93.0 }
    ]
  },
  {
    id: 1006,
    startTime: 103.0,
    endTime: 111.0,
    text: "现在开始第1题。",
    pinyin: "Xiànzài kāishǐ dì 1 tí.",
    isIntro: true,
    words: [
      { word: "现在", pinyin: "xiànzài", start: 103.8, end: 105.5 },
      { word: "开始", pinyin: "kāishǐ", start: 105.5, end: 107.5 },
      { word: "第1题", pinyin: "dì yī tí", start: 107.5, end: 110.5 },
      { word: "。", pinyin: "", start: 110.5, end: 111.0 }
    ]
  }
];

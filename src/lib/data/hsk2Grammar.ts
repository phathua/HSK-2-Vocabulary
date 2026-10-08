export interface LegoComponent {
  label: string;
  pinyin: string;
  role: 'subject' | 'keyword' | 'verb' | 'object' | 'particle' | 'modifier';
  customColor?: string;
}

export interface ExampleSentenceItem {
  hanzi: string;
  pinyin: string;
  meaning: string;
  examRef?: string;
  highlightKeyword?: string;
}

export interface CommonMistake {
  wrong: string;
  wrongPinyin: string;
  correct: string;
  correctPinyin: string;
  explanation: string;
}

export interface QuickQuiz {
  question: string;
  pinyin: string;
  options: {
    text: string;
    pinyin: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface GrammarPoint {
  id: number;
  level: 'easy' | 'medium' | 'hard';
  levelLabel: string;
  origin: 'inherited' | 'new' | 'advanced';
  originLabel: string;
  title: string;
  grammarKey: string;
  grammarKeyPinyin: string;
  textbookRef: {
    hsk1?: string;
    hsk2: string;
  };
  legoFormula: LegoComponent[];
  formulaSummary: string;
  keyTip: string;
  mistake: CommonMistake;
  examples: ExampleSentenceItem[];
  quickQuiz: QuickQuiz;
}

export const HSK2_GRAMMAR_POINTS: GrammarPoint[] = [
  // ==================== CẤP ĐỘ 1: DỄ ====================
  {
    id: 1,
    level: 'easy',
    levelLabel: 'Cấp độ 1: Dễ',
    origin: 'inherited',
    originLabel: 'Kế thừa HSK 1',
    title: 'Cấu trúc phán đoán & Hiện hữu với 是 / 有',
    grammarKey: '是 / 有',
    grammarKeyPinyin: 'shì / yǒu',
    textbookRef: {
      hsk1: 'Bài 2 (Trang 28), Bài 9 (Trang 78), Bài 10 (Trang 84)',
      hsk2: 'Bài 1 (Trang 18), Bài 6 (Trang 56)'
    },
    legoFormula: [
      { label: 'Từ chỉ vị trí', pinyin: 'cí zhǐ wèi zhì', role: 'subject' },
      { label: '有 / 是', pinyin: 'yǒu / shì', role: 'keyword' },
      { label: 'Danh từ', pinyin: 'míng cí', role: 'object' }
    ],
    formulaSummary: 'Từ chỉ vị trí + 有 / 是 + Danh từ',
    keyTip: 'Dùng 有 khi muốn nói nơi nào "có" sự vật tồn tại khách quan. Dùng 是 khi muốn xác định chính xác danh tính sự vật ở vị trí đó.',
    mistake: {
      wrong: '桌子上在这一个手机。',
      wrongPinyin: 'zhuō zi shàng zài zhè yí ge shǒu jī.',
      correct: '桌子上有一个手机。',
      correctPinyin: 'zhuō zi shàng yǒu yí ge shǒu jī.',
      explanation: 'Khi biểu thị nơi chốn đang có sự vật tồn tại, dùng "有" (yǒu) hoặc "是" (shì), không lặp từ chỉ vị trí "在" sau danh từ vị trí.'
    },
    examples: [
      {
        hanzi: '桌子上有一个手机。',
        pinyin: 'Zhuōzi shàng yǒu yí ge shǒujī.',
        meaning: 'Trên bàn có một chiếc điện thoại.',
        examRef: 'H20901',
        highlightKeyword: '有'
      },
      {
        hanzi: '门外是他的自行车。',
        pinyin: 'Mén wài shì tā de zìxíngchē.',
        meaning: 'Ngoài cửa là xe đạp của anh ấy.',
        examRef: 'H21002',
        highlightKeyword: '是'
      }
    ],
    quickQuiz: {
      question: '椅 (yǐ) 子 (zi) 下 (xià) 面 (mian) ___ 一 (yì) 只 (zhī) 猫 (māo)。',
      pinyin: 'Yǐzi xiàmiàn ___ yì zhī māo.',
      options: [
        { text: '有', pinyin: 'yǒu', isCorrect: true },
        { text: '是', pinyin: 'shì', isCorrect: false },
        { text: '在', pinyin: 'zài', isCorrect: false }
      ],
      explanation: 'Dưới gầm ghế "có" một con mèo tồn tại khách quan, dùng 有 (yǒu).'
    }
  },
  {
    id: 2,
    level: 'easy',
    levelLabel: 'Cấp độ 1: Dễ',
    origin: 'inherited',
    originLabel: 'Kế thừa HSK 1',
    title: 'Trợ từ động thái & Biến đổi trạng thái 了',
    grammarKey: '了',
    grammarKeyPinyin: 'le',
    textbookRef: {
      hsk1: 'Bài 14 (Trang 118 - 了 cuối câu)',
      hsk2: 'Bài 1 (Trang 18), Bài 3 (Trang 36), Bài 8 (Trang 86 - 了 sau động từ)'
    },
    legoFormula: [
      { label: 'Chủ ngữ', pinyin: 'zhǔ yǔ', role: 'subject' },
      { label: 'Động từ', pinyin: 'dòng cí', role: 'verb' },
      { label: '了', pinyin: 'le', role: 'keyword' },
      { label: 'Số lượng + Danh từ', pinyin: 'shù liàng + míng cí', role: 'object' }
    ],
    formulaSummary: 'Chủ ngữ + Động từ + 了 + Số lượng + Tân ngữ (Hoặc Mệnh đề + 了)',
    keyTip: '了 đặt sau động từ nhấn mạnh hành động đã hoàn tất; 了 ở cuối câu biểu thị tình huống có sự thay đổi mới (trước đây chưa có, nay đã có).',
    mistake: {
      wrong: '我昨天没买了那个手机。',
      wrongPinyin: 'wǒ zuó tiān méi mǎi le nà ge shǒu jī.',
      correct: '我昨天没买那个手机。',
      correctPinyin: 'wǒ zuó tiān méi mǎi nà ge shǒu jī.',
      explanation: 'Trong câu phủ định quá khứ với "没" (méi), tuyệt đối KHÔNG dùng "了" (le) sau động từ.'
    },
    examples: [
      {
        hanzi: '我买了一个新电视。',
        pinyin: 'Wǒ mǎi le yí ge xīn diànshì.',
        meaning: 'Tôi đã mua một chiếc tivi mới.',
        examRef: 'H20902',
        highlightKeyword: '了'
      },
      {
        hanzi: '上午我买了一些鸡蛋。',
        pinyin: 'Shàngwǔ wǒ mǎi le yìxiē jīdàn.',
        meaning: 'Sáng nay tôi đã mua một ít trứng.',
        examRef: 'H21329',
        highlightKeyword: '了'
      }
    ],
    quickQuiz: {
      question: '我 (wǒ) 没 (méi) ___ 去 (qù) 看 (kàn) 电 (diàn) 影 (yǐng)。',
      pinyin: 'Wǒ méi ___ qù kàn diànyǐng.',
      options: [
        { text: '（Không điền gì）', pinyin: 'kōng', isCorrect: true },
        { text: '了', pinyin: 'le', isCorrect: false },
        { text: '过', pinyin: 'guo', isCorrect: false }
      ],
      explanation: 'Câu phủ định "没" diễn tả hành động chưa xảy ra nên không dùng "了".'
    }
  },
  {
    id: 3,
    level: 'easy',
    levelLabel: 'Cấp độ 1: Dễ',
    origin: 'inherited',
    originLabel: 'Kế thừa HSK 1',
    title: 'Trợ từ kết cấu 的 & Cụm danh từ lược bỏ',
    grammarKey: '的',
    grammarKeyPinyin: 'de',
    textbookRef: {
      hsk1: 'Bài 3 (Trang 36 - biểu thị sở hữu)',
      hsk2: 'Bài 3 (Trang 36 - cụm 的 thay thế danh từ), Bài 10 (Trang 98)'
    },
    legoFormula: [
      { label: 'Định ngữ (Tính từ / Đại từ)', pinyin: 'dìng yǔ', role: 'modifier' },
      { label: '的', pinyin: 'de', role: 'keyword' },
      { label: '[Trung tâm ngữ lược bỏ]', pinyin: 'zhōng xīn yǔ', role: 'object' }
    ],
    formulaSummary: 'Định ngữ + 的 + [Danh từ có thể lược bỏ nếu ngữ cảnh rõ ràng]',
    keyTip: 'Khi danh từ trung tâm đã được nhắc đến ở câu trước hoặc ngữ cảnh hiển nhiên, ta có thể bỏ danh từ đi để câu nói ngắn gọn tự nhiên.',
    mistake: {
      wrong: '这本书是我的书本。',
      wrongPinyin: 'zhè běn shū shì wǒ de shū běn.',
      correct: '这本书是我的。',
      correctPinyin: 'zhè běn shū shì wǒ de.',
      explanation: 'Khi chủ ngữ đã là "这本书", vị ngữ rút gọn thành "我的" (wǒ de) để tránh lặp từ thô cứng.'
    },
    examples: [
      {
        hanzi: '左边那个红色的是我的。',
        pinyin: 'Zuǒbian nà ge hóngsè de shì wǒ de.',
        meaning: 'Cái màu đỏ bên trái là của tôi.',
        examRef: 'H21003',
        highlightKeyword: '的'
      },
      {
        hanzi: '这是送牛奶的。',
        pinyin: 'Zhè shì sòng niúnǎi de.',
        meaning: 'Đây là người giao sữa.',
        examRef: 'H21330',
        highlightKeyword: '的'
      }
    ],
    quickQuiz: {
      question: '这 (zhè) 件 (jiàn) 衣 (yī) 服 (fu) 是 (shì) 谁 (shuí) ___ ？',
      pinyin: 'Zhè jiàn yīfu shì shuí ___ ?',
      options: [
        { text: '的', pinyin: 'de', isCorrect: true },
        { text: '得', pinyin: 'de', isCorrect: false },
        { text: '地', pinyin: 'de', isCorrect: false }
      ],
      explanation: 'Hỏi sở hữu "áo của ai" dùng trợ từ kết cấu 的 (de).'
    }
  },
  {
    id: 4,
    level: 'easy',
    levelLabel: 'Cấp độ 1: Dễ',
    origin: 'inherited',
    originLabel: 'Kế thừa HSK 1',
    title: 'Hỏi số lượng / Mức độ với 多 (duō)',
    grammarKey: '多 + Tính từ',
    grammarKeyPinyin: 'duō + xíng róng cí',
    textbookRef: {
      hsk1: 'Bài 5 (Trang 44 - hỏi tuổi 多大)',
      hsk2: 'Bài 1 (Trang 18 - số ước chừng), Bài 2 (Trang 26 - hỏi chiều cao/thời gian)'
    },
    legoFormula: [
      { label: 'Chủ ngữ', pinyin: 'zhǔ yǔ', role: 'subject' },
      { label: '多', pinyin: 'duō', role: 'keyword' },
      { label: 'Tính từ (大 / 高 / 长)', pinyin: 'xíng róng cí', role: 'verb' }
    ],
    formulaSummary: 'Chủ ngữ + 多 + Tính từ (多大 / 多高 / 多长 / 多远)?',
    keyTip: '多 kết hợp với tính từ để hỏi mức độ đo lường: 多大 (tuổi tác/độ lớn), 多高 (chiều cao), 多长 (độ dài/thời gian), 多远 (khoảng cách).',
    mistake: {
      wrong: '你学汉语几个时间了？',
      wrongPinyin: 'nǐ xué hàn yǔ jǐ ge shí jiān le?',
      correct: '你学汉语多长时间了？',
      correctPinyin: 'nǐ xué hàn yǔ duō cháng shí jiān le?',
      explanation: 'Hỏi khoảng thời gian kéo dài bao lâu, bắt buộc dùng "多长时间" (duō cháng shíjiān).'
    },
    examples: [
      {
        hanzi: '你学汉语多长时间了？',
        pinyin: 'Nǐ xué Hànyǔ duō cháng shíjiān le?',
        meaning: 'Bạn học tiếng Trung bao lâu rồi?',
        examRef: 'H21004',
        highlightKeyword: '多长'
      },
      {
        hanzi: '你有得多高？',
        pinyin: 'Nǐ yǒu duō gāo?',
        meaning: 'Bạn cao bao nhiêu?',
        examRef: 'H21331',
        highlightKeyword: '多高'
      }
    ],
    quickQuiz: {
      question: '请 (qǐng) 问 (wèn)， 你 (nǐ) 儿 (ér) 子 (zi) 今 (jīn) 年 (nián) ___ 了 (le)？',
      pinyin: 'Qǐng wèn, nǐ érzi jīnnián ___ le?',
      options: [
        { text: '多大', pinyin: 'duō dà', isCorrect: true },
        { text: '多长', pinyin: 'duō cháng', isCorrect: false },
        { text: '多高', pinyin: 'duō gāo', isCorrect: false }
      ],
      explanation: 'Hỏi độ tuổi của một người dùng 多大 (duō dà).'
    }
  },
  {
    id: 5,
    level: 'easy',
    levelLabel: 'Cấp độ 1: Dễ',
    origin: 'inherited',
    originLabel: 'Kế thừa HSK 1',
    title: 'Diễn tả hành động đang diễn ra 正在 / 在... 呢',
    grammarKey: '正在 / 在... 呢',
    grammarKeyPinyin: 'zhèng zài / zài... ne',
    textbookRef: {
      hsk1: 'Bài 13 (Trang 112)',
      hsk2: 'Bài 10 (Trang 90)'
    },
    legoFormula: [
      { label: 'Chủ ngữ', pinyin: 'zhǔ yǔ', role: 'subject' },
      { label: '正在 / 在', pinyin: 'zhèng zài / zài', role: 'keyword' },
      { label: 'Động từ', pinyin: 'dòng cí', role: 'verb' },
      { label: '呢', pinyin: 'ne', role: 'particle' }
    ],
    formulaSummary: 'Chủ ngữ + 正在 / 在 + Động từ + (Tân ngữ) + 呢',
    keyTip: 'Có thể dùng độc lập "在 + V", "正在 + V" hoặc thêm trợ từ ngữ khí "呢" ở cuối câu để tăng sắc thái tự nhiên.',
    mistake: {
      wrong: '他没在打电话呢。',
      wrongPinyin: 'tā méi zài dǎ diàn huà ne.',
      correct: '他没在打电话。',
      correctPinyin: 'tā méi zài dǎ diàn huà.',
      explanation: 'Trong thể phủ định "没在", không kết hợp trợ từ "呢" ở cuối câu.'
    },
    examples: [
      {
        hanzi: '他正在打电话呢。',
        pinyin: 'Tā zhèngzài dǎ diànhuà ne.',
        meaning: 'Anh ấy đang gọi điện thoại.',
        examRef: 'H20000',
        highlightKeyword: '正在...呢'
      },
      {
        hanzi: '我看书呢。',
        pinyin: 'Wǒ kàn shū ne.',
        meaning: 'Tôi đang đọc sách đấy.',
        examRef: 'H21005',
        highlightKeyword: '呢'
      }
    ],
    quickQuiz: {
      question: '外 (wài) 面 (mian) ___ 下 (xià) 雨 (yǔ) 呢 (ne)。',
      pinyin: 'Wàimiàn ___ xià yǔ ne.',
      options: [
        { text: '正在', pinyin: 'zhèng zài', isCorrect: true },
        { text: '已经', pinyin: 'yǐ jīng', isCorrect: false },
        { text: '就要', pinyin: 'jiù yào', isCorrect: false }
      ],
      explanation: 'Cấu trúc đang diễn ra đi cùng 呢 cuối câu là 正在...呢.'
    }
  },

  // ==================== CẤP ĐỘ 2: TRUNG BÌNH ====================
  {
    id: 6,
    level: 'medium',
    levelLabel: 'Cấp độ 2: Trung bình',
    origin: 'inherited',
    originLabel: 'Trọng tâm HSK 2',
    title: 'Cấu trúc nhấn mạnh 是……的 (shì...de)',
    grammarKey: '是……的',
    grammarKeyPinyin: 'shì...de',
    textbookRef: {
      hsk1: 'Bài 15 (Trang 126 - khẳng định đơn giản)',
      hsk2: 'Bài 3 (Trang 36 - mở rộng thể phủ định 不是...的)'
    },
    legoFormula: [
      { label: 'Chủ ngữ', pinyin: 'zhǔ yǔ', role: 'subject' },
      { label: '是', pinyin: 'shì', role: 'keyword' },
      { label: 'Thời gian / Địa điểm / Cách thức', pinyin: 'shí jiān / dì diǎn / fāng shì', role: 'modifier' },
      { label: 'Động từ', pinyin: 'dòng cí', role: 'verb' },
      { label: '的', pinyin: 'de', role: 'keyword' }
    ],
    formulaSummary: 'Chủ ngữ + (是) + [Thời gian / Nơi chốn / Cách thức / Mục đích] + Động từ + 的',
    keyTip: 'Dùng khi hành động ĐÃ XẢY RA, và người nói muốn nhấn mạnh vào chi tiết thời gian, cách thức di chuyển hoặc ai thực hiện.',
    mistake: {
      wrong: '我们是明天坐飞机的。',
      wrongPinyin: 'wǒ men shì míng tiān zuò fēi jī de.',
      correct: '我们明天坐飞机。',
      correctPinyin: 'wǒ men míng tiān zuò fēi jī.',
      explanation: 'Cấu trúc 是...的 CHỈ dùng cho hành động ĐÃ XẢY RA trong quá khứ, không dùng cho sự việc tương lai (明天).'
    },
    examples: [
      {
        hanzi: '这是他给妻子买的。',
        pinyin: 'Zhè shì tā gěi qīzi mǎi de.',
        meaning: 'Cái này là anh ấy mua cho vợ.',
        examRef: 'H20901',
        highlightKeyword: '是...的'
      },
      {
        hanzi: '我们是坐飞机来的。',
        pinyin: 'Wǒmen shì zuò fēijī lái de.',
        meaning: 'Chúng tôi đến bằng máy bay.',
        examRef: 'H21006',
        highlightKeyword: '是...的'
      }
    ],
    quickQuiz: {
      question: '我 (wǒ) 们 (men) 是 (shì) 去 (qù) 年 (nián) 认 (rèn) 识 (shi) ___ 。',
      pinyin: 'Wǒmen shì qùnián rènshi ___ .',
      options: [
        { text: '的', pinyin: 'de', isCorrect: true },
        { text: '了', pinyin: 'le', isCorrect: false },
        { text: '过', pinyin: 'guo', isCorrect: false }
      ],
      explanation: 'Nhấn mạnh thời gian đã quen biết trong quá khứ (去年) dùng cấu trúc 是...的.'
    }
  },
  {
    id: 7,
    level: 'medium',
    levelLabel: 'Cấp độ 2: Trung bình',
    origin: 'new',
    originLabel: 'Mới ở HSK 2',
    title: 'Phó từ nhấn mạnh & Nhất quán 就 (jiù)',
    grammarKey: '就',
    grammarKeyPinyin: 'jiù',
    textbookRef: {
      hsk1: 'Chưa học trong cấu trúc ngữ pháp',
      hsk2: 'Bài 4 (Trang 48)'
    },
    legoFormula: [
      { label: 'Điều kiện / Thời gian', pinyin: 'tiáo jiàn / shí jiān', role: 'modifier' },
      { label: '就', pinyin: 'jiù', role: 'keyword' },
      { label: 'Động từ', pinyin: 'dòng cí', role: 'verb' }
    ],
    formulaSummary: 'Chủ ngữ + (Thời gian ngắn) + 就 + Động từ (Diễn tả sự việc nhanh chóng, sớm, dễ dàng)',
    keyTip: '就 đứng trước động từ thể hiện hành động diễn ra thuận lợi, nhanh chóng hơn kỳ vọng hoặc đưa ra kết luận ngay tức thì.',
    mistake: {
      wrong: '坐公共汽车20分钟就能到呢。',
      wrongPinyin: 'zuò gōng gòng qì chē èr shí fēn zhōng jiù néng dào ne.',
      correct: '坐公共汽车20分钟就能到。',
      correctPinyin: 'zuò gōng gòng qì chē èr shí fēn zhōng jiù néng dào.',
      explanation: 'Câu trần thuật kết quả nhanh với 就 không đặt trợ từ tiếp diễn 呢 ở cuối.'
    },
    examples: [
      {
        hanzi: '坐公共汽车20分钟就能到。',
        pinyin: 'Zuò gōnggòng qìchē èrshí fēnzhōng jiù néng dào.',
        meaning: 'Đi xe buýt 20 phút là đến ngay.',
        examRef: 'H20902',
        highlightKeyword: '就'
      },
      {
        hanzi: '我吃了早饭就去学校。',
        pinyin: 'Wǒ chī le zǎofàn jiù qù xuéxiào.',
        meaning: 'Tôi ăn sáng xong là đi học liền.',
        examRef: 'H21332',
        highlightKeyword: '就'
      }
    ],
    quickQuiz: {
      question: '他 (tā) 看 (kàn) 完 (wán) 书 (shū) ___ 睡 (shuì) 觉 (jiào) 了 (le)。',
      pinyin: 'Tā kàn wán shū ___ shuìjiào le.',
      options: [
        { text: '就', pinyin: 'jiù', isCorrect: true },
        { text: '才', pinyin: 'cái', isCorrect: false },
        { text: '还', pinyin: 'hái', isCorrect: false }
      ],
      explanation: 'Xem sách xong là ngủ ngay lập tức dùng phó từ 就 (jiù).'
    }
  },
  {
    id: 8,
    level: 'medium',
    levelLabel: 'Cấp độ 2: Trung bình',
    origin: 'new',
    originLabel: 'Mới ở HSK 2',
    title: 'Phó từ lặp lại trong tương lai 再 (zài)',
    grammarKey: '再',
    grammarKeyPinyin: 'zài',
    textbookRef: {
      hsk1: 'Chỉ học từ cố định 再见 (zàijiàn)',
      hsk2: 'Bài 7 (Trang 78)'
    },
    legoFormula: [
      { label: 'Chủ ngữ', pinyin: 'zhǔ yǔ', role: 'subject' },
      { label: '再', pinyin: 'zài', role: 'keyword' },
      { label: 'Động từ', pinyin: 'dòng cí', role: 'verb' }
    ],
    formulaSummary: 'Chủ ngữ + 再 + Động từ (Hành động sẽ lặp lại trong tương lai)',
    keyTip: 'Phân biệt 再 (zài) và 又 (yòu): 再 diễn tả hành động lặp lại CHƯA XẢY RA (tương lai); 又 diễn tả hành động ĐÃ LẶP LẠI (quá khứ).',
    mistake: {
      wrong: '昨天他又来，明天他又来。',
      wrongPinyin: 'zuó tiān tā yòu lái, míng tiān tā yòu lái.',
      correct: '昨天他又来，明天他再来。',
      correctPinyin: 'zuó tiān tā yòu lái, míng tiān tā zài lái.',
      explanation: 'Hành động lặp lại trong tương lai (ngày mai 明天) bắt buộc dùng 再 (zài), không dùng 又.'
    },
    examples: [
      {
        hanzi: '欢迎您下次再来。',
        pinyin: 'Huānyíng nín xià cì zài lái.',
        meaning: 'Hoan nghênh quý khách lần sau lại ghé.',
        examRef: 'H21002',
        highlightKeyword: '再'
      },
      {
        hanzi: '你再喝一杯咖啡吧。',
        pinyin: 'Nǐ zài hē yì bēi kāfēi ba.',
        meaning: 'Bạn uống thêm một tách cà phê nữa nhé.',
        examRef: 'H21333',
        highlightKeyword: '再'
      }
    ],
    quickQuiz: {
      question: '请 (qǐng) 你 (nǐ) ___ 说 (shuō) 一 (yí) 次 (cì)。',
      pinyin: 'Qǐng nǐ ___ shuō yí cì.',
      options: [
        { text: '再', pinyin: 'zài', isCorrect: true },
        { text: '在', pinyin: 'zài', isCorrect: false },
        { text: '还', pinyin: 'hái', isCorrect: false }
      ],
      explanation: 'Yêu cầu lặp lại lời nói thêm một lần nữa dùng phó từ 再 (zài).'
    }
  },
  {
    id: 9,
    level: 'medium',
    levelLabel: 'Cấp độ 2: Trung bình',
    origin: 'new',
    originLabel: 'Mới ở HSK 2',
    title: 'Trạng thái sắp xảy ra 快要 / 就要 / 快... 了',
    grammarKey: '快要 / 就要... 了',
    grammarKeyPinyin: 'kuài yào / jiù yào... le',
    textbookRef: {
      hsk1: 'Chưa học cấu trúc này',
      hsk2: 'Bài 12 (Trang 118)'
    },
    legoFormula: [
      { label: 'Chủ ngữ', pinyin: 'zhǔ yǔ', role: 'subject' },
      { label: '快要 / 就要 / 要', pinyin: 'kuài yào / jiù yào / yào', role: 'keyword' },
      { label: 'Động từ', pinyin: 'dòng cí', role: 'verb' },
      { label: '了', pinyin: 'le', role: 'particle' }
    ],
    formulaSummary: 'Chủ ngữ + 快要 / 就要 / 快 / 要 + Động từ + 了',
    keyTip: 'Nếu câu có từ chỉ thời gian cụ thể (ví dụ: ngày mai, 8 giờ), KHÔNG ĐƯỢC dùng "快要", mà PHẢI DÙNG "就要...了".',
    mistake: {
      wrong: '明天上午八点快要下雨了。',
      wrongPinyin: 'míng tiān shàng wǔ bā diǎn kuài yào xià yǔ le.',
      correct: '明天上午八点就要下雨了。',
      correctPinyin: 'míng tiān shàng wǔ bā diǎn jiù yào xià yǔ le.',
      explanation: 'Khi có mốc thời gian rõ ràng (明天上午八点), chỉ dùng "就要...了", không dùng "快要...了".'
    },
    examples: [
      {
        hanzi: '张小姐的飞机快到了。',
        pinyin: 'Zhāng xiǎojiě de fēijī kuài dào le.',
        meaning: 'Máy bay của cô Trương sắp đến rồi.',
        examRef: 'H21003',
        highlightKeyword: '快...了'
      },
      {
        hanzi: '新的一年就要开始了。',
        pinyin: 'Xīn de yì nián jiù yào kāishǐ le.',
        meaning: 'Một năm mới sắp sửa bắt đầu rồi.',
        examRef: 'H21334',
        highlightKeyword: '就要...了'
      }
    ],
    quickQuiz: {
      question: '天 (tiān) 阴 (yīn) 了 (le)， 快 (kuài) 要 (yào) ___ 了 (le)。',
      pinyin: 'Tiān yīn le, kuài yào ___ le.',
      options: [
        { text: '下雨', pinyin: 'xià yǔ', isCorrect: true },
        { text: '下雨过', pinyin: 'xià yǔ guo', isCorrect: false },
        { text: '下了雨', pinyin: 'xià le yǔ', isCorrect: false }
      ],
      explanation: 'Cấu trúc sắp diễn ra: 快要 + Động từ nguyên thể (下雨) + 了.'
    }
  },
  {
    id: 10,
    level: 'medium',
    levelLabel: 'Cấp độ 2: Trung bình',
    origin: 'new',
    originLabel: 'Mới ở HSK 2',
    title: 'Câu cầu khiến cấm đoán 别 / 不要... 了',
    grammarKey: '别 / 不要... 了',
    grammarKeyPinyin: 'bié / bú yào... le',
    textbookRef: {
      hsk1: 'Bài 10 (Trang 84 - chỉ học 请)',
      hsk2: 'Bài 9 (Trang 90)'
    },
    legoFormula: [
      { label: '别 / 不要', pinyin: 'bié / bú yào', role: 'keyword' },
      { label: 'Động từ', pinyin: 'dòng cí', role: 'verb' },
      { label: 'Tân ngữ', pinyin: 'bīn yǔ', role: 'object' },
      { label: '了', pinyin: 'le', role: 'particle' }
    ],
    formulaSummary: '别 / 不要 + Động từ + (Tân ngữ) + 了 (Đừng... nữa)',
    keyTip: 'Từ "了" ở cuối câu mang ý nghĩa khuyên can đối phương "dừng ngay hành động đang làm", không tiếp tục nữa.',
    mistake: {
      wrong: '你别不说汉语了。',
      wrongPinyin: 'nǐ bié bù shuō hàn yǔ le.',
      correct: '你别说汉语了。',
      correctPinyin: 'nǐ bié shuō hàn yǔ le.',
      explanation: 'Không dùng hai từ phủ định "别" và "不" đi liền kề nhau gây sai nghĩa câu cầu khiến.'
    },
    examples: [
      {
        hanzi: '弟弟，你别玩电脑了。',
        pinyin: 'Dìdi, nǐ bié wán diànnǎo le.',
        meaning: 'Em trai, em đừng chơi máy tính nữa.',
        examRef: 'H20901',
        highlightKeyword: '别...了'
      },
      {
        hanzi: '你不要看了，快去睡觉吧。',
        pinyin: 'Nǐ bú yào kàn le, kuài qù shuìjiào ba.',
        meaning: 'Bạn đừng xem nữa, mau đi ngủ đi.',
        examRef: 'H21004',
        highlightKeyword: '不要...了'
      }
    ],
    quickQuiz: {
      question: '天 (tiān) 晚 (wǎn) 了 (le)， 你 (nǐ) ___ 喝 (hē) 咖 (kā) 啡 (fēi) 了 (le)。',
      pinyin: 'Tiān wǎn le, nǐ ___ hē kāfēi le.',
      options: [
        { text: '别', pinyin: 'bié', isCorrect: true },
        { text: '不', pinyin: 'bù', isCorrect: false },
        { text: '没', pinyin: 'méi', isCorrect: false }
      ],
      explanation: 'Cầu khiến cấm đoán "đừng uống nữa" dùng 别...了.'
    }
  },
  {
    id: 11,
    level: 'medium',
    levelLabel: 'Cấp độ 2: Trung bình',
    origin: 'new',
    originLabel: 'Mới ở HSK 2',
    title: 'Giới từ chỉ khoảng cách 离 (lí)',
    grammarKey: '离',
    grammarKeyPinyin: 'lí',
    textbookRef: {
      hsk1: 'Chưa học giới từ này',
      hsk2: 'Bài 7 (Trang 78)'
    },
    legoFormula: [
      { label: 'Địa điểm A', pinyin: 'dì diǎn A', role: 'subject' },
      { label: '离', pinyin: 'lí', role: 'keyword' },
      { label: 'Địa điểm B', pinyin: 'dì diǎn B', role: 'object' },
      { label: '很远 / 很近 / Khoảng cách', pinyin: 'hěn yuǎn / hěn jìn', role: 'modifier' }
    ],
    formulaSummary: 'A + 离 + B + 很远 / 近 / (Số lượng khoảng cách)',
    keyTip: '离 dùng đo khoảng cách từ điểm mốc A đến B (cả không gian lẫn thời gian). Không nói "从 A 离 B".',
    mistake: {
      wrong: '我家从学校很近。',
      wrongPinyin: 'wǒ jiā cóng xué xiào hěn jìn.',
      correct: '我家离学校很近。',
      correctPinyin: 'wǒ jiā lí xué xiào hěn jìn.',
      explanation: 'Diễn tả khoảng cách cách bao xa bắt buộc dùng giới từ "离" (lí), không dùng "从" (cóng).'
    },
    examples: [
      {
        hanzi: '那家宾馆离火车站很近。',
        pinyin: 'Nà jiā bīnguǎn lí huǒchēzhàn hěn jìn.',
        meaning: 'Khách sạn đó cách ga tàu rất gần.',
        examRef: 'H20902',
        highlightKeyword: '离'
      },
      {
        hanzi: '学校离我家不太远。',
        pinyin: 'Xuéxiào lí wǒ jiā bú tài yuǎn.',
        meaning: 'Trường học cách nhà tôi không xa lắm.',
        examRef: 'H21005',
        highlightKeyword: '离'
      }
    ],
    quickQuiz: {
      question: '中 (zhōng) 国 (guó) ___ 越 (yuè) 南 (nán) 很 (hěn) 近 (jìn)。',
      pinyin: 'Zhōngguó ___ Yuènán hěn jìn.',
      options: [
        { text: '离', pinyin: 'lí', isCorrect: true },
        { text: '从', pinyin: 'cóng', isCorrect: false },
        { text: '往', pinyin: 'wǎng', isCorrect: false }
      ],
      explanation: 'Chỉ cự ly giữa 2 quốc gia dùng cấu trúc A 离 B.'
    }
  },
  {
    id: 12,
    level: 'medium',
    levelLabel: 'Cấp độ 2: Trung bình',
    origin: 'new',
    originLabel: 'Mới ở HSK 2',
    title: 'Trợ từ động thái trải nghiệm 过 (guo)',
    grammarKey: '过',
    grammarKeyPinyin: 'guo',
    textbookRef: {
      hsk1: 'Chưa học',
      hsk2: 'Bài 13 (Trang 122)'
    },
    legoFormula: [
      { label: 'Chủ ngữ', pinyin: 'zhǔ yǔ', role: 'subject' },
      { label: 'Động từ', pinyin: 'dòng cí', role: 'verb' },
      { label: '过', pinyin: 'guo', role: 'keyword' },
      { label: 'Tân ngữ', pinyin: 'bīn yǔ', role: 'object' }
    ],
    formulaSummary: 'Chủ ngữ + (没) + Động từ + 过 + Tân ngữ (Đã từng / Chưa từng)',
    keyTip: '过 nhấn mạnh từng có trải nghiệm trong quá khứ và nay không còn tiếp diễn. Phủ định luôn dùng "没 (有)...过", không dùng "不".',
    mistake: {
      wrong: '我不吃过北京烤鸭。',
      wrongPinyin: 'wǒ bù chī guo běi jīng kǎo yā.',
      correct: '我没吃过北京烤鸭。',
      correctPinyin: 'wǒ méi chī guo běi jīng kǎo yā.',
      explanation: 'Phủ định trải nghiệm "chưa từng" bắt buộc dùng "没(有)" (méiyǒu), không dùng "不".'
    },
    examples: [
      {
        hanzi: '我没学过汉语。',
        pinyin: 'Wǒ méi xué guo Hànyǔ.',
        meaning: 'Tôi chưa từng học qua tiếng Trung.',
        examRef: 'H21006',
        highlightKeyword: '过'
      },
      {
        hanzi: '你去过那个饭馆吗？',
        pinyin: 'Nǐ qù guo nà ge fànguǎn ma?',
        meaning: 'Bạn đã từng đến nhà hàng đó chưa?',
        examRef: 'H21330',
        highlightKeyword: '过'
      }
    ],
    quickQuiz: {
      question: '我 (wǒ) 没 (méi) 看 (kàn) ___ 这 (zhè) 本 (běn) 书 (shū)。',
      pinyin: 'Wǒ méi kàn ___ zhè běn shū.',
      options: [
        { text: '过', pinyin: 'guo', isCorrect: true },
        { text: '了', pinyin: 'le', isCorrect: false },
        { text: '着', pinyin: 'zhe', isCorrect: false }
      ],
      explanation: 'Chưa từng xem qua trải nghiệm trong quá khứ đi với 没...过.'
    }
  },

  // ==================== CẤP ĐỘ 3: KHÓ ====================
  {
    id: 13,
    level: 'hard',
    levelLabel: 'Cấp độ 3: Khó',
    origin: 'advanced',
    originLabel: 'Nâng cao HSK 2',
    title: 'Bổ ngữ chỉ trạng thái 得 (de)',
    grammarKey: 'V + 得 + Adj',
    grammarKeyPinyin: 'dòng cí + de + xíng róng cí',
    textbookRef: {
      hsk1: 'Chưa học bổ ngữ',
      hsk2: 'Bài 11 (Trang 106)'
    },
    legoFormula: [
      { label: 'Động từ', pinyin: 'dòng cí', role: 'verb' },
      { label: '(Tân ngữ + V)', pinyin: 'bīn yǔ + V', role: 'modifier' },
      { label: '得', pinyin: 'de', role: 'keyword' },
      { label: 'Phó từ + Tính từ', pinyin: 'fù cí + xíng róng cí', role: 'subject' }
    ],
    formulaSummary: 'V + 得 + Tính từ (Nếu có tân ngữ: V + Tân ngữ + V + 得 + Tính từ)',
    keyTip: 'Nếu câu có tân ngữ, bắt buộc phải lặp lại động từ trước "得": 说汉语 说得很好 (Không nói: 说汉语得很好).',
    mistake: {
      wrong: '她说汉语得很流利。',
      wrongPinyin: 'tā shuō hàn yǔ de hěn liú lì.',
      correct: '她说汉语说得很流利。',
      correctPinyin: 'tā shuō hàn yǔ shuō de hěn liú lì.',
      explanation: 'Có tân ngữ "汉语" thì phải lặp lại động từ "说" ngay trước trợ từ "得".'
    },
    examples: [
      {
        hanzi: '跳得非常好。',
        pinyin: 'Tiào de fēicháng hǎo.',
        meaning: 'Nhảy cực kỳ đẹp.',
        examRef: 'H20901',
        highlightKeyword: '得'
      },
      {
        hanzi: '说汉语说得很好。',
        pinyin: 'Shuō Hànyǔ shuō de hěn hǎo.',
        meaning: 'Nói tiếng Trung rất giỏi.',
        examRef: 'H21331',
        highlightKeyword: '得'
      }
    ],
    quickQuiz: {
      question: '他 (tā) 跑 (pǎo) ___ 很 (hěn) 快 (kuài)。',
      pinyin: 'Tā pǎo ___ hěn kuài.',
      options: [
        { text: '得', pinyin: 'de', isCorrect: true },
        { text: '的', pinyin: 'de', isCorrect: false },
        { text: '地', pinyin: 'de', isCorrect: false }
      ],
      explanation: 'Sau động từ miêu tả trình độ/trạng thái kết quả dùng 得 (de).'
    }
  },
  {
    id: 14,
    level: 'hard',
    levelLabel: 'Cấp độ 3: Khó',
    origin: 'advanced',
    originLabel: 'Nâng cao HSK 2',
    title: 'Câu kiêm ngữ với 请, 让, 叫',
    grammarKey: '请 / 让 / 叫',
    grammarKeyPinyin: 'qǐng / ràng / jiào',
    textbookRef: {
      hsk1: 'Bài 10 (Trang 84 - chỉ dùng 请 lịch sự đơn lẻ)',
      hsk2: 'Bài 7 (Trang 78)'
    },
    legoFormula: [
      { label: 'Chủ ngữ 1', pinyin: 'zhǔ yǔ 1', role: 'subject' },
      { label: '让 / 叫 / 请', pinyin: 'ràng / jiào / qǐng', role: 'keyword' },
      { label: 'Người thực hiện 2', pinyin: 'rén 2', role: 'object' },
      { label: 'Hành động 2', pinyin: 'dòng zuò 2', role: 'verb' }
    ],
    formulaSummary: 'Chủ ngữ 1 + 让 / 叫 / 请 + Người 2 + Hành động 2 (Để/Bảo/Mời ai làm gì)',
    keyTip: 'Từ chỉ người thứ 2 vừa là tân ngữ của động từ trước, vừa là chủ ngữ thực hiện hành động sau. 让 (nhẹ nhàng, cho phép), 叫 (sai khiến, bảo).',
    mistake: {
      wrong: '老师叫我去。我没去，叫老师生气。',
      wrongPinyin: 'lǎo shī jiào wǒ qù. wǒ méi qù, jiào lǎo shī shēng qì.',
      correct: '老师叫我去。我没去，让老师生气了。',
      correctPinyin: 'lǎo shī jiào wǒ qù. wǒ méi qù, ràng lǎo shī shēng qì le.',
      explanation: 'Làm cho ai có cảm xúc/trạng thái nào đó dùng "让" (ràng), không dùng "叫" (jiào).'
    },
    examples: [
      {
        hanzi: '让我想想。',
        pinyin: 'Ràng wǒ xiǎngxiang.',
        meaning: 'Để tôi suy nghĩ một chút.',
        examRef: 'H20902',
        highlightKeyword: '让'
      },
      {
        hanzi: '老师叫同学们去。',
        pinyin: 'Lǎoshī jiào tóngxuémen qù.',
        meaning: 'Thầy giáo bảo các học sinh đi.',
        examRef: 'H21332',
        highlightKeyword: '叫'
      }
    ],
    quickQuiz: {
      question: '妈妈 (Māma) ___ 我 (wǒ) 去 (qù) 买 (mǎi) 菜 (cài)。',
      pinyin: 'Māma ___ wǒ qù mǎi cài.',
      options: [
        { text: '叫', pinyin: 'jiào', isCorrect: true },
        { text: '对', pinyin: 'duì', isCorrect: false },
        { text: '给', pinyin: 'gěi', isCorrect: false }
      ],
      explanation: 'Mẹ bảo tôi đi chợ là câu kiêm ngữ sai khiến dùng 叫 (jiào).'
    }
  },
  {
    id: 15,
    level: 'hard',
    levelLabel: 'Cấp độ 3: Khó',
    origin: 'advanced',
    originLabel: 'Nâng cao HSK 2',
    title: 'Câu so sánh với 比 (bǐ)',
    grammarKey: 'A 比 B + Adj',
    grammarKeyPinyin: 'A bǐ B + xíng róng cí',
    textbookRef: {
      hsk1: 'Chưa học',
      hsk2: 'Bài 10 (Trang 98), Bài 11 (Trang 107)'
    },
    legoFormula: [
      { label: 'Chủ thể A', pinyin: 'zhǔ tǐ A', role: 'subject' },
      { label: '比', pinyin: 'bǐ', role: 'keyword' },
      { label: 'Chủ thể B', pinyin: 'zhǔ tǐ B', role: 'object' },
      { label: 'Tính từ (Không 很)', pinyin: 'xíng róng cí', role: 'verb' }
    ],
    formulaSummary: 'A + 比 + B + (更 / 还) + Tính từ (Tuyệt đối KHÔNG có 很 / 非常)',
    keyTip: 'Bẫy số 1 trong mọi đề thi HSK 2: Sau câu so sánh 比, KHÔNG BAO GIỜ được dùng các phó từ mức độ như 很, 非常, 太.',
    mistake: {
      wrong: '哥哥比弟弟很高。',
      wrongPinyin: 'gē ge bǐ dì di hěn gāo.',
      correct: '哥哥比弟弟更高 / 哥哥比弟弟高。',
      correctPinyin: 'gē ge bǐ dì di gèng gāo / gē ge bǐ dì di gāo.',
      explanation: 'Cấm dùng "很" trong câu chữ 比. Muốn nhấn mạnh mức độ hơn nữa, dùng "更" (gèng) hoặc "还" (hái).'
    },
    examples: [
      {
        hanzi: '现在比他爸爸还高呢。',
        pinyin: 'Xiànzài bǐ tā bàba hái gāo ne.',
        meaning: 'Bây giờ còn cao hơn cả bố anh ấy nữa.',
        examRef: 'H21330',
        highlightKeyword: '比'
      },
      {
        hanzi: '今天比昨天冷一点儿。',
        pinyin: 'Jīntiān bǐ zuótiān lěng yìdiǎnr.',
        meaning: 'Hôm nay lạnh hơn hôm qua một chút.',
        examRef: 'H21004',
        highlightKeyword: '比'
      }
    ],
    quickQuiz: {
      question: '选 (Xuǎn) 择 (zé) 正 (zhèng) 确 (què) 的 (de) 句 (jù) 子 (zi)：',
      pinyin: 'Xuǎnzé zhèngquè de jùzi:',
      options: [
        { text: '他比我大两岁。', pinyin: 'Tā bǐ wǒ dà liǎng suì.', isCorrect: true },
        { text: '他比我很大。', pinyin: 'Tā bǐ wǒ hěn dà.', isCorrect: false },
        { text: '他非常比我大。', pinyin: 'Tā fēicháng bǐ wǒ dà.', isCorrect: false }
      ],
      explanation: 'Không dùng 很 trước tính từ trong câu so sánh 比. Đáp án đúng nêu rõ mức độ chênh lệch "大两岁".'
    }
  },
  {
    id: 16,
    level: 'hard',
    levelLabel: 'Cấp độ 3: Khó',
    origin: 'advanced',
    originLabel: 'Nâng cao HSK 2',
    title: 'Trợ từ động thái duy trì trạng thái 着 (zhe)',
    grammarKey: 'V + 着',
    grammarKeyPinyin: 'dòng cí + zhe',
    textbookRef: {
      hsk1: 'Chưa học',
      hsk2: 'Bài 14 (Trang 130)'
    },
    legoFormula: [
      { label: 'Chủ ngữ', pinyin: 'zhǔ yǔ', role: 'subject' },
      { label: 'Động từ', pinyin: 'dòng cí', role: 'verb' },
      { label: '着', pinyin: 'zhe', role: 'keyword' },
      { label: 'Tân ngữ / (呢)', pinyin: 'bīn yǔ / ne', role: 'object' }
    ],
    formulaSummary: 'Chủ ngữ + Động từ + 着 + (Tân ngữ) + (呢)',
    keyTip: 'Diễn tả trạng thái hoặc tư thế đang duy trì ổn định (như cửa đang mở, áo đang mặc, người đang ngồi). Khác với 正在 diễn tả hành động đang thực hiện.',
    mistake: {
      wrong: '门没关着。他关门着。',
      wrongPinyin: 'mén méi guān zhe. tā guān mén zhe.',
      correct: '门关着呢。',
      correctPinyin: 'mén guān zhe ne.',
      explanation: '着 đặt ngay sau động từ "关着", không đặt ra sau tân ngữ "关门着".'
    },
    examples: [
      {
        hanzi: '门开着呢，请进。',
        pinyin: 'Mén kāi zhe ne, qǐng jìn.',
        meaning: 'Cửa đang mở đấy, mời vào.',
        examRef: 'H20000',
        highlightKeyword: '着'
      },
      {
        hanzi: '他穿着一件红色的衣服。',
        pinyin: 'Tā chuān zhe yí jiàn hóngsè de yīfu.',
        meaning: 'Anh ấy đang mặc một chiếc áo màu đỏ.',
        examRef: 'H21334',
        highlightKeyword: '着'
      }
    ],
    quickQuiz: {
      question: '外 (wài) 面 (mian) 冷 (lěng)， 穿 (chuān) ___ 大 (dà) 衣 (yī) 吧 (ba)。',
      pinyin: 'Wàimiàn lěng, chuān ___ dàyī ba.',
      options: [
        { text: '着', pinyin: 'zhe', isCorrect: true },
        { text: '过', pinyin: 'guo', isCorrect: false },
        { text: '了', pinyin: 'le', isCorrect: false }
      ],
      explanation: 'Duy trì trạng thái mặc ấm trên người dùng 穿着 (chuān zhe).'
    }
  },
  {
    id: 17,
    level: 'hard',
    levelLabel: 'Cấp độ 3: Khó',
    origin: 'advanced',
    originLabel: 'Nâng cao HSK 2',
    title: 'Cặp liên từ nối: 因为...所以... & 虽然...但是...',
    grammarKey: '因为...所以... / 虽然...但是...',
    grammarKeyPinyin: 'yīnwèi...suǒyǐ... / suīrán...dànshì...',
    textbookRef: {
      hsk1: 'Chưa học liên từ phức',
      hsk2: 'Bài 5 (Trang 58 - 因为...所以...), Bài 13 (Trang 122 - 虽然...但是...)'
    },
    legoFormula: [
      { label: '虽然 / 因为', pinyin: 'suīrán / yīnwèi', role: 'keyword' },
      { label: 'Mệnh đề 1', pinyin: 'mìng tí 1', role: 'subject' },
      { label: '但是 / 所以', pinyin: 'dànshì / suǒyǐ', role: 'keyword' },
      { label: 'Mệnh đề 2', pinyin: 'mìng tí 2', role: 'object' }
    ],
    formulaSummary: '因为 + Nguyên nhân, 所以 + Kết quả | 虽然 + Nhượng bộ, 但是 + Chuyển ý',
    keyTip: 'Trong tiếng Hán hiện đại, hai vế câu có thể lược bớt 1 trong 2 liên từ, nhưng khi đi cả cặp sẽ tạo liên kết chặt chẽ chuẩn bài thi HSK.',
    mistake: {
      wrong: '因为下雨，但是我们没去。',
      wrongPinyin: 'yīn wèi xià yǔ, dàn shì wǒ men méi qù.',
      correct: '因为下雨，所以我们没去。',
      correctPinyin: 'yīn wèi xià yǔ, suǒ yǐ wǒ men méi qù.',
      explanation: 'Không ghép nhầm liên từ nguyên nhân "因为" với liên từ chuyển ngoặt "但是".'
    },
    examples: [
      {
        hanzi: '这个桌子虽然看着很漂亮，但是它很贵。',
        pinyin: 'Zhè ge zhuōzi suīrán kàn zhe hěn piàoliang, dànshì tā hěn guì.',
        meaning: 'Cái bàn này tuy nhìn rất đẹp, nhưng nó rất đắt.',
        examRef: 'H20901',
        highlightKeyword: '虽然...但是'
      },
      {
        hanzi: '因为生病了，所以他今天没来。',
        pinyin: 'Yīnwèi shēngbìng le, suǒyǐ tā jīntiān méi lái.',
        meaning: 'Vì bị ốm nên hôm nay anh ấy không đến.',
        examRef: 'H21006',
        highlightKeyword: '因为...所以'
      }
    ],
    quickQuiz: {
      question: '___ 今 (jīn) 天 (tiān) 很 (hěn) 冷 (lěng)， ___ 他 (tā) 还 (hái) 是 (shì) 去 (qù) 游 (yóu) 泳 (yǒng) 了 (le)。',
      pinyin: '___ jīntiān hěn lěng, ___ tā háishì qù yóuyǒng le.',
      options: [
        { text: '虽然...但是...', pinyin: 'suīrán...dànshì...', isCorrect: true },
        { text: '因为...所以...', pinyin: 'yīnwèi...suǒyǐ...', isCorrect: false },
        { text: '不仅...而且...', pinyin: 'bùjǐn...érqiě...', isCorrect: false }
      ],
      explanation: 'Vế trước chỉ điều kiện bất lợi, vế sau vẫn thực hiện hành động -> dùng tuy... nhưng... (虽然...但是).'
    }
  },
  {
    id: 18,
    level: 'hard',
    levelLabel: 'Cấp độ 3: Khó',
    origin: 'advanced',
    originLabel: 'Nâng cao HSK 2',
    title: 'Giới từ 对 (duì) (Đối với / Tác động đến)',
    grammarKey: '对',
    grammarKeyPinyin: 'duì',
    textbookRef: {
      hsk1: 'Chưa học với tư cách giới từ',
      hsk2: 'Bài 9 (Trang 90)'
    },
    legoFormula: [
      { label: 'Chủ thể A', pinyin: 'zhǔ tǐ A', role: 'subject' },
      { label: '对', pinyin: 'duì', role: 'keyword' },
      { label: 'Đối tượng B', pinyin: 'duì xiàng B', role: 'object' },
      { label: '好 / 有帮助 / Có tác động', pinyin: 'hǎo / yǒu bāng zhù', role: 'modifier' }
    ],
    formulaSummary: 'A + 对 + B + [Tính từ / Cụm vị ngữ] (A đối với B thì như thế nào)',
    keyTip: 'Thường gặp trong các mẫu câu sức khỏe, thói quen: 对身体好 (tốt cho cơ thể), 对学习有帮助 (có ích cho học tập).',
    mistake: {
      wrong: '看电脑不好对眼睛。',
      wrongPinyin: 'kàn diàn nǎo bù hǎo duì yǎn jīng.',
      correct: '看电脑对眼睛不好。',
      correctPinyin: 'kàn diàn nǎo duì yǎn jīng bù hǎo.',
      explanation: 'Cụm giới từ "对 + B" bắt buộc phải đứng TRƯỚC tính từ "不好", không đặt ở cuối câu như tiếng Việt.'
    },
    examples: [
      {
        hanzi: '看电脑对眼睛不好。',
        pinyin: 'Kàn diànnǎo duì yǎnjīng bù hǎo.',
        meaning: 'Xem máy tính nhiều không tốt cho mắt.',
        examRef: 'H20902',
        highlightKeyword: '对'
      },
      {
        hanzi: '每天跑步对他身体很好。',
        pinyin: 'Měitiān pǎobù duì tā shēntǐ hěn hǎo.',
        meaning: 'Mỗi ngày chạy bộ rất tốt cho cơ thể của anh ấy.',
        examRef: 'H21333',
        highlightKeyword: '对'
      }
    ],
    quickQuiz: {
      question: '多 (Duō) 吃 (chī) 水 (shuǐ) 果 (guǒ) ___ 身 (shēn) 体 (tǐ) 很 (hěn) 好 (hǎo)。',
      pinyin: 'Duō chī shuǐguǒ ___ shēntǐ hěn hǎo.',
      options: [
        { text: '对', pinyin: 'duì', isCorrect: true },
        { text: '给', pinyin: 'gěi', isCorrect: false },
        { text: '跟', pinyin: 'gēn', isCorrect: false }
      ],
      explanation: 'Tác động có lợi đối với cơ thể dùng giới từ 对 (duì).'
    }
  }
];

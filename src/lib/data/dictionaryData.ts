// Dữ liệu từ điển HSK 1 & HSK 2 được biên dịch tĩnh tối ưu tốc độ 0ms (In-Memory Lookup)
export interface DictSentence {
  zh: string;
  pinyin: string;
  vi: string;
  tag?: string;
}

export interface DictRelatedWord {
  hanzi: string;
  pinyin?: string;
  hanViet?: string;
  viet?: string;
}

export interface DictConfusable {
  pair: string;
  explanation: string;
}

export interface DictSubDefinition {
  order: number;
  definition: string;
  explanation?: string;
  example?: {
    zh: string;
    pinyin?: string;
    vi: string;
  };
}

export interface DictWord {
  id: string;
  hanzi: string;
  traditional: string;
  pinyin: string;
  pinyinClean: string;
  hanViet: string;
  radical: string;
  strokeCount: number;
  hskLevel: number;
  lesson: number;
  partOfSpeech: string;
  viet: string;
  vi_meaning_full?: string;
  vi_meaning_short?: string;
  enMeaning: string;
  image: string;
  collocations: string[];
  compounds: string[];
  synonyms: Array<DictRelatedWord | string>;
  antonyms: Array<DictRelatedWord | string>;
  confusableWords?: DictConfusable | string;
  subDefinitions?: DictSubDefinition[];
  sentences: DictSentence[];
}

export const DICTIONARY_WORDS: DictWord[] = [
  {
    "id": "hsk1-1-5",
    "hanzi": "对不起",
    "traditional": "對不起",
    "pinyin": "duìbuqǐ",
    "pinyinClean": "duibuqi",
    "hanViet": "ĐỐI BẤT KHỞI",
    "radical": "寸",
    "strokeCount": 5,
    "hskLevel": 1,
    "lesson": 1,
    "partOfSpeech": "cụm từ",
    "viet": "xin lỗi",
    "vi_meaning_full": "cụm từ xin lỗi lịch sự khi làm phiền hoặc gây lỗi cho người khác",
    "vi_meaning_short": "xin lỗi",
    "enMeaning": "sorry, excuse me",
    "image": "https://images.pexels.com/photos/771324/pexels-photo-771324.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "对不起",
      "我迟到了"
    ],
    "compounds": [
      "对",
      "起"
    ],
    "synonyms": [
      "抱歉"
    ],
    "antonyms": [],
    "confusableWords": "对不起",
    "sentences": [
      {
        "zh": "甲：对不起！乙：没关系。",
        "pinyin": "Jiǎ: Duìbuqǐ! Yǐ: Méi guānxi.",
        "vi": "A: Xin lỗi! B: Không sao đâu.",
        "tag": "Lịch sự"
      },
      {
        "zh": "对不起，我不知情。",
        "pinyin": "Duìbuqǐ, wǒ bù zhīqíng.",
        "vi": "Xin lỗi, tôi không biết việc này.",
        "tag": "Giao tiếp"
      }
    ],
    "subDefinitions": [
      {
        "order": 1,
        "definition": "Xin lỗi",
        "explanation": "Dùng để biểu thị sự áy náy, nhận lỗi hoặc lịch sự khi làm phiền người khác.",
        "example": {
          "zh": "对不起，让您久等了。",
          "pinyin": "Duìbuqǐ, ràng nín jiǔ děng le.",
          "vi": "Xin lỗi, phiền ông/bà phải đợi lâu."
        }
      },
      {
        "order": 2,
        "definition": "Có lỗi với, có lỗi",
        "explanation": "Biểu thị hành vi sai trái làm tổn thương hoặc phụ lòng ai đó.",
        "example": {
          "zh": "我对不起我的父母。",
          "pinyin": "Wǒ duìbuqǐ wǒ de fùmǔ.",
          "vi": "Tôi có lỗi với bố mẹ mình."
        }
      }
    ]
  },
  {
    "id": "hsk1-1-2",
    "hanzi": "好",
    "traditional": "好",
    "pinyin": "hǎo",
    "pinyinClean": "hao",
    "hanViet": "HẢO",
    "radical": "女",
    "strokeCount": 6,
    "hskLevel": 1,
    "lesson": 1,
    "partOfSpeech": "tính từ",
    "viet": "tốt, hay, xong",
    "vi_meaning_full": "đạt tiêu chuẩn chất lượng cao, gây cảm giác dễ chịu hoặc dùng để chào hỏi",
    "vi_meaning_short": "tốt, hay, xong",
    "enMeaning": "good, fine, well",
    "image": "https://images.pexels.com/photos/8831809/pexels-photo-8831809.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "你好",
      "好吃",
      "好看",
      "准备好"
    ],
    "compounds": [
      "好人",
      "好看"
    ],
    "synonyms": [
      "优",
      "佳"
    ],
    "antonyms": [
      "坏",
      "差"
    ],
    "confusableWords": "号",
    "sentences": [
      {
        "zh": "你好！很高兴认识你。",
        "pinyin": "Nǐ hǎo! Hěn gāoxìng rènshi nǐ.",
        "vi": "Xin chào! Rất vui được gặp bạn.",
        "tag": "Chào hỏi"
      },
      {
        "zh": "这本小说很好。",
        "pinyin": "Zhè běn xiǎoshuō hěn hǎo.",
        "vi": "Cuốn tiểu thuyết này rất hay.",
        "tag": "Đánh giá"
      }
    ]
  },
  {
    "id": "hsk1-1-6",
    "hanzi": "没关系",
    "traditional": "沒關係",
    "pinyin": "méi guānxi",
    "pinyinClean": "meiguanxi",
    "hanViet": "MỘT QUAN HỆ",
    "radical": "氵",
    "strokeCount": 7,
    "hskLevel": 1,
    "lesson": 1,
    "partOfSpeech": "cụm từ",
    "viet": "không sao, không có gì",
    "vi_meaning_full": "cụm từ dùng để đáp lại lời xin lỗi của người khác",
    "vi_meaning_short": "không sao, không có gì",
    "enMeaning": "it doesn't matter, it's okay",
    "image": "https://images.pexels.com/photos/33944557/pexels-photo-33944557.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "没关系",
      "不客气"
    ],
    "compounds": [
      "关系"
    ],
    "synonyms": [
      "没事"
    ],
    "antonyms": [],
    "confusableWords": "没关系",
    "sentences": [
      {
        "zh": "甲：对不起！乙：没关系。",
        "pinyin": "Jiǎ: Duìbuqǐ! Yǐ: Méi guānxi.",
        "vi": "A: Xin lỗi! B: Không sao đâu.",
        "tag": "Lịch sự"
      },
      {
        "zh": "没关系，我有时间。",
        "pinyin": "Méi guānxi, wǒ yǒu shíjiān.",
        "vi": "Không sao, tôi có thời gian.",
        "tag": "Giao tiếp"
      }
    ]
  },
  {
    "id": "hsk1-1-1",
    "hanzi": "你",
    "traditional": "你",
    "pinyin": "nǐ",
    "pinyinClean": "ni",
    "hanViet": "NHĨ",
    "radical": "亻",
    "strokeCount": 7,
    "hskLevel": 1,
    "lesson": 1,
    "partOfSpeech": "đại từ xưng呼",
    "viet": "bạn, cậu, anh, chị",
    "vi_meaning_full": "đại từ xưng呼 ngôi thứ hai số ít người đối thoại",
    "vi_meaning_short": "bạn, cậu, anh, chị",
    "enMeaning": "you",
    "image": "https://images.pexels.com/photos/905947/pexels-photo-905947.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "你好",
      "你们",
      "你的"
    ],
    "compounds": [
      "你们",
      "你好"
    ],
    "synonyms": [
      "汝"
    ],
    "antonyms": [
      "我"
    ],
    "confusableWords": "您, 他",
    "sentences": [
      {
        "zh": "你好！很高兴认识你。",
        "pinyin": "Nǐ hǎo! Hěn gāoxìng rènshi nǐ.",
        "vi": "Xin chào! Rất vui được biết bạn.",
        "tag": "Giao tiếp"
      },
      {
        "zh": "你是学生吗？",
        "pinyin": "Nǐ shì xuésheng ma?",
        "vi": "Bạn là học sinh phải không?",
        "tag": "Hỏi đáp"
      }
    ]
  },
  {
    "id": "hsk1-1-4",
    "hanzi": "你们",
    "traditional": "你们",
    "pinyin": "nǐmen",
    "pinyinClean": "nimen",
    "hanViet": "NỄ MÔN",
    "radical": "",
    "strokeCount": 0,
    "hskLevel": 1,
    "lesson": 1,
    "partOfSpeech": "",
    "viet": "các bạn",
    "enMeaning": "",
    "image": "https://images.pexels.com/photos/36930033/pexels-photo-36930033.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [],
    "compounds": [],
    "synonyms": [],
    "antonyms": [],
    "sentences": [
      {
        "zh": "你们都是学生吗？",
        "pinyin": "Nǐmen dōu shì xuésheng ma?",
        "vi": "Các bạn đều là học sinh phải không?",
        "tag": "Hỏi thông tin"
      },
      {
        "zh": "欢迎你们来到北京！",
        "pinyin": "Huānyíng nǐmen lái dào Běijīng!",
        "vi": "Chào mừng các bạn đến Bắc Kinh!",
        "tag": "Chào đón"
      }
    ],
    "vi_meaning_full": "các bạn",
    "vi_meaning_short": "các bạn"
  },
  {
    "id": "hsk1-1-3",
    "hanzi": "您",
    "traditional": "您",
    "pinyin": "nín",
    "pinyinClean": "nin",
    "hanViet": "NÂM",
    "radical": "",
    "strokeCount": 0,
    "hskLevel": 1,
    "lesson": 1,
    "partOfSpeech": "",
    "viet": "ngài, ông/bà (kính trọng)",
    "enMeaning": "",
    "image": "https://images.pexels.com/photos/27663571/pexels-photo-27663571.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [],
    "compounds": [],
    "synonyms": [],
    "antonyms": [],
    "sentences": [
      {
        "zh": "老师，您好！",
        "pinyin": "Lǎoshī, nín hǎo!",
        "vi": "Thầy/Cô, chào thầy/cô ạ!",
        "tag": "Kính ngữ"
      },
      {
        "zh": "您请坐。",
        "pinyin": "Nín qǐng zuò.",
        "vi": "Mời ngài ngồi.",
        "tag": "Lịch sự"
      }
    ],
    "vi_meaning_full": "ngài, ông/bà (kính trọng)",
    "vi_meaning_short": "ngài, ông/bà (kính trọng)"
  },
  {
    "id": "hsk1-2-2",
    "hanzi": "不",
    "traditional": "不",
    "pinyin": "bù",
    "pinyinClean": "bu",
    "hanViet": "BẤT",
    "radical": "一",
    "strokeCount": 4,
    "hskLevel": 1,
    "lesson": 2,
    "partOfSpeech": "phó từ",
    "viet": "không, chẳng",
    "vi_meaning_full": "phó từ đặt trước động từ hoặc tính từ để phủ định ở hiện tại hoặc tương lai",
    "vi_meaning_short": "không, chẳng",
    "enMeaning": "not, no",
    "image": "https://images.pexels.com/photos/23008/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "不是",
      "不去",
      "不好"
    ],
    "compounds": [
      "不要",
      "不用"
    ],
    "synonyms": [
      "没",
      "未"
    ],
    "antonyms": [
      "是"
    ],
    "confusableWords": "木, 下",
    "sentences": [
      {
        "zh": "我不是老师。",
        "pinyin": "Wǒ bú shì lǎoshī.",
        "vi": "Tôi không phải là giáo viên.",
        "tag": "Giới thiệu"
      },
      {
        "zh": "今天天气不好。",
        "pinyin": "Jīntiān tiānqì bù hǎo.",
        "vi": "Hôm nay thời tiết không tốt.",
        "tag": "Thời tiết"
      }
    ]
  },
  {
    "id": "hsk1-2-3",
    "hanzi": "不客气",
    "traditional": "不客氣",
    "pinyin": "bú kèqi",
    "pinyinClean": "bukeqi",
    "hanViet": "BẤT KHÁCH KHÍ",
    "radical": "一",
    "strokeCount": 4,
    "hskLevel": 1,
    "lesson": 2,
    "partOfSpeech": "cụm từ",
    "viet": "không có gì, đừng khách khí",
    "vi_meaning_full": "cụm từ lịch sự đáp lại lời cảm ơn của người khác",
    "vi_meaning_short": "không có gì, đừng khách khí",
    "enMeaning": "you're welcome",
    "image": "https://images.pexels.com/photos/33944557/pexels-photo-33944557.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "不用客气",
      "别客气"
    ],
    "compounds": [
      "客气"
    ],
    "synonyms": [
      "不用谢",
      "别客气"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "甲：谢谢你！乙：不客气。",
        "pinyin": "Jiǎ: Xièxie nǐ! Yǐ: Bú kèqi.",
        "vi": "A: Cảm ơn bạn! B: Không có gì.",
        "tag": "Giao tiếp"
      },
      {
        "zh": "大家是朋友，别不客气。",
        "pinyin": "Dàjiā shì péngyou, bié bú kèqi.",
        "vi": "Mọi người là bạn bè, đừng khách khí.",
        "tag": "Xã giao"
      }
    ]
  },
  {
    "id": "hsk1-2-1",
    "hanzi": "谢谢",
    "traditional": "謝謝",
    "pinyin": "xièxie",
    "pinyinClean": "xiexie",
    "hanViet": "TẠ TẠ",
    "radical": "讠",
    "strokeCount": 12,
    "hskLevel": 1,
    "lesson": 2,
    "partOfSpeech": "động từ cụm",
    "viet": "cảm ơn",
    "vi_meaning_full": "cụm từ bày tỏ lòng biết ơn khi nhận được sự giúp đỡ",
    "vi_meaning_short": "cảm ơn",
    "enMeaning": "thanks, thank you",
    "image": "https://images.pexels.com/photos/6287933/pexels-photo-6287933.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "谢谢你",
      "非常感谢"
    ],
    "compounds": [],
    "synonyms": [
      "讠",
      "身",
      "寸"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "甲：谢谢你！乙：不客气。",
        "pinyin": "Jiǎ: Xièxie nǐ! Yǐ: Bú kèqi.",
        "vi": "A: Cảm ơn bạn! B: Không có gì.",
        "tag": "Lịch sự"
      },
      {
        "zh": "感谢",
        "pinyin": "",
        "vi": "致谢",
        "tag": "射"
      }
    ],
    "subDefinitions": [
      {
        "order": 1,
        "definition": "Cảm ơn",
        "explanation": "Dùng để tỏ lòng biết ơn khi nhận được sự giúp đỡ, quà tặng hoặc lời khen ngợi.",
        "example": {
          "zh": "太谢谢你了！",
          "pinyin": "Tài xièxie nǐ le!",
          "vi": "Vô cùng cảm ơn bạn!"
        }
      }
    ]
  },
  {
    "id": "hsk1-2-4",
    "hanzi": "再见",
    "traditional": "再見",
    "pinyin": "zàijiàn",
    "pinyinClean": "zaijian",
    "hanViet": "TÁI KIẾN",
    "radical": "冂",
    "strokeCount": 6,
    "hskLevel": 1,
    "lesson": 2,
    "partOfSpeech": "cụm từ",
    "viet": "tạm biệt, hẹn gặp lại",
    "vi_meaning_full": "lời chào tạm biệt khi chia tay",
    "vi_meaning_short": "tạm biệt, hẹn gặp lại",
    "enMeaning": "goodbye, see you again",
    "image": "https://images.pexels.com/photos/8832738/pexels-photo-8832738.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "老师再见",
      "明天再见"
    ],
    "compounds": [],
    "synonyms": [
      "冂",
      "见"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "再见！明天见。",
        "pinyin": "Zàijiàn! Míngtiān jiàn.",
        "vi": "Tạm biệt! Hẹn gặp lại ngày mai.",
        "tag": "Chào chia tay"
      },
      {
        "zh": "告别",
        "pinyin": "",
        "vi": "再, 见",
        "tag": "再见"
      }
    ]
  },
  {
    "id": "hsk1-3-1",
    "hanzi": "叫",
    "traditional": "叫",
    "pinyin": "jiào",
    "pinyinClean": "jiao",
    "hanViet": "KHIẾU",
    "radical": "口",
    "strokeCount": 5,
    "hskLevel": 1,
    "lesson": 3,
    "partOfSpeech": "động từ",
    "viet": "tên là, gọi",
    "vi_meaning_full": "dùng để xưng tên, gọi tên hoặc kêu gào, yêu cầu",
    "vi_meaning_short": "tên là, gọi",
    "enMeaning": "to be called, to call",
    "image": "https://images.pexels.com/photos/11861959/pexels-photo-11861959.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "叫什么",
      "叫名字"
    ],
    "compounds": [
      "叫声",
      "呼叫"
    ],
    "synonyms": [
      "称",
      "呼"
    ],
    "antonyms": [],
    "confusableWords": "纠, 计",
    "sentences": [
      {
        "zh": "你叫什么名字？",
        "pinyin": "Nǐ jiào shénme míngzi?",
        "vi": "Bạn tên là gì?",
        "tag": "Chào hỏi"
      },
      {
        "zh": "我叫李月。",
        "pinyin": "Wǒ jiào Lǐ Yuè.",
        "vi": "Tôi tên là Lý Nguyệt.",
        "tag": "Giới thiệu"
      }
    ]
  },
  {
    "id": "hsk1-3-6",
    "hanzi": "老师",
    "traditional": "老師",
    "pinyin": "lǎoshī",
    "pinyinClean": "laoshi",
    "hanViet": "LÃO SƯ",
    "radical": "耂",
    "strokeCount": 6,
    "hskLevel": 1,
    "lesson": 3,
    "partOfSpeech": "danh từ",
    "viet": "thầy cô giáo",
    "vi_meaning_full": "người giảng dạy kiến thức, truyền thụ học vấn tại nhà trường",
    "vi_meaning_short": "thầy cô giáo",
    "enMeaning": "teacher",
    "image": "https://images.pexels.com/photos/8617961/pexels-photo-8617961.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "王老师",
      "汉语老师"
    ],
    "compounds": [
      "老",
      "师者"
    ],
    "synonyms": [
      "教师",
      "师长"
    ],
    "antonyms": [
      "学生"
    ],
    "confusableWords": "老实",
    "sentences": [
      {
        "zh": "他是我们的汉语老师。",
        "pinyin": "Tā shì wǒmen de Hànyǔ lǎoshī.",
        "vi": "Anh ấy là thầy giáo tiếng Trung của chúng tôi.",
        "tag": "Giới thiệu"
      },
      {
        "zh": "老师好！",
        "pinyin": "Lǎoshī hǎo!",
        "vi": "Em chào thầy/cô!",
        "tag": "Chào hỏi"
      }
    ]
  },
  {
    "id": "hsk1-3-153",
    "hanzi": "李月",
    "traditional": "李月",
    "pinyin": "Lǐ Yuè",
    "pinyinClean": "liyue",
    "hanViet": "LÝ NGUYỆT",
    "radical": "木",
    "strokeCount": 7,
    "hskLevel": 1,
    "lesson": 3,
    "partOfSpeech": "danh từ riêng",
    "viet": "Lý Nguyệt",
    "vi_meaning_full": "tên riêng nhân vật nữ giáo viên trong giáo trình HSK 1",
    "vi_meaning_short": "Lý Nguyệt",
    "enMeaning": "Li Yue (name)",
    "image": "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk2MTUyfDB8MXxzZWFyY2h8MXx8ZnJpZW5kbHklMjBjaGluZXNlJTIwZmVtYWxlJTIwdGVhY2hlcnxlbnwwfHx8fDE3OTE4MjkxNjl8MA&ixlib=rb-4.1.0&q=80&w=400",
    "collocations": [
      "李月老师"
    ],
    "compounds": [],
    "synonyms": [
      "木",
      "月"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "我叫李月。",
        "pinyin": "Wǒ jiào Lǐ Yuè.",
        "vi": "Tôi tên là Lý Nguyệt.",
        "tag": "Giới thiệu"
      }
    ]
  },
  {
    "id": "hsk1-3-157",
    "hanzi": "玛丽",
    "traditional": "瑪麗",
    "pinyin": "Mǎlì",
    "pinyinClean": "mali",
    "hanViet": "MÃ LỆ",
    "radical": "女",
    "strokeCount": 6,
    "hskLevel": 1,
    "lesson": 3,
    "partOfSpeech": "danh từ riêng",
    "viet": "Mary, Mã Lệ",
    "vi_meaning_full": "tên riêng phiên âm nước ngoài (Mary) trong giáo trình",
    "vi_meaning_short": "Mary, Mã Lệ",
    "enMeaning": "Mary (name)",
    "image": "https://images.pexels.com/photos/9489929/pexels-photo-9489929.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "玛丽同学"
    ],
    "compounds": [],
    "synonyms": [
      "女",
      "丽"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "玛丽在学习汉语。",
        "pinyin": "Mǎlì zài xuéxí Hànyǔ.",
        "vi": "Mary đang học tiếng Trung.",
        "tag": "Học tập"
      }
    ]
  },
  {
    "id": "hsk1-3-7",
    "hanzi": "吗",
    "traditional": "嗎",
    "pinyin": "ma",
    "pinyinClean": "ma",
    "hanViet": "MÃ",
    "radical": "口",
    "strokeCount": 6,
    "hskLevel": 1,
    "lesson": 3,
    "partOfSpeech": "trợ từ nghi vấn",
    "viet": "không, hả, ư",
    "vi_meaning_full": "trợ từ đứng ở cuối câu để tạo thành câu hỏi nghi vấn Đúng/Không",
    "vi_meaning_short": "không, hả, ư",
    "enMeaning": "question particle",
    "image": "https://images.pexels.com/photos/14997034/pexels-photo-14997034.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "你好吗",
      "是吗",
      "去吗"
    ],
    "compounds": [
      "干吗"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "吗, 妈, 马",
    "sentences": [
      {
        "zh": "你是中国人吗？",
        "pinyin": "Nǐ shì Zhōngguó rén ma?",
        "vi": "Bạn là người Trung Quốc phải không?",
        "tag": "Hỏi đáp"
      },
      {
        "zh": "今天冷吗？",
        "pinyin": "Jīntiān lěng ma?",
        "vi": "Hôm nay có lạnh không?",
        "tag": "Thời tiết"
      }
    ]
  },
  {
    "id": "hsk1-3-3",
    "hanzi": "名字",
    "traditional": "名字",
    "pinyin": "míngzi",
    "pinyinClean": "mingzi",
    "hanViet": "DANH TỰ",
    "radical": "夕",
    "strokeCount": 6,
    "hskLevel": 1,
    "lesson": 3,
    "partOfSpeech": "danh từ",
    "viet": "tên",
    "vi_meaning_full": "tên gọi riêng dùng để phân biệt người, sự vật hoặc địa danh",
    "vi_meaning_short": "tên",
    "enMeaning": "name",
    "image": "https://images.pexels.com/photos/12579758/pexels-photo-12579758.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "叫名字",
      "汉语名字"
    ],
    "compounds": [
      "有名",
      "汉字"
    ],
    "synonyms": [
      "姓名"
    ],
    "antonyms": [],
    "confusableWords": "明白",
    "sentences": [
      {
        "zh": "你叫什么名字？",
        "pinyin": "Nǐ jiào shénme míngzi?",
        "vi": "Bạn tên là gì?",
        "tag": "Chào hỏi"
      },
      {
        "zh": "我的名字叫李月。",
        "pinyin": "Wǒ de míngzi jiào Lǐ Yuè.",
        "vi": "Tên tôi là Lý Nguyệt.",
        "tag": "Giới thiệu"
      }
    ]
  },
  {
    "id": "hsk1-3-9",
    "hanzi": "人",
    "traditional": "人",
    "pinyin": "rén",
    "pinyinClean": "ren",
    "hanViet": "NHÂN",
    "radical": "人",
    "strokeCount": 2,
    "hskLevel": 1,
    "lesson": 3,
    "partOfSpeech": "danh từ",
    "viet": "người",
    "vi_meaning_full": "sinh vật có tư duy, có ngôn ngữ và khả năng lao động",
    "vi_meaning_short": "người",
    "enMeaning": "person, people",
    "image": "https://images.pexels.com/photos/3228887/pexels-photo-3228887.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "中国人",
      "两个人",
      "很多人"
    ],
    "compounds": [
      "人们",
      "人才",
      "人口"
    ],
    "synonyms": [
      "人类"
    ],
    "antonyms": [],
    "confusableWords": "入, 八",
    "sentences": [
      {
        "zh": "我们都是中国人。",
        "pinyin": "Wǒmen dōu shì Zhōngguó rén.",
        "vi": "Chúng tôi đều là người Trung Quốc.",
        "tag": "Quốc tịch"
      },
      {
        "zh": "前面很多人。",
        "pinyin": "Qiánmiàn yǒu hěn duō rén.",
        "vi": "Phía trước có rất nhiều người.",
        "tag": "Miêu tả"
      }
    ]
  },
  {
    "id": "hsk1-3-2",
    "hanzi": "什么",
    "traditional": "什麼",
    "pinyin": "shénme",
    "pinyinClean": "shenme",
    "hanViet": "THẬP MA",
    "radical": "亻",
    "strokeCount": 4,
    "hskLevel": 1,
    "lesson": 3,
    "partOfSpeech": "đại từ nghi vấn",
    "viet": "cái gì, gì",
    "vi_meaning_full": "đại từ dùng để hỏi sự vật, hiện tượng hoặc tên gọi",
    "vi_meaning_short": "cái gì, gì",
    "enMeaning": "what",
    "image": "https://images.pexels.com/photos/14997034/pexels-photo-14997034.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "什么人",
      "什么东西",
      "为什么"
    ],
    "compounds": [
      "干什么",
      "为什么"
    ],
    "synonyms": [
      "何"
    ],
    "antonyms": [],
    "confusableWords": "怎么",
    "sentences": [
      {
        "zh": "这是什么？",
        "pinyin": "Zhè shì shénme?",
        "vi": "Đây là cái gì?",
        "tag": "Hỏi đáp"
      },
      {
        "zh": "你想吃什么？",
        "pinyin": "Nǐ xiǎng chī shénme?",
        "vi": "Bạn muốn ăn gì?",
        "tag": "Nhu cầu"
      }
    ]
  },
  {
    "id": "hsk1-3-5",
    "hanzi": "是",
    "traditional": "是",
    "pinyin": "shì",
    "pinyinClean": "shi",
    "hanViet": "THỊ",
    "radical": "日",
    "strokeCount": 9,
    "hskLevel": 1,
    "lesson": 3,
    "partOfSpeech": "động từ hệ từ",
    "viet": "là, đúng",
    "vi_meaning_full": "động từ liên kết dùng để khẳng định sự ngang bằng, thuộc tính hoặc tồn tại",
    "vi_meaning_short": "là, đúng",
    "enMeaning": "to be (is, am, are)",
    "image": "https://images.pexels.com/photos/11412596/pexels-photo-11412596.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "我是",
      "是的",
      "不是"
    ],
    "compounds": [
      "是非",
      "是否"
    ],
    "synonyms": [
      "乃"
    ],
    "antonyms": [
      "非",
      "不"
    ],
    "confusableWords": "足, 旦",
    "sentences": [
      {
        "zh": "我是学生。",
        "pinyin": "Wǒ shì xuésheng.",
        "vi": "Tôi là học sinh.",
        "tag": "Giới thiệu"
      },
      {
        "zh": "这是你的书吗？是的。",
        "pinyin": "Zhè shì nǐ de shū ma? Shì de.",
        "vi": "Đây là sách của bạn à? Đúng vậy.",
        "tag": "Khẳng định"
      }
    ]
  },
  {
    "id": "hsk1-3-4",
    "hanzi": "我",
    "traditional": "我",
    "pinyin": "wǒ",
    "pinyinClean": "wo",
    "hanViet": "NGÃ",
    "radical": "戈",
    "strokeCount": 7,
    "hskLevel": 1,
    "lesson": 3,
    "partOfSpeech": "đại từ ngôi thứ 1",
    "viet": "tôi, tao, tớ, mình",
    "vi_meaning_full": "đại từ tự xưng chỉ bản thân người nói",
    "vi_meaning_short": "tôi, tao, tớ, mình",
    "enMeaning": "I, me",
    "image": "https://images.pexels.com/photos/16338177/pexels-photo-16338177.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "我和你",
      "我的",
      "我们"
    ],
    "compounds": [
      "我们",
      "我国"
    ],
    "synonyms": [
      "余",
      "吾"
    ],
    "antonyms": [
      "你",
      "他"
    ],
    "confusableWords": "找, 钱",
    "sentences": [
      {
        "zh": "我是中国人。",
        "pinyin": "Wǒ shì Zhōngguó rén.",
        "vi": "Tôi là người Trung Quốc.",
        "tag": "Giới thiệu"
      },
      {
        "zh": "我有两本书。",
        "pinyin": "Wǒ yǒu liǎng běn shū.",
        "vi": "Tôi có hai quyển sách.",
        "tag": "Sở hữu"
      }
    ]
  },
  {
    "id": "hsk1-3-8",
    "hanzi": "学生",
    "traditional": "學生",
    "pinyin": "xuésheng",
    "pinyinClean": "xuesheng",
    "hanViet": "HỌC SINH",
    "radical": "子",
    "strokeCount": 8,
    "hskLevel": 1,
    "lesson": 3,
    "partOfSpeech": "danh từ",
    "viet": "học sinh, sinh viên",
    "vi_meaning_full": "người đang theo học tại các trường học",
    "vi_meaning_short": "học sinh, sinh viên",
    "enMeaning": "student",
    "image": "https://images.pexels.com/photos/8199252/pexels-photo-8199252.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "小学生",
      "大学生"
    ],
    "compounds": [],
    "synonyms": [
      "子",
      "学",
      "生"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "我们都是学生。",
        "pinyin": "Wǒmen dōu shì xuésheng.",
        "vi": "Chúng tôi đều là học sinh.",
        "tag": "Giới thiệu"
      },
      {
        "zh": "学员",
        "pinyin": "老师",
        "vi": "学习, 学校",
        "tag": "先生"
      }
    ]
  },
  {
    "id": "hsk1-3-145",
    "hanzi": "中国",
    "traditional": "中國",
    "pinyin": "Zhōngguó",
    "pinyinClean": "zhongguo",
    "hanViet": "TRUNG QUỐC",
    "radical": "丨",
    "strokeCount": 4,
    "hskLevel": 1,
    "lesson": 3,
    "partOfSpeech": "danh từ riêng",
    "viet": "Trung Quốc",
    "vi_meaning_full": "nước Cộng hòa Nhân dân Trung Hoa",
    "vi_meaning_short": "Trung Quốc",
    "enMeaning": "China",
    "image": "https://images.pexels.com/photos/4445241/pexels-photo-4445241.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "去中国",
      "中国人",
      "中国菜"
    ],
    "compounds": [],
    "synonyms": [
      "丨",
      "囗",
      "国"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "我是中国人。",
        "pinyin": "Wǒ shì Zhōngguó rén.",
        "vi": "Tôi là người Trung Quốc.",
        "tag": "Quốc tịch"
      }
    ]
  },
  {
    "id": "hsk1-4-3",
    "hanzi": "的",
    "traditional": "的",
    "pinyin": "de",
    "pinyinClean": "de",
    "hanViet": "ĐÍCH",
    "radical": "白",
    "strokeCount": 8,
    "hskLevel": 1,
    "lesson": 4,
    "partOfSpeech": "trợ từ",
    "viet": "của, mà",
    "vi_meaning_full": "trợ từ kết cấu đứng sau định ngữ để chỉ quan sở hữu hoặc đặc điểm",
    "vi_meaning_short": "của, mà",
    "enMeaning": "possessive or descriptive particle",
    "image": "https://images.pexels.com/photos/10154712/pexels-photo-10154712.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "我的",
      "漂亮的",
      "好吃的"
    ],
    "compounds": [
      "目的",
      "的确"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "得, 地",
    "sentences": [
      {
        "zh": "这是我的书。",
        "pinyin": "Zhè shì wǒ de shū.",
        "vi": "Đây là sách của tôi.",
        "tag": "Sở hữu"
      },
      {
        "zh": "他是一个很好的人。",
        "pinyin": "Tā shì yí gè hěn hǎo de rén.",
        "vi": "Anh ấy là một người rất tốt.",
        "tag": "Miêu tả"
      }
    ]
  },
  {
    "id": "hsk1-4-6",
    "hanzi": "国",
    "traditional": "国",
    "pinyin": "guó",
    "pinyinClean": "guo",
    "hanViet": "QUỐC",
    "radical": "",
    "strokeCount": 0,
    "hskLevel": 1,
    "lesson": 4,
    "partOfSpeech": "",
    "viet": "nước, quốc gia",
    "enMeaning": "",
    "image": "https://images.pexels.com/photos/12367651/pexels-photo-12367651.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [],
    "compounds": [],
    "synonyms": [],
    "antonyms": [],
    "sentences": [],
    "vi_meaning_full": "nước, quốc gia",
    "vi_meaning_short": "nước, quốc gia"
  },
  {
    "id": "hsk1-4-4",
    "hanzi": "汉语",
    "traditional": "漢語",
    "pinyin": "Hànyǔ",
    "pinyinClean": "hanyu",
    "hanViet": "HÁN NGỮ",
    "radical": "氵",
    "strokeCount": 5,
    "hskLevel": 1,
    "lesson": 4,
    "partOfSpeech": "danh từ riêng",
    "viet": "tiếng Trung",
    "vi_meaning_full": "ngôn ngữ của dân tộc Hán, ngôn ngữ chính thức tại Trung Quốc",
    "vi_meaning_short": "tiếng Trung",
    "enMeaning": "Chinese language",
    "image": "https://images.pexels.com/photos/31069603/pexels-photo-31069603.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "学汉语",
      "说汉语",
      "汉语书"
    ],
    "compounds": [
      "汉字",
      "语言"
    ],
    "synonyms": [
      "中文"
    ],
    "antonyms": [],
    "confusableWords": "韩语",
    "sentences": [
      {
        "zh": "我会说汉语。",
        "pinyin": "Wǒ huì shuō Hànyǔ.",
        "vi": "Tôi biết nói tiếng Trung.",
        "tag": "Ngôn ngữ"
      },
      {
        "zh": "汉语难不难？",
        "pinyin": "Hànyǔ nán bù nán?",
        "vi": "Tiếng Trung có khó không?",
        "tag": "Học tập"
      }
    ]
  },
  {
    "id": "hsk1-4-5",
    "hanzi": "哪",
    "traditional": "哪",
    "pinyin": "nǎ",
    "pinyinClean": "na",
    "hanViet": "NẢ",
    "radical": "口",
    "strokeCount": 9,
    "hskLevel": 1,
    "lesson": 4,
    "partOfSpeech": "đại từ nghi vấn",
    "viet": "nào, cái nào",
    "vi_meaning_full": "đại từ dùng để hỏi lựa chọn chỉ định đối tượng nào trong số nhiều đối tượng",
    "vi_meaning_short": "nào, cái nào",
    "enMeaning": "which",
    "image": "https://images.pexels.com/photos/8617981/pexels-photo-8617981.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "哪国人",
      "哪本"
    ],
    "compounds": [
      "哪儿"
    ],
    "synonyms": [
      "何"
    ],
    "antonyms": [],
    "confusableWords": "那, 那儿",
    "sentences": [
      {
        "zh": "你是哪国人？",
        "pinyin": "Nǐ shì nǎ guó rén?",
        "vi": "Bạn là người nước nào?",
        "tag": "Hỏi đáp"
      },
      {
        "zh": "你想买哪本书？",
        "pinyin": "Nǐ xiǎng mǎi nǎ běn shū?",
        "vi": "Bạn muốn mua quyển sách nào?",
        "tag": "Mua sắm"
      }
    ]
  },
  {
    "id": "hsk1-4-7",
    "hanzi": "呢",
    "traditional": "呢",
    "pinyin": "ne",
    "pinyinClean": "ne",
    "hanViet": "NI",
    "radical": "口",
    "strokeCount": 8,
    "hskLevel": 1,
    "lesson": 4,
    "partOfSpeech": "trợ từ ngữ khí",
    "viet": "thì sao, đây",
    "vi_meaning_full": "trợ từ đứng cuối câu hỏi lược bỏ hoặc nhấn mạnh sự việc đang tiếp diễn",
    "vi_meaning_short": "thì sao, đây",
    "enMeaning": "modal particle for question or ongoing action",
    "image": "https://images.pexels.com/photos/14200836/pexels-photo-14200836.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "你呢",
      "在做什么呢"
    ],
    "compounds": [
      "呢喃"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "吗, 吧",
    "sentences": [
      {
        "zh": "我很好，你呢？",
        "pinyin": "Wǒ hěn hǎo, nǐ ne?",
        "vi": "Tôi rất khỏe, còn bạn thì sao?",
        "tag": "Trò chuyện"
      },
      {
        "zh": "他在看书呢。",
        "pinyin": "Tā zài kàn shū ne.",
        "vi": "Anh ấy đang đọc sách đấy.",
        "tag": "Trạng thái"
      }
    ]
  },
  {
    "id": "hsk1-4-10",
    "hanzi": "朋友",
    "traditional": "朋友",
    "pinyin": "péngyou",
    "pinyinClean": "pengyou",
    "hanViet": "BẰNG HỮU",
    "radical": "月",
    "strokeCount": 8,
    "hskLevel": 1,
    "lesson": 4,
    "partOfSpeech": "danh từ",
    "viet": "bạn bè, người bạn",
    "vi_meaning_full": "người có tình cảm thân thiết, hiểu biết lẫn nhau không thuộc quan hệ máu mủ",
    "vi_meaning_short": "bạn bè, người bạn",
    "enMeaning": "friend",
    "image": "https://images.pexels.com/photos/6705873/pexels-photo-6705873.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "好朋友",
      "中国朋友"
    ],
    "compounds": [
      "友好",
      "朋辈"
    ],
    "synonyms": [
      "友",
      "伙伴"
    ],
    "antonyms": [
      "敌人"
    ],
    "confusableWords": "膨, 朋",
    "sentences": [
      {
        "zh": "他是我的好朋友。",
        "pinyin": "Tā shì wǒ de hǎo péngyou.",
        "vi": "Anh ấy là bạn tốt của tôi.",
        "tag": "Quan hệ"
      },
      {
        "zh": "今天我和朋友去吃饭。",
        "pinyin": "Jīntiān wǒ hé péngyou qù chīfàn.",
        "vi": "Hôm nay tôi đi ăn với bạn.",
        "tag": "Cuộc sống"
      }
    ]
  },
  {
    "id": "hsk1-4-2",
    "hanzi": "谁",
    "traditional": "誰",
    "pinyin": "shéi",
    "pinyinClean": "shei",
    "hanViet": "THÙY",
    "radical": "讠",
    "strokeCount": 10,
    "hskLevel": 1,
    "lesson": 4,
    "partOfSpeech": "đại từ nghi vấn",
    "viet": "ai",
    "vi_meaning_full": "đại từ dùng để hỏi căn cước họ tên của người nào đó",
    "vi_meaning_short": "ai",
    "enMeaning": "who, whom",
    "image": "https://images.pexels.com/photos/5763066/pexels-photo-5763066.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "是谁",
      "谁的"
    ],
    "compounds": [
      "谁人"
    ],
    "synonyms": [
      "孰"
    ],
    "antonyms": [],
    "confusableWords": "准, 椎",
    "sentences": [
      {
        "zh": "他是谁？",
        "pinyin": "Tā shì shéi?",
        "vi": "Anh ấy là ai?",
        "tag": "Hỏi đáp"
      },
      {
        "zh": "这是谁的书？",
        "pinyin": "Zhè shì shéi de shū?",
        "vi": "Đây là sách của ai?",
        "tag": "Sở hữu"
      }
    ]
  },
  {
    "id": "hsk1-4-8",
    "hanzi": "他",
    "traditional": "他",
    "pinyin": "tā",
    "pinyinClean": "ta",
    "hanViet": "THA",
    "radical": "亻",
    "strokeCount": 5,
    "hskLevel": 1,
    "lesson": 4,
    "partOfSpeech": "đại từ ngôi thứ 3",
    "viet": "anh ấy, ông ấy",
    "vi_meaning_full": "đại từ xưng呼 chỉ người thuộc giới tính nam được nhắc tới",
    "vi_meaning_short": "anh ấy, ông ấy",
    "enMeaning": "he, him",
    "image": "https://images.pexels.com/photos/6265198/pexels-photo-6265198.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "他们",
      "他的",
      "他人"
    ],
    "compounds": [
      "他们",
      "他人"
    ],
    "synonyms": [],
    "antonyms": [
      "她"
    ],
    "confusableWords": "她, 它",
    "sentences": [
      {
        "zh": "他是我的老师。",
        "pinyin": "Tā shì wǒ de lǎoshī.",
        "vi": "Anh ấy là thầy giáo của tôi.",
        "tag": "Giới thiệu"
      },
      {
        "zh": "他去北京了。",
        "pinyin": "Tā qù Běijīng le.",
        "vi": "Anh ấy đi Bắc Kinh rồi.",
        "tag": "Hành động"
      }
    ]
  },
  {
    "id": "hsk1-4-1",
    "hanzi": "她",
    "traditional": "她",
    "pinyin": "tā",
    "pinyinClean": "ta",
    "hanViet": "THA",
    "radical": "女",
    "strokeCount": 6,
    "hskLevel": 1,
    "lesson": 4,
    "partOfSpeech": "đại từ ngôi thứ 3",
    "viet": "cô ấy, bà ấy",
    "vi_meaning_full": "đại từ xưng呼 chỉ người thuộc giới tính nữ được nhắc tới",
    "vi_meaning_short": "cô ấy, bà ấy",
    "enMeaning": "she, her",
    "image": "https://images.pexels.com/photos/874151/pexels-photo-874151.png?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "她们",
      "她的"
    ],
    "compounds": [
      "她们"
    ],
    "synonyms": [],
    "antonyms": [
      "他"
    ],
    "confusableWords": "他, 它",
    "sentences": [
      {
        "zh": "她是我的同学。",
        "pinyin": "Tā shì wǒ de tóngxué.",
        "vi": "Cô ấy là bạn học của tôi.",
        "tag": "Giới thiệu"
      },
      {
        "zh": "她很漂亮。",
        "pinyin": "Tā hěn piàoliang.",
        "vi": "Cô ấy rất xinh đẹp.",
        "tag": "Miêu tả"
      }
    ]
  },
  {
    "id": "hsk1-4-9",
    "hanzi": "同学",
    "traditional": "同學",
    "pinyin": "tóngxué",
    "pinyinClean": "tongxue",
    "hanViet": "ĐỒNG HỌC",
    "radical": "口",
    "strokeCount": 6,
    "hskLevel": 1,
    "lesson": 4,
    "partOfSpeech": "danh từ",
    "viet": "bạn học, bạn cùng lớp",
    "vi_meaning_full": "người cùng học chung một lớp, một trường học",
    "vi_meaning_short": "bạn học, bạn cùng lớp",
    "enMeaning": "classmate",
    "image": "https://images.pexels.com/photos/9489923/pexels-photo-9489923.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "老同学",
      "女同学"
    ],
    "compounds": [
      "同",
      "学习"
    ],
    "synonyms": [
      "校友"
    ],
    "antonyms": [],
    "confusableWords": "同事",
    "sentences": [
      {
        "zh": "他是我的同学。",
        "pinyin": "Tā shì wǒ de tóngxué.",
        "vi": "Anh ấy là bạn học của tôi.",
        "tag": "Giới thiệu"
      },
      {
        "zh": "同学们好！",
        "pinyin": "Tóngxuémen hǎo!",
        "vi": "Chào các em học sinh!",
        "tag": "Chào hỏi"
      }
    ]
  },
  {
    "id": "hsk1-5-2",
    "hanzi": "八",
    "traditional": "八",
    "pinyin": "bā",
    "pinyinClean": "ba",
    "hanViet": "BÁT",
    "radical": "八",
    "strokeCount": 2,
    "hskLevel": 1,
    "lesson": 5,
    "partOfSpeech": "số từ",
    "viet": "tám, số 8",
    "vi_meaning_full": "số tự nhiên đứng sau số bảy và đứng trước số chín trong hệ đếm",
    "vi_meaning_short": "tám, số 8",
    "enMeaning": "eight",
    "image": "https://images.unsplash.com/photo-1571664638276-b3e6b70499e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk2MTUyfDB8MXxzZWFyY2h8M3x8bnVtYmVyJTIwZWlnaHR8ZW58MHx8fHwxNzkxODI4OTgwfDA&ixlib=rb-4.1.0&q=80&w=400",
    "collocations": [
      "八个",
      "八点",
      "八月"
    ],
    "compounds": [
      "八月",
      "八角"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "入, 人",
    "sentences": [
      {
        "zh": "我有八个苹果。",
        "pinyin": "Wǒ yǒu bā gè píngguǒ.",
        "vi": "Tôi có tám quả táo.",
        "tag": "Số lượng"
      },
      {
        "zh": "现在是八点。",
        "pinyin": "Xiànzài shì bā diǎn.",
        "vi": "Bây giờ là tám giờ.",
        "tag": "Thời gian"
      }
    ]
  },
  {
    "id": "hsk1-5-10",
    "hanzi": "大",
    "traditional": "大",
    "pinyin": "dà",
    "pinyinClean": "da",
    "hanViet": "ĐẠI",
    "radical": "大",
    "strokeCount": 3,
    "hskLevel": 1,
    "lesson": 5,
    "partOfSpeech": "tính từ",
    "viet": "to, lớn",
    "vi_meaning_full": "có thể tích, diện tích, quy mô hoặc mức độ vượt trội so với bình thường",
    "vi_meaning_short": "to, lớn",
    "enMeaning": "big, large",
    "image": "https://images.pexels.com/photos/7983622/pexels-photo-7983622.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "很大",
      "大学",
      "大家"
    ],
    "compounds": [
      "大家",
      "大学",
      "大概"
    ],
    "synonyms": [
      "广",
      "巨"
    ],
    "antonyms": [
      "小"
    ],
    "confusableWords": "犬, 太",
    "sentences": [
      {
        "zh": "这个学校很大。",
        "pinyin": "Zhè gè xuéxiào hěn dà.",
        "vi": "Trường học này rất lớn.",
        "tag": "Miêu tả"
      },
      {
        "zh": "雨下得很大。",
        "pinyin": "Yǔ xià de hěn dà.",
        "vi": "Mưa rơi rất to.",
        "tag": "Thời tiết"
      }
    ]
  },
  {
    "id": "hsk1-5-9",
    "hanzi": "多",
    "traditional": "多",
    "pinyin": "duō",
    "pinyinClean": "duo",
    "hanViet": "ĐA",
    "radical": "夕",
    "strokeCount": 6,
    "hskLevel": 1,
    "lesson": 5,
    "partOfSpeech": "tính từ / phó từ",
    "viet": "nhiều, bao nhiêu",
    "vi_meaning_full": "có số lượng vượt trội hoặc dùng trong câu hỏi mức độ số lượng",
    "vi_meaning_short": "nhiều, bao nhiêu",
    "enMeaning": "many, much",
    "image": "https://images.pexels.com/photos/47040/meter-tape-measure-measure-gage-47040.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "很多",
      "多大",
      "多少"
    ],
    "compounds": [
      "多少",
      "多大"
    ],
    "synonyms": [
      "繁",
      "众"
    ],
    "antonyms": [
      "少"
    ],
    "confusableWords": "夕, 岁",
    "sentences": [
      {
        "zh": "这里有很多树。",
        "pinyin": "Zhèlǐ yǒu hěn duō shù.",
        "vi": "Ở đây có rất nhiều cây.",
        "tag": "Miêu tả"
      },
      {
        "zh": "你多大了？",
        "pinyin": "Nǐ duō dà le?",
        "vi": "Bạn bao nhiêu tuổi rồi?",
        "tag": "Hỏi thăm"
      }
    ]
  },
  {
    "id": "hsk1-5-27",
    "hanzi": "二",
    "traditional": "二",
    "pinyin": "èr",
    "pinyinClean": "er",
    "hanViet": "NHỊ",
    "radical": "二",
    "strokeCount": 2,
    "hskLevel": 1,
    "lesson": 5,
    "partOfSpeech": "số từ",
    "viet": "hai, số 2",
    "vi_meaning_full": "số tự nhiên đứng sau số một và đứng trước số ba trong hệ đếm",
    "vi_meaning_short": "hai, số 2",
    "enMeaning": "two",
    "image": "https://pixabay.com/get/g939f05af9f2b28bf44f53fed67910124379eb139bb740c2bf1e83fe46a963b21e61d46f8834f2a479f29f41e2d5916e0_640.jpg",
    "collocations": [
      "二月",
      "第二",
      "二十"
    ],
    "compounds": [
      "二十",
      "二月"
    ],
    "synonyms": [
      "两"
    ],
    "antonyms": [],
    "confusableWords": "一, 三",
    "sentences": [
      {
        "zh": "现在是二月。",
        "pinyin": "Xiànzài shì èr yuè.",
        "vi": "Bây giờ là tháng hai.",
        "tag": "Thời gian"
      },
      {
        "zh": "他是第二名。",
        "pinyin": "Tā shì dì-èr míng.",
        "vi": "Anh ấy xếp thứ hai.",
        "tag": "Thứ tự"
      }
    ]
  },
  {
    "id": "hsk1-5-5",
    "hanzi": "几",
    "traditional": "幾",
    "pinyin": "jǐ",
    "pinyinClean": "ji",
    "hanViet": "KỶ",
    "radical": "几",
    "strokeCount": 2,
    "hskLevel": 1,
    "lesson": 5,
    "partOfSpeech": "đại từ",
    "viet": "mấy, bao nhiêu",
    "vi_meaning_full": "đại từ nghi vấn dùng để hỏi số lượng nhỏ (thường dưới 10)",
    "vi_meaning_short": "mấy, bao nhiêu",
    "enMeaning": "how many, how much",
    "image": "https://images.pexels.com/photos/6325567/pexels-photo-6325567.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "几个人",
      "几点",
      "几天"
    ],
    "compounds": [
      "几个",
      "几何"
    ],
    "synonyms": [
      "多少"
    ],
    "antonyms": [],
    "confusableWords": "儿, 九",
    "sentences": [
      {
        "zh": "你家有几口人？",
        "pinyin": "Nǐ jiā yǒu jǐ kǒu rén?",
        "vi": "Nhà bạn có mấy người?",
        "tag": "Gia đình"
      },
      {
        "zh": "现在是几点？",
        "pinyin": "Xiànzài shì jǐ diǎn?",
        "vi": "Bây giờ là mấy giờ?",
        "tag": "Thời gian"
      }
    ]
  },
  {
    "id": "hsk1-5-1",
    "hanzi": "家",
    "traditional": "家",
    "pinyin": "jiā",
    "pinyinClean": "jia",
    "hanViet": "GIA",
    "radical": "宀",
    "strokeCount": 10,
    "hskLevel": 1,
    "lesson": 5,
    "partOfSpeech": "danh từ / lượng từ",
    "viet": "nhà, gia đình",
    "vi_meaning_full": "nơi gia đình cùng sinh sống hoặc lượng từ cho công ty, nhà hàng",
    "vi_meaning_short": "nhà, gia đình",
    "enMeaning": "family, home",
    "image": "https://images.pexels.com/photos/30348304/pexels-photo-30348304.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "回家",
      "我家",
      "一家公司"
    ],
    "compounds": [
      "国家",
      "家人",
      "大家"
    ],
    "synonyms": [
      "家庭"
    ],
    "antonyms": [],
    "confusableWords": "象, 嫁",
    "sentences": [
      {
        "zh": "欢迎来到我家。",
        "pinyin": "Huānyíng lái dào wǒ jiā.",
        "vi": "Chào mừng đến nhà tôi.",
        "tag": "Giao tiếp"
      },
      {
        "zh": "我家有四口人。",
        "pinyin": "Wǒ jiā yǒu sì kǒu rén.",
        "vi": "Nhà tôi có bốn người.",
        "tag": "Gia đình"
      }
    ]
  },
  {
    "id": "hsk1-5-8",
    "hanzi": "今年",
    "traditional": "今年",
    "pinyin": "jīnnián",
    "pinyinClean": "jinnian",
    "hanViet": "KIM NIÊN",
    "radical": "",
    "strokeCount": 0,
    "hskLevel": 1,
    "lesson": 5,
    "partOfSpeech": "",
    "viet": "năm nay",
    "enMeaning": "",
    "image": "https://images.pexels.com/photos/12921076/pexels-photo-12921076.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [],
    "compounds": [],
    "synonyms": [],
    "antonyms": [],
    "sentences": [],
    "vi_meaning_full": "năm nay",
    "vi_meaning_short": "năm nay"
  },
  {
    "id": "hsk1-5-47",
    "hanzi": "九",
    "traditional": "九",
    "pinyin": "jiǔ",
    "pinyinClean": "jiu",
    "hanViet": "CỬU",
    "radical": "乙",
    "strokeCount": 2,
    "hskLevel": 1,
    "lesson": 5,
    "partOfSpeech": "số từ",
    "viet": "chín, số 9",
    "vi_meaning_full": "số tự nhiên đứng sau số tám và đứng trước số mười trong hệ đếm",
    "vi_meaning_short": "chín, số 9",
    "enMeaning": "nine",
    "image": "https://images.unsplash.com/photo-1660684470385-2a062d528b08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk2MTUyfDB8MXxzZWFyY2h8MXx8bnVtYmVyJTIwbmluZXxlbnwwfHx8fDE3OTE4MjkwMDN8MA&ixlib=rb-4.1.0&q=80&w=400",
    "collocations": [
      "九个",
      "九点",
      "九月"
    ],
    "compounds": [
      "九月",
      "重九"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "几, 丸",
    "sentences": [
      {
        "zh": "我有九本书。",
        "pinyin": "Wǒ yǒu jiǔ běn shū.",
        "vi": "Tôi có chín quyển sách.",
        "tag": "Số lượng"
      },
      {
        "zh": "今天是九月一号。",
        "pinyin": "Jīntiān shì jiǔ yuè yī hào.",
        "vi": "Hôm nay là ngày 1 tháng 9.",
        "tag": "Thời gian"
      }
    ]
  },
  {
    "id": "hsk1-5-3",
    "hanzi": "口",
    "traditional": "口",
    "pinyin": "kǒu",
    "pinyinClean": "kou",
    "hanViet": "KHẨU",
    "radical": "",
    "strokeCount": 0,
    "hskLevel": 1,
    "lesson": 5,
    "partOfSpeech": "",
    "viet": "lượng từ chỉ người trong nhà",
    "enMeaning": "",
    "image": "https://images.pexels.com/photos/11956948/pexels-photo-11956948.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [],
    "compounds": [],
    "synonyms": [],
    "antonyms": [],
    "sentences": [],
    "vi_meaning_full": "lượng từ chỉ người trong nhà",
    "vi_meaning_short": "lượng từ chỉ người trong nhà"
  },
  {
    "id": "hsk1-5-7",
    "hanzi": "了",
    "traditional": "了",
    "pinyin": "le",
    "pinyinClean": "le",
    "hanViet": "LIỄU",
    "radical": "乛",
    "strokeCount": 2,
    "hskLevel": 1,
    "lesson": 5,
    "partOfSpeech": "trợ từ",
    "viet": "rồi, đã",
    "vi_meaning_full": "trợ từ động thái chỉ sự hoàn thành của hành động hoặc sự thay đổi trạng thái",
    "vi_meaning_short": "rồi, đã",
    "enMeaning": "completed action particle",
    "image": "https://images.pexels.com/photos/38028968/pexels-photo-38028968.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "太好了",
      "吃了",
      "来了"
    ],
    "compounds": [
      "了解",
      "为了"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "子, 才",
    "sentences": [
      {
        "zh": "我买了一本书。",
        "pinyin": "Wǒ mǎi le yì běn shū.",
        "vi": "Tôi đã mua một quyển sách.",
        "tag": "Nhật ký"
      },
      {
        "zh": "下雨了。",
        "pinyin": "Xià yǔ le.",
        "vi": "Mưa rồi.",
        "tag": "Thời tiết"
      }
    ]
  },
  {
    "id": "hsk1-5-58",
    "hanzi": "六",
    "traditional": "六",
    "pinyin": "liù",
    "pinyinClean": "liu",
    "hanViet": "LỤC",
    "radical": "八",
    "strokeCount": 4,
    "hskLevel": 1,
    "lesson": 5,
    "partOfSpeech": "số từ",
    "viet": "sáu, số 6",
    "vi_meaning_full": "số tự nhiên đứng sau số năm và đứng trước số bảy trong hệ đếm",
    "vi_meaning_short": "sáu, số 6",
    "enMeaning": "six",
    "image": "https://images.pexels.com/photos/10355568/pexels-photo-10355568.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "六个",
      "六点",
      "六月"
    ],
    "compounds": [
      "六月",
      "六边形"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "文, 立",
    "sentences": [
      {
        "zh": "我有六个苹果。",
        "pinyin": "Wǒ yǒu liù gè píngguǒ.",
        "vi": "Tôi có sáu quả táo.",
        "tag": "Số lượng"
      },
      {
        "zh": "今天是星期六。",
        "pinyin": "Jīntiān shì xīngqīliù.",
        "vi": "Hôm nay là thứ Bảy.",
        "tag": "Thời gian"
      }
    ]
  },
  {
    "id": "hsk1-5-4",
    "hanzi": "女儿",
    "traditional": "女兒",
    "pinyin": "nǚ'ér",
    "pinyinClean": "nuer",
    "hanViet": "NỮ NHI",
    "radical": "女",
    "strokeCount": 3,
    "hskLevel": 1,
    "lesson": 5,
    "partOfSpeech": "danh từ",
    "viet": "con gái",
    "vi_meaning_full": "người con thuộc giới tính nữ trong quan hệ gia đình",
    "vi_meaning_short": "con gái",
    "enMeaning": "daughter",
    "image": "https://images.pexels.com/photos/29650590/pexels-photo-29650590.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "小女儿",
      "我女儿"
    ],
    "compounds": [
      "女人",
      "女生"
    ],
    "synonyms": [],
    "antonyms": [
      "儿子"
    ],
    "confusableWords": "儿子",
    "sentences": [
      {
        "zh": "她有一个漂亮的女儿。",
        "pinyin": "Tā yǒu yí gè piàoliang de nǚ'ér.",
        "vi": "Cô ấy có một người con gái xinh đẹp.",
        "tag": "Gia đình"
      },
      {
        "zh": "我的女儿五岁了。",
        "pinyin": "Wǒ de nǚ'ér wǔ suì le.",
        "vi": "Con gái tôi năm tuổi rồi.",
        "tag": "Tuổi tác"
      }
    ]
  },
  {
    "id": "hsk1-5-80",
    "hanzi": "七",
    "traditional": "七",
    "pinyin": "qī",
    "pinyinClean": "qi",
    "hanViet": "THẤT",
    "radical": "一",
    "strokeCount": 2,
    "hskLevel": 1,
    "lesson": 5,
    "partOfSpeech": "số từ",
    "viet": "bảy, số 7",
    "vi_meaning_full": "số tự nhiên đứng sau số sáu và đứng trước số tám trong hệ đếm",
    "vi_meaning_short": "bảy, số 7",
    "enMeaning": "seven",
    "image": "https://images.unsplash.com/photo-1571577275698-54f36820ee9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk2MTUyfDB8MXxzZWFyY2h8MXx8bnVtYmVyJTIwc2V2ZW58ZW58MHx8fHwxNzkxODI4OTU5fDA&ixlib=rb-4.1.0&q=80&w=400",
    "collocations": [
      "七个",
      "七点",
      "七月"
    ],
    "compounds": [
      "七月",
      "七夕"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "匕, 十",
    "sentences": [
      {
        "zh": "我有七个苹果。",
        "pinyin": "Wǒ yǒu qī gè píngguǒ.",
        "vi": "Tôi có bảy quả táo.",
        "tag": "Số lượng"
      },
      {
        "zh": "今天是七月七号。",
        "pinyin": "Jīntiān shì qī yuè qī hào.",
        "vi": "Hôm nay là ngày 7 tháng 7.",
        "tag": "Thời gian"
      }
    ]
  },
  {
    "id": "hsk1-5-88",
    "hanzi": "三",
    "traditional": "三",
    "pinyin": "sān",
    "pinyinClean": "san",
    "hanViet": "TAM",
    "radical": "一",
    "strokeCount": 3,
    "hskLevel": 1,
    "lesson": 5,
    "partOfSpeech": "số từ",
    "viet": "ba, số 3",
    "vi_meaning_full": "số tự nhiên đứng sau số hai và đứng trước số bốn trong hệ đếm",
    "vi_meaning_short": "ba, số 3",
    "enMeaning": "three",
    "image": "https://images.pexels.com/photos/23319061/pexels-photo-23319061.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "三个",
      "三点",
      "三月"
    ],
    "compounds": [
      "三月",
      "三角形"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "二, 王",
    "sentences": [
      {
        "zh": "我家有三口人。",
        "pinyin": "Wǒ jiā yǒu sān kǒu rén.",
        "vi": "Nhà tôi có ba người.",
        "tag": "Gia đình"
      },
      {
        "zh": "今天三月三号。",
        "pinyin": "Jīntiān sān yuè sān hào.",
        "vi": "Hôm nay ngày 3 tháng 3.",
        "tag": "Thời gian"
      }
    ]
  },
  {
    "id": "hsk1-5-95",
    "hanzi": "十",
    "traditional": "十",
    "pinyin": "shí",
    "pinyinClean": "shi",
    "hanViet": "THẬP",
    "radical": "十",
    "strokeCount": 2,
    "hskLevel": 1,
    "lesson": 5,
    "partOfSpeech": "số từ",
    "viet": "mười, số 10",
    "vi_meaning_full": "số tự nhiên đứng sau số chín trong hệ đếm cơ số 10",
    "vi_meaning_short": "mười, số 10",
    "enMeaning": "ten",
    "image": "https://images.unsplash.com/photo-1631453494181-f762d692583a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk2MTUyfDB8MXxzZWFyY2h8Mnx8bnVtYmVyJTIwdGVufGVufDB8fHx8MTc5MTgyOTAyNHww&ixlib=rb-4.1.0&q=80&w=400",
    "collocations": [
      "十个",
      "十点",
      "十月"
    ],
    "compounds": [
      "十月",
      "十足"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "千, 干",
    "sentences": [
      {
        "zh": "我有十本书。",
        "pinyin": "Wǒ yǒu shí běn shū.",
        "vi": "Tôi có mười quyển sách.",
        "tag": "Số lượng"
      },
      {
        "zh": "现在是十点。",
        "pinyin": "Xiànzài shì shí diǎn.",
        "vi": "Bây giờ là mười giờ.",
        "tag": "Thời gian"
      }
    ]
  },
  {
    "id": "hsk1-5-104",
    "hanzi": "四",
    "traditional": "四",
    "pinyin": "sì",
    "pinyinClean": "si",
    "hanViet": "TỨ",
    "radical": "囗",
    "strokeCount": 5,
    "hskLevel": 1,
    "lesson": 5,
    "partOfSpeech": "số từ",
    "viet": "bốn, số 4",
    "vi_meaning_full": "số tự nhiên đứng sau số ba và đứng trước số năm trong hệ đếm",
    "vi_meaning_short": "bốn, số 4",
    "enMeaning": "four",
    "image": "https://images.unsplash.com/photo-1620645514399-2cd0fe1de8ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk2MTUyfDB8MXxzZWFyY2h8M3x8bnVtYmVyJTIwZm91cnxlbnwwfHx8fDE3OTE4Mjg4OTZ8MA&ixlib=rb-4.1.0&q=80&w=400",
    "collocations": [
      "四个",
      "四点",
      "四月"
    ],
    "compounds": [
      "四月",
      "四方"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "匹, 西",
    "sentences": [
      {
        "zh": "我有四个苹果。",
        "pinyin": "Wǒ yǒu sì gè píngguǒ.",
        "vi": "Tôi có bốn quả táo.",
        "tag": "Số lượng"
      },
      {
        "zh": "今天是四月四号。",
        "pinyin": "Jīntiān shì sì yuè sì hào.",
        "vi": "Hôm nay là ngày 4 tháng 4.",
        "tag": "Thời gian"
      }
    ]
  },
  {
    "id": "hsk1-5-6",
    "hanzi": "岁",
    "traditional": "歲",
    "pinyin": "suì",
    "pinyinClean": "sui",
    "hanViet": "TUẾ",
    "radical": "山",
    "strokeCount": 6,
    "hskLevel": 1,
    "lesson": 5,
    "partOfSpeech": "lượng từ",
    "viet": "tuổi",
    "vi_meaning_full": "lượng từ chỉ số tuổi tác của con người hoặc động vật",
    "vi_meaning_short": "tuổi",
    "enMeaning": "years old (age)",
    "image": "https://images.pexels.com/photos/7922008/pexels-photo-7922008.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "几岁",
      "二十岁"
    ],
    "compounds": [
      "岁数",
      "岁月"
    ],
    "synonyms": [
      "年龄"
    ],
    "antonyms": [],
    "confusableWords": "夕, 罗",
    "sentences": [
      {
        "zh": "你今年多大？我二十岁。",
        "pinyin": "Nǐ jīnnián duō dà? Wǒ èrshí suì.",
        "vi": "Năm nay bạn bao nhiêu tuổi? Tôi 20 tuổi.",
        "tag": "Tuổi tác"
      },
      {
        "zh": "我的儿子三岁了。",
        "pinyin": "Wǒ de érzi sān suì le.",
        "vi": "Con trai tôi 3 tuổi rồi.",
        "tag": "Gia đình"
      }
    ]
  },
  {
    "id": "hsk1-5-115",
    "hanzi": "五",
    "traditional": "五",
    "pinyin": "wǔ",
    "pinyinClean": "wu",
    "hanViet": "NGŨ",
    "radical": "二",
    "strokeCount": 4,
    "hskLevel": 1,
    "lesson": 5,
    "partOfSpeech": "số từ",
    "viet": "năm, số 5",
    "vi_meaning_full": "số tự nhiên đứng sau số bốn và đứng trước số sáu trong hệ đếm",
    "vi_meaning_short": "năm, số 5",
    "enMeaning": "five",
    "image": "https://images.unsplash.com/photo-1582731489394-51b65c9fcb04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk2MTUyfDB8MXxzZWFyY2h8Mnx8bnVtYmVyJTIwZml2ZXxlbnwwfHx8fDE3OTE4Mjg5MTZ8MA&ixlib=rb-4.1.0&q=80&w=400",
    "collocations": [
      "五个",
      "五点",
      "五月"
    ],
    "compounds": [
      "五月",
      "星期五"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "午, 丑",
    "sentences": [
      {
        "zh": "我有五个苹果。",
        "pinyin": "Wǒ yǒu wǔ gè píngguǒ.",
        "vi": "Tôi có năm quả táo.",
        "tag": "Số lượng"
      },
      {
        "zh": "现在是五点。",
        "pinyin": "Xiànzài shì wǔ diǎn.",
        "vi": "Bây giờ là năm giờ.",
        "tag": "Thời gian"
      }
    ]
  },
  {
    "id": "hsk1-5-132",
    "hanzi": "一",
    "traditional": "一",
    "pinyin": "yī",
    "pinyinClean": "yi",
    "hanViet": "NHẤT",
    "radical": "一",
    "strokeCount": 1,
    "hskLevel": 1,
    "lesson": 5,
    "partOfSpeech": "số từ",
    "viet": "một, số 1",
    "vi_meaning_full": "số tự nhiên đầu tiên trong hệ đếm cơ số 10",
    "vi_meaning_short": "một, số 1",
    "enMeaning": "one",
    "image": "https://pixabay.com/get/g29c3df3b26649aacd011f26aa7102ee34ab93e0f5c51bc34829b0cd72c8762492aeb569acd3ef4bf9b56b48ba03a28b038aac19320a5193e22f5dee991788941_640.jpg",
    "collocations": [
      "一个",
      "一点儿",
      "一起"
    ],
    "compounds": [],
    "synonyms": [
      "一"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "我有一个苹果。",
        "pinyin": "Wǒ yǒu yí gè píngguǒ.",
        "vi": "Tôi có một quả táo.",
        "tag": "Số lượng"
      },
      {
        "zh": "首",
        "pinyin": "",
        "vi": "第一, 一定",
        "tag": "乙"
      }
    ]
  },
  {
    "id": "hsk1-5-2",
    "hanzi": "有",
    "traditional": "有",
    "pinyin": "yǒu",
    "pinyinClean": "you",
    "hanViet": "HỮU",
    "radical": "月",
    "strokeCount": 6,
    "hskLevel": 1,
    "lesson": 5,
    "partOfSpeech": "động từ",
    "viet": "có, tồn tại",
    "vi_meaning_full": "biểu thị quan hệ sở hữu hoặc tồn tại sự vật",
    "vi_meaning_short": "có, tồn tại",
    "enMeaning": "to have, there is",
    "image": "https://images.pexels.com/photos/31743604/pexels-photo-31743604.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "有钱",
      "有人",
      "没有"
    ],
    "compounds": [],
    "synonyms": [
      "月",
      "有"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "我有一本书。",
        "pinyin": "Wǒ yǒu yì běn shū.",
        "vi": "Tôi có một quyển sách.",
        "tag": "Sở hữu"
      },
      {
        "zh": "存",
        "pinyin": "无, 没",
        "vi": "有名, 有趣",
        "tag": "友"
      }
    ]
  },
  {
    "id": "hsk1-6-4",
    "hanzi": "菜",
    "traditional": "菜",
    "pinyin": "cài",
    "pinyinClean": "cai",
    "hanViet": "THÁI",
    "radical": "艹",
    "strokeCount": 11,
    "hskLevel": 1,
    "lesson": 6,
    "partOfSpeech": "danh từ",
    "viet": "rau, món ăn",
    "vi_meaning_full": "chỉ các loại rau củ thực vật hoặc các món ăn được nấu chín",
    "vi_meaning_short": "rau, món ăn",
    "enMeaning": "dish, vegetable",
    "image": "https://images.pexels.com/photos/15597768/pexels-photo-15597768.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "中国菜",
      "做菜",
      "点菜"
    ],
    "compounds": [
      "白菜",
      "菜单",
      "炒菜"
    ],
    "synonyms": [
      "菜肴"
    ],
    "antonyms": [],
    "confusableWords": "采, 彩",
    "sentences": [
      {
        "zh": "我喜欢吃中国菜。",
        "pinyin": "Wǒ xǐhuan chī Zhōngguó cài.",
        "vi": "Tôi thích ăn món ăn Trung Quốc.",
        "tag": "Ẩm thực"
      },
      {
        "zh": "妈妈在做菜。",
        "pinyin": "Māma zài zuò cài.",
        "vi": "Mẹ đang nấu ăn.",
        "tag": "Hàng ngày"
      }
    ]
  },
  {
    "id": "hsk1-6-12",
    "hanzi": "读",
    "traditional": "讀",
    "pinyin": "dú",
    "pinyinClean": "du",
    "hanViet": "ĐỘC",
    "radical": "讠",
    "strokeCount": 10,
    "hskLevel": 1,
    "lesson": 6,
    "partOfSpeech": "động từ",
    "viet": "đọc, học",
    "vi_meaning_full": "phát âm thành tiếng các chữ viết hoặc đọc sách học tập",
    "vi_meaning_short": "đọc, học",
    "enMeaning": "to read, to study",
    "image": "https://images.pexels.com/photos/4170628/pexels-photo-4170628.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "读书",
      "读课文",
      "读字"
    ],
    "compounds": [
      "读者",
      "阅读"
    ],
    "synonyms": [
      "念"
    ],
    "antonyms": [],
    "confusableWords": "续, 卖",
    "sentences": [
      {
        "zh": "请跟我读。",
        "pinyin": "Qǐng gēn wǒ dú.",
        "vi": "Mời đọc theo tôi.",
        "tag": "Học tập"
      },
      {
        "zh": "他在房间里读书。",
        "pinyin": "Tā zài fángjiān lǐ dú shū.",
        "vi": "Anh ấy đang đọc sách trong phòng.",
        "tag": "Hàng ngày"
      }
    ]
  },
  {
    "id": "hsk1-6-9",
    "hanzi": "汉字",
    "traditional": "汉字",
    "pinyin": "Hànzì",
    "pinyinClean": "hanzi",
    "hanViet": "HÁN TỰ",
    "radical": "",
    "strokeCount": 0,
    "hskLevel": 1,
    "lesson": 6,
    "partOfSpeech": "",
    "viet": "chữ Hán",
    "enMeaning": "",
    "image": "https://images.pexels.com/photos/31069603/pexels-photo-31069603.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [],
    "compounds": [],
    "synonyms": [],
    "antonyms": [],
    "sentences": [],
    "vi_meaning_full": "chữ Hán",
    "vi_meaning_short": "chữ Hán"
  },
  {
    "id": "hsk1-6-5",
    "hanzi": "很",
    "traditional": "很",
    "pinyin": "hěn",
    "pinyinClean": "hen",
    "hanViet": "HẨN",
    "radical": "彳",
    "strokeCount": 9,
    "hskLevel": 1,
    "lesson": 6,
    "partOfSpeech": "phó từ",
    "viet": "rất, lắm",
    "vi_meaning_full": "phó từ chỉ mức độ cao đứng trước tính từ hoặc động từ tâm lý",
    "vi_meaning_short": "rất, lắm",
    "enMeaning": "very, quite",
    "image": "https://images.pexels.com/photos/16869444/pexels-photo-16869444.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "很好",
      "很大",
      "很喜欢"
    ],
    "compounds": [
      "很棒"
    ],
    "synonyms": [
      "非常",
      "十分"
    ],
    "antonyms": [
      "不"
    ],
    "confusableWords": "恨, 行",
    "sentences": [
      {
        "zh": "今天天气很好。",
        "pinyin": "Jīntiān tiānqì hěn hǎo.",
        "vi": "Hôm nay thời tiết rất tốt.",
        "tag": "Miêu tả"
      },
      {
        "zh": "我很高兴。",
        "pinyin": "Wǒ hěn gāoxìng.",
        "vi": "Tôi rất vui.",
        "tag": "Tâm trạng"
      }
    ]
  },
  {
    "id": "hsk1-6-1",
    "hanzi": "会",
    "traditional": "會",
    "pinyin": "huì",
    "pinyinClean": "hui",
    "hanViet": "HỘI",
    "radical": "人",
    "strokeCount": 6,
    "hskLevel": 1,
    "lesson": 6,
    "partOfSpeech": "động từ năng nguyện",
    "viet": "biết, sẽ",
    "vi_meaning_full": "chỉ khả năng có được qua học tập hoặc khả năng sự việc xảy ra",
    "vi_meaning_short": "biết, sẽ",
    "enMeaning": "can, to be able to, will",
    "image": "https://images.pexels.com/photos/32098834/pexels-photo-32098834.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "学会",
      "会说",
      "会开会"
    ],
    "compounds": [
      "开会",
      "会议",
      "会员"
    ],
    "synonyms": [
      "能",
      "可以"
    ],
    "antonyms": [
      "不会"
    ],
    "confusableWords": "绘, 运",
    "sentences": [
      {
        "zh": "我会说汉语。",
        "pinyin": "Wǒ huì shuō Hànyǔ.",
        "vi": "Tôi biết nói tiếng Trung.",
        "tag": "Kỹ năng"
      },
      {
        "zh": "明天会下雨吗？",
        "pinyin": "Míngtiān huì xià yǔ ma?",
        "vi": "Ngày mai có mưa không?",
        "tag": "Dự báo"
      }
    ]
  },
  {
    "id": "hsk1-6-3",
    "hanzi": "妈妈",
    "traditional": "媽媽",
    "pinyin": "māma",
    "pinyinClean": "mama",
    "hanViet": "MÃ MÃ",
    "radical": "女",
    "strokeCount": 6,
    "hskLevel": 1,
    "lesson": 6,
    "partOfSpeech": "danh từ",
    "viet": "mẹ, má",
    "vi_meaning_full": "từ xưng呼 hoặc gọi người mẹ, bậc sinh thành nữ giới trong gia đình",
    "vi_meaning_short": "mẹ, má",
    "enMeaning": "mother, mom",
    "image": "https://images.pexels.com/photos/18689091/pexels-photo-18689091.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "我妈妈",
      "妈妈做饭"
    ],
    "compounds": [
      "妈"
    ],
    "synonyms": [
      "母亲"
    ],
    "antonyms": [
      "爸爸"
    ],
    "confusableWords": "麻麻, 骂",
    "sentences": [
      {
        "zh": "我妈妈是老师。",
        "pinyin": "Wǒ māma shì lǎoshī.",
        "vi": "Mẹ tôi là giáo viên.",
        "tag": "Gia đình"
      },
      {
        "zh": "妈妈，我爱你。",
        "pinyin": "Māma, wǒ ài nǐ.",
        "vi": "Mẹ ơi, con yêu mẹ.",
        "tag": "Bày tỏ"
      }
    ]
  },
  {
    "id": "hsk1-6-2",
    "hanzi": "说",
    "traditional": "說",
    "pinyin": "shuō",
    "pinyinClean": "shuo",
    "hanViet": "THUYẾT",
    "radical": "讠",
    "strokeCount": 9,
    "hskLevel": 1,
    "lesson": 6,
    "partOfSpeech": "động từ",
    "viet": "nói",
    "vi_meaning_full": "phát âm thành tiếng các chữ viết để truyền đạt ý nghĩ",
    "vi_meaning_short": "nói",
    "enMeaning": "to speak, to say",
    "image": "https://images.pexels.com/photos/6201175/pexels-photo-6201175.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "说话",
      "说汉语",
      "说话人"
    ],
    "compounds": [
      "说话",
      "说明",
      "小说"
    ],
    "synonyms": [
      "讲",
      "谈"
    ],
    "antonyms": [
      "听"
    ],
    "confusableWords": "悦, 脱",
    "sentences": [
      {
        "zh": "请再说一遍。",
        "pinyin": "Qǐng zài shuō yí biàn.",
        "vi": "Xin hãy nói lại một lần.",
        "tag": "Yêu cầu"
      },
      {
        "zh": "你会说汉语吗？",
        "pinyin": "Nǐ huì shuō Hànyǔ ma?",
        "vi": "Bạn biết nói tiếng Trung không?",
        "tag": "Giao tiếp"
      }
    ]
  },
  {
    "id": "hsk1-6-8",
    "hanzi": "写",
    "traditional": "寫",
    "pinyin": "xiě",
    "pinyinClean": "xie",
    "hanViet": "TẢ",
    "radical": "冖",
    "strokeCount": 5,
    "hskLevel": 1,
    "lesson": 6,
    "partOfSpeech": "động từ",
    "viet": "viết",
    "vi_meaning_full": "dùng bút ghi lại ký tự chữ viết lên giấy hoặc vật mang tin",
    "vi_meaning_short": "viết",
    "enMeaning": "to write",
    "image": "https://images.pexels.com/photos/16282318/pexels-photo-16282318.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "写字",
      "写信",
      "写作业"
    ],
    "compounds": [],
    "synonyms": [
      "冖",
      "写"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "你在写什么？",
        "pinyin": "Nǐ zài xiě shénme?",
        "vi": "Bạn đang viết gì đấy?",
        "tag": "Hỏi thăm"
      },
      {
        "zh": "书写",
        "pinyin": "",
        "vi": "写字, 听写",
        "tag": "与, 军"
      }
    ]
  },
  {
    "id": "hsk1-6-11",
    "hanzi": "怎么",
    "traditional": "怎麼",
    "pinyin": "zěnme",
    "pinyinClean": "zenme",
    "hanViet": "CHẨM MA",
    "radical": "心",
    "strokeCount": 9,
    "hskLevel": 1,
    "lesson": 6,
    "partOfSpeech": "đại từ nghi vấn",
    "viet": "thế nào, làm sao",
    "vi_meaning_full": "hỏi cách thức thực hiện hành động hoặc nguyên nhân",
    "vi_meaning_short": "thế nào, làm sao",
    "enMeaning": "how, why",
    "image": "https://images.pexels.com/photos/35923029/pexels-photo-35923029.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "怎么走",
      "怎么写"
    ],
    "compounds": [],
    "synonyms": [
      "心",
      "么"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "这个字怎么写？",
        "pinyin": "Zhè gè zì zěnme xiě?",
        "vi": "Chữ này viết thế nào?",
        "tag": "Hỏi cách thức"
      },
      {
        "zh": "如何",
        "pinyin": "",
        "vi": "怎么样",
        "tag": "什么"
      }
    ]
  },
  {
    "id": "hsk1-6-10",
    "hanzi": "字",
    "traditional": "字",
    "pinyin": "zì",
    "pinyinClean": "zi",
    "hanViet": "TỰ",
    "radical": "宀",
    "strokeCount": 6,
    "hskLevel": 1,
    "lesson": 6,
    "partOfSpeech": "danh từ",
    "viet": "chữ, ký tự",
    "vi_meaning_full": "ký tự văn tự viết",
    "vi_meaning_short": "chữ, ký tự",
    "enMeaning": "character, word",
    "image": "https://images.pexels.com/photos/34935972/pexels-photo-34935972.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "写字",
      "汉字"
    ],
    "compounds": [],
    "synonyms": [
      "宀",
      "子",
      "字"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "这个字怎么读？",
        "pinyin": "Zhè gè zì zěnme dú?",
        "vi": "Chữ này đọc thế nào?",
        "tag": "Học tập"
      },
      {
        "zh": "文字",
        "pinyin": "",
        "vi": "汉字, 名字",
        "tag": "子"
      }
    ]
  },
  {
    "id": "hsk1-6-7",
    "hanzi": "做",
    "traditional": "做",
    "pinyin": "zuò",
    "pinyinClean": "zuo",
    "hanViet": "TỐ",
    "radical": "亻",
    "strokeCount": 11,
    "hskLevel": 1,
    "lesson": 6,
    "partOfSpeech": "động từ",
    "viet": "làm, chế biến",
    "vi_meaning_full": "thực hiện hành động, chế biến món ăn hoặc làm nghề nghiệp",
    "vi_meaning_short": "làm, chế biến",
    "enMeaning": "to do, to make",
    "image": "https://images.pexels.com/photos/30795870/pexels-photo-30795870.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "做饭",
      "做菜",
      "做工作"
    ],
    "compounds": [],
    "synonyms": [
      "亻",
      "故",
      "做"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "你在做什么？",
        "pinyin": "Nǐ zài zuò shénme?",
        "vi": "Bạn đang làm gì đấy?",
        "tag": "Hỏi thăm"
      },
      {
        "zh": "作, 干",
        "pinyin": "",
        "vi": "做饭, 做人",
        "tag": "坐, 座"
      }
    ]
  },
  {
    "id": "hsk1-7-4",
    "hanzi": "号",
    "traditional": "號",
    "pinyin": "hào",
    "pinyinClean": "hao",
    "hanViet": "HẠO / HIỆU",
    "radical": "口",
    "strokeCount": 5,
    "hskLevel": 1,
    "lesson": 7,
    "partOfSpeech": "danh từ / lượng từ",
    "viet": "ngày, số",
    "vi_meaning_full": "chỉ ngày trong tháng, số nhà, số điện thoại hoặc kích cỡ",
    "vi_meaning_short": "ngày, số",
    "enMeaning": "number, date of month",
    "image": "https://images.pexels.com/photos/5504162/pexels-photo-5504162.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "几号",
      "五号",
      "电话号码"
    ],
    "compounds": [
      "号码",
      "括号"
    ],
    "synonyms": [
      "日"
    ],
    "antonyms": [],
    "confusableWords": "好",
    "sentences": [
      {
        "zh": "今天是几月几号？",
        "pinyin": "Jīntiān shì jǐ yuè jǐ hào?",
        "vi": "Hôm nay là tháng mấy ngày mấy?",
        "tag": "Thời gian"
      },
      {
        "zh": "我是五号。",
        "pinyin": "Wǒ shì wǔ hào.",
        "vi": "Tôi là số 5.",
        "tag": "Thứ tự"
      }
    ]
  },
  {
    "id": "hsk1-7-3",
    "hanzi": "今天",
    "traditional": "今天",
    "pinyin": "jīntiān",
    "pinyinClean": "jintian",
    "hanViet": "KIM THIÊN",
    "radical": "人",
    "strokeCount": 4,
    "hskLevel": 1,
    "lesson": 7,
    "partOfSpeech": "danh từ thời gian",
    "viet": "hôm nay",
    "vi_meaning_full": "ngày hiện tại đang diễn ra trong khoảng thời gian 24 giờ",
    "vi_meaning_short": "hôm nay",
    "enMeaning": "today",
    "image": "https://images.pexels.com/photos/15644350/pexels-photo-15644350.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "今天是",
      "今天晚上"
    ],
    "compounds": [
      "今年",
      "今后"
    ],
    "synonyms": [
      "本日"
    ],
    "antonyms": [
      "昨天",
      "明天"
    ],
    "confusableWords": "明天, 昨天",
    "sentences": [
      {
        "zh": "今天是星期一。",
        "pinyin": "Jīntiān shì xīngqīyī.",
        "vi": "Hôm nay là thứ hai.",
        "tag": "Thời gian"
      },
      {
        "zh": "今天天气很好。",
        "pinyin": "Jīntiān tiānqì hěn hǎo.",
        "vi": "Hôm nay thời tiết rất tốt.",
        "tag": "Thời tiết"
      }
    ]
  },
  {
    "id": "hsk1-7-11",
    "hanzi": "看",
    "traditional": "看",
    "pinyin": "kàn",
    "pinyinClean": "kan",
    "hanViet": "KHÁN",
    "radical": "目",
    "strokeCount": 9,
    "hskLevel": 1,
    "lesson": 7,
    "partOfSpeech": "động từ",
    "viet": "nhìn, xem, đọc",
    "vi_meaning_full": "dùng mắt để quan sát, đọc sách hoặc ghé thăm ai đó",
    "vi_meaning_short": "nhìn, xem, đọc",
    "enMeaning": "to look, to see, to read",
    "image": "https://images.pexels.com/photos/38364311/pexels-photo-38364311.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "看书",
      "看电视",
      "看医生"
    ],
    "compounds": [
      "看见",
      "好看",
      "看病"
    ],
    "synonyms": [
      "视",
      "观"
    ],
    "antonyms": [],
    "confusableWords": "着, 刊",
    "sentences": [
      {
        "zh": "你在看什么？",
        "pinyin": "Nǐ zài kàn shénme?",
        "vi": "Bạn đang xem gì đấy?",
        "tag": "Hỏi thăm"
      },
      {
        "zh": "我喜欢看书。",
        "pinyin": "Wǒ xǐhuan kàn shū.",
        "vi": "Tôi thích đọc sách.",
        "tag": "Sở thích"
      }
    ]
  },
  {
    "id": "hsk1-7-8",
    "hanzi": "明天",
    "traditional": "明天",
    "pinyin": "míngtiān",
    "pinyinClean": "mingtian",
    "hanViet": "MINH THIÊN",
    "radical": "日",
    "strokeCount": 8,
    "hskLevel": 1,
    "lesson": 7,
    "partOfSpeech": "danh từ thời gian",
    "viet": "ngày mai",
    "vi_meaning_full": "ngày tiếp theo ngay sau ngày hôm nay",
    "vi_meaning_short": "ngày mai",
    "enMeaning": "tomorrow",
    "image": "https://images.pexels.com/photos/15644350/pexels-photo-15644350.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "明天见",
      "明天上午"
    ],
    "compounds": [
      "明白",
      "明年"
    ],
    "synonyms": [
      "明日"
    ],
    "antonyms": [
      "昨天"
    ],
    "confusableWords": "今天, 昨天",
    "sentences": [
      {
        "zh": "明天见！",
        "pinyin": "Míngtiān jiàn!",
        "vi": "Hẹn gặp lại ngày mai!",
        "tag": "Chào tạm biệt"
      },
      {
        "zh": "明天我们要去北京。",
        "pinyin": "Míngtiān wǒmen yào qù Běijīng.",
        "vi": "Ngày mai chúng tôi sẽ đi Bắc Kinh.",
        "tag": "Kế hoạch"
      }
    ]
  },
  {
    "id": "hsk1-7-1",
    "hanzi": "请",
    "traditional": "請",
    "pinyin": "qǐng",
    "pinyinClean": "qing",
    "hanViet": "THỈNH",
    "radical": "讠",
    "strokeCount": 10,
    "hskLevel": 1,
    "lesson": 7,
    "partOfSpeech": "động từ",
    "viet": "mời, xin",
    "vi_meaning_full": "từ biểu thị sự lịch sự khi nhờ vả, rủ rê hoặc mời ai đó làm gì",
    "vi_meaning_short": "mời, xin",
    "enMeaning": "please, to invite",
    "image": "https://images.pexels.com/photos/8832724/pexels-photo-8832724.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "请进",
      "请坐",
      "请问"
    ],
    "compounds": [
      "请问",
      "请假",
      "请客"
    ],
    "synonyms": [
      "邀"
    ],
    "antonyms": [],
    "confusableWords": "情, 清",
    "sentences": [
      {
        "zh": "请坐！请喝茶。",
        "pinyin": "Qǐng zuò! Qǐng hē chá.",
        "vi": "Mời ngồi! Mời uống trà.",
        "tag": "Lịch sự"
      },
      {
        "zh": "我想请你吃饭。",
        "pinyin": "Wǒ xiǎng qǐng nǐ chīfàn.",
        "vi": "Tôi muốn mời bạn ăn cơm.",
        "tag": "Rủ rê"
      }
    ]
  },
  {
    "id": "hsk1-7-9",
    "hanzi": "去",
    "traditional": "去",
    "pinyin": "qù",
    "pinyinClean": "qu",
    "hanViet": "KHỨ",
    "radical": "厶",
    "strokeCount": 5,
    "hskLevel": 1,
    "lesson": 7,
    "partOfSpeech": "động từ",
    "viet": "đi, đến",
    "vi_meaning_full": "hành động di chuyển rời khỏi vị trí hiện tại đến nơi khác",
    "vi_meaning_short": "đi, đến",
    "enMeaning": "to go",
    "image": "https://images.pexels.com/photos/33745067/pexels-photo-33745067.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "去学校",
      "去北京",
      "出去"
    ],
    "compounds": [
      "去年",
      "去处"
    ],
    "synonyms": [
      "往"
    ],
    "antonyms": [
      "来"
    ],
    "confusableWords": "云, 丢",
    "sentences": [
      {
        "zh": "你要去哪儿？",
        "pinyin": "Nǐ yào qù nǎr?",
        "vi": "Bạn muốn đi đâu?",
        "tag": "Hỏi thăm"
      },
      {
        "zh": "我们去吃饭吧。",
        "pinyin": "Wǒmen qù chīfàn ba.",
        "vi": "Chúng ta đi ăn cơm đi.",
        "tag": "Rủ rê"
      }
    ]
  },
  {
    "id": "hsk1-7-12",
    "hanzi": "书",
    "traditional": "書",
    "pinyin": "shū",
    "pinyinClean": "shu",
    "hanViet": "THƯ",
    "radical": "乛",
    "strokeCount": 4,
    "hskLevel": 1,
    "lesson": 7,
    "partOfSpeech": "danh từ",
    "viet": "sách",
    "vi_meaning_full": "tập hợp nhiều trang giấy in chữ hoặc hình ảnh đóng lại thành tập",
    "vi_meaning_short": "sách",
    "enMeaning": "book",
    "image": "https://images.pexels.com/photos/8145576/pexels-photo-8145576.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "看书",
      "一本书",
      "买书"
    ],
    "compounds": [
      "书法",
      "书店",
      "书包"
    ],
    "synonyms": [
      "书籍"
    ],
    "antonyms": [],
    "confusableWords": "书法, 予",
    "sentences": [
      {
        "zh": "桌子上有一本书。",
        "pinyin": "Zhuōzi shang yǒu yì běn shū.",
        "vi": "Trên bàn có một quyển sách.",
        "tag": "Học tập"
      },
      {
        "zh": "我喜欢看书。",
        "pinyin": "Wǒ xǐhuan kàn shū.",
        "vi": "Tôi thích đọc sách.",
        "tag": "Sở thích"
      }
    ]
  },
  {
    "id": "hsk1-7-6",
    "hanzi": "星期",
    "traditional": "星期",
    "pinyin": "xīngqī",
    "pinyinClean": "xingqi",
    "hanViet": "TINH KỲ",
    "radical": "日",
    "strokeCount": 9,
    "hskLevel": 1,
    "lesson": 7,
    "partOfSpeech": "danh từ thời gian",
    "viet": "tuần, thứ",
    "vi_meaning_full": "chu kỳ thời gian 7 ngày trong tuần",
    "vi_meaning_short": "tuần, thứ",
    "enMeaning": "week",
    "image": "https://images.pexels.com/photos/5946167/pexels-photo-5946167.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "星期一",
      "星期天",
      "这个星期"
    ],
    "compounds": [],
    "synonyms": [
      "日",
      "月",
      "星期"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "今天是星期几？",
        "pinyin": "Jīntiān shì xīngqī jǐ?",
        "vi": "Hôm nay là thứ mấy?",
        "tag": "Thời gian"
      },
      {
        "zh": "周",
        "pinyin": "",
        "vi": "星期日, 星期天",
        "tag": "星星"
      }
    ]
  },
  {
    "id": "hsk1-7-10",
    "hanzi": "学校",
    "traditional": "學校",
    "pinyin": "xuéxiào",
    "pinyinClean": "xuexiao",
    "hanViet": "HỌC HIỆU",
    "radical": "木",
    "strokeCount": 10,
    "hskLevel": 1,
    "lesson": 7,
    "partOfSpeech": "danh từ",
    "viet": "trường học",
    "vi_meaning_full": "cơ sở chuyên thực hiện việc dạy và học",
    "vi_meaning_short": "trường học",
    "enMeaning": "school",
    "image": "https://images.pexels.com/photos/2676888/pexels-photo-2676888.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "去学校",
      "我们学校"
    ],
    "compounds": [],
    "synonyms": [
      "木",
      "学",
      "校"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "我们的学校很大。",
        "pinyin": "Wǒmen de xuéxiào hěn dà.",
        "vi": "Trường học của chúng tôi rất lớn.",
        "tag": "Miêu tả"
      },
      {
        "zh": "学堂",
        "pinyin": "",
        "vi": "校长, 校友",
        "tag": "校对"
      }
    ]
  },
  {
    "id": "hsk1-7-5",
    "hanzi": "月",
    "traditional": "月",
    "pinyin": "yuè",
    "pinyinClean": "yue",
    "hanViet": "NGUYỆT",
    "radical": "月",
    "strokeCount": 4,
    "hskLevel": 1,
    "lesson": 7,
    "partOfSpeech": "danh từ",
    "viet": "tháng, Mặt Trăng",
    "vi_meaning_full": "Mặt Trăng hoặc đơn vị thời gian tháng",
    "vi_meaning_short": "tháng, Mặt Trăng",
    "enMeaning": "month, moon",
    "image": "https://images.pexels.com/photos/30257856/pexels-photo-30257856.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "一月",
      "几月几号"
    ],
    "compounds": [],
    "synonyms": [
      "月"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "今天是九月一号。",
        "pinyin": "Jīntiān shì jiǔ yuè yī hào.",
        "vi": "Hôm nay là 1 tháng 9.",
        "tag": "Thời gian"
      }
    ]
  },
  {
    "id": "hsk1-7-7",
    "hanzi": "昨天",
    "traditional": "昨天",
    "pinyin": "zuótiān",
    "pinyinClean": "zuotian",
    "hanViet": "TẠC THIÊN",
    "radical": "日",
    "strokeCount": 9,
    "hskLevel": 1,
    "lesson": 7,
    "partOfSpeech": "danh từ thời gian",
    "viet": "hôm qua",
    "vi_meaning_full": "ngày liền trước ngày hôm nay",
    "vi_meaning_short": "hôm qua",
    "enMeaning": "yesterday",
    "image": "https://images.pexels.com/photos/5740996/pexels-photo-5740996.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "昨天晚上",
      "昨天下午"
    ],
    "compounds": [],
    "synonyms": [
      "日",
      "昨",
      "天"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "昨天我去商店了。",
        "pinyin": "Zuótiān wǒ qù shāngdiàn le.",
        "vi": "Hôm qua tôi đã đi cửa hàng.",
        "tag": "Thời gian"
      },
      {
        "zh": "昨日",
        "pinyin": "明天",
        "vi": "昨, 天",
        "tag": "今天, 明天"
      }
    ]
  },
  {
    "id": "hsk1-8-10",
    "hanzi": "杯子",
    "traditional": "杯子",
    "pinyin": "bēizi",
    "pinyinClean": "beizi",
    "hanViet": "BÔI TỬ",
    "radical": "木",
    "strokeCount": 8,
    "hskLevel": 1,
    "lesson": 8,
    "partOfSpeech": "danh từ",
    "viet": "cái cốc, cái ly",
    "vi_meaning_full": "đồ dùng có lòng sâu dùng để chứa đựng nước uống hoặc dung dịch",
    "vi_meaning_short": "cái cốc, cái ly",
    "enMeaning": "cup, glass",
    "image": "https://images.pexels.com/photos/9000378/pexels-photo-9000378.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "一个杯子",
      "水杯",
      "茶杯"
    ],
    "compounds": [
      "水杯",
      "茶杯"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "包子, 柜子",
    "sentences": [
      {
        "zh": "桌子上有一个杯子。",
        "pinyin": "Zhuōzi shang yǒu yí gè bēizi.",
        "vi": "Trên bàn có một cái cốc.",
        "tag": "Đồ vật"
      },
      {
        "zh": "这个杯子很漂亮。",
        "pinyin": "Zhè gè bēizi hěn piàoliang.",
        "vi": "Cái cốc này rất đẹp.",
        "tag": "Khen ngợi"
      }
    ]
  },
  {
    "id": "hsk1-8-3",
    "hanzi": "茶",
    "traditional": "茶",
    "pinyin": "chá",
    "pinyinClean": "cha",
    "hanViet": "TRÀ",
    "radical": "艹",
    "strokeCount": 9,
    "hskLevel": 1,
    "lesson": 8,
    "partOfSpeech": "danh từ",
    "viet": "trà, chè",
    "vi_meaning_full": "thức uống pha chế bằng nước nóng với lá chè khô",
    "vi_meaning_short": "trà, chè",
    "enMeaning": "tea",
    "image": "https://images.pexels.com/photos/30742323/pexels-photo-30742323.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "喝茶",
      "绿茶",
      "茶水"
    ],
    "compounds": [
      "茶叶",
      "茶馆",
      "茶杯"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "查, 察",
    "sentences": [
      {
        "zh": "请喝茶。",
        "pinyin": "Qǐng hē chá.",
        "vi": "Mời uống trà.",
        "tag": "Mời khách"
      },
      {
        "zh": "爸爸很喜欢喝茶。",
        "pinyin": "Bàba hěn xǐhuan hē chá.",
        "vi": "Bố rất thích uống trà.",
        "tag": "Sở thích"
      }
    ]
  },
  {
    "id": "hsk1-8-4",
    "hanzi": "吃",
    "traditional": "吃",
    "pinyin": "chī",
    "pinyinClean": "chi",
    "hanViet": "CẬT",
    "radical": "口",
    "strokeCount": 6,
    "hskLevel": 1,
    "lesson": 8,
    "partOfSpeech": "động từ",
    "viet": "ăn",
    "vi_meaning_full": "hành động đưa thức ăn vào miệng, nhai và nuốt",
    "vi_meaning_short": "ăn",
    "enMeaning": "to eat",
    "image": "https://images.pexels.com/photos/13518954/pexels-photo-13518954.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "吃饭",
      "吃菜",
      "吃苹果"
    ],
    "compounds": [
      "小吃",
      "吃饭"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "汽, 乞",
    "sentences": [
      {
        "zh": "请吃米饭。",
        "pinyin": "Qǐng chī mǐfàn.",
        "vi": "Mời ăn cơm.",
        "tag": "Ăn uống"
      },
      {
        "zh": "你想吃什么？",
        "pinyin": "Nǐ xiǎng chī shénme?",
        "vi": "Bạn muốn ăn gì?",
        "tag": "Nhu cầu"
      }
    ]
  },
  {
    "id": "hsk1-8-12",
    "hanzi": "多少",
    "traditional": "多少",
    "pinyin": "duōshao",
    "pinyinClean": "duoshao",
    "hanViet": "ĐA THIỂU",
    "radical": "夕",
    "strokeCount": 6,
    "hskLevel": 1,
    "lesson": 8,
    "partOfSpeech": "đại từ",
    "viet": "bao nhiêu",
    "vi_meaning_full": "đại từ nghi vấn dùng để hỏi về số lượng (thường lớn hơn 10) hoặc giá cả",
    "vi_meaning_short": "bao nhiêu",
    "enMeaning": "how much, how many",
    "image": "https://images.pexels.com/photos/210600/pexels-photo-210600.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "多少钱",
      "多少人"
    ],
    "compounds": [
      "多",
      "少"
    ],
    "synonyms": [
      "几何"
    ],
    "antonyms": [],
    "confusableWords": "多少",
    "sentences": [
      {
        "zh": "这个多少钱？",
        "pinyin": "Zhè gè duōshao qián?",
        "vi": "Cái này bao nhiêu tiền?",
        "tag": "Mua sắm"
      },
      {
        "zh": "你们学校有多少学生？",
        "pinyin": "Nǐmen xuéxiào yǒu duōshao xuésheng?",
        "vi": "Trường các bạn có bao nhiêu học sinh?",
        "tag": "Hỏi đáp"
      }
    ]
  },
  {
    "id": "hsk1-8-9",
    "hanzi": "个",
    "traditional": "個",
    "pinyin": "gè",
    "pinyinClean": "ge",
    "hanViet": "CÁ",
    "radical": "人",
    "strokeCount": 3,
    "hskLevel": 1,
    "lesson": 8,
    "partOfSpeech": "lượng từ",
    "viet": "cái, chiếc, người",
    "vi_meaning_full": "lượng từ phổ biến nhất dùng cho người, vật, sự việc không có lượng từ riêng",
    "vi_meaning_short": "cái, chiếc, người",
    "enMeaning": "general measure word",
    "image": "https://images.pexels.com/photos/7397134/pexels-photo-7397134.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "一个人",
      "三个苹果",
      "这个"
    ],
    "compounds": [
      "个人",
      "个体"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "各, 个",
    "sentences": [
      {
        "zh": "我有一个问题。",
        "pinyin": "Wǒ yǒu yí gè wèntí.",
        "vi": "Tôi có một câu hỏi.",
        "tag": "Hỏi đáp"
      },
      {
        "zh": "这个苹果很好吃。",
        "pinyin": "Zhè gè píngguǒ hěn hǎochī.",
        "vi": "Quả táo này rất ngon.",
        "tag": "Ẩm thực"
      }
    ]
  },
  {
    "id": "hsk1-8-2",
    "hanzi": "喝",
    "traditional": "喝",
    "pinyin": "hē",
    "pinyinClean": "he",
    "hanViet": "HÁT",
    "radical": "口",
    "strokeCount": 12,
    "hskLevel": 1,
    "lesson": 8,
    "partOfSpeech": "động từ",
    "viet": "uống",
    "vi_meaning_full": "hành động đưa chất dịch lỏng vào cơ thể qua đường miệng",
    "vi_meaning_short": "uống",
    "enMeaning": "to drink",
    "image": "https://images.pexels.com/photos/11754189/pexels-photo-11754189.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "喝水",
      "喝茶",
      "喝咖啡"
    ],
    "compounds": [
      "喝水",
      "喝酒"
    ],
    "synonyms": [
      "饮"
    ],
    "antonyms": [],
    "confusableWords": "唱, 和",
    "sentences": [
      {
        "zh": "你想喝什么？",
        "pinyin": "Nǐ xiǎng hē shénme?",
        "vi": "Bạn muốn uống gì?",
        "tag": "Nhu cầu"
      },
      {
        "zh": "请喝热茶。",
        "pinyin": "Qǐng hē rè chá.",
        "vi": "Mời uống trà nóng.",
        "tag": "Lịch sự"
      }
    ]
  },
  {
    "id": "hsk1-8-14",
    "hanzi": "块",
    "traditional": "塊",
    "pinyin": "kuài",
    "pinyinClean": "kuai",
    "hanViet": "KHỐI",
    "radical": "土",
    "strokeCount": 7,
    "hskLevel": 1,
    "lesson": 8,
    "partOfSpeech": "lượng từ",
    "viet": "đồng (tiền), miếng",
    "vi_meaning_full": "đơn vị tiền tệ khẩu ngữ (tương đương Nguyên) hoặc miếng, khối",
    "vi_meaning_short": "đồng (tiền), miếng",
    "enMeaning": "yuan (money unit), piece",
    "image": "https://images.pexels.com/photos/4607597/pexels-photo-4607597.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "一块钱",
      "两块"
    ],
    "compounds": [
      "石块",
      "块钱"
    ],
    "synonyms": [
      "元"
    ],
    "antonyms": [],
    "confusableWords": "快, 决",
    "sentences": [
      {
        "zh": "这个苹果两块钱。",
        "pinyin": "Zhè gè píngguǒ liǎng kuài qián.",
        "vi": "Quả táo này hai đồng.",
        "tag": "Mua sắm"
      },
      {
        "zh": "请给我一块蛋糕。",
        "pinyin": "Qǐng gěi wǒ yí kuài dàngāo.",
        "vi": "Cho tôi một miếng bánh ngọt.",
        "tag": "Ăn uống"
      }
    ]
  },
  {
    "id": "hsk1-8-8",
    "hanzi": "买",
    "traditional": "買",
    "pinyin": "mǎi",
    "pinyinClean": "mai",
    "hanViet": "MÃI",
    "radical": "乛",
    "strokeCount": 6,
    "hskLevel": 1,
    "lesson": 8,
    "partOfSpeech": "động từ",
    "viet": "mua",
    "vi_meaning_full": "hành động dùng tiền bạc để đổi lấy hàng hóa, vật phẩm",
    "vi_meaning_short": "mua",
    "enMeaning": "to buy",
    "image": "https://images.pexels.com/photos/8743972/pexels-photo-8743972.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "买东西",
      "买菜",
      "买书"
    ],
    "compounds": [
      "买卖",
      "买家"
    ],
    "synonyms": [
      "购"
    ],
    "antonyms": [
      "卖"
    ],
    "confusableWords": "卖, 头",
    "sentences": [
      {
        "zh": "我想买一个苹果。",
        "pinyin": "Wǒ xiǎng mǎi yí gè píngguǒ.",
        "vi": "Tôi muốn mua một quả táo.",
        "tag": "Mua sắm"
      },
      {
        "zh": "你买了什么？",
        "pinyin": "Nǐ mǎi le shénme?",
        "vi": "Bạn đã mua gì thế?",
        "tag": "Hỏi thăm"
      }
    ]
  },
  {
    "id": "hsk1-8-5",
    "hanzi": "米饭",
    "traditional": "米飯",
    "pinyin": "mǐfàn",
    "pinyinClean": "mifan",
    "hanViet": "MỄ PHẠN",
    "radical": "米",
    "strokeCount": 6,
    "hskLevel": 1,
    "lesson": 8,
    "partOfSpeech": "danh từ",
    "viet": "cơm",
    "vi_meaning_full": "thức ăn nấu chín từ hạt gạo gặt từ cây lúa",
    "vi_meaning_short": "cơm",
    "enMeaning": "cooked rice",
    "image": "https://images.pexels.com/photos/343871/pexels-photo-343871.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "吃米饭",
      "一碗米饭"
    ],
    "compounds": [
      "米",
      "炒饭"
    ],
    "synonyms": [
      "大米饭"
    ],
    "antonyms": [],
    "confusableWords": "面条",
    "sentences": [
      {
        "zh": "我喜欢吃米饭。",
        "pinyin": "Wǒ xǐhuan chī mǐfàn.",
        "vi": "Tôi thích ăn cơm.",
        "tag": "Ẩm thực"
      },
      {
        "zh": "请给我一碗米饭。",
        "pinyin": "Qǐng gěi wǒ yì wǎn mǐfàn.",
        "vi": "Cho tôi một bát cơm.",
        "tag": "Gọi món"
      }
    ]
  },
  {
    "id": "hsk1-8-15",
    "hanzi": "那",
    "traditional": "那",
    "pinyin": "nà",
    "pinyinClean": "na",
    "hanViet": "NA / NẠ",
    "radical": "阝",
    "strokeCount": 6,
    "hskLevel": 1,
    "lesson": 8,
    "partOfSpeech": "đại từ chỉ định",
    "viet": "kia, đó",
    "vi_meaning_full": "đại từ chỉ định khoảng cách xa người nói",
    "vi_meaning_short": "kia, đó",
    "enMeaning": "that",
    "image": "https://images.pexels.com/photos/842687/pexels-photo-842687.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "那个人",
      "那是"
    ],
    "compounds": [
      "那里",
      "那样"
    ],
    "synonyms": [
      "彼"
    ],
    "antonyms": [
      "这"
    ],
    "confusableWords": "这, 哪",
    "sentences": [
      {
        "zh": "那是谁？",
        "pinyin": "Nà shì shéi?",
        "vi": "Kia là ai?",
        "tag": "Quan sát"
      },
      {
        "zh": "那本书很贵。",
        "pinyin": "Nà běn shū hěn guì.",
        "vi": "Quyển sách đó rất đắt.",
        "tag": "Đánh giá"
      }
    ]
  },
  {
    "id": "hsk1-8-13",
    "hanzi": "钱",
    "traditional": "錢",
    "pinyin": "qián",
    "pinyinClean": "qian",
    "hanViet": "TIỀN",
    "radical": "钅",
    "strokeCount": 10,
    "hskLevel": 1,
    "lesson": 8,
    "partOfSpeech": "danh từ",
    "viet": "tiền",
    "vi_meaning_full": "vật ngang giá chung dùng để trao đổi hàng hóa và dịch vụ",
    "vi_meaning_short": "tiền",
    "enMeaning": "money",
    "image": "https://images.pexels.com/photos/9539613/pexels-photo-9539613.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "多少钱",
      "块钱",
      "花钱"
    ],
    "compounds": [
      "钱包",
      "纸钱"
    ],
    "synonyms": [
      "货币"
    ],
    "antonyms": [],
    "confusableWords": "线, 浅",
    "sentences": [
      {
        "zh": "这个东西多少钱？",
        "pinyin": "Zhè gè dōngxi duōshao qián?",
        "vi": "Món đồ này bao nhiêu tiền?",
        "tag": "Mua sắm"
      },
      {
        "zh": "我没带钱。",
        "pinyin": "Wǒ méi dài qián.",
        "vi": "Tôi không mang theo tiền.",
        "tag": "Sinh hoạt"
      }
    ]
  },
  {
    "id": "hsk1-8-7",
    "hanzi": "商店",
    "traditional": "商店",
    "pinyin": "shāngdiàn",
    "pinyinClean": "shangdian",
    "hanViet": "THƯƠNG ĐIẾM",
    "radical": "口",
    "strokeCount": 11,
    "hskLevel": 1,
    "lesson": 8,
    "partOfSpeech": "danh từ",
    "viet": "cửa hàng, tiệm",
    "vi_meaning_full": "nơi bán các loại mặt hàng buôn bán hàng hóa",
    "vi_meaning_short": "cửa hàng, tiệm",
    "enMeaning": "store, shop",
    "image": "https://images.pexels.com/photos/9070122/pexels-photo-9070122.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "去商店",
      "商店里"
    ],
    "compounds": [
      "商品",
      "书店"
    ],
    "synonyms": [
      "店铺"
    ],
    "antonyms": [],
    "confusableWords": "饭店",
    "sentences": [
      {
        "zh": "我去商店买东西。",
        "pinyin": "Wǒ qù shāngdiàn mǎi dōngxi.",
        "vi": "Tôi đi cửa hàng mua đồ.",
        "tag": "Mua sắm"
      },
      {
        "zh": "这家商店很大。",
        "pinyin": "Zhè jiā shāngdiàn hěn dà.",
        "vi": "Cửa hàng này rất lớn.",
        "tag": "Miêu tả"
      }
    ]
  },
  {
    "id": "hsk1-8-6",
    "hanzi": "下午",
    "traditional": "下午",
    "pinyin": "xiàwǔ",
    "pinyinClean": "xiawu",
    "hanViet": "HẠ NGỌ",
    "radical": "一",
    "strokeCount": 3,
    "hskLevel": 1,
    "lesson": 8,
    "partOfSpeech": "danh từ thời gian",
    "viet": "buổi chiều",
    "vi_meaning_full": "khoảng thời gian từ sau 12 giờ trưa đến trước khi hoàng hôn",
    "vi_meaning_short": "buổi chiều",
    "enMeaning": "afternoon",
    "image": "https://images.pexels.com/photos/39075332/pexels-photo-39075332.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "今天下午",
      "三点下午"
    ],
    "compounds": [
      "下",
      "午"
    ],
    "synonyms": [
      "午后"
    ],
    "antonyms": [
      "上午"
    ],
    "confusableWords": "上午, 中午",
    "sentences": [
      {
        "zh": "下午我去买东西。",
        "pinyin": "Xiàwǔ wǒ qù mǎi dōngxi.",
        "vi": "Buổi chiều tôi đi mua đồ.",
        "tag": "Kế hoạch"
      },
      {
        "zh": "明天下午开会。",
        "pinyin": "Míngtiān xiàwǔ kāihuì.",
        "vi": "Chiều mai họp.",
        "tag": "Công việc"
      }
    ]
  },
  {
    "id": "hsk1-8-1",
    "hanzi": "想",
    "traditional": "想",
    "pinyin": "xiǎng",
    "pinyinClean": "xiang",
    "hanViet": "TƯỞNG",
    "radical": "心",
    "strokeCount": 13,
    "hskLevel": 1,
    "lesson": 8,
    "partOfSpeech": "động từ năng nguyện / tâm lý",
    "viet": "muốn, nghĩ, nhớ",
    "vi_meaning_full": "suy nghĩ trong đầu, mong muốn hoặc nhớ nhung ai đó",
    "vi_meaning_short": "muốn, nghĩ, nhớ",
    "enMeaning": "would like to, to think, to miss",
    "image": "https://images.pexels.com/photos/36922121/pexels-photo-36922121.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "想去",
      "想吃",
      "想念"
    ],
    "compounds": [
      "想法",
      "思想"
    ],
    "synonyms": [
      "欲",
      "打算",
      "思"
    ],
    "antonyms": [],
    "confusableWords": "相, 箱",
    "sentences": [
      {
        "zh": "我想去中国。",
        "pinyin": "Wǒ xiǎng qù Zhōngguó.",
        "vi": "Tôi muốn đi Trung Quốc.",
        "tag": "Nguyện vọng"
      },
      {
        "zh": "你在想什么？",
        "pinyin": "Nǐ zài xiǎng shénme?",
        "vi": "Bạn đang nghĩ gì thế?",
        "tag": "Hỏi thăm"
      }
    ]
  },
  {
    "id": "hsk1-8-11",
    "hanzi": "这",
    "traditional": "這",
    "pinyin": "zhè",
    "pinyinClean": "zhe",
    "hanViet": "GIÁ",
    "radical": "辶",
    "strokeCount": 7,
    "hskLevel": 1,
    "lesson": 8,
    "partOfSpeech": "đại từ chỉ định",
    "viet": "này, đây",
    "vi_meaning_full": "chỉ đối tượng ở vị trí gần người nói",
    "vi_meaning_short": "này, đây",
    "enMeaning": "this",
    "image": "https://images.pexels.com/photos/33858785/pexels-photo-33858785.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "这个",
      "这是",
      "这儿"
    ],
    "compounds": [],
    "synonyms": [
      "辶",
      "这"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "这是我的书。",
        "pinyin": "Zhè shì wǒ de shū.",
        "vi": "Đây là sách của tôi.",
        "tag": "Giới thiệu"
      },
      {
        "zh": "此",
        "pinyin": "那",
        "vi": "这儿, 这样",
        "tag": "那, 哪"
      }
    ]
  },
  {
    "id": "hsk1-9-12",
    "hanzi": "爸爸",
    "traditional": "爸爸",
    "pinyin": "bàba",
    "pinyinClean": "baba",
    "hanViet": "BẢ BẢ",
    "radical": "父",
    "strokeCount": 8,
    "hskLevel": 1,
    "lesson": 9,
    "partOfSpeech": "danh từ",
    "viet": "bố, cha",
    "vi_meaning_full": "từ xưng呼 hoặc gọi người cha, bậc sinh thành nam giới trong gia đình",
    "vi_meaning_short": "bố, cha",
    "enMeaning": "father, dad",
    "image": "https://images.pexels.com/photos/19284179/pexels-photo-19284179.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "我爸爸",
      "爸爸妈妈"
    ],
    "compounds": [
      "爸"
    ],
    "synonyms": [
      "父亲"
    ],
    "antonyms": [
      "妈妈"
    ],
    "confusableWords": "吧, 把",
    "sentences": [
      {
        "zh": "我爸爸是医生。",
        "pinyin": "Wǒ bàba shì yīshēng.",
        "vi": "Bố tôi là bác sĩ.",
        "tag": "Gia đình"
      },
      {
        "zh": "爸爸去工作了。",
        "pinyin": "Bàba qù gōngzuò le.",
        "vi": "Bố đi làm rồi.",
        "tag": "Công việc"
      }
    ]
  },
  {
    "id": "hsk1-9-9",
    "hanzi": "儿子",
    "traditional": "兒子",
    "pinyin": "érzi",
    "pinyinClean": "erzi",
    "hanViet": "NHI TỬ",
    "radical": "儿",
    "strokeCount": 2,
    "hskLevel": 1,
    "lesson": 9,
    "partOfSpeech": "danh từ",
    "viet": "con trai",
    "vi_meaning_full": "người con thuộc giới tính nam trong mối quan hệ gia đình",
    "vi_meaning_short": "con trai",
    "enMeaning": "son",
    "image": "https://images.pexels.com/photos/15427723/pexels-photo-15427723.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "小儿子",
      "我儿子"
    ],
    "compounds": [
      "儿女"
    ],
    "synonyms": [],
    "antonyms": [
      "女儿"
    ],
    "confusableWords": "例子, 兔子",
    "sentences": [
      {
        "zh": "他有一个儿子。",
        "pinyin": "Tā yǒu yí gè érzi.",
        "vi": "Anh ấy có một người con trai.",
        "tag": "Gia đình"
      },
      {
        "zh": "我的儿子三岁了。",
        "pinyin": "Wǒ de érzi sān suì le.",
        "vi": "Con trai tôi ba tuổi rồi.",
        "tag": "Tuổi tác"
      }
    ]
  },
  {
    "id": "hsk1-9-8",
    "hanzi": "工作",
    "traditional": "工作",
    "pinyin": "gōngzuò",
    "pinyinClean": "gongzuo",
    "hanViet": "CÔNG TÁC",
    "radical": "工",
    "strokeCount": 3,
    "hskLevel": 1,
    "lesson": 9,
    "partOfSpeech": "động từ / danh từ",
    "viet": "làm việc, công việc",
    "vi_meaning_full": "hoạt động lao động nghề nghiệp hoặc vị trí việc làm",
    "vi_meaning_short": "làm việc, công việc",
    "enMeaning": "to work, job",
    "image": "https://images.pexels.com/photos/7793675/pexels-photo-7793675.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "找工作",
      "去工作",
      "好的工作"
    ],
    "compounds": [
      "工人",
      "工资"
    ],
    "synonyms": [
      "职业",
      "劳动"
    ],
    "antonyms": [
      "休息"
    ],
    "confusableWords": "公作",
    "sentences": [
      {
        "zh": "你在哪里工作？",
        "pinyin": "Nǐ zài nǎli gōngzuò?",
        "vi": "Bạn làm việc ở đâu?",
        "tag": "Hỏi thăm"
      },
      {
        "zh": "我的工作很忙。",
        "pinyin": "Wǒ de gōngzuò hěn máng.",
        "vi": "Công việc của tôi rất bận.",
        "tag": "Nghề nghiệp"
      }
    ]
  },
  {
    "id": "hsk1-9-5",
    "hanzi": "狗",
    "traditional": "狗",
    "pinyin": "gǒu",
    "pinyinClean": "gou",
    "hanViet": "CẨU",
    "radical": "",
    "strokeCount": 0,
    "hskLevel": 1,
    "lesson": 9,
    "partOfSpeech": "",
    "viet": "chó",
    "enMeaning": "",
    "image": "https://images.pexels.com/photos/34027685/pexels-photo-34027685.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [],
    "compounds": [],
    "synonyms": [],
    "antonyms": [],
    "sentences": [],
    "vi_meaning_full": "chó",
    "vi_meaning_short": "chó"
  },
  {
    "id": "hsk1-9-2",
    "hanzi": "猫",
    "traditional": "貓",
    "pinyin": "māo",
    "pinyinClean": "mao",
    "hanViet": "MIÊU",
    "radical": "犭",
    "strokeCount": 11,
    "hskLevel": 1,
    "lesson": 9,
    "partOfSpeech": "danh từ",
    "viet": "con mèo",
    "vi_meaning_full": "loài động vật ăn thịt nhỏ có lông mềm, thường nuôi làm thú cưng bắt chuột",
    "vi_meaning_short": "con mèo",
    "enMeaning": "cat",
    "image": "https://images.pexels.com/photos/14820983/pexels-photo-14820983.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "小猫",
      "一只猫"
    ],
    "compounds": [
      "猫咪",
      "熊猫"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "苗, 锚",
    "sentences": [
      {
        "zh": "我家有一只小猫。",
        "pinyin": "Wǒ jiā yǒu yì zhī xiǎomāo.",
        "vi": "Nhà tôi có một con mèo nhỏ.",
        "tag": "Thú cưng"
      },
      {
        "zh": "这只猫很可爱。",
        "pinyin": "Zhè zhī māo hěn kě'ài.",
        "vi": "Con mèo này rất đáng yêu.",
        "tag": "Miêu tả"
      }
    ]
  },
  {
    "id": "hsk1-9-4",
    "hanzi": "哪儿",
    "traditional": "哪兒",
    "pinyin": "nǎr",
    "pinyinClean": "nar",
    "hanViet": "NẢ NHI",
    "radical": "口",
    "strokeCount": 9,
    "hskLevel": 1,
    "lesson": 9,
    "partOfSpeech": "đại từ nghi vấn",
    "viet": "đâu, ở đâu",
    "vi_meaning_full": "đại từ hỏi vị trí địa điểm ở đâu",
    "vi_meaning_short": "đâu, ở đâu",
    "enMeaning": "where",
    "image": "https://images.pexels.com/photos/4452372/pexels-photo-4452372.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "去哪儿",
      "在哪儿"
    ],
    "compounds": [
      "哪"
    ],
    "synonyms": [
      "哪里"
    ],
    "antonyms": [],
    "confusableWords": "那儿, 这儿",
    "sentences": [
      {
        "zh": "你去哪儿？",
        "pinyin": "Nǐ qù nǎr?",
        "vi": "Bạn đi đâu đấy?",
        "tag": "Hỏi thăm"
      },
      {
        "zh": "我的书在哪儿？",
        "pinyin": "Wǒ de shū zài nǎr?",
        "vi": "Sách của tôi ở đâu?",
        "tag": "Tìm kiếm"
      }
    ]
  },
  {
    "id": "hsk1-9-71",
    "hanzi": "那儿",
    "traditional": "那兒",
    "pinyin": "nàr",
    "pinyinClean": "nar",
    "hanViet": "NA NHI",
    "radical": "阝",
    "strokeCount": 6,
    "hskLevel": 1,
    "lesson": 9,
    "partOfSpeech": "đại từ chỉ định",
    "viet": "chỗ kia, nơi đó",
    "vi_meaning_full": "chỉ vị trí khoảng cách xa người nói",
    "vi_meaning_short": "chỗ kia, nơi đó",
    "enMeaning": "there",
    "image": "https://pixabay.com/get/g137abc4ba12f9aefacec775320fb3e67cba5efeebfdf4ac0ee4063fdc2c4270aa0b6625f4c4597904bbebcb718e7a320_640.jpg",
    "collocations": [
      "去那儿",
      "在那儿"
    ],
    "compounds": [
      "那"
    ],
    "synonyms": [
      "那里"
    ],
    "antonyms": [
      "这儿"
    ],
    "confusableWords": "这儿, 哪儿",
    "sentences": [
      {
        "zh": "他在那儿看书。",
        "pinyin": "Tā zài nàr kàn shū.",
        "vi": "Anh ấy ở chỗ kia đọc sách.",
        "tag": "Vị trí"
      },
      {
        "zh": "我打算去那儿。",
        "pinyin": "Wǒ dǎsuàn qù nàr.",
        "vi": "Tôi định đi đến đó.",
        "tag": "Di chuyển"
      }
    ]
  },
  {
    "id": "hsk1-9-117",
    "hanzi": "下",
    "traditional": "下",
    "pinyin": "xià",
    "pinyinClean": "xia",
    "hanViet": "HẠ",
    "radical": "一",
    "strokeCount": 3,
    "hskLevel": 1,
    "lesson": 9,
    "partOfSpeech": "danh từ phương hướng / động từ",
    "viet": "dưới, xuống, tan (làm)",
    "vi_meaning_full": "vị trí phía dưới hoặc hành động đi xuống, kết thúc (tan làm, tan học)",
    "vi_meaning_short": "dưới, xuống, tan (làm)",
    "enMeaning": "under, below, to go down",
    "image": "https://images.unsplash.com/photo-1557223562-6c77ef16210f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk2MTUyfDB8MXxzZWFyY2h8MXx8Z2V0dGluZyUyMG9mZiUyMGJ1c3xlbnwwfHx8fDE3OTE4MjkxNTV8MA&ixlib=rb-4.1.0&q=80&w=400",
    "collocations": [
      "桌子下",
      "下班",
      "下雨"
    ],
    "compounds": [
      "下午",
      "下雨",
      "下课"
    ],
    "synonyms": [
      "底"
    ],
    "antonyms": [
      "上"
    ],
    "confusableWords": "上, 不",
    "sentences": [
      {
        "zh": "小猫在桌子下面。",
        "pinyin": "Xiǎomāo zài zhuōzi xiàmiàn.",
        "vi": "Con mèo nhỏ ở dưới bàn.",
        "tag": "Vị trí"
      },
      {
        "zh": "我五点下班。",
        "pinyin": "Wǒ wǔ diǎn xiàbān.",
        "vi": "Tôi tan làm lúc 5 giờ.",
        "tag": "Lịch trình"
      }
    ]
  },
  {
    "id": "hsk1-9-7",
    "hanzi": "下面",
    "traditional": "下面",
    "pinyin": "xiàmiàn",
    "pinyinClean": "xiamian",
    "hanViet": "HẠ DIỆN",
    "radical": "",
    "strokeCount": 0,
    "hskLevel": 1,
    "lesson": 9,
    "partOfSpeech": "",
    "viet": "phía dưới, dưới",
    "enMeaning": "",
    "image": "https://images.pexels.com/photos/3104526/pexels-photo-3104526.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [],
    "compounds": [],
    "synonyms": [],
    "antonyms": [],
    "sentences": [],
    "vi_meaning_full": "phía dưới, dưới",
    "vi_meaning_short": "phía dưới, dưới"
  },
  {
    "id": "hsk1-9-1",
    "hanzi": "小",
    "traditional": "小",
    "pinyin": "xiǎo",
    "pinyinClean": "xiao",
    "hanViet": "TIỂU",
    "radical": "小",
    "strokeCount": 3,
    "hskLevel": 1,
    "lesson": 9,
    "partOfSpeech": "tính từ",
    "viet": "nhỏ, bé",
    "vi_meaning_full": "có thể tích, diện tích, quy mô nhỏ bé so với bình thường",
    "vi_meaning_short": "nhỏ, bé",
    "enMeaning": "small, little",
    "image": "https://images.pexels.com/photos/15373305/pexels-photo-15373305.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "很小",
      "小猫",
      "小姐"
    ],
    "compounds": [],
    "synonyms": [
      "小"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "这个苹果很小。",
        "pinyin": "Zhè gè píngguǒ hěn xiǎo.",
        "vi": "Quả táo này rất nhỏ.",
        "tag": "Miêu tả"
      },
      {
        "zh": "微, 细",
        "pinyin": "大",
        "vi": "小孩, 小学",
        "tag": "少"
      }
    ]
  },
  {
    "id": "hsk1-9-11",
    "hanzi": "医生",
    "traditional": "醫生",
    "pinyin": "yīshēng",
    "pinyinClean": "yisheng",
    "hanViet": "Y SINH",
    "radical": "匚",
    "strokeCount": 7,
    "hskLevel": 1,
    "lesson": 9,
    "partOfSpeech": "danh từ",
    "viet": "bác sĩ",
    "vi_meaning_full": "người có chuyên môn y khoa khám chữa bệnh",
    "vi_meaning_short": "bác sĩ",
    "enMeaning": "doctor",
    "image": "https://images.pexels.com/photos/19601385/pexels-photo-19601385.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "看医生",
      "我爸爸是医生"
    ],
    "compounds": [],
    "synonyms": [
      "匚",
      "生",
      "医"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "我爸爸是医生。",
        "pinyin": "Wǒ bàba shì yīshēng.",
        "vi": "Bố tôi là bác sĩ.",
        "tag": "Nghề nghiệp"
      },
      {
        "zh": "大夫",
        "pinyin": "病人",
        "vi": "医院, 医学",
        "tag": "医生"
      }
    ]
  },
  {
    "id": "hsk1-9-10",
    "hanzi": "医院",
    "traditional": "醫院",
    "pinyin": "yīyuàn",
    "pinyinClean": "yiyuan",
    "hanViet": "Y VIỆN",
    "radical": "阝",
    "strokeCount": 9,
    "hskLevel": 1,
    "lesson": 9,
    "partOfSpeech": "danh từ",
    "viet": "bệnh viện",
    "vi_meaning_full": "cơ sở y tế chuyên khám và điều trị bệnh",
    "vi_meaning_short": "bệnh viện",
    "enMeaning": "hospital",
    "image": "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "去医院",
      "在医院"
    ],
    "compounds": [],
    "synonyms": [
      "匚",
      "阝",
      "院"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "他在医院工作。",
        "pinyin": "Tā zài yīyuàn gōngzuò.",
        "vi": "Anh ấy làm việc ở bệnh viện.",
        "tag": "Nơi chốn"
      },
      {
        "zh": "诊所",
        "pinyin": "",
        "vi": "院子, 院长",
        "tag": "电影院"
      }
    ]
  },
  {
    "id": "hsk1-9-6",
    "hanzi": "椅子",
    "traditional": "椅子",
    "pinyin": "yǐzi",
    "pinyinClean": "yizi",
    "hanViet": "Ỷ TỬ",
    "radical": "木",
    "strokeCount": 12,
    "hskLevel": 1,
    "lesson": 9,
    "partOfSpeech": "danh từ",
    "viet": "cái ghế",
    "vi_meaning_full": "đồ nội thất dùng để ngồi có tựa lưng",
    "vi_meaning_short": "cái ghế",
    "enMeaning": "chair",
    "image": "https://images.pexels.com/photos/11112732/pexels-photo-11112732.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "一把椅子",
      "坐椅子"
    ],
    "compounds": [],
    "synonyms": [
      "木",
      "子",
      "奇"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "请坐在椅子上。",
        "pinyin": "Qǐng zuò zài yǐzi shang.",
        "vi": "Mời ngồi trên ghế.",
        "tag": "Nội thất"
      },
      {
        "zh": "凳子",
        "pinyin": "",
        "vi": "木椅",
        "tag": "桌子"
      }
    ]
  },
  {
    "id": "hsk1-9-3",
    "hanzi": "在",
    "traditional": "在",
    "pinyin": "zài",
    "pinyinClean": "zai",
    "hanViet": "TẠI",
    "radical": "土",
    "strokeCount": 6,
    "hskLevel": 1,
    "lesson": 9,
    "partOfSpeech": "giới từ / động từ",
    "viet": "ở, tại, đang",
    "vi_meaning_full": "chỉ vị trí địa điểm hoặc sự việc đang diễn ra",
    "vi_meaning_short": "ở, tại, đang",
    "enMeaning": "at, in, ongoing particle",
    "image": "https://images.pexels.com/photos/17184739/pexels-photo-17184739.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "在家",
      "在学校",
      "正在"
    ],
    "compounds": [],
    "synonyms": [
      "土",
      "在"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "我在家看书。",
        "pinyin": "Wǒ zài jiā kàn shū.",
        "vi": "Tôi ở nhà đọc sách.",
        "tag": "Địa điểm"
      },
      {
        "zh": "处于",
        "pinyin": "不在",
        "vi": "现在, 存在",
        "tag": "再"
      }
    ]
  },
  {
    "id": "hsk1-10-5",
    "hanzi": "本",
    "traditional": "本",
    "pinyin": "běn",
    "pinyinClean": "ben",
    "hanViet": "BỔN / BẢN",
    "radical": "木",
    "strokeCount": 5,
    "hskLevel": 1,
    "lesson": 10,
    "partOfSpeech": "lượng từ",
    "viet": "cuốn, quyển",
    "vi_meaning_full": "lượng từ chỉ đơn vị dùng cho sách, vở, tài liệu đóng thành tập",
    "vi_meaning_short": "cuốn, quyển",
    "enMeaning": "measure word for books",
    "image": "https://images.pexels.com/photos/8456832/pexels-photo-8456832.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "一本书",
      "两本项目"
    ],
    "compounds": [
      "课本",
      "本子",
      "笔记本"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "木, 体",
    "sentences": [
      {
        "zh": "桌子上有一本书。",
        "pinyin": "Zhuōzi shang yǒu yì běn shū.",
        "vi": "Trên bàn có một quyển sách.",
        "tag": "Học tập"
      },
      {
        "zh": "你买了几本书？",
        "pinyin": "Nǐ mǎi le jǐ běn shū?",
        "vi": "Bạn đã mua mấy quyển sách?",
        "tag": "Mua sắm"
      }
    ]
  },
  {
    "id": "hsk1-10-3",
    "hanzi": "电脑",
    "traditional": "電腦",
    "pinyin": "diànnǎo",
    "pinyinClean": "diannao",
    "hanViet": "ĐIỆN NÃO",
    "radical": "日",
    "strokeCount": 13,
    "hskLevel": 1,
    "lesson": 10,
    "partOfSpeech": "danh từ",
    "viet": "máy tính",
    "vi_meaning_full": "thiết bị điện tử dùng để xử lý, lưu trữ dữ liệu và tính toán",
    "vi_meaning_short": "máy tính",
    "enMeaning": "computer",
    "image": "https://images.pexels.com/photos/12200696/pexels-photo-12200696.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "买电脑",
      "用电脑",
      "电脑桌"
    ],
    "compounds": [
      "脑",
      "各种电脑"
    ],
    "synonyms": [
      "计算机"
    ],
    "antonyms": [],
    "confusableWords": "电视, 电话",
    "sentences": [
      {
        "zh": "我买了一台新电脑。",
        "pinyin": "Wǒ mǎi le yì tái xīn diànnǎo.",
        "vi": "Tôi đã mua một chiếc máy tính mới.",
        "tag": "Công nghệ"
      },
      {
        "zh": "他在用电脑工作。",
        "pinyin": "Tā zài yòng diànnǎo gōngzuò.",
        "vi": "Anh ấy đang làm việc bằng máy tính.",
        "tag": "Công việc"
      }
    ]
  },
  {
    "id": "hsk1-10-4",
    "hanzi": "和",
    "traditional": "和",
    "pinyin": "hé",
    "pinyinClean": "he",
    "hanViet": "HÒA",
    "radical": "口",
    "strokeCount": 8,
    "hskLevel": 1,
    "lesson": 10,
    "partOfSpeech": "liên từ / giới từ",
    "viet": "và, cùng với",
    "vi_meaning_full": "dùng để nối hai hoặc nhiều từ, cụm từ có quan hệ đẳng lập",
    "vi_meaning_short": "và, cùng với",
    "enMeaning": "and, with",
    "image": "https://images.pexels.com/photos/9385078/pexels-photo-9385078.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "我和你",
      "爸爸和妈妈"
    ],
    "compounds": [
      "和平",
      "和气"
    ],
    "synonyms": [
      "同",
      "与"
    ],
    "antonyms": [],
    "confusableWords": "喝, 合",
    "sentences": [
      {
        "zh": "我和他是好朋友。",
        "pinyin": "Wǒ hé tā shì hǎo péngyou.",
        "vi": "Tôi và anh ấy là bạn tốt.",
        "tag": "Quan hệ"
      },
      {
        "zh": "我想和你一起去。",
        "pinyin": "Wǒ xiǎng hé nǐ yìqǐ qù.",
        "vi": "Tôi muốn đi cùng bạn.",
        "tag": "Rủ rê"
      }
    ]
  },
  {
    "id": "hsk1-10-8",
    "hanzi": "后面",
    "traditional": "後面",
    "pinyin": "hòumiàn",
    "pinyinClean": "houmian",
    "hanViet": "HẬU DIỆN",
    "radical": "口",
    "strokeCount": 6,
    "hskLevel": 1,
    "lesson": 10,
    "partOfSpeech": "danh từ phương hướng",
    "viet": "phía sau, đằng sau",
    "vi_meaning_full": "vị trí ở phía sau của người, vật hoặc mốc thời gian sau",
    "vi_meaning_short": "phía sau, đằng sau",
    "enMeaning": "behind, back",
    "image": "https://images.pexels.com/photos/7261633/pexels-photo-7261633.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "在后面",
      "后面的人"
    ],
    "compounds": [
      "后台",
      "后天"
    ],
    "synonyms": [
      "后边"
    ],
    "antonyms": [
      "前面"
    ],
    "confusableWords": "里面, 外面",
    "sentences": [
      {
        "zh": "学校后面有一个公园。",
        "pinyin": "Xuéxiào hòumiàn yǒu yí gè gōngyuán.",
        "vi": "Phía sau trường học có một công viên.",
        "tag": "Vị trí"
      },
      {
        "zh": "请看后面。",
        "pinyin": "Qǐng kàn hòumiàn.",
        "vi": "Xin hãy nhìn phía sau.",
        "tag": "Chỉ dẫn"
      }
    ]
  },
  {
    "id": "hsk1-10-6",
    "hanzi": "里",
    "traditional": "裏",
    "pinyin": "lǐ",
    "pinyinClean": "li",
    "hanViet": "LÝ",
    "radical": "里",
    "strokeCount": 7,
    "hskLevel": 1,
    "lesson": 10,
    "partOfSpeech": "danh từ phương hướng",
    "viet": "trong, bên trong",
    "vi_meaning_full": "vị trí không gian bên trong của một vật thể hoặc khu vực",
    "vi_meaning_short": "trong, bên trong",
    "enMeaning": "in, inside",
    "image": "https://images.pexels.com/photos/33793759/pexels-photo-33793759.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "家里的",
      "房间里",
      "里面"
    ],
    "compounds": [
      "里面",
      "公里"
    ],
    "synonyms": [
      "内"
    ],
    "antonyms": [
      "外"
    ],
    "confusableWords": "理, 厘",
    "sentences": [
      {
        "zh": "书包里有一本书。",
        "pinyin": "Shūbāo lǐ yǒu yì běn shū.",
        "vi": "Trong cặp sách có một quyển sách.",
        "tag": "Vị trí"
      },
      {
        "zh": "水里有鱼。",
        "pinyin": "Shuǐ lǐ yǒu yú.",
        "vi": "Trong nước có cá.",
        "tag": "Quan sát"
      }
    ]
  },
  {
    "id": "hsk1-10-63",
    "hanzi": "没",
    "traditional": "沒",
    "pinyin": "méi",
    "pinyinClean": "mei",
    "hanViet": "MỘT / MỘT",
    "radical": "氵",
    "strokeCount": 7,
    "hskLevel": 1,
    "lesson": 10,
    "partOfSpeech": "phó từ",
    "viet": "chưa, không có",
    "vi_meaning_full": "phó từ phủ định hành động đã xảy ra trong quá khứ hoặc biểu thị sự không có",
    "vi_meaning_short": "chưa, không có",
    "enMeaning": "not, have not",
    "image": "https://images.unsplash.com/photo-1519916478825-b1d7aef08f54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk2MTUyfDB8MXxzZWFyY2h8Mnx8ZW1wdHklMjBlbXB0eSUyMGJvd2x8ZW58MHx8fHwxNzkxODI5MTA0fDA&ixlib=rb-4.1.0&q=80&w=400",
    "collocations": [
      "没有",
      "没去",
      "没关系"
    ],
    "compounds": [
      "没有",
      "没用"
    ],
    "synonyms": [
      "无",
      "未"
    ],
    "antonyms": [
      "有"
    ],
    "confusableWords": "设, 没",
    "sentences": [
      {
        "zh": "我没有电脑。",
        "pinyin": "Wǒ méiyǒu diànnǎo.",
        "vi": "Tôi không có máy tính.",
        "tag": "Sở hữu"
      },
      {
        "zh": "他今天没来。",
        "pinyin": "Tā jīntiān méi lái.",
        "vi": "Hôm nay anh ấy chưa đến.",
        "tag": "Điểm danh"
      }
    ]
  },
  {
    "id": "hsk1-10-10",
    "hanzi": "没有",
    "traditional": "没有",
    "pinyin": "méiyǒu",
    "pinyinClean": "meiyou",
    "hanViet": "MỘT HỮU",
    "radical": "",
    "strokeCount": 0,
    "hskLevel": 1,
    "lesson": 10,
    "partOfSpeech": "",
    "viet": "không có",
    "enMeaning": "",
    "image": "https://images.pexels.com/photos/11662256/pexels-photo-11662256.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [],
    "compounds": [],
    "synonyms": [],
    "antonyms": [],
    "sentences": [],
    "vi_meaning_full": "không có",
    "vi_meaning_short": "không có"
  },
  {
    "id": "hsk1-10-11",
    "hanzi": "能",
    "traditional": "能",
    "pinyin": "néng",
    "pinyinClean": "neng",
    "hanViet": "NĂNG",
    "radical": "月",
    "strokeCount": 10,
    "hskLevel": 1,
    "lesson": 10,
    "partOfSpeech": "động từ năng nguyện",
    "viet": "có thể",
    "vi_meaning_full": "chỉ năng lực bản thân hoặc điều kiện hoàn cảnh cho phép thực hiện hành động",
    "vi_meaning_short": "có thể",
    "enMeaning": "can, to be able to",
    "image": "https://images.pexels.com/photos/35740586/pexels-photo-35740586.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "能不能",
      "能去"
    ],
    "compounds": [
      "能力",
      "可能"
    ],
    "synonyms": [
      "可以",
      "会"
    ],
    "antonyms": [
      "不能"
    ],
    "confusableWords": "熊",
    "sentences": [
      {
        "zh": "我能坐这里吗？",
        "pinyin": "Wǒ néng zuò zhèlǐ ma?",
        "vi": "Tôi có thể ngồi ở đây không?",
        "tag": "Xin phép"
      },
      {
        "zh": "他今天不能来。",
        "pinyin": "Tā jīntiān bù néng lái.",
        "vi": "Anh ấy hôm nay không thể đến.",
        "tag": "Thông báo"
      }
    ]
  },
  {
    "id": "hsk1-10-7",
    "hanzi": "前面",
    "traditional": "前面",
    "pinyin": "qiánmiàn",
    "pinyinClean": "qianmian",
    "hanViet": "TIỀN DIỆN",
    "radical": "刂",
    "strokeCount": 9,
    "hskLevel": 1,
    "lesson": 10,
    "partOfSpeech": "danh từ phương hướng",
    "viet": "phía trước, đằng trước",
    "vi_meaning_full": "vị trí phía trước mặt của người hoặc vật",
    "vi_meaning_short": "phía trước, đằng trước",
    "enMeaning": "in front, ahead",
    "image": "https://images.pexels.com/photos/14578428/pexels-photo-14578428.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "在前面",
      "前面的人"
    ],
    "compounds": [
      "前天",
      "前门"
    ],
    "synonyms": [
      "前边"
    ],
    "antonyms": [
      "后面"
    ],
    "confusableWords": "后面, 里面",
    "sentences": [
      {
        "zh": "他在前面等你。",
        "pinyin": "Tā zài qiánmiàn děng nǐ.",
        "vi": "Anh ấy đang đợi bạn ở phía trước.",
        "tag": "Vị trí"
      },
      {
        "zh": "前面有一家饭店。",
        "pinyin": "Qiánmiàn yǒu yì jiā fàndiàn.",
        "vi": "Phía trước có một nhà hàng.",
        "tag": "Chỉ đường"
      }
    ]
  },
  {
    "id": "hsk1-10-2",
    "hanzi": "上",
    "traditional": "上",
    "pinyin": "shàng",
    "pinyinClean": "shang",
    "hanViet": "THƯỢNG",
    "radical": "一",
    "strokeCount": 3,
    "hskLevel": 1,
    "lesson": 10,
    "partOfSpeech": "danh từ phương hướng / động từ",
    "viet": "trên, lên, đi (học/làm)",
    "vi_meaning_full": "vị trí phía trên hoặc hành động đi lên, đi học, đi làm",
    "vi_meaning_short": "trên, lên, đi (học/làm)",
    "enMeaning": "on, above, to go up",
    "image": "https://images.pexels.com/photos/27025187/pexels-photo-27025187.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "桌子上",
      "上班",
      "上学"
    ],
    "compounds": [
      "上午",
      "上课",
      "上网"
    ],
    "synonyms": [
      "顶"
    ],
    "antonyms": [
      "下"
    ],
    "confusableWords": "下, 卜",
    "sentences": [
      {
        "zh": "书在桌子上。",
        "pinyin": "Shū zài zhuōzi shang.",
        "vi": "Sách ở trên bàn.",
        "tag": "Vị trí"
      },
      {
        "zh": "我八点去上班。",
        "pinyin": "Wǒ bā diǎn qù shàngbān.",
        "vi": "Tôi đi làm lúc 8 giờ.",
        "tag": "Hàng ngày"
      }
    ]
  },
  {
    "id": "hsk1-10-154",
    "hanzi": "王方",
    "traditional": "王方",
    "pinyin": "Wáng Fāng",
    "pinyinClean": "wangfang",
    "hanViet": "VƯƠNG PHƯƠNG",
    "radical": "王",
    "strokeCount": 4,
    "hskLevel": 1,
    "lesson": 10,
    "partOfSpeech": "danh từ riêng",
    "viet": "Vương Phương",
    "vi_meaning_full": "tên riêng nhân vật trong bài học giáo trình HSK 1",
    "vi_meaning_short": "Vương Phương",
    "enMeaning": "Wang Fang (name)",
    "image": "https://images.pexels.com/photos/21006299/pexels-photo-21006299.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "王方同学"
    ],
    "compounds": [],
    "synonyms": [
      "王",
      "方"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "王方是我的同学。",
        "pinyin": "Wáng Fāng shì wǒ de tóngxué.",
        "vi": "Vương Phương là bạn học của tôi.",
        "tag": "Giới thiệu"
      }
    ]
  },
  {
    "id": "hsk1-10-9",
    "hanzi": "这儿",
    "traditional": "這兒",
    "pinyin": "zhèr",
    "pinyinClean": "zher",
    "hanViet": "GIÁ NHI",
    "radical": "辶",
    "strokeCount": 7,
    "hskLevel": 1,
    "lesson": 10,
    "partOfSpeech": "đại từ chỉ định",
    "viet": "chỗ này, ở đây",
    "vi_meaning_full": "chỉ vị trí gần người nói",
    "vi_meaning_short": "chỗ này, ở đây",
    "enMeaning": "here",
    "image": "https://images.pexels.com/photos/5227690/pexels-photo-5227690.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "在这儿",
      "来这儿"
    ],
    "compounds": [],
    "synonyms": [
      "辶",
      "儿"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "我在这儿等你。",
        "pinyin": "Wǒ zài zhèr děng nǐ.",
        "vi": "Tôi ở đây đợi bạn.",
        "tag": "Vị trí"
      },
      {
        "zh": "这里",
        "pinyin": "那儿",
        "vi": "这",
        "tag": "那儿"
      }
    ]
  },
  {
    "id": "hsk1-10-1",
    "hanzi": "桌子",
    "traditional": "桌子",
    "pinyin": "zhuōzi",
    "pinyinClean": "zhuozi",
    "hanViet": "TRÁC TỬ",
    "radical": "木",
    "strokeCount": 10,
    "hskLevel": 1,
    "lesson": 10,
    "partOfSpeech": "danh từ",
    "viet": "cái bàn",
    "vi_meaning_full": "đồ nội thất có mặt phẳng dùng để đồ, làm việc",
    "vi_meaning_short": "cái bàn",
    "enMeaning": "table, desk",
    "image": "https://images.pexels.com/photos/11112745/pexels-photo-11112745.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "一张桌子",
      "桌子上"
    ],
    "compounds": [],
    "synonyms": [
      "木",
      "子",
      "桌"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "桌子上有一本书。",
        "pinyin": "Zhuōzi shang yǒu yì běn shū.",
        "vi": "Trên bàn có một quyển sách.",
        "tag": "Nội thất"
      },
      {
        "zh": "案",
        "pinyin": "",
        "vi": "书桌, 桌椅",
        "tag": "椅子"
      }
    ]
  },
  {
    "id": "hsk1-10-12",
    "hanzi": "坐",
    "traditional": "坐",
    "pinyin": "zuò",
    "pinyinClean": "zuo",
    "hanViet": "TỌA",
    "radical": "土",
    "strokeCount": 7,
    "hskLevel": 1,
    "lesson": 10,
    "partOfSpeech": "động từ",
    "viet": "ngồi, đi (máy bay/xe)",
    "vi_meaning_full": "ngồi xuống ghế hoặc di chuyển bằng phương tiện giao thông",
    "vi_meaning_short": "ngồi, đi (máy bay/xe)",
    "enMeaning": "to sit, to take (transport)",
    "image": "https://images.pexels.com/photos/11112735/pexels-photo-11112735.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "请坐",
      "坐飞机",
      "坐车"
    ],
    "compounds": [],
    "synonyms": [
      "土",
      "坐"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "请坐！",
        "pinyin": "Qǐng zuò!",
        "vi": "Mời ngồi!",
        "tag": "Lịch sự"
      },
      {
        "zh": "乘坐",
        "pinyin": "站",
        "vi": "座, 坐下",
        "tag": "做, 座"
      }
    ]
  },
  {
    "id": "hsk1-11-5",
    "hanzi": "北京",
    "traditional": "北京",
    "pinyin": "Běijīng",
    "pinyinClean": "beijing",
    "hanViet": "BẮC KINH",
    "radical": "亠",
    "strokeCount": 5,
    "hskLevel": 1,
    "lesson": 11,
    "partOfSpeech": "danh từ riêng",
    "viet": "Bắc Kinh",
    "vi_meaning_full": "tên thủ đô của nước Cộng hòa Nhân dân Trung Hoa",
    "vi_meaning_short": "Bắc Kinh",
    "enMeaning": "Beijing",
    "image": "https://images.unsplash.com/photo-1614555383820-941c466f1b52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk2MTUyfDB8MXxzZWFyY2h8Mnx8QmVpamluZyUyMEZvcmJpZGRlbiUyMGNpdHl8ZW58MHx8fHwxNzkxODI5MDY0fDA&ixlib=rb-4.1.0&q=80&w=400",
    "collocations": [
      "去北京",
      "北京人",
      "北京烤鸭"
    ],
    "compounds": [
      "北京人"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "南京, 东京",
    "sentences": [
      {
        "zh": "我住在北京。",
        "pinyin": "Wǒ zhù zài Běijīng.",
        "vi": "Tôi sống ở Bắc Kinh.",
        "tag": "Nơi chốn"
      },
      {
        "zh": "我想去北京旅游。",
        "pinyin": "Wǒ xiǎng qù Běijīng lǚyóu.",
        "vi": "Tôi muốn đi du lịch Bắc Kinh.",
        "tag": "Du lịch"
      }
    ]
  },
  {
    "id": "hsk1-11-5",
    "hanzi": "吃饭",
    "traditional": "吃饭",
    "pinyin": "chī fàn",
    "pinyinClean": "chifan",
    "hanViet": "CẬT PHẠN",
    "radical": "",
    "strokeCount": 0,
    "hskLevel": 1,
    "lesson": 11,
    "partOfSpeech": "",
    "viet": "ăn cơm",
    "enMeaning": "",
    "image": "https://images.pexels.com/photos/15597767/pexels-photo-15597767.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [],
    "compounds": [],
    "synonyms": [],
    "antonyms": [],
    "sentences": [],
    "vi_meaning_full": "ăn cơm",
    "vi_meaning_short": "ăn cơm"
  },
  {
    "id": "hsk1-11-2",
    "hanzi": "点",
    "traditional": "點",
    "pinyin": "diǎn",
    "pinyinClean": "dian",
    "hanViet": "ĐIỂM",
    "radical": "黑",
    "strokeCount": 9,
    "hskLevel": 1,
    "lesson": 11,
    "partOfSpeech": "danh từ / lượng từ",
    "viet": "giờ, chút, điểm",
    "vi_meaning_full": "chỉ mốc thời gian giờ trong ngày hoặc một chút lượng nhỏ",
    "vi_meaning_short": "giờ, chút, điểm",
    "enMeaning": "o'clock, a bit",
    "image": "https://images.pexels.com/photos/36143696/pexels-photo-36143696.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "几点",
      "八点",
      "一点儿"
    ],
    "compounds": [
      "点心",
      "早点",
      "雨点"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "占, 店",
    "sentences": [
      {
        "zh": "现在是九点。",
        "pinyin": "Xiànzài shì jiǔ diǎn.",
        "vi": "Bây giờ là 9 giờ.",
        "tag": "Thời gian"
      },
      {
        "zh": "我想喝一点儿水。",
        "pinyin": "Wǒ xiǎng hē yìdiǎnr shuǐ.",
        "vi": "Tôi muốn uống một chút nước.",
        "tag": "Nhu cầu"
      }
    ]
  },
  {
    "id": "hsk1-11-9",
    "hanzi": "电影",
    "traditional": "電影",
    "pinyin": "diànyǐng",
    "pinyinClean": "dianying",
    "hanViet": "ĐIỆN ẢNH",
    "radical": "日",
    "strokeCount": 13,
    "hskLevel": 1,
    "lesson": 11,
    "partOfSpeech": "danh từ",
    "viet": "phim, điện ảnh",
    "vi_meaning_full": "tác phẩm nghệ thuật hình ảnh chuyển động phát trên màn ảnh",
    "vi_meaning_short": "phim, điện ảnh",
    "enMeaning": "movie, film",
    "image": "https://images.pexels.com/photos/7603970/pexels-photo-7603970.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "看电影",
      "电影院",
      "好看"
    ],
    "compounds": [
      "电影院",
      "影星"
    ],
    "synonyms": [
      "影片"
    ],
    "antonyms": [],
    "confusableWords": "电视, 电话",
    "sentences": [
      {
        "zh": "晚上我们去看电影。",
        "pinyin": "Wǎnshang wǒmen qù kàn diànyǐng.",
        "vi": "Buổi tối chúng tôi đi xem phim.",
        "tag": "Giải trí"
      },
      {
        "zh": "这部电影非常好看。",
        "pinyin": "Zhè bù diànyǐng fēicháng hǎokàn.",
        "vi": "Bộ phim này rất hay.",
        "tag": "Đánh giá"
      }
    ]
  },
  {
    "id": "hsk1-11-3",
    "hanzi": "分",
    "traditional": "分",
    "pinyin": "fēn",
    "pinyinClean": "fen",
    "hanViet": "PHÂN",
    "radical": "",
    "strokeCount": 0,
    "hskLevel": 1,
    "lesson": 11,
    "partOfSpeech": "",
    "viet": "phút",
    "enMeaning": "",
    "image": "https://images.pexels.com/photos/28977357/pexels-photo-28977357.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [],
    "compounds": [],
    "synonyms": [],
    "antonyms": [],
    "sentences": [],
    "vi_meaning_full": "phút",
    "vi_meaning_short": "phút"
  },
  {
    "id": "hsk1-11-7",
    "hanzi": "回",
    "traditional": "回",
    "pinyin": "huí",
    "pinyinClean": "hui",
    "hanViet": "HỒI",
    "radical": "囗",
    "strokeCount": 6,
    "hskLevel": 1,
    "lesson": 11,
    "partOfSpeech": "động từ / lượng từ",
    "viet": "về, trở về, lần",
    "vi_meaning_full": "hành động trở về điểm xuất phát ban đầu hoặc lượt lần",
    "vi_meaning_short": "về, trở về, lần",
    "enMeaning": "to return, to go back",
    "image": "https://images.pexels.com/photos/38240997/pexels-photo-38240997.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "回家",
      "回国",
      "回答"
    ],
    "compounds": [
      "回家",
      "回答",
      "回复"
    ],
    "synonyms": [
      "归",
      "返"
    ],
    "antonyms": [
      "去",
      "出"
    ],
    "confusableWords": "国, 因",
    "sentences": [
      {
        "zh": "下午我回家。",
        "pinyin": "Xiàwǔ wǒ huí jiā.",
        "vi": "Buổi chiều tôi về nhà.",
        "tag": "Di chuyển"
      },
      {
        "zh": "你什么时候回来？",
        "pinyin": "Nǐ shénme shíhou huílái?",
        "vi": "Khi nào bạn quay về?",
        "tag": "Hỏi thăm"
      }
    ]
  },
  {
    "id": "hsk1-11-11",
    "hanzi": "前",
    "traditional": "前",
    "pinyin": "qián",
    "pinyinClean": "qian",
    "hanViet": "TIỀN",
    "radical": "",
    "strokeCount": 0,
    "hskLevel": 1,
    "lesson": 11,
    "partOfSpeech": "",
    "viet": "trước",
    "enMeaning": "",
    "image": "https://images.pexels.com/photos/36032986/pexels-photo-36032986.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [],
    "compounds": [],
    "synonyms": [],
    "antonyms": [],
    "sentences": [],
    "vi_meaning_full": "trước",
    "vi_meaning_short": "trước"
  },
  {
    "id": "hsk1-11-6",
    "hanzi": "时候",
    "traditional": "時候",
    "pinyin": "shíhou",
    "pinyinClean": "shihou",
    "hanViet": "THỜI HẬU",
    "radical": "日",
    "strokeCount": 10,
    "hskLevel": 1,
    "lesson": 11,
    "partOfSpeech": "danh từ",
    "viet": "lúc, khi, thời gian",
    "vi_meaning_full": "khoảng thời gian diễn ra một sự việc hoặc mốc thời điểm",
    "vi_meaning_short": "lúc, khi, thời gian",
    "enMeaning": "time, moment",
    "image": "https://images.pexels.com/photos/35070219/pexels-photo-35070219.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "什么时候",
      "……的时候"
    ],
    "compounds": [
      "时间",
      "气候"
    ],
    "synonyms": [
      "时间",
      "阶段"
    ],
    "antonyms": [],
    "confusableWords": "小时",
    "sentences": [
      {
        "zh": "你什么时候回家？",
        "pinyin": "Nǐ shénme shíhou huí jiā?",
        "vi": "Khi nào bạn về nhà?",
        "tag": "Hỏi thăm"
      },
      {
        "zh": "吃东西的时候别说话。",
        "pinyin": "Chī dōngxi de shíhou bié shuōhuà.",
        "vi": "Lúc ăn đồ đừng nói chuyện.",
        "tag": "Cảnh báo"
      }
    ]
  },
  {
    "id": "hsk1-11-8",
    "hanzi": "我们",
    "traditional": "我們",
    "pinyin": "wǒmen",
    "pinyinClean": "women",
    "hanViet": "NGÃ MÔN",
    "radical": "戈",
    "strokeCount": 7,
    "hskLevel": 1,
    "lesson": 11,
    "partOfSpeech": "đại từ ngôi thứ 1 số nhiều",
    "viet": "chúng tôi, chúng ta",
    "vi_meaning_full": "đại từ xưng呼 chỉ tập thể bao gồm người nói và những người cùng phe",
    "vi_meaning_short": "chúng tôi, chúng ta",
    "enMeaning": "we, us",
    "image": "https://images.pexels.com/photos/8436544/pexels-photo-8436544.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "我们都是",
      "我们的"
    ],
    "compounds": [
      "我",
      "门"
    ],
    "synonyms": [
      "咱们"
    ],
    "antonyms": [
      "你们",
      "他们"
    ],
    "confusableWords": "你们",
    "sentences": [
      {
        "zh": "我们都是学生。",
        "pinyin": "Wǒmen dōu shì xuésheng.",
        "vi": "Chúng tôi đều là học sinh.",
        "tag": "Tập thể"
      },
      {
        "zh": "我们一起去吧。",
        "pinyin": "Wǒmen yìqǐ qù ba.",
        "vi": "Chúng ta cùng đi đi.",
        "tag": "Rủ rê"
      }
    ]
  },
  {
    "id": "hsk1-11-1",
    "hanzi": "现在",
    "traditional": "現在",
    "pinyin": "xiànzài",
    "pinyinClean": "xianzai",
    "hanViet": "HIỆN TẠI",
    "radical": "王",
    "strokeCount": 8,
    "hskLevel": 1,
    "lesson": 11,
    "partOfSpeech": "danh từ thời gian",
    "viet": "bây giờ, hiện tại",
    "vi_meaning_full": "thời điểm ngay lúc này đang diễn ra",
    "vi_meaning_short": "bây giờ, hiện tại",
    "enMeaning": "now, at present",
    "image": "https://images.pexels.com/photos/14979013/pexels-photo-14979013.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "现在是",
      "现在去"
    ],
    "compounds": [
      "现场",
      "存在"
    ],
    "synonyms": [
      "如今",
      "目前"
    ],
    "antonyms": [
      "过去",
      "将来"
    ],
    "confusableWords": "经常",
    "sentences": [
      {
        "zh": "现在几点了？",
        "pinyin": "Xiànzài jǐ diǎn le?",
        "vi": "Bây giờ là mấy giờ rồi?",
        "tag": "Thời gian"
      },
      {
        "zh": "我现在很忙。",
        "pinyin": "Wǒ xiànzài hěn máng.",
        "vi": "Bây giờ tôi rất bận.",
        "tag": "Trạng thái"
      }
    ]
  },
  {
    "id": "hsk1-11-4",
    "hanzi": "中午",
    "traditional": "中午",
    "pinyin": "zhōngwǔ",
    "pinyinClean": "zhongwu",
    "hanViet": "TRUNG NGỌ",
    "radical": "丨",
    "strokeCount": 4,
    "hskLevel": 1,
    "lesson": 11,
    "partOfSpeech": "danh từ thời gian",
    "viet": "buổi trưa",
    "vi_meaning_full": "khoảng thời gian 12 giờ trưa",
    "vi_meaning_short": "buổi trưa",
    "enMeaning": "noon, midday",
    "image": "https://images.pexels.com/photos/8363978/pexels-photo-8363978.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "中午吃饭",
      "今天中午"
    ],
    "compounds": [],
    "synonyms": [
      "丨",
      "午"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "中午我们去吃饭。",
        "pinyin": "Zhōngwǔ wǒmen qù chīfàn.",
        "vi": "Buổi trưa chúng tôi đi ăn cơm.",
        "tag": "Thời gian"
      },
      {
        "zh": "正午",
        "pinyin": "",
        "vi": "中, 午",
        "tag": "上午, 下午"
      }
    ]
  },
  {
    "id": "hsk1-11-10",
    "hanzi": "住",
    "traditional": "住",
    "pinyin": "zhù",
    "pinyinClean": "zhu",
    "hanViet": "TRÚ",
    "radical": "亻",
    "strokeCount": 7,
    "hskLevel": 1,
    "lesson": 11,
    "partOfSpeech": "động từ",
    "viet": "sống, ở",
    "vi_meaning_full": "sinh sống, cư trú lâu dài tại một địa điểm",
    "vi_meaning_short": "sống, ở",
    "enMeaning": "to live, to reside",
    "image": "https://images.pexels.com/photos/19028887/pexels-photo-19028887.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "住在",
      "居住"
    ],
    "compounds": [],
    "synonyms": [
      "亻",
      "主",
      "住"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "我住在北京。",
        "pinyin": "Wǒ zhù zài Běijīng.",
        "vi": "Tôi sống ở Bắc Kinh.",
        "tag": "Địa chỉ"
      },
      {
        "zh": "居",
        "pinyin": "",
        "vi": "住房, 居住",
        "tag": "往, 主"
      }
    ]
  },
  {
    "id": "hsk1-12-8",
    "hanzi": "爱",
    "traditional": "愛",
    "pinyin": "ài",
    "pinyinClean": "ai",
    "hanViet": "ÁI",
    "radical": "爪",
    "strokeCount": 10,
    "hskLevel": 1,
    "lesson": 12,
    "partOfSpeech": "động từ",
    "viet": "yêu, thích",
    "vi_meaning_full": "dùng để thể hiện tình cảm yêu thương sâu sắc hoặc niềm yêu thích đối với công việc, hoạt động",
    "vi_meaning_short": "yêu, thích",
    "enMeaning": "to love, to like",
    "image": "https://images.pexels.com/photos/28800805/pexels-photo-28800805.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "爱人",
      "爱看书",
      "喜爱"
    ],
    "compounds": [
      "可爱",
      "爱情",
      "喜爱"
    ],
    "synonyms": [
      "喜欢"
    ],
    "antonyms": [
      "恨",
      "讨厌"
    ],
    "confusableWords": "按, 安",
    "sentences": [
      {
        "zh": "妈妈，我爱你。",
        "pinyin": "Māma, wǒ ài nǐ.",
        "vi": "Mẹ ơi, con yêu mẹ.",
        "tag": "Gia đình"
      },
      {
        "zh": "他很爱看书。",
        "pinyin": "Tā hěn ài kàn shū.",
        "vi": "Anh ấy rất thích đọc sách.",
        "tag": "Sở thích"
      }
    ]
  },
  {
    "id": "hsk1-12-52",
    "hanzi": "来",
    "traditional": "來",
    "pinyin": "lái",
    "pinyinClean": "lai",
    "hanViet": "LAI",
    "radical": "木",
    "strokeCount": 7,
    "hskLevel": 1,
    "lesson": 12,
    "partOfSpeech": "động từ",
    "viet": "đến, tới",
    "vi_meaning_full": "hành động di chuyển từ chỗ khác hướng về vị trí của người nói",
    "vi_meaning_short": "đến, tới",
    "enMeaning": "to come",
    "image": "https://images.pexels.com/photos/8036573/pexels-photo-8036573.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "来到",
      "请来",
      "来家"
    ],
    "compounds": [
      "往来",
      "来年"
    ],
    "synonyms": [
      "到"
    ],
    "antonyms": [
      "去"
    ],
    "confusableWords": "米, 夹",
    "sentences": [
      {
        "zh": "欢迎来到中国！",
        "pinyin": "Huānyíng lái dào Zhōngguó!",
        "vi": "Chào mừng đến Trung Quốc!",
        "tag": "Giao tiếp"
      },
      {
        "zh": "他今天没来学校。",
        "pinyin": "Tā jīntiān méi lái xuéxiào.",
        "vi": "Hôm nay anh ấy không đến trường.",
        "tag": "Điểm danh"
      }
    ]
  },
  {
    "id": "hsk1-12-5",
    "hanzi": "冷",
    "traditional": "冷",
    "pinyin": "lěng",
    "pinyinClean": "leng",
    "hanViet": "LÃNH",
    "radical": "冫",
    "strokeCount": 7,
    "hskLevel": 1,
    "lesson": 12,
    "partOfSpeech": "tính từ",
    "viet": "lạnh, rét",
    "vi_meaning_full": "có nhiệt độ thấp khiến con người cảm thấy rét",
    "vi_meaning_short": "lạnh, rét",
    "enMeaning": "cold",
    "image": "https://images.pexels.com/photos/29860604/pexels-photo-29860604.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "很冷",
      "太冷了"
    ],
    "compounds": [
      "冷气",
      "冷水"
    ],
    "synonyms": [
      "寒"
    ],
    "antonyms": [
      "热"
    ],
    "confusableWords": "令, 怜",
    "sentences": [
      {
        "zh": "今天天气很冷。",
        "pinyin": "Jīntiān tiānqì hěn lěng.",
        "vi": "Hôm nay thời tiết rất lạnh.",
        "tag": "Thời tiết"
      },
      {
        "zh": "外面太冷了，别出去。",
        "pinyin": "Wàimiàn tài lěng le, bié chūqù.",
        "vi": "Bên ngoài lạnh quá, đừng ra ngoài.",
        "tag": "Khuyên bảo"
      }
    ]
  },
  {
    "id": "hsk1-12-4",
    "hanzi": "热",
    "traditional": "熱",
    "pinyin": "rè",
    "pinyinClean": "re",
    "hanViet": "NHIỆT",
    "radical": "灬",
    "strokeCount": 10,
    "hskLevel": 1,
    "lesson": 12,
    "partOfSpeech": "tính từ / động từ",
    "viet": "nóng",
    "vi_meaning_full": "có nhiệt độ cao gây cảm giác nóng nảy hoặc đun nóng",
    "vi_meaning_short": "nóng",
    "enMeaning": "hot",
    "image": "https://images.pexels.com/photos/28944485/pexels-photo-28944485.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "很热",
      "热水",
      "太热了"
    ],
    "compounds": [
      "热水",
      "热闹"
    ],
    "synonyms": [
      "炎热"
    ],
    "antonyms": [
      "冷"
    ],
    "confusableWords": "势, 丸",
    "sentences": [
      {
        "zh": "今天天气真热。",
        "pinyin": "Jīntiān tiānqì zhēn rè.",
        "vi": "Hôm nay thời tiết thật nóng.",
        "tag": "Thời tiết"
      },
      {
        "zh": "请喝热茶。",
        "pinyin": "Qǐng hē rè chá.",
        "vi": "Mời uống trà nóng.",
        "tag": "Phục vụ"
      }
    ]
  },
  {
    "id": "hsk1-12-11",
    "hanzi": "水",
    "traditional": "水",
    "pinyin": "shuǐ",
    "pinyinClean": "shui",
    "hanViet": "THỦY",
    "radical": "水",
    "strokeCount": 4,
    "hskLevel": 1,
    "lesson": 12,
    "partOfSpeech": "danh từ",
    "viet": "nước",
    "vi_meaning_full": "chất lỏng trong suốt không màu không mùi cần thiết cho sự sống",
    "vi_meaning_short": "nước",
    "enMeaning": "water",
    "image": "https://images.pexels.com/photos/9000378/pexels-photo-9000378.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "喝水",
      "热水",
      "水果"
    ],
    "compounds": [
      "水果",
      "水平",
      "水水"
    ],
    "synonyms": [
      "液体"
    ],
    "antonyms": [],
    "confusableWords": "冰, 永",
    "sentences": [
      {
        "zh": "请喝水。",
        "pinyin": "Qǐng hē shuǐ.",
        "vi": "Mời uống nước.",
        "tag": "Giao tiếp"
      },
      {
        "zh": "杯子里没有水了。",
        "pinyin": "Bēizi lǐ méiyǒu shuǐ le.",
        "vi": "Trong cốc không còn nước nữa.",
        "tag": "Trạng thái"
      }
    ]
  },
  {
    "id": "hsk1-12-10",
    "hanzi": "水果",
    "traditional": "水果",
    "pinyin": "shuǐguǒ",
    "pinyinClean": "shuiguo",
    "hanViet": "THỦY QUẢ",
    "radical": "水",
    "strokeCount": 4,
    "hskLevel": 1,
    "lesson": 12,
    "partOfSpeech": "danh từ",
    "viet": "hoa quả, trái cây",
    "vi_meaning_full": "tên gọi chung cho các loại quả cây có chứa nhiều nước ăn tươi được",
    "vi_meaning_short": "hoa quả, trái cây",
    "enMeaning": "fruit",
    "image": "https://images.pexels.com/photos/15537200/pexels-photo-15537200.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "吃水果",
      "买水果"
    ],
    "compounds": [
      "水",
      "苹果"
    ],
    "synonyms": [
      "鲜果"
    ],
    "antonyms": [],
    "confusableWords": "蔬菜",
    "sentences": [
      {
        "zh": "你喜欢吃什么水果？",
        "pinyin": "Nǐ xǐhuan chī shénme shuǐguǒ?",
        "vi": "Bạn thích ăn trái cây gì?",
        "tag": "Sở thích"
      },
      {
        "zh": "商店里有很多水果。",
        "pinyin": "Shāngdiàn lǐ yǒu hěn duō shuǐguǒ.",
        "vi": "Trong cửa hàng có rất nhiều trái cây.",
        "tag": "Mua sắm"
      }
    ]
  },
  {
    "id": "hsk1-12-3",
    "hanzi": "太",
    "traditional": "太",
    "pinyin": "tài",
    "pinyinClean": "tai",
    "hanViet": "THÁI",
    "radical": "大",
    "strokeCount": 4,
    "hskLevel": 1,
    "lesson": 12,
    "partOfSpeech": "phó từ",
    "viet": "quá, lắm",
    "vi_meaning_full": "phó từ chỉ mức độ quá cao, thường đi cùng 了 ở cuối câu",
    "vi_meaning_short": "quá, lắm",
    "enMeaning": "too, extremely",
    "image": "https://images.pexels.com/photos/10822567/pexels-photo-10822567.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "太好了",
      "太大了",
      "太热了"
    ],
    "compounds": [
      "太阳",
      "太太"
    ],
    "synonyms": [
      "过于",
      "顶"
    ],
    "antonyms": [],
    "confusableWords": "大, 犬",
    "sentences": [
      {
        "zh": "太好了！",
        "pinyin": "Tài hǎo le!",
        "vi": "Thật là tốt quá!",
        "tag": "Cảm thán"
      },
      {
        "zh": "这个苹果太贵了。",
        "pinyin": "Zhè gè píngguǒ tài guì le.",
        "vi": "Quả táo này đắt quá.",
        "tag": "Đánh giá"
      }
    ]
  },
  {
    "id": "hsk1-12-1",
    "hanzi": "天气",
    "traditional": "天氣",
    "pinyin": "tiānqì",
    "pinyinClean": "tianqi",
    "hanViet": "THIÊN KHÍ",
    "radical": "大",
    "strokeCount": 4,
    "hskLevel": 1,
    "lesson": 12,
    "partOfSpeech": "danh từ",
    "viet": "thời tiết",
    "vi_meaning_full": "trạng thái khí hậu như nắng, mưa, nóng, lạnh trong bầu khí quyển",
    "vi_meaning_short": "thời tiết",
    "enMeaning": "weather",
    "image": "https://images.pexels.com/photos/9940016/pexels-photo-9940016.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "天气好",
      "天气冷",
      "晴天"
    ],
    "compounds": [
      "天",
      "气"
    ],
    "synonyms": [
      "气候"
    ],
    "antonyms": [],
    "confusableWords": "天气",
    "sentences": [
      {
        "zh": "今天天气怎么样？",
        "pinyin": "Jīntiān tiānqì zěnmeyàng?",
        "vi": "Thời tiết hôm nay thế nào?",
        "tag": "Hỏi thăm"
      },
      {
        "zh": "今天天气很好。",
        "pinyin": "Jīntiān tiānqì hěn hǎo.",
        "vi": "Hôm nay thời tiết rất tốt.",
        "tag": "Trò chuyện"
      }
    ]
  },
  {
    "id": "hsk1-12-6",
    "hanzi": "下雨",
    "traditional": "下雨",
    "pinyin": "xià yǔ",
    "pinyinClean": "xiayu",
    "hanViet": "HẠ VŨ",
    "radical": "一",
    "strokeCount": 3,
    "hskLevel": 1,
    "lesson": 12,
    "partOfSpeech": "động từ cụm",
    "viet": "mưa, rơi mưa",
    "vi_meaning_full": "hiện tượng thời tiết giọt nước ngưng tụ từ mây rơi xuống đất",
    "vi_meaning_short": "mưa, rơi mưa",
    "enMeaning": "to rain",
    "image": "https://images.pexels.com/photos/25956342/pexels-photo-25956342.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "下大雨",
      "下雨了"
    ],
    "compounds": [
      "雨水",
      "降雨"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "下雪",
    "sentences": [
      {
        "zh": "外面下雨了。",
        "pinyin": "Wàimiàn xià yǔ le.",
        "vi": "Bên ngoài mưa rồi.",
        "tag": "Thời tiết"
      },
      {
        "zh": "明天会下雨吗？",
        "pinyin": "Míngtiān huì xià yǔ ma?",
        "vi": "Ngày mai có mưa không?",
        "tag": "Dự báo"
      }
    ]
  },
  {
    "id": "hsk1-12-124",
    "hanzi": "小姐",
    "traditional": "小姐",
    "pinyin": "xiǎojiě",
    "pinyinClean": "xiaojie",
    "hanViet": "TIỂU THƯ",
    "radical": "小",
    "strokeCount": 3,
    "hskLevel": 1,
    "lesson": 12,
    "partOfSpeech": "danh từ lịch sự",
    "viet": "cô, cô gái",
    "vi_meaning_full": "từ xưng呼 lịch sự dành cho phụ nữ trẻ tuổi",
    "vi_meaning_short": "cô, cô gái",
    "enMeaning": "Miss, young lady",
    "image": "https://images.pexels.com/photos/8846648/pexels-photo-8846648.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "张小姐",
      "李小姐"
    ],
    "compounds": [],
    "synonyms": [
      "小",
      "女",
      "姐"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "王小姐很漂亮。",
        "pinyin": "Wáng xiǎojiě hěn piàoliang.",
        "vi": "Cô Vương rất xinh đẹp.",
        "tag": "Miêu tả"
      },
      {
        "zh": "女士",
        "pinyin": "先生",
        "vi": "姐姐",
        "tag": "小, 姐"
      }
    ]
  },
  {
    "id": "hsk1-12-9",
    "hanzi": "些",
    "traditional": "些",
    "pinyin": "xiē",
    "pinyinClean": "xie",
    "hanViet": "TA",
    "radical": "二",
    "strokeCount": 8,
    "hskLevel": 1,
    "lesson": 12,
    "partOfSpeech": "lượng từ",
    "viet": "vài, một số, một chút",
    "vi_meaning_full": "lượng từ không xác định chỉ một vài số lượng ít",
    "vi_meaning_short": "vài, một số, một chút",
    "enMeaning": "some, a few",
    "image": "https://images.pexels.com/photos/793772/pexels-photo-793772.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "these",
      "那些",
      "一些"
    ],
    "compounds": [],
    "synonyms": [
      "二",
      "止",
      "些"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "桌子上有一些苹果。",
        "pinyin": "Zhuōzi shang yǒu yìxiē píngguǒ.",
        "vi": "Trên bàn có một vài quả táo.",
        "tag": "Số lượng"
      },
      {
        "zh": "有些",
        "pinyin": "",
        "vi": "一些, 那些",
        "tag": "紫, 此"
      }
    ]
  },
  {
    "id": "hsk1-12-2",
    "hanzi": "怎么样",
    "traditional": "怎麼樣",
    "pinyin": "zěnmeyàng",
    "pinyinClean": "zenmeyang",
    "hanViet": "CHẨM MA DẠNG",
    "radical": "心",
    "strokeCount": 9,
    "hskLevel": 1,
    "lesson": 12,
    "partOfSpeech": "cụm đại từ",
    "viet": "thế nào, ra sao",
    "vi_meaning_full": "hỏi ý kiến, tính chất hoặc trạng thái",
    "vi_meaning_short": "thế nào, ra sao",
    "enMeaning": "how about, how is it",
    "image": "https://images.pexels.com/photos/8837261/pexels-photo-8837261.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "天气怎么样",
      "你觉得怎么样"
    ],
    "compounds": [],
    "synonyms": [
      "心",
      "木",
      "样"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "今天天气怎么样？",
        "pinyin": "Jīntiān tiānqì zěnmeyàng?",
        "vi": "Thời tiết hôm nay thế nào?",
        "tag": "Hỏi thăm"
      },
      {
        "zh": "如何",
        "pinyin": "",
        "vi": "怎样",
        "tag": "怎么"
      }
    ]
  },
  {
    "id": "hsk1-13-9",
    "hanzi": "打电话",
    "traditional": "打電話",
    "pinyin": "dǎ diànhuà",
    "pinyinClean": "dadianhua",
    "hanViet": "ĐẢ ĐIỆN THOẠI",
    "radical": "手",
    "strokeCount": 5,
    "hskLevel": 1,
    "lesson": 13,
    "partOfSpeech": "động từ cụm",
    "viet": "gọi điện thoại",
    "vi_meaning_full": "thực hiện cuộc gọi trao đổi thông tin bằng thiết bị điện thoại",
    "vi_meaning_short": "gọi điện thoại",
    "enMeaning": "to make a phone call",
    "image": "https://images.pexels.com/photos/11861959/pexels-photo-11861959.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "给……打电话"
    ],
    "compounds": [
      "电话"
    ],
    "synonyms": [
      "通电话"
    ],
    "antonyms": [],
    "confusableWords": "打字",
    "sentences": [
      {
        "zh": "他在打电话。",
        "pinyin": "Tā zài dǎ diànhuà.",
        "vi": "Anh ấy đang gọi điện thoại.",
        "tag": "Liên lạc"
      },
      {
        "zh": "我想给你打电话。",
        "pinyin": "Wǒ xiǎng gěi nǐ dǎ diànhuà.",
        "vi": "Tôi muốn gọi điện cho bạn.",
        "tag": "Trò chuyện"
      }
    ]
  },
  {
    "id": "hsk1-13-156",
    "hanzi": "大卫",
    "traditional": "大衛",
    "pinyin": "Dàwèi",
    "pinyinClean": "dawei",
    "hanViet": "ĐẠI VỆ",
    "radical": "大",
    "strokeCount": 3,
    "hskLevel": 1,
    "lesson": 13,
    "partOfSpeech": "danh từ riêng",
    "viet": "David, Đại Vệ",
    "vi_meaning_full": "tên riêng phiên âm nước ngoài (David) trong giáo trình",
    "vi_meaning_short": "David, Đại Vệ",
    "enMeaning": "David (name)",
    "image": "https://images.pexels.com/photos/7683736/pexels-photo-7683736.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "大卫同学"
    ],
    "compounds": [],
    "synonyms": [
      "大",
      "卫"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "大卫是美国人。",
        "pinyin": "Dàwèi shì Měiguó rén.",
        "vi": "David là người Mỹ.",
        "tag": "Giới thiệu"
      }
    ]
  },
  {
    "id": "hsk1-13-6",
    "hanzi": "电视",
    "traditional": "電視",
    "pinyin": "diànshì",
    "pinyinClean": "dianshi",
    "hanViet": "ĐIỆN THỊ",
    "radical": "日",
    "strokeCount": 11,
    "hskLevel": 1,
    "lesson": 13,
    "partOfSpeech": "danh từ",
    "viet": "ti vi, truyền hình",
    "vi_meaning_full": "thiết bị truyền hình nhận và phát hình ảnh, âm thanh từ xa",
    "vi_meaning_short": "ti vi, truyền hình",
    "enMeaning": "television, TV",
    "image": "https://images.pexels.com/photos/9646752/pexels-photo-9646752.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "看电视",
      "电视台",
      "电视机"
    ],
    "compounds": [
      "电视剧",
      "电视台"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "电脑, 电影",
    "sentences": [
      {
        "zh": "我和家人一起看电视。",
        "pinyin": "Wǒ hé jiārén yìqǐ kàn diànshì.",
        "vi": "Tôi cùng gia đình xem ti vi.",
        "tag": "Giải trí"
      },
      {
        "zh": "这个电视很贵。",
        "pinyin": "Zhè gè diànshì hěn guì.",
        "vi": "Cái ti vi này rất đắt.",
        "tag": "Mua sắm"
      }
    ]
  },
  {
    "id": "hsk1-13-4",
    "hanzi": "上午",
    "traditional": "上午",
    "pinyin": "shàngwǔ",
    "pinyinClean": "shangwu",
    "hanViet": "THƯỢNG NGỌ",
    "radical": "一",
    "strokeCount": 3,
    "hskLevel": 1,
    "lesson": 13,
    "partOfSpeech": "danh từ thời gian",
    "viet": "buổi sáng",
    "vi_meaning_full": "khoảng thời gian từ sáng sớm đến trước 12 giờ trưa",
    "vi_meaning_short": "buổi sáng",
    "enMeaning": "morning",
    "image": "https://images.pexels.com/photos/18281419/pexels-photo-18281419.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "今天上午",
      "九点上午"
    ],
    "compounds": [
      "早上",
      "中午"
    ],
    "synonyms": [
      "早晨"
    ],
    "antonyms": [
      "下午"
    ],
    "confusableWords": "下午, 中午",
    "sentences": [
      {
        "zh": "上午我有课。",
        "pinyin": "Shàngwǔ wǒ yǒu kè.",
        "vi": "Buổi sáng tôi có tiết học.",
        "tag": "Lịch trình"
      },
      {
        "zh": "明天上午我们开会。",
        "pinyin": "Míngtiān shàngwǔ wǒmen kāihuì.",
        "vi": "Sáng mai chúng tôi họp.",
        "tag": "Công việc"
      }
    ]
  },
  {
    "id": "hsk1-13-5",
    "hanzi": "睡觉",
    "traditional": "睡覺",
    "pinyin": "shuìjiào",
    "pinyinClean": "shuijiao",
    "hanViet": "THỤY GIÁC",
    "radical": "目",
    "strokeCount": 13,
    "hskLevel": 1,
    "lesson": 13,
    "partOfSpeech": "động từ cụm",
    "viet": "ngủ, đi ngủ",
    "vi_meaning_full": "trạng thái cơ thể nhắm mắt nghỉ ngơi hoàn toàn ý thức",
    "vi_meaning_short": "ngủ, đi ngủ",
    "enMeaning": "to sleep, to go to bed",
    "image": "https://images.pexels.com/photos/18864132/pexels-photo-18864132.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "去睡觉",
      "睡觉了"
    ],
    "compounds": [
      "睡",
      "感觉"
    ],
    "synonyms": [
      "睡眠"
    ],
    "antonyms": [
      "起床"
    ],
    "confusableWords": "睡觉",
    "sentences": [
      {
        "zh": "我要去睡觉了。",
        "pinyin": "Wǒ yào qù shuìjiào le.",
        "vi": "Tôi sắp đi ngủ rồi.",
        "tag": "Hàng ngày"
      },
      {
        "zh": "他还在睡觉。",
        "pinyin": "Tā hái zài shuìjiào.",
        "vi": "Anh ấy vẫn đang ngủ.",
        "tag": "Trạng thái"
      }
    ]
  },
  {
    "id": "hsk1-13-1",
    "hanzi": "喂",
    "traditional": "餵",
    "pinyin": "wèi",
    "pinyinClean": "wei",
    "hanViet": "ÚY",
    "radical": "口",
    "strokeCount": 12,
    "hskLevel": 1,
    "lesson": 13,
    "partOfSpeech": "thán từ",
    "viet": "alo, này",
    "vi_meaning_full": "thán từ dùng để chào hỏi hoặc bắt đầu khi nghe điện thoại",
    "vi_meaning_short": "alo, này",
    "enMeaning": "hello (on the phone), hey",
    "image": "https://images.pexels.com/photos/40035691/pexels-photo-40035691.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "喂",
      "你好"
    ],
    "compounds": [
      "喂养"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "畏, 胃",
    "sentences": [
      {
        "zh": "喂，请问是谁？",
        "pinyin": "Wèi, qǐngwèn shì shéi?",
        "vi": "Alo, xin hỏi ai đấy?",
        "tag": "Điện thoại"
      },
      {
        "zh": "喂，你看前面！",
        "pinyin": "Wèi, nǐ kàn qiánmiàn!",
        "vi": "Này, bạn xem phía trước kìa!",
        "tag": "Giao tiếp"
      }
    ]
  },
  {
    "id": "hsk1-13-7",
    "hanzi": "喜欢",
    "traditional": "喜歡",
    "pinyin": "xǐhuan",
    "pinyinClean": "xihuan",
    "hanViet": "HỶ HOAN",
    "radical": "口",
    "strokeCount": 12,
    "hskLevel": 1,
    "lesson": 13,
    "partOfSpeech": "động từ tâm lý",
    "viet": "thích, yêu thích",
    "vi_meaning_full": "có tình cảm mến mộ hoặc hứng thú với người, vật, hoạt động nào đó",
    "vi_meaning_short": "thích, yêu thích",
    "enMeaning": "to like, to be fond of",
    "image": "https://images.pexels.com/photos/15277088/pexels-photo-15277088.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "很喜欢",
      "喜欢吃",
      "喜欢看"
    ],
    "compounds": [
      "喜悦",
      "欢喜"
    ],
    "synonyms": [
      "喜爱",
      "爱"
    ],
    "antonyms": [
      "讨厌",
      "讨厌"
    ],
    "confusableWords": "欢喜",
    "sentences": [
      {
        "zh": "我喜欢学汉语。",
        "pinyin": "Wǒ xǐhuan xué Hànyǔ.",
        "vi": "Tôi thích học tiếng Trung.",
        "tag": "Sở thích"
      },
      {
        "zh": "你喜欢什么水果？",
        "pinyin": "Nǐ xǐhuan shénme shuǐguǒ?",
        "vi": "Bạn thích quả gì?",
        "tag": "Hỏi đáp"
      }
    ]
  },
  {
    "id": "hsk1-13-3",
    "hanzi": "学习",
    "traditional": "學習",
    "pinyin": "xuéxí",
    "pinyinClean": "xuexi",
    "hanViet": "HỌC TẬP",
    "radical": "子",
    "strokeCount": 8,
    "hskLevel": 1,
    "lesson": 13,
    "partOfSpeech": "động từ",
    "viet": "học tập, học",
    "vi_meaning_full": "quá trình tiếp thu kiến thức, kỹ năng",
    "vi_meaning_short": "học tập, học",
    "enMeaning": "to study, to learn",
    "image": "https://images.pexels.com/photos/9489923/pexels-photo-9489923.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "学习汉语",
      "认真学习"
    ],
    "compounds": [],
    "synonyms": [
      "子",
      "学",
      "习"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "我喜欢学习汉语。",
        "pinyin": "Wǒ xǐhuan xuéxí Hànyǔ.",
        "vi": "Tôi thích học tiếng Trung.",
        "tag": "Học tập"
      },
      {
        "zh": "学习",
        "pinyin": "",
        "vi": "学问, 练习",
        "tag": "复习"
      }
    ]
  },
  {
    "id": "hsk1-14-7",
    "hanzi": "车",
    "traditional": "车",
    "pinyin": "chē",
    "pinyinClean": "che",
    "hanViet": "XA",
    "radical": "",
    "strokeCount": 0,
    "hskLevel": 1,
    "lesson": 14,
    "partOfSpeech": "",
    "viet": "xe",
    "enMeaning": "",
    "image": "https://images.pexels.com/photos/9975992/pexels-photo-9975992.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [],
    "compounds": [],
    "synonyms": [],
    "antonyms": [],
    "sentences": [],
    "vi_meaning_full": "xe",
    "vi_meaning_short": "xe"
  },
  {
    "id": "hsk1-14-1",
    "hanzi": "东西",
    "traditional": "東西",
    "pinyin": "dōngxi",
    "pinyinClean": "dongxi",
    "hanViet": "ĐÔNG TÂY",
    "radical": "木",
    "strokeCount": 8,
    "hskLevel": 1,
    "lesson": 14,
    "partOfSpeech": "danh từ",
    "viet": "đồ đạc, vật",
    "vi_meaning_full": "từ khái quát chỉ vật thể, đồ đạc hoặc hàng hóa nói chung",
    "vi_meaning_short": "đồ đạc, vật",
    "enMeaning": "thing, stuff",
    "image": "https://images.pexels.com/photos/19869755/pexels-photo-19869755.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "买东西",
      "吃东西",
      "好东西"
    ],
    "compounds": [
      "东",
      "西"
    ],
    "synonyms": [
      "物品",
      "物件"
    ],
    "antonyms": [],
    "confusableWords": "东, 西",
    "sentences": [
      {
        "zh": "你想买什么东西？",
        "pinyin": "Nǐ xiǎng mǎi shénme dōngxi?",
        "vi": "Bạn muốn mua đồ gì?",
        "tag": "Mua sắm"
      },
      {
        "zh": "桌子上有很多东西。",
        "pinyin": "Zhuōzi shang yǒu hěn duō dōngxi.",
        "vi": "Trên bàn có rất nhiều đồ đạc.",
        "tag": "Miêu tả"
      }
    ]
  },
  {
    "id": "hsk1-14-16",
    "hanzi": "都",
    "traditional": "都",
    "pinyin": "dōu",
    "pinyinClean": "dou",
    "hanViet": "ĐÔ",
    "radical": "阝",
    "strokeCount": 10,
    "hskLevel": 1,
    "lesson": 14,
    "partOfSpeech": "phó từ",
    "viet": "đều, tất cả",
    "vi_meaning_full": "phó từ chỉ sự bao quát tất cả các đối tượng hoặc nhấn mạnh mức độ",
    "vi_meaning_short": "đều, tất cả",
    "enMeaning": "all, both",
    "image": "https://images.pexels.com/photos/12517417/pexels-photo-12517417.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "我们都",
      "都在",
      "都好"
    ],
    "compounds": [
      "首都"
    ],
    "synonyms": [
      "全",
      "皆"
    ],
    "antonyms": [
      "不"
    ],
    "confusableWords": "者, 堵",
    "sentences": [
      {
        "zh": "我们都是学生。",
        "pinyin": "Wǒmen dōu shì xuésheng.",
        "vi": "Chúng tôi đều là học sinh.",
        "tag": "Tập thể"
      },
      {
        "zh": "these菜都很好吃。",
        "pinyin": "Zhèxiē cài dōu hěn hǎochī.",
        "vi": "Mấy món này đều rất ngon.",
        "tag": "Khen ngợi"
      }
    ]
  },
  {
    "id": "hsk1-14-9",
    "hanzi": "分钟",
    "traditional": "分鐘",
    "pinyin": "fēnzhōng",
    "pinyinClean": "fenzhong",
    "hanViet": "PHÂN CHUNG",
    "radical": "刀",
    "strokeCount": 4,
    "hskLevel": 1,
    "lesson": 14,
    "partOfSpeech": "lượng từ / danh từ",
    "viet": "phút",
    "vi_meaning_full": "đơn vị đo thời gian bằng một phần sáu mươi của một giờ",
    "vi_meaning_short": "phút",
    "enMeaning": "minute",
    "image": "https://images.pexels.com/photos/15930049/pexels-photo-15930049.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "几分钟",
      "十分钟"
    ],
    "compounds": [
      "分",
      "钟表"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "秒钟, 小时",
    "sentences": [
      {
        "zh": "请等我五分钟。",
        "pinyin": "Qǐng děng wǒ wǔ fēnzhōng.",
        "vi": "Xin chờ tôi năm phút.",
        "tag": "Thời gian"
      },
      {
        "zh": "还有十分钟开会。",
        "pinyin": "Hái yǒu shí fēnzhōng kāihuì.",
        "vi": "Còn mười phút nữa họp.",
        "tag": "Công việc"
      }
    ]
  },
  {
    "id": "hsk1-14-10",
    "hanzi": "后",
    "traditional": "后",
    "pinyin": "hòu",
    "pinyinClean": "hou",
    "hanViet": "HẬU",
    "radical": "",
    "strokeCount": 0,
    "hskLevel": 1,
    "lesson": 14,
    "partOfSpeech": "",
    "viet": "sau, sau khi",
    "enMeaning": "",
    "image": "https://images.pexels.com/photos/9069402/pexels-photo-9069402.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [],
    "compounds": [],
    "synonyms": [],
    "antonyms": [],
    "sentences": [],
    "vi_meaning_full": "sau, sau khi",
    "vi_meaning_short": "sau, sau khi"
  },
  {
    "id": "hsk1-14-8",
    "hanzi": "回来",
    "traditional": "回来",
    "pinyin": "huílái",
    "pinyinClean": "huilai",
    "hanViet": "HỒI LAI",
    "radical": "",
    "strokeCount": 0,
    "hskLevel": 1,
    "lesson": 14,
    "partOfSpeech": "",
    "viet": "trở về",
    "enMeaning": "",
    "image": "https://images.pexels.com/photos/11825154/pexels-photo-11825154.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [],
    "compounds": [],
    "synonyms": [],
    "antonyms": [],
    "sentences": [],
    "vi_meaning_full": "trở về",
    "vi_meaning_short": "trở về"
  },
  {
    "id": "hsk1-14-6",
    "hanzi": "开",
    "traditional": "開",
    "pinyin": "kāi",
    "pinyinClean": "kai",
    "hanViet": "KHAI",
    "radical": "廾",
    "strokeCount": 4,
    "hskLevel": 1,
    "lesson": 14,
    "partOfSpeech": "động từ",
    "viet": "mở, lái (xe), tổ chức",
    "vi_meaning_full": "hành động mở cửa, vận hành xe cộ hoặc bắt đầu một cuộc họp",
    "vi_meaning_short": "mở, lái (xe), tổ chức",
    "enMeaning": "to open, to drive",
    "image": "https://images.pexels.com/photos/18213074/pexels-photo-18213074.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "开门",
      "开车",
      "开会"
    ],
    "compounds": [
      "开心",
      "开会",
      "开水"
    ],
    "synonyms": [
      "启",
      "始"
    ],
    "antonyms": [
      "关"
    ],
    "confusableWords": "井, 升",
    "sentences": [
      {
        "zh": "请开门。",
        "pinyin": "Qǐng kāi mén.",
        "vi": "Xin hãy mở cửa.",
        "tag": "Hàng ngày"
      },
      {
        "zh": "他会开车。",
        "pinyin": "Tā huì kāichē.",
        "vi": "Anh ấy biết lái xe.",
        "tag": "Kỹ năng"
      }
    ]
  },
  {
    "id": "hsk1-14-4",
    "hanzi": "看见",
    "traditional": "看見",
    "pinyin": "kànjiàn",
    "pinyinClean": "kanjian",
    "hanViet": "KHÁN KIẾN",
    "radical": "目",
    "strokeCount": 9,
    "hskLevel": 1,
    "lesson": 14,
    "partOfSpeech": "động từ kết quả",
    "viet": "nhìn thấy, thấy",
    "vi_meaning_full": "nhìn và đã thu nhận được hình ảnh vào thị giác",
    "vi_meaning_short": "nhìn thấy, thấy",
    "enMeaning": "to see, to catch sight of",
    "image": "https://images.pexels.com/photos/29723779/pexels-photo-29723779.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "看见了",
      "没看见"
    ],
    "compounds": [
      "看",
      "见面"
    ],
    "synonyms": [
      "看到"
    ],
    "antonyms": [],
    "confusableWords": "看见",
    "sentences": [
      {
        "zh": "我看见他了。",
        "pinyin": "Wǒ kànjiàn tā le.",
        "vi": "Tôi nhìn thấy anh ấy rồi.",
        "tag": "Quan sát"
      },
      {
        "zh": "你看见我的书了吗？",
        "pinyin": "Nǐ kànjiàn wǒ de shū le ma?",
        "vi": "Bạn có nhìn thấy quyển sách của tôi không?",
        "tag": "Tìm kiếm"
      }
    ]
  },
  {
    "id": "hsk1-14-12",
    "hanzi": "漂亮",
    "traditional": "漂亮",
    "pinyin": "piàoliang",
    "pinyinClean": "piaoliang",
    "hanViet": "PHIÊU LƯỢNG",
    "radical": "氵",
    "strokeCount": 14,
    "hskLevel": 1,
    "lesson": 14,
    "partOfSpeech": "tính từ",
    "viet": "xinh đẹp, đẹp",
    "vi_meaning_full": "có hình thức, màu sắc xinh xắn gây cảm giác dễ chịu cho thị giác",
    "vi_meaning_short": "xinh đẹp, đẹp",
    "enMeaning": "pretty, beautiful",
    "image": "https://images.pexels.com/photos/1031965/pexels-photo-1031965.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "很漂亮",
      "漂亮衣服"
    ],
    "compounds": [
      "漂"
    ],
    "synonyms": [
      "美丽",
      "好看"
    ],
    "antonyms": [
      "丑陋"
    ],
    "confusableWords": "漂流",
    "sentences": [
      {
        "zh": "这个女孩子很漂亮。",
        "pinyin": "Zhè gè nǚ háizi hěn piàoliang.",
        "vi": "Cô gái này rất xinh đẹp.",
        "tag": "Khen ngợi"
      },
      {
        "zh": "你买的衣服真漂亮！",
        "pinyin": "Nǐ mǎi de yīfu zhēn piàoliang!",
        "vi": "Quần áo bạn mua đẹp quá!",
        "tag": "Mua sắm"
      }
    ]
  },
  {
    "id": "hsk1-14-3",
    "hanzi": "苹果",
    "traditional": "蘋果",
    "pinyin": "píngguǒ",
    "pinyinClean": "pingguo",
    "hanViet": "TẦN QUẢ",
    "radical": "艹",
    "strokeCount": 8,
    "hskLevel": 1,
    "lesson": 14,
    "partOfSpeech": "danh từ",
    "viet": "quả táo",
    "vi_meaning_full": "loại quả tròn vỏ đỏ hoặc xanh, thịt giòn ngọt",
    "vi_meaning_short": "quả táo",
    "enMeaning": "apple",
    "image": "https://images.pexels.com/photos/914911/pexels-photo-914911.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "吃苹果",
      "一个苹果"
    ],
    "compounds": [
      "水果",
      "苹果树"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "平, 乒",
    "sentences": [
      {
        "zh": "我想吃一个苹果。",
        "pinyin": "Wǒ xiǎng chī yí gè píngguǒ.",
        "vi": "Tôi muốn ăn một quả táo.",
        "tag": "Hoa quả"
      },
      {
        "zh": "这个苹果很甜。",
        "pinyin": "Zhè gè píngguǒ hěn tián.",
        "vi": "Quả táo này rất ngọt.",
        "tag": "Đánh giá"
      }
    ]
  },
  {
    "id": "hsk1-14-14",
    "hanzi": "少",
    "traditional": "少",
    "pinyin": "shǎo",
    "pinyinClean": "shao",
    "hanViet": "THIỂU",
    "radical": "小",
    "strokeCount": 4,
    "hskLevel": 1,
    "lesson": 14,
    "partOfSpeech": "tính từ",
    "viet": "ít, thiếu",
    "vi_meaning_full": "có số lượng nhỏ hơn mức bình thường hoặc thiếu hụt",
    "vi_meaning_short": "ít, thiếu",
    "enMeaning": "few, little",
    "image": "https://images.pexels.com/photos/13986935/pexels-photo-13986935.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "很少",
      "减少",
      "多少"
    ],
    "compounds": [
      "多少",
      "少年"
    ],
    "synonyms": [
      "微"
    ],
    "antonyms": [
      "多"
    ],
    "confusableWords": "小, 多",
    "sentences": [
      {
        "zh": "杯子里水很少。",
        "pinyin": "Bēizi lǐ shuǐ hěn shǎo.",
        "vi": "Nước trong cốc rất ít.",
        "tag": "Miêu tả"
      },
      {
        "zh": "不能少了他。",
        "pinyin": "Bù néng shǎo le tā.",
        "vi": "Không thể thiếu anh ấy được.",
        "tag": "Quan trọng"
      }
    ]
  },
  {
    "id": "hsk1-14-13",
    "hanzi": "听",
    "traditional": "聽",
    "pinyin": "tīng",
    "pinyinClean": "ting",
    "hanViet": "THÍNH",
    "radical": "口",
    "strokeCount": 7,
    "hskLevel": 1,
    "lesson": 14,
    "partOfSpeech": "động từ",
    "viet": "nghe",
    "vi_meaning_full": "dùng thính giác cảm nhận âm thanh truyền đến tai",
    "vi_meaning_short": "nghe",
    "enMeaning": "to listen, to hear",
    "image": "https://images.pexels.com/photos/14905028/pexels-photo-14905028.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "听音乐",
      "听写",
      "听说"
    ],
    "compounds": [
      "听见",
      "听说",
      "听力"
    ],
    "synonyms": [
      "闻"
    ],
    "antonyms": [
      "说"
    ],
    "confusableWords": "厅, 近",
    "sentences": [
      {
        "zh": "你在听什么？",
        "pinyin": "Nǐ zài tīng shénme?",
        "vi": "Bạn đang nghe gì thế?",
        "tag": "Hỏi thăm"
      },
      {
        "zh": "请认真听。",
        "pinyin": "Qǐng rènzhēn tīng.",
        "vi": "Xin hãy chú ý nghe.",
        "tag": "Yêu cầu"
      }
    ]
  },
  {
    "id": "hsk1-14-5",
    "hanzi": "先生",
    "traditional": "先生",
    "pinyin": "xiānsheng",
    "pinyinClean": "xiansheng",
    "hanViet": "TIÊN SINH",
    "radical": "丿",
    "strokeCount": 6,
    "hskLevel": 1,
    "lesson": 14,
    "partOfSpeech": "danh từ lịch sự",
    "viet": "ông, ngài, anh (lịch sự)",
    "vi_meaning_full": "từ xưng呼 lịch sự dành cho nam giới hoặc gọi chồng",
    "vi_meaning_short": "ông, ngài, anh (lịch sự)",
    "enMeaning": "Mr., Sir, husband",
    "image": "https://images.pexels.com/photos/27972375/pexels-photo-27972375.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "王先生",
      "李先生"
    ],
    "compounds": [
      "先",
      "生"
    ],
    "synonyms": [
      "阁下",
      "丈夫"
    ],
    "antonyms": [
      "小姐",
      "太太"
    ],
    "confusableWords": "小姐, 太太",
    "sentences": [
      {
        "zh": "王先生在看报纸。",
        "pinyin": "Wáng xiānsheng zài kàn bàozhǐ.",
        "vi": "Ông Vương đang đọc báo.",
        "tag": "Lịch sự"
      },
      {
        "zh": "这位是我的先生。",
        "pinyin": "Zhè wèi shì wǒ de xiānsheng.",
        "vi": "Vị này là chồng tôi.",
        "tag": "Xã giao"
      }
    ]
  },
  {
    "id": "hsk1-14-2",
    "hanzi": "一点儿",
    "traditional": "一点儿",
    "pinyin": "yìdiǎnr",
    "pinyinClean": "yidianr",
    "hanViet": "NHẤT ĐIỂM NHÂN",
    "radical": "",
    "strokeCount": 0,
    "hskLevel": 1,
    "lesson": 14,
    "partOfSpeech": "",
    "viet": "một ít, một chút",
    "enMeaning": "",
    "image": "https://images.pexels.com/photos/8830877/pexels-photo-8830877.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [],
    "compounds": [],
    "synonyms": [],
    "antonyms": [],
    "sentences": [],
    "vi_meaning_full": "một ít, một chút",
    "vi_meaning_short": "một ít, một chút"
  },
  {
    "id": "hsk1-14-11",
    "hanzi": "衣服",
    "traditional": "衣服",
    "pinyin": "yīfu",
    "pinyinClean": "yifu",
    "hanViet": "Y PHỤC",
    "radical": "衣",
    "strokeCount": 6,
    "hskLevel": 1,
    "lesson": 14,
    "partOfSpeech": "danh từ",
    "viet": "quần áo, trang phục",
    "vi_meaning_full": "trang phục mặc trên người để giữ ấm và thẩm mỹ",
    "vi_meaning_short": "quần áo, trang phục",
    "enMeaning": "clothes",
    "image": "https://images.pexels.com/photos/13632832/pexels-photo-13632832.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "穿衣服",
      "买衣服"
    ],
    "compounds": [],
    "synonyms": [
      "衣",
      "月",
      "服"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "这件衣服很漂亮。",
        "pinyin": "Zhè jiàn yīfu hěn piàoliang.",
        "vi": "Bộ quần áo này rất đẹp.",
        "tag": "Mua sắm"
      },
      {
        "zh": "服装",
        "pinyin": "",
        "vi": "衣柜, 服装",
        "tag": "依靠"
      }
    ]
  },
  {
    "id": "hsk1-14-17",
    "hanzi": "张",
    "traditional": "张",
    "pinyin": "Zhāng",
    "pinyinClean": "zhang",
    "hanViet": "TRƯƠNG",
    "radical": "",
    "strokeCount": 0,
    "hskLevel": 1,
    "lesson": 14,
    "partOfSpeech": "",
    "viet": "Trương (họ người)",
    "enMeaning": "",
    "image": "https://images.pexels.com/photos/7431661/pexels-photo-7431661.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [],
    "compounds": [],
    "synonyms": [],
    "antonyms": [],
    "sentences": [],
    "vi_meaning_full": "Trương (họ người)",
    "vi_meaning_short": "Trương (họ người)"
  },
  {
    "id": "hsk1-14-155",
    "hanzi": "张欢",
    "traditional": "張歡",
    "pinyin": "Zhāng Huān",
    "pinyinClean": "zhanghuan",
    "hanViet": "TRƯƠNG HOAN",
    "radical": "弓",
    "strokeCount": 7,
    "hskLevel": 1,
    "lesson": 14,
    "partOfSpeech": "danh từ riêng",
    "viet": "Trương Hoan",
    "vi_meaning_full": "tên riêng nhân vật học sinh trong giáo trình HSK 1",
    "vi_meaning_short": "Trương Hoan",
    "enMeaning": "Zhang Huan (name)",
    "image": "https://images.pexels.com/photos/7683889/pexels-photo-7683889.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "张欢同学"
    ],
    "compounds": [],
    "synonyms": [
      "弓",
      "欢"
    ],
    "antonyms": [],
    "confusableWords": "",
    "sentences": [
      {
        "zh": "张欢去北京了。",
        "pinyin": "Zhāng Huān qù Běijīng le.",
        "vi": "Trương Hoan đi Bắc Kinh rồi.",
        "tag": "Hành động"
      }
    ]
  },
  {
    "id": "hsk1-14-15",
    "hanzi": "这些",
    "traditional": "这些",
    "pinyin": "zhèxiē",
    "pinyinClean": "zhexie",
    "hanViet": "GIÁ TA",
    "radical": "辶",
    "strokeCount": 15,
    "hskLevel": 1,
    "lesson": 14,
    "partOfSpeech": "đại từ",
    "viet": "những cái này",
    "enMeaning": "these",
    "image": "https://images.pexels.com/photos/14759603/pexels-photo-14759603.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "这些书",
      "这些人",
      "这些东西"
    ],
    "compounds": [
      "这",
      "些"
    ],
    "synonyms": [],
    "antonyms": [
      "那些"
    ],
    "confusableWords": "这些, 那些",
    "sentences": [
      {
        "zh": "这些都是我的书。",
        "pinyin": "Zhèxiē dōu shì wǒ de shū.",
        "vi": "Những cuốn này đều là sách của tôi.",
        "tag": "Chỉ thị"
      },
      {
        "zh": "这些水果很好吃。",
        "pinyin": "Zhèxiē shuǐguǒ hěn hǎochī.",
        "vi": "Những loại hoa quả này rất ngon.",
        "tag": "Khen ngợi"
      }
    ],
    "vi_meaning_full": "những cái này, những người này, những việc này",
    "vi_meaning_short": "những cái này"
  },
  {
    "id": "hsk1-14-16",
    "hanzi": "那些",
    "traditional": "那些",
    "pinyin": "nàxiē",
    "pinyinClean": "naxie",
    "hanViet": "NA TA",
    "radical": "阝",
    "strokeCount": 14,
    "hskLevel": 1,
    "lesson": 14,
    "partOfSpeech": "đại từ",
    "viet": "những cái kia",
    "enMeaning": "those",
    "image": "https://images.pexels.com/photos/14759603/pexels-photo-14759603.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "那些人",
      "那些书",
      "那些东西"
    ],
    "compounds": [
      "那",
      "些"
    ],
    "synonyms": [],
    "antonyms": [
      "这些"
    ],
    "confusableWords": "那些, 这些",
    "sentences": [
      {
        "zh": "那些人是谁？",
        "pinyin": "Nàxiē rén shì shéi?",
        "vi": "Những người kia là ai?",
        "tag": "Hỏi han"
      },
      {
        "zh": "那些衣服太贵了。",
        "pinyin": "Nàxiē yīfu tài guì le.",
        "vi": "Những bộ quần áo đó đắt quá.",
        "tag": "Mua sắm"
      }
    ],
    "vi_meaning_full": "những cái kia, những người kia, những việc đó",
    "vi_meaning_short": "những cái kia"
  },
  {
    "id": "hsk1-15-5",
    "hanzi": "出租车",
    "traditional": "出租車",
    "pinyin": "chūzūchē",
    "pinyinClean": "chuzuche",
    "hanViet": "XUẤT TÔ XA",
    "radical": "车",
    "strokeCount": 10,
    "hskLevel": 1,
    "lesson": 15,
    "partOfSpeech": "danh từ",
    "viet": "xe taxi",
    "vi_meaning_full": "loại xe ô tô chở khách thu tiền theo quãng đường hoặc thời gian",
    "vi_meaning_short": "xe taxi",
    "enMeaning": "taxi",
    "image": "https://images.pexels.com/photos/18015419/pexels-photo-18015419.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "打出租车",
      "坐出租车"
    ],
    "compounds": [
      "出租",
      "车"
    ],
    "synonyms": [
      "计程车"
    ],
    "antonyms": [],
    "confusableWords": "公交车",
    "sentences": [
      {
        "zh": "我们坐出租车去吧。",
        "pinyin": "Wǒmen zuò chūzūchē qù ba.",
        "vi": "Chúng ta đi taxi đi.",
        "tag": "Giao thông"
      },
      {
        "zh": "出租车来了。",
        "pinyin": "Chūzūchē lái le.",
        "vi": "Xe taxi đến rồi.",
        "tag": "Di chuyển"
      }
    ]
  },
  {
    "id": "hsk1-15-3",
    "hanzi": "大学",
    "traditional": "大学",
    "pinyin": "dàxué",
    "pinyinClean": "daxue",
    "hanViet": "ĐẠI HỌC",
    "radical": "",
    "strokeCount": 0,
    "hskLevel": 1,
    "lesson": 15,
    "partOfSpeech": "",
    "viet": "trường đại học",
    "enMeaning": "",
    "image": "https://images.pexels.com/photos/8199625/pexels-photo-8199625.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [],
    "compounds": [],
    "synonyms": [],
    "antonyms": [],
    "sentences": [],
    "vi_meaning_full": "trường đại học",
    "vi_meaning_short": "trường đại học"
  },
  {
    "id": "hsk1-15-4",
    "hanzi": "饭店",
    "traditional": "飯店",
    "pinyin": "fàndiàn",
    "pinyinClean": "fandian",
    "hanViet": "PHẠN ĐIẾM",
    "radical": "饣",
    "strokeCount": 7,
    "hskLevel": 1,
    "lesson": 15,
    "partOfSpeech": "danh từ",
    "viet": "nhà hàng, khách sạn",
    "vi_meaning_full": "cơ sở kinh doanh dịch vụ ăn uống hoặc khách sạn lưu trú",
    "vi_meaning_short": "nhà hàng, khách sạn",
    "enMeaning": "restaurant, hotel",
    "image": "https://images.pexels.com/photos/14714064/pexels-photo-14714064.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "去饭店",
      "大饭店"
    ],
    "compounds": [
      "米饭",
      "吃饭"
    ],
    "synonyms": [
      "餐馆",
      "酒店"
    ],
    "antonyms": [],
    "confusableWords": "商店, 书店",
    "sentences": [
      {
        "zh": "我们去饭店吃饭吧。",
        "pinyin": "Wǒmen qù fàndiàn chīfàn ba.",
        "vi": "Chúng ta đến nhà hàng ăn cơm đi.",
        "tag": "Ăn uống"
      },
      {
        "zh": "这家饭店很大。",
        "pinyin": "Zhè jiā fàndiàn hěn dà.",
        "vi": "Nhà hàng này rất lớn.",
        "tag": "Đánh giá"
      }
    ]
  },
  {
    "id": "hsk1-15-9",
    "hanzi": "飞机",
    "traditional": "飛機",
    "pinyin": "fēijī",
    "pinyinClean": "feiji",
    "hanViet": "PHI CƠ",
    "radical": "飞",
    "strokeCount": 3,
    "hskLevel": 1,
    "lesson": 15,
    "partOfSpeech": "danh từ",
    "viet": "máy bay",
    "vi_meaning_full": "phương tiện giao thông đường hàng không có cánh và động cơ",
    "vi_meaning_short": "máy bay",
    "enMeaning": "airplane",
    "image": "https://images.pexels.com/photos/16757167/pexels-photo-16757167.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "坐飞机",
      "飞机场"
    ],
    "compounds": [
      "飞机场",
      "机票"
    ],
    "synonyms": [
      "客机"
    ],
    "antonyms": [],
    "confusableWords": "手机, 电视",
    "sentences": [
      {
        "zh": "我坐飞机去北京。",
        "pinyin": "Wǒ zuò fēijī qù Běijīng.",
        "vi": "Tôi đi máy bay đến Bắc Kinh.",
        "tag": "Di chuyển"
      },
      {
        "zh": "飞机起飞了。",
        "pinyin": "Fēijī qǐfēi le.",
        "vi": "Máy bay cất cánh rồi.",
        "tag": "Giao thông"
      }
    ]
  },
  {
    "id": "hsk1-15-7",
    "hanzi": "高兴",
    "traditional": "高興",
    "pinyin": "gāoxìng",
    "pinyinClean": "gaoxing",
    "hanViet": "CAO HƯNG",
    "radical": "高",
    "strokeCount": 10,
    "hskLevel": 1,
    "lesson": 15,
    "partOfSpeech": "tính từ",
    "viet": "vui vẻ, phấn khởi",
    "vi_meaning_full": "trạng thái tâm lý vui vẻ, hân hoan trước một sự việc tốt đẹp",
    "vi_meaning_short": "vui vẻ, phấn khởi",
    "enMeaning": "happy, glad",
    "image": "https://images.pexels.com/photos/6102841/pexels-photo-6102841.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "很高兴",
      "很高兴认识你"
    ],
    "compounds": [
      "兴致"
    ],
    "synonyms": [
      "开心",
      "快乐"
    ],
    "antonyms": [
      "难过",
      "生气"
    ],
    "confusableWords": "高级",
    "sentences": [
      {
        "zh": "认识你很高兴。",
        "pinyin": "Rènshi nǐ hěn gāoxìng.",
        "vi": "Rất vui được quen biết bạn.",
        "tag": "Giao tiếp"
      },
      {
        "zh": "今天他很高兴。",
        "pinyin": "Jīntiān tā hěn gāoxìng.",
        "vi": "Hôm nay anh ấy rất vui.",
        "tag": "Tâm trạng"
      }
    ]
  },
  {
    "id": "hsk1-15-2",
    "hanzi": "年",
    "traditional": "年",
    "pinyin": "nián",
    "pinyinClean": "nian",
    "hanViet": "NIÊN",
    "radical": "干",
    "strokeCount": 6,
    "hskLevel": 1,
    "lesson": 15,
    "partOfSpeech": "danh từ / lượng từ",
    "viet": "năm",
    "vi_meaning_full": "khoảng thời gian 365 ngày Trái Đất quay một vòng quanh Mặt Trời",
    "vi_meaning_short": "năm",
    "enMeaning": "year",
    "image": "https://images.pexels.com/photos/6325565/pexels-photo-6325565.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "今年",
      "去年",
      "二十年"
    ],
    "compounds": [
      "今年",
      "明年",
      "去年"
    ],
    "synonyms": [
      "岁"
    ],
    "antonyms": [],
    "confusableWords": "牛, 午",
    "sentences": [
      {
        "zh": "我在中国学了一年汉语。",
        "pinyin": "Wǒ zài Zhōngguó xué le yì nián Hànyǔ.",
        "vi": "Tôi đã học tiếng Trung một năm ở Trung Quốc.",
        "tag": "Thời gian"
      },
      {
        "zh": "今年是二零二六年。",
        "pinyin": "Jīnnián shì èr-líng-èr-liù nián.",
        "vi": "Năm nay là năm 2026.",
        "tag": "Lịch"
      }
    ]
  },
  {
    "id": "hsk1-15-1",
    "hanzi": "认识",
    "traditional": "認識",
    "pinyin": "rènshi",
    "pinyinClean": "renshi",
    "hanViet": "NHẬN THỨC",
    "radical": "讠",
    "strokeCount": 4,
    "hskLevel": 1,
    "lesson": 15,
    "partOfSpeech": "động từ",
    "viet": "quen biết, biết",
    "vi_meaning_full": "biết và hiểu về một người hoặc sự vật sau khi tiếp xúc",
    "vi_meaning_short": "quen biết, biết",
    "enMeaning": "to know, to recognize",
    "image": "https://images.pexels.com/photos/8832726/pexels-photo-8832726.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "认识你",
      "很高兴认识你"
    ],
    "compounds": [
      "认识"
    ],
    "synonyms": [
      "相识",
      "知道"
    ],
    "antonyms": [
      "陌生"
    ],
    "confusableWords": "认字",
    "sentences": [
      {
        "zh": "很高兴认识你！",
        "pinyin": "Hěn gāoxìng rènshi nǐ!",
        "vi": "Rất vui được quen biết bạn!",
        "tag": "Giao tiếp"
      },
      {
        "zh": "你不认识他吗？",
        "pinyin": "Nǐ bù rènshi tā ma?",
        "vi": "Bạn không quen biết anh ấy à?",
        "tag": "Hỏi đáp"
      }
    ]
  },
  {
    "id": "hsk2-1-148",
    "hanzi": "花花",
    "traditional": "花花",
    "pinyin": "Huāhua",
    "pinyinClean": "huahua",
    "hanViet": "HOA HOA",
    "radical": "艹",
    "strokeCount": 14,
    "hskLevel": 2,
    "lesson": 1,
    "partOfSpeech": "dt. riêng",
    "viet": "Hoa Hoa (tên mèo)",
    "vi_meaning_full": "Hoa Hoa (tên con mèo)",
    "vi_meaning_short": "Hoa Hoa (tên mèo)",
    "enMeaning": "Huahua (cat's name)",
    "image": "https://pixabay.com/get/ged8807667040156e74b5de4a44d4f259f0d1196ae7f1b73079186ee2db237ecf9e32c4f95199fe3a1226dad12aa4165d15aeecb5acc66f1ee3dbbe54c8d3cd88_640.jpg",
    "collocations": [
      "猫叫花花"
    ],
    "compounds": [
      "鲜花",
      "花草"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "华华",
    "sentences": [
      {
        "zh": "那是我的猫，它叫花花。",
        "pinyin": "Nà shì wǒ de māo, tā jiào Huāhua.",
        "vi": "Đó là con mèo của mình, nó tên là Hoa Hoa.",
        "tag": "Giới thiệu thú cưng"
      },
      {
        "zh": "花花真漂亮。",
        "pinyin": "Huāhua zhēn piàoliang.",
        "vi": "Hoa Hoa thật là xinh xắn.",
        "tag": "Miêu tả mèo"
      }
    ]
  },
  {
    "id": "1-2",
    "hanzi": "觉得",
    "traditional": "覺得",
    "pinyin": "juéde",
    "pinyinClean": "juede",
    "hanViet": "GIÁC ĐẮC",
    "radical": "见",
    "strokeCount": 20,
    "hskLevel": 2,
    "lesson": 1,
    "partOfSpeech": "đgt.",
    "viet": "cảm thấy, nghĩ là",
    "vi_meaning_full": "cho rằng, nghĩ rằng; cảm thấy",
    "vi_meaning_short": "cảm thấy, nghĩ là",
    "enMeaning": "to think, feel",
    "image": "https://images.pexels.com/photos/36922125/pexels-photo-36922125.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "我觉得",
      "你觉得怎么样"
    ],
    "compounds": [
      "感觉",
      "觉察"
    ],
    "synonyms": [
      "认为",
      "以为"
    ],
    "antonyms": [],
    "confusableWords": "决定",
    "sentences": [
      {
        "zh": "你要去北京旅游，你觉得什么时候去最好？",
        "pinyin": "Nǐ yào qù Běijīng lǚyóu, nǐ juéde shénme shíhou qù zuì hǎo?",
        "vi": "Cậu định đi Bắc Kinh du lịch, cậu thấy đi lúc nào tốt nhất?",
        "tag": "Hỏi ý kiến"
      },
      {
        "zh": "我觉得听和说还可以。",
        "pinyin": "Wǒ juéde tīng hé shuō hái kěyǐ.",
        "vi": "Tôi thấy nghe và nói còn tạm được.",
        "tag": "Đánh giá bản thân"
      }
    ]
  },
  {
    "id": "1-1",
    "hanzi": "旅游",
    "traditional": "旅遊",
    "pinyin": "lǚyóu",
    "pinyinClean": "luyou",
    "hanViet": "LỮ DU",
    "radical": "方",
    "strokeCount": 15,
    "hskLevel": 2,
    "lesson": 1,
    "partOfSpeech": "đgt.",
    "viet": "đi du lịch",
    "vi_meaning_full": "du lịch",
    "vi_meaning_short": "đi du lịch",
    "enMeaning": "to travel, tour",
    "image": "https://images.pexels.com/photos/32263933/pexels-photo-32263933.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "去旅游",
      "旅游景点"
    ],
    "compounds": [
      "旅客",
      "游玩",
      "旅游业"
    ],
    "synonyms": [
      "旅行"
    ],
    "antonyms": [],
    "confusableWords": "游泳",
    "sentences": [
      {
        "zh": "九月去北京旅游最好。",
        "pinyin": "Jiǔ yuè qù Běijīng lǚyóu zuì hǎo.",
        "vi": "Tháng chín đi Bắc Kinh du lịch là tốt nhất.",
        "tag": "Gợi ý du lịch"
      },
      {
        "zh": "我和朋友一起去旅游了。",
        "pinyin": "Wǒ hé péngyou yìqǐ qù lǚyóu le.",
        "vi": "Tôi và bạn cùng đi du lịch rồi.",
        "tag": "Kể hành trình"
      }
    ]
  },
  {
    "id": "1-11",
    "hanzi": "它",
    "traditional": "它",
    "pinyin": "tā",
    "pinyinClean": "ta",
    "hanViet": "THA",
    "radical": "宀",
    "strokeCount": 5,
    "hskLevel": 2,
    "lesson": 1,
    "partOfSpeech": "đt.",
    "viet": "nó (chỉ đồ vật, động vật)",
    "vi_meaning_full": "nó",
    "vi_meaning_short": "nó (chỉ đồ vật, động vật)",
    "enMeaning": "it",
    "image": "https://images.pexels.com/photos/8310631/pexels-photo-8310631.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "它很漂亮",
      "它的眼睛"
    ],
    "compounds": [
      "它们"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "他, 她",
    "sentences": [
      {
        "zh": "桌子下面有个猫，它叫花花，它很漂亮。",
        "pinyin": "Zhuōzi xiàmiàn yǒu gè māo, tā jiào Huāhua, tā hěn piàoliang.",
        "vi": "Dưới bàn có con mèo, nó tên Hoa Hoa, nó rất đẹp.",
        "tag": "Giới thiệu thú cưng"
      },
      {
        "zh": "这只小狗真可爱，它叫什么？",
        "pinyin": "Zhè zhī xiǎogǒu zhēn kě'ài, tā jiào shénme?",
        "vi": "Con chó nhỏ này đáng yêu quá, nó tên là gì?",
        "tag": "Hỏi thăm"
      }
    ]
  },
  {
    "id": "1-7",
    "hanzi": "踢足球",
    "traditional": "踢足球",
    "pinyin": "tī zúqiú",
    "pinyinClean": "tizuqiu",
    "hanViet": "THÍCH TÚC CẦU",
    "radical": "足",
    "strokeCount": 32,
    "hskLevel": 2,
    "lesson": 1,
    "partOfSpeech": "cụm đgt.",
    "viet": "đá bóng, chơi bóng đá",
    "vi_meaning_full": "đá bóng",
    "vi_meaning_short": "đá bóng, chơi bóng đá",
    "enMeaning": "to play soccer/football",
    "image": "https://images.pexels.com/photos/36944547/pexels-photo-36944547.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "去踢足球",
      "喜欢踢足球"
    ],
    "compounds": [
      "足球",
      "足球场",
      "踢球"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "打篮球",
    "sentences": [
      {
        "zh": "下午我们一起去踢足球吧。",
        "pinyin": "Xiàwǔ wǒmen yìqǐ qù tī zúqiú ba.",
        "vi": "Buổi chiều chúng mình cùng đi đá bóng nhé.",
        "tag": "Rủ rê thể thao"
      },
      {
        "zh": "我十一岁的时候开始踢足球，已经踢了十年了。",
        "pinyin": "Wǒ shí-yī suì de shíhou kāishǐ tī zúqiú, yǐjīng tī le shí nián le.",
        "vi": "Tôi bắt đầu đá bóng từ năm 11 tuổi, đã đá được 10 năm rồi.",
        "tag": "Chia sẻ đam mê"
      }
    ]
  },
  {
    "id": "1-4",
    "hanzi": "为什么",
    "traditional": "為什麼",
    "pinyin": "wèi shénme",
    "pinyinClean": "weishenme",
    "hanViet": "VỊ THẬP MA",
    "radical": "丶",
    "strokeCount": 13,
    "hskLevel": 2,
    "lesson": 1,
    "partOfSpeech": "cụm đại từ",
    "viet": "tại sao, vì lý do gì",
    "vi_meaning_full": "tại sao",
    "vi_meaning_short": "tại sao, vì lý do gì",
    "enMeaning": "why",
    "image": "https://images.pexels.com/photos/14997034/pexels-photo-14997034.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "你 char 为什么",
      "为什么不"
    ],
    "compounds": [
      "为了",
      "因为"
    ],
    "synonyms": [
      "为何"
    ],
    "antonyms": [],
    "confusableWords": "什么",
    "sentences": [
      {
        "zh": "你为什么不吃了？",
        "pinyin": "Nǐ wèi shénme bù chī le?",
        "vi": "Tại sao anh không ăn nữa?",
        "tag": "Thắc mắc lý do"
      },
      {
        "zh": "你为什么喜欢去北京旅游？",
        "pinyin": "Nǐ wèi shénme xǐhuan qù Běijīng lǚyóu?",
        "vi": "Tại sao bạn thích đi du lịch Bắc Kinh?",
        "tag": "Phỏng vấn thói quen"
      }
    ]
  },
  {
    "id": "1-10",
    "hanzi": "新",
    "traditional": "新",
    "pinyin": "xīn",
    "pinyinClean": "xin",
    "hanViet": "TÂN",
    "radical": "斤",
    "strokeCount": 13,
    "hskLevel": 2,
    "lesson": 1,
    "partOfSpeech": "tt.",
    "viet": "mới, mới mẻ",
    "vi_meaning_full": "mới",
    "vi_meaning_short": "mới, mới mẻ",
    "enMeaning": "new, fresh",
    "image": "https://images.pexels.com/photos/19507870/pexels-photo-19507870.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "新年",
      "新买的",
      "新手"
    ],
    "compounds": [
      "新年",
      "新闻",
      "新鲜"
    ],
    "synonyms": [
      "新鲜"
    ],
    "antonyms": [
      "旧",
      "老"
    ],
    "confusableWords": "心, 辛",
    "sentences": [
      {
        "zh": "这是我今天新买的衣服。",
        "pinyin": "Zhè shì wǒ jīntiān xīn mǎi de yīfu.",
        "vi": "Đây là bộ quần áo mới mua hôm nay của tôi.",
        "tag": "Khoe đồ mới"
      },
      {
        "zh": "新年快到了，祝大家新年快乐！",
        "pinyin": "Xīnnián kuài dào le, zhù dàjiā xīnnián kuàilè!",
        "vi": "Năm mới sắp đến rồi, chúc mọi người năm mới vui vẻ!",
        "tag": "Lời chúc Tết"
      }
    ]
  },
  {
    "id": "1-12",
    "hanzi": "眼睛",
    "traditional": "眼睛",
    "pinyin": "yǎnjing",
    "pinyinClean": "yanjing",
    "hanViet": "NHÃN TINH",
    "radical": "目",
    "strokeCount": 22,
    "hskLevel": 2,
    "lesson": 1,
    "partOfSpeech": "dt.",
    "viet": "đôi mắt, con mắt",
    "vi_meaning_full": "mắt",
    "vi_meaning_short": "đôi mắt, con mắt",
    "enMeaning": "eye",
    "image": "https://images.pexels.com/photos/38226818/pexels-photo-38226818.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "大眼睛",
      "眼睛漂亮"
    ],
    "compounds": [
      "眼镜",
      "眼光"
    ],
    "synonyms": [
      "目光"
    ],
    "antonyms": [],
    "confusableWords": "眼镜",
    "sentences": [
      {
        "zh": "我觉得她的眼睛最漂亮。",
        "pinyin": "Wǒ juéde tā de yǎnjing zuì piàoliang.",
        "vi": "Tôi thấy đôi mắt của cô ấy đẹp nhất.",
        "tag": "Khen ngợi ngoại hình"
      },
      {
        "zh": "长时间看手机对眼睛不好。",
        "pinyin": "Cháng shíjiān kàn shǒujī duì yǎnjing bù hǎo.",
        "vi": "Xem điện thoại lâu không tốt cho mắt.",
        "tag": "Nhắc nhở sức khỏe"
      }
    ]
  },
  {
    "id": "1-9",
    "hanzi": "要",
    "traditional": "要",
    "pinyin": "yào",
    "pinyinClean": "yao",
    "hanViet": "YẾU",
    "radical": "核",
    "strokeCount": 9,
    "hskLevel": 2,
    "lesson": 1,
    "partOfSpeech": "tdt./đgt.",
    "viet": "muốn, cần, phải, sắp",
    "vi_meaning_full": "muốn, cần; sắp",
    "vi_meaning_short": "muốn, cần, phải, sắp",
    "enMeaning": "to want, need, be going to",
    "image": "https://images.pexels.com/photos/35849147/pexels-photo-35849147.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "我要去",
      "想要",
      "快要"
    ],
    "compounds": [
      "主要",
      "重要",
      "要是"
    ],
    "synonyms": [
      "需要",
      "想要"
    ],
    "antonyms": [
      "不要"
    ],
    "confusableWords": "药",
    "sentences": [
      {
        "zh": "我们要不要买几个新的椅子？",
        "pinyin": "Wǒmen yào bú yào mǎi jǐ gè xīn de yǐzi?",
        "vi": "Chúng ta có cần mua mấy chiếc ghế mới không?",
        "tag": "Hỏi nhu cầu mua sắm"
      },
      {
        "zh": "明天要考试，他今天在好好准备。",
        "pinyin": "Míngtiān yào kǎoshì, tā jīntiān zài hǎohǎo zhǔnbèi.",
        "vi": "Ngày mai phải thi rồi, hôm nay anh ấy đang tích cực chuẩn bị.",
        "tag": "Kế hoạch bắt buộc"
      }
    ]
  },
  {
    "id": "hsk2-1-193",
    "hanzi": "游泳馆",
    "traditional": "游泳館",
    "pinyin": "yóuyǒngguǎn",
    "pinyinClean": "youyongguan",
    "hanViet": "DU VỊNH QUÁN",
    "radical": "氵",
    "strokeCount": 36,
    "hskLevel": 2,
    "lesson": 1,
    "partOfSpeech": "dt.",
    "viet": "hồ bơi, nhà thi đấu bơi lội",
    "vi_meaning_full": "bể bơi",
    "vi_meaning_short": "hồ bơi, nhà thi đấu bơi lội",
    "enMeaning": "swimming pool, natatorium",
    "image": "https://pixabay.com/get/g37020ee818a71f629ef5aa170e40459bf1ba9bf5098b7f391d916ab6f8231643541fd49e4d636b1f02c62619fab08f756792eadff31cc3eb4039c0fc46734620_640.jpg",
    "collocations": [
      "去游泳馆"
    ],
    "compounds": [
      "游泳",
      "宾馆"
    ],
    "synonyms": [
      "游泳池"
    ],
    "antonyms": [],
    "confusableWords": "体育馆",
    "sentences": [
      {
        "zh": "学校附近新开了一家游泳馆。",
        "pinyin": "Xuéxiào fùjìn xīn kāi le yì jiā yóuyǒngguǎn.",
        "vi": "Gần trường học mới mở một hồ bơi.",
        "tag": "Thông tin địa điểm"
      },
      {
        "zh": "周末我们一起去游泳馆吧。",
        "pinyin": "Zhōumò wǒmen yìqǐ qù yóuyǒngguǎn ba.",
        "vi": "Cuối tuần chúng mình cùng đến hồ bơi đi.",
        "tag": "Rủ rê thể thao"
      }
    ]
  },
  {
    "id": "1-6",
    "hanzi": "运动",
    "traditional": "運動",
    "pinyin": "yùndòng",
    "pinyinClean": "yundong",
    "hanViet": "VẬN ĐỘNG",
    "radical": "辶",
    "strokeCount": 18,
    "hskLevel": 2,
    "lesson": 1,
    "partOfSpeech": "dt./đgt.",
    "viet": "thể thao, tập thể dục",
    "vi_meaning_full": "môn thể thao; tập thể dục/thể thao",
    "vi_meaning_short": "thể thao, tập thể dục",
    "enMeaning": "sports, exercise; to exercise",
    "image": "https://images.pexels.com/photos/29520198/pexels-photo-29520198.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "做运动",
      "喜欢运动"
    ],
    "compounds": [
      "运动员",
      "运动场",
      "运动服"
    ],
    "synonyms": [
      "体育"
    ],
    "antonyms": [],
    "confusableWords": "运输",
    "sentences": [
      {
        "zh": "外面的天气很好，我们出去运动运动吧！",
        "pinyin": "Wàimian de tiānqì hěn hǎo, wǒmen chūqù yùndòng yùndòng ba!",
        "vi": "Thời tiết bên ngoài rất tốt, chúng mình ra ngoài tập thể dục chút đi!",
        "tag": "Rủ rủ vận động"
      },
      {
        "zh": "你喜欢什么运动？我最喜欢踢足球。",
        "pinyin": "Nǐ xǐhuan shénme yùndòng? Wǒ zuì xǐhuan tī zúqiú.",
        "vi": "Bạn thích môn thể thao nào? Tôi thích nhất là đá bóng.",
        "tag": "Hỏi sở thích"
      }
    ]
  },
  {
    "id": "1-3",
    "hanzi": "最",
    "traditional": "最",
    "pinyin": "zuì",
    "pinyinClean": "zui",
    "hanViet": "TỐI",
    "radical": "日",
    "strokeCount": 12,
    "hskLevel": 2,
    "lesson": 1,
    "partOfSpeech": "phó.",
    "viet": "nhất, đứng đầu",
    "vi_meaning_full": "nhất",
    "vi_meaning_short": "nhất, đứng đầu",
    "enMeaning": "most, best",
    "image": "https://images.pexels.com/photos/34203966/pexels-photo-34203966.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "最好",
      "最喜欢",
      "最大"
    ],
    "compounds": [
      "最好",
      "最高",
      "最后"
    ],
    "synonyms": [
      "顶",
      "极"
    ],
    "antonyms": [
      "最少"
    ],
    "confusableWords": "醉",
    "sentences": [
      {
        "zh": "九月去北京旅游最好。",
        "pinyin": "Jiǔ yuè qù Běijīng lǚyóu zuì hǎo.",
        "vi": "Tháng 9 đi Bắc Kinh du lịch là tốt nhất.",
        "tag": "Đánh giá lựa chọn"
      },
      {
        "zh": "粉色是我女儿最喜欢的颜色。",
        "pinyin": "Fěnsè shì wǒ nǚ'ér zuì xǐhuan de yánsè.",
        "vi": "Màu hồng là màu mà con gái tôi thích nhất.",
        "tag": "Sở thích"
      }
    ]
  },
  {
    "id": "hsk2-2-11",
    "hanzi": "出",
    "traditional": "出",
    "pinyin": "chū",
    "pinyinClean": "chu",
    "hanViet": "XUẤT",
    "radical": "凵",
    "strokeCount": 5,
    "hskLevel": 2,
    "lesson": 2,
    "partOfSpeech": "đgt.",
    "viet": "ra, đi ra",
    "vi_meaning_full": "ra, ra ngoài",
    "vi_meaning_short": "ra, đi ra",
    "enMeaning": "to go out, come out",
    "image": "https://images.pexels.com/photos/11297774/pexels-photo-11297774.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "出去",
      "出门",
      "出生"
    ],
    "compounds": [
      "出去",
      "出发",
      "出现"
    ],
    "synonyms": [
      "出来"
    ],
    "antonyms": [
      "进"
    ],
    "confusableWords": "初, 除",
    "sentences": [
      {
        "zh": "他已经出去了。",
        "pinyin": "Tā yǐjīng chūqù le.",
        "vi": "Anh ấy đã ra ngoài rồi.",
        "tag": "Báo tin"
      },
      {
        "zh": "我们出去运动运动吧！",
        "pinyin": "Wǒmen chūqù yùndòng yùndòng ba!",
        "vi": "Chúng ta ra ngoài tập thể dục chút đi!",
        "tag": "Đề nghị vận động"
      }
    ]
  },
  {
    "id": "2-8",
    "hanzi": "出院",
    "traditional": "出院",
    "pinyin": "chū yuàn",
    "pinyinClean": "chuyuan",
    "hanViet": "XUẤT VIỆN",
    "radical": "凵",
    "strokeCount": 10,
    "hskLevel": 2,
    "lesson": 2,
    "partOfSpeech": "cụm đgt.",
    "viet": "ra viện, xuất viện",
    "vi_meaning_full": "xuất viện",
    "vi_meaning_short": "ra viện, xuất viện",
    "enMeaning": "to leave hospital, be discharged",
    "image": "https://images.pexels.com/photos/28589238/pexels-photo-28589238.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "准备出院",
      "出院手续"
    ],
    "compounds": [
      "医院",
      "出口"
    ],
    "synonyms": [],
    "antonyms": [
      "住院"
    ],
    "confusableWords": "住院",
    "sentences": [
      {
        "zh": "医生说他明天就可以出院了。",
        "pinyin": "Yīshēng shuō tā míngtiān jiù kěyǐ chūyuàn le.",
        "vi": "Bác sĩ nói ngày mai anh ấy có thể xuất viện rồi.",
        "tag": "Thông tin y tế"
      },
      {
        "zh": "出院以后要在家里好好休息。",
        "pinyin": "Chūyuàn yǐhòu yào zài jiālǐ hǎohǎo xiūxi.",
        "vi": "Sau khi xuất viện phải ở nhà nghỉ ngơi thật tốt.",
        "tag": "Dặn dò phục hồi"
      }
    ]
  },
  {
    "id": "2-9",
    "hanzi": "高",
    "traditional": "高",
    "pinyin": "gāo",
    "pinyinClean": "gao",
    "hanViet": "CAO",
    "radical": "高",
    "strokeCount": 10,
    "hskLevel": 2,
    "lesson": 2,
    "partOfSpeech": "tt.",
    "viet": "cao, chiều cao cao",
    "vi_meaning_full": "cao",
    "vi_meaning_short": "cao, chiều cao cao",
    "enMeaning": "tall, high",
    "image": "https://images.pexels.com/photos/29532725/pexels-photo-29532725.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "很高",
      "个子高",
      "高兴"
    ],
    "compounds": [
      "高兴",
      "高度",
      "高中"
    ],
    "synonyms": [
      "矮"
    ],
    "antonyms": [
      "低",
      "矮"
    ],
    "confusableWords": "搞, 膏",
    "sentences": [
      {
        "zh": "你比你哥哥高吗？",
        "pinyin": "Nǐ bǐ nǐ gēge gāo ma?",
        "vi": "Cậu có cao hơn anh trai cậu không?",
        "tag": "So sánh chiều cao"
      },
      {
        "zh": "这座山非常高。",
        "pinyin": "Zhè zuò shān fēicháng gāo.",
        "vi": "Ngọn núi này rất cao.",
        "tag": "Miêu tả cảnh vật"
      }
    ]
  },
  {
    "id": "2-13",
    "hanzi": "忙",
    "traditional": "忙",
    "pinyin": "máng",
    "pinyinClean": "mang",
    "hanViet": "MANG",
    "radical": "心",
    "strokeCount": 6,
    "hskLevel": 2,
    "lesson": 2,
    "partOfSpeech": "tt.",
    "viet": "bận rộn",
    "vi_meaning_full": "bận",
    "vi_meaning_short": "bận rộn",
    "enMeaning": "busy",
    "image": "https://images.pexels.com/photos/31395489/pexels-photo-31395489.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "很忙",
      "忙什么"
    ],
    "compounds": [
      "帮忙",
      "忙碌"
    ],
    "synonyms": [
      "繁忙"
    ],
    "antonyms": [
      "闲"
    ],
    "confusableWords": "芒, 盲",
    "sentences": [
      {
        "zh": "你最近在忙什么呢？",
        "pinyin": "Nǐ zuìjìn zài máng shénme ne?",
        "vi": "Dạo này bạn đang bận việc gì thế?",
        "tag": "Hỏi thăm sức khỏe"
      },
      {
        "zh": "今天工作太忙了，没时间休息。",
        "pinyin": "Jīntiān gōngzuò tài máng le, méi shíjiān xiūxi.",
        "vi": "Hôm nay công việc bận quá, không có thời gian nghỉ.",
        "tag": "Chia sẻ công việc"
      }
    ]
  },
  {
    "id": "2-2",
    "hanzi": "每",
    "traditional": "每",
    "pinyin": "měi",
    "pinyinClean": "mei",
    "hanViet": "MỖI",
    "radical": "母",
    "strokeCount": 7,
    "hskLevel": 2,
    "lesson": 2,
    "partOfSpeech": "dt.",
    "viet": "mỗi, từng",
    "vi_meaning_full": "mỗi",
    "vi_meaning_short": "mỗi, từng",
    "enMeaning": "every, each",
    "image": "https://images.pexels.com/photos/14682727/pexels-photo-14682727.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "每天",
      "每年",
      "每个人"
    ],
    "compounds": [
      "每天",
      "每年",
      "每当"
    ],
    "synonyms": [
      "各"
    ],
    "antonyms": [],
    "confusableWords": "美, 霉",
    "sentences": [
      {
        "zh": "这个月我天天游泳，每天喝一杯咖啡。",
        "pinyin": "Zhège yuè wǒ tiāntiān yóuyǒng, měitiān hē yì bēi kāfēi.",
        "vi": "Tháng này ngày nào tôi cũng đi bơi, mỗi ngày uống một ly cà phê.",
        "tag": "Thói quen hàng ngày"
      },
      {
        "zh": "每个人都有自己的想法。",
        "pinyin": "Měi gè rén dōu yǒu zìjǐ de xiǎngfǎ.",
        "vi": "Mỗi người đều có suy nghĩ riêng.",
        "tag": "Triết lý cuộc sống"
      }
    ]
  },
  {
    "id": "2-10",
    "hanzi": "米",
    "traditional": "米",
    "pinyin": "mǐ",
    "pinyinClean": "mi",
    "hanViet": "MỄ",
    "radical": "米",
    "strokeCount": 6,
    "hskLevel": 2,
    "lesson": 2,
    "partOfSpeech": "lượng./dt.",
    "viet": "mét (đo chiều dài), gạo",
    "vi_meaning_full": "mét; gạo",
    "vi_meaning_short": "mét (đo chiều dài), gạo",
    "enMeaning": "meter; rice",
    "image": "https://images.pexels.com/photos/9302046/pexels-photo-9302046.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "一百米",
      "大米"
    ],
    "compounds": [
      "米饭",
      "厘米",
      "米色"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "迷",
    "sentences": [
      {
        "zh": "这项跑道有一百米长。",
        "pinyin": "Zhè xiàng pǎodào yǒu yì bǎi mǐ cháng.",
        "vi": "Đường chạy này dài 100 mét.",
        "tag": "Đo lường"
      },
      {
        "zh": "服务员，来两碗米饭。",
        "pinyin": "Fúwùyuán, lái liǎng wǎn mǐfàn.",
        "vi": "Phục vụ ơi cho 2 bát cơm trắng.",
        "tag": "Gọi món"
      }
    ]
  },
  {
    "id": "2-4",
    "hanzi": "跑步",
    "traditional": "跑步",
    "pinyin": "pǎo bù",
    "pinyinClean": "paobu",
    "hanViet": "BÀO BỘ",
    "radical": "足",
    "strokeCount": 19,
    "hskLevel": 2,
    "lesson": 2,
    "partOfSpeech": "đgt.",
    "viet": "chạy bộ, tập chạy",
    "vi_meaning_full": "chạy bộ",
    "vi_meaning_short": "chạy bộ, tập chạy",
    "enMeaning": "to run, jog",
    "image": "https://images.pexels.com/photos/24913608/pexels-photo-24913608.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "去跑步",
      "坚持跑步"
    ],
    "compounds": [
      "跑道",
      "步子"
    ],
    "synonyms": [
      "赛跑"
    ],
    "antonyms": [],
    "confusableWords": "炮",
    "sentences": [
      {
        "zh": "那还能去跑步吗？",
        "pinyin": "Nà hái néng qù pǎobù ma?",
        "vi": "Vậy thì còn đi chạy bộ được nữa không?",
        "tag": "Hỏi kế hoạch tập luyện"
      },
      {
        "zh": "我每天早上都去跑步。",
        "pinyin": "Wǒ měitiān zǎoshang dōu qù pǎobù.",
        "vi": "Sáng nào tôi cũng đi chạy bộ.",
        "tag": "Thói quen sức khỏe"
      }
    ]
  },
  {
    "id": "2-5",
    "hanzi": "起床",
    "traditional": "起床",
    "pinyin": "qǐ chuáng",
    "pinyinClean": "qichuang",
    "hanViet": "KHỞI SÀNG",
    "radical": "走",
    "strokeCount": 17,
    "hskLevel": 2,
    "lesson": 2,
    "partOfSpeech": "đgt.",
    "viet": "thức dậy, rời khỏi giường",
    "vi_meaning_full": "thức dậy",
    "vi_meaning_short": "thức dậy, rời khỏi giường",
    "enMeaning": "to get up, get out of bed",
    "image": "https://images.pexels.com/photos/32446190/pexels-photo-32446190.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "早起",
      "起床吃早饭"
    ],
    "compounds": [
      "起立",
      "床铺"
    ],
    "synonyms": [
      "起来"
    ],
    "antonyms": [
      "睡觉"
    ],
    "confusableWords": "起立",
    "sentences": [
      {
        "zh": "你每天几点起床？",
        "pinyin": "Nǐ měitiān jǐ diǎn qǐchuáng?",
        "vi": "Mỗi ngày bạn dậy lúc mấy giờ?",
        "tag": "Hỏi thói quen sinh hoạt"
      },
      {
        "zh": "我六点半就起床了。",
        "pinyin": "Wǒ liù diǎn bàn jiù qǐchuáng le.",
        "vi": "Tôi dậy từ lúc 6 rưỡi rồi.",
        "tag": "Trả lời thời gian"
      }
    ]
  },
  {
    "id": "2-1",
    "hanzi": "生病",
    "traditional": "生病",
    "pinyin": "shēng bìng",
    "pinyinClean": "shengbing",
    "hanViet": "SINH BỆNH",
    "radical": "生",
    "strokeCount": 10,
    "hskLevel": 2,
    "lesson": 2,
    "partOfSpeech": "đgt.",
    "viet": "bị ốm, phát bệnh",
    "vi_meaning_full": "bị bệnh, bị ốm",
    "vi_meaning_short": "bị ốm, phát bệnh",
    "enMeaning": "to fall ill, get sick",
    "image": "https://images.pexels.com/photos/14530635/pexels-photo-14530635.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "生病了",
      "生病住院"
    ],
    "compounds": [
      "医生",
      "疾病",
      "生理"
    ],
    "synonyms": [
      "患病"
    ],
    "antonyms": [
      "康复"
    ],
    "confusableWords": "生意",
    "sentences": [
      {
        "zh": "听说大卫生病了，我想找时间去看看他。",
        "pinyin": "Tīngshuō Dàwèi shēngbìng le, wǒ xiǎng zhǎo shíjiān qù kànkan tā.",
        "vi": "Nghe nói David bị ốm rồi, tôi muốn tìm thời gian đi thăm anh ấy.",
        "tag": "Hỏi thăm sức khỏe"
      },
      {
        "zh": "生病了就要多休息，多喝水。",
        "pinyin": "Shēngbìng le jiù yào duō xiūxi, duō hē shuǐ.",
        "vi": "Bị ốm thì phải nghỉ ngơi nhiều, uống nhiều nước.",
        "tag": "Khuyên bảo y tế"
      }
    ]
  },
  {
    "id": "2-14",
    "hanzi": "时间",
    "traditional": "時間",
    "pinyin": "shíjiān",
    "pinyinClean": "shijian",
    "hanViet": "THỜI GIAN",
    "radical": "日",
    "strokeCount": 11,
    "hskLevel": 2,
    "lesson": 2,
    "partOfSpeech": "dt.",
    "viet": "thời gian, thì giờ",
    "vi_meaning_full": "thời gian",
    "vi_meaning_short": "thời gian, thì giờ",
    "enMeaning": "time",
    "image": "https://images.pexels.com/photos/7224866/pexels-photo-7224866.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "有时间",
      "没时间",
      "多长时间"
    ],
    "compounds": [
      "时期",
      "时间表"
    ],
    "synonyms": [
      "光阴"
    ],
    "antonyms": [],
    "confusableWords": "事件",
    "sentences": [
      {
        "zh": "今天下午我没有时间，明天下午再去吧。",
        "pinyin": "Jīntiān xiàwǔ wǒ méiyǒu shíjiān, míngtiān xiàwǔ zài qù ba.",
        "vi": "Chiều nay tôi không có thời gian, chiều mai hãy đi nhé.",
        "tag": "Từ chối khéo"
      },
      {
        "zh": "你还有多长时间能到这儿？",
        "pinyin": "Nǐ hái yǒu duō cháng shíjiān néng dào zhèr?",
        "vi": "Bạn còn bao lâu thời gian nữa mới tới được đây?",
        "tag": "Hỏi tiến độ"
      }
    ]
  },
  {
    "id": "2-12",
    "hanzi": "休息",
    "traditional": "休息",
    "pinyin": "xiūxi",
    "pinyinClean": "xiuxi",
    "hanViet": "HƯU TỨC",
    "radical": "亻",
    "strokeCount": 16,
    "hskLevel": 2,
    "lesson": 2,
    "partOfSpeech": "đgt.",
    "viet": "nghỉ ngơi, thư giãn",
    "vi_meaning_full": "nghỉ ngơi",
    "vi_meaning_short": "nghỉ ngơi, thư giãn",
    "enMeaning": "to rest, take a break",
    "image": "https://images.pexels.com/photos/16077079/pexels-photo-16077079.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "休息一下",
      "好好休息"
    ],
    "compounds": [
      "休假",
      "休息室"
    ],
    "synonyms": [
      "歇息"
    ],
    "antonyms": [
      "工作",
      "劳作"
    ],
    "confusableWords": "修, 秀",
    "sentences": [
      {
        "zh": "休息一下吧，喝咖啡吗？",
        "pinyin": "Xiūxi yíxià ba, hē kāfēi ma?",
        "vi": "Nghỉ ngơi một chút đi, uống cà phê không?",
        "tag": "Mời mọc thư giãn"
      },
      {
        "zh": "太累了，我想在家里好好休息。",
        "pinyin": "Tài lèi le, wǒ xiǎng zài jiālǐ hǎohǎo xiūxi.",
        "vi": "Mệt quá, tôi muốn ở nhà nghỉ ngơi thật tốt.",
        "tag": "Nhu cầu bản thân"
      }
    ]
  },
  {
    "id": "2-6",
    "hanzi": "药",
    "traditional": "藥",
    "pinyin": "yào",
    "pinyinClean": "yao",
    "hanViet": "DƯỢC",
    "radical": "艹",
    "strokeCount": 16,
    "hskLevel": 2,
    "lesson": 2,
    "partOfSpeech": "dt.",
    "viet": "thuốc chữa bệnh",
    "vi_meaning_full": "thuốc",
    "vi_meaning_short": "thuốc chữa bệnh",
    "enMeaning": "medicine, drug",
    "image": "https://images.pexels.com/photos/13779112/pexels-photo-13779112.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "吃药",
      "中药",
      "西药"
    ],
    "compounds": [
      "药店",
      "药水",
      "中药"
    ],
    "synonyms": [
      "药物"
    ],
    "antonyms": [],
    "confusableWords": "要",
    "sentences": [
      {
        "zh": "生病了就要按时吃药。",
        "pinyin": "Shēngbìng le jiù yào ànshí chī yào.",
        "vi": "Bị ốm thì phải uống thuốc đúng giờ.",
        "tag": "Nhắc nhở y tế"
      },
      {
        "zh": "吃完药感觉好多了。",
        "pinyin": "Chī wán yào gǎnjué hǎo duō le.",
        "vi": "Uống xong thuốc thấy dễ chịu hơn nhiều rồi.",
        "tag": "Báo tình trạng sức khỏe"
      }
    ]
  },
  {
    "id": "hsk2-2-194",
    "hanzi": "早饭",
    "traditional": "早飯",
    "pinyin": "zǎofàn",
    "pinyinClean": "zaofan",
    "hanViet": "TÁO PHẠN",
    "radical": "日",
    "strokeCount": 13,
    "hskLevel": 2,
    "lesson": 2,
    "partOfSpeech": "dt.",
    "viet": "bữa sáng, điểm tâm",
    "vi_meaning_full": "bữa sáng",
    "vi_meaning_short": "bữa sáng, điểm tâm",
    "enMeaning": "breakfast",
    "image": "https://images.pexels.com/photos/32334386/pexels-photo-32334386.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "吃早饭",
      "做早饭"
    ],
    "compounds": [
      "午饭",
      "晚饭"
    ],
    "synonyms": [
      "早餐"
    ],
    "antonyms": [
      "晚饭"
    ],
    "confusableWords": "午饭",
    "sentences": [
      {
        "zh": "你今天早上吃早饭了吗？",
        "pinyin": "Nǐ jīntiān zǎoshang chī zǎofàn le ma?",
        "vi": "Sáng nay bạn đã ăn sáng chưa?",
        "tag": "Hỏi han sức khỏe"
      },
      {
        "zh": "吃早饭对身体非常重要。",
        "pinyin": "Chī zǎofàn duì shēntǐ fēicháng zhòngyào.",
        "vi": "Ăn bữa sáng cực kỳ quan trọng đối với sức khỏe.",
        "tag": "Lời khuyên"
      }
    ]
  },
  {
    "id": "2-3",
    "hanzi": "早上",
    "traditional": "早上",
    "pinyin": "zǎoshang",
    "pinyinClean": "zaoshang",
    "hanViet": "TÁO THƯỢNG",
    "radical": "日",
    "strokeCount": 12,
    "hskLevel": 2,
    "lesson": 2,
    "partOfSpeech": "dt.",
    "viet": "buổi sáng, sáng sớm",
    "vi_meaning_full": "buổi sáng",
    "vi_meaning_short": "buổi sáng, sáng sớm",
    "enMeaning": "morning",
    "image": "https://images.pexels.com/photos/16487305/pexels-photo-16487305.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "早上好",
      "今天早上"
    ],
    "compounds": [
      "早饭",
      "早晨",
      "厄早"
    ],
    "synonyms": [
      "早晨"
    ],
    "antonyms": [
      "晚上"
    ],
    "confusableWords": "澡",
    "sentences": [
      {
        "zh": "这是今天早上的报纸吗？",
        "pinyin": "Zhè shì jīntiān zǎoshang de bàozhǐ ma?",
        "vi": "Đây là báo ra sáng nay phải không?",
        "tag": "Hỏi han"
      },
      {
        "zh": "我每天早上六点起床。",
        "pinyin": "Wǒ měitiān zǎoshang liù diǎn qǐchuáng.",
        "vi": "Thói quen hàng ngày tôi dậy lúc 6 giờ sáng.",
        "tag": "Sinh hoạt"
      }
    ]
  },
  {
    "id": "2-11",
    "hanzi": "知道",
    "traditional": "知道",
    "pinyin": "zhīdào",
    "pinyinClean": "zhidao",
    "hanViet": "TRI ĐẠO",
    "radical": "矢",
    "strokeCount": 18,
    "hskLevel": 2,
    "lesson": 2,
    "partOfSpeech": "đgt.",
    "viet": "biết, nhận biết",
    "vi_meaning_full": "biết",
    "vi_meaning_short": "biết, nhận biết",
    "enMeaning": "to know, be aware of",
    "image": "https://images.pexels.com/photos/34776659/pexels-photo-34776659.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "你知道吗",
      "不知道"
    ],
    "compounds": [
      "知识",
      "知道",
      "道理"
    ],
    "synonyms": [
      "了解",
      "明白"
    ],
    "antonyms": [
      "不懂"
    ],
    "confusableWords": "智道",
    "sentences": [
      {
        "zh": "你知道小王今天什么时候来学校吗？",
        "pinyin": "Nǐ zhīdào Xiǎo Wáng jīntiān shénme shíhou lái xuéxiào ma?",
        "vi": "Bạn có biết hôm nay Tiểu Vương khi nào đến trường không?",
        "tag": "Hỏi thông tin"
      },
      {
        "zh": "我都不知道是什么意思。",
        "pinyin": "Wǒ dōu bù zhīdào shì shénme yìsi.",
        "vi": "Tôi đều không biết có nghĩa là gì.",
        "tag": "Thắc mắc học tập"
      }
    ]
  },
  {
    "id": "3-3",
    "hanzi": "报纸",
    "traditional": "報紙",
    "pinyin": "bàozhǐ",
    "pinyinClean": "baozhi",
    "hanViet": "BÁO CHỈ",
    "radical": "手",
    "strokeCount": 19,
    "hskLevel": 2,
    "lesson": 3,
    "partOfSpeech": "dt.",
    "viet": "tờ báo",
    "vi_meaning_full": "báo",
    "vi_meaning_short": "tờ báo",
    "enMeaning": "newspaper",
    "image": "https://images.pexels.com/photos/6858664/pexels-photo-6858664.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "看报纸",
      "读报纸",
      "订报纸"
    ],
    "compounds": [
      "报纸",
      "画报"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "包子, 杂志",
    "sentences": [
      {
        "zh": "这是今天早上的报纸吗？",
        "pinyin": "Zhè shì jīntiān zǎoshang de bàozhǐ ma?",
        "vi": "Đây là báo ra sáng nay phải không?",
        "tag": "Hỏi thông tin"
      },
      {
        "zh": "不是，是送牛奶的。",
        "pinyin": "Bú shì, shì sòng niúnǎi de.",
        "vi": "Không phải, đó là người giao sữa bò.",
        "tag": "Trả lời giao tiếp"
      }
    ]
  },
  {
    "id": "3-7",
    "hanzi": "房间",
    "traditional": "房間",
    "pinyin": "fángjiān",
    "pinyinClean": "fangjian",
    "hanViet": "PHÒNG GIAN",
    "radical": "户",
    "strokeCount": 16,
    "hskLevel": 2,
    "lesson": 3,
    "partOfSpeech": "dt.",
    "viet": "căn phòng, phòng",
    "vi_meaning_full": "phòng",
    "vi_meaning_short": "căn phòng, phòng",
    "enMeaning": "room",
    "image": "https://images.pexels.com/photos/32372041/pexels-photo-32372041.png?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "打扫房间",
      "我的房间",
      "房间里"
    ],
    "compounds": [
      "房间",
      "房东",
      "房子"
    ],
    "synonyms": [
      "屋子"
    ],
    "antonyms": [],
    "confusableWords": "房子",
    "sentences": [
      {
        "zh": "这是我和我丈夫的房间。",
        "pinyin": "Zhè shì wǒ hé wǒ zhàngfu de fángjiān.",
        "vi": "Đây là phòng của vợ chồng tôi.",
        "tag": "Giới thiệu nhà cửa"
      },
      {
        "zh": "服务员，我房间的门打不开了。",
        "pinyin": "Fúwùyuán, wǒ fángjiān de mén dǎ bù kāi le.",
        "vi": "Phục vụ ơi, cửa phòng tôi không mở được rồi.",
        "tag": "Yêu cầu trợ giúp"
      }
    ]
  },
  {
    "id": "hsk2-3-168",
    "hanzi": "粉",
    "traditional": "粉",
    "pinyin": "fěn",
    "pinyinClean": "fen",
    "hanViet": "PHẤN",
    "radical": "米",
    "strokeCount": 10,
    "hskLevel": 2,
    "lesson": 3,
    "partOfSpeech": "tt.",
    "viet": "màu hồng, phấn",
    "vi_meaning_full": "có màu hồng",
    "vi_meaning_short": "màu hồng, phấn",
    "enMeaning": "pink, powder",
    "image": "https://images.pexels.com/photos/39617749/pexels-photo-39617749.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "粉色的",
      "面粉"
    ],
    "compounds": [
      "粉色",
      "花粉"
    ],
    "synonyms": [
      "粉红"
    ],
    "antonyms": [],
    "confusableWords": "纷",
    "sentences": [
      {
        "zh": "粉色是我最喜欢的颜色。",
        "pinyin": "Fěnsè shì wǒ zuì xǐhuan de yánsè.",
        "vi": "Màu hồng là màu yêu thích nhất của tôi.",
        "tag": "Sở thích"
      },
      {
        "zh": "粉色的花真好看。",
        "pinyin": "Fěnsè de huā zhēn hǎokàn.",
        "vi": "Hoa màu hồng thật là đẹp.",
        "tag": "Miêu tả"
      }
    ]
  },
  {
    "id": "3-11",
    "hanzi": "粉色",
    "traditional": "粉色",
    "pinyin": "fěnsè",
    "pinyinClean": "fense",
    "hanViet": "PHẤN SẮC",
    "radical": "米",
    "strokeCount": 10,
    "hskLevel": 2,
    "lesson": 3,
    "partOfSpeech": "dt.",
    "viet": "màu hồng",
    "vi_meaning_full": "màu hồng",
    "vi_meaning_short": "màu hồng",
    "enMeaning": "pink color",
    "image": "https://images.pexels.com/photos/16733358/pexels-photo-16733358.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "粉色的衣服",
      "喜欢粉色"
    ],
    "compounds": [
      "面粉",
      "色彩"
    ],
    "synonyms": [
      "粉红"
    ],
    "antonyms": [],
    "confusableWords": "红色",
    "sentences": [
      {
        "zh": "粉色是我女儿最喜欢的颜色。",
        "pinyin": "Fěnsè shì wǒ nǚ'ér zuì xǐhuan de yánsè.",
        "vi": "Màu hồng là màu mà con gái tôi thích nhất.",
        "tag": "Sở thích"
      },
      {
        "zh": "她穿了一件粉色的衬衫。",
        "pinyin": "Tā chuān le yí jiàn fěnsè de chènshān.",
        "vi": "Cô ấy mặc một chiếc áo sơ mi màu hồng.",
        "tag": "Trang phục"
      }
    ]
  },
  {
    "id": "hsk2-3-40",
    "hanzi": "红",
    "traditional": "紅",
    "pinyin": "hóng",
    "pinyinClean": "hong",
    "hanViet": "HỒNG",
    "radical": "纟",
    "strokeCount": 6,
    "hskLevel": 2,
    "lesson": 3,
    "partOfSpeech": "tt.",
    "viet": "màu đỏ",
    "vi_meaning_full": "có màu đỏ",
    "vi_meaning_short": "màu đỏ",
    "enMeaning": "red",
    "image": "https://images.pexels.com/photos/36272661/pexels-photo-36272661.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "红色的",
      "红茶",
      "红色"
    ],
    "compounds": [
      "红色",
      "红人",
      "口红"
    ],
    "synonyms": [
      "红色"
    ],
    "antonyms": [
      "绿"
    ],
    "confusableWords": "虹",
    "sentences": [
      {
        "zh": "左边那个红色的是我的。",
        "pinyin": "Zuǒbian nàge hóngsè de shì wǒ de.",
        "vi": "Ly màu đỏ ở bên trái là của tôi.",
        "tag": "Nhận đồ vật"
      },
      {
        "zh": "这件红的呢？这是今天新来的。",
        "pinyin": "Zhè jiàn hóng de ne? Zhè shì jīntiān xīn lái de.",
        "vi": "Còn cái màu đỏ này thì sao? Đây là hàng mới về hôm nay.",
        "tag": "Giới thiệu mẫu mã"
      }
    ]
  },
  {
    "id": "3-14",
    "hanzi": "红色",
    "traditional": "紅色",
    "pinyin": "hóngsè",
    "pinyinClean": "hongse",
    "hanViet": "HỒNG SẮC",
    "radical": "纟",
    "strokeCount": 9,
    "hskLevel": 2,
    "lesson": 3,
    "partOfSpeech": "dt.",
    "viet": "màu đỏ",
    "vi_meaning_full": "màu đỏ",
    "vi_meaning_short": "màu đỏ",
    "enMeaning": "red color",
    "image": "https://images.pexels.com/photos/33321232/pexels-photo-33321232.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "红色的",
      "喜欢红色"
    ],
    "compounds": [
      "红人",
      "红包"
    ],
    "synonyms": [
      "红"
    ],
    "antonyms": [
      "黑色"
    ],
    "confusableWords": "黑色",
    "sentences": [
      {
        "zh": "左边那个红色的是我的。",
        "pinyin": "Zuǒbian nàge hóngsè de shì wǒ de.",
        "vi": "Cái màu đỏ ở bên trái là của tôi.",
        "tag": "Nhận đồ"
      },
      {
        "zh": "中国人都很喜欢红色。",
        "pinyin": "Zhōngguó rén dōu hěn xǐhuan hóngsè.",
        "vi": "Người Trung Quốc đều rất thích màu đỏ.",
        "tag": "Văn hóa"
      }
    ]
  },
  {
    "id": "3-6",
    "hanzi": "牛奶",
    "traditional": "牛奶",
    "pinyin": "niúnǎi",
    "pinyinClean": "niunai",
    "hanViet": "NGƯU NÃI",
    "radical": "牛",
    "strokeCount": 9,
    "hskLevel": 2,
    "lesson": 3,
    "partOfSpeech": "dt.",
    "viet": "sữa tươi, sữa bò",
    "vi_meaning_full": "sửa bò",
    "vi_meaning_short": "sữa tươi, sữa bò",
    "enMeaning": "milk",
    "image": "https://images.pexels.com/photos/37304947/pexels-photo-37304947.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "喝牛奶",
      "送牛奶"
    ],
    "compounds": [
      "奶茶",
      "水牛"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "牛肉",
    "sentences": [
      {
        "zh": "不是，是送牛奶的。",
        "pinyin": "Bú shì, shì sòng niúnǎi de.",
        "vi": "Không phải, đó là người giao sữa bò.",
        "tag": "Sự việc hàng ngày"
      },
      {
        "zh": "早上喝一杯牛奶对身体好。",
        "pinyin": "Zǎoshang hē yì bēi niúnǎi duì shēntǐ hǎo.",
        "vi": "Sáng ra uống một ly sữa tốt cho cơ thể.",
        "tag": "Thói quen ăn uống"
      }
    ]
  },
  {
    "id": "3-9",
    "hanzi": "旁边",
    "traditional": "旁邊",
    "pinyin": "pángbiān",
    "pinyinClean": "pangbian",
    "hanViet": "BÀNG BIÊN",
    "radical": "方",
    "strokeCount": 15,
    "hskLevel": 2,
    "lesson": 3,
    "partOfSpeech": "dt.",
    "viet": "bên cạnh, chỗ kế bên",
    "vi_meaning_full": "bên cạnh",
    "vi_meaning_short": "bên cạnh, chỗ kế bên",
    "enMeaning": "side, beside",
    "image": "https://images.pexels.com/photos/25014779/pexels-photo-25014779.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "在...旁边",
      "旁边的人"
    ],
    "compounds": [
      "旁人",
      "两旁"
    ],
    "synonyms": [
      "身边",
      "侧面"
    ],
    "antonyms": [],
    "confusableWords": "磅",
    "sentences": [
      {
        "zh": "旁边那个小的房间是我女儿的。",
        "pinyin": "Pángbiān nàge xiǎo de fángjiān shì wǒ nǚ'ér de.",
        "vi": "Căn phòng nhỏ bên cạnh là của con gái tôi.",
        "tag": "Miêu tả vị trí"
      },
      {
        "zh": "我就坐在你旁边。",
        "pinyin": "Wǒ jiù zuò zài nǐ pángbiān.",
        "vi": "Tôi ngồi ngay bên cạnh bạn.",
        "tag": "Xác định chỗ ngồi"
      }
    ]
  },
  {
    "id": "3-2",
    "hanzi": "千",
    "traditional": "千",
    "pinyin": "qiān",
    "pinyinClean": "qian",
    "hanViet": "THIÊN",
    "radical": "十",
    "strokeCount": 3,
    "hskLevel": 2,
    "lesson": 3,
    "partOfSpeech": "số.",
    "viet": "nghìn, hàng nghìn",
    "vi_meaning_full": "nghìn",
    "vi_meaning_short": "nghìn, hàng nghìn",
    "enMeaning": "thousand",
    "image": "https://images.pexels.com/photos/29234909/pexels-photo-29234909.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "一千",
      "三千多块"
    ],
    "compounds": [
      "千万",
      "千克"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "干, 于",
    "sentences": [
      {
        "zh": "买这块手表花了三千多块。",
        "pinyin": "Mǎi zhè kuài shǒubiǎo huā le sān qiān duō kuài.",
        "vi": "Mua cái đồng hồ này tốn hơn 3 nghìn đồng.",
        "tag": "Giá cả đồ vật"
      },
      {
        "zh": "这个学校有三千个学生。",
        "pinyin": "Zhège xuéxiào yǒu sān qiān gè xuésheng.",
        "vi": "Trường học này có ba nghìn học sinh.",
        "tag": "Biểu thị quy mô"
      }
    ]
  },
  {
    "id": "3-1",
    "hanzi": "手表",
    "traditional": "手錶",
    "pinyin": "shǒubiǎo",
    "pinyinClean": "shoubiao",
    "hanViet": "THỦ BIỂU",
    "radical": "手",
    "strokeCount": 12,
    "hskLevel": 2,
    "lesson": 3,
    "partOfSpeech": "dt.",
    "viet": "đồng hồ đeo tay",
    "vi_meaning_full": "đồng hồ đeo tay",
    "vi_meaning_short": "đồng hồ đeo tay",
    "enMeaning": "wristwatch",
    "image": "https://images.pexels.com/photos/14312717/pexels-photo-14312717.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "戴手表",
      "这块手表"
    ],
    "compounds": [
      "手机",
      "手套",
      "表格"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "手机",
    "sentences": [
      {
        "zh": "这块手表是你的吗？是我爸爸的。",
        "pinyin": "Zhè kuài shǒubiǎo shì nǐ de ma? Shì wǒ bàba de.",
        "vi": "Chiếc đồng hồ đeo tay này là của anh phải không? Không phải, của bố tôi.",
        "tag": "Xác nhận chủ sở hữu"
      },
      {
        "zh": "这块手表花了三千多块。",
        "pinyin": "Zhè kuài shǒubiǎo huā le sān qiān duō kuài.",
        "vi": "Cái đồng hồ này tốn hơn 3 nghìn đồng.",
        "tag": "Mua sắm"
      }
    ]
  },
  {
    "id": "3-4",
    "hanzi": "送",
    "traditional": "送",
    "pinyin": "sòng",
    "pinyinClean": "song",
    "hanViet": "TỐNG",
    "radical": "辶",
    "strokeCount": 9,
    "hskLevel": 2,
    "lesson": 3,
    "partOfSpeech": "đgt.",
    "viet": "giao đồ, đưa, tặng quà, tiễn",
    "vi_meaning_full": "giao, đưa; tặng, tiễn",
    "vi_meaning_short": "giao đồ, đưa, tặng quà, tiễn",
    "enMeaning": "to deliver, give as a present, see off",
    "image": "https://images.pexels.com/photos/19679385/pexels-photo-19679385.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "送牛奶",
      "送礼物",
      "送朋友"
    ],
    "compounds": [
      "送别",
      "赠送",
      "配送"
    ],
    "synonyms": [
      "赠送",
      "递"
    ],
    "antonyms": [
      "接"
    ],
    "confusableWords": "诵",
    "sentences": [
      {
        "zh": "不是，是送牛奶的。",
        "pinyin": "Bú shì, shì sòng niúnǎi de.",
        "vi": "Không phải, là người giao sữa bò đấy.",
        "tag": "Xác nhận nhân sự"
      },
      {
        "zh": "这是我送给你的生日礼物。",
        "pinyin": "Zhè shì wǒ sòng gěi nǐ de shēngrì lǐwù.",
        "vi": "Đây là quà sinh nhật mình tặng cậu.",
        "tag": "Tặng quà"
      }
    ]
  },
  {
    "id": "3-12",
    "hanzi": "颜色",
    "traditional": "顏色",
    "pinyin": "yánsè",
    "pinyinClean": "yanse",
    "hanViet": "NHAN SẮC",
    "radical": "页",
    "strokeCount": 21,
    "hskLevel": 2,
    "lesson": 3,
    "partOfSpeech": "dt.",
    "viet": "màu sắc, gam màu",
    "vi_meaning_full": "màu sắc, màu",
    "vi_meaning_short": "màu sắc, gam màu",
    "enMeaning": "color",
    "image": "https://images.pexels.com/photos/7908546/pexels-photo-7908546.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "什么颜色",
      "颜色很漂亮"
    ],
    "compounds": [
      "色彩",
      "颜料"
    ],
    "synonyms": [
      "色彩"
    ],
    "antonyms": [],
    "confusableWords": "眼神",
    "sentences": [
      {
        "zh": "粉色是我女儿最喜欢的颜色。",
        "pinyin": "Fěnsè shì wǒ nǚ'ér zuì xǐhuan de yánsè.",
        "vi": "Màu hồng là màu mà con gái tôi thích nhất.",
        "tag": "Sở thích"
      },
      {
        "zh": "颜色还可以，就是有点儿大。",
        "pinyin": "Yánsè hái kěyǐ, jiùshì yǒudiǎnr dà.",
        "vi": "Màu sắc cũng tạm được, có điều hơi rộng.",
        "tag": "Nhận xét trang phục"
      }
    ]
  },
  {
    "id": "3-5",
    "hanzi": "一下",
    "traditional": "一下",
    "pinyin": "yíxià",
    "pinyinClean": "yixia",
    "hanViet": "NHẤT HẠ",
    "radical": "一",
    "strokeCount": 4,
    "hskLevel": 2,
    "lesson": 3,
    "partOfSpeech": "sl.",
    "viet": "một chút, thử làm",
    "vi_meaning_full": "được dùng sau động từ để diễn tả rằng người nào đó thực hiện việc gì trong thời gian ngắn/thử làm việc gì",
    "vi_meaning_short": "một chút, thử làm",
    "enMeaning": "once, a bit, a short while",
    "image": "https://images.pexels.com/photos/14740202/pexels-photo-14740202.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "看一下",
      "休息一下",
      "试一下"
    ],
    "compounds": [
      "一下儿"
    ],
    "synonyms": [
      "一会儿"
    ],
    "antonyms": [],
    "confusableWords": "一天",
    "sentences": [
      {
        "zh": "帮我看一下这件衣服怎么样。",
        "pinyin": "Bāng wǒ kàn yíxià zhè jiàn yīfu zěnmeyàng.",
        "vi": "Xem giúp mình chiếc áo này thế nào.",
        "tag": "Yêu cầu giúp đỡ nhẹ nhàng"
      },
      {
        "zh": "我看一下。不是，是送牛奶的。",
        "pinyin": "Wǒ kàn yíxià. Bú shì, shì sòng niúnǎi de.",
        "vi": "Để tôi xem một chút. Không phải, là người giao sữa đấy.",
        "tag": "Quan sát nhanh"
      }
    ]
  },
  {
    "id": "3-8",
    "hanzi": "丈夫",
    "traditional": "丈夫",
    "pinyin": "zhàngfu",
    "pinyinClean": "zhangfu",
    "hanViet": "TRƯỢNG PHU",
    "radical": "一",
    "strokeCount": 7,
    "hskLevel": 2,
    "lesson": 3,
    "partOfSpeech": "dt.",
    "viet": "người chồng, chồng",
    "vi_meaning_full": "chồng",
    "vi_meaning_short": "người chồng, chồng",
    "enMeaning": "husband",
    "image": "https://images.pexels.com/photos/31743604/pexels-photo-31743604.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "我丈夫",
      "丈夫妻子"
    ],
    "compounds": [
      "夫妇",
      "丈夫"
    ],
    "synonyms": [
      "先生",
      "老公"
    ],
    "antonyms": [
      "妻子"
    ],
    "confusableWords": "杖",
    "sentences": [
      {
        "zh": "这是我和我丈夫的房间。",
        "pinyin": "Zhè shì wǒ hé wǒ zhàngfu de fángjiān.",
        "vi": "Đây là phòng của tôi và chồng tôi.",
        "tag": "Giới thiệu căn nhà"
      },
      {
        "zh": "她丈夫在一家大公司工作。",
        "pinyin": "Tā zhàngfu zài yì jiā dà gōngsī gōngzuò.",
        "vi": "Chồng cô ấy làm việc ở một công ty lớn.",
        "tag": "Giới thiệu gia cảnh"
      }
    ]
  },
  {
    "id": "3-10",
    "hanzi": "真",
    "traditional": "真",
    "pinyin": "zhēn",
    "pinyinClean": "zhen",
    "hanViet": "CHÂN",
    "radical": "目",
    "strokeCount": 10,
    "hskLevel": 2,
    "lesson": 3,
    "partOfSpeech": "phó.",
    "viet": "thật là, rất",
    "vi_meaning_full": "thật, quả là",
    "vi_meaning_short": "thật là, rất",
    "enMeaning": "really, truly",
    "image": "https://images.pexels.com/photos/5442468/pexels-photo-5442468.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "真好",
      "真漂亮",
      "真不错"
    ],
    "compounds": [
      "真心",
      "真正",
      "真理"
    ],
    "synonyms": [
      "确实",
      "的确"
    ],
    "antonyms": [
      "假"
    ],
    "confusableWords": "直",
    "sentences": [
      {
        "zh": "你女儿的房间真漂亮！",
        "pinyin": "Nǐ nǚ'ér de fángjiān zhēn piàoliang!",
        "vi": "Phòng con gái bạn thật là đẹp quá!",
        "tag": "Khen ngợi"
      },
      {
        "zh": "时间过得真快，新的一年快要到了！",
        "pinyin": "Shíjiān guò de zhēn kuài, xīn de yì nián kuàiyào dào le!",
        "vi": "Thời gian trôi thật nhanh, năm mới sắp đến rồi!",
        "tag": "Cảm thán"
      }
    ]
  },
  {
    "id": "3-13",
    "hanzi": "左边",
    "traditional": "左邊",
    "pinyin": "zuǒbian",
    "pinyinClean": "zuobian",
    "hanViet": "TẢ BIÊN",
    "radical": "工",
    "strokeCount": 10,
    "hskLevel": 2,
    "lesson": 3,
    "partOfSpeech": "dt.",
    "viet": "phía bên trái",
    "vi_meaning_full": "bên trái",
    "vi_meaning_short": "phía bên trái",
    "enMeaning": "left side",
    "image": "https://images.pexels.com/photos/28176007/pexels-photo-28176007.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "在左边",
      "往左"
    ],
    "compounds": [
      "左手",
      "左转"
    ],
    "synonyms": [
      "左侧"
    ],
    "antonyms": [
      "右边"
    ],
    "confusableWords": "作",
    "sentences": [
      {
        "zh": "左边那个红色的是我的。",
        "pinyin": "Zuǒbian nàge hóngsè de shì wǒ de.",
        "vi": "Cái ly màu đỏ bên trái là của tôi.",
        "tag": "Xác định đồ vật"
      },
      {
        "zh": "往左走，前面就是学校。",
        "pinyin": "Wǎng zuǒ zǒu, qiánmiàn jiùshì xuéxiào.",
        "vi": "Đi về bên trái, phía trước chính là trường học.",
        "tag": "Chỉ đường"
      }
    ]
  },
  {
    "id": "4-12",
    "hanzi": "帮",
    "traditional": "幫",
    "pinyin": "bāng",
    "pinyinClean": "bang",
    "hanViet": "BANG",
    "radical": "巾",
    "strokeCount": 9,
    "hskLevel": 2,
    "lesson": 4,
    "partOfSpeech": "đgt.",
    "viet": "giúp, hỗ trợ",
    "vi_meaning_full": "giúp, giúp đỡ",
    "vi_meaning_short": "giúp, hỗ trợ",
    "enMeaning": "to help, assist",
    "image": "https://images.pexels.com/photos/19453453/pexels-photo-19453453.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "帮我",
      "帮忙"
    ],
    "compounds": [
      "帮忙",
      "帮助",
      "助手"
    ],
    "synonyms": [
      "帮助"
    ],
    "antonyms": [],
    "confusableWords": "包",
    "sentences": [
      {
        "zh": "这个工作是他帮我介绍的。",
        "pinyin": "Zhège gōngzuò shì tā bāng wǒ jièshào de.",
        "vi": "Công việc này là ông ấy giúp tôi giới thiệu.",
        "tag": "Biết ơn"
      },
      {
        "zh": "帮我看一下这件衣服怎么样。",
        "pinyin": "Bāng wǒ kàn yíxià zhè jiàn yīfu zěnmeyàng.",
        "vi": "Xem giúp mình chiếc áo này thế nào.",
        "tag": "Yêu cầu giúp đỡ"
      }
    ]
  },
  {
    "id": "4-7",
    "hanzi": "非常",
    "traditional": "非常",
    "pinyin": "fēicháng",
    "pinyinClean": "feichang",
    "hanViet": "PHI THƯỜNG",
    "radical": "非",
    "strokeCount": 16,
    "hskLevel": 2,
    "lesson": 4,
    "partOfSpeech": "phó.",
    "viet": "rất, vô cùng, cực kỳ",
    "vi_meaning_full": "rất, vô cùng",
    "vi_meaning_short": "rất, vô cùng, cực kỳ",
    "enMeaning": "very, extremely",
    "image": "https://images.pexels.com/photos/38754117/pexels-photo-38754117.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "非常喜欢",
      "非常好",
      "非常漂亮"
    ],
    "compounds": [
      "非常",
      "经常"
    ],
    "synonyms": [
      "十分",
      "特别"
    ],
    "antonyms": [
      "一般"
    ],
    "confusableWords": "经常",
    "sentences": [
      {
        "zh": "我非常喜欢踢足球。",
        "pinyin": "Wǒ fēicháng xǐhuan tī zúqiú.",
        "vi": "Tôi rất thích đá bóng.",
        "tag": "Bày tỏ sở thích"
      },
      {
        "zh": "眼睛最漂亮，非常大。",
        "pinyin": "Yǎnjing zuì piàoliang, fēicháng dà.",
        "vi": "Đôi mắt đẹp nhất, rất là to.",
        "tag": "Khen ngợi vẻ đẹp"
      }
    ]
  },
  {
    "id": "4-4",
    "hanzi": "接",
    "traditional": "接",
    "pinyin": "jiē",
    "pinyinClean": "jie",
    "hanViet": "TIẾP",
    "radical": "扌",
    "strokeCount": 11,
    "hskLevel": 2,
    "lesson": 4,
    "partOfSpeech": "đgt.",
    "viet": "đón (người), nghe (điện thoại), nhận",
    "vi_meaning_full": "nhận, nghe/trả lời (điện thoại); đón",
    "vi_meaning_short": "đón (người), nghe (điện thoại), nhận",
    "enMeaning": "to receive, answer (phone), meet",
    "image": "https://images.pexels.com/photos/1796469/pexels-photo-1796469.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "接电话",
      "去机场接人"
    ],
    "compounds": [
      "接受",
      "接着",
      "接送"
    ],
    "synonyms": [
      "迎接",
      "接收"
    ],
    "antonyms": [
      "送"
    ],
    "confusableWords": "街",
    "sentences": [
      {
        "zh": "我去机场接一位朋友。",
        "pinyin": "Wǒ qù jīchǎng jiē yí wèi péngyou.",
        "vi": "Tôi ra sân bay đón một người bạn.",
        "tag": "Hành trình đón người"
      },
      {
        "zh": "你怎么不接电话？",
        "pinyin": "Nǐ zěnme bù jiē diànhuà?",
        "vi": "Sao bạn không nghe điện thoại?",
        "tag": "Hỏi han qua điện thoại"
      }
    ]
  },
  {
    "id": "4-13",
    "hanzi": "介绍",
    "traditional": "介紹",
    "pinyin": "jièshào",
    "pinyinClean": "jieshao",
    "hanViet": "GIỚI THIỆU",
    "radical": "人",
    "strokeCount": 15,
    "hskLevel": 2,
    "lesson": 4,
    "partOfSpeech": "đgt.",
    "viet": "giới thiệu",
    "vi_meaning_full": "giới thiệu",
    "vi_meaning_short": "giới thiệu",
    "enMeaning": "to introduce",
    "image": "https://images.pexels.com/photos/17382268/pexels-photo-17382268.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "自我介绍",
      "介绍一下"
    ],
    "compounds": [
      "简介",
      "中介"
    ],
    "synonyms": [
      "推荐"
    ],
    "antonyms": [],
    "confusableWords": "阶段",
    "sentences": [
      {
        "zh": "这个工作是他帮我介绍的。",
        "pinyin": "Zhège gōngzuò shì tā bāng wǒ jièshào de.",
        "vi": "Ông ấy đã giới thiệu giúp tôi công việc này.",
        "tag": "Kể kinh nghiệm"
      },
      {
        "zh": "我来给大家介绍一下新同事。",
        "pinyin": "Wǒ lái gěi dàjiā jièshào yíxià xīn tóngshì.",
        "vi": "Tôi xin giới thiệu đồng nghiệp mới với mọi người.",
        "tag": "Chào hỏi giao tiếp"
      }
    ]
  },
  {
    "id": "4-8",
    "hanzi": "开始",
    "traditional": "開始",
    "pinyin": "kāishǐ",
    "pinyinClean": "kaishi",
    "hanViet": "KHAI THỦY",
    "radical": "门",
    "strokeCount": 12,
    "hskLevel": 2,
    "lesson": 4,
    "partOfSpeech": "đgt.",
    "viet": "bắt đầu",
    "vi_meaning_full": "bắt đầu",
    "vi_meaning_short": "bắt đầu",
    "enMeaning": "to start, begin",
    "image": "https://images.pexels.com/photos/16550006/pexels-photo-16550006.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "从...开始",
      "开始上课"
    ],
    "compounds": [
      "开始",
      "始末"
    ],
    "synonyms": [
      "起点"
    ],
    "antonyms": [
      "结束"
    ],
    "confusableWords": "开心",
    "sentences": [
      {
        "zh": "你是什么时候开始踢足球的？",
        "pinyin": "Nǐ shì shénme shíhou kāishǐ tī zúqiú de?",
        "vi": "Anh bắt đầu đá bóng từ khi nào vậy?",
        "tag": "Hỏi quá trình"
      },
      {
        "zh": "会议十点半开始。",
        "pinyin": "Huìyì shí diǎn bàn kāishǐ.",
        "vi": "Cuộc họp bắt đầu lúc 10 rưỡi.",
        "tag": "Thời gian làm việc"
      }
    ]
  },
  {
    "id": "4-2",
    "hanzi": "快乐",
    "traditional": "快樂",
    "pinyin": "kuàilè",
    "pinyinClean": "kuaile",
    "hanViet": "KHOÁI LẠC",
    "radical": "心",
    "strokeCount": 12,
    "hskLevel": 2,
    "lesson": 4,
    "partOfSpeech": "tt.",
    "viet": "vui vẻ, hạnh phúc",
    "vi_meaning_full": "vui vẻ",
    "vi_meaning_short": "vui vẻ, hạnh phúc",
    "enMeaning": "happy, joyful",
    "image": "https://images.pexels.com/photos/6152103/pexels-photo-6152103.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "祝你生日快乐",
      "快乐的生活"
    ],
    "compounds": [
      "快乐",
      "极乐"
    ],
    "synonyms": [
      "高兴",
      "开心"
    ],
    "antonyms": [
      "痛苦",
      "悲伤"
    ],
    "confusableWords": "快车",
    "sentences": [
      {
        "zh": "祝你生日快乐！",
        "pinyin": "Zhù nǐ shēngrì kuàilè!",
        "vi": "Chúc bạn sinh nhật vui vẻ!",
        "tag": "Chúc mừng sinh nhật"
      },
      {
        "zh": "祝大家新年快乐！",
        "pinyin": "Zhù dàjiā xīnnián kuàilè!",
        "vi": "Chúc mọi người năm mới vui vẻ!",
        "tag": "Chúc Tết"
      }
    ]
  },
  {
    "id": "4-11",
    "hanzi": "两",
    "traditional": "兩",
    "pinyin": "liǎng",
    "pinyinClean": "liang",
    "hanViet": "LƯỠNG",
    "radical": "一",
    "strokeCount": 7,
    "hskLevel": 2,
    "lesson": 4,
    "partOfSpeech": "số.",
    "viet": "hai (dùng trước lượng từ)",
    "vi_meaning_full": "hai",
    "vi_meaning_short": "hai (dùng trước lượng từ)",
    "enMeaning": "two (used with measure words)",
    "image": "https://images.pexels.com/photos/36795783/pexels-photo-36795783.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "两个人",
      "两百块"
    ],
    "compounds": [
      "两边",
      "斤两",
      "两全"
    ],
    "synonyms": [
      "二"
    ],
    "antonyms": [],
    "confusableWords": "俩",
    "sentences": [
      {
        "zh": "我已经两年多没回家了。",
        "pinyin": "Wǒ yǐjīng liǎng nián duō méi huí jiā le.",
        "vi": "Tôi đã hơn hai năm không về nhà rồi.",
        "tag": "Nói về thời gian"
      },
      {
        "zh": "她比我们老师小两岁。",
        "pinyin": "Tā bǐ wǒmen lǎoshī xiǎo liǎng suì.",
        "vi": "Cô ấy nhỏ hơn cô giáo chúng tôi 2 tuổi.",
        "tag": "So sánh tuổi"
      }
    ]
  },
  {
    "id": "4-1",
    "hanzi": "生日",
    "traditional": "生日",
    "pinyin": "shēngrì",
    "pinyinClean": "shengri",
    "hanViet": "SINH NHẬT",
    "radical": "生",
    "strokeCount": 9,
    "hskLevel": 2,
    "lesson": 4,
    "partOfSpeech": "dt.",
    "viet": "ngày sinh nhật",
    "vi_meaning_full": "sinh nhật",
    "vi_meaning_short": "ngày sinh nhật",
    "enMeaning": "birthday",
    "image": "https://images.pexels.com/photos/30040908/pexels-photo-30040908.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "过生日",
      "生日快乐"
    ],
    "compounds": [
      "生日蛋糕",
      "节日"
    ],
    "synonyms": [
      "诞辰"
    ],
    "antonyms": [],
    "confusableWords": "生人",
    "sentences": [
      {
        "zh": "离我的生日还有一个多星期呢！",
        "pinyin": "Lí wǒ de shēngrì hái yǒu yí gè duō xīngqī ne!",
        "vi": "Còn hơn một tuần nữa mới đến sinh nhật tôi mà!",
        "tag": "Mong chờ lễ kỉ niệm"
      },
      {
        "zh": "祝你生日快乐！这是送给你的礼物。",
        "pinyin": "Zhù nǐ shēngrì kuàilè! Zhè shì sòng gěi nǐ de lǐwù.",
        "vi": "Chúc bạn sinh nhật vui vẻ! Đây là quà tặng bạn.",
        "tag": "Tặng quà"
      }
    ]
  },
  {
    "id": "4-5",
    "hanzi": "晚上",
    "traditional": "晚上",
    "pinyin": "wǎnshang",
    "pinyinClean": "wanshang",
    "hanViet": "VÃN THƯỢNG",
    "radical": "日",
    "strokeCount": 14,
    "hskLevel": 2,
    "lesson": 4,
    "partOfSpeech": "dt.",
    "viet": "buổi tối, ban đêm",
    "vi_meaning_full": "buổi tối",
    "vi_meaning_short": "buổi tối, ban đêm",
    "enMeaning": "evening, night",
    "image": "https://images.pexels.com/photos/30858160/pexels-photo-30858160.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "今天晚上",
      "晚上好"
    ],
    "compounds": [
      "晚会",
      "晚饭"
    ],
    "synonyms": [
      "夜晚"
    ],
    "antonyms": [
      "早上",
      "白天"
    ],
    "confusableWords": "碗",
    "sentences": [
      {
        "zh": "晚上我们去饭馆吃饭，怎么样？",
        "pinyin": "Wǎnshang wǒmen qù fànguǎn chī fàn, zěnmeyàng?",
        "vi": "Buổi tối chúng mình ra quán ăn tối, thấy thế nào?",
        "tag": "Rủ đi ăn"
      },
      {
        "zh": "他每天晚上十点睡觉。",
        "pinyin": "Tā měitiān wǎnshang shí diǎn shuìjiào.",
        "vi": "Mỗi buổi tối anh ấy đi ngủ lúc 10 giờ.",
        "tag": "Lịch sinh hoạt"
      }
    ]
  },
  {
    "id": "hsk2-4-192",
    "hanzi": "下班",
    "traditional": "下班",
    "pinyin": "xià bān",
    "pinyinClean": "xiaban",
    "hanViet": "HẠ BAN",
    "radical": "一",
    "strokeCount": 11,
    "hskLevel": 2,
    "lesson": 4,
    "partOfSpeech": "đgt.",
    "viet": "tan làm, hết ca làm",
    "vi_meaning_full": "tan làm",
    "vi_meaning_short": "tan làm, hết ca làm",
    "enMeaning": "to off work, finish work",
    "image": "https://images.pexels.com/photos/9623660/pexels-photo-9623660.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "下班后",
      "准备下班"
    ],
    "compounds": [
      "上班",
      "加班"
    ],
    "synonyms": [],
    "antonyms": [
      "上班"
    ],
    "confusableWords": "上班",
    "sentences": [
      {
        "zh": "你今天几点下班？五点半下班。",
        "pinyin": "Nǐ jīntiān jǐ diǎn xiàbān? Wǔ diǎn bàn xiàbān.",
        "vi": "Hôm nay mấy giờ bạn tan làm? 5 rưỡi tan làm.",
        "tag": "Hỏi giờ giấc"
      },
      {
        "zh": "下班以后我们一起去吃饭吧。",
        "pinyin": "Xiàbān yǐhòu wǒmen yìqǐ qù chī fàn ba.",
        "vi": "Sau khi tan làm chúng mình cùng đi ăn tối nhé.",
        "tag": "Rủ rê"
      }
    ]
  },
  {
    "id": "4-9",
    "hanzi": "已经",
    "traditional": "已經",
    "pinyin": "yǐjīng",
    "pinyinClean": "yijing",
    "hanViet": "DĨ KINH",
    "radical": "己",
    "strokeCount": 13,
    "hskLevel": 2,
    "lesson": 4,
    "partOfSpeech": "phó.",
    "viet": "đã, rồi (diễn tả hành động hoàn thành)",
    "vi_meaning_full": "đã",
    "vi_meaning_short": "đã, rồi (diễn tả hành động hoàn thành)",
    "enMeaning": "already",
    "image": "https://images.pexels.com/photos/8452849/pexels-photo-8452849.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "已经...了",
      "已经到了"
    ],
    "compounds": [
      "已经"
    ],
    "synonyms": [
      "早已"
    ],
    "antonyms": [
      "未"
    ],
    "confusableWords": "以后",
    "sentences": [
      {
        "zh": "他已经不在这里工作了。",
        "pinyin": "Tā yǐjīng bù zài zhèlǐ gōngzuò le.",
        "vi": "Anh ấy đã không còn làm việc ở đây nữa rồi.",
        "tag": "Thông báo thay đổi"
      },
      {
        "zh": "我已经打过电话了。",
        "pinyin": "Wǒ yǐjīng dǎ guò diànhuà le.",
        "vi": "Tôi đã gọi điện thoại rồi.",
        "tag": "Báo cáo tiến độ"
      }
    ]
  },
  {
    "id": "4-10",
    "hanzi": "长",
    "traditional": "長",
    "pinyin": "zhǎng",
    "pinyinClean": "zhang",
    "hanViet": "TRƯỞNG",
    "radical": "长",
    "strokeCount": 8,
    "hskLevel": 2,
    "lesson": 4,
    "partOfSpeech": "đgt.",
    "viet": "lớn lên, mọc ra, trông thế nào",
    "vi_meaning_full": "sinh ra, mọc; lớn lên",
    "vi_meaning_short": "lớn lên, mọc ra, trông thế nào",
    "enMeaning": "to grow, develop, look (appearance)",
    "image": "https://images.pexels.com/photos/6334003/pexels-photo-6334003.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "长得漂亮",
      "长大"
    ],
    "compounds": [
      "长大",
      "长辈",
      "校长"
    ],
    "synonyms": [
      "生长"
    ],
    "antonyms": [],
    "confusableWords": "长 (cháng)",
    "sentences": [
      {
        "zh": "班上那个长着两个大眼睛的女孩子是谁？",
        "pinyin": "Bān shàng nàge zhǎng zhe liǎng gè dà yǎnjing de nǚháir shì shéi?",
        "vi": "Cô gái trong lớp sở hữu/có đôi mắt to là ai vậy?",
        "tag": "Miêu tả ngoại hình"
      },
      {
        "zh": "这棵树长得真快。",
        "pinyin": "Zhè kē shù zhǎng de zhēn kuài.",
        "vi": "Cây này lớn nhanh thật.",
        "tag": "Quan sát sinh trưởng"
      }
    ]
  },
  {
    "id": "5-9",
    "hanzi": "不错",
    "traditional": "不錯",
    "pinyin": "búcuò",
    "pinyinClean": "bucuo",
    "hanViet": "BẤT THÁC",
    "radical": "一",
    "strokeCount": 13,
    "hskLevel": 2,
    "lesson": 5,
    "partOfSpeech": "tt.",
    "viet": "không tệ, khá tốt, giỏi",
    "vi_meaning_full": "tuyệt, khá tốt",
    "vi_meaning_short": "không tệ, khá tốt, giỏi",
    "enMeaning": "pretty good, not bad",
    "image": "https://images.pexels.com/photos/8831810/pexels-photo-8831810.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "很不错",
      "真不错"
    ],
    "compounds": [
      "不错",
      "错怪"
    ],
    "synonyms": [
      "挺好",
      "很好"
    ],
    "antonyms": [
      "糟糕",
      "差"
    ],
    "confusableWords": "不错",
    "sentences": [
      {
        "zh": "这家餐馆的菜真不错。",
        "pinyin": "Zhè jiā cānguǎn de cài zhēn búcuò.",
        "vi": "Món ăn của nhà hàng này thật sự rất tuyệt.",
        "tag": "Khen ngợi ẩm thực"
      },
      {
        "zh": "件衣服不错，就买这件吧。",
        "pinyin": "Zhè jiàn yīfu búcuò, jiù mǎi zhè jiàn ba.",
        "vi": "Chiếc áo này không tệ, mua chiếc này đi.",
        "tag": "Quyết định mua sắm"
      }
    ]
  },
  {
    "id": "5-12",
    "hanzi": "对",
    "traditional": "對",
    "pinyin": "duì",
    "pinyinClean": "dui",
    "hanViet": "ĐỐI",
    "radical": "寸",
    "strokeCount": 14,
    "hskLevel": 2,
    "lesson": 5,
    "partOfSpeech": "giới./tt.",
    "viet": "đối với, cho; đúng",
    "vi_meaning_full": "(được dùng trước danh từ hay đại từ) đối với, cho; đúng",
    "vi_meaning_short": "đối với, cho; đúng",
    "enMeaning": "towards, to; correct",
    "image": "https://images.pexels.com/photos/31827772/pexels-photo-31827772.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "对我来说",
      "对身体好",
      "对错"
    ],
    "compounds": [
      "对不起",
      "对方",
      "态度"
    ],
    "synonyms": [
      "正确"
    ],
    "antonyms": [
      "错"
    ],
    "confusableWords": "堆, 队",
    "sentences": [
      {
        "zh": "喝咖啡多了对身体不好。",
        "pinyin": "Hē kāfēi duō le duì shēntǐ bù hǎo.",
        "vi": "Uống nhiều cà phê không tốt cho sức khỏe.",
        "tag": "Khuyên bảo sức khỏe"
      },
      {
        "zh": "这道题你做对了。",
        "pinyin": "Zhè dào tí nǐ zuò duì le.",
        "vi": "Câu này bạn làm đúng rồi.",
        "tag": "Xác nhận kết quả"
      }
    ]
  },
  {
    "id": "5-7",
    "hanzi": "还",
    "traditional": "還",
    "pinyin": "hái",
    "pinyinClean": "hai",
    "hanViet": "HOÀN",
    "radical": "辶",
    "strokeCount": 7,
    "hskLevel": 2,
    "lesson": 5,
    "partOfSpeech": "phó.",
    "viet": "cũng, khá, vẫn còn",
    "vi_meaning_full": "cũng, khá; còn, vẫn",
    "vi_meaning_short": "cũng, khá, vẫn còn",
    "enMeaning": "still, also, fairly",
    "image": "https://images.pexels.com/photos/36650875/pexels-photo-36650875.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "还可以",
      "还有",
      "还原"
    ],
    "compounds": [
      "还有",
      "还是"
    ],
    "synonyms": [
      "依然",
      "尚"
    ],
    "antonyms": [],
    "confusableWords": "还 (huán)",
    "sentences": [
      {
        "zh": "颜色还可以，就是有点儿大。",
        "pinyin": "Yánsè hái kěyǐ, jiùshì yǒudiǎnr dà.",
        "vi": "Màu sắc cũng tạm được nhưng hơi rộng.",
        "tag": "Đánh giá đồ đạc"
      },
      {
        "zh": "离我的生日还有一个多星期呢！",
        "pinyin": "Lí wǒ de shēngrì hái yǒu yí gè duō xīngqī ne!",
        "vi": "Còn hơn một tuần nữa mới đến sinh nhật mình mà!",
        "tag": "Đếm thời gian"
      }
    ]
  },
  {
    "id": "5-6",
    "hanzi": "件",
    "traditional": "件",
    "pinyin": "jiàn",
    "pinyinClean": "jian",
    "hanViet": "KIỆN",
    "radical": "亻",
    "strokeCount": 6,
    "hskLevel": 2,
    "lesson": 5,
    "partOfSpeech": "lượng.",
    "viet": "chiếc, cái (áo, việc)",
    "vi_meaning_full": "(được dùng cho áo) cái, chiếc; việc",
    "vi_meaning_short": "chiếc, cái (áo, việc)",
    "enMeaning": "measure word for clothes, events",
    "image": "https://images.pexels.com/photos/8146450/pexels-photo-8146450.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "一件衣服",
      "这件事"
    ],
    "compounds": [
      "条件",
      "事件",
      "文件"
    ],
    "synonyms": [
      "个"
    ],
    "antonyms": [],
    "confusableWords": "健",
    "sentences": [
      {
        "zh": "帮我看一下这件衣服怎么样。",
        "pinyin": "Bāng wǒ kàn yíxià zhè jiàn yīfu zěnmeyàng.",
        "vi": "Xem giúp mình chiếc áo này thế nào.",
        "tag": "Hỏi ý kiến trang phục"
      },
      {
        "zh": "这件小的怎么样？",
        "pinyin": "Zhè jiàn xiǎo de zěnmeyàng?",
        "vi": "Còn chiếc áo nhỏ này thì sao?",
        "tag": "Thử đồ"
      }
    ]
  },
  {
    "id": "5-3",
    "hanzi": "就",
    "traditional": "就",
    "pinyin": "jiù",
    "pinyinClean": "jiu",
    "hanViet": "TỰU",
    "radical": "尢",
    "strokeCount": 12,
    "hskLevel": 2,
    "lesson": 5,
    "partOfSpeech": "phó.",
    "viet": "thì, chính là, ngay",
    "vi_meaning_full": "được dùng để chỉ một kết luận hay sự kiên quyết",
    "vi_meaning_short": "thì, chính là, ngay",
    "enMeaning": "then, precisely, right away",
    "image": "https://images.pexels.com/photos/36752956/pexels-photo-36752956.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "就是",
      "就去",
      "就做"
    ],
    "compounds": [
      "就是",
      "就业",
      "就近"
    ],
    "synonyms": [
      "即"
    ],
    "antonyms": [],
    "confusableWords": "救, 鹫",
    "sentences": [
      {
        "zh": "那你准备做什么呢？就做你爱吃的鱼吧。",
        "pinyin": "Nà nǐ zhǔnbèi zuò shénme ne? Jiù zuò nǐ ài chī de yú ba.",
        "vi": "Vậy em định nấu món gì? Thì nấu món cá anh thích ăn đi.",
        "tag": "Đưa ra quyết định"
      },
      {
        "zh": "二十分钟就到。",
        "pinyin": "Èrshí fēnzhōng jiù dào.",
        "vi": "20 phút nữa là tới liền.",
        "tag": "Biểu thị sự nhanh chóng"
      }
    ]
  },
  {
    "id": "5-11",
    "hanzi": "咖啡",
    "traditional": "咖啡",
    "pinyin": "kāfēi",
    "pinyinClean": "kafei",
    "hanViet": "CÀ PHÊ",
    "radical": "口",
    "strokeCount": 16,
    "hskLevel": 2,
    "lesson": 5,
    "partOfSpeech": "dt.",
    "viet": "cà phê",
    "vi_meaning_full": "cà phê",
    "vi_meaning_short": "cà phê",
    "enMeaning": "coffee",
    "image": "https://images.pexels.com/photos/5151354/pexels-photo-5151354.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "喝咖啡",
      "咖啡馆"
    ],
    "compounds": [
      "咖啡馆",
      "咖啡因"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "咖喱",
    "sentences": [
      {
        "zh": "休息一下吧，喝咖啡吗？",
        "pinyin": "Xiūxi yíxià ba, hē kāfēi ma?",
        "vi": "Nghỉ một chút đi, uống cà phê không?",
        "tag": "Rủ rê thư giãn"
      },
      {
        "zh": "咖啡喝多了对身体不好。",
        "pinyin": "Kāfēi hē duō le duì shēntǐ bù hǎo.",
        "vi": "Uống cà phê nhiều không tốt cho sức khỏe.",
        "tag": "Nhắc nhở sức khỏe"
      }
    ]
  },
  {
    "id": "5-10",
    "hanzi": "考试",
    "traditional": "考試",
    "pinyin": "kǎoshì",
    "pinyinClean": "kaoshi",
    "hanViet": "KHẢO THÍ",
    "radical": "考",
    "strokeCount": 14,
    "hskLevel": 2,
    "lesson": 5,
    "partOfSpeech": "dt./đgt.",
    "viet": "thi, bài kiểm tra",
    "vi_meaning_full": "cuộc thi, bài kiểm tra; thi",
    "vi_meaning_short": "thi, bài kiểm tra",
    "enMeaning": "exam, test; to take an exam",
    "image": "https://images.pexels.com/photos/9489771/pexels-photo-9489771.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "准备考试",
      "考试结束"
    ],
    "compounds": [
      "考场",
      "考生",
      "试卷"
    ],
    "synonyms": [
      "测验"
    ],
    "antonyms": [],
    "confusableWords": "考虑",
    "sentences": [
      {
        "zh": "明天有考试，他说今天要好好准备。",
        "pinyin": "Míngtiān yǒu kǎoshì, tā shuō jīntiān yào hǎohǎo zhǔnbèi.",
        "vi": "Ngày mai có bài kiểm tra, anh ấy nói hôm nay phải chuẩn bị thật tốt.",
        "tag": "Nói về việc học"
      },
      {
        "zh": "昨天的考试怎么样？",
        "pinyin": "Zuótiān de kǎoshì zěnmeyàng?",
        "vi": "Bài kiểm tra hôm qua thế nào?",
        "tag": "Hỏi thăm kết quả"
      }
    ]
  },
  {
    "id": "5-8",
    "hanzi": "可以",
    "traditional": "可以",
    "pinyin": "kěyǐ",
    "pinyinClean": "keyi",
    "hanViet": "KHẢ DĨ",
    "radical": "口",
    "strokeCount": 9,
    "hskLevel": 2,
    "lesson": 5,
    "partOfSpeech": "tt./tdt.",
    "viet": "được, tạm được, có thể",
    "vi_meaning_full": "không tệ, tạm được; có thể",
    "vi_meaning_short": "được, tạm được, có thể",
    "enMeaning": "can, may, passable",
    "image": "https://images.pexels.com/photos/8834489/pexels-photo-8834489.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "还可以",
      "也可以"
    ],
    "compounds": [
      "认可",
      "许可"
    ],
    "synonyms": [
      "不错",
      "行"
    ],
    "antonyms": [
      "不行"
    ],
    "confusableWords": "可能",
    "sentences": [
      {
        "zh": "颜色还可以，就是有点儿大。",
        "pinyin": "Yánsè hái kěyǐ, jiùshì yǒudiǎnr dà.",
        "vi": "Màu sắc cũng tạm được, có điều hơi rộng.",
        "tag": "Nhận xét chất lượng"
      },
      {
        "zh": "你可以坐公共汽车去。",
        "pinyin": "Nǐ kěyǐ zuò gōnggòng qìchē qù.",
        "vi": "Bạn có thể đi xe buýt.",
        "tag": "Gợi ý lựa chọn"
      }
    ]
  },
  {
    "id": "5-1",
    "hanzi": "外面",
    "traditional": "外面",
    "pinyin": "wàimian",
    "pinyinClean": "waimian",
    "hanViet": "NGOẠI DIỆN",
    "radical": "夕",
    "strokeCount": 14,
    "hskLevel": 2,
    "lesson": 5,
    "partOfSpeech": "dt.",
    "viet": "bên ngoài",
    "vi_meaning_full": "bên ngoài, phía ngoài",
    "vi_meaning_short": "bên ngoài",
    "enMeaning": "outside",
    "image": "https://images.pexels.com/photos/27671544/pexels-photo-27671544.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "在外面",
      "外面冷"
    ],
    "compounds": [
      "外语",
      "面条",
      "表面"
    ],
    "synonyms": [
      "外头"
    ],
    "antonyms": [
      "里面"
    ],
    "confusableWords": "里面",
    "sentences": [
      {
        "zh": "你别去外面吃了。",
        "pinyin": "Nǐ bié qù wàimian chī le.",
        "vi": "Cậu đừng ra ngoài ăn nữa.",
        "tag": "Khuyên ngăn"
      },
      {
        "zh": "外面下雪了，天气很冷。",
        "pinyin": "Wàimian xià xuě le, tiānqì hěn lěng.",
        "vi": "Bên ngoài có tuyết rơi rồi, thời tiết rất lạnh.",
        "tag": "Miêu tả môi trường"
      }
    ]
  },
  {
    "id": "5-13",
    "hanzi": "以后",
    "traditional": "以後",
    "pinyin": "yǐhòu",
    "pinyinClean": "yihou",
    "hanViet": "DĨ HẬU",
    "radical": "人",
    "strokeCount": 11,
    "hskLevel": 2,
    "lesson": 5,
    "partOfSpeech": "dt.",
    "viet": "sau này, về sau, sau khi",
    "vi_meaning_full": "sau này",
    "vi_meaning_short": "sau này, về sau, sau khi",
    "enMeaning": "after, afterwards, later",
    "image": "https://images.pexels.com/photos/27636187/pexels-photo-27636187.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "以后我少喝一点儿",
      "放学以后"
    ],
    "compounds": [
      "以后",
      "以前",
      "后天"
    ],
    "synonyms": [
      "后来"
    ],
    "antonyms": [
      "以前"
    ],
    "confusableWords": "已经",
    "sentences": [
      {
        "zh": "以后我少喝一点儿，每天喝一杯。",
        "pinyin": "Yǐhòu wǒ shǎo hē yìdiǎnr, měitiān hē yì bēi.",
        "vi": "Sau này tôi sẽ uống ít đi một chút, mỗi ngày uống 1 ly.",
        "tag": "Hạ quyết tâm"
      },
      {
        "zh": "五年以后，他成为了经理。",
        "pinyin": "Wǔ nián yǐhòu, tā chéngwéi le jīnglǐ.",
        "vi": "5 năm sau, anh ấy đã trở thành giám đốc.",
        "tag": "Mô tả thời gian"
      }
    ]
  },
  {
    "id": "5-4",
    "hanzi": "鱼",
    "traditional": "魚",
    "pinyin": "yú",
    "pinyinClean": "yu",
    "hanViet": "NGƯ",
    "radical": "鱼",
    "strokeCount": 8,
    "hskLevel": 2,
    "lesson": 5,
    "partOfSpeech": "dt.",
    "viet": "con cá, món cá",
    "vi_meaning_full": "cá, món cá",
    "vi_meaning_short": "con cá, món cá",
    "enMeaning": "fish",
    "image": "https://images.pexels.com/photos/18435519/pexels-photo-18435519.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "吃鱼",
      "做鱼",
      "钓鱼"
    ],
    "compounds": [
      "金鱼",
      "鱼肉",
      "钓鱼"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "余, 于",
    "sentences": [
      {
        "zh": "就做你爱吃的鱼吧。",
        "pinyin": "Jiù zuò nǐ ài chī de yú ba.",
        "vi": "Thì nấu món cá mà anh thích ăn đi.",
        "tag": "Thương lượng thực đơn"
      },
      {
        "zh": "水里有很多小鱼。",
        "pinyin": "Shuǐ lǐ yǒu hěn duō xiǎoyú.",
        "vi": "Dưới nước có rất nhiều cá nhỏ.",
        "tag": "Quan sát thiên nhiên"
      }
    ]
  },
  {
    "id": "5-2",
    "hanzi": "准备",
    "traditional": "準備",
    "pinyin": "zhǔnbèi",
    "pinyinClean": "zhunbei",
    "hanViet": "CHUẨN BỊ",
    "radical": "冫",
    "strokeCount": 17,
    "hskLevel": 2,
    "lesson": 5,
    "partOfSpeech": "đgt.",
    "viet": "dự định, chuẩn bị",
    "vi_meaning_full": "dự định, định; chuẩn bị",
    "vi_meaning_short": "dự định, chuẩn bị",
    "enMeaning": "to prepare, plan to",
    "image": "https://images.pexels.com/photos/31453948/pexels-photo-31453948.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "准备好",
      "准备去",
      "准备考试"
    ],
    "compounds": [
      "准备",
      "准时",
      "具备"
    ],
    "synonyms": [
      "打算",
      "预备"
    ],
    "antonyms": [],
    "confusableWords": "准保",
    "sentences": [
      {
        "zh": "那你准备做什么呢？",
        "pinyin": "Nà nǐ zhǔnbèi zuò shénme ne?",
        "vi": "Vậy bạn dự định làm gì nè?",
        "tag": "Hỏi kế hoạch"
      },
      {
        "zh": "明天有考试，他说今天要好好准备。",
        "pinyin": "Míngtiān yǒu kǎoshì, tā shuō jīntiān yào hǎohǎo zhǔnbèi.",
        "vi": "Ngày mai có bài thi, anh ấy nói hôm nay phải chuẩn bị thật tốt.",
        "tag": "Học tập"
      }
    ]
  },
  {
    "id": "hsk2-6-176",
    "hanzi": "茶馆儿",
    "traditional": "茶館兒",
    "pinyin": "cháguǎnr",
    "pinyinClean": "chaguanr",
    "hanViet": "TRÀ QUÁN",
    "radical": "艹",
    "strokeCount": 21,
    "hskLevel": 2,
    "lesson": 6,
    "partOfSpeech": "dt.",
    "viet": "quán trà, tiệm trà",
    "vi_meaning_full": "quán trà",
    "vi_meaning_short": "quán trà, tiệm trà",
    "enMeaning": "teahouse",
    "image": "https://images.pexels.com/photos/7596850/pexels-photo-7596850.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "去茶馆儿喝茶"
    ],
    "compounds": [
      "喝茶",
      "宾馆"
    ],
    "synonyms": [
      "茶楼"
    ],
    "antonyms": [],
    "confusableWords": "饭馆",
    "sentences": [
      {
        "zh": "爷爷喜欢去茶馆儿喝茶听戏。",
        "pinyin": "Yéye xǐhuan qù cháguǎnr hē chá tīng xì.",
        "vi": "Ông nội thích đến quán trà uống trà nghe kịch.",
        "tag": "Thói quen người già"
      },
      {
        "zh": "这家茶馆儿环境很安静。",
        "pinyin": "Zhè jiā cháguǎnr huánjìng hěn ānjìng.",
        "vi": "Không gian quán trà này rất yên tĩnh.",
        "tag": "Đánh giá"
      }
    ]
  },
  {
    "id": "6-7",
    "hanzi": "打篮球",
    "traditional": "打籃球",
    "pinyin": "dǎ lánqiú",
    "pinyinClean": "dalanqiu",
    "hanViet": "ĐẢ LAM CẦU",
    "radical": "手",
    "strokeCount": 25,
    "hskLevel": 2,
    "lesson": 6,
    "partOfSpeech": "cụm đgt.",
    "viet": "đá/chơi bóng rổ",
    "vi_meaning_full": "chơi bóng rổ",
    "vi_meaning_short": "đá/chơi bóng rổ",
    "enMeaning": "to play basketball",
    "image": "https://images.pexels.com/photos/12997430/pexels-photo-12997430.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "打篮球",
      "喜欢打篮球"
    ],
    "compounds": [
      "篮球",
      "篮球场"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "踢足球",
    "sentences": [
      {
        "zh": "昨天你们怎么都没去打篮球？",
        "pinyin": "Zuótiān nǐmen zěnme dōu méi qù dǎ lánqiú?",
        "vi": "Hôm qua sao các anh đều không đi chơi bóng rổ?",
        "tag": "Hỏi nguyên nhân"
      },
      {
        "zh": "anh ấy rất thích chơi bóng rổ.",
        "pinyin": "Tā fēicháng xǐhuan dǎ lánqiú.",
        "vi": "Anh ấy rất thích chơi bóng rổ.",
        "tag": "Sở thích thể thao"
      }
    ]
  },
  {
    "id": "6-12",
    "hanzi": "公斤",
    "traditional": "公斤",
    "pinyin": "gōngjīn",
    "pinyinClean": "gongjin",
    "hanViet": "CÔNG CÂN",
    "radical": "八",
    "strokeCount": 6,
    "hskLevel": 2,
    "lesson": 6,
    "partOfSpeech": "lượng.",
    "viet": "kg, kí lô",
    "vi_meaning_full": "kilôgam",
    "vi_meaning_short": "kg, kí lô",
    "enMeaning": "kilogram",
    "image": "https://images.pexels.com/photos/39525500/pexels-photo-39525500.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "一公斤",
      "七十公斤"
    ],
    "compounds": [
      "公斤",
      "公里",
      "斤"
    ],
    "synonyms": [
      "千克"
    ],
    "antonyms": [],
    "confusableWords": "公里",
    "sentences": [
      {
        "zh": "我现在七十公斤了。",
        "pinyin": "Wǒ xiànzài qīshí gōngjīn le.",
        "vi": "Bây giờ tôi đã 70 kg rồi.",
        "tag": "Cân nặng"
      },
      {
        "zh": "买一公斤苹果。",
        "pinyin": "Mǎi yì gōngjīn píngguǒ.",
        "vi": "Mua một kg táo.",
        "tag": "Mua sắm"
      }
    ]
  },
  {
    "id": "hsk1-6-6",
    "hanzi": "好吃",
    "traditional": "好吃",
    "pinyin": "hǎochī",
    "pinyinClean": "haochi",
    "hanViet": "HẢO CẬT",
    "radical": "食",
    "strokeCount": 15,
    "hskLevel": 2,
    "lesson": 6,
    "partOfSpeech": "tt.",
    "viet": "ngon (món ăn)",
    "vi_meaning_full": "ngon",
    "vi_meaning_short": "ngon (món ăn)",
    "enMeaning": "delicious, tasty",
    "image": "https://images.pexels.com/photos/24532332/pexels-photo-24532332.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "很好吃",
      "好吃的菜"
    ],
    "compounds": [
      "好听",
      "好看"
    ],
    "synonyms": [
      "美味"
    ],
    "antonyms": [
      "难吃"
    ],
    "confusableWords": "喝",
    "sentences": [
      {
        "zh": "今天的羊肉很好吃，你怎么不吃了？",
        "pinyin": "Jīntiān de yángròu hěn hǎochī, nǐ zěnme bù chī le?",
        "vi": "Thịt cừu hôm nay rất ngon, sao anh không ăn nữa?",
        "tag": "Hỏi han bữa ăn"
      },
      {
        "zh": "就做你爱吃的鱼吧，好吃的很。",
        "pinyin": "Jiù zuò nǐ ài chī de yú ba, hǎochī de hěn.",
        "vi": "Thì làm món cá anh thích đi, ngon lắm.",
        "tag": "Gợi ý món ăn"
      }
    ]
  },
  {
    "id": "hsk2-6-180",
    "hanzi": "鸡蛋面",
    "traditional": "雞蛋麵",
    "pinyin": "jīdànmiàn",
    "pinyinClean": "jidanmian",
    "hanViet": "KÊ ĐẢN DIỆN",
    "radical": "隹",
    "strokeCount": 28,
    "hskLevel": 2,
    "lesson": 6,
    "partOfSpeech": "dt.",
    "viet": "tô mì trứng",
    "vi_meaning_full": "mì trứng",
    "vi_meaning_short": "tô mì trứng",
    "enMeaning": "egg noodles",
    "image": "https://images.pexels.com/photos/5907999/pexels-photo-5907999.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "吃鸡蛋面"
    ],
    "compounds": [
      "鸡蛋",
      "面条"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "牛肉面",
    "sentences": [
      {
        "zh": "服务员，来一碗热鸡蛋面。",
        "pinyin": "Fúwùyuán, lái yì wǎn rè jīdànmiàn.",
        "vi": "Phục vụ ơi cho một bát mì trứng nóng.",
        "tag": "Gọi món"
      },
      {
        "zh": "早上吃一碗鸡蛋面营养又好吃。",
        "pinyin": "Zǎoshang chī yì wǎn jīdànmiàn yíngyǎng yòu hǎochī.",
        "vi": "Buổi sáng ăn một bát mì trứng vừa bổ vừa ngon.",
        "tag": "Ẩm thực"
      }
    ]
  },
  {
    "id": "hsk2-6-181",
    "hanzi": "鸡肉",
    "traditional": "雞肉",
    "pinyin": "jīròu",
    "pinyinClean": "jirou",
    "hanViet": "KÊ NHỤC",
    "radical": "隹",
    "strokeCount": 15,
    "hskLevel": 2,
    "lesson": 6,
    "partOfSpeech": "dt.",
    "viet": "thịt gà",
    "vi_meaning_full": "thịt gà",
    "vi_meaning_short": "thịt gà",
    "enMeaning": "chicken meat",
    "image": "https://images.pexels.com/photos/36850060/pexels-photo-36850060.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "吃鸡肉",
      "炒鸡肉"
    ],
    "compounds": [
      "鸡蛋",
      "羊肉",
      "牛肉"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "猪肉",
    "sentences": [
      {
        "zh": "我不喜欢吃羊肉，我喜欢吃鸡肉。",
        "pinyin": "Wǒ bù xǐhuan chī yángròu, wǒ xǐhuan chī jīròu.",
        "vi": "Tôi không thích ăn thịt cừu, tôi thích ăn thịt gà.",
        "tag": "Khẩu vị"
      },
      {
        "zh": "今天的鸡肉做得很香。",
        "pinyin": "Jīntiān de jīròu zuò de hěn xiāng.",
        "vi": "Thịt gà hôm nay làm rất thơm.",
        "tag": "Khen món ăn"
      }
    ]
  },
  {
    "id": "6-13",
    "hanzi": "姐姐",
    "traditional": "姐姐",
    "pinyin": "jiějie",
    "pinyinClean": "jiejie",
    "hanViet": "TỶ TỶ",
    "radical": "女",
    "strokeCount": 16,
    "hskLevel": 2,
    "lesson": 6,
    "partOfSpeech": "dt.",
    "viet": "chị gái",
    "vi_meaning_full": "chị gái",
    "vi_meaning_short": "chị gái",
    "enMeaning": "older sister",
    "image": "https://images.pexels.com/photos/590472/pexels-photo-590472.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "我姐姐",
      "姐妹"
    ],
    "compounds": [
      "姐妹",
      "姐夫"
    ],
    "synonyms": [
      "姊"
    ],
    "antonyms": [
      "妹妹"
    ],
    "confusableWords": "借借",
    "sentences": [
      {
        "zh": "听说他是去看他姐姐。",
        "pinyin": "Tīngshuō tā shì qù kàn tā jiějie.",
        "vi": "Nghe nói là đi thăm chị của anh ấy.",
        "tag": "Tin tức người thân"
      },
      {
        "zh": "我姐姐比我大三岁。",
        "pinyin": "Wǒ jiějie bǐ wǒ dà sān suì.",
        "vi": "Chị gái tôi lớn hơn tôi 3 tuổi.",
        "tag": "Giới thiệu độ tuổi"
      }
    ]
  },
  {
    "id": "6-11",
    "hanzi": "经常",
    "traditional": "經常",
    "pinyin": "jīngcháng",
    "pinyinClean": "jingchang",
    "hanViet": "KINH THƯỜNG",
    "radical": "纟",
    "strokeCount": 17,
    "hskLevel": 2,
    "lesson": 6,
    "partOfSpeech": "phó.",
    "viet": "thường xuyên, luôn",
    "vi_meaning_full": "thường xuyên",
    "vi_meaning_short": "thường xuyên, luôn",
    "enMeaning": "often, frequently",
    "image": "https://images.pexels.com/photos/5357453/pexels-photo-5357453.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "经常去",
      "经常游泳"
    ],
    "compounds": [
      "经常",
      "经过",
      "常常"
    ],
    "synonyms": [
      "常常",
      "总是"
    ],
    "antonyms": [
      "偶尔"
    ],
    "confusableWords": "非常",
    "sentences": [
      {
        "zh": "你经常游泳吗？",
        "pinyin": "Nǐ jīngcháng yóuyǒng ma?",
        "vi": "Bạn có thường xuyên đi bơi không?",
        "tag": "Hỏi thói quen"
      },
      {
        "zh": "他经常帮助别人。",
        "pinyin": "Tā jīngcháng bāngzhù biérén.",
        "vi": "Anh ấy thường xuyên giúp đỡ người khác.",
        "tag": "Khen ngợi nếp sống"
      }
    ]
  },
  {
    "id": "hsk2-6-183",
    "hanzi": "咖啡馆儿",
    "traditional": "咖啡館兒",
    "pinyin": "kāfēiguǎnr",
    "pinyinClean": "kafeiguanr",
    "hanViet": "CÀ PHÊ QUÁN",
    "radical": "口",
    "strokeCount": 25,
    "hskLevel": 2,
    "lesson": 6,
    "partOfSpeech": "dt.",
    "viet": "quán cà phê",
    "vi_meaning_full": "quán cà phê",
    "vi_meaning_short": "quán cà phê",
    "enMeaning": "coffee shop, cafe",
    "image": "https://pixabay.com/get/gfadba38bd377e8db4ecce15a8e9df41a0226cacf59b1f806cfca8f5242cf26b421030d807fb85a04893e5f5f10746035bfdfd54d799ae056ea1dfb87e4fc7fd5_640.jpg",
    "collocations": [
      "去咖啡馆儿"
    ],
    "compounds": [
      "咖啡",
      "宾馆"
    ],
    "synonyms": [
      "咖啡厅"
    ],
    "antonyms": [],
    "confusableWords": "茶馆",
    "sentences": [
      {
        "zh": "我们在咖啡馆儿门口见面吧。",
        "pinyin": "Wǒmen zài kāfēiguǎnr ménkǒu jiànmiàn ba.",
        "vi": "Chúng mình gặp nhau ở cửa quán cà phê nhé.",
        "tag": "Hẹn gặp"
      },
      {
        "zh": "这家咖啡馆儿的环境非常好。",
        "pinyin": "Zhè jiā kāfēiguǎnr de huánjìng fēicháng hǎo.",
        "vi": "Không gian quán cà phê này rất tuyệt.",
        "tag": "Đánh giá địa điểm"
      }
    ]
  },
  {
    "id": "6-1",
    "hanzi": "门",
    "traditional": "門",
    "pinyin": "mén",
    "pinyinClean": "men",
    "hanViet": "MÔN",
    "radical": "门",
    "strokeCount": 3,
    "hskLevel": 2,
    "lesson": 6,
    "partOfSpeech": "dt.",
    "viet": "cánh cửa, cổng",
    "vi_meaning_full": "cửa, cổng",
    "vi_meaning_short": "cánh cửa, cổng",
    "enMeaning": "door, gate",
    "image": "https://images.pexels.com/photos/28908752/pexels-photo-28908752.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "开门",
      "关门",
      "门口"
    ],
    "compounds": [
      "门口",
      "门关",
      "门票"
    ],
    "synonyms": [
      "门口"
    ],
    "antonyms": [],
    "confusableWords": "们",
    "sentences": [
      {
        "zh": "我在门外看见他的自行车了。",
        "pinyin": "Wǒ zài mén wài kànjiàn tā de zìxíngchē le.",
        "vi": "Tôi thấy xe đạp của anh ấy ở ngoài cửa rồi.",
        "tag": "Giao tiếp quan sát"
      },
      {
        "zh": "服务员，我房间的门打不开了。",
        "pinyin": "Fúwùyuán, wǒ fángjiān de mén dǎ bù kāi le.",
        "vi": "Phục vụ ơi, cửa phòng tôi không mở được rồi.",
        "tag": "Cần giúp đỡ"
      }
    ]
  },
  {
    "id": "hsk2-6-185",
    "hanzi": "面馆儿",
    "traditional": "麵館兒",
    "pinyin": "miànguǎnr",
    "pinyinClean": "mianguanr",
    "hanViet": "DIỆN QUÁN",
    "radical": "面",
    "strokeCount": 25,
    "hskLevel": 2,
    "lesson": 6,
    "partOfSpeech": "dt.",
    "viet": "quán mì, tiệm mì",
    "vi_meaning_full": "quán mì",
    "vi_meaning_short": "quán mì, tiệm mì",
    "enMeaning": "noodle shop",
    "image": "https://images.pexels.com/photos/36002731/pexels-photo-36002731.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "去面馆儿吃面"
    ],
    "compounds": [
      "面条",
      "饭馆"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "饭馆",
    "sentences": [
      {
        "zh": "这家面馆儿的面条做得很地道。",
        "pinyin": "Zhè jiā miànguǎnr de miàntiáo zuò de hěn dìdao.",
        "vi": "Mì ở quán mì này làm rất chuẩn vị.",
        "tag": "Khen ẩm thực"
      },
      {
        "zh": "我们去学校旁边的面馆儿吧。",
        "pinyin": "Wǒmen qù xuéxiào pángbiān de miànguǎnr ba.",
        "vi": "Chúng mình ra quán mì bên cạnh trường đi.",
        "tag": "Rủ đi ăn"
      }
    ]
  },
  {
    "id": "6-6",
    "hanzi": "面条",
    "traditional": "面條",
    "pinyin": "miàntiáo",
    "pinyinClean": "miantiao",
    "hanViet": "DIỆN ĐIỀU",
    "radical": "面",
    "strokeCount": 16,
    "hskLevel": 2,
    "lesson": 6,
    "partOfSpeech": "dt.",
    "viet": "mì, tô mì",
    "vi_meaning_full": "mì sợi",
    "vi_meaning_short": "mì, tô mì",
    "enMeaning": "noodles",
    "image": "https://images.pexels.com/photos/8992932/pexels-photo-8992932.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "吃面条",
      "一碗面条"
    ],
    "compounds": [
      "鸡蛋面",
      "面馆"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "面包",
    "sentences": [
      {
        "zh": "来一点儿面条吧。",
        "pinyin": "Lái yìdiǎnr miàntiáo ba.",
        "vi": "Cho tôi một ít mì sợi đi.",
        "tag": "Gọi món"
      },
      {
        "zh": "我不喜欢吃米饭，我喜欢吃面条。",
        "pinyin": "Wǒ bù xǐhuan chī mǐfàn, wǒ xǐhuan chī miàntiáo.",
        "vi": "Tôi không thích ăn cơm, tôi thích ăn mì.",
        "tag": "Khẩu vị"
      }
    ]
  },
  {
    "id": "hsk2-6-188",
    "hanzi": "奶茶",
    "traditional": "奶茶",
    "pinyin": "nǎichá",
    "pinyinClean": "naicha",
    "hanViet": "NÃI TRÀ",
    "radical": "女",
    "strokeCount": 12,
    "hskLevel": 2,
    "lesson": 6,
    "partOfSpeech": "dt.",
    "viet": "trà sữa",
    "vi_meaning_full": "trà sữa",
    "vi_meaning_short": "trà sữa",
    "enMeaning": "milk tea",
    "image": "https://images.pexels.com/photos/28915280/pexels-photo-28915280.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "喝奶茶",
      "一杯奶茶"
    ],
    "compounds": [
      "牛奶",
      "茶叶"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "咖啡",
    "sentences": [
      {
        "zh": "下午我们一起去喝奶茶吧。",
        "pinyin": "Xiàwǔ wǒmen yìqǐ qù hē nǎichá ba.",
        "vi": "Buổi chiều chúng mình cùng đi uống trà sữa đi.",
        "tag": "Rủ rê ăn uống"
      },
      {
        "zh": "很多年轻人都喜欢喝奶茶。",
        "pinyin": "Hěn duō niánqīng rén dōu xǐhuan hē nǎichá.",
        "vi": "Rất nhiều người trẻ thích uống trà sữa.",
        "tag": "Thói quen giới trẻ"
      }
    ]
  },
  {
    "id": "6-9",
    "hanzi": "所以",
    "traditional": "所以",
    "pinyin": "suǒyǐ",
    "pinyinClean": "suoyi",
    "hanViet": "SỞ DĨ",
    "radical": "户",
    "strokeCount": 13,
    "hskLevel": 2,
    "lesson": 6,
    "partOfSpeech": "liên.",
    "viet": "cho nên, vì vậy",
    "vi_meaning_full": "cho nên",
    "vi_meaning_short": "cho nên, vì vậy",
    "enMeaning": "so, therefore",
    "image": "https://images.pexels.com/photos/20943579/pexels-photo-20943579.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "因为...所以..."
    ],
    "compounds": [
      "所有",
      "所以"
    ],
    "synonyms": [
      "因此"
    ],
    "antonyms": [],
    "confusableWords": "所有",
    "sentences": [
      {
        "zh": "因为昨天下雨，所以我们都没去。",
        "pinyin": "Yīnwèi zuótiān xià yǔ, suǒyǐ wǒmen dōu méi qù.",
        "vi": "Vì hôm qua trời mưa nên chúng tôi đều không đi.",
        "tag": "Giải thích kết quả"
      },
      {
        "zh": "他病了，所以今天没来上课。",
        "pinyin": "Tā bìng le, suǒyǐ jīntiān méi lái shàngkè.",
        "vi": "Anh ấy bị ốm nên hôm nay không đến lớp.",
        "tag": "Báo lý do nghỉ"
      }
    ]
  },
  {
    "id": "6-2",
    "hanzi": "外",
    "traditional": "外",
    "pinyin": "wài",
    "pinyinClean": "wai",
    "hanViet": "NGOẠI",
    "radical": "夕",
    "strokeCount": 5,
    "hskLevel": 2,
    "lesson": 6,
    "partOfSpeech": "dt.",
    "viet": "bên ngoài, phía ngoài",
    "vi_meaning_full": "bên ngoài",
    "vi_meaning_short": "bên ngoài, phía ngoài",
    "enMeaning": "outside, foreign",
    "image": "https://images.pexels.com/photos/5982830/pexels-photo-5982830.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "外面",
      "门外",
      "外语"
    ],
    "compounds": [
      "外面",
      "外国",
      "额外"
    ],
    "synonyms": [
      "外头"
    ],
    "antonyms": [
      "内",
      "中"
    ],
    "confusableWords": "处",
    "sentences": [
      {
        "zh": "我在门外看见他的自行车了。",
        "pinyin": "Wǒ zài mén wài kànjiàn tā de zìxíngchē le.",
        "vi": "Tôi nhìn thấy xe đạp của anh ấy ở ngoài cửa rồi.",
        "tag": "Thông báo vị trí"
      },
      {
        "zh": "外面下雨了，别出去了。",
        "pinyin": "Wàimian xià yǔ le, bié chūqù le.",
        "vi": "Bên ngoài mưa rồi, đừng ra ngoài nữa.",
        "tag": "Lời khuyên"
      }
    ]
  },
  {
    "id": "6-4",
    "hanzi": "羊肉",
    "traditional": "羊肉",
    "pinyin": "yángròu",
    "pinyinClean": "yangrou",
    "hanViet": "DƯƠNG NHỤC",
    "radical": "羊",
    "strokeCount": 12,
    "hskLevel": 2,
    "lesson": 6,
    "partOfSpeech": "dt.",
    "viet": "thịt cừu, thịt dê",
    "vi_meaning_full": "thịt cừu/dê",
    "vi_meaning_short": "thịt cừu, thịt dê",
    "enMeaning": "mutton, lamb",
    "image": "https://images.pexels.com/photos/13304044/pexels-photo-13304044.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "吃羊肉",
      "烤羊肉"
    ],
    "compounds": [
      "羊毛",
      "牛肉",
      "猪肉"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "洋",
    "sentences": [
      {
        "zh": "今天的羊肉很好吃，你怎么不吃了？",
        "pinyin": "Jīntiān de yángròu hěn hǎochī, nǐ zěnme bù chī le?",
        "vi": "Thịt cừu hôm nay rất ngon, sao anh không ăn nữa?",
        "tag": "Hỏi han bữa ăn"
      },
      {
        "zh": "这个星期天天都吃羊肉，不想吃了。",
        "pinyin": "Zhège xīngqī tiāntiān dōu chī yángròu, bù xiǎng chī le.",
        "vi": "Tháng này ngày nào cũng ăn thịt cừu, ngán không muốn ăn nữa.",
        "tag": "Giải thích khẩu vị"
      }
    ]
  },
  {
    "id": "6-8",
    "hanzi": "因为",
    "traditional": "因為",
    "pinyin": "yīnwèi",
    "pinyinClean": "yinwei",
    "hanViet": "NHÂN VI",
    "radical": "囗",
    "strokeCount": 10,
    "hskLevel": 2,
    "lesson": 6,
    "partOfSpeech": "liên.",
    "viet": "vì, bởi vì",
    "vi_meaning_full": "bởi vì",
    "vi_meaning_short": "vì, bởi vì",
    "enMeaning": "because, because of",
    "image": "https://images.pexels.com/photos/9789216/pexels-photo-9789216.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "因为...所以..."
    ],
    "compounds": [
      "原因",
      "因素"
    ],
    "synonyms": [
      "由于"
    ],
    "antonyms": [],
    "confusableWords": "因此",
    "sentences": [
      {
        "zh": "因为昨天下雨，所以我们都没去。",
        "pinyin": "Yīnwèi zuótiān xià yǔ, suǒyǐ wǒmen dōu méi qù.",
        "vi": "Bởi vì hôm qua trời mưa nên chúng tôi đều không đi.",
        "tag": "Giải thích nguyên nhân"
      },
      {
        "zh": "因为工作忙，他没时间旅游。",
        "pinyin": "Yīnwèi gōngzuò máng, tā méi shíjiān lǚyóu.",
        "vi": "Vì công việc bận rộn nên anh ấy không có thời gian đi du lịch.",
        "tag": "Trình bày hoàn cảnh"
      }
    ]
  },
  {
    "id": "6-10",
    "hanzi": "游泳",
    "traditional": "游泳",
    "pinyin": "yóu yǒng",
    "pinyinClean": "youyong",
    "hanViet": "DU VỊNH",
    "radical": "氵",
    "strokeCount": 24,
    "hskLevel": 2,
    "lesson": 6,
    "partOfSpeech": "đgt.",
    "viet": "bơi, bơi lội",
    "vi_meaning_full": "bơi",
    "vi_meaning_short": "bơi, bơi lội",
    "enMeaning": "to swim",
    "image": "https://images.pexels.com/photos/13342399/pexels-photo-13342399.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "去游泳",
      "喜欢游泳"
    ],
    "compounds": [
      "游泳馆",
      "游泳池"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "游玩",
    "sentences": [
      {
        "zh": "你经常游泳吗？这个月我天天游泳。",
        "pinyin": "Nǐ jīngcháng yóuyǒng ma? Zhège yuè wǒ tiāntiān yóuyǒng.",
        "vi": "Chị có hay đi bơi không? Tháng này ngày nào tôi cũng đi bơi.",
        "tag": "Hỏi thói quen"
      },
      {
        "zh": "夏天在游泳池游泳很舒服。",
        "pinyin": "Xiàtiān zài yóuyǒngchí yóuyǒng hěn shūfu.",
        "vi": "Mùa hè bơi ở hồ bơi rất dễ chịu.",
        "tag": "Tận hưởng"
      }
    ]
  },
  {
    "id": "6-3",
    "hanzi": "自行车",
    "traditional": "自行車",
    "pinyin": "zìxíngchē",
    "pinyinClean": "zixingche",
    "hanViet": "TỰ HÀNH XA",
    "radical": "自",
    "strokeCount": 19,
    "hskLevel": 2,
    "lesson": 6,
    "partOfSpeech": "dt.",
    "viet": "xe đạp",
    "vi_meaning_full": "xe đạp",
    "vi_meaning_short": "xe đạp",
    "enMeaning": "bicycle, bike",
    "image": "https://images.pexels.com/photos/9558021/pexels-photo-9558021.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "骑自行车",
      "我的自行车"
    ],
    "compounds": [
      "自动",
      "行为",
      "汽车"
    ],
    "synonyms": [
      "脚踏车"
    ],
    "antonyms": [],
    "confusableWords": "汽车",
    "sentences": [
      {
        "zh": "我在门外看见他的自行车了。",
        "pinyin": "Wǒ zài mén wài kànjiàn tā de zìxíngchē le.",
        "vi": "Tôi nhìn thấy xe đạp của anh ấy ở ngoài cửa rồi.",
        "tag": "Thông báo quan sát"
      },
      {
        "zh": "骑自行车去学校要二十分钟。",
        "pinyin": "Qí zìxíngchē qù xuéxiào yào èrshí fēnzhōng.",
        "vi": "Đi xe đạp đến trường mất 20 phút.",
        "tag": "Phương tiện đi lại"
      }
    ]
  },
  {
    "id": "7-13",
    "hanzi": "到",
    "traditional": "到",
    "pinyin": "dào",
    "pinyinClean": "dao",
    "hanViet": "ĐÁO",
    "radical": "刀",
    "strokeCount": 8,
    "hskLevel": 2,
    "lesson": 7,
    "partOfSpeech": "đgt.",
    "viet": "đến, tới nơi",
    "vi_meaning_full": "đến, tới",
    "vi_meaning_short": "đến, tới nơi",
    "enMeaning": "to arrive, reach",
    "image": "https://images.pexels.com/photos/8569749/pexels-photo-8569749.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "到了",
      "走到",
      "做到"
    ],
    "compounds": [
      "到达",
      "倒",
      "到底"
    ],
    "synonyms": [
      "到达"
    ],
    "antonyms": [
      "离"
    ],
    "confusableWords": "倒",
    "sentences": [
      {
        "zh": "我下飞机了，二十分钟就到。",
        "pinyin": "Wǒ xià fēijī le, èrshí fēnzhōng jiù dào.",
        "vi": "Tôi xuống máy bay rồi, 20 phút nữa sẽ tới.",
        "tag": "Thông báo hành trình"
      },
      {
        "zh": "从这儿走到公司要半个小时。",
        "pinyin": "Cóng zhèr zǒu dào gōngsī yào bàn gè xiǎoshí.",
        "vi": "Từ đây đi bộ đến công ty mất nửa tiếng.",
        "tag": "Nói về khoảng cách"
      }
    ]
  },
  {
    "id": "hsk2-7-178",
    "hanzi": "房子",
    "traditional": "房子",
    "pinyin": "fángzi",
    "pinyinClean": "fangzi",
    "hanViet": "PHÒNG TỬ",
    "radical": "户",
    "strokeCount": 11,
    "hskLevel": 2,
    "lesson": 7,
    "partOfSpeech": "dt.",
    "viet": "ngôi nhà, căn nhà",
    "vi_meaning_full": "nhà cửa",
    "vi_meaning_short": "ngôi nhà, căn nhà",
    "enMeaning": "house, building",
    "image": "https://images.pexels.com/photos/7746940/pexels-photo-7746940.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "买房子",
      "租房子"
    ],
    "compounds": [
      "房间",
      "房东"
    ],
    "synonyms": [
      "房屋",
      "住宅"
    ],
    "antonyms": [],
    "confusableWords": "房间",
    "sentences": [
      {
        "zh": "他们家新买了一套房子。",
        "pinyin": "Tāmen jiā xīn mǎi le yí tào fángzi.",
        "vi": "Gia đình họ mới mua một căn nhà mới.",
        "tag": "Gia đình"
      },
      {
        "zh": "这套房子离公司很近。",
        "pinyin": "Zhè tào fángzi lí gōngsī hěn jìn.",
        "vi": "Căn nhà này ở rất gần công ty.",
        "tag": "Vị trí địa lý"
      }
    ]
  },
  {
    "id": "7-7",
    "hanzi": "公共汽车",
    "traditional": "公共汽車",
    "pinyin": "gōnggòng qìchē",
    "pinyinClean": "gonggongqiche",
    "hanViet": "CÔNG CỘNG KHÍ XA",
    "radical": "八",
    "strokeCount": 22,
    "hskLevel": 2,
    "lesson": 7,
    "partOfSpeech": "dt.",
    "viet": "xe buýt, xe công cộng",
    "vi_meaning_full": "xe buýt",
    "vi_meaning_short": "xe buýt, xe công cộng",
    "enMeaning": "bus",
    "image": "https://images.pexels.com/photos/3829175/pexels-photo-3829175.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "坐公共汽车",
      "公共汽车站"
    ],
    "compounds": [
      "公共",
      "汽车",
      "出租车"
    ],
    "synonyms": [
      "公交车",
      "巴士"
    ],
    "antonyms": [],
    "confusableWords": "火车",
    "sentences": [
      {
        "zh": "坐公共汽车太慢了，你怎么不开车？",
        "pinyin": "Zuò gōnggòng qìchē tài màn le, nǐ zěnme bù kāichē?",
        "vi": "Đi xe buýt chậm quá, sao anh không lái xe?",
        "tag": "Hỏi lý do di chuyển"
      },
      {
        "zh": "没关系，我坐公共汽车去。",
        "pinyin": "Méi guānxi, wǒ zuò gōnggòng qìchē qù.",
        "vi": "Không sao đâu, tôi đi xe buýt.",
        "tag": "Phương tiện đi lại"
      }
    ]
  },
  {
    "id": "7-5",
    "hanzi": "公司",
    "traditional": "公司",
    "pinyin": "gōngsī",
    "pinyinClean": "gongsi",
    "hanViet": "CÔNG TY",
    "radical": "口",
    "strokeCount": 9,
    "hskLevel": 2,
    "lesson": 7,
    "partOfSpeech": "dt.",
    "viet": "công ty, doanh nghiệp",
    "vi_meaning_full": "công ty",
    "vi_meaning_short": "công ty, doanh nghiệp",
    "enMeaning": "company, corporation",
    "image": "https://images.pexels.com/photos/8825138/pexels-photo-8825138.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "去公司",
      "在公司工作",
      "我们公司"
    ],
    "compounds": [
      "经理",
      "员工",
      "分公司"
    ],
    "synonyms": [
      "企业"
    ],
    "antonyms": [],
    "confusableWords": "公园",
    "sentences": [
      {
        "zh": "你家离公司远吗？",
        "pinyin": "Nǐ jiā lí gōngsī yuǎn ma?",
        "vi": "Nhà chị có ở xa công ty không?",
        "tag": "Hỏi khoảng cách"
      },
      {
        "zh": "希望我们的公司明年更好！",
        "pinyin": "Xīwàng wǒmen de gōngsī míngnián gèng hǎo!",
        "vi": "Hy vọng năm sau công ty chúng ta phát triển hơn!",
        "tag": "Lời chúc"
      }
    ]
  },
  {
    "id": "7-11",
    "hanzi": "过",
    "traditional": "過",
    "pinyin": "guò",
    "pinyinClean": "guo",
    "hanViet": "QUÁ",
    "radical": "辶",
    "strokeCount": 6,
    "hskLevel": 2,
    "lesson": 7,
    "partOfSpeech": "đgt.",
    "viet": "đón (Tết, sinh nhật), đi qua",
    "vi_meaning_full": "ăn (mừng), trải qua; đã từng",
    "vi_meaning_short": "đón (Tết, sinh nhật), đi qua",
    "enMeaning": "to pass, spend (time), celebrate",
    "image": "https://images.pexels.com/photos/34144383/pexels-photo-34144383.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "过生日",
      "去过"
    ],
    "compounds": [
      "过去",
      "过年",
      "过程"
    ],
    "synonyms": [
      "度过"
    ],
    "antonyms": [],
    "confusableWords": "过 (guō)",
    "sentences": [
      {
        "zh": "下个星期我要去北京，今天过吧。",
        "pinyin": "Xià gè xīngqī wǒ yào qù Běijīng, jīntiān guò ba.",
        "vi": "Tuần sau mình phải đi Bắc Kinh rồi, hôm nay ăn mừng sinh nhật luôn nhé.",
        "tag": "Đón sinh nhật sớm"
      },
      {
        "zh": "去过一次北京。",
        "pinyin": "Qùguò yí cì Běijīng.",
        "vi": "Đã từng đi Bắc Kinh một lần.",
        "tag": "Trải nghiệm"
      }
    ]
  },
  {
    "id": "7-2",
    "hanzi": "机场",
    "traditional": "機場",
    "pinyin": "jīchǎng",
    "pinyinClean": "jichang",
    "hanViet": "CƠ TRƯỜNG",
    "radical": "木",
    "strokeCount": 12,
    "hskLevel": 2,
    "lesson": 7,
    "partOfSpeech": "dt.",
    "viet": "sân bay",
    "vi_meaning_full": "sân bay",
    "vi_meaning_short": "sân bay",
    "enMeaning": "airport",
    "image": "https://images.pexels.com/photos/12944276/pexels-photo-12944276.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "去机场",
      "机场接人"
    ],
    "compounds": [
      "飞机",
      "机场",
      "场馆"
    ],
    "synonyms": [
      "飞机场"
    ],
    "antonyms": [],
    "confusableWords": "鸡场",
    "sentences": [
      {
        "zh": "在去机场的路上。你已经到了吗？",
        "pinyin": "Zài qù jīchǎng de lùshang. Nǐ yǐjīng dào le ma?",
        "vi": "Đang trên đường ra sân bay. Em đã đến chưa?",
        "tag": "Giao tiếp lộ trình"
      },
      {
        "zh": "我到机场去接朋友。",
        "pinyin": "Wǒ dào jīchǎng qù jiē péngyou.",
        "vi": "Tôi ra sân bay đón bạn.",
        "tag": "Đón người thân"
      }
    ]
  },
  {
    "id": "7-1",
    "hanzi": "教室",
    "traditional": "教室",
    "pinyin": "jiàoshì",
    "pinyinClean": "jiaoshi",
    "hanViet": "GIÁO THẤT",
    "radical": "攵",
    "strokeCount": 20,
    "hskLevel": 2,
    "lesson": 7,
    "partOfSpeech": "dt.",
    "viet": "phòng học, lớp học",
    "vi_meaning_full": "lớp học",
    "vi_meaning_short": "phòng học, lớp học",
    "enMeaning": "classroom",
    "image": "https://images.pexels.com/photos/6602623/pexels-photo-6602623.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "在教室",
      "教室里"
    ],
    "compounds": [
      "教师",
      "室外",
      "实验室"
    ],
    "synonyms": [
      "课室"
    ],
    "antonyms": [],
    "confusableWords": "教堂",
    "sentences": [
      {
        "zh": "他还在教室学习呢。",
        "pinyin": "Tā hái zài jiàoshì xuéxí ne.",
        "vi": "Anh ấy vẫn đang học trong lớp đấy.",
        "tag": "Thông báo hoạt động"
      },
      {
        "zh": "请大家回教室上课。",
        "pinyin": "Qǐng dàjiā huí jiàoshì shàngkè.",
        "vi": "Mời mọi người quay về phòng học lên lớp.",
        "tag": "Mệnh lệnh trường học"
      }
    ]
  },
  {
    "id": "7-10",
    "hanzi": "快",
    "traditional": "快",
    "pinyin": "kuài",
    "pinyinClean": "kuai",
    "hanViet": "KHOÁI",
    "radical": "心",
    "strokeCount": 7,
    "hskLevel": 2,
    "lesson": 7,
    "partOfSpeech": "tt.",
    "viet": "nhanh, mau chóng",
    "vi_meaning_full": "nhanh; sắp",
    "vi_meaning_short": "nhanh, mau chóng",
    "enMeaning": "fast, quick; soon",
    "image": "https://images.pexels.com/photos/19661440/pexels-photo-19661440.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "快走",
      "快乐",
      "快要"
    ],
    "compounds": [
      "快乐",
      "快捷",
      "筷子"
    ],
    "synonyms": [
      "迅速"
    ],
    "antonyms": [
      "慢"
    ],
    "confusableWords": "块",
    "sentences": [
      {
        "zh": "开车也不快，路上车太多了！",
        "pinyin": "Kāichē yě bú kuài, lùshang chē tài duō le!",
        "vi": "Lái xe cũng chẳng nhanh được, trên đường quá nhiều xe!",
        "tag": "Phàn nàn kẹt xe"
      },
      {
        "zh": "快要下雨了，你路上慢点儿。",
        "pinyin": "Kuàiyào xià yǔ le, nǐ lùshang màn diǎnr.",
        "vi": "Trời sắp mưa rồi, đi đường chậm chút nhé.",
        "tag": "Nhắc nhở đi lại"
      }
    ]
  },
  {
    "id": "7-4",
    "hanzi": "离",
    "traditional": "離",
    "pinyin": "lí",
    "pinyinClean": "li",
    "hanViet": "LY",
    "radical": "隹",
    "strokeCount": 11,
    "hskLevel": 2,
    "lesson": 7,
    "partOfSpeech": "đgt.",
    "viet": "cách (khoảng cách, thời gian)",
    "vi_meaning_full": "cách",
    "vi_meaning_short": "cách (khoảng cách, thời gian)",
    "enMeaning": "away from, distance from",
    "image": "https://images.pexels.com/photos/30918254/pexels-photo-30918254.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "离这儿",
      "离公司"
    ],
    "compounds": [
      "离开",
      "隔离",
      "距离"
    ],
    "synonyms": [
      "距"
    ],
    "antonyms": [
      "近"
    ],
    "confusableWords": "篱",
    "sentences": [
      {
        "zh": "你家离公司远吗？",
        "pinyin": "Nǐ jiā lí gōngsī yuǎn ma?",
        "vi": "Nhà chị có ở xa công ty không?",
        "tag": "Hỏi khoảng cách"
      },
      {
        "zh": "离我的生日还有一个多星期呢！",
        "pinyin": "Lí wǒ de shēngrì hái yǒu yí gè duō xīngqī ne!",
        "vi": "Còn hơn một tuần nữa mới tới sinh nhật tôi mà!",
        "tag": "Đếm thời gian"
      }
    ]
  },
  {
    "id": "7-3",
    "hanzi": "路",
    "traditional": "路",
    "pinyin": "lù",
    "pinyinClean": "lu",
    "hanViet": "LỘ",
    "radical": "足",
    "strokeCount": 13,
    "hskLevel": 2,
    "lesson": 7,
    "partOfSpeech": "dt.",
    "viet": "đường đi, tuyến đường",
    "vi_meaning_full": "đường, lối đi",
    "vi_meaning_short": "đường đi, tuyến đường",
    "enMeaning": "road, path, route",
    "image": "https://images.pexels.com/photos/29127803/pexels-photo-29127803.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "路上",
      "马路",
      "路线"
    ],
    "compounds": [
      "路口",
      "路线",
      "路上"
    ],
    "synonyms": [
      "道路"
    ],
    "antonyms": [],
    "confusableWords": "露, 陆",
    "sentences": [
      {
        "zh": "路上车太多了！",
        "pinyin": "Lùshang chē tài duō le!",
        "vi": "Trên đường xe nhiều quá!",
        "tag": "Phàn nàn giao thông"
      },
      {
        "zh": "你能告诉我怎么走吗？到了前面的路口再往右走。",
        "pinyin": "Nǐ néng gàosu wǒ zěnme zǒu ma? Dào le qiánmiàn de lùkǒu zài wǎng yòu zǒu.",
        "vi": "Anh chỉ đường cho tôi được không? Đến giao lộ phía trước thì rẽ phải.",
        "tag": "Hỏi chỉ đường"
      }
    ]
  },
  {
    "id": "hsk2-7-184",
    "hanzi": "旅馆",
    "traditional": "旅館",
    "pinyin": "lǚguǎn",
    "pinyinClean": "luguan",
    "hanViet": "LỮ QUÁN",
    "radical": "方",
    "strokeCount": 21,
    "hskLevel": 2,
    "lesson": 7,
    "partOfSpeech": "dt.",
    "viet": "nhà nghỉ, nhà khách nhỏ",
    "vi_meaning_full": "nhà khách, khách sạn",
    "vi_meaning_short": "nhà nghỉ, nhà khách nhỏ",
    "enMeaning": "inn, small hotel",
    "image": "https://images.pexels.com/photos/32334284/pexels-photo-32334284.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "住旅馆"
    ],
    "compounds": [
      "旅游",
      "宾馆"
    ],
    "synonyms": [
      "宾馆",
      "酒店"
    ],
    "antonyms": [],
    "confusableWords": "饭馆",
    "sentences": [
      {
        "zh": "我们在车站附近找了一家旅馆。",
        "pinyin": "Wǒmen zài chēzhàn fùjìn zhǎo le yì jiā lǚguǎn.",
        "vi": "Chúng tôi tìm được một nhà nghỉ gần bến xe.",
        "tag": "Tìm chỗ ở"
      },
      {
        "zh": "这家旅馆虽然小，但是很干净。",
        "pinyin": "Zhè jiā lǚguǎn suīrán xiǎo, dànshì hěn gānjìng.",
        "vi": "Nhà nghỉ này tuy nhỏ nhưng rất sạch sẽ.",
        "tag": "Đánh giá phòng"
      }
    ]
  },
  {
    "id": "7-9",
    "hanzi": "慢",
    "traditional": "慢",
    "pinyin": "màn",
    "pinyinClean": "man",
    "hanViet": "MẠN",
    "radical": "心",
    "strokeCount": 14,
    "hskLevel": 2,
    "lesson": 7,
    "partOfSpeech": "tt.",
    "viet": "chậm, từ từ",
    "vi_meaning_full": "chậm",
    "vi_meaning_short": "chậm, từ từ",
    "enMeaning": "slow",
    "image": "https://images.pexels.com/photos/31983798/pexels-photo-31983798.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "慢点儿",
      "太慢了"
    ],
    "compounds": [
      "慢走",
      "慢慢",
      "减慢"
    ],
    "synonyms": [
      "迟缓"
    ],
    "antonyms": [
      "快"
    ],
    "confusableWords": "漫, 馒",
    "sentences": [
      {
        "zh": "坐公共汽车太慢了。",
        "pinyin": "Zuò gōnggòng qìchē tài màn le.",
        "vi": "Đi xe buýt chậm lắm.",
        "tag": "Chê trách phương tiện"
      },
      {
        "zh": "快要下雨了，你路上慢点儿。",
        "pinyin": "Kuàiyào xià yǔ le, nǐ lùshang màn diǎnr.",
        "vi": "Trời sắp mưa rồi, anh đi đường chậm chút nhé.",
        "tag": "Nhắc nhở an toàn"
      }
    ]
  },
  {
    "id": "hsk1-7-2",
    "hanzi": "问",
    "traditional": "問",
    "pinyin": "wèn",
    "pinyinClean": "wen",
    "hanViet": "VẤN",
    "radical": "门",
    "strokeCount": 6,
    "hskLevel": 2,
    "lesson": 7,
    "partOfSpeech": "đgt.",
    "viet": "hỏi, phỏng vấn",
    "vi_meaning_full": "hỏi",
    "vi_meaning_short": "hỏi, phỏng vấn",
    "enMeaning": "to ask",
    "image": "https://images.pexels.com/photos/8618062/pexels-photo-8618062.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "请问",
      "问问题",
      "问好"
    ],
    "compounds": [
      "问题",
      "访问",
      "问候"
    ],
    "synonyms": [
      "询问"
    ],
    "antonyms": [
      "答",
      "回"
    ],
    "confusableWords": "闻",
    "sentences": [
      {
        "zh": "请问，张先生在吗？",
        "pinyin": "Qǐngwèn, Zhāng xiānsheng zài ma?",
        "vi": "Xin hỏi, ông Trương có ở đây không?",
        "tag": "Lịch sự hỏi thăm"
      },
      {
        "zh": "不懂的地方可以问老师。",
        "pinyin": "Bù dǒng de dìfang kěyǐ wèn lǎoshī.",
        "vi": "Chỗ nào không hiểu bạn có thể hỏi thầy cô giáo.",
        "tag": "Lời khuyên học tập"
      }
    ]
  },
  {
    "id": "7-8",
    "hanzi": "小时",
    "traditional": "小時",
    "pinyin": "xiǎoshí",
    "pinyinClean": "xiaoshi",
    "hanViet": "TIỂU THỜI",
    "radical": "小",
    "strokeCount": 7,
    "hskLevel": 2,
    "lesson": 7,
    "partOfSpeech": "dt.",
    "viet": "tiếng, giờ đồng hồ",
    "vi_meaning_full": "giờ (đồng hồ)",
    "vi_meaning_short": "tiếng, giờ đồng hồ",
    "enMeaning": "hour",
    "image": "https://images.pexels.com/photos/35271652/pexels-photo-35271652.png?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "一个小时",
      "半个小时"
    ],
    "compounds": [
      "时间",
      "时光"
    ],
    "synonyms": [
      "钟头"
    ],
    "antonyms": [],
    "confusableWords": "少",
    "sentences": [
      {
        "zh": "坐公共汽车要一个多小时呢！",
        "pinyin": "Zuò gōnggòng qìchē yào yí gè duō xiǎoshí ne!",
        "vi": "Đi xe buýt mất hơn một tiếng đồng hồ cơ đấy!",
        "tag": "Nói về thời lượng di chuyển"
      },
      {
        "zh": "我已经等了半个小时了！",
        "pinyin": "Wǒ yǐjīng děng le bàn gè xiǎoshí le!",
        "vi": "Tôi đã đợi nửa tiếng đồng hồ rồi!",
        "tag": "Phàn nàn chờ đợi"
      }
    ]
  },
  {
    "id": "7-6",
    "hanzi": "远",
    "traditional": "遠",
    "pinyin": "yuǎn",
    "pinyinClean": "yuan",
    "hanViet": "VIỄN",
    "radical": "辶",
    "strokeCount": 7,
    "hskLevel": 2,
    "lesson": 7,
    "partOfSpeech": "tt.",
    "viet": "xa, khoảng cách xa",
    "vi_meaning_full": "xa",
    "vi_meaning_short": "xa, khoảng cách xa",
    "enMeaning": "far, distant",
    "image": "https://images.pexels.com/photos/33805577/pexels-photo-33805577.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "很远",
      "离这儿很远"
    ],
    "compounds": [
      "远方",
      "远大",
      "永远"
    ],
    "synonyms": [
      "遥远"
    ],
    "antonyms": [
      "近"
    ],
    "confusableWords": "运, 园",
    "sentences": [
      {
        "zh": "你家离公司远吗？很远，要坐一个多小时。",
        "pinyin": "Nǐ jiā lí gōngsī yuǎn ma? Hěn yuǎn, yào zuò yí gè duō xiǎoshí.",
        "vi": "Nhà chị có ở xa công ty không? Rất xa, phải đi mất hơn một tiếng.",
        "tag": "Hỏi khoảng cách"
      },
      {
        "zh": "宾馆离这儿不远，走路二十分钟就到。",
        "pinyin": "Bīnguǎn lí zhèr bù yuǎn, zǒulù èrshí fēnzhōng jiù dào.",
        "vi": "Khách sạn không xa đây lắm, đi bộ 20 phút là tới.",
        "tag": "Chỉ đường"
      }
    ]
  },
  {
    "id": "7-12",
    "hanzi": "走",
    "traditional": "走",
    "pinyin": "zǒu",
    "pinyinClean": "zou",
    "hanViet": "TẨU",
    "radical": "走",
    "strokeCount": 7,
    "hskLevel": 2,
    "lesson": 7,
    "partOfSpeech": "đgt.",
    "viet": "đi, di chuyển bằng chân",
    "vi_meaning_full": "đi, đi bộ",
    "vi_meaning_short": "đi, di chuyển bằng chân",
    "enMeaning": "to walk, go, leave",
    "image": "https://images.pexels.com/photos/10399158/pexels-photo-10399158.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "走路",
      "往前走",
      "走吧"
    ],
    "compounds": [
      "走路",
      "走开",
      "走过"
    ],
    "synonyms": [
      "步行"
    ],
    "antonyms": [
      "停"
    ],
    "confusableWords": "揍",
    "sentences": [
      {
        "zh": "从这儿一直往前走。",
        "pinyin": "Cóng zhèr yìzhí wǎng qián zǒu.",
        "vi": "Từ đây đi thẳng về phía trước.",
        "tag": "Chỉ đường"
      },
      {
        "zh": "我们走吧，时间不早了。",
        "pinyin": "Wǒmen zǒu ba, shíjiān bù zǎo le.",
        "vi": "Chúng mình đi thôi, thời gian không còn sớm nữa.",
        "tag": "Đề nghị xuất phát"
      }
    ]
  },
  {
    "id": "8-8",
    "hanzi": "白",
    "traditional": "白",
    "pinyin": "bái",
    "pinyinClean": "bai",
    "hanViet": "BẠCH",
    "radical": "白",
    "strokeCount": 5,
    "hskLevel": 2,
    "lesson": 8,
    "partOfSpeech": "tt.",
    "viet": "trắng",
    "vi_meaning_full": "có màu trắng",
    "vi_meaning_short": "trắng",
    "enMeaning": "white",
    "image": "https://images.pexels.com/photos/29826612/pexels-photo-29826612.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "白色的衣服",
      "白云"
    ],
    "compounds": [
      "白色",
      "白天",
      "明白"
    ],
    "synonyms": [
      "白色"
    ],
    "antonyms": [
      "黑"
    ],
    "confusableWords": "百, 日",
    "sentences": [
      {
        "zh": "这件白的有点儿长。",
        "pinyin": "Zhè jiàn bái de yǒudiǎnr cháng.",
        "vi": "Cái màu trắng này hơi dài.",
        "tag": "Mua sắm quần áo"
      },
      {
        "zh": "我喜欢白色的花。",
        "pinyin": "Wǒ xǐhuan bái sè de huā.",
        "vi": "Tôi thích hoa màu trắng.",
        "tag": "Sở thích"
      }
    ]
  },
  {
    "id": "hsk2-8-175",
    "hanzi": "白色",
    "traditional": "白色",
    "pinyin": "báisè",
    "pinyinClean": "baise",
    "hanViet": "BẠCH SẮC",
    "radical": "白",
    "strokeCount": 11,
    "hskLevel": 2,
    "lesson": 8,
    "partOfSpeech": "dt.",
    "viet": "màu trắng",
    "vi_meaning_full": "màu trắng",
    "vi_meaning_short": "màu trắng",
    "enMeaning": "white color",
    "image": "https://images.pexels.com/photos/8582271/pexels-photo-8582271.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "白色的"
    ],
    "compounds": [
      "白云",
      "白天"
    ],
    "synonyms": [
      "白"
    ],
    "antonyms": [
      "黑色"
    ],
    "confusableWords": "黑色",
    "sentences": [
      {
        "zh": "我喜欢白色的花。",
        "pinyin": "Wǒ xǐhuan bái sè de huā.",
        "vi": "Tôi thích hoa màu trắng.",
        "tag": "Sở thích"
      },
      {
        "zh": "这件白色的衣服很干净。",
        "pinyin": "Zhè jiàn bái sè de yīfu hěn gānjìng.",
        "vi": "Chiếc áo màu trắng này rất sạch sẽ.",
        "tag": "Miêu tả"
      }
    ]
  },
  {
    "id": "8-4",
    "hanzi": "等",
    "traditional": "等",
    "pinyin": "děng",
    "pinyinClean": "deng",
    "hanViet": "ĐẲNG",
    "radical": "竹",
    "strokeCount": 12,
    "hskLevel": 2,
    "lesson": 8,
    "partOfSpeech": "đgt.",
    "viet": "đợi, chờ",
    "vi_meaning_full": "đợi",
    "vi_meaning_short": "đợi, chờ",
    "enMeaning": "to wait",
    "image": "https://images.pexels.com/photos/33421737/pexels-photo-33421737.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "等等",
      "等一下",
      "等人"
    ],
    "compounds": [
      "等待",
      "平等",
      "等等"
    ],
    "synonyms": [
      "等待"
    ],
    "antonyms": [],
    "confusableWords": "邓",
    "sentences": [
      {
        "zh": "你等等我，好吗？",
        "pinyin": "Nǐ děngdeng wǒ, hǎo ma?",
        "vi": "Cậu đợi mình một lát được không?",
        "tag": "Yêu cầu nhã nhặn"
      },
      {
        "zh": "我们在这儿等她半个小时了。",
        "pinyin": "Wǒmen zài zhèr děng tā bàn gè xiǎoshí le.",
        "vi": "Chúng tôi đợi cô ấy ở đây nửa tiếng rồi.",
        "tag": "Phàn nàn nhẹ"
      }
    ]
  },
  {
    "id": "8-7",
    "hanzi": "服务员",
    "traditional": "服務員",
    "pinyin": "fúwùyuán",
    "pinyinClean": "fuwuyuan",
    "hanViet": "PHỤC VỤ VIÊN",
    "radical": "亻",
    "strokeCount": 26,
    "hskLevel": 2,
    "lesson": 8,
    "partOfSpeech": "dt.",
    "viet": "phục vụ, nhân viên",
    "vi_meaning_full": "nhân viên phục vụ",
    "vi_meaning_short": "phục vụ, nhân viên",
    "enMeaning": "waiter, waitress, attendant",
    "image": "https://images.pexels.com/photos/19420186/pexels-photo-19420186.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "叫服务员",
      "宾馆服务员"
    ],
    "compounds": [
      "服务",
      "人员",
      "会员"
    ],
    "synonyms": [
      "侍者"
    ],
    "antonyms": [],
    "confusableWords": "辅导员",
    "sentences": [
      {
        "zh": "服务员，请问317房间在哪儿？",
        "pinyin": "Fúwùyuán, qǐngwèn sān-yāo-qī fángjiān zài nǎr?",
        "vi": "Phục vụ ơi cho hỏi phòng 317 ở đâu?",
        "tag": "Hỏi vị trí"
      },
      {
        "zh": "这里的服务员态度非常好。",
        "pinyin": "Zhèlǐ de fúwùyuán tàidu fēicháng hǎo.",
        "vi": "Nhân viên phục vụ ở đây thái độ rất tốt.",
        "tag": "Khen ngợi dịch vụ"
      }
    ]
  },
  {
    "id": "8-3",
    "hanzi": "告诉",
    "traditional": "告訴",
    "pinyin": "gàosu",
    "pinyinClean": "gaosu",
    "hanViet": "CÁO TỐ",
    "radical": "言",
    "strokeCount": 17,
    "hskLevel": 2,
    "lesson": 8,
    "partOfSpeech": "đgt.",
    "viet": "nói cho biết, bảo",
    "vi_meaning_full": "nói cho biết",
    "vi_meaning_short": "nói cho biết, bảo",
    "enMeaning": "to tell, inform",
    "image": "https://images.pexels.com/photos/39729422/pexels-photo-39729422.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "告诉我",
      "告诉大家"
    ],
    "compounds": [
      "广告",
      "报告",
      "告诉"
    ],
    "synonyms": [
      "通知",
      "告知"
    ],
    "antonyms": [
      "瞒"
    ],
    "confusableWords": "告别",
    "sentences": [
      {
        "zh": "让我想想再告诉你。",
        "pinyin": "Ràng wǒ xiǎngxiang zài gàosu nǐ.",
        "vi": "Để mình suy nghĩ rồi sẽ nói cho bạn biết.",
        "tag": "Hẹn trả lời sau"
      },
      {
        "zh": "你能告诉我怎么走吗？",
        "pinyin": "Nǐ néng gàosu wǒ zěnme zǒu ma?",
        "vi": "Anh có thể chỉ cho tôi biết đi thế nào không?",
        "tag": "Hỏi đường"
      }
    ]
  },
  {
    "id": "8-10",
    "hanzi": "贵",
    "traditional": "貴",
    "pinyin": "guì",
    "pinyinClean": "gui",
    "hanViet": "QUÝ",
    "radical": "贝",
    "strokeCount": 9,
    "hskLevel": 2,
    "lesson": 8,
    "partOfSpeech": "tt.",
    "viet": "đắt, mắc, đắt tiền",
    "vi_meaning_full": "đắt",
    "vi_meaning_short": "đắt, mắc, đắt tiền",
    "enMeaning": "expensive, costly",
    "image": "https://images.pexels.com/photos/31459470/pexels-photo-31459470.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "太贵了",
      "不贵",
      "昂贵"
    ],
    "compounds": [
      "贵姓",
      "宝贵"
    ],
    "synonyms": [
      "昂贵"
    ],
    "antonyms": [
      "便宜"
    ],
    "confusableWords": "桂, 柜",
    "sentences": [
      {
        "zh": "这件黑的有点儿贵。",
        "pinyin": "Zhè jiàn hēi de yǒudiǎnr guì.",
        "vi": "Cái màu đen kia hơi đắt.",
        "tag": "Thương lượng giá"
      },
      {
        "zh": "觉得有点儿贵，两百块还可以。",
        "pinyin": "Juéde yǒudiǎnr guì, liǎng bǎi kuài hái kěyǐ.",
        "vi": "Thấy hơi đắt, hai trăm đồng thì tạm được.",
        "tag": "Mua sắm"
      }
    ]
  },
  {
    "id": "8-9",
    "hanzi": "黑",
    "traditional": "黑",
    "pinyin": "hēi",
    "pinyinClean": "hei",
    "hanViet": "HẮC",
    "radical": "黑",
    "strokeCount": 12,
    "hskLevel": 2,
    "lesson": 8,
    "partOfSpeech": "tt.",
    "viet": "trời tối, màu đen",
    "vi_meaning_full": "có màu đen",
    "vi_meaning_short": "trời tối, màu đen",
    "enMeaning": "black, dark",
    "image": "https://images.pexels.com/photos/11285435/pexels-photo-11285435.png?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "黑色的",
      "黑夜",
      "黑板"
    ],
    "compounds": [
      "黑色",
      "黑夜",
      "黑板"
    ],
    "synonyms": [
      "黑色"
    ],
    "antonyms": [
      "白"
    ],
    "confusableWords": "嘿",
    "sentences": [
      {
        "zh": "那件黑的有点儿贵。",
        "pinyin": "Nà jiàn hēi de yǒudiǎnr guì.",
        "vi": "Cái màu đen kia hơi đắt.",
        "tag": "Nhận xét mua sắm"
      },
      {
        "zh": "天黑了，我们回家吧。",
        "pinyin": "Tiān hēi le, wǒmen huí jiā ba.",
        "vi": "Trời tối rồi, chúng ta về nhà thôi.",
        "tag": "Nhắc nhở thời gian"
      }
    ]
  },
  {
    "id": "hsk2-8-179",
    "hanzi": "黑色",
    "traditional": "黑色",
    "pinyin": "hēisè",
    "pinyinClean": "heise",
    "hanViet": "HẮC SẮC",
    "radical": "黑",
    "strokeCount": 18,
    "hskLevel": 2,
    "lesson": 8,
    "partOfSpeech": "dt.",
    "viet": "màu đen",
    "vi_meaning_full": "màu đen",
    "vi_meaning_short": "màu đen",
    "enMeaning": "black color",
    "image": "https://images.pexels.com/photos/11548432/pexels-photo-11548432.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "黑色的"
    ],
    "compounds": [
      "黑夜",
      "黑板"
    ],
    "synonyms": [
      "黑"
    ],
    "antonyms": [
      "白色"
    ],
    "confusableWords": "白色",
    "sentences": [
      {
        "zh": "我买了一双黑色的鞋子。",
        "pinyin": "Wǒ mǎi le yì shuāng hēisè de xiézi.",
        "vi": "Tôi mua một đôi giày màu đen.",
        "tag": "Mua sắm"
      },
      {
        "zh": "黑色的汽车看起来很稳重。",
        "pinyin": "Hēisè de qìchē kàn qǐlái hěn wěnzhòng.",
        "vi": "Chiếc xe ô tô màu đen trông rất sang trọng.",
        "tag": "Miêu tả"
      }
    ]
  },
  {
    "id": "8-2",
    "hanzi": "让",
    "traditional": "讓",
    "pinyin": "ràng",
    "pinyinClean": "rang",
    "hanViet": "NHƯỢNG",
    "radical": "言",
    "strokeCount": 6,
    "hskLevel": 2,
    "lesson": 8,
    "partOfSpeech": "đgt.",
    "viet": "cho phép, bảo, khiến cho",
    "vi_meaning_full": "để, bảo",
    "vi_meaning_short": "cho phép, bảo, khiến cho",
    "enMeaning": "to let, allow, make",
    "image": "https://images.pexels.com/photos/19804230/pexels-photo-19804230.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "让我想想",
      "老师让"
    ],
    "compounds": [
      "让步",
      "让座"
    ],
    "synonyms": [
      "使",
      "叫"
    ],
    "antonyms": [],
    "confusableWords": "壤",
    "sentences": [
      {
        "zh": "让我想想再告诉你。",
        "pinyin": "Ràng wǒ xiǎngxiang zài gàosu nǐ.",
        "vi": "Để mình suy nghĩ rồi nói cho bạn biết nhé.",
        "tag": "Cần thời gian suy nghĩ"
      },
      {
        "zh": "王老师让我给你打个电话。",
        "pinyin": "Wáng lǎoshī ràng wǒ gěi nǐ dǎ gè diànhuà.",
        "vi": "Cô Vương bảo mình gọi điện cho cậu.",
        "tag": "Truyền đạt lời nhắn"
      }
    ]
  },
  {
    "id": "8-6",
    "hanzi": "事情",
    "traditional": "事情",
    "pinyin": "shìqing",
    "pinyinClean": "shiqing",
    "hanViet": "SỰ TÌNH",
    "radical": "日",
    "strokeCount": 16,
    "hskLevel": 2,
    "lesson": 8,
    "partOfSpeech": "dt.",
    "viet": "công việc, chuyện, sự việc",
    "vi_meaning_full": "sự việc",
    "vi_meaning_short": "công việc, chuyện, sự việc",
    "enMeaning": "thing, matter, affair",
    "image": "https://images.pexels.com/photos/37082240/pexels-photo-37082240.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "有事情",
      "一件事情"
    ],
    "compounds": [
      "事件",
      "事故",
      "事物"
    ],
    "synonyms": [
      "事物",
      "事项"
    ],
    "antonyms": [],
    "confusableWords": "市场",
    "sentences": [
      {
        "zh": "找大卫有什么事情吗？",
        "pinyin": "Zhǎo Dàwèi yǒu shénme shìqing ma?",
        "vi": "Tìm David có chuyện gì không?",
        "tag": "Hỏi lý do gặp mặt"
      },
      {
        "zh": "我还有很多事情要做呢。",
        "pinyin": "Wǒ hái yǒu hěn duō shìqing yào zuò ne.",
        "vi": "Tôi còn rất nhiều việc phải làm.",
        "tag": "Nói về công việc bận rộn"
      }
    ]
  },
  {
    "id": "8-1",
    "hanzi": "再",
    "traditional": "再",
    "pinyin": "zài",
    "pinyinClean": "zai",
    "hanViet": "TÁI",
    "radical": "一",
    "strokeCount": 6,
    "hskLevel": 2,
    "lesson": 8,
    "partOfSpeech": "phó.",
    "viet": "lại, tiếp tục, lần nữa",
    "vi_meaning_full": "lại, lần nữa, hãy, sẽ, hằng",
    "vi_meaning_short": "lại, tiếp tục, lần nữa",
    "enMeaning": "again, once more",
    "image": "https://images.pexels.com/photos/9999717/pexels-photo-9999717.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "再见",
      "再想想",
      "下午再去"
    ],
    "compounds": [
      "再见",
      "再会",
      "再次"
    ],
    "synonyms": [
      "又"
    ],
    "antonyms": [],
    "confusableWords": "在",
    "sentences": [
      {
        "zh": "今天下午我没有时间，明天下午再去吧。",
        "pinyin": "Jīntiān xiàwǔ wǒ méiyǒu shíjiān, míngtiān xiàwǔ zài qù ba.",
        "vi": "Chiều nay tôi không có thời gian, chiều mai hãy đi nhé.",
        "tag": "Hẹn lại dịp khác"
      },
      {
        "zh": "让我想想再告诉你。",
        "pinyin": "Ràng wǒ xiǎngxiang zài gàosu nǐ.",
        "vi": "Để tôi suy nghĩ rồi mới nói cho bạn biết.",
        "tag": "Hẹn trả lời sau"
      }
    ]
  },
  {
    "id": "8-5",
    "hanzi": "找",
    "traditional": "找",
    "pinyin": "zhǎo",
    "pinyinClean": "zhao",
    "hanViet": "TRẢO",
    "radical": "扌",
    "strokeCount": 7,
    "hskLevel": 2,
    "lesson": 8,
    "partOfSpeech": "đgt.",
    "viet": "tìm kiếm, tìm gặp",
    "vi_meaning_full": "tìm",
    "vi_meaning_short": "tìm kiếm, tìm gặp",
    "enMeaning": "to look for, find",
    "image": "https://images.pexels.com/photos/7793173/pexels-photo-7793173.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "找人",
      "找到",
      "找钱"
    ],
    "compounds": [
      "找到",
      "找钱",
      "找寻"
    ],
    "synonyms": [
      "寻找"
    ],
    "antonyms": [],
    "confusableWords": "抓",
    "sentences": [
      {
        "zh": "找大卫有什么事情吗？",
        "pinyin": "Zhǎo Dàwèi yǒu shénme shìqing ma?",
        "vi": "Tìm David có chuyện gì không?",
        "tag": "Hỏi lý do gặp"
      },
      {
        "zh": "听说大卫生病了，我想找时间去看看他。",
        "pinyin": "Tīngshuō Dàwèi shēngbìng le, wǒ xiǎng zhǎo shíjiān qù kànkan tā.",
        "vi": "Nghe nói David bị ốm rồi, tôi muốn tìm thời gian đi thăm anh ấy.",
        "tag": "Quan tâm bạn bè"
      }
    ]
  },
  {
    "id": "9-2",
    "hanzi": "从",
    "traditional": "從",
    "pinyin": "cóng",
    "pinyinClean": "cong",
    "hanViet": "TÙNG",
    "radical": "人",
    "strokeCount": 4,
    "hskLevel": 2,
    "lesson": 9,
    "partOfSpeech": "giới.",
    "viet": "từ, từ đâu đến",
    "vi_meaning_full": "từ",
    "vi_meaning_short": "từ, từ đâu đến",
    "enMeaning": "from",
    "image": "https://images.pexels.com/photos/234453/pexels-photo-234453.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "从...到...",
      "从小",
      "从来"
    ],
    "compounds": [
      "从来",
      "从前",
      "服从"
    ],
    "synonyms": [
      "自"
    ],
    "antonyms": [
      "到"
    ],
    "confusableWords": "丛",
    "sentences": [
      {
        "zh": "他从什么时候开始上班？",
        "pinyin": "Tā cóng shénme shíhou kāishǐ shàngbān?",
        "vi": "Anh ấy bắt đầu đi làm từ khi nào?",
        "tag": "Hỏi mốc thời gian"
      },
      {
        "zh": "从这儿一直往前走。",
        "pinyin": "Cóng zhèr yìzhí wǎng qián zǒu.",
        "vi": "Từ đây đi thẳng về phía trước.",
        "tag": "Chỉ đường"
      }
    ]
  },
  {
    "id": "9-1",
    "hanzi": "错",
    "traditional": "錯",
    "pinyin": "cuò",
    "pinyinClean": "cuo",
    "hanViet": "THÁC",
    "radical": "金",
    "strokeCount": 13,
    "hskLevel": 2,
    "lesson": 9,
    "partOfSpeech": "tt.",
    "viet": "sai, nhầm lẫn",
    "vi_meaning_full": "sai, nhầm",
    "vi_meaning_short": "sai, nhầm lẫn",
    "enMeaning": "wrong, mistaken",
    "image": "https://images.pexels.com/photos/31356615/pexels-photo-31356615.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "听错",
      "写错",
      "不错"
    ],
    "compounds": [
      "不错",
      "错误",
      "改错"
    ],
    "synonyms": [
      "错误"
    ],
    "antonyms": [
      "对"
    ],
    "confusableWords": "挫",
    "sentences": [
      {
        "zh": "这些题你都做错了。",
        "pinyin": "Zhèxiē tí nǐ dōu zuò cuò le.",
        "vi": "Mấy câu này bạn làm sai hết rồi.",
        "tag": "Sửa bài"
      },
      {
        "zh": "这个电影真不错。",
        "pinyin": "Zhège diànyǐng zhēn búcuò.",
        "vi": "Bộ phim này thật là không tệ chút nào.",
        "tag": "Khen ngợi (nghĩa tích cực)"
      }
    ]
  },
  {
    "id": "9-4",
    "hanzi": "第一",
    "traditional": "第一",
    "pinyin": "dì yī",
    "pinyinClean": "diyi",
    "hanViet": "ĐỆ NHẤT",
    "radical": "竹",
    "strokeCount": 12,
    "hskLevel": 2,
    "lesson": 9,
    "partOfSpeech": "số.",
    "viet": "thứ nhất, số 1",
    "vi_meaning_full": "thứ nhất, đầu tiên",
    "vi_meaning_short": "thứ nhất, số 1",
    "enMeaning": "first, number one",
    "image": "https://images.pexels.com/photos/4808279/pexels-photo-4808279.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "第一名",
      "第一次",
      "第一个"
    ],
    "compounds": [
      "第一",
      "次序"
    ],
    "synonyms": [
      "首要"
    ],
    "antonyms": [
      "最後"
    ],
    "confusableWords": "第二",
    "sentences": [
      {
        "zh": "这是他的第一个工作，希望他能喜欢。",
        "pinyin": "Zhè shì tā de dì yī gè gōngzuò, xīwàng tā néng xǐhuan.",
        "vi": "Đây là công việc đầu tiên của anh ấy, hy vọng anh ấy sẽ thích.",
        "tag": "Kỳ vọng"
      },
      {
        "zh": "第一题太难了，我不会做。",
        "pinyin": "Dì yī tí tài nán le, wǒ bú huì zuò.",
        "vi": "Câu thứ nhất khó quá, tôi không biết làm.",
        "tag": "Nói về bài tập"
      }
    ]
  },
  {
    "id": "9-9",
    "hanzi": "懂",
    "traditional": "懂",
    "pinyin": "dǒng",
    "pinyinClean": "dong",
    "hanViet": "HIỂU",
    "radical": "心",
    "strokeCount": 15,
    "hskLevel": 2,
    "lesson": 9,
    "partOfSpeech": "đgt.",
    "viet": "hiểu, nắm rõ",
    "vi_meaning_full": "hiểu, biết",
    "vi_meaning_short": "hiểu, nắm rõ",
    "enMeaning": "to understand, know",
    "image": "https://images.pexels.com/photos/8199174/pexels-photo-8199174.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "听懂",
      "看懂",
      "懂不懂"
    ],
    "compounds": [
      "懂事",
      "听懂"
    ],
    "synonyms": [
      "明白",
      "了解"
    ],
    "antonyms": [
      "糊涂"
    ],
    "confusableWords": "董",
    "sentences": [
      {
        "zh": "你都听懂了吗？",
        "pinyin": "Nǐ dōu tīngdǒng le ma?",
        "vi": "Bạn đã nghe hiểu hết chưa?",
        "tag": "Hỏi bài"
      },
      {
        "zh": "我听懂了，但是不会写。",
        "pinyin": "Wǒ tīngdǒng le, dànshì bú huì xiě.",
        "vi": "Tôi nghe hiểu rồi, nhưng không biết viết.",
        "tag": "Phản hồi học tập"
      }
    ]
  },
  {
    "id": "9-7",
    "hanzi": "欢迎",
    "traditional": "歡迎",
    "pinyin": "huānyíng",
    "pinyinClean": "huanying",
    "hanViet": "HOAN NGHÊNH",
    "radical": "又",
    "strokeCount": 13,
    "hskLevel": 2,
    "lesson": 9,
    "partOfSpeech": "đgt.",
    "viet": "hoan nghênh, chào đón",
    "vi_meaning_full": "hoan nghênh",
    "vi_meaning_short": "hoan nghênh, chào đón",
    "enMeaning": "to welcome",
    "image": "https://images.pexels.com/photos/34219147/pexels-photo-34219147.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "欢迎光临",
      "欢迎大家"
    ],
    "compounds": [
      "欢喜",
      "迎面"
    ],
    "synonyms": [
      "迎接"
    ],
    "antonyms": [
      "拒绝"
    ],
    "confusableWords": "欢快",
    "sentences": [
      {
        "zh": "热烈欢迎大家来到我们公司！",
        "pinyin": "Rèliè huānyíng dàjiā láidào wǒmen gōngsī!",
        "vi": "Nhiệt liệt chào đón mọi người đến với công ty chúng tôi!",
        "tag": "Chào mừng khách"
      },
      {
        "zh": "非常欢迎你随时来我家玩儿。",
        "pinyin": "Fēicháng huānyíng nǐ suíshí lái wǒ jiā wánr.",
        "vi": "Rất hoan nghênh bạn rảnh rỗi đến nhà tôi chơi.",
        "tag": "Lời mời"
      }
    ]
  },
  {
    "id": "9-8",
    "hanzi": "上班",
    "traditional": "上班",
    "pinyin": "shàng bān",
    "pinyinClean": "shangban",
    "hanViet": "THƯỢNG BAN",
    "radical": "一",
    "strokeCount": 12,
    "hskLevel": 2,
    "lesson": 9,
    "partOfSpeech": "đgt.",
    "viet": "đi làm, bắt đầu ca làm",
    "vi_meaning_full": "đi làm",
    "vi_meaning_short": "đi làm, bắt đầu ca làm",
    "enMeaning": "to go to work, be on duty",
    "image": "https://images.pexels.com/photos/35348632/pexels-photo-35348632.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "去上班",
      "上班时间"
    ],
    "compounds": [
      "上班族",
      "加班"
    ],
    "synonyms": [],
    "antonyms": [
      "下班"
    ],
    "confusableWords": "下班",
    "sentences": [
      {
        "zh": "他从什么时候开始上班？",
        "pinyin": "Tā cóng shénme shíhou kāishǐ shàngbān?",
        "vi": "Anh ấy bắt đầu đi làm từ khi nào vậy?",
        "tag": "Hỏi về công việc"
      },
      {
        "zh": "我每天八点半去上班。",
        "pinyin": "Wǒ měitiān bā diǎn bàn qù shàngbān.",
        "vi": "Mỗi ngày tôi đi làm lúc 8 rưỡi.",
        "tag": "Sinh hoạt hàng ngày"
      }
    ]
  },
  {
    "id": "9-11",
    "hanzi": "题",
    "traditional": "題",
    "pinyin": "tí",
    "pinyinClean": "ti",
    "hanViet": "ĐỀ",
    "radical": "页",
    "strokeCount": 18,
    "hskLevel": 2,
    "lesson": 9,
    "partOfSpeech": "dt.",
    "viet": "câu hỏi, đề thi, bài tập",
    "vi_meaning_full": "câu hỏi",
    "vi_meaning_short": "câu hỏi, đề thi, bài tập",
    "enMeaning": "question, problem, topic",
    "image": "https://images.pexels.com/photos/18889468/pexels-photo-18889468.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "做题",
      "题太多",
      "第一题"
    ],
    "compounds": [
      "问题",
      "话题",
      "试题"
    ],
    "synonyms": [
      "题目"
    ],
    "antonyms": [],
    "confusableWords": "提",
    "sentences": [
      {
        "zh": "题太多，我没做完。",
        "pinyin": "Tí tài duō, wǒ méi zuò wán.",
        "vi": "Câu hỏi nhiều quá, tôi làm không hết.",
        "tag": "Phàn nàn bài thi"
      },
      {
        "zh": "这道题很复杂，我想了很久。",
        "pinyin": "Zhè dào tí hěn fùzá, wǒ xiǎng le hěn jiǔ.",
        "vi": "Bài tập này rất phức tạp, tôi đã nghĩ rất lâu.",
        "tag": "Thảo luận bài tập"
      }
    ]
  },
  {
    "id": "9-3",
    "hanzi": "跳舞",
    "traditional": "跳舞",
    "pinyin": "tiào wǔ",
    "pinyinClean": "tiaowu",
    "hanViet": "KHIÊU VŨ",
    "radical": "足",
    "strokeCount": 27,
    "hskLevel": 2,
    "lesson": 9,
    "partOfSpeech": "đgt.",
    "viet": "nhảy múa, khiêu vũ",
    "vi_meaning_full": "múa, khiêu vũ",
    "vi_meaning_short": "nhảy múa, khiêu vũ",
    "enMeaning": "to dance",
    "image": "https://images.pexels.com/photos/2345293/pexels-photo-2345293.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "喜欢跳舞",
      "唱歌跳舞"
    ],
    "compounds": [
      "舞蹈",
      "跳高"
    ],
    "synonyms": [
      "舞蹈"
    ],
    "antonyms": [],
    "confusableWords": "挑",
    "sentences": [
      {
        "zh": "除了唱歌，她还喜欢跳舞。",
        "pinyin": "Chúle chàng gē, tā hái xǐhuan tiào wǔ.",
        "vi": "Ngoài ca hát ra, cô ấy còn thích nhảy múa.",
        "tag": "Giới thiệu tài năng"
      },
      {
        "zh": "妹妹正在房间里跳舞呢。",
        "pinyin": "Mèimei zhèngzài fángjiān lǐ tiào wǔ ne.",
        "vi": "Em gái đang nhảy múa trong phòng kìa.",
        "tag": "Miêu tả hành động"
      }
    ]
  },
  {
    "id": "9-10",
    "hanzi": "完",
    "traditional": "完",
    "pinyin": "wán",
    "pinyinClean": "wan",
    "hanViet": "HOÀN",
    "radical": "宀",
    "strokeCount": 7,
    "hskLevel": 2,
    "lesson": 9,
    "partOfSpeech": "đgt.",
    "viet": "hoàn thành, xong, hết",
    "vi_meaning_full": "xong, hết",
    "vi_meaning_short": "hoàn thành, xong, hết",
    "enMeaning": "to finish, complete, end",
    "image": "https://images.pexels.com/photos/9795032/pexels-photo-9795032.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "做完",
      "吃完",
      "用完"
    ],
    "compounds": [
      "完成",
      "完全",
      "完美"
    ],
    "synonyms": [
      "完成",
      "结束"
    ],
    "antonyms": [
      "始"
    ],
    "confusableWords": "玩",
    "sentences": [
      {
        "zh": "题太多，我没做完。",
        "pinyin": "Tí tài duō, wǒ méi zuò wán.",
        "vi": "Câu hỏi nhiều quá, tôi chưa làm xong.",
        "tag": "Nói về kết quả bài thi"
      },
      {
        "zh": "我已经吃完药了，感觉好多了。",
        "pinyin": "Wǒ yǐjīng chī wán yào le, gǎnjué hǎo duō le.",
        "vi": "Tôi uống xong thuốc rồi, thấy dễ chịu hơn nhiều.",
        "tag": "Trạng thái sức khỏe"
      }
    ]
  },
  {
    "id": "9-6",
    "hanzi": "问题",
    "traditional": "問題",
    "pinyin": "wèntí",
    "pinyinClean": "wenti",
    "hanViet": "VẤN ĐỀ",
    "radical": "门",
    "strokeCount": 24,
    "hskLevel": 2,
    "lesson": 9,
    "partOfSpeech": "dt.",
    "viet": "vấn đề, câu hỏi, thắc mắc",
    "vi_meaning_full": "vấn đề, câu hỏi",
    "vi_meaning_short": "vấn đề, câu hỏi, thắc mắc",
    "enMeaning": "question, problem, issue",
    "image": "https://images.pexels.com/photos/9099824/pexels-photo-9099824.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "没问题",
      "回答问题"
    ],
    "compounds": [
      "提问",
      "题库"
    ],
    "synonyms": [
      "疑问"
    ],
    "antonyms": [
      "答案"
    ],
    "confusableWords": "文章",
    "sentences": [
      {
        "zh": "你有什么问题吗？没问题。",
        "pinyin": "Nǐ yǒu shénme wèntí ma? Méi wèntí.",
        "vi": "Bạn có câu hỏi/vấn đề gì không? Không có vấn đề gì.",
        "tag": "Xác nhận thông tin"
      },
      {
        "zh": "这个问题太难了，我不知道。",
        "pinyin": "Zhège wèntí tài nán le, wǒ bù zhīdào.",
        "vi": "Câu hỏi này khó quá, tôi không biết.",
        "tag": "Phản hồi học tập"
      }
    ]
  },
  {
    "id": "9-5",
    "hanzi": "希望",
    "traditional": "希望",
    "pinyin": "xīwàng",
    "pinyinClean": "xiwang",
    "hanViet": "HY VỌNG",
    "radical": "巾",
    "strokeCount": 18,
    "hskLevel": 2,
    "lesson": 9,
    "partOfSpeech": "đgt./dt.",
    "viet": "mong muốn, hy vọng",
    "vi_meaning_full": "mong, hy vọng",
    "vi_meaning_short": "mong muốn, hy vọng",
    "enMeaning": "to hope, wish; hope",
    "image": "https://images.pexels.com/photos/3993016/pexels-photo-3993016.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "希望你能来",
      "满怀希望"
    ],
    "compounds": [
      "名望",
      "欲望"
    ],
    "synonyms": [
      "盼望",
      "期望"
    ],
    "antonyms": [
      "绝望"
    ],
    "confusableWords": "失望",
    "sentences": [
      {
        "zh": "这是他的第一个工作，希望他能喜欢。",
        "pinyin": "Zhè shì tā de dì yī gè gōngzuò, xīwàng tā néng xǐhuan.",
        "vi": "Đây là công việc đầu tiên của anh ấy, hy vọng anh ấy sẽ thích.",
        "tag": "Lời chúc tương lai"
      },
      {
        "zh": "希望我们的公司明年更好！",
        "pinyin": "Xīwàng wǒmen de gōngsī míngnián gèng hǎo!",
        "vi": "Hy vọng công ty chúng ta năm sau phát triển hơn!",
        "tag": "Kỳ vọng công ty"
      }
    ]
  },
  {
    "id": "10-2",
    "hanzi": "帮助",
    "traditional": "幫助",
    "pinyin": "bāngzhù",
    "pinyinClean": "bangzhu",
    "hanViet": "BANG TRỢ",
    "radical": "巾",
    "strokeCount": 16,
    "hskLevel": 2,
    "lesson": 10,
    "partOfSpeech": "đgt.",
    "viet": "giúp đỡ",
    "vi_meaning_full": "giúp ích, giúp đỡ",
    "vi_meaning_short": "giúp đỡ",
    "enMeaning": "to help, assist",
    "image": "https://images.pexels.com/photos/8832726/pexels-photo-8832726.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "帮助别人",
      "互相帮助"
    ],
    "compounds": [
      "帮助",
      "助手"
    ],
    "synonyms": [
      "帮"
    ],
    "antonyms": [
      "害"
    ],
    "confusableWords": "帮",
    "sentences": [
      {
        "zh": "谢谢大家这一年对我的帮助！",
        "pinyin": "Xièxie dàjiā zhè yì nián duì wǒ de bāngzhù!",
        "vi": "Cảm ơn mọi người vì đã giúp đỡ tôi trong suốt năm nay!",
        "tag": "Cảm ơn"
      },
      {
        "zh": "我可以帮助你学习汉语。",
        "pinyin": "Wǒ kěyǐ bāngzhù nǐ xuéxí Hànyǔ.",
        "vi": "Tôi có thể giúp bạn học tiếng Trung.",
        "tag": "Hỗ trợ học tập"
      }
    ]
  },
  {
    "id": "10-3",
    "hanzi": "别",
    "traditional": "別",
    "pinyin": "bié",
    "pinyinClean": "bie",
    "hanViet": "BIỆT",
    "radical": "刀",
    "strokeCount": 7,
    "hskLevel": 2,
    "lesson": 10,
    "partOfSpeech": "phó.",
    "viet": "đừng, không được",
    "vi_meaning_full": "đừng",
    "vi_meaning_short": "đừng, không được",
    "enMeaning": "don't",
    "image": "https://images.pexels.com/photos/19964901/pexels-photo-19964901.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "别去",
      "别说话",
      "别客气"
    ],
    "compounds": [
      "别人",
      "区别",
      "告别"
    ],
    "synonyms": [
      "不要"
    ],
    "antonyms": [
      "要"
    ],
    "confusableWords": "不要",
    "sentences": [
      {
        "zh": "你别去外面吃了。",
        "pinyin": "Nǐ bié qù wàimian chī le.",
        "vi": "Cậu đừng ra ngoài ăn nữa.",
        "tag": "Lời khuyên"
      },
      {
        "zh": "别说话，听老师讲课。",
        "pinyin": "Bié shuōhuà, tīng lǎoshī jiǎngkè.",
        "vi": "Đừng nói chuyện, nghe thầy giảng bài.",
        "tag": "Mệnh lệnh nhẹ"
      }
    ]
  },
  {
    "id": "hsk2-10-177",
    "hanzi": "电视机",
    "traditional": "電視機",
    "pinyin": "diànshìjī",
    "pinyinClean": "dianshiji",
    "hanViet": "ĐIỆN THỊ CƠ",
    "radical": "电",
    "strokeCount": 24,
    "hskLevel": 2,
    "lesson": 10,
    "partOfSpeech": "dt.",
    "viet": "tivi, máy truyền hình",
    "vi_meaning_full": "máy thu hình, tivi",
    "vi_meaning_short": "tivi, máy truyền hình",
    "enMeaning": "television set",
    "image": "https://pixabay.com/get/gb97ee8933595a9c58b77bc82f7f6584f760491e7e44dea17fd4caff8645f29679eb21be62a232fc5da98d48ec0524b7e1b841f676b11d7519623811ff8b02f90_640.jpg",
    "collocations": [
      "看电视机",
      "买电视机"
    ],
    "compounds": [
      "电视",
      "手机",
      "飞机"
    ],
    "synonyms": [
      "电视"
    ],
    "antonyms": [],
    "confusableWords": "电风扇",
    "sentences": [
      {
        "zh": "客厅里放着一台新电视机。",
        "pinyin": "Kètīng lǐ fàng zhe yì tái xīn diànshìjī.",
        "vi": "Trong phòng khách có đặt một chiếc tivi mới.",
        "tag": "Đồ dùng gia đình"
      },
      {
        "zh": "这台电视机画面很清晰。",
        "pinyin": "Zhè tái diànshìjī huàmiàn hěn qīngxī.",
        "vi": "Chiếc tivi này màn hình rất sắc nét.",
        "tag": "Đánh giá đồ điện tử"
      }
    ]
  },
  {
    "id": "10-4",
    "hanzi": "哥哥",
    "traditional": "哥哥",
    "pinyin": "gēge",
    "pinyinClean": "gege",
    "hanViet": "CA CA",
    "radical": "口",
    "strokeCount": 20,
    "hskLevel": 2,
    "lesson": 10,
    "partOfSpeech": "dt.",
    "viet": "anh trai",
    "vi_meaning_full": "anh trai",
    "vi_meaning_short": "anh trai",
    "enMeaning": "older brother",
    "image": "https://images.pexels.com/photos/590472/pexels-photo-590472.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "我哥哥",
      "哥哥姐姐"
    ],
    "compounds": [
      "兄弟",
      "哥哥"
    ],
    "synonyms": [
      "兄"
    ],
    "antonyms": [
      "弟弟"
    ],
    "confusableWords": "歌歌",
    "sentences": [
      {
        "zh": "我哥哥在公司工作。",
        "pinyin": "Wǒ gēge zài gōngsī gōngzuò.",
        "vi": "Anh trai tôi làm việc ở công ty.",
        "tag": "Giới thiệu gia đình"
      },
      {
        "zh": "这是我哥哥买给我的手机。",
        "pinyin": "Zhè shì wǒ gēge mǎi gěi wǒ de shǒujī.",
        "vi": "Đây là chiếc điện thoại anh trai mua cho tôi.",
        "tag": "Kể chuyện"
      }
    ]
  },
  {
    "id": "10-5",
    "hanzi": "鸡蛋",
    "traditional": "雞蛋",
    "pinyin": "jīdàn",
    "pinyinClean": "jidan",
    "hanViet": "KÊ ĐẢN",
    "radical": "隹",
    "strokeCount": 19,
    "hskLevel": 2,
    "lesson": 10,
    "partOfSpeech": "dt.",
    "viet": "trứng gà",
    "vi_meaning_full": "trứng gà",
    "vi_meaning_short": "trứng gà",
    "enMeaning": "chicken egg",
    "image": "https://images.pexels.com/photos/161496/eggs-happen-food-ecology-161496.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "吃鸡蛋",
      "买鸡蛋",
      "鸡蛋汤"
    ],
    "compounds": [
      "鸡蛋面",
      "鸭蛋"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "鸭蛋",
    "sentences": [
      {
        "zh": "早上吃一个鸡蛋对身体好。",
        "pinyin": "Zǎoshang chī yí gè jīdàn duì shēntǐ hǎo.",
        "vi": "Buổi sáng ăn một quả trứng gà tốt cho sức khỏe.",
        "tag": "Khuyên dinh dưỡng"
      },
      {
        "zh": "服务员，来一碗鸡蛋面。",
        "pinyin": "Fúwùyuán, lái yì wǎn jīdànmiàn.",
        "vi": "Phục vụ ơi, cho một bát mì trứng.",
        "tag": "Gọi món ăn"
      }
    ]
  },
  {
    "id": "10-1",
    "hanzi": "课",
    "traditional": "課",
    "pinyin": "kè",
    "pinyinClean": "ke",
    "hanViet": "KHÓA",
    "radical": "言",
    "strokeCount": 10,
    "hskLevel": 2,
    "lesson": 10,
    "partOfSpeech": "dt.",
    "viet": "tiết học, bài học, môn học",
    "vi_meaning_full": "giờ học, môn, bài",
    "vi_meaning_short": "tiết học, bài học, môn học",
    "enMeaning": "class, lesson",
    "image": "https://images.pexels.com/photos/8617769/pexels-photo-8617769.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "上课",
      "下课",
      "第一课"
    ],
    "compounds": [
      "课本",
      "课堂",
      "上课"
    ],
    "synonyms": [
      "课程"
    ],
    "antonyms": [],
    "confusableWords": "棵, 颗粒",
    "sentences": [
      {
        "zh": "今天下午我们有两节课。",
        "pinyin": "Jīntiān xiàwǔ wǒmen yǒu liǎng jié kè.",
        "vi": "Chiều nay chúng tôi có hai tiết học.",
        "tag": "Thời khóa biểu"
      },
      {
        "zh": "听不懂老师讲的课。",
        "pinyin": "Tīng bù dǒng lǎoshī jiǎng de kè.",
        "vi": "Không nghe hiểu bài thầy giảng.",
        "tag": "Gặp khó khăn học tập"
      }
    ]
  },
  {
    "id": "10-8",
    "hanzi": "手机",
    "traditional": "手機",
    "pinyin": "shǒujī",
    "pinyinClean": "shouji",
    "hanViet": "THỦ CƠ",
    "radical": "手",
    "strokeCount": 10,
    "hskLevel": 2,
    "lesson": 10,
    "partOfSpeech": "dt.",
    "viet": "điện thoại di động, điện thoại",
    "vi_meaning_full": "điện thoại di động",
    "vi_meaning_short": "điện thoại di động, điện thoại",
    "enMeaning": "mobile phone, cell phone",
    "image": "https://images.pexels.com/photos/947407/pexels-photo-947407.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "买手机",
      "看手机",
      "手机号"
    ],
    "compounds": [
      "手电筒",
      "机会"
    ],
    "synonyms": [
      "移动电话"
    ],
    "antonyms": [],
    "confusableWords": "手表",
    "sentences": [
      {
        "zh": "这是我刚买的新手机。",
        "pinyin": "Zhè shì wǒ gāng mǎi de xīn shǒujī.",
        "vi": "Đây là chiếc điện thoại di động mới tôi vừa mua.",
        "tag": "Khoe đồ mới"
      },
      {
        "zh": "请大家把手机关上。",
        "pinyin": "Qǐng dàjiā bǎ shǒujī guānshàng.",
        "vi": "Xin mọi người hãy tắt điện thoại.",
        "tag": "Yêu cầu nhắc nhở"
      }
    ]
  },
  {
    "id": "10-6",
    "hanzi": "西瓜",
    "traditional": "西瓜",
    "pinyin": "xīguā",
    "pinyinClean": "xigua",
    "hanViet": "TÂY QUA",
    "radical": "西",
    "strokeCount": 11,
    "hskLevel": 2,
    "lesson": 10,
    "partOfSpeech": "dt.",
    "viet": "trái dưa hấu",
    "vi_meaning_full": "dưa hấu",
    "vi_meaning_short": "trái dưa hấu",
    "enMeaning": "watermelon",
    "image": "https://images.pexels.com/photos/8743922/pexels-photo-8743922.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "吃西瓜",
      "买西瓜"
    ],
    "compounds": [
      "瓜果",
      "西部"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "南瓜, 黄瓜",
    "sentences": [
      {
        "zh": "今天的西瓜怎么卖？三块五一斤。",
        "pinyin": "Jīntiān de xīguā zěnme mài? Sān kuài wǔ yì jīn.",
        "vi": "Dưa hấu hôm nay bán thế nào? 3 đồng 5 một cân.",
        "tag": "Hỏi giá hoa quả"
      },
      {
        "zh": "夏天吃西瓜最舒服了。",
        "pinyin": "Xiàtiān chī xīguā zuì shūfu le.",
        "vi": "Mùa hè ăn dưa hấu là dễ chịu nhất.",
        "tag": "Sở thích món ăn"
      }
    ]
  },
  {
    "id": "10-9",
    "hanzi": "洗",
    "traditional": "洗",
    "pinyin": "xǐ",
    "pinyinClean": "xi",
    "hanViet": "TẨY",
    "radical": "氵",
    "strokeCount": 9,
    "hskLevel": 2,
    "lesson": 10,
    "partOfSpeech": "đgt.",
    "viet": "rửa, giặt, gội",
    "vi_meaning_full": "giặt, rửa",
    "vi_meaning_short": "rửa, giặt, gội",
    "enMeaning": "to wash, clean",
    "image": "https://images.pexels.com/photos/4328899/pexels-photo-4328899.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "洗衣服",
      "洗手",
      "洗澡"
    ],
    "compounds": [
      "洗手间",
      "洗衣机"
    ],
    "synonyms": [
      "清洗"
    ],
    "antonyms": [],
    "confusableWords": "喜",
    "sentences": [
      {
        "zh": "去洗手，准备吃饭了。",
        "pinyin": "Qù xǐ shǒu, zhǔnbèi chī fàn le.",
        "vi": "Đi rửa tay đi, chuẩn bị ăn cơm rồi.",
        "tag": "Nhắc nhở vệ sinh"
      },
      {
        "zh": "今天我要洗很多衣服。",
        "pinyin": "Jīntiān wǒ yào xǐ hěn duō yīfu.",
        "vi": "Hôm nay tôi phải giặt rất nhiều quần áo.",
        "tag": "Công việc nhà"
      }
    ]
  },
  {
    "id": "10-7",
    "hanzi": "正在",
    "traditional": "正在",
    "pinyin": "zhèngzài",
    "pinyinClean": "zhengzai",
    "hanViet": "CHÍNH TẠI",
    "radical": "止",
    "strokeCount": 11,
    "hskLevel": 2,
    "lesson": 10,
    "partOfSpeech": "phó.",
    "viet": "đang (diễn ra ngay lúc này)",
    "vi_meaning_full": "đang",
    "vi_meaning_short": "đang (diễn ra ngay lúc này)",
    "enMeaning": "in the process of, in the middle of",
    "image": "https://images.pexels.com/photos/376704/pexels-photo-376704.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "正在说话",
      "正在做饭"
    ],
    "compounds": [
      "正常",
      "正式",
      "所在"
    ],
    "synonyms": [
      "正"
    ],
    "antonyms": [],
    "confusableWords": "整在",
    "sentences": [
      {
        "zh": "那个正在说话的女孩子是谁？",
        "pinyin": "Nàge zhèngzài shuōhuà de nǚháir shì shéi?",
        "vi": "Cô gái đang nói chuyện đằng kia là ai thế?",
        "tag": "Xác định người"
      },
      {
        "zh": "我正在看书呢，请别打扰我。",
        "pinyin": "Wǒ zhèngzài kàn shū ne, qǐng bié dǎrǎo wǒ.",
        "vi": "Tôi đang đọc sách, xin đừng làm phiền.",
        "tag": "Thông báo hoạt động"
      }
    ]
  },
  {
    "id": "11-6",
    "hanzi": "比",
    "traditional": "比",
    "pinyin": "bǐ",
    "pinyinClean": "bi",
    "hanViet": "TỶ",
    "radical": "比",
    "strokeCount": 4,
    "hskLevel": 2,
    "lesson": 11,
    "partOfSpeech": "giới.",
    "viet": "hơn, so với",
    "vi_meaning_full": "hơn (dùng trong cấu trúc so sánh)",
    "vi_meaning_short": "hơn, so với",
    "enMeaning": "than, compared to",
    "image": "https://images.pexels.com/photos/47040/meter-tape-measure-measure-gage-47040.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "比昨天便宜",
      "比我大"
    ],
    "compounds": [
      "比较",
      "比赛",
      "比如"
    ],
    "synonyms": [
      "比较"
    ],
    "antonyms": [],
    "confusableWords": "必, 笔",
    "sentences": [
      {
        "zh": "苹果也比昨天便宜一些。",
        "pinyin": "Píngguǒ yě bǐ zuótiān piányi yìxiē.",
        "vi": "Táo cũng rẻ hơn hôm qua một chút.",
        "tag": "So sánh giá cả"
      },
      {
        "zh": "她比我们老师小两岁。",
        "pinyin": "Tā bǐ wǒmen lǎoshī xiǎo liǎng suì.",
        "vi": "Cô ấy nhỏ hơn cô giáo chúng tôi 2 tuổi.",
        "tag": "So sánh tuổi tác"
      }
    ]
  },
  {
    "id": "11-7",
    "hanzi": "便宜",
    "traditional": "便宜",
    "pinyin": "piányi",
    "pinyinClean": "pianyi",
    "hanViet": "TIỆN NGHI",
    "radical": "亻",
    "strokeCount": 17,
    "hskLevel": 2,
    "lesson": 11,
    "partOfSpeech": "tt.",
    "viet": "rẻ, giá cả hợp lý",
    "vi_meaning_full": "rẻ",
    "vi_meaning_short": "rẻ, giá cả hợp lý",
    "enMeaning": "cheap, inexpensive",
    "image": "https://images.pexels.com/photos/3780403/pexels-photo-3780403.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "很便宜",
      "便宜一点儿"
    ],
    "compounds": [
      "方便",
      "便宜"
    ],
    "synonyms": [
      "廉价"
    ],
    "antonyms": [
      "贵"
    ],
    "confusableWords": "便 (biàn)",
    "sentences": [
      {
        "zh": "苹果比昨天便宜一些。",
        "pinyin": "Píngguǒ bǐ zuótiān piányi yìxiē.",
        "vi": "Táo rẻ hơn hôm qua một ít.",
        "tag": "So sánh mua sắm"
      },
      {
        "zh": "太贵了，能便宜点儿吗？",
        "pinyin": "Tài guì le, néng piányi diǎnr ma?",
        "vi": "Đắt quá, có thể bớt/rẻ chút không?",
        "tag": "Mặc cả giá"
      }
    ]
  },
  {
    "id": "11-1",
    "hanzi": "唱歌",
    "traditional": "唱歌",
    "pinyin": "chàng gē",
    "pinyinClean": "changge",
    "hanViet": "XƯỚNG CA",
    "radical": "口",
    "strokeCount": 21,
    "hskLevel": 2,
    "lesson": 11,
    "partOfSpeech": "đgt.",
    "viet": "hát, ca hát",
    "vi_meaning_full": "hát",
    "vi_meaning_short": "hát, ca hát",
    "enMeaning": "to sing a song",
    "image": "https://images.pexels.com/photos/2247677/pexels-photo-2247677.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "喜欢唱歌",
      "唱歌跳舞"
    ],
    "compounds": [
      "歌手",
      "歌声",
      "歌曲"
    ],
    "synonyms": [
      "演唱"
    ],
    "antonyms": [],
    "confusableWords": "跳舞",
    "sentences": [
      {
        "zh": "她唱歌唱得非常好听。",
        "pinyin": "Tā chàng gē chàng de fēicháng hǎotīng.",
        "vi": "Cô ấy hát rất hay.",
        "tag": "Khen ngợi năng khiếu"
      },
      {
        "zh": "我们去唱歌吧。",
        "pinyin": "Wǒmen qù chàng gē ba.",
        "vi": "Chúng mình đi hát karaoke đi.",
        "tag": "Đề nghị giải trí"
      }
    ]
  },
  {
    "id": "11-4",
    "hanzi": "孩子",
    "traditional": "孩子",
    "pinyin": "hái zi",
    "pinyinClean": "haizi",
    "hanViet": "HÀI TỬ",
    "radical": "子",
    "strokeCount": 12,
    "hskLevel": 2,
    "lesson": 11,
    "partOfSpeech": "dt.",
    "viet": "trẻ con, con cái",
    "vi_meaning_full": "trẻ con, trẻ em; con cái",
    "vi_meaning_short": "trẻ con, con cái",
    "enMeaning": "child, kid",
    "image": "https://images.pexels.com/photos/23441083/pexels-photo-23441083.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "小孩子",
      "男孩子",
      "女孩子"
    ],
    "compounds": [
      "女孩子",
      "男孩子"
    ],
    "synonyms": [
      "儿童"
    ],
    "antonyms": [
      "大人"
    ],
    "confusableWords": "鞋子",
    "sentences": [
      {
        "zh": "那个正在说话的女孩子是谁？",
        "pinyin": "Nàge zhèngzài shuōhuà de nǚháir shì shéi?",
        "vi": "Cô gái đang nói chuyện kia là ai?",
        "tag": "Hỏi người"
      },
      {
        "zh": "他们有两个孩子。",
        "pinyin": "Tāmen yǒu liǎng gè háizi.",
        "vi": "Họ có hai đứa con.",
        "tag": "Gia đình"
      }
    ]
  },
  {
    "id": "11-9",
    "hanzi": "可能",
    "traditional": "可能",
    "pinyin": "kěnéng",
    "pinyinClean": "keneng",
    "hanViet": "KHẢ NĂNG",
    "radical": "口",
    "strokeCount": 15,
    "hskLevel": 2,
    "lesson": 11,
    "partOfSpeech": "tdt./dt.",
    "viet": "có thể, có khả năng",
    "vi_meaning_full": "có thể, có lẽ",
    "vi_meaning_short": "có thể, có khả năng",
    "enMeaning": "maybe, possible",
    "image": "https://images.pexels.com/photos/8817675/pexels-photo-8817675.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "有可能",
      "不可能"
    ],
    "compounds": [
      "可能性",
      "功能"
    ],
    "synonyms": [
      "或许",
      "大概"
    ],
    "antonyms": [
      "不可能"
    ],
    "confusableWords": "可以",
    "sentences": [
      {
        "zh": "你可能不认识她。",
        "pinyin": "Nǐ kěnéng bù rènshi tā.",
        "vi": "Có lẽ anh không biết cô ấy đâu.",
        "tag": "Đoán chừng"
      },
      {
        "zh": "明天可能会下雪。",
        "pinyin": "Míngtiān kěnéng huì xià xuě.",
        "vi": "Ngày mai có khả năng sẽ có tuyết rơi.",
        "tag": "Dự báo thời tiết"
      }
    ]
  },
  {
    "id": "11-2",
    "hanzi": "男",
    "traditional": "男",
    "pinyin": "nán",
    "pinyinClean": "nan",
    "hanViet": "NAM",
    "radical": "田",
    "strokeCount": 7,
    "hskLevel": 2,
    "lesson": 11,
    "partOfSpeech": "tt.",
    "viet": "nam, đàn ông",
    "vi_meaning_full": "thuộc về nam giới",
    "vi_meaning_short": "nam, đàn ông",
    "enMeaning": "male, man",
    "image": "https://images.pexels.com/photos/14807454/pexels-photo-14807454.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "男人",
      "男朋友",
      "男孩"
    ],
    "compounds": [
      "男生",
      "男人",
      "男朋友"
    ],
    "synonyms": [
      "男性"
    ],
    "antonyms": [
      "女"
    ],
    "confusableWords": "难",
    "sentences": [
      {
        "zh": "他不是有男朋友吗？",
        "pinyin": "Tā bú shì yǒu nánpéngyou ma?",
        "vi": "Chẳng phải cô ấy có bạn trai rồi sao?",
        "tag": "Hỏi về tình cảm"
      },
      {
        "zh": "我们班有十个男学生。",
        "pinyin": "Wǒmen bān yǒu shí gè nán xuésheng.",
        "vi": "Lớp chúng tôi có 10 học sinh nam.",
        "tag": "Thống kê sĩ số"
      }
    ]
  },
  {
    "id": "11-3",
    "hanzi": "女",
    "traditional": "女",
    "pinyin": "nǚ",
    "pinyinClean": "nu",
    "hanViet": "NỮ",
    "radical": "女",
    "strokeCount": 3,
    "hskLevel": 2,
    "lesson": 11,
    "partOfSpeech": "tt.",
    "viet": "nữ, con gái",
    "vi_meaning_full": "thuộc về nữ giới",
    "vi_meaning_short": "nữ, con gái",
    "enMeaning": "female, woman",
    "image": "https://images.pexels.com/photos/20238229/pexels-photo-20238229.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "女人",
      "女朋友",
      "女孩"
    ],
    "compounds": [
      "女生",
      "女人",
      "女儿"
    ],
    "synonyms": [
      "女性"
    ],
    "antonyms": [
      "男"
    ],
    "confusableWords": "怒",
    "sentences": [
      {
        "zh": "那个正在说话的女孩子是谁？",
        "pinyin": "Nàge zhèngzài shuōhuà de nǚháir shì shéi?",
        "vi": "Cô gái đang nói chuyện đằng kia là ai?",
        "tag": "Hỏi thông tin người"
      },
      {
        "zh": "这是我女儿的房间。",
        "pinyin": "Zhè shì wǒ nǚ'ér de fángjiān.",
        "vi": "Đây là phòng của con gái tôi.",
        "tag": "Giới thiệu nhà"
      }
    ]
  },
  {
    "id": "hsk2-11-189",
    "hanzi": "女孩儿",
    "traditional": "女孩兒",
    "pinyin": "nǚháir",
    "pinyinClean": "nuhair",
    "hanViet": "NỮ HÀI",
    "radical": "女",
    "strokeCount": 11,
    "hskLevel": 2,
    "lesson": 11,
    "partOfSpeech": "dt.",
    "viet": "cô gái, bé gái",
    "vi_meaning_full": "bé gái, cô gái",
    "vi_meaning_short": "cô gái, bé gái",
    "enMeaning": "girl",
    "image": "https://images.pexels.com/photos/14137881/pexels-photo-14137881.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "那个女孩儿",
      "爱笑的女孩儿"
    ],
    "compounds": [
      "女儿",
      "孩子"
    ],
    "synonyms": [
      "女生"
    ],
    "antonyms": [
      "男孩儿"
    ],
    "confusableWords": "男孩儿",
    "sentences": [
      {
        "zh": "那个正在说话的女孩子是谁？",
        "pinyin": "Nàge zhèngzài shuōhuà de nǚháir shì shéi?",
        "vi": "Cô gái đang nói chuyện đằng kia là ai thế?",
        "tag": "Quan sát nhận dạng"
      },
      {
        "zh": "她是个非常开朗的女孩子。",
        "pinyin": "Tā shì gè fēicháng kāilǎng de nǚháir.",
        "vi": "Cô ấy là một cô gái vô cùng cởi mở.",
        "tag": "Khen tính cách"
      }
    ]
  },
  {
    "id": "11-10",
    "hanzi": "去年",
    "traditional": "去年",
    "pinyin": "qùnián",
    "pinyinClean": "qunian",
    "hanViet": "KHỨ NIÊN",
    "radical": "厶",
    "strokeCount": 9,
    "hskLevel": 2,
    "lesson": 11,
    "partOfSpeech": "dt.",
    "viet": "năm ngoái",
    "vi_meaning_full": "năm ngoái",
    "vi_meaning_short": "năm ngoái",
    "enMeaning": "last year",
    "image": "https://images.pexels.com/photos/4678185/pexels-photo-4678185.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "去年夏天",
      "去年买的"
    ],
    "compounds": [
      "过去",
      "去年"
    ],
    "synonyms": [
      "去岁"
    ],
    "antonyms": [
      "今年",
      "明年"
    ],
    "confusableWords": "明年",
    "sentences": [
      {
        "zh": "她是去年来的，她姓王。",
        "pinyin": "Tā shì qùnián lái de, tā xìng Wáng.",
        "vi": "Cô ấy đến vào năm ngoái, cô ấy họ Vương.",
        "tag": "Giới thiệu nhân sự"
      },
      {
        "zh": "我去年去了一次北京。",
        "pinyin": "Wǒ qùnián qù le yí cì Běijīng.",
        "vi": "Năm ngoái tôi có đi Bắc Kinh một lần.",
        "tag": "Nói về quá khứ"
      }
    ]
  },
  {
    "id": "11-8",
    "hanzi": "说话",
    "traditional": "說話",
    "pinyin": "shuō huà",
    "pinyinClean": "shuohua",
    "hanViet": "THUYẾT THOẠI",
    "radical": "言",
    "strokeCount": 22,
    "hskLevel": 2,
    "lesson": 11,
    "partOfSpeech": "đgt.",
    "viet": "nói chuyện, phát biểu",
    "vi_meaning_full": "nói chuyện",
    "vi_meaning_short": "nói chuyện, phát biểu",
    "enMeaning": "to speak, talk",
    "image": "https://images.pexels.com/photos/12179672/pexels-photo-12179672.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "说话的人",
      "别说话"
    ],
    "compounds": [
      "说明",
      "话题"
    ],
    "synonyms": [
      "交谈",
      "讲话"
    ],
    "antonyms": [
      "沉默"
    ],
    "confusableWords": "刷牙",
    "sentences": [
      {
        "zh": "说话的那个人就是我的汉语老师。",
        "pinyin": "Shuōhuà de nàge rén jiùshì wǒ de Hànyǔ lǎoshī.",
        "vi": "Người đang nói chuyện đó chính là cô giáo tiếng Trung của tôi.",
        "tag": "Nhận diện người"
      },
      {
        "zh": "我听见她说话了。",
        "pinyin": "Wǒ tīngjiàn tā shuōhuà le.",
        "vi": "Tôi nghe thấy cô ấy nói chuyện rồi.",
        "tag": "Thông tin thính giác"
      }
    ]
  },
  {
    "id": "11-11",
    "hanzi": "姓",
    "traditional": "姓",
    "pinyin": "xìng",
    "pinyinClean": "xing",
    "hanViet": "TÍNH",
    "radical": "女",
    "strokeCount": 8,
    "hskLevel": 2,
    "lesson": 11,
    "partOfSpeech": "đgt./dt.",
    "viet": "họ là, mang họ, họ tên",
    "vi_meaning_full": "mang họ; họ",
    "vi_meaning_short": "họ là, mang họ, họ tên",
    "enMeaning": "surname, family name",
    "image": "https://images.pexels.com/photos/819810/pexels-photo-819810.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "您贵姓",
      "我姓王"
    ],
    "compounds": [
      "姓名",
      "姓氏"
    ],
    "synonyms": [
      "姓名"
    ],
    "antonyms": [],
    "confusableWords": "性",
    "sentences": [
      {
        "zh": "我知道她的名字，她姓杨，叫杨笑笑。",
        "pinyin": "Wǒ zhīdào tā de míngzi, tā xìng Yáng, jiào Yáng Xiàoxiao.",
        "vi": "Tôi biết tên cô ấy, cô ấy họ Dương, tên là Dương Tiếu Tiếu.",
        "tag": "Giới thiệu họ tên"
      },
      {
        "zh": "请问您贵姓？我姓张。",
        "pinyin": "Qǐngwèn nín guìxìng? Wǒ xìng Zhāng.",
        "vi": "Xin hỏi quý danh họ gì? Tôi họ Trương.",
        "tag": "Giao tiếp lịch sự"
      }
    ]
  },
  {
    "id": "11-5",
    "hanzi": "右边",
    "traditional": "右邊",
    "pinyin": "yòubian",
    "pinyinClean": "youbian",
    "hanViet": "HỮU BIÊN",
    "radical": "口",
    "strokeCount": 10,
    "hskLevel": 2,
    "lesson": 11,
    "partOfSpeech": "dt.",
    "viet": "phía bên phải",
    "vi_meaning_full": "bên phải",
    "vi_meaning_short": "phía bên phải",
    "enMeaning": "right side",
    "image": "https://images.pexels.com/photos/15556082/pexels-photo-15556082.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "往右",
      "在右边"
    ],
    "compounds": [
      "右手",
      "右转"
    ],
    "synonyms": [
      "右侧"
    ],
    "antonyms": [
      "左边"
    ],
    "confusableWords": "又",
    "sentences": [
      {
        "zh": "到了前面的路口再往右走。",
        "pinyin": "Dào le qiánmiàn de lùkǒu zài wǎng yòu zǒu.",
        "vi": "Đến giao lộ phía trước thì rẽ về bên phải.",
        "tag": "Chỉ đường"
      },
      {
        "zh": "右边那个穿着红衣服的人是我的姐姐。",
        "pinyin": "Yòubian nàge chuān zhe hóng yīfu de rén shì wǒ de jiějie.",
        "vi": "Người mặc áo đỏ bên phải là chị gái tôi.",
        "tag": "Xác định vị trí người"
      }
    ]
  },
  {
    "id": "12-6",
    "hanzi": "穿",
    "traditional": "穿",
    "pinyin": "chuān",
    "pinyinClean": "chuan",
    "hanViet": "XUYÊN",
    "radical": "穴",
    "strokeCount": 9,
    "hskLevel": 2,
    "lesson": 12,
    "partOfSpeech": "đgt.",
    "viet": "mặc (áo quần), đi (giày)",
    "vi_meaning_full": "mặc, mang",
    "vi_meaning_short": "mặc (áo quần), đi (giày)",
    "enMeaning": "to wear, put on",
    "image": "https://images.pexels.com/photos/16206291/pexels-photo-16206291.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "穿衣服",
      "穿鞋",
      "穿得少"
    ],
    "compounds": [
      "穿戴",
      "穿过"
    ],
    "synonyms": [
      "戴"
    ],
    "antonyms": [
      "脱"
    ],
    "confusableWords": "川",
    "sentences": [
      {
        "zh": "你穿得太少了。",
        "pinyin": "Nǐ chuān de tài shǎo le.",
        "vi": "Anh mặc ít quần áo quá.",
        "tag": "Nhắc nhở sức khỏe"
      },
      {
        "zh": "今天天气冷，多穿一点儿。",
        "pinyin": "Jīntiān tiānqì lěng, duō chuān yìdiǎnr.",
        "vi": "Hôm nay trời lạnh, mặc nhiều áo vào một chút.",
        "tag": "Quan tâm"
      }
    ]
  },
  {
    "id": "12-1",
    "hanzi": "得",
    "traditional": "得",
    "pinyin": "de",
    "pinyinClean": "de",
    "hanViet": "ĐẮC",
    "radical": "彳",
    "strokeCount": 11,
    "hskLevel": 2,
    "lesson": 12,
    "partOfSpeech": "trợ.",
    "viet": "đến mức, được",
    "vi_meaning_full": "được dùng sau động từ hay tính từ, theo sau 得 là bổ ngữ chỉ kết quả hay mức độ",
    "vi_meaning_short": "đến mức, được",
    "enMeaning": "structural particle for complement of degree",
    "image": "https://images.pexels.com/photos/29520198/pexels-photo-29520198.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "跑得快",
      "玩得高兴",
      "听得懂"
    ],
    "compounds": [
      "得到",
      "使得"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "的, 地",
    "sentences": [
      {
        "zh": "我觉得听和说还可以，读和写不好。",
        "pinyin": "Wǒ juéde tīng hé shuō hái kěyǐ, dú hé xiě bù hǎo.",
        "vi": "Tôi thấy nghe và nói còn tạm được, đọc và viết không tốt.",
        "tag": "Đánh giá khả năng"
      },
      {
        "zh": "她笑得非常开心。",
        "pinyin": "Tā xiào de fēicháng kāixīn.",
        "vi": "Cô ấy cười rất vui vẻ.",
        "tag": "Miêu tả trạng thái"
      }
    ]
  },
  {
    "id": "12-8",
    "hanzi": "弟弟",
    "traditional": "弟弟",
    "pinyin": "dìdi",
    "pinyinClean": "didi",
    "hanViet": "ĐỆ ĐỆ",
    "radical": "弓",
    "strokeCount": 14,
    "hskLevel": 2,
    "lesson": 12,
    "partOfSpeech": "dt.",
    "viet": "em trai",
    "vi_meaning_full": "em trai",
    "vi_meaning_short": "em trai",
    "enMeaning": "younger brother",
    "image": "https://images.pexels.com/photos/590472/pexels-photo-590472.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "我弟弟",
      "弟弟妹妹"
    ],
    "compounds": [
      "兄弟",
      "弟弟"
    ],
    "synonyms": [],
    "antonyms": [
      "哥哥"
    ],
    "confusableWords": "梯梯",
    "sentences": [
      {
        "zh": "我弟弟今年上大学。",
        "pinyin": "Wǒ dìdi jīnnián shàng dàxué.",
        "vi": "Em trai tôi năm nay lên đại học.",
        "tag": "Giới thiệu gia đình"
      },
      {
        "zh": "这是我弟弟的衬衫。",
        "pinyin": "Zhè shì wǒ dìdi de chènshān.",
        "vi": "Đây là áo sơ mi của em trai tôi.",
        "tag": "Sở hữu"
      }
    ]
  },
  {
    "id": "12-5",
    "hanzi": "度",
    "traditional": "度",
    "pinyin": "du",
    "pinyinClean": "du",
    "hanViet": "ĐỘ",
    "radical": "广",
    "strokeCount": 9,
    "hskLevel": 2,
    "lesson": 12,
    "partOfSpeech": "dt.",
    "viet": "độ, mức độ",
    "vi_meaning_full": "độ (đơn vị đo nhiệt độ)",
    "vi_meaning_short": "độ, mức độ",
    "enMeaning": "degree (temperature)",
    "image": "https://images.pexels.com/photos/7541123/pexels-photo-7541123.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "零下三度",
      "三十六度"
    ],
    "compounds": [
      "温度",
      "态度",
      "进度"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "渡",
    "sentences": [
      {
        "zh": "今天零下三度，太冷了。",
        "pinyin": "Jīntiān língxià sān dù, tài lěng le.",
        "vi": "Hôm nay âm 3 độ, lạnh quá.",
        "tag": "Thời tiết"
      },
      {
        "zh": "水温有四十度。",
        "pinyin": "Shuǐwēn yǒu sìshí dù.",
        "vi": "Nhiệt độ nước là 40 độ.",
        "tag": "Nhiệt độ"
      }
    ]
  },
  {
    "id": "12-9",
    "hanzi": "近",
    "traditional": "近",
    "pinyin": "jìn",
    "pinyinClean": "jin",
    "hanViet": "CẬN",
    "radical": "辶",
    "strokeCount": 7,
    "hskLevel": 2,
    "lesson": 12,
    "partOfSpeech": "tt.",
    "viet": "gần (khoảng cách, thời gian)",
    "vi_meaning_full": "gần",
    "vi_meaning_short": "gần (khoảng cách, thời gian)",
    "enMeaning": "near, close",
    "image": "https://images.pexels.com/photos/36331944/pexels-photo-36331944.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "很近",
      "最近",
      "离这儿很近"
    ],
    "compounds": [
      "最近",
      "近况",
      "近代"
    ],
    "synonyms": [
      "亲近"
    ],
    "antonyms": [
      "远"
    ],
    "confusableWords": "进",
    "sentences": [
      {
        "zh": "我家离公司很近。",
        "pinyin": "Wǒ jiā lí gōngsī hěn jìn.",
        "vi": "Nhà tôi ở rất gần công ty.",
        "tag": "Miêu tả khoảng cách"
      },
      {
        "zh": "离这儿不远有一个中国饭馆，走几分钟就到了。",
        "pinyin": "Lí zhèr bù yuǎn yǒu yí gè Zhōngguó fànguǎn, zǒu jǐ fēnzhōng jiù dào le.",
        "vi": "Gần đây có một quán ăn Trung Quốc, đi vài phút là đến.",
        "tag": "Gợi ý địa điểm"
      }
    ]
  },
  {
    "id": "12-7",
    "hanzi": "进",
    "traditional": "進",
    "pinyin": "jìn",
    "pinyinClean": "jin",
    "hanViet": "TIẾN",
    "radical": "辶",
    "strokeCount": 7,
    "hskLevel": 2,
    "lesson": 12,
    "partOfSpeech": "đgt.",
    "viet": "vào, đi vào",
    "vi_meaning_full": "vào",
    "vi_meaning_short": "vào, đi vào",
    "enMeaning": "to enter, come in",
    "image": "https://images.pexels.com/photos/26508559/pexels-photo-26508559.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "请进",
      "进来",
      "进步"
    ],
    "compounds": [
      "进步",
      "进口",
      "进行"
    ],
    "synonyms": [
      "入"
    ],
    "antonyms": [
      "出",
      "退"
    ],
    "confusableWords": "近",
    "sentences": [
      {
        "zh": "门开着呢，请进。",
        "pinyin": "Mén kāi zhe ne, qǐng jìn.",
        "vi": "Cửa đang mở, mời vào.",
        "tag": "Lịch sự đón khách"
      },
      {
        "zh": "进了火车站就可以买票。",
        "pinyin": "Jìn le huǒchēzhàn jiù kěyǐ mǎi piào.",
        "vi": "Vào ga tàu hỏa là có thể mua vé.",
        "tag": "Chỉ dẫn hành động"
      }
    ]
  },
  {
    "id": "12-4",
    "hanzi": "零",
    "traditional": "零",
    "pinyin": "líng",
    "pinyinClean": "ling",
    "hanViet": "LINH",
    "radical": "雨",
    "strokeCount": 13,
    "hskLevel": 2,
    "lesson": 12,
    "partOfSpeech": "số.",
    "viet": "số 0, lẻ",
    "vi_meaning_full": "số không",
    "vi_meaning_short": "số 0, lẻ",
    "enMeaning": "zero",
    "image": "https://images.pexels.com/photos/7563555/pexels-photo-7563555.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "二零一一年",
      "零下"
    ],
    "compounds": [
      "零件",
      "零钱",
      "零售"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "铃, 羚",
    "sentences": [
      {
        "zh": "我是二零一一年来的。",
        "pinyin": "Wǒ shì èr-líng-yī-yī nián lái de.",
        "vi": "Tôi đến vào năm 2011.",
        "tag": "Nói về mốc năm"
      },
      {
        "zh": "今天零下三度，非常冷。",
        "pinyin": "Jīntiān língxià sān dù, fēicháng lěng.",
        "vi": "Hôm nay âm 3 độ, rất lạnh.",
        "tag": "Thời tiết"
      }
    ]
  },
  {
    "id": "12-2",
    "hanzi": "妻子",
    "traditional": "妻子",
    "pinyin": "qīzi",
    "pinyinClean": "qizi",
    "hanViet": "THÊ TỬ",
    "radical": "女",
    "strokeCount": 11,
    "hskLevel": 2,
    "lesson": 12,
    "partOfSpeech": "dt.",
    "viet": "người vợ, vợ",
    "vi_meaning_full": "vợ",
    "vi_meaning_short": "người vợ, vợ",
    "enMeaning": "wife",
    "image": "https://images.pexels.com/photos/14788180/pexels-photo-14788180.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "我妻子",
      "妻子儿女"
    ],
    "compounds": [
      "夫妻",
      "妻子"
    ],
    "synonyms": [
      "太太",
      "老婆"
    ],
    "antonyms": [
      "丈夫"
    ],
    "confusableWords": "欺负",
    "sentences": [
      {
        "zh": "我和我妻子都喜欢旅游。",
        "pinyin": "Wǒ hé wǒ qīzi dōu xǐhuan lǚyóu.",
        "vi": "Tôi và vợ tôi đều thích đi du lịch.",
        "tag": "Gia đình"
      },
      {
        "zh": "他妻子在医院工作。",
        "pinyin": "Tā qīzi zài yīyuàn gōngzuò.",
        "vi": "Vợ anh ấy làm việc ở bệnh viện.",
        "tag": "Giới thiệu thân nhân"
      }
    ]
  },
  {
    "id": "hsk1-12-7",
    "hanzi": "身体",
    "traditional": "身體",
    "pinyin": "shēntǐ",
    "pinyinClean": "shenti",
    "hanViet": "THÂN THỂ",
    "radical": "身",
    "strokeCount": 14,
    "hskLevel": 2,
    "lesson": 12,
    "partOfSpeech": "dt.",
    "viet": "sức khỏe, cơ thể",
    "vi_meaning_full": "sức khỏe, cơ thể",
    "vi_meaning_short": "sức khỏe, cơ thể",
    "enMeaning": "body, health",
    "image": "https://images.pexels.com/photos/14236897/pexels-photo-14236897.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "身体好",
      "检查身体"
    ],
    "compounds": [
      "身高",
      "体温",
      "体验"
    ],
    "synonyms": [
      "健康"
    ],
    "antonyms": [],
    "confusableWords": "神态",
    "sentences": [
      {
        "zh": "喝咖啡多了对身体不好。",
        "pinyin": "Hē kāfēi duō le duì shēntǐ bù hǎo.",
        "vi": "Uống nhiều cà phê không tốt cho sức khỏe.",
        "tag": "Khuyên bảo"
      },
      {
        "zh": "祝你身体健康！",
        "pinyin": "Zhù nǐ shēntǐ jiànkāng!",
        "vi": "Chúc bạn sức khỏe dồi dào!",
        "tag": "Lời chúc sức khỏe"
      }
    ]
  },
  {
    "id": "hsk2-12-191",
    "hanzi": "洗手",
    "traditional": "洗手",
    "pinyin": "xǐ shǒu",
    "pinyinClean": "xishou",
    "hanViet": "TẨY THỦ",
    "radical": "氵",
    "strokeCount": 13,
    "hskLevel": 2,
    "lesson": 12,
    "partOfSpeech": "cụm đgt.",
    "viet": "rửa tay",
    "vi_meaning_full": "rửa tay",
    "vi_meaning_short": "rửa tay",
    "enMeaning": "to wash hands",
    "image": "https://images.pexels.com/photos/4031827/pexels-photo-4031827.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "去洗手",
      "洗手间"
    ],
    "compounds": [
      "洗手间",
      "洗衣服"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "洗脸",
    "sentences": [
      {
        "zh": "饭前便后要洗手。",
        "pinyin": "Fàn qián biàn hòu yào xǐ shǒu.",
        "vi": "Trước khi ăn và sau khi đi vệ sinh phải rửa tay.",
        "tag": "Vệ sinh"
      },
      {
        "zh": "请问洗手间在哪儿？我想去洗手。",
        "pinyin": "Qǐngwèn xǐshǒujiān zài nǎr? Wǒ xiǎng qù xǐ shǒu.",
        "vi": "Xin hỏi nhà vệ sinh ở đâu? Tôi muốn đi rửa tay.",
        "tag": "Lịch sự nhờ vả"
      }
    ]
  },
  {
    "id": "12-3",
    "hanzi": "雪",
    "traditional": "雪",
    "pinyin": "xuě",
    "pinyinClean": "xue",
    "hanViet": "TUYẾT",
    "radical": "雨",
    "strokeCount": 11,
    "hskLevel": 2,
    "lesson": 12,
    "partOfSpeech": "dt.",
    "viet": "tuyết, trận tuyết",
    "vi_meaning_full": "tuyết",
    "vi_meaning_short": "tuyết, trận tuyết",
    "enMeaning": "snow",
    "image": "https://images.pexels.com/photos/11255800/pexels-photo-11255800.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "下雪",
      "雪人",
      "滑雪"
    ],
    "compounds": [
      "雪花",
      "雪人",
      "下雪"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "血",
    "sentences": [
      {
        "zh": "外面下雪了，天气非常冷。",
        "pinyin": "Wàimian xià xuě le, tiānqì fēicháng lěng.",
        "vi": "Bên ngoài có tuyết rơi rồi, thời tiết rất lạnh.",
        "tag": "Thông báo thời tiết"
      },
      {
        "zh": "我们去外面堆雪人吧！",
        "pinyin": "Wǒmen qù wàimian duī xuěrén ba!",
        "vi": "Chúng mình ra ngoài đắp người tuyết đi!",
        "tag": "Đề nghị chơi đùa"
      }
    ]
  },
  {
    "id": "hsk1-13-10",
    "hanzi": "吧",
    "traditional": "吧",
    "pinyin": "ba",
    "pinyinClean": "ba",
    "hanViet": "BA",
    "radical": "口",
    "strokeCount": 7,
    "hskLevel": 2,
    "lesson": 13,
    "partOfSpeech": "trợ.",
    "viet": "nhé, nha",
    "vi_meaning_full": "được dùng ở cuối câu để chỉ sự thương lượng, lời đề nghị, thỉnh cầu hay mệnh lệnh",
    "vi_meaning_short": "nhé, nha",
    "enMeaning": "modal particle for suggestion or request",
    "image": "https://images.pexels.com/photos/19568315/pexels-photo-19568315.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "走吧",
      "吃吧",
      "好吧"
    ],
    "compounds": [
      "好吧",
      "走吧"
    ],
    "synonyms": [
      "啊",
      "呢"
    ],
    "antonyms": [],
    "confusableWords": "爸, 把",
    "sentences": [
      {
        "zh": "我们一起去吧。",
        "pinyin": "Wǒmen yìqǐ qù ba.",
        "vi": "Chúng ta cùng đi nhé.",
        "tag": "Rủ rê, đề nghị"
      },
      {
        "zh": "就做你爱吃的鱼吧。",
        "pinyin": "Jiù zuò nǐ ài chī de yú ba.",
        "vi": "Thì nấu món cá mà anh thích ăn thôi.",
        "tag": "Thương lượng"
      }
    ]
  },
  {
    "id": "13-5",
    "hanzi": "班",
    "traditional": "班",
    "pinyin": "bān",
    "pinyinClean": "ban",
    "hanViet": "BAN",
    "radical": "王",
    "strokeCount": 10,
    "hskLevel": 2,
    "lesson": 13,
    "partOfSpeech": "dt.",
    "viet": "lớp học, ca làm",
    "vi_meaning_full": "lớp",
    "vi_meaning_short": "lớp học, ca làm",
    "enMeaning": "class, shift",
    "image": "https://images.pexels.com/photos/17824828/pexels-photo-17824828.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "我们班",
      "上班"
    ],
    "compounds": [
      "班级",
      "班长",
      "上班"
    ],
    "synonyms": [
      "班级"
    ],
    "antonyms": [],
    "confusableWords": "搬",
    "sentences": [
      {
        "zh": "就是我们班那个长着两个大眼睛的女孩子。",
        "pinyin": "Jiùshì wǒmen bān nàge zhǎng zhe liǎng gè dà yǎnjing de nǚháir.",
        "vi": "Chính là cô gái mắt to trong lớp chúng mình đó.",
        "tag": "Xác định bạn học"
      },
      {
        "zh": "我们班有二十个学生。",
        "pinyin": "Wǒmen bān yǒu èrshí gè xuésheng.",
        "vi": "Lớp chúng tôi có 20 học sinh.",
        "tag": "Sĩ số lớp"
      }
    ]
  },
  {
    "id": "13-8",
    "hanzi": "宾馆",
    "traditional": "賓館",
    "pinyin": "bīnguǎn",
    "pinyinClean": "binguan",
    "hanViet": "TÂN QUÁN",
    "radical": "宀",
    "strokeCount": 20,
    "hskLevel": 2,
    "lesson": 13,
    "partOfSpeech": "dt.",
    "viet": "khách sạn",
    "vi_meaning_full": "khách sạn",
    "vi_meaning_short": "khách sạn",
    "enMeaning": "hotel",
    "image": "https://images.pexels.com/photos/20885752/pexels-photo-20885752.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "住宾馆",
      "宾馆门前"
    ],
    "compounds": [
      "宾馆",
      "宾客",
      "饭馆"
    ],
    "synonyms": [
      "饭店",
      "酒店"
    ],
    "antonyms": [],
    "confusableWords": "馆, 饭馆",
    "sentences": [
      {
        "zh": "这儿离新京宾馆远吗？",
        "pinyin": "Zhèr lí Xīnjīng Bīnguǎn yuǎn ma?",
        "vi": "Cho tôi hỏi ở đây có xa khách sạn Tân Kinh không?",
        "tag": "Hỏi đường"
      },
      {
        "zh": "我们在宾馆门前等他。",
        "pinyin": "Wǒmen zài bīnguǎn ménqián děng tā.",
        "vi": "Chúng tôi đợi anh ấy trước cửa khách sạn.",
        "tag": "Địa điểm hẹn"
      }
    ]
  },
  {
    "id": "hsk1-13-8",
    "hanzi": "给",
    "traditional": "給",
    "pinyin": "gěi",
    "pinyinClean": "gei",
    "hanViet": "CẤP",
    "radical": "纟",
    "strokeCount": 9,
    "hskLevel": 2,
    "lesson": 13,
    "partOfSpeech": "giới./đgt.",
    "viet": "cho, đưa cho",
    "vi_meaning_full": "(được dùng sau động từ) cho; đưa cho",
    "vi_meaning_short": "cho, đưa cho",
    "enMeaning": "to give, to, for",
    "image": "https://images.pexels.com/photos/14197884/pexels-photo-14197884.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "给你",
      "给他打电话",
      "送给"
    ],
    "compounds": [
      "交给",
      "给予"
    ],
    "synonyms": [
      "递"
    ],
    "antonyms": [
      "拿"
    ],
    "confusableWords": "急",
    "sentences": [
      {
        "zh": "给你，这是你的杯子。",
        "pinyin": "Gěi nǐ, zhè shì nǐ de bēizi.",
        "vi": "Cho bạn này, đây là cái ly của bạn.",
        "tag": "Đưa đồ vật"
      },
      {
        "zh": "王老师让我给你打个电话。",
        "pinyin": "Wáng lǎoshī ràng wǒ gěi nǐ dǎ gè diànhuà.",
        "vi": "Cô Vương bảo mình gọi điện cho cậu.",
        "tag": "Nhắn tin điện thoại"
      }
    ]
  },
  {
    "id": "13-11",
    "hanzi": "路口",
    "traditional": "路口",
    "pinyin": "lùkǒu",
    "pinyinClean": "lukou",
    "hanViet": "LỘ KHẨU",
    "radical": "足",
    "strokeCount": 16,
    "hskLevel": 2,
    "lesson": 13,
    "partOfSpeech": "dt.",
    "viet": "ngã tư, giao lộ, đầu đường",
    "vi_meaning_full": "giao lộ",
    "vi_meaning_short": "ngã tư, giao lộ, đầu đường",
    "enMeaning": "intersection, crossing",
    "image": "https://images.pexels.com/photos/938582/pexels-photo-938582.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "到了路口",
      "前面路口"
    ],
    "compounds": [
      "马路",
      "进口",
      "出口"
    ],
    "synonyms": [
      "十字路口"
    ],
    "antonyms": [],
    "confusableWords": "路过",
    "sentences": [
      {
        "zh": "到了前面的路口再往右走。",
        "pinyin": "Dào le qiánmiàn de lùkǒu zài wǎng yòu zǒu.",
        "vi": "Đến giao lộ phía trước thì rẽ phải.",
        "tag": "Chỉ đường"
      },
      {
        "zh": "我们在路口等红绿灯。",
        "pinyin": "Wǒmen zài lùkǒu děng hónglǜdēng.",
        "vi": "Chúng tôi đợi đèn xanh đèn đỏ ở ngã tư.",
        "tag": "Giao thông"
      }
    ]
  },
  {
    "id": "13-3",
    "hanzi": "拿",
    "traditional": "拿",
    "pinyin": "ná",
    "pinyinClean": "na",
    "hanViet": "NÃ",
    "radical": "手",
    "strokeCount": 10,
    "hskLevel": 2,
    "lesson": 13,
    "partOfSpeech": "đgt.",
    "viet": "cầm, nắm, lấy",
    "vi_meaning_full": "cầm",
    "vi_meaning_short": "cầm, nắm, lấy",
    "enMeaning": "to hold, take",
    "image": "https://images.pexels.com/photos/6287505/pexels-photo-6287505.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "拿着",
      "拿书",
      "拿铅笔"
    ],
    "compounds": [
      "拿走",
      "拿定"
    ],
    "synonyms": [
      "握",
      "抓"
    ],
    "antonyms": [
      "放"
    ],
    "confusableWords": "哪",
    "sentences": [
      {
        "zh": "那个手里拿着铅笔的女孩子是谁？",
        "pinyin": "Nàge shǒulǐ ná zhe qiānbǐ de nǚháir shì shéi?",
        "vi": "Cô gái cầm cây bút chì trong tay đằng kia là ai thế?",
        "tag": "Quan sát"
      },
      {
        "zh": "帮我拿一下那本书，谢谢。",
        "pinyin": "Bāng wǒ ná yíxià nà běn shū, xièxie.",
        "vi": "Cầm giúp tôi quyển sách đó một chút, cảm ơn.",
        "tag": "Nhờ vả"
      }
    ]
  },
  {
    "id": "hsk2-13-186",
    "hanzi": "哪边",
    "traditional": "哪邊",
    "pinyin": "nǎbiān",
    "pinyinClean": "nabian",
    "hanViet": "NẢ BIÊN",
    "radical": "口",
    "strokeCount": 16,
    "hskLevel": 2,
    "lesson": 13,
    "partOfSpeech": "đại từ",
    "viet": "bên nào, phía nào",
    "vi_meaning_full": "phía nào, bên nào",
    "vi_meaning_short": "bên nào, phía nào",
    "enMeaning": "which side, where",
    "image": "https://images.pexels.com/photos/2801126/pexels-photo-2801126.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "在哪边"
    ],
    "compounds": [
      "哪儿",
      "哪个"
    ],
    "synonyms": [
      "哪儿"
    ],
    "antonyms": [
      "这边",
      "那边"
    ],
    "confusableWords": "那边",
    "sentences": [
      {
        "zh": "请问洗手间在哪边？",
        "pinyin": "Qǐngwèn xǐshǒujiān zài nǎbiān?",
        "vi": "Xin hỏi nhà vệ sinh ở bên nào?",
        "tag": "Hỏi đường"
      },
      {
        "zh": "你看哪边人比较多？",
        "pinyin": "Nǐ kàn nǎbiān rén bǐjiào duō?",
        "vi": "Bạn xem bên nào đông người hơn?",
        "tag": "So sánh quan sát"
      }
    ]
  },
  {
    "id": "hsk2-13-187",
    "hanzi": "那边",
    "traditional": "那邊",
    "pinyin": "nàbiān",
    "pinyinClean": "nabian",
    "hanViet": "NA BIÊN",
    "radical": "阝",
    "strokeCount": 13,
    "hskLevel": 2,
    "lesson": 13,
    "partOfSpeech": "đại từ",
    "viet": "bên đó, chỗ kia",
    "vi_meaning_full": "phía đó, bên đó",
    "vi_meaning_short": "bên đó, chỗ kia",
    "enMeaning": "over there, that side",
    "image": "https://images.pexels.com/photos/9972849/pexels-photo-9972849.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "在那边"
    ],
    "compounds": [
      "那里",
      "那个"
    ],
    "synonyms": [
      "那里"
    ],
    "antonyms": [
      "这边"
    ],
    "confusableWords": "这边",
    "sentences": [
      {
        "zh": "图书馆就在那边，你往前走就到了。",
        "pinyin": "Túshūguǎn jiù zài nàbiān, nǐ wǎng qián zǒu jiù dào le.",
        "vi": "Thư viện ở ngay bên đó, bạn đi thẳng là tới.",
        "tag": "Chỉ đường"
      },
      {
        "zh": "那边的人非常多。",
        "pinyin": "Nàbiān de rén fēicháng duō.",
        "vi": "Chỗ bên kia cực kỳ đông người.",
        "tag": "Thông tin vị trí"
      }
    ]
  },
  {
    "id": "13-4",
    "hanzi": "铅笔",
    "traditional": "鉛筆",
    "pinyin": "qiānbǐ",
    "pinyinClean": "qianbi",
    "hanViet": "DUYÊN BÚT",
    "radical": "金",
    "strokeCount": 20,
    "hskLevel": 2,
    "lesson": 13,
    "partOfSpeech": "dt.",
    "viet": "cây bút chì",
    "vi_meaning_full": "bút chì",
    "vi_meaning_short": "cây bút chì",
    "enMeaning": "pencil",
    "image": "https://images.pexels.com/photos/18889469/pexels-photo-18889469.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "用铅笔",
      "拿铅笔"
    ],
    "compounds": [
      "毛笔",
      "钢笔",
      "笔盒"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "钱",
    "sentences": [
      {
        "zh": "那个手里拿着铅笔的女孩子是谁？",
        "pinyin": "Nàge shǒulǐ ná zhe qiānbǐ de nǚháir shì shéi?",
        "vi": "Cô gái đang cầm cây bút chì trong tay là ai?",
        "tag": "Quan sát miêu tả"
      },
      {
        "zh": "我可以用一下你的铅笔吗？",
        "pinyin": "Wǒ kěyǐ yòng yíxià nǐ de qiānbǐ ma?",
        "vi": "Tôi dùng nhờ cây bút chì của bạn một chút được không?",
        "tag": "Hỏi mượn đồ"
      }
    ]
  },
  {
    "id": "13-2",
    "hanzi": "手",
    "traditional": "手",
    "pinyin": "shǒu",
    "pinyinClean": "shou",
    "hanViet": "THỦ",
    "radical": "手",
    "strokeCount": 4,
    "hskLevel": 2,
    "lesson": 13,
    "partOfSpeech": "dt.",
    "viet": "bàn tay, tay",
    "vi_meaning_full": "tay",
    "vi_meaning_short": "bàn tay, tay",
    "enMeaning": "hand",
    "image": "https://images.pexels.com/photos/1454797/pexels-photo-1454797.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "洗手",
      "手里拿着"
    ],
    "compounds": [
      "手表",
      "手机",
      "手套"
    ],
    "synonyms": [
      "双手"
    ],
    "antonyms": [
      "脚"
    ],
    "confusableWords": "首",
    "sentences": [
      {
        "zh": "那个手里拿着铅笔的女孩子是谁？",
        "pinyin": "Nàge shǒulǐ ná zhe qiānbǐ de nǚháir shì shéi?",
        "vi": "Cô gái đang cầm cây bút chì trong tay đằng kia là ai thế?",
        "tag": "Miêu tả hình ảnh"
      },
      {
        "zh": "饭前要洗手。",
        "pinyin": "Fàn qián yào xǐ shǒu.",
        "vi": "Trước khi ăn cơm phải rửa tay.",
        "tag": "Vệ sinh"
      }
    ]
  },
  {
    "id": "13-10",
    "hanzi": "往",
    "traditional": "往",
    "pinyin": "wǎng",
    "pinyinClean": "wang",
    "hanViet": "VÃNG",
    "radical": "彳",
    "strokeCount": 8,
    "hskLevel": 2,
    "lesson": 13,
    "partOfSpeech": "giới.",
    "viet": "về hướng, hướng về",
    "vi_meaning_full": "về phía",
    "vi_meaning_short": "về hướng, hướng về",
    "enMeaning": "towards, to",
    "image": "https://images.pexels.com/photos/5764281/pexels-photo-5764281.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "往前走",
      "往右拐"
    ],
    "compounds": [
      "以往",
      "来往",
      "往常"
    ],
    "synonyms": [
      "向",
      "朝"
    ],
    "antonyms": [],
    "confusableWords": "网",
    "sentences": [
      {
        "zh": "从这儿一直往前走，到了前面路口再往右走。",
        "pinyin": "Cóng zhèr yìzhí wǎng qián zǒu, dào le qiánmiàn lùkǒu zài wǎng yòu zǒu.",
        "vi": "Từ đây đi thẳng về phía trước, đến giao lộ thì rẽ phải.",
        "tag": "Hướng dẫn đường"
      },
      {
        "zh": "往左看，那是我们的学校。",
        "pinyin": "Wǎng zuǒ kàn, nà shì wǒmen de xuéxiào.",
        "vi": "Nhìn về bên trái kìa, đó là trường học của chúng tôi.",
        "tag": "Chỉ hướng quan sát"
      }
    ]
  },
  {
    "id": "13-7",
    "hanzi": "笑",
    "traditional": "笑",
    "pinyin": "xiào",
    "pinyinClean": "xiao",
    "hanViet": "TIẾU",
    "radical": "竹",
    "strokeCount": 10,
    "hskLevel": 2,
    "lesson": 13,
    "partOfSpeech": "đgt.",
    "viet": "cười, mỉm cười",
    "vi_meaning_full": "cười",
    "vi_meaning_short": "cười, mỉm cười",
    "enMeaning": "to smile, laugh",
    "image": "https://images.pexels.com/photos/8838971/pexels-photo-8838971.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "非常爱笑",
      "大笑"
    ],
    "compounds": [
      "笑容",
      "笑话"
    ],
    "synonyms": [
      "微笑"
    ],
    "antonyms": [
      "哭"
    ],
    "confusableWords": "校",
    "sentences": [
      {
        "zh": "班上那个长着两个大眼睛，非常爱笑的女孩子是谁？",
        "pinyin": "Bān shàng nàge zhǎng zhe liǎng gè dà yǎnjing, fēicháng ài xiào de nǚháir shì shéi?",
        "vi": "Cô gái mắt to và rất hay cười trong lớp là ai thế?",
        "tag": "Nhận dạng người"
      },
      {
        "zh": "她对每个人都笑 distinctly.",
        "pinyin": "Tā duì měi gè rén dōu xiào de hěn tián.",
        "vi": "Cô ấy mỉm cười rất ngọt ngào với mọi người.",
        "tag": "Khen ngợi nụ cười"
      }
    ]
  },
  {
    "id": "hsk2-13-149",
    "hanzi": "杨笑笑",
    "traditional": "楊笑笑",
    "pinyin": "Yáng Xiàoxiao",
    "pinyinClean": "yangxiaoxiao",
    "hanViet": "DƯƠNG TIẾU TIẾU",
    "radical": "木",
    "strokeCount": 27,
    "hskLevel": 2,
    "lesson": 13,
    "partOfSpeech": "dt. riêng",
    "viet": "Dương Tiếu Tiếu (tên riêng)",
    "vi_meaning_full": "Dương Tiếu Tiếu (tên người)",
    "vi_meaning_short": "Dương Tiếu Tiếu (tên riêng)",
    "enMeaning": "Yang Xiaoxiao (person name)",
    "image": "https://images.pexels.com/photos/4003769/pexels-photo-4003769.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "叫杨笑笑"
    ],
    "compounds": [
      "杨树",
      "笑脸"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "杨光",
    "sentences": [
      {
        "zh": "我知道她的名字，她姓杨，叫杨笑笑。",
        "pinyin": "Wǒ zhīdào tā de míngzi, tā xìng Yáng, jiào Yáng Xiàoxiao.",
        "vi": "Tôi biết tên cô ấy, cô ấy họ Dương, tên là Dương Tiếu Tiếu.",
        "tag": "Giới thiệu người"
      },
      {
        "zh": "杨笑笑是我的同学。",
        "pinyin": "Yáng Xiàoxiao shì wǒ de tóngxué.",
        "vi": "Dương Tiếu Tiếu là bạn học của tôi.",
        "tag": "Mối quan hệ"
      }
    ]
  },
  {
    "id": "hsk1-13-2",
    "hanzi": "也",
    "traditional": "也",
    "pinyin": "yě",
    "pinyinClean": "ye",
    "hanViet": "DÃ",
    "radical": "乙",
    "strokeCount": 3,
    "hskLevel": 2,
    "lesson": 13,
    "partOfSpeech": "phó.",
    "viet": "cũng, cũng vậy",
    "vi_meaning_full": "cũng",
    "vi_meaning_short": "cũng, cũng vậy",
    "enMeaning": "also, too",
    "image": "https://images.pexels.com/photos/2386192/pexels-photo-2386192.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "也是",
      "也可以"
    ],
    "compounds": [
      "也许",
      "也是"
    ],
    "synonyms": [
      "亦"
    ],
    "antonyms": [],
    "confusableWords": "夜",
    "sentences": [
      {
        "zh": "九月去北京天气不冷也不热。",
        "pinyin": "Jiǔ yuè qù Běijīng tiānqì bù lěng yě bú rè.",
        "vi": "Tháng 9 đi Bắc Kinh thời tiết không lạnh cũng không nóng.",
        "tag": "Miêu tả thời tiết dễ chịu"
      },
      {
        "zh": "苹果也比昨天便宜一些。",
        "pinyin": "Píngguǒ yě bǐ zuótiān piányi yìxiē.",
        "vi": "Táo cũng rẻ hơn hôm qua một chút.",
        "tag": "So sánh giá cả bổ sung"
      }
    ]
  },
  {
    "id": "13-9",
    "hanzi": "一直",
    "traditional": "一直",
    "pinyin": "yìzhí",
    "pinyinClean": "yizhi",
    "hanViet": "NHẤT TRỰC",
    "radical": "一",
    "strokeCount": 9,
    "hskLevel": 2,
    "lesson": 13,
    "partOfSpeech": "phó.",
    "viet": "luôn luôn, liên tục, thẳng",
    "vi_meaning_full": "thẳng",
    "vi_meaning_short": "luôn luôn, liên tục, thẳng",
    "enMeaning": "continuously, straight",
    "image": "https://images.pexels.com/photos/36312841/pexels-photo-36312841.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "一直往前走",
      "一直工作"
    ],
    "compounds": [
      "一直",
      "直线"
    ],
    "synonyms": [
      "始终",
      "一向"
    ],
    "antonyms": [
      "偶尔"
    ],
    "confusableWords": "一定",
    "sentences": [
      {
        "zh": "从这儿一直往前走，到了前面路口再往右走。",
        "pinyin": "Cóng zhèr yìzhí wǎng qián zǒu, dào le qiánmiàn lùkǒu zài wǎng yòu zǒu.",
        "vi": "Từ đây đi thẳng về phía trước, đến giao lộ thì rẽ phải.",
        "tag": "Chỉ đường"
      },
      {
        "zh": "他一直在这家公司工作。",
        "pinyin": "Tā yìzhí zài zhè jiā gōngsī gōngzuò.",
        "vi": "Anh ấy luôn làm việc tại công ty này.",
        "tag": "Mô tả sự kiên trì"
      }
    ]
  },
  {
    "id": "hsk2-13-195",
    "hanzi": "这边",
    "traditional": "這邊",
    "pinyin": "zhèbiān",
    "pinyinClean": "zhebian",
    "hanViet": "GIÁ BIÊN",
    "radical": "辶",
    "strokeCount": 14,
    "hskLevel": 2,
    "lesson": 13,
    "partOfSpeech": "đại từ",
    "viet": "bên này, chỗ này",
    "vi_meaning_full": "phía này, bên này",
    "vi_meaning_short": "bên này, chỗ này",
    "enMeaning": "this side, over here",
    "image": "https://images.pexels.com/photos/19285888/pexels-photo-19285888.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "在这边",
      "请这边走"
    ],
    "compounds": [
      "这里",
      "这个"
    ],
    "synonyms": [
      "这里"
    ],
    "antonyms": [
      "那边"
    ],
    "confusableWords": "那边",
    "sentences": [
      {
        "zh": "请这边走，会议室就在前面。",
        "pinyin": "Qǐng zhèbiān zǒu, huìyìshì jiù zài qiánmiàn.",
        "vi": "Xin mời đi bên này, phòng họp ở ngay phía trước.",
        "tag": "Chỉ dẫn lịch sự"
      },
      {
        "zh": "这边的人比较少，我们坐这边吧。",
        "pinyin": "Zhèbiān de rén bǐjiào shǎo, wǒmen zuò zhèbiān ba.",
        "vi": "Bên này thưa người hơn, chúng mình ngồi bên này đi.",
        "tag": "Lựa chọn chỗ"
      }
    ]
  },
  {
    "id": "13-1",
    "hanzi": "着",
    "traditional": "著",
    "pinyin": "zhe",
    "pinyinClean": "zhe",
    "hanViet": "TRỨ",
    "radical": "艹",
    "strokeCount": 11,
    "hskLevel": 2,
    "lesson": 13,
    "partOfSpeech": "trợ.",
    "viet": "đang, giữ nguyên trạng thái",
    "vi_meaning_full": "được dùng để chỉ trạng thái",
    "vi_meaning_short": "đang, giữ nguyên trạng thái",
    "enMeaning": "aspect particle indicating dynamic state",
    "image": "https://images.pexels.com/photos/13975904/pexels-photo-13975904.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "门开着呢",
      "拿着",
      "看着"
    ],
    "compounds": [
      "看着",
      "顺着",
      "跟着"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "着 (zháo)",
    "sentences": [
      {
        "zh": "门开着呢，请进。",
        "pinyin": "Mén kāi zhe ne, qǐng jìn.",
        "vi": "Cửa đang mở đấy, mời vào.",
        "tag": "Lịch sự đón khách"
      },
      {
        "zh": "那个手里拿着铅笔的女孩子是谁？",
        "pinyin": "Nàge shǒulǐ ná zhe qiānbǐ de nǚháir shì shéi?",
        "vi": "Cô gái đang cầm bút chì trong tay là ai vậy?",
        "tag": "Miêu tả hình ảnh"
      }
    ]
  },
  {
    "id": "14-7",
    "hanzi": "百",
    "traditional": "百",
    "pinyin": "bǎi",
    "pinyinClean": "bai",
    "hanViet": "BÁCH",
    "radical": "白",
    "strokeCount": 6,
    "hskLevel": 2,
    "lesson": 14,
    "partOfSpeech": "số.",
    "viet": "trăm",
    "vi_meaning_full": "một trăm, trăm",
    "vi_meaning_short": "trăm",
    "enMeaning": "hundred",
    "image": "https://images.pexels.com/photos/8366383/pexels-photo-8366383.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "一百",
      "两百",
      "百姓"
    ],
    "compounds": [
      "一百",
      "百分之",
      "百姓"
    ],
    "synonyms": [],
    "antonyms": [],
    "confusableWords": "白, 伯",
    "sentences": [
      {
        "zh": "两百块还可以，喜欢就买吧。",
        "pinyin": "Liǎng bǎi kuài hái kěyǐ, xǐhuan jiù mǎi ba.",
        "vi": "Hai trăm đồng cũng được mà, nếu em thích thì mua đi.",
        "tag": "Thương lượng giá cả"
      },
      {
        "zh": "这个学校有一百个学生。",
        "pinyin": "Zhège xuéxiào yǒu yì bǎi gè xuésheng.",
        "vi": "Trường này có một trăm học sinh.",
        "tag": "Biểu thị số lượng"
      }
    ]
  },
  {
    "id": "14-4",
    "hanzi": "次",
    "traditional": "次",
    "pinyin": "cì",
    "pinyinClean": "ci",
    "hanViet": "THỨ",
    "radical": "欠",
    "strokeCount": 6,
    "hskLevel": 2,
    "lesson": 14,
    "partOfSpeech": "lượng.",
    "viet": "lần, số lần",
    "vi_meaning_full": "lần",
    "vi_meaning_short": "lần, số lần",
    "enMeaning": "time, frequency",
    "image": "https://images.pexels.com/photos/6816369/pexels-photo-6816369.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "一次",
      "第一次",
      "上次"
    ],
    "compounds": [
      "一次",
      "再次",
      "次数"
    ],
    "synonyms": [
      "遍"
    ],
    "antonyms": [],
    "confusableWords": "刺",
    "sentences": [
      {
        "zh": "我去过北京一次。",
        "pinyin": "Wǒ qùguò Běijīng yí cì.",
        "vi": "Tôi đã đi Bắc Kinh một lần.",
        "tag": "Nói về kinh nghiệm"
      },
      {
        "zh": "这是我第一次吃羊肉。",
        "pinyin": "Zhè shì wǒ dì yī cì chī yángròu.",
        "vi": "Đây là lần đầu tiên tôi ăn thịt cừu.",
        "tag": "Trải nghiệm mới"
      }
    ]
  },
  {
    "id": "14-2",
    "hanzi": "但是",
    "traditional": "但是",
    "pinyin": "dànshì",
    "pinyinClean": "danshi",
    "hanViet": "ĐẢN THỊ",
    "radical": "亻",
    "strokeCount": 11,
    "hskLevel": 2,
    "lesson": 14,
    "partOfSpeech": "liên.",
    "viet": "nhưng, nhưng mà",
    "vi_meaning_full": "nhưng",
    "vi_meaning_short": "nhưng, nhưng mà",
    "enMeaning": "but, however",
    "image": "https://images.pexels.com/photos/32843479/pexels-photo-32843479.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "虽然...但是..."
    ],
    "compounds": [
      "但是"
    ],
    "synonyms": [
      "可是",
      "不过"
    ],
    "antonyms": [],
    "confusableWords": "不但",
    "sentences": [
      {
        "zh": "虽然是晴天，但是很冷。",
        "pinyin": "Suīrán shì qíngtiān, dànshì hěn lěng.",
        "vi": "Dù là ngày nắng ráo nhưng trời rất lạnh.",
        "tag": "Biểu thị chuyển ngoặt"
      },
      {
        "zh": "我想去，但是没有时间。",
        "pinyin": "Wǒ xiǎng qù, dànshì méiyǒu shíjiān.",
        "vi": "Tôi muốn đi nhưng không có thời gian.",
        "tag": "Giải thích lý do"
      }
    ]
  },
  {
    "id": "14-6",
    "hanzi": "晴",
    "traditional": "晴",
    "pinyin": "qíng",
    "pinyinClean": "qing",
    "hanViet": "TÌNH",
    "radical": "日",
    "strokeCount": 12,
    "hskLevel": 2,
    "lesson": 14,
    "partOfSpeech": "tt.",
    "viet": "trời nắng, hửng nắng",
    "vi_meaning_full": "có nắng, nắng ráo",
    "vi_meaning_short": "trời nắng, hửng nắng",
    "enMeaning": "sunny, clear sky",
    "image": "https://images.pexels.com/photos/39387572/pexels-photo-39387572.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "晴天",
      "晴朗"
    ],
    "compounds": [
      "晴天",
      "晴空"
    ],
    "synonyms": [
      "晴朗"
    ],
    "antonyms": [
      "阴"
    ],
    "confusableWords": "情, 请, 清",
    "sentences": [
      {
        "zh": "虽然是晴天，但是很冷。",
        "pinyin": "Suīrán shì qíngtiān, dànshì hěn lěng.",
        "vi": "Dù là ngày nắng ráo nhưng trời rất lạnh.",
        "tag": "Miêu tả thời tiết"
      },
      {
        "zh": "明天是晴天，我们可以去打篮球。",
        "pinyin": "Míngtiān shì qíngtiān, wǒmen kěyǐ qù dǎ lánqiú.",
        "vi": "Ngày mai trời nắng, chúng mình có thể đi chơi bóng rổ.",
        "tag": "Gợi ý thể thao"
      }
    ]
  },
  {
    "id": "14-3",
    "hanzi": "虽然",
    "traditional": "雖然",
    "pinyin": "suīrán",
    "pinyinClean": "suiran",
    "hanViet": "TUY NHIÊN",
    "radical": "虫",
    "strokeCount": 20,
    "hskLevel": 2,
    "lesson": 14,
    "partOfSpeech": "liên.",
    "viet": "dù rằng, mặc dù",
    "vi_meaning_full": "mặc dù, tuy",
    "vi_meaning_short": "dù rằng, mặc dù",
    "enMeaning": "although, even though",
    "image": "https://images.pexels.com/photos/938580/pexels-photo-938580.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "虽然...但是..."
    ],
    "compounds": [
      "虽然",
      "然则"
    ],
    "synonyms": [
      "尽管"
    ],
    "antonyms": [],
    "confusableWords": "所以",
    "sentences": [
      {
        "zh": "虽然是晴天，但是很冷。",
        "pinyin": "Suīrán shì qíngtiān, dànshì hěn lěng.",
        "vi": "Dù là ngày nắng ráo nhưng trời rất lạnh.",
        "tag": "Mối quan hệ nhượng bộ"
      },
      {
        "zh": "虽然很难，但我一定要学会。",
        "pinyin": "Suīrán hěn nán, dàn wǒ yí定 yào xuéhuì.",
        "vi": "Mặc dù rất khó nhưng tôi nhất định phải học bằng được.",
        "tag": "Quyết tâm"
      }
    ]
  },
  {
    "id": "hsk2-14-190",
    "hanzi": "听歌",
    "traditional": "聽歌",
    "pinyin": "tīng gē",
    "pinyinClean": "tingge",
    "hanViet": "THÍNH CA",
    "radical": "口",
    "strokeCount": 21,
    "hskLevel": 2,
    "lesson": 14,
    "partOfSpeech": "cụm đgt.",
    "viet": "nghe nhạc, nghe bài hát",
    "vi_meaning_full": "nghe nhạc",
    "vi_meaning_short": "nghe nhạc, nghe bài hát",
    "enMeaning": "to listen to songs/music",
    "image": "https://images.pexels.com/photos/3756747/pexels-photo-3756747.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "喜欢听歌",
      "戴耳机听歌"
    ],
    "compounds": [
      "唱歌",
      "歌曲"
    ],
    "synonyms": [
      "听音乐"
    ],
    "antonyms": [],
    "confusableWords": "唱歌",
    "sentences": [
      {
        "zh": "休息的时候我喜欢听歌。",
        "pinyin": "Xiūxi de shíhou wǒ xǐhuan tīng gē.",
        "vi": "Lúc nghỉ ngơi tôi thích nghe nhạc.",
        "tag": "Sở thích thư giãn"
      },
      {
        "zh": "听歌能让人心情变好。",
        "pinyin": "Tīng gē néng ràng rén xīnqíng biàn hǎo.",
        "vi": "Nghe nhạc giúp tâm trạng con người tốt lên.",
        "tag": "Lợi ích giải trí"
      }
    ]
  },
  {
    "id": "14-5",
    "hanzi": "玩儿",
    "traditional": "玩兒",
    "pinyin": "wánr",
    "pinyinClean": "wanr",
    "hanViet": "NGOẠN",
    "radical": "王",
    "strokeCount": 10,
    "hskLevel": 2,
    "lesson": 14,
    "partOfSpeech": "đgt.",
    "viet": "chơi, vui chơi",
    "vi_meaning_full": "chơi, chơi đùa",
    "vi_meaning_short": "chơi, vui chơi",
    "enMeaning": "to play, have fun",
    "image": "https://images.pexels.com/photos/25047774/pexels-photo-25047774.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "去玩儿",
      "好玩儿"
    ],
    "compounds": [
      "玩具",
      "玩乐"
    ],
    "synonyms": [
      "游玩"
    ],
    "antonyms": [],
    "confusableWords": "完",
    "sentences": [
      {
        "zh": "你明天有时间来我们家玩儿吧。",
        "pinyin": "Nǐ míngtiān yǒu shíjiān lái wǒmen jiā wánr ba.",
        "vi": "Ngày mai bạn có thời gian thì sang nhà mình chơi nhé.",
        "tag": "Lời mời thân mật"
      },
      {
        "zh": "孩子们在外面玩儿得很开心。",
        "pinyin": "Háizimen zài wàimian wánr de hěn kāixīn.",
        "vi": "Bọn trẻ chơi đùa ở bên ngoài rất vui vẻ.",
        "tag": "Trẻ em vui chơi"
      }
    ]
  },
  {
    "id": "14-1",
    "hanzi": "意思",
    "traditional": "意思",
    "pinyin": "yìsi",
    "pinyinClean": "yisi",
    "hanViet": "Ý TƯ",
    "radical": "心",
    "strokeCount": 22,
    "hskLevel": 2,
    "lesson": 14,
    "partOfSpeech": "dt.",
    "viet": "ý nghĩa, sở thích, thú vị",
    "vi_meaning_full": "nghĩa, ý nghĩa",
    "vi_meaning_short": "ý nghĩa, sở thích, thú vị",
    "enMeaning": "meaning, idea, fun",
    "image": "https://images.pexels.com/photos/20107107/pexels-photo-20107107.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "什么意思",
      "有意思"
    ],
    "compounds": [
      "有意思",
      "意见",
      "意思"
    ],
    "synonyms": [
      "含义"
    ],
    "antonyms": [],
    "confusableWords": "医生",
    "sentences": [
      {
        "zh": "我都不知道是什么意思。",
        "pinyin": "Wǒ dōu bù zhīdào shì shénme yìsi.",
        "vi": "Tôi đều không biết nghĩa là gì nữa.",
        "tag": "Thắc mắc bài học"
      },
      {
        "zh": "这个电影非常有意思。",
        "pinyin": "Zhège diànyǐng fēicháng yǒu yìsi.",
        "vi": "Bộ phim này cực kỳ thú vị.",
        "tag": "Khen ngợi giải trí"
      }
    ]
  },
  {
    "id": "hsk2-14-174",
    "hanzi": "有意思",
    "traditional": "有意思",
    "pinyin": "yǒu yìsi",
    "pinyinClean": "youyisi",
    "hanViet": "HỮU Ý TƯ",
    "radical": "月",
    "strokeCount": 26,
    "hskLevel": 2,
    "lesson": 14,
    "partOfSpeech": "cụm tt.",
    "viet": "hay, thú vị",
    "vi_meaning_full": "thú vị",
    "vi_meaning_short": "hay, thú vị",
    "enMeaning": "interesting, fun",
    "image": "https://images.pexels.com/photos/7991525/pexels-photo-7991525.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "很有意思",
      "非常有意思"
    ],
    "compounds": [
      "意思",
      "意思意思"
    ],
    "synonyms": [
      "有趣"
    ],
    "antonyms": [
      "没意思"
    ],
    "confusableWords": "没意思",
    "sentences": [
      {
        "zh": "这个电影真有意思。",
        "pinyin": "Zhège diànyǐng zhēn yǒu yìsi.",
        "vi": "Bộ phim này thật là thú vị.",
        "tag": "Đánh giá giải trí"
      },
      {
        "zh": "汉语是一门非常有意思的语言。",
        "pinyin": "Hànyǔ shì yì mén fēicháng yǒu yìsi de yǔyán.",
        "vi": "Tiếng Trung là một ngôn ngữ vô cùng thú vị.",
        "tag": "Khen ngợi học tập"
      }
    ]
  },
  {
    "id": "15-5",
    "hanzi": "大家",
    "traditional": "大家",
    "pinyin": "dàjiā",
    "pinyinClean": "dajia",
    "hanViet": "ĐẠI GIA",
    "radical": "大",
    "strokeCount": 13,
    "hskLevel": 2,
    "lesson": 15,
    "partOfSpeech": "dt.",
    "viet": "mọi người, tất cả mọi người",
    "vi_meaning_full": "mọi người",
    "vi_meaning_short": "mọi người, tất cả mọi người",
    "enMeaning": "everyone, everybody",
    "image": "https://images.pexels.com/photos/12102889/pexels-photo-12102889.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "大家着",
      "请大家",
      "大家好"
    ],
    "compounds": [
      "大家",
      "大家庭"
    ],
    "synonyms": [
      "各位",
      "所有人"
    ],
    "antonyms": [
      "个人"
    ],
    "confusableWords": "国家",
    "sentences": [
      {
        "zh": "希望我们的公司明年更好！",
        "pinyin": "Xīwàng wǒmen de gōngsī míngnián gèng hǎo!",
        "vi": "Hy vọng sang năm công ty chúng ta sẽ phát triển hơn!",
        "tag": "Chúc mừng"
      },
      {
        "zh": "大家好，我来介绍一下。",
        "pinyin": "Dàjiā hǎo, wǒ lái jièshào yíxià.",
        "vi": "Chào mọi người, tôi xin giới thiệu một chút.",
        "tag": "Chào hỏi"
      }
    ]
  },
  {
    "id": "15-6",
    "hanzi": "更",
    "traditional": "更",
    "pinyin": "gèng",
    "pinyinClean": "geng",
    "hanViet": "CANH",
    "radical": "曰",
    "strokeCount": 7,
    "hskLevel": 2,
    "lesson": 15,
    "partOfSpeech": "phó.",
    "viet": "càng, hơn",
    "vi_meaning_full": "càng, hơn nữa",
    "vi_meaning_short": "càng, hơn",
    "enMeaning": "more, even more",
    "image": "https://images.pexels.com/photos/29411109/pexels-photo-29411109.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "更好",
      "更多"
    ],
    "compounds": [
      "更加",
      "变更"
    ],
    "synonyms": [
      "更加"
    ],
    "antonyms": [],
    "confusableWords": "更 (gēng)",
    "sentences": [
      {
        "zh": "希望我们的公司明年更好！",
        "pinyin": "Xīwàng wǒmen de gōngsī míngnián gèng hǎo!",
        "vi": "Hy vọng công ty chúng ta năm sau phát triển hơn nữa!",
        "tag": "Lời chúc"
      },
      {
        "zh": "吃药以后，我感觉好多了，也更有精神了。",
        "pinyin": "Chī yào yǐhòu, wǒ gǎnjué hǎo duō le, yě gèng yǒu jīngshen le.",
        "vi": "Uống thuốc xong tôi thấy đỡ nhiều, cũng có sức hơn.",
        "tag": "Sức khỏe"
      }
    ]
  },
  {
    "id": "15-4",
    "hanzi": "火车站",
    "traditional": "火車站",
    "pinyin": "huǒchēzhàn",
    "pinyinClean": "huochezhan",
    "hanViet": "HỎA XA TRẠM",
    "radical": "火",
    "strokeCount": 18,
    "hskLevel": 2,
    "lesson": 15,
    "partOfSpeech": "dt.",
    "viet": "ga tàu hỏa, nhà ga",
    "vi_meaning_full": "ga tàu hỏa",
    "vi_meaning_short": "ga tàu hỏa, nhà ga",
    "enMeaning": "train station",
    "image": "https://images.pexels.com/photos/33928465/pexels-photo-33928465.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "去火车站",
      "火车站买票"
    ],
    "compounds": [
      "火车",
      "车站",
      "地铁站"
    ],
    "synonyms": [
      "车站"
    ],
    "antonyms": [],
    "confusableWords": "飞机场",
    "sentences": [
      {
        "zh": "明天就去火车站买票。",
        "pinyin": "Míngtiān jiù qù huǒchēzhàn mǎi piào.",
        "vi": "Ngày mai sẽ đến ga tàu hỏa mua vé.",
        "tag": "Kế hoạch chuyến đi"
      },
      {
        "zh": "火车站离这儿不远，走几分钟就到了。",
        "pinyin": "Huǒchēzhàn lí zhèr bù yuǎn, zǒu jǐ fēnzhōng jiù dào le.",
        "vi": "Ga tàu không xa đây, đi bộ vài phút là tới.",
        "tag": "Hỏi vị trí"
      }
    ]
  },
  {
    "id": "hsk2-15-182",
    "hanzi": "进站",
    "traditional": "進站",
    "pinyin": "jìn zhàn",
    "pinyinClean": "jinzhan",
    "hanViet": "TIẾN TRẠM",
    "radical": "辶",
    "strokeCount": 17,
    "hskLevel": 2,
    "lesson": 15,
    "partOfSpeech": "cụm đgt.",
    "viet": "vào ga, vào bến",
    "vi_meaning_full": "vào ga",
    "vi_meaning_short": "vào ga, vào bến",
    "enMeaning": "to enter station",
    "image": "https://images.pexels.com/photos/7251095/pexels-photo-7251095.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "火车进站了"
    ],
    "compounds": [
      "进门",
      "车站"
    ],
    "synonyms": [],
    "antonyms": [
      "出站"
    ],
    "confusableWords": "出站",
    "sentences": [
      {
        "zh": "请大家排队进站。",
        "pinyin": "Qǐng dàjiā páiduì jìnzhàn.",
        "vi": "Mời mọi người xếp hàng vào ga.",
        "tag": "Hướng dẫn trật tự"
      },
      {
        "zh": "火车马上就要进站了。",
        "pinyin": "Huǒchē mǎshàng jiùyào jìnzhàn le.",
        "vi": "Tàu hỏa sắp vào ga rồi.",
        "tag": "Thông báo nhà ga"
      }
    ]
  },
  {
    "id": "15-7",
    "hanzi": "妹妹",
    "traditional": "妹妹",
    "pinyin": "mèimei",
    "pinyinClean": "meimei",
    "hanViet": "MUỘI MUỘI",
    "radical": "女",
    "strokeCount": 8,
    "hskLevel": 2,
    "lesson": 15,
    "partOfSpeech": "dt.",
    "viet": "em gái",
    "vi_meaning_full": "em gái",
    "vi_meaning_short": "em gái",
    "enMeaning": "younger sister",
    "image": "https://images.pexels.com/photos/590472/pexels-photo-590472.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "我妹妹",
      "姊妹"
    ],
    "compounds": [
      "姐妹",
      "妹妹"
    ],
    "synonyms": [],
    "antonyms": [
      "姐姐"
    ],
    "confusableWords": "魅魅",
    "sentences": [
      {
        "zh": "你妹妹怎么还没来？",
        "pinyin": "Nǐ mèimei zěnme hái méi lái?",
        "vi": "Sao em gái cậu vẫn chưa đến vậy?",
        "tag": "Hỏi han người thân"
      },
      {
        "zh": "这是我妹妹，她比我小两岁。",
        "pinyin": "Zhè shì wǒ mèimei, tā bǐ wǒ xiǎo liǎng suì.",
        "vi": "Đây là em gái tôi, nó nhỏ hơn tôi 2 tuổi.",
        "tag": "Giới thiệu"
      }
    ]
  },
  {
    "id": "15-3",
    "hanzi": "票",
    "traditional": "票",
    "pinyin": "piào",
    "pinyinClean": "piao",
    "hanViet": "PHIẾU",
    "radical": "示",
    "strokeCount": 11,
    "hskLevel": 2,
    "lesson": 15,
    "partOfSpeech": "dt.",
    "viet": "tờ vé (xem phim, tàu, xe)",
    "vi_meaning_full": "vé",
    "vi_meaning_short": "tờ vé (xem phim, tàu, xe)",
    "enMeaning": "ticket",
    "image": "https://images.pexels.com/photos/29755921/pexels-photo-29755921.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "买票",
      "车票",
      "电影票"
    ],
    "compounds": [
      "门票",
      "车票",
      "机票"
    ],
    "synonyms": [
      "钞票"
    ],
    "antonyms": [],
    "confusableWords": "漂, 飘",
    "sentences": [
      {
        "zh": "你买票了吗？明天去火车站买票。",
        "pinyin": "Nǐ mǎi piào le ma? Míngtiān qù huǒchēzhàn mǎi piào.",
        "vi": "Bạn mua vé chưa? Ngày mai sẽ đến ga mua vé.",
        "tag": "Chuẩn bị đi lại"
      },
      {
        "zh": "我已经买好电影票了。",
        "pinyin": "Wǒ yǐjīng mǎihǎo diànyǐngpiào le.",
        "vi": "Tôi đã mua xong vé xem phim rồi.",
        "tag": "Hẹn hò"
      }
    ]
  },
  {
    "id": "15-1",
    "hanzi": "日",
    "traditional": "日",
    "pinyin": "rì",
    "pinyinClean": "ri",
    "hanViet": "NHẬT",
    "radical": "日",
    "strokeCount": 4,
    "hskLevel": 2,
    "lesson": 15,
    "partOfSpeech": "dt.",
    "viet": "ngày, mặt trời",
    "vi_meaning_full": "ngày",
    "vi_meaning_short": "ngày, mặt trời",
    "enMeaning": "day, date, sun",
    "image": "https://images.pexels.com/photos/15644350/pexels-photo-15644350.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "十二月二十日",
      "日期"
    ],
    "compounds": [
      "生日",
      "日历",
      "日光"
    ],
    "synonyms": [
      "号"
    ],
    "antonyms": [],
    "confusableWords": "目, 月",
    "sentences": [
      {
        "zh": "今天是12月20日，新年就要 arrived 了。",
        "pinyin": "Jīntiān shì shí'èr yuè èrshí rì, xīnnián jiùyào dào le.",
        "vi": "Hôm nay là ngày 20 tháng 12, năm mới sắp đến rồi.",
        "tag": "Thông báo thời gian"
      },
      {
        "zh": "希望你过个快乐的节日！",
        "pinyin": "Xīwàng nǐ guò gè kuàilè de jiérì!",
        "vi": "Hy vọng bạn có một ngày lễ vui vẻ!",
        "tag": "Lời chúc"
      }
    ]
  },
  {
    "id": "15-2",
    "hanzi": "新年",
    "traditional": "新年",
    "pinyin": "xīnnián",
    "pinyinClean": "xinnian",
    "hanViet": "TÂN NIÊN",
    "radical": "斤",
    "strokeCount": 19,
    "hskLevel": 2,
    "lesson": 15,
    "partOfSpeech": "dt.",
    "viet": "năm mới, Tết",
    "vi_meaning_full": "năm mới, Tết",
    "vi_meaning_short": "năm mới, Tết",
    "enMeaning": "New Year",
    "image": "https://images.pexels.com/photos/38463274/pexels-photo-38463274.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "新年快乐",
      "过新年"
    ],
    "compounds": [
      "新春",
      "年日"
    ],
    "synonyms": [
      "元旦",
      "春节"
    ],
    "antonyms": [
      "旧年"
    ],
    "confusableWords": "心年",
    "sentences": [
      {
        "zh": "新年就要 arrived 了，你准备去哪儿？",
        "pinyin": "Xīnnián jiùyào dào le, nǐ zhǔnbèi qù nǎr?",
        "vi": "Năm mới sắp đến rồi, bạn dự định đi đâu?",
        "tag": "Hỏi kế hoạch lễ Tết"
      },
      {
        "zh": "祝大家新年快乐，万事如意！",
        "pinyin": "Zhù dàjiā xīnnián kuàilè, wànshì rúyì!",
        "vi": "Chúc mọi người năm mới vui vẻ, vạn sự như意!",
        "tag": "Chúc Tết"
      }
    ]
  },
  {
    "id": "hsk1-15-6",
    "hanzi": "一起",
    "traditional": "一起",
    "pinyin": "yìqǐ",
    "pinyinClean": "yiqi",
    "hanViet": "NHẤT KHỞI",
    "radical": "一",
    "strokeCount": 11,
    "hskLevel": 2,
    "lesson": 15,
    "partOfSpeech": "phó.",
    "viet": "cùng nhau, cùng một chỗ",
    "vi_meaning_full": "cùng",
    "vi_meaning_short": "cùng nhau, cùng một chỗ",
    "enMeaning": "together",
    "image": "https://images.pexels.com/photos/14751085/pexels-photo-14751085.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "一起去",
      "在一起"
    ],
    "compounds": [
      "一起来",
      "一起走"
    ],
    "synonyms": [
      "一块儿"
    ],
    "antonyms": [
      "单独"
    ],
    "confusableWords": "一定",
    "sentences": [
      {
        "zh": "下午我们一起去踢足球吧。",
        "pinyin": "Xiàwǔ wǒmen yìqǐ qù tī zúqiú ba.",
        "vi": "Buổi chiều chúng mình cùng đi đá bóng nhé.",
        "tag": "Rủ rê làm chung"
      },
      {
        "zh": "我和家人住在一起。",
        "pinyin": "Wǒ hé jiārén zhù zài yìqǐ.",
        "vi": "Tôi sống cùng với gia đình.",
        "tag": "Gia đình"
      }
    ]
  },
  {
    "id": "15-8",
    "hanzi": "阴",
    "traditional": "陰",
    "pinyin": "yīn",
    "pinyinClean": "yin",
    "hanViet": "ÂM",
    "radical": "阝",
    "strokeCount": 6,
    "hskLevel": 2,
    "lesson": 15,
    "partOfSpeech": "tt.",
    "viet": "trời âm u, u ám, nhiều mây",
    "vi_meaning_full": "u ám, nhiều mây",
    "vi_meaning_short": "trời âm u, u ám, nhiều mây",
    "enMeaning": "cloudy, overcast",
    "image": "https://images.pexels.com/photos/12008659/pexels-photo-12008659.jpeg?auto=compress&cs=tinysrgb&h=350",
    "collocations": [
      "阴天",
      "阴雨"
    ],
    "compounds": [
      "阴天",
      "阴阳",
      "阴历"
    ],
    "synonyms": [
      "阴暗"
    ],
    "antonyms": [
      "晴"
    ],
    "confusableWords": "音, 隐",
    "sentences": [
      {
        "zh": "天阴了，我要回去了。",
        "pinyin": "Tiān yīn le, wǒ yào huíqù le.",
        "vi": "Trời u ám rồi, mình phải về thôi.",
        "tag": "Thời tiết thay đổi"
      },
      {
        "zh": "今天天气是阴天，可能会下雨。",
        "pinyin": "Jīntiān tiānqì shì yīntiān, kěnéng huì xià yǔ.",
        "vi": "Hôm nay thời tiết nhiều mây âm u, có thể sẽ mưa.",
        "tag": "Dự báo thời tiết"
      }
    ]
  }
];

export const DICTIONARY_BY_HANZI: Record<string, DictWord> = Object.fromEntries(
  DICTIONARY_WORDS.map((w) => [w.hanzi, w])
);

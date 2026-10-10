export interface GrammarItemWord {
  hanzi: string;
  pinyin: string;
  meaning: string;
}

export interface GrammarItemSection {
  sub_category: string;
  words?: GrammarItemWord[];
  examples?: GrammarItemWord[];
}

export interface GrammarCategory {
  category_no: string;
  category_name: string;
  items: GrammarItemSection[];
}

export const GRAMMAR_POINTS: GrammarCategory[] = [
  {
    "category_no": "一",
    "category_name": "代词 (Đại từ)",
    "items": [
      {
        "sub_category": "人称代词 (Đại từ nhân xưng)",
        "words": [
          {
            "hanzi": "我",
            "pinyin": "wǒ",
            "meaning": "tôi"
          },
          {
            "hanzi": "你",
            "pinyin": "nǐ",
            "meaning": "bạn"
          },
          {
            "hanzi": "他",
            "pinyin": "tā",
            "meaning": "anh ấy"
          },
          {
            "hanzi": "她",
            "pinyin": "tā",
            "meaning": "cô ấy"
          },
          {
            "hanzi": "我们",
            "pinyin": "wǒmen",
            "meaning": "chúng tôi / chúng ta"
          },
          {
            "hanzi": "你们",
            "pinyin": "nǐmen",
            "meaning": "các bạn"
          },
          {
            "hanzi": "他们",
            "pinyin": "tāmen",
            "meaning": "họ (nam/chung)"
          },
          {
            "hanzi": "她们",
            "pinyin": "tāmen",
            "meaning": "họ (nữ)"
          },
          {
            "hanzi": "您",
            "pinyin": "nín",
            "meaning": "ngài / ông / bà (lịch sự)"
          },
          {
            "hanzi": "它",
            "pinyin": "tā",
            "meaning": "nó (chỉ vật/động vật)"
          },
          {
            "hanzi": "它们",
            "pinyin": "tāmen",
            "meaning": "chúng nó"
          },
          {
            "hanzi": "大家",
            "pinyin": "dàjiā",
            "meaning": "mọi người"
          }
        ]
      },
      {
        "sub_category": "指示代词 (Đại từ chỉ thị)",
        "words": [
          {
            "hanzi": "这（这儿）",
            "pinyin": "zhè (zhèr)",
            "meaning": "đây / ở đây"
          },
          {
            "hanzi": "那（那儿）",
            "pinyin": "nà (nàr)",
            "meaning": "kia / ở kia"
          },
          {
            "hanzi": "每",
            "pinyin": "měi",
            "meaning": "mỗi"
          }
        ]
      },
      {
        "sub_category": "疑问代词 (Đại từ nghi vấn)",
        "words": [
          {
            "hanzi": "谁",
            "pinyin": "shéi",
            "meaning": "ai"
          },
          {
            "hanzi": "哪（哪儿）",
            "pinyin": "nǎ (nǎr)",
            "meaning": "nào / ở đâu"
          },
          {
            "hanzi": "什么",
            "pinyin": "shénme",
            "meaning": "cái gì"
          },
          {
            "hanzi": "多少",
            "pinyin": "duōshao",
            "meaning": "bao nhiêu"
          },
          {
            "hanzi": "几",
            "pinyin": "jǐ",
            "meaning": "mấy"
          },
          {
            "hanzi": "怎么",
            "pinyin": "zěnme",
            "meaning": "như thế nào / làm sao"
          },
          {
            "hanzi": "怎么样",
            "pinyin": "zěnmeyàng",
            "meaning": "thế nào / ra sao"
          },
          {
            "hanzi": "为什么",
            "pinyin": "wèi shénme",
            "meaning": "tại sao / vì sao"
          }
        ]
      }
    ]
  },
  {
    "category_no": "二",
    "category_name": "数词 (Số từ)",
    "items": [
      {
        "sub_category": "表示时间 (Biểu thị thời gian)",
        "examples": [
          {
            "hanzi": "8 点 40 分",
            "pinyin": "8 diǎn 40 fēn",
            "meaning": "8 giờ 40 phút"
          },
          {
            "hanzi": "2009 年 7 月 7 日",
            "pinyin": "2009 nián 7 yuè 7 rì",
            "meaning": "ngày 7 tháng 7 năm 2009"
          },
          {
            "hanzi": "星期四",
            "pinyin": "xīngqīsì",
            "meaning": "thứ năm"
          }
        ]
      },
      {
        "sub_category": "表示年龄 (Biểu thị tuổi)",
        "examples": [
          {
            "hanzi": "他今年 24 岁。",
            "pinyin": "Tā jīnnián 24 suì.",
            "meaning": "Năm nay anh ấy 24 tuổi."
          }
        ]
      },
      {
        "sub_category": "表示钱数 (Biểu thị số tiền)",
        "examples": [
          {
            "hanzi": "15 块",
            "pinyin": "15 kuài",
            "meaning": "15 đồng / tệ"
          },
          {
            "hanzi": "6 元",
            "pinyin": "6 yuán",
            "meaning": "6 tệ"
          }
        ]
      },
      {
        "sub_category": "表示号码 (Biểu thị số hiệu / số điện thoại)",
        "examples": [
          {
            "hanzi": "我的电话是 58590000。",
            "pinyin": "Wǒ de diànhuà shì 58590000.",
            "meaning": "Số điện thoại của tôi là 58590000."
          }
        ]
      },
      {
        "sub_category": "表示顺序 (Biểu thị thứ tự)",
        "examples": [
          {
            "hanzi": "第三",
            "pinyin": "dì-sān",
            "meaning": "thứ ba"
          }
        ]
      },
      {
        "sub_category": "表示重量 (Biểu thị trọng lượng)",
        "examples": [
          {
            "hanzi": "9 公斤",
            "pinyin": "9 gōngjīn",
            "meaning": "9 ki-lô-gam"
          }
        ]
      }
    ]
  },
  {
    "category_no": "三",
    "category_name": "量词 (Lượng từ)",
    "items": [
      {
        "sub_category": "用在数词后 (Đứng sau số từ)",
        "examples": [
          {
            "hanzi": "一个",
            "pinyin": "yí ge",
            "meaning": "một cái / một người"
          },
          {
            "hanzi": "3 本",
            "pinyin": "3 běn",
            "meaning": "3 quyển / cuốn"
          },
          {
            "hanzi": "等一下。",
            "pinyin": "Děng yí xià.",
            "meaning": "Đợi một chút."
          }
        ]
      },
      {
        "sub_category": "用在“这”“那”“几”“每”后 (Đứng sau \"这\", \"那\", \"几\", \"每\")",
        "examples": [
          {
            "hanzi": "这个",
            "pinyin": "zhège",
            "meaning": "cái này"
          },
          {
            "hanzi": "那些",
            "pinyin": "nàxiē",
            "meaning": "những cái kia"
          },
          {
            "hanzi": "几本",
            "pinyin": "jǐ běn",
            "meaning": "mấy quyển"
          },
          {
            "hanzi": "每次",
            "pinyin": "měi cì",
            "meaning": "mỗi lần"
          }
        ]
      }
    ]
  },
  {
    "category_no": "四",
    "category_name": "副词 (Phó từ)",
    "items": [
      {
        "sub_category": "否定副词 (Phó từ phủ định): 不, 没, 别",
        "examples": [
          {
            "hanzi": "我不是学生。",
            "pinyin": "Wǒ bú shì xuésheng.",
            "meaning": "Tôi không phải là học sinh."
          },
          {
            "hanzi": "他没去医院。",
            "pinyin": "Tā méi qù yīyuàn.",
            "meaning": "Anh ấy đã không đi bệnh viện."
          },
          {
            "hanzi": "你别去游泳了。",
            "pinyin": "Nǐ bié qù yóuyǒng le.",
            "meaning": "Bạn đừng đi bơi nữa."
          }
        ]
      },
      {
        "sub_category": "程度副词 (Phó từ chỉ mức độ): 很, 太, 非常, 最",
        "examples": [
          {
            "hanzi": "她很高兴。",
            "pinyin": "Tā hěn gāoxìng.",
            "meaning": "Cô ấy rất vui mừng."
          },
          {
            "hanzi": "太好了！",
            "pinyin": "Tài hǎo le!",
            "meaning": "Tốt quá rồi!"
          },
          {
            "hanzi": "那里的天气非常热。",
            "pinyin": "Nàlǐ de tiānqì fēicháng rè.",
            "meaning": "Thời tiết ở đó vô cùng nóng."
          },
          {
            "hanzi": "我最喜欢喝咖啡。",
            "pinyin": "Wǒ zuì xǐhuan hē kāfēi.",
            "meaning": "Tôi thích uống cà phê nhất."
          }
        ]
      },
      {
        "sub_category": "范围副词 (Phó từ chỉ phạm vi): 都, 一起",
        "examples": [
          {
            "hanzi": "我们都看见那个人了。",
            "pinyin": "Wǒmen dōu kànjiàn nàge rén le.",
            "meaning": "Tất cả chúng tôi đều nhìn thấy người đó rồi."
          },
          {
            "hanzi": "他们一起去机场了。",
            "pinyin": "Tāmen yìqǐ qù jīchǎng le.",
            "meaning": "Họ cùng nhau đi đến sân bay rồi."
          }
        ]
      },
      {
        "sub_category": "时间副词 (Phó từ chỉ thời gian): 正在, 已经, 就",
        "examples": [
          {
            "hanzi": "我们正在看电视。",
            "pinyin": "Wǒmen zhèngzài kàn diànshì.",
            "meaning": "Chúng tôi đang xem ti-vi."
          },
          {
            "hanzi": "他已经到学校了。",
            "pinyin": "Tā yǐjīng dào xuéxiào le.",
            "meaning": "Anh ấy đã đến trường rồi."
          },
          {
            "hanzi": "她下星期就回来了。",
            "pinyin": "Tā xià xīngqī jiù huílai le.",
            "meaning": "Tuần sau cô ấy sẽ về ngay."
          }
        ]
      },
      {
        "sub_category": "语气副词 (Phó từ ngữ khí): 也, 还, 真",
        "examples": [
          {
            "hanzi": "我也有一块这样的手表。",
            "pinyin": "Wǒ yě yǒu yí kuài zhèyàng de shǒubiǎo.",
            "meaning": "Tôi cũng có một chiếc đồng hồ đeo tay như thế này."
          },
          {
            "hanzi": "她还没起床。",
            "pinyin": "Tā hái méi qǐchuáng.",
            "meaning": "Cô ấy vẫn chưa thức dậy."
          },
          {
            "hanzi": "你的字写得真漂亮！",
            "pinyin": "Nǐ de zì xiě de zhēn piàoliang!",
            "meaning": "Chữ của bạn viết thật là đẹp!"
          }
        ]
      },
      {
        "sub_category": "频率副词 (Phó từ chỉ tần suất): 再",
        "examples": [
          {
            "hanzi": "欢迎再来！",
            "pinyin": "Huānyíng zài lái!",
            "meaning": "Hoan nghênh lần sau lại đến!"
          }
        ]
      }
    ]
  },
  {
    "category_no": "五",
    "category_name": "连词 (Liên từ)",
    "items": [
      {
        "sub_category": "和, 因为……所以……, 但是",
        "examples": [
          {
            "hanzi": "我和你",
            "pinyin": "wǒ hé nǐ",
            "meaning": "tôi và bạn"
          },
          {
            "hanzi": "因为下雨，所以他没去踢足球。",
            "pinyin": "Yīnwèi xià yǔ, suǒyǐ tā méi qù tī zúqiú.",
            "meaning": "Vì trời mưa nên anh ấy không đi đá bóng."
          },
          {
            "hanzi": "他80岁了，但是身体很好。",
            "pinyin": "Tā 80 suì le, dànshì shēntǐ hěn hǎo.",
            "meaning": "Ông ấy 80 tuổi rồi nhưng sức khỏe rất tốt."
          }
        ]
      }
    ]
  },
  {
    "category_no": "六",
    "category_name": "介词 (Giới từ)",
    "items": [
      {
        "sub_category": "在, 从, 对, 比, 向, 离",
        "examples": [
          {
            "hanzi": "我住在北京。",
            "pinyin": "Wǒ zhù zài Běijīng.",
            "meaning": "Tôi sống ở Bắc Kinh."
          },
          {
            "hanzi": "她从中国回来了。",
            "pinyin": "Tā cóng Zhōngguó huílai le.",
            "meaning": "Cô ấy từ Trung Quốc trở về rồi."
          },
          {
            "hanzi": "他对我很 好。",
            "pinyin": "Tā duì wǒ hěn hǎo.",
            "meaning": "Anh ấy đối xử với tôi rất tốt."
          },
          {
            "hanzi": "我比她高。",
            "pinyin": "Wǒ bǐ tā gāo.",
            "meaning": "Tôi cao hơn cô ấy."
          },
          {
            "hanzi": "向左走。",
            "pinyin": "Xiàng zuǒ zǒu.",
            "meaning": "Đi về hướng bên trái."
          },
          {
            "hanzi": "学校离我家很近。",
            "pinyin": "Xuéxiào lí wǒ jiā hěn jìn.",
            "meaning": "Trường học cách nhà tôi rất gần."
          }
        ]
      }
    ]
  },
  {
    "category_no": "七",
    "category_name": "助动词 (Trợ động từ / Động từ năng nguyện)",
    "items": [
      {
        "sub_category": "会, 能, 可以, 要, 可能",
        "examples": [
          {
            "hanzi": "我会做饭。",
            "pinyin": "Wǒ huì zuò fàn.",
            "meaning": "Tôi biết nấu cơm."
          },
          {
            "hanzi": "你什么时候能来？",
            "pinyin": "Nǐ shénme shíhou néng lái?",
            "meaning": "Khi nào bạn có thể đến?"
          },
          {
            "hanzi": "现在你可以走了。",
            "pinyin": "Xiànzài nǐ kěyǐ zǒu le.",
            "meaning": "Bây giờ bạn có thể đi rồi."
          },
          {
            "hanzi": "我要学游泳。",
            "pinyin": "Wǒ yào xué yóuyǒng.",
            "meaning": "Tôi muốn học bơi."
          },
          {
            "hanzi": "明天可能下雨。",
            "pinyin": "Míngtiān kěnéng xià yǔ.",
            "meaning": "Ngày mai có khả năng sẽ mưa."
          }
        ]
      }
    ]
  },
  {
    "category_no": "八",
    "category_name": "助词 (Trợ từ)",
    "items": [
      {
        "sub_category": "结构助词 (Trợ từ kết cấu): 的, 得",
        "examples": [
          {
            "hanzi": "我的电脑",
            "pinyin": "wǒ de diànnǎo",
            "meaning": "máy tính của tôi"
          },
          {
            "hanzi": "书是哥哥的。",
            "pinyin": "Shū shì gēge de.",
            "meaning": "Sách là của anh trai."
          },
          {
            "hanzi": "那个杯子是我的。",
            "pinyin": "Nàge bēizi shì wǒ de.",
            "meaning": "Cái ly kia là của tôi."
          },
          {
            "hanzi": "这件衣服是最便宜的。",
            "pinyin": "Zhè jiàn yīfu shì zuì piányi de.",
            "meaning": "Bộ quần áo này là rẻ nhất."
          },
          {
            "hanzi": "我买了一些吃的。",
            "pinyin": "Wǒ mǎile yìxiē chī de.",
            "meaning": "Tôi đã mua một ít đồ ăn."
          },
          {
            "hanzi": "那边打电话的是我丈夫。",
            "pinyin": "Nàbiān dǎ diànhuà de shì wǒ zhàngfu.",
            "meaning": "Người đang gọi điện thoại bên kia là chồng tôi."
          },
          {
            "hanzi": "你做得对。",
            "pinyin": "Nǐ zuò de duì.",
            "meaning": "Bạn làm đúng rồi."
          }
        ]
      },
      {
        "sub_category": "语气助词 (Trợ từ ngữ khí): 了, 吗, 呢, 吧",
        "examples": [
          {
            "hanzi": "她去医院了。",
            "pinyin": "Tā qù yīyuàn le.",
            "meaning": "Cô ấy đã đi bệnh viện rồi."
          },
          {
            "hanzi": "他是医生吗？",
            "pinyin": "Tā shì yīshēng ma?",
            "meaning": "Anh ấy là bác sĩ phải không?"
          },
          {
            "hanzi": "你在哪儿呢？",
            "pinyin": "Nǐ zài nǎr ne?",
            "meaning": "Bạn đang ở đâu thế?"
          },
          {
            "hanzi": "现在快10点了吧？",
            "pinyin": "Xiànzài kuài 10 diǎn le ba?",
            "meaning": "Bây giờ sắp 10 giờ rồi nhỉ?"
          }
        ]
      },
      {
        "sub_category": "动态助词 (Trợ từ động thái): 着, 了, 过",
        "examples": [
          {
            "hanzi": "她笑着说：“明天见。”",
            "pinyin": "Tā xiàozhe shuō: \"Míngtiān jiàn.\"",
            "meaning": "Cô ấy cười và nói: \"Ngày mai gặp lại.\""
          },
          {
            "hanzi": "我买了一本书。",
            "pinyin": "Wǒ mǎile yì běn shū.",
            "meaning": "Tôi đã mua một quyển sách."
          },
          {
            "hanzi": "我学过汉语。",
            "pinyin": "Wǒ xuéguo Hànyǔ.",
            "meaning": "Tôi từng học qua tiếng Hán."
          }
        ]
      }
    ]
  },
  {
    "category_no": "九",
    "category_name": "动词的重叠 (Sự lặp lại của động từ)",
    "items": [
      {
        "sub_category": "AA / A一A / 试一试",
        "examples": [
          {
            "hanzi": "你去问问他。",
            "pinyin": "Nǐ qù wènwen tā.",
            "meaning": "Bạn đi hỏi anh ấy một chút xem."
          },
          {
            "hanzi": "让我想一想。",
            "pinyin": "Ràng wǒ xiǎngyixiǎng.",
            "meaning": "Để tôi suy nghĩ một chút."
          }
        ]
      }
    ]
  },
  {
    "category_no": "十",
    "category_name": "陈述句 (Câu trần thuật)",
    "items": [
      {
        "sub_category": "肯定句 (Câu khẳng định)",
        "examples": [
          {
            "hanzi": "明天星期六。",
            "pinyin": "Míngtiān xīngqīliù.",
            "meaning": "Ngày mai là thứ bảy."
          },
          {
            "hanzi": "我认识他。",
            "pinyin": "Wǒ rènshi tā.",
            "meaning": "Tôi quen biết anh ấy."
          },
          {
            "hanzi": "天气很好。",
            "pinyin": "Tiānqì hěn hǎo.",
            "meaning": "Thời tiết rất tốt."
          }
        ]
      },
      {
        "sub_category": "否定句 (Câu phủ định): 不, 没",
        "examples": [
          {
            "hanzi": "她不在饭店。",
            "pinyin": "Tā bú zài fàndiàn.",
            "meaning": "Cô ấy không ở nhà hàng."
          },
          {
            "hanzi": "她没去看电影。",
            "pinyin": "Tā méi qù kàn diànyǐng.",
            "meaning": "Cô ấy đã không đi xem phim."
          }
        ]
      }
    ]
  },
  {
    "category_no": "十一",
    "category_name": "疑问句 (Câu nghi vấn / Câu hỏi)",
    "items": [
      {
        "sub_category": "吗, 呢, 吧",
        "examples": [
          {
            "hanzi": "这是你的桌子吗？",
            "pinyin": "Zhè shì nǐ de zhuōzi ma?",
            "meaning": "Đây là bàn của bạn phải không?"
          },
          {
            "hanzi": "我是老师，你呢？",
            "pinyin": "Wǒ shì lǎoshī, nǐ ne?",
            "meaning": "Tôi là giáo viên, còn bạn thì sao?"
          },
          {
            "hanzi": "你是中国人吧？",
            "pinyin": "Nǐ shì Zhōngguórén ba?",
            "meaning": "Bạn là người Trung Quốc đúng không?"
          }
        ]
      },
      {
        "sub_category": "疑问代词 (Đại từ nghi vấn): 谁, 哪, 哪儿, 什么, 多少, 几, 怎么, 怎么样, 为什么, 多",
        "examples": [
          {
            "hanzi": "那个人是谁？",
            "pinyin": "Nàge rén shì shéi?",
            "meaning": "Người kia là ai?"
          },
          {
            "hanzi": "这些杯子，你喜欢哪一个？",
            "pinyin": "Zhèxiē bēizi, nǐ xǐhuan nǎ yí ge?",
            "meaning": "Những cái ly này, bạn thích cái nào?"
          },
          {
            "hanzi": "你想去哪儿？",
            "pinyin": "Nǐ xiǎng qù nǎr?",
            "meaning": "Bạn muốn đi đâu?"
          },
          {
            "hanzi": "你爱吃什么水果？",
            "pinyin": "Nǐ ài chī shénme shuǐguǒ?",
            "meaning": "Bạn thích ăn loại trái cây gì?"
          },
          {
            "hanzi": "你们学校有多少学生？",
            "pinyin": "Nǐmen xuéxiào yǒu duōshao xuésheng?",
            "meaning": "Trường các bạn có bao nhiêu học sinh?"
          },
          {
            "hanzi": "你几岁了？",
            "pinyin": "Nǐ jǐ suì le?",
            "meaning": "Cháu mấy tuổi rồi?"
          },
          {
            "hanzi": "你怎么了？",
            "pinyin": "Nǐ zěnme le?",
            "meaning": "Bạn bị làm sao thế?"
          },
          {
            "hanzi": "这本书怎么样？",
            "pinyin": "Zhè běn shū zěnmeyàng?",
            "meaning": "Quyển sách này như thế nào?"
          },
          {
            "hanzi": "他为什么没来？",
            "pinyin": "Tā wèi shénme méi lái?",
            "meaning": "Tại sao anh ấy lại không đến?"
          },
          {
            "hanzi": "从这儿到那儿多远？",
            "pinyin": "Cóng zhèr dào nàr duō yuǎn?",
            "meaning": "Từ đây đến đó cách bao xa?"
          }
        ]
      },
      {
        "sub_category": "正反疑问句 (Câu hỏi chính phản)",
        "examples": [
          {
            "hanzi": "你喝不喝茶？",
            "pinyin": "Nǐ hē bu hē chá?",
            "meaning": "Bạn có uống trà hay không?"
          }
        ]
      },
      {
        "sub_category": "好吗 (Câu hỏi thăm dò ý kiến)",
        "examples": [
          {
            "hanzi": "我们一起去，好吗？",
            "pinyin": "Wǒmen yìqǐ qù, hǎo ma?",
            "meaning": "Chúng mình cùng đi nhé, được không?"
          }
        ]
      }
    ]
  },
  {
    "category_no": "十二",
    "category_name": "祈使句 (Câu cầu khiến)",
    "items": [
      {
        "sub_category": "请, 别, 不要",
        "examples": [
          {
            "hanzi": "请坐。",
            "pinyin": "Qǐng zuò.",
            "meaning": "Mời ngồi."
          },
          {
            "hanzi": "别说话。",
            "pinyin": "Bié shuōhuà.",
            "meaning": "Đừng nói chuyện."
          },
          {
            "hanzi": "不要吃太多。",
            "pinyin": "Búyào chī tài duō.",
            "meaning": "Đừng ăn quá nhiều."
          }
        ]
      }
    ]
  },
  {
    "category_no": "十三",
    "category_name": "感叹句 (Câu cảm thán)",
    "items": [
      {
        "sub_category": "太, 真",
        "examples": [
          {
            "hanzi": "太好了！",
            "pinyin": "Tài hǎo le!",
            "meaning": "Tốt quá rồi!"
          },
          {
            "hanzi": "真好吃！",
            "pinyin": "Zhēn hǎochī!",
            "meaning": "Ngon thật đấy!"
          }
        ]
      }
    ]
  },
  {
    "category_no": "十四",
    "category_name": "特殊句型 (Các mẫu câu đặc biệt)",
    "items": [
      {
        "sub_category": "“是”字句 (Câu chữ \"是\")",
        "examples": [
          {
            "hanzi": "他是我的同学。",
            "pinyin": "Tā shì wǒ de tóngxué.",
            "meaning": "Cậu ấy là bạn cùng lớp của tôi."
          }
        ]
      },
      {
        "sub_category": "“有”字句 (Câu chữ \"有\")",
        "examples": [
          {
            "hanzi": "一年有12个月。",
            "pinyin": "Yì nián yǒu 12 ge yuè.",
            "meaning": "Một năm có 12 tháng."
          }
        ]
      },
      {
        "sub_category": "“是……的”句 (Mẫu câu nhấn mạnh \"是……的\")",
        "examples": [
          {
            "hanzi": "我是昨天来的。(强调时间)",
            "pinyin": "Wǒ shì zuótiān lái de.",
            "meaning": "Tôi là đến vào ngày hôm qua (Nhấn mạnh thời gian)."
          },
          {
            "hanzi": "这是在火车站买的。(强调地点)",
            "pinyin": "Zhè shì zài huǒchēzhàn mǎi de.",
            "meaning": "Cái này là mua ở ga xe lửa (Nhấn mạnh địa điểm)."
          },
          {
            "hanzi": "他是坐飞机来的。(强调方式)",
            "pinyin": "Tā shì zuò fēijī lái de.",
            "meaning": "Anh ấy là đi máy bay đến (Nhấn mạnh phương thức)."
          }
        ]
      },
      {
        "sub_category": "比较句 (Câu so sánh)",
        "examples": [
          {
            "hanzi": "今天比昨天冷。",
            "pinyin": "Jīntiān bǐ zuótiān lěng.",
            "meaning": "Hôm nay lạnh hơn hôm qua."
          }
        ]
      }
    ]
  },
  {
    "category_no": "十五",
    "category_name": "动作的状态 (Trạng thái của hành động)",
    "items": [
      {
        "sub_category": "用“在……呢”表示动作正在进行",
        "examples": [
          {
            "hanzi": "他们正在吃饭呢。",
            "pinyin": "Tāmen zài chīfàn ne.",
            "meaning": "Họ đang ăn cơm đấy."
          }
        ]
      },
      {
        "sub_category": "用“正在”表示动作正在进行",
        "examples": [
          {
            "hanzi": "他们正在打篮球。",
            "pinyin": "Tāmen zhèngzài dǎ lánqiú.",
            "meaning": "Họ đang chơi bóng rổ."
          }
        ]
      },
      {
        "sub_category": "用“了”表示动作已经完成",
        "examples": [
          {
            "hanzi": "他买了一斤苹果。",
            "pinyin": "Tā mǎile yì jīn píngguǒ.",
            "meaning": "Anh ấy đã mua một cân táo."
          }
        ]
      },
      {
        "sub_category": "用“要……了”表示动作（变化）将要发生",
        "examples": [
          {
            "hanzi": "火车要开了。",
            "pinyin": "Huǒchē yào kāi le.",
            "meaning": "Xe lửa sắp chạy rồi."
          }
        ]
      }
    ]
  }
];

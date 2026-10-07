/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VocabItem {
  id: string;
  pinyin: string;
  viet: string;
  hanzi: string;
  lesson: number;
  image: string;
}

export interface LessonInfo {
  lesson: number;
  titleZh: string;
  titleVi: string;
}

export const LESSON_INFOS: LessonInfo[] = [
  { lesson: 1, titleZh: "九月去北京旅游最好", titleVi: "Nếu đi Bắc Kinh để du lịch thì tốt nhất là đi vào tháng chín" },
  { lesson: 2, titleZh: "我每天六点起床", titleVi: "Hàng ngày tôi thức dậy lúc 6 giờ" },
  { lesson: 3, titleZh: "左边那个红色的是我的", titleVi: "Ly màu đỏ ở bên trái là của tôi" },
  { lesson: 4, titleZh: "这个工作是他帮我介绍的", titleVi: "Ông ấy đã giới thiệu giúp tôi công việc này" },
  { lesson: 5, titleZh: "就买这件吧", titleVi: "Mua chiếc áo này đi" },
  { lesson: 6, titleZh: "你怎么不吃了？", titleVi: "Sao anh không ăn nữa?" },
  { lesson: 7, titleZh: "你家离公司远吗？", titleVi: "Nhà chị có ở xa công ty không?" },
  { lesson: 8, titleZh: "让我想想再告诉你", titleVi: "Để mình suy nghĩ rồi sẽ nói cho bạn biết" },
  { lesson: 9, titleZh: "题太多，我没做完", titleVi: "Câu hỏi quá nhiều nên mình không làm hết" },
  { lesson: 10, titleZh: "别找了，手机在桌子上呢", titleVi: "Đừng tìm nữa, điện thoại di động ở trên bàn kia" },
  { lesson: 11, titleZh: "他比我大三岁", titleVi: "Anh ấy lớn hơn mình ba tuổi" },
  { lesson: 12, titleZh: "你穿得太少了", titleVi: "Anh mặc ít quần áo quá" },
  { lesson: 13, titleZh: "门开着呢", titleVi: "Cửa đang mở" },
  { lesson: 14, titleZh: "你看过那个电影吗？", titleVi: "Cậu đã từng xem phim đó chưa?" },
  { lesson: 15, titleZh: "新年就要到了", titleVi: "Năm mới sắp đến rồi" }
];

export const HSK2_VOCABULARY: VocabItem[] = [
  // ==================== BÀI 1 (12 từ) ====================
  { id: "1-1", pinyin: "lǚyóu", viet: "du lịch", hanzi: "旅游", lesson: 1, image: "https://images.pexels.com/photos/32263933/pexels-photo-32263933.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "1-2", pinyin: "juéde", viet: "cảm thấy, cho rằng", hanzi: "觉得", lesson: 1, image: "https://images.pexels.com/photos/36922125/pexels-photo-36922125.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "1-3", pinyin: "zuì", viet: "nhất", hanzi: "最", lesson: 1, image: "https://images.pexels.com/photos/34203966/pexels-photo-34203966.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "1-4", pinyin: "wèi shénme", viet: "tại sao", hanzi: "为什么", lesson: 1, image: "https://images.pexels.com/photos/8617708/pexels-photo-8617708.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "1-5", pinyin: "yě", viet: "cũng", hanzi: "也", lesson: 1, image: "https://images.pexels.com/photos/6030460/pexels-photo-6030460.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "1-6", pinyin: "yùndòng", viet: "môn thể thao, tập thể dục", hanzi: "运动", lesson: 1, image: "https://images.pexels.com/photos/29520198/pexels-photo-29520198.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "1-7", pinyin: "tī zúqiú", viet: "đá bóng", hanzi: "踢足球", lesson: 1, image: "https://images.pexels.com/photos/36944547/pexels-photo-36944547.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "1-8", pinyin: "yìqǐ", viet: "cùng", hanzi: "一起", lesson: 1, image: "https://images.pexels.com/photos/12813668/pexels-photo-12813668.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "1-9", pinyin: "yào", viet: "muốn, cần", hanzi: "要", lesson: 1, image: "https://images.pexels.com/photos/35849147/pexels-photo-35849147.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "1-10", pinyin: "xīn", viet: "mới", hanzi: "新", lesson: 1, image: "https://images.pexels.com/photos/11482458/pexels-photo-11482458.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "1-11", pinyin: "tā", viet: "nó", hanzi: "它", lesson: 1, image: "https://images.pexels.com/photos/8310631/pexels-photo-8310631.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "1-12", pinyin: "yǎnjing", viet: "mắt", hanzi: "眼睛", lesson: 1, image: "https://images.pexels.com/photos/38226818/pexels-photo-38226818.jpeg?auto=compress&cs=tinysrgb&h=350" },

  // ==================== BÀI 2 (14 từ) ====================
  { id: "2-1", pinyin: "shēng bìng", viet: "bị bệnh, bị ốm", hanzi: "生病", lesson: 2, image: "https://images.pexels.com/photos/14530635/pexels-photo-14530635.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "2-2", pinyin: "měi", viet: "mỗi", hanzi: "每", lesson: 2, image: "https://images.pexels.com/photos/14682727/pexels-photo-14682727.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "2-3", pinyin: "zǎoshang", viet: "buổi sáng", hanzi: "早上", lesson: 2, image: "https://images.pexels.com/photos/16487305/pexels-photo-16487305.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "2-4", pinyin: "pǎo bù", viet: "chạy bộ", hanzi: "跑步", lesson: 2, image: "https://images.pexels.com/photos/29342151/pexels-photo-29342151.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "2-5", pinyin: "qǐ chuáng", viet: "thức dậy", hanzi: "起床", lesson: 2, image: "https://images.pexels.com/photos/32446190/pexels-photo-32446190.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "2-6", pinyin: "yào", viet: "thuốc", hanzi: "药", lesson: 2, image: "https://images.pexels.com/photos/13779112/pexels-photo-13779112.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "2-7", pinyin: "shēntǐ", viet: "sức khỏe, cơ thể", hanzi: "身体", lesson: 2, image: "https://images.pexels.com/photos/37517992/pexels-photo-37517992.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "2-8", pinyin: "chū yuàn", viet: "xuất viện", hanzi: "出院", lesson: 2, image: "https://images.pexels.com/photos/28589238/pexels-photo-28589238.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "2-9", pinyin: "gāo", viet: "cao", hanzi: "高", lesson: 2, image: "https://images.pexels.com/photos/29532725/pexels-photo-29532725.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "2-10", pinyin: "mǐ", viet: "mét", hanzi: "米", lesson: 2, image: "https://images.pexels.com/photos/9302046/pexels-photo-9302046.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "2-11", pinyin: "zhīdào", viet: "biết", hanzi: "知道", lesson: 2, image: "https://images.pexels.com/photos/34776659/pexels-photo-34776659.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "2-12", pinyin: "xiūxi", viet: "nghỉ ngơi", hanzi: "休息", lesson: 2, image: "https://images.pexels.com/photos/16077079/pexels-photo-16077079.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "2-13", pinyin: "máng", viet: "bận", hanzi: "忙", lesson: 2, image: "https://images.pexels.com/photos/31395489/pexels-photo-31395489.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "2-14", pinyin: "shíjiān", viet: "thời gian", hanzi: "时间", lesson: 2, image: "https://images.pexels.com/photos/7224866/pexels-photo-7224866.jpeg?auto=compress&cs=tinysrgb&h=350" },

  // ==================== BÀI 3 (14 từ) ====================
  { id: "3-1", pinyin: "shǒubiǎo", viet: "đồng hồ đeo tay", hanzi: "手表", lesson: 3, image: "https://images.pexels.com/photos/14312717/pexels-photo-14312717.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "3-2", pinyin: "qiān", viet: "nghìn", hanzi: "千", lesson: 3, image: "https://images.pexels.com/photos/29234909/pexels-photo-29234909.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "3-3", pinyin: "bàozhǐ", viet: "báo", hanzi: "报纸", lesson: 3, image: "https://images.pexels.com/photos/6858664/pexels-photo-6858664.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "3-4", pinyin: "sòng", viet: "giao, đưa", hanzi: "送", lesson: 3, image: "https://images.pexels.com/photos/19679385/pexels-photo-19679385.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "3-5", pinyin: "yíxià", viet: "một chút, thử xem", hanzi: "一下", lesson: 3, image: "https://images.pexels.com/photos/13730172/pexels-photo-13730172.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "3-6", pinyin: "niúnǎi", viet: "sữa bò", hanzi: "牛奶", lesson: 3, image: "https://images.pexels.com/photos/37304947/pexels-photo-37304947.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "3-7", pinyin: "fángjiān", viet: "phòng", hanzi: "房间", lesson: 3, image: "https://images.pexels.com/photos/32372041/pexels-photo-32372041.png?auto=compress&cs=tinysrgb&h=350" },
  { id: "3-8", pinyin: "zhàngfu", viet: "chồng", hanzi: "丈夫", lesson: 3, image: "https://images.pexels.com/photos/18695458/pexels-photo-18695458.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "3-9", pinyin: "pángbiān", viet: "bên cạnh", hanzi: "旁边", lesson: 3, image: "https://images.pexels.com/photos/25014779/pexels-photo-25014779.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "3-10", pinyin: "zhēn", viet: "thật, quả là", hanzi: "真", lesson: 3, image: "https://images.pexels.com/photos/5442468/pexels-photo-5442468.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "3-11", pinyin: "fěnsè", viet: "màu hồng", hanzi: "粉色", lesson: 3, image: "https://images.pexels.com/photos/16733358/pexels-photo-16733358.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "3-12", pinyin: "yánsè", viet: "màu sắc", hanzi: "颜色", lesson: 3, image: "https://images.pexels.com/photos/7908546/pexels-photo-7908546.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "3-13", pinyin: "zuǒbian", viet: "bên trái", hanzi: "左边", lesson: 3, image: "https://images.pexels.com/photos/28176007/pexels-photo-28176007.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "3-14", pinyin: "hóngsè", viet: "màu đỏ", hanzi: "红色", lesson: 3, image: "https://images.pexels.com/photos/33321232/pexels-photo-33321232.jpeg?auto=compress&cs=tinysrgb&h=350" },

  // ==================== BÀI 4 (13 từ) ====================
  { id: "4-1", pinyin: "shēngrì", viet: "sinh nhật", hanzi: "生日", lesson: 4, image: "https://images.pexels.com/photos/30040908/pexels-photo-30040908.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "4-2", pinyin: "kuàilè", viet: "vui vẻ", hanzi: "快乐", lesson: 4, image: "https://images.pexels.com/photos/6152103/pexels-photo-6152103.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "4-3", pinyin: "gěi", viet: "cho", hanzi: "给", lesson: 4, image: "https://images.pexels.com/photos/14382430/pexels-photo-14382430.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "4-4", pinyin: "jiē", viet: "nhận, nghe (điện thoại)", hanzi: "接", lesson: 4, image: "https://images.pexels.com/photos/1796469/pexels-photo-1796469.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "4-5", pinyin: "wǎnshang", viet: "buổi tối", hanzi: "晚上", lesson: 4, image: "https://images.pexels.com/photos/30858160/pexels-photo-30858160.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "4-6", pinyin: "wèn", viet: "hỏi", hanzi: "问", lesson: 4, image: "https://images.pexels.com/photos/39905042/pexels-photo-39905042.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "4-7", pinyin: "fēicháng", viet: "rất, vô cùng", hanzi: "非常", lesson: 4, image: "https://images.pexels.com/photos/38754117/pexels-photo-38754117.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "4-8", pinyin: "kāishǐ", viet: "bắt đầu", hanzi: "开始", lesson: 4, image: "https://images.pexels.com/photos/16550006/pexels-photo-16550006.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "4-9", pinyin: "yǐjīng", viet: "đã", hanzi: "已经", lesson: 4, image: "https://images.pexels.com/photos/39968245/pexels-photo-39968245.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "4-10", pinyin: "cháng", viet: "dài, lâu", hanzi: "长", lesson: 4, image: "https://images.pexels.com/photos/6334003/pexels-photo-6334003.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "4-11", pinyin: "liǎng", viet: "hai", hanzi: "两", lesson: 4, image: "https://images.pexels.com/photos/36795783/pexels-photo-36795783.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "4-12", pinyin: "bāng", viet: "giúp, giúp đỡ", hanzi: "帮", lesson: 4, image: "https://images.pexels.com/photos/19453453/pexels-photo-19453453.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "4-13", pinyin: "jièshào", viet: "giới thiệu", hanzi: "介绍", lesson: 4, image: "https://images.pexels.com/photos/17382268/pexels-photo-17382268.jpeg?auto=compress&cs=tinysrgb&h=350" },

  // ==================== BÀI 5 (13 từ) ====================
  { id: "5-1", pinyin: "wàimiàn", viet: "bên ngoài", hanzi: "外面", lesson: 5, image: "https://images.pexels.com/photos/27671544/pexels-photo-27671544.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "5-2", pinyin: "zhǔnbèi", viet: "dự định, chuẩn bị", hanzi: "准备", lesson: 5, image: "https://images.pexels.com/photos/31453948/pexels-photo-31453948.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "5-3", pinyin: "jiù", viet: "thì, chính", hanzi: "就", lesson: 5, image: "https://images.pexels.com/photos/33024466/pexels-photo-33024466.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "5-4", pinyin: "yú", viet: "cá, món cá", hanzi: "鱼", lesson: 5, image: "https://images.pexels.com/photos/18435519/pexels-photo-18435519.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "5-5", pinyin: "ba", viet: "trợ từ", hanzi: "吧", lesson: 5, image: "https://images.pexels.com/photos/5761408/pexels-photo-5761408.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "5-6", pinyin: "jiàn", viet: "chiếc, cái (lượng từ)", hanzi: "件", lesson: 5, image: "https://images.pexels.com/photos/8146450/pexels-photo-8146450.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "5-7", pinyin: "hái", viet: "cũng, khá", hanzi: "还", lesson: 5, image: "https://images.pexels.com/photos/36650875/pexels-photo-36650875.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "5-8", pinyin: "kěyǐ", viet: "không tệ, tạm được", hanzi: "可以", lesson: 5, image: "https://images.pexels.com/photos/38826675/pexels-photo-38826675.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "5-9", pinyin: "búcuò", viet: "tuyệt, khá tốt", hanzi: "不错", lesson: 5, image: "https://images.pexels.com/photos/8831810/pexels-photo-8831810.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "5-10", pinyin: "kǎoshì", viet: "cuộc thi, bài kiểm tra", hanzi: "考试", lesson: 5, image: "https://images.pexels.com/photos/9489771/pexels-photo-9489771.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "5-11", pinyin: "kāfēi", viet: "cà phê", hanzi: "咖啡", lesson: 5, image: "https://images.pexels.com/photos/5151354/pexels-photo-5151354.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "5-12", pinyin: "duì", viet: "đối với, cho", hanzi: "对", lesson: 5, image: "https://images.pexels.com/photos/31827772/pexels-photo-31827772.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "5-13", pinyin: "yǐhòu", viet: "sau này", hanzi: "以后", lesson: 5, image: "https://images.pexels.com/photos/27636187/pexels-photo-27636187.jpeg?auto=compress&cs=tinysrgb&h=350" },

  // ==================== BÀI 6 (13 từ) ====================
  { id: "6-1", pinyin: "mén", viet: "cửa, cổng", hanzi: "门", lesson: 6, image: "https://images.pexels.com/photos/28908752/pexels-photo-28908752.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "6-2", pinyin: "wài", viet: "bên ngoài", hanzi: "外", lesson: 6, image: "https://images.pexels.com/photos/5982830/pexels-photo-5982830.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "6-3", pinyin: "zìxíngchē", viet: "xe đạp", hanzi: "自行车", lesson: 6, image: "https://images.pexels.com/photos/9558021/pexels-photo-9558021.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "6-4", pinyin: "yángròu", viet: "thịt cừu / thịt dê", hanzi: "羊肉", lesson: 6, image: "https://images.pexels.com/photos/13304044/pexels-photo-13304044.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "6-5", pinyin: "hǎochī", viet: "ngon", hanzi: "好吃", lesson: 6, image: "https://images.pexels.com/photos/7627441/pexels-photo-7627441.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "6-6", pinyin: "miàntiáo", viet: "mì sợi", hanzi: "面条", lesson: 6, image: "https://images.pexels.com/photos/8992932/pexels-photo-8992932.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "6-7", pinyin: "dǎ lánqiú", viet: "chơi bóng rổ", hanzi: "打篮球", lesson: 6, image: "https://images.pexels.com/photos/12997430/pexels-photo-12997430.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "6-8", pinyin: "yīnwèi", viet: "bởi vì", hanzi: "因为", lesson: 6, image: "https://images.pexels.com/photos/9789216/pexels-photo-9789216.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "6-9", pinyin: "suǒyǐ", viet: "cho nên", hanzi: "所以", lesson: 6, image: "https://images.pexels.com/photos/20943579/pexels-photo-20943579.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "6-10", pinyin: "yóu yǒng", viet: "bơi", hanzi: "游泳", lesson: 6, image: "https://images.pexels.com/photos/13342399/pexels-photo-13342399.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "6-11", pinyin: "jīngcháng", viet: "thường xuyên", hanzi: "经常", lesson: 6, image: "https://images.pexels.com/photos/5357453/pexels-photo-5357453.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "6-12", pinyin: "gōngjīn", viet: "kilôgam", hanzi: "公斤", lesson: 6, image: "https://images.pexels.com/photos/39525500/pexels-photo-39525500.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "6-13", pinyin: "jiějie", viet: "chị gái", hanzi: "姐姐", lesson: 6, image: "https://images.pexels.com/photos/590472/pexels-photo-590472.jpeg?auto=compress&cs=tinysrgb&h=350" },

  // ==================== BÀI 7 (13 từ) ====================
  { id: "7-1", pinyin: "jiàoshì", viet: "lớp học", hanzi: "教室", lesson: 7, image: "https://images.pexels.com/photos/6602623/pexels-photo-6602623.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "7-2", pinyin: "jīchǎng", viet: "sân bay", hanzi: "机场", lesson: 7, image: "https://images.pexels.com/photos/12944276/pexels-photo-12944276.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "7-3", pinyin: "lù", viet: "đường, lối đi", hanzi: "路", lesson: 7, image: "https://images.pexels.com/photos/29127803/pexels-photo-29127803.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "7-4", pinyin: "lí", viet: "cách (khoảng cách)", hanzi: "离", lesson: 7, image: "https://images.pexels.com/photos/30918254/pexels-photo-30918254.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "7-5", pinyin: "gōngsī", viet: "công ty", hanzi: "公司", lesson: 7, image: "https://images.pexels.com/photos/26852497/pexels-photo-26852497.png?auto=compress&cs=tinysrgb&h=350" },
  { id: "7-6", pinyin: "yuǎn", viet: "xa", hanzi: "远", lesson: 7, image: "https://images.pexels.com/photos/33805577/pexels-photo-33805577.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "7-7", pinyin: "gōnggòng qìchē", viet: "xe buýt", hanzi: "公共汽车", lesson: 7, image: "https://images.pexels.com/photos/3829175/pexels-photo-3829175.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "7-8", pinyin: "xiǎoshí", viet: "giờ (đồng hồ)", hanzi: "小时", lesson: 7, image: "https://images.pexels.com/photos/13548995/pexels-photo-13548995.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "7-9", pinyin: "màn", viet: "chậm", hanzi: "慢", lesson: 7, image: "https://images.pexels.com/photos/31983798/pexels-photo-31983798.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "7-10", pinyin: "kuài", viet: "nhanh", hanzi: "快", lesson: 7, image: "https://images.pexels.com/photos/19661440/pexels-photo-19661440.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "7-11", pinyin: "guò", viet: "ăn (mừng), trải qua", hanzi: "过", lesson: 7, image: "https://images.pexels.com/photos/34144383/pexels-photo-34144383.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "7-12", pinyin: "zǒu", viet: "đi, đi bộ", hanzi: "走", lesson: 7, image: "https://images.pexels.com/photos/10399158/pexels-photo-10399158.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "7-13", pinyin: "dào", viet: "đến, tới", hanzi: "到", lesson: 7, image: "https://images.pexels.com/photos/8569749/pexels-photo-8569749.jpeg?auto=compress&cs=tinysrgb&h=350" },

  // ==================== BÀI 8 (10 từ) ====================
  { id: "8-1", pinyin: "zài", viet: "lại, lần nữa, sẽ", hanzi: "再", lesson: 8, image: "https://images.pexels.com/photos/40040393/pexels-photo-40040393.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "8-2", pinyin: "ràng", viet: "để, bảo", hanzi: "让", lesson: 8, image: "https://images.pexels.com/photos/19804230/pexels-photo-19804230.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "8-3", pinyin: "gàosu", viet: "nói cho biết", hanzi: "告诉", lesson: 8, image: "https://images.pexels.com/photos/39729422/pexels-photo-39729422.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "8-4", pinyin: "děng", viet: "đợi", hanzi: "等", lesson: 8, image: "https://images.pexels.com/photos/33421737/pexels-photo-33421737.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "8-5", pinyin: "zhǎo", viet: "tìm", hanzi: "找", lesson: 8, image: "https://images.pexels.com/photos/7793173/pexels-photo-7793173.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "8-6", pinyin: "shìqing", viet: "sự việc, công việc", hanzi: "事情", lesson: 8, image: "https://images.pexels.com/photos/37082240/pexels-photo-37082240.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "8-7", pinyin: "fúwùyuán", viet: "nhân viên phục vụ", hanzi: "服务员", lesson: 8, image: "https://images.pexels.com/photos/19420186/pexels-photo-19420186.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "8-8", pinyin: "bái", viet: "trắng", hanzi: "白", lesson: 8, image: "https://images.pexels.com/photos/29826612/pexels-photo-29826612.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "8-9", pinyin: "hēi", viet: "đen", hanzi: "黑", lesson: 8, image: "https://images.pexels.com/photos/11285435/pexels-photo-11285435.png?auto=compress&cs=tinysrgb&h=350" },
  { id: "8-10", pinyin: "guì", viet: "đắt", hanzi: "贵", lesson: 8, image: "https://images.pexels.com/photos/31459470/pexels-photo-31459470.jpeg?auto=compress&cs=tinysrgb&h=350" },

  // ==================== BÀI 9 (11 từ) ====================
  { id: "9-1", pinyin: "cuò", viet: "sai, nhầm", hanzi: "错", lesson: 9, image: "https://images.pexels.com/photos/31356615/pexels-photo-31356615.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "9-2", pinyin: "cóng", viet: "từ", hanzi: "从", lesson: 9, image: "https://images.pexels.com/photos/234453/pexels-photo-234453.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "9-3", pinyin: "tiào wǔ", viet: "múa, khiêu vũ", hanzi: "跳舞", lesson: 9, image: "https://images.pexels.com/photos/2345293/pexels-photo-2345293.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "9-4", pinyin: "dì-yī", viet: "thứ nhất, đầu tiên", hanzi: "第一", lesson: 9, image: "https://images.pexels.com/photos/4808279/pexels-photo-4808279.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "9-5", pinyin: "xīwàng", viet: "hy vọng, mong", hanzi: "希望", lesson: 9, image: "https://images.pexels.com/photos/29771115/pexels-photo-29771115.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "9-6", pinyin: "wèntí", viet: "vấn đề, câu hỏi", hanzi: "问题", lesson: 9, image: "https://images.pexels.com/photos/9099824/pexels-photo-9099824.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "9-7", pinyin: "huānyíng", viet: "hoan nghênh", hanzi: "欢迎", lesson: 9, image: "https://images.pexels.com/photos/34219147/pexels-photo-34219147.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "9-8", pinyin: "shàng bān", viet: "đi làm", hanzi: "上班", lesson: 9, image: "https://images.pexels.com/photos/35348632/pexels-photo-35348632.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "9-9", pinyin: "dǒng", viet: "hiểu, biết", hanzi: "懂", lesson: 9, image: "https://images.pexels.com/photos/8199174/pexels-photo-8199174.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "9-10", pinyin: "wán", viet: "xong, hết", hanzi: "完", lesson: 9, image: "https://images.pexels.com/photos/9795032/pexels-photo-9795032.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "9-11", pinyin: "tí", viet: "câu hỏi, đề bài", hanzi: "题", lesson: 9, image: "https://images.pexels.com/photos/18889468/pexels-photo-18889468.jpeg?auto=compress&cs=tinysrgb&h=350" },

  // ==================== BÀI 10 (9 từ) ====================
  { id: "10-1", pinyin: "kè", viet: "giờ học, môn, bài", hanzi: "课", lesson: 10, image: "https://images.pexels.com/photos/8617769/pexels-photo-8617769.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "10-2", pinyin: "bāngzhù", viet: "giúp ích, giúp đỡ", hanzi: "帮助", lesson: 10, image: "https://images.pexels.com/photos/12820057/pexels-photo-12820057.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "10-3", pinyin: "bié", viet: "đừng", hanzi: "别", lesson: 10, image: "https://images.pexels.com/photos/19964901/pexels-photo-19964901.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "10-4", pinyin: "gēge", viet: "anh trai", hanzi: "哥哥", lesson: 10, image: "https://images.pexels.com/photos/16160902/pexels-photo-16160902.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "10-5", pinyin: "jīdàn", viet: "trứng gà", hanzi: "鸡蛋", lesson: 10, image: "https://images.pexels.com/photos/161496/eggs-happen-food-ecology-161496.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "10-6", pinyin: "xīguā", viet: "dưa hấu", hanzi: "西瓜", lesson: 10, image: "https://images.pexels.com/photos/8743922/pexels-photo-8743922.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "10-7", pinyin: "zhèngzài", viet: "đang", hanzi: "正在", lesson: 10, image: "https://images.pexels.com/photos/376704/pexels-photo-376704.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "10-8", pinyin: "shǒujī", viet: "điện thoại di động", hanzi: "手机", lesson: 10, image: "https://images.pexels.com/photos/947407/pexels-photo-947407.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "10-9", pinyin: "xǐ", viet: "giặt, rửa", hanzi: "洗", lesson: 10, image: "https://images.pexels.com/photos/4328899/pexels-photo-4328899.jpeg?auto=compress&cs=tinysrgb&h=350" },

  // ==================== BÀI 11 (11 từ) ====================
  { id: "11-1", pinyin: "chàng gē", viet: "hát", hanzi: "唱歌", lesson: 11, image: "https://images.pexels.com/photos/2247677/pexels-photo-2247677.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "11-2", pinyin: "nán", viet: "thuộc về nam giới", hanzi: "男", lesson: 11, image: "https://images.pexels.com/photos/14807454/pexels-photo-14807454.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "11-3", pinyin: "nǚ", viet: "thuộc về nữ giới", hanzi: "女", lesson: 11, image: "https://images.pexels.com/photos/20238229/pexels-photo-20238229.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "11-4", pinyin: "háizi", viet: "trẻ con, trẻ em", hanzi: "孩子", lesson: 11, image: "https://images.pexels.com/photos/23441083/pexels-photo-23441083.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "11-5", pinyin: "yòubian", viet: "bên phải", hanzi: "右边", lesson: 11, image: "https://images.pexels.com/photos/15556082/pexels-photo-15556082.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "11-6", pinyin: "bǐ", viet: "hơn (so sánh)", hanzi: "比", lesson: 11, image: "https://images.pexels.com/photos/19601376/pexels-photo-19601376.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "11-7", pinyin: "piányi", viet: "rẻ", hanzi: "便宜", lesson: 11, image: "https://images.pexels.com/photos/3780403/pexels-photo-3780403.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "11-8", pinyin: "shuō huà", viet: "nói chuyện", hanzi: "说话", lesson: 11, image: "https://images.pexels.com/photos/18325674/pexels-photo-18325674.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "11-9", pinyin: "kěnéng", viet: "có thể, có lẽ", hanzi: "可能", lesson: 11, image: "https://images.pexels.com/photos/8817675/pexels-photo-8817675.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "11-10", pinyin: "qùnián", viet: "năm ngoái", hanzi: "去年", lesson: 11, image: "https://images.pexels.com/photos/6325566/pexels-photo-6325566.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "11-11", pinyin: "xìng", viet: "mang họ", hanzi: "姓", lesson: 11, image: "https://images.pexels.com/photos/819810/pexels-photo-819810.jpeg?auto=compress&cs=tinysrgb&h=350" },

  // ==================== BÀI 12 (9 từ) ====================
  { id: "12-1", pinyin: "de", viet: "trợ từ (bổ ngữ trạng thái)", hanzi: "得", lesson: 12, image: "https://images.pexels.com/photos/16549999/pexels-photo-16549999.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "12-2", pinyin: "qīzi", viet: "vợ", hanzi: "妻子", lesson: 12, image: "https://images.pexels.com/photos/14788180/pexels-photo-14788180.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "12-3", pinyin: "xuě", viet: "tuyết", hanzi: "雪", lesson: 12, image: "https://images.pexels.com/photos/11255800/pexels-photo-11255800.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "12-4", pinyin: "líng", viet: "số không (0)", hanzi: "零", lesson: 12, image: "https://images.pexels.com/photos/34968620/pexels-photo-34968620.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "12-5", pinyin: "dù", viet: "độ (nhiệt độ)", hanzi: "度", lesson: 12, image: "https://images.pexels.com/photos/7541123/pexels-photo-7541123.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "12-6", pinyin: "chuān", viet: "mặc, mang", hanzi: "穿", lesson: 12, image: "https://images.pexels.com/photos/16206291/pexels-photo-16206291.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "12-7", pinyin: "jìn", viet: "vào", hanzi: "进", lesson: 12, image: "https://images.pexels.com/photos/26508559/pexels-photo-26508559.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "12-8", pinyin: "dìdi", viet: "em trai", hanzi: "弟弟", lesson: 12, image: "https://images.pexels.com/photos/7860712/pexels-photo-7860712.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "12-9", pinyin: "jìn", viet: "gần", hanzi: "近", lesson: 12, image: "https://images.pexels.com/photos/36331944/pexels-photo-36331944.jpeg?auto=compress&cs=tinysrgb&h=350" },

  // ==================== BÀI 13 (11 từ) ====================
  { id: "13-1", pinyin: "zhe", viet: "trợ từ động thái", hanzi: "着", lesson: 13, image: "https://images.pexels.com/photos/13975904/pexels-photo-13975904.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "13-2", pinyin: "shǒu", viet: "tay", hanzi: "手", lesson: 13, image: "https://images.pexels.com/photos/1454797/pexels-photo-1454797.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "13-3", pinyin: "ná", viet: "cầm, nắm", hanzi: "拿", lesson: 13, image: "https://images.pexels.com/photos/6287505/pexels-photo-6287505.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "13-4", pinyin: "qiānbǐ", viet: "bút chì", hanzi: "铅笔", lesson: 13, image: "https://images.pexels.com/photos/18889469/pexels-photo-18889469.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "13-5", pinyin: "bān", viet: "lớp", hanzi: "班", lesson: 13, image: "https://images.pexels.com/photos/17824828/pexels-photo-17824828.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "13-6", pinyin: "zhǎng", viet: "sinh ra, mọc", hanzi: "长", lesson: 13, image: "https://images.pexels.com/photos/9975992/pexels-photo-9975992.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "13-7", pinyin: "xiào", viet: "cười", hanzi: "笑", lesson: 13, image: "https://images.pexels.com/photos/8838971/pexels-photo-8838971.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "13-8", pinyin: "bīnguǎn", viet: "khách sạn", hanzi: "宾馆", lesson: 13, image: "https://images.pexels.com/photos/20885752/pexels-photo-20885752.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "13-9", pinyin: "yìzhí", viet: "thẳng, luôn luôn", hanzi: "一直", lesson: 13, image: "https://images.pexels.com/photos/36312841/pexels-photo-36312841.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "13-10", pinyin: "wǎng", viet: "về phía, hướng về", hanzi: "往", lesson: 13, image: "https://images.pexels.com/photos/5764281/pexels-photo-5764281.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "13-11", pinyin: "lùkǒu", viet: "giao lộ, ngã tư", hanzi: "路口", lesson: 13, image: "https://images.pexels.com/photos/938582/pexels-photo-938582.jpeg?auto=compress&cs=tinysrgb&h=350" },

  // ==================== BÀI 14 (7 từ) ====================
  { id: "14-1", pinyin: "yìsi", viet: "ý nghĩa", hanzi: "意思", lesson: 14, image: "https://images.pexels.com/photos/20107107/pexels-photo-20107107.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "14-2", pinyin: "dànshì", viet: "nhưng", hanzi: "但是", lesson: 14, image: "https://images.pexels.com/photos/38527006/pexels-photo-38527006.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "14-3", pinyin: "suīrán", viet: "mặc dù, tuy", hanzi: "虽然", lesson: 14, image: "https://images.pexels.com/photos/938580/pexels-photo-938580.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "14-4", pinyin: "cì", viet: "lần", hanzi: "次", lesson: 14, image: "https://images.pexels.com/photos/6816369/pexels-photo-6816369.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "14-5", pinyin: "wánr", viet: "chơi, chơi đùa", hanzi: "玩儿", lesson: 14, image: "https://images.pexels.com/photos/25047774/pexels-photo-25047774.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "14-6", pinyin: "qíng", viet: "có nắng, nắng ráo", hanzi: "晴", lesson: 14, image: "https://images.pexels.com/photos/39387572/pexels-photo-39387572.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "14-7", pinyin: "bǎi", viet: "một trăm, trăm", hanzi: "百", lesson: 14, image: "https://images.pexels.com/photos/8366383/pexels-photo-8366383.jpeg?auto=compress&cs=tinysrgb&h=350" },

  // ==================== BÀI 15 (8 từ) ====================
  { id: "15-1", pinyin: "rì", viet: "ngày", hanzi: "日", lesson: 15, image: "https://images.pexels.com/photos/16805516/pexels-photo-16805516.png?auto=compress&cs=tinysrgb&h=350" },
  { id: "15-2", pinyin: "xīnnián", viet: "năm mới, Tết", hanzi: "新年", lesson: 15, image: "https://images.pexels.com/photos/38463274/pexels-photo-38463274.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "15-3", pinyin: "piào", viet: "vé", hanzi: "票", lesson: 15, image: "https://images.pexels.com/photos/36063995/pexels-photo-36063995.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "15-4", pinyin: "huǒchēzhàn", viet: "ga tàu hỏa", hanzi: "火车站", lesson: 15, image: "https://images.pexels.com/photos/33928465/pexels-photo-33928465.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "15-5", pinyin: "dàjiā", viet: "mọi người", hanzi: "大家", lesson: 15, image: "https://images.pexels.com/photos/12102889/pexels-photo-12102889.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "15-6", pinyin: "gèng", viet: "càng, hơn nữa", hanzi: "更", lesson: 15, image: "https://images.pexels.com/photos/29411109/pexels-photo-29411109.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "15-7", pinyin: "mèimei", viet: "em gái", hanzi: "妹妹", lesson: 15, image: "https://images.pexels.com/photos/32989456/pexels-photo-32989456.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: "15-8", pinyin: "yīn", viet: "u ám, nhiều mây", hanzi: "阴", lesson: 15, image: "https://images.pexels.com/photos/12008659/pexels-photo-12008659.jpeg?auto=compress&cs=tinysrgb&h=350" }
];

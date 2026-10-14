import { DICTIONARY_BY_HANZI, DICTIONARY_WORDS } from '#lib/data/dictionaryData';
import { HSK1_VOCABULARY } from '#lib/data/hsk1Vocabulary';
import { CHARACTER_DETAIL_MAP } from '#lib/data/characterDetailMap';
import { SINGLE_CHARACTER_VI_MAP } from '#lib/data/singleCharacterViMap';

export interface ExamDictWord {
  id: string;
  hanzi: string;
  pinyin: string;
  pinyinClean?: string;
  hanViet?: string;
  viet: string;
  hskLevel?: number;
  partOfSpeech?: string;
  vi_meaning_short?: string;
}

export interface DictTooltipState {
  isOpen: boolean;
  wordData: ExamDictWord | null;
  targetRect: DOMRect | null;
  rawText: string;
}

// Xây dựng kho tra cứu hợp nhất HSK 1, HSK 2 và Chi tiết từng chữ Hán
const unifiedHanziMap = new Map<string, ExamDictWord>();
const unifiedPinyinMap = new Map<string, ExamDictWord>();

// 1. Nạp từ HSK 2 (ưu tiên cao nhất - dữ liệu chi tiết nhất)
for (const w of DICTIONARY_WORDS) {
  unifiedHanziMap.set(w.hanzi, w);
  const pLower = w.pinyin.toLowerCase();
  const pClean = w.pinyinClean.toLowerCase();
  if (!unifiedPinyinMap.has(pLower)) unifiedPinyinMap.set(pLower, w);
  if (!unifiedPinyinMap.has(pClean)) unifiedPinyinMap.set(pClean, w);
}

// 2. Nạp từ HSK 1 (bổ sung các từ cơ bản: 飞机, 妈妈, 天气, v.v.)
for (const v of HSK1_VOCABULARY) {
  if (!unifiedHanziMap.has(v.hanzi)) {
    const cleanPy = v.pinyin.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const item: ExamDictWord = {
      id: v.id,
      hanzi: v.hanzi,
      pinyin: v.pinyin,
      pinyinClean: cleanPy,
      viet: v.viet,
      hskLevel: 1,
      partOfSpeech: 'từ vựng'
    };
    unifiedHanziMap.set(v.hanzi, item);
    const vLower = v.pinyin.toLowerCase();
    if (!unifiedPinyinMap.has(vLower)) unifiedPinyinMap.set(vLower, item);
    if (!unifiedPinyinMap.has(cleanPy)) unifiedPinyinMap.set(cleanPy, item);
  }
}

// 3. Nạp ký tự đơn lẻ từ CHARACTER_DETAIL_MAP và SINGLE_CHARACTER_VI_MAP (đảm bảo từng chữ như '天', '晴', '见' đều có nghĩa tiếng Việt thuần túy)
for (const [char, detail] of Object.entries(CHARACTER_DETAIL_MAP)) {
  const viData = SINGLE_CHARACTER_VI_MAP[char];
  const cleanPy = detail.pinyin.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  if (!unifiedHanziMap.has(char)) {
    const item: ExamDictWord = {
      id: `char-${char}`,
      hanzi: char,
      pinyin: detail.pinyin,
      pinyinClean: cleanPy,
      hanViet: viData?.hanViet || detail.radicalNameVi || '',
      viet: viData?.viet || 'Chữ Hán cơ bản',
      hskLevel: 1,
      partOfSpeech: 'chữ hán'
    };
    unifiedHanziMap.set(char, item);
    const dLower = detail.pinyin.toLowerCase();
    if (!unifiedPinyinMap.has(dLower)) unifiedPinyinMap.set(dLower, item);
    if (!unifiedPinyinMap.has(cleanPy)) unifiedPinyinMap.set(cleanPy, item);
  } else {
    // Nếu từ đã có nhưng thiếu âm Hán-Việt, bổ sung từ SINGLE_CHARACTER_VI_MAP
    const existing = unifiedHanziMap.get(char)!;
    if (!existing.hanViet && viData?.hanViet) {
      existing.hanViet = viData.hanViet;
    }
  }
}

// Bổ sung các chữ còn lại trong SINGLE_CHARACTER_VI_MAP
for (const [char, viData] of Object.entries(SINGLE_CHARACTER_VI_MAP)) {
  const existing = unifiedHanziMap.get(char);
  if (existing) {
    if (!existing.hanViet && viData.hanViet) {
      existing.hanViet = viData.hanViet;
    }
  } else {
    unifiedHanziMap.set(char, {
      id: `char-${char}`,
      hanzi: char,
      pinyin: '',
      hanViet: viData.hanViet,
      viet: viData.viet,
      hskLevel: 1,
      partOfSpeech: 'chữ hán'
    });
  }
}

// Các cụm từ ghép thông dụng trong đề thi HSK
const EXAM_COMMON_COMPOUNDS: ExamDictWord[] = [
  { id: 'cmp-xiaomao', hanzi: '小猫', pinyin: 'xiǎomāo', pinyinClean: 'xiaomao', viet: 'mèo con, chú mèo nhỏ', hskLevel: 1, partOfSpeech: 'danh từ' },
  { id: 'cmp-xiaogou', hanzi: '小狗', pinyin: 'xiǎogǒu', pinyinClean: 'xiaogou', viet: 'chó con, cún con', hskLevel: 1, partOfSpeech: 'danh từ' },
  { id: 'cmp-xiangyao', hanzi: '想要', pinyin: 'xiǎngyào', pinyinClean: 'xiangyao', viet: 'muốn, mong muốn có được', hskLevel: 1, partOfSpeech: 'động từ' },
  { id: 'cmp-yige', hanzi: '一个', pinyin: 'yígè', pinyinClean: 'yige', viet: 'một, một cái, một người', hskLevel: 1, partOfSpeech: 'cụm từ' },
  { id: 'cmp-henduo', hanzi: '很多', pinyin: 'hěnduō', pinyinClean: 'henduo', viet: 'rất nhiều', hskLevel: 1, partOfSpeech: 'cụm từ' },
  { id: 'cmp-henshao', hanzi: '很少', pinyin: 'hěnshǎo', pinyinClean: 'henshao', viet: 'rất ít', hskLevel: 1, partOfSpeech: 'cụm từ' },
  { id: 'cmp-yixia', hanzi: '一下', pinyin: 'yíxià', pinyinClean: 'yixia', viet: 'một chút, một lát', hskLevel: 2, partOfSpeech: 'cụm từ' },
  { id: 'cmp-yidianr', hanzi: '一点儿', pinyin: 'yìdiǎnr', pinyinClean: 'yidianr', viet: 'một chút, một ít', hskLevel: 2, partOfSpeech: 'cụm từ' },
  { id: 'cmp-jiali', hanzi: '家里', pinyin: 'jiālǐ', pinyinClean: 'jiali', viet: 'trong nhà, ở nhà', hskLevel: 1, partOfSpeech: 'cụm từ' },
  { id: 'cmp-youyitian', hanzi: '有一天', pinyin: 'yǒu yì tiān', pinyinClean: 'youyitian', viet: 'có một ngày, một ngày nào đó', hskLevel: 1, partOfSpeech: 'cụm từ' },
  { id: 'cmp-weishenme', hanzi: '为什么', pinyin: 'wèishénme', pinyinClean: 'weishenme', viet: 'tại sao, vì sao', hskLevel: 2, partOfSpeech: 'đại từ' },
  { id: 'cmp-shenmeshihou', hanzi: '什么时候', pinyin: 'shénmeshíhou', pinyinClean: 'shenmeshihou', viet: 'khi nào, lúc nào', hskLevel: 1, partOfSpeech: 'đại từ' },
  { id: 'cmp-duochangshijian', hanzi: '多长时间', pinyin: 'duōchángshíjiān', pinyinClean: 'duochangshijian', viet: 'bao lâu, thời gian bao lâu', hskLevel: 2, partOfSpeech: 'cụm từ' },
  { id: 'cmp-tianqi', hanzi: '天气', pinyin: 'tiānqì', pinyinClean: 'tianqi', viet: 'thời tiết, khí trời', hskLevel: 1, partOfSpeech: 'danh từ' },
  { id: 'cmp-xiaxue', hanzi: '下雪', pinyin: 'xiàxuě', pinyinClean: 'xiaxue', viet: 'tuyết rơi, có tuyết', hskLevel: 2, partOfSpeech: 'động từ' },
  { id: 'cmp-xiayu', hanzi: '下雨', pinyin: 'xiàyǔ', pinyinClean: 'xiayu', viet: 'mưa rơi, trời mưa', hskLevel: 1, partOfSpeech: 'động từ' },
  { id: 'cmp-tianqing', hanzi: '天晴', pinyin: 'tiānqíng', pinyinClean: 'tianqing', viet: 'trời nắng, hửng nắng', hskLevel: 2, partOfSpeech: 'tính từ' }
];

for (const c of EXAM_COMMON_COMPOUNDS) {
  unifiedHanziMap.set(c.hanzi, c);
  unifiedPinyinMap.set(c.pinyin.toLowerCase(), c);
  unifiedPinyinMap.set(c.pinyinClean!.toLowerCase(), c);
}

// Bổ sung các biến thể biến điệu pinyin thông dụng (Tone sandhi)
const yiItem: ExamDictWord = { id: 'char-yi', hanzi: '一', pinyin: 'yī', pinyinClean: 'yi', viet: 'số 1, một', hskLevel: 1, partOfSpeech: 'số từ' };
unifiedPinyinMap.set('yī', yiItem);
unifiedPinyinMap.set('yí', yiItem);
unifiedPinyinMap.set('yì', yiItem);
unifiedPinyinMap.set('yi', yiItem);

const buItem: ExamDictWord = { id: 'char-bu', hanzi: '不', pinyin: 'bù', pinyinClean: 'bu', viet: 'không, chẳng', hskLevel: 1, partOfSpeech: 'phó từ' };
unifiedPinyinMap.set('bù', buItem);
unifiedPinyinMap.set('bú', buItem);
unifiedPinyinMap.set('bu', buItem);

const yaoItem: ExamDictWord = { id: 'char-yao', hanzi: '要', pinyin: 'yào', pinyinClean: 'yao', viet: 'muốn, cần, phải, sẽ', hskLevel: 2, partOfSpeech: 'động từ' };
unifiedPinyinMap.set('yào', yaoItem);
unifiedPinyinMap.set('yao', yaoItem);

// Thuật toán tách âm tiết pinyin ghép đa âm
function segmentPinyin(str: string): ExamDictWord[] | null {
  const lower = str.toLowerCase();
  const noTone = lower.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  if (unifiedPinyinMap.has(lower)) return [unifiedPinyinMap.get(lower)!];
  if (unifiedPinyinMap.has(noTone)) return [unifiedPinyinMap.get(noTone)!];

  const n = lower.length;
  for (let len = n - 1; len >= 2; len--) {
    const prefix = lower.slice(0, len);
    const prefixNoTone = prefix.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const prefixWord = unifiedPinyinMap.get(prefix) || unifiedPinyinMap.get(prefixNoTone);
    if (prefixWord) {
      const rest = lower.slice(len);
      const restWords = segmentPinyin(rest);
      if (restWords && restWords.length > 0) {
        return [prefixWord, ...restWords];
      }
    }
  }
  return null;
}

class ExamDictStore {
  isOpen = $state(false);
  wordData = $state<ExamDictWord | null>(null);
  targetRect = $state<DOMRect | null>(null);
  rawText = $state('');
  private hideTimer: any = null;

  lookup(text: string): ExamDictWord | null {
    if (!text) return null;
    const clean = text.trim();

    // 1. Nếu là chữ Hán:
    if (/[\u4e00-\u9fa5]/.test(clean)) {
      // 1.1 Tra cứu chính xác cả cụm
      if (unifiedHanziMap.has(clean)) {
        return unifiedHanziMap.get(clean)!;
      }
      // 1.2 Nếu là cụm ghép nhiều chữ (như '天晴', '下雪', '飞机票'), tìm từ tố HSK 2 / HSK 1 phù hợp nhất
      if (clean.length > 1) {
        // Ưu tiên từ có trong DICTIONARY_WORDS (HSK 2)
        for (let i = 0; i < clean.length; i++) {
          const ch = clean[i];
          if (DICTIONARY_BY_HANZI[ch]) return DICTIONARY_BY_HANZI[ch];
        }
        // Thử tìm bất kỳ ký tự nào có trong unifiedHanziMap
        for (let i = 0; i < clean.length; i++) {
          const ch = clean[i];
          if (unifiedHanziMap.has(ch)) return unifiedHanziMap.get(ch)!;
        }
      }
      return null;
    }

    // 2. Nếu là Pinyin:
    const cleanLower = clean.toLowerCase();
    if (unifiedPinyinMap.has(cleanLower)) {
      return unifiedPinyinMap.get(cleanLower)!;
    }
    // Khử dấu thanh âm (tiān -> tian, qíng -> qing)
    const cleanNoTone = cleanLower.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (unifiedPinyinMap.has(cleanNoTone)) {
      return unifiedPinyinMap.get(cleanNoTone)!;
    }

    // 2.3 Phân giải âm tiết ghép (như 'xiǎomāo', 'tiānqíngle', 'chīfàn', 'kànshū')
    const segs = segmentPinyin(clean);
    if (segs && segs.length > 0) {
      if (segs.length === 1) return segs[0];
      const combinedHanzi = segs.map((s) => s.hanzi).join('');
      const combinedPinyin = segs.map((s) => s.pinyin).join(' ');
      const combinedViet = segs.map((s) => `${s.hanzi}: ${s.viet}`).join(' | ');
      return {
        id: `compound-${combinedHanzi}`,
        hanzi: combinedHanzi,
        pinyin: combinedPinyin,
        viet: combinedViet,
        hskLevel: Math.max(...segs.map((s) => s.hskLevel || 1)),
        partOfSpeech: 'từ ghép'
      };
    }

    return null;
  }

  show(text: string, rect: DOMRect) {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
    const clean = text.trim();
    const word = this.lookup(clean);
    if (!word) {
      return; // Không tìm thấy thì không mở tooltip rác
    }
    this.wordData = word;
    this.rawText = clean;
    this.targetRect = rect;
    this.isOpen = true;
  }

  scheduleHide(delay = 250) {
    if (this.hideTimer) clearTimeout(this.hideTimer);
    this.hideTimer = setTimeout(() => {
      this.isOpen = false;
      this.hideTimer = null;
    }, delay);
  }

  cancelHide() {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
  }

  hide() {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
    this.isOpen = false;
  }
}

export const examDictState = new ExamDictStore();

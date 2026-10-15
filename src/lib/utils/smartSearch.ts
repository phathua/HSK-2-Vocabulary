import type { DictWord } from '#lib/data/dictionaryData';

export interface SmartSuggestionItem {
  word: DictWord;
  score: number;
  reason: string;
}

// 400+ Mandarin Pinyin syllables for accurate syllable segmentation
const PINYIN_SYLLABLES = new Set([
  'a', 'ai', 'an', 'ang', 'ao', 'ba', 'bai', 'ban', 'bang', 'bao', 'bei', 'ben', 'beng', 'bi', 'bian', 'biao', 'bie', 'bin', 'bing', 'bo', 'bu',
  'ca', 'cai', 'can', 'cang', 'cao', 'ce', 'cen', 'ceng', 'cha', 'chai', 'chan', 'chang', 'chao', 'che', 'chen', 'cheng', 'chi', 'chong', 'chou', 'chu', 'chua', 'chuai', 'chuan', 'chuang', 'chui', 'chun', 'chuo', 'ci', 'cong', 'cou', 'cu', 'cuan', 'cui', 'cun', 'cuo',
  'da', 'dai', 'dan', 'dang', 'dao', 'de', 'dei', 'den', 'deng', 'di', 'dia', 'dian', 'diao', 'die', 'ding', 'diu', 'dong', 'dou', 'du', 'duan', 'dui', 'dun', 'duo',
  'e', 'ei', 'en', 'eng', 'er',
  'fa', 'fan', 'fang', 'fei', 'fen', 'feng', 'fo', 'fou', 'fu',
  'ga', 'gai', 'gan', 'gang', 'gao', 'ge', 'gei', 'gen', 'geng', 'gong', 'gou', 'gu', 'gua', 'guai', 'guan', 'guang', 'gui', 'gun', 'guo',
  'ha', 'hai', 'han', 'hang', 'hao', 'he', 'hei', 'hen', 'heng', 'hong', 'hou', 'hu', 'hua', 'huai', 'huan', 'huang', 'hui', 'hun', 'huo',
  'ji', 'jia', 'jian', 'jiang', 'jiao', 'jie', 'jin', 'jing', 'jiong', 'jiu', 'ju', 'juan', 'jue', 'jun',
  'ka', 'kai', 'kan', 'kang', 'kao', 'ke', 'kei', 'ken', 'keng', 'kong', 'kou', 'ku', 'kua', 'kuai', 'kuan', 'kuang', 'kui', 'kun', 'kuo',
  'la', 'lai', 'lan', 'lang', 'lao', 'le', 'lei', 'leng', 'li', 'lia', 'lian', 'liang', 'liao', 'lie', 'lin', 'ling', 'liu', 'lo', 'long', 'lou', 'lu', 'luan', 'lun', 'luo', 'lv', 'lü', 'lue', 'lüe',
  'ma', 'mai', 'man', 'mang', 'mao', 'me', 'mei', 'men', 'meng', 'mi', 'mian', 'miao', 'mie', 'min', 'ming', 'miu', 'mo', 'mou', 'mu',
  'na', 'nai', 'nan', 'nang', 'nao', 'ne', 'nei', 'nen', 'neng', 'ni', 'nian', 'niang', 'niao', 'nie', 'nin', 'ning', 'niu', 'nong', 'nou', 'nu', 'nuan', 'nun', 'nuo', 'nv', 'nü', 'nue', 'nüe',
  'o', 'ou',
  'pa', 'pai', 'pan', 'pang', 'pao', 'pei', 'pen', 'peng', 'pi', 'pian', 'piao', 'pie', 'pin', 'ping', 'po', 'pou', 'pu',
  'qi', 'qia', 'qian', 'qiang', 'qiao', 'qie', 'qin', 'qing', 'qiong', 'qiu', 'qu', 'quan', 'que', 'qun',
  'ran', 'rang', 'rao', 're', 'ren', 'reng', 'ri', 'rong', 'rou', 'ru', 'ruan', 'rui', 'run', 'ruo',
  'sa', 'sai', 'san', 'sang', 'sao', 'se', 'sen', 'seng', 'sha', 'shai', 'shan', 'shang', 'shao', 'she', 'shei', 'shen', 'sheng', 'shi', 'shou', 'shu', 'shua', 'shuai', 'shuan', 'shuang', 'shui', 'shun', 'shuo', 'si', 'song', 'sou', 'su', 'suan', 'sui', 'sun', 'suo',
  'ta', 'tai', 'tan', 'tang', 'tao', 'te', 'teng', 'ti', 'tian', 'tiao', 'tie', 'ting', 'tong', 'tou', 'tu', 'tuan', 'tui', 'tun', 'tuo',
  'wa', 'wai', 'wan', 'wang', 'wei', 'wen', 'weng', 'wo', 'wu',
  'xi', 'xia', 'xian', 'xiang', 'xiao', 'xie', 'xin', 'xing', 'xiong', 'xiu', 'xu', 'xuan', 'xue', 'xun',
  'ya', 'yan', 'yang', 'yao', 'ye', 'yi', 'yin', 'ying', 'yo', 'yong', 'you', 'yu', 'yuan', 'yue', 'yun',
  'za', 'zai', 'zan', 'zang', 'zao', 'ze', 'zei', 'zen', 'zeng', 'zha', 'zhai', 'zhan', 'zhang', 'zhao', 'zhe', 'zhei', 'zhen', 'zheng', 'zhi', 'zhong', 'zhou', 'zhu', 'zhua', 'zhuai', 'zhuan', 'zhuang', 'zhui', 'zhun', 'zhuo', 'zi', 'zong', 'zou', 'zu', 'zuan', 'zui', 'zun', 'zuo'
]);

export function normalizePinyin(str: string): string {
  return (str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[üǖǘǚǜ]/g, 'u')
    .replace(/v/g, 'u')
    .toLowerCase()
    .replace(/[^a-z]/g, '');
}

export function normalizeVietnamese(str: string): string {
  return (str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
}

export function segmentPinyin(str: string): string[] {
  const clean = normalizePinyin(str);
  if (!clean) return [];
  const res: string[] = [];
  let i = 0;
  while (i < clean.length) {
    let matched = false;
    for (let len = Math.min(6, clean.length - i); len >= 1; len--) {
      const sub = clean.slice(i, i + len);
      if (PINYIN_SYLLABLES.has(sub)) {
        res.push(sub);
        i += len;
        matched = true;
        break;
      }
    }
    if (!matched) {
      res.push(clean[i]);
      i++;
    }
  }
  return res;
}

export function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const d: number[][] = [];
  for (let i = 0; i <= m; i++) d[i] = [i];
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + cost
      );
    }
  }
  return d[m][n];
}

/**
 * Multi-dimensional smart recommendation engine for dictionary search:
 * - Levenshtein edit distance for phonetic typos
 * - Syllable prefix & suffix overlap (e.g. naxie <-> zhexie share suffix 'xie')
 * - Hanzi character intersection (e.g. 那些 shares '那' and '些' with 这/些/那儿)
 * - Vietnamese semantic token overlap
 * - Correlative demonstratives heuristic (这 <-> 那, 这些 <-> 那些)
 * - Antonym, synonym & collocation relations
 */
export function getSmartSuggestions(query: string, wordsPool: DictWord[], limit = 8): SmartSuggestionItem[] {
  const rawQ = (query || '').trim();
  if (!rawQ || wordsPool.length === 0) return [];

  const qNormPinyin = normalizePinyin(rawQ);
  const qNormVi = normalizeVietnamese(rawQ);
  const qSyllables = segmentPinyin(rawQ);
  const hanziChars = rawQ.match(/[\u4e00-\u9fa5]/g) || [];

  const candidates: SmartSuggestionItem[] = [];

  for (const w of wordsPool) {
    const wNormPinyin = normalizePinyin(w.pinyinClean || w.pinyin);
    const wNormVi = normalizeVietnamese(w.viet + ' ' + (w.vi_meaning_short || '') + ' ' + (w.vi_meaning_full || ''));
    const wSyllables = segmentPinyin(w.pinyinClean || w.pinyin);

    let score = 0;
    const reasons: string[] = [];

    // 1. Pinyin edit distance
    if (qNormPinyin && wNormPinyin) {
      const dist = levenshtein(qNormPinyin, wNormPinyin);
      const maxLen = Math.max(qNormPinyin.length, wNormPinyin.length);
      const sim = 1 - dist / maxLen;

      if (dist === 1) {
        score += 65;
        reasons.push('Phát âm gần giống (sai 1 ký tự)');
      } else if (dist === 2 && maxLen >= 5) {
        score += 35;
        reasons.push('Phát âm gần giống');
      } else if (sim >= 0.65) {
        score += Math.round(sim * 30);
      }
    }

    // 2. Syllable overlap (e.g. naxie shares 'xie' with zhexie)
    if (qSyllables.length > 0 && wSyllables.length > 0) {
      const commonSyllables = qSyllables.filter((s) => wSyllables.includes(s));
      if (commonSyllables.length > 0) {
        const sharedSuffix = qSyllables[qSyllables.length - 1] === wSyllables[wSyllables.length - 1];
        const sharedPrefix = qSyllables[0] === wSyllables[0];

        const bonus = commonSyllables.length * 25 + (sharedSuffix ? 15 : 0) + (sharedPrefix ? 10 : 0);
        score += bonus;
        reasons.push(`Chung âm tiết [${commonSyllables.join(', ')}]`);
      }
    }

    // 3. Hanzi character overlap (e.g. 那些 -> 这些 via 些, or 那儿 via 那)
    if (hanziChars.length > 0) {
      const wHanziChars = Array.from(w.hanzi);
      const commonHanzi = hanziChars.filter((c) => wHanziChars.includes(c));
      if (commonHanzi.length > 0) {
        score += commonHanzi.length * 40;
        reasons.push(`Cùng chữ Hán (${commonHanzi.join(', ')})`);
      }
    }

    // 4. Vietnamese semantic overlap
    if (qNormVi) {
      const qTokens = qNormVi.split(/\s+/).filter((t) => t.length >= 2);
      const wTokens = wNormVi.split(/\s+/).filter((t) => t.length >= 2);
      const matchedTokens = qTokens.filter((t) => wTokens.includes(t));
      if (matchedTokens.length > 0) {
        score += matchedTokens.length * 20;
        reasons.push(`Ý nghĩa tương đồng ("${matchedTokens.join(' ')}")`);
      }
    }

    // 5. Antonyms / Synonyms / Collocations relation check
    const relatedTokens: string[] = [
      ...(Array.isArray(w.antonyms) ? w.antonyms.map((a) => (typeof a === 'string' ? a : a.hanzi)) : []),
      ...(Array.isArray(w.synonyms) ? w.synonyms.map((s) => (typeof s === 'string' ? s : s.hanzi)) : []),
      ...(w.compounds || []),
      ...(w.collocations || [])
    ];
    for (const rel of relatedTokens) {
      if (rel.includes(rawQ) || rawQ.includes(rel)) {
        score += 55;
        reasons.push(`Từ tương phản / liên kết: ${rel}`);
        break;
      }
    }

    // 6. Correlative demonstrative pairs (这 <-> 那, 这些 <-> 那些, 这儿 <-> 那儿)
    if (
      (qNormPinyin.startsWith('na') && wNormPinyin.startsWith('zhe')) ||
      (qNormPinyin.startsWith('zhe') && wNormPinyin.startsWith('na'))
    ) {
      if (wNormPinyin.endsWith(qNormPinyin.slice(2)) || qNormPinyin.endsWith(wNormPinyin.slice(3))) {
        score += 50;
        reasons.push('Cặp từ đối ứng Chỉ định (Đây / Kia)');
      }
    }

    if (score > 15) {
      candidates.push({
        word: w,
        score,
        reason: reasons[0] || 'Từ vựng liên quan'
      });
    }
  }

  candidates.sort((a, b) => b.score - a.score);
  return candidates.slice(0, limit);
}

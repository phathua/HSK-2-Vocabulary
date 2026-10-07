import type { VocabItem } from '#lib/data/hsk2Vocabulary';
import { shuffleArray } from './speech';

// Danh sách các tiền tố / gốc từ âm tiết quan trọng hay gặp trong HSK 1 & 2
const PREFIX_GROUPS = [
  'dian', // diàn (diànshì, diànyǐng, diànnǎo, diànhuà...)
  'kan',  // kàn (kànjiàn, kànshū...)
  'da',   // dǎ (dǎ diànhuà, dǎ lánqiú...)
  'shang',// shàng (shàngwǔ, shàngbān, shàngbian...)
  'xia',  // xià (xiàwǔ, xiàbān, xiàbian, xiàyǔ...)
  'zuo',  // zuò (zuò cài, zuò fēijī, zuòxia...)
  'mai',  // mǎi / mài (mua / bán)
  'chi',  // chī (chī fàn, chī yào...)
  'shui', // shuǐ (hē shuǐ, shuǐguǒ...)
  'shuo', // shuō (shuōhuà...)
  'ting', // tīng (tīngjiàn, tīng yīnyuè...)
  'xue',  // xué (xuéxí, xuéshēng, xuéxiào...)
  'kai',  // kāi (kāishǐ, kāichē, kāihuì...)
  'gong'  // gōng (gōngzuò, gōngsī...)
];

const SUFFIX_GROUPS = [
  'zi',   // bēizi, yǐzi, zhuōzi, érzi...
  'ren',  // nánrén, nǚrén, péngyou...
  'bian', // zuǒbian, yòubian, qiánbian, hòubian...
  'shi',  // diànshì, shíshang, jiàoshì...
  'sheng',// yīshēng, xuéshēng, xiānsheng...
  'dian', // shāngdiàn, fàndiàn...
  'che',  // qìchē, chūzūchē, huǒchē...
  'tian'  // jīntiān, míngtiān, zuótiān...
];

function getPinyinKey(pinyin: string): string {
  return pinyin
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[üǖǘǚǜ]/g, 'u')
    .toLowerCase()
    .replace(/[^a-z]/g, '');
}

/**
 * Thuật toán sinh 3 phương án gây nhiễu cho 1 từ vựng mục tiêu:
 * - Ưu tiên 1-2 từ có cùng tiền tố / hậu tố pinyin hoặc hanzi (gây nhiễu thông minh)
 * - Bổ sung các từ cùng bài học hoặc cùng cấp độ
 */
export function generateDistractors(
  target: VocabItem,
  allVocab: VocabItem[],
  count: number = 3
): VocabItem[] {
  const targetKey = getPinyinKey(target.pinyin);
  const targetHanzi = target.hanzi;

  // Lọc bỏ chính từ mục tiêu
  const candidates = allVocab.filter(v => v.id !== target.id);

  // 1. Tìm các từ có chung tiền tố hoặc hậu tố
  const similarItems: VocabItem[] = [];

  for (const item of candidates) {
    const itemKey = getPinyinKey(item.pinyin);

    // Kiểm tra tiền tố Pinyin
    for (const prefix of PREFIX_GROUPS) {
      if (targetKey.startsWith(prefix) && itemKey.startsWith(prefix)) {
        if (!similarItems.some(s => s.id === item.id)) similarItems.push(item);
      }
    }

    // Kiểm tra hậu tố Pinyin
    for (const suffix of SUFFIX_GROUPS) {
      if (targetKey.endsWith(suffix) && itemKey.endsWith(suffix)) {
        if (!similarItems.some(s => s.id === item.id)) similarItems.push(item);
      }
    }

    // Kiểm tra ký tự Hán trùng tiền tố hoặc hậu tố
    if (
      targetHanzi.length > 1 &&
      item.hanzi.length > 1 &&
      (targetHanzi[0] === item.hanzi[0] || targetHanzi[targetHanzi.length - 1] === item.hanzi[item.hanzi.length - 1])
    ) {
      if (!similarItems.some(s => s.id === item.id)) similarItems.push(item);
    }
  }

  const chosenDistractors: VocabItem[] = [];

  // Lấy 1-2 từ gây nhiễu tương đồng
  if (similarItems.length > 0) {
    const shuffledSimilar = shuffleArray(similarItems);
    const takeCount = Math.min(2, shuffledSimilar.length);
    for (let i = 0; i < takeCount; i++) {
      chosenDistractors.push(shuffledSimilar[i]);
    }
  }

  // 2. Nếu chưa đủ 3 đáp án nhiễu, lấy từ cùng bài học
  const sameLesson = candidates.filter(
    c => c.lesson === target.lesson && !chosenDistractors.some(d => d.id === c.id)
  );
  if (sameLesson.length > 0 && chosenDistractors.length < count) {
    const shuffledLesson = shuffleArray(sameLesson);
    while (chosenDistractors.length < count && shuffledLesson.length > 0) {
      chosenDistractors.push(shuffledLesson.pop()!);
    }
  }

  // 3. Nếu vẫn chưa đủ, lấy ngẫu nhiên từ kho chung
  const remaining = candidates.filter(c => !chosenDistractors.some(d => d.id === c.id));
  const shuffledRemaining = shuffleArray(remaining);
  while (chosenDistractors.length < count && shuffledRemaining.length > 0) {
    chosenDistractors.push(shuffledRemaining.pop()!);
  }

  return chosenDistractors;
}

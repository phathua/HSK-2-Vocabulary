/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Bảng các cặp phụ âm tương đồng / dễ nhầm lẫn trong Pinyin
const CONSONANT_CONFUSIONS: Record<string, string[]> = {
  'b': ['p', 'd'],
  'p': ['b', 't'],
  'm': ['n'],
  'f': ['h'],
  'd': ['t', 'b'],
  't': ['d', 'p'],
  'n': ['l', 'm'],
  'l': ['n', 'r'],
  'g': ['k', 'h'],
  'k': ['g', 'h'],
  'h': ['k', 'f'],
  'j': ['q', 'zh', 'z'],
  'q': ['j', 'ch', 'c'],
  'x': ['s', 'sh'],
  'zh': ['z', 'ch', 'j'],
  'ch': ['c', 'zh', 'q'],
  'sh': ['s', 'x'],
  'r': ['l'],
  'z': ['zh', 'c', 'j'],
  'c': ['ch', 'z', 'q'],
  's': ['sh', 'x'],
  'y': ['i', 'w'],
  'w': ['u', 'y']
};

// Bảng các biến thể dấu thanh điệu dễ gây nhầm (ā - à, á - ǎ, ...)
const VOWEL_TONE_CONFUSIONS: Record<string, string[]> = {
  'a': ['ā', 'á', 'ǎ', 'à'],
  'ā': ['à', 'á', 'a'],
  'á': ['ǎ', 'à', 'ā'],
  'ǎ': ['á', 'à', 'ā'],
  'à': ['ā', 'á', 'ǎ'],

  'e': ['ē', 'é', 'ě', 'è'],
  'ē': ['è', 'é', 'e'],
  'é': ['ě', 'è', 'ē'],
  'ě': ['é', 'è', 'ē'],
  'è': ['ē', 'é', 'ě'],

  'i': ['ī', 'í', 'ǐ', 'ì'],
  'ī': ['ì', 'í', 'i'],
  'í': ['ǐ', 'ì', 'ī'],
  'ǐ': ['í', 'ì', 'ī'],
  'ì': ['ī', 'í', 'ǐ'],

  'o': ['ō', 'ó', 'ǒ', 'ò'],
  'ō': ['ò', 'ó', 'o'],
  'ó': ['ǒ', 'ò', 'ō'],
  'ǒ': ['ó', 'ò', 'ō'],
  'ò': ['ō', 'ó', 'ǒ'],

  'u': ['ū', 'ú', 'ǔ', 'ù', 'ü', 'ǘ'],
  'ū': ['ù', 'ú', 'u', 'ǖ'],
  'ú': ['ǔ', 'ù', 'ū', 'ǘ'],
  'ǔ': ['ú', 'ù', 'ū', 'ǚ'],
  'ù': ['ū', 'ú', 'ǔ', 'ǜ'],

  'ü': ['u', 'ǖ', 'ǘ', 'ǚ', 'ǜ'],
  'ǖ': ['ǜ', 'ǘ', 'ü', 'ū'],
  'ǘ': ['ǚ', 'ǜ', 'ǖ', 'ú'],
  'ǚ': ['ǘ', 'ǜ', 'ǖ', 'ǔ'],
  'ǜ': ['ǖ', 'ǘ', 'ǚ', 'ù']
};

export interface TileSlot {
  id: string; // unique id per slot
  char: string; // correct target character
  isPreFilled: boolean; // given as a hint initially
  userChar: string | null; // character placed by user
  tileId: string | null; // ID of the tile currently placed here
}

export interface ChoiceTile {
  id: string; // unique id
  char: string;
  isUsed: boolean;
  isDistractor: boolean;
}

export interface WordChunk {
  chunkIndex: number;
  totalChunks: number;
  text: string; // e.g. "gōnggòng"
  slots: TileSlot[];
  tiles: ChoiceTile[];
}

/**
 * Xáo trộn mảng ngẫu nhiên
 */
function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Tìm các ký tự gây nhiễu hợp lý dựa trên ngữ âm và thanh điệu
 */
function generateDistractorsForChar(ch: string, count: number = 2): string[] {
  const lower = ch.toLowerCase();
  const distractors: string[] = [];

  // 1. Kiểm tra nếu là nguyên âm có thanh điệu
  if (VOWEL_TONE_CONFUSIONS[lower]) {
    const options = VOWEL_TONE_CONFUSIONS[lower].filter(c => c !== lower);
    distractors.push(...shuffle(options));
  }

  // 2. Kiểm tra nếu là phụ âm
  if (CONSONANT_CONFUSIONS[lower]) {
    const options = CONSONANT_CONFUSIONS[lower].filter(c => c !== lower);
    distractors.push(...shuffle(options));
  }

  // 3. Fallback nếu không có trong từ điển
  if (distractors.length === 0) {
    const defaultPool = ['d', 't', 'zh', 'z', 'sh', 's', 'ch', 'c', 'ā', 'à', 'í', 'ì', 'n', 'g'];
    distractors.push(...shuffle(defaultPool.filter(c => c !== lower)));
  }

  return distractors.slice(0, count);
}

/**
 * Tạo danh sách các chunks từ một chuỗi Pinyin đầy đủ (ví dụ: "gōnggòng qìchē")
 */
export function buildWordChunks(pinyinStr: string): WordChunk[] {
  if (!pinyinStr) return [];

  // Tách theo khoảng trắng
  const parts = pinyinStr.trim().split(/\s+/).filter(Boolean);

  return parts.map((partText, chunkIdx) => {
    const chars = Array.from(partText);
    const len = chars.length;

    // Xác định số lượng ký tự cho sẵn (prefilled)
    // Nếu từ ngắn (≤ 4 ký tự): 0 ký tự cho sẵn
    // Nếu từ trung bình (5-7 ký tự): 1 ký tự cho sẵn (ưu tiên vị trí đầu hoặc phụ âm quen thuộc)
    // Nếu từ dài (> 7 ký tự): 1-2 ký tự cho sẵn
    let prefillCount = 0;
    if (len >= 5 && len <= 7) {
      prefillCount = 1;
    } else if (len > 7) {
      prefillCount = 2;
    }

    // Chọn vị trí ngẫu nhiên để cho sẵn ký tự
    const prefillIndices = new Set<number>();
    if (prefillCount > 0) {
      // Ưu tiên cho ký tự đầu tiên để định hướng âm
      prefillIndices.add(0);
      if (prefillCount > 1 && len > 5) {
        prefillIndices.add(Math.floor(len / 2));
      }
    }

    // Tạo danh sách Slots
    const slots: TileSlot[] = chars.map((ch, idx) => ({
      id: `slot-${chunkIdx}-${idx}`,
      char: ch,
      isPreFilled: prefillIndices.has(idx),
      userChar: prefillIndices.has(idx) ? ch : null,
      tileId: prefillIndices.has(idx) ? `prefilled-${idx}` : null
    }));

    // Tạo danh sách Ký tự đúng (chỉ lấy các ký tự không được cho sẵn)
    const neededChars = chars.filter((_, idx) => !prefillIndices.has(idx));

    // Sinh các ký tự gây nhiễu (3 - 4 ký tự nhiễu)
    const distractorCandidates: string[] = [];
    for (const c of neededChars) {
      distractorCandidates.push(...generateDistractorsForChar(c, 2));
    }
    // Lấy 3 đến 4 ký tự nhiễu độc đáo
    const uniqueDistractors = Array.from(new Set(distractorCandidates))
      .filter(d => !neededChars.includes(d))
      .slice(0, Math.min(4, Math.max(3, Math.floor(neededChars.length * 0.8))));

    // Nếu vẫn ít nhiễu quá, thêm vào
    const fallbackNoise = ['d', 't', 's', 'sh', 'ā', 'à', 'ì', 'í'];
    while (uniqueDistractors.length < 3) {
      const pick = fallbackNoise[Math.floor(Math.random() * fallbackNoise.length)];
      if (!uniqueDistractors.includes(pick) && !neededChars.includes(pick)) {
        uniqueDistractors.push(pick);
      } else {
        break;
      }
    }

    // Gom tất cả tiles lại
    const rawTiles: ChoiceTile[] = [
      ...neededChars.map((ch, i) => ({
        id: `tile-correct-${chunkIdx}-${i}-${Math.random().toString(36).slice(2, 6)}`,
        char: ch,
        isUsed: false,
        isDistractor: false
      })),
      ...uniqueDistractors.map((ch, i) => ({
        id: `tile-distract-${chunkIdx}-${i}-${Math.random().toString(36).slice(2, 6)}`,
        char: ch,
        isUsed: false,
        isDistractor: true
      }))
    ];

    return {
      chunkIndex: chunkIdx,
      totalChunks: parts.length,
      text: partText,
      slots,
      tiles: shuffle(rawTiles)
    };
  });
}

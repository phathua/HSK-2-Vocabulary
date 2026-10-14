import { pinyin } from 'pinyin-pro';

export interface ParsedOptionDisplay {
  letter: string;
  hanzi: string;
  pinyin: string;
  rawLabel: string;
}

/**
 * Parses raw option strings or QuestionOption objects into letter, hanzi, and pinyin parts.
 * E.g. "A 弟弟在家看电视 (dìdi zài jiā kàn diànshì)" ->
 *   letter: "A", hanzi: "弟弟在家看电视", pinyin: "dìdi zài jiā kàn diànshì"
 */
export function parseOptionItem(optInput: string | { label: string; value?: string } | null | undefined): ParsedOptionDisplay {
  if (!optInput) {
    return { letter: '', hanzi: '', pinyin: '', rawLabel: '' };
  }

  const raw = (typeof optInput === 'string' ? optInput : (optInput.label || optInput.value || '')).trim();

  // Extract letter prefix (A, B, C, D, E, F)
  const m = raw.match(/^([A-Fa-f])[\s\.．、:：]*(.*)$/);
  const letter = m ? m[1].toUpperCase() : '';
  const rest = m ? m[2].trim() : raw;

  if (!rest || rest === letter) {
    return { letter, hanzi: '', pinyin: '', rawLabel: letter };
  }

  // Check for "Hanzi (pinyin)" - automatically sanitizes and discards any redundant repeated parenthetical groups
  const parenMatch = rest.match(/^([^\(（]+?)\s*[\(（]([a-zA-Zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ\s,\.\?!’'\-—0-9]+)[\)）]/);
  if (parenMatch) {
    const hanzi = parenMatch[1].trim();
    const py = parenMatch[2].trim();
    return {
      letter,
      hanzi,
      pinyin: py,
      rawLabel: `${hanzi} (${py})`
    };
  }

  // If there are Chinese characters without parens, generate pinyin
  if (/[\u4e00-\u9fa5]/.test(rest)) {
    const py = pinyin(rest, { toneType: 'symbol' })
      .replace(/。/g, '')
      .replace(/？/g, '?')
      .replace(/！/g, '!')
      .replace(/，/g, ',')
      .replace(/\s+/g, ' ')
      .trim();
    return {
      letter,
      hanzi: rest,
      pinyin: py,
      rawLabel: rest
    };
  }

  return {
    letter,
    hanzi: rest,
    pinyin: '',
    rawLabel: rest
  };
}

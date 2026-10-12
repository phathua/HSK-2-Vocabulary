// Web Speech API Voice synthesizer for Chinese (zh-CN) & Vietnamese (vi-VN)
// Tối ưu hóa đặc biệt cho Safari (iOS & macOS): chống Garbage Collection ngắt giữa chừng,
// tự động resume audio context và xử lý onvoiceschanged.

let activeUtterance: SpeechSynthesisUtterance | null = null;
let cachedVoices: SpeechSynthesisVoice[] = [];

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

export function stopSpeech(): void {
  try {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    activeUtterance = null;
    window.speechSynthesis.cancel();
  } catch (err) {
    console.warn('stopSpeech error:', err);
  }
}

export function speakChinese(text: string, volume: number = 0.7): Promise<void> {
  return new Promise((resolve) => {
    try {
      if (typeof window === 'undefined' || !('speechSynthesis' in window) || !text) {
        return resolve();
      }

      stopSpeech();

      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = 'zh-CN';
      utt.rate = 0.85;
      utt.volume = volume;

      const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
      const zhVoice = voices.find((v) => v.lang === 'zh-CN' || v.lang.startsWith('zh'));
      if (zhVoice) {
        utt.voice = zhVoice;
      }

      // Giữ tham chiếu để Safari WebKit không Garbage Collect ngắt giữa chừng
      activeUtterance = utt;

      let hasResolved = false;
      const safeResolve = () => {
        if (!hasResolved) {
          hasResolved = true;
          activeUtterance = null;
          resolve();
        }
      };

      utt.onend = safeResolve;
      utt.onerror = safeResolve;

      // Timeout dự phòng tránh treo nếu Safari không bắn event onend
      setTimeout(safeResolve, 4000);

      window.speechSynthesis.resume();
      window.speechSynthesis.speak(utt);
    } catch (err) {
      console.warn('Speech synthesis error (Chinese):', err);
      resolve();
    }
  });
}

function getAvailableVietnameseVoice(): Promise<SpeechSynthesisVoice | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return resolve(null);
    }
    const check = () => {
      const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
      return (
        voices.find((v) => v.lang === 'vi-VN' || v.lang === 'vi_VN') ||
        voices.find((v) => v.lang.toLowerCase().startsWith('vi')) ||
        null
      );
    };

    const immediate = check();
    if (immediate) return resolve(immediate);

    let resolved = false;
    const timer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve(check());
      }
    }, 250);

    const prevHandler = window.speechSynthesis.onvoiceschanged;
    window.speechSynthesis.onvoiceschanged = (e) => {
      cachedVoices = window.speechSynthesis.getVoices();
      if (typeof prevHandler === 'function') prevHandler.call(window.speechSynthesis, e);
      if (!resolved) {
        resolved = true;
        clearTimeout(timer);
        resolve(check());
      }
    };
  });
}

export async function speakVietnamese(text: string, volume: number = 1.0): Promise<void> {
  if (typeof window === 'undefined' || !('speechSynthesis' in window) || !text) {
    return;
  }

  stopSpeech();

  // BẮT BUỘC: Chỉ phát khi THỰC SỰ có giọng tiếng Việt, tuyệt đối không fallback sang giọng tiếng Anh
  const viVoice = await getAvailableVietnameseVoice();
  if (!viVoice) {
    return;
  }

  return new Promise((resolve) => {
    try {
      // Chuẩn hóa văn bản thuyết minh thuần tiếng Việt cho TTS đọc tự nhiên
      const cleanText = text
        .replace(/➔/g, 'sang')
        .replace(/[★✕]/g, '')
        .replace(/\bHSK\s*1\b/gi, 'Hát ét ca một')
        .replace(/\bHSK\s*2\b/gi, 'Hát ét ca hai')
        .replace(/\bHSK\s*3\b/gi, 'Hát ét ca ba')
        .replace(/\bHSK\s*4\b/gi, 'Hát ét ca bốn')
        .replace(/\bHSK\s*5\b/gi, 'Hát ét ca năm')
        .replace(/\bHSK\s*6\b/gi, 'Hát ét ca sáu')
        .replace(/\bHSK\b/gi, 'Hát ét ca')
        .replace(/\bAI\b/gi, 'trí tuệ nhân tạo')
        .replace(/\bPinyin\b/gi, 'phiên âm Pin in')
        .replace(/\b3D\b/gi, 'ba chiều')
        .replace(/\bFlashcards?\b/gi, 'thẻ từ')
        .replace(/\btabs?\b/gi, 'thẻ')
        .replace(/\bmenus?\b/gi, 'thực đơn')
        .replace(/\btelex\b/gi, 'gõ chữ')
        .replace(/\s+/g, ' ')
        .trim();

      const isIOS =
        typeof navigator !== 'undefined' &&
        (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
          (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

      const utt = new SpeechSynthesisUtterance(cleanText);
      utt.voice = viVoice;
      utt.lang = viVoice.lang || 'vi-VN';
      utt.rate = isIOS ? 1.3 : 1.0; // Riêng iOS giọng Việt tăng vừa vặn lên 1.3 theo yêu cầu; nền tảng khác 1.0
      utt.pitch = 1.0;
      utt.volume = volume;

      // Giữ tham chiếu chống Safari GC bug
      activeUtterance = utt;

      let hasResolved = false;
      const safeResolve = () => {
        if (!hasResolved) {
          hasResolved = true;
          activeUtterance = null;
          resolve();
        }
      };

      utt.onend = safeResolve;
      utt.onerror = safeResolve;

      // Timeout dự phòng tỷ lệ theo độ dài văn bản
      const maxDuration = Math.max(3000, Math.ceil(cleanText.length / 8) * 1000);
      setTimeout(safeResolve, maxDuration);

      window.speechSynthesis.resume();
      window.speechSynthesis.speak(utt);
    } catch (err) {
      console.warn('Speech synthesis error (Vietnamese):', err);
      resolve();
    }
  });
}

export function convertTelexToPinyin(str: string): string {
  if (!str) return '';
  let s = str.toLowerCase().replace(/v/g, 'ü');
  const mapTones: Record<string, string> = {
    'a1': 'ā', 'a2': 'á', 'a3': 'ǎ', 'a4': 'à',
    'e1': 'ē', 'e2': 'é', 'e3': 'ě', 'e4': 'è',
    'i1': 'ī', 'i2': 'í', 'i3': 'ǐ', 'i4': 'ì',
    'o1': 'ō', 'o2': 'ó', 'o3': 'ǒ', 'o4': 'ò',
    'u1': 'ū', 'u2': 'ú', 'u3': 'ǔ', 'u4': 'ù',
    'v1': 'ǖ', 'v2': 'ǘ', 'v3': 'ǚ', 'v4': 'ǜ',
    'ü1': 'ǖ', 'ü2': 'ǘ', 'ü3': 'ǚ', 'ü4': 'ǜ'
  };
  for (const key in mapTones) {
    s = s.replace(new RegExp(key, 'g'), mapTones[key]);
  }
  return s;
}

const norm = (s: string) => s.normalize('NFC').toLowerCase().replace(/[-_\s]+/g, ' ').trim();
const stripTones = (s: string) =>
  s.normalize('NFD')
   .replace(/[\u0300-\u036f]/g, '')
   .replace(/[üǖǘǚǜ]/g, 'u')
   .replace(/v/g, 'u')
   .replace(/[1-5]/g, '')
   .replace(/[-_\s]+/g, ' ')
   .trim();

export function checkPinyinAnswer(input: string, expectedAnswer: string): boolean {
  const ni = norm(input);
  const na = norm(expectedAnswer);
  if (ni === na) return true;
  if (stripTones(ni) === stripTones(na)) return true;
  if (ni.replace(/\s+/g, '') === na.replace(/\s+/g, '')) return true;
  if (stripTones(ni).replace(/\s+/g, '') === stripTones(na).replace(/\s+/g, '')) return true;
  return false;
}

export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

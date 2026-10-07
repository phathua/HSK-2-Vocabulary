// Web Speech API Voice synthesizer for Chinese (zh-CN)

export function speakChinese(text: string, volume: number = 0.7): void {
  try {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !text) return;
    
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'zh-CN';
    utt.rate = 0.85;
    utt.volume = volume;

    const voices = window.speechSynthesis.getVoices();
    const zhVoice = voices.find(v => v.lang === 'zh-CN' || v.lang.startsWith('zh'));
    if (zhVoice) {
      utt.voice = zhVoice;
    }

    window.speechSynthesis.resume();
    window.speechSynthesis.speak(utt);
  } catch (err) {
    console.warn('Speech synthesis error:', err);
  }
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

const norm = (s: string) => s.toLowerCase().replace(/[-_\s]+/g, ' ').trim();
const stripTones = (s: string) =>
  s.normalize('NFD')
   .replace(/[\u0300-\u036f]/g, '')
   .replace(/[üǖǘǚǜ]/g, 'u')
   .replace(/v/g, 'u')
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

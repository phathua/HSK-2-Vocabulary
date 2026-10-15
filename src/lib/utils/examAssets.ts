/**
 * Cloudflare R2 CDN base endpoint for HSK 2 exam assets
 */
export const R2_PUBLIC_BASE_URL = 'https://pub-23e7b63d639f4a6d822ca9faf60f6a84.r2.dev';

/**
 * Checks whether the current browser can natively decode OGG container audio.
 * Safari / WebKit on iOS & macOS strictly returns false to prevent buggy Vorbis duration truncation.
 */
export function canBrowserPlayOgg(): boolean {
  if (typeof window === 'undefined' || typeof Audio === 'undefined') return false;

  // Apple WebKit (iOS, iPadOS, Safari, macOS Safari) has severe bugs streaming OGG Vorbis,
  // miscalculating duration (e.g. stopping prematurely at ~18m instead of 26m).
  // Always enforce MP3 on Apple WebKit.
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const isApple = /iPad|iPhone|iPod|Macintosh/.test(ua) && !/Chrome|CriOS|Android/.test(ua);
  if (isApple) return false;

  try {
    const audio = document.createElement('audio');
    const canPlay = audio.canPlayType('audio/ogg; codecs="vorbis"');
    return canPlay === 'probably' || canPlay === 'maybe';
  } catch {
    return false;
  }
}

export interface ExamAudioSources {
  primaryUrl: string;
  fallbackUrl: string;
  oggUrl: string;
  mp3Url: string;
}

/**
 * Resolves both OGG and MP3 URLs and selects the primary format based on browser capability.
 * iOS / Safari always receives MP3 as primary to prevent decode failures.
 */
export function getExamAudioSources(
  examCode: string,
  audioOgg?: string | null,
  audioMp3?: string | null
): ExamAudioSources {
  const code = (examCode || '').trim();
  const oggFile = audioOgg ? audioOgg.replace(/^\/+/, '') : `${code}_audio.ogg`;
  const mp3File = audioMp3 ? audioMp3.replace(/^\/+/, '') : `${code}_audio.mp3`;

  const oggUrl = oggFile.startsWith('http://') || oggFile.startsWith('https://')
    ? oggFile
    : `${R2_PUBLIC_BASE_URL}/${code}/${oggFile}`;

  const mp3Url = mp3File.startsWith('http://') || mp3File.startsWith('https://')
    ? mp3File
    : `${R2_PUBLIC_BASE_URL}/${code}/${mp3File}`;

  const supportsOgg = canBrowserPlayOgg();

  return {
    primaryUrl: supportsOgg ? oggUrl : mp3Url,
    fallbackUrl: supportsOgg ? mp3Url : oggUrl,
    oggUrl,
    mp3Url
  };
}

/**
 * Resolves full public CDN URL for an audio file of an exam.
 * If audioSrc is already a full URL (http:// or https://), return as-is.
 * On iOS/Safari (no OGG support), automatically swaps .ogg extension to .mp3.
 */
export function getExamAudioUrl(examCode: string, audioSrc?: string | null, audioMp3Src?: string | null): string {
  if (!audioSrc && !audioMp3Src) return '';

  // If browser cannot decode OGG (iOS Safari), prioritize MP3
  if (!canBrowserPlayOgg()) {
    if (audioMp3Src) {
      if (audioMp3Src.startsWith('http://') || audioMp3Src.startsWith('https://')) return audioMp3Src;
      return `${R2_PUBLIC_BASE_URL}/${examCode}/${audioMp3Src.replace(/^\/+/, '')}`;
    }
    if (audioSrc && audioSrc.endsWith('.ogg')) {
      const mp3Equivalent = audioSrc.replace(/\.ogg$/, '.mp3');
      if (mp3Equivalent.startsWith('http://') || mp3Equivalent.startsWith('https://')) return mp3Equivalent;
      return `${R2_PUBLIC_BASE_URL}/${examCode}/${mp3Equivalent.replace(/^\/+/, '')}`;
    }
  }

  if (audioSrc) {
    if (audioSrc.startsWith('http://') || audioSrc.startsWith('https://')) {
      return audioSrc;
    }
    const cleanPath = audioSrc.replace(/^\/+/, '');
    return `${R2_PUBLIC_BASE_URL}/${examCode}/${cleanPath}`;
  }

  return '';
}

/**
 * Resolves full public CDN URL for an exam image (board image or question image).
 * If imageSrc is already a full URL, return as-is.
 */
export function getExamImageUrl(examCode: string, imageSrc?: string | null): string {
  if (!imageSrc) return '';
  if (imageSrc.startsWith('http://') || imageSrc.startsWith('https://')) {
    return imageSrc;
  }
  const cleanPath = imageSrc.replace(/^\/+/, '');
  // Prefer serving from local static bundle (/exams/...) for instantaneous offline & dev rendering
  if (cleanPath.startsWith('images/')) {
    return `/exams/${examCode}/${cleanPath}`;
  }
  return `/exams/${examCode}/images/${cleanPath}`;
}

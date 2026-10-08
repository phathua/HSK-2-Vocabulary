/**
 * Cloudflare R2 CDN base endpoint for HSK 2 exam assets
 */
export const R2_PUBLIC_BASE_URL = 'https://pub-23e7b63d639f4a6d822ca9faf60f6a84.r2.dev';

/**
 * Resolves full public CDN URL for an audio file of an exam.
 * If audioSrc is already a full URL (http:// or https://), return as-is.
 */
export function getExamAudioUrl(examCode: string, audioSrc?: string | null): string {
  if (!audioSrc) return '';
  if (audioSrc.startsWith('http://') || audioSrc.startsWith('https://')) {
    return audioSrc;
  }
  // Remove leading slashes if any
  const cleanPath = audioSrc.replace(/^\/+/, '');
  return `${R2_PUBLIC_BASE_URL}/${examCode}/${cleanPath}`;
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
  // If the path already includes 'images/', don't duplicate
  if (cleanPath.startsWith('images/')) {
    return `${R2_PUBLIC_BASE_URL}/${examCode}/${cleanPath}`;
  }
  return `${R2_PUBLIC_BASE_URL}/${examCode}/images/${cleanPath}`;
}

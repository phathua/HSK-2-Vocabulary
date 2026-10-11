import { pinyin } from 'pinyin-pro';
import { type SubtitleItem, type SubtitleWord, EXAM_INTRO_RULES_SUBTITLES } from './examRulesIntro';

export type { SubtitleItem, SubtitleWord };
export { EXAM_INTRO_RULES_SUBTITLES };

export function parseSrt(srtContent: string): SubtitleItem[] {
  const blocks = srtContent.trim().split(/\n\s*\n/);
  const subtitles: SubtitleItem[] = [];

  for (const block of blocks) {
    const lines = block.split('\n');
    if (lines.length >= 3) {
      const id = parseInt(lines[0].trim(), 10);
      const timeLine = lines[1].trim();
      const text = lines.slice(2).join('\n').trim();

      const timeMatch = timeLine.match(/(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})/);
      if (timeMatch) {
        const startHour = parseInt(timeMatch[1], 10);
        const startMin = parseInt(timeMatch[2], 10);
        const startSec = parseInt(timeMatch[3], 10);
        const startMs = parseInt(timeMatch[4], 10);
        const startTime = startHour * 3600 + startMin * 60 + startSec + startMs / 1000;

        const endHour = parseInt(timeMatch[5], 10);
        const endMin = parseInt(timeMatch[6], 10);
        const endSec = parseInt(timeMatch[7], 10);
        const endMs = parseInt(timeMatch[8], 10);
        const endTime = endHour * 3600 + endMin * 60 + endSec + endMs / 1000;

        let py = '';
        try {
          py = pinyin(text);
        } catch {
          py = '';
        }

        subtitles.push({
          id,
          startTime,
          endTime,
          text,
          pinyin: py
        });
      }
    }
  }

  return subtitles;
}

export async function fetchSrt(examCode: string, baseUrl: string): Promise<SubtitleItem[]> {
  let loadedSubtitles: SubtitleItem[] = [];

  // Try local static bundle first (/exams/<CODE>/<CODE>.srt)
  try {
    const localRes = await fetch(`/exams/${examCode}/${examCode}.srt`);
    if (localRes.ok) {
      const text = await localRes.text();
      loadedSubtitles = parseSrt(text);
    }
  } catch {}

  // Fallback to CDN URL if not found locally
  if (loadedSubtitles.length === 0) {
    try {
      const response = await fetch(`${baseUrl}/${examCode}/${examCode}.srt`);
      if (response.ok) {
        const srtContent = await response.text();
        loadedSubtitles = parseSrt(srtContent);
      }
    } catch (error) {
      console.error('Failed to fetch SRT:', error);
    }
  }

  // Prepend standardized intro rules subtitles if the file does not have early intro lines (0:00 - ~02:00)
  if (loadedSubtitles.length > 0) {
    const firstSub = loadedSubtitles[0];
    if (firstSub.startTime > 30) {
      // Intro missing: prepend standardized intro rules (0:00 - ~02:00)
      return [...EXAM_INTRO_RULES_SUBTITLES, ...loadedSubtitles];
    } else if (firstSub.startTime <= 5 && firstSub.text.includes('Nhạc dạo đầu')) {
      // If there's only a single placeholder intro block that ends around 68s, replace it with rich intro rules
      const remainingSubs = loadedSubtitles.slice(1);
      return [...EXAM_INTRO_RULES_SUBTITLES, ...remainingSubs];
    }
    return loadedSubtitles;
  }

  return [...EXAM_INTRO_RULES_SUBTITLES];
}

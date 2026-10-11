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

      let viet = '';
      const textLines: string[] = [];
      for (const rawLine of lines.slice(2)) {
        const trimmed = rawLine.trim();
        if (trimmed.includes('[VIET]')) {
          const parts = trimmed.split('[VIET]');
          const t = parts[0].trim();
          const v = parts[1].trim();
          if (t) textLines.push(t);
          if (v) viet = v;
        } else if (trimmed) {
          textLines.push(trimmed);
        }
      }
      const text = textLines.join('\n').trim();

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

        const chars = Array.from(text);
        const dur = Math.max(0.5, endTime - startTime);
        const step = dur / Math.max(1, chars.length);
        const words = chars.map((ch, idx) => ({
          word: ch,
          pinyin: pinyin(ch),
          start: startTime + idx * step,
          end: startTime + (idx + 1) * step
        }));

        subtitles.push({
          id,
          startTime,
          endTime,
          text,
          pinyin: py,
          viet: viet || undefined,
          words
        });
      }
    }
  }

  return subtitles;
}

export async function fetchSrt(examCode: string, baseUrl: string): Promise<SubtitleItem[]> {
  let loadedSubtitles: SubtitleItem[] = [];

  // 1. Try local pre-generated subtitles.json first (rich sentence & word-level + viet translations)
  try {
    const jsonRes = await fetch(`/exams/${examCode}/subtitles.json`);
    if (jsonRes.ok) {
      const data = await jsonRes.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch {}

  // 2. Try local static bundle (/exams/<CODE>/<CODE>.srt)
  try {
    const localRes = await fetch(`/exams/${examCode}/${examCode}.srt`);
    if (localRes.ok) {
      const text = await localRes.text();
      loadedSubtitles = parseSrt(text);
    }
  } catch {}

  // 3. Fallback to CDN URL if not found locally
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

  // Prepend standardized intro rules subtitles ONLY if the file does not have early intro lines (< 28s)
  if (loadedSubtitles.length > 0) {
    const firstSub = loadedSubtitles[0];
    if (firstSub.startTime > 28) {
      return [...EXAM_INTRO_RULES_SUBTITLES, ...loadedSubtitles];
    }
    return loadedSubtitles;
  }

  return [...EXAM_INTRO_RULES_SUBTITLES];
}

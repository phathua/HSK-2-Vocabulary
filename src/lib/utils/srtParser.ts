export interface SubtitleItem {
  id: number;
  startTime: number;
  endTime: number;
  text: string;
}

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

        subtitles.push({
          id,
          startTime,
          endTime,
          text
        });
      }
    }
  }

  return subtitles;
}

export async function fetchSrt(examCode: string, baseUrl: string): Promise<SubtitleItem[]> {
  try {
    const response = await fetch(`${baseUrl}/${examCode}/${examCode}.srt`);
    if (!response.ok) {
      return [];
    }
    const srtContent = await response.text();
    return parseSrt(srtContent);
  } catch (error) {
    console.error('Failed to fetch SRT:', error);
    return [];
  }
}

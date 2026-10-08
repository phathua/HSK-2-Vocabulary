import type { ExamDetail } from '#lib/types/exam';

// Static direct imports for instant synchronous availability
import H2_YJ from '#lib/data/exams/H2-YJ.json';
import H20000 from '#lib/data/exams/H20000.json';
import H20901 from '#lib/data/exams/H20901.json';
import H20902 from '#lib/data/exams/H20902.json';
import H21002 from '#lib/data/exams/H21002.json';
import H21003 from '#lib/data/exams/H21003.json';
import H21004 from '#lib/data/exams/H21004.json';
import H21005 from '#lib/data/exams/H21005.json';
import H21006 from '#lib/data/exams/H21006.json';
import H21329 from '#lib/data/exams/H21329.json';
import H21330 from '#lib/data/exams/H21330.json';
import H21331 from '#lib/data/exams/H21331.json';
import H21332 from '#lib/data/exams/H21332.json';
import H21334 from '#lib/data/exams/H21334.json';
import MOCK_CHINESE_TOOLS from '#lib/data/exams/MOCK-CHINESE-TOOLS.json';
import MOCK_HSK_ATLAS from '#lib/data/exams/MOCK-HSK-ATLAS.json';

const examMap: Record<string, any> = {
  'H2-YJ': H2_YJ,
  'H20000': H20000,
  'H20901': H20901,
  'H20902': H20902,
  'H21002': H21002,
  'H21003': H21003,
  'H21004': H21004,
  'H21005': H21005,
  'H21006': H21006,
  'H21329': H21329,
  'H21330': H21330,
  'H21331': H21331,
  'H21332': H21332,
  'H21334': H21334,
  'MOCK-CHINESE-TOOLS': MOCK_CHINESE_TOOLS,
  'MOCK-HSK-ATLAS': MOCK_HSK_ATLAS
};

export function getExamData(code: string): ExamDetail | null {
  const data = examMap[code];
  if (!data) return null;
  return data as ExamDetail;
}

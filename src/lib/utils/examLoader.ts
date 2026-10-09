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
import H21007 from '#lib/data/exams/H21007.json';
import H21008 from '#lib/data/exams/H21008.json';
import H21009 from '#lib/data/exams/H21009.json';
import H21112 from '#lib/data/exams/H21112.json';
import H21113 from '#lib/data/exams/H21113.json';
import H21115 from '#lib/data/exams/H21115.json';
import H21116 from '#lib/data/exams/H21116.json';
import H21117 from '#lib/data/exams/H21117.json';
import H21118 from '#lib/data/exams/H21118.json';
import H21119 from '#lib/data/exams/H21119.json';
import H21220 from '#lib/data/exams/H21220.json';
import H21221 from '#lib/data/exams/H21221.json';
import H21222 from '#lib/data/exams/H21222.json';
import H21223 from '#lib/data/exams/H21223.json';
import H21329 from '#lib/data/exams/H21329.json';
import H21330 from '#lib/data/exams/H21330.json';
import H21331 from '#lib/data/exams/H21331.json';
import H21332 from '#lib/data/exams/H21332.json';
import H21333 from '#lib/data/exams/H21333.json';
import H21334 from '#lib/data/exams/H21334.json';
import H21335 from '#lib/data/exams/H21335.json';
import H21555B from '#lib/data/exams/H21555B.json';
import H21555C from '#lib/data/exams/H21555C.json';
import H21555D from '#lib/data/exams/H21555D.json';

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
  'H21007': H21007,
  'H21008': H21008,
  'H21009': H21009,
  'H21112': H21112,
  'H21113': H21113,
  'H21115': H21115,
  'H21116': H21116,
  'H21117': H21117,
  'H21118': H21118,
  'H21119': H21119,
  'H21220': H21220,
  'H21221': H21221,
  'H21222': H21222,
  'H21223': H21223,
  'H21329': H21329,
  'H21330': H21330,
  'H21331': H21331,
  'H21332': H21332,
  'H21333': H21333,
  'H21334': H21334,
  'H21335': H21335,
  'H21555B': H21555B,
  'H21555C': H21555C,
  'H21555D': H21555D,
};

export function getExamData(code: string): ExamDetail | null {
  const data = examMap[code];
  if (!data) return null;
  return data as ExamDetail;
}

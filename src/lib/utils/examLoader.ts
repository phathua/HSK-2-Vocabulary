import type { ExamDetail } from '#lib/types/exam';

// Static direct imports for instant synchronous availability
import { examData as H2_YJ } from '#lib/data/exams/H2-YJ';
import { examData as H20000 } from '#lib/data/exams/H20000';
import { examData as H20901 } from '#lib/data/exams/H20901';
import { examData as H20902 } from '#lib/data/exams/H20902';
import { examData as H21002 } from '#lib/data/exams/H21002';
import { examData as H21003 } from '#lib/data/exams/H21003';
import { examData as H21004 } from '#lib/data/exams/H21004';
import { examData as H21005 } from '#lib/data/exams/H21005';
import { examData as H21006 } from '#lib/data/exams/H21006';
import { examData as H21007 } from '#lib/data/exams/H21007';
import { examData as H21008 } from '#lib/data/exams/H21008';
import { examData as H21009 } from '#lib/data/exams/H21009';
import { examData as H21112 } from '#lib/data/exams/H21112';
import { examData as H21113 } from '#lib/data/exams/H21113';
import { examData as H21115 } from '#lib/data/exams/H21115';
import { examData as H21116 } from '#lib/data/exams/H21116';
import { examData as H21117 } from '#lib/data/exams/H21117';
import { examData as H21118 } from '#lib/data/exams/H21118';
import { examData as H21119 } from '#lib/data/exams/H21119';
import { examData as H21220 } from '#lib/data/exams/H21220';
import { examData as H21221 } from '#lib/data/exams/H21221';
import { examData as H21222 } from '#lib/data/exams/H21222';
import { examData as H21223 } from '#lib/data/exams/H21223';
import { examData as H21329 } from '#lib/data/exams/H21329';
import { examData as H21330 } from '#lib/data/exams/H21330';
import { examData as H21331 } from '#lib/data/exams/H21331';
import { examData as H21332 } from '#lib/data/exams/H21332';
import { examData as H21333 } from '#lib/data/exams/H21333';
import { examData as H21334 } from '#lib/data/exams/H21334';
import { examData as H21335 } from '#lib/data/exams/H21335';
import { examData as H21555B } from '#lib/data/exams/H21555B';
import { examData as H21555C } from '#lib/data/exams/H21555C';
import { examData as H21555D } from '#lib/data/exams/H21555D';

const examMap: Record<string, ExamDetail> = {
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
  return examMap[code] || null;
}

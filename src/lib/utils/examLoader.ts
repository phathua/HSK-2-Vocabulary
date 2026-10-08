import type { ExamDetail } from '#lib/types/exam';

// Dynamic loaders for all 16 standardized exams
const examModules: Record<string, () => Promise<{ default: ExamDetail }>> = {
  'H2-YJ': () => import('#lib/data/exams/H2-YJ.json'),
  'H20000': () => import('#lib/data/exams/H20000.json'),
  'H20901': () => import('#lib/data/exams/H20901.json'),
  'H20902': () => import('#lib/data/exams/H20902.json'),
  'H21002': () => import('#lib/data/exams/H21002.json'),
  'H21003': () => import('#lib/data/exams/H21003.json'),
  'H21004': () => import('#lib/data/exams/H21004.json'),
  'H21005': () => import('#lib/data/exams/H21005.json'),
  'H21006': () => import('#lib/data/exams/H21006.json'),
  'H21329': () => import('#lib/data/exams/H21329.json'),
  'H21330': () => import('#lib/data/exams/H21330.json'),
  'H21331': () => import('#lib/data/exams/H21331.json'),
  'H21332': () => import('#lib/data/exams/H21332.json'),
  'H21334': () => import('#lib/data/exams/H21334.json'),
  'MOCK-CHINESE-TOOLS': () => import('#lib/data/exams/MOCK-CHINESE-TOOLS.json'),
  'MOCK-HSK-ATLAS': () => import('#lib/data/exams/MOCK-HSK-ATLAS.json')
};

export async function getExamData(code: string): Promise<ExamDetail | null> {
  const loader = examModules[code];
  if (!loader) return null;
  try {
    const mod = await loader();
    return mod.default;
  } catch (err) {
    console.error(`Failed to load exam ${code}:`, err);
    return null;
  }
}

export interface QuestionItem {
  exam_code: string;
  section: string; // 'Listening (听力)' | 'Reading (阅读)'
  part: string; // 'Part 1', 'Part 2'...
  question_no: number;
  type: string; // 'True/False' | 'Image Match' | 'Multiple Choice'...
  image?: string | null;
  board_image?: string | null;
  answer?: string; // '√', '×', 'A', 'B', 'C', 'D', 'E', 'F'
  listening_script?: string;
  text?: string;
  options?: string[];
}

export interface ExamDetail {
  exam_code: string;
  title?: string;
  total_questions: number;
  audio_ogg?: string | null;
  audio_mp3?: string | null;
  images_count?: number;
  questions: QuestionItem[];
}

export type ExamMode = 'exam' | 'practice'; // 'exam' = 55min simulation, 'practice' = quiz instant check

export interface UserExamState {
  answers: Record<number, string>; // question_no -> selected answer
  flagged: Record<number, boolean>; // question_no -> flagged for review
  checked: Record<number, boolean>; // for practice mode: has checked answer
  startedAt: number;
  timeRemainingSeconds: number; // starts at 55 * 60 = 3300s
  isSubmitted: boolean;
  score?: {
    totalCorrect: number;
    listeningCorrect: number;
    readingCorrect: number;
    scoreTotal: number; // scaled to 200
  };
}

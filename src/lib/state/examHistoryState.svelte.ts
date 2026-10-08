// Quản lý lịch sử làm bài thi thử HSK 2 lưu vào LocalStorage
export interface ExamHistoryRecord {
  id: string;
  examCode: string;
  title: string;
  scoreTotal: number; // Thang 200
  listeningScore: number;
  readingScore: number;
  listeningCorrect: number;
  readingCorrect: number;
  totalQuestions: number;
  isPassed: boolean;
  completedAt: string; // ISO string
}

const STORAGE_KEY = 'hsk2_exam_history_v1';

class ExamHistoryState {
  records = $state<ExamHistoryRecord[]>([]);

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          this.records = JSON.parse(stored);
        }
      } catch (e) {
        console.error('Lỗi khi đọc lịch sử thi:', e);
      }
    }
  }

  saveRecord(record: Omit<ExamHistoryRecord, 'id' | 'completedAt'>) {
    const newRecord: ExamHistoryRecord = {
      ...record,
      id: `${record.examCode}-${Date.now()}`,
      completedAt: new Date().toISOString()
    };

    this.records = [newRecord, ...this.records];
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.records));
      } catch (e) {
        console.error('Lỗi khi lưu lịch sử thi:', e);
      }
    }
    return newRecord;
  }

  getBestScore(examCode: string): number | null {
    const list = this.records.filter((r) => r.examCode === examCode);
    if (list.length === 0) return null;
    return Math.max(...list.map((r) => r.scoreTotal));
  }

  getAttemptsCount(examCode: string): number {
    return this.records.filter((r) => r.examCode === examCode).length;
  }
}

export const examHistoryState = new ExamHistoryState();

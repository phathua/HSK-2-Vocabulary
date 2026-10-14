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
  isHistoryModalOpen = $state(false);
  filterExamCode = $state<string | null>(null);

  get completedExamsCount(): number {
    return new Set(this.records.map((r) => r.examCode.toUpperCase())).size;
  }

  get filteredRecords(): ExamHistoryRecord[] {
    if (!this.filterExamCode) return this.records;
    const target = this.filterExamCode.toUpperCase();
    return this.records.filter((r) => r.examCode.toUpperCase() === target);
  }

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

  openHistory(examCode?: string | null) {
    this.filterExamCode = examCode ? examCode.toUpperCase() : null;
    this.isHistoryModalOpen = true;
  }

  closeHistory() {
    this.isHistoryModalOpen = false;
    this.filterExamCode = null;
  }

  saveRecord(record: Omit<ExamHistoryRecord, 'id' | 'completedAt'>) {
    const cleanCode = record.examCode.toUpperCase();
    const newRecord: ExamHistoryRecord = {
      ...record,
      examCode: cleanCode,
      id: `${cleanCode}-${Date.now()}`,
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
    const target = examCode.toUpperCase();
    const list = this.records.filter((r) => r.examCode.toUpperCase() === target);
    if (list.length === 0) return null;
    return Math.max(...list.map((r) => r.scoreTotal));
  }

  getLatestScore(examCode: string): number | null {
    const target = examCode.toUpperCase();
    const list = this.records.filter((r) => r.examCode.toUpperCase() === target);
    if (list.length === 0) return null;
    return list[0].scoreTotal;
  }

  getAttemptsCount(examCode: string): number {
    const target = examCode.toUpperCase();
    return this.records.filter((r) => r.examCode.toUpperCase() === target).length;
  }

  clearHistory() {
    this.records = [];
    this.filterExamCode = null;
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error('Lỗi khi xóa lịch sử thi:', e);
      }
    }
  }
}

export const examHistoryState = new ExamHistoryState();

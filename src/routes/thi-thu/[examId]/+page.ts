import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
  const { examId } = params;
  
  try {
    // Dynamic import file JSON tương ứng của đề thi
    const examModule = await import(`$lib/data/exams/${examId}.json`);
    const examData = examModule.default || examModule;

    return {
      examId,
      examData
    };
  } catch (err) {
    throw error(404, `Không tìm thấy đề thi với mã: ${examId}`);
  }
};

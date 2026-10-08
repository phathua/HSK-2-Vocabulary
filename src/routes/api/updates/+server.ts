import { json } from '@sveltejs/kit';

export const prerender = false;

export async function GET() {
  try {
    // Gọi GitHub API công khai lấy 10 commit mới nhất của repo
    const response = await fetch('https://api.github.com/repos/phathua/HSK-2-Vocabulary/commits?per_page=10', {
      headers: {
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'HSK2-Vocabulary-App'
      }
    });

    if (!response.ok) {
      return json({
        success: false,
        error: 'Không thể kết nối đến GitHub để kiểm tra phiên bản',
        changelog: [],
        version: '1.0.0'
      });
    }

    const commits = await response.json();

    if (!Array.isArray(commits)) {
      return json({
        success: false,
        error: 'Định dạng dữ liệu không hợp lệ',
        changelog: [],
        version: '1.0.0'
      });
    }

    const changelog = commits.map((item: any) => {
      const message = item.commit?.message || '';
      const title = message.split('\n')[0].trim();
      return {
        sha: item.sha?.substring(0, 7) || 'unknown',
        title: title || 'Bản cập nhật tối ưu hệ thống',
        author: item.commit?.author?.name || 'Nhà phát triển',
        date: item.commit?.author?.date || new Date().toISOString()
      };
    });

    // Tính phiên bản dựa trên tổng commit hoặc số lượng commit
    let version = '1.0.0';
    try {
      const countResponse = await fetch('https://api.github.com/repos/phathua/HSK-2-Vocabulary/commits?per_page=1', {
        headers: {
          'Accept': 'application/vnd.github+json',
          'User-Agent': 'HSK2-Vocabulary-App'
        }
      });

      if (countResponse.ok) {
        const linkHeader = countResponse.headers.get('link');
        let totalCommits = 0;
        if (linkHeader) {
          const match = linkHeader.match(/&page=(\d+)>;\s*rel="last"/);
          if (match) {
            totalCommits = parseInt(match[1], 10);
          } else {
            const nextMatch = linkHeader.match(/&page=(\d+)>;\s*rel="next"/);
            totalCommits = nextMatch ? parseInt(nextMatch[1], 10) : 1;
          }
        } else {
          const countData = await countResponse.json();
          totalCommits = Array.isArray(countData) ? countData.length : 1;
        }

        if (totalCommits > 0) {
          // Khởi tạo từ 1.0.x
          const major = 1;
          const minor = Math.floor(totalCommits / 10);
          const patch = totalCommits % 10;
          version = `${major}.${minor}.${patch}`;
        }
      }
    } catch {
      version = `1.0.${commits.length}`;
    }

    return json({
      success: true,
      changelog,
      version
    });
  } catch (error: any) {
    return json({
      success: false,
      error: 'Lỗi mạng khi kiểm tra phiên bản mới',
      changelog: [],
      version: '1.0.0'
    });
  }
}

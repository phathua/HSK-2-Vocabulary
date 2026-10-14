/**
 * Dịch vụ Quản lý Thông báo Phòng thi HSK 2 (Native Browser Notification Service)
 * Hoạt động độc lập hoàn toàn ở phía client qua HTML5 Notifications API, không phụ thuộc vào Webhook hay FCM.
 */

export interface NotificationStatus {
  supported: boolean;
  permission: NotificationPermission;
}

export function getNotificationStatus(): NotificationStatus {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return { supported: false, permission: 'denied' };
  }
  return { supported: true, permission: Notification.permission };
}

export async function requestExamNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'denied';
  }
  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (err) {
    console.warn('Lỗi khi yêu cầu quyền thông báo:', err);
    return 'denied';
  }
}

let activeNotification: Notification | null = null;
let titleInterval: any = null;
let savedOriginalTitle: string = '';

export function sendOutTabExamAlert(examCode: string) {
  if (typeof window === 'undefined') return;

  // 1. Gửi native notification nếu đã cấp quyền
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      if (activeNotification) {
        activeNotification.close();
      }
      activeNotification = new Notification(`Phòng thi HSK 2 (${examCode})`, {
        body: 'Hãy quay về tab để tiếp tục bài thi! Thời gian làm bài đang tạm dừng chờ bạn.',
        icon: '/icons/icon-192.png',
        badge: '/favicon.png',
        tag: 'hsk2-out-tab-alert'
      });

      activeNotification.onclick = () => {
        window.focus();
        if (activeNotification) {
          activeNotification.close();
          activeNotification = null;
        }
      };
    } catch (e) {
      console.warn('Không thể hiển thị thông báo Notification:', e);
    }
  }

  // 2. Dự phòng: Nhấp nháy Document Title
  if (typeof document !== 'undefined') {
    if (!savedOriginalTitle) {
      savedOriginalTitle = document.title;
    }
    if (!titleInterval) {
      let toggle = false;
      titleInterval = setInterval(() => {
        toggle = !toggle;
        document.title = toggle
          ? 'Quay lại làm bài! - HSK 2'
          : `(Đang thi) ${examCode} - HSK 2`;
      }, 1000);
    }
  }
}

export function clearOutTabExamAlert() {
  if (typeof window === 'undefined') return;

  if (activeNotification) {
    activeNotification.close();
    activeNotification = null;
  }

  if (titleInterval) {
    clearInterval(titleInterval);
    titleInterval = null;
  }

  if (savedOriginalTitle && typeof document !== 'undefined') {
    document.title = savedOriginalTitle;
    savedOriginalTitle = '';
  }
}

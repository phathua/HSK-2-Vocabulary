// Utility to prevent screen sleep / lock during active exam (iOS Safari & Modern Browsers)

let wakeLockSentinel: any = null;
let fallbackVideo: HTMLVideoElement | null = null;
let isLockRequested = false;

/**
 * Request wake lock to keep the device screen on during an exam.
 * Priority 1: Native Screen Wake Lock API (Safari iOS 16.4+, Chrome, Edge, Firefox).
 * Priority 2: Fallback inline looping muted video for older iOS / unsupported environments.
 */
export async function requestScreenWakeLock(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  isLockRequested = true;

  // 1. Modern Screen Wake Lock API
  if ('wakeLock' in navigator && (navigator as any).wakeLock) {
    try {
      wakeLockSentinel = await (navigator as any).wakeLock.request('screen');
      wakeLockSentinel.addEventListener('release', () => {
        wakeLockSentinel = null;
      });
      return true;
    } catch (err) {
      // Ignored: proceed to fallback
    }
  }

  // 2. Fallback for iOS / Mobile without WakeLock API: tiny looping muted video
  try {
    if (!fallbackVideo) {
      fallbackVideo = document.createElement('video');
      fallbackVideo.setAttribute('playsinline', '');
      fallbackVideo.setAttribute('webkit-playsinline', '');
      fallbackVideo.setAttribute('muted', '');
      fallbackVideo.muted = true;
      fallbackVideo.loop = true;
      fallbackVideo.style.position = 'fixed';
      fallbackVideo.style.opacity = '0.001';
      fallbackVideo.style.width = '1px';
      fallbackVideo.style.height = '1px';
      fallbackVideo.style.pointerEvents = 'none';
      fallbackVideo.style.top = '-100px';
      fallbackVideo.style.left = '-100px';
      // Minimal valid MP4 video data URI (1x1 blank frame)
      fallbackVideo.src =
        'data:video/mp4;base64,AAAAHGZ0eXBtcDQyAAAAAG1wNDJpc29tYXZjMQAAAAhmcmVlAAAAJm1kYXQAAAEAAAEAAAEAAAEAAAEAAAEAAAEAAAEAAAEAAAEAAAEAAA==';
      document.body.appendChild(fallbackVideo);
    }
    const playPromise = fallbackVideo.play();
    if (playPromise) {
      playPromise.catch(() => {});
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Release wake lock when leaving the exam room or submitting.
 */
export function releaseScreenWakeLock(): void {
  isLockRequested = false;

  if (wakeLockSentinel) {
    try {
      wakeLockSentinel.release();
    } catch {}
    wakeLockSentinel = null;
  }

  if (fallbackVideo) {
    try {
      fallbackVideo.pause();
      fallbackVideo.remove();
    } catch {}
    fallbackVideo = null;
  }
}

// Automatically re-request wake lock when returning to tab
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (isLockRequested && document.visibilityState === 'visible') {
      requestScreenWakeLock().catch(() => {});
    }
  });
}

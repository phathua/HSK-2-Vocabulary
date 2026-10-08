// Service Worker cho ứng dụng Ôn Tập HSK 2
// Cho phép chạy offline hoàn toàn, kể cả F5 lại trang

const CACHE_NAME = 'hsk2-pwa-cache-v1';

const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.png',
  '/apple-touch-icon.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Với request tài nguyên và navigation: cache-first with network fallback
  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      if (cachedResponse) {
        // Tải cập nhật ngầm nếu có mạng
        fetch(req).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(req, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }

      return fetch(req).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(req, responseToCache);
        });
        return networkResponse;
      }).catch(async () => {
        // Nếu offline và đang request trang HTML, trả về root cache
        if (req.mode === 'navigate') {
          const rootCached = await caches.match('/');
          if (rootCached) return rootCached;
        }
        return new Response(
          `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <title>Mất kết nối mạng - Ôn Tập HSK 2</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; color: #0f172a; margin: 0; padding: 1.5rem; display: flex; align-items: center; justify-content: center; min-height: 100vh; text-align: center; box-sizing: border-box; }
    .card { background: #ffffff; border-radius: 1.75rem; padding: 2rem 1.5rem; max-width: 22rem; width: 100%; box-shadow: 0 20px 40px -15px rgba(0,0,0,0.07); border: 1px solid #e2e8f0; }
    .icon { font-size: 3rem; margin-bottom: 0.75rem; }
    h1 { font-size: 1.25rem; font-weight: 900; margin: 0 0 0.5rem 0; color: #0f172a; }
    p { font-size: 0.8125rem; color: #64748b; line-height: 1.5; margin: 0 0 1.25rem 0; font-weight: 500; }
    .btn { display: inline-flex; align-items: center; justify-content: center; width: 100%; height: 2.75rem; background: #2563eb; color: #ffffff; font-weight: 800; font-size: 0.8125rem; border-radius: 0.875rem; text-decoration: none; border: none; cursor: pointer; transition: transform 0.1s; }
    .btn:active { transform: scale(0.97); }
  </style>
</head>
<body>
  <div class="card">
    <img src="/icons/panda-offline.webp" alt="Mất kết nối mạng" style="width: 140px; height: 140px; object-fit: contain; margin: 0 auto 0.75rem auto; display: block; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.1));">
    <h1>Mất kết nối mạng</h1>
    <p>Không thể tải dữ liệu mới. Bạn vẫn có thể tiếp tục ôn luyện các bộ từ vựng đã tải về thiết bị!</p>
    <button class="btn" onclick="window.location.reload()">Thử kết nối lại</button>
  </div>
</body>
</html>`,
          {
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
          }
        );
      });
    })
  );
});

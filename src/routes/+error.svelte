<script lang="ts">
  import { page } from '$app/state';
  import ArrowClockwise from 'phosphor-svelte/lib/ArrowClockwise';
  import House from 'phosphor-svelte/lib/House';

  const status = $derived(page.status || 500);

  // Cấu hình linh hoạt cho từng mã lỗi (500, 404, 403, 400, offline)
  const errorConfig = $derived.by(() => {
    switch (status) {
      case 404:
        return {
          code: '404',
          title: 'Không tìm thấy trang',
          desc: 'Nội dung hoặc bài học bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.',
          badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
          image: '/icons/panda-error-404.webp',
          actionText: 'Quay về trang chủ'
        };
      case 403:
        return {
          code: '403',
          title: 'Truy cập bị từ chối',
          desc: 'Bạn không có quyền truy cập vào nội dung này hoặc phiên làm việc đã hết hạn.',
          badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
          image: '/icons/panda-error-500.webp',
          actionText: 'Quay về trang chính'
        };
      case 400:
        return {
          code: '400',
          title: 'Yêu cầu không hợp lệ',
          desc: 'Dữ liệu gửi lên không đúng định dạng. Vui lòng thử lại hoặc tải lại trang.',
          badgeBg: 'bg-orange-100 text-orange-800 border-orange-200',
          image: '/icons/panda-offline.webp',
          actionText: 'Thử lại ngay'
        };
      case 500:
      case 502:
      case 503:
      default:
        return {
          code: `${status}`,
          title: 'Sự cố máy chủ',
          desc: 'Hệ thống đang gặp sự cố gián đoạn tạm thời. Đội ngũ phát triển đang nhanh chóng xử lý.',
          badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
          image: '/icons/panda-error-500.webp',
          actionText: 'Tải lại trang'
        };
    }
  });
</script>

<div class="h-screen w-full max-w-md mx-auto flex flex-col items-center justify-center p-5 text-center bg-slate-50 font-sans select-none overflow-hidden">
  <!-- Card hiển thị lỗi tròn trịa, hiện đại phong cách Duolingo -->
  <div class="w-full bg-white rounded-[2rem] p-6 sm:p-7 shadow-xl border border-slate-200/90 flex flex-col items-center animate-[pop_0.15s_ease]">
    
    <!-- Linh vật Gấu Trúc minh họa hành động lỗi to rõ ràng -->
    <div class="relative w-44 h-44 flex items-center justify-center mb-2">
      <div class="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full scale-110"></div>
      
      <img
        src={errorConfig.image}
        alt={`Lỗi ${errorConfig.code}`}
        class="w-40 h-40 object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] pointer-events-none transition-transform hover:scale-105 active:scale-95"
      />

      <!-- Badge mã lỗi nhỏ xinh bên góc -->
      <span class="absolute bottom-1 right-2 px-2.5 py-0.5 rounded-full bg-slate-900 text-white font-mono font-black text-[11px] tracking-wide border-2 border-white shadow-xs">
        {errorConfig.code}
      </span>
    </div>

    <!-- Tiêu đề & Thông điệp -->
    <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black mb-2 border {errorConfig.badgeBg}">
      <span>Mã lỗi {errorConfig.code}</span>
    </div>

    <h1 class="text-xl font-black text-slate-900 mb-1.5 tracking-tight leading-snug">
      {errorConfig.title}
    </h1>

    <p class="text-xs font-semibold text-slate-500 mb-5 leading-relaxed max-w-[280px]">
      {page.error?.message || errorConfig.desc}
    </p>

    <!-- Nút hành động -->
    <div class="flex flex-col gap-2 w-full">
      <button
        type="button"
        onclick={() => window.location.href = '/'}
        class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] transition-all"
      >
        <ArrowClockwise weight="bold" class="w-4 h-4" />
        <span>{errorConfig.actionText}</span>
      </button>

      <a
        href="/"
        class="w-full py-2.5 text-slate-400 hover:text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
      >
        <House weight="bold" class="w-3.5 h-3.5" />
        <span>Về trang chủ</span>
      </a>
    </div>
  </div>
</div>

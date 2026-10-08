<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { updated } from '$app/state';
  import Toast from '#lib/components/ui/Toast.svelte';
  import UpdateModal from '#lib/components/UpdateModal.svelte';
  import { appState } from '#lib/state/appState.svelte';

  let { children } = $props<{ children: any }>();

  async function checkServerUpdates(force = false) {
    if (typeof window === 'undefined') return;
    try {
      if (!force) {
        const dismissed = sessionStorage.getItem('dismissUpdate');
        if (dismissed === 'true') return;
      }

      const res = await fetch('/api/updates');
      const data = await res.json();
      if (!data.success || !data.version) return;

      const installed = localStorage.getItem('hsk2_installed_version') || '1.0.0';
      if (data.version !== installed) {
        // Nếu có bản mới hơn bản đã cài -> mở modal ngay
        sessionStorage.removeItem('dismissUpdate');
        appState.updateModalOpen = true;
      }
    } catch {}
  }

  // Phản ứng ngay lập tức với SvelteKit 3 updated.current rune
  $effect(() => {
    if (updated.current) {
      sessionStorage.removeItem('dismissUpdate');
      appState.updateModalOpen = true;
    }
  });

  onMount(() => {
    // 1. Tự động kiểm tra ngay khi mở ứng dụng
    checkServerUpdates();

    // 2. Khi người dùng mở lại màn hình hoặc quay lại tab trình duyệt -> kiểm tra ngay
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        try {
          updated.check();
        } catch {}
        checkServerUpdates();
      }
    };

    const handleFocus = () => {
      try {
        updated.check();
      } catch {}
      checkServerUpdates();
    };


    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    // 4. Polling dự phòng mỗi 45s gọi kiểm tra GitHub commits
    const intervalId = setInterval(() => {
      checkServerUpdates();
    }, 45000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      clearInterval(intervalId);
    };
  });
</script>

<Toast />
<div class="h-screen max-h-[100dvh] w-full max-w-lg mx-auto flex flex-col justify-between p-3 sm:p-4 bg-slate-100 font-sans select-none overflow-hidden">
  {@render children()}
</div>

<UpdateModal />


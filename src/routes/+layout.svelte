<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { updated } from '$app/state';
  import Toast from '#lib/components/ui/Toast.svelte';
  import UpdateModal from '#lib/components/UpdateModal.svelte';
  import SidebarMenu from '#lib/components/SidebarMenu.svelte';
  import { appState } from '#lib/state/appState.svelte';

  let { children } = $props<{ children: any }>();

  // Phản ứng khi SvelteKit phát hiện build asset mới trên server
  $effect(() => {
    if (updated.current) {
      const dismissed = typeof window !== 'undefined' ? sessionStorage.getItem('dismissUpdate') : null;
      if (!dismissed) {
        appState.updateModalOpen = true;
      }
    }
  });

  onMount(() => {
    appState.ensureInitialized();

    // Kiểm tra phiên bản mới khi người dùng quay lại tab/bật màn hình
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        try {
          updated.check();
        } catch {}
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  });
</script>

<Toast />
<div class="h-screen max-h-[100dvh] w-full max-w-lg md:max-w-4xl lg:max-w-7xl mx-auto flex gap-4 p-3 sm:p-4 md:py-5 bg-slate-100 dark:bg-[#131314] font-sans select-none overflow-hidden transition-colors">
  <!-- Desktop Left Sidebar (Cố định ở desktop) -->
  <SidebarMenu />

  <!-- Main Content Area -->
  <div class="flex-1 flex flex-col justify-between min-w-0 h-full overflow-hidden">
    {@render children()}
  </div>
</div>

<UpdateModal />


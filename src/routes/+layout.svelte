<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { updated } from '$app/state';
  import { page } from '$app/state';
  import Toast from '#lib/components/ui/Toast.svelte';
  import UpdateModal from '#lib/components/UpdateModal.svelte';
  import SidebarMenu from '#lib/components/SidebarMenu.svelte';
  import OnboardingTour from '#lib/components/tour/OnboardingTour.svelte';
  import SpotlightSearchModal from '#lib/components/dictionary/SpotlightSearchModal.svelte';
  import { appState } from '#lib/state/appState.svelte';
  import { tourState } from '#lib/state/tourState.svelte';
  import { mainOnboardingTour } from '#lib/tours/mainOnboardingTour';

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

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        appState.spotlightOpen = !appState.spotlightOpen;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('keydown', handleKeyDown);

    // Tự động khởi chạy tour hướng dẫn cho người mới truy cập trang chính
    const tourTimer = setTimeout(() => {
      if (page.url.pathname === '/' && !tourState.isTourSeen(mainOnboardingTour)) {
        tourState.startTour(mainOnboardingTour);
      }
    }, 600);

    return () => {
      clearTimeout(tourTimer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>

<Toast />
<div class="h-screen max-h-[100dvh] w-full max-w-lg md:max-w-4xl lg:max-w-[1440px] xl:max-w-[1600px] mx-auto flex gap-4 p-2.5 sm:p-4 md:py-4 lg:px-6 bg-slate-100 dark:bg-[#131314] font-sans select-none overflow-hidden transition-colors">
  <!-- Desktop Left Sidebar (Cố định ở desktop) -->
  <SidebarMenu />

  <!-- Main Content Area -->
  <div class="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
    {@render children()}
  </div>
</div>

<UpdateModal />
<OnboardingTour />
<SpotlightSearchModal />


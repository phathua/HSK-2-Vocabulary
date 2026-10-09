<script lang="ts">
  interface Props {
    src?: string;
    fallbackSrc?: string;
    alt?: string;
    class?: string;
  }

  let { src = '', fallbackSrc = '', alt = 'Hình minh họa', class: className = '' }: Props = $props();

  let isLoaded = $state(false);
  let hasFailedAll = $state(false);
  let activeSrc = $state('');
  let triedFallback = $state(false);

  // Khi URL ảnh chính thay đổi, reset state an toàn
  $effect(() => {
    activeSrc = src;
    isLoaded = false;
    hasFailedAll = false;
    triedFallback = false;
  });

  function handleLoad() {
    isLoaded = true;
    hasFailedAll = false;
  }

  function handleError() {
    // Nếu có fallbackSrc và chưa thử fallback, chuyển sang fallbackSrc
    if (fallbackSrc && !triedFallback && activeSrc !== fallbackSrc) {
      triedFallback = true;
      activeSrc = fallbackSrc;
      isLoaded = false;
    } else {
      // Đã thử hết các nguồn hoặc không có fallback -> dừng lại hiển thị Local SVG, không loop onerror
      hasFailedAll = true;
      isLoaded = true;
    }
  }
</script>

<div class={`relative overflow-hidden ${className}`}>
  <!-- Skeleton Shimmer Placeholder khi đang tải ảnh -->
  {#if !isLoaded && !hasFailedAll}
    <div class="absolute inset-0 bg-slate-200/80 dark:bg-[#282A2C] animate-pulse flex items-center justify-center">
      <div class="w-6 h-6 rounded-full border-2 border-slate-300 dark:border-slate-600 border-t-blue-500 animate-spin opacity-50"></div>
    </div>
  {/if}

  {#if hasFailedAll}
    <!-- Local Semantic Fallback SVG: Tuyệt đối không gọi thêm request mạng ngoại tuyến nào -->
    <div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100/60 dark:from-[#202225] dark:to-[#18191c] text-blue-500 dark:text-blue-400 p-2 select-none">
      <svg class="w-8 h-8 sm:w-10 sm:h-10 opacity-70 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="4" ry="4"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
      </svg>
      <span class="text-[10px] sm:text-xs font-bold tracking-wider uppercase opacity-60">HSK Flashcard</span>
    </div>
  {:else if activeSrc}
    <img
      src={activeSrc}
      {alt}
      onload={handleLoad}
      onerror={handleError}
      class={`w-full h-full object-cover transition-opacity duration-200 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      loading="lazy"
    />
  {/if}
</div>

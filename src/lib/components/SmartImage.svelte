<script lang="ts">
  interface Props {
    src?: string;
    alt?: string;
    class?: string;
  }

  let { src = '', alt = 'Hình minh họa', class: className = '' }: Props = $props();

  let isLoaded = $state(false);
  let hasError = $state(false);
  let currentSrc = $state('');

  // Khi URL ảnh thay đổi, lập tức ẩn ảnh và bật skeleton loading
  $effect(() => {
    if (src !== currentSrc) {
      currentSrc = src;
      isLoaded = false;
      hasError = false;
    }
  });

  function handleLoad() {
    isLoaded = true;
    hasError = false;
  }

  function handleError() {
    hasError = true;
    isLoaded = true;
  }
</script>

<div class={`relative overflow-hidden ${className}`}>
  <!-- Skeleton Shimmer Placeholder khi đang tải ảnh -->
  {#if !isLoaded}
    <div class="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
      <div class="w-6 h-6 rounded-full border-2 border-slate-300 border-t-blue-500 animate-spin opacity-50"></div>
    </div>
  {/if}

  {#if currentSrc}
    <img
      src={hasError ? 'https://placehold.co/200x200/3b82f6/ffffff?text=HSK' : currentSrc}
      {alt}
      onload={handleLoad}
      onerror={handleError}
      class={`w-full h-full object-cover transition-opacity duration-200 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      loading="lazy"
    />
  {/if}
</div>

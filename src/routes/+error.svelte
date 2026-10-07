<script lang="ts">
  import { page } from '$app/state';
  import WarningCircle from 'phosphor-svelte/lib/WarningCircle';
  import ArrowClockwise from 'phosphor-svelte/lib/ArrowClockwise';
</script>

<div class="h-screen w-full max-w-lg mx-auto flex flex-col items-center justify-center p-6 text-center bg-slate-50 font-sans">
  <div class="w-16 h-16 rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4 shadow-sm">
    <WarningCircle weight="bold" class="w-10 h-10" />
  </div>

  <h1 class="text-2xl font-black text-slate-900 mb-2">
    Đã xảy ra lỗi ({page.status})
  </h1>

  <p class="text-sm font-semibold text-slate-600 mb-4 max-w-md">
    {page.error?.message || 'Có lỗi hệ thống xảy ra trong quá trình thực thi.'}
  </p>

  {#if page.error && (page.error as any).stack}
    <div class="w-full max-w-md p-3.5 bg-slate-900 text-slate-100 rounded-2xl text-left overflow-auto max-h-48 text-xs font-mono mb-5 border border-slate-700 shadow-inner">
      <pre class="whitespace-pre-wrap">{(page.error as any).stack}</pre>
    </div>
  {/if}

  <button
    type="button"
    onclick={() => window.location.href = '/'}
    class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-2xl shadow-sm flex items-center gap-2 cursor-pointer active:scale-95 transition-all"
  >
    <ArrowClockwise weight="bold" class="w-4 h-4" />
    <span>Tải lại trang chủ</span>
  </button>
</div>

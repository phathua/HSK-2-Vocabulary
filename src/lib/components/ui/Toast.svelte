<script lang="ts">
  import { Toaster } from 'svelte-sonner';
</script>

<Toaster
  position="top-right"
  richColors
  closeButton
  toastOptions={{
    classes: {
      toast: '!rounded-2xl !p-3.5 !shadow-lg !border !font-sans !relative',
      title: '!font-bold !text-sm',
      description: '!text-xs !font-medium !mt-0.5',
      closeButton: '!left-auto !-right-2.5 !-top-2.5 !translate-y-0 !translate-x-0 !w-6 !h-6 !flex !items-center !justify-center !rounded-full !border !border-slate-300 dark:!border-zinc-600 !bg-white dark:!bg-zinc-800 !text-slate-700 dark:!text-slate-200 hover:!bg-slate-100 dark:hover:!bg-zinc-700 !shadow-md !transition-transform !cursor-pointer hover:!scale-110 active:!scale-95'
    }
  }}
/>

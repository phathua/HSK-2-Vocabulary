<script lang="ts">
  import { Toaster } from 'svelte-sonner';
</script>

<Toaster
  position="top-right"
  richColors
  closeButton
  toastOptions={{
    classes: {
      toast: '!rounded-2xl !p-3.5 !pr-10 !shadow-lg !border !font-sans !relative',
      title: '!font-bold !text-sm',
      description: '!text-xs !font-medium !mt-0.5',
      closeButton: '!left-auto !right-2.5 !top-1/2 !-translate-y-1/2 !border-none !bg-transparent hover:!bg-black/10 dark:hover:!bg-white/15 !text-current !opacity-60 hover:!opacity-100 !w-7 !h-7 !flex !items-center !justify-center !rounded-full !transition-all !cursor-pointer'
    }
  }}
/>

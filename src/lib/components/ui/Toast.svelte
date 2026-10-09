<script lang="ts">
  import { Toaster } from 'svelte-sonner';
</script>

<Toaster
  position="top-right"
  richColors
  closeButton
  toastOptions={{
    classes: {
      toast: '!rounded-2xl !p-3.5 !shadow-lg !border !font-sans',
      title: '!font-bold !text-sm',
      description: '!text-xs !font-medium !mt-0.5'
    }
  }}
/>

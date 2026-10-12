<script lang="ts">
  import WarningCircle from 'phosphor-svelte/lib/WarningCircle';

  let {
    open = false,
    title = 'Xác nhận hành động',
    message = 'Bạn có chắc chắn muốn thực hiện hành động này?',
    confirmText = 'Xác nhận',
    cancelText = 'Hủy',
    variant = 'danger',
    onConfirm,
    onCancel
  }: {
    open: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
    onConfirm: () => void;
    onCancel: () => void;
  } = $props();
</script>

{#if open}
  <div class="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
    <div
      role="dialog"
      aria-modal="true"
      class="w-full max-w-sm bg-white dark:bg-[#1E1E1E] rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-[#2E3032] animate-[pop_0.15s_ease] transition-colors"
    >
      <div class="flex items-start gap-3.5 mb-3.5">
        <div class={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
          variant === 'danger'
            ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
            : variant === 'warning'
              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
              : 'bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
        }`}>
          <WarningCircle weight="fill" class="w-6 h-6" />
        </div>

        <div class="min-w-0 pt-0.5">
          <h4 class="font-extrabold text-base text-slate-900 dark:text-[#E3E3E3] leading-snug">
            {title}
          </h4>
          <p class="text-xs text-slate-500 dark:text-[#8E918F] mt-1 leading-relaxed">
            {message}
          </p>
        </div>
      </div>

      <div class="flex items-center justify-end gap-2 pt-2">
        <button
          type="button"
          onclick={onCancel}
          class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#282A2C] dark:hover:bg-[#343739] text-slate-700 dark:text-[#C4C7C5] text-xs font-bold transition-all cursor-pointer active:scale-95"
        >
          {cancelText}
        </button>

        <button
          type="button"
          onclick={onConfirm}
          class={`px-4 py-2 rounded-xl text-xs font-black text-white transition-all cursor-pointer active:scale-95 shadow-2xs ${
            variant === 'danger'
              ? 'bg-rose-600 hover:bg-rose-700'
              : variant === 'warning'
                ? 'bg-amber-600 hover:bg-amber-700'
                : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {confirmText}
        </button>
      </div>
    </div>
  </div>
{/if}

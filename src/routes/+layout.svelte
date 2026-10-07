<script lang="ts">
  import '../app.css';
  let { children } = $props<{ children: any }>();
</script>

<div class="h-screen max-h-[100dvh] w-full max-w-lg mx-auto flex flex-col justify-between p-3 sm:p-4 bg-slate-100 font-sans select-none overflow-hidden">
  {@render children()}
</div>

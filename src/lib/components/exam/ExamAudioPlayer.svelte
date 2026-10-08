<script lang="ts">
  import Play from 'phosphor-svelte/lib/Play';
  import Pause from 'phosphor-svelte/lib/Pause';
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
  import ArrowsClockwise from 'phosphor-svelte/lib/ArrowsClockwise';

  interface Props {
    audioSrc?: string | null;
    examCode: string;
    isExamMode?: boolean; // In official exam mode, seek/rewind might be restricted
  }

  let { audioSrc = null, examCode, isExamMode = false }: Props = $props();

  let audioElement: HTMLAudioElement | undefined = $state();
  let isPlaying = $state(false);
  let currentTime = $state(0);
  let duration = $state(0);
  let playCount = $state(0);

  // Audio URL fallback: Local static or Cloudflare R2
  const resolvedSrc = $derived.by(() => {
    if (!audioSrc) return '';
    // Public CDN/R2 endpoint or relative URL
    return `/exams-media/${examCode}/${audioSrc}`;
  });

  function togglePlay() {
    if (!audioElement) return;
    if (isPlaying) {
      audioElement.pause();
      isPlaying = false;
    } else {
      audioElement.play().catch(console.error);
      isPlaying = true;
    }
  }

  function handleTimeUpdate() {
    if (audioElement) {
      currentTime = audioElement.currentTime;
    }
  }

  function handleLoadedMetadata() {
    if (audioElement) {
      duration = audioElement.duration;
    }
  }

  function handleEnded() {
    isPlaying = false;
    playCount += 1;
  }

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
</script>

{#if audioSrc}
  <div class="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 dark:from-orange-950/40 dark:via-neutral-900 dark:to-orange-950/40 border border-orange-200/80 dark:border-orange-800/40 rounded-2xl p-4 shadow-xs">
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <div class="flex items-center gap-3">
        <button
          type="button"
          onclick={togglePlay}
          class="w-12 h-12 rounded-xl bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center shrink-0 shadow-sm cursor-pointer active:scale-95 transition-all"
          aria-label={isPlaying ? 'Tạm dừng nghe' : 'Phát âm thanh'}
        >
          {#if isPlaying}
            <Pause weight="fill" class="w-6 h-6" />
          {:else}
            <Play weight="fill" class="w-6 h-6 ml-0.5" />
          {/if}
        </button>

        <div>
          <div class="flex items-center gap-2">
            <SpeakerHigh weight="duotone" class="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span class="text-xs font-bold text-slate-800 dark:text-slate-200">
              Audio Nghe Đề Thi ({examCode})
            </span>
          </div>
          <div class="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
        <span class="px-2.5 py-1 rounded-lg bg-orange-100/70 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 font-mono text-[11px]">
          Chuẩn OGG Vorbis
        </span>
        {#if isExamMode}
          <span class="text-[11px] text-amber-600 dark:text-amber-400">
            (Chế độ thi thật: Nghe tuần tự)
          </span>
        {/if}
      </div>
    </div>

    <!-- Progress bar -->
    <div class="mt-3 relative w-full h-1.5 bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden">
      <div
        class="h-full bg-orange-500 transition-all duration-150"
        style="width: {duration ? (currentTime / duration) * 100 : 0}%"
      ></div>
    </div>

    <!-- Native Audio Element -->
    <audio
      bind:this={audioElement}
      src={resolvedSrc}
      ontimeupdate={handleTimeUpdate}
      onloadedmetadata={handleLoadedMetadata}
      onended={handleEnded}
      preload="metadata"
    ></audio>
  </div>
{/if}

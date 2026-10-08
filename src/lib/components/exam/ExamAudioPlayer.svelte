<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Play from 'phosphor-svelte/lib/Play';
  import Pause from 'phosphor-svelte/lib/Pause';
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
  import HourglassMedium from 'phosphor-svelte/lib/HourglassMedium';
  import LockSimple from 'phosphor-svelte/lib/LockSimple';
  import { examRoomState } from '#lib/state/examRoomState.svelte';

  interface Props {
    audioSrc?: string | null;
    examCode: string;
    isExamMode?: boolean; // In official exam mode: 60s preview -> auto-play non-stoppable
  }

  let { audioSrc = null, examCode, isExamMode = false }: Props = $props();

  let audioElement: HTMLAudioElement | undefined = $state();
  let cardElement: HTMLElement | undefined = $state();
  let isPlaying = $state(false);
  let currentTime = $state(0);
  let duration = $state(0);
  let isSticky = $state(false);

  import { getExamAudioUrl } from '#lib/utils/examAssets';

  // 60s preview countdown state
  let previewSeconds = $state(60);
  let isPreviewPhase = $state(true);
  let previewTimer: any = null;

  const resolvedSrc = $derived.by(() => {
    return getExamAudioUrl(examCode, audioSrc);
  });

  function startAudioPlayback() {
    if (previewTimer) {
      clearInterval(previewTimer);
      previewTimer = null;
    }
    isPreviewPhase = false;
    previewSeconds = 0;
    examRoomState.isPreviewPhase = false;
    examRoomState.previewSeconds = 0;

    if (audioElement) {
      audioElement.play().then(() => {
        isPlaying = true;
        examRoomState.isPlaying = true;
      }).catch((e) => {
        console.warn('Audio autoplay failed or blocked by browser:', e);
        isPlaying = false;
        examRoomState.isPlaying = false;
      });
    }
  }

  let isScrolled = $state(false);
  let mainScrollContainer: HTMLElement | null = null;

  onMount(() => {
    examRoomState.startAudioFn = startAudioPlayback;

    if (isExamMode) {
      isPreviewPhase = true;
      previewSeconds = 60;
      examRoomState.isPreviewPhase = true;
      examRoomState.previewSeconds = 60;

      previewTimer = setInterval(() => {
        if (previewSeconds > 1) {
          previewSeconds -= 1;
          examRoomState.previewSeconds = previewSeconds;
        } else {
          startAudioPlayback();
        }
      }, 1000);
    } else {
      isPreviewPhase = false;
      examRoomState.isPreviewPhase = false;
    }

    // Lắng nghe scroll trên <main> để thu nhỏ card thành thanh mini sticky bar
    mainScrollContainer = cardElement?.closest('main') as HTMLElement | null;

    const handleScroll = () => {
      if (!mainScrollContainer) return;
      isScrolled = mainScrollContainer.scrollTop > 50;
    };

    if (mainScrollContainer) {
      mainScrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (mainScrollContainer) {
        mainScrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  });

  onDestroy(() => {
    if (previewTimer) clearInterval(previewTimer);
    examRoomState.startAudioFn = null;
  });

  function togglePlay() {
    if (!audioElement) return;
    if (isExamMode) {
      if (isPreviewPhase) {
        startAudioPlayback();
      }
      return;
    }

    // Chế độ Luyện tập: Play / Pause
    if (isPlaying) {
      audioElement.pause();
      isPlaying = false;
      examRoomState.isPlaying = false;
    } else {
      audioElement.play().catch(console.error);
      isPlaying = true;
      examRoomState.isPlaying = true;
    }
  }

  function handleTimeUpdate() {
    if (audioElement) {
      currentTime = audioElement.currentTime;
      examRoomState.currentTime = currentTime;
    }
  }

  function handleLoadedMetadata() {
    if (audioElement) {
      duration = audioElement.duration;
      examRoomState.duration = duration;
    }
  }

  function handleEnded() {
    isPlaying = false;
    examRoomState.isPlaying = false;
  }

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
</script>

{#if audioSrc}
  <!-- Audio Sticky Bar: Luôn ghim top-0 của main container, tự động co gọn khi cuộn -->
  <div
    bind:this={cardElement}
    class="sticky top-0 z-30 mb-3 bg-white/95 dark:bg-[#1B1B1B]/95 backdrop-blur-md border border-slate-200 dark:border-[#282A2C] rounded-2xl shadow-xs transition-all duration-200 {isScrolled ? 'p-2 sm:px-3 shadow-md' : 'p-3 sm:p-3.5 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent dark:from-orange-950/40 dark:via-neutral-900 border-orange-200/80'}"
  >
    <div class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-2.5 min-w-0">
        <!-- Nút Tròn Icon-only -->
        {#if isExamMode && isPreviewPhase}
          <button
            type="button"
            onclick={startAudioPlayback}
            class="rounded-full bg-orange-600 hover:bg-orange-700 active:scale-95 text-white flex items-center justify-center shrink-0 shadow-sm cursor-pointer transition-all {isScrolled ? 'w-8 h-8' : 'w-10 h-10'}"
            title="Đang xem trước 60s. Bấm để phát audio ngay!"
            aria-label="Phát audio ngay"
          >
            <Play weight="fill" class="{isScrolled ? 'w-3.5 h-3.5' : 'w-4 h-4'} ml-0.5" />
          </button>
        {:else if isExamMode && !isPreviewPhase}
          <div
            class="rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm {isScrolled ? 'w-8 h-8' : 'w-10 h-10'}"
            title="Đang phát bài thi nghe theo thời gian thực (Khóa tạm dừng)"
          >
            <SpeakerHigh weight="fill" class="{isScrolled ? 'w-3.5 h-3.5' : 'w-4 h-4'} animate-pulse" />
          </div>
        {:else}
          <button
            type="button"
            onclick={togglePlay}
            class="rounded-full bg-orange-600 hover:bg-orange-700 active:scale-95 text-white flex items-center justify-center shrink-0 shadow-sm cursor-pointer transition-all {isScrolled ? 'w-8 h-8' : 'w-10 h-10'}"
            aria-label={isPlaying ? 'Tạm dừng nghe' : 'Phát âm thanh'}
          >
            {#if isPlaying}
              <Pause weight="fill" class={isScrolled ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
            {:else}
              <Play weight="fill" class="{isScrolled ? 'w-3.5 h-3.5' : 'w-4 h-4'} ml-0.5" />
            {/if}
          </button>
        {/if}

        <div class="min-w-0">
          <div class="flex items-center gap-1.5 truncate">
            <span class="text-xs font-extrabold text-slate-900 dark:text-[#E3E3E3] truncate">
              Audio {examCode}
            </span>
          </div>

          <div class="text-[11px] font-mono text-slate-500 dark:text-[#8E918F] {isScrolled ? 'hidden sm:block' : 'mt-0.5'}">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>

      <!-- Giữa: Thanh tiến độ trực tiếp hoặc co gọn khi cuộn -->
      {#if isScrolled}
        <div class="flex-1 max-w-[120px] sm:max-w-xs h-1 bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden">
          <div
            class="h-full {isExamMode && isPreviewPhase ? 'bg-amber-500' : 'bg-orange-500'} transition-all duration-150"
            style="width: {isExamMode && isPreviewPhase ? ((60 - previewSeconds) / 60) * 100 : (duration ? (currentTime / duration) * 100 : 0)}%"
          ></div>
        </div>
      {/if}

      <!-- Trạng thái bên phải -->
      <div class="flex items-center gap-1.5 shrink-0">
        {#if isExamMode}
          {#if isPreviewPhase}
            <div class="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-mono font-bold text-xs">
              <HourglassMedium class="w-3.5 h-3.5 animate-spin text-amber-600" />
              <span>{previewSeconds}s</span>
            </div>
          {:else}
            <div class="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-[11px]">
              <LockSimple class="w-3.5 h-3.5" />
              <span class="hidden sm:inline">Thi thật</span>
            </div>
          {/if}
        {/if}
      </div>
    </div>

    <!-- Thanh tiến độ bài nghe khi chưa cuộn -->
    {#if !isScrolled}
      <div class="mt-2.5 relative w-full h-1 bg-slate-200/80 dark:bg-neutral-800 rounded-full overflow-hidden">
        {#if isExamMode && isPreviewPhase}
          <div
            class="h-full bg-amber-500 transition-all duration-1000 ease-linear"
            style="width: {((60 - previewSeconds) / 60) * 100}%"
          ></div>
        {:else}
          <div
            class="h-full bg-orange-500 transition-all duration-150"
            style="width: {duration ? (currentTime / duration) * 100 : 0}%"
          ></div>
        {/if}
      </div>
    {/if}

    <!-- Thẻ Audio ẩn -->
    <audio
      bind:this={audioElement}
      src={resolvedSrc}
      ontimeupdate={handleTimeUpdate}
      onloadedmetadata={handleLoadedMetadata}
      onended={handleEnded}
      preload="auto"
    ></audio>
  </div>
{/if}

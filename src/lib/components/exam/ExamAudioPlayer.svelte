<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Play from 'phosphor-svelte/lib/Play';
  import Pause from 'phosphor-svelte/lib/Pause';
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
  import HourglassMedium from 'phosphor-svelte/lib/HourglassMedium';
  import LockSimple from 'phosphor-svelte/lib/LockSimple';
  import FileText from 'phosphor-svelte/lib/FileText';
  import X from 'phosphor-svelte/lib/X';
  import { examRoomState } from '#lib/state/examRoomState.svelte';
  import type { QuestionItem } from '#lib/types/exam';

  interface Props {
    audioSrc?: string | null;
    examCode: string;
    isExamMode?: boolean; // In official exam mode: 60s preview -> auto-play non-stoppable
    listeningQuestions?: QuestionItem[];
  }

  let { audioSrc = null, examCode, isExamMode = false, listeningQuestions = [] }: Props = $props();

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

  // Transcript Modal state
  let showTranscriptModal = $state(false);
  let activeTranscriptPart = $state('all'); // 'all' | 'Part 1' | 'Part 2' | 'Part 3' | 'Part 4'

  const filteredTranscripts = $derived.by(() => {
    if (activeTranscriptPart === 'all') {
      return listeningQuestions;
    }
    return listeningQuestions.filter((q) => q.part === activeTranscriptPart);
  });

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

      <!-- Trạng thái bên phải & Nút Bản chép lời -->
      <div class="flex items-center gap-1.5 shrink-0">
        {#if listeningQuestions.length > 0}
          <button
            type="button"
            onclick={() => (showTranscriptModal = true)}
            class="flex items-center gap-1 px-2.5 py-1 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-700 dark:text-neutral-200 font-bold text-xs cursor-pointer transition-colors border border-slate-200 dark:border-neutral-700"
            title="Xem toàn bộ kịch bản bài nghe (Transcript)"
          >
            <FileText class="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
            <span class="hidden sm:inline">Bản chép lời</span>
            <span class="sm:hidden">Lời</span>
          </button>
        {/if}

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

<!-- Modal Bản Chép Lời (Listening Transcript Modal) -->
{#if showTranscriptModal}
  <div
    class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150"
    role="dialog"
    aria-modal="true"
    aria-labelledby="transcript-modal-title"
    tabindex="-1"
    onkeydown={(e) => e.key === 'Escape' && (showTranscriptModal = false)}
  >
    <div
      class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
    >
      <!-- Header Modal -->
      <div class="p-4 sm:px-6 border-b border-slate-200 dark:border-neutral-800 flex items-center justify-between gap-3 shrink-0">
        <div class="flex items-center gap-2.5 min-w-0">
          <div class="w-9 h-9 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
            <FileText class="w-5 h-5" />
          </div>
          <div>
            <h3 id="transcript-modal-title" class="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100">
              Bản chép lời bài nghe (Transcript)
            </h3>
            <p class="text-[11px] text-slate-500 dark:text-neutral-400 font-medium">
              Đề thi: {examCode} • Toàn bộ 35 câu nghe
            </p>
          </div>
        </div>

        <button
          type="button"
          onclick={() => (showTranscriptModal = false)}
          class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-600 dark:text-neutral-300 flex items-center justify-center shrink-0 cursor-pointer transition-colors"
          aria-label="Đóng bản chép lời"
        >
          <X weight="bold" class="w-4 h-4" />
        </button>
      </div>

      <!-- Filter Tabs theo Part (Phần 1 - 4) -->
      <div class="flex items-center gap-1.5 p-3 sm:px-6 bg-slate-50 dark:bg-[#202020] border-b border-slate-200 dark:border-neutral-800 overflow-x-auto shrink-0">
        {#each [
          { id: 'all', label: 'Tất cả (35 câu)' },
          { id: 'Part 1', label: 'Phần 1 (1-10)' },
          { id: 'Part 2', label: 'Phần 2 (11-20)' },
          { id: 'Part 3', label: 'Phần 3 (21-30)' },
          { id: 'Part 4', label: 'Phần 4 (31-35)' }
        ] as tab}
          <button
            type="button"
            onclick={() => (activeTranscriptPart = tab.id)}
            class="px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer {
              activeTranscriptPart === tab.id
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-white dark:bg-neutral-800 text-slate-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-700 border border-slate-200 dark:border-neutral-700'
            }"
          >
            {tab.label}
          </button>
        {/each}
      </div>

      <!-- Nội dung danh sách lời thoại -->
      <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 divide-y divide-slate-100 dark:divide-neutral-800">
        {#if filteredTranscripts.length === 0}
          <div class="text-center py-8 text-xs text-slate-500">
            Không tìm thấy bản chép lời cho phần này.
          </div>
        {:else}
          {#each filteredTranscripts as q}
            <div class="pt-3.5 first:pt-0">
              <div class="flex items-center gap-2 mb-1.5">
                <span class="px-2 py-0.5 rounded-lg bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 font-mono font-bold text-xs">
                  Câu {q.question_no}
                </span>
                <span class="text-[11px] font-medium text-slate-400">
                  {q.part} • Đáp án chuẩn: <strong class="text-emerald-600 dark:text-emerald-400 font-bold">{q.answer}</strong>
                </span>
              </div>

              <!-- Lời thoại tiếng Hán -->
              <div class="p-3 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200/80 dark:border-neutral-800 space-y-2">
                <div>
                  <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    Hán tự
                  </div>
                  <div class="text-sm md:text-base font-semibold text-slate-900 dark:text-slate-100 leading-relaxed select-text font-serif">
                    {q.listening_script || q.text || 'Đang cập nhật lời thoại...'}
                  </div>
                  {#if q.listening_pinyin}
                    <div class="text-xs md:text-sm font-medium text-amber-600 dark:text-amber-400/90 font-mono mt-0.5 select-text">
                      {q.listening_pinyin}
                    </div>
                  {/if}
                </div>

                <!-- Giải thích / Nghĩa tiếng Việt nếu có -->
                {#if q.explanation}
                  <div class="pt-2 border-t border-slate-200/60 dark:border-neutral-800 text-[11px] md:text-xs text-slate-600 dark:text-neutral-300 select-text leading-relaxed">
                    <span class="font-bold text-amber-600 dark:text-amber-400">💡 Giải nghĩa:</span>
                    {q.explanation}
                  </div>
                {/if}
              </div>
            </div>
          {/each}
        {/if}
      </div>

      <!-- Footer Modal -->
      <div class="p-3 sm:px-6 bg-slate-50 dark:bg-[#1E1E1E] border-t border-slate-200 dark:border-neutral-800 flex items-center justify-between shrink-0">
        <span class="text-[11px] text-slate-500 font-medium">
          Nhấn phím <kbd class="px-1.5 py-0.5 bg-slate-200 dark:bg-neutral-700 rounded text-[10px]">Esc</kbd> để đóng nhanh
        </span>
        <button
          type="button"
          onclick={() => (showTranscriptModal = false)}
          class="px-4 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs cursor-pointer shadow-xs"
        >
          Đóng
        </button>
      </div>
    </div>
  </div>
{/if}

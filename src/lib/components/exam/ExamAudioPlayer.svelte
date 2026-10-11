<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Play from 'phosphor-svelte/lib/Play';
  import Pause from 'phosphor-svelte/lib/Pause';
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
  import HourglassMedium from 'phosphor-svelte/lib/HourglassMedium';
  import LockSimple from 'phosphor-svelte/lib/LockSimple';
  import FileText from 'phosphor-svelte/lib/FileText';
  import ClosedCaptioning from 'phosphor-svelte/lib/ClosedCaptioning';
  import CaretDown from 'phosphor-svelte/lib/CaretDown';
  import CaretUp from 'phosphor-svelte/lib/CaretUp';
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

  import { getExamAudioUrl, R2_PUBLIC_BASE_URL } from '#lib/utils/examAssets';
  import { fetchSrt, type SubtitleItem } from '#lib/utils/srtParser';

  // 60s preview countdown state
  let previewSeconds = $state(60);
  let isPreviewPhase = $state(true);
  let previewTimer: any = null;

  // Subtitle Overlay state (gắn liền thanh audio player)
  let showSubtitleOverlay = $state(true); // Bật mặc định hoặc toggle nhanh
  let showTranscriptModal = $state(false);
  let activeTranscriptPart = $state('all'); // 'all' | 'Part 1' | 'Part 2' | 'Part 3' | 'Part 4'

  let subtitles = $state<SubtitleItem[]>([]);
  let activeSubtitleIndex = $derived.by(() => {
    if (!subtitles.length) return -1;
    let idx = -1;
    for (let i = 0; i < subtitles.length; i++) {
      if (currentTime >= subtitles[i].startTime) {
        idx = i;
      } else {
        break;
      }
    }
    return idx;
  });

  const activeSubtitle = $derived.by(() => {
    if (activeSubtitleIndex < 0 || activeSubtitleIndex >= subtitles.length) return null;
    const sub = subtitles[activeSubtitleIndex];
    if (currentTime > sub.endTime + 1.0) return null;
    return sub;
  });

  const currentWords = $derived.by(() => {
    if (!activeSubtitle) return [];
    if (activeSubtitle.words && activeSubtitle.words.length > 0) {
      return activeSubtitle.words;
    }
    // Tự sinh word segments fallback nếu SRT chưa có words
    const text = activeSubtitle.text;
    const py = activeSubtitle.pinyin ? activeSubtitle.pinyin.split(/\s+/) : [];
    const chars = Array.from(text);
    const count = chars.length;
    const dur = Math.max(0.5, activeSubtitle.endTime - activeSubtitle.startTime);
    const step = dur / Math.max(1, count);

    return chars.map((ch, idx) => ({
      word: ch,
      pinyin: py[idx] || '',
      start: activeSubtitle.startTime + idx * step,
      end: activeSubtitle.startTime + (idx + 1) * step
    }));
  });

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
  let scrollContainer: HTMLElement | null = $state(null);

  $effect(() => {
    if (showTranscriptModal && activeTranscriptPart === 'karaoke' && activeSubtitleIndex !== -1 && scrollContainer) {
      const activeEl = scrollContainer.querySelector(`#subtitle-${activeSubtitleIndex}`) as HTMLElement;
      if (activeEl) {
         activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  onMount(() => {
    examRoomState.startAudioFn = startAudioPlayback;

    fetchSrt(examCode, R2_PUBLIC_BASE_URL).then(data => {
      if (data.length > 0) {
        subtitles = data;
      } else {
        // Fallback: extract from questions
        let dummySubtitles: SubtitleItem[] = [
          {
            id: 0,
            startTime: 0,
            endTime: 28.5,
            text: "🎵 Đang phát nhạc dạo đầu & Giới thiệu quy chế bài thi...",
            pinyin: ""
          }
        ];
        listeningQuestions.forEach((q, i) => {
           dummySubtitles.push({
             id: i + 1,
             startTime: 28.5 + i * 5, // shift by 28.5s intro
             endTime: 28.5 + (i + 1) * 5, // dummy
             text: q.listening_script || q.text || `Câu ${q.question_no}`,
             pinyin: q.listening_pinyin || ''
           });
        });
        subtitles = dummySubtitles;
      }
    });

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

  function seekTo(time: number) {
    if (audioElement) {
      audioElement.currentTime = time;
      currentTime = time;
      if (!isPlaying) {
         audioElement.play().catch(console.error);
         isPlaying = true;
         examRoomState.isPlaying = true;
      }
    }
  }

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

      <!-- Trạng thái bên phải & Nút Phụ đề (Lời) + Modal Tất cả -->
      <div class="flex items-center gap-1.5 shrink-0">
        <!-- Nút Lời: Toggle Subtitle Overlay trực tiếp -->
        <button
          type="button"
          onclick={() => (showSubtitleOverlay = !showSubtitleOverlay)}
          class="flex items-center gap-1 px-2.5 py-1 sm:py-1.5 rounded-xl font-bold text-xs cursor-pointer transition-all border {showSubtitleOverlay ? 'bg-orange-600 text-white border-orange-600 shadow-xs' : 'bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-700 dark:text-neutral-200 border-slate-200 dark:border-neutral-700'}"
          title={showSubtitleOverlay ? 'Tắt khung phụ đề Karaoke' : 'Bật khung phụ đề Karaoke bên dưới'}
          aria-pressed={showSubtitleOverlay}
        >
          <ClosedCaptioning weight={showSubtitleOverlay ? 'fill' : 'bold'} class="w-3.5 h-3.5 {showSubtitleOverlay ? 'text-white' : 'text-orange-600 dark:text-orange-400'}" />
          <span class="hidden sm:inline">Lời</span>
          {#if showSubtitleOverlay}
            <CaretUp weight="bold" class="w-3 h-3 ml-0.5 opacity-80" />
          {:else}
            <CaretDown weight="bold" class="w-3 h-3 ml-0.5 opacity-80" />
          {/if}
        </button>

        {#if listeningQuestions.length > 0}
          <!-- Nút xem kịch bản đầy đủ 35 câu -->
          <button
            type="button"
            onclick={() => (showTranscriptModal = true)}
            class="flex items-center gap-1 px-2.5 py-1 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-700 dark:text-neutral-200 font-bold text-xs cursor-pointer transition-colors border border-slate-200 dark:border-neutral-700"
            title="Xem toàn bộ kịch bản 35 câu nghe (Transcript)"
          >
            <FileText class="w-3.5 h-3.5 text-slate-500 dark:text-neutral-400" />
            <span class="hidden md:inline">Toàn bộ</span>
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

    <!-- Khung Subtitle Overlay gắn liền trực tiếp ngay dưới Audio Player (Word-by-word Karaoke) -->
    {#if showSubtitleOverlay && activeSubtitle}
      <div
        class="mt-2.5 pt-2.5 border-t border-slate-200/80 dark:border-neutral-800/80 flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200"
      >
        <!-- Hàng hiển thị Karaoke Word-by-Word -->
        <div class="flex flex-wrap items-end gap-x-1.5 gap-y-2 justify-center sm:justify-start px-1 py-1">
          {#if currentWords.length > 0}
            {#each currentWords as w}
              {@const isWordActive = currentTime >= w.start && currentTime <= w.end}
              <div
                class="inline-flex flex-col items-center justify-end transition-all duration-150 rounded-lg px-1.5 py-0.5 {isWordActive ? 'bg-orange-100 dark:bg-orange-950/80 ring-2 ring-orange-500/40 scale-105 shadow-xs' : 'bg-transparent'}"
              >
                <!-- Chữ Hán ở trên -->
                <span
                  class="text-base sm:text-lg font-serif font-bold transition-colors leading-none {isWordActive ? 'text-orange-600 dark:text-orange-400 font-extrabold' : 'text-slate-800 dark:text-slate-100'}"
                >
                  {w.word}
                </span>
                <!-- Pinyin ở chân -->
                {#if w.pinyin}
                  <span
                    class="text-[10px] sm:text-xs font-mono transition-colors mt-0.5 leading-none {isWordActive ? 'text-amber-700 dark:text-amber-300 font-bold' : 'text-slate-400 dark:text-neutral-400'}"
                  >
                    {w.pinyin}
                  </span>
                {/if}
              </div>
            {/each}
          {:else}
            <!-- Fallback hiển thị cả cụm nếu chưa bóc tách word lẻ -->
            <div class="flex flex-col items-center sm:items-start">
              <span class="text-base sm:text-lg font-serif font-bold text-orange-600 dark:text-orange-400">
                {activeSubtitle.text}
              </span>
              {#if activeSubtitle.pinyin}
                <span class="text-xs font-mono text-amber-600 dark:text-amber-400 mt-0.5">
                  {activeSubtitle.pinyin}
                </span>
              {/if}
            </div>
          {/if}
        </div>

        <!-- Dòng giải nghĩa tiếng Việt đi kèm -->
        {#if activeSubtitle.viet}
          <div class="flex items-center gap-1.5 text-xs text-slate-500 dark:text-neutral-400 font-medium px-1 bg-slate-50/70 dark:bg-neutral-800/40 rounded-lg py-1 border border-slate-200/50 dark:border-neutral-800">
            <span class="font-bold text-orange-600 dark:text-orange-400 shrink-0">Dịch nghĩa:</span>
            <span class="truncate">{activeSubtitle.viet}</span>
          </div>
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
          { id: 'karaoke', label: 'Lời chạy trực tiếp (Karaoke)' },
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
      <div class="flex-1 overflow-y-auto p-4 sm:p-6" bind:this={scrollContainer}>
        {#if activeTranscriptPart === 'karaoke'}
          <div class="space-y-4 max-w-xl mx-auto py-8">
            {#if subtitles.length === 0}
               <div class="text-center py-8 text-xs text-slate-500">Đang tải lời chạy trực tiếp...</div>
            {:else}
               {#each subtitles as sub, i}
                 <button
                   type="button"
                   id="subtitle-{i}"
                   onclick={() => seekTo(sub.startTime)}
                   class="w-full text-left p-4 rounded-2xl transition-all duration-300 cursor-pointer block {i === activeSubtitleIndex ? 'bg-orange-100 dark:bg-orange-900/40 border border-orange-200 dark:border-orange-800 shadow-sm scale-[1.02]' : 'bg-transparent hover:bg-slate-50 dark:hover:bg-neutral-800/50 opacity-60 hover:opacity-100'}"
                 >
                   <div class="flex flex-col gap-1 w-full">
                     <span class="text-lg md:text-xl font-medium font-serif leading-relaxed transition-colors duration-300 {i === activeSubtitleIndex ? 'text-orange-700 dark:text-orange-300 font-bold' : 'text-slate-700 dark:text-neutral-300'}">
                       {@html sub.text.replace(/\n/g, '<br/>')}
                     </span>
                     {#if sub.pinyin}
                       <span class="text-sm md:text-base font-mono transition-colors duration-300 {i === activeSubtitleIndex ? 'text-amber-600 dark:text-amber-400 font-semibold' : 'text-slate-500 dark:text-neutral-500'}">
                         {sub.pinyin}
                       </span>
                     {/if}
                   </div>
                 </button>
               {/each}
            {/if}
          </div>
        {:else}
          <div class="space-y-3.5 divide-y divide-slate-100 dark:divide-neutral-800">
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

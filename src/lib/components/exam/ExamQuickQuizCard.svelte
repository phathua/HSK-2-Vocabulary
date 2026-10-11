<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Check from 'phosphor-svelte/lib/Check';
  import X from 'phosphor-svelte/lib/X';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
  import XCircle from 'phosphor-svelte/lib/XCircle';
  import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
  import ArrowLeft from 'phosphor-svelte/lib/ArrowLeft';
  import BookmarkSimple from 'phosphor-svelte/lib/BookmarkSimple';
  import MagnifyingGlassPlus from 'phosphor-svelte/lib/MagnifyingGlassPlus';
  import Trophy from 'phosphor-svelte/lib/Trophy';
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
  import ListNumbers from 'phosphor-svelte/lib/ListNumbers';
  import Clock from 'phosphor-svelte/lib/Clock';
  import Play from 'phosphor-svelte/lib/Play';
  import Pause from 'phosphor-svelte/lib/Pause';
  import SmartImage from '../SmartImage.svelte';
  import type { QuestionItem } from '#lib/types/exam';
  import { getExamImageUrl, getExamAudioUrl, R2_PUBLIC_BASE_URL } from '#lib/utils/examAssets';
  import { fetchSrt, type SubtitleItem } from '#lib/utils/srtParser';
  import { speakChinese } from '#lib/utils/speech';
  import { appState } from '#lib/state/appState.svelte';

  interface Props {
    question: QuestionItem;
    questionIndex: number;
    totalQuestions: number;
    selectedAnswer?: string;
    isFlagged?: boolean;
    timeRemainingSeconds?: number;
    totalCorrect?: number;
    totalWrong?: number;
    audioSrc?: string | null;
    examCode?: string;
    onSelectAnswer: (val: string) => void;
    onToggleFlag: () => void;
    onNextQuestion: () => void;
    onPrevQuestion: () => void;
    onOpenPalette?: () => void;
    onSubmitExam: () => void;
  }

  let {
    question,
    questionIndex,
    totalQuestions,
    selectedAnswer = '',
    isFlagged = false,
    timeRemainingSeconds = 3300,
    totalCorrect = 0,
    totalWrong = 0,
    audioSrc = null,
    examCode = '',
    onSelectAnswer,
    onToggleFlag,
    onNextQuestion,
    onPrevQuestion,
    onOpenPalette,
    onSubmitExam
  }: Props = $props();

  let isImageZoomed = $state(false);
  let audioElement: HTMLAudioElement | undefined = $state();
  let isPlaying = $state(false);
  let audioCurrentTime = $state(0);
  let audioDuration = $state(0);
  let subtitles = $state<SubtitleItem[]>([]);
  let wasPlayingBeforeBlur = false;

  const resolvedAudioSrc = $derived(getExamAudioUrl(examCode || question.exam_code, audioSrc));

  const audioProgressPercent = $derived.by(() => {
    if (!audioDuration || audioDuration <= 0) return 0;
    return Math.min(100, Math.max(0, (audioCurrentTime / audioDuration) * 100));
  });

  // Suy đoán các lựa chọn trả lời tùy theo phần thi
  interface ChoiceOption {
    label: string;
    value: string;
    icon?: 'check' | 'x';
    image?: string | null;
  }

  const optionChoices = $derived.by((): ChoiceOption[] => {
    // 1. True/False: Luôn ưu tiên hiển thị nút Đúng (Check) và Sai (X) với value √ và ×
    if (question.type.includes('True/False')) {
      return [
        { label: 'Đúng', value: '√', icon: 'check' },
        { label: 'Sai', value: '×', icon: 'x' }
      ];
    }

    // 2. Nếu câu hỏi có cấu hình options riêng
    if (question.options && question.options.length > 0) {
      return question.options.map((opt) => {
        if (typeof opt === 'string') {
          return { label: opt, value: opt };
        }
        return {
          label: opt.label,
          value: opt.value,
          image: opt.image
        };
      });
    }

    // 3. Tranh A - F (Match / Part 2 / Reading Part 1 & 2)
    if (question.type.includes('Match') || question.part.includes('Part 2')) {
      return [
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
        { label: 'C', value: 'C' },
        { label: 'D', value: 'D' },
        { label: 'E', value: 'E' },
        { label: 'F', value: 'F' }
      ];
    }

    // 4. Mặc định A, B, C cho Part 3 & 4
    return [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' }
    ];
  });

  const isTrueFalse = $derived(question.type.includes('True/False'));
  const isAnswered = $derived(!!selectedAnswer);
  const isCorrect = $derived(isAnswered && selectedAnswer === question.answer);
  const isLastQuestion = $derived(questionIndex >= totalQuestions - 1);
  const isListeningQuestion = $derived(
    question.question_no <= 35 || question.section.includes('Listening') || question.section.includes('听力')
  );

  function formatTime(secs: number): string {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  function formatAudioTime(secs: number): string {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  function findQuestionTimestamp(qNo: number, script?: string | null): number | null {
    if (!subtitles || subtitles.length === 0) return null;
    const numRegex = new RegExp(`(?:第\\s*${qNo}\\s*[题題])|(?:第${qNo}[题題])`);
    let match = subtitles.find((s) => s.text && numRegex.test(s.text));
    if (match) return match.startTime;

    if (script) {
      const cleanScript = script.replace(/[^\u4e00-\u9fa5]/g, '');
      if (cleanScript.length >= 2) {
        match = subtitles.find((s) => {
          const cleanSub = (s.text || '').replace(/[^\u4e00-\u9fa5]/g, '');
          return cleanSub.length >= 2 && (cleanSub.includes(cleanScript) || cleanScript.includes(cleanSub));
        });
        if (match) return match.startTime;
      }
    }
    return null;
  }

  // Tự động tạm dừng khi đổi câu hỏi và nhảy tới timestamp câu hỏi tương ứng
  $effect(() => {
    const qNo = question.question_no;
    const script = question.listening_script;
    if (audioElement && isPlaying) {
      audioElement.pause();
      isPlaying = false;
    }
    if (isListeningQuestion && audioElement) {
      const targetTime = findQuestionTimestamp(qNo, script);
      if (targetTime !== null && targetTime >= 0) {
        audioElement.currentTime = targetTime;
        audioCurrentTime = targetTime;
      }
    }
  });

  function neutralizeMediaSession() {
    if (typeof navigator !== 'undefined' && 'mediaSession' in navigator) {
      try {
        navigator.mediaSession.metadata = null;
        navigator.mediaSession.playbackState = 'none';
        const actions: MediaSessionAction[] = [
          'play', 'pause', 'seekbackward', 'seekforward',
          'previoustrack', 'nexttrack', 'seekto', 'stop', 'skipad'
        ];
        actions.forEach((action) => {
          try {
            navigator.mediaSession.setActionHandler(action, null);
          } catch {}
        });
      } catch {}
    }
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      if (isPlaying) {
        wasPlayingBeforeBlur = true;
        if (audioElement) {
          audioElement.pause();
        }
        isPlaying = false;
        if ('mediaSession' in navigator) {
          navigator.mediaSession.playbackState = 'none';
        }
      }
    } else {
      if (wasPlayingBeforeBlur) {
        wasPlayingBeforeBlur = false;
        if (audioElement) {
          audioElement.play().then(() => {
            isPlaying = true;
            neutralizeMediaSession();
          }).catch(console.warn);
        }
      }
    }
  }

  function handleWindowBlur() {
    if (isPlaying) {
      wasPlayingBeforeBlur = true;
      if (audioElement) {
        audioElement.pause();
      }
      isPlaying = false;
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'none';
      }
    }
  }

  function handleWindowFocus() {
    if (wasPlayingBeforeBlur && !document.hidden) {
      wasPlayingBeforeBlur = false;
      if (audioElement) {
        audioElement.play().then(() => {
          isPlaying = true;
          neutralizeMediaSession();
        }).catch(console.warn);
      }
    }
  }

  onMount(() => {
    const code = examCode || question.exam_code;
    if (code) {
      fetchSrt(code, R2_PUBLIC_BASE_URL).then((data) => {
        if (data.length > 0) subtitles = data;
      });
    }

    neutralizeMediaSession();
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
  });

  onDestroy(() => {
    if (audioElement) {
      audioElement.pause();
    }
    isPlaying = false;
  });

  function togglePlayAudio() {
    if (!audioElement || !resolvedAudioSrc) {
      const textToSpeak = question.listening_script || question.text || '';
      if (!textToSpeak) return;
      if (isPlaying) {
        isPlaying = false;
        return;
      }
      isPlaying = true;
      speakChinese(textToSpeak, appState.volume);
      setTimeout(() => {
        isPlaying = false;
      }, 2500);
      return;
    }

    if (isPlaying) {
      audioElement.pause();
      isPlaying = false;
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'none';
      }
    } else {
      neutralizeMediaSession();
      audioElement.play().then(() => {
        isPlaying = true;
        neutralizeMediaSession();
      }).catch((e) => {
        console.warn('Audio play failed, fallback to TTS:', e);
        const textToSpeak = question.listening_script || question.text || '';
        if (textToSpeak) {
          speakChinese(textToSpeak, appState.volume);
        }
      });
    }
  }

  function handleAudioSeek(e: Event) {
    const target = e.target as HTMLInputElement;
    const val = parseFloat(target.value);
    audioCurrentTime = val;
    if (audioElement) {
      audioElement.currentTime = val;
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    if (e.key === 'ArrowRight' || e.key === 'Enter') {
      if (isLastQuestion) onSubmitExam();
      else onNextQuestion();
    } else if (e.key === 'ArrowLeft' && questionIndex > 0) {
      onPrevQuestion();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Hidden audio element for listening questions -->
{#if resolvedAudioSrc}
  <audio
    bind:this={audioElement}
    src={resolvedAudioSrc}
    preload="metadata"
    ontimeupdate={() => {
      if (audioElement) audioCurrentTime = audioElement.currentTime;
    }}
    onloadedmetadata={() => {
      if (audioElement) audioDuration = audioElement.duration;
    }}
    onended={() => {
      isPlaying = false;
    }}
    class="hidden"
  ></audio>
{/if}

<!-- Container chính phong cách MultipleChoiceQuizCard: Chiếm trọn 1 view, không bị scroll thừa -->
<div class="flex-1 min-h-0 flex flex-col justify-between overflow-hidden">
  <!-- Thẻ Question Card trung tâm (Giống y hệt MultipleChoiceQuizCard.svelte) -->
  <main
    class="flex-1 min-h-0 bg-white dark:bg-[#1B1B1B] rounded-3xl border border-slate-200 dark:border-[#282A2C] shadow-sm p-3 sm:p-4 md:p-6 flex flex-col justify-center items-center text-center relative overflow-hidden transition-colors"
  >
    <!-- Floating Button Trái: Nút CÂU X/60 (bấm mở Palette danh sách câu) -->
    <button
      type="button"
      onclick={() => onOpenPalette && onOpenPalette()}
      class="absolute top-3 left-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white rounded-2xl h-9 sm:h-10 px-2.5 sm:px-3 flex items-center justify-center gap-1.5 shadow-md transition-transform cursor-pointer z-10"
      title="Bấm để mở bảng 60 câu hỏi"
    >
      <ListNumbers weight="bold" class="w-4 h-4 sm:w-5 sm:h-5" />
      <span class="text-xs font-black uppercase tracking-wider">Câu {question.question_no}/{totalQuestions}</span>
    </button>

    <!-- Floating Buttons Phải: Nút Cắm cờ -->
    <div class="absolute top-3 right-3 flex items-center gap-1.5 z-10">
      <button
        type="button"
        onclick={onToggleFlag}
        class="rounded-2xl w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shadow-xs active:scale-95 transition-all cursor-pointer border {
          isFlagged
            ? 'bg-amber-100 dark:bg-amber-950/70 border-amber-300 dark:border-amber-800 text-amber-600'
            : 'bg-slate-100 dark:bg-[#282A2C] border-slate-200 dark:border-[#37393B] text-slate-400 hover:text-slate-600'
        }"
        title="Ghim câu này để xem lại"
      >
        <BookmarkSimple weight={isFlagged ? 'fill' : 'bold'} class="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>

    <!-- Container Nội Dung: 2 Cột trên Desktop (lg:grid lg:grid-cols-12), 1 Cột trên Mobile -->
    <div class="w-full flex-1 flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 items-center justify-center my-auto py-1 min-h-0">
      <!-- CỘT 1 (Desktop col-span-5): Tranh minh họa, Đề bài, Hán tự to rõ, Giải thích tức thì -->
      <div class="w-full lg:col-span-5 flex flex-col items-center justify-center text-center py-1 lg:border-r lg:border-slate-100 dark:lg:border-[#282A2C] lg:pr-6 max-h-full overflow-y-auto scrollbar-none">
        <!-- Thanh Tiến Độ Âm Thanh Tích Hợp (Dành cho câu hỏi phần Nghe) -->
        {#if isListeningQuestion}
          <div class="w-full max-w-sm mb-2 px-3 py-1.5 sm:py-2 bg-slate-50 dark:bg-[#282A2C]/60 rounded-2xl border border-slate-200 dark:border-[#37393B] shadow-2xs flex items-center gap-2.5 shrink-0">
            <!-- Nút Play / Pause -->
            <button
              type="button"
              onclick={togglePlayAudio}
              class="w-8 h-8 rounded-full bg-orange-600 hover:bg-orange-700 active:scale-95 text-white flex items-center justify-center shrink-0 shadow-sm transition-transform cursor-pointer"
              title={isPlaying ? "Tạm dừng audio" : "Phát audio câu hỏi"}
              aria-label={isPlaying ? "Tạm dừng" : "Phát audio"}
            >
              {#if isPlaying}
                <Pause weight="fill" class="w-3.5 h-3.5" />
              {:else}
                <Play weight="fill" class="w-3.5 h-3.5 ml-0.5" />
              {/if}
            </button>

            <!-- Thanh Tua & Thời Gian -->
            <div class="flex-1 min-w-0 flex flex-col gap-1 text-left">
              <div class="flex items-center justify-between text-[10px] font-bold font-mono text-slate-500 dark:text-[#8E918F]">
                <span class="flex items-center gap-1 text-slate-700 dark:text-slate-200 font-extrabold truncate">
                  <SpeakerHigh weight="bold" class="w-3 h-3 text-orange-500 shrink-0" />
                  <span class="truncate">Audio Câu {question.question_no}</span>
                </span>
                <span class="shrink-0">{formatAudioTime(audioCurrentTime)} / {formatAudioTime(audioDuration)}</span>
              </div>

              <!-- Thanh trượt Progress Bar -->
              <div class="relative w-full h-1.5 sm:h-2 bg-slate-200 dark:bg-neutral-700 rounded-full overflow-hidden cursor-pointer">
                <div
                  class="h-full bg-orange-500 rounded-full transition-all duration-100"
                  style="width: {audioProgressPercent}%"
                ></div>
                <input
                  type="range"
                  min="0"
                  max={audioDuration || 100}
                  step="0.5"
                  value={audioCurrentTime}
                  oninput={handleAudioSeek}
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  aria-label="Tua audio"
                />
              </div>
            </div>
          </div>
        {/if}

        <!-- Ảnh câu hỏi nếu có -->
        {#if question.image}
          <div class="relative mb-2 max-h-[30vh] sm:max-h-[36vh] flex items-center justify-center">
            <SmartImage
              src={getExamImageUrl(question.exam_code, question.image)}
              alt={`Hình câu ${question.question_no}`}
              class="max-h-[25vh] sm:max-h-[32vh] max-w-full rounded-2xl object-contain border border-slate-100 dark:border-[#282A2C] shadow-2xs bg-slate-50 dark:bg-[#282A2C]"
            />
            <button
              type="button"
              onclick={() => (isImageZoomed = true)}
              class="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-colors cursor-pointer"
              title="Phóng to ảnh"
            >
              <MagnifyingGlassPlus weight="bold" class="w-3.5 h-3.5" />
            </button>
          </div>
        {/if}

        <!-- Bảng tranh đối chiếu A - F nếu có -->
        {#if question.board_image}
          <div class="relative mb-2 max-h-[22vh] flex items-center justify-center">
            <SmartImage
              src={getExamImageUrl(question.exam_code, question.board_image)}
              alt="Bảng tranh đối chiếu"
              class="max-h-[18vh] max-w-full rounded-xl object-contain border border-slate-100 dark:border-[#282A2C]"
            />
          </div>
        {/if}

        <!-- Tiêu đề câu hỏi / Prompt Text -->
        <span class="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-[#8E918F] mb-1">
          {#if isTrueFalse}
            Chọn Đúng hoặc Sai:
          {:else if question.part.includes('Part 2') || question.type.includes('Match')}
            Chọn tranh A - F phù hợp:
          {:else}
            Chọn đáp án chính xác:
          {/if}
        </span>

        {#if question.text && !question.text.startsWith('Câu hỏi nghe số')}
          <div class="text-base sm:text-xl lg:text-2xl font-black text-slate-900 dark:text-[#E3E3E3] mb-1 max-w-sm leading-snug font-serif">
            {question.text}
          </div>
        {/if}

        <!-- Hộp Lời thoại & Giải thích tức thì khi đã trả lời -->
        {#if isAnswered}
          <div class="w-full max-w-sm mt-2 p-2.5 rounded-2xl border text-left transition-all animate-in fade-in duration-150 {
            isCorrect
              ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
              : 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100'
          }">
            <div class="flex items-center gap-1.5 font-bold text-xs">
              {#if isCorrect}
                <CheckCircle weight="fill" class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Chính xác! Đáp án: <strong class="font-mono">{question.answer}</strong></span>
              {:else}
                <XCircle weight="fill" class="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                <span>Chưa đúng! Đáp án đúng: <strong class="font-mono text-emerald-600 dark:text-emerald-400">{question.answer}</strong></span>
              {/if}
            </div>

            {#if question.listening_script}
              <div class="text-xs font-semibold font-serif mt-1 pt-1 border-t border-slate-200/50 dark:border-neutral-800 leading-snug">
                {question.listening_script}
              </div>
            {/if}

            {#if question.explanation}
              <div class="text-[11px] mt-1 text-slate-600 dark:text-neutral-300 leading-tight">
                <span class="font-bold text-amber-600 dark:text-amber-400">💡</span> {question.explanation}
              </div>
            {/if}
          </div>
        {/if}
      </div>

      <!-- CỘT 2 (Desktop col-span-7): 4 Đáp án trắc nghiệm & Nút tiếp theo trên Desktop (lg:flex) -->
      <div class="w-full lg:col-span-7 hidden lg:flex flex-col items-center justify-center py-2 lg:pl-4 space-y-3">
        <!-- Option Grid Desktop -->
        <div class="w-full grid {isTrueFalse ? 'grid-cols-2' : optionChoices.length > 4 ? 'grid-cols-3' : 'grid-cols-2'} gap-2.5">
          {#each optionChoices as opt, idx (opt.value)}
            {@const isSelected = selectedAnswer === opt.value}
            {@const isTarget = opt.value === question.answer}
            {@const isRevealed = isAnswered}

            <button
              type="button"
              onclick={() => onSelectAnswer(opt.value)}
              class={`min-h-[58px] p-3 rounded-2xl font-black text-left flex items-center gap-2.5 transition-all cursor-pointer border-2 relative select-none ${
                !isRevealed
                  ? 'bg-white dark:bg-[#1B1B1B] hover:bg-slate-50 dark:hover:bg-[#282A2C] border-slate-200 dark:border-[#282A2C] active:scale-98 shadow-2xs text-slate-800 dark:text-slate-200'
                  : isTarget
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-100 shadow-xs'
                  : isSelected
                  ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-950 dark:text-rose-100 shadow-xs'
                  : 'bg-slate-50 dark:bg-[#282A2C]/40 border-slate-200 dark:border-[#282A2C] opacity-50'
              }`}
            >
              <div
                class={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-black text-xs border transition-colors ${
                  !isRevealed
                    ? 'bg-slate-100 dark:bg-[#282A2C] text-slate-700 dark:text-[#C4C7C5] border-slate-200 dark:border-[#37393B]'
                    : isTarget
                    ? 'bg-emerald-500 text-white border-emerald-600'
                    : isSelected
                    ? 'bg-rose-500 text-white border-rose-600'
                    : 'bg-slate-200/60 dark:bg-[#282A2C] text-slate-400 border-slate-200 dark:border-[#37393B]'
                }`}
              >
                {#if opt.icon === 'check'}
                  <Check weight="bold" class="w-4 h-4" />
                {:else if opt.icon === 'x'}
                  <X weight="bold" class="w-4 h-4" />
                {:else}
                  {opt.value}
                {/if}
              </div>

              <div class="flex-1 min-w-0">
                <span class="text-sm font-bold truncate">
                  {isTrueFalse ? opt.label : opt.label !== opt.value ? `${opt.label} (${opt.value})` : opt.label}
                </span>
              </div>
            </button>
          {/each}
        </div>

        <!-- Nút Câu tiếp theo Desktop -->
        <div class="h-11 w-full">
          {#if isLastQuestion}
            <button
              type="button"
              onclick={onSubmitExam}
              class="w-full h-full font-black text-sm rounded-2xl flex items-center justify-center gap-1.5 transition-all select-none bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white shadow-md cursor-pointer"
            >
              <Trophy weight="bold" class="w-4 h-4" />
              <span>Xem kết quả bài thi</span>
            </button>
          {:else}
            <button
              type="button"
              onclick={onNextQuestion}
              class="w-full h-full font-black text-sm rounded-2xl flex items-center justify-center gap-1.5 transition-all select-none bg-orange-600 hover:bg-orange-700 active:scale-95 text-white shadow-md cursor-pointer"
            >
              <span>Câu tiếp theo</span>
              <ArrowRight weight="bold" class="w-4 h-4" />
            </button>
          {/if}
        </div>
      </div>
    </div>
  </main>

  <!-- Quiz Footer Controls: Đáp án & Nút tiếp theo trên Mobile/Tablet (< lg) -->
  <footer class="shrink-0 mt-2 space-y-1.5 lg:hidden">
    <!-- Options Grid Mobile -->
    <div class="grid {isTrueFalse ? 'grid-cols-2' : optionChoices.length > 4 ? 'grid-cols-3' : 'grid-cols-2'} gap-2">
      {#each optionChoices as opt, idx (opt.value)}
        {@const isSelected = selectedAnswer === opt.value}
        {@const isTarget = opt.value === question.answer}
        {@const isRevealed = isAnswered}

        <button
          type="button"
          onclick={() => onSelectAnswer(opt.value)}
          class={`min-h-[52px] sm:min-h-[60px] p-2.5 rounded-2xl font-black text-left flex items-center gap-2 transition-all cursor-pointer border-2 relative select-none ${
            !isRevealed
              ? 'bg-white dark:bg-[#1B1B1B] hover:bg-slate-50 dark:hover:bg-[#282A2C] border-slate-200 dark:border-[#282A2C] active:scale-98 shadow-2xs text-slate-800 dark:text-slate-200'
              : isTarget
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-100 shadow-xs'
              : isSelected
              ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-950 dark:text-rose-100 shadow-xs'
              : 'bg-slate-50 dark:bg-[#282A2C]/40 border-slate-200 dark:border-[#282A2C] opacity-50'
          }`}
        >
          <div
            class={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 font-black text-xs border transition-colors ${
              !isRevealed
                ? 'bg-slate-100 dark:bg-[#282A2C] text-slate-700 dark:text-[#C4C7C5] border-slate-200 dark:border-[#37393B]'
                : isTarget
                ? 'bg-emerald-500 text-white border-emerald-600'
                : isSelected
                ? 'bg-rose-500 text-white border-rose-600'
                : 'bg-slate-200/60 dark:bg-[#282A2C] text-slate-400 border-slate-200 dark:border-[#37393B]'
            }`}
          >
            {#if opt.icon === 'check'}
              <Check weight="bold" class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {:else if opt.icon === 'x'}
              <X weight="bold" class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {:else}
              {opt.value}
            {/if}
          </div>

          <div class="flex-1 min-w-0">
            <span class="text-xs sm:text-sm font-bold truncate">
              {isTrueFalse ? opt.label : opt.label !== opt.value ? `${opt.label} (${opt.value})` : opt.label}
            </span>
          </div>
        </button>
      {/each}
    </div>

    <!-- Nút Câu tiếp theo (Mobile) -->
    <div class="h-10 sm:h-11 w-full">
      {#if isLastQuestion}
        <button
          type="button"
          onclick={onSubmitExam}
          class="w-full h-full font-black text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-1.5 transition-all select-none bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white shadow-md cursor-pointer"
        >
          <Trophy weight="bold" class="w-4 h-4" />
          <span>Xem kết quả bài thi</span>
        </button>
      {:else}
        <button
          type="button"
          onclick={onNextQuestion}
          class="w-full h-full font-black text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-1.5 transition-all select-none bg-orange-600 hover:bg-orange-700 active:scale-95 text-white shadow-md cursor-pointer"
        >
          <span>Câu tiếp theo</span>
          <ArrowRight weight="bold" class="w-4 h-4" />
        </button>
      {/if}
    </div>

    <!-- Micro Stats Footer (Giống y hệt MultipleChoiceQuizCard.svelte) -->
    <div
      class="flex justify-between items-center px-3 py-1 bg-white dark:bg-[#1B1B1B] rounded-xl border border-slate-200 dark:border-[#282A2C] text-[11px] font-bold text-slate-500 dark:text-[#8E918F] transition-colors"
    >
      <span class="flex items-center gap-1">
        <CheckCircle weight="duotone" class="w-3.5 h-3.5 text-emerald-500" />
        Đúng: <b class="text-slate-900 dark:text-[#E3E3E3]">{totalCorrect}</b>
      </span>
      <span class="flex items-center gap-1">
        <XCircle weight="duotone" class="w-3.5 h-3.5 text-rose-500" />
        Sai: <b class="text-slate-900 dark:text-[#E3E3E3]">{totalWrong}</b>
      </span>
      <span class="flex items-center gap-1">
        <Clock weight="duotone" class="w-3.5 h-3.5 text-orange-500" />
        <span>{formatTime(timeRemainingSeconds)}</span>
      </span>
      <span class="flex items-center gap-1">
        <span>Còn:</span> <b class="text-slate-900 dark:text-[#E3E3E3]">{totalQuestions - questionIndex}</b>
      </span>
    </div>
  </footer>
</div>

<!-- Modal Phóng to ảnh -->
{#if isImageZoomed && question.image}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <button
      type="button"
      class="fixed inset-0 bg-black/80 backdrop-blur-xs cursor-default w-full h-full border-none"
      onclick={() => (isImageZoomed = false)}
      aria-label="Đóng phóng to ảnh"
    ></button>
    <div
      class="relative z-10 max-w-3xl w-full max-h-[85vh] bg-white dark:bg-neutral-900 rounded-3xl p-4 overflow-hidden shadow-2xl flex flex-col items-center justify-center"
    >
      <SmartImage
        src={getExamImageUrl(question.exam_code, question.image)}
        alt={`Ảnh phóng to câu ${question.question_no}`}
        class="max-w-full max-h-[75vh] object-contain rounded-2xl"
      />
      <button
        type="button"
        onclick={() => (isImageZoomed = false)}
        class="mt-3 px-5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs cursor-pointer shadow-xs"
      >
        Đóng
      </button>
    </div>
  </div>
{/if}

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { appState } from '#lib/state/appState.svelte';
  import { pinyin } from 'pinyin-pro';
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
  import PencilLine from 'phosphor-svelte/lib/PencilLine';
  import Microphone from 'phosphor-svelte/lib/Microphone';
  import Square from 'phosphor-svelte/lib/Square';
  import Check from 'phosphor-svelte/lib/Check';
  import X from 'phosphor-svelte/lib/X';
  import Confetti from 'phosphor-svelte/lib/Confetti';
  import ArrowClockwise from 'phosphor-svelte/lib/ArrowClockwise';
  import WarningCircle from 'phosphor-svelte/lib/WarningCircle';

  let isRecording = $state(false);
  let liveHanzi = $state('');
  let livePinyin = $state('');
  let isSpeechFinal = $state(false);
  let speechSupported = $state(true);
  let errorMessage = $state('');

  let recognition: any = null;

  onMount(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      speechSupported = false;
      errorMessage = 'Trình duyệt không hỗ trợ Web Speech API (Hãy dùng Chrome hoặc Safari trên iOS 14.5+)';
      return;
    }

    try {
      recognition = new SpeechRecognition();
      recognition.lang = 'zh-CN';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        isRecording = true;
        isSpeechFinal = false;
        errorMessage = '';
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        let isFinal = false;
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            isFinal = true;
          }
        }

        liveHanzi = transcript.trim();
        if (liveHanzi) {
          // Chuyển ký tự tiếng Trung sang phiên âm Pinyin có dấu thanh điệu
          livePinyin = pinyin(liveHanzi, { toneType: 'symbol' });
        }

        if (isFinal) {
          isSpeechFinal = true;
        }
      };

      recognition.onspeechend = () => {
        isSpeechFinal = true;
      };

      recognition.onend = () => {
        isRecording = false;
        // Nếu người dùng bật tùy chọn "Tự động xác nhận đáp án" và đã có kết quả nhận diện
        if (appState.speechAutoSubmit && livePinyin && !appState.speechAnswered) {
          submitAnswer();
        }
      };

      recognition.onerror = (event: any) => {
        isRecording = false;
        if (event.error === 'not-allowed') {
          errorMessage = 'Chưa cấp quyền Micro. Vui lòng cho phép Micro trong cài đặt trình duyệt.';
        } else if (event.error !== 'no-speech') {
          errorMessage = `Lỗi nhận dạng: ${event.error}`;
        }
      };
    } catch (err: any) {
      speechSupported = false;
      errorMessage = 'Không thể khởi tạo bộ nhận dạng giọng nói.';
    }
  });

  onDestroy(() => {
    if (recognition) {
      try {
        recognition.abort();
      } catch {}
    }
  });

  function startRecording() {
    if (!speechSupported || !recognition) return;
    if (appState.speechAnswered) {
      appState.nextSpeechItem();
    }
    liveHanzi = '';
    livePinyin = '';
    isSpeechFinal = false;
    errorMessage = '';
    try {
      recognition.start();
    } catch {
      try {
        recognition.stop();
        setTimeout(() => recognition.start(), 100);
      } catch {}
    }
  }

  function stopRecording() {
    if (recognition && isRecording) {
      try {
        recognition.stop();
      } catch {}
    }
  }

  function toggleRecord() {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }

  function cancelSpoken() {
    stopRecording();
    liveHanzi = '';
    livePinyin = '';
    isSpeechFinal = false;
  }

  function submitAnswer() {
    stopRecording();
    if (!livePinyin && !liveHanzi) return;
    appState.checkSpeechAnswer(livePinyin, liveHanzi);
  }

  const isZhToVi = $derived(appState.direction === 'zh_to_vi');
</script>

<!-- Main Pronounce Card -->
<main class="flex-1 min-h-0 bg-white rounded-3xl border border-slate-200 shadow-sm p-3.5 sm:p-4 flex flex-col justify-center items-center text-center relative overflow-hidden">
  <!-- Floating Lesson Select Button -->
  <button
    type="button"
    onclick={() => (appState.filterModalOpen = true)}
    class="absolute top-3.5 left-3.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white rounded-2xl h-10 sm:h-11 px-3 flex items-center justify-center gap-1.5 shadow-md transition-transform cursor-pointer"
    title="Bấm để chọn bài học"
  >
    <PencilLine size={20} weight="bold" />
    <span class="text-xs sm:text-sm font-bold truncate max-w-[130px] sm:max-w-[160px]">
      {appState.currentSpeechItem ? `Bài ${appState.currentSpeechItem.lesson}` : 'Chọn bài'}
    </span>
  </button>

  <!-- Floating Audio Speaker Button -->
  <button
    type="button"
    onclick={() => appState.speakCurrent()}
    class="absolute top-3.5 right-3.5 w-10 sm:w-11 h-10 sm:h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 flex items-center justify-center transition-transform cursor-pointer shadow-sm"
    title="Nghe mẫu phát âm"
  >
    <SpeakerHigh size={22} weight="bold" />
  </button>

  {#if appState.currentSpeechItem}
    <div class="flex-1 w-full flex flex-col justify-center items-center py-1 sm:py-2 max-w-sm mx-auto">
      <!-- Vocabulary Illustration Image -->
      {#if appState.currentSpeechItem.image}
        <div class="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border border-slate-100 shadow-inner mb-2 bg-slate-50 flex items-center justify-center flex-shrink-0">
          <img
            src={appState.currentSpeechItem.image}
            alt={appState.currentSpeechItem.hanzi}
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      {/if}

      <!-- Prompt Question & Target Character -->
      <div class="space-y-1 mb-2">
        <span class="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600">
          Hãy phát âm từ vựng bên dưới
        </span>

        {#if isZhToVi}
          <!-- Chế độ Trung -> Việt: Hiển thị chữ Hán to rõ (tuyệt đối KHÔNG hiển thị Pinyin trước) -->
          <h2 class="text-4xl sm:text-5xl font-black text-slate-800 tracking-wide font-sans mt-1">
            {appState.currentSpeechItem.hanzi}
          </h2>
          <p class="text-sm text-slate-400 font-medium">Nghĩa: {appState.currentSpeechItem.viet}</p>
        {:else}
          <!-- Chế độ Việt -> Trung: Hiển thị nghĩa tiếng Việt trước và chữ Hán -->
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-1">
            {appState.currentSpeechItem.viet}
          </h2>
          <p class="text-2xl font-bold text-slate-600 font-sans tracking-wide">
            {appState.currentSpeechItem.hanzi}
          </p>
        {/if}
      </div>

      <!-- Live Pinyin Speech Recognition Preview Area -->
      <div class="min-h-[44px] flex flex-col items-center justify-center my-1">
        {#if isRecording && !livePinyin}
          <div class="flex items-center gap-2 text-rose-500 text-sm font-semibold animate-pulse">
            <span class="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
            Đang lắng nghe giọng bạn... Hãy nói to rõ ràng!
          </div>
        {:else if livePinyin}
          <!-- Chữ phiên âm preview: mờ mờ khi đang nói, đậm đen khi dừng nói -->
          <div class="text-center px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
            <p
              class="text-xl sm:text-2xl transition-all duration-200 tracking-wide {isRecording
                ? 'text-slate-400 font-bold opacity-75'
                : 'text-slate-900 font-black'}"
            >
              {livePinyin}
            </p>
            {#if liveHanzi}
              <p class="text-xs text-slate-400 mt-0.5">Nhận dạng: {liveHanzi}</p>
            {/if}
          </div>
        {:else if errorMessage}
          <div class="flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100 max-w-xs">
            <WarningCircle size={16} weight="bold" class="flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        {:else}
          <p class="text-xs text-slate-400">Bấm biểu tượng Mic và phát âm tiếng Trung</p>
        {/if}
      </div>

      <!-- Result Feedback Message when Answered -->
      {#if appState.speechAnswered && appState.speechFeedback}
        <div class="mt-2 mb-1 px-4 py-2 rounded-2xl text-sm font-bold border transition-all {appState.speechFeedback.type === 'correct' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}">
          <p>{appState.speechFeedback.text}</p>
          <p class="text-xs font-semibold mt-0.5 text-slate-500">
            Đáp án chuẩn: <span class="font-bold text-slate-700">{appState.currentSpeechItem.pinyin}</span> ({appState.currentSpeechItem.hanzi})
          </p>
        </div>
      {/if}

      <!-- Interactive Speech Controls Area -->
      <div class="w-full mt-2 flex flex-col items-center">
        <!-- 3 Buttons Row: [X Cancel] - [Mic Record / Stop] - [Tick Confirm] -->
        <div class="flex items-center justify-center gap-4 sm:gap-6">
          <!-- Button X: Hủy / xóa bản ghi -->
          <button
            type="button"
            onclick={cancelSpoken}
            disabled={!livePinyin && !isRecording}
            class="w-12 h-12 rounded-full border-2 border-slate-200 bg-white hover:bg-slate-100 active:scale-95 text-slate-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center shadow-sm transition-all cursor-pointer"
            title="Hủy bỏ / Thử lại"
          >
            <X size={22} weight="bold" />
          </button>

          <!-- Main Big Circular Mic / Stop Button -->
          <button
            type="button"
            onclick={toggleRecord}
            class="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all duration-200 cursor-pointer {isRecording
              ? 'bg-rose-600 text-white shadow-rose-300 ring-4 ring-rose-200 animate-pulse'
              : 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-blue-200 hover:from-blue-700 hover:to-indigo-700'}"
            title={isRecording ? 'Dừng ghi âm' : 'Bấm để ghi âm phát âm'}
          >
            {#if isRecording}
              <Square size={28} weight="fill" />
            {:else}
              <Microphone size={34} weight="duotone" />
            {/if}
          </button>

          <!-- Button Tick: Xác nhận nộp đáp án -->
          {#if appState.speechAnswered}
            <button
              type="button"
              onclick={() => appState.nextSpeechItem()}
              class="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
              title="Từ tiếp theo"
            >
              <Check size={24} weight="bold" />
            </button>
          {:else}
            <button
              type="button"
              onclick={submitAnswer}
              disabled={!livePinyin}
              class="w-12 h-12 rounded-full border-2 border-emerald-500 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-300 disabled:pointer-events-none flex items-center justify-center shadow-sm transition-all cursor-pointer"
              title="Gửi xác nhận đáp án"
            >
              <Check size={24} weight="bold" />
            </button>
          {/if}
        </div>

        <!-- Checkbox: Tự động xác nhận đáp án -->
        <label class="mt-3 inline-flex items-center gap-2.5 cursor-pointer select-none text-xs sm:text-sm text-slate-600 hover:text-slate-800 transition-colors">
          <input
            type="checkbox"
            checked={appState.speechAutoSubmit}
            onchange={() => appState.toggleSpeechAutoSubmit()}
          />
          <span class="font-medium">Tự động xác nhận đáp án sau khi nói</span>
        </label>
      </div>
    </div>
  {:else}
    <!-- Completed Deck State -->
    <div class="flex-1 flex flex-col justify-center items-center py-8">
      <div class="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
        <Confetti size={36} weight="duotone" />
      </div>
      <h3 class="text-xl font-bold text-slate-800 mb-1">Đã hoàn thành lượt luyện phát âm!</h3>
      <p class="text-sm text-slate-500 mb-6">Bạn đã phát âm chính xác {appState.speechCorrect} / {appState.speechDoneCount} từ vựng.</p>
      <button
        type="button"
        onclick={() => appState.initSpeech()}
        class="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold py-3 px-6 rounded-2xl flex items-center gap-2 shadow-md transition-transform cursor-pointer"
      >
        <ArrowClockwise size={20} weight="bold" />
        Luyện tập lại
      </button>
    </div>
  {/if}
</main>

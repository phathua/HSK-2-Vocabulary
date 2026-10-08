<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { appState } from '#lib/state/appState.svelte';
  import { pinyin } from 'pinyin-pro';
  import { toast } from 'svelte-sonner';
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
  import PencilLine from 'phosphor-svelte/lib/PencilLine';
  import Microphone from 'phosphor-svelte/lib/Microphone';
  import Square from 'phosphor-svelte/lib/Square';
  import Check from 'phosphor-svelte/lib/Check';
  import X from 'phosphor-svelte/lib/X';
  import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
  import Confetti from 'phosphor-svelte/lib/Confetti';
  import ArrowClockwise from 'phosphor-svelte/lib/ArrowClockwise';
  import WarningCircle from 'phosphor-svelte/lib/WarningCircle';

  let isRecording = $state(false);
  let liveHanzi = $state('');
  let livePinyin = $state('');
  let speechSupported = $state(true);
  let errorMessage = $state('');

  let recognition: any = null;
  let activeRecItemId: string | null = null;

  // Lắng nghe thay đổi từ vựng hiện tại: tự động reset sạch sẽ preview và thông báo lỗi
  $effect(() => {
    const currentId = appState.currentSpeechItem?.id;
    if (currentId) {
      liveHanzi = '';
      livePinyin = '';
      errorMessage = '';
    }
  });

  function cleanupRecognition() {
    if (recognition) {
      try {
        recognition.onstart = null;
        recognition.onresult = null;
        recognition.onspeechend = null;
        recognition.onend = null;
        recognition.onerror = null;
        recognition.abort();
      } catch {}
      recognition = null;
    }
    activeRecItemId = null;
    isRecording = false;
  }

  function createRecognition(targetItemId: string) {
    cleanupRecognition();
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      speechSupported = false;
      errorMessage = 'Trình duyệt không hỗ trợ Web Speech API (Hãy dùng Chrome hoặc Safari trên iOS 14.5+)';
      return null;
    }

    try {
      const rec = new SpeechRecognition();
      rec.lang = 'zh-CN';
      rec.continuous = false;
      rec.interimResults = true;
      rec.maxAlternatives = 1;

      rec.onstart = () => {
        isRecording = true;
        errorMessage = '';
      };

      rec.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }

        const trimmed = transcript.trim();
        liveHanzi = trimmed;
        if (trimmed) {
          livePinyin = pinyin(trimmed, { toneType: 'symbol' });
        }
      };

      rec.onspeechend = () => {
        // Người dùng dừng nói
      };

      rec.onend = () => {
        isRecording = false;
        // Tự động nộp bài nếu bật cấu hình và người dùng đang ở đúng câu đó
        if (
          appState.speechAutoSubmit &&
          livePinyin &&
          !appState.speechAnswered &&
          appState.currentSpeechItem?.id === targetItemId
        ) {
          submitAnswer();
        }
      };

      rec.onerror = (event: any) => {
        isRecording = false;
        if (event.error === 'not-allowed') {
          errorMessage = 'Chưa cấp quyền Micro. Vui lòng cho phép Micro trong cài đặt.';
        } else if (event.error !== 'no-speech' && event.error !== 'aborted') {
          errorMessage = `Lỗi nhận dạng: ${event.error}`;
        }
      };

      activeRecItemId = targetItemId;
      return rec;
    } catch (err: any) {
      speechSupported = false;
      errorMessage = 'Không thể khởi tạo bộ nhận dạng giọng nói.';
      return null;
    }
  }

  onMount(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      speechSupported = false;
      errorMessage = 'Trình duyệt không hỗ trợ Web Speech API (Hãy dùng Chrome hoặc Safari trên iOS 14.5+)';
    }
  });

  onDestroy(() => {
    cleanupRecognition();
  });

  function handleNext() {
    cleanupRecognition();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    liveHanzi = '';
    livePinyin = '';
    errorMessage = '';
    appState.nextSpeechItem();
  }

  function handleRetry() {
    cleanupRecognition();
    liveHanzi = '';
    livePinyin = '';
    errorMessage = '';
    appState.speechAnswered = false;
    appState.speechFeedback = null;
  }

  function startRecording() {
    if (!speechSupported || appState.speechAnswered || !appState.currentSpeechItem) return;

    liveHanzi = '';
    livePinyin = '';
    errorMessage = '';

    // Hủy âm thanh TTS đang đọc nếu có
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    const currentId = appState.currentSpeechItem.id;
    recognition = createRecognition(currentId);
    if (!recognition) return;

    // GỌI ĐỒNG BỘ TRONG EVENT CLICK ĐỂ BẢO TOÀN USER GESTURE TRÊN WEBKIT / IOS
    try {
      recognition.start();
    } catch (e: any) {
      console.warn('SpeechRecognition start failed:', e);
      try {
        recognition.stop();
        setTimeout(() => {
          try {
            recognition?.start();
          } catch {}
        }, 100);
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
    cleanupRecognition();
    liveHanzi = '';
    livePinyin = '';
  }

  function submitAnswer() {
    stopRecording();
    if (!livePinyin && !liveHanzi) return;

    const targetHanzi = appState.currentSpeechItem?.hanzi || '';
    const targetPinyin = appState.currentSpeechItem?.pinyin || '';

    appState.checkSpeechAnswer(livePinyin, liveHanzi);

    // Thông báo Toast Sonner nổi bật, không làm chật chội màn hình
    if (appState.speechFeedback?.type === 'correct') {
      toast.success('Phát âm chuẩn xác! 🎉', {
        description: `${targetHanzi} • ${targetPinyin}`
      });
    } else {
      toast.error('Chưa chính xác!', {
        description: `Chuẩn là: ${targetPinyin} (${targetHanzi})`
      });
    }
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

  <!-- Floating Audio Speaker Button: Đồng nhất tuyệt đối shape rounded-2xl và màu bg-emerald-500 -->
  <button
    type="button"
    onclick={() => appState.speakCurrent()}
    class="absolute top-3.5 right-3.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white rounded-2xl w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shadow-sm transition-transform cursor-pointer"
    title="Nghe mẫu phát âm"
  >
    <SpeakerHigh weight="bold" class="w-5 h-5 sm:w-6 sm:h-6" />
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

      <!-- Live Pinyin Speech Recognition Preview Area: Bỏ khung card xám và bỏ label nhận dạng -->
      <div class="min-h-[44px] flex flex-col items-center justify-center my-1.5 px-2">
        {#if isRecording && !livePinyin}
          <div class="flex items-center gap-2 text-rose-500 text-sm font-semibold animate-pulse">
            <span class="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
            Đang lắng nghe giọng bạn... Hãy nói to rõ ràng!
          </div>
        {:else if livePinyin}
          <!-- Chữ phiên âm preview thoáng sạch, không khung viền xám, mờ khi đang nói và đậm khi dứt câu -->
          <p
            class="text-2xl sm:text-3xl transition-all duration-200 tracking-wide {isRecording
              ? 'text-slate-400 font-bold opacity-75'
              : 'text-slate-900 font-black'}"
          >
            {livePinyin}
          </p>
        {:else if errorMessage}
          <div class="flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100 max-w-xs">
            <WarningCircle size={16} weight="bold" class="flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        {:else}
          <p class="text-xs text-slate-400">Bấm biểu tượng Mic và phát âm tiếng Trung</p>
        {/if}
      </div>

      <!-- Interactive Speech Controls Area -->
      <div class="w-full mt-2 flex flex-col items-center">
        {#if appState.speechAnswered && appState.speechFeedback?.type === 'correct'}
          <!-- Khi ĐÚNG: Nút to 'Từ tiếp theo' -->
          <div class="w-full max-w-xs flex justify-center">
            <button
              type="button"
              onclick={handleNext}
              class="w-full h-12 sm:h-14 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-extrabold text-base rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              title="Sang từ tiếp theo"
            >
              <span>Từ tiếp theo</span>
              <ArrowRight size={22} weight="bold" />
            </button>
          </div>
        {:else if appState.speechAnswered && appState.speechFeedback?.type === 'wrong'}
          <!-- Khi SAI: Nút Thử lại, Bấm nói lại, hoặc Bỏ qua sang từ tiếp theo -->
          <div class="flex items-center justify-center gap-4 sm:gap-6">
            <button
              type="button"
              onclick={handleRetry}
              class="w-12 h-12 rounded-full border-2 border-slate-200 bg-white hover:bg-slate-100 active:scale-95 text-slate-700 flex items-center justify-center shadow-sm cursor-pointer"
              title="Thử lại"
            >
              <ArrowClockwise size={22} weight="bold" />
            </button>

            <button
              type="button"
              onclick={() => { handleRetry(); startRecording(); }}
              class="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all bg-gradient-to-tr from-blue-600 to-indigo-600 text-white cursor-pointer"
              title="Bấm để phát âm lại"
            >
              <Microphone size={34} weight="duotone" />
            </button>

            <button
              type="button"
              onclick={handleNext}
              class="w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-900 active:scale-95 text-white flex items-center justify-center shadow-md cursor-pointer"
              title="Bỏ qua sang từ tiếp theo"
            >
              <ArrowRight size={22} weight="bold" />
            </button>
          </div>
        {:else}
          <!-- Khi CHƯA NỘP: 3 nút [X Hủy] - [Mic Ghi âm] - [Tick Xác nhận] -->
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
            <button
              type="button"
              onclick={submitAnswer}
              disabled={!livePinyin}
              class="w-12 h-12 rounded-full border-2 border-emerald-500 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-300 disabled:pointer-events-none flex items-center justify-center shadow-sm transition-all cursor-pointer"
              title="Gửi xác nhận đáp án"
            >
              <Check size={24} weight="bold" />
            </button>
          </div>
        {/if}

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

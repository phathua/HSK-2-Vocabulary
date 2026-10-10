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
  import SmartImage from './SmartImage.svelte';

  // 1. Máy trạng thái Finite State Machine (FSM) lấy cảm hứng từ ios27-stt-lab
  type RecState = 'idle' | 'starting' | 'listening' | 'stopping' | 'unsupported';

  let recState = $state<RecState>('idle');
  let liveHanzi = $state('');
  let livePinyin = $state('');
  let speechSupported = $state(true);
  let errorMessage = $state('');
  let isBrave = $state(false);

  // Quản lý lifecycle WebKit chuẩn xác từ phòng thí nghiệm ios27-stt-lab
  let recognition: any = null;
  let recognitionStarted = false;
  let recognitionStarting = false;
  let expectedEnd = false;
  let activeRecItemId: string | null = null;
  let session = 0;

  // Timers bảo vệ
  let startWatchdogTimer: any = null;
  let utteranceWatchdogTimer: any = null;

  // Trạng thái dẫn xuất
  const isRecording = $derived(recState === 'listening' || recState === 'starting');
  const isBusy = $derived(recState === 'starting' || recState === 'stopping');
  const isZhToVi = $derived(appState.direction === 'zh_to_vi');

  // Lắng nghe thay đổi từ vựng hiện tại: tự động giải phóng sạch sẽ phiên ghi âm cũ và reset preview
  $effect(() => {
    const currentId = appState.currentSpeechItem?.id;
    if (currentId) {
      if (recognition) {
        abortRecognition();
      }
      liveHanzi = '';
      livePinyin = '';
      errorMessage = '';
    }
  });

  function clearAllTimers() {
    if (startWatchdogTimer) { clearTimeout(startWatchdogTimer); startWatchdogTimer = null; }
    if (utteranceWatchdogTimer) { clearTimeout(utteranceWatchdogTimer); utteranceWatchdogTimer = null; }
  }

  // Kiểm tra xem trình duyệt có đang phát âm thanh TTS không (Ngăn WebKit Bug 321436)
  function canStartRecording(): boolean {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.speaking && window.speechSynthesis.pending) {
        toast.info('Đang phát âm mẫu', {
          description: 'Vui lòng đợi âm thanh mẫu kết thúc rồi bấm Micro lại nhé!',
          duration: 3500
        });
        return false;
      }
      // Nếu speaking bị kẹt mồ côi (không có pending), giải phóng an toàn
      if (window.speechSynthesis.speaking && !window.speechSynthesis.pending) {
        try { window.speechSynthesis.cancel(); } catch {}
      }
    }
    return true;
  }

  // Hủy phiên ghi âm sạch sẽ: Dùng cờ expectedEnd mà KHÔNG gán null cho listener (chuẩn ios27-stt-lab)
  function abortRecognition() {
    clearAllTimers();

    if (recognition) {
      expectedEnd = true;
      try {
        recognition.abort();
      } catch {}
    }

    recognitionStarted = false;
    recognitionStarting = false;
    recState = 'idle';
  }

  function armUtteranceWatchdog(mySession: number) {
    if (utteranceWatchdogTimer) clearTimeout(utteranceWatchdogTimer);
    utteranceWatchdogTimer = setTimeout(() => {
      if (session !== mySession) return;
      if (recState === 'listening') {
        console.warn('[Speech] Utterance watchdog fired: silence detected');
        abortRecognition();
        if (!livePinyin && !liveHanzi) {
          errorMessage = 'Không nghe thấy âm thanh. Hãy thử nói to hơn.';
        }
      }
    }, 9000);
  }

  function newRecognition(mySession: number, targetItemId: string) {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      speechSupported = false;
      recState = 'unsupported';
      errorMessage = 'Trình duyệt không hỗ trợ Web Speech API (Hãy dùng Chrome hoặc Safari trên iOS 14.5+)';
      return null;
    }

    const r = new SpeechRecognition();
    r.lang = 'zh-CN';
    // BÍ QUYẾT 1 TỪ LAB: continuous = true để WebKit không tự ý ngắt kết nối micro đột ngột
    r.continuous = true;
    r.interimResults = true;
    r.maxAlternatives = 1;

    recognition = r;
    recognitionStarted = false;
    recognitionStarting = false;
    expectedEnd = false;

    r.onstart = () => {
      if (r !== recognition || session !== mySession) return;
      recognitionStarted = true;
      recognitionStarting = false;
      recState = 'listening';
      errorMessage = '';

      if (startWatchdogTimer) {
        clearTimeout(startWatchdogTimer);
        startWatchdogTimer = null;
      }

      armUtteranceWatchdog(mySession);
    };

    r.onresult = (event: any) => {
      if (r !== recognition || session !== mySession) return;
      armUtteranceWatchdog(mySession);

      let transcript = '';
      let hasFinal = false;

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const item = event.results[i];
        const text = item[0]?.transcript?.trim() || '';
        transcript += text;
        if (item.isFinal) hasFinal = true;
      }

      const trimmed = transcript.trim();
      if (trimmed) {
        liveHanzi = trimmed;
        try {
          livePinyin = pinyin(trimmed, { toneType: 'symbol' });
        } catch {
          livePinyin = trimmed;
        }
      }

      // Tự động nộp bài khi nhận kết quả final chứa chữ Hán (chuẩn theo lab acceptText)
      const hasChinese = /[\u4e00-\u9fa5]/.test(liveHanzi);
      if (
        appState.speechAutoSubmit &&
        !appState.speechAnswered &&
        hasFinal &&
        hasChinese &&
        appState.currentSpeechItem?.id === targetItemId
      ) {
        submitAnswer();
      }
    };

    r.onspeechend = () => {
      if (r !== recognition || session !== mySession) return;
    };

    r.onerror = (event: any) => {
      if (r !== recognition || session !== mySession) return;
      console.warn('[Speech] onerror:', event.error);

      if (event.error === 'not-allowed') {
        errorMessage = 'Chưa cấp quyền Micro. Vui lòng cho phép Micro trong cài đặt.';
        toast.error('Chưa cấp quyền Micro', {
          description: 'Vui lòng cho phép quyền truy cập Micro trên trình duyệt để luyện phát âm.',
          duration: 6000
        });
      } else if (event.error === 'network') {
        if (isBrave) {
          errorMessage = 'Brave chặn dịch vụ nhận diện giọng nói Google.';
          toast.error('Brave không hỗ trợ nhận diện giọng nói', {
            description: 'Trình duyệt Brave chặn dịch vụ nhận diện của Google vì lý do bảo mật. Vui lòng chuyển sang Google Chrome hoặc Microsoft Edge để học phát âm nhé!',
            duration: 8000
          });
        } else {
          errorMessage = 'Lỗi kết nối mạng (Web Speech).';
          toast.error('Lỗi kết nối mạng (Web Speech)', {
            description: 'Mất kết nối tới máy chủ nhận dạng. Hãy kiểm tra lại kết nối Internet hoặc VPN của bạn.',
            duration: 6000
          });
        }
      } else if (event.error !== 'no-speech' && event.error !== 'aborted') {
        errorMessage = `Lỗi nhận dạng: ${event.error}`;
        toast.error('Sự cố thu âm', {
          description: `Mã lỗi: ${event.error}. Vui lòng thử lại.`,
          duration: 5000
        });
      }
    };

    r.onend = () => {
      // Bỏ qua callback thuộc phiên cũ (ngăn onend trễ ghi đè trạng thái phiên mới)
      if (r !== recognition || session !== mySession) return;

      recognitionStarted = false;
      recognitionStarting = false;
      expectedEnd = false;
      if (recState !== 'unsupported') recState = 'idle';
      clearAllTimers();
    };

    return r;
  }

  function startRecording() {
    if (!speechSupported || appState.speechAnswered || !appState.currentSpeechItem) return;
    // BÍ QUYẾT 3 TỪ LAB: Cờ khóa recognitionStarting chống double-click đè phiên
    if (recognitionStarted || recognitionStarting || isBusy) return;
    if (!canStartRecording()) return;

    liveHanzi = '';
    livePinyin = '';
    errorMessage = '';

    const mySession = ++session;
    const targetItemId = appState.currentSpeechItem.id;
    activeRecItemId = targetItemId;

    // BÍ QUYẾT 4 TỪ LAB: Tạo instance mới hoàn toàn cho mỗi lượt
    const r = newRecognition(mySession, targetItemId);
    if (!r) return;

    clearAllTimers();
    recState = 'starting';
    recognitionStarting = true;

    // Start Watchdog bảo vệ 10s phòng khi iOS popup xin quyền Micro
    startWatchdogTimer = setTimeout(() => {
      if (session !== mySession) return;
      if (recognitionStarting) {
        console.warn('[Speech] Start watchdog fired');
        abortRecognition();
        errorMessage = 'Không thể kích hoạt micro. Vui lòng cấp quyền micro và thử lại.';
      }
    }, 10000);

    try {
      // Gọi đồng bộ ngay trong microtask của click event (bảo toàn User Gesture Token)
      r.start();
    } catch (err: any) {
      console.warn('SpeechRecognition start failed:', err);
      clearAllTimers();
      recognitionStarting = false;
      recState = 'idle';
      errorMessage = 'Không thể bật micro lúc này. Vui lòng bấm thử lại.';
    }
  }

  function stopRecording() {
    if (recognition && (recognitionStarted || recognitionStarting)) {
      recState = 'stopping';
      const r = recognition;
      try {
        r.abort();
      } catch {}

      // Watchdog phòng hờ WebKit continuous mode không bắn onend
      setTimeout(() => {
        if (r === recognition && recState === 'stopping') {
          recognitionStarted = false;
          recognitionStarting = false;
          expectedEnd = false;
          recState = 'idle';
        }
      }, 800);
    }
  }

  function toggleRecord() {
    if (isBusy) return;
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }

  function cancelSpoken() {
    abortRecognition();
    liveHanzi = '';
    livePinyin = '';
  }

  function submitAnswer() {
    stopRecording();
    if (!livePinyin && !liveHanzi) return;

    // Chống lọt tiếng Anh (như "thank you") trên Microsoft Edge
    const hasChinese = /[\u4e00-\u9fa5]/.test(liveHanzi);
    if (!hasChinese && liveHanzi) {
      errorMessage = `Phát hiện tiếng Anh ("${liveHanzi}"). Hãy phát âm lại bằng tiếng Trung!`;
      toast.error('Chưa phát hiện tiếng Trung', {
        description: `Trình duyệt nghe thấy: "${liveHanzi}". Vui lòng phát âm rõ tiếng Trung!`,
        duration: 6000
      });
      return;
    }

    const targetHanzi = appState.currentSpeechItem?.hanzi || '';
    const targetPinyin = appState.currentSpeechItem?.pinyin || '';

    // Tuân thủ 100% Contract: checkSpeechAnswer trả về void, cập nhật speechFeedback
    appState.checkSpeechAnswer(livePinyin, liveHanzi);

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

  function handleRetry() {
    abortRecognition();
    liveHanzi = '';
    livePinyin = '';
    errorMessage = '';
    appState.speechAnswered = false;
    appState.speechFeedback = null;
  }

  function handleNext() {
    abortRecognition();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    liveHanzi = '';
    livePinyin = '';
    errorMessage = '';
    appState.nextSpeechItem();
  }

  function handleSpeakSample() {
    // Ngắt phiên thu âm nếu người dùng chuyển sang nghe phát âm mẫu
    abortRecognition();
    appState.speakCurrent();
  }

  function handleVisibilityChange() {
    if (document.hidden && (isRecording || isBusy)) {
      abortRecognition();
    }
  }

  onMount(() => {
    const SpeechRecognition =
      typeof window !== 'undefined' &&
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
    speechSupported = !!SpeechRecognition;
    if (!speechSupported) {
      recState = 'unsupported';
      errorMessage = 'Trình duyệt không hỗ trợ Web Speech API (Hãy dùng Chrome hoặc Safari trên iOS 14.5+)';
    }

    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }

    if (typeof navigator !== 'undefined' && (navigator as any).brave) {
      if (typeof (navigator as any).brave.isBrave === 'function') {
        (navigator as any).brave.isBrave().then((res: boolean) => {
          isBrave = !!res;
        }).catch(() => {});
      } else {
        isBrave = true;
      }
    }
  });

  onDestroy(() => {
    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
    clearAllTimers();
    abortRecognition();
  });
</script>

<!-- Main Pronounce Card -->
<main class="flex-1 min-h-0 bg-white dark:bg-[#1B1B1B] rounded-3xl border border-slate-200 dark:border-[#282A2C] shadow-sm p-3.5 sm:p-4 md:p-6 flex flex-col justify-center items-center text-center relative overflow-hidden transition-colors">
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

  <!-- Floating Audio Speaker Button: Bấm nghe mẫu dọn dẹp micro sạch sẽ -->
  <button
    type="button"
    disabled={isRecording || isBusy}
    onclick={handleSpeakSample}
    class="absolute top-3.5 right-3.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white rounded-2xl w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shadow-sm transition-transform cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
    title="Nghe mẫu phát âm"
  >
    <SpeakerHigh weight="bold" class="w-5 h-5 sm:w-6 sm:h-6" />
  </button>

  {#if appState.currentSpeechItem}
    <div class="flex-1 w-full flex flex-col justify-center items-center py-1 sm:py-2 max-w-md mx-auto my-auto">
      <!-- Vocabulary Illustration Image -->
      {#if appState.currentSpeechItem.image}
        <div class="mb-2 md:mb-4 flex items-center justify-center flex-shrink-0">
          <SmartImage
            src={appState.currentSpeechItem.image}
            alt={appState.currentSpeechItem.hanzi}
            class="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-2xl border border-slate-100 dark:border-[#282A2C] shadow-inner bg-slate-50 dark:bg-[#282A2C]"
          />
        </div>
      {/if}

      <!-- Prompt Question & Target Character -->
      <div class="space-y-1 mb-2">
        <span class="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
          Hãy phát âm từ vựng bên dưới
        </span>

        {#if isZhToVi}
          <!-- Chế độ Trung -> Việt: Hiển thị chữ Hán to rõ (tuyệt đối KHÔNG hiển thị Pinyin trước) -->
          <h2 class="text-4xl sm:text-5xl md:text-6xl font-black text-slate-800 dark:text-[#E3E3E3] tracking-wide font-sans mt-1">
            {appState.currentSpeechItem.hanzi}
          </h2>
          <p class="text-sm md:text-base text-slate-400 dark:text-[#8E918F] font-medium">Nghĩa: {appState.currentSpeechItem.viet}</p>
        {:else}
          <!-- Chế độ Việt -> Trung: Hiển thị nghĩa tiếng Việt trước và chữ Hán -->
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-[#E3E3E3] mt-1">
            {appState.currentSpeechItem.viet}
          </h2>
          <p class="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-600 dark:text-[#C4C7C5] font-sans tracking-wide">
            {appState.currentSpeechItem.hanzi}
          </p>
        {/if}
      </div>

      <!-- Live Pinyin Speech Recognition Preview Area -->
      <div class="min-h-[44px] flex flex-col items-center justify-center my-1.5 px-2">
        {#if isRecording && !livePinyin}
          <div class="flex items-center gap-2 text-rose-500 text-sm font-semibold animate-pulse">
            <span class="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
            Đang lắng nghe giọng bạn... Hãy nói to rõ ràng!
          </div>
        {:else if livePinyin}
          <p
            class="text-2xl sm:text-3xl md:text-4xl transition-all duration-200 tracking-wide {isRecording
              ? 'text-slate-400 dark:text-[#8E918F] font-bold opacity-75'
              : 'text-slate-900 dark:text-[#E3E3E3] font-black'}"
          >
            {livePinyin}
          </p>
        {:else if errorMessage}
          <div class="flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950/60 px-3 py-1.5 rounded-xl border border-rose-100 dark:border-rose-900/60 max-w-xs">
            <WarningCircle size={16} weight="bold" class="flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        {:else}
          <p class="text-xs text-slate-400 dark:text-[#8E918F]">Bấm biểu tượng Mic và phát âm tiếng Trung</p>
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
              disabled={isBusy}
              onclick={handleRetry}
              class="w-12 h-12 rounded-full border-2 border-slate-200 bg-white hover:bg-slate-100 active:scale-95 text-slate-700 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center shadow-sm cursor-pointer"
              title="Thử lại"
            >
              <ArrowClockwise size={22} weight="bold" />
            </button>

            <button
              type="button"
              disabled={isBusy}
              onclick={() => { handleRetry(); setTimeout(startRecording, 300); }}
              class="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all bg-gradient-to-tr from-blue-600 to-indigo-600 text-white disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              title="Bấm để phát âm lại"
            >
              <Microphone size={34} weight="duotone" />
            </button>

            <button
              type="button"
              disabled={isBusy}
              onclick={handleNext}
              class="w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-900 active:scale-95 text-white disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center shadow-md cursor-pointer"
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
              disabled={(!livePinyin && !isRecording) || isBusy}
              class="w-12 h-12 rounded-full border-2 border-slate-200 bg-white hover:bg-slate-100 active:scale-95 text-slate-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center shadow-sm transition-all cursor-pointer"
              title="Hủy bỏ / Thử lại"
            >
              <X size={22} weight="bold" />
            </button>

            <!-- Main Big Circular Mic / Stop Button -->
            <button
              type="button"
              onclick={toggleRecord}
              disabled={isBusy}
              class="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-75 disabled:pointer-events-none {isRecording
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
              disabled={!livePinyin || isBusy}
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

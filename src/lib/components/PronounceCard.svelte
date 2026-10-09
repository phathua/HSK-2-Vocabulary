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

  // 1. Máy trạng thái Finite State Machine (FSM)
  type RecState = 'idle' | 'starting' | 'listening' | 'stopping' | 'cooldown' | 'unsupported';

  let recState = $state<RecState>('idle');
  let liveHanzi = $state('');
  let livePinyin = $state('');
  let speechSupported = $state(true);
  let errorMessage = $state('');
  let isBrave = $state(false);

  // Quản lý định danh phiên độc lập & cờ lỗi
  let activeRecognition: any = null;
  let activeRecItemId: string | null = null;
  let currentSessionId = 0;
  let sessionHadError = false;

  // Timers
  let startWatchdogTimer: any = null;
  let utteranceWatchdogTimer: any = null;
  let stoppingWatchdogTimer: any = null;
  let cooldownTimer: any = null;

  // Trạng thái dẫn xuất
  const isRecording = $derived(recState === 'listening' || recState === 'starting');
  const isBusy = $derived(recState === 'starting' || recState === 'stopping' || recState === 'cooldown');
  const isZhToVi = $derived(appState.direction === 'zh_to_vi');

  // Lắng nghe thay đổi từ vựng hiện tại: tự động giải phóng sạch sẽ phiên ghi âm cũ và reset preview
  $effect(() => {
    const currentId = appState.currentSpeechItem?.id;
    if (currentId) {
      if (activeRecognition) {
        safeTeardown(true, true);
      }
      liveHanzi = '';
      livePinyin = '';
      errorMessage = '';
    }
  });

  function clearAllTimers() {
    if (startWatchdogTimer) { clearTimeout(startWatchdogTimer); startWatchdogTimer = null; }
    if (utteranceWatchdogTimer) { clearTimeout(utteranceWatchdogTimer); utteranceWatchdogTimer = null; }
    if (stoppingWatchdogTimer) { clearTimeout(stoppingWatchdogTimer); stoppingWatchdogTimer = null; }
    if (cooldownTimer) { clearTimeout(cooldownTimer); cooldownTimer = null; }
  }

  function setAudioSessionType(type: 'play-and-record' | 'playback') {
    if (typeof navigator !== 'undefined' && 'audioSession' in navigator) {
      try {
        (navigator as any).audioSession.type = type;
      } catch {}
    }
  }

  // Dừng an toàn không gán null listeners trước abort() và khôi phục audio routing về loa ngoài
  function safeTeardown(immediateAbort = false, resetFsmToIdle = false) {
    clearAllTimers();
    setAudioSessionType('playback');

    if (activeRecognition) {
      const rec = activeRecognition;
      activeRecognition = null;
      try {
        if (immediateAbort) {
          rec.abort();
        } else {
          rec.stop();
        }
      } catch {}
    }

    if (resetFsmToIdle) {
      recState = 'idle';
    }
  }

  function armStoppingWatchdog(sessionId: number) {
    if (stoppingWatchdogTimer) clearTimeout(stoppingWatchdogTimer);
    stoppingWatchdogTimer = setTimeout(() => {
      if (sessionId !== currentSessionId) return;
      if (recState === 'stopping') {
        console.warn('[Speech] Stopping watchdog fired: forcing audio pipeline recovery');
        safeTeardown(true, true);
      }
    }, 2500);
  }

  function armUtteranceWatchdog(sessionId: number) {
    if (utteranceWatchdogTimer) clearTimeout(utteranceWatchdogTimer);
    utteranceWatchdogTimer = setTimeout(() => {
      if (sessionId !== currentSessionId) return;
      if (recState === 'listening') {
        console.warn('[Speech] Utterance watchdog fired: silence detected');
        safeTeardown(true, true);
        if (!livePinyin && !liveHanzi) {
          errorMessage = 'Không nghe thấy âm thanh. Hãy thử nói to hơn.';
        }
      }
    }, 8000);
  }

  function startRecording() {
    if (!speechSupported || appState.speechAnswered || !appState.currentSpeechItem) return;
    if (isBusy || recState === 'listening') return;

    liveHanzi = '';
    livePinyin = '';
    errorMessage = '';
    sessionHadError = false;

    // 1. Hủy TTS đang đọc nếu có
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // 2. Chuyển đổi AVAudioSession sang PlayAndRecord trên iOS Safari 16.4+
    setAudioSessionType('play-and-record');

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      speechSupported = false;
      recState = 'unsupported';
      errorMessage = 'Trình duyệt không hỗ trợ Web Speech API (Hãy dùng Chrome hoặc Safari trên iOS 14.5+)';
      return;
    }

    const targetItemId = appState.currentSpeechItem.id;
    const sessionId = ++currentSessionId;

    try {
      // 3. Deferred Recreation: Khởi tạo instance mới hoàn toàn cho mỗi phiên
      const rec = new SpeechRecognition();
      rec.lang = 'zh-CN';
      rec.continuous = false;
      rec.interimResults = true;
      rec.maxAlternatives = 1;

      clearAllTimers();

      // 4. Start Watchdog (10.0s): Đủ dài để người dùng xác nhận hộp thoại xin quyền Micro trên iOS
      startWatchdogTimer = setTimeout(() => {
        if (sessionId !== currentSessionId) return;
        if (recState === 'starting') {
          console.warn('[Speech] Start watchdog fired: permission timeout or microphone unresponsive');
          safeTeardown(true, true);
          errorMessage = 'Không thể kích hoạt micro. Vui lòng cấp quyền micro và thử lại.';
        }
      }, 10000);

      rec.onstart = () => {
        if (sessionId !== currentSessionId) return;
        if (startWatchdogTimer) {
          clearTimeout(startWatchdogTimer);
          startWatchdogTimer = null;
        }
        recState = 'listening';
        errorMessage = '';

        // 5. Utterance Watchdog (8.0s ban đầu)
        armUtteranceWatchdog(sessionId);
      };

      rec.onresult = (event: any) => {
        if (sessionId !== currentSessionId) return;

        // Reset Utterance Watchdog mỗi khi nhận dữ liệu giọng nói (người dùng đang nói không bị ngắt quãng)
        armUtteranceWatchdog(sessionId);

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
        if (sessionId !== currentSessionId) return;
        recState = 'stopping';
        armStoppingWatchdog(sessionId);
      };

      rec.onend = () => {
        // Luôn tháo gỡ listeners trên instance đã kết thúc
        rec.onstart = null;
        rec.onresult = null;
        rec.onspeechend = null;
        rec.onerror = null;
        rec.onend = null;

        // Bỏ qua nếu là sự kiện trễ của phiên cũ bị hủy
        if (sessionId !== currentSessionId) return;

        clearAllTimers();
        activeRecognition = null;
        setAudioSessionType('playback');

        // Chỉ tự động nộp bài nếu không gặp sự cố lỗi, có dữ liệu phát âm VÀ có chứa chữ Hán
        const hasChinese = /[\u4e00-\u9fa5]/.test(liveHanzi);
        if (
          !sessionHadError &&
          appState.speechAutoSubmit &&
          livePinyin &&
          hasChinese &&
          !appState.speechAnswered &&
          appState.currentSpeechItem?.id === targetItemId
        ) {
          submitAnswer();
        } else if (
          !sessionHadError &&
          appState.speechAutoSubmit &&
          liveHanzi &&
          !hasChinese &&
          !appState.speechAnswered &&
          appState.currentSpeechItem?.id === targetItemId
        ) {
          errorMessage = `Phát hiện tiếng Anh ("${liveHanzi}"). Hãy phát âm lại bằng tiếng Trung!`;
          toast.error('Chưa phát hiện tiếng Trung', {
            description: `Trình duyệt nghe thấy: "${liveHanzi}". Vui lòng phát âm rõ tiếng Trung!`,
            duration: 6000
          });
        }

        recState = 'cooldown';

        // 6. Hardware Cooldown 300ms cho iOS AVAudioSession hoàn tất deactivation
        cooldownTimer = setTimeout(() => {
          if (sessionId !== currentSessionId) return;
          if (recState === 'cooldown') {
            recState = 'idle';
          }
        }, 300);
      };

      rec.onerror = (event: any) => {
        if (sessionId !== currentSessionId) return;
        sessionHadError = true;

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

      activeRecognition = rec;
      recState = 'starting';
      activeRecItemId = targetItemId;

      // 7. GỌI ĐỒNG BỘ TRONG EVENT CLICK USER GESTURE (Bảo toàn 100% User Activation Token trên iOS Safari)
      rec.start();
    } catch (err: any) {
      console.warn('SpeechRecognition start failed:', err);
      clearAllTimers();
      setAudioSessionType('playback');
      recState = 'idle';
      activeRecognition = null;
      errorMessage = 'Không thể bật micro lúc này. Vui lòng bấm thử lại.';
    }
  }

  function stopRecording() {
    if (activeRecognition && (recState === 'listening' || recState === 'starting')) {
      recState = 'stopping';
      armStoppingWatchdog(currentSessionId);
      try {
        activeRecognition.stop();
      } catch {
        safeTeardown(true, true);
      }
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
    safeTeardown(true, true);
    liveHanzi = '';
    livePinyin = '';
  }

  function submitAnswer() {
    stopRecording();
    if (!livePinyin && !liveHanzi) return;

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
    safeTeardown(true, true);
    liveHanzi = '';
    livePinyin = '';
    errorMessage = '';
    appState.speechAnswered = false;
    appState.speechFeedback = null;
  }

  function handleNext() {
    safeTeardown(true, true);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    liveHanzi = '';
    livePinyin = '';
    errorMessage = '';
    appState.nextSpeechItem();
  }

  function handleVisibilityChange() {
    if (document.hidden && (isRecording || isBusy)) {
      safeTeardown(true, true);
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
    safeTeardown(true, true);
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

  <!-- Floating Audio Speaker Button: Khóa tương tác khi đang ghi âm để tránh xung đột AudioSession -->
  <button
    type="button"
    disabled={isRecording || isBusy}
    onclick={() => appState.speakCurrent()}
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
              onclick={() => { handleRetry(); startRecording(); }}
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

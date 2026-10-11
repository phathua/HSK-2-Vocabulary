<script lang="ts">
  import { fly } from 'svelte/transition';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
  import XCircle from 'phosphor-svelte/lib/XCircle';
  import FastForward from 'phosphor-svelte/lib/FastForward';
  import ArrowRight from 'phosphor-svelte/lib/ArrowRight';

  interface Props {
    isAnswered: boolean;
    isCorrect: boolean;
    isWrong: boolean;
    isSkipped?: boolean;
    correctAnswerText: string;
    extraInfoText?: string;
    onNext: () => void;
    nextButtonText?: string;
  }

  let {
    isAnswered,
    isCorrect,
    isWrong,
    isSkipped = false,
    correctAnswerText,
    extraInfoText = '',
    onNext,
    nextButtonText = 'Tiếp tục'
  }: Props = $props();

  const CORRECT_MESSAGES = [
    'Chuẩn rồi!',
    'Quá đỉnh!',
    'Hay quá dạ!',
    'Xuất sắc luôn!',
    'Quá chuẩn xác!',
    'Giỏi quá đi thôi!',
    'Đỉnh của chóp!'
  ];

  const WRONG_MESSAGES = [
    'Cố lên nè!',
    'Còn chút thôi!',
    'Huhu!',
    'Tiếc ghê!',
    'Gần đúng rồi đó!',
    'Sai một tí hà!',
    'Lại nhầm rồi!',
    'Đừng nản nha!'
  ];

  const SKIP_MESSAGES = [
    'Gà thế!',
    'Tệ vãi!',
    'Rớt chắc!',
    'Lười thế!',
    'Né à?',
    'Bỏ cuộc sớm vậy!',
    'Dễ thế cũng bỏ!',
    'Yếu đuối!'
  ];

  const mascotSrc = $derived(
    isCorrect
      ? '/icons/panda-correct.webp'
      : isWrong
        ? '/icons/panda-wrong.webp'
        : '/icons/panda-skip.webp'
  );

  let currentMsg = $state('');

  // Cập nhật thông điệp ngẫu nhiên mỗi khi đổi câu hoặc chuyển trạng thái phản hồi
  $effect(() => {
    if (isAnswered) {
      if (isCorrect) {
        currentMsg = CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)];
      } else if (isWrong) {
        currentMsg = WRONG_MESSAGES[Math.floor(Math.random() * WRONG_MESSAGES.length)];
      } else {
        currentMsg = SKIP_MESSAGES[Math.floor(Math.random() * SKIP_MESSAGES.length)];
      }
    }
  });

  function handleKeydown(e: KeyboardEvent) {
    if (!isAnswered) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      onNext();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isAnswered}
  <!-- Wrapper cố định ở đáy, không chặn click bên ngoài -->
  <div class="absolute inset-x-0 bottom-0 z-40 w-full flex justify-center pointer-events-none">
    <!-- Drawer Container: Chiều cao thoải mái hơn, bớt cong (phẳng hiện đại), không pill kéo -->
    <div
      class={`pointer-events-auto relative w-full rounded-t-xl sm:rounded-2xl border-t-2 sm:border transition-colors duration-200 px-3.5 sm:px-5 pt-3.5 sm:pt-4 pb-4 sm:pb-5 min-h-[148px] sm:min-h-[162px] flex items-center ${
        isCorrect
          ? 'bg-emerald-50 dark:bg-[#0d2117] border-emerald-400 dark:border-emerald-600 shadow-[0_-14px_36px_rgba(16,185,129,0.25)]'
          : isWrong
            ? 'bg-rose-50 dark:bg-[#261216] border-rose-400 dark:border-rose-600 shadow-[0_-14px_36px_rgba(244,63,94,0.25)]'
            : 'bg-amber-50 dark:bg-[#261b0c] border-amber-400 dark:border-amber-600 shadow-[0_-14px_36px_rgba(245,158,11,0.25)]'
      }`}
      transition:fly={{ y: 220, duration: 280 }}
      role="region"
      aria-label="Kết quả câu hỏi"
    >
      <!-- Mascot Panda: To rõ, đứng từ sát đáy lên, đầu & thân trên lòi hẳn ra ngoài viền trên -->
      <div
        class="absolute bottom-2 left-1 sm:left-3 z-30 pointer-events-none select-none mascot-pop flex items-end justify-center"
      >
        <!-- Vòng hào quang mềm mại dưới chân mascot -->
        <div
          class={`absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-8 rounded-full blur-md opacity-35 ${
            isCorrect ? 'bg-emerald-400' : isWrong ? 'bg-rose-400' : 'bg-amber-400'
          }`}
        ></div>
        <img
          src={mascotSrc}
          alt="HSK Panda Mascot"
          class="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.3)] transition-transform duration-300"
          loading="eager"
        />
      </div>

      <!-- Khối nội dung bên phải Mascot -->
      <div class="w-full pl-30 sm:pl-36 md:pl-42 flex flex-col justify-between min-h-[6.2rem] sm:min-h-[6.8rem] gap-2 sm:gap-2.5">
        <!-- Hàng tiêu đề phản hồi + đính chính đáp án -->
        <div class="flex flex-col text-left">
          <!-- Tiêu đề phản hồi ngẫu nhiên -->
          <div class="flex items-center gap-1.5 leading-tight mb-1">
            {#if isCorrect}
              <CheckCircle weight="fill" class="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span class="text-sm sm:text-base md:text-lg font-black text-emerald-800 dark:text-emerald-200">
                {currentMsg || 'Chuẩn rồi!'}
              </span>
            {:else if isWrong}
              <XCircle weight="fill" class="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 dark:text-rose-400 shrink-0" />
              <span class="text-sm sm:text-base md:text-lg font-black text-rose-800 dark:text-rose-200">
                {currentMsg || 'Tiếc ghê!'}
              </span>
            {:else}
              <FastForward weight="fill" class="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span class="text-sm sm:text-base md:text-lg font-black text-amber-900 dark:text-amber-200">
                {currentMsg || 'Gà thế!'}
              </span>
            {/if}
          </div>

          <!-- Lời đính chính đáp án chi tiết -->
          <div class="text-xs sm:text-sm font-semibold leading-snug">
            {#if isCorrect}
              <span class="text-emerald-700 dark:text-emerald-300">
                Chính xác: <strong class="font-black underline font-mono tracking-wide text-xs sm:text-base">{correctAnswerText}</strong>
                {#if extraInfoText}
                  <span class="opacity-80 font-normal">({extraInfoText})</span>
                {/if}
              </span>
            {:else if isWrong}
              <span class="text-rose-700 dark:text-rose-300">
                Đáp án đúng là: <strong class="font-black underline font-mono tracking-wide text-xs sm:text-base text-rose-900 dark:text-rose-100">{correctAnswerText}</strong>
                {#if extraInfoText}
                  <span class="opacity-80 font-normal">({extraInfoText})</span>
                {/if}
              </span>
            {:else}
              <span class="text-amber-800 dark:text-amber-300">
                Đáp án đúng là: <strong class="font-black underline font-mono tracking-wide text-xs sm:text-base text-amber-950 dark:text-amber-100">{correctAnswerText}</strong>
                {#if extraInfoText}
                  <span class="opacity-80 font-normal">({extraInfoText})</span>
                {/if}
              </span>
            {/if}
          </div>
        </div>

        <!-- Nút chuyển sang câu tiếp theo: To và cao hơn, cực kỳ dễ bấm -->
        <button
          type="button"
          onclick={onNext}
          class={`w-full h-12 sm:h-13 md:h-14 rounded-2xl font-black text-xs sm:text-sm md:text-base uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer select-none active:border-b-0 active:translate-y-1 shadow-sm ${
            isCorrect
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-b-4 border-emerald-800 shadow-emerald-600/30'
              : isWrong
                ? 'bg-rose-600 hover:bg-rose-700 text-white border-b-4 border-rose-800 shadow-rose-600/30'
                : 'bg-amber-500 hover:bg-amber-600 text-slate-950 border-b-4 border-amber-700 shadow-amber-500/30'
          }`}
          title="Bấm hoặc nhấn Enter để tiếp tục"
        >
          <span>{nextButtonText}</span>
          <ArrowRight weight="bold" class="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  @keyframes mascotBounce {
    0% {
      transform: translateY(16px) scale(0.9);
      opacity: 0;
    }
    60% {
      transform: translateY(-5px) scale(1.03);
      opacity: 1;
    }
    100% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }

  .mascot-pop {
    animation: mascotBounce 0.32s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
</style>

<script lang="ts">
  import { appState } from '#lib/state/appState.svelte';
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
  import BookmarkSimple from 'phosphor-svelte/lib/BookmarkSimple';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
  import XCircle from 'phosphor-svelte/lib/XCircle';
  import FastForward from 'phosphor-svelte/lib/FastForward';
  import Confetti from 'phosphor-svelte/lib/Confetti';
  import ArrowClockwise from 'phosphor-svelte/lib/ArrowClockwise';
  import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
  import PencilLine from 'phosphor-svelte/lib/PencilLine';

  const isZhToVi = $derived(appState.direction === 'zh_to_vi');
</script>

<!-- Main Multiple Choice Quiz Card -->
<main class="flex-1 min-h-0 bg-white rounded-3xl border border-slate-200 shadow-sm p-3.5 sm:p-4 flex flex-col justify-center items-center text-center relative overflow-hidden">
  <!-- Floating Lesson Select Button (Icon cây bút nổi bật to bằng nút TTS bên phải, mở modal bài học) -->
  <button
    type="button"
    onclick={() => (appState.filterModalOpen = true)}
    class="absolute top-3.5 left-3.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white rounded-2xl h-10 sm:h-11 px-3 flex items-center justify-center gap-1.5 shadow-md transition-transform cursor-pointer"
    title="Bấm để chọn bài học"
  >
    <PencilLine weight="bold" class="w-5 h-5 sm:w-6 sm:h-6" />
    <span class="text-xs font-black uppercase tracking-wider">Bài {appState.currentQuizItem?.lesson || 1}</span>
  </button>

  <!-- Floating Speaker Button: Chỉ bấm nghe khi muốn, câu hỏi không tự động lộ âm -->
  <button
    type="button"
    onclick={() => appState.speakCurrent()}
    class="absolute top-3.5 right-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shadow-md active:scale-95 transition-transform cursor-pointer"
    title="Phát âm tiếng Trung"
  >
    <SpeakerHigh weight="duotone" class="w-5 h-5 sm:w-6 sm:h-6" />
  </button>

  {#if appState.currentQuizItem}
    <div class="w-full flex flex-col items-center justify-center my-auto">
      <!-- Vocabulary Image -->
      {#if appState.currentQuizItem.image}
        <div class="relative mb-2">
          <img
            src={appState.currentQuizItem.image}
            alt="HSK Vocabulary"
            class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border border-slate-200 shadow-xs bg-slate-50"
            onerror={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/200x200/3b82f6/ffffff?text=HSK';
            }}
          />
        </div>
      {/if}

      <!-- Question Prompt Area -->
      {#if !isZhToVi}
        <!-- Mặc định: Hiển thị tiếng Việt ➔ Chọn Chữ Hán/Pinyin -->
        <span class="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Chọn từ tiếng Trung đúng:</span>
        <div class="text-2xl sm:text-3xl font-black text-slate-900 mb-2 max-w-xs leading-tight">
          {appState.currentQuizItem.viet}
        </div>
      {:else}
        <!-- Đảo ngược: Hiển thị Chữ Hán & Pinyin ➔ Chọn nghĩa tiếng Việt -->
        <span class="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Chọn nghĩa tiếng Việt đúng:</span>
        <div class="text-4xl sm:text-5xl font-black text-blue-600 font-sans mb-1">
          {appState.currentQuizItem.hanzi}
        </div>
        <div class="text-xl sm:text-2xl font-black text-slate-700 mb-2">
          {appState.currentQuizItem.pinyin}
        </div>
      {/if}
    </div>
  {:else}
    <!-- Finished Screen -->
    <div class="flex flex-col items-center justify-center text-center p-4 my-auto">
      <div class="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
        <Confetti weight="duotone" class="w-10 h-10" />
      </div>
      <h2 class="text-xl font-black text-slate-900 mb-1">
        Hoàn thành trắc nghiệm!
      </h2>
      <p class="text-sm font-bold text-slate-600 mb-4">
        Đúng {appState.quizCorrect}/{appState.totalQuizCount} từ ({Math.round((appState.quizCorrect / (appState.totalQuizCount || 1)) * 100)}%)
      </p>

      <button
        type="button"
        onclick={() => appState.initQuiz()}
        class="w-full max-w-xs h-11 bg-pink-500 hover:bg-pink-600 text-white font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all mb-2 cursor-pointer"
      >
        <ArrowClockwise weight="duotone" class="w-4 h-4" />
        <span>Luyện lại từ đầu</span>
      </button>
    </div>
  {/if}
</main>

<!-- Quiz Footer Controls: 4 Đáp án gây nhiễu -->
{#if appState.currentQuizItem}
  <footer class="shrink-0 mt-2 space-y-2">
    <!-- 4 Option Grid (2x2 Asymmetric Clean Buttons) -->
    <div class="grid grid-cols-2 gap-2">
      {#each appState.quizOptions as opt, idx (opt.id)}
        {@const isSelected = appState.quizSelectedId === opt.id}
        {@const isTarget = opt.id === appState.currentQuizItem.id}
        {@const isRevealed = appState.quizAnswered}

        <!-- Trạng thái màu sắc chuẩn Anti-Slop -->
        <button
          type="button"
          onclick={() => appState.selectQuizOption(opt)}
          disabled={appState.quizAnswered}
          class={`min-h-[58px] p-2.5 rounded-2xl font-black text-left flex flex-col justify-center transition-all cursor-pointer border-2 relative select-none ${
            !isRevealed
              ? 'bg-white hover:bg-slate-50 border-slate-200 active:scale-98 shadow-2xs'
              : isTarget
              ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs'
              : isSelected
              ? 'bg-rose-50 border-rose-500 text-rose-950 shadow-xs'
              : 'bg-slate-50 border-slate-200 opacity-50'
          }`}
        >
          <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-0.5">
            {['A', 'B', 'C', 'D'][idx]}
          </span>

          {#if !isZhToVi}
            <!-- Option mode Việt ➔ Trung: hiện Hanzi + Pinyin -->
            <div class="flex items-baseline gap-1.5 min-w-0">
              <span class="text-base sm:text-lg font-black text-slate-900 truncate">
                {opt.hanzi}
              </span>
              <span class="text-xs sm:text-sm font-bold text-blue-600 truncate">
                {opt.pinyin}
              </span>
            </div>
          {:else}
            <!-- Option mode Trung ➔ Việt: hiện Nghĩa tiếng Việt -->
            <span class="text-xs sm:text-sm font-black text-slate-900 leading-snug line-clamp-2">
              {opt.viet}
            </span>
          {/if}
        </button>
      {/each}
    </div>

    <!-- Nút Tiếp tục sau khi đã trả lời (Cố định chiều cao, tránh giật layout khi hiện nút) -->
    <div class="h-11 sm:h-12 w-full">
      {#if appState.quizAnswered}
        <button
          type="button"
          onclick={() => appState.nextQuizItem()}
          class="w-full h-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-sm rounded-2xl shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer animate-[pop_0.15s_ease]"
        >
          <span>Câu tiếp theo</span>
          <ArrowRight weight="bold" class="w-4 h-4" />
        </button>
      {/if}
    </div>

    <!-- Micro Stats Footer -->
    <div class="flex justify-between items-center px-3 py-1 bg-white rounded-xl border border-slate-200 text-[11px] font-bold text-slate-500">
      <span class="flex items-center gap-1">
        <CheckCircle weight="duotone" class="w-3.5 h-3.5 text-emerald-500" />
        Đúng: <b class="text-slate-900">{appState.quizCorrect}</b>
      </span>
      <span class="flex items-center gap-1">
        <XCircle weight="duotone" class="w-3.5 h-3.5 text-rose-500" />
        Sai: <b class="text-slate-900">{appState.quizWrong}</b>
      </span>
      <span class="flex items-center gap-1">
        <FastForward weight="duotone" class="w-3.5 h-3.5 text-amber-500" />
        Còn: <b class="text-slate-900">{appState.quizDeck.length}</b>
      </span>
    </div>
  </footer>
{/if}

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
  import SmartImage from './SmartImage.svelte';

  const isZhToVi = $derived(appState.direction === 'zh_to_vi');
</script>

<!-- Main Multiple Choice Quiz Card -->
<main class="flex-1 min-h-0 bg-white dark:bg-[#1B1B1B] rounded-3xl border border-slate-200 dark:border-[#282A2C] shadow-sm p-3.5 sm:p-4 md:p-6 flex flex-col justify-center items-center text-center relative overflow-hidden transition-colors">
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
    class="absolute top-3.5 right-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shadow-sm active:scale-95 transition-transform cursor-pointer"
    title="Phát âm tiếng Trung"
  >
    <SpeakerHigh weight="bold" class="w-5 h-5 sm:w-6 sm:h-6" />
  </button>

  {#if appState.currentQuizItem}
    <div class="w-full flex flex-col items-center justify-center my-auto">
      <!-- Vocabulary Image: Chỉ hiển thị khi hỏi nghĩa tiếng Việt -> Chọn tiếng Trung (!isZhToVi). Ẩn hoàn toàn khi hỏi tiếng Trung để tránh lộ đáp án -->
      {#if !isZhToVi && appState.currentQuizItem.image}
        <div class="relative mb-3 md:mb-5">
          <SmartImage
            src={appState.currentQuizItem.image}
            alt="HSK Vocabulary"
            class="w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-2xl border-2 border-slate-100 dark:border-[#282A2C] shadow-xs bg-slate-50 dark:bg-[#282A2C]"
          />
        </div>
      {/if}

      <!-- Question Prompt Area -->
      {#if !isZhToVi}
        <!-- Mặc định: Hiển thị tiếng Việt ➔ Chọn Chữ Hán/Pinyin -->
        <span class="text-[11px] md:text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-[#8E918F] mb-1">Chọn từ tiếng Trung đúng:</span>
        <div class="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-[#E3E3E3] mb-2 max-w-md leading-tight">
          {appState.currentQuizItem.viet}
        </div>
      {:else}
        <!-- Đảo ngược: Hiển thị Chữ Hán & Pinyin ➔ Chọn nghĩa tiếng Việt (Không kèm hình, chữ Hán siêu to nổi bật) -->
        <span class="text-[11px] md:text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-[#8E918F] mb-2">Chọn nghĩa tiếng Việt đúng:</span>
        <div class="text-5xl sm:text-6xl md:text-7xl font-black text-blue-600 dark:text-blue-400 font-sans mb-2 tracking-tight">
          {appState.currentQuizItem.hanzi}
        </div>
        <div class="text-2xl sm:text-3xl md:text-4xl font-black text-slate-700 dark:text-[#C4C7C5] mb-2">
          {appState.currentQuizItem.pinyin}
        </div>
      {/if}
    </div>
  {:else}
    <!-- Finished Screen -->
    <div class="flex flex-col items-center justify-center text-center p-4 my-auto">
      <div class="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
        <Confetti weight="duotone" class="w-10 h-10" />
      </div>
      <h2 class="text-xl font-black text-slate-900 dark:text-[#E3E3E3] mb-1">
        Hoàn thành trắc nghiệm!
      </h2>
      <p class="text-sm font-bold text-slate-600 dark:text-[#8E918F] mb-4">
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
          class={`min-h-[62px] md:min-h-[72px] p-2.5 md:p-3.5 rounded-2xl font-black text-left flex items-center gap-2.5 transition-all cursor-pointer border-2 relative select-none ${
            !isRevealed
              ? 'bg-white dark:bg-[#1B1B1B] hover:bg-slate-50 dark:hover:bg-[#282A2C] border-slate-200 dark:border-[#282A2C] active:scale-98 shadow-2xs'
              : isTarget
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-100 shadow-xs'
              : isSelected
              ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-950 dark:text-rose-100 shadow-xs'
              : 'bg-slate-50 dark:bg-[#282A2C]/40 border-slate-200 dark:border-[#282A2C] opacity-50'
          }`}
        >
          <!-- Badge A, B, C, D to tròn nổi bật -->
          <div
            class={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 font-black text-xs sm:text-sm border transition-colors ${
              !isRevealed
                ? 'bg-slate-100 dark:bg-[#282A2C] text-slate-700 dark:text-[#C4C7C5] border-slate-200 dark:border-[#37393B]'
                : isTarget
                ? 'bg-emerald-500 text-white border-emerald-600'
                : isSelected
                ? 'bg-rose-500 text-white border-rose-600'
                : 'bg-slate-200/60 dark:bg-[#282A2C] text-slate-400 border-slate-200 dark:border-[#37393B]'
            }`}
          >
            {['A', 'B', 'C', 'D'][idx]}
          </div>

          <div class="flex-1 min-w-0">
            {#if !isZhToVi}
              <!-- Option mode Việt ➔ Trung: hiện Hanzi + Pinyin -->
              <div class="flex items-baseline gap-1.5 min-w-0">
                <span class="text-base sm:text-lg md:text-xl font-black text-slate-900 dark:text-[#E3E3E3] truncate">
                  {opt.hanzi}
                </span>
                <span class="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 truncate">
                  {opt.pinyin}
                </span>
              </div>
            {:else}
              <!-- Option mode Trung ➔ Việt: hiện Nghĩa tiếng Việt -->
              <span class="text-xs sm:text-sm md:text-base font-black text-slate-900 dark:text-[#E3E3E3] leading-snug line-clamp-2">
                {opt.viet}
              </span>
            {/if}
          </div>
        </button>
      {/each}
    </div>

    <!-- Nút Câu tiếp theo: Luôn hiện diện, xám xịt khi chưa chọn đáp án, sáng xanh nổi bật khi đã chọn -->
    <div class="h-11 sm:h-12 w-full">
      <button
        type="button"
        onclick={() => appState.quizAnswered && appState.nextQuizItem()}
        disabled={!appState.quizAnswered}
        class={`w-full h-full font-black text-sm rounded-2xl flex items-center justify-center gap-1.5 transition-all select-none ${
          appState.quizAnswered
            ? 'bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-md cursor-pointer animate-[pop_0.15s_ease]'
            : 'bg-slate-200 dark:bg-[#282A2C] text-slate-400 dark:text-[#8E918F] border border-slate-300/60 dark:border-[#37393B] cursor-not-allowed opacity-80'
        }`}
      >
        <span>Câu tiếp theo</span>
        <ArrowRight weight="bold" class="w-4 h-4" />
      </button>
    </div>

    <!-- Micro Stats Footer -->
    <div class="flex justify-between items-center px-3 py-1 bg-white dark:bg-[#1B1B1B] rounded-xl border border-slate-200 dark:border-[#282A2C] text-[11px] font-bold text-slate-500 dark:text-[#8E918F] transition-colors">
      <span class="flex items-center gap-1">
        <CheckCircle weight="duotone" class="w-3.5 h-3.5 text-emerald-500" />
        Đúng: <b class="text-slate-900 dark:text-[#E3E3E3]">{appState.quizCorrect}</b>
      </span>
      <span class="flex items-center gap-1">
        <XCircle weight="duotone" class="w-3.5 h-3.5 text-rose-500" />
        Sai: <b class="text-slate-900 dark:text-[#E3E3E3]">{appState.quizWrong}</b>
      </span>
      <span class="flex items-center gap-1">
        <FastForward weight="duotone" class="w-3.5 h-3.5 text-amber-500" />
        Còn: <b class="text-slate-900 dark:text-[#E3E3E3]">{appState.quizDeck.length}</b>
      </span>
    </div>
  </footer>
{/if}

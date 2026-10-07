<script lang="ts">
  import { appState } from '#lib/state/appState.svelte';
  import { convertTelexToPinyin } from '#lib/utils/speech';
  import ToneKeyboard from './ToneKeyboard.svelte';
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
  import BookmarkSimple from 'phosphor-svelte/lib/BookmarkSimple';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
  import XCircle from 'phosphor-svelte/lib/XCircle';
  import FastForward from 'phosphor-svelte/lib/FastForward';
  import Lightbulb from 'phosphor-svelte/lib/Lightbulb';
  import Check from 'phosphor-svelte/lib/Check';
  import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
  import Confetti from 'phosphor-svelte/lib/Confetti';
  import ArrowClockwise from 'phosphor-svelte/lib/ArrowClockwise';
  import PencilLine from 'phosphor-svelte/lib/PencilLine';

  let inputEl: HTMLInputElement | null = $state(null);

  function handleInsertChar(ch: string) {
    if (appState.fillAnswered) return;
    if (!inputEl) {
      appState.fillInput += ch;
      return;
    }
    const start = inputEl.selectionStart || 0;
    const end = inputEl.selectionEnd || 0;
    const newVal = appState.fillInput.slice(0, start) + ch + appState.fillInput.slice(end);
    appState.fillInput = newVal;
    setTimeout(() => {
      inputEl?.focus();
      inputEl?.setSelectionRange(start + 1, start + 1);
    }, 0);
  }

  function handleInputChange(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    if (appState.direction === 'vi_to_zh') {
      appState.fillInput = convertTelexToPinyin(val);
    } else {
      appState.fillInput = val;
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      appState.checkFillAnswer();
    }
  }

  const isZhToVi = $derived(appState.direction === 'zh_to_vi');
</script>

<!-- Main Fill Word Card -->
<main class="flex-1 min-h-0 bg-white rounded-3xl border border-slate-200 shadow-sm p-3.5 sm:p-4 flex flex-col justify-center items-center text-center relative overflow-hidden">
  <!-- Floating Lesson Select Button (Icon cây bút nổi bật to bằng nút TTS bên phải, mở modal bài học) -->
  <button
    type="button"
    onclick={() => (appState.filterModalOpen = true)}
    class="absolute top-3.5 left-3.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white rounded-2xl h-10 sm:h-11 px-3 flex items-center justify-center gap-1.5 shadow-md transition-transform cursor-pointer"
    title="Bấm để chọn bài học"
  >
    <PencilLine weight="bold" class="w-5 h-5 sm:w-6 sm:h-6" />
    <span class="text-xs font-black uppercase tracking-wider">Bài {appState.currentFillItem?.lesson || 1}</span>
  </button>

  <!-- Floating Speaker Button -->
  <button
    type="button"
    onclick={() => appState.speakCurrent()}
    class="absolute top-3.5 right-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shadow-md active:scale-95 transition-transform cursor-pointer"
    title="Phát âm tiếng Trung"
  >
    <SpeakerHigh weight="duotone" class="w-5 h-5 sm:w-6 sm:h-6" />
  </button>

  {#if appState.currentFillItem}
    <div class="w-full flex flex-col items-center justify-center my-auto">
      <!-- Vocabulary Image -->
      {#if appState.currentFillItem.image}
        <div class="relative mb-2">
          <img
            src={appState.currentFillItem.image}
            alt={appState.currentFillItem.hanzi}
            class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border border-slate-200 shadow-xs bg-slate-50"
            onerror={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/200x200/3b82f6/ffffff?text=HSK';
            }}
          />
        </div>
      {/if}

      <!-- Prompt Question based on Direction -->
      {#if !isZhToVi}
        <!-- Mặc định: Hiển thị tiếng Việt ➔ Yêu cầu gõ Pinyin -->
        <span class="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Nghĩa tiếng Việt</span>
        <div class="text-2xl sm:text-3xl font-black text-slate-900 mb-1 max-w-xs leading-tight">
          {appState.currentFillItem.viet}
        </div>
        <div class="text-4xl sm:text-5xl font-black text-blue-600 font-sans tracking-tight">
          {appState.currentFillItem.hanzi}
        </div>
      {:else}
        <!-- Đảo ngược: Hiển thị Chữ Hán & Pinyin ➔ Yêu cầu gõ nghĩa tiếng Việt -->
        <span class="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Từ vựng tiếng Trung</span>
        <div class="text-4xl sm:text-5xl font-black text-blue-600 font-sans mb-1">
          {appState.currentFillItem.hanzi}
        </div>
        <div class="text-xl sm:text-2xl font-black text-slate-700">
          {appState.currentFillItem.pinyin}
        </div>
      {/if}
    </div>
  {:else}
    <!-- Finished Screen -->
    <div class="flex flex-col items-center justify-center text-center p-4 my-auto">
      <div class="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
        <Confetti weight="duotone" class="w-10 h-10" />
      </div>
      <h2 class="text-xl font-black text-slate-900 mb-1">
        Hoàn thành bài học!
      </h2>
      <p class="text-sm font-bold text-slate-600 mb-4">
        Đúng {appState.fillCorrect}/{appState.totalFillCount} từ ({Math.round((appState.fillCorrect / (appState.totalFillCount || 1)) * 100)}%)
      </p>

      <button
        type="button"
        onclick={() => appState.initFill(undefined, false)}
        class="w-full max-w-xs h-11 bg-pink-500 hover:bg-pink-600 text-white font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all mb-2 cursor-pointer"
      >
        <ArrowClockwise weight="duotone" class="w-4 h-4" />
        <span>Học lại từ đầu</span>
      </button>

      {#if appState.wrongFillWords.length > 0 && !appState.isFillReviewMode}
        <button
          type="button"
          onclick={() => appState.reviewWrongFill()}
          class="w-full max-w-xs h-11 bg-orange-500 hover:bg-orange-600 text-white font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowClockwise weight="duotone" class="w-4 h-4" />
          <span>Ôn lại từ sai ({appState.wrongFillWords.length})</span>
        </button>
      {/if}
    </div>
  {/if}
</main>

<!-- Fill Footer Controls -->
{#if appState.currentFillItem}
  <footer class="shrink-0 mt-2 space-y-1.5 sm:space-y-2">
    <!-- Feedback Banner -->
    {#if appState.fillFeedback}
      <div class={`py-2 px-3 rounded-2xl text-center shadow-xs flex items-center justify-center gap-2 border transition-all ${
        appState.fillFeedback.type === 'correct' ? 'bg-emerald-500 border-emerald-600 text-white' :
        appState.fillFeedback.type === 'wrong' ? 'bg-rose-500 border-rose-600 text-white' :
        appState.fillFeedback.type === 'skip' ? 'bg-amber-400 border-amber-500 text-slate-950' : 'bg-purple-600 border-purple-700 text-white'
      }`}>
        {#if appState.fillFeedback.type === 'correct'}
          <CheckCircle weight="fill" class="w-4 h-4 shrink-0" />
        {:else if appState.fillFeedback.type === 'wrong'}
          <XCircle weight="fill" class="w-4 h-4 shrink-0" />
        {:else if appState.fillFeedback.type === 'skip'}
          <FastForward weight="fill" class="w-4 h-4 shrink-0" />
        {:else}
          <Lightbulb weight="fill" class="w-4 h-4 shrink-0" />
        {/if}

        <div class="flex items-center gap-1.5 leading-none min-w-0">
          <span class="text-xs font-bold opacity-90 truncate">
            {appState.fillFeedback.text}
          </span>
        </div>
      </div>
    {/if}

    <!-- Input Row: Tối ưu chống tràn viền trên mobile 360px -->
    <div class="flex items-stretch gap-1.5 sm:gap-2">
      <input
        bind:this={inputEl}
        type="text"
        value={appState.fillInput}
        oninput={handleInputChange}
        onkeydown={handleKeyDown}
        disabled={appState.fillAnswered}
        placeholder={!isZhToVi ? "Gõ Pinyin (vd: ni3hao3)..." : "Gõ nghĩa tiếng Việt..."}
        class="min-w-0 flex-1 h-11 sm:h-12 bg-white border-2 border-slate-200 focus:border-blue-500 rounded-2xl px-3 sm:px-4 text-sm sm:text-base font-bold text-slate-900 outline-none shadow-2xs"
        autocomplete="off"
        spellcheck="false"
      />
      <button
        type="button"
        onclick={() => appState.checkFillAnswer()}
        class="h-11 sm:h-12 px-3 sm:px-4 bg-amber-400 hover:bg-amber-500 active:scale-95 text-slate-900 font-black text-xs sm:text-sm rounded-2xl shadow-2xs flex items-center justify-center gap-1 transition-all shrink-0 cursor-pointer"
      >
        <Check weight="bold" class="w-4 h-4" />
        <span>{appState.fillAnswered ? "Tiếp" : "Kiểm tra"}</span>
      </button>
    </div>

    <!-- Tone Keyboard (Chỉ hiển thị khi gõ Pinyin) -->
    {#if !isZhToVi}
      <ToneKeyboard onInsertChar={handleInsertChar} disabled={appState.fillAnswered} />
    {/if}

    <!-- Action Buttons -->
    <div class="flex gap-1.5 sm:gap-2">
      {#if !appState.fillAnswered}
        <button
          type="button"
          onclick={() => appState.skipFill()}
          class="flex-1 h-11 sm:h-12 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-2xs flex items-center justify-center gap-1 transition-all cursor-pointer"
        >
          <ArrowRight weight="bold" class="w-4 h-4" />
          <span>Bỏ qua</span>
        </button>
        <button
          type="button"
          onclick={() => appState.hintFill()}
          disabled={appState.fillHintShown}
          class="h-11 sm:h-12 px-3 sm:px-4 bg-purple-600 hover:bg-purple-700 active:scale-95 disabled:opacity-50 text-white font-black text-xs sm:text-sm rounded-2xl shadow-2xs flex items-center justify-center gap-1 transition-all shrink-0 cursor-pointer"
        >
          <Lightbulb weight="bold" class="w-4 h-4" />
          <span>Đáp án</span>
        </button>
      {:else}
        <button
          type="button"
          onclick={() => appState.nextFillItem()}
          class="w-full h-11 sm:h-12 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-sm rounded-2xl shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <span>Tiếp tục từ sau</span>
          <ArrowRight weight="bold" class="w-4 h-4" />
        </button>
      {/if}
    </div>

    <!-- Micro Stats Footer -->
    <div class="flex justify-between items-center px-3 py-1 bg-white rounded-xl border border-slate-200 text-[11px] font-bold text-slate-500">
      <span class="flex items-center gap-1">
        <CheckCircle weight="duotone" class="w-3.5 h-3.5 text-emerald-500" />
        Đúng: <b class="text-slate-900">{appState.fillCorrect}</b>
      </span>
      <span class="flex items-center gap-1">
        <XCircle weight="duotone" class="w-3.5 h-3.5 text-rose-500" />
        Sai: <b class="text-slate-900">{appState.fillWrong}</b>
      </span>
      <span class="flex items-center gap-1">
        <FastForward weight="duotone" class="w-3.5 h-3.5 text-amber-500" />
        Bỏ qua: <b class="text-slate-900">{appState.fillSkipCount}</b>
      </span>
    </div>
  </footer>
{/if}

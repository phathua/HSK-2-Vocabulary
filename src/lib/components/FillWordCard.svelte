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
  import Keyboard from 'phosphor-svelte/lib/Keyboard';
  import SquaresFour from 'phosphor-svelte/lib/SquaresFour';
  import Backspace from 'phosphor-svelte/lib/Backspace';
  import SmartImage from './SmartImage.svelte';

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
  // Chế độ Chọn từ khả dụng khi học xuôi (gõ/chọn Pinyin)
  const isTileMode = $derived(appState.fillSubMode === 'tiles' && !isZhToVi);
</script>

<!-- Main Fill Word Card -->
<main class="flex-1 min-h-0 w-full max-w-xl mx-auto bg-white dark:bg-[#1B1B1B] rounded-3xl border border-slate-200 dark:border-[#282A2C] shadow-sm p-3.5 sm:p-5 flex flex-col justify-between items-center text-center relative overflow-hidden transition-colors">
  <!-- Top Bar: Nút Bài bên trái, Nút đổi chế độ nổi bật bên phải -->
  <div class="w-full flex items-center justify-between shrink-0 mb-1 z-10">
    <!-- Floating Lesson Select Button -->
    <button
      type="button"
      onclick={() => (appState.filterModalOpen = true)}
      class="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white rounded-2xl h-10 px-3 flex items-center justify-center gap-1.5 shadow-sm transition-transform cursor-pointer"
      title="Bấm để chọn bài học"
    >
      <PencilLine weight="bold" class="w-5 h-5" />
      <span class="text-xs font-black uppercase tracking-wider">Bài {appState.currentFillItem?.lesson || 1}</span>
    </button>

    <!-- Right Mode Switch: Chọn từ / Thủ công nổi bật màu sắc -->
    {#if !isZhToVi && appState.currentFillItem}
      <button
        type="button"
        onclick={() => appState.toggleFillSubMode()}
        class={`rounded-2xl h-10 px-3 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer text-xs font-black text-white ${
          appState.fillSubMode === 'tiles'
            ? 'bg-blue-600 hover:bg-blue-700 border border-blue-500'
            : 'bg-emerald-600 hover:bg-emerald-700 border border-emerald-500'
        }`}
        title="Chuyển chế độ: Chọn từ / Thủ công"
      >
        {#if appState.fillSubMode === 'tiles'}
          <SquaresFour weight="bold" class="w-4 h-4 text-white shrink-0" />
          <span>Chọn từ</span>
        {:else}
          <Keyboard weight="bold" class="w-4 h-4 text-white shrink-0" />
          <span>Thủ công</span>
        {/if}
      </button>
    {:else}
      <div></div>
    {/if}
  </div>

  {#if appState.currentFillItem}
    <div class="w-full flex-1 flex flex-col items-center justify-center my-auto py-1">
      <!-- Vocabulary Image -->
      {#if appState.currentFillItem.image}
        <div class="relative mb-2">
          <SmartImage
            src={appState.currentFillItem.image}
            alt={appState.currentFillItem.hanzi}
            class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border border-slate-200 dark:border-[#282A2C] shadow-xs bg-slate-50 dark:bg-[#282A2C] object-cover"
          />
        </div>
      {/if}

      <!-- Prompt Question based on Direction -->
      {#if !isZhToVi}
        <!-- Mặc định: Hiển thị tiếng Việt ➔ Yêu cầu gõ hoặc ghép Pinyin -->
        <span class="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-[#8E918F] mb-0.5">Nghĩa tiếng Việt</span>
        <div class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-[#E3E3E3] mb-1 max-w-md leading-tight">
          {appState.currentFillItem.viet}
        </div>

        <!-- Chữ Hán kèm nút Loa TTS ngay cạnh bên phải -->
        <div class="flex items-center justify-center gap-2.5 mb-2">
          <div class="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400 font-sans tracking-tight">
            {appState.currentFillItem.hanzi}
          </div>
          <button
            type="button"
            onclick={() => appState.speakCurrent()}
            class="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shadow-xs active:scale-95 transition-transform cursor-pointer shrink-0"
            title="Phát âm tiếng Trung"
          >
            <SpeakerHigh weight="bold" class="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <!-- Chế độ 'Chọn từ': Hiển thị các ô Slot ký tự + Nút Xoá đặt ngay bên phải -->
        {#if isTileMode && appState.fillWordChunks.length > 0}
          <div class="w-full max-w-md mt-1 px-1 flex flex-col items-center gap-2">
            <!-- Nếu từ dài có nhiều cụm (như gōnggòng qìchē), hiển thị tabs chuyển chunk -->
            {#if appState.fillWordChunks.length > 1}
              <div class="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-[#282A2C] rounded-xl border border-slate-200/80 dark:border-[#37393B]">
                {#each appState.fillWordChunks as chunk, idx}
                  <button
                    type="button"
                    onclick={() => (appState.currentChunkIndex = idx)}
                    class={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                      appState.currentChunkIndex === idx
                        ? 'bg-blue-600 text-white shadow-xs'
                        : chunk.slots.every(s => s.userChar !== null)
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                    }`}
                  >
                    Vế {idx + 1}
                    {#if chunk.slots.every(s => s.userChar !== null)}
                      ✓
                    {/if}
                  </button>
                {/each}
              </div>
            {/if}

            <!-- Render Slots của tất cả các Chunks theo hàng ngang kèm nút Xoá (Backspace) bên phải -->
            <div class="flex items-center justify-center gap-1.5 sm:gap-2 py-1 max-w-full">
              <div class="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                {#each appState.fillWordChunks as chunk, cIdx}
                  <div class={`flex items-center gap-1 sm:gap-1.5 p-1 rounded-2xl border transition-all ${
                    cIdx === appState.currentChunkIndex
                      ? 'border-blue-400/80 bg-blue-50/40 dark:bg-blue-950/20 dark:border-blue-500/40'
                      : 'border-transparent bg-slate-50/50 dark:bg-[#242628]/40'
                  }`}>
                    {#each chunk.slots as slot}
                      {@const isCorrectSlot = appState.fillAnswered && slot.userChar === slot.char}
                      {@const isWrongSlot = appState.fillAnswered && slot.userChar !== slot.char}
                      <button
                        type="button"
                        disabled={slot.isPreFilled || appState.fillAnswered}
                        onclick={() => appState.unselectSlot(cIdx, slot.id)}
                        class={`w-8 h-10 sm:w-10 sm:h-12 rounded-xl flex items-center justify-center font-black text-base sm:text-lg transition-all border-b-4 select-none ${
                          slot.isPreFilled
                            ? 'bg-slate-200 dark:bg-[#323537] text-slate-500 dark:text-slate-400 border-slate-300 dark:border-[#3c3f42] cursor-not-allowed'
                            : isCorrectSlot
                              ? 'bg-emerald-500 text-white border-emerald-700 shadow-xs'
                              : isWrongSlot
                                ? 'bg-rose-500 text-white border-rose-700 shadow-xs'
                                : slot.userChar
                                  ? 'bg-blue-500 text-white border-blue-700 shadow-xs cursor-pointer active:scale-95'
                                  : cIdx === appState.currentChunkIndex
                                    ? 'bg-white dark:bg-[#282A2C] border-dashed border-2 border-slate-300 dark:border-[#404346] text-transparent'
                                    : 'bg-white/60 dark:bg-[#282A2C]/60 border-dashed border-2 border-slate-200 dark:border-[#35373a] text-transparent'
                        }`}
                        title={slot.isPreFilled ? 'Ký tự gợi ý sẵn' : slot.userChar ? 'Bấm để gỡ bỏ' : 'Ô trống'}
                      >
                        {slot.userChar || '_'}
                      </button>
                    {/each}
                  </div>
                {/each}
              </div>

              <!-- Nút Xoá (Backspace) đặt ngay cạnh bên phải các ô điền chữ -->
              <button
                type="button"
                disabled={appState.fillAnswered}
                onclick={() => appState.backspaceSlot(appState.currentChunkIndex)}
                class="w-9 h-10 sm:w-10 sm:h-12 rounded-xl font-black text-rose-500 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 border-b-4 border-rose-300 dark:border-rose-900/60 flex items-center justify-center transition-all active:border-b-0 active:translate-y-1 cursor-pointer shrink-0"
                title="Xoá ký tự vừa nhập"
              >
                <Backspace weight="bold" class="w-5 h-5" />
              </button>
            </div>

            <!-- Nếu trả lời SAI: Hiển thị đáp án đúng màu đỏ ngay bên dưới ô điền chữ -->
            {#if appState.fillAnswered && appState.fillFeedback?.type === 'wrong'}
              <div class="text-xs font-black text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 px-3 py-1.5 rounded-xl animate-fade-in">
                Đáp án đúng: <span class="underline underline-offset-2">{appState.currentFillItem.pinyin}</span>
              </div>
            {/if}
          </div>
        {/if}
      {:else}
        <!-- Đảo ngược: Hiển thị Chữ Hán & Pinyin kèm loa TTS -->
        <span class="text-[11px] md:text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-[#8E918F] mb-0.5">Từ vựng tiếng Trung</span>
        <div class="flex items-center justify-center gap-2 mb-1">
          <div class="text-4xl sm:text-5xl font-black text-blue-600 dark:text-blue-400 font-sans">
            {appState.currentFillItem.hanzi}
          </div>
          <button
            type="button"
            onclick={() => appState.speakCurrent()}
            class="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl w-9 h-9 flex items-center justify-center shadow-xs active:scale-95 transition-transform cursor-pointer shrink-0"
            title="Phát âm tiếng Trung"
          >
            <SpeakerHigh weight="bold" class="w-5 h-5" />
          </button>
        </div>
        <div class="text-xl sm:text-2xl font-black text-slate-700 dark:text-[#C4C7C5]">
          {appState.currentFillItem.pinyin}
        </div>
      {/if}
    </div>
  {:else}
    <!-- Finished Screen -->
    <div class="flex flex-col items-center justify-center text-center p-4 my-auto">
      <div class="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
        <Confetti weight="duotone" class="w-10 h-10" />
      </div>
      <h2 class="text-xl font-black text-slate-900 dark:text-[#E3E3E3] mb-1">
        Hoàn thành bài học!
      </h2>
      <p class="text-sm font-bold text-slate-600 dark:text-[#8E918F] mb-4">
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
  <footer class="shrink-0 mt-2 w-full max-w-xl mx-auto space-y-1.5 sm:space-y-2">
    <!-- Feedback Banner (Chỉ hiển thị khi ở chế độ Thủ công HOẶC khi bỏ qua/gợi ý, không hiển thị ở chế độ Chọn từ để tránh vướng víu) -->
    {#if appState.fillFeedback && (!isTileMode || appState.fillFeedback.type === 'skip' || appState.fillFeedback.type === 'hint')}
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

    <!-- NỘI DUNG NHẬP LIỆU: BẢNG CHỌN TỪ (TILE BANK) HOẶC BÀN PHÍM THỦ CÔNG -->
    {#if isTileMode && appState.fillWordChunks[appState.currentChunkIndex]}
      {@const curChunk = appState.fillWordChunks[appState.currentChunkIndex]}
      <div class="bg-white dark:bg-[#1B1B1B] rounded-2xl border border-slate-200 dark:border-[#282A2C] p-2 sm:p-2.5 shadow-2xs space-y-2">
        <!-- Tile Grid -->
        <div class="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {#each curChunk.tiles as tile}
            <button
              type="button"
              disabled={tile.isUsed || appState.fillAnswered}
              onclick={() => appState.selectTile(appState.currentChunkIndex, tile.id)}
              class={`min-w-9 h-10 sm:min-w-11 sm:h-12 px-2.5 rounded-xl font-black text-base sm:text-lg flex items-center justify-center transition-all select-none border-b-4 cursor-pointer ${
                tile.isUsed
                  ? 'bg-slate-100 dark:bg-[#282A2C] border-slate-200 dark:border-[#353739] text-transparent opacity-20 pointer-events-none'
                  : 'bg-slate-50 hover:bg-white dark:bg-[#282A2C] dark:hover:bg-[#323537] text-slate-800 dark:text-[#E3E3E3] border-slate-300 dark:border-[#3f4245] shadow-2xs active:border-b-0 active:translate-y-1'
              }`}
            >
              {tile.char}
            </button>
          {/each}
        </div>
      </div>
    {:else}
      <!-- Input Row Thủ Công: Tối ưu chống tràn viền trên mobile 360px -->
      <div class="flex items-stretch gap-1.5 sm:gap-2">
        <input
          bind:this={inputEl}
          type="text"
          value={appState.fillInput}
          oninput={handleInputChange}
          onkeydown={handleKeyDown}
          disabled={appState.fillAnswered}
          placeholder={!isZhToVi ? "Gõ Pinyin (vd: ni3hao3)..." : "Gõ nghĩa tiếng Việt..."}
          class="min-w-0 flex-1 h-11 sm:h-12 bg-white dark:bg-[#282A2C] border-2 border-slate-200 dark:border-[#37393B] focus:border-blue-500 dark:focus:border-blue-400 rounded-2xl px-3 sm:px-4 text-sm sm:text-base font-bold text-slate-900 dark:text-[#E3E3E3] outline-none shadow-2xs transition-colors"
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

      <!-- Tone Keyboard (Chỉ hiển thị khi gõ Pinyin thủ công) -->
      {#if !isZhToVi}
        <ToneKeyboard onInsertChar={handleInsertChar} disabled={appState.fillAnswered} />
      {/if}
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
    <div class="flex justify-between items-center px-3 py-1 bg-white dark:bg-[#1B1B1B] rounded-xl border border-slate-200 dark:border-[#282A2C] text-[11px] font-bold text-slate-500 dark:text-[#8E918F] transition-colors">
      <span class="flex items-center gap-1">
        <CheckCircle weight="duotone" class="w-3.5 h-3.5 text-emerald-500" />
        Đúng: <b class="text-slate-900 dark:text-[#E3E3E3]">{appState.fillCorrect}</b>
      </span>
      <span class="flex items-center gap-1">
        <XCircle weight="duotone" class="w-3.5 h-3.5 text-rose-500" />
        Sai: <b class="text-slate-900 dark:text-[#E3E3E3]">{appState.fillWrong}</b>
      </span>
      <span class="flex items-center gap-1">
        <FastForward weight="duotone" class="w-3.5 h-3.5 text-amber-500" />
        Bỏ qua: <b class="text-slate-900 dark:text-[#E3E3E3]">{appState.fillSkipCount}</b>
      </span>
    </div>
  </footer>
{/if}

<script lang="ts">
  import { goto } from '$app/navigation';
  import { DICTIONARY_WORDS, type DictWord } from '#lib/data/dictionaryData';
  import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
  import X from 'phosphor-svelte/lib/X';
  import Microphone from 'phosphor-svelte/lib/Microphone';
  import ArrowClockwise from 'phosphor-svelte/lib/ArrowClockwise';

  let {
    searchQuery = $bindable(''),
    onSelectWord,
    autoFocus = false,
    placeholder = 'Tra từ bằng Chữ Hán, Pinyin, Hán Việt hoặc Tiếng Việt (VD: 苹果, duibuqi, quả táo)...'
  } = $props<{
    searchQuery?: string;
    onSelectWord?: (word: DictWord) => void;
    autoFocus?: boolean;
    placeholder?: string;
  }>();

  let isSearchFocused = $state(false);
  let isListening = $state(false);
  let inputEl = $state<HTMLInputElement | null>(null);

  $effect(() => {
    if (autoFocus && inputEl) {
      setTimeout(() => inputEl?.focus(), 50);
    }
  });

  // Bảng chuẩn hóa không dấu tiếng Việt & Pinyin
  function removeVietnameseTones(str: string): string {
    return (str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase()
      .trim();
  }

  function stripPinyinTones(str: string): string {
    return (str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[üǖǘǚǜ]/g, 'u')
      .replace(/v/g, 'u')
      .toLowerCase()
      .replace(/[-_\s]+/g, ' ')
      .trim();
  }

  // Lọc từ vựng
  const searchResults = $derived.by(() => {
    const rawQ = searchQuery.trim();
    if (!rawQ) return DICTIONARY_WORDS.slice(0, 30);

    const q = rawQ.toLowerCase();
    const qNoViet = removeVietnameseTones(rawQ);
    const qNoPinyin = stripPinyinTones(rawQ);

    return DICTIONARY_WORDS.filter((item) => {
      if (item.hanzi.includes(q)) return true;
      if (item.traditional && item.traditional.includes(q)) return true;
      if (item.pinyin.toLowerCase().includes(q)) return true;
      if (item.pinyinClean && item.pinyinClean.toLowerCase().includes(q)) return true;
      if (stripPinyinTones(item.pinyin).includes(qNoPinyin)) return true;
      if (item.pinyinClean && stripPinyinTones(item.pinyinClean).includes(qNoPinyin)) return true;
      if (item.viet.toLowerCase().includes(q)) return true;
      if (removeVietnameseTones(item.viet).includes(qNoViet)) return true;
      if (item.vi_meaning_short && item.vi_meaning_short.toLowerCase().includes(q)) return true;
      if (item.vi_meaning_short && removeVietnameseTones(item.vi_meaning_short).includes(qNoViet)) return true;
      if (item.vi_meaning_full && item.vi_meaning_full.toLowerCase().includes(q)) return true;
      if (item.vi_meaning_full && removeVietnameseTones(item.vi_meaning_full).includes(qNoViet)) return true;
      if (item.hanViet && item.hanViet.toLowerCase().includes(q)) return true;
      if (item.hanViet && removeVietnameseTones(item.hanViet).includes(qNoViet)) return true;
      return false;
    });
  });

  const searchSuggestions = $derived.by(() => {
    const rawQ = searchQuery.trim();
    if (!rawQ) return [];
    return searchResults.slice(0, 8);
  });

  // Tạo danh sách gợi ý ngẫu nhiên
  function generateRandomSuggestions(count = 9) {
    if (!DICTIONARY_WORDS || DICTIONARY_WORDS.length === 0) return [];
    const validWords = DICTIONARY_WORDS.filter(
      (w) => w.vi_meaning_short && w.vi_meaning_short.length <= 16 && !w.vi_meaning_short.includes('(')
    );
    const pool = validWords.length >= count ? validWords : DICTIONARY_WORDS;
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, count);

    const types: Array<'zh' | 'py' | 'vi'> = [];
    const third = Math.floor(count / 3);
    for (let i = 0; i < third; i++) types.push('vi');
    for (let i = 0; i < third; i++) types.push('py');
    while (types.length < count) types.push('zh');
    types.sort(() => Math.random() - 0.5);

    return shuffled.map((word, index) => {
      const type = types[index];
      if (type === 'vi') {
        const rawVi = word.vi_meaning_short || word.viet;
        const text = rawVi.split(/[,;/]/)[0].trim();
        return { label: text, query: text, type, word };
      } else if (type === 'py') {
        return { label: word.pinyin, query: word.pinyin, type, word };
      } else {
        return { label: word.hanzi, query: word.hanzi, type, word };
      }
    });
  }

  let randomSuggestions = $state(generateRandomSuggestions());

  function refreshSuggestions() {
    randomSuggestions = generateRandomSuggestions();
  }

  function handleSelect(word: DictWord) {
    searchQuery = word.hanzi;
    isSearchFocused = false;
    if (onSelectWord) {
      onSelectWord(word);
    } else {
      goto(`/tu-vung?q=${encodeURIComponent(word.hanzi)}`);
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      if (searchSuggestions.length > 0) {
        handleSelect(searchSuggestions[0]);
      } else if (searchQuery.trim()) {
        isSearchFocused = false;
        goto(`/tu-vung?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  }

  function clearSearch() {
    searchQuery = '';
    inputEl?.focus();
  }

  function toggleVoiceInput() {
    if (typeof window === 'undefined') return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói Web Speech.');
      return;
    }

    if (isListening) {
      isListening = false;
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'zh-CN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        isListening = true;
      };
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          searchQuery = transcript;
          const match = DICTIONARY_WORDS.find((w) => w.hanzi === transcript);
          if (match && onSelectWord) {
            handleSelect(match);
          } else {
            goto(`/tu-vung?q=${encodeURIComponent(transcript)}`);
          }
        }
        isListening = false;
      };
      recognition.onerror = () => {
        isListening = false;
      };
      recognition.onend = () => {
        isListening = false;
      };
      recognition.start();
    } catch {
      isListening = false;
    }
  }
</script>

<div class="bg-white dark:bg-[#1E1F20] rounded-3xl p-3.5 md:p-5 border border-slate-200 dark:border-[#37393B] shadow-xs">
  <div class="relative flex items-center">
    <div class="absolute left-4.5 text-slate-400 dark:text-[#8E918F] pointer-events-none">
      <MagnifyingGlass weight="bold" class="w-5 h-5 md:w-6 md:h-6 text-rose-500" />
    </div>

    <input
      bind:this={inputEl}
      type="text"
      bind:value={searchQuery}
      onfocus={() => (isSearchFocused = true)}
      onblur={() => setTimeout(() => (isSearchFocused = false), 200)}
      onkeydown={handleKeyDown}
      {placeholder}
      class="w-full pl-13 pr-28 py-3 md:py-3.5 rounded-2xl bg-slate-50 dark:bg-[#282A2C] border border-slate-200 dark:border-[#37393B] text-slate-800 dark:text-[#E3E3E3] font-medium placeholder-slate-400 dark:placeholder-[#8E918F] focus:outline-hidden focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all text-xs md:text-sm shadow-inner"
    />

    <!-- Dropdown gợi ý kết quả tìm kiếm khi gõ -->
    {#if isSearchFocused && searchQuery.trim() && searchSuggestions.length > 0}
      <div
        class="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-[#1E1F20] rounded-2xl border border-slate-200 dark:border-[#37393B] shadow-xl overflow-hidden z-50 divide-y divide-slate-100 dark:divide-[#282A2C] max-h-72 overflow-y-auto"
      >
        {#each searchSuggestions as sug}
          <button
            type="button"
            onmousedown={() => handleSelect(sug)}
            class="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-rose-50/70 dark:hover:bg-[#282A2C] transition-colors cursor-pointer group"
          >
            <div class="flex items-center gap-3 min-w-0">
              <span class="text-base font-black text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                {sug.hanzi}
              </span>
              <span class="text-xs font-bold text-rose-600 dark:text-rose-400">
                {sug.pinyin}
              </span>
              <span class="text-xs text-slate-500 dark:text-[#8E918F] truncate max-w-[200px] sm:max-w-xs">
                {sug.vi_meaning_short || sug.viet}
              </span>
            </div>

            <div class="flex items-center gap-2 shrink-0">
              {#if sug.hanViet}
                <span class="text-[10px] font-semibold text-slate-400 dark:text-neutral-500 hidden sm:inline">
                  [{sug.hanViet}]
                </span>
              {/if}
              <span class="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-[#282A2C] text-slate-600 dark:text-[#C4C7C5]">
                HSK {sug.hskLevel}
              </span>
            </div>
          </button>
        {/each}
      </div>
    {/if}

    <div class="absolute right-3 flex items-center gap-1.5">
      {#if searchQuery}
        <button
          type="button"
          onclick={clearSearch}
          aria-label="Xóa từ khóa"
          class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-200/50 dark:hover:bg-[#37393B] transition-colors cursor-pointer"
        >
          <X weight="bold" class="w-4 h-4" />
        </button>
      {/if}

      <button
        type="button"
        onclick={toggleVoiceInput}
        aria-label="Nhập bằng giọng nói"
        class={`p-2 rounded-xl border transition-all cursor-pointer ${
          isListening
            ? 'bg-rose-500 text-white animate-pulse border-rose-600'
            : 'bg-white dark:bg-[#1E1F20] hover:bg-slate-100 dark:hover:bg-[#37393B] text-slate-600 dark:text-[#C4C7C5] border-slate-200 dark:border-[#37393B]'
        }`}
        title="Nói tiếng Trung để tra từ"
      >
        <Microphone weight={isListening ? 'fill' : 'bold'} class="w-4 h-4" />
      </button>
    </div>
  </div>

  <!-- Thanh chip gợi ý nhanh các từ HSK phổ biến -->
  <div class="flex items-center gap-1.5 mt-2.5 overflow-x-auto no-scrollbar pt-1 text-xs">
    <div class="flex items-center gap-1 shrink-0">
      <span class="text-slate-400 dark:text-[#8E918F] font-semibold text-[11px]">Gợi ý:</span>
      <button
        type="button"
        onclick={refreshSuggestions}
        class="p-0.5 text-slate-400 hover:text-rose-500 rounded transition-colors cursor-pointer"
        title="Đổi gợi ý ngẫu nhiên"
        aria-label="Đổi gợi ý ngẫu nhiên"
      >
        <ArrowClockwise weight="bold" class="w-3 h-3" />
      </button>
    </div>
    {#each randomSuggestions as sug}
      <button
        type="button"
        onclick={() => handleSelect(sug.word)}
        class="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-[#282A2C] hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-600 dark:text-[#C4C7C5] hover:text-rose-600 dark:hover:text-rose-300 font-medium transition-colors shrink-0 text-[11px] cursor-pointer"
      >
        {sug.label}
      </button>
    {/each}
  </div>
</div>

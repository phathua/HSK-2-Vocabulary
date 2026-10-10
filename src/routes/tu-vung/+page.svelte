<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { DICTIONARY_WORDS, DICTIONARY_BY_HANZI, type DictWord } from '#lib/data/dictionaryData';
  import { appState } from '#lib/state/appState.svelte';
  import Header from '#lib/components/Header.svelte';
  import LessonFilterModal from '#lib/components/LessonFilterModal.svelte';
  import SettingsModal from '#lib/components/SettingsModal.svelte';
  import HanziStrokeWriter from '#lib/components/dictionary/HanziStrokeWriter.svelte';

  // Phosphor Icons
  import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
  import SpeakerHigh from 'phosphor-svelte/lib/SpeakerHigh';
  import BookmarkSimple from 'phosphor-svelte/lib/BookmarkSimple';
  import Cards from 'phosphor-svelte/lib/Cards';
  import Microphone from 'phosphor-svelte/lib/Microphone';
  import X from 'phosphor-svelte/lib/X';
  import Sparkle from 'phosphor-svelte/lib/Sparkle';
  import Books from 'phosphor-svelte/lib/Books';
  import ChatCircleDots from 'phosphor-svelte/lib/ChatCircleDots';
  import ImageSquare from 'phosphor-svelte/lib/ImageSquare';
  import ArrowUp from 'phosphor-svelte/lib/ArrowUp';
  import ListBullets from 'phosphor-svelte/lib/ListBullets';
  import BookOpen from 'phosphor-svelte/lib/BookOpen';
  import PencilLine from 'phosphor-svelte/lib/PencilLine';
  import ArrowsLeftRight from 'phosphor-svelte/lib/ArrowsLeftRight';
  import Scales from 'phosphor-svelte/lib/Scales';
  import Lightbulb from 'phosphor-svelte/lib/Lightbulb';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
  import { getCharacterDetail } from '#lib/data/characterDetailMap';

  // State tìm kiếm & scroll behavior
  let searchQuery = $state('');
  let activeTab = $state<'all' | 'vocab' | 'sentences' | 'characters'>('all');
  let isListening = $state(false);

  // Cuộn thông minh: Ẩn khi cuộn xuống, hiện sticky khi cuộn lên & Scroll to Top
  let mainScrollEl = $state<HTMLElement | null>(null);
  let characterSectionEl = $state<HTMLElement | null>(null);
  let sentenceSectionEl = $state<HTMLElement | null>(null);
  let lastScrollTop = 0;
  let isSearchVisible = $state(true);
  let isSticky = $state(false);
  let showScrollTop = $state(false);

  function handleScroll(e: Event) {
    const target = e.currentTarget as HTMLElement;
    const currentScroll = target.scrollTop;

    showScrollTop = currentScroll > 250;

    if (currentScroll < 50) {
      isSearchVisible = true;
      isSticky = false;
    } else {
      isSticky = true;
      if (currentScroll > lastScrollTop && currentScroll > 120) {
        isSearchVisible = false;
      } else if (currentScroll < lastScrollTop) {
        isSearchVisible = true;
      }
    }
    lastScrollTop = currentScroll;
  }

  function scrollToTop() {
    if (mainScrollEl) {
      mainScrollEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleTabChange(tab: 'all' | 'vocab' | 'sentences' | 'characters') {
    activeTab = tab;
    if (tab === 'sentences' && sentenceSectionEl) {
      sentenceSectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (tab === 'characters' && characterSectionEl) {
      characterSectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Khởi tạo query từ URL param hoặc mặc định là từ đầu tiên
  $effect(() => {
    const q = page.url.searchParams.get('q');
    if (q) {
      searchQuery = q;
    } else if (!searchQuery) {
      searchQuery = '你';
    }
  });

  // Tìm kiếm từ vựng linh hoạt
  let searchResults = $derived.by(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return DICTIONARY_WORDS.slice(0, 30);

    return DICTIONARY_WORDS.filter((item) => {
      if (item.hanzi.includes(q)) return true;
      if (item.traditional && item.traditional.includes(q)) return true;
      if (item.pinyin.toLowerCase().includes(q)) return true;
      if (item.pinyinClean && item.pinyinClean.toLowerCase().includes(q)) return true;
      if (item.viet.toLowerCase().includes(q)) return true;
      if (item.hanViet && item.hanViet.toLowerCase().includes(q)) return true;
      return false;
    });
  });

  // Từ vựng chính đang được chọn hiển thị
  let currentWord = $derived.by(() => {
    if (searchResults.length === 0) return null;
    const exact = searchResults.find(
      (w) =>
        w.hanzi === searchQuery.trim() ||
        w.pinyinClean.toLowerCase() === searchQuery.trim().toLowerCase()
    );
    return exact || searchResults[0];
  });

  function selectWord(word: DictWord) {
    searchQuery = word.hanzi;
    goto(`/tu-vung?q=${encodeURIComponent(word.hanzi)}`);
  }

  function clearSearch() {
    searchQuery = '';
    goto('/tu-vung');
  }

  // Phát âm Web Speech API
  function speak(text: string, rate = 0.85) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
  }

  // Nhận diện giọng nói
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
          goto(`/tu-vung?q=${encodeURIComponent(transcript)}`);
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

  // Bookmark từ vựng (localStorage)
  let bookmarkedIds = $state<string[]>([]);

  $effect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('HSK_DICT_BOOKMARKS');
        if (saved) bookmarkedIds = JSON.parse(saved);
      } catch {}
    }
  });

  let isFavorite = $derived.by(() => {
    if (!currentWord) return false;
    return bookmarkedIds.includes(currentWord.id);
  });

  function toggleFavorite() {
    if (!currentWord) return;
    if (bookmarkedIds.includes(currentWord.id)) {
      bookmarkedIds = bookmarkedIds.filter((id) => id !== currentWord!.id);
    } else {
      bookmarkedIds = [...bookmarkedIds, currentWord.id];
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('HSK_DICT_BOOKMARKS', JSON.stringify(bookmarkedIds));
    }
  }
</script>

<svelte:head>
  <title>Từ Điển HSK 1 & HSK 2 - Tra Cứu Từ Vựng Thông Minh</title>
</svelte:head>

<Header />

<main
  bind:this={mainScrollEl}
  onscroll={handleScroll}
  class="flex-1 flex flex-col min-h-0 overflow-y-auto no-scrollbar space-y-4 pt-1.5 pb-8 relative"
>
  <!-- ================= BỐ CỤC CHÍNH 2 CỘT TỪ ĐỈNH TRANG (ĐẨY CỘT PHẢI LÊN NGANG HÀNG TRÊN DESKTOP) ================= -->
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
    
    <!-- ================= CỘT TRÁI (COL-SPAN-8): THANH TÌM KIẾM + TABS + THÔNG TIN TỪ VỰNG ================= -->
    <div class="lg:col-span-8 space-y-4">
      
      <!-- 1. THANH TÌM KIẾM (STICKY KHI CUỘN LÊN, ẨN KHI CUỘN XUỐNG) -->
      <div
        class={`z-30 transition-all duration-300 ease-in-out ${
          isSticky
            ? 'sticky top-0 pt-0 pb-1.5'
            : 'relative'
        } ${
          !isSearchVisible && isSticky ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        }`}
      >
        <div class="bg-white dark:bg-[#1E1F20] rounded-3xl p-3.5 md:p-5 border border-slate-200 dark:border-[#37393B] shadow-xs">
          <div class="relative flex items-center">
            <div class="absolute left-4.5 text-slate-400 dark:text-[#8E918F] pointer-events-none">
              <MagnifyingGlass weight="bold" class="w-5 h-5 md:w-6 md:h-6 text-rose-500" />
            </div>

            <input
              type="text"
              bind:value={searchQuery}
              placeholder="Tra từ bằng Chữ Hán, Pinyin, Hán Việt hoặc Tiếng Việt (VD: 苹果, duibuqi, quả táo)..."
              class="w-full pl-13 pr-28 py-3 md:py-3.5 rounded-2xl bg-slate-50 dark:bg-[#282A2C] border border-slate-200 dark:border-[#37393B] text-slate-800 dark:text-[#E3E3E3] font-medium placeholder-slate-400 dark:placeholder-[#8E918F] focus:outline-hidden focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all text-xs md:text-sm shadow-inner"
            />

            <div class="absolute right-3 flex items-center gap-1.5">
              {#if searchQuery}
                <button
                  onclick={clearSearch}
                  aria-label="Xóa từ khóa"
                  class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-200/50 dark:hover:bg-[#37393B] transition-colors"
                >
                  <X weight="bold" class="w-4 h-4" />
                </button>
              {/if}

              <button
                onclick={toggleVoiceInput}
                aria-label="Nhập bằng giọng nói"
                class={`p-2 rounded-xl border transition-all ${
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
            <span class="text-slate-400 dark:text-[#8E918F] font-semibold shrink-0 text-[11px]">Gợi ý:</span>
            {#each ['对不起', '苹果', '北京', '谢谢', '高兴', '喜欢', '茶', '学习', '朋友'] as sug}
              <button
                onclick={() => {
                  searchQuery = sug;
                  goto(`/tu-vung?q=${encodeURIComponent(sug)}`);
                }}
                class="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-[#282A2C] hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-600 dark:text-[#C4C7C5] hover:text-rose-600 dark:hover:text-rose-300 font-medium transition-colors shrink-0 text-[11px]"
              >
                {sug}
              </button>
            {/each}
          </div>
        </div>
      </div>

      <!-- 2. NAVIGATION TABS (KÈM ICON VÀ TÍNH NĂNG CHUYỂN ĐỔI CHUẨN XÁC) -->
      <div class="flex items-center gap-2 border-b border-slate-200 dark:border-[#282A2C] pb-2.5 pt-1 overflow-x-auto no-scrollbar shrink-0">
        <button
          onclick={() => handleTabChange('all')}
          class={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'all'
              ? 'bg-rose-500 text-white shadow-xs'
              : 'bg-white dark:bg-[#1E1F20] text-slate-600 dark:text-[#C4C7C5] border border-slate-200 dark:border-[#37393B]'
          }`}
        >
          <ListBullets weight="bold" class="w-3.5 h-3.5" />
          <span>Tất cả thông tin</span>
        </button>
        <button
          onclick={() => handleTabChange('vocab')}
          class={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'vocab'
              ? 'bg-rose-500 text-white shadow-xs'
              : 'bg-white dark:bg-[#1E1F20] text-slate-600 dark:text-[#C4C7C5] border border-slate-200 dark:border-[#37393B]'
          }`}
        >
          <BookOpen weight="bold" class="w-3.5 h-3.5" />
          <span>Từ vựng & Giải nghĩa</span>
        </button>
        <button
          onclick={() => handleTabChange('sentences')}
          class={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'sentences'
              ? 'bg-rose-500 text-white shadow-xs'
              : 'bg-white dark:bg-[#1E1F20] text-slate-600 dark:text-[#C4C7C5] border border-slate-200 dark:border-[#37393B]'
          }`}
        >
          <ChatCircleDots weight="bold" class="w-3.5 h-3.5" />
          <span>Câu ví dụ song ngữ</span>
        </button>
        <button
          onclick={() => handleTabChange('characters')}
          class={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'characters'
              ? 'bg-rose-500 text-white shadow-xs'
              : 'bg-white dark:bg-[#1E1F20] text-slate-600 dark:text-[#C4C7C5] border border-slate-200 dark:border-[#37393B]'
          }`}
        >
          <PencilLine weight="bold" class="w-3.5 h-3.5" />
          <span>Phân tích Hán tự & Tập viết</span>
        </button>
      </div>

      <!-- 3. NỘI DUNG TỪ VỰNG CHÍNH -->
      {#if currentWord}
        {#if activeTab === 'all' || activeTab === 'vocab'}
          <div class="bg-white dark:bg-[#1E1F20] rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-[#37393B] shadow-xs relative overflow-hidden space-y-6">
            <!-- Header từ vựng & âm thanh -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-[#282A2C] pb-6">
              <div class="space-y-2">
                <div class="flex items-center gap-3">
                  <h1 class="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-wide">
                    {currentWord.hanzi}
                  </h1>
                  {#if currentWord.traditional && currentWord.traditional !== currentWord.hanzi}
                    <span class="text-xl md:text-2xl font-bold text-slate-400 dark:text-[#8E918F]">
                      [{currentWord.traditional}]
                    </span>
                  {/if}
                  <span class="px-2.5 py-1 rounded-xl text-xs font-black bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/50 dark:border-rose-900/40">
                    HSK {currentWord.hskLevel}
                  </span>
                  <span class="px-2 py-0.5 rounded-lg text-[11px] font-bold bg-slate-100 dark:bg-[#282A2C] text-slate-500 dark:text-[#8E918F]">
                    Bài {currentWord.lesson}
                  </span>
                </div>

                <!-- Pinyin & Âm Hán Việt -->
                <div class="flex flex-wrap items-center gap-3 text-base md:text-lg">
                  <span class="font-bold text-rose-600 dark:text-rose-400">
                    [{currentWord.pinyin}]
                  </span>
                  {#if currentWord.hanViet}
                    <span class="font-black text-slate-700 dark:text-[#C4C7C5] uppercase tracking-wider text-sm bg-slate-100 dark:bg-[#282A2C] px-2.5 py-0.5 rounded-lg">
                      {currentWord.hanViet}
                    </span>
                  {/if}
                  {#if currentWord.partOfSpeech}
                    <span class="text-xs font-bold text-slate-400 dark:text-[#8E918F] italic">
                      ({currentWord.partOfSpeech})
                    </span>
                  {/if}
                </div>
              </div>

              <!-- Nút Tác vụ (Phát âm, Bookmark, Flashcard) -->
              <div class="flex items-center gap-2">
                <button
                  onclick={() => speak(currentWord.hanzi, 0.85)}
                  aria-label="Phát âm tiếng Trung"
                  class="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs md:text-sm shadow-sm transition-all active:scale-95"
                >
                  <SpeakerHigh weight="fill" class="w-5 h-5" />
                  <span>Phát âm</span>
                </button>

                <button
                  onclick={() => speak(currentWord.hanzi, 0.65)}
                  aria-label="Phát âm chậm"
                  class="px-3 py-2.5 rounded-2xl bg-slate-100 dark:bg-[#282A2C] hover:bg-slate-200 dark:hover:bg-[#37393B] text-slate-700 dark:text-[#C4C7C5] font-bold text-xs transition-all"
                  title="Phát âm tốc độ chậm 0.65x"
                >
                  0.65x
                </button>

                <button
                  onclick={toggleFavorite}
                  aria-label="Lưu vào danh sách đã học"
                  class={`p-2.5 rounded-2xl border transition-all ${
                    isFavorite
                      ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-500 border-amber-300 dark:border-amber-800'
                      : 'bg-slate-100 dark:bg-[#282A2C] text-slate-400 border-transparent hover:text-amber-500'
                  }`}
                  title="Lưu hoặc đánh dấu đã thuộc"
                >
                  <BookmarkSimple weight={isFavorite ? 'fill' : 'bold'} class="w-5 h-5" />
                </button>

                <a
                  href={`/?search=${encodeURIComponent(currentWord.hanzi)}`}
                  class="p-2.5 rounded-2xl bg-slate-100 dark:bg-[#282A2C] hover:bg-slate-200 dark:hover:bg-[#37393B] text-slate-700 dark:text-[#C4C7C5] border border-slate-200/60 dark:border-[#37393B] transition-all"
                  title="Học thẻ nhớ flashcard từ này"
                >
                  <Cards weight="duotone" class="w-5 h-5" />
                </a>
              </div>
            </div>

            <!-- Giải nghĩa chi tiết & Đa tầng nghĩa -->
            <div class="space-y-5">
              {#if currentWord.subDefinitions && currentWord.subDefinitions.length > 0}
                <div class="space-y-4">
                  <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#8E918F] flex items-center gap-1.5">
                    <Sparkle weight="duotone" class="w-4 h-4 text-rose-500" />
                    Các nét nghĩa chi tiết
                  </h3>
                  <div class="space-y-3">
                    {#each currentWord.subDefinitions as sub}
                      <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#282A2C]/60 border border-slate-100 dark:border-[#37393B] space-y-2">
                        <div class="flex items-start gap-2.5">
                          <span class="w-5 h-5 rounded-full bg-rose-500 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {sub.order}
                          </span>
                          <div class="space-y-1">
                            <h4 class="text-base font-bold text-slate-900 dark:text-white">
                              {sub.definition}
                            </h4>
                            {#if sub.explanation}
                              <p class="text-xs text-slate-500 dark:text-[#8E918F] leading-relaxed">
                                {sub.explanation}
                              </p>
                            {/if}
                          </div>
                        </div>

                        {#if sub.example}
                          <div class="mt-2 pl-7 border-l-2 border-rose-200 dark:border-rose-900/60 py-0.5 space-y-0.5">
                            <p class="text-sm font-bold text-slate-800 dark:text-[#E3E3E3]">
                              {sub.example.zh}
                            </p>
                            {#if sub.example.pinyin}
                              <p class="text-xs text-rose-600 dark:text-rose-400">
                                {sub.example.pinyin}
                              </p>
                            {/if}
                            <p class="text-xs text-slate-600 dark:text-[#C4C7C5]">
                              {sub.example.vi}
                            </p>
                          </div>
                        {/if}
                      </div>
                    {/each}
                  </div>
                </div>
              {:else}
                <div>
                  <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#8E918F] mb-1.5 flex items-center gap-1.5">
                    <Sparkle weight="duotone" class="w-4 h-4 text-rose-500" />
                    Nghĩa tiếng Việt
                  </h3>
                  <p class="text-xl md:text-2xl font-bold text-slate-800 dark:text-[#E3E3E3]">
                    {currentWord.viet}
                  </p>
                </div>
              {/if}

              {#if currentWord.enMeaning}
                <div>
                  <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#8E918F] mb-1">
                    Định nghĩa tiếng Anh (English)
                  </h4>
                  <p class="text-sm font-semibold text-slate-600 dark:text-[#C4C7C5]">
                    {currentWord.enMeaning}
                  </p>
                </div>
              {/if}

              <!-- KHỐI TỪ CẬN NGHĨA / ĐỒNG NGHĨA & TỪ TRÁI NGHĨA THEO CHUẨN HANZII -->
              {#if (currentWord.synonyms && currentWord.synonyms.length > 0) || (currentWord.antonyms && currentWord.antonyms.length > 0)}
                <div class="pt-4 border-t border-slate-100 dark:border-[#282A2C] grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Từ cận nghĩa / đồng nghĩa -->
                  {#if currentWord.synonyms && currentWord.synonyms.length > 0}
                    <div class="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-2">
                      <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle weight="fill" class="w-4 h-4 text-emerald-500" />
                        Từ cận nghĩa / Đồng nghĩa
                      </h4>
                      <div class="space-y-1.5">
                        {#each currentWord.synonyms as syn}
                          {#if typeof syn === 'string'}
                            <button
                              onclick={() => { searchQuery = syn; }}
                              class="w-full text-left p-2 rounded-xl bg-white dark:bg-[#1E1F20] hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-800/40 transition-colors flex items-center justify-between"
                            >
                              <span class="font-bold text-sm text-slate-800 dark:text-white">{syn}</span>
                            </button>
                          {:else}
                            <button
                              onclick={() => { searchQuery = syn.hanzi; }}
                              class="w-full text-left p-2.5 rounded-xl bg-white dark:bg-[#1E1F20] hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-800/40 transition-colors space-y-0.5"
                            >
                              <div class="flex items-center justify-between">
                                <span class="font-bold text-sm text-slate-900 dark:text-white">{syn.hanzi}</span>
                                {#if syn.pinyin}
                                  <span class="text-xs text-rose-600 dark:text-rose-400 font-semibold">[{syn.pinyin}]</span>
                                {/if}
                              </div>
                              <div class="flex items-center justify-between text-xs text-slate-500 dark:text-[#8E918F]">
                                {#if syn.hanViet}
                                  <span class="font-bold uppercase text-[10px] bg-slate-100 dark:bg-[#282A2C] px-1.5 py-0.2 rounded">{syn.hanViet}</span>
                                {/if}
                                {#if syn.viet}
                                  <span class="truncate ml-1">{syn.viet}</span>
                                {/if}
                              </div>
                            </button>
                          {/if}
                        {/each}
                      </div>
                    </div>
                  {/if}

                  <!-- Từ trái nghĩa -->
                  {#if currentWord.antonyms && currentWord.antonyms.length > 0}
                    <div class="p-3.5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 space-y-2">
                      <h4 class="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                        <ArrowsLeftRight weight="bold" class="w-4 h-4 text-amber-500" />
                        Từ trái nghĩa
                      </h4>
                      <div class="space-y-1.5">
                        {#each currentWord.antonyms as ant}
                          {#if typeof ant === 'string'}
                            <button
                              onclick={() => { searchQuery = ant; }}
                              class="w-full text-left p-2 rounded-xl bg-white dark:bg-[#1E1F20] hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-amber-200/50 dark:border-amber-800/40 transition-colors flex items-center justify-between"
                            >
                              <span class="font-bold text-sm text-slate-800 dark:text-white">{ant}</span>
                            </button>
                          {:else}
                            <button
                              onclick={() => { searchQuery = ant.hanzi; }}
                              class="w-full text-left p-2.5 rounded-xl bg-white dark:bg-[#1E1F20] hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-amber-200/50 dark:border-amber-800/40 transition-colors space-y-0.5"
                            >
                              <div class="flex items-center justify-between">
                                <span class="font-bold text-sm text-slate-900 dark:text-white">{ant.hanzi}</span>
                                {#if ant.pinyin}
                                  <span class="text-xs text-rose-600 dark:text-rose-400 font-semibold">[{ant.pinyin}]</span>
                                {/if}
                              </div>
                              <div class="flex items-center justify-between text-xs text-slate-500 dark:text-[#8E918F]">
                                {#if ant.hanViet}
                                  <span class="font-bold uppercase text-[10px] bg-slate-100 dark:bg-[#282A2C] px-1.5 py-0.2 rounded">{ant.hanViet}</span>
                                {/if}
                                {#if ant.viet}
                                  <span class="truncate ml-1">{ant.viet}</span>
                                {/if}
                              </div>
                            </button>
                          {/if}
                        {/each}
                      </div>
                    </div>
                  {/if}
                </div>
              {/if}

              <!-- KHỐI PHÂN BIỆT TỪ (E.G. 对不起 VS 道歉) CHUẨN HANZII -->
              {#if currentWord.confusableWords}
                <div class="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-900/50 space-y-2">
                  <h4 class="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
                    <Scales weight="duotone" class="w-4 h-4 text-indigo-500" />
                    <span>Phân biệt từ: </span>
                    <span class="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200 font-black">
                      {typeof currentWord.confusableWords === 'string' ? currentWord.confusableWords : currentWord.confusableWords.pair}
                    </span>
                  </h4>
                  <p class="text-xs md:text-sm text-slate-700 dark:text-[#C4C7C5] leading-relaxed">
                    {typeof currentWord.confusableWords === 'string'
                      ? `So sánh cách dùng cụ thể trong ngữ cảnh: ${currentWord.confusableWords}.`
                      : currentWord.confusableWords.explanation}
                  </p>
                </div>
              {/if}

              <!-- Từ ghép & Cụm từ collocations -->
              {#if currentWord.compounds.length > 0 || currentWord.collocations.length > 0}
                <div class="pt-4 border-t border-slate-100 dark:border-[#282A2C] grid grid-cols-1 md:grid-cols-2 gap-4">
                  {#if currentWord.compounds.length > 0}
                    <div>
                      <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#8E918F] mb-2 flex items-center gap-1">
                        <Books weight="duotone" class="w-3.5 h-3.5 text-blue-500" />
                        Từ ghép liên quan
                      </h4>
                      <div class="flex flex-wrap gap-1.5">
                        {#each currentWord.compounds as cp}
                          <button
                            onclick={() => { searchQuery = cp; }}
                            class="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 text-blue-700 dark:text-blue-300 border border-blue-200/40 dark:border-blue-900/40 transition-colors"
                          >
                            {cp}
                          </button>
                        {/each}
                      </div>
                    </div>
                  {/if}

                  {#if currentWord.collocations.length > 0}
                    <div>
                      <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#8E918F] mb-2 flex items-center gap-1">
                        <ChatCircleDots weight="duotone" class="w-3.5 h-3.5 text-emerald-500" />
                        Kết hợp từ phổ biến
                      </h4>
                      <div class="flex flex-wrap gap-1.5">
                        {#each currentWord.collocations as cl}
                          <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/40 dark:border-emerald-900/40">
                            {cl}
                          </span>
                        {/each}
                      </div>
                    </div>
                  {/if}
                </div>
              {/if}
            </div>
          </div>
        {/if}

        <!-- KHI CHỌN TAB 'characters', HIỂN THỊ BẢNG BÓC TÁCH TỪNG CHỮ HÁN TẠI CỘT 1 (KHÔNG BỊ TRỐNG TRƠN) -->
        {#if activeTab === 'characters'}
          <div class="bg-white dark:bg-[#1E1F20] rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-[#37393B] shadow-xs space-y-6">
            <div class="flex items-center justify-between border-b border-slate-100 dark:border-[#282A2C] pb-4">
              <div class="space-y-1">
                <h3 class="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <PencilLine weight="bold" class="w-5 h-5 text-rose-500" />
                  Bóc tách chi tiết từng chữ Hán ({currentWord.hanzi})
                </h3>
                <p class="text-xs text-slate-500 dark:text-[#8E918F]">
                  Phân tích cấu tạo, Lục thư, Bộ thủ và nét bút của từng ký tự tạo nên từ vựng này
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4">
              {#each Array.from(currentWord.hanzi) as char}
                {@const detail = getCharacterDetail(char)}
                <div class="p-4 rounded-2xl bg-slate-50 dark:bg-[#282A2C] border border-slate-200 dark:border-[#37393B] space-y-3">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <span class="text-3xl font-black text-slate-900 dark:text-white">
                        {char}
                      </span>
                      <div>
                        <span class="font-bold text-rose-600 dark:text-rose-400 text-sm">
                          [{detail.pinyin}]
                        </span>
                        <div class="text-[11px] font-bold text-slate-500 dark:text-[#8E918F] uppercase">
                          Bộ {detail.radical} ({detail.radicalNameVi})
                        </div>
                      </div>
                    </div>

                    <div class="text-right">
                      <span class="px-2 py-0.5 rounded-lg bg-white dark:bg-[#1E1F20] border border-slate-200 dark:border-[#37393B] text-xs font-bold text-slate-700 dark:text-[#C4C7C5]">
                        {detail.strokeCount} nét
                      </span>
                      <div class="text-[10px] text-slate-400 dark:text-[#8E918F] mt-1 font-semibold">
                        {detail.structureName} ({detail.structureIcon})
                      </div>
                    </div>
                  </div>

                  <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs pt-2 border-t border-slate-200/60 dark:border-[#37393B]">
                    <div>
                      <span class="text-slate-400 dark:text-[#8E918F] block text-[10px]">Lục thư:</span>
                      <span class="font-bold text-slate-700 dark:text-[#E3E3E3] capitalize">{detail.liuShu}</span>
                    </div>
                    <div>
                      <span class="text-slate-400 dark:text-[#8E918F] block text-[10px]">Thành phần:</span>
                      <span class="font-bold text-slate-700 dark:text-[#E3E3E3]">{detail.components || char}</span>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <span class="text-slate-400 dark:text-[#8E918F] block text-[10px]">Trật tự nét:</span>
                      <span class="font-bold text-rose-600 dark:text-rose-400 tracking-wider font-mono text-[11px] truncate block">{detail.strokeSymbols}</span>
                    </div>
                  </div>

                  {#if detail.etymology}
                    <div class="text-xs bg-white dark:bg-[#1E1F20] p-2.5 rounded-xl border border-slate-200/50 dark:border-[#37393B] text-slate-600 dark:text-[#C4C7C5]">
                      <span class="font-bold text-slate-700 dark:text-white mr-1">Ý nghĩa cấu thành:</span>
                      {detail.etymology}
                    </div>
                  {/if}
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- 4. CÂU VÍ DỤ SONG NGỮ -->
        {#if (activeTab === 'all' || activeTab === 'sentences') && currentWord.sentences.length > 0}
          <div
            bind:this={sentenceSectionEl}
            class="bg-white dark:bg-[#1E1F20] rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-[#37393B] shadow-xs space-y-4"
          >
            <h3 class="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <ChatCircleDots weight="duotone" class="w-5 h-5 text-rose-500" />
              Câu ví dụ ngữ cảnh ({currentWord.sentences.length})
            </h3>

            <div class="space-y-3">
              {#each currentWord.sentences as sent}
                <div class="p-4 rounded-2xl bg-slate-50 dark:bg-[#282A2C] border border-slate-100 dark:border-[#37393B] space-y-1.5">
                  <div class="flex items-center justify-between gap-3">
                    <p class="text-lg font-bold text-slate-900 dark:text-white">
                      {sent.zh}
                    </p>
                    <button
                      onclick={() => speak(sent.zh, 0.85)}
                      aria-label="Nghe câu ví dụ"
                      class="p-2 rounded-xl bg-white dark:bg-[#1E1F20] hover:bg-rose-50 dark:hover:bg-rose-950 text-slate-500 hover:text-rose-600 transition-colors shrink-0 shadow-2xs"
                    >
                      <SpeakerHigh weight="bold" class="w-4 h-4" />
                    </button>
                  </div>
                  {#if sent.pinyin}
                    <p class="text-xs font-semibold text-rose-600 dark:text-rose-400">
                      {sent.pinyin}
                    </p>
                  {/if}
                  <p class="text-sm font-medium text-slate-600 dark:text-[#C4C7C5]">
                    {sent.vi}
                  </p>
                  {#if sent.tag}
                    <span class="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-200/60 dark:bg-[#37393B] text-slate-600 dark:text-[#8E918F]">
                      #{sent.tag}
                    </span>
                  {/if}
                </div>
              {/each}
            </div>
          </div>
        {/if}

      {:else}
        <div class="bg-white dark:bg-[#1E1F20] rounded-3xl p-12 border border-slate-200 dark:border-[#37393B] text-center space-y-3">
          <MagnifyingGlass weight="duotone" class="w-12 h-12 text-slate-400 mx-auto" />
          <h3 class="text-lg font-black text-slate-800 dark:text-white">Không tìm thấy từ vựng</h3>
          <p class="text-sm text-slate-500 dark:text-[#8E918F]">
            Hãy thử tìm bằng chữ Hán, Pinyin không dấu (ví dụ: nihao, pingguo) hoặc tiếng Việt.
          </p>
        </div>
      {/if}

      <!-- 5. CÁC TỪ VỰNG KHÁC KHỚP VỚI TỪ KHÓA (DẠNG PILL GỌN GÀNG, TIẾT KIỆM KHÔNG GIAN) -->
      {#if searchResults.length > 1}
        <div class="bg-white dark:bg-[#1E1F20] rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-[#37393B] shadow-xs space-y-2.5">
          <div class="flex items-center justify-between">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#8E918F]">
              Gợi ý từ vựng liên quan ({searchResults.length})
            </h4>
          </div>
          <div class="flex flex-wrap gap-2 pt-0.5">
            {#each searchResults as r}
              <button
                onclick={() => selectWord(r)}
                class={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border shadow-2xs active:scale-95 ${
                  currentWord?.id === r.id
                    ? 'bg-rose-500 text-white border-rose-600 shadow-xs'
                    : 'bg-slate-50 dark:bg-[#282A2C] text-slate-700 dark:text-[#E3E3E3] border-slate-200 dark:border-[#37393B] hover:border-rose-300 dark:hover:border-rose-800'
                }`}
                title={`${r.viet} [${r.pinyin}]`}
              >
                <span>{r.hanzi}</span>
                <span class={currentWord?.id === r.id ? 'text-white/80 text-[11px]' : 'text-rose-600 dark:text-rose-400 text-[11px]'}>
                  [{r.pinyin}]
                </span>
                <span class={`text-[9px] px-1 py-0.2 rounded-full font-black ${
                  currentWord?.id === r.id ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-[#37393B] text-slate-600 dark:text-[#C4C7C5]'
                }`}>
                  H{r.hskLevel}
                </span>
              </button>
            {/each}
          </div>
        </div>
      {/if}

    </div>

    <!-- ================= CỘT PHẢI (COL-SPAN-4): BẮT ĐẦU NGAY TỪ HÀNG TRÊN CÙNG SÁT SEARCH BAR ================= -->
    <div class="lg:col-span-4 space-y-4">
      {#if currentWord}
        <!-- KHỐI ẢNH MINH HỌA -->
        <div class="bg-white dark:bg-[#1E1F20] rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-[#37393B] shadow-xs space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#8E918F] flex items-center gap-1.5">
              <ImageSquare weight="duotone" class="w-4 h-4 text-rose-500" />
              Hình ảnh minh họa
            </h3>
          </div>

          <div class="w-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-[#18191A] relative border border-slate-100 dark:border-[#37393B] flex items-center justify-center min-h-[180px] max-h-[300px]">
            {#if currentWord.image}
              <img
                src={currentWord.image}
                alt={currentWord.viet}
                loading="lazy"
                class="w-full h-auto max-h-[280px] object-contain rounded-xl transition-transform duration-300"
              />
            {:else}
              <div class="w-full py-12 flex flex-col items-center justify-center text-slate-400">
                <ImageSquare class="w-10 h-10 mb-1" />
                <span class="text-xs font-medium">Chưa có ảnh</span>
              </div>
            {/if}
          </div>
        </div>

        <!-- KHUNG PHÂN TÍCH HÁN TỰ & TẬP VIẾT NÉT CHỮ -->
        <div bind:this={characterSectionEl}>
          <HanziStrokeWriter
            hanzi={currentWord.hanzi}
            strokeCount={currentWord.strokeCount}
            radical={currentWord.radical}
          />
        </div>
      {/if}
    </div>

  </div>

  <!-- Nút tròn Scroll To Top nổi bên phải khi cuộn xuống -->
  {#if showScrollTop}
    <button
      onclick={scrollToTop}
      aria-label="Cuộn lên đầu trang"
      class="fixed bottom-6 right-5 z-40 w-11 h-11 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-lg flex items-center justify-center transition-all duration-200 active:scale-90 hover:scale-105 border border-white/20 animate-fade-in"
      title="Cuộn lên đầu trang"
    >
      <ArrowUp weight="bold" class="w-5 h-5" />
    </button>
  {/if}
</main>

<LessonFilterModal />
<SettingsModal />

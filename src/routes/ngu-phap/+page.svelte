<script lang="ts">
  import Header from '#lib/components/Header.svelte';
  import GraduationCap from 'phosphor-svelte/lib/GraduationCap';
  import BookOpen from 'phosphor-svelte/lib/BookOpen';
  import Sparkle from 'phosphor-svelte/lib/Sparkle';
  import SettingsModal from '#lib/components/SettingsModal.svelte';
  import LessonFilterModal from '#lib/components/LessonFilterModal.svelte';

  const grammarPoints = [
    {
      title: '1. Trợ từ kết cấu 的 (de)',
      desc: 'Dùng biểu thị sở hữu hoặc bổ ngữ quan hệ cho danh từ trung tâm.',
      example: '这是我的书。 (Đây là sách của tôi.)',
      pinyin: 'Zhè shì wǒ de shū.'
    },
    {
      title: '2. Câu chữ 比 (bǐ) - So sánh hơn',
      desc: 'Cấu trúc: A + 比 + B + Tính từ / Phó từ.',
      example: '哥哥比我高。 (Anh trai cao hơn tôi.)',
      pinyin: 'Gēge bǐ wǒ gāo.'
    },
    {
      title: '3. Phó từ ngữ khí 就 (jiù) và 再 (zài)',
      desc: 'Biểu thị sự việc xảy ra sớm / lặp lại hành động trong tương lai.',
      example: '明天我们再去一次吧。 (Ngày mai chúng mình lại đi thêm một lần nữa nhé.)',
      pinyin: 'Míngtiān wǒmen zài qù yí cì ba.'
    },
    {
      title: '4. Cấu trúc diễn tả hành động đang tiếp diễn 着 (zhe)',
      desc: 'Động từ + 着 biểu thị trạng thái đang diễn ra hoặc tồn tại.',
      example: '门开着呢。 (Cửa đang mở đấy.)',
      pinyin: 'Mén kāi zhe ne.'
    },
    {
      title: '5. Cấu trúc Vì... Cho nên... 因为... 所以... (yīnwèi... suǒyǐ...)',
      desc: 'Liên từ chỉ nguyên nhân - kết quả quen thuộc trong HSK 2.',
      example: '因为下雨，所以我们没去。 (Vì trời mưa nên chúng tôi không đi.)',
      pinyin: 'Yīnwèi xià yǔ, suǒyǐ wǒmen méi qù.'
    }
  ];
</script>

<svelte:head>
  <title>Ngữ pháp HSK 2 | Ôn Tập HSK</title>
</svelte:head>

<Header />

<main class="flex-1 flex flex-col min-h-0 my-3 overflow-y-auto pr-1">
  <!-- Hero Section -->
  <div class="bg-purple-500/10 dark:bg-purple-500/20 border border-purple-200 dark:border-purple-900/50 rounded-3xl p-5 mb-4 flex items-center gap-4">
    <div class="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
      <GraduationCap weight="duotone" class="w-8 h-8" />
    </div>
    <div>
      <h1 class="text-lg md:text-xl font-black text-slate-900 dark:text-slate-100">
        Trọng Điểm Ngữ Pháp HSK 2
      </h1>
      <p class="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
        Tổng hợp toàn diện các mẫu câu then chốt thường gặp trong đề thi HSK.
      </p>
    </div>
  </div>

  <!-- Grammar Cards List -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
    {#each grammarPoints as item}
      <div class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-3xl p-4.5 shadow-xs hover:border-purple-300 dark:hover:border-purple-800 transition-all flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <Sparkle weight="duotone" class="w-4.5 h-4.5 text-purple-600 dark:text-purple-400 shrink-0" />
            <h2 class="text-sm md:text-base font-extrabold text-slate-900 dark:text-slate-100">
              {item.title}
            </h2>
          </div>
          <p class="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
            {item.desc}
          </p>
        </div>

        <div class="bg-purple-50/80 dark:bg-[#282A2C]/60 rounded-2xl p-3 border border-purple-100 dark:border-purple-900/40">
          <div class="text-sm font-bold text-purple-950 dark:text-purple-200 mb-0.5">
            {item.example}
          </div>
          <div class="text-xs font-medium text-purple-600 dark:text-purple-400">
            {item.pinyin}
          </div>
        </div>
      </div>
    {/each}
  </div>
</main>

<LessonFilterModal />
<SettingsModal />

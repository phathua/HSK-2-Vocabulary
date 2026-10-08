<script lang="ts">
  import Header from '#lib/components/Header.svelte';
  import Trophy from 'phosphor-svelte/lib/Trophy';
  import Medal from 'phosphor-svelte/lib/Medal';
  import Flame from 'phosphor-svelte/lib/Flame';
  import Star from 'phosphor-svelte/lib/Star';
  import SettingsModal from '#lib/components/SettingsModal.svelte';
  import LessonFilterModal from '#lib/components/LessonFilterModal.svelte';

  const leaders = [
    { rank: 1, name: 'Minh Tuấn (HSK 2)', score: '2,840 EXP', words: '300 từ', streak: '42 ngày', avatar: '🐼' },
    { rank: 2, name: 'Thanh Hằng', score: '2,610 EXP', words: '280 từ', streak: '35 ngày', avatar: '🦊' },
    { rank: 3, name: 'Bảo Long', score: '2,490 EXP', words: '265 từ', streak: '28 ngày', avatar: '🐯' },
    { rank: 4, name: 'Ngọc Lan', score: '2,180 EXP', words: '240 từ', streak: '19 ngày', avatar: '🐰' },
    { rank: 5, name: 'Hải Đăng', score: '1,950 EXP', words: '210 từ', streak: '14 ngày', avatar: '🦁' },
    { rank: 6, name: 'Bạn (Người học)', score: '1,680 EXP', words: '168 từ', streak: '8 ngày', avatar: '🐼', isUser: true }
  ];
</script>

<svelte:head>
  <title>Bảng Xếp Hạng | Ôn Tập HSK</title>
</svelte:head>

<Header />

<main class="flex-1 flex flex-col min-h-0 my-3 overflow-y-auto pr-1">
  <!-- Hero Section -->
  <div class="bg-amber-500/10 dark:bg-amber-500/20 border border-amber-200 dark:border-amber-900/50 rounded-3xl p-5 mb-4 flex items-center gap-4">
    <div class="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
      <Trophy weight="duotone" class="w-8 h-8" />
    </div>
    <div>
      <h1 class="text-lg md:text-xl font-black text-slate-900 dark:text-slate-100">
        Bảng Vinh Danh Top Học Viên
      </h1>
      <p class="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
        Cùng thi đua rèn luyện từ vựng mỗi ngày và giữ vững ngọn lửa chuỗi ngày học!
      </p>
    </div>
  </div>

  <!-- Leaderboard Top 3 Podium (Desktop & Mobile) -->
  <div class="grid grid-cols-3 gap-2.5 sm:gap-4 mb-4 items-end">
    <!-- Rank 2 -->
    <div class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-3xl p-3 sm:p-4 text-center flex flex-col items-center">
      <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-100 dark:bg-[#282A2C] flex items-center justify-center text-xl sm:text-2xl mb-1.5 shadow-2xs">
        {leaders[1].avatar}
      </div>
      <span class="w-5 h-5 rounded-full bg-slate-300 dark:bg-[#37393B] text-slate-800 dark:text-neutral-200 text-xs font-black flex items-center justify-center mb-1">
        2
      </span>
      <h2 class="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 truncate w-full">
        {leaders[1].name}
      </h2>
      <span class="text-[11px] sm:text-xs font-bold text-amber-600 dark:text-amber-400">
        {leaders[1].score}
      </span>
    </div>

    <!-- Rank 1 -->
    <div class="bg-amber-50 dark:bg-[#1B1B1B] border-2 border-amber-400 dark:border-amber-500/60 rounded-3xl p-4 sm:p-5 text-center flex flex-col items-center shadow-xs -translate-y-2">
      <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center text-2xl sm:text-3xl mb-1.5 shadow-sm">
        {leaders[0].avatar}
      </div>
      <span class="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-black flex items-center justify-center mb-1">
        👑
      </span>
      <h2 class="text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100 truncate w-full">
        {leaders[0].name}
      </h2>
      <span class="text-xs sm:text-sm font-black text-amber-600 dark:text-amber-400">
        {leaders[0].score}
      </span>
    </div>

    <!-- Rank 3 -->
    <div class="bg-white dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#282A2C] rounded-3xl p-3 sm:p-4 text-center flex flex-col items-center">
      <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-100 dark:bg-[#282A2C] flex items-center justify-center text-xl sm:text-2xl mb-1.5 shadow-2xs">
        {leaders[2].avatar}
      </div>
      <span class="w-5 h-5 rounded-full bg-amber-700/60 text-white text-xs font-black flex items-center justify-center mb-1">
        3
      </span>
      <h2 class="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 truncate w-full">
        {leaders[2].name}
      </h2>
      <span class="text-[11px] sm:text-xs font-bold text-amber-600 dark:text-amber-400">
        {leaders[2].score}
      </span>
    </div>
  </div>

  <!-- Detailed Table List -->
  <div class="space-y-2">
    {#each leaders as item}
      <div class={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
        item.isUser
          ? 'bg-blue-50/80 dark:bg-blue-950/30 border-blue-300 dark:border-blue-900/60 shadow-xs'
          : 'bg-white dark:bg-[#1B1B1B] border-slate-200 dark:border-[#282A2C]'
      }`}>
        <div class="flex items-center gap-3">
          <span class="w-6 font-black text-sm text-center text-slate-400 dark:text-slate-500">
            #{item.rank}
          </span>
          <span class="text-xl">{item.avatar}</span>
          <div>
            <div class="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>{item.name}</span>
              {#if item.isUser}
                <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-600 text-white">Bạn</span>
              {/if}
            </div>
            <div class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
              <span>{item.words}</span>
              <span>•</span>
              <span class="flex items-center gap-0.5 text-orange-600 dark:text-orange-400 font-bold">
                <Flame weight="fill" class="w-3.5 h-3.5" />
                {item.streak}
              </span>
            </div>
          </div>
        </div>

        <span class="text-sm font-black text-amber-600 dark:text-amber-400">
          {item.score}
        </span>
      </div>
    {/each}
  </div>
</main>

<LessonFilterModal />
<SettingsModal />

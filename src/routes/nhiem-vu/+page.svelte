<script lang="ts">
  import Header from '#lib/components/Header.svelte';
  import Target from 'phosphor-svelte/lib/Target';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
  import Circle from 'phosphor-svelte/lib/Circle';
  import Gift from 'phosphor-svelte/lib/Gift';
  import SettingsModal from '#lib/components/SettingsModal.svelte';
  import LessonFilterModal from '#lib/components/LessonFilterModal.svelte';

  const dailyQuests = [
    {
      id: 1,
      title: 'Học 20 từ mới mỗi ngày',
      desc: 'Hoàn thành 20 thẻ Flashcard hoặc Điền từ trong ngày hôm nay.',
      progress: '16/20',
      percent: 80,
      reward: '+50 EXP',
      done: false
    },
    {
      id: 2,
      title: 'Luyện phản xạ Trắc nghiệm',
      desc: 'Đạt tỉ lệ chính xác từ 85% trở lên trong 1 vòng trắc nghiệm.',
      progress: '1/1',
      percent: 100,
      reward: '+30 EXP',
      done: true
    },
    {
      id: 3,
      title: 'Luyện phát âm chuẩn Pinyin',
      desc: 'Ghi âm phát âm đúng ít nhất 10 từ vựng tiếng Trung.',
      progress: '7/10',
      percent: 70,
      reward: '+40 EXP',
      done: false
    },
    {
      id: 4,
      title: 'Duy trì chuỗi học liên tiếp (Streak 7 ngày)',
      desc: 'Mở ứng dụng và ôn luyện ít nhất 1 bài học mỗi ngày.',
      progress: '5/7 ngày',
      percent: 71,
      reward: '+100 EXP',
      done: false
    }
  ];
</script>

<svelte:head>
  <title>Nhiệm Vụ Hàng Ngày | Ôn Tập HSK</title>
</svelte:head>

<Header />

<main class="flex-1 flex flex-col min-h-0 my-3 overflow-y-auto pr-1">
  <!-- Hero Section -->
  <div class="bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-900/50 rounded-3xl p-5 mb-4 flex items-center gap-4">
    <div class="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
      <Target weight="duotone" class="w-8 h-8" />
    </div>
    <div>
      <h1 class="text-lg md:text-xl font-black text-slate-900 dark:text-slate-100">
        Nhiệm Vụ & Thành Tựu
      </h1>
      <p class="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
        Hoàn thành các mục tiêu mỗi ngày để duy trì thói quen và nhận điểm thưởng.
      </p>
    </div>
  </div>

  <!-- Quest List -->
  <div class="space-y-3.5">
    {#each dailyQuests as quest}
      <div class={`bg-white dark:bg-[#1B1B1B] border rounded-3xl p-5 shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        quest.done ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-950/20' : 'border-slate-200 dark:border-[#282A2C] hover:border-emerald-300'
      }`}>
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-1.5">
            {#if quest.done}
              <CheckCircle weight="fill" class="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            {:else}
              <Circle weight="bold" class="w-5 h-5 text-slate-400 shrink-0" />
            {/if}
            <h2 class={`text-sm md:text-base font-extrabold ${quest.done ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-slate-100'}`}>
              {quest.title}
            </h2>
          </div>
          <p class="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
            {quest.desc}
          </p>

          <!-- Progress Bar -->
          <div class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              class={`h-full rounded-full transition-all duration-300 ${quest.done ? 'bg-emerald-600' : 'bg-emerald-500'}`}
              style={`width: ${quest.percent}%`}
            ></div>
          </div>
          <div class="flex justify-between items-center text-xs font-bold text-slate-400 dark:text-slate-500 mt-1.5">
            <span>Tiến độ: {quest.progress}</span>
            <span>{quest.percent}%</span>
          </div>
        </div>

        <div class="flex items-center justify-between sm:flex-col sm:items-end gap-2 shrink-0">
          <span class="flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200">
            <Gift weight="duotone" class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            {quest.reward}
          </span>
          {#if quest.done}
            <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">Đã nhận quà</span>
          {:else}
            <span class="text-xs font-semibold text-slate-400">Đang tiến hành</span>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</main>

<LessonFilterModal />
<SettingsModal />

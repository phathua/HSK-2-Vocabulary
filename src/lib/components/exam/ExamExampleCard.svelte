<script lang="ts">
  import Lightbulb from 'phosphor-svelte/lib/Lightbulb';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
  import type { ExamExampleDefinition } from '#lib/data/examExamples';

  interface Props {
    example: ExamExampleDefinition;
    examCode: string;
  }

  let { example, examCode }: Props = $props();

  const correctAnswer = $derived(example.getAnswer(examCode));
</script>

<div
  class="bg-amber-50/40 dark:bg-[#1E1E1E] border-2 border-dashed border-amber-300/80 dark:border-amber-700/60 rounded-3xl p-4 sm:p-5 shadow-xs mb-4 select-none relative overflow-hidden"
>
  <!-- Card Header -->
  <div class="flex items-center justify-between gap-3 pb-3 border-b border-amber-200/80 dark:border-neutral-800 mb-3.5">
    <div class="flex items-center gap-2.5">
      <div class="h-8 px-2.5 rounded-xl bg-amber-500 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
        <span>VÍ DỤ</span>
      </div>
      <div>
        <h3 class="text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100">
          Câu Mẫu Hướng Dẫn (例如)
        </h3>
        <p class="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
          {example.partTitle}
        </p>
      </div>
    </div>

    <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-xs shrink-0 border border-amber-300/60 dark:border-amber-900/60">
      <span>Đáp án mẫu:</span>
      <strong class="font-black text-sm text-orange-600 dark:text-orange-400">{correctAnswer}</strong>
    </div>
  </div>

  <!-- Hướng dẫn làm bài -->
  <p class="text-xs text-slate-600 dark:text-neutral-300 font-medium italic mb-3">
    {example.instruction}
  </p>



  <!-- Nội dung câu mẫu -->
  <div class="p-3 sm:p-4 rounded-2xl bg-white/80 dark:bg-neutral-900/80 border border-amber-200/80 dark:border-neutral-800 space-y-3 mb-3.5">
    {#if example.dialogue}
      <div class="space-y-2">
        {#each example.dialogue as line}
          <div class="flex items-start gap-2 sm:gap-2.5">
            <span class="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 mt-0.5 {line.speaker === 'Nam' ? 'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300' : line.speaker === 'Nữ' ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300' : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'}">
              {line.speaker}
            </span>
            <div class="min-w-0 flex-1">
              <div class="text-sm sm:text-base font-serif font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {line.hanzi}
              </div>
              <div class="text-[11px] sm:text-xs font-mono text-amber-700 dark:text-amber-400 font-medium mt-0.5">
                {line.pinyin}
              </div>
              {#if line.viet}
                <div class="text-[11px] text-slate-500 dark:text-neutral-400 italic mt-0.5">
                  {line.viet}
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    {/if}

    {#if example.text}
      <div>
        <div class="text-sm sm:text-base font-serif font-bold text-slate-900 dark:text-slate-100 leading-snug">
          {example.text}
        </div>
        {#if example.pinyin}
          <div class="text-[11px] sm:text-xs font-mono text-amber-700 dark:text-amber-400 font-medium mt-0.5">
            {example.pinyin}
          </div>
        {/if}
        {#if example.viet}
          <div class="text-[11px] text-slate-500 dark:text-neutral-400 italic mt-0.5">
            {example.viet}
          </div>
        {/if}
      </div>
    {/if}

    {#if example.statementHanzi}
      <div class="pt-2 border-t border-amber-100 dark:border-neutral-800">
        <div class="text-xs sm:text-sm font-serif font-bold text-slate-800 dark:text-slate-200">
          {example.statementHanzi}
        </div>
        {#if example.statementPinyin}
          <div class="text-[10px] sm:text-xs font-mono text-amber-600 dark:text-amber-400">
            {example.statementPinyin}
          </div>
        {/if}
        {#if example.statementViet}
          <div class="text-[10px] text-slate-500 dark:text-neutral-400 italic">
            {example.statementViet}
          </div>
        {/if}
      </div>
    {/if}

    {#if example.questionText}
      <div class="pt-2 border-t border-amber-100 dark:border-neutral-800">
        <div class="text-xs sm:text-sm font-serif font-bold text-slate-900 dark:text-slate-100">
          问：{example.questionText}
        </div>
        {#if example.questionPinyin}
          <div class="text-[10px] sm:text-xs font-mono text-amber-600 dark:text-amber-400">
            Wèn: {example.questionPinyin}
          </div>
        {/if}
        {#if example.questionViet}
          <div class="text-[10px] text-slate-500 dark:text-neutral-400 italic">
            Hỏi: {example.questionViet}
          </div>
        {/if}
      </div>
    {/if}
  </div>

  <!-- Các lựa chọn câu ví dụ: Nổi bật đáp án đúng của ví dụ như trong đề thi -->
  {#if example.options && example.options.length > 0}
    <div class="space-y-1.5 mb-3.5">
      <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        Các lựa chọn & Đáp án mẫu:
      </div>
      <div class="grid {example.options.length <= 2 ? 'grid-cols-2' : example.options.length <= 3 ? 'grid-cols-3' : 'grid-cols-3 sm:grid-cols-6'} gap-2">
        {#each example.options as opt}
          {@const isThisCorrect = opt.letter === correctAnswer}
          <div
            class="p-2 sm:p-2.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all {isThisCorrect
              ? 'bg-orange-500 text-white shadow-sm ring-2 ring-orange-500/50 scale-102 font-bold'
              : 'bg-white/60 dark:bg-neutral-800/40 border border-slate-200/60 dark:border-neutral-800 text-slate-400 dark:text-neutral-500 opacity-60'}"
          >
            <div class="flex items-center gap-1 font-bold text-xs sm:text-sm">
              {#if isThisCorrect}
                <CheckCircle weight="fill" class="w-3.5 h-3.5 text-white" />
              {/if}
              <span>{opt.letter}</span>
            </div>
            {#if opt.text}
              <span class="text-[11px] font-serif mt-0.5 truncate max-w-full">
                {opt.text}
              </span>
            {/if}
            {#if opt.pinyin}
              <span class="text-[9px] font-mono opacity-80 truncate max-w-full">
                {opt.pinyin}
              </span>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Giải thích ngắn câu ví dụ -->
  <div class="flex items-start gap-1.5 text-[11px] sm:text-xs text-amber-800 dark:text-amber-300/90 font-medium">
    <Lightbulb weight="fill" class="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
    <span>{example.explanation}</span>
  </div>
</div>

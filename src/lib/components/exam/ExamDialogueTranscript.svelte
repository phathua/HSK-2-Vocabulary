<script lang="ts">
  import InteractiveChineseText from './InteractiveChineseText.svelte';
  import InteractivePinyinText from './InteractivePinyinText.svelte';

  interface Props {
    script: string;
    pinyin?: string | null;
    viet?: string | null;
  }

  let { script, pinyin = '', viet = '' }: Props = $props();

  interface DialogueLineItem {
    speakerLabel: string;
    role: 'female' | 'male' | 'question' | 'narrator';
    hanzi: string;
    pinyin?: string;
    viet?: string;
  }

  const parsedLines = $derived.by<DialogueLineItem[]>(() => {
    if (!script) return [];

    const rawScriptLines = script.split('\n').map(l => l.trim()).filter(Boolean);

    // Pinyin lines (sometimes separated by \n or /)
    let rawPinyinLines: string[] = [];
    if (pinyin) {
      if (pinyin.includes('\n')) {
        rawPinyinLines = pinyin.split('\n').map(l => l.trim()).filter(Boolean);
      } else if (pinyin.includes(' / ')) {
        rawPinyinLines = pinyin.split(' / ').map(l => l.trim()).filter(Boolean);
      } else {
        rawPinyinLines = [pinyin.trim()];
      }
    }

    // Viet lines
    let rawVietLines: string[] = [];
    if (viet) {
      rawVietLines = viet.split('\n').map(l => l.trim()).filter(Boolean);
    }

    return rawScriptLines.map((sLine, idx) => {
      let role: 'female' | 'male' | 'question' | 'narrator' = 'narrator';
      let speakerLabel = '';
      let cleanHanzi = sLine;

      const match = sLine.match(/^\[(男|女|问|老师|医生|服务员|妈妈|爸爸|同学)[：:]?\][：:]?\s*([\s\S]*)$/)
        || sLine.match(/^(男|女|问|老师|医生|服务员|妈妈|爸爸|同学)[：:]\s*([\s\S]*)$/);
      if (match) {
        const rawSpk = match[1];
        cleanHanzi = match[2].trim();
        if (rawSpk === '女') {
          role = 'female';
          speakerLabel = 'Nữ';
        } else if (rawSpk === '男') {
          role = 'male';
          speakerLabel = 'Nam';
        } else if (rawSpk === '问') {
          role = 'question';
          speakerLabel = 'Hỏi';
        } else {
          role = 'narrator';
          speakerLabel = rawSpk;
        }
      } else if (/^\[?问[：:]?\]?[：:]?\s*/i.test(sLine)) {
        role = 'question';
        speakerLabel = 'Hỏi';
        cleanHanzi = sLine.replace(/^\[?问[：:]?\]?[：:]?\s*/, '').trim();
      }

      // Clean pinyin prefix: [Nán:] / [Nán] / Nán: / etc.
      let cleanPinyin = '';
      if (rawPinyinLines[idx]) {
        cleanPinyin = rawPinyinLines[idx]
          .replace(/^\[(Nǚ|Nán|Wèn|Nv|Nan|Wen)[：:]?\][：:]?\s*/i, '')
          .replace(/^(Nǚ|Nán|Wèn|Nv|Nan|Wen)[：:]\s*/i, '')
          .trim();
      }

      // Clean viet prefix: [Nam:] / [Nam] / Nam: / etc.
      let cleanViet = '';
      if (rawVietLines[idx]) {
        cleanViet = rawVietLines[idx]
          .replace(/^\[(Nữ|Nam|Hỏi|Lời đọc|Câu hỏi)[：:]?\][：:]?\s*/i, '')
          .replace(/^(Nữ|Nam|Hỏi|Lời đọc|Câu hỏi)[：:]\s*/i, '')
          .trim();
      }

      return {
        role,
        speakerLabel,
        hanzi: cleanHanzi,
        pinyin: cleanPinyin,
        viet: cleanViet
      };
    });
  });
</script>

<div class="space-y-2 select-text">
  {#each parsedLines as item, i (i)}
    <div class="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-2xl bg-white/70 dark:bg-[#1E1E1E]/80 border border-slate-200/80 dark:border-neutral-800 transition-colors shadow-2xs">
      <!-- Badge phân loại giọng nói / câu hỏi -->
      <div class="shrink-0 mt-0.5 select-none">
        {#if item.role === 'female'}
          <span class="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-300/60 dark:border-rose-900/60 shadow-2xs">
            {item.speakerLabel || 'Nữ'}
          </span>
        {:else if item.role === 'male'}
          <span class="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider bg-sky-100 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border border-sky-300/60 dark:border-sky-900/60 shadow-2xs">
            {item.speakerLabel || 'Nam'}
          </span>
        {:else if item.role === 'question'}
          <span class="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300/60 dark:border-amber-900/60 shadow-2xs">
            {item.speakerLabel || 'Hỏi'}
          </span>
        {:else if item.speakerLabel}
          <span class="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-700 shadow-2xs">
            {item.speakerLabel}
          </span>
        {:else}
          <span class="inline-flex items-center px-1.5 py-0.5 rounded-lg text-[10px] font-bold text-slate-400 dark:text-neutral-500 bg-slate-50 dark:bg-neutral-800/50 border border-slate-200/50 dark:border-neutral-700/50">
            •
          </span>
        {/if}
      </div>

      <!-- Nội dung từng câu: Pinyin + Chữ Hán + Bản dịch tiếng Việt -->
      <div class="flex-1 min-w-0 space-y-0.5">
        {#if item.pinyin}
          <div class="text-[11px] sm:text-xs text-slate-400 dark:text-neutral-400 font-sans tracking-wide leading-tight">
            <InteractivePinyinText pinyin={item.pinyin} />
          </div>
        {/if}

        <div class="text-sm sm:text-base font-bold font-serif text-slate-900 dark:text-[#E3E3E3] leading-snug">
          <InteractiveChineseText text={item.hanzi} />
        </div>

        {#if item.viet}
          <div class="text-xs sm:text-sm font-medium text-slate-600 dark:text-neutral-300 leading-snug pt-1 border-t border-slate-100 dark:border-neutral-800/80 mt-1">
            {item.viet}
          </div>
        {/if}
      </div>
    </div>
  {/each}
</div>

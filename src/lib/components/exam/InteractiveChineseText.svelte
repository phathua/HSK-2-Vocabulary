<script lang="ts">
  import { examDictState } from '#lib/state/examDictState.svelte';

  interface Props {
    text?: string;
    pinyin?: string;
    class?: string;
  }

  let { text = '', pinyin = '', class: className = '' }: Props = $props();

  interface Token {
    word: string;
    isWord: boolean;
    isBlank?: boolean;
  }

  // Tách từ chữ Hán để gán tương tác tra từ điển
  const tokens = $derived.by((): Token[] => {
    if (!text) return [];

    // Kiểm tra nếu có chỗ trống điền từ ( )
    if (text.includes('( )') || text.includes('（ ）')) {
      const parts = text.split(/[\(（]\s*[\)）]/);
      const res: Token[] = [];
      parts.forEach((part, idx) => {
        if (part) {
          res.push(...segmentWords(part));
        }
        if (idx < parts.length - 1) {
          res.push({ word: '(    )', isWord: false, isBlank: true });
        }
      });
      return res;
    }

    return segmentWords(text);
  });

  function segmentWords(str: string): Token[] {
    if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
      try {
        const segmenter = new (Intl as any).Segmenter('zh', { granularity: 'word' });
        const segs = Array.from(segmenter.segment(str)) as Array<{ segment: string; isWordLike?: boolean }>;
        return segs.map((s) => ({
          word: s.segment,
          isWord: /[\u4e00-\u9fa5]/.test(s.segment)
        }));
      } catch {}
    }

    // Fallback: Tách từng ký tự nếu không hỗ trợ Segmenter
    return str.split('').map((char) => ({
      word: char,
      isWord: /[\u4e00-\u9fa5]/.test(char)
    }));
  }

  function handleInteraction(e: MouseEvent, word: string) {
    e.stopPropagation();
    const el = e.currentTarget as HTMLElement;
    if (el && typeof window !== 'undefined') {
      const rect = el.getBoundingClientRect();
      // Chỉ kích hoạt tra từ nếu từ đang nằm trong viewport
      if (rect.bottom >= 0 && rect.top <= window.innerHeight && rect.right >= 0 && rect.left <= window.innerWidth) {
        examDictState.show(word, rect);
      }
    }
  }
</script>

<span class="inline leading-normal {className}">
  {#each tokens as token}
    {#if token.isBlank}
      <span class="inline-block mx-1.5 px-3 py-0.5 border-b-2 border-orange-500 text-orange-600 dark:text-orange-400 font-mono text-sm bg-orange-50 dark:bg-orange-950/40 rounded align-middle">
        ( &nbsp;&nbsp;&nbsp;&nbsp; )
      </span>
    {:else if token.isWord}
      <span
        role="button"
        tabindex="0"
        onmouseenter={(e) => handleInteraction(e, token.word)}
        onmouseleave={() => examDictState.scheduleHide(200)}
        onclick={(e) => handleInteraction(e, token.word)}
        onkeydown={(e) => {
          if (e.key === 'Enter') handleInteraction(e as any, token.word);
        }}
        class="inline cursor-pointer hover:text-orange-600 dark:hover:text-orange-400 hover:underline underline-offset-4 decoration-orange-400/80 transition-colors rounded-xs px-0.5"
        title="Bấm hoặc rê chuột để tra từ điển"
      >{token.word}</span>
    {:else}
      <span>{token.word}</span>
    {/if}
  {/each}
</span>

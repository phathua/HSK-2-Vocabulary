<script lang="ts">
  import { examDictState } from '#lib/state/examDictState.svelte';

  interface Props {
    pinyin?: string;
    class?: string;
  }

  let { pinyin = '', class: className = '' }: Props = $props();

  // Tách các từ pinyin giữ nguyên khoảng trắng và dấu câu
  const tokens = $derived.by(() => {
    if (!pinyin) return [];
    return pinyin.split(/([a-zA-Zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ’'\-]+)/).filter(Boolean);
  });

  function handleInteraction(e: MouseEvent, pyWord: string) {
    e.stopPropagation();
    const el = e.currentTarget as HTMLElement;
    if (el && typeof window !== 'undefined') {
      const rect = el.getBoundingClientRect();
      // Chỉ tra từ nếu đang hiển thị trong màn hình
      if (rect.bottom >= 0 && rect.top <= window.innerHeight && rect.right >= 0 && rect.left <= window.innerWidth) {
        examDictState.show(pyWord, rect);
      }
    }
  }
</script>

<span class="inline leading-normal {className}">
  {#each tokens as token}
    {#if /^[a-zA-Zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ’'\-]+$/.test(token)}
      <span
        role="button"
        tabindex="0"
        onmouseenter={(e) => handleInteraction(e, token)}
        onmouseleave={() => examDictState.scheduleHide(200)}
        onclick={(e) => handleInteraction(e, token)}
        onkeydown={(e) => {
          if (e.key === 'Enter') handleInteraction(e as any, token);
        }}
        class="inline cursor-pointer hover:text-orange-600 dark:hover:text-orange-400 hover:underline underline-offset-4 decoration-orange-400/80 transition-colors rounded-xs px-0.5"
        title="Bấm hoặc rê chuột để tra từ điển pinyin"
      >{token}</span>
    {:else}
      <span>{token}</span>
    {/if}
  {/each}
</span>

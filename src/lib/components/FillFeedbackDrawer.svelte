<script lang="ts">
  import AnswerFeedbackDrawer from './AnswerFeedbackDrawer.svelte';
  import { appState } from '#lib/state/appState.svelte';

  const isZhToVi = $derived(appState.direction === 'zh_to_vi');
  const isSkipped = $derived(appState.fillAnswered && appState.fillFeedback?.type === 'skip');
  const hasWrongSlots = $derived(
    appState.fillWordChunks.some((c) => c.slots.some((s) => s.userChar !== s.char))
  );
  const isWrong = $derived(
    appState.fillAnswered && (appState.fillFeedback?.type === 'wrong' || (!isSkipped && hasWrongSlots))
  );
  const isCorrect = $derived(appState.fillAnswered && !isSkipped && !isWrong);
</script>

{#if appState.currentFillItem}
  <AnswerFeedbackDrawer
    isAnswered={appState.fillAnswered}
    {isCorrect}
    {isWrong}
    {isSkipped}
    correctAnswerText={isZhToVi ? appState.currentFillItem.viet : appState.currentFillItem.pinyin}
    extraInfoText={!isZhToVi ? appState.currentFillItem.viet : `${appState.currentFillItem.hanzi} (${appState.currentFillItem.pinyin})`}
    onNext={() => appState.nextFillItem()}
  />
{/if}

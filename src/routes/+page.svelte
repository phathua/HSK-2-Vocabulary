<script lang="ts">
  import { onMount } from 'svelte';
  import { appState } from '#lib/state/appState.svelte';
  import Header from '#lib/components/Header.svelte';
  import ModeSwitch from '#lib/components/ModeSwitch.svelte';
  import FillWordCard from '#lib/components/FillWordCard.svelte';
  import MultipleChoiceQuizCard from '#lib/components/MultipleChoiceQuizCard.svelte';
  import FlashcardDeck from '#lib/components/FlashcardDeck.svelte';
  import PronounceCard from '#lib/components/PronounceCard.svelte';
  import LessonFilterModal from '#lib/components/LessonFilterModal.svelte';
  import SettingsModal from '#lib/components/SettingsModal.svelte';

  onMount(() => {
    appState.ensureInitialized();
  });
</script>

<Header />
<ModeSwitch />

{#if appState.activeTab === 'fill'}
  <FillWordCard />
{:else if appState.activeTab === 'quiz'}
  <MultipleChoiceQuizCard />
{:else if appState.activeTab === 'flash'}
  <FlashcardDeck />
{:else if appState.activeTab === 'speech'}
  <PronounceCard />
{/if}

<LessonFilterModal />
<SettingsModal />

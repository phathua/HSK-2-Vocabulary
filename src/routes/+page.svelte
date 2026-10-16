<script lang="ts">
  import { onMount } from 'svelte';
  import { appState } from '#lib/state/appState.svelte';
  import { savedSessionState } from '#lib/state/savedSessionState.svelte';
  import Header from '#lib/components/Header.svelte';
  import ModeSwitch from '#lib/components/ModeSwitch.svelte';
  import FillWordCard from '#lib/components/FillWordCard.svelte';
  import MultipleChoiceQuizCard from '#lib/components/MultipleChoiceQuizCard.svelte';
  import FlashcardDeck from '#lib/components/FlashcardDeck.svelte';
  import PronounceCard from '#lib/components/PronounceCard.svelte';
  import LessonFilterModal from '#lib/components/LessonFilterModal.svelte';
  import SettingsModal from '#lib/components/SettingsModal.svelte';
  import SaveSessionModal from '#lib/components/SaveSessionModal.svelte';
  import SavedSessionsListModal from '#lib/components/SavedSessionsListModal.svelte';

  onMount(() => {
    appState.ensureInitialized();
    savedSessionState.checkAutoResume();
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
<SaveSessionModal />
<SavedSessionsListModal />


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
  import UpdateModal from '#lib/components/UpdateModal.svelte';

  async function checkForUpdates() {
    if (typeof window === 'undefined') return;
    try {
      const dismissed = sessionStorage.getItem('dismissUpdate');
      if (dismissed === 'true') return;

      const res = await fetch('/api/updates');
      const data = await res.json();
      if (!data.success || !data.version) return;

      const installed = localStorage.getItem('hsk2_installed_version') || '1.0.0';
      if (data.version !== installed) {
        // Có bản cập nhật mới
        appState.updateModalOpen = true;
      }
    } catch {}
  }

  onMount(() => {
    appState.ensureInitialized();
    // Tự động kiểm tra bản cập nhật mới sau khi app tải xong 1.5s
    setTimeout(() => {
      checkForUpdates();
    }, 1500);
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
<UpdateModal />

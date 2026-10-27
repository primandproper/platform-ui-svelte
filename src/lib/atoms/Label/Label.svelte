<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    for?: string;
    class?: string;
    children?: Snippet;
  }

  let { for: forId, class: className = '', children }: Props = $props();
</script>

<label for={forId} class="label {className}" data-part="label">
  {#if children}
    {@render children()}
  {/if}
</label>

<style>
  @layer platform-ui {
    .label {
      display: block;
      margin-bottom: var(--pp-space-xs);
      font-weight: var(--pp-font-weight-medium);
      font-family: var(--pp-font-sans);
      color: var(--pp-color-text);
    }
  }
</style>

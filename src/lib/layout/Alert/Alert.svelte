<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    variant?: 'error' | 'info';
    class?: string;
    children?: Snippet;
  }

  let { variant = 'info', class: className = '', children }: Props = $props();
</script>

<div class="alert alert--{variant} {className}" role="alert" data-part="alert" data-variant={variant}>
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  @layer platform-ui {
    .alert {
      padding: var(--pp-space-md);
      border-radius: var(--pp-radius-sm);
      margin-bottom: var(--pp-space-md);
      font-family: var(--pp-font-sans);
      box-shadow: var(--pp-shadow-sm);
    }

    .alert--error {
      color: var(--pp-color-error);
      background: var(--pp-color-error-muted);
      border: 1px solid var(--pp-color-error);
    }

    .alert--info {
      color: var(--pp-color-text);
      background: var(--pp-color-surface-alt);
      border: 1px solid var(--pp-color-border);
    }
  }
</style>

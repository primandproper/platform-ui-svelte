<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    /** Visual style: body (default), muted, small */
    variant?: 'body' | 'muted' | 'small';
    /** Optional class for layout */
    class?: string;
    children?: Snippet;
  }

  let { variant = 'body', class: className = '', children }: Props = $props();
</script>

<p class="text text--{variant} {className}" data-part="text" data-variant={variant}>
  {#if children}
    {@render children()}
  {/if}
</p>

<style>
  @layer platform-ui {
    .text {
      font-family: var(--pp-font-sans);
      line-height: var(--pp-line-height-normal);
      margin: 0 0 1em;
    }
    .text:last-child {
      margin-bottom: 0;
    }
    .text--body {
      font-size: var(--pp-font-size-base);
      color: var(--pp-color-text);
    }
    .text--muted {
      font-size: var(--pp-font-size-sm);
      color: var(--pp-color-text-muted);
    }
    .text--small {
      font-size: var(--pp-font-size-sm);
      color: var(--pp-color-text);
    }
  }
</style>

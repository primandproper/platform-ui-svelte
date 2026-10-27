<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    href: string;
    class?: string;
    children?: Snippet;
  }

  let { href, class: className = '', children }: Props = $props();
</script>

<a {href} class="link {className}" data-part="link">
  {#if children}
    {@render children()}
  {/if}
</a>

<style>
  @layer platform-ui {
    .link {
      color: var(--pp-color-primary);
      text-decoration: none;
      font-family: var(--pp-font-sans);
      transition:
        color var(--pp-transition-fast),
        text-decoration-color var(--pp-transition-fast);
    }

    .link:hover {
      text-decoration: underline;
    }
  }
</style>

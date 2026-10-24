<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    /** Heading level 1–6; determines tag and default size */
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    /** Optional class for layout/spacing */
    class?: string;
    children?: Snippet;
  }

  let { level = 1, class: className = '', children }: Props = $props();

  const Tag = $derived(`h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6');
</script>

<svelte:element this={Tag} class="heading heading--{level} {className}" data-part="heading" data-level={level}>
  {#if children}
    {@render children()}
  {/if}
</svelte:element>

<style>
  @layer platform-ui {
    .heading {
      font-family: var(--pp-font-sans);
      font-weight: var(--pp-font-weight-semibold);
      line-height: var(--pp-line-height-tight);
      color: var(--pp-color-text);
      margin: 0 0 0.5em;
    }
    .heading--1 {
      font-size: var(--pp-font-size-3xl);
    }
    .heading--2 {
      font-size: var(--pp-font-size-2xl);
    }
    .heading--3 {
      font-size: var(--pp-font-size-xl);
    }
    .heading--4 {
      font-size: var(--pp-font-size-lg);
    }
    .heading--5 {
      font-size: var(--pp-font-size-base);
    }
    .heading--6 {
      font-size: var(--pp-font-size-sm);
    }
  }
</style>

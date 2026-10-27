<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    title?: string;
    collapsible?: boolean;
    expanded?: boolean;
    class?: string;
    /** Replaces the header's contents (title and chevron); the header itself, and its toggle, stay. */
    header?: Snippet<[{ title: string | undefined; expanded: boolean }]>;
    children?: Snippet;
  }

  let {
    title,
    collapsible = false,
    expanded = $bindable(true),
    class: className = '',
    header,
    children,
  }: Props = $props();
</script>

<div
  class="card {className}"
  data-part="card"
  data-collapsible={collapsible || undefined}
  data-expanded={!collapsible || expanded ? true : undefined}
>
  {#if title || header}
    {#if collapsible}
      <button
        type="button"
        class="card-header card-header--clickable"
        data-part="card-header"
        aria-expanded={expanded}
        onclick={() => (expanded = !expanded)}
      >
        {#if header}
          {@render header({ title, expanded })}
        {:else}
          <span class="card-title" data-part="card-title">{title}</span>
          <span class="card-chevron" data-part="card-chevron" aria-hidden="true">{expanded ? '▼' : '▶'}</span>
        {/if}
      </button>
    {:else}
      <div class="card-header" data-part="card-header">
        {#if header}
          {@render header({ title, expanded })}
        {:else}
          <span class="card-title" data-part="card-title">{title}</span>
        {/if}
      </div>
    {/if}
  {/if}
  {#if !collapsible || expanded}
    <div class="card-body" data-part="card-body">
      {#if children}
        {@render children()}
      {/if}
    </div>
  {/if}
</div>

<style>
  @layer platform-ui {
    .card {
      border: 1px solid var(--pp-color-border);
      border-radius: var(--pp-radius-sm);
      background: var(--pp-color-surface);
      overflow: hidden;
      box-shadow: var(--pp-shadow-sm);
    }

    .card-header {
      width: 100%;
      padding: var(--pp-space-md);
      border: none;
      border-bottom: 1px solid var(--pp-color-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--pp-color-surface-alt);
      transition: background var(--pp-transition-fast);
      font: inherit;
      text-align: left;
      cursor: default;
    }

    .card-header--clickable {
      cursor: pointer;
    }

    .card-header--clickable:hover {
      background: var(--pp-color-border);
    }

    .card-title {
      font-weight: var(--pp-font-weight-medium);
      font-size: 1rem;
    }

    .card-chevron {
      font-size: 0.75rem;
      color: var(--pp-color-text-muted);
    }

    .card-body {
      padding: var(--pp-space-md);
    }
  }
</style>

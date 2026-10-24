<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    id?: string;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'default';
    disabled?: boolean;
    class?: string;
    onclick?: (e: MouseEvent) => void;
    children?: Snippet;
  }

  let {
    id,
    type = 'button',
    variant = 'primary',
    disabled = false,
    class: className = '',
    onclick,
    children,
  }: Props = $props();
</script>

<button
  {id}
  {type}
  {disabled}
  {onclick}
  class="btn btn--{variant} {className}"
  data-part="button"
  data-variant={variant}
>
  {#if children}
    {@render children()}
  {/if}
</button>

<style>
  @layer platform-ui {
    .btn {
      padding: var(--pp-space-sm) var(--pp-space-md);
      border: none;
      border-radius: var(--pp-radius-sm);
      cursor: pointer;
      font-family: var(--pp-font-sans);
      font-weight: var(--pp-font-weight-medium);
      box-shadow: var(--pp-shadow-sm);
      transition:
        background var(--pp-transition-fast),
        box-shadow var(--pp-transition-fast);
    }

    .btn:focus-visible {
      outline: none;
      box-shadow: var(--pp-shadow-focus);
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn--primary {
      background: var(--pp-color-primary);
      color: var(--pp-color-surface);
    }

    .btn--primary:hover:not(:disabled) {
      background: var(--pp-color-primary-hover);
    }

    .btn--default {
      background: var(--pp-color-surface-alt);
      color: var(--pp-color-text);
      border: 1px solid var(--pp-color-border);
    }

    .btn--default:hover:not(:disabled) {
      background: var(--pp-color-border);
    }
  }
</style>

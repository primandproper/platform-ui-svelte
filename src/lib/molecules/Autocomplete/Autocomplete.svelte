<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    id?: string;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    class?: string;
    dataTestId?: string;
    suggestions?: { id: string; label: string }[];
    loading?: boolean;
    onInput?: (value: string) => void;
    onSelect?: (item: { id: string; label: string }) => void;
    onBlur?: () => void;
    /** Replaces how each suggestion renders inside its option. */
    option?: Snippet<[{ item: { id: string; label: string }; focused: boolean }]>;
  }

  let {
    id,
    value = $bindable(''),
    placeholder,
    disabled = false,
    required = false,
    class: className = '',
    dataTestId,
    suggestions = [],
    loading = false,
    onInput,
    onSelect,
    onBlur,
    option,
  }: Props = $props();

  let open = $state(false);
  let focusedIndex = $state(-1);

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    value = target.value;
    open = true;
    focusedIndex = -1;
    onInput?.(target.value);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!open || suggestions.length === 0) {
      if (e.key === 'Escape') open = false;
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusedIndex = Math.min(focusedIndex + 1, suggestions.length - 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusedIndex = Math.max(focusedIndex - 1, 0);
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      select(suggestions[focusedIndex]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      open = false;
    }
  }

  function select(item: { id: string; label: string }) {
    value = item.label;
    open = false;
    focusedIndex = -1;
    onSelect?.(item);
  }

  function handleBlur() {
    setTimeout(() => {
      open = false;
      focusedIndex = -1;
      onBlur?.();
    }, 150);
  }
</script>

<div class="autocomplete-wrapper" data-part="autocomplete" data-open={open || undefined}>
  <input
    {id}
    type="text"
    {placeholder}
    {required}
    {disabled}
    class="autocomplete-input {className}"
    data-part="autocomplete-input"
    bind:value
    oninput={handleInput}
    onkeydown={handleKeydown}
    onfocus={() => (open = true)}
    onblur={handleBlur}
    autocomplete="off"
    role="combobox"
    aria-expanded={open}
    aria-autocomplete="list"
    aria-controls="autocomplete-list-{id ?? 'default'}"
    data-testid={dataTestId}
  />
  {#if loading}
    <span class="autocomplete-loading" data-part="autocomplete-loading" aria-hidden="true">...</span>
  {/if}
  {#if open && (suggestions.length > 0 || loading)}
    <ul id="autocomplete-list-{id ?? 'default'}" class="autocomplete-list" data-part="autocomplete-list" role="listbox">
      {#each suggestions as item, i (item.id)}
        <li
          role="option"
          aria-selected={i === focusedIndex}
          class="autocomplete-option"
          class:autocomplete-option--focused={i === focusedIndex}
          data-part="autocomplete-option"
          data-focused={i === focusedIndex || undefined}
          onmousedown={(e) => {
            e.preventDefault();
            select(item);
          }}
        >
          {#if option}
            {@render option({ item, focused: i === focusedIndex })}
          {:else}
            {item.label}
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  @layer platform-ui {
    .autocomplete-wrapper {
      position: relative;
      width: 100%;
    }

    .autocomplete-input {
      width: 100%;
      padding: var(--pp-space-sm);
      border: 1px solid var(--pp-color-border);
      border-radius: var(--pp-radius-sm);
      font-family: var(--pp-font-sans);
      font-size: var(--pp-font-size-base);
      color: var(--pp-color-text);
      box-shadow: var(--pp-shadow-sm);
      transition:
        border-color var(--pp-transition-fast),
        box-shadow var(--pp-transition-fast);
    }

    .autocomplete-input::placeholder {
      color: var(--pp-color-text-muted);
    }

    .autocomplete-input:focus {
      outline: none;
      border-color: var(--pp-color-primary);
      box-shadow: 0 0 0 2px var(--pp-color-primary-muted);
    }

    .autocomplete-loading {
      position: absolute;
      right: var(--pp-space-sm);
      top: 50%;
      transform: translateY(-50%);
      color: var(--pp-color-text-muted);
      font-size: 0.875rem;
    }

    .autocomplete-list {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin: 0;
      padding: 0;
      list-style: none;
      border: 1px solid var(--pp-color-border);
      border-top: none;
      border-radius: 0 0 var(--pp-radius-sm) var(--pp-radius-sm);
      background: var(--pp-color-surface);
      max-height: 12rem;
      overflow-y: auto;
      z-index: 50;
      box-shadow: var(--pp-shadow-md);
    }

    .autocomplete-option {
      padding: var(--pp-space-sm) var(--pp-space-md);
      cursor: pointer;
      font-family: var(--pp-font-sans);
      font-size: 1rem;
    }

    .autocomplete-option:hover,
    .autocomplete-option--focused {
      background: var(--pp-color-surface-alt);
    }
  }
</style>

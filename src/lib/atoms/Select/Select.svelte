<script lang="ts">
  interface Option {
    value: string;
    label: string;
  }

  interface Props {
    id?: string;
    name?: string;
    value?: string;
    options: Option[];
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    class?: string;
  }

  let {
    id,
    name,
    value = $bindable(''),
    options,
    placeholder,
    disabled = false,
    required = false,
    class: className = '',
  }: Props = $props();
</script>

<select {id} {name} {required} {disabled} class="select-input {className}" data-part="select" bind:value>
  {#if placeholder}
    <option value="" disabled>{placeholder}</option>
  {/if}
  {#each options as opt (opt.value)}
    <option value={opt.value}>{opt.label}</option>
  {/each}
</select>

<style>
  @layer platform-ui {
    .select-input {
      width: 100%;
      padding: var(--pp-space-sm);
      border: 1px solid var(--pp-color-border);
      border-radius: var(--pp-radius-sm);
      font-family: var(--pp-font-sans);
      font-size: var(--pp-font-size-base);
      color: var(--pp-color-text);
      background: var(--pp-color-surface);
      cursor: pointer;
      box-shadow: var(--pp-shadow-sm);
      transition:
        border-color var(--pp-transition-fast),
        box-shadow var(--pp-transition-fast);
    }

    .select-input:focus {
      outline: none;
      border-color: var(--pp-color-primary);
      box-shadow: 0 0 0 2px var(--pp-color-primary-muted);
    }

    .select-input:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
</style>

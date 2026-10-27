<script lang="ts">
  interface Props {
    id?: string;
    name?: string;
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    class?: string;
    dataTestId?: string;
  }

  let {
    id,
    name,
    value = $bindable(0),
    min,
    max,
    step = 1,
    placeholder,
    disabled = false,
    required = false,
    class: className = '',
    dataTestId,
  }: Props = $props();

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    const parsed = parseFloat(target.value);
    if (!isNaN(parsed)) {
      value = parsed;
    }
  }
</script>

<input
  {id}
  {name}
  type="number"
  {min}
  {max}
  {step}
  {placeholder}
  {required}
  {disabled}
  class="number-input {className}"
  data-part="number-input"
  bind:value
  oninput={handleInput}
  data-testid={dataTestId}
/>

<style>
  @layer platform-ui {
    .number-input {
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

    .number-input::placeholder {
      color: var(--pp-color-text-muted);
    }

    .number-input:focus {
      outline: none;
      border-color: var(--pp-color-primary);
      box-shadow: 0 0 0 2px var(--pp-color-primary-muted);
    }
  }
</style>

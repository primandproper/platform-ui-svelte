<script lang="ts">
  interface Props {
    id?: string;
    name?: string;
    type?: string;
    value?: string;
    placeholder?: string;
    required?: boolean;
    minlength?: number;
    autocomplete?: string;
    disabled?: boolean;
    class?: string;
    dataTestId?: string;
    oninput?: (e: Event & { currentTarget: HTMLInputElement }) => void;
  }

  let {
    id,
    name,
    type = 'text',
    value = $bindable(''),
    placeholder,
    required = false,
    minlength,
    autocomplete,
    disabled = false,
    class: className = '',
    dataTestId,
    oninput,
  }: Props = $props();
</script>

<input
  {id}
  {name}
  {type}
  {placeholder}
  {required}
  {minlength}
  autocomplete={autocomplete as HTMLInputElement['autocomplete']}
  {disabled}
  class="input {className}"
  data-part="input"
  {value}
  data-testid={dataTestId}
  {oninput}
/>

<style>
  @layer platform-ui {
    .input {
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

    .input::placeholder {
      color: var(--pp-color-text-muted);
    }

    .input:focus {
      outline: none;
      border-color: var(--pp-color-primary);
      box-shadow: 0 0 0 2px var(--pp-color-primary-muted);
    }
  }
</style>

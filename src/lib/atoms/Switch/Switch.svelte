<script lang="ts">
  interface Props {
    id?: string;
    checked?: boolean;
    disabled?: boolean;
    class?: string;
    onChange?: (checked: boolean) => void;
  }

  let { id, checked = $bindable(false), disabled = false, class: className = '', onChange }: Props = $props();

  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    checked = target.checked;
    onChange?.(target.checked);
  }
</script>

<label
  class="switch {className}"
  class:switch--disabled={disabled}
  data-part="switch"
  data-checked={checked || undefined}
  data-disabled={disabled || undefined}
>
  <input
    {id}
    type="checkbox"
    class="switch-input"
    data-part="switch-input"
    bind:checked
    onchange={handleChange}
    {disabled}
  />
  <span class="switch-slider" data-part="switch-track"></span>
</label>

<style>
  @layer platform-ui {
    .switch {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
    }

    .switch--disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .switch-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    .switch-slider {
      position: relative;
      width: 2.5rem;
      height: 1.25rem;
      background: var(--pp-color-border);
      border-radius: 1.25rem;
      transition: background 0.2s;
    }

    .switch-slider::after {
      content: '';
      position: absolute;
      width: 1rem;
      height: 1rem;
      left: 0.125rem;
      top: 0.125rem;
      background: var(--pp-color-surface);
      border-radius: 50%;
      transition: transform 0.2s;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    .switch-input:checked + .switch-slider {
      background: var(--pp-color-primary);
    }

    .switch-input:checked + .switch-slider::after {
      transform: translateX(1.25rem);
    }

    .switch-input:focus-visible + .switch-slider {
      outline: 2px solid var(--pp-color-primary);
      outline-offset: 2px;
    }
  }
</style>

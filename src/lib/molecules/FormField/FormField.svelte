<script lang="ts">
  import type { Snippet } from 'svelte';
  import Label from '../../atoms/Label/Label.svelte';

  interface Props {
    id?: string;
    label: string;
    error?: string;
    required?: boolean;
    /** Replaces the label's contents (the text and the required marker); `label` is still its accessible name. */
    labelContent?: Snippet<[{ label: string; required: boolean }]>;
    children?: Snippet;
  }

  let { id, label, error, required = false, labelContent, children }: Props = $props();
</script>

<div class="form-field" data-part="form-field" data-invalid={error ? true : undefined}>
  <Label for={id}>
    {#if labelContent}
      {@render labelContent({ label, required })}
    {:else}
      {label}{#if required}<span class="required" data-part="form-field-required"> *</span>{/if}
    {/if}
  </Label>
  {#if children}
    {@render children()}
  {/if}
  {#if error}
    <p class="error" role="alert" data-part="form-field-error">{error}</p>
  {/if}
</div>

<style>
  @layer platform-ui {
    .form-field {
      margin-bottom: var(--pp-space-md);
      padding-right: var(--pp-space-md);
    }

    .required {
      color: var(--pp-color-error);
    }

    .error {
      color: var(--pp-color-error);
      margin-top: var(--pp-space-xs);
      margin-bottom: 0;
      font-size: var(--pp-font-size-sm);
    }
  }
</style>

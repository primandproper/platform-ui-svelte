<!--
  The same components twice: once with the default theme, once restyled the two ways an app can. The second copy sets
  tokens and targets data-part hooks with plain, unlayered CSS of lower specificity than the library's own rules, and
  still wins, because the library's CSS is all in the platform-ui layer. The checks at the bottom read the computed
  styles back, so a browser shows whether that holds.
-->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Alert, Button, Card, FormField, Input, Text } from '$lib/index.js';

  let checks = $state<Record<string, boolean>>({});

  onMount(() => {
    const style = (selector: string) => getComputedStyle(document.querySelector(selector)!);
    checks = {
      'default button uses the default primary':
        style('.default [data-part="button"]').backgroundColor === 'rgb(196, 92, 62)',
      'token override reaches the button':
        style('.alternate [data-variant="default"]').borderColor === 'rgb(20, 120, 80)',
      'unlayered data-part rule beats the library rule':
        style('.alternate [data-variant="primary"]').borderRadius === '999px',
      'unlayered rule of lower specificity wins': style('.alternate [data-part="card"]').borderStyle === 'dashed',
      'unlayered :root token beats the default theme': style('.default [data-part="card"]').boxShadow === 'none',
    };
  });
</script>

{#snippet sample()}
  <Card title="Household">
    <Text>Two people live here.</Text>
    <FormField id="name" label="Name" required>
      <Input id="name" placeholder="Jane" />
    </FormField>
    <Button>Save</Button>
    <Button variant="default">Cancel</Button>
  </Card>
  <Alert variant="error">Something went wrong.</Alert>
{/snippet}

<div class="default">{@render sample()}</div>
<div class="alternate">{@render sample()}</div>

<ul data-testid="checks">
  {#each Object.entries(checks) as [name, ok] (name)}
    <li data-ok={ok}>{ok ? 'PASS' : 'FAIL'}: {name}</li>
  {/each}
</ul>

<style>
  /* An app-wide token override, the way an app's own stylesheet would set one. */
  :global(:root) {
    --pp-shadow-sm: none;
  }

  .default,
  .alternate {
    max-width: 28rem;
    margin: 1rem auto;
  }

  .alternate {
    --pp-color-primary: rgb(20, 120, 80);
    --pp-color-primary-hover: rgb(15, 90, 60);
    --pp-color-border: rgb(20, 120, 80);
    --pp-color-surface-alt: rgb(236, 246, 240);
    --pp-radius-sm: 0;
    --pp-font-sans: Georgia, serif;
  }

  /* Specificity (0,1,0), under the library's (0,2,0): only the layer lets these win. */
  :global(:where(.alternate) [data-variant='primary']) {
    border-radius: 999px;
    text-transform: uppercase;
  }

  :global(:where(.alternate) [data-part='card']) {
    border-style: dashed;
  }
</style>

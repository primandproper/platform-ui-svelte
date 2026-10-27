<!-- The gallery's tokens: a copy of DDB's, since the components read custom properties the app defines. -->
<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

{@render children()}

<style>
  :global {
    :root {
      /* Primary: warm terracotta for food/cooking feel */
      --color-primary: #c45c3e;
      --color-primary-hover: #a84d32;
      --color-primary-muted: rgba(196, 92, 62, 0.12);

      /* Base */
      --color-text: #333;
      --color-text-muted: #666;
      --color-error: #c00;
      --color-border: #ccc;
      --color-surface: #fff;
      --color-surface-alt: #f5f5f5;

      /* Semantic */
      --color-error-muted: rgba(204, 0, 0, 0.12);
      --color-success: #0a7b3c;
      --color-success-muted: rgba(10, 123, 60, 0.12);
      --color-warning: #b45309;
      --color-info: #0369a1;

      /* Typography */
      --font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --font-weight-normal: 400;
      --font-weight-medium: 500;
      --font-weight-semibold: 600;
      --font-weight-bold: 700;
      --font-size-xs: 0.75rem;
      --font-size-sm: 0.875rem;
      --font-size-base: 1rem;
      --font-size-lg: 1.125rem;
      --font-size-xl: 1.25rem;
      --font-size-2xl: 1.5rem;
      --font-size-3xl: 1.875rem;
      --line-height-tight: 1.25;
      --line-height-normal: 1.5;
      --line-height-relaxed: 1.625;

      /* Spacing */
      --space-xs: 0.25rem;
      --space-sm: 0.5rem;
      --space-md: 1rem;
      --space-lg: 2rem;
      --space-xl: 3rem;

      /* Radii */
      --radius-sm: 4px;
      --radius-md: 6px;

      /* Shadows */
      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.06);
      --shadow-focus: 0 0 0 3px rgba(196, 92, 62, 0.25);

      /* Transitions */
      --transition-fast: 150ms ease;
      --transition-normal: 200ms ease;

      /* Layout */
      --content-max-width: 32rem;
      --content-max-width-narrow: 24rem;
    }
  }
</style>

import { createRawSnippet } from 'svelte';

/** A children snippet that renders `content` as text, for passing to a component under test. */
export function text(content: string) {
  return createRawSnippet(() => ({ render: () => `<span>${content}</span>` }));
}

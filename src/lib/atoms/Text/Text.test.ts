import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { text } from '../../../testing/snippets.js';
import Text from './Text.svelte';

describe('Text', () => {
  it('renders a body paragraph by default', () => {
    render(Text, { children: text('Hello') });

    expect(screen.getByText('Hello').closest('p')).toHaveClass('text', 'text--body');
  });

  it('applies the variant', () => {
    render(Text, { variant: 'muted', children: text('Hello') });

    expect(screen.getByText('Hello').closest('p')).toHaveClass('text--muted');
  });
});

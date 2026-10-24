import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { text } from '../../../testing/snippets.js';
import Alert from './Alert.svelte';

describe('Alert', () => {
  it('renders an info alert by default', () => {
    render(Alert, { children: text('Heads up') });

    expect(screen.getByRole('alert')).toHaveClass('alert', 'alert--info');
    expect(screen.getByRole('alert')).toHaveTextContent('Heads up');
  });

  it('applies the variant', () => {
    render(Alert, { variant: 'error', children: text('Failed') });

    expect(screen.getByRole('alert')).toHaveClass('alert--error');
  });
});

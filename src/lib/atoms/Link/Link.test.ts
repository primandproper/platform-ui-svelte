import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { text } from '../../../testing/snippets.js';
import Link from './Link.svelte';

describe('Link', () => {
  it('renders an anchor to href', () => {
    render(Link, { href: '/recipes', children: text('Recipes') });

    const link = screen.getByRole('link', { name: 'Recipes' });
    expect(link).toHaveAttribute('href', '/recipes');
    expect(link).toHaveClass('link');
  });
});

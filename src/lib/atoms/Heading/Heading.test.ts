import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { text } from '../../../testing/snippets.js';
import Heading from './Heading.svelte';

describe('Heading', () => {
  it('renders an h1 by default', () => {
    render(Heading, { children: text('Title') });

    const heading = screen.getByRole('heading', { level: 1, name: 'Title' });
    expect(heading).toHaveClass('heading', 'heading--1');
  });

  it('renders the requested level', () => {
    render(Heading, { level: 3, children: text('Title') });

    expect(screen.getByRole('heading', { level: 3 })).toHaveClass('heading--3');
  });
});

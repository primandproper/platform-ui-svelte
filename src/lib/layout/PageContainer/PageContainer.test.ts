import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { text } from '../../../testing/snippets.js';
import PageContainer from './PageContainer.svelte';

describe('PageContainer', () => {
  it('renders its children in a main element', () => {
    render(PageContainer, { children: text('Page') });

    expect(screen.getByRole('main')).toHaveClass('page-container');
    expect(screen.getByRole('main')).toHaveTextContent('Page');
  });

  it('applies the width modifiers', () => {
    render(PageContainer, { narrow: true, wide: true });

    expect(screen.getByRole('main')).toHaveClass('page-container--narrow', 'page-container--wide');
  });
});

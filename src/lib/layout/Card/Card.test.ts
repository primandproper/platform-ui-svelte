import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { text } from '../../../testing/snippets.js';
import Card from './Card.svelte';

describe('Card', () => {
  it('renders its title and body', () => {
    render(Card, { title: 'Household', children: text('Members') });

    expect(screen.getByText('Household')).toBeInTheDocument();
    expect(screen.getByText('Members')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('collapses and expands when collapsible', async () => {
    render(Card, { title: 'Household', collapsible: true, children: text('Members') });
    const header = screen.getByRole('button', { name: /Household/ });

    expect(header).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(header);

    expect(header).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Members')).not.toBeInTheDocument();
  });
});

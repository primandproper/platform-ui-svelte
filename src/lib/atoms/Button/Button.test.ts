import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { text } from '../../../testing/snippets.js';
import Button from './Button.svelte';

describe('Button', () => {
  it('renders its children as a primary button by default', () => {
    render(Button, { children: text('Save') });

    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass('btn', 'btn--primary');
  });

  it('calls onclick when clicked', async () => {
    const onclick = vi.fn();
    render(Button, { onclick, children: text('Save') });

    await userEvent.click(screen.getByRole('button'));

    expect(onclick).toHaveBeenCalledOnce();
  });

  it('does not call onclick when disabled', async () => {
    const onclick = vi.fn();
    render(Button, { onclick, disabled: true, children: text('Save') });

    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toBeDisabled();
    expect(onclick).not.toHaveBeenCalled();
  });

  it('applies the variant, type and extra class', () => {
    render(Button, { variant: 'default', type: 'submit', class: 'wide', children: text('Go') });

    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn--default', 'wide');
    expect(button).toHaveAttribute('type', 'submit');
  });
});

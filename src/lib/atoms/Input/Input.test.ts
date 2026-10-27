import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Input from './Input.svelte';

describe('Input', () => {
  it('renders a text input with its attributes', () => {
    render(Input, { id: 'name', name: 'name', placeholder: 'Jane', value: 'x', dataTestId: 'name-input' });

    const input = screen.getByTestId('name-input');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('placeholder', 'Jane');
    expect(input).toHaveValue('x');
  });

  it('reports input', async () => {
    const oninput = vi.fn();
    render(Input, { oninput });

    await userEvent.type(screen.getByRole('textbox'), 'ab');

    expect(oninput).toHaveBeenCalledTimes(2);
  });

  it('can be disabled', () => {
    render(Input, { disabled: true });

    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});

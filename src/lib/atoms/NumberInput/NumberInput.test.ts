import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import NumberInput from './NumberInput.svelte';

describe('NumberInput', () => {
  it('renders a number input with its bounds', () => {
    render(NumberInput, { value: 2, min: 1, max: 10, step: 0.5 });

    const input = screen.getByRole('spinbutton');
    expect(input).toHaveValue(2);
    expect(input).toHaveAttribute('min', '1');
    expect(input).toHaveAttribute('max', '10');
    expect(input).toHaveAttribute('step', '0.5');
  });

  it('takes typed numbers', async () => {
    render(NumberInput, { value: 0 });
    const input = screen.getByRole('spinbutton');

    await userEvent.clear(input);
    await userEvent.type(input, '4');

    expect(input).toHaveValue(4);
  });
});

import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Autocomplete from './Autocomplete.svelte';

const suggestions = [
  { id: '1', label: 'basil' },
  { id: '2', label: 'butter' },
];

describe('Autocomplete', () => {
  it('shows suggestions while focused and reports input', async () => {
    const onInput = vi.fn();
    render(Autocomplete, { id: 'ingredient', suggestions, onInput });

    await userEvent.type(screen.getByRole('combobox'), 'b');

    expect(onInput).toHaveBeenCalledWith('b');
    expect(screen.getAllByRole('option')).toHaveLength(2);
  });

  it('selects a suggestion with the keyboard', async () => {
    const onSelect = vi.fn();
    render(Autocomplete, { suggestions, onSelect });
    const input = screen.getByRole('combobox');

    await userEvent.click(input);
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}');

    expect(onSelect).toHaveBeenCalledWith(suggestions[1]);
    expect(input).toHaveValue('butter');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes on Escape', async () => {
    render(Autocomplete, { suggestions });
    const input = screen.getByRole('combobox');

    await userEvent.click(input);
    expect(input).toHaveAttribute('aria-expanded', 'true');
    await userEvent.keyboard('{Escape}');

    expect(input).toHaveAttribute('aria-expanded', 'false');
  });
});

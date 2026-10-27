import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Select from './Select.svelte';

const options = [
  { value: 'thai', label: 'Thai' },
  { value: 'mexican', label: 'Mexican' },
];

describe('Select', () => {
  it('renders its options and a disabled placeholder', () => {
    render(Select, { options, placeholder: 'Pick one' });

    expect(screen.getByRole('option', { name: 'Pick one' })).toBeDisabled();
    expect(screen.getByRole('option', { name: 'Thai' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Mexican' })).toBeInTheDocument();
  });

  it('selects an option', async () => {
    render(Select, { options, value: 'thai' });
    const select = screen.getByRole('combobox');

    await userEvent.selectOptions(select, 'mexican');

    expect(select).toHaveValue('mexican');
  });
});

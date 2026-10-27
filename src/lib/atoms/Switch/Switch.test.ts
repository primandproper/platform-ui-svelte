import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Switch from './Switch.svelte';

describe('Switch', () => {
  it('reports the new value when toggled', async () => {
    const onChange = vi.fn();
    render(Switch, { checked: false, onChange });

    await userEvent.click(screen.getByRole('checkbox'));

    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('can be disabled', () => {
    render(Switch, { disabled: true });

    expect(screen.getByRole('checkbox')).toBeDisabled();
    expect(screen.getByRole('checkbox').closest('label')).toHaveClass('switch--disabled');
  });
});

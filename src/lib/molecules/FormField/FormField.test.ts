import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { text } from '../../../testing/snippets.js';
import FormField from './FormField.svelte';

describe('FormField', () => {
  it('renders a label and its control', () => {
    render(FormField, { id: 'email', label: 'Email', children: text('control') });

    expect(screen.getByText('Email').closest('label')).toHaveAttribute('for', 'email');
    expect(screen.getByText('control')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('marks required fields and shows errors', () => {
    render(FormField, { label: 'Email', required: true, error: 'Required' });

    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });
});

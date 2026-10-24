import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { text } from '../../../testing/snippets.js';
import Label from './Label.svelte';

describe('Label', () => {
  it('renders a label for the given control', () => {
    render(Label, { for: 'email', children: text('Email') });

    const label = screen.getByText('Email').closest('label');
    expect(label).toHaveAttribute('for', 'email');
    expect(label).toHaveClass('label');
  });
});

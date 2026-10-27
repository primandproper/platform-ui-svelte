import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { createRawSnippet } from 'svelte';
import { describe, expect, it, vi } from 'vitest';
import { text } from '../testing/snippets.js';
import {
  Alert,
  Autocomplete,
  Button,
  Card,
  FormField,
  Heading,
  Input,
  Label,
  Link,
  NumberInput,
  PageContainer,
  Select,
  Switch,
  Text,
} from './index.js';
import { LoginForm } from './screens.js';

vi.mock('$app/forms', () => ({
  enhance: () => ({ destroy: () => undefined }),
  applyAction: vi.fn(),
}));

function part(container: HTMLElement, name: string) {
  return container.querySelector(`[data-part="${name}"]`);
}

describe('data-part hooks', () => {
  it.each([
    ['button', () => render(Button, { variant: 'default', children: text('x') })],
    ['heading', () => render(Heading, { level: 2, children: text('x') })],
    ['input', () => render(Input, {})],
    ['label', () => render(Label, { children: text('x') })],
    ['link', () => render(Link, { href: '/', children: text('x') })],
    ['number-input', () => render(NumberInput, {})],
    ['select', () => render(Select, { options: [] })],
    ['switch', () => render(Switch, {})],
    ['text', () => render(Text, { children: text('x') })],
    ['alert', () => render(Alert, { children: text('x') })],
    ['card', () => render(Card, { title: 'x' })],
    ['page-container', () => render(PageContainer, {})],
    ['autocomplete', () => render(Autocomplete, {})],
    ['form-field', () => render(FormField, { label: 'x' })],
    ['login-form', () => render(LoginForm, {})],
  ])('marks the root of %s', (name, mount) => {
    const { container } = mount();

    expect(part(container, name)).toBeInTheDocument();
  });

  it('exposes variants and state', () => {
    const { container } = render(Button, { variant: 'default', children: text('x') });
    expect(part(container, 'button')).toHaveAttribute('data-variant', 'default');

    const heading = render(Heading, { level: 3, children: text('x') });
    expect(part(heading.container, 'heading')).toHaveAttribute('data-level', '3');

    const alert = render(Alert, { variant: 'error', children: text('x') });
    expect(part(alert.container, 'alert')).toHaveAttribute('data-variant', 'error');

    const page = render(PageContainer, { narrow: true });
    expect(part(page.container, 'page-container')).toHaveAttribute('data-width', 'narrow');

    const field = render(FormField, { label: 'x', required: true, error: 'Bad' });
    expect(part(field.container, 'form-field')).toHaveAttribute('data-invalid');
    expect(part(field.container, 'form-field-required')).toBeInTheDocument();
    expect(part(field.container, 'form-field-error')).toHaveTextContent('Bad');
  });

  it('tracks a switch being toggled', async () => {
    const { container } = render(Switch, {});
    expect(part(container, 'switch')).not.toHaveAttribute('data-checked');

    await userEvent.click(screen.getByRole('checkbox'));

    expect(part(container, 'switch')).toHaveAttribute('data-checked');
    expect(part(container, 'switch-track')).toBeInTheDocument();
  });

  it('tracks a card collapsing', async () => {
    const { container } = render(Card, { title: 'x', collapsible: true, children: text('body') });
    expect(part(container, 'card')).toHaveAttribute('data-expanded');
    expect(part(container, 'card-body')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button'));

    expect(part(container, 'card')).not.toHaveAttribute('data-expanded');
    expect(part(container, 'card-chevron')).toBeInTheDocument();
  });

  it('marks the focused autocomplete option', async () => {
    const { container } = render(Autocomplete, {
      suggestions: [
        { id: '1', label: 'a' },
        { id: '2', label: 'b' },
      ],
    });

    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.keyboard('{ArrowDown}');

    expect(part(container, 'autocomplete')).toHaveAttribute('data-open');
    expect(container.querySelectorAll('[data-part="autocomplete-option"]')).toHaveLength(2);
    expect(container.querySelector('[data-part="autocomplete-option"][data-focused]')).toHaveTextContent('a');
  });
});

describe('snippet props', () => {
  it('replaces a card header but keeps its toggle', async () => {
    const header = createRawSnippet((props: () => { title: string | undefined; expanded: boolean }) => ({
      render: () => `<em>${props().title ?? ''} ${props().expanded ? 'open' : 'shut'}</em>`,
    }));
    render(Card, { title: 'Household', collapsible: true, header, children: text('body') });

    expect(screen.getByText('Household open')).toBeInTheDocument();
    expect(screen.queryByText('▼')).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button'));
    expect(screen.queryByText('body')).not.toBeInTheDocument();
  });

  it('renders a card header snippet without a title', () => {
    const header = createRawSnippet(() => ({ render: () => '<em>Custom</em>' }));
    render(Card, { header });

    expect(screen.getByText('Custom')).toBeInTheDocument();
  });

  it('replaces a form field label but keeps it attached to the control', () => {
    const labelContent = createRawSnippet((props: () => { label: string; required: boolean }) => ({
      render: () => `<strong>${props().label}${props().required ? '!' : ''}</strong>`,
    }));
    render(FormField, { id: 'email', label: 'Email', required: true, labelContent });

    expect(screen.getByText('Email!').closest('label')).toHaveAttribute('for', 'email');
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  it('renders autocomplete options through a snippet', async () => {
    const option = createRawSnippet((props: () => { item: { id: string; label: string }; focused: boolean }) => ({
      render: () => `<span>#${props().item.id} ${props().item.label}</span>`,
    }));
    render(Autocomplete, { suggestions: [{ id: '7', label: 'basil' }], option });

    await userEvent.click(screen.getByRole('combobox'));

    expect(screen.getByRole('option')).toHaveTextContent('#7 basil');
  });
});

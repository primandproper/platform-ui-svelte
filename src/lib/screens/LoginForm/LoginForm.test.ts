import { render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import LoginForm from './LoginForm.svelte';

vi.mock('$app/forms', () => ({
  enhance: () => ({ destroy: () => undefined }),
  applyAction: vi.fn(),
}));

describe('LoginForm', () => {
  it('renders username and password fields that post to the login action', () => {
    const { container } = render(LoginForm, { username: 'jane' });

    const form = container.querySelector('form');
    expect(form).toHaveAttribute('action', '?/login');
    expect(form).toHaveAttribute('method', 'POST');
    expect(screen.getByTestId('login-username')).toHaveValue('jane');
    expect(screen.getByTestId('login-password')).toHaveAttribute('type', 'password');
    expect(screen.queryByTestId('login-totp-token')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toHaveAttribute('type', 'submit');
  });

  it('shows a required TOTP field and an error when asked', () => {
    render(LoginForm, { showTotp: true, totpRequired: true, error: 'Bad credentials', submitLabel: 'Log in' });

    expect(screen.getByTestId('login-totp-token')).toBeRequired();
    expect(screen.getByText('Authentication code (2FA)')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Bad credentials');
    expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
  });

  it('shows an optional TOTP field', () => {
    render(LoginForm, { showTotp: true });

    expect(screen.getByTestId('login-totp-token')).not.toBeRequired();
    expect(screen.getByText('TOTP (if enabled)')).toBeInTheDocument();
  });
});

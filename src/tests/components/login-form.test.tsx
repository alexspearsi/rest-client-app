import { render, screen, fireEvent } from '@testing-library/react';
import { test, vi, expect } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '@messages/en.json';
import LoginForm from '@/components/login-form';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  NextIntlClientProvider: ({ children }: React.PropsWithChildren) => (
    <>{children}</>
  ),
}));

vi.mock('sonner', () => ({
  toast: {
    loading: vi.fn().mockReturnValue('id'),
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('@/firebase', () => ({
  logInWithEmailAndPassword: vi.fn().mockResolvedValue({
    user: { getIdToken: vi.fn().mockResolvedValue('token') },
  }),
}));

test('LoginForm renders correctly', () => {
  render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <LoginForm />
    </NextIntlClientProvider>,
  );

  expect(screen.getByLabelText(/emailLabel/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/passwordLabel/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

test('can type into email and password fields', () => {
  render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <LoginForm />
    </NextIntlClientProvider>,
  );

  const emailInput = screen.getByLabelText(/emailLabel/i);
  const passwordInput = screen.getByLabelText(/passwordLabel/i);

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  expect(emailInput).toHaveValue('test@example.com');
  expect(passwordInput).toHaveValue('password123');
});

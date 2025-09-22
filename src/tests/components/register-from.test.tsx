import { render, screen, fireEvent } from '@testing-library/react';
import { test, vi, expect } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '@messages/en.json';
import RegisterForm from '@/components/register-form';

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
  registerWithEmailAndPassword: vi.fn().mockResolvedValue({
    getIdToken: vi.fn().mockResolvedValue('token'),
  }),
}));

vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({ replace: vi.fn() }),
}));

test('RegisterForm renders correctly', () => {
  render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <RegisterForm />
    </NextIntlClientProvider>,
  );

  expect(screen.getByLabelText(/nameLabel/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/emailLabel/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/passwordLabel/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /signup/i })).toBeInTheDocument();
});

test('Types name, email, and password fields', () => {
  render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <RegisterForm />
    </NextIntlClientProvider>,
  );

  const nameInput = screen.getByLabelText(/nameLabel/i);
  const emailInput = screen.getByLabelText(/emailLabel/i);
  const passwordInput = screen.getByLabelText(/passwordLabel/i);

  fireEvent.change(nameInput, { target: { value: 'Alexander' } });
  fireEvent.change(emailInput, {
    target: { value: 'alexander1234@yandex.ru' },
  });
  fireEvent.change(passwordInput, { target: { value: 'alexander123456!' } });

  expect(nameInput).toHaveValue('Alexander');
  expect(emailInput).toHaveValue('alexander1234@yandex.ru');
  expect(passwordInput).toHaveValue('alexander123456!');
});

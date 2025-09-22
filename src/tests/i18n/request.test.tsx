import { test, expect, vi } from 'vitest';

vi.mock('next-intl/server', () => ({
  getRequestConfig: (fn: React.PropsWithChildren) => fn,
}));

vi.mock('next-intl', () => ({
  hasLocale: (locales: string[], locale: string) => locales.includes(locale),
}));

vi.mock('../../messages/en.json', () => ({
  default: {
    Header: { logo: 'logo' },
    Footer: { logo: 'Course logo' },
    SignupForm: { signup: 'Sign Up' },
    LoginForm: { login: 'Sign In' },
  },
}));

vi.mock('../../messages/ru.json', () => ({
  default: {
    Header: { logo: 'лого' },
    Footer: { logo: 'Лого курса' },
    SignupForm: { signup: 'Зарегистрироваться' },
    LoginForm: { login: 'Войти' },
  },
}));

import requestConfig from '@/i18n/request';

test('Returns correct messages for englsih language', async () => {
  const mockRequestLocale = Promise.resolve('en');

  const result = await requestConfig({ requestLocale: mockRequestLocale });

  expect(result.locale).toBe('en');
  expect(result.messages!.SignupForm.signup).toBe('Sign Up');
});

test('Returns correct messages for russian language', async () => {
  const mockRequestLocale = Promise.resolve('ru');

  const result = await requestConfig({ requestLocale: mockRequestLocale });

  expect(result.locale).toBe('ru');
  expect(result.messages!.SignupForm.signup).toBe('Зарегистрироваться');
});

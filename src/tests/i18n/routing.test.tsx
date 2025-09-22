import { test, expect } from 'vitest';
import { routing } from '@/i18n/routing';

test('routing has correct locales and defaultLocale', () => {
  expect(routing).toHaveProperty('locales');
  expect(routing.locales).toContain('en');
  expect(routing.locales).toContain('ru');

  expect(routing).toHaveProperty('defaultLocale');
  expect(routing.defaultLocale).toBe('en');
});

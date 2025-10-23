import { test, expect, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import * as navigationModule from '@/i18n/navigation';

vi.mock('next-intl/navigation', () => ({
  createNavigation: () => ({
    Link: ({ children }: React.PropsWithChildren) => <span>{children}</span>,
    redirect: vi.fn(),
    usePathname: () => '/mock-path',
    useRouter: () => ({ push: vi.fn() }),
    getPathname: () => '/mock-path',
  }),
}));

test('navigation exports all expected members', () => {
  expect(navigationModule).toHaveProperty('Link');
  expect(navigationModule).toHaveProperty('redirect');
  expect(navigationModule).toHaveProperty('usePathname');
  expect(navigationModule).toHaveProperty('useRouter');
  expect(navigationModule).toHaveProperty('getPathname');
});

test('Link renders children', () => {
  const { Link } = navigationModule;
  render(<Link href="/test">Click me</Link>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});

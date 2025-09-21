import { render, screen } from '@testing-library/react';
import { test, vi, expect } from 'vitest';
import Header from '@/components/header';
import type { Mock } from 'vitest';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('@/firebase', () => ({
  auth: {},
  logout: vi.fn(),
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children }: React.PropsWithChildren) => <span>{children}</span>,
  useRouter: () => ({ replace: vi.fn() }),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/components/language-toggler', () => ({
  LanguageToggler: () => <div>Mock</div>,
}));

vi.mock('@/components/theme-toggler', () => ({
  ThemeToggler: () => <div>Mock</div>,
}));

vi.mock('@/components/ui/navigation-menu', () => ({
  NavigationMenu: ({ children }: React.PropsWithChildren) => (
    <div>{children}</div>
  ),
  NavigationMenuList: ({ children }: React.PropsWithChildren) => (
    <ul>{children}</ul>
  ),
  NavigationMenuItem: ({ children }: React.PropsWithChildren) => (
    <li>{children}</li>
  ),
  NavigationMenuLink: ({ children }: React.PropsWithChildren) => (
    <>{children}</>
  ),
}));

import { useAuthState } from 'react-firebase-hooks/auth';

test('Renders Header for unatuhorised users', () => {
  (useAuthState as Mock).mockReturnValue([null, false]);

  render(<Header />);

  expect(screen.getByText('signin')).toBeInTheDocument();
  expect(screen.getByText('signup')).toBeInTheDocument();
});

test('Renders Header for authorised users', () => {
  (useAuthState as Mock).mockReturnValue([{ uid: '1' }, false]);

  render(<Header />);

  expect(screen.getByText('mainPage')).toBeInTheDocument();
});

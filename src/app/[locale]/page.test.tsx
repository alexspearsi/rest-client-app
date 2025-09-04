import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from './page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

test('Page', () => {
  render(<Page />);
  expect(
    screen.getByRole('heading', { level: 1, name: 'Welcome!' }),
  ).toBeDefined();
});

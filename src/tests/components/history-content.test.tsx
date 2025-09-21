import { render, screen } from '@testing-library/react';
import { test, vi, expect } from 'vitest';
import HistoryContent from '@/components/history-content';
import { RequestItem } from '@/types/types';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/components/history-row', () => ({
  default: ({ req }: { req: RequestItem }) => <tr>{req.url}</tr>,
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children }: React.PropsWithChildren) => <span>{children}</span>,
}));

test('Renders empty state when no requests', () => {
  render(<HistoryContent requests={[]} />);
  expect(screen.getByText('emptyHeading')).toBeInTheDocument();
  expect(screen.getByText('emptyDescription')).toBeInTheDocument();
  expect(screen.getByText('emptyLink')).toBeInTheDocument();
});

test('renders table with requests', () => {
  const requests: RequestItem[] = [
    {
      id: '1',
      method: 'get',
      url: '/api/test',
      statusCode: 200,
      statusText: 'OK',
      duration: 123,
      reqSize: 456,
      resSize: 789,
      timestamp: 1234567890,
      error: '',
      link: '/details/1',
      data: {},
    },
  ];

  render(<HistoryContent requests={requests} />);

  expect(screen.getByText('title')).toBeInTheDocument();

  expect(screen.getByText('/api/test')).toBeInTheDocument();
});

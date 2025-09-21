import { render, screen, fireEvent } from '@testing-library/react';
import { test, vi, expect } from 'vitest';
import HistoryRow from '@/components/history-row';
import { RequestItem } from '@/types/types';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

const mockPush = vi.fn();
vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock('@/utils/get-status-class', () => ({
  getStatusClass: (status: number) => `status-${status}`,
}));

test('HistoryRow renders correctly and clickable', () => {
  const req: RequestItem = {
    method: 'get',
    url: '/api/test',
    statusCode: 200,
    duration: 123,
    reqSize: 456,
    resSize: 789,
    timestamp: 2423423444,
    link: '/details/1',
    error: '',
    id: '23434',
    statusText: 'sdf',
    data: {},
  };

  render(
    <table>
      <tbody>
        <HistoryRow req={req} />
      </tbody>
    </table>,
  );

  expect(screen.getByText('GET')).toBeInTheDocument();
  expect(screen.getByText(req.url)).toBeInTheDocument();
  expect(screen.getByText(req.statusCode.toString())).toHaveClass('status-200');
  expect(screen.getByText(`${req.duration} ms`)).toBeInTheDocument();
  expect(screen.getByText(`${req.reqSize} byte`)).toBeInTheDocument();
  expect(screen.getByText(`${req.resSize} byte`)).toBeInTheDocument();
  expect(
    screen.getByText(new Date(req.timestamp).toLocaleString()),
  ).toBeInTheDocument();
  expect(screen.getByText('-')).toBeInTheDocument();

  fireEvent.click(screen.getByText(req.url));
  expect(mockPush).toHaveBeenCalledWith(req.link);
});

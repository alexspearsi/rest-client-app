import ProtectedRoute from '@/components/protected-route';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/typography';
import { Link } from 'lucide-react';
import { useTranslations } from 'next-intl';

export type RequestItem = {
  endpoint: string;
  method: string;
  statusCode: number;
  duration: number;
  requestSize: number;
  responseSize: number;
  timestamp: number;
  error?: string | null;
};

const requests: RequestItem[] = [
  {
    endpoint: 'https://rickandmortyapi.com/api/character/1',
    method: 'GET',
    statusCode: 200,
    duration: 120,
    requestSize: 350,
    responseSize: 1024,
    error: null,
    timestamp: Date.now(),
  },
  {
    endpoint: 'https://pokeapi.co/api/v2/pokemon/pikachu',
    method: 'POST',
    statusCode: 500,
    duration: 250,
    requestSize: 780,
    responseSize: 0,
    error: 'Internal Server Error',
    timestamp: Date.now(),
  },
];

export default function Page() {
  const t = useTranslations('History');

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <Heading size="h2">{t('title')}</Heading>
        <Button>Добавить запрос</Button>

        {requests.length === 0 ? (
          <div className="text-center">
            <h2>Вы ещё не выполняли запросы</h2>
            <Link href="/rest-client" className="text-blue-500">
              REST Client
            </Link>
          </div>
        ) : (
          <HistoryList requests={requests} />
        )}
      </div>
    </ProtectedRoute>
  );
}

export function HistoryList({ requests }: { requests: RequestItem[] }) {
  return (
    <table className="border text-sm">
      <thead>
        <tr>
          <th className="px-2 py-2">Method</th>
          <th className="px-2 py-2">Endpoint</th>
          <th className="px-2 py-2">Status</th>
          <th className="px-2 py-2">Duration</th>
          <th className="px-2 py-2">Req Size</th>
          <th className="px-2 py-2">Res Size</th>
          <th className="px-2 py-2">Timestamp</th>
          <th className="px-2 py-2">Error</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((req, index) => (
          <tr key={index}>
            <td className="px-2 py-2">{req.method}</td>
            <td className="px-2 py-2">{req.endpoint}</td>
            <td className="px-2 py-2">{req.statusCode}</td>
            <td className="px-2 py-2">{req.duration} ms</td>
            <td className="px-2 py-2">{req.requestSize} B</td>
            <td className="px-2 py-2">{req.responseSize} B</td>
            <td className="px-2 py-2">
              {new Date(req.timestamp).toLocaleString()}
            </td>
            <td className="px-2 py-2">{req.error || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

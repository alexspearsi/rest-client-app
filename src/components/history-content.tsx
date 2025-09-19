import { Link } from '@/i18n/navigation';
import { Heading } from './ui/typography';
import { useTranslations } from 'next-intl';

type RequestItem = {
  id: string;
  statusCode: number;
  statusText: string;
  method: string;
  resSize: number;
  reqSize: number;
  duration: number;
  timestamp: number;
  data: unknown;
  error: string | null;
  url: string;
};

export default function HistoryContent({
  requests,
}: {
  requests: RequestItem[];
}) {
  const t = useTranslations('History');

  if (requests.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <p>{t('emptyHeading')}</p>
        <p>{t('emptyDescription')}</p>
        <Link href="/rest-client" className="text-blue-500">
          {t('emptyLink')}
        </Link>
      </div>
    );
  }

  const getStatusClass = (status: number) => {
    if (status >= 500) {
      return 'text-destructive font-medium';
    }

    if (status >= 400) {
      return 'text-yellow-600 dark:text-yellow-400 font-medium';
    }

    if (status >= 200) {
      return 'text-green-600 dark:text-green-400 font-medium';
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-4 py-10">
      <Heading size="h2">{t('title')}</Heading>

      <div className="w-full overflow-x-auto">
        <table className="mx-auto min-w-[800px] text-sm">
          <thead>
            <tr>
              <th className="p-2">{t('method')}</th>
              <th className="p-2">{t('url')}</th>
              <th className="p-2">{t('status')}</th>
              <th className="p-2">{t('duration')}</th>
              <th className="p-2">{t('reqSize')}</th>
              <th className="p-2">{t('resSize')}</th>
              <th className="p-2">{t('timestamp')}</th>
              <th className="p-2">{t('error')}</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr
                key={req.id}
                className="cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <td className="p-2 text-center">{req.method.toUpperCase()}</td>
                <td className="text-blue-700">{req.url}</td>
                <td
                  className={`p-2 text-center ${getStatusClass(req.statusCode)}`}
                >
                  {req.statusCode}
                </td>
                <td className="p-2 text-center">
                  {req.duration} {t('ms')}
                </td>
                <td className="p-2 text-center">
                  {req.reqSize} {t('byte')}
                </td>
                <td className="p-2 text-center">
                  {req.resSize} {t('byte')}
                </td>
                <td className="p-2 text-center">
                  {new Date(req.timestamp).toLocaleString()}
                </td>
                <td className="p-2 text-center">{req.error || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

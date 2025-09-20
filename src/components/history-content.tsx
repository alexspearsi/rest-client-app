import { Link } from '@/i18n/navigation';
import { Heading } from './ui/typography';
import { useTranslations } from 'next-intl';
import { RequestItem } from '../types/types';
import HistoryRow from './history-row';

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
              <HistoryRow key={req.id} req={req} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

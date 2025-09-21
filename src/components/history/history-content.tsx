import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { RequestItem } from '../../types/types';
import HistoryRow from './history-row';
import { Heading } from '../ui/typography';
import { Button } from '../ui/button';
import { Send } from 'lucide-react';

export default function HistoryContent({
  requests,
}: {
  requests: RequestItem[];
}) {
  const t = useTranslations('History');

  if (requests.length === 0) {
    return (
      <div className="hidden h-full flex-col items-center justify-center gap-2 px-4 py-32 md:flex">
        <div className="mx-auto max-w-md space-y-8 text-center">
          <div className="space-y-2 text-center">
            <Heading size="h3">{t('emptyHeading')}</Heading>
            <p className="text-muted-foreground">{t('emptyDescription')}</p>
          </div>
          <Button asChild className="gap-2">
            <Link href="/rest-client" className="text-blue-500">
              <Send className="h-5 w-5" /> {t('emptyLink')}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden max-h-[75vh] overflow-x-auto overflow-y-auto md:block">
      <table className="relative w-full">
        <thead className="bg-secondary sticky top-0 border-b">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold tracking-wider uppercase">
              Method
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold tracking-wider uppercase">
              Endpoint
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold tracking-wider uppercase">
              Status
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold tracking-wider uppercase">
              Duration
            </th>
            <th className="min-w-[80px] px-4 py-3 text-left text-sm font-semibold tracking-wider uppercase">
              Size
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold tracking-wider uppercase">
              Time
            </th>
          </tr>
        </thead>
        <tbody className="divide-primary-foreground divide-y">
          {requests.map((req) => (
            <HistoryRow key={req.id} req={req} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

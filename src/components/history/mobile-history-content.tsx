import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { RequestItem } from '../../types/types';
import HistoryCard from './history-card';
import { Heading } from '../ui/typography';
import { Button } from '../ui/button';
import { Send } from 'lucide-react';

export default function MobileHistoryContent({
  requests,
}: {
  requests: RequestItem[];
}) {
  const t = useTranslations('History');

  if (requests.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 px-4 py-32 md:hidden">
        <div className="mx-auto max-w-sm space-y-8 text-center">
          <div className="space-y-2 text-center">
            <Heading size="h3">{t('emptyHeading')}</Heading>
            <p className="text-muted-foreground">{t('emptyDescription')}</p>
          </div>
          <Button asChild className="gap-2">
            <Link href="/rest-client">
              <Send className="h-5 w-5" /> {t('emptyLink')}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-[75vh] divide-y overflow-x-auto overflow-y-auto md:hidden">
      {requests.map((req) => (
        <HistoryCard key={req.id} req={req} />
      ))}
    </div>
  );
}

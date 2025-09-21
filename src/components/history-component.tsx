import { useTranslations } from 'next-intl';
import { Heading } from './ui/typography';
import MobileHistoryContent from './history/mobile-history-content';
import { RequestItem } from '@/types/types';
import HistoryContent from './history/history-content';

export default function HistoryComponent({
  requests,
}: {
  requests: RequestItem[];
}) {
  const t = useTranslations('History');

  return (
    <section>
      <div className="container mx-auto px-4 py-16 lg:px-20">
        <div className="space-y-12">
          <div className="space-y-2 text-center">
            <Heading size="h2">{t('title')}</Heading>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              {t('description')}
            </p>
          </div>
          <div className="bg-background overflow-hidden rounded-lg border shadow-sm">
            <div className="bg-secondary border-b px-6 py-4">
              <p className="text-foreground text-lg font-semibold">
                {t('requestHistoryTitle')}
              </p>
            </div>
            <HistoryContent requests={requests} />
            <MobileHistoryContent requests={requests} />
          </div>
        </div>
      </div>
    </section>
  );
}

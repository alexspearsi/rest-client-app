import { Heading } from '@/components/ui/typography';
import { useTranslations } from 'next-intl';
import Variables from './variables/variables';
import { ScrollArea } from './ui/scroll-area';

export default function VariablesContent() {
  const t = useTranslations('Variables');

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
          <div>
            <ScrollArea className="h-[450px] rounded-lg border">
              <Variables />
            </ScrollArea>
          </div>
        </div>
      </div>
    </section>
  );
}

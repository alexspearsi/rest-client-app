import { Code } from 'lucide-react';
import { Button } from '../ui/button';
import { Heading } from '../ui/typography';
import { useTranslations } from 'next-intl';

export default function ActionSection() {
  const t = useTranslations('ActionSection');

  return (
    <section>
      <div className="container mx-auto px-4 pt-16 pb-32 lg:px-20">
        <div className="mb-12 text-center">
          <Heading size="h2" className="mb-4">
            {t('title')}
          </Heading>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            {t('description')}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            className="gap-2"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Code className="h-5 w-5" />
            {t('getStarted')}
          </Button>
        </div>
      </div>
    </section>
  );
}

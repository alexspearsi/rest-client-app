import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/typography';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NotFoundPage');

  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="container mx-auto space-y-8 px-6 text-center lg:px-20">
        <div className="space-y-6">
          <span className="text-primary block text-5xl">404</span>
          <Heading size="h2">{t('title')}</Heading>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            {t('description')}
          </p>
        </div>
        <Button variant="default">
          <Link href="/">{t('goBackHome')}</Link>
        </Button>
      </div>
    </section>
  );
}

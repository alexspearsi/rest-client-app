'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/typography';
import { AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const t = useTranslations('ErrorPage');

  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="container mx-auto space-y-8 px-6 text-center lg:px-20">
        <div className="bg-destructive/20 mx-auto flex h-24 w-24 items-center justify-center rounded-full">
          <AlertTriangle className="text-destructive h-12 w-12" />
        </div>
        <Badge variant="destructive">
          {error.name}: {error.message}
        </Badge>
        <div className="space-y-6">
          <Heading size="h2">{t('title')}</Heading>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            {t('description')}
          </p>
        </div>
        <Button variant="default" onClick={reset}>
          {t('tryAgain')}
        </Button>
      </div>
    </section>
  );
}

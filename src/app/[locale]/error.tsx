'use client';

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
        <AlertTriangle className="text-destructive mx-auto h-16 w-16" />
        <div className="space-y-6">
          <Heading size="h2">{t('title')}</Heading>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            {t('description')}
          </p>
        </div>
        <Button variant="default" onClick={reset}>
          {t('tryAgain')}
        </Button>
        <div className="bg-destructive/20 mx-auto flex max-w-md items-center justify-center rounded-lg p-3">
          <p className="text-destructive text-start text-sm">
            <span className="font-bold">{error.name}</span>: {error.message}
          </p>
        </div>
      </div>
    </section>
  );
}

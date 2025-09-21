import RestClient from '@/components/rest-client/rest-client';
import { Heading } from '@/components/ui/typography';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

export default function RestClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = useTranslations('RestClient');

  return (
    <section>
      <div className="container mx-auto px-4 py-16 lg:px-20">
        <div className="space-y-12">
          <div className="space-y-2 text-center">
            <Heading size="h2">{t('title')}</Heading>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Test and debug your APIs with our powerful REST client interface
            </p>
          </div>
          <RestClient />
          {children}
        </div>
      </div>
    </section>
  );
}

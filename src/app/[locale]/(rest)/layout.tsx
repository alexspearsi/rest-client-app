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
    <div className="flex h-screen flex-col items-center justify-center gap-6 p-8">
      <Heading size="h2">{t('title')}</Heading>
      <RestClient />
      {children}
    </div>
  );
}

import RestClient from '@/components/rest-client/rest-client';
import { Heading } from '@/components/ui/typography';
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('RestClient');

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 p-8">
      <Heading size="h2">{t('title')}</Heading>
      <RestClient />
    </div>
  );
}

import RestClient from '@/components/rest-client/rest-client';
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('RestClient');

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 p-8 text-black">
      <h2 className="text-3xl font-bold">{t('title')}</h2>
      <RestClient />
    </div>
  );
}

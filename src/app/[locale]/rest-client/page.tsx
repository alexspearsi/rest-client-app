'use client';

import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('RestClient');

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 text-black p-8">
      <h2 className="text-3xl font-bold">{t('title')}</h2>
    </div>
  );
}

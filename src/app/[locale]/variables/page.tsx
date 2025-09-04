'use client';

import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('Variables');
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 p-8 text-black">
      <h2 className="text-3xl font-bold">{t('title')}</h2>
    </div>
  );
}

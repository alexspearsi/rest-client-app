'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('HomePage');
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 text-black p-8">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <div className="flex gap-4">
        <Button
          variant="primary"
          onClick={() => handleNavigate('/authentication')}
        >
          {t('signin')}
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleNavigate('/registration')}
        >
          {t('signup')}
        </Button>
      </div>
      <div className="flex gap-4 mt-30">
        <Button
          variant="secondary"
          onClick={() => handleNavigate('/rest-client')}
        >
          {t('restclient')}
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleNavigate('/variables')}
        >
          {t('variables')}
        </Button>
        <Button variant="secondary" onClick={() => handleNavigate('/history')}>
          {t('history')}
        </Button>
      </div>
    </div>
  );
}

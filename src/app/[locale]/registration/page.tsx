'use client';

import { Heading } from '@/components/ui/typography';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';
import { Loader } from '@/components/loader';

export default function Page() {
  const t = useTranslations('Signup');
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || user) {
    return <Loader />;
  }

  console.log(error);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 p-8">
      <Heading size="h2">{t('title')}</Heading>
    </div>
  );
}

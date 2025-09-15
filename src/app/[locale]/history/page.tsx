'use client';

import ProtectedRoute from '@/components/protected-route';
import { Heading } from '@/components/ui/typography';
import { auth, getUserRequests } from '@/firebase';
import { ResponseStoreType } from '@/stores/response-store';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function Page() {
  const t = useTranslations('History');
  const [requests, setRequests] = useState<ResponseStoreType[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getUserRequests(auth.currentUser?.uid ?? '');
      setRequests(data);
    })();
  }, []);

  console.log('HISTORY', requests);

  return (
    <ProtectedRoute>
      <div className="flex h-screen flex-col items-center justify-center gap-6 p-8">
        <Heading size="h2">{t('title')}</Heading>
      </div>
    </ProtectedRoute>
  );
}

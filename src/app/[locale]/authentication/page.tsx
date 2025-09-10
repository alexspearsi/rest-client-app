'use client';

import { Heading } from '@/components/ui/typography';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { auth, logInWithEmailAndPassword } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useRouter } from '@/i18n/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/loader';
import { toast } from 'sonner';

export default function Page() {
  const t = useTranslations('Signin');
  const tt = useTranslations('Notification');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/');
    }
  }, [user, loading, router]);

  if (loading || user) {
    return <Loader />;
  }

  async function handleLogIn() {
    if (!email || !password) {
      toast.error(tt('fillEmailPassword'));
      return;
    }

    try {
      await logInWithEmailAndPassword(email, password);
      toast.success(tt('loginSuccess'));
    } catch {
      toast.error(tt('loginFailed'));
    }
  }

  return (
    <div className="flex h-[75vh] flex-col items-center justify-center gap-6">
      <Heading size="h2">{t('title')}</Heading>
      <div className="flex flex-col gap-3">
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('emailPlaceholder')}
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('passwordPlaceholder')}
        />
        <Button onClick={handleLogIn}>{t('login')}</Button>
        <div>
          {t('noAccount')}{' '}
          <Link href="/registration" className="text-blue-600 hover:underline">
            {t('registerNow')}
          </Link>
        </div>
      </div>
    </div>
  );
}

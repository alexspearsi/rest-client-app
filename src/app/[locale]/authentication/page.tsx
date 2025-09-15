'use client';

import { Heading } from '@/components/ui/typography';
import { useTranslations } from 'next-intl';
import React, { useCallback, useEffect, useState } from 'react';
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

  const handleLogIn = useCallback(async () => {
    if (!email || !password) {
      toast.error(tt('fillEmailPassword'));
      return;
    }

    const id = toast.loading(tt('loggingIn'));

    try {
      const userCredential = await logInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      const token = await user.getIdToken();

      await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      toast.success(tt('loginSuccess'), { id });
    } catch {
      toast.error(tt('loginFailed'), { id });
    }
  }, [email, password, tt]);

  if (loading) {
    return <Loader />;
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

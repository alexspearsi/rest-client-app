'use client';

import { Heading } from '@/components/ui/typography';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, registerWithEmailAndPassword } from '../../../firebase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader } from '@/components/loader';

export default function Page() {
  const t = useTranslations('Signup');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/');
    }
  }, [user, loading, router]);

  if (loading || user) {
    return <Loader />;
  }

  async function handleSignUp() {
    if (name && email && password) {
      await registerWithEmailAndPassword(name, email, password);
      router.replace('/');
    } else {
      console.log(error, '%c Fill all fields', 'color: red');
    }
  }

  return (
    <div className="flex h-[75vh] flex-col items-center justify-center gap-6">
      <Heading size="h2">{t('title')}</Heading>
      <div className="flex flex-col gap-3">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('namePlaceholder')}
        />
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
        <Button onClick={handleSignUp}>{t('register')}</Button>
        <div>
          {t('haveAccount')}{' '}
          <Link
            href="/authentication"
            className="text-blue-600 hover:underline"
          >
            {t('loginNow')}
          </Link>
        </div>
      </div>
    </div>
  );
}

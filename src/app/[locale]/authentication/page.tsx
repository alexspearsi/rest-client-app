'use client';

import { Heading } from '@/components/ui/typography';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Page() {
  const t = useTranslations('Signin');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (error) {
      console.log('Error during login');
      return;
    }
    if (user) {
      router.push('/');
    }
  }, [user, loading, error, router]);

  return (
    <div className="flex h-[75vh] flex-col items-center justify-center gap-6">
      <Heading size="h2">{t('title')}</Heading>
      <div className="flex flex-col gap-3">
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button onClick={() => logInWithEmailAndPassword(email, password)}>
          Login
        </Button>
        <Button onClick={signInWithGoogle}>Login with Google</Button>
        <div>
          Don&apos;t have an account? <Link href="/register">Register</Link>{' '}
          now.
        </div>
      </div>
    </div>
  );
}

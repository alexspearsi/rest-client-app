'use client';

import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from '@/i18n/navigation';

export function AuthProvider() {
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        await fetch('/api/session/logout', { method: 'POST' });
        router.push('/');
      }
    });

    return () => unsubscribe();
  });

  return null;
}

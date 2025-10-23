'use client';

import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export function AuthProvider() {
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        await fetch('/api/session/logout', { method: 'POST' });
      }
    });

    return () => unsubscribe();
  }, []);

  return null;
}

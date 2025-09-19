'use client';

import { auth } from '@/firebase';
import { useRouter } from '@/i18n/navigation';
import { ReactNode, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Loader } from './loader';

type Props = {
  children?: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loader />;
  }

  return <>{user && children}</>;
}

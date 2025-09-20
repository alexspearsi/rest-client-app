'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import { Loader } from '@/components/loader';
import { useRouter } from '@/i18n/navigation';
import dynamic from 'next/dynamic';

const VariablesContent = dynamic(
  () => import('@/components/variables-content'),
  {
    ssr: false,
    loading: () => <Loader />,
  },
);

export default function Page() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    router.replace('/');
    return null;
  }

  return <VariablesContent />;
}

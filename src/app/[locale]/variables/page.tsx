import { cookies } from 'next/headers';
import { adminAuth } from '@/firebaseAdmin';
import { Loader } from '@/components/loader';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

const VariablesContent = dynamic(
  () => import('@/components/variables-content'),
  {
    ssr: true,
    loading: () => <Loader />,
  },
);

export default async function Page() {
  const token = (await cookies()).get('token')?.value;

  if (!token) {
    redirect('/');
  }

  const decoded = await adminAuth.verifyIdToken(token).catch(() => {
    return null;
  });

  if (!decoded) {
    redirect('/');
  }

  return <VariablesContent />;
}

import type { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { adminAuth } from '@/firebaseAdmin';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { Loader } from '@/components/loader';

const RestclientComponent = dynamic(
  () => import('@/components/restclient-component'),
  {
    ssr: true,
    loading: () => <Loader />,
  },
);

export default async function RestClientLayout({
  children,
}: {
  children: ReactNode;
}) {
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

  return <RestclientComponent>{children}</RestclientComponent>;
}

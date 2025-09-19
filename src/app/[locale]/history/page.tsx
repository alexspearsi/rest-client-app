import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/firebaseAdmin';
import { Loader } from '@/components/loader';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

type RequestItem = {
  id: string;
  statusCode: number;
  statusText: string;
  method: string;
  resSize: number;
  reqSize: number;
  duration: number;
  timestamp: number;
  data: unknown;
  error: string | null;
  url: string;
};

const HistoryContent = dynamic(() => import('@/components/history-content'), {
  ssr: true,
  loading: () => <Loader />,
});

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

  const { uid } = decoded;

  const snapshot = await adminDb
    .collection('users')
    .doc(uid)
    .collection('requests')
    .orderBy('timestamp', 'desc')
    .get();

  const requests: RequestItem[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<RequestItem, 'id'>),
  }));

  return <HistoryContent requests={requests} />;
}

import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/firebaseAdmin';
import { Loader } from '@/components/loader';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { RequestItem } from '@/types/types';
import { Heading } from '@/components/ui/typography';
import MobileHistoryContent from '@/components/history/mobile-history-content';

const HistoryContent = dynamic(
  () => import('@/components/history/history-content'),
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

  return (
    <section>
      <div className="container mx-auto px-4 py-16 lg:px-20">
        <div className="space-y-12">
          <div className="space-y-2 text-center">
            <Heading size="h2">History</Heading>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              View your API request history and performance metrics
            </p>
          </div>
          <div className="bg-background overflow-hidden rounded-lg border shadow-sm">
            <div className="bg-secondary border-b px-6 py-4">
              <p className="text-foreground text-lg font-semibold">
                Request History
              </p>
            </div>
            <HistoryContent requests={requests} />
            <MobileHistoryContent requests={requests} />
          </div>
        </div>
      </div>
    </section>
  );
}

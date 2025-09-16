import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/firebaseAdmin';
import { Link } from '@/i18n/navigation';
import { Heading } from '@/components/ui/typography';

const MILLISECONDS = 1000;

type RequestItem = {
  id: string;
  statusCode: number;
  statusText: string;
  method: string;
  resSize: number;
  reqSize: number;
  duration: number;
  timestamp: {
    _nanoseconds: number;
    _seconds: number;
  };
  data: unknown;
  error: string | null;
  url: string;
};

export default async function Page() {
  const token = (await cookies()).get('token')?.value;

  if (!token) {
    return <div className="p-4">Unauthorized</div>;
  }

  const decoded = await adminAuth.verifyIdToken(token).catch(() => {
    return null;
  });

  if (!decoded) {
    return <div className="p-4">Unauthorized</div>;
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

  if (requests.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <p>You haven&apos;t executed any requests yet</p>
        <p>It&apos;s empty here. Try:</p>
        <Link href="/rest-client" className="text-blue-500">
          REST client
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-4 py-10">
      <Heading size="h2">History</Heading>

      <div className="w-full overflow-x-auto">
        <table className="mx-auto min-w-[800px] border text-sm">
          <thead>
            <tr>
              <th className="p-2">Method</th>
              <th className="p-2">Endpoint</th>
              <th className="p-2">Status</th>
              <th className="p-2">Duration</th>
              <th className="p-2">Req Size</th>
              <th className="p-2">Res Size</th>
              <th className="p-2">Timestamp</th>
              <th className="p-2">Error</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td className="p-2">{req.method}</td>
                <td className="p-2">{req.url}</td>
                <td className="p-2">{req.statusCode}</td>
                <td className="p-2">{req.duration} ms</td>
                <td className="p-2">{req.reqSize} B</td>
                <td className="p-2">{req.resSize} B</td>
                <td className="p-2">
                  {new Date(
                    req.timestamp._seconds * MILLISECONDS,
                  ).toLocaleString()}
                </td>
                <td className="p-2">{req.error || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/firebaseAdmin';
import { Link } from '@/i18n/navigation';
import { Heading } from '@/components/ui/typography';

type RequestItem = {
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

  console.log(requests);

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <h2>You haven&apos;t executed any requests yet</h2>
        <p>It&apos;s empty here. Try those options:</p>
        <Link href="/rest-client" className="text-blue-500">
          Go to REST client
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-[75vh] w-full flex-col items-center justify-center gap-6 px-4">
      <Heading>History</Heading>

      <div className="flex w-full justify-center overflow-x-auto">
        <table className="min-w-[800px] border text-sm">
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
            {requests.map((req, index) => (
              <tr key={index}>
                <td className="p-2">{req.method}</td>
                <td className="p-2">{req.url}</td>
                <td className="p-2">{req.statusCode}</td>
                <td className="p-2">{req.duration} ms</td>
                <td className="p-2">{req.reqSize} B</td>
                <td className="p-2">{req.resSize} B</td>
                <td className="p-2">
                  {new Date(req.timestamp._seconds * 1000).toLocaleString()}
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

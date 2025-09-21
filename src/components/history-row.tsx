'use client';

import { useRouter } from '@/i18n/navigation';
import { getStatusClass } from '@/utils/get-status-class';
import { RequestItem } from '../types/types';
import { useTranslations } from 'next-intl';

export default function HistoryRow({ req }: { req: RequestItem }) {
  const router = useRouter();
  const t = useTranslations('History');

  return (
    <tr
      onClick={() => router.push(req.link)}
      className="cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <td className="p-2 text-center">{req.method?.toUpperCase()}</td>
      <td className="text-blue-700">{req.url}</td>
      <td className={`p-2 text-center ${getStatusClass(req.statusCode)}`}>
        {req.statusCode}
      </td>
      <td className="p-2 text-center">
        {req.duration} {t('ms')}
      </td>
      <td className="p-2 text-center">
        {req.reqSize} {t('byte')}
      </td>
      <td className="p-2 text-center">
        {req.resSize} {t('byte')}
      </td>
      <td className="p-2 text-center">
        {new Date(req.timestamp).toLocaleString()}
      </td>
      <td className="p-2 text-center">{req.error || '-'}</td>
    </tr>
  );
}

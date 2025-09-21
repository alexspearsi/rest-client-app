'use client';

import { useRouter } from '@/i18n/navigation';
import { getStatusBgClass, getStatusClass } from '@/utils/get-status-class';
import { RequestItem } from '../../types/types';
import { useTranslations } from 'next-intl';
import { Badge } from '../ui/badge';
import getMethodColor from '@/utils/get-method-color';
import formatBytes from '@/utils/format-bytes';

export default function HistoryRow({ req }: { req: RequestItem }) {
  const router = useRouter();
  const t = useTranslations('History');

  const sizes = [t('b'), t('kb'), t('mb')];

  return (
    <tr
      onClick={() => router.push(req.link)}
      className="hover:bg-accent cursor-pointer transition-colors duration-150"
    >
      <td className="p-2">
        <Badge
          variant="secondary"
          className={`rounded-md px-2 py-1 text-sm font-semibold ${getMethodColor(req.method.toUpperCase())} border-0`}
        >
          {req.method.toUpperCase()}
        </Badge>
      </td>

      <td className="p-2">
        <div className="text-chart-2 max-w-xs truncate text-base">
          {req.url}
        </div>
        {req.error && (
          <div className="text-destructive mt-1 text-sm font-medium">
            {req.error}
          </div>
        )}
      </td>

      <td className="p-2">
        <div className="flex items-center gap-3">
          <div
            className={`h-2 w-2 rounded-full ${getStatusBgClass(req.statusCode)}`}
          />
          <div
            className={`text-sm font-semibold ${getStatusClass(req.statusCode)}`}
          >
            {req.statusCode}
          </div>
        </div>
      </td>

      <td className="p-2">
        <span className="text-sm font-medium">
          {req.duration}
          {t('ms')}
        </span>
      </td>

      <td className="p-2">
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">↑</span>
            <span>{formatBytes(req.reqSize, sizes)}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">↓</span>
            <span>{formatBytes(req.resSize, sizes)}</span>
          </div>
        </div>
      </td>

      <td className="p-2">
        <span className="text-sm">
          {new Date(req.timestamp).toLocaleString()}
        </span>
      </td>
    </tr>
  );
}

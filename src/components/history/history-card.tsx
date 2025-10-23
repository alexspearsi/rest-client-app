'use client';

import { useRouter } from '@/i18n/navigation';
import { getStatusBgClass, getStatusClass } from '@/utils/get-status-class';
import { RequestItem } from '../../types/types';
import { useTranslations } from 'next-intl';
import { Badge } from '../ui/badge';
import getMethodColor from '@/utils/get-method-color';
import formatBytes from '@/utils/format-bytes';

export default function HistoryCard({ req }: { req: RequestItem }) {
  const router = useRouter();
  const t = useTranslations('History');

  const sizes = [t('b'), t('kb'), t('mb')];

  return (
    <div
      onClick={() => router.push(req.link)}
      className="hover:bg-accent cursor-pointer p-4 transition-colors duration-150"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge
            variant="secondary"
            className={`rounded-md px-2 py-1 text-sm font-semibold ${getMethodColor(req.method.toUpperCase())} border-0`}
          >
            {req.method.toUpperCase()}
          </Badge>
          <div className="flex items-center justify-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${getStatusBgClass(req.statusCode)}`}
            />
            <div
              className={`text-sm font-semibold ${getStatusClass(req.statusCode)}`}
            >
              {req.statusCode}
            </div>
          </div>
        </div>
        <span className="text-sm font-medium">
          {req.duration}
          {t('ms')}
        </span>
      </div>

      <div className="text-chart-2 mb-3 text-base break-all">{req.url}</div>

      <div className="text-muted-foreground flex items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          <span>↑ {formatBytes(req.reqSize, sizes)}</span>
          <span>↓ {formatBytes(req.resSize, sizes)}</span>
        </div>
        <span>{new Date(req.timestamp).toLocaleString()}</span>
      </div>

      {req.error && (
        <div className="mt-3 border-t pt-3">
          <span className="text-destructive text-sm font-medium">
            {req.error}
          </span>
        </div>
      )}
    </div>
  );
}

import { ResponseStoreType } from '@/stores/response-store';
import {
  pickSizeColor,
  pickStatusColor,
  pickTimeColor,
} from '@/utils/pick-response-color';
import { useTranslations } from 'next-intl';
import type { JSX } from 'react';

type StatusBarProps = {
  responseData: ResponseStoreType;
};

export default function StatusBar(props: StatusBarProps): JSX.Element {
  const { responseData } = props;

  const t = useTranslations('RestClient');

  const statusColor = pickStatusColor(responseData.statusCode);
  const sizeColor = pickSizeColor(responseData.resSize);
  const timeColor = pickTimeColor(responseData.duration);

  return (
    <div className="flex min-h-[36px] items-center gap-4 px-2">
      <div>
        <span>{t('status') + ': '}</span>
        <span className={statusColor.length > 0 ? statusColor : ''}>
          {responseData.statusCode + ' ' + responseData.statusText}
        </span>
      </div>
      <div>
        <span>{t('size') + ': '}</span>
        <span className={sizeColor.length > 0 ? sizeColor : ''}>
          {responseData.resSize + ' ' + t('byte')}
        </span>
      </div>
      <div>
        <span>{t('time') + ': '}</span>
        <span className={timeColor.length > 0 ? timeColor : ''}>
          {responseData.duration + ' ' + t('ms')}
        </span>
      </div>
    </div>
  );
}

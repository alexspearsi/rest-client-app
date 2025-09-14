import { ResponseStoreType } from '@/stores/response-store';
import {
  pickSizeColor,
  pickStatusColor,
  pickTimeColor,
} from '@/utils/pick-response-color';
import type { JSX } from 'react';

type StatusBarProps = {
  responseData: ResponseStoreType;
};

export default function StatusBar(props: StatusBarProps): JSX.Element {
  const { responseData } = props;

  const statusColor = pickStatusColor(responseData.statusCode);
  const sizeColor = pickSizeColor(responseData.size);
  const timeColor = pickTimeColor(responseData.time);

  return (
    <div className="flex min-h-[36px] items-center gap-4 px-2">
      <div>
        <span>Status: </span>
        <span className={statusColor.length > 0 ? statusColor : ''}>
          {responseData.statusCode + ' ' + responseData.statusText}
        </span>
      </div>
      <div>
        <span>Size: </span>
        <span className={sizeColor.length > 0 ? sizeColor : ''}>
          {responseData.size + ' byte'}
        </span>
      </div>
      <div>
        <span>Time: </span>
        <span className={timeColor.length > 0 ? timeColor : ''}>
          {responseData.time + ' ms'}
        </span>
      </div>
    </div>
  );
}

import { ResponseStoreType } from '@/stores/response-store';
import type { JSX } from 'react';

type StatusBarProps = {
  responseData: ResponseStoreType;
};

export default function StatusBar(props: StatusBarProps): JSX.Element {
  const { responseData } = props;

  return (
    <div className="flex gap-2">
      <div>
        <span>Status: </span>
        <span>{responseData.statusCode + ' ' + responseData.statusText}</span>
      </div>
      <div>
        <span>Size: </span>
        <span>{responseData.size + ' byte'}</span>
      </div>
      <div>
        <span>Time: </span>
        <span>{responseData.time + ' ms'}</span>
      </div>
    </div>
  );
}

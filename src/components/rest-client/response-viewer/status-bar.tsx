import { Badge } from '@/components/ui/badge';
import { ResponseStoreType } from '@/stores/response-store';
import { pickStatusColor } from '@/utils/pick-response-color';
import type { JSX } from 'react';

type StatusBarProps = {
  responseData: ResponseStoreType;
};

export default function StatusBar(props: StatusBarProps): JSX.Element {
  const { responseData } = props;

  const statusColor = pickStatusColor(responseData.statusCode);

  return (
    <>
      {responseData.statusText && (
        <Badge variant="outline" className={statusColor}>
          {responseData.statusCode + ' ' + responseData.statusText}
        </Badge>
      )}
    </>
  );
}

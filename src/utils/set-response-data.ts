import { getSize } from './get-response-size';
import { ResponseDataType } from '@/components/rest-client/types';

export function setResponseData(data: ResponseDataType) {
  return {
    statusCode: data.status,
    statusText: data.statusText,
    method: data.method,
    resSize: getSize(JSON.stringify(data.responseData)),
    reqSize: getSize(JSON.stringify(data.body)),
    duration: data.time,
    timestamp: data.start,
    data: data.responseData,
    error: data.status > 399 ? data.statusText : null,
    url: data.url,
  };
}

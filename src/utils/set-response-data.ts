import { RequestItems } from '@/stores/request-store';
import { getSize } from './get-response-size';

export function setResponseData(
  response: Response,
  responseData: unknown,
  time: number,
  timestamp: Date,
  data: RequestItems,
  bodyData: string,
) {
  return {
    statusCode: response.status,
    statusText: response.statusText,
    method: data.method,
    resSize: getSize(JSON.stringify(responseData)),
    reqSize: getSize(JSON.stringify(bodyData)),
    duration: time,
    timestamp,
    data: responseData,
    error: response.status > 399 ? response.statusText : null,
    url: data.url,
  };
}

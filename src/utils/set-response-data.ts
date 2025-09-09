import { getSize } from './get-response-size';

export function setResponseData(
  response: Response,
  responseData: unknown,
  time: number,
) {
  return {
    statusCode: response.status,
    statusText: response.statusText,
    size: getSize(JSON.stringify(responseData)),
    time: time,
    data: responseData,
  };
}

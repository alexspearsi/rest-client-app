import { RequestItems } from '@/stores/request-store';
import { setResponseData } from '@/utils/set-response-data';

type SubmitDataProps = {
  data: RequestItems;
  base64Url: string;
  base64Body: [string | null, Record<string, string>];
  queries: string;
  bodyData: string;
};

export default async function submitData(props: SubmitDataProps) {
  const { data, base64Url, base64Body, queries, bodyData } = props;

  try {
    const start = Date.now();

    const response = await fetch(
      `/api/${data.method}/${base64Url}${base64Body[0] ?? ''}${queries.length > 0 ? '?' + queries : ''}`,
      {
        method: data.method,
      },
    );

    if (!response.ok) {
      const responseData: unknown = await response.text();

      const end = Date.now();
      const time = end - start;

      return setResponseData(
        response,
        responseData,
        time,
        start,
        data,
        bodyData,
      );
    }

    const option =
      data.method === 'head' || data.method === 'options' ? 'text' : 'json';

    const responseData: unknown = await response[option]();

    const end = Date.now();
    const time = end - start;

    return setResponseData(response, responseData, time, start, data, bodyData);
  } catch (error) {
    if (error instanceof Error) {
      return error;
    }
  }
}

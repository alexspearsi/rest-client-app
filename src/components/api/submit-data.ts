type SubmitDataProps = {
  method: string;
  decodedUrl: string;
  decodedBody: string;
  headersObject: Record<string, string | undefined>;
};

export default async function submitData(props: SubmitDataProps) {
  const { method, decodedUrl, decodedBody, headersObject } = props;

  const start = Date.now();
  try {
    const response = await fetch(decodedUrl, {
      method: method,
      headers: { ...(headersObject as unknown as Record<string, string>) },
      body: decodedBody || null,
    });

    if (!response.ok) {
      const responseData: unknown = await response.text();

      const end = Date.now();
      const time = end - start;

      return {
        status: response.status,
        statusText: response.statusText,
        responseData,
        time,
        start,
        url: decodedUrl,
        body: decodedBody,
        method,
      };
    }

    const option = method === 'head' || method === 'options' ? 'text' : 'json';

    const responseData: unknown = await response[option]();

    const end = Date.now();
    const time = end - start;

    return {
      status: response.status,
      statusText: response.statusText,
      responseData,
      time,
      start,
      url: decodedUrl,
      body: decodedBody,
      method,
    };
  } catch (error) {
    if (error instanceof Error) {
      const end = Date.now();
      const time = end - start;
      return {
        status: 500,
        statusText: error.message,
        responseData: null,
        time,
        start,
        url: decodedUrl,
        body: decodedBody,
        method,
      };
    }
  }
}

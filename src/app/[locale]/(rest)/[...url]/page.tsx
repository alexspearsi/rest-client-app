import submitData from '@/components/api/submit-data';
import { CollectState } from '@/components/rest-client/collect-state';
import { ResponseDataType } from '@/components/rest-client/types';
import { decodeData } from '@/utils/body-to-base64';

import { type JSX } from 'react';

type PageProps = {
  params: Promise<{ locale: string; url: string[] }>;
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function Page({
  params,
  searchParams,
}: PageProps): Promise<JSX.Element> {
  const { url } = await params;
  const headersObject = await searchParams;

  const [, method, urlLink, body] = url;

  const decodedUrl = decodeData(urlLink ?? '');
  const decodedBody = decodeData(body ?? '');

  const data: ResponseDataType | undefined = await submitData({
    method,
    decodedUrl,
    decodedBody,
    headersObject,
  });

  return (
    <>{data && <CollectState data={data} headersObject={headersObject} />}</>
  );
}

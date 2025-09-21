'use client';

import { setResponseData } from '@/utils/set-response-data';
import { useEffect, type JSX } from 'react';
import { ResponseDataType } from './types';
import { useResponseStore } from '@/stores/response-store';
import { cloneItWithoutKeys } from '@/utils/clone-it-without-keys';
import { auth, saveUserRequest } from '@/firebase';
import { useRequestStore } from '@/stores/request-store';
import { useBodyStore } from '@/stores/body-store';
import { useHeadersStore } from '@/stores/headers-store';
import { useTrueValuesStore } from '@/stores/true-values-store';

type CollectStateProps = {
  data: ResponseDataType;
  headersObject: Record<string, string | undefined>;
  link: string;
};

export function CollectState(props: CollectStateProps): JSX.Element {
  const { data, headersObject, link } = props;

  const updateResponse = useResponseStore((state) => state.updateResponse);
  const updateUrl = useRequestStore((state) => state.updateUrl);
  const updateMethod = useRequestStore((state) => state.updateMethod);

  const updateBody = useBodyStore((state) => state.updateBody);

  const replaceHeader = useHeadersStore((state) => state.replaceHeader);

  const trueValues = useTrueValuesStore((state) => state.trueValues);

  useEffect(() => {
    const result = setResponseData(data);
    console.log('RESULT', result);
    updateMethod(data.method);
    updateResponse(result);
    updateUrl(trueValues.url || data.url);
    updateBody(trueValues.body || data.body);
    replaceHeader(
      trueValues.headers.length > 0 ? trueValues.headers : headersObject,
    );

    const clone = cloneItWithoutKeys(result, ['statusText', 'data']);
    clone.method = clone.method.toUpperCase();
    clone.link = link;
    clone.url = trueValues.url || data.url;

    const id = auth.currentUser?.uid;
    if (id) {
      saveUserRequest(id, clone);
    }
  }, [
    data,
    headersObject,
    link,
    replaceHeader,
    trueValues.body,
    trueValues.headers,
    trueValues.url,
    updateBody,
    updateMethod,
    updateResponse,
    updateUrl,
  ]);

  return <></>;
}

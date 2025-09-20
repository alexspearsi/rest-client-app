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

  useEffect(() => {
    const result = setResponseData(data);
    updateMethod(data.method);
    updateResponse(result);
    updateUrl(data.url);
    updateBody(data.body);
    replaceHeader(headersObject);

    const clone = cloneItWithoutKeys(result, ['statusText', 'data']);
    clone.method = clone.method.toUpperCase();
    clone.link = link;

    const id = auth.currentUser?.uid;
    if (id) {
      saveUserRequest(id, clone);
    }
  }, [
    data,
    headersObject,
    link,
    replaceHeader,
    updateBody,
    updateMethod,
    updateResponse,
    updateUrl,
  ]);

  return <></>;
}

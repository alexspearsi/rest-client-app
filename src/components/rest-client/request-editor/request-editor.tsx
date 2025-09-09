'use client';

import { useRef, type FormEvent, type JSX } from 'react';
import MethodSelector from './method-selector/method-selector';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createParams } from '@/utils/create-params';
import { useHeadersStore } from '@/stores/headers-store';
import { useBodyStore } from '@/stores/body-store';
import { bodyToBase64 } from '@/utils/body-to-base64';
import { useResponseStore } from '@/stores/response-store';
import { setResponseData } from '@/utils/set-response-data';

type RequestFormData = {
  method: string;
  url: string;
};

export default function RequestEditor(): JSX.Element {
  const headerItems = useHeadersStore((state) => state.headers);
  const bodyData = useBodyStore((state) => state.body);
  const updateResponse = useResponseStore((state) => state.updateResponse);

  const formReference = useRef<HTMLFormElement>(null);

  const t = useTranslations('RestClient');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (formReference.current instanceof HTMLFormElement) {
      const formData = new FormData(formReference.current);
      const data = Object.fromEntries(formData) as unknown as RequestFormData;

      const base64Url = btoa(encodeURIComponent(data.url));

      const base64Body = bodyToBase64(bodyData);

      const queries = createParams(headerItems, base64Body[1]).toString();

      try {
        const start = Date.now();

        const response = await fetch(
          `/api/${data.method}/${base64Url}${base64Body[0] ?? ''}${queries.length > 0 ? '?' + queries : ''}`,
          {
            method: data.method,
          },
        );

        const responseData: unknown = await response.json();

        if (!response.ok) {
          const responseData: unknown = await response.text();
          const end = Date.now();
          const time = end - start;
          console.log(responseData);
          updateResponse(setResponseData(response, responseData, time));
          return;
        }

        const end = Date.now();
        const time = end - start;
        updateResponse(setResponseData(response, responseData, time));
        console.log(responseData);
      } catch (error) {
        console.warn(error);
      }
    }
  }

  return (
    <div>
      <form
        className="flex items-center"
        ref={formReference}
        action=""
        onSubmit={handleSubmit}
        name="request-form"
      >
        <MethodSelector />
        <Input
          className="w-full rounded-none border-r-0 border-l-0"
          type="text"
          placeholder={t('url')}
          name="url"
          // pattern="^https?:\/\/(?:w{3}\.)?\w{1,}\.\w{1,6}\b(?:\S*)$"
          required
        />
        <Button
          className="w-24 rounded-none rounded-r-lg"
          type="submit"
          title={t('sendTitle')}
        >
          {t('send')}
        </Button>
      </form>
    </div>
  );
}

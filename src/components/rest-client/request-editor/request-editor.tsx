'use client';

import { useRef, type FormEvent, type JSX } from 'react';
import MethodSelector from './method-selector/method-selector';
import { HeadersItems } from '../rest-client';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createParams } from '@/utils/create-params';

type RequestEditorProps = {
  headerItems: HeadersItems[];
};

type RequestFormData = {
  method: string;
  url: string;
};

export default function RequestEditor(props: RequestEditorProps): JSX.Element {
  const { headerItems } = props;

  const formReference = useRef<HTMLFormElement>(null);

  const t = useTranslations('RestClient');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (formReference.current instanceof HTMLFormElement) {
      const formData = new FormData(formReference.current);
      const data = Object.fromEntries(formData) as unknown as RequestFormData;

      const base64Url = btoa(encodeURIComponent(data.url));

      const base64Body = btoa(
        encodeURIComponent(JSON.stringify({ test: 123 })),
      );

      const queries = createParams(headerItems);

      const response = await fetch(
        `/api/${data.method}/${base64Url}/${base64Body}?${queries.toString()}`,
        {
          method: data.method,
        },
      );
      const responseData: unknown = await response.json();
      console.log(responseData);
    }
  }

  return (
    <div>
      <form
        className="flex items-center gap-2"
        ref={formReference}
        action=""
        onSubmit={handleSubmit}
        name="request-form"
      >
        <MethodSelector />
        <Input
          type="text"
          placeholder="Enter url"
          name="url"
          // pattern="^https?:\/\/(?:w{3}\.)?\w{1,}\.\w{1,6}\b(?:\S*)$"
          // required
        />
        <Button type="submit">{t('send')}</Button>
      </form>
    </div>
  );
}

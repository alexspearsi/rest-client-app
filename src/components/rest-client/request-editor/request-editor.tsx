'use client';

import type { ChangeEvent, FormEvent, JSX } from 'react';
import { useRef } from 'react';
import MethodSelector from './method-selector/method-selector';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createParams } from '@/utils/create-params';
import { useHeadersStore } from '@/stores/headers-store';
import { useBodyStore } from '@/stores/body-store';
import { bodyToBase64, encodeData } from '@/utils/body-to-base64';
import { RequestItems, useRequestStore } from '@/stores/request-store';
import { useRestFormSchema } from '@/lib/schemas/use-rest-form-schema';
import { validateForm } from './validate-form';
import { useRouter } from '@/i18n/navigation';

export default function RequestEditor(): JSX.Element {
  const router = useRouter();

  const formReference = useRef<HTMLFormElement>(null);
  const restFormSchema = useRestFormSchema();
  const t = useTranslations('RestClient');

  const headerItems = useHeadersStore((state) => state.headers);
  const bodyData = useBodyStore((state) => state.body);

  const requestUrl = useRequestStore((state) => state.url);
  const updateUrl = useRequestStore((state) => state.updateUrl);

  function handleValueChange(event: ChangeEvent<HTMLInputElement>): void {
    updateUrl(event.target.value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (formReference.current instanceof HTMLFormElement) {
      const formData = new FormData(formReference.current);
      const data = Object.fromEntries(formData) as unknown as RequestItems;

      const isParsed = validateForm(restFormSchema, data);
      if (!isParsed) return;

      const base64Url = encodeData(data.url);
      const base64Body = bodyToBase64(bodyData);
      const queries = createParams(headerItems, base64Body[1]).toString();
      const url = `/api/${data.method}/${base64Url}${base64Body[0] ?? ''}${queries.length > 0 ? '?' + queries : ''}`;

      router.push(url);

      return;
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
          className="h-10 w-full rounded-none border-x-0"
          type="text"
          placeholder={t('url')}
          name="url"
          value={requestUrl}
          onChange={handleValueChange}
          required
        />

        <Button
          className="h-10 rounded-none rounded-r-lg"
          size="lg"
          type="submit"
          title={t('sendTitle')}
        >
          {t('send')}
        </Button>
      </form>
    </div>
  );
}

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
import { parseVariable } from '@/utils/parse-variable';
import { useVariablesStore } from '@/stores/variables-store';
import { useTrueValuesStore } from '@/stores/true-values-store';

type RequestEditorTypes = {
  handleTabChange: (val: string) => void;
};

export default function RequestEditor(props: RequestEditorTypes): JSX.Element {
  const { handleTabChange } = props;
  const router = useRouter();

  const formReference = useRef<HTMLFormElement>(null);
  const restFormSchema = useRestFormSchema();
  const t = useTranslations('RestClient');

  const headerItems = useHeadersStore((state) => state.headers);
  const bodyData = useBodyStore((state) => state.body);

  const requestUrl = useRequestStore((state) => state.url);
  const updateUrl = useRequestStore((state) => state.updateUrl);

  const setTrueValues = useTrueValuesStore((state) => state.setValue);
  const variables = useVariablesStore((state) => state.variables);

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

      setTrueValues({
        url: data.url,
        headers: headerItems,
        body: bodyData,
      });

      const base64Url = encodeData(parseVariable(data.url, variables));
      const base64Body = bodyToBase64(parseVariable(bodyData, variables));
      const queries = createParams(
        headerItems,
        base64Body[1],
        variables,
      ).toString();

      const url = `/api/${data.method}/${base64Url}${base64Body[0] ?? ''}${queries.length > 0 ? '?' + queries : ''}`;

      handleTabChange('response');
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
          className="w-full rounded-none border-r-0 border-l-0"
          type="text"
          placeholder={t('url')}
          name="url"
          value={requestUrl}
          onChange={handleValueChange}
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

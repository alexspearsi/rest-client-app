'use client';

import type { FormEvent, JSX } from 'react';
import MethodSelector from './method-selector/method-selector';
import { HeadersItems } from '../rest-client';
import { useTranslations } from 'next-intl';

type RequestEditorProps = {
  headerItems: HeadersItems[];
};

export default function RequestEditor(props: RequestEditorProps): JSX.Element {
  const { headerItems } = props;

  const t = useTranslations('RestClient');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(headerItems);
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit} name="request-form">
        <MethodSelector />
        <input type="text" name="url" />
        <button type="submit">{t('send')}</button>
      </form>
    </div>
  );
}

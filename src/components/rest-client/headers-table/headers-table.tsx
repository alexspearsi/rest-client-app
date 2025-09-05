'use client';

import { type JSX } from 'react';
import { useTranslations } from 'next-intl';
import HeadersItem from './headers-item/headers-item';
import type { HeadersItems } from '../rest-client';

type HeadersTableProps = {
  headerItems: HeadersItems[];
  addHeader: (headerItem: HeadersItems) => void;
  removeHeader: (id: string) => void;
  updateHeader: (headerItem: HeadersItems) => void;
};

export default function HeadersTable(props: HeadersTableProps): JSX.Element {
  const { headerItems, addHeader, removeHeader, updateHeader } = props;

  const t = useTranslations('RestClient');

  function handleClick() {
    const item = {
      id: crypto.randomUUID(),
      name: '',
      value: '',
      checked: false,
    };

    addHeader(item);
  }

  return (
    <div>
      <h2 className="text-2xl">{t('headers')}</h2>
      {headerItems.map((item) => (
        <HeadersItem
          key={item.id}
          id={item.id}
          removeHeader={removeHeader}
          updateHeader={updateHeader}
        />
      ))}
      <button type="button" onClick={handleClick}>
        Add +1
      </button>
    </div>
  );
}

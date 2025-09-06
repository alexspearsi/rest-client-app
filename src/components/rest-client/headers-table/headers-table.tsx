'use client';

import { type JSX } from 'react';
import { useTranslations } from 'next-intl';
import HeadersItem from './headers-item/headers-item';
import type { HeadersItems } from '../rest-client';
import { Heading } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

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
    <div className="flex flex-col gap-2">
      <Heading size="h4">{t('headers')}</Heading>
      {headerItems.map((item) => (
        <HeadersItem
          key={item.id}
          id={item.id}
          removeHeader={removeHeader}
          updateHeader={updateHeader}
        />
      ))}
      <Button type="button" onClick={handleClick} size={'icon'}>
        <Plus />
      </Button>
    </div>
  );
}

'use client';

import { type JSX } from 'react';
import { useTranslations } from 'next-intl';
import HeadersItem from './headers-item/headers-item';
import { Heading } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useHeadersStore } from '@/stores/headers-store';

export default function HeadersTable(): JSX.Element {
  const headerItems = useHeadersStore((state) => state.headers);
  const addHeader = useHeadersStore((state) => state.addHeader);

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
        <HeadersItem key={item.id} id={item.id} />
      ))}
      <Button type="button" onClick={handleClick} size={'icon'}>
        <Plus />
      </Button>
    </div>
  );
}

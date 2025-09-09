'use client';

import { type JSX } from 'react';

import HeadersItem from './headers-item/headers-item';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useHeadersStore } from '@/stores/headers-store';

export default function HeadersTable(): JSX.Element {
  const headerItems = useHeadersStore((state) => state.headers);
  const addHeader = useHeadersStore((state) => state.addHeader);

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
    <div className="flex min-h-[322px] flex-col gap-2">
      {headerItems.map((item) => (
        <HeadersItem key={item.id} headerItemData={item} />
      ))}
      <Button type="button" onClick={handleClick} size={'icon'}>
        <Plus />
      </Button>
    </div>
  );
}

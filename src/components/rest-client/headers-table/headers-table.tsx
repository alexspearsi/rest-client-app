'use client';

import { type JSX } from 'react';

import HeadersItem from './headers-item/headers-item';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useHeadersStore } from '@/stores/headers-store';
import { Label } from '@/components/ui/label';

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Request Headers</Label>
        <Button variant="outline" onClick={handleClick}>
          <Plus className="h-4 w-4" />
          Add Header
        </Button>
      </div>
      <div className="flex w-full flex-col gap-2">
        {headerItems.map((item) => (
          <HeadersItem key={item.id} headerItemData={item} />
        ))}
      </div>
    </div>
  );
}

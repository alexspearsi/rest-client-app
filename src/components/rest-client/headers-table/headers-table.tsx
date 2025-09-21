'use client';

import { type JSX } from 'react';

import HeadersItem from './headers-item/headers-item';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useHeadersStore } from '@/stores/headers-store';
import { Label } from '@/components/ui/label';
import CustomTooltip from '@/components/ui/custom-tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';

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
        <Label className="text-lg font-semibold">Request Headers</Label>
        <CustomTooltip content="Add Header">
          <Button variant="outline" size="icon" onClick={handleClick}>
            <Plus className="h-4 w-4" />
          </Button>
        </CustomTooltip>
      </div>
      <ScrollArea className="h-[250px] rounded-lg border">
        <div className="flex w-full flex-col gap-2 p-4">
          {headerItems.map((item) => (
            <HeadersItem key={item.id} headerItemData={item} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

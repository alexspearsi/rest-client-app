'use client';

import type { ChangeEvent, JSX } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';
import { useHeadersStore } from '@/stores/headers-store';
import { HeadersItems } from '../../rest-client';

type HeaderItemProps = {
  headerItemData: HeadersItems;
};

export default function HeadersItem(props: HeaderItemProps): JSX.Element {
  const { headerItemData } = props;

  const updateHeader = useHeadersStore((state) => state.updateHeader);
  const removeHeader = useHeadersStore((state) => state.removeHeader);

  const t = useTranslations('RestClient');

  function handleCheckbox(checked: boolean): void {
    const item = {
      ...headerItemData,
      checked,
    };

    updateHeader(item);
  }

  function handleValueChange(event: ChangeEvent<HTMLInputElement>): void {
    const targetName = event.target.name.replace('header-', '');
    const targetValue = event.target.value;

    const item = {
      ...headerItemData,
      [targetName]: targetValue,
    };

    updateHeader(item);
  }

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        className="h-5 w-5"
        onCheckedChange={handleCheckbox}
        name="header-checkbox"
        checked={headerItemData.checked}
      />
      <Input
        onChange={handleValueChange}
        type="text"
        name="header-name"
        placeholder={t('header')}
        value={headerItemData.name}
      />
      <Input
        onChange={handleValueChange}
        type="text"
        name="header-value"
        placeholder={t('value')}
        value={headerItemData.value}
      />
      <Button
        type="button"
        onClick={() => removeHeader(headerItemData.id)}
        variant="ghost"
        size="icon"
      >
        <Trash2 />
      </Button>
    </div>
  );
}

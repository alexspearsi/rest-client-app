'use client';

import type { ChangeEvent, JSX } from 'react';
import { useState } from 'react';
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

  const [isChecked, setIsChecked] = useState<boolean>(
    headerItemData.checked || false,
  );
  const [value, setValue] = useState({
    name: headerItemData.name || '',
    value: headerItemData.value || '',
  });

  const t = useTranslations('RestClient');

  function handleCheckbox(checked: boolean): void {
    setIsChecked(checked);

    const item = {
      id: headerItemData.id,
      name: value.name,
      value: value.value,
      checked,
    };

    updateHeader(item);
  }

  function handleValueChange(event: ChangeEvent<HTMLInputElement>): void {
    const targetName = event.target.name.replace('header-', '');
    const targetValue = event.target.value;

    const object = {
      [targetName]: targetValue,
    };

    setValue({ ...value, ...object });
  }

  function handleFocus() {
    const item = {
      id: headerItemData.id,
      name: value.name,
      value: value.value,
      checked: isChecked,
    };

    updateHeader(item);
  }

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        className="h-6 w-6"
        onCheckedChange={handleCheckbox}
        name="header-checkbox"
        checked={isChecked}
      />
      <Input
        onChange={handleValueChange}
        onBlur={handleFocus}
        type="text"
        name="header-name"
        placeholder={t('header')}
        value={value.name}
      />
      <Input
        onChange={handleValueChange}
        onBlur={handleFocus}
        type="text"
        name="header-value"
        placeholder={t('value')}
        value={value.value}
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

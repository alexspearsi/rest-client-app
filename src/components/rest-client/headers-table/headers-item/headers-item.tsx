'use client';

import type { ChangeEvent, JSX } from 'react';
import { useState } from 'react';
import { HeadersItems } from '../../rest-client';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';

type HeaderItemProps = {
  id: string;
  removeHeader: (id: string) => void;
  updateHeader: (headerItem: HeadersItems) => void;
};

export default function HeadersItem(props: HeaderItemProps): JSX.Element {
  const { id, removeHeader, updateHeader } = props;

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [value, setValue] = useState({ name: '', value: '' });

  const t = useTranslations('RestClient');

  function handleCheckbox(checked: boolean): void {
    setIsChecked(checked);

    const item = {
      id,
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
      id,
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
        placeholder={t('name')}
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
        onClick={() => removeHeader(id)}
        variant="ghost"
        size="icon"
      >
        <Trash2 />
      </Button>
    </div>
  );
}

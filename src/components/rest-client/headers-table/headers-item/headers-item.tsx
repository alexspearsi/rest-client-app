'use client';

import type { ChangeEvent, JSX } from 'react';
import { useState } from 'react';
import { HeadersItems } from '../../rest-client';
import { useTranslations } from 'next-intl';

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

  function handleCheckbox(event: ChangeEvent<HTMLInputElement>): void {
    const checked = event.target.checked;
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
    <div>
      <input
        onChange={handleCheckbox}
        type="checkbox"
        name="header-checkbox"
        checked={isChecked}
      />
      <input
        onChange={handleValueChange}
        onBlur={handleFocus}
        type="text"
        name="header-name"
        placeholder={t('name')}
        value={value.name}
      />
      <input
        onChange={handleValueChange}
        onBlur={handleFocus}
        type="text"
        name="header-value"
        placeholder={t('value')}
        value={value.value}
      />
      <button type="button" onClick={() => removeHeader(id)}>
        Del
      </button>
    </div>
  );
}

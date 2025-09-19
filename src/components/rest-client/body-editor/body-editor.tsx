'use client';

import { useCallback, useState } from 'react';
import type { JSX } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useBodyStore } from '@/stores/body-store';
import { useTranslations } from 'next-intl';

const bodyEditorVariants = ['json', 'text'] as const;

export type HeadersItems = {
  id: string;
  name: string;
  value: string;
  checked: boolean;
};

export default function BodyEditor(): JSX.Element {
  const t = useTranslations('RestClient');
  const bodyData = useBodyStore((state) => state.body);
  const selectedData = useBodyStore((state) => state.selectedData);
  const updateSelectedData = useBodyStore((state) => state.updateSelectedData);

  const [isError, setError] = useState(false);

  const updateBody = useBodyStore((state) => state.updateBody);

  const handleValueChange = useCallback(
    (val: string) => {
      if (selectedData !== 'json') {
        updateBody(val);
        return;
      }

      try {
        JSON.parse(val);
        updateBody(val);
        setError(false);
      } catch {
        setError(true);
        updateBody(val);
      }
    },
    [selectedData, updateBody],
  );

  function handlePrettiness(): void {
    try {
      const parse = JSON.parse(bodyData);
      updateBody(JSON.stringify(parse, null, 2));
      setError(false);
    } catch {
      setError(true);
    }
  }

  function handleSelectedValueChange(val: string) {
    updateSelectedData(val);
  }

  return (
    <div className="flex w-full max-w-3xl flex-col gap-2">
      <Select
        name="method"
        value={selectedData}
        onValueChange={handleSelectedValueChange}
      >
        <SelectTrigger className="w-[100px] uppercase">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {bodyEditorVariants.map((item) => (
            <SelectItem key={item} value={item} className="uppercase">
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <CodeMirror
        value={bodyData}
        height="250px"
        {...(selectedData !== 'text' ? { extensions: [json()] } : undefined)}
        theme={vscodeDark}
        onChange={handleValueChange}
      />

      <div className="h-[36px]">
        {selectedData !== 'text' && (
          <div className="flex items-center">
            {isError && (
              <span className="text-destructive text-sm">{t('error')}</span>
            )}
            <Button
              className="ml-auto"
              type="button"
              onClick={handlePrettiness}
              variant="ghost"
              disabled={isError}
            >
              {t('format')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

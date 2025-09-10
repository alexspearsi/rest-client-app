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

const bodyEditorVariants = ['json', 'text'] as const;

export type HeadersItems = {
  id: string;
  name: string;
  value: string;
  checked: boolean;
};
// className="flex w-full max-w-3xl flex-col gap-2"
export default function BodyEditor(): JSX.Element {
  const bodyData = useBodyStore((state) => state.body);
  const selectedData = useBodyStore((state) => state.selectedData);
  const updateSelectedData = useBodyStore((state) => state.updateSelectedData);

  const [value, setValue] = useState(bodyData);
  const [isError, setError] = useState(false);

  const updateBody = useBodyStore((state) => state.updateBody);

  const handleValueChange = useCallback((val: string) => {
    setValue(val);
  }, []);

  function handlePrettiness(): void {
    try {
      const parse = JSON.parse(value);
      setValue(JSON.stringify(parse, null, 2));
      setError(false);
    } catch (error) {
      setError(true);
      console.warn(error);
    }
  }

  function handleSelectedValueChange(val: string) {
    updateSelectedData(val);
  }

  function handleBlur(): void {
    if (selectedData !== 'json') {
      updateBody(value);
      return;
    }

    try {
      const parse = JSON.parse(value);
      updateBody(JSON.stringify(parse, null, 2));
      setError(false);
    } catch (error) {
      setError(true);
      updateBody(value);
      console.warn(error);
    }
  }

  return (
    <div>
      <Select
        name="method"
        value={selectedData}
        onValueChange={handleSelectedValueChange}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {bodyEditorVariants.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <CodeMirror
        value={value}
        height="250px"
        {...(selectedData !== 'text' ? { extensions: [json()] } : undefined)}
        theme={vscodeDark}
        onChange={handleValueChange}
        onBlurCapture={handleBlur}
      />

      <div className="h-[36px]">
        {selectedData !== 'text' && (
          <div className="flex items-center">
            {isError && (
              <span className="text-destructive text-sm">
                Invalid JSON input
              </span>
            )}
            <Button
              className="ml-auto"
              type="button"
              onClick={handlePrettiness}
              variant="ghost"
            >
              Format
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

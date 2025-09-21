'use client';

import { useCallback, useState } from 'react';
import type { JSX } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';
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
import { Label } from '@/components/ui/label';
import CustomTooltip from '@/components/ui/custom-tooltip';
import { Sparkles } from 'lucide-react';
import { useTheme } from 'next-themes';

const bodyEditorVariants = ['json', 'text'] as const;

export type HeadersItems = {
  id: string;
  name: string;
  value: string;
  checked: boolean;
};

export default function BodyEditor(): JSX.Element {
  const t = useTranslations('RestClient');
  const { theme } = useTheme();
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-lg font-semibold">Request Body</Label>
        <div className="flex items-center justify-center gap-3">
          <CustomTooltip content={t('format')}>
            <Button
              type="button"
              onClick={handlePrettiness}
              variant="outline"
              size="icon"
              disabled={isError}
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </CustomTooltip>
          <Select
            name="method"
            value={selectedData}
            onValueChange={handleSelectedValueChange}
          >
            <SelectTrigger className="uppercase">
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
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="overflow-hidden rounded-lg border">
          <CodeMirror
            value={bodyData}
            height="250px"
            {...(selectedData !== 'text'
              ? { extensions: [json()] }
              : undefined)}
            theme={theme === 'dark' ? vscodeDark : vscodeLight}
            onChange={handleValueChange}
          />
        </div>

        <div>
          {selectedData !== 'text' && (
            <div className="flex items-center">
              {isError && (
                <span className="text-destructive text-sm">{t('error')}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

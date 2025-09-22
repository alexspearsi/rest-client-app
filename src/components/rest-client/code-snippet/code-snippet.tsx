'use client';

import type { JSX } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
import { go } from '@codemirror/lang-go';
import { python } from '@codemirror/lang-python';
import { csharp } from '@replit/codemirror-lang-csharp';
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';
import { useRequestStore } from '@/stores/request-store';
import { useHeadersStore } from '@/stores/headers-store';
import { useBodyStore } from '@/stores/body-store';
import { useSnippetStore } from '@/stores/snippet-store';
import { snippets } from '@/utils/code-generators/snippets';
import { HeadersItems } from '../rest-client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CopyButton } from '../../copy-button';
import { Label } from '@/components/ui/label';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';

const languages = [csharp, go, java, javascript, python];

export type RequestData = {
  url: string;
  method: string;
  headers: HeadersItems[];
  body: string;
};

export default function CodeSnippet(): JSX.Element {
  const t = useTranslations('RestClient');
  const { theme } = useTheme();
  const url = useRequestStore((state) => state.url);
  const method = useRequestStore((state) => state.method);
  const headerItems = useHeadersStore((state) => state.headers);
  const bodyData = useBodyStore((state) => state.body);
  const selectedData = useBodyStore((state) => state.selectedData);
  const currentSnippet = useSnippetStore((state) => state.currentSnippet);
  const setCurrentSnippet = useSnippetStore((state) => state.setCurrentSnippet);

  const requestData: RequestData = {
    url,
    method,
    headers: headerItems,
    body: bodyData,
  };

  const currentLanguage =
    languages.find(
      (item) => item.name === currentSnippet.name.replace(/[A-Z].+/, ''),
    ) ?? languages[3];

  function handleValueChange(val: string) {
    setCurrentSnippet(
      snippets.find((item) => item.name === val) ?? snippets[0],
    );
  }

  const currentSnippetValue = currentSnippet.fn(requestData, selectedData);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Label className="text-lg font-semibold">{t('codeSnippetTitle')}</Label>
        {snippets.length > 0 && (
          <div className="flex items-center justify-center gap-3">
            <CopyButton currentValue={currentSnippetValue} delay={1500} />
            <Select
              onValueChange={handleValueChange}
              name="method"
              value={currentSnippet.name}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choose Snippet..." />
              </SelectTrigger>
              <SelectContent>
                {snippets.map((item) => (
                  <SelectItem key={item.name} value={item.name}>
                    {item.name.replace(/[A-Z]/, (x) => '-' + x).toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <div className="overflow-hidden rounded-lg border">
        <CodeMirror
          data-testid="snippet"
          value={currentSnippetValue}
          height="317px"
          extensions={[currentLanguage()]}
          theme={theme === 'dark' ? vscodeDark : vscodeLight}
        />
      </div>
    </div>
  );
}

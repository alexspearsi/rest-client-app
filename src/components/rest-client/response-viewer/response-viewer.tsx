'use client';

import { type JSX } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { vscodeLight, vscodeDark } from '@uiw/codemirror-theme-vscode';
import { useResponseStore } from '@/stores/response-store';
import StatusBar from './status-bar';
import { Label } from '@/components/ui/label';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';

export default function ResponseViewer(): JSX.Element {
  const t = useTranslations('RestClient');
  const responseData = useResponseStore((state) => state.responseData);
  const { theme } = useTheme();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-lg font-semibold">{t('responseTitle')}</Label>
        <StatusBar responseData={responseData} />
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="overflow-hidden rounded-lg border">
          <CodeMirror
            value={JSON.stringify(responseData.data, null, 2)}
            height="450px"
            extensions={[json()]}
            theme={theme === 'dark' ? vscodeDark : vscodeLight}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

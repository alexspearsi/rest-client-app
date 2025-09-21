'use client';

import { type JSX } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { useResponseStore } from '@/stores/response-store';
import StatusBar from './status-bar';

export default function ResponseViewer(): JSX.Element {
  const responseData = useResponseStore((state) => state.responseData);

  return (
    <div className="flex min-h-[338px] w-full max-w-3xl flex-col gap-2">
      <StatusBar responseData={responseData} />

      <CodeMirror
        data-testid="response-code"
        value={JSON.stringify(responseData.data, null, 2)}
        height="250px"
        extensions={[json()]}
        theme={vscodeDark}
        readOnly
      />
    </div>
  );
}

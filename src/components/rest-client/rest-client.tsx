'use client';

import { type JSX } from 'react';
import RequestEditor from './request-editor/request-editor';
import HeadersTable from './headers-table/headers-table';
import BodyEditor from './body-editor/body-editor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import ResponseViewer from './response-viewer/response-viewer';
import CodeSnippet from './code-snippet/code-snippet';

const tabs = ['headers', 'body', 'response', 'code snippet'] as const;
const components = [HeadersTable, BodyEditor, ResponseViewer, CodeSnippet];

export type HeadersItems = {
  id: string;
  name: string;
  value: string;
  checked: boolean;
};

export default function RestClient(): JSX.Element {
  return (
    <div className="flex w-full max-w-3xl flex-col gap-5">
      <RequestEditor />

      <Tabs defaultValue={tabs[0]}>
        <TabsList className="flex w-full max-w-3xl justify-center">
          {tabs.map((tab) => (
            <TabsTrigger key={tab} value={tab} className="capitalize">
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        <Separator className="my-1" />
        {components.map((Tab, index) => (
          <TabsContent key={tabs[index] + '.'} value={tabs[index]}>
            <Tab />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

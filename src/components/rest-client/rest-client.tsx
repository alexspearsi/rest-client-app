'use client';

import { type JSX } from 'react';
import RequestEditor from './request-editor/request-editor';
import HeadersTable from './headers-table/headers-table';
import BodyEditor from './body-editor/body-editor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ResponseViewer from './response-viewer/response-viewer';

const tabs = ['headers', 'body', 'response'] as const;
const components = [HeadersTable, BodyEditor, ResponseViewer];

export type HeadersItems = {
  id: string;
  name: string;
  value: string;
  checked: boolean;
};

export default function RestClient(): JSX.Element {
  return (
    <div className="flex w-full max-w-3xl flex-col gap-2">
      <RequestEditor />

      <Tabs defaultValue={tabs[0]}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab} value={tab} className="capitalize">
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        {components.map((Tab, index) => (
          <TabsContent key={tabs[index] + '.'} value={tabs[index]}>
            <Tab />
          </TabsContent>
        ))}

        <TabsContent value="password">
          <BodyEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
}

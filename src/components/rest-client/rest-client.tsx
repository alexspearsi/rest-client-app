'use client';

import { type JSX } from 'react';
import { useState } from 'react';
import RequestEditor from './request-editor/request-editor';
import HeadersTable from './headers-table/headers-table';
import BodyEditor from './body-editor/body-editor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ResponseViewer from './response-viewer/response-viewer';
import CodeSnippet from './code-snippet/code-snippet';
import { useTranslations } from 'next-intl';

const tabs = ['headers', 'body', 'response', 'code snippet'] as const;
const components = [HeadersTable, BodyEditor, ResponseViewer, CodeSnippet];

export type HeadersItems = {
  id: string;
  name: string;
  value: string;
  checked: boolean;
};

export default function RestClient(): JSX.Element {
  const t = useTranslations('RestClient');

  const [currentTab, setCurrentTab] = useState<string>(tabs[0]);

  function handleTabChange(val: string): void {
    setCurrentTab(val);
  }

  return (
    <div className="space-y-6">
      <RequestEditor handleTabChange={handleTabChange} />

      <Tabs
        value={currentTab}
        onValueChange={handleTabChange}
        defaultValue="explore"
        className="gap-6"
      >
        <TabsList className="bg-background rounded-none border-b p-0">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none"
            >
              {t(tab)}
            </TabsTrigger>
          ))}
        </TabsList>
        {components.map((Tab, index) => (
          <TabsContent key={tabs[index] + '.'} value={tabs[index]}>
            <Tab />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

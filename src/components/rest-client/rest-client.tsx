'use client';

import { type JSX } from 'react';
import RequestEditor from './request-editor/request-editor';
import HeadersTable from './headers-table/headers-table';

export type HeadersItems = {
  id: string;
  name: string;
  value: string;
  checked: boolean;
};

export default function RestClient(): JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      <RequestEditor />
      <HeadersTable />
    </div>
  );
}

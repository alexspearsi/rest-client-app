'use client';

import { type JSX } from 'react';
import { useState } from 'react';
import RequestEditor from './request-editor/request-editor';
import HeadersTable from './headers-table/headers-table';

export type HeadersItems = {
  id: string;
  name: string;
  value: string;
  checked: boolean;
};

export default function RestClient(): JSX.Element {
  const [headersItems, setHeaders] = useState<HeadersItems[]>([
    { id: crypto.randomUUID(), name: '', value: '', checked: false },
  ]);

  function addHeader(headerItem: HeadersItems): void {
    setHeaders([...headersItems, headerItem]);
  }

  function removeHeader(id: string): void {
    const filtered = headersItems.filter((item) => item.id !== id);
    setHeaders(filtered);
  }

  function updateHeader(newItem: HeadersItems) {
    const updated = headersItems.map((item) =>
      item.id === newItem.id ? newItem : item,
    );
    setHeaders(updated);
  }

  return (
    <div>
      <RequestEditor headerItems={headersItems} />
      <HeadersTable
        headerItems={headersItems}
        addHeader={addHeader}
        removeHeader={removeHeader}
        updateHeader={updateHeader}
      />
    </div>
  );
}

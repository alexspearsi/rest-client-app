import type { HeadersItems } from '@/components/rest-client/rest-client';
import { create } from 'zustand';

export type HeadersStoreTypes = {
  headers: HeadersItems[];
  addHeader: (item: HeadersItems) => void;
  removeHeader: (id: string) => void;
  updateHeader: (item: HeadersItems) => void;
  replaceHeader: (
    item: Record<string, string | undefined> | HeadersItems[],
  ) => void;
};

export const useHeadersStore = create<HeadersStoreTypes>((set) => ({
  headers: [
    {
      id: crypto.randomUUID(),
      name: 'Custom-Header',
      value: 'sample-value',
      checked: false,
    },
    { id: crypto.randomUUID(), name: '', value: '', checked: false },
    { id: crypto.randomUUID(), name: '', value: '', checked: false },
  ],
  addHeader: (item): void => {
    set((state) => ({ headers: [...state.headers, item] }));
  },
  removeHeader: (id): void => {
    set((state) => ({
      headers: state.headers.filter((item) => item.id !== id),
    }));
  },
  updateHeader: (newItem): void => {
    set((state) => ({
      headers: state.headers.map((item) =>
        item.id === newItem.id ? newItem : item,
      ),
    }));
  },
  replaceHeader: (item): void => {
    set(() => {
      if (Array.isArray(item)) {
        return { headers: [...item] };
      }

      const newHeaders: HeadersItems[] = [];

      Object.entries(item).forEach(([name, value]) => {
        newHeaders.push({
          id: crypto.randomUUID(),
          name,
          value: value ?? '',
          checked: true,
        });
      });

      return { headers: [...newHeaders] };
    });
  },
}));

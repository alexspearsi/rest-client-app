import { RequestData } from '@/components/rest-client/code-snippet/code-snippet';
import { create } from 'zustand';
import { snippets } from '@/utils/code-generators/snippets';

export type SnippetStoreTypes = {
  currentSnippet: (data: RequestData, type: string) => string;
  setCurrentSnippet: (
    item: (data: RequestData, type: string) => string,
  ) => void;
};

export const useSnippetStore = create<SnippetStoreTypes>((set) => ({
  currentSnippet: snippets[0],
  setCurrentSnippet: (item): void => {
    set({ currentSnippet: item });
  },
}));

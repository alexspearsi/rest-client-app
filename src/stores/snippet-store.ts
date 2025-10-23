import { RequestData } from '@/components/rest-client/code-snippet/code-snippet';
import { create } from 'zustand';
import { snippets } from '@/utils/code-generators/snippets';

type CurrentSnippetType = {
  name: string;
  fn: (data: RequestData, type?: string) => string;
};

export type SnippetStoreTypes = {
  currentSnippet: CurrentSnippetType;
  setCurrentSnippet: (item: CurrentSnippetType) => void;
};

export const useSnippetStore = create<SnippetStoreTypes>((set) => ({
  currentSnippet: snippets[0],
  setCurrentSnippet: (item): void => {
    set({ currentSnippet: item });
  },
}));

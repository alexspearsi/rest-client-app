import { create } from 'zustand';

export type RequestStoreTypes = {
  method: string;
  url: string;
  updateMethod: (item: string) => void;
  updateUrl: (item: string) => void;
};

export type RequestItems = {
  method: string;
  url: string;
};

export const useRequestStore = create<RequestStoreTypes>((set) => ({
  method: 'get',
  url: '',
  updateMethod: (newMethod) => set(() => ({ method: newMethod })),
  updateUrl: (newUrl) => set(() => ({ url: newUrl })),
}));

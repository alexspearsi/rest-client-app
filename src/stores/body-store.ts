import { create } from 'zustand';

export type BodyStoreTypes = {
  body: string;
  updateBody: (item: string) => void;
  selectedData: string;
  updateSelectedData: (item: string) => void;
};

export const useBodyStore = create<BodyStoreTypes>((set) => ({
  body: '',
  updateBody: (item): void => {
    set({ body: item });
  },
  selectedData: 'json',
  updateSelectedData: (item): void => {
    set({ selectedData: item });
  },
}));

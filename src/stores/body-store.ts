import { create } from 'zustand';

export type BodyStoreTypes = {
  body: string;
  updateBody: (item: string) => void;
};

export const useBodyStore = create<BodyStoreTypes>((set) => ({
  body: '',
  updateBody: (item): void => {
    set({ body: item });
  },
}));

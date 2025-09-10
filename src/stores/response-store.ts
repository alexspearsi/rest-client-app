import { create } from 'zustand';

export type ResponseStoreTypes = {
  responseData: ResponseStoreType;
  updateResponse: (item: ResponseStoreType) => void;
};

export type ResponseStoreType = {
  statusCode: number;
  statusText: string;
  size: number;
  time: number;
  data: unknown;
};

export const useResponseStore = create<ResponseStoreTypes>((set) => ({
  responseData: {
    statusCode: 0,
    statusText: '',
    size: 0,
    time: 0,
    data: '',
  },
  updateResponse: (item): void => {
    set((state) => ({ responseData: { ...state.responseData, ...item } }));
  },
}));

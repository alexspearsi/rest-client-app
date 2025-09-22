import { create } from 'zustand';

export type ResponseStoreTypes = {
  responseData: ResponseStoreType;
  updateResponse: (item: ResponseStoreType) => void;
};

export type ResponseStoreType = {
  statusCode: number;
  statusText: string;
  method: string;
  resSize: number;
  reqSize: number;
  duration: number;
  timestamp: number;
  data: unknown;
  error: string | null;
  url: string;
  link?: string;
};

export const useResponseStore = create<ResponseStoreTypes>((set) => ({
  responseData: {
    statusCode: 0,
    statusText: '',
    method: '',
    resSize: 0,
    reqSize: 0,
    duration: 0,
    timestamp: 0,
    data: '',
    error: null,
    url: '',
    link: '',
  },
  updateResponse: (item): void => {
    set((state) => ({ responseData: { ...state.responseData, ...item } }));
  },
}));

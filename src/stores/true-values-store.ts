import { HeadersItems } from '@/components/rest-client/rest-client';
import { create } from 'zustand';

type TrueValuesStore = {
  trueValues: TrueValue;
  setValue: (value: TrueValue) => void;
};

type TrueValue = {
  url: string;
  headers: HeadersItems[];
  body: string;
};

export const useTrueValuesStore = create<TrueValuesStore>((set) => ({
  trueValues: {
    url: '',
    headers: [],
    body: '',
  },
  setValue: (item): void => {
    set(() => ({ trueValues: { ...item } }));
  },
}));

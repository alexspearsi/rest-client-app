import { create } from 'zustand';

type MainStore = {
  someState: boolean;
  toggle: () => void;
  setState: (value: boolean) => void;
};

export const useMainStore = create<MainStore>((set) => ({
  someState: false,
  toggle: () => set((state) => ({ someState: !state.someState })),
  setState: (value) => set({ someState: value }),
}));

// ПРОВЕРКА ДЕПЛОЯ РАЗ ДВА ТРИ

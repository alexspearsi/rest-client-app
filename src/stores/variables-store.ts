import { VariablesLS } from '@/components/variables/variables';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type VariablesStoreTypes = {
  variables: VariablesLS[];
  addVariable: (item: VariablesLS) => void;
  removeVariable: (id: string) => void;
  updateVariable: (item: VariablesLS) => void;
  replaceVariable: (item: Record<string, string | undefined>) => void;
};

export const useVariablesStore = create<VariablesStoreTypes>()(
  persist(
    (set) => ({
      variables: [
        {
          id: crypto.randomUUID(),
          variable: 'example',
          value: 'https://',
          checked: true,
        },
        { id: crypto.randomUUID(), variable: '', value: '', checked: false },
        { id: crypto.randomUUID(), variable: '', value: '', checked: false },
      ],
      addVariable: (item): void => {
        set((state) => ({ variables: [...state.variables, item] }));
      },
      removeVariable: (id): void => {
        set((state) => ({
          variables: state.variables.filter((item) => item.id !== id),
        }));
      },
      updateVariable: (newItem): void => {
        set((state) => ({
          variables: state.variables.map((item) =>
            item.id === newItem.id ? newItem : item,
          ),
        }));
      },
      replaceVariable: (item): void => {
        set(() => {
          const newVariables: VariablesLS[] = [];

          Object.entries(item).forEach(([variable, value]) => {
            newVariables.push({
              id: crypto.randomUUID(),
              variable,
              value: value ?? '',
              checked: true,
            });
          });

          return { variables: newVariables };
        });
      },
    }),
    {
      name: 'variables',
    },
  ),
);

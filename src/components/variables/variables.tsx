'use client';

import type { JSX } from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Cell } from './cell';
import { useVariablesStore } from '@/stores/variables-store';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

export type VariablesLS = {
  id: string;
  checked: boolean;
  variable: string;
  value: string;
};

export default function Variables(): JSX.Element {
  const variables = useVariablesStore((state) => state.variables);
  const addVariable = useVariablesStore((state) => state.addVariable);
  const t = useTranslations('Variables');

  function handleClick() {
    const item = {
      id: crypto.randomUUID(),
      variable: '',
      value: '',
      checked: false,
    };

    addVariable(item);
  }

  return (
    <div className="flex w-full max-w-[768px] flex-col justify-center">
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[36px]"></TableHead>
            <TableHead>{t('variable')}</TableHead>
            <TableHead>{t('value')}</TableHead>
            <TableHead className="w-[36px]">{''}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {variables.map((item) => (
            <Cell variable={item} key={item.id} />
          ))}
        </TableBody>
      </Table>
      <Button type="button" onClick={handleClick} size={'icon'}>
        <Plus />
      </Button>
    </div>
  );
}

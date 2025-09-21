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
import { Label } from '../ui/label';
import CustomTooltip from '../ui/custom-tooltip';

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
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <Label className="text-lg font-semibold">{t('subtitle')}</Label>
        <CustomTooltip content={t('addTooltip')}>
          <Button
            data-testid="add-var-btn"
            variant="outline"
            size="icon"
            onClick={handleClick}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </CustomTooltip>
      </div>
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
        <TableBody data-testid="table-body">
          {variables.map((item) => (
            <Cell variable={item} key={item.id} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

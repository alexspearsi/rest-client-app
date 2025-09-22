import type { ChangeEvent, JSX } from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { VariablesLS } from './variables';
import { useVariablesStore } from '@/stores/variables-store';

type CellProps = {
  variable: VariablesLS;
};

export function Cell(props: CellProps): JSX.Element {
  const { variable } = props;

  const updateVariable = useVariablesStore((state) => state.updateVariable);
  const removeVariable = useVariablesStore((state) => state.removeVariable);

  function handleCheckbox(checked: boolean): void {
    const item = {
      ...variable,
      checked,
    };

    updateVariable(item);
  }

  function handleValueChange(event: ChangeEvent<HTMLInputElement>): void {
    const targetName = event.target.name.replace('variable-', '');
    const targetValue = event.target.value;

    const item = {
      ...variable,
      [targetName]: targetValue,
    };

    updateVariable(item);
  }

  return (
    <TableRow>
      <TableCell>
        <Checkbox
          className="h-5 w-5"
          onCheckedChange={handleCheckbox}
          name="variable-checkbox"
          checked={variable.checked}
        />
      </TableCell>

      <TableCell>
        <Input
          onChange={handleValueChange}
          type="text"
          name="variable-variable"
          value={variable.variable}
        />
      </TableCell>

      <TableCell>
        <Input
          onChange={handleValueChange}
          type="text"
          name="variable-value"
          value={variable.value}
        />
      </TableCell>

      <TableCell>
        <Button
          type="button"
          onClick={() => removeVariable(variable.id)}
          variant="ghost"
          size="icon"
        >
          <Trash2 />
        </Button>
      </TableCell>
    </TableRow>
  );
}

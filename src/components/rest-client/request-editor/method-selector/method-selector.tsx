import type { JSX } from 'react';
import { methods } from '@/utils/methods';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRequestStore } from '@/stores/request-store';

export default function MethodSelector(): JSX.Element {
  const method = useRequestStore((state) => state.method);
  const updateMethod = useRequestStore((state) => state.updateMethod);

  function handleSelection(val: string) {
    if (val) {
      updateMethod(val);
    }
  }

  return (
    <Select onValueChange={handleSelection} name="method" value={method}>
      <SelectTrigger className="w-[180px] rounded-none rounded-l-lg">
        <SelectValue aria-label={method}>{method.toUpperCase()}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {methods.map((item) => (
          <SelectItem key={item} value={item}>
            {item.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

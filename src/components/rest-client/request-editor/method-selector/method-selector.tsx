import type { JSX } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRequestStore } from '@/stores/request-store';

export const methods = [
  'get',
  'post',
  'put',
  'patch',
  'delete',
  'head',
  'options',
] as const;

export default function MethodSelector(): JSX.Element {
  const method = useRequestStore((state) => state.method);
  const updateMethod = useRequestStore((state) => state.updateMethod);

  function handleSelection(val: string) {
    updateMethod(val);
  }

  return (
    <Select onValueChange={handleSelection} name="method" value={method}>
      <SelectTrigger className="w-[180px] rounded-none rounded-l-lg">
        <SelectValue />
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

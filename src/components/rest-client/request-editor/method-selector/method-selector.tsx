import type { JSX } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const methods = ['get', 'post', 'put', 'patch', 'delete'] as const;

export default function MethodSelector(): JSX.Element {
  return (
    <Select name="method" defaultValue="get">
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

import type { JSX } from 'react';

export const methods = ['get', 'post', 'put', 'patch', 'delete'] as const;

export default function MethodSelector(): JSX.Element {
  return (
    <select name="method">
      {methods.map((item) => (
        <option key={item} value={item}>
          {item.toUpperCase()}
        </option>
      ))}
    </select>
  );
}

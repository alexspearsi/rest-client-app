import type { JSX } from 'react';

const methods = ['get', 'post', 'put', 'patch', 'delete'];

export default function MethodSelector(): JSX.Element {
  return (
    <select name="method-selector">
      {methods.map((item) => (
        <option key={item} value={item}>
          {item.toUpperCase()}
        </option>
      ))}
    </select>
  );
}

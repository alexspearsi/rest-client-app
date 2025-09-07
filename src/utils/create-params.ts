import type { HeadersItems } from '@/components/rest-client/rest-client';

export function createParams(headers: HeadersItems[]): URLSearchParams {
  const params = new URLSearchParams();

  for (const item of headers) {
    if (item.checked) {
      params.set(item.name, item.value);
    }
  }

  return params;
}

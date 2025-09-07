import type { HeadersItems } from '@/components/rest-client/rest-client';
import { formatHeader } from './format-header';

export function createParams(headers: HeadersItems[]): URLSearchParams {
  const params = new URLSearchParams();

  for (const item of headers) {
    if (item.checked) {
      params.set(formatHeader(item.name), formatHeader(item.value));
    }
  }

  return params;
}

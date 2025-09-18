import type { HeadersItems } from '@/components/rest-client/rest-client';
import { formatHeader } from './format-header';

export function createParams(
  headers: HeadersItems[],
  contentHeader: Record<string, string>,
): URLSearchParams {
  const params = new URLSearchParams();

  const entries = Object.entries(contentHeader);

  params.set(entries[0][0], entries[0][1]);

  for (const item of headers) {
    if (item.checked) {
      params.set(formatHeader(item.name), formatHeader(item.value));
    }
  }

  return params;
}

import type { HeadersItems } from '@/components/rest-client/rest-client';
import { formatHeader } from './format-header';

export function createHeaders(params: URLSearchParams): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of params.entries()) {
    result[key] = value;
  }

  return result;
}

export function createHeadersFromArray(
  data: HeadersItems[],
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const item of data) {
    if (item.checked) {
      result[formatHeader(item.name)] = item.value;
    }
  }

  return result;
}

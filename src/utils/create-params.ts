import type { HeadersItems } from '@/components/rest-client/rest-client';
import { formatHeader } from './format-header';
import { parseVariable } from './parse-variable';
import { VariablesLS } from '@/components/variables/variables';

export function createParams(
  headers: HeadersItems[],
  contentHeader: Record<string, string>,
  variables: VariablesLS[],
): URLSearchParams {
  const params = new URLSearchParams();

  const entries = Object.entries(contentHeader);

  params.set(entries[0][0], entries[0][1]);

  for (const item of headers) {
    if (item.checked) {
      params.set(
        formatHeader(parseVariable(item.name.trim(), variables)),
        formatHeader(parseVariable(item.value.trim(), variables)),
      );
    }
  }

  return params;
}

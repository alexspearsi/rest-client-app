import type { RequestData } from '@/components/rest-client/code-snippet/code-snippet';
import { createHeadersFromArray } from '../create-headers';
import { ifJson } from '../ifJson';

export function curl(data: RequestData) {
  const headers = createHeadersFromArray(data.headers);

  return `curl  -X ${data.method.toUpperCase()} \\
  '${data.url}' \\
  ${addCurlHeaders(headers)}
  --data-raw '${ifJson(data.body)}'`;
}

function addCurlHeaders(headers: Record<string, string>): string {
  let result = '';

  for (const [key, value] of Object.entries(headers)) {
    result += `--header '${key}: ${value}' \\` + '\n';
  }

  return result;
}

import type { RequestData } from '@/components/rest-client/code-snippet/code-snippet';
import { createHeadersFromArray } from '../create-headers';
import { ifJson } from '../ifJson';

export function curl(data: RequestData, type = 'json') {
  const headers = createHeadersFromArray(data.headers);

  return `curl  -X ${data.method.toUpperCase()} \\
  '${data.url}' \\
   --header 'Content-Type: ${type === 'json' ? 'application/json' : 'text/plain'}' \\
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

import type { RequestData } from '@/components/rest-client/code-snippet/code-snippet';
import { createHeadersFromArray } from '../create-headers';
import { ifJson } from '../ifJson';

export function javascriptFetch(data: RequestData, type = 'json') {
  const headers = createHeadersFromArray(data.headers);

  return `fetch("${data.url}", {
    method: "${data.method.toUpperCase()}",
    headers: ${ifJson(headers)},
    ${data.body && 'body: ' + ifJson(data.body)}
  }).then((response) => response.${type === 'json' ? 'json' : 'text'}())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));`;
}

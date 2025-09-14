import type { RequestData } from '@/components/rest-client/code-snippet/code-snippet';
import { createHeadersFromArray } from '../create-headers';
import { ifJson } from '../ifJson';

export function pythonHttpx(data: RequestData) {
  const headers = createHeadersFromArray(data.headers);

  return `import httpx
${data.body && 'import json'}

client = httpx.Client()

reqUrl = "${data.url}"

headersList = ${ifJson(headers)}

${'payload = json.dumps(' + ifJson(data.body) + ')'}

data = client.${data.method}(reqUrl,${data.body && 'data=payload,'} headers=headersList)

print(data.text)`;
}

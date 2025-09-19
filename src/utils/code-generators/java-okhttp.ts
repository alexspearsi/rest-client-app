import type { RequestData } from '@/components/rest-client/code-snippet/code-snippet';
import { createHeadersFromArray } from '../create-headers';

export function javaOkHttp(data: RequestData, type = 'json') {
  const headers = createHeadersFromArray(data.headers);

  return `OkHttpClient client = new OkHttpClient();

${data.body && 'MediaType mediaType = MediaType.parse("' + (type === 'json' ? 'application/json' : 'text/plain') + '");'}
${data.body && 'RequestBody body = RequestBody.create(mediaType, ' + JSON.stringify(data.body, null, 2) + ');'}
Request request = new Request.Builder()
  .url("${data.url}")
  .${data.method}()
  .addHeader("Content-Type", "${type === 'json' ? 'application/json' : 'text/plain'}")
  ${addJavaHeaders(headers)}
  .build();

Response response = client.newCall(request).execute();`;
}

function addJavaHeaders(headers: Record<string, string>): string {
  let result = '';

  for (const [key, value] of Object.entries(headers)) {
    result += `.addHeader("${key}", "${value}")` + '\n';
  }

  return result;
}

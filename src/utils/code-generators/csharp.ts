import type { RequestData } from '@/components/rest-client/code-snippet/code-snippet';
import { createHeadersFromArray } from '../create-headers';

export function csharp(data: RequestData) {
  const headers = createHeadersFromArray(data.headers);

  return `var client = new RestClient("${data.url}");
var request = new RestRequest("", Method.${data.method[0].toUpperCase() + data.method.slice(1)});
${addCSharpHeaders(headers)}
${data.body && 'request.AddParameter("application/json",' + JSON.stringify(data.body) + ', ParameterType.RequestBody);'}
var response = client.Execute(request);`;
}

function addCSharpHeaders(headers: Record<string, string>): string {
  let result = '';

  for (const [key, value] of Object.entries(headers)) {
    result += `request.AddHeader("${key}", "${value}");` + '\n';
  }

  return result;
}

import type { RequestData } from '@/components/rest-client/code-snippet/code-snippet';
import { createHeadersFromArray } from '../create-headers';
import { ifJson } from '../ifJson';

export function nodejsRequest(data: RequestData) {
  const headers = createHeadersFromArray(data.headers);

  return `const request = require('request');

const options = {
  method: '${data.method.toUpperCase()}',
  url: '${data.url}',
  headers: ${ifJson(headers)},
  ${data.body && 'body: ' + ifJson(data.body)},
  ${data.body && 'json: true'}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});`;
}

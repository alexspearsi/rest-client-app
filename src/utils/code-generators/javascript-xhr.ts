import type { RequestData } from '@/components/rest-client/code-snippet/code-snippet';
import { createHeadersFromArray } from '../create-headers';
import { ifJson } from '../ifJson';

export function javascriptXHR(data: RequestData) {
  const headers = createHeadersFromArray(data.headers);

  return `const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

const body = ${ifJson(data.body) || null};

xhr.addEventListener("readystatechange", () => {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("${data.method.toUpperCase()}", "${data.url})";
${addXHRHeaders(headers)}


xhr.send(body);`;
}

function addXHRHeaders(headers: Record<string, string>): string {
  let result = '';

  for (const [key, value] of Object.entries(headers)) {
    result += `xhr.setRequestHeader("${key}", "${value}");` + '\n';
  }

  return result;
}

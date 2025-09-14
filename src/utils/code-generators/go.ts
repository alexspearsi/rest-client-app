import type { RequestData } from '@/components/rest-client/code-snippet/code-snippet';
import { createHeadersFromArray } from '../create-headers';

export function go(data: RequestData) {
  const headers = createHeadersFromArray(data.headers);

  return `package main

import (
	"fmt"
	${data.body && 'strings'}
	"net/http"
	"io"
)

func main() {

	url := "${data.url}"

	${data.body && 'payload := strings.NewReader(' + JSON.stringify(data.body) + ')'}

	req, _ := http.NewRequest("${data.method.toUpperCase()}", url, ${data.body ? 'payload' : 'nil'})

	${addGoLangHeaders(headers)}

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}`;
}

function addGoLangHeaders(headers: Record<string, string>): string {
  let result = '';

  for (const [key, value] of Object.entries(headers)) {
    result += `req.Header.Add("${key}", "${value}");` + '\n';
  }

  return result;
}

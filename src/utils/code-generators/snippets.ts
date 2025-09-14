import { javascriptFetch } from '@/utils/code-generators/javascript-fetch';
import { javascriptXHR } from '@/utils/code-generators/javascript-xhr';
import { curl } from './curl';
import { nodejsRequest } from './node-js-request';
import { javaOkHttp } from './java-okhttp';
import { pythonHttpx } from './python-httpx';
import { csharp } from './csharp';
import { go } from './go';

export const snippets = [
  csharp,
  curl,
  go,
  javaOkHttp,
  javascriptFetch,
  javascriptXHR,
  nodejsRequest,
  pythonHttpx,
];

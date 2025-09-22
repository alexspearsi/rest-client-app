import { http, HttpResponse } from 'msw';
import { mockResult } from '../__test__/mock-data';

export const handlers = [
  http.get('https://jsonplaceholder.typicode.com/posts/1', () => {
    return HttpResponse.json(mockResult);
  }),
];

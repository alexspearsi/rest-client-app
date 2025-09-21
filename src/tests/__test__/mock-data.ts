import { SubmitDataProps } from '@/components/api/submit-data';

export const mockSubmitObject: SubmitDataProps = {
  method: 'get',
  decodedUrl: 'https://jsonplaceholder.typicode.com/posts/1',
  decodedBody: '{"test": "data"}',
  headersObject: { 'Content-Type': 'application/json' },
};

export const mockResult = {
  status: 500,
  statusText: 'Request with GET/HEAD method cannot have body.',
  responseData: null,
  url: 'https://jsonplaceholder.typicode.com/posts/1',
  body: '{"test": "data"}',
  method: 'get',
};

import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  //   const searchParams = request.nextUrl.searchParams;
  //   const query = searchParams.get('query');

  const [method, url, body] = request.nextUrl.pathname
    .replace('/api/', '')
    .split('/');

  const decodedUrl = decodeURIComponent(atob(url));
  const decodedBody = decodeURIComponent(atob(body));

  const response = await fetch(decodedUrl, {
    method,
    body: JSON.stringify(decodedBody),
  });
  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}

'use server';

import { createHeaders } from '@/utils/create-headers';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const headersObject = createHeaders(searchParams);

  const [method, url] = request.nextUrl.pathname
    .replace('/api/', '')
    .split('/');

  const decodedUrl = decodeURIComponent(atob(url));

  const response = await fetch(decodedUrl, {
    headers: { ...headersObject },
    method: method,
  });

  const option = !response.ok ? 'text' : 'json';
  const data: unknown = await response[option]();

  return new Response(response.ok ? JSON.stringify(data) : null, {
    headers: {
      'Content-type': `${response.ok ? 'application/json' : 'text/html'}; charset=UTF-8`,

      ...headersObject,
    },
    status: response.status,
    statusText: response.statusText,
  });
}

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const headersObject = createHeaders(searchParams);

  const [method, url, body] = request.nextUrl.pathname
    .replace('/api/', '')
    .split('/');

  const decodedUrl = decodeURIComponent(atob(url));

  const decodedBody = decodeURIComponent(atob(body ?? ''));

  const response = await fetch(decodedUrl, {
    method: method,
    headers: { ...headersObject },
    body: decodedBody || null,
  });

  const option = !response.ok ? 'text' : 'json';
  const data: unknown = await response[option]();

  return new Response(response.ok ? JSON.stringify(data) : null, {
    headers: {
      'Content-type': `${response.ok ? 'application/json' : 'text/html'}; charset=UTF-8`,
      ...response.headers,
      ...headersObject,
    },
    status: response.status,
    statusText: response.statusText,
  });
}

export async function PUT(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const headersObject = createHeaders(searchParams);

  const [method, url, body] = request.nextUrl.pathname
    .replace('/api/', '')
    .split('/');

  const decodedUrl = decodeURIComponent(atob(url));

  const decodedBody = decodeURIComponent(atob(body ?? ''));

  const response = await fetch(decodedUrl, {
    method: method,
    headers: { ...headersObject },
    body: decodedBody || null,
  });

  const option = !response.ok ? 'text' : 'json';
  const data: unknown = await response[option]();

  return new Response(response.ok ? JSON.stringify(data) : null, {
    headers: {
      'Content-type': `${response.ok ? 'application/json' : 'text/html'}; charset=UTF-8`,
      ...response.headers,
      ...headersObject,
    },
    status: response.status,
    statusText: response.statusText,
  });
}

export async function PATCH(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const headersObject = createHeaders(searchParams);

  const [method, url, body] = request.nextUrl.pathname
    .replace('/api/', '')
    .split('/');

  const decodedUrl = decodeURIComponent(atob(url));

  const decodedBody = decodeURIComponent(atob(body ?? ''));

  const response = await fetch(decodedUrl, {
    method: method,
    headers: { ...headersObject },
    body: decodedBody || null,
  });

  const option = !response.ok ? 'text' : 'json';
  const data: unknown = await response[option]();

  return new Response(response.ok ? JSON.stringify(data) : null, {
    headers: {
      'Content-type': `${response.ok ? 'application/json' : 'text/html'}; charset=UTF-8`,
      ...response.headers,
      ...headersObject,
    },
    status: response.status,
    statusText: response.statusText,
  });
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const headersObject = createHeaders(searchParams);

  const [method, url] = request.nextUrl.pathname
    .replace('/api/', '')
    .split('/');

  const decodedUrl = decodeURIComponent(atob(url));

  const response = await fetch(decodedUrl, {
    headers: { ...headersObject },
    method: method,
  });

  const option = !response.ok ? 'text' : 'json';
  const data: unknown = await response[option]();

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      ...response.headers,
      ...headersObject,
    },
    status: response.status,
    statusText: response.statusText,
  });
}

export async function HEAD(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const headersObject = createHeaders(searchParams);

  const [method, url] = request.nextUrl.pathname
    .replace('/api/', '')
    .split('/');

  const decodedUrl = decodeURIComponent(atob(url));

  const response = await fetch(decodedUrl, {
    method: method,
    headers: { ...headersObject },
  });

  return new Response(null, {
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
      ...response.headers,
      ...headersObject,
    },
    status: response.status,
    statusText: response.statusText,
  });
}

export async function OPTIONS(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const headersObject = createHeaders(searchParams);

  const [method, url] = request.nextUrl.pathname
    .replace('/api/', '')
    .split('/');

  const decodedUrl = decodeURIComponent(atob(url));

  const response = await fetch(decodedUrl, {
    method: method,
    headers: {
      'Access-Control-Request-Method':
        request.headers.get('Access-Control-Request-Method') || '',
      Origin: request.headers.get('Origin') || '',
      ...headersObject,
    },
  });

  return new Response(null, {
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
      'Access-Control-Allow-Origin':
        response.headers.get('Access-Control-Allow-Origin') || '',
      'Access-Control-Allow-Methods':
        response.headers.get('Access-Control-Allow-Methods') || '',
      ...response.headers,
      ...headersObject,
    },
    status: response.status,
    statusText: response.statusText,
  });
}

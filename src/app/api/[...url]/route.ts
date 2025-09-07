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
    method: method,
  });
  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json', ...headersObject },
  });
}

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const headersObject = createHeaders(searchParams);

  const [method, url] = request.nextUrl.pathname
    .replace('/api/', '')
    .split('/');

  const decodedUrl = decodeURIComponent(atob(url));

  const response = await fetch(decodedUrl, {
    method: method,
  });
  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json', ...headersObject },
  });
}

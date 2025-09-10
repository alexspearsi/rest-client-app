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
  const data: unknown = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  });
}

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const headersObject = createHeaders(searchParams);

  const [method, url, body] = request.nextUrl.pathname
    .replace('/api/', '')
    .split('/');

  const decodedUrl = decodeURIComponent(atob(url));

  const decodedBody = decodeURIComponent(atob(body));

  const response = await fetch(decodedUrl, {
    method: method,
    headers: { ...headersObject },
    body: decodedBody || null,
  });

  const data: unknown = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json', ...headersObject },
  });
}

export async function PUT(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const headersObject = createHeaders(searchParams);

  const [method, url, body] = request.nextUrl.pathname
    .replace('/api/', '')
    .split('/');

  const decodedUrl = decodeURIComponent(atob(url));

  const decodedBody = decodeURIComponent(atob(body));

  const response = await fetch(decodedUrl, {
    method: method,
    headers: { ...headersObject },
    body: decodedBody || null,
  });

  const data: unknown = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json', ...headersObject },
  });
}

export async function PATCH(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const headersObject = createHeaders(searchParams);

  const [method, url, body] = request.nextUrl.pathname
    .replace('/api/', '')
    .split('/');

  const decodedUrl = decodeURIComponent(atob(url));

  const decodedBody = decodeURIComponent(atob(body));

  const response = await fetch(decodedUrl, {
    method: method,
    headers: { ...headersObject },
    body: decodedBody || null,
  });

  const data: unknown = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json', ...headersObject },
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

  const data: unknown = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json', ...headersObject },
  });
}

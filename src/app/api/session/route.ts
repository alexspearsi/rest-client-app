import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { token } = await req.json();

  const response = NextResponse.json({ ok: true });

  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
    path: '/',
  });

  return response;
}

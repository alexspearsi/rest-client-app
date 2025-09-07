import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const i18nMiddleware = createMiddleware(routing);

// Пути, доступные только для незалогиненных пользователей
const PUBLIC_ROUTES = ['/signin', '/registration'];

export default function middleware(req: NextRequest) {
  const token = req.cookies.get('firebaseToken');

  const pathname = req.nextUrl.pathname;
  const segments = pathname.split('/');
  const locale = segments[1];
  const pathWithoutLocale = '/' + segments.slice(2).join('/');

  if (token && PUBLIC_ROUTES.includes(pathWithoutLocale)) {
    return NextResponse.redirect(new URL(`/${locale}/`, req.url));
  }

  return i18nMiddleware(req);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_PATHS = ['/login'];
const PUBLIC_PATHS = ['/login'];

export function middleware(request: NextRequest) {
  console.log("REQUEST:::::::::::::::::::::: ",request)
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has('auth-session');

  const isPublicPath = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  );
  const isAuthPath = AUTH_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  );

  // Usuário não autenticado tentando acessar rota protegida
  if (!isAuthenticated && !isPublicPath) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Usuário autenticado tentando acessar tela de auth
  if (isAuthenticated && isAuthPath) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
};

"use server"

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;


  if (request.nextUrl.pathname.startsWith('/produtos')) {
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// 3. Configura em quais rotas o middleware deve rodar
export const config = {
  matcher: ['/produtos/:path*', '/dashboard/:path*'],
};
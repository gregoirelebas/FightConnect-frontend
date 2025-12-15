import { NextResponse, NextRequest } from 'next/server';
import Coookies from '@/app/...types/cookies';
import { getCookie } from '@/app/...helpers/cookies';

export default async function proxy(request: NextRequest) {
  const token = await getCookie(Coookies.token);

  const signup = request.url.includes('signup');
  const events = request.url.includes('events');
  const dashboard = request.url.includes('dashboard');

  if (signup && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if ((events || dashboard) && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};

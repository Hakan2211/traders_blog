import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PRODUCTION_DOMAIN = 'traders-blog-hazel.vercel.app';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Only process keystatic routes in production
  if (
    process.env.NODE_ENV === 'production' &&
    (url.pathname.startsWith('/keystatic') ||
      url.pathname.startsWith('/api/keystatic'))
  ) {
    const host = request.headers.get('host') || '';

    // If we're not on the production domain, redirect
    if (host !== PRODUCTION_DOMAIN && !host.includes('localhost')) {
      const newUrl = new URL(
        url.pathname + url.search,
        `https://${PRODUCTION_DOMAIN}`
      );

      console.log('[Middleware] Redirecting to production domain:', {
        from: request.url,
        to: newUrl.toString(),
      });

      return NextResponse.redirect(newUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/keystatic/:path*', '/api/keystatic/:path*'],
};

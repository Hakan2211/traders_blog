import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '@/keystatic.config';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Your stable production domain - this MUST match your GitHub OAuth callback URL
const PRODUCTION_URL = 'https://traders-blog-hazel.vercel.app';

// Check if GitHub auth environment variables are present
const hasGithubAuthEnv =
  !!process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
  !!process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
  !!process.env.KEYSTATIC_SECRET;

// Determine if we need GitHub storage based on the config
const isGithubStorage = (config as any)?.storage?.kind === 'github';

// Log configuration on startup
if (process.env.NODE_ENV === 'production') {
  console.log('[Keystatic] Configuration:', {
    isGithubStorage,
    hasGithubAuthEnv,
    productionUrl: PRODUCTION_URL,
  });
}

// Create handlers based on configuration
let handlers: { GET: any; POST: any };

if (isGithubStorage && !hasGithubAuthEnv) {
  console.error('[Keystatic] Missing required environment variables');

  const errorResponse = () =>
    new Response(
      JSON.stringify({
        error: 'Keystatic is not configured',
        missing: {
          clientId: !process.env.KEYSTATIC_GITHUB_CLIENT_ID,
          clientSecret: !process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
          secret: !process.env.KEYSTATIC_SECRET,
        },
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );

  handlers = {
    GET: errorResponse,
    POST: errorResponse,
  };
} else {
  handlers = makeRouteHandler({
    config,
    clientId: process.env.KEYSTATIC_GITHUB_CLIENT_ID,
    clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
    secret: process.env.KEYSTATIC_SECRET,
  });
}

// Helper to rewrite request URL to use production domain
function rewriteRequestUrl(req: NextRequest): NextRequest {
  const originalUrl = new URL(req.url);
  const productionUrlObj = new URL(PRODUCTION_URL);

  // Only rewrite if we're on Vercel and the host doesn't match production
  if (process.env.VERCEL && originalUrl.host !== productionUrlObj.host) {
    const newUrl = new URL(req.url);
    newUrl.protocol = productionUrlObj.protocol;
    newUrl.host = productionUrlObj.host;

    console.log('[Keystatic] Rewriting URL:', {
      from: req.url,
      to: newUrl.toString(),
    });

    // Create new request with rewritten URL
    return new NextRequest(newUrl.toString(), {
      method: req.method,
      headers: req.headers,
      body: req.body,
    });
  }

  return req;
}

export async function GET(req: NextRequest, context: any) {
  const url = new URL(req.url);

  // Debug OAuth callback
  if (url.pathname.includes('oauth')) {
    console.log('[Keystatic OAuth]', {
      path: url.pathname,
      originalUrl: req.url,
      hasCode: !!url.searchParams.get('code'),
      hasState: !!url.searchParams.get('state'),
      error: url.searchParams.get('error'),
    });
  }

  try {
    // Rewrite request URL to use production domain
    const rewrittenReq = rewriteRequestUrl(req);
    const response = await handlers.GET(rewrittenReq, context);

    if (url.pathname.includes('oauth/callback')) {
      console.log('[Keystatic OAuth Callback Response]', {
        status: response.status,
        location: response.headers.get('location'),
      });
    }

    return response;
  } catch (error) {
    console.error('[Keystatic GET Error]', error);
    return NextResponse.json(
      { error: 'Internal server error', message: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, context: any) {
  try {
    const rewrittenReq = rewriteRequestUrl(req);
    return await handlers.POST(rewrittenReq, context);
  } catch (error) {
    console.error('[Keystatic POST Error]', error);
    return NextResponse.json(
      { error: 'Internal server error', message: String(error) },
      { status: 500 }
    );
  }
}

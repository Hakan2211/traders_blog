import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '@/keystatic.config';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Check if GitHub auth environment variables are present
const hasGithubAuthEnv =
  !!process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
  !!process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
  !!process.env.KEYSTATIC_SECRET;

// Determine if we need GitHub storage based on the config
const isGithubStorage = (config as any)?.storage?.kind === 'github';

// Log configuration on startup (only in production for debugging)
if (process.env.NODE_ENV === 'production') {
  console.log('[Keystatic] Configuration:', {
    isGithubStorage,
    hasGithubAuthEnv,
    hasClientId: !!process.env.KEYSTATIC_GITHUB_CLIENT_ID,
    hasClientSecret: !!process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
    hasSecret: !!process.env.KEYSTATIC_SECRET,
    repoOwner: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER || 'NOT SET',
    repoSlug: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG || 'NOT SET',
  });
}

// Create handlers based on configuration
let handlers: { GET: any; POST: any };

if (isGithubStorage && !hasGithubAuthEnv) {
  console.error(
    '[Keystatic] GitHub storage mode requires: KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET, KEYSTATIC_SECRET'
  );

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
  // Create the route handler with GitHub OAuth credentials
  handlers = makeRouteHandler({
    config,
    clientId: process.env.KEYSTATIC_GITHUB_CLIENT_ID,
    clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
    secret: process.env.KEYSTATIC_SECRET,
  });
}

// Wrap GET to add debugging for OAuth callback
export async function GET(req: NextRequest, context: any) {
  const url = new URL(req.url);

  // Debug OAuth callback
  if (url.pathname.includes('oauth/callback')) {
    console.log('[Keystatic OAuth Callback]', {
      url: req.url,
      hasCode: !!url.searchParams.get('code'),
      hasState: !!url.searchParams.get('state'),
      error: url.searchParams.get('error'),
      errorDescription: url.searchParams.get('error_description'),
    });
  }

  try {
    const response = await handlers.GET(req, context);

    // Log failed auth attempts
    if (url.pathname.includes('oauth/callback') && response.status !== 302) {
      console.error('[Keystatic OAuth Error]', {
        status: response.status,
        statusText: response.statusText,
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
    return await handlers.POST(req, context);
  } catch (error) {
    console.error('[Keystatic POST Error]', error);
    return NextResponse.json(
      { error: 'Internal server error', message: String(error) },
      { status: 500 }
    );
  }
}

import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '@/keystatic.config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Check if GitHub auth environment variables are present
const hasGithubAuthEnv =
  !!process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
  !!process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
  !!process.env.KEYSTATIC_SECRET;

// Determine if we need GitHub storage based on the config
const isGithubStorage = (config as any)?.storage?.kind === 'github';

// Create handlers based on configuration
let handlers: { GET: any; POST: any };

if (isGithubStorage && !hasGithubAuthEnv) {
  console.warn(
    '[keystatic] GitHub storage mode requires: KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET, KEYSTATIC_SECRET'
  );

  const errorResponse = () =>
    new Response(
      'Keystatic is not configured. Missing GitHub OAuth environment variables.',
      { status: 500 }
    );

  handlers = {
    GET: errorResponse,
    POST: errorResponse,
  };
} else {
  // Create the route handler with GitHub OAuth credentials if using GitHub storage
  handlers = makeRouteHandler({
    config,
    clientId: process.env.KEYSTATIC_GITHUB_CLIENT_ID,
    clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
    secret: process.env.KEYSTATIC_SECRET,
  });
}

export const { GET, POST } = handlers;

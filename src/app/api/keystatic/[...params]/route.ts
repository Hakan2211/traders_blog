import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '@/keystatic.config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Log configuration on startup (for debugging)
if (process.env.NODE_ENV === 'production') {
  console.log('[Keystatic] Config:', {
    hasClientId: !!process.env.KEYSTATIC_GITHUB_CLIENT_ID,
    hasClientSecret: !!process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
    hasSecret: !!process.env.KEYSTATIC_SECRET,
    keystatic_url: process.env.KEYSTATIC_URL || 'NOT SET',
  });
}

export const { GET, POST } = makeRouteHandler({
  config,
  clientId: process.env.KEYSTATIC_GITHUB_CLIENT_ID,
  clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
  secret: process.env.KEYSTATIC_SECRET,
});

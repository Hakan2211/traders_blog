import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '@/keystatic.config';
import { NextRequest } from 'next/server';

// Force removal of the App Slug which might trigger the wrong Auth flow (GitHub App vs OAuth App)
// The user has configured an OAuth App, so this variable should not be present.
// We delete it here to ensure Keystatic uses the correct OAuth flow.
try {
  if (process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG) {
    console.log(
      '[DEBUG] Removing conflicting env var: NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG'
    );
    delete process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG;
  }
} catch (e) {
  console.error('[DEBUG] Failed to delete env var:', e);
}

const { GET: _GET, POST: _POST } = makeRouteHandler({
  config,
});

export const POST = _POST;

export async function GET(req: NextRequest, props: any) {
  const url = new URL(req.url);
  const isCallback = url.pathname.includes('oauth/callback');

  if (isCallback) {
    console.log('--- [DEBUG] Keystatic OAuth Callback Start ---');
    console.log(`URL: ${req.url}`);

    // 1. Check Query Params
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    console.log(
      `Query Params -> Code: ${
        code ? 'Yes (Length: ' + code.length + ')' : 'No'
      }, State: ${state}`
    );

    // 2. Check Cookies
    const cookieStore = req.cookies;
    const stateCookie = cookieStore.get('keystatic-state');
    console.log(
      `Cookies -> keystatic-state: ${
        stateCookie ? 'Present' : 'Missing'
      }, Value: ${stateCookie?.value}`
    );

    // 3. Compare State
    if (state && stateCookie && state !== stateCookie.value) {
      console.error('!!! STATE MISMATCH ERROR !!!');
      console.error(`Received State: ${state}`);
      console.error(`Cookie State:   ${stateCookie.value}`);
    } else if (state && stateCookie) {
      console.log('State match confirmed.');
    }

    // 4. Check Env Vars availability
    console.log('Environment Variables Check:');
    console.log(
      `- CLIENT_ID: ${
        process.env.KEYSTATIC_GITHUB_CLIENT_ID ? 'Loaded' : 'MISSING'
      }`
    );
    console.log(
      `- CLIENT_SECRET: ${
        process.env.KEYSTATIC_GITHUB_CLIENT_SECRET ? 'Loaded' : 'MISSING'
      }`
    );
    if (process.env.KEYSTATIC_GITHUB_CLIENT_SECRET) {
      console.log(
        `- CLIENT_SECRET Length: ${process.env.KEYSTATIC_GITHUB_CLIENT_SECRET.length}`
      );
      console.log(
        `- CLIENT_SECRET First 3 chars: ${process.env.KEYSTATIC_GITHUB_CLIENT_SECRET.substring(
          0,
          3
        )}`
      );
    }
  }

  // Workaround for potential Vercel/Next.js URL normalization issues causing signature mismatch
  // If the request URL has a trailing slash but Keystatic doesn't expect it (or vice-versa), authentication can fail.
  // We don't change the request here, but we log the incoming URL to check if it matches the registered callback.
  if (isCallback) {
    console.log(`[DEBUG] Incoming Callback URL Pathname: ${url.pathname}`);
  }

  const response = await _GET(req);

  if (isCallback) {
    console.log(`--- [DEBUG] Handler Response Status: ${response.status} ---`);
    if (response.status === 401) {
      console.error(
        'Authorization Failed (401) returned by Keystatic handler.'
      );
    }
  }

  return response;
}

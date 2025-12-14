import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  // Only allow in production for debugging (you can remove this endpoint after fixing)
  const config = {
    environment: process.env.NODE_ENV,
    vercel: {
      isVercel: !!process.env.VERCEL,
      url: process.env.VERCEL_URL || 'NOT SET',
    },
    github: {
      hasClientId: !!process.env.KEYSTATIC_GITHUB_CLIENT_ID,
      clientIdPrefix:
        process.env.KEYSTATIC_GITHUB_CLIENT_ID?.substring(0, 5) || 'NOT SET',
      hasClientSecret: !!process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
      clientSecretLength:
        process.env.KEYSTATIC_GITHUB_CLIENT_SECRET?.length || 0,
      hasSecret: !!process.env.KEYSTATIC_SECRET,
      secretLength: process.env.KEYSTATIC_SECRET?.length || 0,
    },
    repo: {
      owner:
        process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER ||
        process.env.VERCEL_GIT_REPO_OWNER ||
        'NOT SET',
      slug:
        process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG ||
        process.env.VERCEL_GIT_REPO_SLUG ||
        'NOT SET',
    },
    expectedCallbackUrl: `https://${
      process.env.VERCEL_URL || 'YOUR_DOMAIN'
    }/api/keystatic/github/oauth/callback`,
    troubleshooting: {
      step1:
        'Verify your GitHub OAuth App callback URL matches exactly: https://YOUR_DOMAIN/api/keystatic/github/oauth/callback',
      step2: 'Ensure KEYSTATIC_GITHUB_CLIENT_ID is set correctly in Vercel',
      step3: 'Ensure KEYSTATIC_GITHUB_CLIENT_SECRET is set correctly in Vercel',
      step4:
        'Ensure KEYSTATIC_SECRET is a 64-character hex string (from: openssl rand -hex 32)',
      step5:
        'Make sure NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER and NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG are set',
    },
  };

  return NextResponse.json(config, { status: 200 });
}

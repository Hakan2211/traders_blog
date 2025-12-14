import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const config = {
    environment: process.env.NODE_ENV,
    vercel: {
      isVercel: !!process.env.VERCEL,
      // VERCEL_URL is the deployment URL (with hash)
      VERCEL_URL: process.env.VERCEL_URL || 'NOT SET',
      // VERCEL_PROJECT_PRODUCTION_URL is the stable production domain
      VERCEL_PROJECT_PRODUCTION_URL:
        process.env.VERCEL_PROJECT_PRODUCTION_URL || 'NOT SET',
    },
    github: {
      hasClientId: !!process.env.KEYSTATIC_GITHUB_CLIENT_ID,
      clientIdPrefix:
        process.env.KEYSTATIC_GITHUB_CLIENT_ID?.substring(0, 8) || 'NOT SET',
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
    urls: {
      vercelUrl: `https://${process.env.VERCEL_URL || 'NOT_SET'}`,
      productionUrl: `https://${
        process.env.VERCEL_PROJECT_PRODUCTION_URL || 'NOT_SET'
      }`,
      expectedCallbackWithVercelUrl: `https://${
        process.env.VERCEL_URL || 'NOT_SET'
      }/api/keystatic/github/oauth/callback`,
      expectedCallbackWithProductionUrl: `https://${
        process.env.VERCEL_PROJECT_PRODUCTION_URL || 'NOT_SET'
      }/api/keystatic/github/oauth/callback`,
    },
    fix: {
      message:
        'Your GitHub OAuth App callback URL should use the PRODUCTION URL, not the VERCEL_URL',
      correctCallbackUrl: `https://${
        process.env.VERCEL_PROJECT_PRODUCTION_URL ||
        'traders-blog-hazel.vercel.app'
      }/api/keystatic/github/oauth/callback`,
    },
  };

  return NextResponse.json(config, { status: 200 });
}

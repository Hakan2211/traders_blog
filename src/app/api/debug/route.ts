import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    clientIdLoaded: !!process.env.KEYSTATIC_GITHUB_CLIENT_ID, // Returns true/false
    clientIdFirstChar: process.env.KEYSTATIC_GITHUB_CLIENT_ID?.substring(0, 1),
    secretLoaded: !!process.env.KEYSTATIC_GITHUB_CLIENT_SECRET, // Returns true/false
    secretLength: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET?.length,
    repoOwner: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER,
    repoSlug: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG,
  });
}

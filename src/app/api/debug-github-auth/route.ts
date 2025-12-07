import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  // Diagnostic info about environment
  const envCheck = {
    clientId: process.env.KEYSTATIC_GITHUB_CLIENT_ID ? 'Loaded' : 'Missing',
    clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET
      ? `Loaded (${
          process.env.KEYSTATIC_GITHUB_CLIENT_SECRET.length
        } chars, starts with ${process.env.KEYSTATIC_GITHUB_CLIENT_SECRET.substring(
          0,
          3
        )})`
      : 'Missing',
    repoOwner: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER,
    repoSlug: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG,
  };

  if (!code) {
    return NextResponse.json({
      message:
        'Provide a ?code=... query parameter to test the exchange manually.',
      envCheck,
    });
  }

  const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID;
  const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'Missing Credentials', envCheck },
      { status: 500 }
    );
  }

  try {
    console.log('Attempting manual exchange with GitHub...');
    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = await res.json();

    return NextResponse.json({
      success: res.ok,
      status: res.status,
      githubResponse: data,
      envCheck,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// Git Proxy - allows CMS to commit using a service token
// This proxies GitHub API requests, adding the PAT for authentication

const GITHUB_API = 'https://api.github.com';
const ALLOWED_REPO = 'richlee/raje-airey';

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Get the GitHub PAT from environment
  const token = env.GITHUB_PAT;
  if (!token) {
    return new Response(JSON.stringify({ error: 'Git proxy not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Get the GitHub API path from query parameter
  const githubPath = url.searchParams.get('path');
  if (!githubPath) {
    return new Response(JSON.stringify({ error: 'Missing path parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Security: Only allow requests to the specific repo
  if (!githubPath.startsWith(`/repos/${ALLOWED_REPO}`)) {
    return new Response(JSON.stringify({ error: 'Access denied' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Build the GitHub API URL
  const githubUrl = `${GITHUB_API}${githubPath}`;

  // Forward the request to GitHub
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Accept', 'application/vnd.github.v3+json');
  headers.set('User-Agent', 'Raje-Airey-CMS');

  if (request.headers.get('Content-Type')) {
    headers.set('Content-Type', request.headers.get('Content-Type'));
  }

  const githubResponse = await fetch(githubUrl, {
    method: request.method,
    headers: headers,
    body: request.method !== 'GET' && request.method !== 'HEAD'
      ? await request.text()
      : undefined,
  });

  // Return the response with CORS headers
  const responseHeaders = new Headers(githubResponse.headers);
  responseHeaders.set('Access-Control-Allow-Origin', '*');
  responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return new Response(githubResponse.body, {
    status: githubResponse.status,
    headers: responseHeaders,
  });
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

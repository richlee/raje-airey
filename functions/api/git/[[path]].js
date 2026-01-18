// Git Gateway - proxies GitHub API requests using the service token
// This allows users without GitHub accounts to use the CMS

const GITHUB_API = 'https://api.github.com';
const ALLOWED_REPO = 'richlee/raje-airey';

export async function onRequest(context) {
  const { request, env, params } = context;

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders(),
    });
  }

  // Get the GitHub PAT from environment
  const token = env.GITHUB_PAT;
  if (!token) {
    return jsonResponse({ error: 'Git gateway not configured. Please set GITHUB_PAT.' }, 500);
  }

  // Build the GitHub API path from the catch-all params
  // params.path is an array like ['repos', 'owner', 'repo', 'contents', 'file.md']
  const pathParts = params.path || [];
  let githubPath = '/' + pathParts.join('/');

  // Add query string if present
  const url = new URL(request.url);
  if (url.search) {
    githubPath += url.search;
  }

  // Security: Only allow requests to the specific repo or user endpoint
  const allowedPaths = [
    `/repos/${ALLOWED_REPO}`,
    '/user',
  ];

  const isAllowed = allowedPaths.some(allowed =>
    githubPath.startsWith(allowed) || githubPath === allowed
  );

  if (!isAllowed) {
    console.log('Blocked path:', githubPath);
    return jsonResponse({ error: 'Access denied', path: githubPath }, 403);
  }

  // Build the GitHub API URL
  const githubUrl = `${GITHUB_API}${githubPath}`;
  console.log(`Git Gateway: ${request.method} ${githubPath}`);

  // Forward the request to GitHub
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Accept', 'application/vnd.github.v3+json');
  headers.set('User-Agent', 'Raje-Airey-CMS-Gateway');

  if (request.headers.get('Content-Type')) {
    headers.set('Content-Type', request.headers.get('Content-Type'));
  }

  let body = null;
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    body = await request.text();
  }

  try {
    const githubResponse = await fetch(githubUrl, {
      method: request.method,
      headers: headers,
      body: body,
    });

    // Get response body
    const responseBody = await githubResponse.text();

    // Return the response with CORS headers
    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', 'application/json');
    Object.entries(corsHeaders()).forEach(([k, v]) => responseHeaders.set(k, v));

    return new Response(responseBody, {
      status: githubResponse.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Git Gateway error:', error);
    return jsonResponse({ error: error.message }, 500);
  }
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Max-Age': '86400',
  };
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(),
    },
  });
}

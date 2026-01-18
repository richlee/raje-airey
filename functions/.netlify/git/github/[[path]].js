// Git Gateway for Sveltia/Decap CMS
// Proxies GitHub API requests using the GITHUB_PAT service token

const GITHUB_API = 'https://api.github.com';
const REPO_OWNER = 'richlee';
const REPO_NAME = 'raje-airey';

export async function onRequest(context) {
  const { request, env, params } = context;

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return corsResponse();
  }

  // Get the GitHub PAT
  const token = env.GITHUB_PAT;
  if (!token) {
    return jsonResponse({ message: 'Git gateway not configured' }, 500);
  }

  // Build the GitHub API path
  const pathParts = params.path || [];
  let githubPath = '/' + pathParts.join('/');

  // Add query string if present
  const url = new URL(request.url);
  if (url.search) {
    githubPath += url.search;
  }

  // The CMS sends paths like /repos/:owner/:repo/...
  // Make sure we're only allowing our repo
  if (githubPath.includes('/repos/') && !githubPath.includes(`/repos/${REPO_OWNER}/${REPO_NAME}`)) {
    return jsonResponse({ message: 'Access denied' }, 403);
  }

  const githubUrl = `${GITHUB_API}${githubPath}`;
  console.log(`Git Gateway: ${request.method} ${githubPath}`);

  // Build headers for GitHub
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Accept', 'application/vnd.github.v3+json');
  headers.set('User-Agent', 'Raje-CMS-Gateway/1.0');

  const contentType = request.headers.get('Content-Type');
  if (contentType) {
    headers.set('Content-Type', contentType);
  }

  // Get request body for non-GET requests
  let body = null;
  if (!['GET', 'HEAD'].includes(request.method)) {
    body = await request.text();
  }

  try {
    const response = await fetch(githubUrl, {
      method: request.method,
      headers,
      body,
    });

    const responseText = await response.text();

    return new Response(responseText, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
        ...corsHeaders(),
      },
    });
  } catch (error) {
    console.error('Git Gateway error:', error);
    return jsonResponse({ message: error.message }, 500);
  }
}

function corsResponse() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  });
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

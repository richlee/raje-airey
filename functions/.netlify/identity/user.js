// User endpoint for git-gateway authentication
// Returns user info when called with a valid token

export async function onRequestGet(context) {
  const { request, env } = context;

  // Check for authorization header
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return jsonResponse({ error: 'Unauthorized' }, 401);
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    // Decode and validate the token
    const decoded = JSON.parse(atob(token));

    if (decoded.exp < Date.now()) {
      return jsonResponse({ error: 'Token expired' }, 401);
    }

    // Return user info
    return jsonResponse({
      id: 'cms-editor',
      email: 'editor@raje-airey.com',
      user_metadata: {
        full_name: 'CMS Editor'
      },
      app_metadata: {
        provider: 'email',
        roles: ['admin']
      }
    });
  } catch (error) {
    return jsonResponse({ error: 'Invalid token' }, 401);
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

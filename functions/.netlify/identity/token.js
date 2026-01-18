// Simple token endpoint for CMS authentication
// This allows password-based login without needing GitHub accounts

export async function onRequestPost(context) {
  const { request, env } = context;

  // Handle CORS
  if (request.method === 'OPTIONS') {
    return corsResponse();
  }

  try {
    const body = await request.formData().catch(() => null) || await request.json().catch(() => ({}));

    // Get credentials from form data or JSON
    let password;
    if (body instanceof FormData) {
      password = body.get('password');
    } else {
      password = body.password;
    }

    // Check against the configured CMS password
    const cmsPassword = env.CMS_PASSWORD;
    if (!cmsPassword) {
      return jsonResponse({ error: 'CMS authentication not configured' }, 500);
    }

    if (password !== cmsPassword) {
      return jsonResponse({ error: 'Invalid password' }, 401);
    }

    // Generate a simple access token (in production, use proper JWT)
    const token = btoa(JSON.stringify({
      exp: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
      user: 'cms-editor'
    }));

    return jsonResponse({
      access_token: token,
      token_type: 'bearer',
      expires_in: 86400,
    });
  } catch (error) {
    console.error('Token error:', error);
    return jsonResponse({ error: error.message }, 500);
  }
}

export async function onRequestOptions() {
  return corsResponse();
}

function corsResponse() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

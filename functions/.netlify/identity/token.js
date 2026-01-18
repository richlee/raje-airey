// Simple token endpoint for CMS authentication
// This allows password-based login without needing GitHub accounts

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // Check against the configured CMS password
    const cmsPassword = env.CMS_PASSWORD;
    if (!cmsPassword) {
      return jsonResponse({ error: 'CMS authentication not configured' }, 500);
    }

    // Get the raw body text first
    const bodyText = await request.text();
    let password;

    // Try to parse as JSON first
    try {
      const json = JSON.parse(bodyText);
      password = json.password;
    } catch {
      // Try to parse as form data
      const params = new URLSearchParams(bodyText);
      password = params.get('password');
    }

    if (!password) {
      return jsonResponse({ error: 'Password required' }, 400);
    }

    if (password !== cmsPassword) {
      return jsonResponse({ error: 'Invalid password' }, 401);
    }

    // Generate a simple access token
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

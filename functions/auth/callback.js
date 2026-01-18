// OAuth callback - exchanges code for token and returns to CMS
export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Missing code parameter', { status: 400 });
  }

  const clientId = env.GITHUB_CLIENT_ID;
  const clientSecret = env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new Response('OAuth not configured. Please set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET environment variables.', { status: 500 });
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return new Response(`OAuth error: ${tokenData.error_description || tokenData.error}`, { status: 400 });
    }

    const token = tokenData.access_token;
    const provider = 'github';

    // Return HTML that posts the token back to the CMS
    const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Authenticating...</title>
    <style>
      body { font-family: sans-serif; text-align: center; padding: 50px; }
      a { color: #E09900; }
    </style>
  </head>
  <body>
    <p id="status">Completing authentication...</p>
    <script>
      (function() {
        const token = "${token}";
        const provider = "${provider}";
        const message = "authorization:" + provider + ":success:" + JSON.stringify({ token: token, provider: provider });

        // Try postMessage to opener first
        if (window.opener) {
          window.opener.postMessage(message, "*");
          document.getElementById("status").innerText = "Success! This window will close...";
          setTimeout(function() { window.close(); }, 500);
        } else {
          // Fallback: store in localStorage and redirect
          localStorage.setItem("decap-cms-auth", JSON.stringify({ token: token, provider: provider }));
          document.getElementById("status").innerHTML =
            'Authentication successful!<br><br>' +
            '<a href="/admin/">Click here to return to the CMS</a><br><br>' +
            '<small>You can close this tab after clicking the link.</small>';
        }
      })();
    </script>
  </body>
</html>`;

    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}

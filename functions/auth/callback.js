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
    return new Response(`OAuth error: ${tokenData.error_description}`, { status: 400 });
  }

  // Return HTML that posts the token back to the CMS
  const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Authenticating...</title>
  </head>
  <body>
    <script>
      (function() {
        const token = "${tokenData.access_token}";
        const provider = "github";

        if (window.opener) {
          window.opener.postMessage(
            'authorization:' + provider + ':success:' + JSON.stringify({ token, provider }),
            window.location.origin
          );
          window.close();
        }
      })();
    </script>
    <p>Authenticating... This window should close automatically.</p>
  </body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}

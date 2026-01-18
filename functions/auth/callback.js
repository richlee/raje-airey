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
  </head>
  <body>
    <p>Authenticating with GitHub...</p>
    <script>
      (function() {
        function receiveMessage(e) {
          console.log("postMessage received:", e);
          window.removeEventListener("message", receiveMessage, false);
          window.close();
        }
        window.addEventListener("message", receiveMessage, false);

        const message = "authorization:${provider}:success:" + JSON.stringify({
          token: "${token}",
          provider: "${provider}"
        });

        console.log("Sending message:", message);

        if (window.opener) {
          window.opener.postMessage(message, "*");
          setTimeout(function() {
            window.close();
          }, 1000);
        } else {
          document.body.innerHTML = "<p>Error: No opener window found. Please close this window and try again.</p>";
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

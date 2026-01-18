// Git Gateway settings endpoint
// Returns configuration for the CMS

export async function onRequestGet(context) {
  return new Response(JSON.stringify({
    github_enabled: true,
    gitlab_enabled: false,
    bitbucket_enabled: false,
    roles: null,
    repo: "richlee/raje-airey"
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
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

export const environment = {
  auth0: {
    domain: (import.meta as any).env.NG_APP_AUTH0_DOMAIN,
    clientId: (import.meta as any).env.NG_APP_AUTH0_CLIENT_ID,
    redirectUri: window.location.origin, // http://localhost:4200
  },
};

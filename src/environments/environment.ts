export const environment = {
  production: false,
  auth0: {
    domain: import.meta.env.NG_APP_AUTH_DOMAIN,
    clientId: import.meta.env.NG_APP_AUTH_CLIENT_ID,
    redirectUri: window.location.origin, // http://localhost:4200
  },
};

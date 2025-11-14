export const environment = {
  production: false,
  auth0: {
    domain: import.meta.env.NG_APP_AUTH0_DOMAIN,
    clientId: import.meta.env.NG_APP_AUTH0_CLIENT_ID,
    redirectUri: window.location.origin // http://localhost:4200
  }
};

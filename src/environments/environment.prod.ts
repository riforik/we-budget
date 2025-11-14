export const environment = {
  production: true,
  auth0: {
    domain: import.meta.env.NG_APP_AUTH_DOMAIN,
    clientId: import.meta.env.NG_APP_AUTH_CLIENTID,
    redirectUri: window.location.origin // http://localhost:4200
  }
};

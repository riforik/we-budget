export const environment = {
  production: true,
  auth: {
    domain: '__AUTH0_DOMAIN__',
    clientId: '__AUTH0_CLIENT_ID__',
    redirectUri: window.location.origin, // http://localhost:4200
  },
};

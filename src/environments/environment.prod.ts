export const environment = {
  production: true,
  auth0: {
    domain: '__AUTH0_DOMAIN__',
    clientId: '__AUTH0_CLIENT_ID__',
    redirectUri: window.location.origin, // http://localhost:4200
  },
  useMockUser: false,
};

export const database = {
  url: '__PG_DB__',
};

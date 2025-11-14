export const environment = {
  production: true,
  auth0: {
    domain: import.meta.env.NG_APP_AUTH0_DOMAIN,
    clientId: import.meta.env.NG_APP_AUTH0_CLIENT_ID
  },
};

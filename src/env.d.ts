interface ImportMetaEnv {
  NG_APP_AUTH0_DOMAIN: string;
  NG_APP_AUTH0_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

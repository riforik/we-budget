interface ImportMetaEnv {
  readonly NG_APP_AUTH0_DOMAIN: string;
  readonly NG_APP_AUTH0_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

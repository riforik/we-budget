interface ImportMetaEnv {
  readonly NG_APP_AUTH_DOMAIN: string;
  readonly NG_APP_AUTH_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

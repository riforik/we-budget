const fs = require('fs');

const envProdPath = './src/environments/environment.prod.ts';
let envFile = fs.readFileSync(envProdPath, 'utf8');

envFile = envFile
  .replace('__AUTH0_DOMAIN__', process.env.NG_APP_AUTH0_DOMAIN)
  .replace('__AUTH0_CLIENT_ID__', process.env.NG_APP_AUTH0_CLIENT_ID)

fs.writeFileSync(envProdPath, envFile);

console.log('✅ Environment variables injected for production build.');

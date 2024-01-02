// scripts/env-to-ts.js
require('dotenv').config();
const fs = require('fs');
const envConfigFile = `export const environment = {
  production: false,
  TMDB_API_KEY: '${process.env.TMDB_API_KEY}',
  TMDB_API_URL: '${process.env.TMDB_API_URL}'
};
`;
fs.writeFileSync('./src/environments/environment.ts', envConfigFile);

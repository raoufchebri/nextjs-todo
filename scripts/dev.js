require('dotenv').config();
const path = require('path');

const url = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}/${process.env.PGDATABASE}`;

require('child_process').spawnSync(path.join(process.cwd(), `node_modules/.bin/prisma`), ['migrate', 'dev'], {
  shell: true,
  env: {
    ...process.env,
    DATABASE_URL: url,
  },
  stdio: 'inherit',
});
require('child_process').spawnSync(path.join(process.cwd(), `node_modules/.bin/next`), ['dev'], {
  env: {
    ...process.env,
    DATABASE_URL: url,
  },
  stdio: 'inherit',
});

const url = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}/${process.env.PGDATABASE}`;

require('child_process').spawnSync('./node_modules/.bin/prisma', ['migrate', 'deploy'], {
  env: {
    ...process.env,
    DATABASE_URL: url,
  },
  shell: true,
  stdio: 'inherit',
});
require('child_process').spawnSync('./node_modules/.bin/next', ['start'], {
  env: {
    ...process.env,
    DATABASE_URL: url,
  },
  stdio: 'inherit',
});

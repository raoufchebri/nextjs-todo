const cp = require('child_process');

process.env.DATABASE_URL = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}/${process.env.PGDATABASE}`;

cp.spawnSync('npx', process.env.NODE_ENV === 'production' ? ['prisma', 'migrate', 'deploy'] : ['prisma', 'migrate', 'dev'], {stdio: 'inherit'});

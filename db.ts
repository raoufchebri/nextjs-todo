import { PrismaClient } from '@prisma/client';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient<{log:[{level: 'query', emit: 'event'}]}> | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: [{level: 'query', emit: 'event'}],
});

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
prisma.$on('query', console.log);


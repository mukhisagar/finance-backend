import { Application } from 'express';
import { PrismaClient } from '@prisma/client';
declare const app: Application;
declare const prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
export { app, prisma };
//# sourceMappingURL=app.d.ts.map
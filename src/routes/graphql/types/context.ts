import { PrismaClient } from '@prisma/client';
import { PrismaClientOptions } from '@prisma/client/runtime/library.js';
import DataLoader from 'dataloader';

export interface Context {
  prisma: PrismaClient<PrismaClientOptions>;
  loaders: WeakMap<object, DataLoader<string, unknown>>;
  dataUsers?: readonly string[];
}

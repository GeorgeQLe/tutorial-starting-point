import 'server-only';

import { cache } from 'react';

import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';

import { appRouter } from './routers/_app';
import { createTRPCContext } from './init';
import { makeQueryClient } from '../client/query-client';

export const getQueryClient = cache(makeQueryClient);

export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});
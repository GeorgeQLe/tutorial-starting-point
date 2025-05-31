import superjson from 'superjson';

import { cache } from "react";

import { db } from "@/db";
import { initTRPC, TRPCError } from '@trpc/server';
import { getSession } from '@/lib/auth';

export const createTRPCContext = cache(() => ({ db }));

type Context = {
  db: typeof db;
};

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(t.middleware(async ({ ctx, next }) => {
  const session = await getSession();

  if(!session) throw new TRPCError({
    code: "UNAUTHORIZED"
  });

  return next({
    ctx: {
      ...ctx,
      user: session.user
    },
  })
}))
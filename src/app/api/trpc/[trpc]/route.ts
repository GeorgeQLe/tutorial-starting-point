import { appRouter } from "@/trpc/server/routers/_app";
import { createTRPCContext } from "@/trpc/server/init";
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const handler = (req: Request) => fetchRequestHandler({
  createContext: createTRPCContext,
  endpoint: "/api/trpc",
  req,
  router: appRouter,
});
export { handler as GET, handler as POST };
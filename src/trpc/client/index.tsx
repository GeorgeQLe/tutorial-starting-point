"use client";
import React, { useState } from "react";
import superjson from 'superjson';

import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

import { AppRouter } from "../server/routers/_app";
import { makeQueryClient } from "./query-client";

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

let clientQueryClientSingleton: QueryClient;

function getQueryClient() {
  if(typeof window === 'undefined') {
    // we're calling from a server component, make a new query client
    return makeQueryClient();
  }
  return (clientQueryClientSingleton ??= makeQueryClient());
};
function getUrl() {
  const base = (() => {
    if(typeof window !== 'undefined') return '';
    if(process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return 'http://localhost:3000';
  })();
  return `${base}/api/trpc`;
};

export const TRPCReactProvider = (props: Readonly<{
  children: React.ReactNode;
}>) => {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() => createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        transformer: superjson,
        url: getUrl(),
      }),
    ],
  }));
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider queryClient={queryClient} trpcClient={trpcClient}>
        {props.children}
      </TRPCProvider>
    </QueryClientProvider>
  );
};
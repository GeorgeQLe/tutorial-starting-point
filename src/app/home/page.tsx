import { ErrorBoundary } from "react-error-boundary";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/trpc/server";
import { getSession } from "@/lib/auth";

import { HomePageContents } from "./_ui/home-page-contents";

const HomePage = async () => {
  const session = await getSession();

  if(!session) redirect("/login");
  
  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<div>There was an error</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <HomePageContents/>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
};

export default HomePage;
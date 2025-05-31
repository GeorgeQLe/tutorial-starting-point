"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const LandingPageContents = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      This is the landing page
      <Link href="/login">
        <Button>
          Login
        </Button>
      </Link>
    </div>
  );
};
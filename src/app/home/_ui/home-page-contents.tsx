"use client";
import { SignoutButton } from "@/components/auth/signout-button";

export const HomePageContents = () => {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      This is the home page
      <SignoutButton/>
    </div>
  );
};
"use client";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export const LoginButtons = () => {
  const signinWithGithub = async () => await authClient.signIn.social({
    callbackURL: "/home",
    provider: "github",
  });

  const signinWithGoogle = async () => await authClient.signIn.social({
    callbackURL: "/home",
    provider: "google",
  });

  return (
    <div className="flex items-center justify-between">
      <Button
        className="w-[45%]"
        onClick={signinWithGithub}
        variant="outline"
      >
        <FaGithub/>
        Github
      </Button>
      <Button
        className="w-[45%]"
        onClick={signinWithGoogle}
        variant="outline"
      >
        <FcGoogle/>
        Google
      </Button>
    </div>
  );
};
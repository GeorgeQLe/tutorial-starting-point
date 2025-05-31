"use client";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export const SignoutButton = () => {
  const router = useRouter();

  const signout = async () => await authClient.signOut({
    fetchOptions: {
      onSuccess: () => router.push("/login"),
    },
  });

  return (
    <Button
      onClick={signout}
      variant="outline"
    >
      Sign Out
    </Button>
  );
};
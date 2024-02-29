"use client";

import { Button } from "@/components/ui/button";
import { AlignEndHorizontal } from "lucide-react";
import { signIn } from "next-auth/react";

export const LoginButton = () => {
  return (
    <Button
      onClick={async () => {
        await signIn();
      }}
      className="font-extrabold flex items-center text-primary-foreground border-4 border-primary"
    >
      <AlignEndHorizontal size={20} className="mr-2" /> Get Untool for Free
    </Button>
  );
};

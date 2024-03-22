import { getServerSession } from "next-auth";
import React from "react";
import { authConfig } from "../../api/auth/next.config";
import { redirect } from "next/navigation";
import Sidebar from "@/components/shared/Sidebar";
import MobileNav from "@/components/shared/MobileNav";
import { Toaster } from "@/components/ui/toaster";
import { getUserById } from "@/lib/actions/users/user.actions";

const PlatformLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authConfig);
  if (!session?.user) {
    redirect("/");
  }
  const user = await getUserById(session?.user.id);
  return (
    <main className="root">
      <Sidebar session={session} user={user} />
      <MobileNav session={session} user={user} />
      <div className="root-container bg-background">
        <div className="wrapper">{children}</div>
      </div>
      <Toaster />
    </main>
  );
};

export default PlatformLayout;

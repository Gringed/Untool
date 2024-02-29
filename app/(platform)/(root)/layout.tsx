import { getServerSession } from "next-auth";
import React from "react";
import { authConfig } from "../../api/auth/next.config";
import { redirect } from "next/navigation";
import Sidebar from "@/components/shared/Sidebar";
import MobileNav from "@/components/shared/MobileNav";

const PlatformLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authConfig);

  if (!session?.user) {
    redirect("/");
  }
  return (
    <main className="root">
      <Sidebar session={session} />
      <MobileNav session={session} />
      <div className="root-container">
        <div className="wrapper">{children}</div>
      </div>
    </main>
  );
};

export default PlatformLayout;

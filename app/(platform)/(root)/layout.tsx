import { getServerSession } from "next-auth";
import React, { Suspense } from "react";
import { authConfig } from "../../api/auth/next.config";
import { redirect } from "next/navigation";
import Sidebar from "@/components/shared/Sidebar";
import MobileNav from "@/components/shared/MobileNav";
import { Toaster } from "@/components/ui/toaster";

const PlatformLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authConfig);

  if (!session?.user) {
    redirect("/");
  }
  return (
    <main className="root">
      <Sidebar session={session} />
      <MobileNav session={session} />
      <div className="root-container bg-background">
        <Suspense
          fallback={
            <>
              <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
                <div className="p-4 bg-gradient-to-tr animate-spin from-secondary to-blue-500 via-purple-500 rounded-full">
                  <div className="bg-white rounded-full">
                    <div className="w-24 h-24 rounded-full"></div>
                  </div>
                </div>
              </div>
            </>
          }
        >
          <div className="wrapper">{children}</div>
        </Suspense>
      </div>
      <Toaster />
    </main>
  );
};

export default PlatformLayout;

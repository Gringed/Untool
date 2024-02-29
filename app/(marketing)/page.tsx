import { cn } from "@/lib/utils";
import { AlignEndHorizontal, CropIcon } from "lucide-react";
import { Montserrat_Alternates } from "next/font/google";
import Link from "next/link";
import React from "react";
import { LoginButton } from "../(platform)/(auth)/_components/LoginButton";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Tilt from "./_components/Tilt";

const MarketingPage = async () => {
  const session = await getAuthSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex items-center mx-10 text-primary gap-6 justify-center flex-col">
      <Tilt />
      <div>
        <button className="button-85 font-extrabold text-primary" role="button">
          <Link className="flex items-center gap-2" href={"/api/auth/signin"}>
            <CropIcon className="sm:block hidden" size={20} />
            <span className="">Get Untool for Free</span>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default MarketingPage;

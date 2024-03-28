"use client";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlignEndHorizontal, CropIcon, LogIn, LogInIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Montserrat_Alternates } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const alternate = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["100", "200", "700", "800", "600"],
});
const Navbar = () => {
  const { theme } = useTheme();
  return (
    <div className="fixed top-0 flex items-center w-full h-16 px-4 shadow-lg border-b-2 bg-background/80 backdrop-blur-sm">
      <div className="md:max-w-screen-2xl mx-auto justify-between w-full flex items-center">
        <Link
          href={"/"}
          className="hover:translate-x-2 duration-200 transition"
        >
          <div
            className={cn(
              " items-center justify-center flex",
              alternate.className
            )}
          >
            <Image
              alt=""
              width={55}
              height={55}
              src={`assets/images/logo-light.svg`}
            />
            <h1 className="text-2xl hidden -ms-9 mt-1 md:flex font-extrabold tracking-tighter ">
              <span className="-ms-[1px] me-3">U</span>ntool
            </h1>
          </div>
        </Link>
        <div className="space-x-4 md:w-auto flex items-center justify-between">
          <Button
            asChild
            size={"sm"}
            variant={"ghost"}
            className="font-extrabold px-5 "
          >
            <Link className="flex items-center gap-2" href={"/api/auth/signin"}>
              <CropIcon className="sm:block hidden" size={20} />
              <LogInIcon className="sm:hidden block" size={20} />
              <span className="sm:block hidden">Login</span>
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

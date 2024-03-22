"use client";
import { LogoutButton } from "@/app/(platform)/(auth)/_components/LogoutButton";
import React from "react";
import { ThemeToggle } from "../ThemeToggle";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Montserrat_Alternates } from "next/font/google";
import { useTheme } from "next-themes";
import { navLinks } from "@/constants";
import { redirect, usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";
const alternate = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["100", "200", "700", "800", "600"],
});
const Sidebar = ({ session, user }: any) => {
  const { theme } = useTheme();
  const pathname = usePathname();
  if (!session) {
    redirect("/");
  }
  const profileActive = pathname === "/profile";
  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link
          href={"/dashboard"}
          className="hover:scale-125 duration-200 transition"
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
              src={`/assets/images/${
                theme === "dark" ? "logo-dark.svg" : "logo-light.svg"
              }`}
            />
            <h1 className="text-2xl hidden md:block -ms-2 font-extrabold tracking-tighter ">
              ntool
            </h1>
          </div>
        </Link>
        <div className="flex gap-4 w-full items-center justify-between">
          <ThemeToggle />
          <LogoutButton />
        </div>
        <nav className="sidebar-nav overflow-y-auto">
          <ul className="sidebar-nav_elements">
            {navLinks.slice(0, 7).map((link) => {
              const isActive = link.route === pathname;
              return (
                <li
                  key={link.route}
                  className={`flex-center p-16-semibold items-center relative w-full  border  rounded-xl  group transition-all   shadow  ${
                    isActive
                      ? "border-b-8 border-r-8 border-2  border-secondary"
                      : " text-primary border-primary/10"
                  }`}
                >
                  {!link.plan?.includes(user.plan) && link?.plan && (
                    <div className="absolute invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 ">
                      <span className="inline-flex items-center opacity-100 rounded-lg text-sm px-2 py-1 text-primary ">
                        <Image
                          src={"https://www.svgrepo.com/show/413740/wait.svg"}
                          width={24}
                          height={24}
                          alt="Premium"
                          className="animate-spin mr-2"
                        />
                        Coming soon
                      </span>
                    </div>
                  )}
                  <Link
                    aria-disabled={link.plan && !link.plan?.includes(user.plan)}
                    tabIndex={
                      link.plan && !link.plan?.includes(user.plan)
                        ? -1
                        : undefined
                    }
                    className={`${
                      !link.plan?.includes(user.plan) &&
                      link?.plan &&
                      "opacity-20 hover:blur"
                    } sidebar-link  transition-all rounded-xl hover:shadow`}
                    href={link.route}
                  >
                    <Image src={link.icon} alt="logo" width={24} height={24} />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className="sidebar-nav_elements">
            {navLinks.slice(7).map((link) => {
              const isActive = link.route === pathname;
              return (
                <li
                  key={link.route}
                  className={`flex-center p-16-semibold items-center w-full whitespace-nowrap border  rounded-xl  group transition-all   shadow  ${
                    isActive
                      ? "border-b-8 border-r-8 border-2  border-secondary"
                      : " text-primary border-primary/10"
                  }`}
                >
                  <Link
                    className="sidebar-link  transition-all rounded-xl hover:shadow"
                    href={link.route}
                  >
                    <Image
                      src={link.icon}
                      alt="logo"
                      width={24}
                      height={24}
                      //className={`${isActive && "brightness-200"}`}
                    />
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li
              className={`flex-center p-16-semibold items-center w-full whitespace-nowrap border  rounded-xl  group transition-all   shadow  ${
                profileActive
                  ? "border-b-8 border-r-8 border-2  border-secondary"
                  : " text-primary border-primary/10"
              }`}
            >
              <Link
                className="sidebar-link  transition-all rounded-l-xl hover:shadow"
                href={"/profile"}
              >
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={25}
                  height={25}
                  className="rounded-full object-cover"
                />
                {session.user.name}
              </Link>
              <button
                onClick={async () => {
                  await signOut();
                }}
                className={`font-extrabold  hover:scale-90 duration-200 transition text-white justify-center px-3 bg-secondary h-full flex items-center  border-primary ${
                  profileActive
                    ? "border border-secondary rounded-r"
                    : "rounded-r-lg shadow"
                }`}
              >
                <LogOut size={20} className="" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

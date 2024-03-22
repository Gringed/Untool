"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/constants";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Montserrat_Alternates } from "next/font/google";
import { useTheme } from "next-themes";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
const alternate = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["100", "200", "700", "800", "600"],
});
const MobileNav = ({ session, user }: any) => {
  const pathname = usePathname();
  const { theme } = useTheme();
  return (
    <header className="header">
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
            width={45}
            height={45}
            src={`/assets/images/${
              theme === "dark" ? "logo-dark.svg" : "logo-light.svg"
            }`}
          />
          <h1 className="text-2xl hidden md:block -ms-2 font-extrabold tracking-tighter ">
            ntool
          </h1>
        </div>
      </Link>

      <nav className="flex gap-4">
        <Link
          className=" rounded-full transition-all  hover:shadow"
          href={"/profile"}
        >
          <Image
            src={session.user.image}
            alt="Profile"
            width={32}
            height={32}
            className="rounded-full"
          />
        </Link>
        <Sheet>
          <SheetTrigger>
            <Image
              src="https://www.svgrepo.com/show/413725/stack.svg"
              alt="menu"
              width={32}
              height={32}
              className="cursor-pointer"
            />
          </SheetTrigger>
          <SheetContent className="sheet-content sm:w-72 overflow-y-scroll">
            <>
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

              <ul className="header-nav_elements">
                {navLinks.map((link) => {
                  const isActive = link.route === pathname;

                  return (
                    <li
                      className={`${
                        isActive &&
                        "text-secondary font-bold border-b-secondary  border-b"
                      } p-18 flex w-full relative  text-dark-700`}
                      key={link.route}
                    >
                      {!link.plan?.includes(user.plan) && link?.plan && (
                        <div className="absolute -end-5 top-0">
                          <span className="inline-flex items-center opacity-100 rounded-md bg-secondary px-2 py-1 text-xxs  leading-none text-white ring-1 ring-inset ring-secondary">
                            Coming soon
                          </span>
                        </div>
                      )}
                      <Link
                        aria-disabled={
                          link.plan && !link.plan?.includes(user.plan)
                        }
                        tabIndex={
                          link.plan && !link.plan?.includes(user.plan)
                            ? -1
                            : undefined
                        }
                        className={`${
                          !link.plan?.includes(user.plan) &&
                          link?.plan &&
                          "pointer-events-none opacity-20"
                        } sidebar-link cursor-pointer`}
                        href={link.route}
                      >
                        <Image
                          src={link.icon}
                          alt="logo"
                          width={24}
                          height={24}
                        />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <hr />
              <ul className="header-nav_elements">
                <li className={`p-18 flex w-full  text-dark-700`}>
                  <button
                    className="sidebar-link cursor-pointer"
                    onClick={async () => {
                      await signOut();
                    }}
                  >
                    <Image
                      src={"https://www.svgrepo.com/show/413728/switch.svg"}
                      alt="logo"
                      width={24}
                      height={24}
                    />{" "}
                    Logout
                  </button>
                </li>
              </ul>
            </>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default MobileNav;

import React from "react";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { navLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";

import { getAllImages } from "@/lib/actions/image/image.actions";
import dynamic from "next/dynamic";
import Collection from "@/components/shared/Collection";

const Home = async ({ searchParams }: SearchParamProps) => {
  const session = await getAuthSession();
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || "";
  if (!session?.user) {
    redirect("/");
  }
  const images = await getAllImages({ page, searchQuery });
  return (
    <>
      <section className="sm:flex-center hidden h-72 flex-col gap-4 rounded-[20px] border bg-banner bg-cover bg-no-repeat p-10 shadow-inner;">
        <h1 className="h1-semibold max-w-[700px] flex-wrap text-center p-5 text-primary-foreground shadow-sm rounded-lg">
          Unleash Your Creative Vision with Untool
        </h1>
      </section>
      <ul className="flex -mt-10 px-3 flex-center w-full gap-5">
        {navLinks.slice(1, 6).map((link) => (
          <Link
            key={link.route}
            href={link.route}
            className="flex-center flex w-full dark:shadow-gray-600 shadow-lg hover:-mt-4 pt-[2px] dark:hover:shadow-secondary hover:shadow-secondary bg-gradient-to-b from-secondary to-60% to-transparent transition-all rounded-xl flex-col"
          >
            <li className="flex-center w-full bg-background rounded-t-xl p-4">
              <Image src={link.icon} alt="image" width={24} height={24} />
            </li>
            <p className="font-bold text-xs py-4 text-center text-primary">
              {link.label}
            </p>
          </Link>
        ))}
      </ul>

      <section className="sm:mt-12">
        <Collection
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </>
  );
};

export default Home;

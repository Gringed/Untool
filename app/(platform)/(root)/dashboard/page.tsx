import React from "react";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { navLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { Collection } from "@/components/shared/Collection";
import { getAllImages } from "@/lib/actions/image/image.actions";

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
        <h1 className="home-heading">
          Unleash Your Creative Vision with Untool
        </h1>
        <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex-center flex-col gap-2"
            >
              <li className="flex-center w-fit rounded-full bg-white p-4">
                <Image src={link.icon} alt="image" width={24} height={24} />
              </li>
              <p className="p-14-medium text-center text-white">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>

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

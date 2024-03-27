import React from "react";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { navLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";

import { getAllImages } from "@/lib/actions/image/image.actions";
import dynamic from "next/dynamic";
import Collection from "@/components/shared/Collection";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
      <section className="flex-center h-72 flex-col gap-4 rounded-[20px] border bg-banner bg-cover bg-no-repeat p-10 shadow-inner;">
        <h1 className="h1-semibold max-w-[700px] flex-wrap text-center p-5 text-primary shadow-sm rounded-lg">
          Unleash Your Creative Vision with Untool
        </h1>
      </section>
      <Carousel className=" -mt-4 sm:-mt-12 flex mx-4 justify-center">
        <CarouselContent className="flex ">
          {navLinks.slice(1, 7).map((link) => (
            <CarouselItem
              key={link.route}
              className="w-full justify-center flex sm:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <Card className="hover:bg-background/60 transition-all bg-background">
                <Link
                  key={link.route}
                  href={link.route}
                  className="h-full flex"
                >
                  <CardContent className="flex justify-between py-2 flex-col items-center">
                    <Image
                      src={link.icon}
                      className="bg-background rounded-full p-1"
                      alt="image"
                      width={30}
                      height={30}
                    />
                    <Separator className="my-2 border-secondary border-2 rounded-full" />
                    <p className="font-bold text-sm py-2 px-4 text-wrap text-center text-primary">
                      {link.label}
                    </p>
                  </CardContent>
                </Link>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <section className="mt-12">
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

"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { transformationTypes } from "@/constants";

import { formUrlQuery } from "@/lib/utils";

import { Button } from "../ui/button";

import { Search } from "./Search";
import { IImage } from "@/interfaces";
import { useState } from "react";

const Collection = ({
  hasSearch = false,
  images,
  totalPages = 1,
  page,
}: {
  images: IImage[];
  totalPages?: number;
  page: number;
  hasSearch?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // PAGINATION HANDLER
  const onPageChange = (action: string) => {
    const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      searchParams: searchParams?.toString(),
      key: "page",
      value: pageValue,
    });

    setIsLoading(false);
    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      <div className="collection-heading">
        <h2 className="h2-bold text-primary">Recent Edits</h2>
        {hasSearch && <Search />}
      </div>

      {images.length > 0 ? (
        <ul className="collection-list">
          {images.map((image) => (
            <Card image={image} key={image.id} />
          ))}
        </ul>
      ) : (
        <div className="collection-empty">
          <p className="p-20-semibold">Empty List</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-10 text-primary">
          <PaginationContent className="flex w-full text-primary hover:text-primary">
            <Button
              disabled={Number(page) <= 1 || isLoading}
              className="text-white hover:text-white"
              onClick={() => {
                setIsLoading(true);
                onPageChange("prev");
              }}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 ..."
                  viewBox="0 0 24 24"
                ></svg>
              ) : (
                <PaginationPrevious />
              )}
            </Button>

            <p className="flex-center p-16-medium w-fit flex-1">
              {page} / {totalPages}
            </p>

            <Button
              className=" text-white hover:text-white"
              onClick={() => {
                setIsLoading(true);
                onPageChange("next");
              }}
              disabled={Number(page) >= totalPages}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 ..."
                  viewBox="0 0 24 24"
                ></svg>
              ) : (
                <PaginationNext />
              )}
            </Button>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

const Card = ({ image }: { image: IImage }) => {
  return (
    <li key={image.id}>
      <Link
        href={`/transformations/${image.id}`}
        key={image.id}
        className="flex flex-1 cursor-pointer flex-col  dark:shadow-gray-900 dark:hover:shadow-secondary rounded-xl border-t-4 border-primary hover:border-secondary bg-background shadow-xl hover:shadow-md  transition-all hover:shadow-secondary"
      >
        <CldImage
          src={image.publicId}
          alt={image.title}
          width={image.width}
          height={image.height}
          {...image.config}
          loading="lazy"
          className="h-52 w-full rounded-t-xl object-cover"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        />
        <div className="flex-between px-4 py-3">
          <p className="p-16-semibold mr-3 line-clamp-1 text-primary">
            {image.title}
          </p>
          <Image
            src={`/assets/icons/${
              transformationTypes[
                image.transformationType as TransformationTypeKey
              ].icon
            }`}
            alt={image.title}
            width={24}
            height={24}
          />
        </div>
      </Link>
    </li>
  );
};

export default Collection;

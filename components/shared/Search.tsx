"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

export const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        const newUrl = formUrlQuery({
          searchParams: searchParams || "",
          key: "query",
          value: query,
        });

        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = removeKeysFromQuery({
          searchParams: searchParams?.toString() || "",
          keysToRemove: ["query"],
        });

        router.push(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [router, searchParams, query]);

  const verifierCaracteres = (event: any): boolean => {
    const interdit =
      "àâäãçéèêëìîïòôöõùûüñ &*?!:;,\t#~\"^¨%$£?²¤§%*()]{}<>=|\\/`'";
    const touche = event.key;

    if (interdit.includes(touche)) {
      event.preventDefault(); // Empêche le caractère d'être saisi
      return false;
    }

    return true; // Autorise la saisie du caractère
  };

  return (
    <div className="flex w-full relative items-center justify-end flex-1">
      <Image
        src="/assets/icons/search.svg"
        className="absolute right-[10px]"
        alt="search"
        width={24}
        height={24}
      />

      <Input
        className=" rounded-[16px] flex  border-2 border-purple-200/20  px-4 shadow-sm shadow-purple-200/15 md:max-w-96  bg-background text-primary w-full placeholder:text-primary h-[50px] p-16-medium  p-3"
        placeholder="Search"
        id="mon_input"
        onDrop={(e) => {
          e.preventDefault();
          return false;
        }}
        onPaste={(e) => {
          e.preventDefault();
          alert("Le collage de texte n'est pas autorisé !");
          return false;
        }}
        onKeyDown={(e) => {
          return verifierCaracteres(e);
        }}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

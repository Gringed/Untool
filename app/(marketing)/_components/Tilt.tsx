"use client";

import { cn } from "@/lib/utils";
import { Montserrat_Alternates } from "next/font/google";
import React from "react";
import ReactParallaxTilt from "react-parallax-tilt";
const alternate = Montserrat_Alternates({
  subsets: ["latin"],
  weight: "700",
});
const Tilt = () => {
  return (
    <ReactParallaxTilt
      glarePosition="bottom"
      glareBorderRadius="15px"
      perspective={700}
      className="p-20  parallax-effect card-header"
    >
      <div className="flex items-center inner-element justify-center flex-col">
        <h1
          className={cn(
            "text-3xl md:text-6xl flex flex-col gap-4 tracking-tighter font-bold text-center",
            alternate.className
          )}
        >
          <span>Transform Images & Text</span>
          <span>
            Powered by <span className="text-secondary">AI.</span>
          </span>
          <span>
            Welcome to{" "}
            <span className=" bg-secondary ps-2 pe-6 py-0 text-primary-foreground">
              Untool.
            </span>
          </span>
        </h1>
        <div className="flex flex-col text-center font-semibold max-w-xs md:max-w-2xl my-4  text-sm mx-auto  md:text-xl">
          <span>Make your texts and images the most beautiful</span>
        </div>
      </div>
    </ReactParallaxTilt>
  );
};

export default Tilt;

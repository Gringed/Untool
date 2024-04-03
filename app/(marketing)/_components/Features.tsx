"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import useMousePosition from "@/lib/mouse";
interface MousePosition {
  x: number | null;
  y: number | null;
}
const Features = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const circleRef = useRef(null);
  const updateMousePosition = (e: any) => {
    /*  console.log(e.target.getBoundingClientRect().y);
    console.log("Taille" + e.clientX + " " + e.clientY); */
    setMousePosition({
      x: e.clientX - 16,
      y: e.clientY - e.target.getBoundingClientRect().y,
    });
  };

  const { x, y } = mousePosition;
  const size = 40;

  {
    /* <div className="flex flex-col  lg:grid gap-8 lg:grid-cols-12 md:grid-cols-12 xl:grid-cols-12 relative">
    <div className="relative group isolate rounded-xl background-gradient ring-1 ring-gray-200 dark:ring-gray-800 before:hidden before:lg:block before:absolute before:-inset-[2px] before:h-[calc(100%+4px)] before:w-[calc(100%+4px)] before:z-[-1] before:rounded-[13px] flex-1 flex flex-col shadow col-span-1 md:col-span-12 transition-shadow duration-200 hover:ring-gray-500 dark:hover:ring-gray-400">
      Test
    </div>
    <motion.div onMouseMove={handleMouseMove}>
      <div className="p-5 rounded-tl-full rounded-br-full bg-secondary">
        <h1>CC</h1>
      </div>
    </motion.div>
    <div className="col-span-1 md:col-span-4 shadow">
      <div className="p-5">
        <h1>CC</h1>
      </div>
    </div>
    <div className="col-span-1 md:col-span-4 shadow">
      <div className="p-5">
        <h1>CC</h1>
      </div>
    </div>
  </div> */
  }
  return (
    <div className="flex flex-col  lg:grid gap-8 lg:grid-cols-12 md:grid-cols-12 xl:grid-cols-12 relative">
      <div
        className="relative h-[500px] group isolate rounded-xl background-gradient ring-1 ring-gray-200 dark:ring-gray-800 before:hidden before:lg:block before:absolute before:-inset-[2px] before:h-[calc(100%+4px)] before:w-[calc(100%+4px)] before:z-[-1] before:rounded-[13px] flex-1 flex flex-col shadow col-span-1 md:col-span-12 transition-shadow duration-200 hover:ring-gray-500 dark:hover:ring-gray-400"
        onPointerMove={updateMousePosition}
      >
        <motion.div
          ref={circleRef}
          initial={{ maskPosition: `0px 0px` }}
          className=" absolute w-full rounded-full h-full"
          style={{
            maskImage: "url('../assets/icons/mask.svg')",
            maskRepeat: "no-repeat",
            maskSize: "40px",
            background: "pink",
          }}
          animate={{
            maskPosition: `${x}px ${y}px`,
            WebkitMaskSize: `${size}px`,
          }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          d
        </motion.div>
        Test
      </div>
      <div className="col-span-1 md:col-span-4 shadow">
        <div className="p-5">
          <h1>CC</h1>
        </div>
      </div>
      <div className="col-span-1 md:col-span-4 shadow">
        <div className="p-5">
          <h1>CC</h1>
        </div>
      </div>
    </div>
  );
};

export default Features;

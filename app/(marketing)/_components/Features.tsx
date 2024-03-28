import React from "react";

const Features = () => {
  return (
    <div className="flex flex-col  lg:grid gap-8 lg:grid-cols-12 md:grid-cols-12 xl:grid-cols-12 relative">
      <div className="relative group isolate rounded-xl background-gradient ring-1 ring-gray-200 dark:ring-gray-800 before:hidden before:lg:block before:absolute before:-inset-[2px] before:h-[calc(100%+4px)] before:w-[calc(100%+4px)] before:z-[-1] before:rounded-[13px] flex-1 flex flex-col shadow col-span-1 md:col-span-12 transition-shadow duration-200 hover:ring-gray-500 dark:hover:ring-gray-400">
        Test
      </div>
      <div className="relative group isolate rounded-xl background-gradient ring-1 ring-gray-200 dark:ring-gray-800 before:hidden before:lg:block before:absolute before:-inset-[2px] before:h-[calc(100%+4px)] before:w-[calc(100%+4px)] before:z-[-1] before:rounded-[13px] flex-1 flex flex-col shadow col-span-1 md:col-span-4 transition-shadow duration-200 hover:ring-gray-500 dark:hover:ring-gray-400">
        test 2
      </div>
    </div>
  );
};

export default Features;

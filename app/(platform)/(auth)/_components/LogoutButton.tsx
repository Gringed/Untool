"use client";

import { AlignEndHorizontal, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  return (
    <button
      onClick={async () => {
        await signOut();
      }}
      className="font-extrabold hover:scale-90 duration-200 transition text-primary justify-center  flex items-center px-4 py-2 rounded-full border-primary"
    >
      <LogOut size={20} className="mr-2" /> Logout
    </button>
  );
};

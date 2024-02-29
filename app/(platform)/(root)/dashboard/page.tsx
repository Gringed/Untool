import React from "react";
import { LogoutButton } from "../../(auth)/_components/LogoutButton";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";

const Home = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/");
  }
  return (
    <div>
      <LogoutButton />
      {session.user.id}
    </div>
  );
};

export default Home;

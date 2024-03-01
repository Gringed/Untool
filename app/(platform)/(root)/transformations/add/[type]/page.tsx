import { authConfig } from "@/app/api/auth/next.config";
import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/users/user.actions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import React from "react";

const AddTransformationTypePage = async ({
  params: { type },
}: SearchParamProps) => {
  const transformation = transformationTypes[type];
  const session = await getServerSession(authConfig);
  if (!session) redirect("/api/auth/signin");

  const user = await getUserById(session.user.id);
  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />

      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  );
};

export default AddTransformationTypePage;

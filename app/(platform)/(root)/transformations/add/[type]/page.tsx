import { authConfig } from "@/app/api/auth/next.config";
import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/users/user.actions";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

import React from "react";
const TransformationFormComp = dynamic(
  () => import("../../../../../../components/shared/TransformationForm"),
  {
    loading: () => (
      <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
        <div className="p-4 bg-gradient-to-tr animate-spin from-secondary to-blue-500 via-purple-500 rounded-full">
          <div className="bg-white rounded-full">
            <div className="w-24 h-24 rounded-full"></div>
          </div>
        </div>
      </div>
    ),
  }
);
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
        <TransformationFormComp
          action="Add"
          userId={user.id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  );
};

export default AddTransformationTypePage;

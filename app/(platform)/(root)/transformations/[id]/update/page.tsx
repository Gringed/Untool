import { redirect } from "next/navigation";

import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";

import { authConfig } from "@/app/api/auth/next.config";
import { getServerSession } from "next-auth";
import { getUserById } from "@/lib/actions/users/user.actions";
import { getImageById } from "@/lib/actions/image/image.actions";

const Page = async ({ params: { id } }: SearchParamProps) => {
  const session = await getServerSession(authConfig);
  if (!session) redirect("/api/auth/signin");

  const user = await getUserById(session.user.id);

  const image = await getImageById(id);

  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey];

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />

      <section className="mt-10">
        <TransformationForm
          action="Update"
          userId={user.id}
          type={image.transformationType as TransformationTypeKey}
          creditBalance={user.creditBalance}
          config={image.config}
          data={image}
        />
      </section>
    </>
  );
};

export default Page;

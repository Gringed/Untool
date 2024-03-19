import Image from "next/image";
import { redirect } from "next/navigation";

import Header from "@/components/shared/Header";

import dynamic from "next/dynamic";
import { getAuthSession } from "@/lib/auth";
import { getAllImages, getUserImages } from "@/lib/actions/image/image.actions";
import { getUserById } from "@/lib/actions/users/user.actions";
import Collection from "@/components/shared/Collection";

const Profile = async ({ searchParams }: SearchParamProps) => {
  const session = await getAuthSession();
  const page = Number(searchParams?.page) || 1;

  if (!session?.user) {
    redirect("/");
  }

  const user = await getUserById(session.user?.id);
  const images = await getUserImages({ page, userId: user.id });

  return (
    <>
      <Header title="Profile" />

      <section className="profile">
        <div className="profile-balance">
          <p className="p-14-medium md:p-16-medium uppercase">
            Credits available
          </p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/coins.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="h2-bold text-secondary">{user.creditBalance}</h2>
          </div>
        </div>

        <div className="profile-image-manipulation">
          <p className="p-14-medium md:p-16-medium uppercase">
            Image manipulation done
          </p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/photo.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="h2-bold text-secondary">{images?.totalImages}</h2>
          </div>
        </div>
      </section>

      <section className="mt-8 md:mt-14">
        <Collection
          images={images?.data}
          totalPages={images?.totalPages}
          page={page}
        />
      </section>
    </>
  );
};

export default Profile;

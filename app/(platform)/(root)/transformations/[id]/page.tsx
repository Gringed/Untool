import Image from "next/image";
import Link from "next/link";

import Header from "@/components/shared/Header";
import TransformedImage from "@/components/shared/TransformedImage";
import { Button } from "@/components/ui/button";

import { getImageSize } from "@/lib/utils";
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "@/app/api/auth/next.config";
import { getUserById } from "@/lib/actions/users/user.actions";
import { getImageById } from "@/lib/actions/image/image.actions";

const ImageDetails = async ({ params: { id } }: SearchParamProps) => {
  const session = await getServerSession(authConfig);
  if (!session) redirect("/api/auth/signin");

  const user = await getUserById(session.user.id);

  const image = await getImageById(id);
  console.log(image);
  return (
    <>
      <Header title={image.title} />

      <section className="mt-5 flex flex-wrap gap-4">
        <div className="p-14-medium md:p-16-medium flex gap-2">
          <p className="text-primary">Transformation:</p>
          <p className=" capitalize text-purple-400">
            {image.transformationType}
          </p>
        </div>

        {image.prompt && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2 ">
              <p className="text-primary">Prompt:</p>
              <p className=" capitalize text-purple-400">{image.prompt}</p>
            </div>
          </>
        )}
        {image.config?.[image.transformationType]?.multiple && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2 ">
              <p className="text-primary">Multiple:</p>
              <p className=" capitalize text-purple-400">
                {image.config?.[image.transformationType]?.multiple
                  ? "Yes"
                  : "No"}
              </p>
            </div>
          </>
        )}
        {image.config?.[image.transformationType]?.removeShadow && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2 ">
              <p className="text-primary">Remove shadows:</p>
              <p className=" capitalize text-purple-400">
                {image.config?.[image.transformationType]?.removeShadow
                  ? "Yes"
                  : "No"}
              </p>
            </div>
          </>
        )}

        {image.color && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-primary">Color:</p>
              <p className=" capitalize text-purple-400">{image.color}</p>
            </div>
          </>
        )}

        {image.aspectRatio && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-primary">Aspect Ratio:</p>
              <p className=" capitalize text-purple-400">{image.aspectRatio}</p>
            </div>
          </>
        )}
      </section>

      <section className="mt-10 border-t border-dark-400/15">
        <div className="transformation-grid">
          {/* MEDIA UPLOADER */}
          <div className="flex flex-col gap-4">
            <h3 className="h3-bold text-primary">Original</h3>

            <Image
              width={getImageSize(image.transformationType, image, "width")}
              height={getImageSize(image.transformationType, image, "height")}
              src={image.secureURL}
              alt="image"
              className="transformation-original_image"
            />
          </div>

          {/* TRANSFORMED IMAGE */}
          <TransformedImage
            image={image}
            type={image.transformationType}
            title={image.title}
            isTransforming={false}
            transformationConfig={image.config}
            hasDownload={true}
          />
        </div>

        {user?.id === image.authorId && (
          <div className="mt-4 space-y-4">
            <Button
              asChild
              type="button"
              variant={"default"}
              className=" py-4 px-6 p-16-semibold h-[50px] w-full md:h-[54px] capitalize"
            >
              <Link href={`/transformations/${image.id}/update`}>
                Update Image
              </Link>
            </Button>

            <DeleteConfirmation imageId={image.id} />
          </div>
        )}
      </section>
    </>
  );
};

export default ImageDetails;

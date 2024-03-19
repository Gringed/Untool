import { signIn, getCsrfToken, getProviders } from "next-auth/react";

import { GetServerSideProps, GetServerSidePropsContext } from "next";

import "../../../app/globals.css";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Montserrat_Alternates } from "next/font/google";
import { cn } from "@/lib/utils";
interface SigninProps {
  csrfToken: string;
  providers: Record<string, any>;
}
const alternate = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["100", "200", "700", "800", "600"],
});
const Signin: React.FC<SigninProps> = ({ csrfToken, providers }) => {
  return (
    <div className="h-screen bg-wallpaper bg-wallpaperPosition">
      <div className="background">
        <svg
          id="10015.io"
          viewBox="0 0 480 480"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="rgba(195, 108, 222, 1)"
            d="M396,268Q404,296,400.5,329.5Q397,363,379.5,395Q362,427,324.5,427Q287,427,257.5,408.5Q228,390,203,385.5Q178,381,158.5,365.5Q139,350,91,348Q43,346,45.5,309Q48,272,55,241Q62,210,49.5,170Q37,130,82.5,124.5Q128,119,146.5,93.5Q165,68,194.5,56Q224,44,256.5,44.5Q289,45,312,69.5Q335,94,353,116Q371,138,403.5,155.5Q436,173,412,206.5Q388,240,396,268Z"
          />
        </svg>
        <svg
          id="10015.io"
          viewBox="0 0 480 480"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="rgba(145, 142, 254, 1)"
            d="M400,283Q404,326,363,342.5Q322,359,295.5,418.5Q269,478,230,423Q191,368,131.5,378Q72,388,96,329Q120,270,90.5,233Q61,196,90.5,165Q120,134,148,103Q176,72,221,49Q266,26,291,78.5Q316,131,383.5,130Q451,129,423.5,184.5Q396,240,400,283Z"
          />
        </svg>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div
        className={
          "z-50 relative flex h-full gap-5 justify-center items-center"
        }
      >
        <div className="flex items-center justify-center">
          <div className={"flex items-center flex-col gap-10 justify-center"}>
            <Link
              href={"/"}
              className="hover:scale-110 duration-200 transition"
            >
              <div
                className={cn(
                  " items-center justify-center flex",
                  alternate.className
                )}
              >
                <Image
                  alt=""
                  width={100}
                  height={100}
                  src="../assets/images/logo-light.svg"
                />
                <h1 className="text-4xl hidden md:block -ms-2 font-extrabold tracking-tighter ">
                  ntool
                </h1>
              </div>
            </Link>
            {providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.name} style={{ marginBottom: 0 }}>
                  <Button
                    className="flex gap-5 button-85"
                    variant={"secondary"}
                    onClick={() => signIn(provider.id)}
                  >
                    <Image
                      alt="Google image"
                      height={24}
                      width={24}
                      src={`https://authjs.dev/img/providers/${provider.name?.toLowerCase()}.svg`}
                    />
                    Sign in with {provider.name}
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
    </div>
  );
};

export default Signin;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      providers,
      csrfToken,
    },
  };
};

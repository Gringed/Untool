import Image from "next/image";
import { redirect } from "next/navigation";

import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { plans } from "@/constants";

import Checkout from "@/components/shared/Checkout";
import { getAuthSession } from "@/lib/auth";
import { getUserById } from "@/lib/actions/users/user.actions";

const Credits = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/");
  }
  const user = await getUserById(session.user.id);

  return (
    <>
      <Header
        title="Buy Credits"
        subtitle="Choose a credit package that suits your needs!"
      />

      <section>
        <ul className="credits-list">
          {plans.map((plan) => (
            <li
              key={plan.name}
              className="credits-item flex flex-col justify-between even:-mt-5 even:shadow-2xl even:shadow-secondary relative"
            >
              <div className="flex-center flex-col gap-3 ">
                {plan.name === "Pro Package" && (
                  <div className="absolute top-0 shadow-md shadow-secondary rounded-full -mt-2">
                    <span className="inline-flex items-center -mt-2 rounded-full bg-secondary  px-5 py-1 text-xs font-bold text-white ring-1 ring-inset ring-gray-500/10">
                      Most popular
                    </span>
                  </div>
                )}
                <Image src={plan.icon} alt="check" width={50} height={50} />
                <p className="p-20-semibold mt-2 text-purple-500">
                  {plan.name}
                </p>
                <p className="h1-semibold text-secondary">${plan.price}</p>
                <p className=" font-bold text-primary">
                  {plan.credits} Credits
                </p>
              </div>

              {/* Inclusions */}
              <ul className="flex flex-col gap-5 py-9 ">
                {plan.inclusions.map((inclusion) => (
                  <li
                    key={plan.name + inclusion.label}
                    className="flex items-center gap-4"
                  >
                    <Image
                      src={`/assets/icons/${
                        inclusion.isIncluded ? "check.svg" : "cross.svg"
                      }`}
                      alt="check"
                      width={24}
                      height={24}
                    />
                    <p className="p-16-regular">{inclusion.label}</p>
                  </li>
                ))}
              </ul>

              {plan.name === "Free" ? (
                <Button variant="outline" disabled className="credits-btn">
                  Free Consumable
                </Button>
              ) : (
                <Checkout
                  plan={plan.name}
                  amount={plan.price}
                  credits={plan.credits}
                  buyerId={user._id}
                />
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Credits;

"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

import { useToast } from "@/components/ui/use-toast";

import { Button } from "../ui/button";
import { checkoutCredits } from "@/lib/actions/transformation/transformation.action";
import { aplanId } from "@/constants";
import { Plan } from "@prisma/client";

const Checkout = ({
  plan,
  amount,
  credits,
  buyerId,
  current,
}: {
  plan: Plan;
  amount: number;
  credits: number;
  buyerId: string;
  current: number;
}) => {
  const { toast } = useToast();

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }, []);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast({
        title: "Order placed!",
        description: "You will receive an email confirmation",
        duration: 5000,
        className: "success-toast",
      });
    }

    if (query.get("canceled")) {
      toast({
        title: "Order canceled!",
        description: "Continue to shop around and checkout when you're ready",
        duration: 5000,
        className: "error-toast",
      });
    }
  }, []);

  const onCheckout = async (e: any) => {
    e.preventDefault();
    const transaction = {
      plan,
      amount,
      credits,
      buyerId,
    };

    await checkoutCredits(transaction);
  };

  return (
    <form onSubmit={onCheckout}>
      <section>
        <Button
          type="submit"
          role="link"
          disabled={current === aplanId}
          className="w-full rounded-full "
        >
          {current === aplanId ? "You are admin" : "Grab it"}
        </Button>
      </section>
    </form>
  );
};

export default Checkout;

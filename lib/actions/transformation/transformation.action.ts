"use server";

import { redirect } from "next/navigation";
import Stripe from "stripe";
import { handleError } from "../../utils";
import prisma from "@/lib/prisma";

import { updateCredits } from "../users/user.actions";
import { Plan } from "@prisma/client";

export async function checkoutCredits(transaction: CheckoutTransactionParams) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
  });

  const amount = Number(transaction.amount) * 100;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "eur",
          unit_amount: amount,
          product_data: {
            name: transaction.plan,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      plan: transaction.plan,
      credits: transaction.credits,
      buyerId: transaction.buyerId,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/credits`,
  });

  redirect(session.url!);
}

export async function createTransaction(transaction: CreateTransactionParams) {
  const user = await prisma.user.findUnique({
    where: { id: transaction.buyerId },
    select: {
      firstName: true,
      lastName: true,
      username: true,
      photo: true,
      plan: true,
    },
  });
  try {
    if (user) {
      const newTransaction = await prisma.transaction.create({
        data: {
          ...transaction,
          buyerId: transaction.buyerId,
        },
      });
      await updateCredits(
        transaction.buyerId,
        transaction.credits,
        transaction.plan as Plan
      );
      console.log(newTransaction);
      return JSON.parse(JSON.stringify(newTransaction));
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    handleError(error);
  }
}

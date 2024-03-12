"use server";

import { redirect } from "next/navigation";
import Stripe from "stripe";
import { handleError } from "../../utils";
import prisma from "@/lib/prisma";

import { updateCredits } from "../users/user.actions";

export async function checkoutCredits(transaction: CheckoutTransactionParams) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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
          recurring: { interval: "month" },
        },
        quantity: 1,
      },
    ],
    metadata: {
      plan: transaction.plan,
      credits: transaction.credits,
      buyerId: transaction.buyerId,
    },
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/credits`,
  });

  redirect(session.url!);
}

export async function createTransaction(transaction: CreateTransactionParams) {
  try {
    // Create a new transaction with a buyerId
    const newTransaction = await prisma.transaction.create({
      data: {
        ...transaction,
        buyerId: transaction.buyerId,
      },
    });

    await updateCredits(transaction.buyerId, transaction.credits);

    return JSON.parse(JSON.stringify(newTransaction));
  } catch (error) {
    handleError(error);
  }
}

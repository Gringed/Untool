"use server";

import { revalidatePath } from "next/cache";

import { handleError } from "../../utils";
import prisma from "@/lib/prisma";
import { Plan } from "@prisma/client";
// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    const newUser = await prisma.user.create({ data: user });

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteUser(userId: string) {
  try {
    // Find user to delete
    const userToDelete = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await prisma.user.delete({
      where: { id: userToDelete.id },
    });
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

// USE CREDITS
export async function updateCredits(
  userId: string,
  creditFee: number,
  plan?: Plan
) {
  try {
    const findUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (findUser) {
      const updatedUserCredits = await prisma.user.update({
        where: { id: userId },
        data: {
          creditBalance: { increment: creditFee },
          plan: plan,
        },
        select: { id: true, creditBalance: true, plan: true },
      });

      if (!updatedUserCredits) throw new Error("User credits update failed");

      return JSON.parse(JSON.stringify(updatedUserCredits));
    }
  } catch (error) {
    handleError(error);
  }
}

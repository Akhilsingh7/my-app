"use server";

import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const onBoardUser = async () => {
  console.log("sdfs");
  try {
    const user = await currentUser();

    if (!user) {
      return {
        success: false,
        error: "No authenticated user found",
      };
    }

    const { id, firstName, lastName, imageUrl } = user;

    const email =
      user.primaryEmailAddress?.emailAddress ||
      user.emailAddresses?.[0]?.emailAddress ||
      "";

    const newUser = await db.user.upsert({
      where: {
        clerkId: id,
      },
      update: {
        name:
          firstName && lastName
            ? `${firstName} ${lastName}`
            : firstName || lastName || null,
        image: imageUrl || null,
        email,
      },
      create: {
        clerkId: id,
        name:
          firstName && lastName
            ? `${firstName} ${lastName}`
            : firstName || lastName || null,
        image: imageUrl || null,
        email,
      },
    });

    console.log("new user is ", newUser);

    return {
      success: true,
      user: newUser,
    };
  } catch (error) {
    console.log("Error in onboarding user", error);
    return null;
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return null;
    }

    const dbUser = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        clerkId: true,
      },
    });

    return dbUser;
  } catch (error) {
    console.log("Error in getting current user", error);
    return null;
  }
};

import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "../db/db-service";

export const AuthCheck = async () => {
  const current_user = await currentUser();

  if (!current_user) {
    return redirect("/sign-in");
  }

  const User = await db.user.findUnique({
    where: {
      clerkId: current_user.id,
    },
  });

  if (!User) {
    await db.user.create({
      data: {
        clerkId: current_user.id,
        email: current_user.emailAddresses[0].emailAddress,
        name: `${current_user.firstName} ${current_user.lastName}`,
        profile: current_user.imageUrl,
      },
    });
  }

  return { current_user };
};

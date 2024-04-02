import { db } from "@/lib/db/db-service";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { userId } = auth();
  console.log(userId)
  try {
    const findUser = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    return NextResponse.json(findUser, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};

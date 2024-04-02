import { db } from "@/lib/db/db-service";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const current_user = await currentUser();
  try {
    const { name, location, phone, email } = await req.json();

    const user = await db.user.findUnique({
      where: {
        clerkId: current_user.id,
      },
    });

    const create_org = await db.org.create({
      data: {
        email,
        location,
        phone,
        name,
        userId: user?.clerkId,
      },
    });

    return NextResponse.json(create_org, { status: 200 });
  } catch (error) {
    console.log("FAILED CREATE ORG!!!!");
  }
};

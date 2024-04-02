import { db } from "@/lib/db/db-service";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const current_user = await currentUser();
  try {
    const { name } = await req.json();

    const user = await db.user.findUnique({
      where: {
        clerkId: current_user.id,
      },
    });

    const create_dept = await db.dept.create({
      data: {
        name,
        userId: user?.clerkId,
      },
    });

    return NextResponse.json(create_dept, { status: 200 });
  } catch (error) {
    console.log("FAILED CREATE DEPT!!!!");
  }
};

export const DELETE = async (req) => {
  try {
    const id = new URL(req.url).searchParams.get("id");

    await db.dept.delete({
      where: {
        id,
      },
    });

    return NextResponse.json("Deleted", { status: 200 });
  } catch (error) {
    console.log("FAILED DELETING DEPT");
  }
};



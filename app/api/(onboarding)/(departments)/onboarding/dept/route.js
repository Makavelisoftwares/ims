import { db } from "@/lib/db/db-service";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const dynamic='force-dynamic'


export const GET = async (req) => {
  const { id } = await currentUser();

  try {
    const depts = await db.dept.findMany({
      where: {
        userId: id,
      },
      select:{
        name:true,
        id:true
      }
    });

    return NextResponse.json(depts, { status: 200 });
  } catch (error) {
    console.log(error.message);
  }
};

import { db } from "@/lib/db/db-service";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req) => {
  try {
    const id = new URL(req.url).searchParams.get("id");

    const onboard = await db.onBoarding.findMany({
      where: {
        id,
      },
      include: {
        org: {
          select: {
            name: true,
            phone: true,
            email: true,
          },
        },
        dept: {
          select: {
            name: true,
          },
        },
        schoolspv: true,
        industrial: true,
        intern:true
      },
    });

    return NextResponse.json(onboard, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};

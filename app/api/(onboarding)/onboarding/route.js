import { db } from "@/lib/db/db-service";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { id } = await currentUser();
    const { school, intern, name, department, orgId } = await req.json();

    const onboard = await db.onBoarding.create({
      data: {
        deptId: department,
        insustrialId: id,
        schoolspvId: school,
        internId: intern,
        name,
        orgId,
      },
    });

    return NextResponse.json(onboard, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};

export const GET = async (req) => {
  try {
    const orgId = new URL(req.url).searchParams.get("orgId");

    const onboard = await db.onBoarding.findMany({
      where: {
        orgId,
      },
      select: {
        name: true,
        id: true,
        createdAt:true
      },
    });

    return NextResponse.json(onboard, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};

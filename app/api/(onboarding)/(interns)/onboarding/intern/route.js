import { db } from "@/lib/db/db-service";
import { NextResponse } from "next/server";

export const dynamic='force-dynamic'


export const GET = async (req) => {
  const orgId = new URL(req.url)?.searchParams?.get("orgId");

  try {

    const interns = await db.intern.findMany({
      where: {
        orglId: orgId,
      },
      select:{
        id:true,
        firstname:true,
        lastname:true,
        email:true
      }
    });


    return NextResponse.json(interns, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};

import { db } from "@/lib/db/db-service";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { id } = await currentUser();
    const {
      phone,
      email,
      firstname,
      lastname,
      institution,
      end,
      start,
      year,
      department,
      senderId,
      orgId,
    } = await req.json();

    await db.schoolspv.create({
      data: {
        end,
        start,
        year,
        department,
        email,
        firstname,
        institution,
        lastname,
        phone,
        orglId: orgId,
        userClerkId: id,
        industrialId: senderId,
      },
    });
    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.log(error);
  }
};

export const PUT = async (req) => {
  try {
    const { id } = await req.json();

    await db.schoolspv.update({
      data: {
        approved: true,
      },
      where: {
        id: id,
      },
    });

    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.log(error);
  }
};

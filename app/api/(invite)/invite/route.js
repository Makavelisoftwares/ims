import { db } from "@/lib/db/db-service";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { id } = await currentUser();
    const {
      cv,
      phone,
      email,
      firstname,
      lastname,
      institution,
      end,
      start,
      year,
      course,
      feedback,
      senderId,
      orgId,
    } = await req.json();

    await db.intern.create({
      data: {
        end,
        start,
        year,
        course,
        cv,
        email,
        feedback,
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

    await db.intern.update({
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

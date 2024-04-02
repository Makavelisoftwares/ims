import { db } from "@/lib/db/db-service";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { files, id } = await req.json();

    const submittedwork = await db.assignments.create({
      data: {
        file: files,
        onboardId: id,
      },
    });

    return NextResponse.json(submittedwork, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};

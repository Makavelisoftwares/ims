import { db } from "@/lib/db/db-service";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { deadline, body, files, type, orgId, onBoardId, subject } =
      await req.json();

    const notification = await db.announcements.create({
      data: {
        body,
        deadline,
        file: files,
        onboardingId: onBoardId,
        orgId,
        type,
        subject,
      },
    });

    return NextResponse.json(notification, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};

export const GET = async (req) => {
  try {
    const id = new URL(req.url).searchParams.get("onboard");

    const notifications = await db.announcements.findMany({
      where: {
        onboardingId: id,
      },
    });

    return NextResponse.json(notifications, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};

export const PUT = async (req) => {
  try {
    const { id } = await req.json();

    await db.announcements.update({
      where: {
        id,
      },
      data: {
        read: true,
      },
    });

    return NextResponse.json(true, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};

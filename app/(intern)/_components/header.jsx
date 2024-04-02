import { Logo } from "@/app/(dashboard)/_components/logo";
import { UserBtn } from "@/components/user-button";
import { db } from "@/lib/db/db-service";
import { Bell } from "lucide-react";
import Link from "next/link";

export const HeaderIntern = async ({ id }) => {
  const notifications = await db.announcements.findMany({
    where: {
      onboardingId: id,
    },
  });

  const filter_unread_notification = notifications.filter((item) => !item?.read);


  return (
    <div className="flex items-center justify-between mx-4 p-3 border-b border-zinc-200/40">
      <div>
        <Logo />
      </div>

      <div className=" flex items-center space-x-4">
        <Link className="relative" href={`/intern/${id}/notifications`}>
          <Bell />
          {filter_unread_notification.length > 0 && (
            <div className="h-[10px] w-[10px] absolute bg-red-600 rounded-full right-0 top-1" />
          )}
        </Link>

        <div>
          <UserBtn />
        </div>
      </div>
    </div>
  );
};

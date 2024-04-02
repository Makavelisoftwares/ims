"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const OnBoardHeader = ({ onboardId, orgId }) => {
  const path = usePathname();

  return (
    <div className="flex items-center p-2 border-b border-zinc-300/30 space-x-5">
      <Button size="sm" variant="link" asChild>
        <Link href={`/org/${orgId}/${onboardId}`}>
          <Home />
        </Link>
      </Button>

      <Button
        className={cn("", path.includes("notification") && "text-[#b23700]")}
        size="sm"
        variant="link"
        asChild
      >
        <Link href={`/org/${orgId}/${onboardId}/notification`}>
          Notification
        </Link>
      </Button>

      <Button
        className={cn("", path.includes("recieved") && "text-[#b23700]")}
        size="sm"
        variant="link"
        asChild
      >
        <Link href={`/org/${orgId}/${onboardId}/recieved`}>
          Submitted Assignments
        </Link>
      </Button>
    </div>
  );
};

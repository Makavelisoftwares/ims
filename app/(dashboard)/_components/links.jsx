"use client";

import { cn } from "@/lib/utils";
import {
  Building,
  Building2,
  UserPlus2Icon,
  UserSquare,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Links = () => {
  const path = usePathname();

  const adminLinks = [
    {
      name: "organizations",
      href: "/",
      icon: <Building />,
    },
    {
      name: "departments",
      href: "/dept",
      icon: <Building2 />,
    },
    {
      name: "interns",
      href: "/intern",
      icon: <Users2 />,
    },

    {
      name: "school supervisors",
      href: "/school",
      icon: <UserSquare />,
    },
  ];

  return (
    <div>
      {adminLinks.map((item) => (
        <div
          key={item.name}
          className={cn(
            "mx-3 my-2 hover:bg-[#b23700] hover:text-white p-2 rounded-sm",
            path == item.href && "bg-[#b23700]/20 text-[#b23700]"
          )}
        >
          <Link className="flex items-center space-x-2" href={item.href}>
            <div>{item.icon}</div>
            <span>{item.name}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

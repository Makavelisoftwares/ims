"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRightCircleIcon,
  Building,
  CheckCheck,
  Copy,
  Mail,
  Phone,
  Pin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const OrgCards = ({ orgs }) => {
  const [isMounted, setisMounted] = useState(false);

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);
    toast.success(`${id} copied`);
  };

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  return (
    <>
      {orgs.map((org, i) => (
        <Card key={i} className="col-span-1 h-[45vh] w-full mx-3">
          <CardContent>
            <div className="relative h-[20vh] w-full p-2 rounded-md border border-zinc-300/40 mt-2">
              <Image
                src={"/illustrationtwo.png"}
                fill
                alt="org"
                className="object-cover"
              />
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Building className="h-[20px] w-[20px] text-[#b23700]" />
              <span className="text-lg font-bold text-zinc-600 truncate">
                {org?.name}
              </span>
            </div>
            <div className="text-zinc-500 flex space-x-1 items-center text-sm truncate">
              <Mail className="text-zinc-400 h-[13px] w-[13px]" />
              <span>{org?.email}</span>
            </div>
            <div className="text-zinc-500 flex space-x-1 items-center text-sm truncate">
              <Phone className="text-zinc-400 h-[13px] w-[13px]" />
              <span>{org?.phone}</span>
            </div>
            <div className="text-zinc-500 flex space-x-1 items-center text-sm truncate">
              <Pin className="text-zinc-400 h-[13px] w-[13px]" />
              <span>{org?.location}</span>
            </div>

            <div className="flex items-center justify-end mt-2">
              <div className="flex items-center space-x-3">
                <Copy
                  className="cursor-pointer text-zinc-500 "
                  onClick={() => handleCopy(org?.id)}
                />
                <Link href={`/org/${org?.id}`}>
                  <ArrowRightCircleIcon className="text-sky-400" />
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

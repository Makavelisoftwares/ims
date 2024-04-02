"use client";
import { Button } from "@/components/ui/button";
import { useOrigin } from "@/hooks/use-origin";
import Link from "next/link";

export const WelcomContent = ({ senderId, orgId }) => {
  const origin = useOrigin();
  return (
    <div className="w-[900px] m-auto flex flex-col items-center justify-center">
      <div className="text-6xl font-bold text-center text-sky-500">
        Welcome To Internship Program.
      </div>
      <div className="text-sm mt-3 text-center font-semibold">
        Seeing this means You are among the selected few who are elagable for an
        internship program.
      </div>

      <div className="mt-3">
        <Button asChild>
          <Link href={`${origin}/share/intern/${orgId}/${senderId}/form`}>
            Accept Invite
          </Link>
        </Button>
      </div>
    </div>
  );
};

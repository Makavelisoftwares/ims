import { AuthCheck } from "@/lib/auth/auth-check";
import React from "react";
import { SideBar } from "./_components/side-bar";

async function DahboardLayout({ children }) {
await AuthCheck();

  return (
    <div className="flex">
      <div className="w-[240px] bg-[#f4f4f4]  text-sm h-full fixed border-r border-zinc-200/70">
        <SideBar/>
      </div>
      <div className="pl-[240px] w-full">{children}</div>
    </div>
  );
}

export default DahboardLayout;

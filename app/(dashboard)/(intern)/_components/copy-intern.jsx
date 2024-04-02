"use client";

import { useOrigin } from "@/hooks/use-origin";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export const CopyIntern = ({ id,role }) => {
  const origin = useOrigin();

  const handleCopy = () => {
    setTimeout(() => {
      navigator.clipboard.writeText(`${origin}/${role}/${id}`);
      toast.success(
        `${origin}/${role}/${id} copied! You can now share the link to the approved intern`
      );
    }, 1000);
  };

  return (
    <div>
      <div onClick={handleCopy}>
        <Copy className="cursor-pointer" />
      </div>
    </div>
  );
};

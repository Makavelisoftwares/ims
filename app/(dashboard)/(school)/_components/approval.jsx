"use client";

import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const Approval = ({ isApproved, id }) => {
  const { refresh } = useRouter();
  const handleApprove = async () => {
    try {
      await axios.put("/api/schoolinvite", {
        id,
      });

      toast.success("approved");
      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isApproved ? (
        <div>
          <BadgeCheck className="text-sky-500" />
        </div>
      ) : (
        <Badge
          onClick={handleApprove}
          className="bg-rose-500 cursor-pointer hover:bg-rose-600"
        >
          Approve
        </Badge>
      )}
    </div>
  );
};

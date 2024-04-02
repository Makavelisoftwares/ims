"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";

export const ReadBtn = ({ id }) => {
  const handleMark = async () => {
    try {
      await axios.put(`/api/notification`, { id });
      toast.success("marked read");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button onClick={handleMark} className={cn("")} size="sm">
      mark read
    </Button>
  );
};

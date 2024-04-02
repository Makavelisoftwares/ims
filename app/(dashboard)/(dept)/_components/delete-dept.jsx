"use client";

import { Loader2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const DeleteDept = ({ id }) => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const { refresh } = useRouter();

  const handleDelete = async () => {
    try {
      setisSubmitting(true);
      const res = await axios.delete(`/api/dept?id=${id}`);
      console.log(res.status);

      toast.success("deleted");
      refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setisSubmitting(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div>
          <Trash2 className="text-rose-600" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            department and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isSubmitting}
            className="bg-rose-600 text-white hover:bg-rose-600"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-1">
                <Loader2 />
                <span>deleting...</span>
              </div>
            ) : (
              <div onClick={handleDelete}>Continue</div>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

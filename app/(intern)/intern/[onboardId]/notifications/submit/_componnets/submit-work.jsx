"use client";

import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/lib/uploadthing";
import axios from "axios";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const SubmitWork = ({ id }) => {
  const [files, setfiles] = useState("");
  const { back } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("/api/submit-assignment", {
        id,
        files,
      });
      console.log(resp.data);
      toast.success("submitted");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="p-6">
        <Button asChild variant="ghost">
          <Link className="flex items-center space-x-2" href={`/intern/${id}/notifications`}>
            <ArrowLeftCircle/>
            <div>Back</div>
          </Link>
        </Button>
      </div>
      <form className="w-[300px] m-auto flex-col flex">
        {files ? (
          <Link className="p-2 hover:underline" href={files} target="_blank">
            {files}
          </Link>
        ) : (
          <div className="w-full ">
            <UploadDropzone
              endpoint="assignment"
              onClientUploadComplete={(res) => {
                setfiles(res[0].url);
                console.log(res);
                alert("Upload Completed");
              }}
              onUploadError={(error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
        )}

        <Button onClick={handleSubmit} type="submit">
          Submit Assignment
        </Button>
      </form>
    </>
  );
};

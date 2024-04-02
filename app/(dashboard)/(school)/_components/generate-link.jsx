"use client";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOrigin } from "@/hooks/use-origin";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Copy, Link, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const GenereateSchoolLink = () => {
  const { userId } = useAuth();

  const [isMounted, setisMounted] = useState(false);
  const [orgnizationId, setorgnizationId] = useState("");

  const [newOrganizationId, setnewOrganizationId] = useState("");
  const [setShow, setsetShow] = useState(false);
  const [isOpen, setisOpen] = useState(false);

  const origin = useOrigin();

  const handleGenerate = () => {
    setnewOrganizationId(`${origin}/share/school/${orgnizationId}/${userId}`);
    setsetShow(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(newOrganizationId);
    toast.success(`${newOrganizationId} copied to clipboard`);
    setisOpen(false);
  };

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setisOpen}>
      <AlertDialogTrigger>
        <Button
          className="flex items-center space-x-1"
          variant="link"
          size="sm"
        >
          <Link />
          <span>Copy and Share School supervisor Link</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Share school supervisor link.</AlertDialogTitle>
          <AlertDialogDescription>
            Visit your organisation page . Copy and paste any of your
            organization's id on the field below.Copy and share the generated
            link to your prefered school supervisor.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div>
          <Label>Paste Organization Id</Label>
          <div className="flex items-center space-x-3">
            <Input
              value={orgnizationId}
              onChange={(e) => setorgnizationId(e.target.value)}
            />
            <div>
              <RefreshCw
                onClick={handleGenerate}
                className={cn(
                  "cursor-pointer",
                  orgnizationId.length < 1 && "hidden"
                )}
              />
            </div>
          </div>
        </div>

        <div className={cn("", !setShow && "hidden")}>
          <Label>Generated Link</Label>
          <div className="flex items-center space-x-3">
            <Input
              disabled
              readOnly
              value={newOrganizationId}
              onChange={(e) => setnewOrganizationId(e.target.value)}
            />
            <div>
              <Copy
                onClick={handleCopy}
                className={cn(
                  "cursor-pointer",
                  orgnizationId.length < 1 && "hidden"
                )}
              />
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

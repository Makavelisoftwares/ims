"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { toast } from "sonner";
import axios from "axios";
import { NotificationTable } from "./notification-table";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  subject: z.string(),
  body: z.string(),
  deadline: z.date(),
  type: z.string({
    required_error: "Please select notification type to display.",
  }),
});

export const Notify = ({ onBoardId, orgId }) => {
  const [isMounted, setisMounted] = useState(false);
  const [files, setfiles] = useState("");
  const { refresh } = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values) {
    console.log(values);
    try {
      const resp = await axios.post("/api/notification", {
        deadline: values.deadline,
        body: values.body,
        files,
        orgId,
        onBoardId,
        subject: values.subject,
        type:values.type
      });

      refresh();
      toast.success("Announcement sent");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Announcement and assignment</CardTitle>
      </CardHeader>

      <CardContent>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button
              size="sm"
              className="bg-[#b23700] hover:bg-[#b23700] text-slate-50"
            >
              Create Announcement
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertTitle>Announcements and Notifications </AlertTitle>
            </AlertDialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-1"
              >
                <ScrollArea className="w-full h-[50vh]">
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="body"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Body</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Body" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notification Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified notification type for the intern" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ANNOUNCEMENT">
                              ANNOUNCEMENT
                            </SelectItem>
                            <SelectItem value="ASSIGNMENT">
                              ASSIGNMENT
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {files ? (
                    <div className="p-2 text-sky-600 hover:underline relative bg-sky-100 rounded-md">
                      <Link href={files} target="_blank">
                        {files}
                      </Link>
                    </div>
                  ) : (
                    <UploadDropzone
                      endpoint="testfile"
                      onClientUploadComplete={(res) => {
                        setfiles(res[0].url);
                        console.log(res);
                        alert("Upload Completed");
                      }}
                      onUploadError={(error) => {
                        alert(`ERROR! ${error.message}`);
                      }}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Deadline</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              // initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </ScrollArea>

                <AlertDialogFooter>
                  <AlertDialogAction
                    type="submit"
                    className="bg-[#b23700] hover:bg-[#b23700] text-slate-50"
                  >
                    Send Announcement
                  </AlertDialogAction>

                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </form>
            </Form>
          </AlertDialogContent>
        </AlertDialog>

        <div className="mt-4">
          <NotificationTable onBoardId={onBoardId} />
        </div>
      </CardContent>
    </Card>
  );
};

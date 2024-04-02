"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2, X } from "lucide-react";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  phone: z.string(),
  institution: z.string(),
  feedback: z.string(),
  course: z.string(),
  year: z.string(),
  start: z.date({
    required_error: "A program start date is required.",
  }),
  end: z.date({
    required_error: "A program end date is required.",
  }),
});

export const InternForm = ({orgId,senderId}) => {
  const [pdffile, setpdffile] = useState("");
  const [isSubmitting, setisSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values) {
    try {
      setisSubmitting(true);

     await axios.post("/api/invite", {
        email: values.email,
        firstname: values.firstname,
        lastname: values.lastname,
        phone: values.phone,
        year: values.year,
        institution: values.institution,
        feedback: values.feedback,
        cv: pdffile,
        course: values.course,
        start: values.start,
        end: values.end,
        orgId,
        senderId
      });

      toast.success("form submitted, Wait for approval and onboarding");
    } catch (error) {
      console.log(error);
    } finally {
      setisSubmitting(false);
    }
  }

  const setClear = () => {
    setpdffile("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Internship Program Form</CardTitle>
        <CardDescription>
          Fill in the required fields before proceeding with the program.
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-1 mx-3 my-2"
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firstname</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1">
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lastname</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="0725424212" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Official Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@email.com" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="">
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Undertaking</FormLabel>
                  <FormControl>
                    <Input placeholder="Bsc. software Engineering" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="">
            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="">
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year of Study</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="">
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback</FormLabel>
                  <FormControl>
                    <Textarea placeholder="John" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-2">
            <FormField
              control={form.control}
              name="start"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Program Start Date</FormLabel>
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
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-2">
            <FormField
              control={form.control}
              name="end"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Program End Date</FormLabel>
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
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <Label>Upload CV</Label>
          </div>
          {pdffile ? (
            <div className="relative my-3 bg-sky-100 text-sky-700 hover:underline p-2 text-sm rounded-md">
              <Link href={pdffile} target="_blank">
                {pdffile}
              </Link>
              <div className="h-[30px] cursor-pointer bg-rose-500 flex items-center justify-center absolute w-[30px] -top-2 -right-1 rounded-full text-white">
                <X onClick={setClear} />
              </div>
            </div>
          ) : (
            <div>
              <UploadButton
                endpoint="pdffile"
                onClientUploadComplete={(res) => {
                  setpdffile(res[0].url);
                  alert("Upload Completed");
                }}
                onUploadError={(error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div>
          )}

          <div className="flex items-center my-3 justify-end">
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="animate-spin"/>
                  <span>submitting...</span>
                </div>
              ) : (
                <div>Submit</div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

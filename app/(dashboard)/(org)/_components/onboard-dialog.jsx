"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsUpDown, CheckIcon, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFetch } from "@/hooks/use-fetch";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";

const FormSchema = z.object({
  department: z.string(),
  intern: z.string(),
  name: z.string(),
  school: z.string(),
});

export const OnBoardDialog = ({ orgId }) => {
  const [isMounted, setisMounted] = useState(false);
  const { data: depts, error: deptError } = useFetch("/api/onboarding/dept");
  const { data: users, error: usersError } = useFetch(
    `/api/onboarding/intern?orgId=${orgId}`
  );
  const { data: school, error: schooError } = useFetch(
    `/api/onboarding/supervisor?orgId=${orgId}`
  );

  

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(values) {
    try {
      const res = await axios.post("/api/onboarding", {
        name: values.name,
        department: values.department,
        orgId,
        school: values.school,
        intern: values.intern,
      });

      console.log(res.data);
      toast.success("creation was successful");
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
    <AlertDialog>
      <AlertDialogTrigger>
        <Card className="border-dashed w-full h-[40vh] shadow-none flex items-center justify-center border-zinc-300/70 hover:border-zinc-500">
          <CardContent className="flex items-center justify-center">
            <Plus />
          </CardContent>
        </Card>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Start OnBoarding</AlertDialogTitle>
          <AlertDialogDescription>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum,
            nam!
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="onboarding 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="intern"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interns</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified intern to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {users?.map((intern, i) => (
                        <SelectItem key={i} value={intern?.id}>
                          {intern?.firstname} {intern?.lastname}- (
                          {intern?.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School supervisor</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified school supervisor to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {school?.map((sch, i) => (
                        <SelectItem key={i} value={sch?.id}>
                          {sch?.firstname} {sch?.lastname} - ({sch?.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {depts?.map((dep, i) => (
                        <SelectItem key={i} value={dep?.id}>
                          {dep?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction type="submit">Save</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

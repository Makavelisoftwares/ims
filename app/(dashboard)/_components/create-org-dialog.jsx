"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(4, {
    message: "Organization name must be at least 4 characters.",
  }),
  email: z.string().email(),
  location: z.string(),
  phone: z.string().min(10, {
    message: "Organization name must be at least 10 characters.",
  }),
});

export const CreateOrgDialog = ({ user }) => {
  const [isMounted, setisMounted] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { refresh } = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values) {
    try {
      setisSubmitting(true);
      const res = await axios.post("/api/org", {
        name: values.name,
        location: values.location,
        email: values.email,
        phone: values.phone,
      });
      setIsOpen(false);

      toast.success(`${res.data?.name} created`);
      console.log(res.data);

      refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setisSubmitting(false);
    }
  }

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button
          className="bg-[#b23700] hover:bg-[#b23700] my-1 flex items-center space-x-2 text-white"
          size="sm"
        >
          <Plus className="h-[15px] w-[15px] text-white" />
          <span className="truncate">Create organization</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Organisation</DialogTitle>
          <DialogDescription>
            Hola! <span className="text-[#b23700] font-bold">{user?.name}</span>{" "}
            create an organisation by providing details and start your
            onboarding.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization hotline</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                disabled={isSubmitting}
                type="submit"
                className="bg-[#b23700] hover:bg-[#b23700]"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="animate-spin" />
                    <span>creating...</span>
                  </div>
                ) : (
                  "Create"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

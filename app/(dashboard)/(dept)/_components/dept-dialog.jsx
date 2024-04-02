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
    message: "Department name must be at least 4 characters.",
  }),
});

export const CreateDeptDialog = () => {
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
      const res = await axios.post("/api/dept", {
        name: values.name,
      });
      setIsOpen(false);

      toast.success(`${res.data?.name} created`);
      refresh()

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
          <span className="truncate">Create Department</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Department</DialogTitle>
          <DialogDescription>
            Hola! create Department by providing details.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department name</FormLabel>
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

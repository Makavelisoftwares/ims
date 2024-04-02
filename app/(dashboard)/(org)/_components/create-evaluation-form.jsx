"use client";

import { Card, CardContent } from "@/components/ui/card";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectForm } from "./select-form";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useFetch } from "@/hooks/use-fetch";
import { PerformanceDashboard } from "./performance-dashboard";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
// import { useFetch } from "@/hooks/use-object-fetch";

const FormSchema = z.object({
  communication: z.string(),
  skills: z.string(),
  quality_of_work: z.string(),
  punctuality: z.string(),
  problem_solving: z.string(),
  comments: z.string(),
  attendance: z.string(),
});

export const EvaluationForm = ({ onBoardId }) => {
  const [isSubmitted, setisSubmitted] = useState(false);
  const {refresh}=useRouter()

  const [isMounted, setisMounted] = useState(false);

  const { data, error } = useFetch(`/api/report?id=${onBoardId}`);

  const communication = {
    select: [
      {
        title: "Excellent",
        value: "5",
      },
      {
        title: "Good",
        value: "4",
      },
      {
        title: "Avarage",
        value: "3",
      },
      {
        title: "Below Avarage",
        value: "2",
      },
      {
        title: "Poor",
        value: "1",
      },
    ],
    name: "communication",
  };

  const skills = {
    select: [
      {
        title: "Excellent",
        value: "5",
      },
      {
        title: "Good",
        value: "4",
      },
      {
        title: "Avarage",
        value: "3",
      },
      {
        title: "Below Avarage",
        value: "2",
      },
      {
        title: "Poor",
        value: "1",
      },
    ],
    name: "skills",
  };

  const quality = {
    select: [
      {
        title: "Excellent",
        value: "5",
      },
      {
        title: "Good",
        value: "4",
      },
      {
        title: "Avarage",
        value: "3",
      },
      {
        title: "Below Avarage",
        value: "2",
      },
      {
        title: "Poor",
        value: "1",
      },
    ],
    name: "quality_of_work",
  };

  const punctuality = {
    select: [
      {
        title: "Excellent",
        value: "5",
      },
      {
        title: "Good",
        value: "4",
      },
      {
        title: "Avarage",
        value: "3",
      },
      {
        title: "Below Avarage",
        value: "2",
      },
      {
        title: "Poor",
        value: "1",
      },
    ],
    name: "punctuality",
  };

  const attendance = {
    select: [
      {
        title: "Excellent",
        value: "5",
      },
      {
        title: "Good",
        value: "4",
      },
      {
        title: "Avarage",
        value: "3",
      },
      {
        title: "Below Avarage",
        value: "2",
      },
      {
        title: "Poor",
        value: "1",
      },
    ],
    name: "attendance",
  };

  const problemsolving = {
    select: [
      {
        title: "Excellent",
        value: "5",
      },
      {
        title: "Good",
        value: "4",
      },
      {
        title: "Avarage",
        value: "3",
      },
      {
        title: "Below Avarage",
        value: "2",
      },
      {
        title: "Poor",
        value: "1",
      },
    ],
    name: "problem_solving",
  };

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(values) {
    try {
      setisSubmitted(true);

      const resp = await axios.post("/api/report", {
        communication: values.communication,
        skills: values.skills,
        quality_of_work: values.quality_of_work,
        punctuality: values.communication,
        problem_solving: values.problem_solving,
        comments: values.comments,
        id: onBoardId,
        attendance: values.attendance,
      });

      refresh()
      console.log(resp.data);
      toast.success("changes successful");
    } catch (error) {
      console.log(error);
    } finally {
      setisSubmitted(false);
    }
  }

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Card className={cn("shadow-none",
     data?.length>0 && "shadow-none border-none"
    )}>
      <CardContent>
        {data?.length <
          1 &&(
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <div className="grid grid-cols-2 gap-2">
                  <SelectForm
                    form={form}
                    className="col-span-1"
                    item={communication}
                  />
                  <SelectForm
                    form={form}
                    className="col-span-1"
                    item={skills}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <SelectForm
                    form={form}
                    className="col-span-1"
                    item={quality}
                  />
                  <SelectForm
                    form={form}
                    className="col-span-1"
                    item={punctuality}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <SelectForm
                    form={form}
                    className="col-span-1"
                    item={attendance}
                  />
                  <SelectForm
                    form={form}
                    className="col-span-1"
                    item={problemsolving}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="comments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>comments</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter overall perforamnce comment"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  disabled={isSubmitted}
                  type="submit"
                  className="bg-[#b23700] hover:bg-[#b23700] text-white w-full"
                >
                  {isSubmitted ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </form>
            </Form>
          )}

        {data.length > 0 && (
          <div>
            <PerformanceDashboard data={data}/>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

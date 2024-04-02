import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db/db-service";
import { Clock, Clock11, File } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { ReadBtn } from "./read-btn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Notify = async ({ id }) => {
  const notifications = await db.announcements.findMany({
    where: {
      onboardingId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Intern Announcement and Assignments</CardTitle>
        <CardDescription>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error,
          tempore.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {notifications?.map((item, i) => (
          <Card className="shadow-none mt-3" key={i}>
            <CardHeader>
              <CardTitle>{item?.subject}</CardTitle>
              <CardDescription className="flex items-center justify-between">
                <div>{item?.body}</div>

                <Badge
                  className={cn(
                    "bg-sky-500",
                    item?.type == "ASSIGNMENT" && "bg-emerald-300"
                  )}
                >
                  {item?.type}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                {item?.file && (
                  <div className="flex space-x-4">
                    <div>
                      <File className="text-sky-800 h-[80px] w-[80px]" />
                    </div>
                    <Link
                      target="_blank"
                      className="text-sky-400 p-2 rounded-md hover:underline bg-sky-100"
                      href={item?.file}
                    >
                      {item?.file}
                    </Link>
                  </div>
                )}

                <div className="flexx items-center space-x-4">
                  {item?.type == "ASSIGNMENT" && (
                    <div className="flex items-center mt-2 space-x-4">
                      <Clock11 className="text-zinc-300" />
                      <span>
                        Deadline {moment(item?.deadline).format("DD/MM/YYYY")}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center mt-2 space-x-4">
                    <Clock className="text-zinc-300" />
                    <span>
                      sent {moment(item?.createdAt).format("DD/MM/YYYY")}
                    </span>
                  </div>
                </div>
              </div>

              {!item?.read && (
                <div>
                  <ReadBtn id={item?.id} />
                </div>
              )}

              {item?.read && (
                <div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="border border-zinc-200"
                    disabled={item?.read}
                  >
                    Read
                  </Button>
                </div>
              )}
            </CardContent>
            {item?.type == "ASSIGNMENT" && (
              <CardFooter>
                <Link
                  className="text-sky-400 underline"
                  href={`/intern/${id}/notifications/submit`}
                >
                  submit assignment
                </Link>
              </CardFooter>
            )}
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

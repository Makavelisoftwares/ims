"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetch } from "@/hooks/use-fetch";
import { ArrowRightCircle, Trash2 } from "lucide-react";
import moment from "moment";
import Link from "next/link";

export const FetchOnBoards = ({ orgId }) => {
  const { data: onBoards, error: onBoardsError } = useFetch(
    `/api/onboarding?orgId=${orgId}`
  );

  return (
    <>
      {onBoards?.map((item, i) => (
        <Card
          key={i}
          className="flex items-center relative justify-between flex-col"
        >
          <div className="absolute right-0 left-0 top-0 bottom-0 bg-[#b23700]/30">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="truncate">{item?.name}</div>

                <div>
                  <Trash2 className="text-rose-600" />
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="h-[15vh] w-full" />
            <CardFooter>
              <div className="flex items-center justify-between text-xs w-full">
                <div>
                  created on {moment(item?.createdAt).format("DD/MM/YYYY")}
                </div>

                <Link href={`/org/${orgId}/${item?.id}`}>
                  <ArrowRightCircle className="text-sky-500" />
                </Link>
              </div>
            </CardFooter>
          </div>
        </Card>
      ))}
    </>
  );
};

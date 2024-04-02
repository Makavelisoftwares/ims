"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/use-fetch";
import moment from "moment";
import Link from "next/link";

export const NotificationTable = ({ onBoardId }) => {
  const { data: notifications, error } = useFetch(
    `/api/notification?onboard=${onBoardId}`
  );

  return (
    <Table>
      <TableCaption>
        A list of your recent announcement/notifications.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SNo.</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="">Subject</TableHead>
          <TableHead className="">File</TableHead>
          <TableHead className="">Deadline</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notifications?.map((item, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{i + 1}</TableCell>
            <TableCell>
              {item?.read ? (
                <Badge className="bg-emerald-500 text-xs hover:bg-emerald-500 text-white">
                  read
                </Badge>
              ) : (
                <Badge className="bg-rose-400 text-xs hover:bg-rose-400 text-white">
                  unread
                </Badge>
              )}
            </TableCell>
            <TableCell>{item?.subject}</TableCell>
            <TableCell>
              <Link
                href={item?.file}
                className="bg-sky-100 truncate text-sky-500 hover:underline p-2 rounded-md"
                target="_blank"
              >
                {item?.file}
              </Link>
            </TableCell>
            <TableCell>{moment(item?.deadline).format("DD/MM/YYYY")}</TableCell>
            <TableCell>
              sent {moment(item?.createdAt).format("DD/MM/YYYY")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

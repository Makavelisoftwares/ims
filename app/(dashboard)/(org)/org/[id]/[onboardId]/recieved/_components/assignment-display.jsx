import { db } from "@/lib/db/db-service";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import moment from "moment";

export const AssignmentDisplay = async ({ id }) => {
  const assignments = await db.assignments.findMany({
    where: {
      onboardId: id,
    },
  });

  return (
    <Table>
      <TableCaption>A list of your recent assignments.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SNo.</TableHead>
          <TableHead>Link</TableHead>
          <TableHead>submitted on</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assignments?.map((item, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{i + 1}</TableCell>
            <TableCell>
              <Link target="_blank" href={item?.file} className="hover:underline">
                {item?.file}
              </Link>
            </TableCell>
            <TableCell>{moment(item?.createdAt).fromNow()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

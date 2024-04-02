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
import { db } from "@/lib/db/db-service";
import { currentUser } from "@clerk/nextjs";
import moment from "moment";
import { Approval } from "./approval";
import { CopyIntern } from "../../(intern)/_components/copy-intern";

export const InternTable = async () => {
  const { id } = await currentUser();
  const user = await db.user.findUnique({
    where: {
      clerkId: id,
    },
  });

  const interns = await db.schoolspv.findMany({
    where: {
      industrialId: user?.clerkId,
    },
    include: {
      org: {
        include: {
          OnBoarding: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  return (
    <Table>
      <TableCaption>A list of your recent school supervisors.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SNo.</TableHead>
          <TableHead>Supervisor Name</TableHead>
          <TableHead>email</TableHead>
          <TableHead>Phone Number</TableHead>

          <TableHead>Institution</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>years of experience</TableHead>
          {/* <TableHead>cv</TableHead> */}
          <TableHead>organization</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Submitted On</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {interns?.map((item, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{i + 1}</TableCell>
            <TableCell>
              {item?.firstname} {item?.lastname}
            </TableCell>
            <TableCell>{item?.email}</TableCell>
            <TableCell>{item?.phone}</TableCell>
            <TableCell>{item?.institution}</TableCell>

            <TableCell className="">{item?.department}</TableCell>
            <TableCell className="">{item?.year}</TableCell>

            <TableCell className="">{item?.org?.name}</TableCell>

            <TableCell className="">
              {moment(item?.start).format("DD/MM/YYYY")}
            </TableCell>
            <TableCell className="">
              {moment(item?.end).format("DD/MM/YYYY")}
            </TableCell>
            <TableCell className="">
              {moment(item?.createdAt).format("DD/MM/YYYY")}
            </TableCell>

            <TableCell className="">
              <Approval id={item?.id} isApproved={item?.approved} />
            </TableCell>

            <TableCell className="">
              {item?.org?.OnBoarding?.map((it, i) => (
                <div key={i}>
                  {item?.approved && (
                    <div>
                      <CopyIntern role={"school"} id={it?.id} />
                    </div>
                  )}
                </div>
              ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

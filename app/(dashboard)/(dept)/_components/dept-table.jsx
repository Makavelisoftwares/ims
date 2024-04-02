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
import { DeleteDept } from "./delete-dept";

export const DeptTable = async () => {
  const current_user = await currentUser();

  const user = await db.user.findUnique({
    where: {
      clerkId: current_user.id,
    },
  });

  const depts = await db.dept.findMany({
    where: {
      userId: user?.id,
    },
  });

  return (
    <Table>
      <TableCaption>A list of your recent departments.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SNo.</TableHead>
          <TableHead>Department Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {depts?.map((item, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{i + 1}</TableCell>
            <TableCell>{item?.name}</TableCell>
            <TableCell>
              <div>
                <DeleteDept id={item?.id}/>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

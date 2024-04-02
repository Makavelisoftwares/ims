import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db/db-service";
import { Building } from "lucide-react";

export const HeaderCard = async ({ id }) => {
  const org = await db.org.findUnique({
    where: {
      id,
    },
  });
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="uppercase flex items-center space-x-3">
          <Building className="text-[#b23700] font-bold h-[50px] w-[50px]" />
          <span>{org?.name}</span>
        </CardTitle>
        <CardDescription>
          Start your onBording by clicking the card
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

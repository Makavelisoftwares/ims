import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db/db-service";
import { currentUser } from "@clerk/nextjs";
import { Building, Building2 } from "lucide-react";
import { OrgCards } from "./org-cards";
import { CreateOrgDialog } from "./create-org-dialog";

export const OrgSuperVisor = async () => {
  const { id } = await currentUser();
  const user = await db.user.findUnique({
    where: {
      clerkId: id,
    },
  });
  const orgs = await db.org.findMany({
    where: {
      userId: user?.clerkId,
    },
  });

  return (
    <div>
      <div>
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle className='flex items-center space-x-3'>
              <Building className="text-[#b23700]"/>
              <span>Organizations</span>
            </CardTitle>
            <CardDescription>
              This window displays your total organisations and the number of
              onboardings
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="flex items-center justify-end my-3 mx-3">
        <CreateOrgDialog/>
      </div>

      {orgs.length < 1 ? (
        <div className="h-[70vh] flex items-center justify-center">
          <div className="w-[500px] flex items-center justify-center flex-col text-center text-sm">
            <div>
              <Building className="h-[100px] w-[100px] text-[#b23700]/80" />
            </div>

            <div className="font-bold mt-4 text-zinc-800/70">
              You currently have no organisation for onboarding. Start by
              clicking the{" "}
              <span className="text-[#b23700]">Create organization</span> button
              to create one.
            </div>
          </div>
        </div>
      ) : (
        <div className="grid mx-3 grid-cols-3 gap-3">
          <OrgCards orgs={orgs}/>
        </div>
      )}
    </div>
  );
};

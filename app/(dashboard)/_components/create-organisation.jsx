import { UserBtn } from "@/components/user-button";
import { db } from "@/lib/db/db-service";
import { currentUser } from "@clerk/nextjs";
import { CreateOrgDialog } from "./create-org-dialog";

export const CreateOrganisation = async () => {
  const { id } = await currentUser();
  const user = await db.user.findUnique({
    where: {
      clerkId: id,
    },
  });

  return (
    <div className="flex flex-col  justify-center border-t border-zinc-300/40">
      <div className="mt-1 flex ml-2">
        <CreateOrgDialog user={user}/>
      </div>

      <div className="flex space-x-2 mx-1 mt-2">
        <UserBtn />
        <div className="text-xs">
          <div className="truncate">{user?.name}</div>
          <div className="truncate">{user?.email}</div>
        </div>
      </div>
    </div>
  );
};

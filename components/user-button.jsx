import { UserButton } from "@clerk/nextjs";

export const UserBtn = () => {
  return (
    <div>
      <UserButton afterSignOutUrl="/"/>
    </div>
  );
};

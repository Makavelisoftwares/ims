import { InternForm } from "@/app/(share)/_components/create-intern-form";
import React from "react";

function AcceptInvitePage({ params }) {
  return (
    <div className="w-[80%] my-5 m-auto">
      <InternForm orgId={params.orgId} senderId={params.userId} />
    </div>
  );
}

export default AcceptInvitePage;

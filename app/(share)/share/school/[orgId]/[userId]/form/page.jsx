import React from "react";
import { SchoolspvForm } from "../../../_components/create-school-form";

function AcceptInvitePage({ params }) {
  return (
    <div className="w-[80%] my-5 m-auto">
      <SchoolspvForm orgId={params.orgId} senderId={params.userId} />
    </div>
  );
}

export default AcceptInvitePage;

import { WelcomContent } from "@/app/(share)/_components/welcome-content";
import { Welcome } from "@/app/(share)/_components/welcome-page";
import React from "react";

function InternInvitePage({ params }) {
  const orgId = params.orgId;
  const senderId = params.userId;

  return (
    <div>
      <div>
        <Welcome />
      </div>
      <div>
        <WelcomContent orgId={orgId} senderId={senderId} />
      </div>
    </div>
  );
}

export default InternInvitePage;

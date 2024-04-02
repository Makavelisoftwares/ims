import React from "react";
import { WelcomContent } from "../../_components/welcome-content";
import { Welcome } from "../../_components/welcome-page";

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

import { Notify } from "@/app/(dashboard)/(org)/_components/notify";
import { OnBoardHeader } from "@/app/(dashboard)/(org)/_components/onboard-header";
import React from "react";

function NotificationPage({ params }) {
  const orgId = params.id;
  const onBoardId = params.onboardId;

  return (
    <div>
      <div>
        <OnBoardHeader onboardId={onBoardId} orgId={orgId} />
      </div>

      <div className="p-3">
        <Notify orgId={orgId} onBoardId={onBoardId}/>
      </div>
    </div>
  );
}

export default NotificationPage;

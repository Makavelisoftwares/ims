import React from "react";
import { OnBoardHeader } from "../../../_components/onboard-header";
import { PerformanceBoard } from "../../../_components/performance-board";

function OnboardPage({ params }) {
  const orgId = params.id;
  const onBoardId = params.onboardId;
  return (
    <div>
      <div>
        <OnBoardHeader onboardId={onBoardId} orgId={orgId} />
      </div>

      <div className="m-3">
        <PerformanceBoard onboardId={onBoardId}/>
      </div>
    </div>
  );
}

export default OnboardPage;

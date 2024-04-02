import React from "react";
import { SubmitWork } from "./_componnets/submit-work";

function SubmitAssignmentPage({params}) {
  return (
    <div>
      <SubmitWork id={params.onboardId} />
    </div>
  );
}

export default SubmitAssignmentPage;

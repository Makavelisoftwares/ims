import React from "react";
import { HeaderCard } from "../../_components/header-card";
import { OnBoardingCard } from "../../_components/onboarding-card";

function OrgPage({ params }) {
  return (
    <div className="p-2">
      <div>
        <HeaderCard id={params.id} />
      </div>

      <div>
        <OnBoardingCard orgId={params.id}/>
      </div>
    </div>
  );
}

export default OrgPage;

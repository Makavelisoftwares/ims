import React from "react";
import { HeaderIntern } from "../../_components/header";
import { ClientDahboard } from "../../_components/client-dashboard";
import { SpvSchool } from "../../_components/spv-school";

async function InternOnboardPage({ params }) {
  const id = params.onboardId;

  return (
    <div>
      <div>
        <HeaderIntern id={id} />
      </div>

      <div>
        <SpvSchool id={id}/>
      </div>

      <div>
        <ClientDahboard id={id} />
      </div>
    </div>
  );
}

export default InternOnboardPage;

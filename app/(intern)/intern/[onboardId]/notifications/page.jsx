import { HeaderIntern } from "@/app/(intern)/_components/header";
import { Notify } from "@/app/(intern)/_components/notify";
import React from "react";

function NotificationPage({ params }) {
  const id = params.onboardId;
  return (
    <div>
      <div>
        <HeaderIntern id={id}/>
      </div>

      <div>
        <Notify id={id}/>
      </div>
    </div>
  );
}

export default NotificationPage;

import React from "react";
import { SchoolHeader } from "../_components/intern-header";
import { GenereateSchoolLink } from "../_components/generate-link";
import { InternTable } from "../_components/intern-table";

function SchoolSuperVisorPage() {
  return (
    <div>
      <div>
        <SchoolHeader />
      </div>

      <div>
        <GenereateSchoolLink />
      </div>

      <div className="mx-3 my-5">
        <InternTable />
      </div>
    </div>
  );
}

export default SchoolSuperVisorPage;

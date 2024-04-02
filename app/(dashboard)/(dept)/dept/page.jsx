import React from "react";
import { DeptHeader } from "../_components/dept-header";
import { CreateDeptDialog } from "../_components/dept-dialog";
import { DeptTable } from "../_components/dept-table";

function DeptPage() {
  return (
    <div>
      <div>
        <DeptHeader />
      </div>

      <div className="flex items-center justify-end mx-3">
        <CreateDeptDialog />
      </div>

      <div className="mx-3">
        <DeptTable />
      </div>
    </div>
  );
}

export default DeptPage;

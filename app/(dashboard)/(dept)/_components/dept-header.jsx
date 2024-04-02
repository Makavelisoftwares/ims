import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

export const DeptHeader = () => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className='flex items-center space-x-3'>
          <Building2 className="text-[#b23700]"/>
          <span>Departments</span>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

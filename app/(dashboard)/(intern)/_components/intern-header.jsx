import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {  Users2 } from "lucide-react";

export const InternHeader = () => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className='flex items-center space-x-3'>
          <Users2 className="text-[#b23700]"/>
          <span>Interns</span>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

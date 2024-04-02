import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db/db-service";
import { Building, Calendar, CalendarCheck, User } from "lucide-react";
import moment from "moment";
import { EvaluationForm } from "./create-evaluation-form";

export const PerformanceBoard = async ({ onboardId }) => {
  const find_intern_using_orgId = await db.onBoarding.findUnique({
    where: {
      id: onboardId,
    },
    include: {
      dept: true,
      intern: true,
      industrial: true,
      schoolspv: true,
      org: true,
    },
  });


  return (
    <div>
      <Card className="shadow-none space-y-3 ">
        <CardHeader>
          <CardTitle>
            Evaluation Performance({find_intern_using_orgId?.intern?.firstname}{" "}
            {find_intern_using_orgId?.intern?.lastname} )
          </CardTitle>
          <CardDescription>
            <div className="flex mt-3 items-center space-x-2">
              <User className="h-[20px] w-[20px]" />
              <div>
                Industrial supervisor:{" "}
                {find_intern_using_orgId?.industrial?.name}
              </div>
            </div>

            <div className="flex mt-3 items-center space-x-2">
              <User className="h-[20px] w-[20px]" />
              <div>
                School supervisor:
                {find_intern_using_orgId?.schoolspv?.firstname}{" "}
                {find_intern_using_orgId?.schoolspv?.lastname}
              </div>
            </div>

            <div className="flex items-center mt-3 space-x-2">
              <Building className="h-[20px] w-[20px]" />

              <div>
                Department: {""}
                {find_intern_using_orgId?.dept?.name}
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center mt-3 space-x-2">
                <CalendarCheck className="h-[20px] w-[20px]" />

                <div>
                  Start Date: {""}
                  {moment(find_intern_using_orgId?.intern?.start).format('DD/MM/YYYY')}
                </div>
              </div>

              <div className="flex items-center mt-3 space-x-2">
                <Calendar className="h-[20px] w-[20px]" />

                <div>
                  End Date: {""}
                  {moment(find_intern_using_orgId?.intern?.end).format('DD/MM/YYYY')}
                </div>
              </div>
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-6">
            <EvaluationForm onBoardId={onboardId}/>
        </CardContent>
      </Card>
    </div>
  );
};

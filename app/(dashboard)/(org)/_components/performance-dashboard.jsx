"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as React from "react";

import { Progress } from "@/components/ui/progress";

export const PerformanceDashboard = ({ data, user }) => {
  const [skillsprogress, setskillsprogress] = React.useState(0);
  const [communicationprogress, setcommunicationProgress] = React.useState(0);
  const [punctualityprogress, setpunctualityProgress] = React.useState(0);
  const [attendanceprogress, setattendanceProgress] = React.useState(0);
  const [problem, setproblem] = React.useState(0);
  const [quality, setquality] = React.useState(0);
  const [overall, setoverall] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      for (let i of data) {
        setcommunicationProgress((parseInt(i?.communication) * 100) / 5);
        setpunctualityProgress((parseInt(i?.punctuality) * 100) / 5);
        setattendanceProgress((parseInt(i?.attendance) * 100) / 5);
        setskillsprogress((parseInt(i?.skills) * 100) / 5);
        setproblem((parseInt(i?.problem) * 100) / 5);
        setquality((parseInt(i?.quality) * 100) / 5);

        const overallvalues =
          parseInt(i?.communication) +
          parseInt(i?.punctuality) +
          parseInt(i?.attendance) +
          parseInt(i?.skills) +
          parseInt(i?.problem) +
          parseInt(i?.quality);

        const percentage = (overallvalues * 100) / 30;
        setoverall(percentage);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [data]);

  return (
    <>
      {user?.role !== "INTERN" && (
        <div>
          {data?.map((item, i) => (
            <div key={i}>
              <Card className="w-full my-2">
                <CardHeader>
                  <CardTitle>Avarage Performance Evaluation</CardTitle>
                  <CardDescription>
                    This is a score valuation on Average performance of the
                    intern that was assigned by the industrial based supervisor.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {overall.toFixed(2)}% score
                  <Progress value={overall} className="w-full" />
                </CardContent>
              </Card>

              <div className="shadow-none grid grid-cols-2 gap-3">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Communication</CardTitle>
                    <CardDescription>
                      This is a score valuation on communication skills of the
                      intern that was assigned by the industrial based
                      supervisor.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {(parseInt(item?.communication) * 100) / 5}% score
                    <Progress
                      value={communicationprogress}
                      className="w-full"
                    />
                  </CardContent>
                </Card>
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Punctuality</CardTitle>
                    <CardDescription>
                      This is a score valuation on Punctuality of the intern
                      that was assigned by the industrial based supervisor.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {(parseInt(item?.punctuality) * 100) / 5}% score
                    <Progress value={punctualityprogress} className="w-full" />
                  </CardContent>
                </Card>
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Work Attendance</CardTitle>
                    <CardDescription>
                      This is a score valuation on Attendance of the intern that
                      was assigned by the industrial based supervisor.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {(parseInt(item?.attendance) * 100) / 5}% score
                    <Progress value={attendanceprogress} className="w-full" />
                  </CardContent>
                </Card>
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Work Skills</CardTitle>
                    <CardDescription>
                      This is a score valuation on skills of the intern that was
                      assigned by the industrial based supervisor.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {(parseInt(item?.skills) * 100) / 5}% score
                    <Progress value={skillsprogress} className="w-full" />
                  </CardContent>
                </Card>
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Problem Solving</CardTitle>
                    <CardDescription>
                      This is a score valuation on Problem solving of the intern
                      that was assigned by the industrial based supervisor.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {(parseInt(item?.problem) * 100) / 5}% score
                    <Progress value={problem} className="w-full" />
                  </CardContent>
                </Card>

                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Quality of Work</CardTitle>
                    <CardDescription>
                      This is a score valuation on Quality of work of the intern
                      that was assigned by the industrial based supervisor.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {(parseInt(item?.quality) * 100) / 5}% score
                    <Progress value={quality} className="w-full" />
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-none mt-2">
                <CardHeader>
                  <CardTitle>Comments</CardTitle>
                </CardHeader>
                <CardContent>{item?.commments}</CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

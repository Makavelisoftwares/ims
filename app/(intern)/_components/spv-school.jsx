"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetch } from "@/hooks/use-fetch";
import {
  Building,
  Calendar,
  CalendarCheck,
  CircuitBoard,
  Mail,
  Phone,
  User,
} from "lucide-react";
import moment from "moment";

export const SpvSchool = ({ id }) => {
  const { data, error } = useFetch(`/api/onboarding/onboard?id=${id}`);

  return (
    <div>
      <div className="m-3">
        {data?.map((item, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>
                Evaluation Performance(
                {item?.intern?.firstname} {item?.intern?.lastname} )
              </CardTitle>
              <CardDescription>
                <div className="flex mt-3 items-center space-x-2">
                  <Building className="h-[20px] w-[20px]" />
                  <div>Organization Name: {item?.org?.name}</div>
                </div>
                <div className="flex mt-3 items-center space-x-2">
                  <Mail className="h-[20px] w-[20px]" />
                  <div>Organization Email: {item?.org?.email}</div>
                </div>
                <div className="flex mt-3 items-center space-x-2">
                  <Phone className="h-[20px] w-[20px]" />
                  <div>Organization Hotline: {item?.org?.phone}</div>
                </div>
               
                <div className="flex mt-3 items-center space-x-2">
                  <User className="h-[20px] w-[20px]" />
                  <div>Industrial supervisor: {item?.industrial?.name}</div>
                </div>

                <div className="flex mt-3 items-center space-x-2">
                  <User className="h-[20px] w-[20px]" />
                  <div>
                    School supervisor:
                    {item?.schoolspv?.firstname} {item?.schoolspv?.lastname}
                  </div>
                </div>

                <div className="flex items-center mt-3 space-x-2">
                  <Building className="h-[20px] w-[20px]" />

                  <div>
                    Department: {""}
                    {item?.dept?.name}
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex items-center mt-3 space-x-2">
                    <CalendarCheck className="h-[20px] w-[20px]" />

                    <div>
                      Start Date: {""}
                      {moment(item?.intern?.start).format("DD/MM/YYYY")}
                    </div>
                  </div>

                  <div className="flex items-center mt-3 space-x-2">
                    <Calendar className="h-[20px] w-[20px]" />

                    <div>
                      End Date: {""}
                      {moment(item?.intern?.end).format("DD/MM/YYYY")}
                    </div>
                  </div>
                </div>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

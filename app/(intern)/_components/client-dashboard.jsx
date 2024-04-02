"use client";

import { PerformanceDashboard } from "@/app/(dashboard)/(org)/_components/performance-dashboard";
import { useFetch } from "@/hooks/use-fetch";
import { cn } from "@/lib/utils";
import { Loader, Satellite } from "lucide-react";
import { useEffect, useState } from "react";

export const ClientDahboard = ({ id }) => {
  const [isMounted, setisMounted] = useState(false);
  const { data, error } = useFetch(`/api/report?id=${id}`);
  const { data: user, error: userError } = useFetch("/api/user");

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <div className="mx-3 my-3">
        {data?.length < 1 && (
          <div className="flex items-center justify-center h-screen">
            <div className="flex space-y-3 items-center  flex-col w-[450px]">
              <Loader className="h-[90px] text-[#b23700]/70 delay-75 animate-spin w-[90px]" />
              <div className="text-center">
                Be Patient as the Industrial supervisor is working on the
                internship performance evaluation. It'll be updated soon.
              </div>
            </div>
          </div>
        )}

        {data?.length > 0 && (
          <PerformanceDashboard
            user={user}
            data={data}
          />
        )}
      </div>
    </div>
  );
};

import { Card, CardContent } from "@/components/ui/card";
import { OnBoardDialog } from "./onboard-dialog";
import { FetchOnBoards } from "./fetch-onboards";

export const OnBoardingCard = ({ orgId }) => {
  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          <OnBoardDialog orgId={orgId} className="col-span-1" />

          <FetchOnBoards orgId={orgId} />
        </div>
      </CardContent>
    </Card>
  );
};

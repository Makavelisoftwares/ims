import { AuthCheck } from "@/lib/auth/auth-check";

import { WelcomHeader } from "./welcome-header";

export const Welcome = async () => {
  await AuthCheck();

  return (
    <div>
      <div className="p-3">
        <WelcomHeader />
      </div>
    </div>
  );
};

import React from "react";
import { Button } from "../Wrapped";

const APIDetails = () => {
  return (
    <div className="flex flex-col py-2 px-12 bg-white dark:bg-darkSecondary rounded-[10px] text-dark dark:text-darkText">
      <div className="py-4 border-b border-maroonGrey dark:border-darkBg font-medium dark:text-white">
        Spot Trading API
      </div>
      <div className="min-w-full flex items-center justify-between py-4">
        <div className="flex flex-col">
          <div className="dark:text-white text-dark">
            API keys used for spot & margin trading
          </div>{" "}
          <div className="text-sm text-grayLight dark:text-darkerText">
            Time of account inactivity before automatic sign-out.
          </div>
        </div>
        <div>
          <Button onClick={() => {}} label={"Create API Key"} />
        </div>
      </div>

      <div className="text-center py-4 text-sm text-grayLight dark:text-darkerText">
        No API keys connected to your account.
      </div>
    </div>
  );
};

export default APIDetails;

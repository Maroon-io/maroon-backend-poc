import React from "react";
import SignInCard from "./SignInCard";
import TwoFactorAuth from "./TwoFactorAuth";
import SessionManagement from "./SessionManagement";
import DeviceManagement from "./DeviceManagement";

const Security = () => {
  return (
    <div className="flex flex-col gap-4 pb-16">
      <SignInCard />
      <TwoFactorAuth />
      <SessionManagement />
      <DeviceManagement />
    </div>
  );
};

export default Security;

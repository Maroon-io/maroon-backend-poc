import React from "react";
import AccountDetailsCard from "./AccountDetailsCard";
import RegionalSettingsCard from "./RegionalSettingsCard";
import EmailSettingsCard from "./EmailSettingsCard";

const AccountDetails = () => {
  return (
    <div className="flex flex-col gap-4 pb-16">
      <AccountDetailsCard />
      <RegionalSettingsCard />
      <EmailSettingsCard />
    </div>
  );
};

export default AccountDetails;

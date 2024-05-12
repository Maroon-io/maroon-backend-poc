import React, { useState } from "react";
import { Layout } from "../../layouts";
import { BtnOutline } from "../../components/Wrapped";

import {
  API,
  AccountDetails,
  Security,
  WalletSettings,
} from "../../components/Settings";

const BUTTON_LINKS = ["Account", "Security", "Wallet", "API"];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Account");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <Layout>
      <div className="min-h-screen mx-[18rem] flex flex-col gap-4">
        <div className="flex gap-2">
          {BUTTON_LINKS.map((button, index) => (
            <BtnOutline
              onClick={handleTabChange}
              key={index}
              light
              borderless
              label={button}
              active={button === activeTab}
            />
          ))}
        </div>

        {activeTab === "Account" && <AccountDetails />}
        {activeTab === "Security" && <Security />}
        {activeTab === "Wallet" && <WalletSettings />}
        {activeTab === "API" && <API />}
      </div>
    </Layout>
  );
};

export default Settings;

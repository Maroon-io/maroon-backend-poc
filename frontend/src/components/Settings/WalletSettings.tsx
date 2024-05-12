import React, { useState } from "react";
import { BtnOutline, Button, DropDown, RadioButton } from "../Wrapped";

const BUTTON_LINKS = ["Social", "WebAuthn", "SMS", "EOA Wallet"];
const CURRENCIES = [{ label: "Social Recovery" }];

const WalletSettings = () => {
  const [activeTab, setActiveTab] = useState("Social");
  const [currency, setCurrency] = useState("Social Recovery");

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  const handleCurrencyChange = (cur: any) => {
    setCurrency(cur);
  };

  return (
    <div className="flex flex-col py-2 px-12 bg-white dark:bg-darkSecondary rounded-[10px] text-dark dark:text-darkText">
      <div className="py-4 border-b border-maroonGrey dark:border-darkBg">
        <div>Authorisation Method</div>
      </div>
      <table className="min-w-full">
        <tbody className="bg-white ">
          <tr className="bg-white dark:bg-darkSecondary">
            <td className="flex pt-4 whitespace-nowrap pb-2 pr-8 text-grayLight text-sm font-medium text-gray-900 dark:text-darkText">
              <div>Authorisation Method</div>
            </td>
            <td className="px-10 whitespace-nowrap pt-4 pb-2 text-sm text-gray-500 dark:text-white">
              <div className="flex items-center text-grayLight text-sm font-medium  dark:text-darkText">
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
              </div>
            </td>
            <td className="px-10 pt-4 pb-2 text-sm font-medium"></td>
          </tr>
          <tr className="bg-white dark:bg-darkSecondary">
            <td className="flex py-2  text-grayLight text-sm font-medium text-gray-900 dark:text-darkText">
              Recovery Method
            </td>
            <td className="px-10 whitespace-nowrap py-2 text-grayLight text-sm  dark:text-white">
              <div className="w-[10rem]">
                <DropDown
                  label={currency}
                  children={CURRENCIES}
                  onSelect={handleCurrencyChange}
                />
              </div>
            </td>
            <td className="px-12 py-2  text-sm font-medium"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WalletSettings;

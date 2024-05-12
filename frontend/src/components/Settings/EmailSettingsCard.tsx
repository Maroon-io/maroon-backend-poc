import React, { useState } from "react";
import { Button, DropDown, ToggleButton } from "../Wrapped";

const TIMEZONES = [
  { label: "[+00:00 UTC] UTC, Universal Time" },
  { label: "[+00:00 UTC] UTC, Universal Time" },
  { label: "[+00:00 UTC] UTC, Universal Time" },
  { label: "[+00:00 UTC] UTC, Universal Time" },
  { label: "[+00:00 UTC] UTC, Universal Time" },
  { label: "[+00:00 UTC] UTC, Universal Time" },
];

const LANGUAGES = [
  { label: "UK English" },
  { label: "US English" },
  { label: "Spanish" },
  { label: "French" },
  { label: "German" },
];

const CURRENCIES = [{ label: "USD" }, { label: "EUR" }];

const EmailSettingsCard = () => {
  const [timezone, setTimezone] = useState("[+00:00 UTC] UTC, Universal Time");
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("UK Engish");

  const handleTimezoneChange = (tz: string) => {
    setTimezone(tz);
  };

  const handleCurrencyChange = (cur: string) => {
    setCurrency(cur);
  };

  const handleLanguageChange = (lan: string) => {
    setLanguage(lan);
  };

  return (
    <div className="flex flex-col py-2 px-12 bg-white dark:bg-darkSecondary rounded-[10px] text-dark dark:text-darkText">
      <div className="py-4 border-b border-maroonGrey dark:border-darkBg">
        Email Notification Settings
      </div>
      <table className="min-w-full">
        <tbody className="bg-white ">
          <tr className="bg-white dark:bg-darkSecondary">
            <td className="pt-4 pb-2 pr-8  text-sm font-medium text-gray-900 dark:text-darkText">
              Announcements
            </td>
            <td className="px-6 pt-4 pb-2  text-sm text-gray-500 dark:text-white">
              New features, services, policy updates and listings
            </td>
            <td className="px-12 pt-4 pb-2  text-sm font-medium">
              <ToggleButton onClick={() => {}} />
            </td>
          </tr>
          <tr className="bg-white dark:bg-darkSecondary">
            <td className=" py-2  text-sm font-medium text-gray-900 dark:text-darkText">
              Newsletter
            </td>
            <td className="px-6 py-2  text-sm text-gray-500 dark:text-white">
              Weekly market insights from Maroon
            </td>
            <td className="px-12 py-2  text-sm font-medium">
              <ToggleButton onClick={() => {}} />
            </td>
          </tr>
          <tr className="bg-white dark:bg-darkSecondary">
            <td className=" py-2  text-sm font-medium text-gray-900 dark:text-darkText">
              Trade Updates
            </td>
            <td className="px-6 py-2  text-sm text-gray-500 dark:text-white">
              Order Filled Email Notification
            </td>
            <td className="px-12 py-2  text-sm font-medium">
              <ToggleButton onClick={() => {}} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmailSettingsCard;

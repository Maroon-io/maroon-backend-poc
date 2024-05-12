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

const LearnMore = () => {
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
        Learn more about API keys
      </div>
      <table className="min-w-full">
        <tbody className="bg-white ">
          <tr className="bg-white dark:bg-darkSecondary">
            <td className="flex pt-4 pb-2 pr-8  text-sm font-medium text-gray-900 dark:text-darkText">
              Basics
            </td>
            <td className="  pl-12 pt-4 pb-2  text-sm text-gray-500 dark:text-white">
              <div className="flex flex-col">
                Automated and real time Automated and real time
                <div className="text-sm text-grayLight dark:text-darkerText">
                  Our API enables you to interact with our platform
                  programmatically (via software instead of a human interface),
                  allowing automated access to real-time market data, trading,
                  and account management. 
                  <a className="underline text-primary" href="#">
                    Learn more
                  </a>
                </div>
              </div>
            </td>
            <td className="px-12 pt-4 pb-2  text-sm font-medium"></td>
          </tr>
          <tr className="bg-white dark:bg-darkSecondary">
            <td className="flex py-2  text-sm font-medium text-gray-900 dark:text-darkText">
              Third party
            </td>
            <td className=" pl-12 py-2 pr-4 text-sm text-gray-500 dark:text-white">
              <div className="flex flex-col">
                Using the Kraken API with a third party service
                <div className="text-sm text-grayLight dark:text-darkerText">
                  Our API allows third-party services (such as trading bots,
                  mobile apps and portfolio management services) to integrate
                  with a Kraken account so that they can view account balances,
                  retrieve trading history, place and cancel orders and so on. 
                  <a className="underline text-primary" href="#">
                    Learn more
                  </a>
                </div>
              </div>
            </td>
            <td className="px-12 py-2  text-sm font-medium"></td>
          </tr>
          <tr className="bg-white dark:bg-darkSecondary">
            <td className="flex py-2  text-sm font-medium text-gray-900 dark:text-darkText">
              API security
            </td>
            <td className="pl-12 py-2 text-sm text-gray-500 dark:text-white">
              <div className="flex flex-col">
                Accessible and secure
                <div className="text-sm text-grayLight dark:text-darkerText">
                  Our API provides access to all of the information that is
                  needed to manage the account and make trades, but does not
                  expose any information that could be used to identify an
                  account or the account owner.{" "}
                  <a className="underline text-primary" href="#">
                    Learn more
                  </a>
                </div>
              </div>
            </td>
            <td className="px-12 py-2  text-sm font-medium"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LearnMore;

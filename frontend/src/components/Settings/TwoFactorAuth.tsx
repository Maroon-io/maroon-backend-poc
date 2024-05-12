import React, { useState } from "react";
import { Button, RadioButton } from "../Wrapped";

const TwoFactorAuth = () => {
  const [selectedOption, setSelectedOption] = useState("Username only");

  const handleOptionChange = (option: any) => {
    setSelectedOption(option);
  };

  const options = [
    {
      value: "Username only",
      label: "Username only (jessiediab)",
    },
    {
      value: "Username or email",
      label: "Username (jessiediab) OR email (jessiediab@gmail.com)",
    },
  ];

  return (
    <div className="flex flex-col py-2 px-12 bg-white dark:bg-darkSecondary rounded-[10px] text-dark dark:text-darkText">
      <div className="py-8 border-b border-maroonGrey dark:border-darkBg flex flex-col">
        Sign-in Two-Factor Authentication (2FA)
        <div className="text-xs text-grayLight dark:text-darkerText">
          Protect your account by using a 2FA confirmation every time you sign
          in.
        </div>
      </div>
      <table className="min-w-full">
        <tbody className="bg-white ">
          <tr className="bg-white dark:bg-darkSecondary">
            <td className=" py-2 whitespace-nowrap text-grayLight text-sm font-medium text-gray-900 dark:text-darkText">
              Authenticator app
            </td>
            <td className="pl-6 py-2 whitespace-nowrap text-grayLight text-sm  dark:text-white">
              Uses a one-time code from an app like Google Authenticator or
              Authy. {" "}
              <a className="underline text-primary" href="#">
                Learn more
              </a>
            </td>
            <td className="px-6 py-2  text-sm font-medium">
              <Button onClick={() => {}} label={"Enable"} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TwoFactorAuth;

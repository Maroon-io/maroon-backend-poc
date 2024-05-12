import React, { useState } from "react";
import { Button, RadioButton } from "../Wrapped";

const SignInCard = () => {
  const [selectedOption, setSelectedOption] = useState("Username only");

  const handleOptionChange = (option: string) => {
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
      <div className="py-4 border-b border-maroonGrey dark:border-darkBg">
        Sign-in
      </div>
      <table className="min-w-full">
        <tbody className="bg-white ">
          <tr className="bg-white dark:bg-darkSecondary">
            <td className="flex pt-4 whitespace-nowrap pb-2 pr-8 text-grayLight text-sm font-medium text-gray-900 dark:text-darkText">
              Sign-in
            </td>
            <td className="px-10 pt-4 pb-2 text-sm text-gray-500 dark:text-white">
              <div className="flex flex-col">
                <RadioButton
                  options={options}
                  selectedOption={selectedOption}
                  onChange={handleOptionChange}
                />
                <div className="text-sm text-grayLight dark:text-darkerText">
                  Select “Username only” if you often use public computers to
                  sign in to your account. This protects your email address from
                  getting exposed.{" "}
                  <a className="underline text-primary" href="#">
                    Learn more
                  </a>{" "}
                  about email security best practices.
                </div>
              </div>
            </td>
            <td className="px-10 pt-4 pb-2 text-sm font-medium">
              {/* Empty action column */}
            </td>
          </tr>
          <tr className="bg-white dark:bg-darkSecondary">
            <td className="flex py-2  text-grayLight text-sm font-medium text-gray-900 dark:text-darkText">
              Password
            </td>
            <td className="px-10 py-2 text-grayLight text-sm  dark:text-white">
              Protect your account using a strong and unique password that you
              do not use for anything else.
            </td>
            <td className="px-12 py-2  text-sm font-medium">
              <Button onClick={() => {}} label={"Change Password"} />
            </td>
          </tr>
          <tr className="bg-white dark:bg-darkSecondary">
            <td className="flex  text-grayLight py-2 whitespace-nowrap  text-sm font-medium text-gray-900 dark:text-darkText">
              Auto Sign-out
            </td>
            <td className="px-10 py-2  text-sm text-gray-500 dark:text-white">
              480 minutes (default)
              <div className="text-grayLight dark:text-darkerText text-sm mt-1">
                Time of account inactivity before automatic sign-out.
              </div>
            </td>
            <td className="px-12 py-2  text-sm font-medium">
              <Button onClick={() => {}} label={"Change Duration"} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SignInCard;

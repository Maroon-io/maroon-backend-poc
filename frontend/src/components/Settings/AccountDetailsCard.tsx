import React from "react";
import { Button } from "../Wrapped";

const AccountDetailsCard = () => {
  return (
    <div className="flex flex-col py-2 px-12 bg-white dark:bg-darkSecondary rounded-[10px] text-dark dark:text-darkText">
      <div className="py-4 border-b border-maroonGrey dark:border-darkBg">
        Account Details
      </div>
      <table className="min-w-full">
        <tbody className="bg-white ">
          <tr className="bg-white dark:bg-darkSecondary">
            <td className="pt-4 pb-2 pr-8  text-sm font-medium text-gray-900 dark:text-darkText">
              Username
            </td>
            <td className="px-6 pt-4 pb-2 text-sm text-gray-500 dark:text-white">
              jessediab
            </td>
            <td className="px-6 pt-4 pb-2 text-sm font-medium">
              {/* Empty action column */}
            </td>
          </tr>
          <tr className="bg-white dark:bg-darkSecondary">
            <td className=" py-2  text-sm font-medium text-gray-900 dark:text-darkText">
              Public ID
            </td>
            <td className="px-6 py-2  text-sm text-gray-500 dark:text-white">
              AA04 7G89 XP54 O6PY
              <div className="text-gray-500 dark:text-darkerText text-sm mt-1">
                Use this ID when you need to share with 3rd parties (including
                Kraken Support) so your account is always secure. Copy
              </div>
            </td>
            <td className="px-12 py-2  text-sm font-medium">
              <Button onClick={() => {}} label={"Copy"} />
            </td>
          </tr>
          <tr className="bg-white dark:bg-darkSecondary">
            <td className=" py-2  text-sm font-medium text-gray-900 dark:text-darkText">
              Email
            </td>
            <td className="px-6 py-2  text-sm text-gray-500 dark:text-white">
              jessiediab@gmail.com
              <div className="text-gray-500 dark:text-darkerText text-sm mt-1">
                Keeping the email account registered to your Kraken account safe
                is the single most important thing to secure your Kraken
                account.
              </div>
            </td>
            <td className="px-12 py-2  text-sm font-medium">
              <Button onClick={() => {}} label={"Edit"} />
            </td>
          </tr>
          <tr className="bg-white dark:bg-darkSecondary">
            <td className="py-2  text-sm font-medium text-gray-900 dark:text-darkText">
              Verification
            </td>
            <td className="px-6 py-2  text-sm text-gray-500 dark:text-white">
              Basic
            </td>
            <td className="px-6 py-2 text-sm font-medium">
              <Button onClick={() => {}} label={"Get Verified"} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AccountDetailsCard;

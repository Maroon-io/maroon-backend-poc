import React from "react";
import { DropDown } from "../Wrapped";

const CURRENCIES = [{ label: "USD" }, { label: "EUR" }];

const ComingSoon = () => {
  return (
    <div className="flex  min-h-28 flex-col items-center justify-center py-2 px-12 bg-white dark:bg-darkSecondary rounded-[10px] text-dark dark:text-darkText">
      <div className="font-medium text-gray-900 dark:text-darkText">
        Coming Soon
      </div>
    </div>
  );
};

export default ComingSoon;

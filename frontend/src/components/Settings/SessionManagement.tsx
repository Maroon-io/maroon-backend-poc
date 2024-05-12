import React, { useState } from "react";
import { Button, Icon, RadioButton } from "../Wrapped";
import { IoCloseOutline } from "react-icons/io5";

const SessionManagement = () => {
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
      <div className="py-8 border-b border-maroonGrey dark:border-darkBg flex items-center gap-2">
        <div> Session Management</div>
        <div className="text-grayLight text-xs ">1 active session</div>
      </div>
      <div className="min-w-full">
        <div className=" flex justify-between">
          <div className="flex items-start gap-2 py-2 whitespace-nowrap text-grayLight text-sm font-medium  dark:text-darkText">
            <div className=" p-0.5">
              <Icon name={"device"} />
            </div>
            <div className="flex flex-col ">
              <div>Chrome (Windows)</div>
              <div className="text-xs text-success">Currently Active</div>
            </div>
          </div>

          <div className="flex items-center text-grayLight text-sm font-medium  dark:text-darkText">
            <div className="flex flex-col px-6 py-2 ">
              <div className="text-right">Ireland</div>
              <div>78.73.0.28</div>
            </div>
            <div className="cursor-pointer">
              <IoCloseOutline />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionManagement;

import React from "react";

const NoNotifications = () => {
  return (
    <div className="w-full dark:bg-darkSecondary bg-white flex flex-col gap-4 items-center text-grayLight dark:text-darkerText rounded-[10px] p-12">
      <p>You do not have any notifications yet</p>
    </div>
  );
};

export default NoNotifications;

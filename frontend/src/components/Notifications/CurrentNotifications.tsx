import React from "react";

interface CurrentNotificationsProps {
  data: any;
}

const CurrentNotifications: React.FC<CurrentNotificationsProps> = ({
  data,
}) => {
  return (
    <div className="w-full  flex flex-col gap-8 items-center dark:bg-darkSecondary bg-white dark:text-darkerText text-grayLight rounded-[10px] p-8">
      {data.map((item: any, index: number) => (
        <div key={index} className="flex justify-between w-full">
          <div className="flex flex-col">
            <div className="dark:text-darkText text-dark">{item.info}</div>
            <div className="text-sm ">{item.detail}</div>
          </div>
          <div className="text-sm">{item.date}</div>
        </div>
      ))}
    </div>
  );
};

export default CurrentNotifications;

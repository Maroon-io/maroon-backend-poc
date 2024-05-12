import React from "react";
import { Layout } from "../../layouts";
import {
  CurrentNotifications,
  NoNotifications,
} from "../../components/Notifications";

const DATA = [
  {
    info: "Login attempted from new IP",
    detail:
      "The system has detected that your account is logged in from an unused IP address.",
    date: "13-03-2024 10:35",
  },

  {
    info: "Login attempted from new IP",
    detail:
      "The system has detected that your account is logged in from an unused IP address.",
    date: "13-03-2024 10:35",
  },

  {
    info: "Login attempted from new IP",
    detail:
      "The system has detected that your account is logged in from an unused IP address.",
    date: "13-03-2024 10:35",
  },
];

const Notifications = () => {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col gap-8 py-8  mx-[18rem] dark:text-darkerText rounded-[10px]">
        <div className="text-2xl font-bold dark:text-darkText">
          Notifications
        </div>
        <NoNotifications />
        <CurrentNotifications data={DATA} />
      </div>
    </Layout>
  );
};

export default Notifications;

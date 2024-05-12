import React from "react";
import ComingSoon from "./ComingSoon";
import APIDetails from "./APIDetails";
import LearnMore from "./LearnMore";

const API = () => {
  return (
    <div className="flex flex-col gap-4 pb-16 ">
      <ComingSoon />
      <APIDetails />
      <LearnMore />
    </div>
  );
};

export default API;

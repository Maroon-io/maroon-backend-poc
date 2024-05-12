import React from "react";
import { ImSpinner2 } from "react-icons/im";
import { useSelector } from "react-redux";

const Spinner = () => {
  const { theme } = useSelector((state: any) => {
    const { theme } = state.webAppReducer;
    return { theme };
  });

  console.log({ theme });

  return (
    <div>
      <ImSpinner2 className="animate-spin text-primary w-8 h-8" />
    </div>
  );
};

export default Spinner;

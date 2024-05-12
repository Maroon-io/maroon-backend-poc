import React from "react";
import Spinner from "./Spinner";
import { ImSpinner2 } from "react-icons/im";

interface ButtonProps {
  label?: string;
  disabled?: boolean;
  onClick: any;
  inactive?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  onClick,
  inactive,
  loading,
}) => {
  const handleClick = (item: string) => {
    onClick();
  };

  if (disabled) {
    return (
      <button
        disabled
        className="bg-[#AEAEB2] w-full py-4 rounded-3xl  transition ease-in-out duration-200 text-dark"
      >
        {label}
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className={`${
        inactive
          ? "bg-primary text-slate-100"
          : "bg-transparent text-dark border border-tertiary dark:border-darkerText dark:text-darkText"
      }   whitespace-nowrap px-4  w-full py-2 hover:scale-x-[1.03] active:translate-y-[0.2rem] transition ease-in-out duration-200 rounded-3xl `}
    >
      {loading ? (
        <div className="flex gap-2 items-center">
          <ImSpinner2 className="animate-spin text-primary w-4 h-4" />{" "}
          processing...
        </div>
      ) : (
        label
      )}
    </button>
  );
};

export default Button;

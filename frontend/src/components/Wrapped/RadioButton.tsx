import React from "react";
import Divider from "./Divider";

interface RadioButtonProps {
  options: any;
  selectedOption: string;
  onChange: any;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  selectedOption,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {options.map((option: any) => (
        <div
          key={option.value}
          className="flex cursor-pointer gap-2"
          onClick={() => onChange(option.value)}
          // value={option.value}
        >
          <div
            className={` ${
              selectedOption === option.value ? "bg-primary" : "bg-slate-300"
            } flex rounded-full h-4 w-4  items-center justify-center hover:scale-110 transition ease-in-out duration-100`}
          >
            <div className=" rounded-full h-2 w-2 bg-white "></div>
          </div>
          <div className="whitespace-nowrap">{option.label}</div>
        </div>
      ))}
    </div>
  );
};

export default RadioButton;

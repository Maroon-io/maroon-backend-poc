import colors from "../../constants/colors";
import { Box, Button, DropButton } from "grommet";
import { Down } from "grommet-icons";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";

const StyledLabel = styled.span<{ value: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${({ value }) => (value ? colors.grayLight : colors.dark)};
  // font-weight: bold;
  align-items: center;
`;

const StyledButton = styled.button`
  border-radius: 10px;
  color: ${colors.grayLight};
  font-size: 14px;
  padding: 2px 8px;
  transition: 0.3s ease-in-out;
`;

interface BtnOutlineProps {
  label: string;
  icon?: any;
  borderless?: boolean;
  light?: boolean;
  iconRight?: boolean;
  iconLeft?: boolean;
  active?: boolean;
  onClick?: (item: any) => void;
}

const BtnOutline: React.FC<BtnOutlineProps> = ({
  label,
  icon,
  borderless,
  light,
  onClick,
  iconRight,
  iconLeft,
  active,
}) => {
  const handleClick = (tab: string) => {
    onClick && onClick(tab);
  };

  if (borderless) {
    return (
      <div>
        <button
          onClick={() => handleClick(label)}
          className={`
      ${
        active
          ? "ring-1 ring-[#DFDFDF] dark:bg-primary dark:text-slate-50 "
          : ""
      }
      text-grayLight dark:text-darkerText rounded-[10px] hover:text-dark dark:hover:text-white dark:ring-1 dark:ring-darkerText px-3 py-1 text-sm hover:scale-x-[1.03] active:translate-y-[0.2rem] transition ease-in-out duration-200`}
        >
          <div className="flex items-center gap-2">
            {!iconRight && icon} {label} {iconRight && icon}
          </div>
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => handleClick(label)}
        className={`
    ${
      active
        ? "ring-1 ring-[#DFDFDF] dark:bg-primary dark:text-slate-50"
        : "hover:ring-primary dark:hover:ring-white"
    }
    text-grayLight dark:text-darkText dark:bg-darkBg rounded-lg hover:text-dark dark:hover:text-white ring-1 ring-tertiary dark:ring-0 px-2 py-1 text-sm hover:scale-x-[1.03] active:translate-y-[0.2rem] transition ease-in-out duration-200`}
      >
        <div className="flex items-center gap-2">
          {!iconRight && icon} {label} {iconRight && icon}
        </div>
      </button>
    </div>
  );
};

export default BtnOutline;

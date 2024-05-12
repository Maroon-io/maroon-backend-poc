import React from "react";
import styled from "styled-components";

const MTNavButton = styled.button`
  font-size: 14px;
  transition: 0.3s ease-in-out;
`;

interface BtnUnderlineProps {
  label: string;
  onClick: any;
  active: any;
}

const BtnUnderline: React.FC<BtnUnderlineProps> = ({
  label,
  onClick,
  active,
}) => {
  const handleClick = (nav: string) => {
    onClick(nav);
  };

  return (
    <MTNavButton
      className={`${
        active
          ? "dark:text-slate-100 text-dark border-b-2 border-primary dark:border-white"
          : ""
      } dark:hover:text-darkText text-grayLight hover:text-dark hover:border-b hover:scale-x-[1.03] active:translate-y-[0.2rem] transition ease-in-out duration-200`}
      onClick={() => handleClick(label)}
    >
      {label}
    </MTNavButton>
  );
};

export default BtnUnderline;

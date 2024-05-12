import colors from "../../constants/colors";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Icon from "./Icon";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

const ToggleContainer = styled.div<any>`
  width: 36px;
  height: 20px;
  border-radius: 15px;

  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Slider = styled.div<any>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  left: ${({ isActive }) => (isActive ? "18px" : "2px")};
  color: ${({ isActive }) => (isActive ? colors.primary : "inherit")};
  transition: left 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ToggleButtonProps {
  onClick: any;
  theme?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ onClick, theme }) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
    onClick && onClick(!isActive);
    onClick();
  };

  useEffect(() => {
    if (theme === "dark") {
      setIsActive(true);
    }
  }, [theme]);

  return (
    <ToggleContainer
      className={`bg-[#F0F0F0] dark:bg-darkBg  ${
        theme ? "ring-1 ring-tertiary bg-transparent dark:ring-0" : ""
      }`}
      isActive={isActive}
      onClick={handleToggle}
    >
      {theme ? (
        <Slider
          className={`${isActive ? "dark:bg-primary" : ""}`}
          isActive={isActive}
        >
          {isActive ? (
            <IoMoonOutline className="dark:text-dark" />
          ) : (
            <IoSunnyOutline />
          )}
        </Slider>
      ) : (
        <Slider isActive={isActive} />
      )}
    </ToggleContainer>
  );
};

export default ToggleButton;

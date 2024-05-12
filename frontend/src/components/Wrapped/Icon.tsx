import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";

const IconWrapper = styled.div`
  width: 16px;
  height: 16px;
`;

interface IconProps {
  name: string;
}

const Icon: React.FC<IconProps> = ({ name }) => {
  const { theme } = useSelector((state: any) => {
    const { theme } = state.webAppReducer;
    return { theme };
  }, shallowEqual);
  return (
    <IconWrapper>
      <img
        src={`/assets/icons/${theme === "dark" ? name + "-dark" : name}.png`}
        alt={name}
      />
    </IconWrapper>
  );
};

export default Icon;

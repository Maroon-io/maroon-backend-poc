import React, { useState } from "react";
import styled from "styled-components";

import colors from "../../constants/colors";
import { IoChevronBack } from "react-icons/io5";

const IconWrapper = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 0 5px;
  background: ${({ value }) => (value ? colors.grayLight : "")};
  border: ${({ value }) => (value ? `1px solid ${colors.grayLight}` : "")};
  cursor: pointer;
  transition: 0.2s ease-in-out;
`;

const StyledIcon = styled(IoChevronBack)<any>`
  color: ${({ value }) => (value ? colors.white : "")};
  transition: 0.2s ease-in-out;
`;

interface GoBackProps {
  onClick: any;
}

const GoBack: React.FC<GoBackProps> = ({ onClick }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
    onClick();
  };

  return (
    <IconWrapper value={clicked} onClick={handleClick}>
      <StyledIcon value={clicked} />
    </IconWrapper>
  );
};

export default GoBack;

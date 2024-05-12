import colors from "../../constants/colors";
import { Box, Button, DropButton } from "grommet";
import React from "react";
import styled from "styled-components";

const StyledLabel = styled.span<any>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${({ value, background }) =>
    value ? colors.gray : background ? colors.white : colors.dark};
  font-weight: bold;
  white-space: nowrap;
  align-items: center;
`;

const StyledButton = styled(Button)<any>`
  border: ${({ value }) => (value ? `none` : `1px solid ${colors.grayLight}`)};
  background: ${({ background }) => (background ? colors.primary : "")};

  border-radius: 15px;
  font-size: 14px;
  padding: 8px 1rem;
  width: 100%;
  transition: 0.3s ease-in-out;
  &:focus {
    border: 1.5px solid ${colors.primary};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

interface ButtonPlainProps {
  label: string;
  icon?: any;
  borderless?: boolean;
  light?: boolean;
  onClick?: any;
  primary?: boolean;
  disabled?: boolean;
}

const ButtonPlain: React.FC<ButtonPlainProps> = ({
  label,
  icon,
  borderless,
  light,
  onClick,
  primary,
  disabled,
}) => {
  return (
    <StyledButton
      disabled={disabled}
      size="large"
      onClick={onClick}
      value={borderless}
      background={primary}
      label={
        <StyledLabel
          className={` ${
            disabled ? "bg-transparent" : ""
          } dark:text-white dark:hover:text-darkText`}
          background={primary}
          value={light}
        >
          {icon} {label}
        </StyledLabel>
      }
    />
  );
};

export default ButtonPlain;

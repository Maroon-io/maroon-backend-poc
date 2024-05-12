import React, { useState } from "react";
import styled from "styled-components";
import { FiCopy } from "react-icons/fi";
import colors from "../../constants/colors";
import { shallowEqual, useSelector } from "react-redux";

const IconWrapper = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 2px;
  background: ${({ value }) => (value ? colors.grayLight : "")};
  border: ${({ value }) => (value ? `1px solid ${colors.grayLight}` : "")};
  cursor: pointer;
  transition: 0.2s ease-in-out;
`;

const StyledIcon = styled(FiCopy)<any>`
  color: ${({ value, theme }) =>
    value && theme === "light"
      ? colors.white
      : value && theme === "dark"
      ? colors.dark
      : !value && theme === "dark"
      ? colors.darkerText
      : ""};
  transition: 0.2s ease-in-out;
`;

interface CopyToClipboardProps {
  text: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const { theme } = useSelector((state: any) => {
    const { theme } = state.webAppReducer;
    return { theme };
  }, shallowEqual);

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 300);
      })
      .catch((error) => console.error("Failed to copy:", error));
  };

  return (
    <IconWrapper value={copied} onClick={copyToClipboard}>
      <StyledIcon theme={theme} value={copied} />
    </IconWrapper>
  );
};

export default CopyToClipboard;

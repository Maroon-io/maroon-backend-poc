import React from "react";
import styled from "styled-components";

const CardBoldText = styled.div<any>`
  font-size: 42px;

  margin: 15px 0;
  color: black;
`;

interface ExtraBoldtextProps {
  text: string;
}

const ExtraBoldtext: React.FC<ExtraBoldtextProps> = ({ text }) => {
  return <CardBoldText className="dark:text-darkText">{text}</CardBoldText>;
};

export default ExtraBoldtext;

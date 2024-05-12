import React from "react";
import styled from "styled-components";

const DividerLine = styled.div`
  border-bottom: 1px solid #dfdfdf;
  width: 100%;
  height: 1px;
`;

const DividerLineV = styled.div`
  border-right: 1px solid #dfdfdf;
  height: 100%;
  width: 10px;
`;

interface DividerProps {
  vertical?: boolean;
}

const Divider: React.FC<DividerProps> = ({ vertical }) => {
  if (vertical)
    return <DividerLineV className="dark:border-r-darkBg"></DividerLineV>;
  return <DividerLine className="dark:border-b-darkBg"></DividerLine>;
};

export default Divider;

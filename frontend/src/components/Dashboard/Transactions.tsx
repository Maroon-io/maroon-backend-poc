import React from "react";
import Card from "../../components/Wrapped/Card";
import CustomTab from "../../components/Wrapped/CustomTab";
import styled from "styled-components";

const NetWrapper = styled.div`
  max-width: 336px;
  // border: 1px solid black;
`;

const Transactions = () => {
  return (
    <NetWrapper>
      <Card title="Net Worth" amount="$5,755,323" crypto={97} fiat={3} />
      <CustomTab />
    </NetWrapper>
  );
};

export default Transactions;

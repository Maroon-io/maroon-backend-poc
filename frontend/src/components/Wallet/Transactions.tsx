import React from "react";
import Card from "../../components/Wrapped/Card";
import CustomTab from "../../components/Wrapped/CustomTab";
import styled from "styled-components";
import { generateRandomTransaction, getTotalBalance } from "../../utils";

const NetWrapper = styled.div`
  max-width: 336px;
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  gap: 1rem;
`;

const HISTORY = Array.from({ length: 6 }, () => generateRandomTransaction());
const TRADES = Array.from({ length: 6 }, () => generateRandomTransaction());
const EARNINGS = Array.from({ length: 6 }, () => generateRandomTransaction());
const lists = [HISTORY, TRADES, EARNINGS];

const labelList = ["History", "Trades", "Earnings"];

interface TransactionsProps {
  balances: any;
  loading: boolean;
}

const Transactions: React.FC<TransactionsProps> = ({ balances, loading }) => {
  console.log({ balances });

  return (
    <NetWrapper>
      <Card
        loading={loading}
        title="Net Worth"
        amount={`$${getTotalBalance(balances)}`}
        crypto={97}
        fiat={3}
      />
      <CustomTab
        loading={loading}
        transaction
        labelList={labelList}
        listArr={lists}
      />
    </NetWrapper>
  );
};

export default Transactions;

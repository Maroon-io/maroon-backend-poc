import React from "react";
import styled from "styled-components";
import { LinkDown, LinkUp, Upgrade } from "grommet-icons";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

const TransactionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  align-items: center;
  border-bottom: 1px solid #dfdfdf;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dfdfdf;
  border-radius: 50%;
  width: 24px; /* Adjust size of the wrapper */
  height: 24px; /* Adjust size of the wrapper */
`;

const StatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const StatusText = styled.div`
  font-size: 14px;
  color: #1e0c1b;
  font-weight: bold;
`;

const StatusDate = styled.div`
  font-size: 14px;
  color: #717171;
  font-weight: bold;
`;

const AmountText = styled.div`
  font-size: 14px;
  color: #1e0c1b;
  font-weight: bold;
`;

interface TransactionListProps {
  status: string;
  date: string;
  amount: string;
  symbol: string;
}

const TransactionList: React.FC<TransactionListProps> = ({
  status,
  date,
  amount,
  symbol,
}) => {
  return (
    <TransactionWrapper className="dark:border-darkBg">
      <ItemWrapper>
        <IconWrapper>
          {status === "Sent" ? (
            <FaArrowUp className="dark:text-darkText" />
          ) : (
            <FaArrowDown className="dark:text-darkText" />
          )}
        </IconWrapper>
        <StatusWrapper>
          <StatusText className="dark:text-darkText">{status}</StatusText>
          <StatusDate>{date}</StatusDate>
        </StatusWrapper>
      </ItemWrapper>
      <AmountText className="dark:text-darkText">{`${
        status === "Sent" ? "-" : "+"
      }${amount} ${symbol}`}</AmountText>
    </TransactionWrapper>
  );
};

export default TransactionList;

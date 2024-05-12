import colors from "../../constants/colors";

import React, { useEffect, useState } from "react";
import styled from "styled-components";

import LimitOrder from "./LimitOrder";
import MarketOrder from "./MarketOrder";

const ASSETS = [
  "USDT",
  "USDC",
  "ETH",
  "BTC",
  "XRP",
  "MONI",
  "NHCT",
  "AAVE",
  "LINK",
  "MATIC",
  "DOT",
  "SOL",
  "ADA",
  "AVAX",
  "XTZ",
];

const Container = styled.div`
  width: 32rem;
  height: 42.6rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: ${colors.white};
  padding: 1.5rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledTabs = styled.div<any>`
  background: #dfdfdf;
  display: flex;
  border-radius: 0.5rem;
  width: 100%;
  padding: 0 1px;
`;

const StyledTab = styled.div<any>`
  width: 100%;
  font-weight: bold;
  margin: 4px 2px;
  padding: 3px 10px;
  border-radius: 0.5rem;
  color: ${(props) => (props.active ? "black" : "gray")};
  cursor: pointer;
  text-decoration: none; /* Remove text decoration */
  background: ${(props) => (props.active ? "white" : "transparent")};
  white-space: nowrap;
  // &:hover,
  &:focus {
    color: black;
    background: white;
    border-radius: 0.5rem;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease-in-out;
`;

interface PlaceOrderProps {
  onPlaceOrder: any;
}

const PlaceOrder: React.FC<PlaceOrderProps> = ({ onPlaceOrder }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePlaceOrder = (details: any) => {
    onPlaceOrder(details);
  };

  return (
    <Container>
      <StyledTabs
        activeIndex={activeIndex}
        onActive={(index: number) => setActiveIndex(index)}
        justify="start"
      >
        <StyledTab active={activeIndex === 0} onClick={() => setActiveIndex(0)}>
          Limit order
        </StyledTab>

        <StyledTab active={activeIndex === 1} onClick={() => setActiveIndex(1)}>
          Market order
        </StyledTab>
      </StyledTabs>

      {activeIndex === 0 && (
        <LimitOrder
          maxLimit={"Max: 3215 EUR"}
          marketPrice={"1 USDT = 0.00059 BTC"}
          transferFee={"0.00001 BTC"}
          onPlaceOrder={handlePlaceOrder}
        />
      )}

      {activeIndex === 1 && (
        <MarketOrder
          maxLimit={"Max: 3215 EUR"}
          marketPrice={"1 USDT = 0.00059 BTC"}
          transferFee={"0.00001 BTC"}
          onPlaceOrder={handlePlaceOrder}
        />
      )}
    </Container>
  );
};

export default PlaceOrder;

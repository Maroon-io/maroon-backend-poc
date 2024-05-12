import React, { useState } from "react";
import { BtnOutline } from "../../components/Wrapped";
import colors from "../../constants/colors";
import styled from "styled-components";
import Sell from "./TradeAction/Sell";
import Buy from "./TradeAction/Buy";

const BUTTON_LINKS = ["Spot", "Cross 5x", "Isolated"];

const TEContainer = styled.div`
  background: ${colors.white};
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 5px;
  font-size: 14px;
`;

const TELinkWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 0;
`;

const TEActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

const TradeExecution = () => {
  const [orderType, setOrderType] = useState("Limit");
  const [activeTab, setActiveTab] = useState("Buy");

  const handleSetOrderType = (item: string) => {
    setOrderType(item);
  };

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <TEContainer className="dark:bg-darkSecondary">
      <TELinkWrapper>
        {BUTTON_LINKS.map((button, index) => (
          <BtnOutline
            onClick={() => setOrderType(button)}
            key={index}
            light
            borderless
            active={button === orderType}
            label={button}
          />
        ))}
      </TELinkWrapper>

      <TEActionsWrapper>
        <Buy
          activeTab={activeTab}
          onClick={handleActiveTab}
          type={"Buy"}
        />
        <Sell
          activeTab={activeTab}
          onClick={handleActiveTab}
          type={"Sell"}
        />
      </TEActionsWrapper>
    </TEContainer>
  );
};

export default TradeExecution;

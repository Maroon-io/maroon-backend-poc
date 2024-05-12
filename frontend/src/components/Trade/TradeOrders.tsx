import React, { useEffect, useState } from "react";
import OrderTable from "./OrderTable";
import { TEActionsWrapper, TEContainer } from "./style";
import { shallowEqual, useSelector } from "react-redux";

const TradeOrders = () => {
  const { openOrders, tradeHistory } = useSelector((state: any) => {
    const { openOrders, tradeHistory } = state.webAppReducer;
    return { openOrders, tradeHistory };
  });

  const [orderType, setOrderType] = useState("limit");
  const [loadingTableData, setLoadingTableData] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingTableData(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  console.log({openOrders})
  console.log({tradeHistory})

  return (
    <TEContainer>
      <TEActionsWrapper>
        <OrderTable
          title="Open Orders"
          data={openOrders}
          loading={loadingTableData}
        />
        <OrderTable
          title="Trades"
          data={tradeHistory}
          loading={loadingTableData}
        />
      </TEActionsWrapper>
    </TEContainer>
  );
};

export default TradeOrders;

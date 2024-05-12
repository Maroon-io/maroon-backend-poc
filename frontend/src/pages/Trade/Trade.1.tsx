import React, { useEffect, useState } from "react";
import {
  PairSelector,
  TradeBanner,
  TradeExecution,
  TradeInfo,
} from "../../components/Trade";
import { PageWrapper } from "../../pages/Dashboard/style";
import { generateTableData } from "../../utils";
import TradeOrders from "../../components/Trade/TradeOrders";
import { TOrderWrapper, TWrapper } from "./style";
import { TVChartContainer } from "../../components/TVChartContainer";
import { Layout } from "../../layouts";
import { useDispatch, useSelector } from "react-redux";
import {
  setTradeHistory,
  setUserTradeHistory,
  setWalletTokens,
} from "../../redux/reducers";
import useTrades from "../../hooks/useTrades";
import useWallet from "../../hooks/useWallet";

export const Trade = () => {
  const [loading, setLoading] = useState(true);
  const [pairSelectorOpen, setPairSelectorOpen] = useState(false);
  const { getTradeHistory, getUserTradeHistory } = useTrades();
  const [chartData, setChartData] = useState();
  const { getChartData } = useTrades();
  const { getWalletBalance } = useWallet();

  const { openOrders, tradeHistory, loggedIn, walletTokens } = useSelector(
    (state: any) => {
      const { openOrders, tradeHistory, loggedIn, walletTokens } =
        state.webAppReducer;
      return { openOrders, tradeHistory, loggedIn, walletTokens };
    }
  );

  const dispatch = useDispatch();

  const TABLE_DATA = Array.from({ length: 2 }, () => generateTableData(3));

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const fetchData = async () => {
    const tradeHistoryData = await getTradeHistory();
    console.log({ tradeHistoryData });
    dispatch(setTradeHistory(tradeHistoryData?.data));

    const userTradeHistoryData = await getUserTradeHistory("1");
    console.log({ userTradeHistoryData });
    dispatch(setUserTradeHistory(userTradeHistoryData?.data));
    // const openOrders = extractPending(historyData?.data);
    // dispatch(setOpenOrders(openOrders));
  };

  const extractPending = (data: any) => {
    if (!Array.isArray(data)) {
      return;
    }

    const pending = data.filter(
      (item: any) => item.orderStatus.toLowerCase() === "pending"
    );

    return pending;
  };

  const fetchGraphData = async () => {
    const result = await getChartData("BTC", "USDT");
    setChartData(result);
  };

  const fetchWalletBalance = async () => {
    const result = await getWalletBalance();
    dispatch(setWalletTokens(result));
  };

  useEffect(() => {
    if (!walletTokens) {
      fetchWalletBalance();
    }
    fetchData();
    fetchGraphData();
  }, [loggedIn]);

  console.log({ openOrders });
  console.log({ tradeHistory });

  return (
    <Layout>
      <PageWrapper>
        <TWrapper>
          <TradeBanner onClick={() => setPairSelectorOpen(!pairSelectorOpen)} />
          {pairSelectorOpen && (
            <PairSelector onClose={() => setPairSelectorOpen(false)} />
          )}
          <TVChartContainer data={chartData} />

          <TradeInfo loading={loading} data={[openOrders, tradeHistory]} />
        </TWrapper>

        <TOrderWrapper>
          <TradeOrders />
          <TradeExecution />
        </TOrderWrapper>
      </PageWrapper>
    </Layout>
  );
};

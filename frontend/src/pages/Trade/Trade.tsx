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
import useOrders from "../../hooks/useOrders";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenOrders,
  setTradeHistory,
  setUserTradeHistory,
  setWalletTokens,
} from "../../redux/reducers";
import useTrades from "../../hooks/useTrades";
import useWallet from "../../hooks/useWallet";

const TRADEHISTORY = [
  {
    orderId: 51360099,
    date: "2019-10-26T19:03:02.097Z",
    currencyPair: "LTC-BTC",
    side: "BUY",
    tradeType: "LIMIT",
    tradePrice: "0.00596870 BTC",
    averagePrice: "0 BTC",
    size: "15.25450010 LTC",
    filled: "0 LTC",
    feePaid: "0 LTC",
    totalExecutedValue: "0 BTC",
    stopPrice: "0.00000000 BTC",
    orderStatus: "Pending",
    mOrders: [],
  },
  {
    orderId: 51360096,
    date: "2019-10-26T19:03:01.883Z",
    currencyPair: "LTC-BTC",
    side: "BUY",
    tradeType: "LIMIT",
    tradePrice: "0.00595780 BTC",
    averagePrice: "0 BTC",
    size: "32.86365190 LTC",
    filled: "0 LTC",
    feePaid: "0 LTC",
    totalExecutedValue: "0 BTC",
    stopPrice: "0.00000000 BTC",
    orderStatus: "Pending",
    mOrders: [],
  },
  {
    orderId: 51360090,
    date: "2019-10-26T19:03:01.637Z",
    currencyPair: "LTC-BTC",
    side: "BUY",
    tradeType: "LIMIT",
    tradePrice: "0.00596180 BTC",
    averagePrice: "0 BTC",
    size: "197.38837190 LTC",
    filled: "0 LTC",
    feePaid: "0 LTC",
    totalExecutedValue: "0 BTC",
    stopPrice: "0.00000000 BTC",
    orderStatus: "Pending",
    mOrders: [],
  },
  {
    orderId: 51360088,
    date: "2019-10-26T19:03:01.53Z",
    currencyPair: "LTC-BTC",
    side: "BUY",
    tradeType: "LIMIT",
    tradePrice: "0.00596480 BTC",
    averagePrice: "0 BTC",
    size: "4.50863280 LTC",
    filled: "0 LTC",
    feePaid: "0 LTC",
    totalExecutedValue: "0 BTC",
    stopPrice: "0.00000000 BTC",
    orderStatus: "Pending",
    mOrders: [],
  },
];

const Trade = () => {
  const [loading, setLoading] = useState(true);
  const [pairSelectorOpen, setPairSelectorOpen] = useState(false);
  const { getTradeHistory, getUserTradeHistory } = useTrades();
  const [chartData, setChartData] = useState();
  const { getChartData } = useTrades();
  const { getWalletBalance } = useWallet();

  const { openOrders, tradeHistory, userTradeHistory, loggedIn, walletTokens } =
    useSelector((state: any) => {
      const {
        openOrders,
        tradeHistory,
        userTradeHistory,
        loggedIn,
        walletTokens,
      } = state.webAppReducer;
      return {
        openOrders,
        tradeHistory,
        userTradeHistory,
        loggedIn,
        walletTokens,
      };
    });

  const dispatch = useDispatch();

  const TABLE_DATA = Array.from({ length: 2 }, () => generateTableData(3));

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setLoading(false);
  //   }, 5000);

  //   return () => clearTimeout(timeout);
  // }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const tradeHistoryData = await getTradeHistory();
      dispatch(setTradeHistory(tradeHistoryData));

      const userTradeHistoryData = await getUserTradeHistory("1");
      dispatch(setUserTradeHistory(userTradeHistoryData));
      const openOrders = extractPending(userTradeHistoryData);
      dispatch(setOpenOrders(openOrders));
      setLoading(false);
    } catch (error) {
      console.log({ error });
    }
  };

  const extractPending = (data: any) => {
    if (!Array.isArray(data)) {
      return;
    }

    const pending = data.filter(
      (item: any) => item.orderStatus.toLowerCase() !== "Filled"
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

  return (
    <Layout>
      <PageWrapper>
        <TWrapper>
          <TradeBanner onClick={() => setPairSelectorOpen(!pairSelectorOpen)} />
          {pairSelectorOpen && (
            <PairSelector onClose={() => setPairSelectorOpen(false)} />
          )}
          {/* <TVChartContainer data={chartData} /> */}

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

export default Trade;

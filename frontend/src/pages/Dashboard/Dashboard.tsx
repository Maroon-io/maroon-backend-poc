import React from "react";

import { useEffect, useState } from "react";

import { PageWrapper } from "./style";
import { PerformanceChart, Watchlist } from "../../components/Dashboard";
import { Balance } from "../../components/Wallet";

import "../../index.css";

import { getTokenPriceChange } from "../../api/cryptoquoteApi";
import { SkeletonTheme } from "react-loading-skeleton";
import colors from "../../constants/colors";
import "react-loading-skeleton/dist/skeleton.css";

import { ChartComponent } from "../../components/Dashboard/ChartComponent";
import { Layout } from "../../layouts";
import { getTotalBalance } from "../../utils";
import useWallet from "../../hooks/useWallet";
import { setWalletTokens } from "../../redux/reducers";
import { useDispatch, useSelector } from "react-redux";

const DATA = [
  {
    name: "AAVE",
    chain: "Ethereum",
    wallet: "0x34yuiomnbuvyctromiunbyvt",
    balance: 2.899,
    id: "AAVE",
  },
  {
    name: "LINK",
    chain: "Ethereum",
    wallet: "0xnoibuyvipboihnbsbjs",
    balance: 0.7839,
    id: "Chainlink",
  },
  {
    name: "ETH",
    chain: "Ethereum",
    wallet: "0x1283782819283njb",
    balance: 0.98763,
    id: "Ethereum",
  },

  {
    name: "ATOM",
    chain: "Cosmos",
    wallet: "0x1283782819283njb",
    balance: 1.286,
    id: "Cosmos",
  },

  {
    name: "FIL",
    chain: "Filecoin",
    wallet: "0x1283782819283njb",
    balance: 0,
    id: "Filecoin",
  },

  {
    name: "XRP",
    chain: "XRP",
    wallet: "0x56v675i7iuniouhugyu7788",
    balance: 16.83,
    id: "ripple",
  },

  {
    name: "OPT",
    chain: "Ethereum",
    wallet: "0x56v675i7iuniouhugyu7788",
    balance: 0,
    id: "Optimism",
  },
  {
    name: "BTC",
    chain: "Bitcoin",
    wallet: "0xsju2uy928njdu992jd",
    balance: 3.839,
    id: "Bitcoin",
  },
  {
    name: "DOGE",
    chain: "Dogecoin",
    wallet: "0xin8w9wnwuniomwowlw",
    balance: 0,
    id: "Dogecoin",
  },

  {
    name: "ZIL",
    chain: "ZIL",
    wallet: "0xin8w9wnwuniomwowlw",
    balance: 0,
    id: "Zilliqa",
  },

  {
    name: "ADA",
    chain: "ADA",
    wallet: "0xin8w9wnwuniomwowlw",
    balance: 0,
    id: "Cardano",
  },

  {
    name: "ADX",
    chain: "ADX",
    wallet: "0xin8w9wnwuniomwowlw",
    balance: 0,
    id: "adex",
  },
];

const initialData = [
  { time: "2018-12-22", value: 32.51 },
  { time: "2018-12-23", value: 31.11 },
  { time: "2018-12-24", value: 27.02 },
  { time: "2018-12-25", value: 27.32 },
  { time: "2018-12-26", value: 25.17 },
  { time: "2018-12-27", value: 28.89 },
  { time: "2018-12-28", value: 25.46 },
  { time: "2018-12-29", value: 23.92 },
  { time: "2018-12-30", value: 24.68 },
  { time: "2018-12-31", value: 25.67 },
  { time: "2019-01-01", value: 26.67 },
  { time: "2019-02-02", value: 27.67 },
  { time: "2019-03-03", value: 28.67 },
  { time: "2019-04-31", value: 27.67 },
  { time: "2019-05-31", value: 26.67 },
  { time: "2019-06-31", value: 29.67 },
  { time: "2019-07-31", value: 22.67 },
  { time: "2019-08-31", value: 26.67 },
  { time: "2019-09-31", value: 27.67 },
  { time: "2019-10-31", value: 32.67 },
];

const Dashboard = () => {
  const [walletBalances, setWalletBalances] = useState<any>([]);
  const [loadingChart, setLoadingChart] = useState(true);
  const { getWalletBalance } = useWallet();
  const dispatch = useDispatch();

  const { loggedIn } = useSelector((state: any) => {
    const { loggedIn } = state.webAppReducer;
    return { loggedIn };
  });

  const processAssetsData = async () => {
    const results = [];

    for (let i = 0; i < DATA.length; i++) {
      const current = DATA[i];
      console.log({ current });
      if (current.balance > 0) {
        const result = await getTokenPriceChange(current.id.toLowerCase());
        console.log({ result });
        let tokenObj = {
          ...current,
          value: result[current.id.toLowerCase()].usd * current.balance,
          change: result[current.id.toLowerCase()].usd_24h_change.toFixed(2),
          current_price: result[current.id.toLowerCase()].usd,
          image: result[current.id.toLowerCase()].image,
        };

        results.push(tokenObj);
      } else {
        let tokenObj = {
          ...current,
          value: 0,
          change: 0,
          current_price: 0,
          image: "",
        };
        results.push(tokenObj);
      }
    }
    results.sort((a, b) => b.value - a.value);

    setWalletBalances(results);
  };

  const fetchWalletBalance = async () => {
    const result = await getWalletBalance();
    console.log({ result });
    dispatch(setWalletTokens(result));
  };

  useEffect(() => {
    fetchWalletBalance();
    processAssetsData();

    const timeout = setTimeout(() => {
      setLoadingChart(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [loggedIn]);

  return (
    <Layout>
      {/* <TVChartContainer /> */}
      <PageWrapper className="min-h-screen">
        <Watchlist />
        <Balance
          loading={loadingChart}
          balances={walletBalances}
          children={
            <PerformanceChart
              totalBalance={getTotalBalance(walletBalances)}
              loading={loadingChart}
              data={initialData}
            />
          }
        />
      </PageWrapper>
    </Layout>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import CustomTab from "../../components/Wrapped/CustomTab";
import styled from "styled-components";

import {
  getMarketData,
  getMarkets,
  getTopGainers,
  getTrending,
} from "../../api/cryptoquoteApi";
import { addCommasToNumber } from "../../utils";

const NetWrapper = styled.div`
  min-width: 336px;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Transactions = () => {
  const [topGainers, setTopGainers] = useState<any>([]);
  const [markets, setMarkets] = useState<any>([]);
  const [watchList, setWatchList] = useState<any>([]);
  const [loadingWatchlist, setLoadingWatchlist] = useState(true);
  const [trending, setTrending] = useState<any>([]);
  const [loadingMarkets, setLoadingMarkets] = useState(true);

  const WATCHLIST_LABEL = ["Watchlist", "Top gainers"];
  const MARKETS_LABEL = ["Markets", "Trending"];

  const fetchTopGainers = async () => {
    setLoadingWatchlist(true);
    const result = await getTopGainers();
    console.log({ result });
    if (!result) {
      setLoadingWatchlist(false);
      return;
    }
    const listArr = [];
    // console.log('result', result);
    for (let i = 0; i < result.length; i++) {
      let current = result[i];
      let cryptoSymbol = current.symbol_pair.split("/")[0];

      let listObj = {
        value: current.chg_1d.toFixed(4),
        change: current.return_1d.toFixed(1),
        symbol: cryptoSymbol,
      };

      listArr.push(listObj);
    }
    setWatchList(listArr.slice(5, 8));
    setTopGainers(listArr.slice(0, 3));
    setLoadingWatchlist(false);
  };

  const fetchMarkets = async () => {
    setLoadingMarkets(true);

    const result = await getMarkets(5);
    console.log(!result);
    if (!result) return;
    const listArr = [];

    for (let i = 0; i < result.length; i++) {
      let current = result[i];
      const chart = await getMarketData(current.id);

      let listObj = {
        value: addCommasToNumber(current.current_price.toFixed(2)),
        change: current.price_change_percentage_24h.toFixed(2),
        symbol: current.symbol.toUpperCase(),
        img: current.image,
        chartData: chart.prices,
      };

      listArr.push(listObj);
    }

    setMarkets(listArr);
    setLoadingMarkets(false);
  };

  const fetchTrending = async () => {
    const result = await getTrending();

    if (!result) return;
    const listArr = [];

    // Iterate over the first three items only
    for (let i = 0; i < Math.min(5, result.coins.length); i++) {
      let current = result.coins[i];
      let chart = await getMarketData(current.item.id);

      let listObj = {
        value: current.item.data.price,
        change: current.item.data.price_change_percentage_24h.usd.toFixed(2),
        symbol: current.item.symbol.toUpperCase(),
        img: current.item.large,
        chartData: chart.prices,
      };

      listArr.push(listObj);
    }
    setTrending(listArr);
  };

  useEffect(() => {
    fetchTopGainers();
    fetchMarkets();
    fetchTrending();
  }, []);

  return (
    <NetWrapper>
      {/* <Card title="Net Worth" amount="$5,755,323" crypto={97} fiat={3} /> */}
      <CustomTab
        loading={loadingWatchlist}
        watchlist
        listArr={[watchList, topGainers]}
        labelList={WATCHLIST_LABEL}
      />
      <CustomTab
        loading={loadingMarkets}
        market
        listArr={[markets, trending]}
        labelList={MARKETS_LABEL}
      />
    </NetWrapper>
  );
};

export default Transactions;

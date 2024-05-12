import React, { useEffect, useState } from "react";
import styled from "styled-components";

import MarketAssetsTable from "../../components/Markets/MarketAssetsTable";
import { BtnUnderline, SearchInput } from "../../components/Wrapped";
import MarketOverviewCard from "./MarketOverviewCard";
import { getTopGainers, getTrending } from "../../api/cryptoquoteApi";
import { TitleText } from "./style";

const BTN_LINKS = ["Favorites", "All", "Spots", "Futures", "New Listings"];

const DATA = [
  {
    name: "AAVE",
    change: 0.542,
    current_price: 552,
    balance: 2.899,
    volume_change: 29.11,
    market_cap: "$92,892",
    id: "AAVE",
  },
  {
    name: "LINK",
    change: 0.542,
    current_price: 828,
    balance: 0.7839,
    volume_change: 29.11,
    market_cap: "$92,892",
    id: "Chainlink",
  },
  {
    name: "ETH",
    change: 0.542,
    current_price: 8791,
    balance: 0.98763,
    volume_change: 29.11,
    market_cap: "$92,892",
    id: 0.542,
  },

  {
    name: "ATOM",
    change: -1.92,
    current_price: 102,
    balance: 1.286,
    volume_change: 29.11,
    market_cap: "$92,892",
    id: "Cosmos",
  },

  {
    name: "FIL",
    change: 7.21,
    current_price: 283,
    balance: 0,
    volume_change: 29.11,
    market_cap: "$92,892",
    id: "Filecoin",
  },

  {
    name: "XRP",
    change: 4.01,
    current_price: 992,
    balance: 16.83,
    volume_change: 29.11,
    market_cap: "$92,892",
    id: "ripple",
  },

  {
    name: "OPT",
    change: -0.542,
    current_price: 783,
    balance: 0,
    volume_change: 29.11,
    market_cap: "$92,892",
    id: "Optimism",
  },
  {
    name: "BTC",
    change: 7.02,
    current_price: 872,
    balance: 3.839,
    volume_change: 29.11,
    market_cap: "$92,892",
    id: "Bitcoin",
  },
  {
    name: "DOGE",
    change: 6.29,
    current_price: 820,
    balance: 0,
    volume_change: 29.11,
    market_cap: "$92,892",
    id: "Dogecoin",
  },

  {
    name: "ZIL",
    change: 5.2,
    current_price: 820,
    balance: 0,
    volume_change: 29.11,
    market_cap: "$92,892",
    id: "Zilliqa",
  },

  {
    name: "ADA",
    change: -8.31,
    current_price: 820,
    balance: 0,
    volume_change: 29.11,
    market_cap: "$92,892",
    id: "Cardano",
  },

  {
    name: "ADX",
    change: -3.11,
    current_price: 820,
    balance: 0,
    volume_change: 29.11,
    market_cap: "$92,892",
    id: "adex",
  },
];

const OverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
`;

const MTNavContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const MTButtonContainer = styled.div`
  display: flex;
  gap: 3rem;
  font-size: 14px;
`;

const MarketOverview = () => {
  const [loading, setLoading] = useState(true);
  const [loadingTopGainers, setLoadingTopGainers] = useState(true);
  const [trending, setTrending] = useState<any>([]);
  const [topGainers, setTopGainers] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [currentNav, setCurrentNav] = useState("Favorites");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTrending = async () => {
    setLoading(true);
    const result = await getTrending();

    if (!result) return;
    const listArr = [];

    // Iterate over the first three items only
    for (let i = 0; i < Math.min(5, result.coins.length); i++) {
      let current = result.coins[i];

      let listObj = {
        value: current.item.data.price,
        change: current.item.data.price_change_percentage_24h.usd.toFixed(2),
        symbol: current.item.symbol.toUpperCase(),
        img: current.item.large,
      };

      listArr.push(listObj);
    }

    // Dispatch the setTrending action with the fetched trending data
    setTrending(listArr);
    setLoading(false);
  };

  const fetchTopGainers = async () => {
    setLoadingTopGainers(true);
    const result = await getTopGainers();
    if (!result) return;
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

    setTopGainers(listArr.slice(0, 4));
    setLoadingTopGainers(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setTableData(DATA);
    } else {
      const filteredData = DATA.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setTableData(filteredData);
    }
  };

  useEffect(() => {
    fetchTrending();
    fetchTopGainers();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  console.log({ trending });

  return (
    <OverviewContainer>
      <TitleText className="dark:text-darkText">Markets Overview</TitleText>
      <CardWrapper>
        <MarketOverviewCard
          loading={loading}
          data={trending}
          title="Trending"
        />

        <MarketOverviewCard
          loading={loadingTopGainers}
          data={topGainers}
          title="Top Gainers"
        />

        <MarketOverviewCard
          loading={loading}
          data={trending}
          title="Top Losers"
        />
      </CardWrapper>
      <MTNavContainer className="py-2">
        <MTButtonContainer>
          {BTN_LINKS.map((link, index) => (
            <BtnUnderline
              key={index}
              label={link}
              active={currentNav === link}
              onClick={setCurrentNav}
            />
          ))}
        </MTButtonContainer>

        <SearchInput onChange={setSearchQuery} />
      </MTNavContainer>
      <MarketAssetsTable data={tableData} />
    </OverviewContainer>
  );
};

export default MarketOverview;

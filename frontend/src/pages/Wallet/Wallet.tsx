import { getTokenPriceChange } from "../../api/cryptoquoteApi";
import { Balance, Transactions } from "../../components/Wallet";

import { Grommet, Main, Page } from "grommet";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DashboardTopBar } from "../../components";
import { Layout } from "../../layouts";

const PageWrapper = styled.div`
  display: flex;
  padding: 0 24px;
  gap: 24px;
  min-height: 100vh;
`;

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

const Wallet = () => {
  const [walletBalances, setWalletBalances] = useState<any>([]);
  const [loadingData, setLoadingData] = useState(true);

  const processAssetsData = async () => {
    setLoadingData(true);
    const results = [];

    for (let i = 0; i < DATA.length; i++) {
      const current = DATA[i];

      if (current.balance > 0) {
        const result = await getTokenPriceChange(current.id.toLowerCase());
        let tokenObj = {
          ...current,
          value: result[current.id.toLowerCase()].usd * current.balance,
          change: result[current.id.toLowerCase()].usd_24h_change.toFixed(2),
          current_price: result[current.id.toLowerCase()].usd,
        };

        console.log({ tokenObj });
        results.push(tokenObj);
      } else {
        let tokenObj = {
          ...current,
          value: 0,
          change: 0,
          current_price: 0,
        };
        results.push(tokenObj);
      }
    }
    results.sort((a, b) => b.value - a.value);

    setWalletBalances(results);
    setLoadingData(false);
  };

  console.log({ walletBalances });

  useEffect(() => {
    processAssetsData();
  }, []);

  return (
    <Layout>
      <PageWrapper>
        <Transactions loading={loadingData} balances={walletBalances} />
        <Balance loading={loadingData} balances={walletBalances} />
      </PageWrapper>
    </Layout>
  );
};

export default Wallet;

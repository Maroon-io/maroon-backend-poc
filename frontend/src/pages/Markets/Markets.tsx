import React from "react";
import styled from "styled-components";
import { MarketOverview } from "../../components/Markets";
import NewListings from "../../components/Markets/NewListings";
import { Layout } from "../../layouts";

const PageWrapper = styled.div`
  display: flex;
  padding: 0 24px;
  gap: 24px;
  margin: 2rem 0;
`;

const data = [
  {
    symbol: "DYM",
    value: 7.01,
    change: -4.66,
  },

  {
    symbol: "JUP",
    value: 0.3016,
    change: -9.61,
  },

  {
    symbol: "RONIN",
    value: 3.08,
    change: 6.57,
  },

  {
    symbol: "ZUP",
    value: 0.401,
    change: -24.66,
  },

  {
    symbol: "EUP",
    value: 79.01,
    change: 4.9866,
  },
];

const Markets = () => {
  return (
    <Layout>
      <PageWrapper>
        <NewListings data={data} />
        <MarketOverview />
      </PageWrapper>
    </Layout>
  );
};

export default Markets;

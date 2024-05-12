import React, { useEffect, useState } from "react";
import MarketTable from "./MarketTable";
import colors from "../../constants/colors";
import styled from "styled-components";

const COLUMNS = ["Name", "Price", "24h Change", "24h Volume", "Market Cap"];

const MarketTableWrapper = styled.div`
  padding: 0.8rem;
  border-radius: 10px;
  background: ${colors.white};
`;

interface MarketAssetsTableProps {
  data: any;
}

const MarketAssetsTable: React.FC<MarketAssetsTableProps> = ({ data }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <MarketTableWrapper className="dark:bg-darkSecondary">
      <MarketTable loading={loading} columns={COLUMNS} data={data} />
    </MarketTableWrapper>
  );
};

export default MarketAssetsTable;

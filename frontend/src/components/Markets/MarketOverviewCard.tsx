import { Table, TableBody, TableCell, TableRow } from "grommet";
import React from "react";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import MarketOverviewCardLoading from "./MarketOverViewCardLoading";
import {
  CardContainer,
  Cell,
  Change,
  ChangeCell,
  HeaderCell,
  IndexCell,
  SymbolCell,
  Value,
  ValueCell,
} from "./style";

interface MarketOverviewCardProps {
  data: any;
  loading: any;
  title: any;
}

const MarketOverviewCard: React.FC<MarketOverviewCardProps> = ({
  data,
  loading,
  title,
}) => {
  if (loading) {
    return <MarketOverviewCardLoading />;
  }
  return (
    <CardContainer className="dark:bg-darkSecondary">
      <div className="overflow-x-auto">
        <div className="flex flex-col w-full">
          <div className="flex flex-row">
            <div className="px-4 py-1 text-gray dark:text-darkerText text-[16px]">
              Trending
            </div>
          </div>
          {data.map((coin: any, index: number) => (
            <div
              key={index}
              className="flex flex-row text-[14px]  dark:text-darkText"
            >
              <div className="flex-auto px-4 py-2 w-[10%]">{index + 1}</div>
              <div className="flex-auto px-4 py-2 w-[30%]">{coin.symbol}</div>
              <div className="flex-auto px-4 py-2 w-[30%]">
                {coin.value.toFixed(6)}
              </div>
              <div
                className={`flex-auto px-4 py-2 w-[30%] ${
                  parseFloat(coin.change) < 0
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {coin.change}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </CardContainer>
  );
};

export default MarketOverviewCard;

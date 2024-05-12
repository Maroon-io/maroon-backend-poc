import React from "react";
import { CryptoIcon } from "../../components/CryptoIcon";
import { SmallChart } from "../../components/Dashboard";

import {
  AmountText,
  BalanceText,
  BalanceWrapper,
  ChangeText,
  ChangeWrap,
  ChangeWrapper,
  ChartWrapper,
  CryptoImg,
  CustomListWrapper,
  ItemWrapper,
  SideCell,
  SideCellItem,
  StatusText,
  StatusWrapper,
  TDate,
  TableBody,
  TableBodyCell,
  TotalText,
} from "./style";
import { convertDateFormat } from "../../utils";

interface CustomListProps {
  change?: number;
  value?: any;
  symbol?: string;
  type?: string;
  chartData?: any;
  onClick?: any;
  img?: string;
  data?: any;
}

const CustomList: React.FC<CustomListProps> = ({
  change,
  value,
  symbol,
  type,
  chartData,
  onClick,
  img,
  data,
}) => {
  const formatCurrencyPair = (string: string) => {
    const splitStr = string.split("-");
    const joinedStr = splitStr.join("/");
    return joinedStr;
  };

  if (type === "watchlist") {
    return (
      <CustomListWrapper className="overflow-y-scroll" onClick={onClick}>
        <ItemWrapper>
          <CryptoIcon currency={"symbol"} />
          <StatusText className="dark:text-darkText">{symbol}</StatusText>
        </ItemWrapper>

        <ChangeWrapper>
          <AmountText className="dark:text-darkText">{`$${value}`}</AmountText>
          <ChangeText value={change}>{`(${
            change && change > 0 ? "+" : ""
          }${change}%)`}</ChangeText>
        </ChangeWrapper>
      </CustomListWrapper>
    );
  }

  if (type === "deposit") {
    return (
      <CustomListWrapper
        className="dark:hover:bg-darkerText overflow-hidden"
        value="deposit"
        onClick={onClick}
      >
        <ItemWrapper>
          <CryptoIcon currency={symbol} />
          <StatusText className="dark:text-darkText">{symbol}</StatusText>
        </ItemWrapper>

        <BalanceWrapper>
          <BalanceText className="dark:text-darkText">{`${value} ${symbol}`}</BalanceText>
          <TotalText className="dark:text-darkText">{`${
            change && change.toFixed(2)
          } USD`}</TotalText>
        </BalanceWrapper>
      </CustomListWrapper>
    );
  }

  if (type === "assets") {
    return (
      <CustomListWrapper onClick={onClick}>
        <ItemWrapper>
          <CryptoIcon currency={symbol} />
          <StatusText className="dark:text-darkText">{symbol}</StatusText>
        </ItemWrapper>

        <ChangeWrapper>
          <AmountText className="dark:text-darkText">{`$${value}`}</AmountText>
          <ChangeText value={change}>{`(${
            change && change > 0 ? "+" : ""
          }${change}%)`}</ChangeText>
        </ChangeWrapper>
      </CustomListWrapper>
    );
  }

  if (type === "market") {
    return (
      <CustomListWrapper
        className="dark:border-b dark:border-darkBg"
        onClick={onClick}
      >
        <ItemWrapper>
          <CryptoImg>
            <img src={img} alt={symbol} />
          </CryptoImg>

          {/* <CryptoIcon currency={img}/> */}

          <StatusText className="dark:text-darkText">{symbol}</StatusText>
        </ItemWrapper>

        {chartData && (
          <ChartWrapper>
            <SmallChart data={chartData} />
          </ChartWrapper>
        )}

        <ChangeWrap>
          <AmountText className="dark:text-darkText">
            {value[0] === "$"
              ? value
              : `$${value < 1 ? parseFloat(value).toFixed(6) : value}`}
          </AmountText>
          <ChangeText value={change}>{`${
            change && change > 0 ? "+" : ""
          }${change}%`}</ChangeText>
        </ChangeWrap>
      </CustomListWrapper>
    );
  }

  if (type === "trade") {
    return (
      <TableBody onClick={onClick}>
        <tr>
          <TableBodyCell className="dark:text-darkText">
            <TDate>
              <span>
                {/* {data?.date
                  ? convertDateFormat(data?.date)
                  : convertDateFormat(data?.placementDate)} */}

                {data?.createdAt && convertDateFormat(data?.createdAt)}
              </span>
            </TDate>
          </TableBodyCell>
          <TableBodyCell className="dark:text-darkText">
            {/* {data.trade
              ? `${data?.trade}/${data?.market}`
              : formatCurrencyPair(data?.currencyPair)} */}
            Test8/Test18
          </TableBodyCell>
          <TableBodyCell className="dark:text-darkText">
            {/* {data?.type || data?.tradeType} */}
            Market
          </TableBodyCell>
          <SideCell value={data?.side.toLowerCase()}>{data?.side}</SideCell>
          <TableBodyCell className="dark:text-darkText">
            {/* {data?.rate || data?.tradePrice.split(" ")[0]} */}
            {data?.price || 0}
          </TableBodyCell>
          <TableBodyCell className="dark:text-darkText">
            {/* {data?.tradePrice?.split(" ")[0] || "-"} */}-
          </TableBodyCell>
          <TableBodyCell className="dark:text-darkText  text-center">
            {/* {data?.pendingVolume ? data?.pendingVolume : "-"} */}-
          </TableBodyCell>
          <TableBodyCell className="dark:text-darkText">
            {/* {data?.volume || data?.totalExecutedValue.split(" ")[0]} */}-
          </TableBodyCell>
          <TableBodyCell className="dark:text-darkText">
            <SideCellItem
              value={
                data?.orderStatus === "Pending" || data?.orderStatus === true
                  ? "open"
                  : "closed"
              }
            >
              {data?.orderStatus === "Pending" || data?.orderStatus === true
                ? "open"
                : "closed"}
            </SideCellItem>
          </TableBodyCell>
        </tr>
      </TableBody>
    );
  }
  return (
    <CustomListWrapper onClick={onClick}>
      <ItemWrapper>
        <CryptoIcon currency={symbol} />
        <StatusWrapper>
          <StatusText>{symbol}</StatusText>
        </StatusWrapper>
      </ItemWrapper>

      {chartData && (
        <ChartWrapper>
          <SmallChart data={chartData} />
        </ChartWrapper>
      )}

      <ChangeWrap>
        <AmountText>{`$${value}`}</AmountText>
        <ChangeText value={change}>{`${
          change && change > 0 ? "+" : ""
        }${change}%`}</ChangeText>
      </ChangeWrap>
    </CustomListWrapper>
  );
};

export default CustomList;

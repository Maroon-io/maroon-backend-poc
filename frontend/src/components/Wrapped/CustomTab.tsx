import React, { useState } from "react";
import { Grommet, Box, Tab, Tabs, Paragraph } from "grommet";
import styled from "styled-components";
import TransactionList from "./TransactionList";

import CustomList from "./CustomList";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import {
  SideCell,
  SkeletonWrapper,
  StyledTab,
  StyledTabs,
  TabWrapper,
  Table,
  TableBody,
  TableBodyCell,
  TableHeaderCell,
  TableWrapper,
} from "./style";
import TableSkeleton from "./TableSkeleton";

interface CustomTabProps {
  labelList?: any;
  listArr?: any;
  transaction?: boolean;
  watchlist?: any;
  market?: any;

  trade?: any;
  tableLoading?: boolean;
  loading?: boolean;
}

const CustomTab: React.FC<CustomTabProps> = ({
  labelList,
  listArr,
  transaction,
  watchlist,
  market,
  loading,
  trade,
  tableLoading,
}) => {
  const [activeIndex, setActiveIndex] = useState(1);

  if (loading) {
    return (
      <TabWrapper className="dark:bg-darkSecondary">
        <SkeletonWrapper>
          <Skeleton width={"50%"} height={30} />
          <Skeleton count={5} />
        </SkeletonWrapper>
      </TabWrapper>
    );
  }

  if (tableLoading) {
    return (
      <TabWrapper className="dark:bg-darkSecondary ">
        <StyledTabs
          className="dark:bg-transparent"
          activeIndex={activeIndex}
          onActive={(index: number) => setActiveIndex(index)}
          justify="start"
        >
          {labelList &&
            labelList.map((label: string, index: number) => (
              <StyledTab
                className={`${
                  activeIndex === index
                    ? "dark:bg-primary dark:ring-primary dark:ring-[0.5px] dark:text-darkText"
                    : "dark:ring-darkText dark:ring-[0.5px]"
                } dark:rounded-[10px] `}
                key={index}
                active={activeIndex === index}
                onClick={() => setActiveIndex(index)}
              >
                {label}
              </StyledTab>
            ))}
        </StyledTabs>
        <Table>
          <thead>
            <tr>
              <TableHeaderCell className="dark:border-darkBg">
                Date
              </TableHeaderCell>
              <TableHeaderCell className="dark:border-darkBg">
                Pair
              </TableHeaderCell>
              <TableHeaderCell className="dark:border-darkBg">
                Type
              </TableHeaderCell>
              <TableHeaderCell className="dark:border-darkBg">
                Side
              </TableHeaderCell>
              <TableHeaderCell className="dark:border-darkBg">
                Price
              </TableHeaderCell>
              <TableHeaderCell className="dark:border-darkBg">
                Stop Price
              </TableHeaderCell>
              <TableHeaderCell className="dark:border-darkBg">
                Pending
              </TableHeaderCell>
              <TableHeaderCell className="dark:border-darkBg">
                Total
              </TableHeaderCell>
              <TableHeaderCell className="dark:border-darkBg">
                Action
              </TableHeaderCell>
            </tr>
          </thead>
          <TableBody>
            <TableSkeleton numEntries={9} />
            <TableSkeleton numEntries={9} />
            <TableSkeleton numEntries={9} />
          </TableBody>
        </Table>
      </TabWrapper>
    );
  }

  return (
    <TabWrapper className="dark:bg-darkSecondary min-h-[10rem]">
      <StyledTabs
        className="dark:bg-transparent"
        activeIndex={activeIndex}
        onActive={(index: number) => setActiveIndex(index)}
        justify="start"
      >
        {labelList &&
          labelList.map((label: string, index: number) => (
            <StyledTab
              className={`${
                activeIndex === index
                  ? "dark:bg-primary dark:ring-darkText dark:ring-1 dark:text-darkText"
                  : "dark:ring-darkText dark:ring-[0.5px]"
              } dark:rounded-[10px] `}
              key={index}
              active={activeIndex === index}
              onClick={() => setActiveIndex(index)}
            >
              {label}
            </StyledTab>
          ))}
      </StyledTabs>

      {(listArr && listArr[activeIndex] &&  listArr[activeIndex].length === 0 )|| !listArr[activeIndex] || !Array.isArray(listArr[activeIndex]) ? (
        <div className="flex italic items-center justify-center h-[10rem] border-y mt-4 border-grayWhite dark:border-darkBg text-darkerText">
          No data available
        </div>
      ) : (
        <div>
          {transaction &&
            listArr &&
            listArr[activeIndex] &&
            listArr[activeIndex].map((list: any, index: number) => (
              <TransactionList
                key={index}
                amount={list.amount}
                status={list.status}
                date={list.date}
                symbol={list.symbol}
              />
            ))}

          {watchlist &&
            listArr &&
            listArr[activeIndex] &&
            listArr[activeIndex].map((list: any, index: number) => (
              <CustomList
                type={"watchlist"}
                key={index}
                value={list.value}
                change={list.change}
                symbol={list.symbol}
              />
            ))}

          {market &&
            listArr &&
            listArr[activeIndex] &&
            listArr[activeIndex].map((list: any, index: number) => (
              <CustomList
                chartData={list.chartData}
                type={"market"}
                key={index}
                value={list.value}
                change={list.change}
                symbol={list.symbol}
                img={list.img}
              />
            ))}

          {trade && (
            <TableWrapper>
              <Table className="dark:border-darkBg">
                <thead>
                  <tr>
                    <TableHeaderCell className="dark:border-darkBg">
                      Date
                    </TableHeaderCell>
                    <TableHeaderCell className="dark:border-darkBg">
                      Pair
                    </TableHeaderCell>
                    <TableHeaderCell className="dark:border-darkBg">
                      Type
                    </TableHeaderCell>
                    <TableHeaderCell className="dark:border-darkBg">
                      Side
                    </TableHeaderCell>
                    <TableHeaderCell className="dark:border-darkBg">
                      Price
                    </TableHeaderCell>
                    <TableHeaderCell className="dark:border-darkBg">
                      Stop Price
                    </TableHeaderCell>
                    <TableHeaderCell className="dark:border-darkBg">
                      Pending
                    </TableHeaderCell>
                    <TableHeaderCell className="dark:border-darkBg">
                      Total
                    </TableHeaderCell>
                    <TableHeaderCell className="dark:border-darkBg">
                      Action
                    </TableHeaderCell>
                  </tr>
                </thead>
                {listArr &&
                  listArr[activeIndex] &&
                  listArr[activeIndex].map((list: any, index: number) => (
                    <CustomList type={"trade"} key={index} data={list} />
                  ))}
              </Table>
            </TableWrapper>
          )}
        </div>
      )}
    </TabWrapper>
  );
};

export default CustomTab;

import colors from "../../constants/colors";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoCaretDownSharp, IoCaretUpSharp } from "react-icons/io5";

import { addCommasToNumber, shortenAddress } from "../../utils";
import { CryptoIcon } from "../../components/CryptoIcon";

import TableDropdown from "../../components/Wrapped/TableDropdown";
import { BtnOutline, TableSkeleton } from "../../components/Wrapped";
import useScreenWidth from "../../hooks/useScreenWidth";
import { shallowEqual, useSelector } from "react-redux";

const LINKS = [
  { icon: "trade", label: "Trade" },
  { icon: "details", label: "Details" },
];

const BUTTON_LINKS = [
  "All",
  "Layer 1",
  "Layer 2",
  "Metaverse",
  "Infrastructure",
  "Seed",
  "AI",
  "Gaming",
  "Oracles",
];

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
  font-size: 14px;
`;

const TableHead = styled.thead`
  color: black;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 20px 0;

  color: ${colors.dark};
`;

const ChangeCell = styled.td<any>`
  padding: 20px 0;

  gap: 1rem;

  color: ${({ value }) =>
    value < 0
      ? colors.danger
      : colors.success}; /* Change color based on value */
`;

const TableHeaderCell = styled.th`
  padding: 0 10px 20px 0;

  cursor: pointer;

  color: ${colors.grayLight};
  transition: color 0.3s ease-in-out;

  &:hover,
  &:active {
    color: black;
  }
`;

const OptionsCell = styled.td`
  padding: 20px 0;

  color: ${colors.dark};
`;

const StyledCell = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ChangeCellItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
`;

const ChangeSpan = styled.span`
  color: ${colors.gray};
`;

const CaretWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 15px;
`;

const CaretUp = styled(IoCaretUpSharp)<any>`
  transition: transform 0.2s ease-in-out; /* Add transition for smooth scaling */
  &:hover {
    color: ${colors.primary};
    cursor: pointer;
    transform: scale(1.5);
  }
`;

const CaretDown = styled(IoCaretDownSharp)<any>`
  transition: transform 0.2s ease-in-out; /* Add transition for smooth scaling */
  &:hover {
    color: ${colors.primary};
    cursor: pointer;
    transform: scale(1.5);
  }
`;

const MTContainer = styled.div``;
const MTButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

interface MarketTableProps {
  columns: any;
  data: any;
  loading: any;
}

const MarketTable: React.FC<MarketTableProps> = ({
  columns,
  data,
  loading,
}) => {
  const [sortByAsc, setSortByAsc] = useState(false);
  const [tableData, setTableData] = useState(data);
  const [activeTab, setActiveTab] = useState("All");
  const [active, setActive] = useState("desc");

  const sortTable = () => {
    let datacopy = [...data];

    const sortResult = datacopy.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (sortByAsc) {
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      } else {
        if (nameA < nameB) return 1;
        if (nameA > nameB) return -1;
        return 0;
      }
    });

    setTableData(sortResult);
  };

  const calculateChangeValue = (value: any, change: any) => {
    const result = (parseFloat(change) / 100) * value;
    const formattedResult = addCommasToNumber(Math.abs(result).toFixed(2));
    return formattedResult;
  };

  const handleClick = () => {
    console.log({ active });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    sortTable();
  }, [sortByAsc]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <MTContainer>
      <MTButtonWrapper>
        {BUTTON_LINKS.map((button, index) => (
          <BtnOutline
            onClick={handleTabChange}
            key={index}
            light
            borderless
            label={button}
            active={button === activeTab}
          />
        ))}
      </MTButtonWrapper>

      <TableContainer>
        <TableHead>
          <TableRow className="dark:border-b-darkBg">
            {columns.map((column: any, index: number) => (
              <TableHeaderCell
                className="dark:hover:text-white"
                onClick={() =>
                  column.toLowerCase() === "name"
                    ? setSortByAsc(!sortByAsc)
                    : null
                }
                key={index}
              >
                <StyledCell>
                  {column}

                  <CaretWrapper>
                    <CaretUp
                      value="asc"
                      onClick={() => {
                        setActive("desc");
                        handleClick();
                      }}
                    />
                    <CaretDown
                      value="desc"
                      onClick={() => {
                        setActive("desc");
                        handleClick();
                      }}
                    />
                  </CaretWrapper>
                </StyledCell>
              </TableHeaderCell>
            ))}
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && (
            <>
              <TableSkeleton numEntries={5} />
              <TableSkeleton numEntries={5} />
              <TableSkeleton numEntries={5} />
              <TableSkeleton numEntries={5} />
            </>
          )}

          {!loading &&
            tableData.map((row: any, rowIndex: number) => (
              <TableRow className="dark:border-b-darkBg" key={rowIndex}>
                {columns.map((column: any, cellIndex: number) => {
                  return column.toLowerCase() !== "24h change" ? (
                    <TableCell key={cellIndex}>
                      <StyledCell className="dark:text-darkText">
                        {column.toLowerCase() === "name" ? (
                          <CryptoIcon
                            currency={row[column.toLowerCase()]}
                            margin="none"
                          />
                        ) : null}

                        {column.toLowerCase() === "24h volume"
                          ? row.volume_change
                          : column.toLowerCase() === "market cap"
                          ? row.market_cap
                          : column.toLowerCase() === "price"
                          ? `$${addCommasToNumber(row.current_price)}`
                          : row[column.toLowerCase()]}
                      </StyledCell>
                    </TableCell>
                  ) : (
                    <ChangeCell key={cellIndex} value={row.change}>
                      <ChangeCellItem>
                        <div>
                          {row.change !== 0 ? (
                            ` ${row.change}% ($${calculateChangeValue(
                              row.current_price,
                              row.change
                            )})`
                          ) : (
                            <ChangeSpan>0</ChangeSpan>
                          )}
                        </div>
                      </ChangeCellItem>
                    </ChangeCell>
                  );
                })}
                <OptionsCell>
                  <TableDropdown children={LINKS} />
                </OptionsCell>
              </TableRow>
            ))}
        </TableBody>
      </TableContainer>
    </MTContainer>
  );
};

export default MarketTable;

import colors from "../../constants/colors";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";

import TableDropdown from "./TableDropdown";
import { addCommasToNumber, shortenAddress } from "../../utils";
import { CryptoIcon } from "../../components/CryptoIcon";
import { Ascending, Descending } from "grommet-icons";
import TableSkeleton from "./TableSkeleton";

const LINKS = [
  { icon: "trade", label: "Trade" },
  { icon: "swap", label: "Swap" },
  { icon: "send", label: "Send" },
  { icon: "deposit", label: "Deposit" },
  { icon: "earn", label: "Earn" },
];

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  color: black;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr<any>`
  border-bottom: 1px solid #ddd;
  &:last-child {
    border-bottom: none;
  }
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
  border-bottom: 1px solid #ddd;
  cursor: pointer;

  transition: color 0.3s ease-in-out;

  &:hover,
  &:active {
    color: black;
  }
`;

const OptionsCell = styled.td`
  padding: 20px 0;
  border-bottom: 1px solid #ddd;

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

interface TableProps {
  columns: any;
  data: any;
  chain: string;
  wallet: string;
  loading?: boolean;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  chain,
  wallet,
  loading,
}) => {
  const [sortByAsc, setSortByAsc] = useState<any>(null);
  const [tableData, setTableData] = useState(data);

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

  const calculateChangeValue = (value: number, change: string) => {
    const result = (parseFloat(change) / 100) * value;
    const formattedResult = addCommasToNumber(Math.abs(result).toFixed(2));
    return formattedResult;
  };

  useEffect(() => {
    sortTable();
  }, [sortByAsc]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <TableContainer className="mt-[2rem]">
      <TableHead>
        <TableRow>
          {columns.map((column: any, index: number) => (
            <TableHeaderCell
              className="dark:text-darkerText dark:hover:text-white dark:border-b dark:border-darkBg text-[#717171] font-normal"
              onClick={() =>
                column.toLowerCase() === "name"
                  ? setSortByAsc(!sortByAsc)
                  : null
              }
              key={index}
            >
              <StyledCell>
                {column}

                {column.toLowerCase() === "name" ? (
                  sortByAsc ? (
                    <IoIosArrowRoundUp className="dark:text-darkText text-[#717171] text-xl" />
                  ) : (
                    <IoIosArrowRoundDown className="dark:text-darkText text-[#717171] text-xl" />
                  )
                ) : null}
              </StyledCell>
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {loading && (
          <>
            <TableSkeleton numEntries={6} />
            <TableSkeleton numEntries={6} />
            <TableSkeleton numEntries={6} />
            <TableSkeleton numEntries={6} />
          </>
        )}

        {tableData.length === 0 && !loading && (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center">
              <div className="flex italic items-center justify-center h-[20rem] text-darkerText">
                {" "}
                No data available
              </div>
            </TableCell>
          </TableRow>
        )}

        {tableData.length > 0 &&
          !loading &&
          tableData
            .filter(
              (row: any) =>
                (!chain ||
                  chain.toLowerCase() === "all chains" ||
                  row.chain.toLowerCase() === chain.toLowerCase()) &&
                (!wallet ||
                  wallet.toLowerCase() === "all wallets" ||
                  row.wallet.toLowerCase() === wallet.toLowerCase())
            )
            .map((row: any, rowIndex: number) => (
              <TableRow
                key={rowIndex}
                noBorder={rowIndex === tableData.length - 1}
              >
                {columns.map((column: any, cellIndex: number) => {
                  return column.toLowerCase() !== "24h change" ? (
                    <TableCell
                      className="dark:border-b dark:border-darkBg"
                      key={cellIndex}
                    >
                      <StyledCell className="dark:text-darkText">
                        {column.toLowerCase() === "name" ? (
                          <CryptoIcon
                            currency={row[column.toLowerCase()]}
                            margin="none"
                          />
                        ) : null}

                        {column.toLowerCase() === "wallet"
                          ? shortenAddress(row[column.toLowerCase()], 5)
                          : column.toLowerCase() === "value"
                          ? `$${addCommasToNumber(row.value.toFixed(2))}`
                          : row[column.toLowerCase()]}
                      </StyledCell>
                    </TableCell>
                  ) : (
                    <ChangeCell
                      className="dark:border-b dark:border-darkBg"
                      key={cellIndex}
                      value={row.change}
                    >
                      <ChangeCellItem>
                        <div>
                          {row.change !== 0 ? (
                            ` ${row.change}% ($${calculateChangeValue(
                              row.current_price,
                              row.change
                            )})`
                          ) : (
                            <ChangeSpan className="dark:text-darkText">
                              0
                            </ChangeSpan>
                          )}
                        </div>

                        <TableDropdown children={LINKS} />
                      </ChangeCellItem>
                    </ChangeCell>
                  );
                })}
              </TableRow>
            ))}
      </TableBody>
    </TableContainer>
  );
};

export default Table;

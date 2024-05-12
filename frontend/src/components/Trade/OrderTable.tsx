import React, { useEffect, useState } from "react";
import { generateOrderData } from "../../utils";
import OrderTableLoading from "./OrderTableLoading";
import {
  OrderTableWrapper,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
  TablePriceCell,
  TableRow,
  TableTitle,
} from "./style";
import { shallowEqual, useSelector } from "react-redux";
import { size } from "viem";

interface OrderTableProps {
  title: string;
  loading: boolean;
  data: any;
}

const OrderTable: React.FC<OrderTableProps> = ({ title, loading, data }) => {
  const TABLEDATA = generateOrderData(15);

  const [tableData, setTableData] = useState<any>();

  const extractData = () => {
    if (!data) {
      return;
    }

    const newData: any = [];
    for (let i = 0; i < data.length; i++) {
      const current = data[i];
      // console.log("Current data:", current);
      // console.log("Fee Paid:", current.feePaid);
      // console.log("Trade Price:", current.tradePrice);
      // console.log("Size:", current.size);
      // console.log("Total Executed Value:", current.totalExecutedValue);

      let dataObj = {
        // asset: current?.feePaid.split(" ")[1] || 0,
        // price: parseFloat(current?.tradePrice.split(" ")[0]).toFixed(6) || 0,
        // size: parseFloat(current?.size.split(" ")[0]).toFixed(4) || 0,
        // total: current?.totalExecutedValue.split(" ")[0] || 0,

        asset: "Test8",
        price: (current?.price).toFixed(4) || 0,
        size: (current?.size).toFixed(4) || 0,
        total: current?.total || 0,
        side: current?.side,
      };
      newData.push(dataObj);
    }
    setTableData(newData);
  };

  useEffect(() => {
    if (Array.isArray(data)) {
      extractData();
    }
  }, [data]);

  return (
    <OrderTableWrapper className="dark:bg-darkSecondary min-h-[35rem]">
      <TableTitle className="dark:text-white">{title}</TableTitle>
      <TableContainer>
        {loading ? (
          <OrderTableLoading />
        ) : (
          <>
            {(tableData && tableData.length) === 0 || !tableData ? (
              <div>
                <div>
                  <Table>
                    <thead>
                      <TableRow>
                        <TableHeader className="dark:bg-darkSecondary dark:text-darkText  dark:border-darkBg flex items-center gap-1 whitespace-nowrap">
                          <div>Price</div>
                          <div>
                            {/* {tableData ? `(${tableData[0]?.asset})` : ""} */}
                            (Test 8)
                          </div>
                        </TableHeader>

                        <TableHeader className="dark:bg-darkSecondary dark:text-darkText  dark:border-darkBg">
                          Size
                        </TableHeader>
                        <TableHeader className="dark:bg-darkSecondary dark:text-darkText  dark:border-darkBg">
                          Total
                        </TableHeader>
                      </TableRow>
                    </thead>
                  </Table>
                </div>
                <div className="flex italic items-center justify-center h-[20rem] text-darkerText">
                  No data available
                </div>
              </div>
            ) : (
              <Table>
                <thead>
                  <TableRow>
                    <TableHeader className="dark:bg-darkSecondary dark:text-darkText  dark:border-darkBg flex items-center gap-1 whitespace-nowrap">
                      <div>Price</div>
                      <div>{tableData ? `(${tableData[0]?.asset})` : ""}</div>
                    </TableHeader>

                    <TableHeader className="dark:bg-darkSecondary dark:text-darkText  dark:border-darkBg">
                      Size
                    </TableHeader>
                    <TableHeader className="dark:bg-darkSecondary dark:text-darkText  dark:border-darkBg">
                      Total
                    </TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  {tableData &&
                    tableData.map((data: any, index: number) => (
                      <TableRow key={index}>
                        <TablePriceCell side={data?.side}>
                          {data?.price}
                        </TablePriceCell>
                        <TableCell className="dark:text-darkText">
                          {data?.size}
                        </TableCell>
                        <TableCell className="dark:text-darkText">
                          {(data?.price * data.size).toFixed(4) || 0}
                        </TableCell>
                      </TableRow>
                    ))}
                </tbody>
              </Table>
            )}
          </>
        )}
      </TableContainer>
    </OrderTableWrapper>
  );
};

export default OrderTable;

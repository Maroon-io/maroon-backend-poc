import colors from "../../constants/colors";
import React from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  font-weight: 500;
`;

const TableHeader = styled.th`
  border-bottom: 1px solid #ddd;
  padding: 4px 8px;
  text-align: left;
  font-weight: 500;

  color: ${colors.dark};
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
  }
`;

const TablePriceCell = styled.td<any>`
  border: none;
  padding: 8px;
  color: ${({ price }) => (price >= 50000 ? "green" : "red")};
`;

const TableCell = styled.td`
  padding: 8px;
`;

const TableTitle = styled.div`
  padding: 1rem 0 0 1.2rem;
  font-weight: 800;
`;

const OrderTableLoading = () => {
  return (
    <Table>
      <thead>
        <TableRow>
          <TableHeader className="dark:bg-darkSecondary dark:text-darkText">
            Price
          </TableHeader>

          <TableHeader className="dark:bg-darkSecondary dark:text-darkText">
            Size
          </TableHeader>
          <TableHeader className="dark:bg-darkSecondary dark:text-darkText">
            Total
          </TableHeader>
          <TableHeader className="dark:bg-darkSecondary dark:text-darkText"></TableHeader>
        </TableRow>
      </thead>
      <tbody>
        <TableRow>
          <TablePriceCell>
            {" "}
            <Skeleton width={60} height={10} />
          </TablePriceCell>
          <TableCell>
            {" "}
            <Skeleton width={60} height={10} />
          </TableCell>
          <TableCell>
            {" "}
            <Skeleton width={60} height={10} />
          </TableCell>
        </TableRow>

        <TableRow>
          <TablePriceCell>
            {" "}
            <Skeleton width={60} height={10} />
          </TablePriceCell>
          <TableCell>
            {" "}
            <Skeleton width={60} height={10} />
          </TableCell>
          <TableCell>
            {" "}
            <Skeleton width={60} height={10} />
          </TableCell>
        </TableRow>

        <TableRow>
          <TablePriceCell>
            {" "}
            <Skeleton width={60} height={10} />
          </TablePriceCell>
          <TableCell>
            {" "}
            <Skeleton width={60} height={10} />
          </TableCell>
          <TableCell>
            {" "}
            <Skeleton width={60} height={10} />
          </TableCell>
        </TableRow>

        <TableRow>
          <TablePriceCell>
            {" "}
            <Skeleton width={60} height={10} />
          </TablePriceCell>
          <TableCell>
            {" "}
            <Skeleton width={60} height={10} />
          </TableCell>
          <TableCell>
            {" "}
            <Skeleton width={60} height={10} />
          </TableCell>
        </TableRow>

        <TableRow>
          <TablePriceCell>
            {" "}
            <Skeleton width={60} height={10} />
          </TablePriceCell>
          <TableCell>
            {" "}
            <Skeleton width={60} height={10} />
          </TableCell>
          <TableCell>
            {" "}
            <Skeleton width={60} height={10} />
          </TableCell>
        </TableRow>

        <TableRow>
          <TablePriceCell>
            {" "}
            <Skeleton width={60} height={10} />
          </TablePriceCell>
          <TableCell>
            {" "}
            <Skeleton width={60} height={10} />
          </TableCell>
          <TableCell>
            {" "}
            <Skeleton width={60} height={10} />
          </TableCell>
        </TableRow>

        <TableRow>
          <TablePriceCell>
            {" "}
            <Skeleton width={60} height={10} />
          </TablePriceCell>
          <TableCell>
            {" "}
            <Skeleton width={60} height={10} />
          </TableCell>
          <TableCell>
            {" "}
            <Skeleton width={60} height={10} />
          </TableCell>
        </TableRow>

        <TableRow>
          <TablePriceCell>
            {" "}
            <Skeleton width={60} height={10} />
          </TablePriceCell>
          <TableCell>
            {" "}
            <Skeleton width={60} height={10} />
          </TableCell>
          <TableCell>
            {" "}
            <Skeleton width={60} height={10} />
          </TableCell>
        </TableRow>

        <TableRow>
          <TablePriceCell>
            {" "}
            <Skeleton width={60} height={10} />
          </TablePriceCell>
          <TableCell>
            {" "}
            <Skeleton width={60} height={10} />
          </TableCell>
          <TableCell>
            {" "}
            <Skeleton width={60} height={10} />
          </TableCell>
        </TableRow>
      </tbody>
    </Table>
  );
};

export default OrderTableLoading;

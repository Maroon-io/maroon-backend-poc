import React from "react";
import { TableCell } from "./style";
import Skeleton from "react-loading-skeleton";

interface TableSkeletonProps {
  numEntries: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ numEntries }) => (
  <tr>
    {Array.from({ length: numEntries }, (_, index) => (
      <TableCell className="dark:border-b-darkBg" key={index}>
        <Skeleton width={"80%"} height={20} />
      </TableCell>
    ))}
  </tr>
);

export default TableSkeleton;

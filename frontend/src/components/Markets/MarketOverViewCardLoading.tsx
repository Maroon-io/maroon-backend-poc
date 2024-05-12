import React from "react";
import { Table, TableBody, TableCell, TableRow } from "grommet";
import { CardContainer } from "./style";
import Skeleton from "react-loading-skeleton";

const MarketOverviewCardLoading = () => {
  return (
    <CardContainer className="dark:bg-darkSecondary">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell scope="col">
              <Skeleton width={70} height={20} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton width={90} height={20} />
            </TableCell>
            <TableCell>
              <Skeleton width={70} height={20} />
            </TableCell>
            <TableCell>
              <Skeleton width={70} height={20} />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Skeleton width={90} height={20} />
            </TableCell>
            <TableCell>
              <Skeleton width={70} height={20} />
            </TableCell>
            <TableCell>
              <Skeleton width={70} height={20} />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Skeleton width={90} height={20} />
            </TableCell>
            <TableCell>
              <Skeleton width={70} height={20} />
            </TableCell>
            <TableCell>
              <Skeleton width={70} height={20} />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Skeleton width={90} height={20} />
            </TableCell>
            <TableCell>
              <Skeleton width={70} height={20} />
            </TableCell>
            <TableCell>
              <Skeleton width={70} height={20} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContainer>
  );
};

export default MarketOverviewCardLoading;

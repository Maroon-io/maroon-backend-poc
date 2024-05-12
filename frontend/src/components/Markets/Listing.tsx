import { CryptoIcon } from "../../components/CryptoIcon";
import { Divider } from "../../components/Wrapped";
import colors from "../../constants/colors";
import React from "react";
import styled from "styled-components";

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 0;
  width: 100%;
  font-size: 14px;
`;

const TokenWrapper = styled.div`
  display: flex;
  align-items: center;

  color: ${colors.dark};
  width: 33.3%;
`;

const ChangeText = styled.div<any>`
  color: ${({ value }) =>
    value > 0 ? colors.success : value < 0 ? colors.danger : colors.gray};
`;

interface ListingProps {
  data: any;
  isLast: boolean;
}

const Listing: React.FC<ListingProps> = ({ data, isLast }) => {
  return (
    <>
      <ListWrapper>
        <TokenWrapper className="dark:text-darkText">
          <CryptoIcon currency={data.symbol.toLowerCase()} />
          {data.symbol}
        </TokenWrapper>
        <TokenWrapper className="dark:text-darkText">
          ${data.value}
        </TokenWrapper>
        <ChangeText value={data.change}>{data.change}%</ChangeText>
      </ListWrapper>
      {!isLast && <Divider />}
    </>
  );
};

export default Listing;

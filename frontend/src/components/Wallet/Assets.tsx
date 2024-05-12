import { BtnOutline } from "../../components/Wrapped";

import Icon from "../../components/Wrapped/Icon";
import colors from "../../constants/colors";
import React, { useState } from "react";
import styled from "styled-components";
import { generateRandomWatchlist, shortenAddress } from "../../utils";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import Card from "../../components/Wrapped/Card";
import CustomList from "../../components/Wrapped/CustomList";

const AssetContainer = styled.div`
  width: 32rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: ${colors.white};
  padding: 1rem;
  gap: 1.4rem;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div<any>`
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 0.5rem 0;
  border-bottom: ${({ value }) =>
    value ? `1px solid ${colors.grayLight}` : ""};
`;

const TitleText = styled.div`
  font-size: 14px;
  color: ${colors.gray};
  font-weight: bold;
  &:hover {
    color: ${colors.dark};
  }
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const WATCHLIST_LABEL = ["Watchlist", "Top gainers"];
const WATCHLIST = Array.from({ length: 6 }, () => generateRandomWatchlist());

interface OnChainAssetsProps {
  onSelect: any;
}

const OnChainAssets: React.FC<OnChainAssetsProps> = ({ onSelect }) => {
  const [sortByAscending, setSortByAscending] = useState(false);
  const [list, setList] = useState(WATCHLIST);

  const handleSelect = (item: any) => {
    onSelect(item, 2);
  };

  const handleSort = () => {
    const sortedList = [...WATCHLIST].sort((a: any, b: any) => {
      return sortByAscending ? a.value - b.value : b.value - a.value;
    });
    setList(sortedList);
    setSortByAscending(!sortByAscending); // Toggle sorting order
  };

  return (
    <AssetContainer>
      <HeaderContainer>
        <BtnOutline
          label={shortenAddress("M8gEOWMvb1en7sHCHRl7MC", 5)}
          icon={<Icon name="down" />}
          iconRight
        />
        <BtnOutline
          label="View on chain"
          icon={<Icon name="target" />}
          iconRight
        />
      </HeaderContainer>

      {/* <AssetsCardContainer> */}
      <Card
        title="Net Worth"
        amount="$5,755,323"
        bitcoin={50}
        ethereum={46}
        other={4}
      />
      {/* </AssetsCardContainer> */}

      <div>
        <HeaderContainer value={true}>
          <TitleText>Name</TitleText>

          <TitleText onClick={handleSort}>
            Amount{" "}
            {sortByAscending ? (
              <IoIosArrowRoundUp style={{ width: "1rem", height: "1rem" }} />
            ) : (
              <IoIosArrowRoundDown style={{ width: "1rem", height: "1rem" }} />
            )}
          </TitleText>
        </HeaderContainer>

        {list.map((list, index) => (
          <CustomList
            onClick={() => handleSelect(list)}
            key={index}
            value={list.value}
            change={parseFloat(list.change)}
            symbol={list.symbol}
          />
        ))}
      </div>
    </AssetContainer>
  );
};

export default OnChainAssets;

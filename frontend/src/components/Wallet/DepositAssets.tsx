import CustomList from "../../components/Wrapped/CustomList";
import colors from "../../constants/colors";
import React, { useState } from "react";
import styled from "styled-components";
import { generateDepositData } from "../../utils";
import { IoCloseSharp } from "react-icons/io5";
import { SearchInput } from "../Wrapped";

const Container = styled.div`
  border-radius: 10px;
  background: ${colors.white};
  width: 32rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TitleWrapper = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.dark};
`;

const ScrollableContainer = styled.div`
  max-height: 25rem;
  overflow-y: auto;
`;

const DATA = generateDepositData(5);

interface DepositAssetProps {
  onClick: any;
  onClose: () => void;
  tokens: any;
}

const DepositAsset: React.FC<DepositAssetProps> = ({
  onClick,
  onClose,
  tokens,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tokens based on search query
  const filteredTokens = tokens
    ? tokens.filter((item: any) =>
        item.currency.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <Container className="dark:bg-darkSecondary overflow-hidden p-4 min-h-[20rem]">
      <TitleWrapper className="dark:text-darkText flex justify-between py-2">
        <div>
          <div>Deposit</div>
          <div className="font-normal text-base dark:text-darkerText">
            Select asset to deposit
          </div>
        </div>
        <div
          onClick={onClose}
          className="cursor-pointer dark:text-darkText text-sm"
        >
          <IoCloseSharp />
        </div>
      </TitleWrapper>
      <div className="bg-grayWhite dark:bg-darkBg rounded-[10px] flex flex-col">
        <div className="p-4">
          <SearchInput onChange={setSearchQuery} />
        </div>
        <ScrollableContainer>
          {filteredTokens.length === 0 ? (
            <div className="flex italic items-center justify-center h-[20rem] text-darkerText">
              {" "}
              No match found
            </div>
          ) : (
            filteredTokens.map((item: any, index: number) => (
              <CustomList
                onClick={() => onClick(item)}
                key={index}
                type={"deposit"}
                symbol={item.currency}
                value={item.balance}
                change={item.usdBalance || 0}
              />
            ))
          )}
        </ScrollableContainer>
      </div>
    </Container>
  );
};

export default DepositAsset;

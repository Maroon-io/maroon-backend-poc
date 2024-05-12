import { RxCaretDown } from "react-icons/rx";
import { CryptoIcon } from "../../components/CryptoIcon";
import { Divider } from "../../components/Wrapped";
import Dropdown from "../../components/Wrapped/DropDown";
import colors from "../../constants/colors";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getMultipleMarketData } from "../../api/cryptoquoteApi";
import { setSelectedPair, setSelectedToken } from "../../redux/reducers";
import { addCommasToNumber } from "../../utils";
import { contractAddresses } from "../../constants";

const BannerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${colors.white};
  border-radius: 10px;
  padding: 6px 27px;
  height: 48px;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CryptoItem = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.dark};
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`;

const PriceTitle = styled.div`
  font-size: 12px;
  color: ${colors.grayLight};
`;

const PriceText = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.primary};
`;

const ChangeText = styled.div<any>`
  font-size: 12px;
  font-weight: bold;
  color: ${({ value }) => (value > 0 ? colors.success : colors.danger)};
`;

const NormalText = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: ${colors.dark};
`;

interface TradeBannerProps {
  onClick: any;
}
const TradeBanner: React.FC<TradeBannerProps> = ({ onClick }) => {
  const dispatch = useDispatch();
  const { selectedPair, selectedToken } = useSelector((state: any) => {
    const { selectedPair, selectedToken } = state.webAppReducer;
    return { selectedPair, selectedToken };
  });

  const getBtcData = async () => {
    const params = {
      vs_currency: "usd",
      ids: "bitcoin",
      per_page: 20,
    };
    const result = await getMultipleMarketData(params);

    result[0].contract_address = contractAddresses[result[0].id];

    dispatch(setSelectedToken(result[0]));
  };

  useEffect(() => {
    getBtcData();
  }, []);

  console.log({ selectedToken });

  return (
    <BannerWrapper className="dark:bg-darkSecondary relative">
      <ItemWrapper>
        <CryptoItem
          onClick={onClick}
          className="dark:text-darkText ring-1 ring-tertiary px-2 py-1 rounded-[10px] flex cursor-pointer dark:ring-darkBg"
        >
          {selectedToken ? (
            <img
              className="w-6 h-6"
              src={selectedToken.image}
              alt={selectedToken.name}
            />
          ) : (
            <CryptoIcon currency={selectedPair.split("/")[0].toLowerCase()} />
          )}
          <div className="px-2">{selectedPair}</div> <RxCaretDown />
        </CryptoItem>

        {/* <Dropdown label="All Markets" onSelect={() => {}} children={[]} /> */}
      </ItemWrapper>

      <Divider vertical />

      <ItemWrapper>
        <PriceWrapper>
          <PriceTitle className="dark:text-darkerText">
            Last Market Price
          </PriceTitle>
          <PriceText className="dark:text-white">
            ${addCommasToNumber(selectedToken?.current_price || 0)}
          </PriceText>
        </PriceWrapper>
      </ItemWrapper>

      <Divider vertical />

      <ItemWrapper>
        <PriceWrapper>
          <PriceTitle>24h Change</PriceTitle>
          <ChangeText value={selectedToken?.price_change_24h}>
            {selectedToken.price_change_24h > 0 ? "+" : ""}{" "}
            {(selectedToken && selectedToken.price_change_24h.toFixed(2)) ||
              0.0}
          </ChangeText>
        </PriceWrapper>

        <PriceWrapper>
          <PriceTitle>24h High</PriceTitle>
          <div className="dark:text-white text-sm">
            {" "}
            ${(selectedToken && addCommasToNumber(selectedToken.high_24h)) ||
              0}{" "}
          </div>
        </PriceWrapper>

        <PriceWrapper>
          <PriceTitle>24h Low</PriceTitle>
          <div className="dark:text-white text-sm">
            {" "}
            $
            {(selectedToken && addCommasToNumber(selectedToken.low_24h || 0)) ||
              0}
          </div>
        </PriceWrapper>

        <PriceWrapper>
          <PriceTitle>Market Volume</PriceTitle>
          <div className="dark:text-white text-sm">
            $
            {(selectedToken && addCommasToNumber(selectedToken.total_volume)) ||
              0}
          </div>
        </PriceWrapper>
      </ItemWrapper>
    </BannerWrapper>
  );
};

export default TradeBanner;

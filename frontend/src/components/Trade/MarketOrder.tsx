import CryptoDropdown from "../../components/Wrapped/CryptoDropdown";
import { IoSwapVertical } from "react-icons/io5";
import colors from "../../constants/colors";
import { TextInput } from "grommet";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/Wrapped";

const ASSETS = [
  "USDT",
  "USDC",
  "ETH",
  "BTC",
  "XRP",
  "MONI",
  "NHCT",
  "AAVE",
  "LINK",
  "MATIC",
  "DOT",
  "SOL",
  "ADA",
  "AVAX",
  "XTZ",
];

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colors.grayLight};
  border-radius: 10px;
  background: ${colors.grayWhite};
`;

const StyledInput = styled(TextInput)`
  padding: 1rem;
  border-start-end-radius: 10px;
  border-end-end-radius: 10px;
  height: 100%;
  &:focus {
    border: 2px solid ${colors.primary};
  }
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "")};
  color: ${({ disabled }) => (disabled ? "black" : "inherit")};
`;

const PriceInput = styled(TextInput)`
  padding: 1rem;
  border-radius: 10px;
  height: 100%;
  &:focus {
    border: 2px solid ${colors.primary};
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  padding: 0 2px;
  font-size: 14px;
`;

const LimitText = styled.div`
  align-self: flex-end;
  color: ${colors.gray};
  font-size: 13px;
`;

const MarketText = styled.div`
  color: ${colors.gray};
  font-size: 13px;
`;

const TradeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
`;

const SwapIconWrapper = styled.div`
  border-radius: 50%;
  color: ${colors.dark};
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  border: 1px solid ${colors.grayLight};
  cursor: pointer;
  transition: transform 0.3s ease; /* Added transition for smooth rotation */
  &:hover {
    background: ${colors.grayLight};
  }
`;

interface MarketOrderProps {
  maxLimit: string;
  marketPrice: string;
  transferFee: string;
  onPlaceOrder: any;
}

const MarketOrder: React.FC<MarketOrderProps> = ({
  maxLimit,
  marketPrice,
  transferFee,
  onPlaceOrder,
}) => {
  const BTC_PRICE = 49000;

  const [activeIndex, setActiveIndex] = useState(0);
  const [sellAsset, setSellAsset] = useState("USDT");
  const [buyAsset, setBuyAsset] = useState("BTC");
  const [buyAmount, setBuyAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const [currentMarketPrice, setCurrentMarketPrice] = useState(
    (1 / BTC_PRICE).toString()
  );
  const [isSwapped, setIsSwapped] = useState(false); // State to track if swap is done

  const handleSellAssetSelect = (crypto: string) => {
    setSellAsset(crypto);
  };

  const handleBuyAssetSelect = (crypto: string) => {
    setBuyAsset(crypto);
  };

  const handleSwap = () => {
    // Use functional form of setState to ensure correct updates
    const tempAsset = sellAsset;
    setSellAsset(buyAsset);
    setBuyAsset(tempAsset);
    setIsSwapped(!isSwapped);
  };

  const handleKeyPress = (event: any) => {
    const { key } = event;
    const regex = /^[0-9.]$/;
    if (!regex.test(key)) {
      event.preventDefault();
    }
  };

  const handlePlaceOrder = () => {
    const orderDetails = {
      type: "Market",
      buyAsset,
      sellAsset,
      buyAmount,
      sellAmount,
      currentMarketPrice,
      transferFee,
    };
    onPlaceOrder(orderDetails);
  };

  return (
    <TradeWrapper>
      <InputContainer>
        <InputLabel htmlFor="">Sell</InputLabel>
        <InputWrapper>
          <CryptoDropdown
            label={sellAsset} // Use buyAsset if swapped
            children={ASSETS}
            onSelect={handleSellAssetSelect}
          />
          <StyledInput
            onChange={(e) => setSellAmount(e.target.value)}
            onKeyPress={handleKeyPress}
            textAlign="end"
            plain
            focusIndicator={false}
          />
        </InputWrapper>
        <LimitText>{maxLimit}</LimitText>
      </InputContainer>

      <InputContainer>
        <InputLabel htmlFor="">Market price</InputLabel>
        <InputWrapper>
          <PriceInput
            value={currentMarketPrice}
            onChange={(e) => setCurrentMarketPrice(e.target.value)}
            onKeyPress={handleKeyPress}
            plain
            focusIndicator={false}
          />
        </InputWrapper>
        <MarketText>Market: {marketPrice}</MarketText>
      </InputContainer>

      <SwapIconWrapper
        onClick={handleSwap}
        style={{ transform: isSwapped ? "rotate(180deg)" : "none" }}
      >
        <IoSwapVertical />
      </SwapIconWrapper>

      <InputContainer>
        <InputLabel htmlFor="">Buy</InputLabel>
        <InputWrapper>
          <CryptoDropdown
            label={buyAsset} // Use sellAsset if swapped
            children={ASSETS}
            onSelect={handleBuyAssetSelect}
          />
          <StyledInput
            disabled
            onKeyPress={handleKeyPress}
            textAlign="end"
            plain
            focusIndicator={false}
            value={
              isSwapped
                ? parseFloat(sellAmount) / parseFloat(currentMarketPrice)
                : parseFloat(sellAmount) * parseFloat(currentMarketPrice) || 0
            }
          />
        </InputWrapper>
        <MarketText>Includes {transferFee} transfer fee</MarketText>
      </InputContainer>

      <Button label="Place order" onClick={handlePlaceOrder}></Button>
    </TradeWrapper>
  );
};

export default MarketOrder;

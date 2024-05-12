import { IoCloseSharp } from "react-icons/io5";
import { Button } from "../../components/Wrapped";
import Badge from "../../components/Wrapped/Badge";
import colors from "../../constants/colors";
import React, { useState } from "react";
import styled from "styled-components";
import ButtonPlain from "../Wrapped/ButtonPlain";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colors.dark};
  width: 32rem;
  background: ${colors.white};
  border-radius: 10px;
  padding: 1.5rem;
  gap: 1rem;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.div`
  font-size: 20px;
`;

const CardTextWrapper = styled.div<any>`
  border: ${(props) =>
    props.isSelected
      ? `2px solid ${colors.primary}`
      : `1px solid ${colors.grayLight}`};
  background: ${(props) =>
    props.isSelected ? colors.grayWhite : colors.white};

  border-radius: 10px;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;

  &:hover {
    background: ${colors.grayWhite};
  }
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TextTitle = styled.div``;

const TextDesc = styled.div`
  font-size: 14px;
  color: ${colors.gray};
`;

const DetailWrapper = styled.div`
  font-size: 14px;
  color: ${colors.gray};
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const IconWrapper = styled.div`
  width: 1rem;
  height: 1rem;
`;

const DetailText = styled.div`
  display: flex;
  gap: 5px;
`;

interface CreateWalletProps {
  onSelect: any;
  onClose: any;
}

const CreateWallet: React.FC<CreateWalletProps> = ({ onSelect, onClose }) => {
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const handleSelect = () => {
    onSelect(selectedCard);
  };

  return (
    <CardContainer className="dark:bg-darkSecondary">
      <div className="flex justify-between">
        {" "}
        <CardTitle className="dark:text-darkText">Create a wallet</CardTitle>
        <div onClick={onClose} className="cursor-pointer dark:text-darkText">
          <IoCloseSharp />
        </div>
      </div>
      <CardTextWrapper
        isSelected={selectedCard === "OwnWallet"}
        onClick={() => setSelectedCard("OwnWallet")}
        className="dark:bg-darkSecondary dark:hover:bg-darkBg"
      >
        <TextWrapper>
          <TextTitle className="dark:text-darkText">Own wallet</TextTitle>
          <Badge label="Recommended" />
        </TextWrapper>
        <TextDesc className="dark:text-darkerText">
          Funds are in self-custody when they are not being traded. Only you
          have access to your keys.
        </TextDesc>
        <DetailWrapper className="dark:text-darkerText">
          <DetailText>
            <IconWrapper>
              <img src="/assets/icons/success-outline.png" alt="" />
            </IconWrapper>
            You hold your own keys
          </DetailText>
          <DetailText>
            <IconWrapper>
              <img src="/assets/icons/success-outline.png" alt="" />
            </IconWrapper>
            You can audit funds on-chain at all times
          </DetailText>
          <DetailText>
            <IconWrapper>
              <img src="/assets/icons/success-outline.png" alt="" />
            </IconWrapper>
            Choose your own recovery option.
          </DetailText>
        </DetailWrapper>
      </CardTextWrapper>

      <CardTextWrapper
        isSelected={selectedCard === "MaroonWallet"}
        onClick={() => setSelectedCard("MaroonWallet")}
        className="dark:bg-darkSecondary dark:hover:bg-darkBg"
      >
        <TextTitle className="dark:text-darkText">Maroon Wallet</TextTitle>
        <TextDesc className="dark:text-darkerText">
          Funds are held in Maroon’s custody vault and are insured by Lloyds of
          London. They can only be used on the Maroon exchange.
        </TextDesc>
      </CardTextWrapper>

      <ButtonPlain
        onClick={() => handleSelect()}
        disabled={!selectedCard}
        primary
        label="Select"
      />
    </CardContainer>
  );
};

export default CreateWallet;

import React from "react";
import styled from "styled-components";
import ButtonPlain from "./ButtonPlain";
import colors from "../../constants/colors";
import { shortenAddress } from "../../utils";
import CopyToClipboard from "./CopyToClipboard";
import { IoCloseSharp } from "react-icons/io5";

const Container = styled.div`
  width: 32rem;
  background: ${colors.white};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${colors.dark};
  gap: 1rem;
  padding: 3rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const IconWrapper = styled.div`
  width: 3rem;
  height: 3rem;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${colors.gray};
  font-weight: bold;
  padding: 0 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const TradeInfo = styled.div`
  font-size: 14px;
  color: ${colors.gray};
  font-weight: bold;
  padding: 0 3rem;
  gap: 4px;
  display: flex;
  align-items: center;
  text-align: center;
`;

const WalletWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
  border: 1px solid ${colors.maroonGrey};
  padding: 1rem;
  border-radius: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
`;

const LinkWrapper = styled.span`
  cursor: pointer;
  text-decoration: underline;
`;

interface ProcessCompleteProps {
  title: string;
  info: string;
  wallet?: string;
  trade?: any;
  onViewOrder?: any;
  onClose?: any;
}

const ProcessComplete: React.FC<ProcessCompleteProps> = ({
  title,
  info,
  wallet,
  trade,
  onViewOrder,
  onClose,
}) => {
  return (
    <Container className="dark:bg-darkSecondary relative">
      <div
        onClick={onClose}
        className="cursor-pointer dark:text-darkText text-sm absolute top-[10px] right-[10px]"
      >
        <IoCloseSharp />
      </div>

      <IconWrapper>
        <img src={"./assets/icons/success.png"} alt="success" />
      </IconWrapper>
      <Title className="dark:text-darkText">{title}</Title>
      <Info className="dark:text-darkerText">{info}</Info>

      {trade && (
        <TradeInfo>
          You can view your order status{" "}
          <LinkWrapper onClick={() => onViewOrder(5)}>here</LinkWrapper>
        </TradeInfo>
      )}

      {wallet && (
        <WalletWrapper className="dark:border-darkBg">
          <div className="dark:text-darkerText">
            {shortenAddress(wallet, 15)}
          </div>
          <CopyToClipboard text={wallet} />
        </WalletWrapper>
      )}

      {trade && (
        <ButtonWrapper>
          <ButtonPlain label={"Continue trading"} />
          <ButtonPlain label="Go to wallet" primary />
        </ButtonWrapper>
      )}
    </Container>
  );
};

export default ProcessComplete;

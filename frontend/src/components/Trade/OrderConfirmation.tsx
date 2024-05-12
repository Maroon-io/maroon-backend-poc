import { Button } from "../../components/Wrapped";
import colors from "../../constants/colors";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 32rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: ${colors.white};
  padding: 1.5rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TitleWrapper = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.dark};
`;

const InfoContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colors.grayLight};
  padding: 1rem 0;
`;

const InfoTitle = styled.div`
  color: ${colors.dark};
  font-size: 14px;
  font-weight: bold;
`;

const InfoText = styled.div`
  color: ${colors.gray};
  font-weight: bold;
  font-size: 14px;
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CancelText = styled.div`
  color: ${colors.primary};
  text-align: center;
  cursor: pointer;
`;

interface OrderConfirmationProps {
  details: any;
  onSubmit: any;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  details,
  onSubmit,
}) => {
  const handleClick = () => {
    onSubmit();
  };

  console.log({ details });
  return (
    <Container>
      <TitleWrapper>Confirm your order</TitleWrapper>

      <InfoContainer>
        <InfoWrapper>
          <InfoTitle>Order type</InfoTitle>
          <InfoText>Buy {`(${details.type})`}</InfoText>
        </InfoWrapper>
        <InfoWrapper>
          <InfoTitle>Fee currency</InfoTitle>
          <InfoText>{details.buyAsset}</InfoText>
        </InfoWrapper>
        <InfoWrapper>
          <InfoTitle>Fee</InfoTitle>
          <InfoText>0.000001 BTC</InfoText>
        </InfoWrapper>
        <InfoWrapper>
          <InfoTitle>Estimated {details.sellAsset} to spend</InfoTitle>
          <InfoText>
            {details.sellAmount} {details.sellAsset}
          </InfoText>
        </InfoWrapper>
        <InfoWrapper>
          <InfoTitle>{details.buyAsset} to receive</InfoTitle>
          <InfoText>
            {details.currentMarketPrice
              ? parseFloat(details.sellAmount) * details.currentMarketPrice
              : parseFloat(details.sellAmount) * details.limitPrice}{" "}
            {details.buyAsset}
          </InfoText>
        </InfoWrapper>
      </InfoContainer>

      <ActionWrapper>
        <Button label="Submit order" onClick={handleClick}></Button>
        <CancelText>Cancel</CancelText>
      </ActionWrapper>
    </Container>
  );
};

export default OrderConfirmation;

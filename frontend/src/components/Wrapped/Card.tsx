import { Meter } from "grommet";
import React from "react";
import styled, { css } from "styled-components";
import ExtraBoldtext from "./ExtraBoldText";
import colors from "../../constants/colors";
import Skeleton from "react-loading-skeleton";
import { shallowEqual, useSelector } from "react-redux";

const CardWrapper = styled.div<any>`
  display: flex;
  min-width: 21rem;
  max-height: 11rem;
  padding: 1rem;
  background: ${({ value }) =>
    value === "dark" ? colors.grayLight : colors.white};
  border-radius: 1rem;
  flex: 1;
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
`;

const CardTitle = styled.div`
  font-size: 14px;
`;

const CardPieWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
`;

const StyledMeter = styled(Meter)`
  width: 96px;
  height: 96px;
`;

const RatioWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RatioText = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CryptoCircle = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #9457dc;
`;

const FiatCircle = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #1e0c1b;
`;

const OthersCircle = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #475456;
`;

interface CardProps {
  title?: string;
  amount?: string;
  crypto?: number;
  fiat?: number;
  type?: string;
  ethereum?: number;
  bitcoin?: number;
  other?: number;
  loading?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  amount,
  crypto,
  fiat,
  type,
  ethereum,
  bitcoin,
  other,
  loading,
}) => {
  const { theme } = useSelector((state: any) => {
    const { theme } = state.webAppReducer;
    return { theme };
  }, shallowEqual);

  if (loading) {
    return (
      <CardWrapper className="dark:bg-darkSecondary" value={type}>
        <CardContent>
          <div>
            <Skeleton width={100} height={50} />
          </div>
          <RatioWrapper>
            <Skeleton width={150} height={20} />
          </RatioWrapper>
        </CardContent>

        <CardPieWrapper>
          <Skeleton width={100} height={100} circle />
        </CardPieWrapper>
      </CardWrapper>
    );
  }

  return (
    <CardWrapper className="dark:bg-darkSecondary" value={type}>
      <CardContent>
        <div>
          <CardTitle className="dark:text-darkText">{title}</CardTitle>

          <div className="text-[32px] text-dark dark:text-darkText">
            {amount}
          </div>
        </div>

        <RatioWrapper>
          {crypto && (
            <RatioText className="dark:text-darkText">
              <CryptoCircle /> {crypto}% Crypto
            </RatioText>
          )}

          {fiat && (
            <RatioText className="dark:text-darkText">
              <FiatCircle className="dark:bg-white" /> {fiat}% Fiat
            </RatioText>
          )}

          {ethereum && (
            <RatioText className="dark:text-darkText">
              <CryptoCircle /> {ethereum}% Ethereum
            </RatioText>
          )}

          {bitcoin && (
            <RatioText className="dark:text-darkText">
              <FiatCircle /> {bitcoin}% Bitcoin
            </RatioText>
          )}

          {other && (
            <RatioText className="dark:text-darkText">
              <OthersCircle /> {other}% other
            </RatioText>
          )}
        </RatioWrapper>
      </CardContent>

      <CardPieWrapper>
        <StyledMeter
          value={95}
          thickness="70rem"
          color="#9457DC"
          background={{ color: theme === "dark" ? "white" : "#1E0C1B" }}
          type="circle"
          aria-label="meter"
        />
      </CardPieWrapper>
    </CardWrapper>
  );
};

export default Card;

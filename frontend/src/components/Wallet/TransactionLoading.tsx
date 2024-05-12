import Icon from "../../components/Wrapped/Icon";
import colors from "../../constants/colors";
import { Spinner } from "grommet";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 32rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: ${colors.white};
  padding: 1.5rem;
  gap: 1.4rem;
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  padding: 1rem;
  background: ${colors.grayLight};
  border-radius: 5px;
  display: flex;
  color: ${colors.dark};
  font-weight: bold;
  justify-content: center;
  gap: 0.6rem;
`;

const BodyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface TransactionLoadingProps {
  details: any;
}

const TransactionLoading: React.FC<TransactionLoadingProps> = ({ details }) => {
  return (
    <Container>
      <TitleContainer>
        {" "}
        <Icon name="lock" /> etherscan.io
      </TitleContainer>

      <BodyContainer>
        <Spinner />
      </BodyContainer>
    </Container>
  );
};

export default TransactionLoading;

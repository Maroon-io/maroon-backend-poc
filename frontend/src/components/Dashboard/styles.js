import colors from "../../constants/colors";
import styled from "styled-components";

export const ChartWrapper = styled.div`
  width: 100%;
  height: 477px;
  border-radius: 10px;
  margin: 1rem 0;
  font-size: 14px;
  background: ${colors.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
`;

export const BalanceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SkeletonWrapper = styled.div`
  padding: 1rem;
  height: 100%;
`;
